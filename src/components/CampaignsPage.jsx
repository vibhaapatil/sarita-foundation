import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "../css/CampaignsPage.css";


/* ─────────────────────────────────────────────
   Hero slides — upcoming campaign previews
───────────────────────────────────────────── */
const HERO_SLIDES = [
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80",
    tag: "Upcoming · Education",
    heading: ["SHIKSHA", "KE LIYE", "KADAM"],
    sub: "We are preparing to put books, notebooks, and stationery in the hands of children across rural Maharashtra. Be the first to support this campaign.",
    link: "/donate",
  },
  {
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1600&q=80",
    tag: "Upcoming · Healthcare",
    heading: ["SEHAT", "NAHIN", "RUKEGI"],
    sub: "Mobile health vans will reach remote villages with free consultations, medicines, and vaccines. Help us make this possible.",
    link: "/donate",
  },
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=80",
    tag: "Upcoming · Women Empowerment",
    heading: ["WO", "BADAL", "SAKTI HAI"],
    sub: "Skill-building workshops and financial support for widowed and vulnerable women are being planned. Your donation today seeds this future.",
    link: "/donate",
  },
  {
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80",
    tag: "Upcoming · Sanitation",
    heading: ["SWACHH", "GAON", "SWASTH LOG"],
    sub: "We are designing a hygiene kit distribution and sanitation drive for rural panchayats. Contribute now to help us launch sooner.",
    link: "/donate",
  },
];

/* ─────────────────────────────────────────────
   Upcoming campaigns — no raised/donor data
───────────────────────────────────────────── */
const CAMPAIGNS = [
  {
    img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    title: "BOOKS FOR EVERY CHILD",
    tag: "Education",
    desc: "Distributing textbooks, notebooks, and stationery to children in government schools across rural Maharashtra. No child should go to school empty-handed.",
    goal: "₹2,00,000",
    launch: "August 2025",
  },
  {
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&q=80",
    title: "MEDICAL SUPPLY DRIVE",
    tag: "Healthcare",
    desc: "Supplying essential medicines, first-aid kits, and health materials to remote villages and tribal communities that have no access to pharmacies.",
    goal: "₹1,50,000",
    launch: "September 2025",
  },
  {
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&q=80",
    title: "CLEAN VILLAGES INITIATIVE",
    tag: "Sanitation",
    desc: "Distributing hygiene kits — soap, toothbrushes, sanitary products, and handwash — to 500 households across 10 gram panchayats in rural India.",
    goal: "₹90,000",
    launch: "October 2025",
  },
  {
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    title: "WIDOW WELFARE FUND",
    tag: "Financial Aid",
    desc: "Providing monthly financial support and skill-building workshops to widowed and vulnerable women in urban slums — restoring dignity and independence.",
    goal: "₹1,20,000",
    launch: "November 2025",
  },
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    title: "DIGITAL CLASSROOMS",
    tag: "Education",
    desc: "Installing tablets and internet access in government schools in tribal areas so children can access quality digital education for the first time.",
    goal: "₹2,50,000",
    launch: "January 2026",
  },
  {
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    title: "FREE HEALTH CAMPS",
    tag: "Healthcare",
    desc: "Organising free health check-up camps in villages — blood pressure, diabetes screening, eye check-ups, and basic diagnostics for families who cannot afford clinics.",
    goal: "₹80,000",
    launch: "December 2025",
  },
];

/* ─────────────────────────────────────────────
   Our programmes
───────────────────────────────────────────── */
const PROGRAMMES = [
  { icon:"📚", bg:"#FFF3E0", title:"Education",             desc:"Holistic education, book distribution, and digital learning for underprivileged children across India." },
  { icon:"🏥", bg:"#E8F5E9", title:"Healthcare",            desc:"Taking medicines, health camps, and medical supplies to the doorsteps of hard-to-reach communities." },
  { icon:"💪", bg:"#F3E5F5", title:"Women Empowerment",     desc:"Empowering women through skill-building, financial support, and community engagement programs." },
  { icon:"🌾", bg:"#E3F2FD", title:"Livelihood",            desc:"Skill training and financial assistance for underprivileged youth to find stable employment." },
  { icon:"💧", bg:"#E0F7FA", title:"Sanitation & Hygiene",  desc:"Hygiene kit distribution, cleanliness drives, and sanitation infrastructure for rural households." },
  { icon:"🆘", bg:"#FCE4EC", title:"Disaster Relief",       desc:"Rapid food, shelter, and medical relief for communities affected by floods, droughts, and disasters." },
];

/* ─────────────────────────────────────────────
   How your donation helps
───────────────────────────────────────────── */
const HELPS = [
  {
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=600&q=80",
    icon: "📚",
    title: "Educate a Child",
    desc: "₹500 provides a full stationery kit — notebooks, pens, pencils, and a school bag — for one child for an entire academic year.",
  },
  {
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    icon: "💊",
    title: "Fund Medical Supplies",
    desc: "₹1,000 covers essential medicines and a first-aid kit for one family in a village with no nearby pharmacy or clinic.",
  },
  {
    img: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=600&q=80",
    icon: "🤝",
    title: "Support a Family",
    desc: "₹3,000 provides monthly financial support to a vulnerable widow or single mother for one full month, covering basic necessities.",
  },
];

/* ─────────────────────────────────────────────
   Reveal-on-scroll wrapper
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal${visible ? " reveal--visible" : ""}${className ? ` ${className}` : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Animated count-up stat
───────────────────────────────────────────── */
function AnimatedStat({ value, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const match = value.match(/^([\d,]+)(\+?)$/);
        if (!match) {
          setDisplay(value);
          obs.unobserve(el);
          return;
        }
        const target = parseInt(match[1].replace(/,/g, ""), 10);
        const suffix = match[2];
        const duration = 1300;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplay(current.toLocaleString("en-IN") + suffix);
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        obs.unobserve(el);
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value]);

  return (
    <div ref={ref}>
      <span className="impact-stat__num">{display ?? "0"}</span>
      <span className="impact-stat__label">{label}</span>
    </div>
  );
}

export default function CampaignsPage() {
  const [slide, setSlide] = useState(0);
  const slideRef = useRef(0);

  useEffect(() => { slideRef.current = slide; }, [slide]);
  useEffect(() => {
    const t = setInterval(() => {
      setSlide((slideRef.current + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="campaigns-page">

      {/* ── AUTO-ROTATING HERO ── */}
      <div className="camp-hero">
        {HERO_SLIDES.map((s, i) => (
          <div key={i} className={`camp-hero__slide${i === slide ? " active" : ""}`}>
            <img src={s.img} alt={s.heading.join(" ")} className="camp-hero__img" />
            <div className="camp-hero__overlay" />
            {i === slide && (
              <div className="camp-hero__text" key={slide}>
                <span className="camp-hero__tag">{s.tag}</span>
                <h1 className="camp-hero__heading">
                  {s.heading.map((line, li) => (
                    <span key={li} style={{ "--i": li }}>
                      {li === s.heading.length - 1
                        ? <span className="camp-hero__heading-accent">{line}</span>
                        : line}
                    </span>
                  ))}
                </h1>
                <p className="camp-hero__sub">{s.sub}</p>
                <Link to={s.link} className="camp-hero__btn">Pledge Your Support →</Link>
              </div>
            )}
          </div>
        ))}

        <p className="camp-hero__counter">
          <span>{String(slide + 1).padStart(2, "0")}</span> / {String(HERO_SLIDES.length).padStart(2, "0")}
        </p>
        <div className="camp-hero__dots">
          {HERO_SLIDES.map((_, i) => (
            <button
              key={i === slide ? `active-${slide}` : i}
              className={`camp-hero__dot${i === slide ? " active" : ""}`}
              onClick={() => setSlide(i)}
              aria-label={`Slide ${i + 1}`}
            >
              {i === slide && <span className="camp-hero__dot-fill" />}
            </button>
          ))}
        </div>
      </div>

      {/* ── UPCOMING CAMPAIGNS ── */}
      <div className="support-section">
        <Reveal>
          <h2 className="support-section__heading">Upcoming Campaigns</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="support-section__intro">
            These campaigns are being planned for rural and underprivileged communities across India.
            Your donation today helps us launch them sooner and reach more people.
          </p>
        </Reveal>
        <div className="support-grid">
          {CAMPAIGNS.map(({ img, title, tag, desc, goal, launch }, i) => (
            <Reveal key={title} delay={(i % 4) * 80} className="support-card-wrap">
              <div className="support-card">
                <div className="support-card__img-wrap">
                  <img src={img} alt={title} className="support-card__img" />
                  <div className="support-card__img-overlay" />
                  <h3 className="support-card__title">{title}</h3>
                </div>
                <div className="support-card__body">
                  <span className="support-card__tag">{tag}</span>

                  {/* Upcoming badge */}
                  <span className="support-card__upcoming">
                    <span className="support-card__upcoming-dot" />
                    Upcoming
                  </span>

                  <p className="support-card__desc">{desc}</p>

                  {/* Launch date */}
                  <p className="support-card__launch">
                    📅 Planned launch: <strong>{launch}</strong>
                  </p>

                  {/* Funding goal */}
                  <div className="support-card__goal">
                    <span>Funding Goal</span>
                    <strong>{goal}</strong>
                  </div>

                  <Link to="/donate" className="support-card__btn">Donate to Make This Happen →</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── OUR PROGRAMMES ── */}
      <div className="programmes-section">
        <div className="programmes-inner">
          <Reveal>
            <h2 className="programmes-heading">Our Programmes</h2>
          </Reveal>
          <div className="programmes-grid">
            {PROGRAMMES.map(({ icon, bg, title, desc }, i) => (
              <Reveal key={title} delay={(i % 2) * 90} className="programme-item-wrap">
                <div className="programme-item">
                  <div className="programme-icon" style={{ background: bg }}>{icon}</div>
                  <div>
                    <h3 className="programme-title">{title}</h3>
                    <p className="programme-desc">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── HOW YOUR DONATION HELPS ── */}
      <div className="helps-section">
        <Reveal>
          <h2 className="helps-heading">How Your Donation Helps</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="helps-subhead">
            Every rupee you donate goes directly toward one of these campaigns. Here's exactly what your contribution can do.
          </p>
        </Reveal>
        <div className="helps-grid">
          {HELPS.map(({ img, icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 100} className="helps-card-wrap">
              <div className="helps-card">
                <div className="helps-card__img-wrap">
                  <img src={img} alt={title} className="helps-card__img" />
                </div>
                <div className="helps-card__body">
                  <span className="helps-card__icon">{icon}</span>
                  <h3 className="helps-card__title">{title}</h3>
                  <p className="helps-card__desc">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── IMPACT GOALS ── */}
      <div className="impact-section">
        <div className="impact-inner">
          <Reveal>
            <h2 className="impact-heading">What We Aim to Achieve</h2>
          </Reveal>
          <div className="impact-grid">
            {[
              { n: "2,000+", l: "Children to receive books & stationery" },
              { n: "500+",   l: "Families to get medical supplies" },
              { n: "10",     l: "Villages targeted for sanitation drives" },
              { n: "6",      l: "Campaigns planned across India" },
            ].map(({ n, l }, i) => (
              <Reveal key={l} delay={i * 90}>
                <AnimatedStat value={n} label={l} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="camp-cta">
        <div className="camp-cta__glow" />
        <Reveal>
          <h2 className="camp-cta__heading">Be the First to Make It Happen</h2>
        </Reveal>
        <Reveal delay={80}>
          <p className="camp-cta__body">
            None of these campaigns have launched yet — but with your support, they can. Donate today and help us reach the communities that need it most.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <Link to="/donate" className="camp-cta__btn">Donate Now →</Link>
        </Reveal>
      </div>

    </div>
  );
}
