import React, { type FormEvent, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  Compass,
  Earth,
  HeartHandshake,
  Layers3,
  Lightbulb,
  MapPin,
  Menu,
  Send,
  Sparkles,
  Wind,
  X,
  Zap,
} from "lucide-react";
import { registrationSchema, type RegistrationInput } from "@shared/registration";

const eventDetails = {
  date: "09 OCT 2026",
  venue: "ST. JOHN'S SCHOOL, ANCHAL",
};

const navItems = [
  { label: "The Storm", href: "#story" },
  { label: "Experience", href: "#experience" },
  { label: "Challenges", href: "#challenges" },
  { label: "Venue", href: "#venue" },
  { label: "Register", href: "#register" },
];

const experienceCards = [
  {
    number: "01",
    icon: <Zap aria-hidden="true" />,
    title: "Spark",
    description: "Bring the question that keeps you up at night. TOOFAN is where curiosity catches a current.",
  },
  {
    number: "02",
    icon: <Layers3 aria-hidden="true" />,
    title: "Shape",
    description: "Move from scattered thoughts to something tangible, with your team and your own way of making.",
  },
  {
    number: "03",
    icon: <Compass aria-hidden="true" />,
    title: "Surge",
    description: "Step into the showcase with a story, a spark, and the confidence to send it into the world.",
  },
];

const challengeCards = [
  {
    number: "01",
    icon: <Earth aria-hidden="true" />,
    title: "Awareness Challenge",
    kicker: "EDUCATE & EMPOWER",
    description: "Develop innovative solutions that educate students, parents, teachers, and society about the dangers of substance abuse.",
    examples: ["AI Awareness Chatbot", "VR Awareness Experience", "Interactive Educational Game", "AR Awareness Campaign", "Digital Learning Platform"],
  },
  {
    number: "02",
    icon: <Bot aria-hidden="true" />,
    title: "Prevention Challenge",
    kicker: "EARLY INTERVENTION",
    description: "Develop technologies that help prevent substance abuse through education, monitoring, and early intervention.",
    examples: ["AI-Based Detection Systems", "Anonymous Reporting Platform", "Smart School Safety Dashboard", "Predictive Risk Analytics", "Community Monitoring Solutions"],
  },
  {
    number: "03",
    icon: <HeartHandshake aria-hidden="true" />,
    title: "Recovery & Rehabilitation Challenge",
    kicker: "WELLNESS & SUPPORT",
    description: "Develop innovative solutions that support recovery, counselling, mental wellness, and rehabilitation.",
    examples: ["AI Recovery Companion", "Mental Wellness Application", "VR Therapy Experience", "Family Support Platform", "Recovery Monitoring System"],
  },
  {
    number: "04",
    icon: <Lightbulb aria-hidden="true" />,
    title: "Innovation Challenge",
    kicker: "BREAKTHROUGH FUTURES",
    description: "Create breakthrough ideas and futuristic technologies that could transform the fight against substance abuse.",
    examples: ["Smart Wellness Wearables", "AI Personal Mentor", "Smart City Solutions", "Blockchain-Based Tracking Systems", "Future Community Wellness Ecosystem"],
  },
];

const registrationDefaults: RegistrationInput = {
  name: "",
  email: "",
  school: "",
  team: "",
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formValues, setFormValues] = useState<RegistrationInput>(registrationDefaults);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof RegistrationInput, string>>>({});
  const [submitState, setSubmitState] = useState<"idle" | "prepared">("idle");

  const closeMenu = () => setMenuOpen(false);

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = registrationSchema.safeParse(formValues);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      setFieldErrors({
        name: errors.name?.[0],
        email: errors.email?.[0],
        school: errors.school?.[0],
        team: errors.team?.[0],
      });
      setSubmitState("idle");
      return;
    }

    setFieldErrors({});
    setSubmitState("prepared");
  };

  const updateField = (field: keyof RegistrationInput, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitState("idle");
  };

  return (
    <div className="toofan-page">
      <a className="skip-link" href="#main-content">Skip to main content</a>

      <header className="site-header">
        <a className="school-lockup" href="#top" aria-label="Hackfinity home">
          <span className="school-seal" aria-hidden="true">SJ</span>
          <span className="school-lockup-copy">
            <span className="school-lockup-top">HOSTED AT</span>
            <span className="school-lockup-name">ST. JOHN&apos;S <em>ANCHAL</em></span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label}>{item.label}</a>
          ))}
        </nav>

        <a className="nav-register" href="#register">Claim your signal <ArrowUpRight aria-hidden="true" /></a>
        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </header>

      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <a href={item.href} key={item.label} onClick={closeMenu}>{item.label}</a>
          ))}
          <a className="mobile-nav-cta" href="#register" onClick={closeMenu}>Register interest <ArrowUpRight aria-hidden="true" /></a>
        </nav>
      )}

      <main id="main-content">
        <section
          id="top"
          className="hero-section"
          onPointerMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
            event.currentTarget.style.setProperty("--pointer-x", String(x));
            event.currentTarget.style.setProperty("--pointer-y", String(y));
          }}
          onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--pointer-x", "0");
            event.currentTarget.style.setProperty("--pointer-y", "0");
          }}
        >
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-glow glow-one" aria-hidden="true" />
          <div className="hero-glow glow-two" aria-hidden="true" />
          <div className="storm-system" aria-hidden="true">
            <div className="storm-orbit orbit-outer" />
            <div className="storm-orbit orbit-mid" />
            <div className="storm-orbit orbit-inner" />
            <div className="storm-eye" />
            <span className="storm-shard shard-a" />
            <span className="storm-shard shard-b" />
            <span className="storm-shard shard-c" />
            <span className="storm-shard shard-d" />
          </div>

          <div className="hero-content">
            <div className="hero-kicker reveal-up">
              ST. JOHN&apos;S SCHOOL, ANCHAL PRESENTS
            </div>
            <h1 className="hero-title" aria-label="Hackfinity, TOOFAN">
              <span className="hero-title-main">HACKFINITY</span>
              <span className="hero-title-sub">TOOFAN</span>
            </h1>
            <p className="hero-intro">Hackfinity is where restless minds meet the force of TOOFAN: a storm of bold ideas, real questions, and the courage to build through the chaos.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#register">Enter Hackfinity <ArrowUpRight aria-hidden="true" /></a>
              <a className="button button-ghost" href="#story">Find the signal <ArrowDown aria-hidden="true" /></a>
            </div>
          </div>

          <div className="hero-meta-panel">
            <div className="hero-meta-item">
              <CalendarDays aria-hidden="true" />
              <div><span>DATE</span><strong>{eventDetails.date}</strong></div>
            </div>
            <div className="hero-meta-divider" aria-hidden="true" />
            <div className="hero-meta-item">
              <MapPin aria-hidden="true" />
              <div><span>GROUND ZERO</span><strong>{eventDetails.venue}</strong></div>
            </div>
          </div>

          <a className="scroll-cue" href="#story" aria-label="Scroll to discover Hackfinity">
            <span>SCROLL TO DISCOVER</span><ChevronDown aria-hidden="true" />
          </a>
        </section>

        <section id="story" className="story-section section-shell">
          <div className="section-label"><span>01</span> INSIDE THE STORM</div>
          <div className="story-layout">
            <div className="story-title-wrap">
              <p className="eyebrow">A NEW KIND OF WEATHER</p>
              <h2>Not every <em>storm</em> is meant to be escaped.</h2>
            </div>
            <div className="story-copy">
              <p>TOOFAN is the current that runs through Hackfinity: the moment when an idea stops being a thought and becomes a force. It is for makers ready to follow the static, test the unknown, and build something that moves.</p>
              <p>Come as you are. Leave with a signal worth carrying forward.</p>
              <a className="text-link" href="#experience">See what is waiting <ArrowUpRight aria-hidden="true" /></a>
            </div>
          </div>

          <div className="marquee-band" aria-label="Hackfinity, TOOFAN, make it move">
            <div className="marquee-track">
              <span>HACKFINITY <i>✦</i> MAKE IT MOVE <i>✦</i> TOOFAN <i>✦</i> MAKE IT MATTER <i>✦</i> </span>
              <span aria-hidden="true">HACKFINITY <i>✦</i> MAKE IT MOVE <i>✦</i> TOOFAN <i>✦</i> MAKE IT MATTER <i>✦</i> </span>
            </div>
          </div>
        </section>

        <section id="experience" className="experience-section section-shell">
          <div className="experience-heading">
            <div className="section-label section-label-light"><span>02</span> THE CURRENT</div>
            <h2>Three moves.<br /><em>One wild</em> direction.</h2>
            <p>The details will arrive with the official event brief. For now, begin with the energy that gets ideas out of your head and into the room.</p>
          </div>
          <div className="experience-grid">
            {experienceCards.map((card) => (
              <article className="experience-card" key={card.number}>
                <div className="experience-card-top"><span>{card.number}</span>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <span className="card-line" aria-hidden="true" />
              </article>
            ))}
          </div>
          <div className="signal-quote">
            <Wind aria-hidden="true" />
            <p>There is no map for a fresh idea.<br /><span>Only the next brave move.</span></p>
          </div>
        </section>

        <section id="challenges" className="challenges-section section-shell">
          <div className="challenges-heading">
            <div className="section-label"><span>03</span> FOUR CHALLENGES</div>
            <div>
              <p className="eyebrow">CHOOSE YOUR CURRENT</p>
              <h2>Four ways to<br /><em>move the map.</em></h2>
            </div>
            <p>Each challenge is a launch point, not a limit. The organising team can refine the detailed brief, but every direction begins with a real-world question worth meeting head-on.</p>
          </div>
          <div className="challenge-grid">
            {challengeCards.map((challenge) => (
              <article className="challenge-card" key={challenge.number}>
                <div className="challenge-card-glow" aria-hidden="true" />
                <div className="challenge-card-top"><span>CHALLENGE {challenge.number}</span>{challenge.icon}</div>
                <div className="challenge-card-body">
                  <p>{challenge.kicker}</p>
                  <h3>{challenge.title}</h3>
                  <div className="challenge-rule" aria-hidden="true"><span /><span /><span /></div>
                  <div className="challenge-copy"><span>BRIEF</span><p>{challenge.description}</p></div>
                  <div className="challenge-examples"><span>SAMPLE PROJECTS</span><div>{challenge.examples.map((example) => <i key={example}>{example}</i>)}</div></div>
                </div>
                <div className="challenge-index" aria-hidden="true">{challenge.number}</div>
              </article>
            ))}
          </div>
          <p className="challenge-disclaimer">Sample projects are prompts for exploration. The final challenge briefs and participation rules will be shared by the Hackfinity organisers.</p>
        </section>

        <section id="venue" className="venue-section section-shell">
          <div className="venue-graphic" aria-hidden="true">
            <div className="venue-sun" />
            <div className="venue-line venue-line-one" />
            <div className="venue-line venue-line-two" />
            <div className="venue-pin"><MapPin /></div>
            <div className="venue-rings"><span /><span /><span /></div>
          </div>
          <div className="venue-content">
            <div className="section-label"><span>04</span> FIND THE GROUND</div>
            <div className="official-host-mark official-host-mark-prominent">
              <span>OFFICIAL HOST · ST. JOHN&apos;S SCHOOL, ANCHAL</span>
              <img src="/manus-storage/LOGOSTJOHNS_2e90bbbf.jpg" alt="St. John’s School, Anchal" />
            </div>
            <p className="eyebrow">THE PLACE WHERE IT BEGINS</p>
            <h2>St. John&apos;s School,<br /><em>Anchal.</em></h2>
            <p>Our home base for a day of new signals, shared energy, and ideas set in motion. Full arrival and event-day information will be announced by the organising team.</p>
            <div className="venue-tag"><MapPin aria-hidden="true" /> MAR GREGORIOS CAMPUS, ANCHAL</div>
          </div>
        </section>

        <section id="register" className="register-section section-shell">
          <div className="register-heading">
            <div className="section-label section-label-light"><span>05</span> HOLD YOUR PLACE</div>
            <h2>Ready when<br />the <em>storm</em> is.</h2>
            <p>Drop a signal below. The registration connection will be switched on with the organiser&apos;s Google Sheet before public submissions open.</p>
            <div className="registration-status"><span className="status-pulse" aria-hidden="true" /> REGISTRATION SYSTEM: PREPARING</div>
          </div>

          <form className="registration-form" onSubmit={handleFormSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="name">YOUR NAME</label>
              <input id="name" value={formValues.name} onChange={(event) => updateField("name", event.target.value)} placeholder="How should we call you?" autoComplete="name" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? "name-error" : undefined} />
              {fieldErrors.name && <span id="name-error" className="field-error">{fieldErrors.name}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input id="email" type="email" value={formValues.email} onChange={(event) => updateField("email", event.target.value)} placeholder="you@example.com" autoComplete="email" aria-invalid={Boolean(fieldErrors.email)} aria-describedby={fieldErrors.email ? "email-error" : undefined} />
              {fieldErrors.email && <span id="email-error" className="field-error">{fieldErrors.email}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="school">SCHOOL / ORGANISATION</label>
              <input id="school" value={formValues.school} onChange={(event) => updateField("school", event.target.value)} placeholder="Where are you building from?" aria-invalid={Boolean(fieldErrors.school)} aria-describedby={fieldErrors.school ? "school-error" : undefined} />
              {fieldErrors.school && <span id="school-error" className="field-error">{fieldErrors.school}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="team">TEAM NAME <span>OPTIONAL</span></label>
              <input id="team" value={formValues.team} onChange={(event) => updateField("team", event.target.value)} placeholder="Name your crew" aria-invalid={Boolean(fieldErrors.team)} aria-describedby={fieldErrors.team ? "team-error" : undefined} />
              {fieldErrors.team && <span id="team-error" className="field-error">{fieldErrors.team}</span>}
            </div>
            <div className="form-submit-row">
              <button type="submit" className="button button-solar">Prepare my registration <Send aria-hidden="true" /></button>
              <p>Submitting now validates the form only. No details are sent until the Google Sheets connection is activated.</p>
            </div>
            {submitState === "prepared" && (
              <div className="form-notice" role="status"><Check aria-hidden="true" /> Your details look ready. The organiser will activate secure submissions soon; nothing has been saved yet.</div>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-mark"><strong>HACK<span>FINITY</span></strong><small>TOOFAN</small></div>
        <div className="footer-host">
          <span>HOSTED BY</span>
          <strong>ST. JOHN&apos;S SCHOOL, ANCHAL</strong>
        </div>
        <div className="footer-powered">
          <span>POWERED BY</span>
          <strong className="hownwhy-wordmark" aria-label="HOWNWHY" role="img"><span>HOW</span><i aria-hidden="true">N</i><span>WHY</span></strong>
        </div>
        <div className="footer-year">OCTOBER 2026</div>
      </footer>
    </div>
  );
}
