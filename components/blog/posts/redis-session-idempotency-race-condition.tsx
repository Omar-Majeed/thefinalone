import {
  A,
  Callout,
  Code,
  Em,
  Figure,
  H2,
  Li,
  Ol,
  P,
  Pre,
  ProseBody,
  Strong,
  Ul,
} from "@/components/blog/prose";

/**
 * Post body for /blog/redis-session-idempotency-race-condition.
 * Metadata (title, description, dates, author, tags) lives in constants/blog.ts.
 */
export default function RedisSessionIdempotencyRaceCondition() {
  return (
    <ProseBody>
      <P>
        I was working on a public endpoint. Nothing fancy — accept a
        request, write an audit record of the user&apos;s selection
        preferences to the database, return a response. The application was
        a modular monolith on Spring Boot that had recently been migrated
        off an older Struts 2 codebase. Redis had replaced the legacy
        in-JVM Java caches, and was also being used as the session store
        via Spring Session.
      </P>

      <P>
        Because the endpoint was public and writing to the database, it
        needed to be idempotent — if the same client fires the same
        request twice (retry, double-click, network hiccup), it should
        execute once. Textbook stuff. I reached for the textbook
        solution: a single-use token.
      </P>

      <P>
        It worked beautifully in testing. Then I load-tested it, and
        every assumption I had about how Spring Session + Redis actually
        behaves fell over. This post is the honest walkthrough of every
        attempt that <Em>didn&apos;t</Em> fix the race condition, the one
        that finally did, and what I now believe about distributed state
        after shipping it.
      </P>

      <H2 id="attempt-1">Attempt 1: single-use token in the session</H2>

      <P>
        The initial design was the one you&apos;d sketch on a whiteboard
        in forty seconds. Generate a short-lived token when the client
        first lands on the page. On submit, send the token with the
        request. The server checks the token exists in the session,
        processes the request, and invalidates the token. Second request
        with the same token → token already consumed → reject.
      </P>

      <Pre lang="java">{`// Simplified. Spring MVC controller — do NOT ship this.
@PostMapping("/preferences")
public ResponseEntity<?> savePreferences(
    @RequestBody PreferenceRequest body,
    HttpSession session
) {
    String submitted = body.getIdempotencyToken();
    String stored = (String) session.getAttribute("preference_token");

    if (stored == null || !stored.equals(submitted)) {
        return ResponseEntity.status(409).body("Token invalid or consumed");
    }

    // Mark the token as consumed, then process.
    session.removeAttribute("preference_token");
    preferenceService.save(body);

    return ResponseEntity.ok().build();
}`}</Pre>

      <P>
        Fine in isolation. Fine in Postman. Fine in unit tests. Fine when
        a human clicks the submit button twice.
      </P>

      <P>
        Then I pointed{" "}
        <A href="https://k6.io/">k6</A> at it with twenty concurrent
        virtual users all sending the same token. Twenty requests, twenty
        audit records written. The database happily absorbed every single
        one.
      </P>

      <H2 id="why-it-broke">Why it broke</H2>

      <P>
        Classic{" "}
        <A href="https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use">
          time-of-check-to-time-of-use (TOCTOU) race
        </A>
        . Every one of the twenty concurrent requests ran this sequence,
        interleaved:
      </P>

      <Ol>
        <Li>
          Request handler fetches the session from Redis (via Spring
          Session&apos;s filter).
        </Li>
        <Li>
          Reads <Code>preference_token</Code> — present, matches submitted
          token.
        </Li>
        <Li>
          Processes the request. Writes the audit record.
        </Li>
        <Li>
          Removes the token from the session.
        </Li>
        <Li>
          Writes the session back to Redis.
        </Li>
      </Ol>

      <P>
        Twenty requests racing through this sequence all observed the
        token as present in step 2, because none of them had reached
        step 4 yet. By the time any of them wrote back to Redis, every
        other request had already decided the token was valid and had
        kicked off the audit write.
      </P>

      <Figure
        src="/blog/redis-idempotency/race-condition.svg"
        alt="Sequence diagram showing two concurrent requests both reading the same token from Redis at T₁, both deciding it is valid at T₂, both writing duplicate audit records to the database at T₃, and both trying to invalidate the token at T₄ when it is already too late."
        caption={<>Both requests enter the “race window” before either has written the invalidation. Classic TOCTOU — the check and the write are not a single atomic step.</>}
      />

      <Callout tone="warn" title="The session is not a shared memory block">
        A fundamental assumption I was carrying from classic in-JVM
        sessions did not survive the move to Redis. The session is not a
        shared mutable object between concurrent requests — it is a
        snapshot loaded from Redis at the start of the request. Each
        request handler gets its own view. Writes race.
      </Callout>

      <H2 id="attempt-2">Attempt 2: Java locks around the critical section</H2>

      <P>
        If the problem is that concurrent requests overlap on the read-
        decide-invalidate-write path, surely the fix is to put a lock
        around it. First attempt: synchronise on the session itself.
      </P>

      <Pre lang="java">{`// Still broken — do NOT ship this.
@PostMapping("/preferences")
public ResponseEntity<?> savePreferences(
    @RequestBody PreferenceRequest body,
    HttpSession session
) {
    synchronized (session) {
        String stored = (String) session.getAttribute("preference_token");
        if (stored == null || !stored.equals(body.getIdempotencyToken())) {
            return ResponseEntity.status(409).body("Token consumed");
        }
        session.removeAttribute("preference_token");
    }
    preferenceService.save(body);
    return ResponseEntity.ok().build();
}`}</Pre>

      <P>
        This looks correct. It isn&apos;t. The problem is that{" "}
        <Code>session</Code> is not a stable Java object across requests.
        Spring Session&apos;s request filter resolves the session from
        Redis on each request — the handler may receive a different Java
        object instance each time (depending on the implementation of{" "}
        <Code>SessionRepository</Code> and the request flow), so{" "}
        <Code>synchronized(session)</Code> acquires a monitor on a
        <Em>different</Em> object each time, and no two requests actually
        contend.
      </P>

      <P>
        Even if the session <Em>was</Em> the same JVM object across
        concurrent requests on one node, we still have the real killer: the
        application is deployed across multiple nodes behind a load
        balancer. The LB routes requests to whichever node is least loaded.
        Two concurrent requests with the same token can land on different
        nodes. A JVM-level lock cannot coordinate across nodes.
      </P>

      <Figure
        src="/blog/redis-idempotency/multi-node.svg"
        alt="Two concurrent requests with the same token enter a load balancer with no sticky-session configuration. The LB routes Request A to Node 1 and Request B to Node 2. Each node holds a synchronized(session) lock inside its own JVM. Both nodes read the shared Redis session store independently."
        caption={<>Each JVM successfully <Em>locks its own</Em> session copy. Neither knows the other request exists on the sibling node, so both pass through.</>}
      />

      <Callout tone="danger" title="The three reasons Java locking fails here">
        <Ol>
          <Li>
            Spring Session resolves the session per request — the Java
            object you&apos;re locking on may not be the same instance
            another request is holding.
          </Li>
          <Li>
            Even if it were, <Code>synchronized</Code> only coordinates
            within a single JVM.
          </Li>
          <Li>
            Across nodes behind a load balancer, you need either{" "}
            <Em>sticky sessions</Em> (so every request for one session
            lands on the same node) or a distributed lock. Sticky sessions
            buy you single-node semantics; a distributed lock lives
            outside the JVM.
          </Li>
        </Ol>
      </Callout>

      <H2 id="the-detour">
        The detour: Spring Session&apos;s flush mode
      </H2>

      <P>
        Reading the Spring Session docs, I noticed{" "}
        <A href="https://docs.spring.io/spring-session/reference/api.html">
          flush mode
        </A>
        . By default, Spring Session uses{" "}
        <Code>FlushMode.ON_SAVE</Code>: session attribute changes are
        buffered and written to Redis at the end of the request. Switch
        it to <Code>FlushMode.IMMEDIATE</Code> and every{" "}
        <Code>session.setAttribute()</Code> / <Code>removeAttribute()</Code>{" "}
        call writes to Redis immediately.
      </P>

      <P>
        Promising-looking, but it doesn&apos;t solve the race on its own.
        Flush mode controls <Em>when</Em> writes are sent to Redis; it
        does not give you atomic compare-and-swap on an attribute. Two
        concurrent requests can still both read the token as present and
        then both race the invalidation write. One wins the write, both
        have already decided to process the request.
      </P>

      <P>
        What flush mode <Em>does</Em> give you is a shorter window for
        the race — if your handler reads the token, immediately
        invalidates (which flushes to Redis), and only then does the work,
        a second request arriving even a millisecond later will miss the
        token. But &ldquo;shorter window&rdquo; is not the same as{" "}
        &ldquo;no window.&rdquo; Under real load, I still saw duplicates.
      </P>

      <H2 id="the-right-distributed-answer">
        The right distributed answer: <Code>SET … NX EX</Code> on Redis
      </H2>

      <P>
        What I <Em>should</Em> have reached for from day one is a Redis
        primitive that is atomic by design:
        {" "}
        <A href="https://redis.io/commands/set/">
          <Code>SET key value NX EX ttl</Code>
        </A>
        . This sets a key only if it does not already exist, with an
        expiry. Redis guarantees atomicity across every client, every
        node, every connection pool. First request to send the command
        wins; everyone else gets back nil.
      </P>

      <Pre lang="java">{`// The distributed-correct version.
@PostMapping("/preferences")
public ResponseEntity<?> savePreferences(
    @RequestBody PreferenceRequest body
) {
    String key = "idem:preferences:" + body.getIdempotencyToken();
    // Try to claim the token atomically with a 10-minute TTL.
    Boolean claimed = redisTemplate.opsForValue()
        .setIfAbsent(key, "consumed", Duration.ofMinutes(10));

    if (!Boolean.TRUE.equals(claimed)) {
        return ResponseEntity.status(409).body("Token already consumed");
    }

    preferenceService.save(body);
    return ResponseEntity.ok().build();
}`}</Pre>

      <P>
        This is the textbook distributed-idempotency pattern. It works
        across any number of nodes with no sticky-session requirement
        because the arbitration happens in Redis, not in any JVM. If I
        were writing this post about what the solution <Em>should</Em>{" "}
        look like in a general distributed system, this would be the
        ending.
      </P>

      <H2 id="why-we-chose-in-memory">
        Why we actually chose an in-memory cache
      </H2>

      <P>
        Two reasons we went with an in-process bounded cache instead:
      </P>

      <Ol>
        <Li>
          <Strong>Sticky sessions were already a requirement.</Strong> The
          application also used Spring Session for authenticated-user
          session state, and the load balancer was already configured for
          session affinity. Given that constraint, every request for a
          given session was already landing on the same node — the
          multi-node argument for distributed arbitration disappeared.
        </Li>
        <Li>
          <Strong>The token-check runs on every request to a public
          endpoint under attack conditions.</Strong> Burning a Redis
          round-trip on every public-endpoint request felt wasteful when
          the arbitration could happen in O(1) in-process. Under a token-
          replay attack we didn&apos;t want to inflate Redis traffic too.
        </Li>
      </Ol>

      <P>
        What we needed was a concurrent, bounded, TTL-aware map of
        consumed tokens, per node, with sticky sessions pinning the race
        to a single node. That is Caffeine&apos;s wheelhouse exactly:
      </P>

      <Pre lang="java">{`import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
public class IdempotencyConfig {
    @Bean
    Cache<String, Boolean> consumedTokens() {
        return Caffeine.newBuilder()
            // Match the session timeout — a token can never outlive its session.
            .expireAfterWrite(Duration.ofMinutes(30))
            // Hard ceiling so a replay attack can't balloon the heap.
            .maximumSize(1_000)
            .build();
    }
}`}</Pre>

      <Pre lang="java">{`@PostMapping("/preferences")
public ResponseEntity<?> savePreferences(
    @RequestBody PreferenceRequest body
) {
    String token = body.getIdempotencyToken();

    // Atomic test-and-set, in-process, O(1).
    Boolean alreadyConsumed =
        consumedTokens.asMap().putIfAbsent(token, Boolean.TRUE);

    if (alreadyConsumed != null) {
        return ResponseEntity.status(409).body("Token already consumed");
    }

    preferenceService.save(body);
    return ResponseEntity.ok().build();
}`}</Pre>

      <P>
        <Code>ConcurrentHashMap.putIfAbsent</Code> is atomic within a
        JVM — the first caller inserts, every subsequent caller gets back
        the existing value. Caffeine&apos;s backing map gives us the same
        semantics plus the TTL and the hard size cap for free. Under
        twenty concurrent k6 users, one request wins the insert and
        processes; the other nineteen each see a non-null return and get
        a 409.
      </P>

      <Callout tone="insight" title="Why the maximum size matters">
        Under a replay or enumeration attack, an attacker could feed the
        endpoint thousands of fresh tokens per second. With no cap the
        in-memory map would grow until the heap exploded. With{" "}
        <Code>maximumSize(1000)</Code> Caffeine evicts the least-recently-
        inserted entries once the cap is hit. The worst case under attack
        is a slight loss of idempotency guarantees for the oldest 1,000
        tokens — not an OOM.
      </Callout>

      <Figure
        src="/blog/redis-idempotency/solutions.svg"
        alt="Two correct solutions, two different topologies. Left: Redis SETNX works atomically across every node — pick when the deployment is multi-node without sticky sessions. Right: Caffeine with sticky-session load balancing pins arbitration to a single node and avoids a Redis round-trip — pick when sticky sessions are already enforced and the extra round-trip matters."
        caption={<>The decision isn’t “Redis vs. Caffeine” — it’s a topology question. Both are correct in their own context.</>}
      />

      <H2 id="what-id-reach-for-first-next-time">
        What I&apos;d reach for first next time
      </H2>

      <P>
        If I had to design this feature again from scratch, the order of
        attempts would reverse. I would reach for{" "}
        <Code>SET … NX EX</Code> on Redis <Em>first</Em>, specifically
        because it is correct across any deployment topology — single
        node, multi-node with sticky sessions, multi-node without sticky
        sessions, horizontally autoscaling. It does one job and the job is
        atomic.
      </P>

      <P>
        I would reach for the Caffeine in-memory cache only when I had a
        specific reason to:
      </P>

      <Ul>
        <Li>
          Sticky sessions were already enforced for other reasons, so the
          multi-node correctness argument didn&apos;t apply.
        </Li>
        <Li>
          The endpoint&apos;s latency budget made a Redis round-trip
          per-check meaningful.
        </Li>
        <Li>
          The attack surface made the write-amplification to Redis a
          real cost.
        </Li>
      </Ul>

      <P>
        All three applied in this project. In most projects, only the
        first does, and <Code>SETNX</Code> is the right call.
      </P>

      <H2 id="lessons">The three things I actually took away</H2>

      <Ol>
        <Li>
          <Strong>Distributed sessions do not make a system
          distributed-safe.</Strong> Moving a classic in-JVM session store
          to Redis-backed Spring Session feels like a drop-in upgrade. It
          isn&apos;t. Code that was previously safe against concurrent
          requests on the same session (because the JVM really was sharing
          one object) is no longer safe once each request gets its own
          snapshot from Redis. Audit every pattern that read-then-wrote
          to the session.
        </Li>
        <Li>
          <Strong>Atomic primitives beat locks for distributed
          coordination.</Strong> <Code>SET NX EX</Code>,{" "}
          <Code>INCR</Code>, Lua scripts over Redis — these are atomic by
          design and work across every node. Locks (database or Redis-
          based) are a tool, but reach for atomic primitives first; they
          are cheaper to reason about and harder to deadlock.
        </Li>
        <Li>
          <Strong>Sticky sessions are a load-balancer choice with
          correctness consequences.</Strong> If a system is designed with
          the assumption of sticky routing, that assumption needs to live
          in the architecture document, not implicit in whichever LB
          config shipped. Switching off sticky sessions to improve load
          distribution could silently reintroduce the race condition this
          post describes. We have an architecture note that explicitly
          calls this out now.
        </Li>
      </Ol>

      <Callout tone="info" title="Working on something similar?">
        If you&apos;re staring at a race condition in a Spring Boot +
        Redis stack, or thinking about idempotency on a new public
        endpoint,{" "}
        <A href="/contact">get in touch</A> — happy to compare notes on a
        specific case.
      </Callout>
    </ProseBody>
  );
}
