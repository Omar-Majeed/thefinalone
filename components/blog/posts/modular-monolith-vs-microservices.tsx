import {
  A,
  Callout,
  Em,
  H2,
  Li,
  Ol,
  P,
  ProseBody,
  Strong,
  Ul,
} from "@/components/blog/prose";

/**
 * Post body for /blog/modular-monolith-vs-microservices.
 * Metadata (title, description, dates, author, tags) lives in constants/blog.ts.
 */
export default function ModularMonolithVsMicroservices() {
  return (
    <ProseBody>
      <P>
        At some point every engineering team working on an older monolith
        hits the same meeting. Someone — usually with a conference talk
        bookmarked — proposes breaking the app into microservices. The pitch
        is familiar: independent deployments, independent scaling, teams
        unblocked from each other, the end of merge conflicts.
      </P>

      <P>
        Most of those projects fail. Not because microservices are
        inherently wrong, but because they solve a problem the team doesn't
        actually have — and introduce three or four problems the team was
        not ready for. For nine out of ten organisations enhancing an older
        monolith, the correct next step is not microservices. It's a{" "}
        <Strong>modular monolith</Strong>: the same single deployable, but
        internally structured so each business capability lives in its own
        isolated module with its own schema, its own API boundary, and no
        back-door imports from other modules.
      </P>

      <P>
        This post is the decision framework we use with clients considering
        the move, the hidden costs of microservices nobody warns you about,
        and why a modular monolith is almost always the better next step
        when you're coming from a classic monolith.
      </P>

      <H2 id="what-each-actually-means">
        What each architecture actually means
      </H2>

      <P>
        The terminology matters here because every team means something
        slightly different by &ldquo;monolith.&rdquo; Three practical
        definitions:
      </P>

      <Ul>
        <Li>
          <Strong>Classic monolith:</Strong> one codebase, one deployable,
          one database schema. Business capabilities are entangled —
          Billing can read Order tables directly, Customer logic lives in
          four packages, cross-cutting changes touch half the code. This
          is what most &ldquo;legacy&rdquo; applications are.
        </Li>
        <Li>
          <Strong>Modular monolith:</Strong> one codebase, one deployable,
          but internally partitioned. Each module (Billing, Catalogue,
          Order, Shipping) owns its own schema or at least its own tables,
          its own public API, and <Em>cannot</Em> be called by other
          modules except through that API. The compiler enforces the
          boundaries. Deployed as a single process.
        </Li>
        <Li>
          <Strong>Microservices:</Strong> each module is its own deployable,
          running in its own process (often its own container), owning its
          own database, communicating over the network — usually HTTP or a
          message broker. Each service has an independent release cadence.
        </Li>
      </Ul>

      <P>
        The jump from classic monolith to modular monolith is a change of
        discipline inside a single codebase. The jump from modular monolith
        to microservices is a change of operational model — and that is
        where the cost sits.
      </P>

      <H2 id="what-microservices-actually-solve">
        What microservices actually solve
      </H2>

      <P>
        Microservices solve exactly three problems. If you don't have one
        of these, you don't have a microservices problem:
      </P>

      <Ol>
        <Li>
          <Strong>Independent scaling with wildly different load
          profiles.</Strong> One capability is being hammered by background
          jobs; another is CPU-bound at specific times of day; another is
          mostly idle. Running them in one process means you're over-
          provisioning for the loudest one. Separate services let each
          scale on its own.
        </Li>
        <Li>
          <Strong>Independent release cadence between teams that genuinely
          can't coordinate.</Strong> Two teams, both wanting to ship
          multiple times a day, both touching code adjacent to each other.
          Monoliths force the release train. Microservices let each team
          deploy on its own schedule.
        </Li>
        <Li>
          <Strong>Hard isolation of blast radius for regulated or safety-
          critical paths.</Strong> One capability must never, under any
          failure, affect another — payment processing, say, has to keep
          running if the recommendations service hallucinates and OOMs.
          Separate processes give you that isolation at the OS level.
        </Li>
      </Ol>

      <P>
        None of those is a problem a 30-person engineering team on a
        single product usually has. Most teams considering microservices
        actually want: cleaner module boundaries, faster CI, fewer merge
        conflicts, less coupling between features. All of those are
        achievable in a modular monolith — without the cost that comes
        next.
      </P>

      <H2 id="hidden-costs">The hidden costs of microservices</H2>

      <P>
        The microservices pitch is loud. The cost side is quieter and shows
        up later. Four costs that reliably ambush small-to-mid teams:
      </P>

      <H2 id="distributed-state">1. Distributed state gets hard, fast</H2>

      <P>
        In a monolith, a database transaction gives you atomicity for free:
        either both the order and the audit record are written, or neither
        is. Split those into two services and you now need either a two-
        phase commit (usually a bad idea), an eventual-consistency pattern
        (saga, outbox), or acceptance that transient inconsistencies will
        happen and your UI needs to tolerate them. All three are
        engineering projects of their own.
      </P>

      <H2 id="observability-cost">
        2. Observability becomes a product you have to buy or build
      </H2>

      <P>
        One stack trace used to tell you what happened. Now you need
        distributed tracing (OpenTelemetry, Jaeger, Honeycomb) to answer
        &ldquo;where did this request actually spend its time?&rdquo; A
        failed request is now five services deep and three message brokers
        across. The team that was happy with CloudWatch is now spending a
        quarter learning Tempo. The dashboard-and-alerts work is non-
        trivial — it is itself a backlog, forever.
      </P>

      <H2 id="deployment-cost">3. Deployment surface area multiplies</H2>

      <P>
        Twelve services means twelve pipelines, twelve sets of secrets,
        twelve rollback stories, twelve places a container image can go
        wrong. The team that was deploying once a day is now spending
        meaningful time on infra automation that doesn't ship product
        value. A single DevOps person becomes mandatory where before you
        had none.
      </P>

      <H2 id="network-reality">
        4. The network is not a function call
      </H2>

      <P>
        Every internal call that used to be a method invocation now
        traverses TCP, with retry policies, timeouts, circuit breakers,
        and the possibility of transient failure. Code that was fast and
        reliable becomes slower and more fragile unless you invest in
        resilience patterns across every service boundary. The{" "}
        <A href="https://en.wikipedia.org/wiki/Fallacies_of_distributed_computing">
          Fallacies of Distributed Computing
        </A>
        {" "}are called fallacies for a reason: every one of them bites a
        team that didn't take them seriously enough.
      </P>

      <Callout tone="warn" title="The cost gets paid in people, not just time">
        Microservices add roles you probably didn't budget for: platform
        engineer, SRE, release manager. In a monolith those roles are a
        half-time task shared across the team. In a microservices
        architecture they become full-time jobs.
      </Callout>

      <H2 id="modular-monolith">
        The modular monolith: most of the win, almost none of the cost
      </H2>

      <P>
        A modular monolith is what you get when you take the discipline
        the microservices pitch promises — strict boundaries, independent
        schemas, no back-door coupling — and apply it <Em>inside</Em> a
        single deployable.
      </P>

      <P>
        Concretely, in a Spring Boot application that means:
      </P>

      <Ul>
        <Li>
          Each business capability (Billing, Catalogue, Order, Shipping)
          is its own Maven/Gradle module, with its own package root.
        </Li>
        <Li>
          Modules declare a <Em>public API</Em> package — the only package
          other modules may import. Everything else is internal. Build
          tooling (Spring Modulith, ArchUnit, jMolecules, or a Maven
          enforcer rule) fails the build if someone imports an internal
          class from another module.
        </Li>
        <Li>
          Each module owns its tables. No module reads another module's
          tables directly — it calls the owning module's service API, same
          as a microservice would. The database happens to be shared, but
          ownership is strict.
        </Li>
        <Li>
          Cross-module events are published through an in-process event
          bus (Spring Events, or a lightweight transactional outbox) so
          that moving one module out later is a change of transport, not
          a change of code shape.
        </Li>
      </Ul>

      <P>
        What you get: cleaner boundaries, faster onboarding (new engineers
        can learn one module without reading the whole codebase), and the
        option to extract a service later without a rewrite. What you
        avoid: distributed state, observability sprawl, deployment
        surface, network fragility.
      </P>

      <Callout tone="insight" title="The migration path that actually works">
        We've found the move from classic monolith to modular monolith to
        selective microservices is far more successful than classic
        monolith direct to microservices. Each step is incremental, each
        step delivers value, and each step gives the team a chance to
        decide if the next step is actually needed. Most teams stop at
        &ldquo;modular monolith&rdquo; because the problems they were
        trying to solve have already been solved by then.
      </Callout>

      <H2 id="decision-framework">
        The decision framework
      </H2>

      <P>
        We go through this list with every team considering the move. If
        two or more criteria firmly land on the microservices side,
        microservices start being worth the price. Otherwise, modular
        monolith wins.
      </P>

      <Ol>
        <Li>
          <Strong>Deployment frequency per team:</Strong> If every team is
          deploying multiple times per day and they're being blocked by
          each other's commits → microservices starts making sense. If
          deployments are weekly or less → modular monolith is enough.
        </Li>
        <Li>
          <Strong>Load profile variance:</Strong> If one module needs 10×
          the horizontal scaling of another, and that gap is widening →
          microservices makes sense. If scaling needs are roughly
          uniform → modular monolith is enough.
        </Li>
        <Li>
          <Strong>Team structure:</Strong> If you have independent teams
          with independent product roadmaps and separate stakeholders →
          microservices maps to the org chart. If a single team owns
          multiple modules → the overhead cost of microservices has no
          organisational dividend.
        </Li>
        <Li>
          <Strong>Blast-radius isolation needs:</Strong> If one capability
          genuinely must keep running even if others fail (payments,
          auth) → that specific capability earns its own service.
          Everything else stays in the monolith.
        </Li>
        <Li>
          <Strong>Operational maturity:</Strong> If the team already runs
          distributed systems well (traces, dashboards, on-call rotation,
          incident reviews) → microservices is affordable. If they're
          still growing into those practices → add them to the modular
          monolith first.
        </Li>
      </Ol>

      <H2 id="migrating-from-an-older-monolith">
        Migrating from an older monolith
      </H2>

      <P>
        If you're staring at a Struts 2 or an older Spring MVC
        application and thinking about the next decade — the move is
        almost never to microservices directly. It's to a modular monolith
        on a current framework. That migration is itself a project, but
        it's a project that delivers value incrementally and does not
        require you to also become an SRE team at the same time.
      </P>

      <P>
        The pattern we've shipped multiple times:
      </P>

      <Ol>
        <Li>
          Carve out one module at a time, Strangler-style. New capability
          goes into the new modular codebase; old capability keeps
          running until it's migrated.
        </Li>
        <Li>
          Enforce module boundaries from day one. Even if there are only
          two modules at first, make the build fail on cross-module
          internal imports.
        </Li>
        <Li>
          Every module owns its schema. No shared tables between modules.
          If two modules need the same data, one of them owns it and the
          other calls the API.
        </Li>
        <Li>
          Introduce an in-process event bus early. Later, if you need to
          extract a module into a service, the event-based coupling is
          already in place and the extraction is mostly a transport
          swap.
        </Li>
      </Ol>

      <P>
        At the end of that migration you have a system that most of the
        value microservices advocates promised — bounded contexts, team
        autonomy, independent evolution of modules — without having
        signed up for twelve pipelines and a tracing stack.
      </P>

      <H2 id="when-microservices-actually-win">
        When microservices actually win
      </H2>

      <P>
        To be fair to the architecture: microservices are the right call
        for very specific contexts. We've shipped microservices for a
        payment platform where blast-radius isolation was a compliance
        requirement, and for a product with wildly asymmetric scaling
        between the ML inference path and the rest. In both cases the
        team already had the operational maturity to absorb the cost.
      </P>

      <P>
        What we don't do is reach for microservices as the default. The
        default is modular monolith until the system demonstrates it has
        outgrown it. Most systems never do.
      </P>

      <Callout tone="info" title="Working on an older monolith?">
        If you're thinking about the next five years of an application
        that's showing its age, the right conversation isn't
        &ldquo;monolith vs microservices.&rdquo; It's{" "}
        <A href="/contact">
          what the modular target architecture looks like for your specific
          domain, and how to get there without rewriting everything at
          once
        </A>
        .
      </Callout>
    </ProseBody>
  );
}
