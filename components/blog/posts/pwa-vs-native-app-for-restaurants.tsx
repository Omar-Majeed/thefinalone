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
 * Post body for /blog/pwa-vs-native-app-for-restaurants.
 * Metadata (title, description, dates, author, tags) lives in constants/blog.ts.
 */
export default function PwaVsNativeAppForRestaurants() {
  return (
    <ProseBody>
      <P>
        A restaurant owner will occasionally ask us for a mobile app. Nine
        times out of ten, what they actually want is a URL they can send by
        text — one that opens fast, has today's menu, remembers a cart
        between visits, and doesn't require anyone to download anything from
        the App Store to place an order.
      </P>

      <P>
        For <A href="/portfolio/philliez">Philliez</A>, the American-inspired
        cheesesteak spot in Chester Hill, we ended up building exactly that:
        a mobile-first Progressive Web App with an app-like bottom nav
        (Menu · Directions · Order) and the same tap-through feel a native
        app would give — but installable in one tap and shareable in a
        single link. This post is the framework we used to decide, and why
        it's the same answer for most restaurants.
      </P>

      <H2 id="what-a-restaurant-actually-needs">
        What a restaurant actually needs
      </H2>

      <P>
        Every restaurant we've built for eventually converges on the same
        four jobs the customer needs the site to do. In rough order of daily
        volume:
      </P>

      <Ol>
        <Li>
          <Strong>See the menu, right now, quickly.</Strong> Someone opened
          Google Maps, tapped through, and needs to decide in 20 seconds
          whether to keep walking or come in.
        </Li>
        <Li>
          <Strong>Order for pickup or delivery.</Strong> Usually late-night,
          usually one-handed, usually while doing something else.
        </Li>
        <Li>
          <Strong>Get directions.</Strong> Google Maps handoff, straight
          from the site.
        </Li>
        <Li>
          <Strong>Call.</Strong> Yes, still. Custom orders, catering
          enquiries, birthday reservations.
        </Li>
      </Ol>

      <P>
        Notice what's not on the list: sign in, browse push-notification
        preferences, or download 40MB of shell before the menu shows. Every
        item on that list is discoverable via a single URL — which is the
        entire pitch for a PWA over a native app.
      </P>

      <H2 id="the-decision-framework">
        The decision framework: five questions
      </H2>

      <P>
        We use the same five questions whenever a client asks about a
        &ldquo;mobile app.&rdquo; If four or more come out on the PWA side,
        we build a PWA. If four or more come out on the native side, we
        build native.
      </P>

      <Ol>
        <Li>
          <Strong>Does the app need background access to phone hardware?</Strong>{" "}
          (Camera at rest, Bluetooth, precise GPS while backgrounded,
          accelerometer while the phone's asleep.) If yes → native. For a
          restaurant, no.
        </Li>
        <Li>
          <Strong>Is there real repeat use?</Strong> If the same customer
          opens the app 3+ times a week and would care about push
          notifications — a food-ordering platform or loyalty ecosystem
          might → native app conversation starts. A single-location
          restaurant's customer opens the site once every couple of
          weeks. → PWA.
        </Li>
        <Li>
          <Strong>Is App Store discovery a growth channel?</Strong> Almost
          never for a restaurant. Their discovery channel is Google Maps
          and Instagram, both of which are URL-first. → PWA.
        </Li>
        <Li>
          <Strong>Is there a real financial argument for the ~50-70%
          revenue share on in-app purchases?</Strong> Almost never for
          margin-thin food service. → PWA.
        </Li>
        <Li>
          <Strong>Can the client afford to keep a native app updated?</Strong>{" "}
          Every iOS release breaks something. A small restaurant does not
          want to be paying an engineer to maintain two app-store binaries
          in perpetuity. → PWA.
        </Li>
      </Ol>

      <P>
        For Philliez, all five came out PWA. That's typical for a
        single-location restaurant.
      </P>

      <Callout tone="insight" title="The distribution question is the deciding one">
        If a restaurant already has a strong distribution channel that
        requires native — say, they're paying for App Store featured
        placement, or they have a real loyalty ecosystem that competes with
        DoorDash — the calculation changes. Almost none of the restaurants
        we've built for are in that situation.
      </Callout>

      <H2 id="what-a-restaurant-pwa-actually-looks-like">
        What a restaurant PWA actually looks like
      </H2>

      <P>
        A PWA is not just &ldquo;a website that opens on a phone.&rdquo; The
        design decisions that make it feel like an app are all deliberate.
        For Philliez, the pieces that mattered most:
      </P>

      <Ul>
        <Li>
          <Strong>App-style bottom nav</Strong> — three tabs, always visible
          on scroll (Menu · Directions · Order). The moment a phone user
          sees a persistent bottom bar, they stop thinking of it as
          &ldquo;a website.&rdquo;
        </Li>
        <Li>
          <Strong>One-thumb-reachable primary actions.</Strong> The
          &ldquo;Order&rdquo; button is in the bottom-right of the screen at
          all times, exactly where a right-handed user's thumb rests. The
          call button and directions button follow the same logic.
        </Li>
        <Li>
          <Strong>Installable, but not pushy.</Strong> We do not throw a
          full-screen &ldquo;install this app&rdquo; interstitial. If the
          user comes back a second time, iOS and Chrome will offer the
          &ldquo;Add to Home Screen&rdquo; prompt themselves — that's a
          native platform thing. Fighting it feels manipulative.
        </Li>
        <Li>
          <Strong>Offline-viewable menu.</Strong> The menu markdown is cached
          the first time it's loaded. Even on a dodgy connection, the
          customer sees prices.
        </Li>
        <Li>
          <Strong>Personality-forward voice.</Strong> The site opens with a
          banner reading &ldquo;⚠ Caution: Philly sauce is spicy.&rdquo;{" "}
          That is the copy that makes a phone screen feel like an app, more
          than any framework decision does.
        </Li>
      </Ul>

      <H2 id="what-you-give-up">What you give up</H2>

      <P>
        Two things, honestly, and it's worth being straight about them:
      </P>

      <Ul>
        <Li>
          <Strong>No push notifications on iOS unless the user installs the
          PWA.</Strong> Since iOS 16.4 they're possible, but only after the
          user &ldquo;Add to Home Screen&rdquo;s the site. For a restaurant
          this is fine — you'd use SMS or email for order confirmations
          anyway.
        </Li>
        <Li>
          <Strong>Less presence.</Strong> You don't show up in a phone's app
          switcher unless the user installs. For most restaurants, this
          costs almost nothing. For a food-ordering platform, it costs a
          lot.
        </Li>
      </Ul>

      <P>
        Neither of those things justifies the ongoing cost of maintaining a
        native binary in two app stores for a business that's opening
        physical doors, not selling subscriptions.
      </P>

      <H2 id="what-a-pwa-does-not-fix">What a PWA does not fix</H2>

      <P>
        A great PWA does not save a bad menu, a slow kitchen, or a website
        with 8 seconds of splash-screen animation before the customer sees
        prices. About half of the work on Philliez wasn't PWA plumbing at
        all — it was cutting page weight, making the ordering flow reachable
        in three taps, and building a brand voice that felt like the shop
        rather than a template.
      </P>

      <P>
        If you're a restaurant considering &ldquo;an app,&rdquo; the honest
        answer is almost always: you don't need one, you need a mobile
        website that <Em>feels</Em> like one. That's a PWA. And the
        difference in cost, distribution friction, and long-term maintenance
        is not close.
      </P>

      <Callout tone="info" title="Working on a similar problem?">
        If you're weighing PWA vs. native for a restaurant, retail
        storefront, or single-location service business,{" "}
        <A href="/contact">get in touch</A> — happy to talk through the
        decision framework on a specific case.
      </Callout>
    </ProseBody>
  );
}

