import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/AboutPage.css";

const TABS = ["Our Story", "Vision", "Mission", "Our Values", "How We Work", "Why Trust Us"];

/* ══════════════════════════════════════════
   SCROLL REVEAL HOOK
══════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            // For process line animation
            if (entry.target.classList.contains("process-steps")) {
              entry.target.classList.add("animated");
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    const targets = document.querySelectorAll(".reveal, .stagger-children, .process-steps");
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  });
}

/* ══════════════════════════════════════════
   OUR STORY
══════════════════════════════════════════ */
function OurStory() {
  useReveal();
  return (
    <div className="tab-panel">
      <div className="story-intro reveal">
        <p className="eyebrow eyebrow--center">Who We Are</p>
        <p className="body-txt body-txt--large">
          Sarita Foundation was born in 2026 from a simple, urgent belief — that every person, regardless of where they are born, deserves access to education, healthcare, dignity, and opportunity.
        </p>
        <p className="body-txt">
          We are a new organisation, but the need we are responding to is not. We launched our first campaigns in Maharashtra this year, with a clear focus on grassroots delivery across education, healthcare, sanitation, and financial support.
        </p>
      </div>

      <div className="story-fullbleed reveal">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80"
          alt="Children at a Sarita Foundation program"
          className="story-fullbleed__img"
        />
        <div className="story-fullbleed__overlay" />
        <p className="story-fullbleed__quote">
          "Together, we can build stronger communities and brighter futures."
        </p>
      </div>

      <div className="story-two-col">
        <div className="reveal reveal--left">
          <p className="eyebrow">What We Do</p>
          <h2 className="sec-head">Delivering change across four pillars</h2>
          <p className="body-txt">Sarita Foundation is building structured programs in education, primary healthcare, sanitation, and financial inclusion. Each program is co-designed with the communities we serve — ensuring relevance, ownership, and lasting impact.</p>
          <p className="body-txt">From distributing books and medicines to organising cleanliness drives and providing financial support, every initiative is built around a real, demonstrated need on the ground.</p>
        </div>
        <div className="reveal reveal--right">
          <p className="eyebrow">Where We Are Today</p>
          <h2 className="sec-head">Just launched — and growing</h2>
          <p className="body-txt">We launched in 2026, beginning with campaigns in rural Maharashtra. Our founding team is small, intentional, and fully committed. We are actively recruiting volunteers and planning our first wave of campaigns for later this year.</p>
          <p className="body-txt">We are building lean by design. A small, accountable team means donations reach the right hands faster — and every rupee will be publicly reported from day one.</p>
        </div>
      </div>

      <div className="stat-strip">
        <div className="stat-strip__inner stagger-children">
          {[
            { n: "2026",         l: "Founded" },
            { n: "6",            l: "Campaigns Planned" },
            { n: "Maharashtra",  l: "Starting Region" },
            { n: "100%",         l: "Donation Transparency" },
          ].map(({ n, l }) => (
            <div key={l} className="stat-strip__item">
              <span className="stat-strip__num">{n}</span>
              <span className="stat-strip__label">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   VISION
══════════════════════════════════════════ */
function Vision() {
  useReveal();
  const items = [
    { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=200&q=80", text: "Work as a catalyst in bringing sustainable change in the lives of underprivileged children and families with a life-cycle approach to development." },
    { img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&q=80",    text: "Enable civil society across India to engage proactively in the change process through the philosophy of community-driven progress." },
    { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80", text: "Adopt the highest standards of governance to emerge as a knowledge and community-driven, innovative, and scalable development institution." },
  ];

  return (
    <div className="tab-panel">
      <div className="about-section">
        <div className="section-header reveal">
          <p className="eyebrow eyebrow--center">Our Vision</p>
          <h2 className="sec-head sec-head--center">
            A just and <span>dignified</span> India for all
          </h2>
          <p className="body-txt">
            We envision a nation where access to education, healthcare, and opportunity is not determined by birth — but by possibility.
          </p>
        </div>

        <div className="vision-grid stagger-children">
          {items.map(({ img, text }) => (
            <div key={text} className="about-card about-card--top-border">
              <div className="vision-icon">
                <img src={img} alt="" className="vision-icon__img" />
              </div>
              <p className="body-txt" style={{ marginBottom: 0, fontSize: 15 }}>{text}</p>
            </div>
          ))}
        </div>

        <div className="vision-quote-img reveal reveal--scale" style={{ marginTop: 48 }}>
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80" alt="Children learning" />
          <div className="vision-quote-img__overlay">
            <p className="vision-quote-img__text">
              "No child should grow up believing that their circumstances define their ceiling."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MISSION
══════════════════════════════════════════ */
function Mission() {
  useReveal();
  const pillars = [
    { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&q=80", label: "Education",     desc: "Distributing books, stationery, and running learning programs for underprivileged children across India." },
    { img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=120&q=80", label: "Healthcare",    desc: "Providing medicines, vaccines, and running free health camps to ensure medical access for all." },
    { img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=120&q=80",    label: "Sanitation",    desc: "Organising cleanliness drives, building sanitation infrastructure, and distributing hygiene kits." },
    { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80", label: "Financial Aid", desc: "Offering targeted financial support programs to vulnerable individuals and families in need." },
  ];

  return (
    <div className="tab-panel">
      <div className="about-section about-section--wide">
        <div className="section-header reveal">
          <p className="eyebrow eyebrow--center">Our Mission</p>
          <h2 className="sec-head sec-head--center">
            Uplift, empower, and <span>never leave anyone behind</span>
          </h2>
          <p className="body-txt">
            At Sarita Foundation, our mission is to uplift underprivileged communities by delivering essential support across four pillars of sustainable development.
          </p>
        </div>

        <div className="mission-pillars stagger-children">
          {pillars.map(({ img, label, desc }) => (
            <div key={label} className="pillar-card">
              <div className="pillar-icon">
                <img src={img} alt={label} className="pillar-icon__img" />
              </div>
              <div>
                <h3 className="pillar-title">{label}</h3>
                <p className="pillar-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mission-banner reveal">
        <p className="mission-banner__text">
          "Through cleanliness drives, awareness campaigns, healthcare initiatives, and financial support programs, we strive to improve the quality of life for every vulnerable family."
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   OUR VALUES
══════════════════════════════════════════ */
function OurValues() {
  useReveal();
  const values = [
    { img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=120&q=80", title: "Compassion",     desc: "We lead with empathy, treating every individual with dignity and care — never as a beneficiary, but as a partner." },
    { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&q=80", title: "Transparency",   desc: "Every donation is tracked and reported publicly. Quarterly impact reports, no hidden costs, no surprises." },
    { img: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=120&q=80", title: "Sustainability", desc: "Our programs are built for lasting change. We exit only when communities are fully self-sufficient." },
    { img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=120&q=80",    title: "Community-Led",  desc: "We work alongside communities, co-creating solutions. Local voices always shape our programs." },
    { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=120&q=80", title: "Accountability", desc: "We hold ourselves to the highest standards — every rupee, every volunteer hour is tracked and justified." },
    { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=120&q=80", title: "Focus",          desc: "We stay deliberately small and focused. Depth of impact over breadth of presence — always." },
  ];

  return (
    <div className="tab-panel">
      <div className="about-section">
        <div className="section-header reveal">
          <p className="eyebrow eyebrow--center">What Guides Us</p>
          <h2 className="sec-head sec-head--center">Our Core Values</h2>
        </div>
        <div className="values-grid stagger-children">
          {values.map(({ img, title, desc }) => (
            <div key={title} className="value-card">
              <div className="value-icon">
                <img src={img} alt={title} className="value-icon__img" />
              </div>
              <h3 className="value-title">{title}</h3>
              <p className="value-desc">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HOW WE WORK
══════════════════════════════════════════ */
function HowWeWork() {
  useReveal();
  const models = [
    { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=160&q=80", title: "Community Partnership Model", desc: "Sarita Foundation identifies and partners with credible grassroots organisations. We build their capacity, provide funding, and handhold them toward sustainability — so impact scales beyond our direct reach." },
    { img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=160&q=80", title: "Direct Outreach",              desc: "For high-urgency needs — health emergencies, school enrollment drives — we deploy our own volunteers directly. Speed and precision matter when lives are at stake." },
    { img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=160&q=80", title: "Evidence-Based Programs",      desc: "Every program we run is designed around community needs assessments. We measure outcomes, not outputs — and we will publish results publicly every quarter." },
  ];

  const steps = [
    { n: "01", label: "Assess",  desc: "Ground-level needs mapping with communities" },
    { n: "02", label: "Design",  desc: "Co-create solutions with local partners" },
    { n: "03", label: "Execute", desc: "Deploy programs with full accountability" },
    { n: "04", label: "Measure", desc: "Track outcomes and publish results" },
  ];

  return (
    <div className="tab-panel">
      <div className="about-section">
        <div className="section-header reveal">
          <p className="eyebrow eyebrow--center">Our Approach</p>
          <h2 className="sec-head sec-head--center">How We Create Lasting Change</h2>
        </div>

        <div className="models-list stagger-children">
          {models.map(({ img, title, desc }) => (
            <div key={title} className="model-card">
              <div className="model-icon">
                <img src={img} alt={title} className="model-icon__img" />
              </div>
              <div>
                <h3 className="model-title">{title}</h3>
                <p className="model-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="process-section">
        <div className="process-inner">
          <p className="eyebrow eyebrow--center">The Process</p>
          <h2 className="sec-head sec-head--center">From Idea to Impact</h2>
          <div className="process-steps">
            <div className="process-line" />
            <div className="process-line-fill" />
            {steps.map(({ n, label, desc }) => (
              <div key={n} className="process-step">
                <div className="process-step__num">{n}</div>
                <h4 className="process-step__label">{label}</h4>
                <p className="process-step__desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   WHY TRUST US
══════════════════════════════════════════ */
function WhyTrustUs() {
  useReveal();
  const reasons = [
    { img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=120&q=80", title: "Full Financial Transparency",  desc: "We will publish detailed income and expenditure reports from the very first campaign — available for download on our website." },
    { img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=120&q=80",    title: "80G Tax Exemption",             desc: "All donations to Sarita Foundation qualify for tax deduction under Section 80G of the Income Tax Act." },
    { img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=120&q=80", title: "FCRA Registered",               desc: "Registered under the Foreign Contribution Regulation Act, enabling transparent international donations." },
    { img: "https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=120&q=80", title: "Zero Overhead Promise",         desc: "100% of public donations fund direct programs. Operational costs are covered by institutional grants." },
    { img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=120&q=80", title: "Independent Founding Board",    desc: "Our governing board includes independent professionals who review all major financial and program decisions from day one." },
    { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=120&q=80", title: "Community-First Approach",      desc: "Every program is co-designed with the communities we serve. We do not build programs in boardrooms." },
  ];

  const testimonials = [
    { quote: "My daughter is the first in our family to finish school. Sarita Foundation made it possible.", name: "Priya Desai",   role: "Parent, Pune",      img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80" },
    { quote: "The healthcare camp reached our village when no one else would. These are real heroes.",       name: "Ramesh Yadav",  role: "Farmer, Nashik",    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80" },
    { quote: "Donating was seamless. Knowing exactly where my money goes makes all the difference.",         name: "Ananya Iyer",   role: "Donor, Bengaluru",  img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
  ];

  return (
    <div className="tab-panel">
      <div className="about-section">
        <div className="section-header reveal">
          <p className="eyebrow eyebrow--center">Trust and Accountability</p>
          <h2 className="sec-head sec-head--center">Why donors choose us — and stay with us</h2>
        </div>

        <div className="trust-grid stagger-children">
          {reasons.map(({ img, title, desc }) => (
            <div key={title} className="about-card">
              <div className="trust-icon">
                <img src={img} alt={title} className="trust-icon__img" />
              </div>
              <h3 className="trust-title">{title}</h3>
              <p className="trust-desc">{desc}</p>
            </div>
          ))}
        </div>

        <div className="testimonials-section reveal">
          <p className="eyebrow eyebrow--center">Voices from the Field</p>
          <h2 className="sec-head sec-head--center">What people say</h2>
          <div className="testimonials-grid stagger-children">
            {testimonials.map(({ quote, name, role, img }) => (
              <div key={name} className="testimonial-card">
                <p className="testimonial-quote">"{quote}"</p>
                <div className="testimonial-author">
                  <img src={img} alt={name} />
                  <div>
                    <p className="testimonial-name">{name}</p>
                    <p className="testimonial-role">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
const PANELS = [OurStory, Vision, Mission, OurValues, HowWeWork, WhyTrustUs];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const Panel = PANELS[activeTab];

  function handleTab(i) {
    setActiveTab(i);
    // Scroll content into view smoothly after tab switch
    setTimeout(() => {
      document.querySelector(".about-content")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 50);
  }

  return (
    <div className="about-page">

      {/* Hero */}
      <div className="about-hero">
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
          alt="Sarita Foundation community work"
          className="about-hero__img"
        />
        <div className="about-hero__overlay" />
        <div className="about-hero__text">
          <p className="about-hero__eyebrow">About Sarita Foundation</p>
          <h1 className="about-hero__heading">
            REAL COMPASSION. <span>REAL CHANGE.</span>
          </h1>
          <p className="about-hero__sub">
            Uplifting communities across India through education, healthcare, dignity, and hope.
          </p>
        </div>
      </div>

      {/* Sticky tab bar */}
      <div className="about-tabs">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            className={`about-tab-btn${activeTab === i ? " active" : ""}`}
            onClick={() => handleTab(i)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content — key forces remount on tab change so animations replay */}
      <div className="about-content">
        <Panel key={activeTab} />
      </div>

      {/* CTA */}
      <div className="about-cta">
        <div className="about-cta__blob--orange" />
        <div className="about-cta__blob--green" />
        <p className="about-cta__eyebrow">Join Us</p>
        <h2 className="about-cta__heading">Ready to be part of the story?</h2>
        <p className="about-cta__body">Every donation makes a direct difference to lives across India.</p>
        <div className="about-cta__actions">
          <Link to="/donate" className="btn-donate">Donate Now →</Link>
        </div>
      </div>
    </div>
  );
}
