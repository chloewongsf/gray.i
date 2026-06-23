import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const lenses = [
  "Trust & Reputation",
  "Cultural Relevance",
  "Behavior Change",
  "Creative Risk",
];

const LENS_SECTIONS = {
  "Trust & Reputation":  ["unpacked", "skepticism", "watchouts", "validate"],
  "Cultural Relevance":  ["opportunity", "personas", "activations"],
  "Behavior Change":     ["unpacked", "start", "routes", "validate"],
  "Creative Risk":       ["skepticism", "routes", "watchouts"],
};

const DISCLAIMER =
  "This case file is based on a piece of public Grayling project work, used as sample material. Gray.i Briefs is a prototype for an AI-assisted strategy workflow: generate a first-pass breakdown, then use human judgment to sharpen what matters. It is not a critique or recreation of Grayling's final work.";

const briefs = [
  {
    id: "goethe-genz",
    number: "01",
    title: "Goethe-Institut: German & Gen Z",
    tag: "Culture / Youth / Public Affairs",
    color: { bg: "#fac8c4", tab: "#a86860" },
    source: "Based on public Grayling project work — used as sample input.",
    client:
      "The Goethe-Institut wants to improve the perception of the German language among Gen Z audiences in Poland and inspire more young people to choose German as a foreign language.",
    surface: "Make German feel more appealing to Polish Gen Z.",
    firstQuestions: [
      "Why is German not currently appealing?",
      "Is the barrier difficulty, school association, cultural image, lack of emotional relevance, or competition from other languages?",
      "What languages do Polish teens choose instead, and what do those languages seem to promise?",
      "What parts of German culture already intersect with their interests?",
      "Where does German feel useful but not exciting?",
    ],
    researchAreas: [
      "Youth language-choice motivations.",
      "Polish Gen Z media habits.",
      "Associations with Germany and German culture.",
      "Language-learning content on TikTok and Instagram.",
      "Music, fashion, design, ecology, and technology communities.",
      "Existing Goethe-Institut perception and channel presence.",
    ],
    tension:
      "Young people may not be rejecting German itself — more likely, they're rejecting how it gets presented. School, difficulty, obligation. Not a language connected to anything they actually follow.",
    opportunity:
      'Move German from “a subject I have to study” to “a language that gives me access to things I already care about.”',
    skepticism: [
      "Why would German matter to me?",
      "Is this just school trying to make something boring sound cool?",
      "Does this connect to my actual interests, or is it just another education campaign?",
    ],
    personas: [
      {
        name: "The Passion-Led Learner",
        description:
          "Doesn't choose based only on practicality. Needs to feel that the language connects to something they already care about.",
      },
      {
        name: "The School-Skeptical Student",
        description: "Rejects anything that feels like homework disguised as inspiration.",
      },
      {
        name: "The Future-Minded Explorer",
        description:
          "Responds to travel, independence, international opportunity, and career mobility.",
      },
    ],
    routes: [
      {
        name: "German as access to passions",
        description:
          "Connect the language to music, fashion, design, ecology, technology — the things Gen Z already follows. German becomes a way into those worlds.",
      },
      {
        name: "German beyond the classroom",
        description:
          "Show German as something you'd encounter outside school — in music, media, travel, jobs. What matters is where it takes you.",
      },
      {
        name: "Borrow credibility from those who have it",
        description:
          "An institution can't manufacture youth-nativeness on its own. Collaborate with platforms, creators, or communities that already have trust — and let them carry the message.",
      },
    ],
    activations: [
      'Creator-led “things I didn’t know were connected to German” videos.',
      "A youth media takeover or language remix moment.",
      "OOH placing German phrases inside music, fashion, and design contexts.",
      "A website or interactive hub arranged around what people already care about.",
      "Social content that puts German inside worlds people actually explore.",
    ],
    watchouts: [
      "Don't make it feel like adults trying to make school cool.",
      "Don't reduce Gen Z to TikTok.",
      "Don't make German feel merely practical but emotionally irrelevant.",
      "Don't let the institution's voice overpower the audience's own language.",
    ],
    validate: [
      "Which passion areas actually change perception?",
      "Which media partners have real trust with this audience?",
      "What language associations are hardest to shift?",
      "What does success actually mean here — awareness, attitude, sign-ups, or cultural credibility?",
    ],
    rationale:
      "I have been in a language class every year since kindergarten — the only break was my sophomore year of college, and then I took French again junior year. So thinking about why someone would or wouldn't choose a language felt personal. The class project angle helped too.",
    strategistEssay: {
      angle: "My angle: culture travels before language",
      body: [
        "I keep thinking about how language is not always the first thing that travels. Sometimes it is a gesture, a pose, a player, a song, a meme, a food, a club, a style.",
        "In my Information Visualization class at Parsons Paris, we were tasked to work on a sample RFP about spreading British culture globally, and my first thought was football. Not because football explains Britain perfectly, but because players already carry culture across countries without needing to translate it. Cole Palmer's 'Cold' Palmer celebration, the 67 hand motions that originated from a song & a LaMelo Ball video edit, or the way the dab traveled through Cam Newton, becomes readable almost immediately. Kids copy it before they know the full context.",
        "That feels relevant here. If the brief is about making German feel closer to young people, I would not only ask how to make German sound useful or cool. I would ask what parts of German culture already travel without translation. What people, gestures, sounds, rituals, clubs, creators, foods, objects, or internet references already make Germany feel present in everyday life?",
        "The more useful question might be: where is Germany already showing up, and how can the language become connected to that?",
      ],
      lookInto: "football, music scenes, creators, fashion references, design objects, food rituals, internet jokes, travel dreams, school associations, and anything young people already copy or recognize before anyone explains it.",
    },
    lensInsights: {
      "Trust & Reputation":
        "The Goethe-Institut isn't untrustworthy — but it risks feeling out of touch. The question isn't whether people believe the institution, it's whether they care about it.",
      "Cultural Relevance":
        "There are already places where German overlaps with things Gen Z cares about. The brief is about surfacing them.",
      "Behavior Change":
        "Picking a language is more about identity than practicality. German just doesn't feel like it belongs in the life Gen Z is building.",
      "Creative Risk":
        "The easiest way to fail here is to make it feel like adults trying to make school cool. Gen Z will spot it immediately.",
    },
  },
  {
    id: "lumo-rail",
    number: "02",
    title: "Lumo: Low-Cost, Low-Carbon Rail",
    tag: "Launch / Sustainability / Behavior Change",
    color: { bg: "#f5c49a", tab: "#9a6030" },
    source: "Based on public Grayling project work — used as sample input.",
    client:
      "Lumo is launching as a new electric rail operator between London and Scotland. The company needs to persuade travelers who might normally fly to consider rail instead, while building credibility with passengers, media, government, and political stakeholders.",
    surface: "Launch a new rail brand and convince people to take the train instead of flying.",
    firstQuestions: [
      "Why are people currently choosing air over rail for this journey?",
      "Is the barrier price, speed, convenience, habit, reliability, or perception?",
      "What makes a new train operator feel trustworthy before anyone has used it?",
      "How do you speak to consumers and political stakeholders in the same campaign?",
      "How do you make sustainability persuasive without making it feel like a sacrifice?",
    ],
    researchAreas: [
      "Train vs. flight decision journeys.",
      "Price comparison behavior.",
      "Consumer perceptions of rail reliability.",
      "Pandemic-era travel hesitation.",
      "Climate-conscious travel discourse.",
      "Political and media narratives around rail infrastructure.",
      "Regional pride and city-to-city travel behavior.",
      "Customer service pain points in rail.",
    ],
    tension:
      "Agreeing that the train is greener doesn't mean people book a ticket. To actually switch from flying, it also has to feel cheaper, more convenient, and reliable enough to trust. Sustainability alone won't do it.",
    opportunity:
      "Make the greener option feel like the sensible one — the decision that also happens to be cheaper.",
    skepticism: [
      "Is this actually cheaper?",
      "Will it be reliable?",
      "Why should I try a new operator I've never heard of?",
      "Is the low-carbon claim meaningful or just branding?",
      "Will taking the train be more hassle than flying?",
    ],
    personas: [
      {
        name: "The Price-First Traveler",
        description: "Open to greener travel, but only if the value is immediate and clear.",
      },
      {
        name: "The Climate-Conscious Pragmatist",
        description: "Wants to make better choices, but not if the alternative feels harder.",
      },
      {
        name: "The Habitual Flyer",
        description: "Defaults to air travel and needs a reason strong enough to break the routine.",
      },
      {
        name: "The Political / Stakeholder Audience",
        description:
          "Needs proof that the project supports broader transport, climate, and infrastructure goals.",
      },
    ],
    routes: [
      {
        name: "Start with price and convenience",
        description:
          "Put the practical case first — price, comfort, ease. Let sustainability be what people notice second.",
      },
      {
        name: "Price and carbon as one message",
        description:
          "Don't split the value proposition. Cheaper and greener together is a stronger case than either alone.",
      },
      {
        name: "Earn trust through experience",
        description:
          "Use launch events, media rides, stakeholder trips, and real passenger content to let people see the service before they're asked to believe the claims.",
      },
      {
        name: "Make rail feel like the obvious choice",
        description:
          "Make Lumo feel like the default option for this journey — the train that already makes sense, before anyone has to weigh up the environmental angle.",
      },
    ],
    activations: [
      "A cost-and-carbon comparison tool.",
      "Launch journey with media, politicians, creators, and passengers.",
      "Real-time content showing the onboard experience.",
      "Stakeholder briefing kit on rail's role in climate and infrastructure.",
      "Regional press stories around local access, affordability, and convenience.",
      'Passenger "first journey" storytelling.',
    ],
    watchouts: [
      "Don't make sustainability sound preachy.",
      "Don't overpromise convenience before trust exists.",
      "Don't ignore pandemic-era travel hesitation.",
      "Don't focus only on consumers when political stakeholders also shape credibility.",
      "Don't let the campaign feel like a transport ad when the deeper challenge is habit change.",
    ],
    validate: [
      "Which claim lands hardest: price, climate, comfort, convenience, or novelty?",
      "What would actually make habitual flyers switch?",
      "What proof points build trust fastest for a brand nobody's heard of?",
      "Which stakeholders could legitimize the launch?",
      "What questions need to be answered before someone buys a ticket?",
    ],
    rationale:
      "I genuinely care about this one. I worked on a transit access campaign in San Francisco and I identify as an urbanist. The question of how to make rail feel like the obvious choice is something I think about anyway.",
    strategistEssay: {
      angle: "My angle: make the train feel like the obvious choice",
      body: [
        "This one connects pretty directly to how I already think about transit. I worked on Free Muni for All Youth in San Francisco, and I care a lot about transit access and urbanism. To me, trains are not just a lower-carbon version of planes. They change the way a trip feels. You can look out the window, see the places you are moving through, and feel more connected to the actual journey instead of being sealed off above it.",
        "At the same time, I completely get why people fly. Planes are usually faster, and people are not wrong for choosing the option that feels most efficient. So I would not approach this like people just need to be convinced that trains are better. I would approach it like the train has to remove enough practical barriers for people to choose what they might already prefer.",
        "If the train were the same price, similar timing, and easy to book, I would choose it over a plane almost every time. So the strategy question becomes: how do we make rail feel less like a compromise and more like the obvious choice?",
        "For me, the opportunity is a better way to move: cheaper, greener, more scenic, less airport-brained, and more connected to the trip itself.",
        "It's not really about getting people to believe that trains are morally better. Rather, they need the practical barriers lowered enough that the emotional benefits can actually matter.",
      ],
    },
    lensInsights: {
      "Trust & Reputation":
        "People have never heard of Lumo. Trust won't come from messaging — it'll come from seeing the thing work.",
      "Cultural Relevance":
        "There's a version of this campaign that feels smug. The brief is to make sustainable travel feel practical — something that earns its own argument without leaning on virtue.",
      "Behavior Change":
        "Agreement doesn't change a booking habit. People need a concrete reason that outweighs the convenience of what they already do.",
      "Creative Risk":
        "Both 'be greener' and 'we're new and exciting' are easy to scroll past. The brief is about making the switch feel like common sense.",
    },
  },
  {
    id: "primark-cee",
    number: "03",
    title: "Primark: Brand Identity in CEE",
    tag: "Fashion / Regional Expansion / Brand Trust",
    color: { bg: "#f0e898", tab: "#908020" },
    source: "Based on public Grayling project work — used as sample input.",
    client:
      "Primark is expanding across Central and Eastern Europe and needs to build a positive, recognizable brand identity in new markets while communicating affordability, style, and more sustainable choices in a way that earns consumer trust.",
    surface: "Build awareness and positive perception for Primark across CEE markets.",
    firstQuestions: [
      "What does Primark already mean to people in these markets, if anything?",
      "Is the strongest entry point price, fashion, access, store experience, sustainability, or novelty?",
      "How do you build excitement around store openings without making the brand feel purely transactional?",
      "How skeptical are consumers about affordable fashion brands making sustainability claims?",
      "What needs to be consistent across CEE, and what needs to feel locally specific?",
    ],
    researchAreas: [
      "Consumer perception of Primark in each market.",
      "Affordable fashion discourse.",
      "Sustainability skepticism and greenwashing concerns.",
      "Local influencer ecosystems.",
      "Retail launch behavior and store-opening hype.",
      "Competitor positioning from H&M, Zara, Reserved, Sinsay, and C&A.",
      "Fashion content on TikTok and Instagram across Poland, Czech Republic, Slovakia, Romania, and Hungary.",
      "Local media narratives around retail, affordability, and sustainability.",
    ],
    tension:
      "Cheap and cheerful gets people through the door. But a brand people come back to — and talk about — needs to feel like more than a good deal. The price is the hook; the rest has to earn it.",
    opportunity:
      "Make Primark feel like it was always going to be here.",
    skepticism: [
      "Is this just cheap fast fashion?",
      "What does 'more sustainable' actually mean here?",
      "Why should I trust a new international retailer?",
      "Will this feel relevant to my local style and culture, or just imported?",
      "Is the hype real, or is it just a store opening?",
    ],
    personas: [
      {
        name: "The Value-Seeking Fashion Shopper",
        description:
          "Wants style and affordability, but still wants the brand to feel current and worth talking about.",
      },
      {
        name: "The Sustainability-Skeptical Consumer",
        description:
          "Doesn't reject affordable fashion outright, but needs something specific before accepting responsibility claims.",
      },
      {
        name: "The Local Style Interpreter",
        description:
          "Responds when a global brand has done the work to feel genuinely local.",
      },
      {
        name: "The Opening-Day Participant",
        description:
          "Shows up early, posts about it, and treats the opening like something worth being part of.",
      },
    ],
    routes: [
      {
        name: "Make affordable feel desirable",
        description:
          "Don't open with the price tag. Connect affordability to style, access, and things people are genuinely excited about.",
      },
      {
        name: "Earn trust with specifics",
        description:
          "If sustainability is part of the brand story, make the claims concrete and visible. Vague responsibility language does more damage than saying nothing.",
      },
      {
        name: "Adapt locally, stay recognizable",
        description:
          "Pair the global brand with local creators and references in each market. Poland and Romania are different audiences — the campaign should reflect that.",
      },
      {
        name: "Store openings as actual moments",
        description:
          "A store opening can be more than a retail announcement. Build anticipation beforehand, give people early access, and make it feel like something worth going to.",
      },
    ],
    activations: [
      'Pre-opening "first look" events for journalists, creators, and local style voices.',
      "Creator-led styling challenges around affordability and self-expression.",
      'Market-specific "how people actually shop here" social content.',
      "A sustainability proof-point explainer that avoids vague responsibility language.",
      "Local media stories around access, jobs, retail energy, and fashion culture.",
      'A regional "Primark in CEE" narrative showing momentum across markets while keeping local specificity.',
    ],
    watchouts: [
      "Don't let sustainability language feel vague or defensive.",
      "Don't make affordability feel like the whole identity.",
      "Don't treat CEE as one uniform audience.",
      "Don't over-rely on influencer hype without a trust-building layer.",
      "Don't make the brand feel imported without any local interpretation.",
    ],
    validate: [
      "Which associations matter most in each market: price, style, sustainability, novelty, or store experience?",
      "What sustainability claims do consumers actually understand or believe?",
      "Which creators have real trust versus just reach?",
      "How should Primark's tone flex by country while staying consistent?",
      "What turns a store opening from a retail event into something people remember?",
    ],
    rationale:
      "I actually shop at Primark, and I worked on a creative direction project for Etro that asked a similar question about what a brand should hold onto as it changes. Felt like familiar territory.",
    strategistEssay: {
      angle: "My angle: what should the brand keep as it enters a new market?",
      body: [
        "I actually shop at Primark, so I do not think about the brand only as affordable fashion. The appeal is also the store experience — easy, low-pressure, fun to browse, and occasionally you find something unexpectedly good. That matters because if Primark enters a new market and only leads with price, the brand starts to feel flat.",
        "This reminds me of a creative direction project I did for Etro, even though the brands are completely different. With Etro, I was thinking about what happens when a brand starts moving toward what the category seems to reward and loses sight of what makes it recognizable. I wanted to pull Etro back toward textile heritage, pattern, warmth, and a more playful sense of luxury. The creative directors who critiqued my work liked that because it made the brand feel less stiff and more itself.",
        "For Primark in CEE, I would think about a similar identity question in a different market context. As Primark expands across countries, what parts of the brand need to stay consistent, and what parts need to be translated locally? Price is the entry point. Sustainability has to be specific enough to hold up in markets where greenwashing skepticism is already high. Local creators and media matter — the question is whether they make the brand feel genuinely rooted somewhere, or just amplified.",
        "So I would approach the brief by asking what Primark should preserve as it grows: access, everyday style, browsing, discovery, and the feeling that fashion does not have to be so serious. Then I would look at how those qualities should show up differently in each CEE market.",
      ],
    },
    lensInsights: {
      "Trust & Reputation":
        "Shoppers might be excited. But vague sustainability claims can do more damage than saying nothing — especially in markets where greenwashing skepticism is already high.",
      "Cultural Relevance":
        "CEE isn't one audience. A brand that arrives without local awareness will feel imported even when it's trying to be friendly.",
      "Behavior Change":
        "Curiosity doesn't always translate to a first visit. Store openings are the best moment to turn awareness into actual behavior.",
      "Creative Risk":
        "Greenwashing, influencer overload, or treating Poland and Romania as the same market — any of these would undermine the launch before it's begun.",
    },
  },
  {
    id: "new-brief",
    number: "04",
    title: "Analyze a new brief",
    tag: "AI backend concept",
    color: { bg: "#dedad3", tab: "#6a6560" },
    isPlaceholder: true,
    surface:
      "Paste any client brief — an AI generates a first-pass breakdown for a strategist to mark up and push back on.",
    conceptText:
      "In a fuller version of this, a strategist could paste any client brief here. An AI would generate a first-pass breakdown — questions to ask, tensions to surface, who might doubt it, where the idea could go, what could backfire — and the strategist would go through it and push back.",
  },
];

const ease = [0.25, 0.46, 0.45, 0.94];

const staggerList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};
const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

/* ── Folder card ─────────────────────────────────────────────────── */
function Folder({ brief, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full text-left group"
      style={{ paddingTop: "28px" }}
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 28 }}
    >
      <div
        className="absolute top-0 left-0 z-10 flex items-center px-3 rounded-t-lg"
        style={{
          height: "30px",
          width: "92px",
          backgroundColor: brief.color.tab,
          borderTop: "2px solid #171717",
          borderLeft: "2px solid #171717",
          borderRight: "2px solid #171717",
          borderBottom: `2px solid ${brief.color.bg}`,
        }}
      >
        <span className="font-mono text-[11px] font-bold text-white/90 tracking-[0.14em]">
          {brief.number}
        </span>
      </div>
      <div
        className="w-full rounded-xl rounded-tl-none border-2 border-neutral-900 p-5 flex flex-col"
        style={{ backgroundColor: brief.color.bg, minHeight: "172px", gap: "10px" }}
      >
        <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-500">
          {brief.tag}
        </p>
        <div className="flex-1">
          <h3 className="text-lg font-semibold leading-snug">{brief.title}</h3>
          <p className="mt-2 text-sm text-neutral-700 leading-relaxed line-clamp-2">
            {brief.surface}
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-700 group-hover:gap-3 transition-all duration-150">
          {brief.isPlaceholder ? "See the concept" : "Open brief"} <ArrowRight size={11} />
        </div>
      </div>
    </motion.button>
  );
}

/* ── Briefcase view ──────────────────────────────────────────────── */
function BriefcaseView({ onSelectBrief }) {
  return (
    <motion.main
      className="min-h-screen px-6 py-10 md:px-10 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
    >
      <div className="w-full max-w-2xl">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <motion.p
            className="text-[10px] uppercase tracking-widest font-medium text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Self-directed prototype
          </motion.p>
          <motion.h1
            className="mt-3 text-7xl md:text-8xl font-semibold tracking-tight"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55, ease }}
          >
            gray.i briefs
          </motion.h1>
          <motion.p
            className="mt-2 text-[11px] text-neutral-400 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24 }}
          >
            (Grayling + AI — get it?)
          </motion.p>
          <motion.p
            className="mt-5 text-[1.05rem] leading-[1.75] max-w-md mx-auto text-neutral-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.45, ease }}
          >
            Processes client briefs and returns a structured first-pass breakdown: surface ask, questions, tensions, audience doubts, possible routes, and risks. Human strategist judgment still required.
          </motion.p>
          <motion.p
            className="mt-4 text-xs text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.44 }}
          >
            Built on public Grayling project work, used as sample inputs only.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.6, ease }}
        >
          <div
            className="flex justify-center"
            style={{ marginBottom: "-3px", position: "relative", zIndex: 1 }}
          >
            <div
              style={{
                width: "84px",
                height: "26px",
                border: "3px solid #171717",
                borderBottom: "none",
                borderRadius: "42px 42px 0 0",
                background: "transparent",
              }}
            />
          </div>

          <div
            className="border-[3px] border-neutral-900 rounded-2xl overflow-hidden"
            style={{ backgroundColor: "#f2ede4", boxShadow: "6px 6px 0 #171717" }}
          >
            <div
              className="border-b-[3px] border-neutral-900 px-6 py-3 flex items-center justify-between"
              style={{ backgroundColor: "#171717" }}
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">
                Gray.i — 2025
              </span>
              <div className="flex gap-2">
                <div className="w-5 h-2.5 rounded-sm bg-neutral-600 border border-neutral-500" />
                <div className="w-5 h-2.5 rounded-sm bg-neutral-600 border border-neutral-500" />
              </div>
            </div>

            <div className="p-6 grid grid-cols-2 gap-5">
              {briefs.map((brief, i) => (
                <motion.div
                  key={brief.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 + i * 0.1, duration: 0.4, ease }}
                >
                  <Folder brief={brief} onClick={() => onSelectBrief(brief)} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-10 border-t border-neutral-300 pt-8 text-center max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.85 }}
        >
          <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-400 mb-3">
            Why I made this
          </p>
          <p className="text-xs text-neutral-500 leading-[1.8]">
            During an HR screening call, the recruiter told me that Grayling encourages creative ideas and that even in a big company, your voice gets heard. So I had an idea and decided to follow through with it, also partly because it felt relevant to the role I was looking at.
          </p>
          <p className="mt-4 text-xs text-neutral-400 leading-[1.8]">
            Gray.i Briefs is a prototype for an AI-assisted strategy workflow. It takes a rough client brief and produces a structured first pass: surface ask, early questions, hidden tension, audience doubts, possible routes, and risks. Then a human strategist goes through it and pushes back.
          </p>
          <p className="mt-4 text-xs text-neutral-400 leading-[1.8]">
            The three case files are based on public Grayling project work, used as sample inputs. Each one shows both layers: the automated first pass, and then my own notes!
          </p>
        </motion.div>
      </div>
    </motion.main>
  );
}

/* ── Editorial section ───────────────────────────────────────────── */
function EditSection({
  label,
  children,
  delay = 0,
  noBorder = false,
  dimmed = false,
  highlighted = false,
  highlightColor,
}) {
  return (
    <section className={`${noBorder ? "" : "border-t border-neutral-900"} pt-8 pb-14`}>
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.52, ease, delay }}
      >
        <motion.div
          initial={{ opacity: dimmed ? 0.3 : 1 }}
          animate={{ opacity: dimmed ? 0.3 : 1 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <p className="text-[11px] uppercase tracking-widest font-semibold text-neutral-600 mb-5 flex items-center gap-2">
            {highlighted && highlightColor && (
              <span
                className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: highlightColor }}
              />
            )}
            {label}
          </p>
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ── Em-dash list ────────────────────────────────────────────────── */
function DashList({ items, animate = false }) {
  const inner = items.map((item) => (
    <motion.div
      key={item}
      variants={animate ? staggerItem : undefined}
      className="grid grid-cols-[16px_1fr] gap-3 items-baseline"
    >
      <span className="text-neutral-300 text-base leading-none select-none">—</span>
      <p className="leading-7 text-neutral-700">{item}</p>
    </motion.div>
  ));

  if (animate) {
    return (
      <motion.div
        className="space-y-3"
        variants={staggerList}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {inner}
      </motion.div>
    );
  }
  return <div className="space-y-3">{inner}</div>;
}

/* ── Brief detail view ───────────────────────────────────────────── */
function BriefDetailView({ brief, lens, onChangeLens, onBack }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const personaGrid =
    brief.personas.length > 3 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1 md:grid-cols-3";

  const highlightedKeys = lens ? (LENS_SECTIONS[lens] || []) : [];
  const hi = (key) => highlightedKeys.length > 0 && highlightedKeys.includes(key);
  const dim = (key) => highlightedKeys.length > 0 && !highlightedKeys.includes(key);

  const lensInsight = lens ? brief.lensInsights?.[lens] : null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
        style={{ scaleX, backgroundColor: brief.color.tab }}
      />

      <motion.main
        className="min-h-screen"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease }}
      >
        {/* Masthead */}
        <div
          className="border-b-[3px] border-neutral-900 px-6 pt-8 pb-10 md:px-16"
          style={{ backgroundColor: brief.color.bg }}
        >
          <div className="mx-auto max-w-4xl">
            <motion.button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 mb-10 transition-colors"
              whileHover={{ x: -3 }}
              transition={{ duration: 0.12 }}
            >
              <ArrowLeft size={15} />
              Back to briefcase
            </motion.button>

            <p className="text-[10px] uppercase tracking-widest font-medium text-neutral-500">
              Brief {brief.number} — {brief.tag}
            </p>
            <p className="mt-1 text-xs text-neutral-500 italic">{brief.source}</p>
            <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-tight leading-none">
              {brief.title}
            </h1>

            {/* Strategy lens selector */}
            <div className="mt-8">
              <div className="mb-3 relative">
                <p className="text-[10px] uppercase tracking-widest font-medium text-neutral-500 flex items-center gap-1.5">
                  Strategy lens
                  <span
                    className="inline-flex items-center justify-center w-4 h-4 rounded-full border border-neutral-400 text-neutral-400 text-[8px] leading-none cursor-help flex-shrink-0"
                    onMouseEnter={() => setTooltipVisible(true)}
                    onMouseLeave={() => setTooltipVisible(false)}
                  >
                    ?
                  </span>
                </p>
                <AnimatePresence>
                  {tooltipVisible && (
                    <motion.div
                      className="absolute left-0 z-50 bg-neutral-900 text-white text-xs leading-[1.6] rounded-xl px-4 py-3 w-72 pointer-events-none shadow-xl"
                      style={{ top: "calc(100% + 6px)", textTransform: "none", letterSpacing: "normal", fontWeight: "normal" }}
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.15 }}
                    >
                      Each lens shifts which sections are in focus. Click one to see what's most relevant to that angle — the rest fades back.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <motion.button
                  onClick={() => onChangeLens(null)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium border-2 border-neutral-900 transition-colors ${
                    lens === null
                      ? "bg-neutral-900 text-white"
                      : "bg-transparent text-neutral-800 hover:bg-black/[0.06]"
                  }`}
                >
                  Default
                </motion.button>
                {lenses.map((l) => (
                  <motion.button
                    key={l}
                    onClick={() => onChangeLens(lens === l ? null : l)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium border-2 border-neutral-900 transition-colors ${
                      lens === l
                        ? "bg-neutral-900 text-white"
                        : "bg-transparent text-neutral-800 hover:bg-black/[0.06]"
                    }`}
                  >
                    {l}
                  </motion.button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {lensInsight && (
                  <motion.p
                    key={lens}
                    className="mt-5 text-sm leading-7 max-w-xl pl-5 border-l-2"
                    style={{ borderColor: brief.color.tab, color: "#404040" }}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    {lensInsight}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 md:px-16">
          <div className="mx-auto max-w-4xl">

            {/* 01 The brief */}
            <EditSection label="The brief" noBorder>
              <p className="text-[1.35rem] leading-[1.7] max-w-2xl text-neutral-800">
                {brief.client}
              </p>
            </EditSection>

            {/* First-pass output header */}
            <div className="border-t border-neutral-900 pt-6 pb-0 flex items-center gap-4">
              <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-400 flex-shrink-0">
                First-pass output
              </p>
              <div className="flex-1 h-px bg-neutral-200" />
            </div>

            {/* 02 Breaking it down */}
            <EditSection
              label="Breaking it down"
              noBorder
              dimmed={dim("unpacked")}
              highlighted={hi("unpacked")}
              highlightColor={brief.color.tab}
            >
              <div className="grid md:grid-cols-2 gap-10 md:gap-0">
                <div className="md:pr-16">
                  <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-300 mb-4">
                    What they asked for
                  </p>
                  <p className="text-lg leading-8">{brief.surface}</p>
                </div>
                <div className="border-t border-neutral-200 pt-8 md:border-t-0 md:border-l md:border-neutral-200 md:pt-0 md:pl-16">
                  <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-300 mb-4">
                    Hidden tension
                  </p>
                  <p className="text-lg leading-8">{brief.tension}</p>
                </div>
              </div>
            </EditSection>

            {/* 03 Where I'd start */}
            <EditSection
              label="Where I'd start"
              dimmed={dim("start")}
              highlighted={hi("start")}
              highlightColor={brief.color.tab}
            >
              <div className="grid md:grid-cols-2 gap-10 md:gap-0">
                <div className="md:pr-16">
                  <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-300 mb-5">
                    Questions I'd ask first
                  </p>
                  <DashList items={brief.firstQuestions} />
                </div>
                <div className="border-t border-neutral-200 pt-8 md:border-t-0 md:border-l md:border-neutral-200 md:pt-0 md:pl-16">
                  <p className="text-[9px] uppercase tracking-widest font-medium text-neutral-300 mb-5">
                    What I'd look into
                  </p>
                  <DashList items={brief.researchAreas} />
                </div>
              </div>
            </EditSection>

            {/* 04 The opportunity */}
            <EditSection
              label="The opportunity"
              dimmed={dim("opportunity")}
              highlighted={hi("opportunity")}
              highlightColor={brief.color.tab}
            >
              <div className="pl-7 border-l-[3px]" style={{ borderColor: brief.color.tab }}>
                <p className="text-2xl leading-[1.6] font-medium max-w-2xl">
                  {brief.opportunity}
                </p>
              </div>
            </EditSection>

            {/* 05 What people might doubt */}
            <EditSection
              label="What people might doubt"
              dimmed={dim("skepticism")}
              highlighted={hi("skepticism")}
              highlightColor={brief.color.tab}
            >
              <motion.div
                className="space-y-9"
                variants={staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {brief.skepticism.map((item) => (
                  <motion.div
                    key={item}
                    variants={staggerItem}
                    className="pl-7 border-l-[3px]"
                    style={{ borderColor: brief.color.tab }}
                  >
                    <p className="text-xl leading-[1.6] font-medium">
                      &ldquo;{item}&rdquo;
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </EditSection>

            {/* 06 Who I'd be thinking about */}
            <EditSection
              label="Who I'd be thinking about"
              dimmed={dim("personas")}
              highlighted={hi("personas")}
              highlightColor={brief.color.tab}
            >
              <motion.div
                className={`grid gap-10 md:gap-12 ${personaGrid}`}
                variants={staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {brief.personas.map((persona) => (
                  <motion.div key={persona.name} variants={staggerItem}>
                    <p className="font-semibold text-lg leading-snug">{persona.name}</p>
                    <div className="w-10 h-px bg-neutral-300 my-4" />
                    <p className="text-sm leading-7 text-neutral-600">{persona.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </EditSection>

            {/* 07 Where the idea could go */}
            <EditSection
              label="Where the idea could go"
              dimmed={dim("routes")}
              highlighted={hi("routes")}
              highlightColor={brief.color.tab}
            >
              <motion.div
                className="space-y-10"
                variants={staggerList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
              >
                {brief.routes.map((route, i) => (
                  <motion.div
                    key={route.name}
                    variants={staggerItem}
                    className="grid grid-cols-[56px_1fr] gap-6 md:gap-10 items-start"
                  >
                    <span
                      className="font-mono text-5xl font-semibold leading-none select-none"
                      style={{
                        color: brief.color.bg,
                        WebkitTextStroke: `2px ${brief.color.tab}`,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-lg mb-2">{route.name}</p>
                      <p className="leading-7 text-neutral-600">{route.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </EditSection>

            {/* 08 What it could look like */}
            <EditSection
              label="What it could look like"
              dimmed={dim("activations")}
              highlighted={hi("activations")}
              highlightColor={brief.color.tab}
            >
              <DashList items={brief.activations} animate />
            </EditSection>

            {/* 09 What could backfire */}
            <EditSection
              label="What could backfire"
              dimmed={dim("watchouts")}
              highlighted={hi("watchouts")}
              highlightColor={brief.color.tab}
            >
              <DashList items={brief.watchouts} animate />
            </EditSection>

            {/* 10 What I'd check next */}
            <EditSection
              label="What I'd check next"
              dimmed={dim("validate")}
              highlighted={hi("validate")}
              highlightColor={brief.color.tab}
            >
              <DashList items={brief.validate} animate />
            </EditSection>

            {/* Human strategist notes — always full opacity */}
            {(brief.strategistEssay || brief.strategistNotes) && (
              <section className="border-t border-neutral-900 pt-8 pb-14">
                <motion.div
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.52, ease }}
                >
                  <p className="text-[11px] uppercase tracking-widest font-semibold text-neutral-600 mb-6">
                    Human strategist notes
                  </p>
                  <div className="rounded-2xl bg-neutral-900 px-8 py-8 max-w-2xl">
                    {brief.strategistEssay ? (
                      <>
                        <p className="text-[11px] uppercase tracking-widest font-semibold text-white/50 mb-6">
                          {brief.strategistEssay.angle}
                        </p>
                        <div className="space-y-5">
                          {brief.strategistEssay.body.map((para, i) => (
                            <p key={i} className="text-base leading-7 text-white/80">{para}</p>
                          ))}
                        </div>
                        {brief.strategistEssay.lookInto && (
                          <div className="mt-8 pt-6 border-t border-white/10">
                            <p className="text-[10px] uppercase tracking-widest font-medium text-white/40 mb-2">
                              What I'd look into
                            </p>
                            <p className="text-sm leading-[1.8] text-white/60">
                              {brief.strategistEssay.lookInto}
                            </p>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-8">
                        {brief.strategistNotes.map(({ prompt, body }) => (
                          <div key={prompt}>
                            <p className="text-[10px] uppercase tracking-widest font-medium text-white/40 mb-2">{prompt}</p>
                            <p className="text-base leading-7 text-white/80">{body}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </section>
            )}

            {/* Why I chose this */}
            <EditSection label="Why I chose this">
              <p className="text-lg leading-8 text-neutral-600 max-w-2xl">{brief.rationale}</p>
            </EditSection>

            {/* Disclaimer */}
            <p className="pb-20 pt-2 text-xs text-neutral-400 italic leading-6 max-w-2xl">
              {DISCLAIMER}
            </p>
          </div>
        </div>
      </motion.main>
    </>
  );
}

/* ── Concept view (Case 04) ──────────────────────────────────────── */
function ConceptView({ brief, onBack }) {
  return (
    <motion.main
      className="min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.32, ease }}
    >
      <div
        className="border-b-[3px] border-neutral-900 px-6 pt-8 pb-12 md:px-16"
        style={{ backgroundColor: brief.color.bg }}
      >
        <div className="mx-auto max-w-4xl">
          <motion.button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 mb-10 transition-colors"
            whileHover={{ x: -3 }}
            transition={{ duration: 0.12 }}
          >
            <ArrowLeft size={15} />
            Back to briefcase
          </motion.button>
          <p className="text-[10px] uppercase tracking-widest font-medium text-neutral-500">
            Brief {brief.number} — {brief.tag}
          </p>
          <h1 className="mt-3 text-5xl md:text-7xl font-semibold tracking-tight leading-none">
            {brief.title}
          </h1>
        </div>
      </div>

      <div className="px-6 md:px-16">
        <div className="mx-auto max-w-4xl">
          <EditSection label="The idea" noBorder>
            <p className="text-[1.35rem] leading-[1.7] max-w-2xl text-neutral-800">
              {brief.conceptText}
            </p>
          </EditSection>

          <EditSection label="How I'd build it">
            <motion.div
              className="space-y-10 max-w-2xl"
              variants={staggerList}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {[
                {
                  step: "01",
                  heading: "Someone pastes a brief",
                  body: "A client brief, a background document, a rough ask — anything goes in. The tool reads it for the core communications challenge.",
                },
                {
                  step: "02",
                  heading: "An AI generates a first-pass breakdown",
                  body: "Questions to ask, tensions to surface, who might doubt it, where the idea could go, what could backfire — a first draft to think against.",
                },
                {
                  step: "03",
                  heading: "A strategist marks it up",
                  body: "The output is something to argue with. A strategist brings the judgment, the taste, and the client knowledge an AI can't replicate.",
                },
              ].map(({ step, heading, body }) => (
                <motion.div
                  key={step}
                  variants={staggerItem}
                  className="grid grid-cols-[56px_1fr] gap-6 md:gap-10 items-start"
                >
                  <span
                    className="font-mono text-5xl font-semibold leading-none select-none"
                    style={{
                      color: brief.color.bg,
                      WebkitTextStroke: `2px ${brief.color.tab}`,
                    }}
                  >
                    {step}
                  </span>
                  <div>
                    <p className="font-semibold text-lg mb-2">{heading}</p>
                    <p className="leading-7 text-neutral-600">{body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </EditSection>

          <div className="pb-20" />
        </div>
      </div>
    </motion.main>
  );
}

/* ── Root ────────────────────────────────────────────────────────── */
export default function App() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  const [selectedLens, setSelectedLens] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const onHashChange = () => {
      setHash(window.location.hash || "#/");
      setSelectedLens(null);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const briefId = hash.match(/^#\/brief\/(.+)$/)?.[1];
  const selectedBrief = briefId ? (briefs.find(b => b.id === briefId) ?? null) : null;

  const handleSelectBrief = (brief) => { window.location.hash = `/brief/${brief.id}`; };
  const handleBack = () => { window.location.hash = "/"; };

  return (
    <AnimatePresence mode="wait">
      {selectedBrief === null ? (
        <BriefcaseView key="briefcase" onSelectBrief={handleSelectBrief} />
      ) : selectedBrief.isPlaceholder ? (
        <ConceptView key="concept" brief={selectedBrief} onBack={handleBack} />
      ) : (
        <BriefDetailView
          key={selectedBrief.id}
          brief={selectedBrief}
          lens={selectedLens}
          onChangeLens={setSelectedLens}
          onBack={handleBack}
        />
      )}
    </AnimatePresence>
  );
}
