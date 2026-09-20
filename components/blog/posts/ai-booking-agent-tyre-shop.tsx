import {
  A,
  Callout,
  Code,
  H2,
  Li,
  Ol,
  P,
  ProseBody,
  Strong,
  Ul,
} from "@/components/blog/prose";

/**
 * Post body for /blog/ai-booking-agent-tyre-shop.
 * Metadata (title, description, dates, author, tags) lives in constants/blog.ts.
 */
export default function AiBookingAgentTyreShop() {
  return (
    <ProseBody>
      <P>
        A tyre shop's phone is louder than most offices. Between walk-ins,
        return calls, insurance quotes, and the person who wants to know if
        you can &ldquo;just check a tyre, it's making a weird noise,&rdquo;
        the front-desk person's real job is orchestration — not customer
        service. They're the last human standing between a paying job and
        chaos, and they spend all day mentally recomputing which tyre fitter
        is free, which bay is empty, and which car is still on a hoist.
      </P>

      <P>
        That's the problem <A href="/portfolio/tyre-express">Tyre Express</A>
        {" "}came to us with. Not &ldquo;we want AI.&rdquo; They said: we're
        losing bookings because the person answering the phone doesn't have
        time to check the schedule. We shipped an AI booking agent that
        ingests every appointment request, checks live technician
        availability, and auto-assigns the next-free worker — so the
        front-desk person doesn't have to.
      </P>

      <P>
        This post is the honest walkthrough: architecture, two design
        decisions that mattered more than the model choice, the cost
        breakdown, and the near-failure that changed how we build these.
      </P>

      <H2 id="the-shape-of-the-problem">The shape of the problem</H2>

      <P>
        Before touching an LLM, we sat with the shop for a day. Two patterns
        showed up in the raw booking log:
      </P>

      <Ol>
        <Li>
          <Strong>Every booking touches three data sources.</Strong> The
          customer's request (vehicle, service type, preferred window), the
          technician roster (who's on shift, who's certified for what), and
          the bay schedule (what's physically in the workshop right now).
          Getting any one wrong wastes 20 minutes.
        </Li>
        <Li>
          <Strong>The person handling the phone is not the bottleneck.</Strong>{" "}
          They're just the visible part. The real bottleneck is the mental
          model of &ldquo;who's free right now.&rdquo; When it lives only in
          one head, everything queues behind that head.
        </Li>
      </Ol>

      <P>
        Those two observations shaped every architectural decision that
        followed.
      </P>

      <H2 id="architecture">Architecture, in one paragraph</H2>

      <P>
        The system is deliberately boring. An LLM agent (behind a{" "}
        <Code>/api/booking-agent</Code> route) takes a natural-language
        request — from the website form, phone-call transcript, or SMS — and
        classifies intent. It calls out to three deterministic tools:{" "}
        <Code>get_availability(technicianId, window)</Code>,{" "}
        <Code>get_bay_status()</Code>, and{" "}
        <Code>reserve_slot(technicianId, bayId, window, customerId)</Code>.
        Those tools hit Postgres directly; no other AI in the loop. The
        agent's only job is to translate messy customer input into a
        proposed booking, negotiate windows if the ideal slot is full, and
        confirm with the customer before writing to the database.
      </P>

      <Callout tone="insight" title="The 'boring core' rule">
        We use the LLM to bridge the messy edges (natural-language input,
        friendly confirmations) and pure deterministic code for the actual
        booking mechanics. If the model hallucinates a technician who
        doesn't exist, the tool call returns an error and the agent has to
        try again. The database is the source of truth. The model is
        never allowed to be the source of truth.
      </Callout>

      <H2 id="design-decision-1">
        Design decision 1: auto-assign vs. queue-first
      </H2>

      <P>
        The first big fork was: when a booking comes in, do we{" "}
        <Strong>auto-assign it to a specific technician</Strong>, or do we
        drop it into a queue that any technician can pick up later?
      </P>

      <P>
        Queue-first is what most scheduling SaaS does. It's simpler to build,
        it doesn't need real-time roster data, and it feels safe. But the
        pattern we saw at Tyre Express was that the moment a job was
        &ldquo;in the queue,&rdquo; it became invisible — nobody owned it,
        so nobody chased the customer if there was a problem.
      </P>

      <P>
        Auto-assign is harder to build (you need live roster and bay data)
        but it maps directly to how the shop actually operates: one job, one
        owner, one accountable person. We went auto-assign. Every booking
        has a technician name attached the moment the customer confirms it.
      </P>

      <Callout tone="warn" title="What we learned the hard way">
        Auto-assign needs an override. Once a job has a name on it, changing
        that name has to feel low-cost, or the shop just won't do it. Our
        v1 didn't have a good override UI. Bookings got stuck on
        technicians who called in sick. We built a
        &ldquo;reassign&rdquo; endpoint in week two.
      </Callout>

      <H2 id="design-decision-2">
        Design decision 2: confirm-then-write, not write-then-confirm
      </H2>

      <P>
        Most agent frameworks default to &ldquo;take an action, then tell the
        user.&rdquo; That is a bad pattern for anything that touches money
        or a physical schedule. If the model gets the time wrong once, you
        have a technician standing around at 8am for a customer who thought
        they booked 3pm.
      </P>

      <P>
        We invert it. The agent's only booking-side tool is{" "}
        <Code>propose_slot()</Code>, which writes to a temporary{" "}
        <Code>proposed_bookings</Code> table with a 10-minute TTL. The
        customer sees the proposal in a confirmation SMS and either replies
        &ldquo;yes&rdquo; or picks a different window. Only on explicit
        confirmation does the agent call{" "}
        <Code>reserve_slot()</Code>, which promotes the proposal into a real
        booking.
      </P>

      <P>
        This adds one round-trip. It also single-handedly killed almost
        every hallucination-related booking error. If the model got the time
        wrong, the customer just said no.
      </P>

      <H2 id="cost">What it actually costs</H2>

      <P>
        The economics matter for small businesses. A single booking
        conversation runs 6-12 LLM turns depending on how much the
        customer negotiates. Averaging across a month of production
        traffic:
      </P>

      <Ul>
        <Li>
          <Strong>Model:</Strong> Claude Haiku for classification + tool
          use; Claude Sonnet only for edge cases the classifier flags as
          ambiguous. About 90% of bookings never touch the more expensive
          model.
        </Li>
        <Li>
          <Strong>Tokens per booking:</Strong> ~3,500 input + ~800 output on
          average.
        </Li>
        <Li>
          <Strong>Cost per completed booking:</Strong> under 2 US cents.
        </Li>
        <Li>
          <Strong>Cost per abandoned conversation:</Strong> under 0.5 cents.
          These are frequent — someone starts booking, gets distracted, comes
          back later.
        </Li>
      </Ul>

      <P>
        The whole agent bill is a rounding error against the labour it
        replaces. The real cost is engineering time: the tools, the
        override UI, the SMS integration, and the observability that lets
        the shop trust the thing.
      </P>

      <H2 id="what-almost-broke-it">What almost broke it</H2>

      <P>
        Two weeks in, we hit a race condition that could have cost a
        weekend of bookings. The <Code>propose_slot()</Code> table wasn't
        transactionally isolated from the live availability check. Two
        customers, one slot, the model happily proposed both. We caught it
        in staging before it hit production, but only because we'd wired a
        Sentry alert on any{" "}
        <Code>reserve_slot()</Code> call that failed with a unique-constraint
        violation.
      </P>

      <P>
        The fix was mechanical (wrap the availability check +
        <Code>propose_slot()</Code> in a serialisable transaction, use a
        Postgres advisory lock for the technician-window key). The lesson
        was not: it was that observability has to ship on day one, not
        &ldquo;when we have time.&rdquo; If we hadn't been listening for
        constraint violations, that bug would have surfaced as a customer
        showing up to a locked shop.
      </P>

      <Callout tone="insight" title="Ship the alerts before the feature">
        For any agent that mutates real-world state, we now write the
        Sentry / OTel alerts before we write the agent tool. If a call
        fails, someone with a pager knows about it inside 60 seconds.
      </Callout>

      <H2 id="what-we-would-do-differently">What we'd do differently</H2>

      <Ol>
        <Li>
          <Strong>Model choice is the last decision, not the first.</Strong>{" "}
          We spent an afternoon debating Claude vs. GPT vs. a fine-tuned
          smaller model. In hindsight that afternoon should have gone to
          the override UI. The model is fungible; the workflow around it
          isn't.
        </Li>
        <Li>
          <Strong>Ship the human-visible dashboard first.</Strong> The shop
          used the agent much more confidently once they could see every
          booking the agent had made in the last 24 hours, with the reasoning
          trace attached. That took us four days and paid for itself in the
          first week.
        </Li>
        <Li>
          <Strong>Propose-then-confirm should be the default pattern for
          anything money-adjacent.</Strong> We're using the same pattern on
          two newer builds now.
        </Li>
      </Ol>

      <H2 id="what-this-suits">Who this pattern suits</H2>

      <P>
        Not every service business needs an LLM agent for scheduling. If
        your bookings are already going through a decent SaaS calendar and
        the front desk isn't underwater, adding an agent will burn engineer
        time for marginal gain. Where this pattern earns its keep is a
        business that meets all three of these:
      </P>

      <Ul>
        <Li>
          Bookings arrive through <Strong>multiple channels</Strong> — phone,
          website form, SMS, walk-ins — and each channel currently needs its
          own manual handling.
        </Li>
        <Li>
          Assignment is <Strong>non-trivial</Strong>: technicians have
          certifications, bays have capacity, or jobs have different time
          budgets. A calendar with 30-minute slots can't capture it.
        </Li>
        <Li>
          The person handling requests is <Strong>losing bookings</Strong> —
          not just running late, but customers hanging up because nobody
          picked up.
        </Li>
      </Ul>

      <P>
        If two of those three apply, an agent will pay for itself before the
        end of the month. If only one applies, buy a better calendar.
      </P>
    </ProseBody>
  );
}
