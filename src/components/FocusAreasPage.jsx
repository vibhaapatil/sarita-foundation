import { useEffect, useRef, useState } from "react";

const FOCUS_AREAS = [
  {
    id: "education",
    title: "Education & Learning",
    tagline: "Every child deserves a pencil.",
    description:
      "We distribute books, stationery, school bags, and learning materials to children who cannot afford them. Education is the single most powerful tool to break the cycle of poverty.",
    stat: "Distribution of Educational Resources",
    color: "#C4773B",
    lightBg: "#FDF3E7",
    accent: "#E8943A",
    icon: "📚",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
    imageAlt: "Children studying with books",
    items: ["Textbooks & notebooks", "School bags & stationery", "Digital learning kits", "Tutoring support"],
  },
  {
    id: "cleanliness",
    title: "Cleanliness Campaigns",
    tagline: "Clean communities, healthy futures.",
    description:
      "Our sanitation drives reach the most underserved localities — distributing hygiene kits, conducting awareness campaigns, and building habits that protect entire communities.",
    stat: "Maintaining Cleaner Communities",
    color: "#2E7D5B",
    lightBg: "#E8F5EE",
    accent: "#3DA06E",
    icon: "🧼",
    image:
      "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80",
    imageAlt: "Community cleanliness drive",
    items: ["Hygiene kits & soap", "Sanitation awareness", "Clean water access", "Menstrual hygiene support"],
  },
  {
    id: "financial",
    title: "Financial Relief",
    tagline: "Dignity in times of need.",
    description:
      "We provide direct financial assistance to families in acute distress — covering emergency needs, helping with school fees, and bridging the gap during crises.",
    stat: "Financial Help Is Provided",
    color: "#1A5E8C",
    lightBg: "#E6F2FB",
    accent: "#2378B0",
    icon: "💛",
    image:
      "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
    imageAlt: "Helping families in need",
    items: ["Emergency cash relief", "School fee support", "Disaster response funds", "Widow & elderly support"],
  },
  {
    id: "health",
    title: "Healthcare Access",
    tagline: "No one should suffer for lack of care.",
    description:
      "From free health camps to medicine distribution, we connect the most vulnerable to the medical support they need — including vaccinations, check-ups, and specialist referrals.",
    stat: "Helping Patients",
    color: "#8B2252",
    lightBg: "#FAE8F2",
    accent: "#B52D6A",
    icon: "❤️",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    imageAlt: "Healthcare support for communities",
    items: ["Free health camps", "Medicine distribution", "Vaccination drives", "Mental health support"],
  },
  {
    id: "medicines",
    title: "Medicines & Vaccines",
    tagline: "Life-saving care, freely given.",
    description:
      "We procure and distribute essential medicines, vaccines, and medical supplies to those who cannot afford them — working with doctors, hospitals, and volunteers.",
    stat: "Supply Of Medicines",
    color: "#5B4A8A",
    lightBg: "#EEE8FA",
    accent: "#7B62B8",
    icon: "💊",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80",
    imageAlt: "Medicine distribution",
    items: ["Essential medicines", "Childhood vaccines", "Chronic disease support", "Post-surgery care kits"],
  },
  {
    id: "relief",
    title: "Essential Relief Distribution",
    tagline: "First help, when it matters most.",
    description:
      "Food, clothing, blankets, and daily essentials — distributed to the poorest families, disaster victims, and homeless communities across the region.",
    stat: "Support For Families In Need",
    color: "#7A4A20",
    lightBg: "#F7EDDE",
    accent: "#A8622B",
    icon: "🤲",
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    imageAlt: "Relief distribution to poor families",
    items: ["Food & ration kits", "Clothing & blankets", "Festival joy drives", "Disaster relief camps"],
  },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function AnimatedText({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView(0.1);
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </span>
  );
}

function FocusCard({ area, index }) {
  const [ref, inView] = useInView(0.1);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s ease ${index * 80}ms, transform 0.8s ease ${index * 80}ms`,
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        border: `1.5px solid ${area.lightBg}`,
        boxShadow: `0 4px 32px ${area.color}12`,
        display: "flex",
        flexDirection: isEven ? "row" : "row-reverse",
        minHeight: "340px",
      }}
    >
      {/* Image Panel */}
      <div
        style={{
          width: "42%",
          flexShrink: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <img
          src={area.image}
          alt={area.imageAlt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s ease",
          }}
          onMouseEnter={e => (e.target.style.transform = "scale(1.04)")}
          onMouseLeave={e => (e.target.style.transform = "scale(1)")}
        />
        {/* Color overlay strip */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(${isEven ? "to right" : "to left"}, transparent 60%, ${area.lightBg}CC)`,
          }}
        />
        {/* Icon badge */}
        <div
          style={{
            position: "absolute",
            top: 20,
            [isEven ? "right" : "left"]: -1,
            background: area.color,
            color: "#fff",
            fontSize: "22px",
            width: "52px",
            height: "52px",
            borderRadius: isEven ? "12px 0 0 12px" : "0 12px 12px 0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {area.icon}
        </div>
      </div>

      {/* Content Panel */}
      <div
        style={{
          flex: 1,
          padding: "40px 44px",
          background: area.lightBg,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "14px",
        }}
      >
        {/* Stat pill */}
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            background: area.color,
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "5px 14px",
            borderRadius: "20px",
          }}
        >
          {area.stat}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(22px, 2.6vw, 30px)",
            fontWeight: 900,
            color: "#1C1410",
            lineHeight: 1.18,
            margin: 0,
          }}
        >
          {area.title}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontStyle: "italic",
            fontSize: "16px",
            color: area.color,
            margin: 0,
          }}
        >
          "{area.tagline}"
        </p>

        {/* Description */}
        <p
          style={{
            fontSize: "15px",
            color: "#4A3D30",
            lineHeight: 1.75,
            margin: 0,
          }}
        >
          {area.description}
        </p>

        {/* Items */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "4px",
          }}
        >
          {area.items.map((item) => (
            <span
              key={item}
              style={{
                background: "#fff",
                border: `1.5px solid ${area.accent}44`,
                color: area.color,
                fontSize: "12px",
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: "20px",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function CounterStat({ value, label, color, delay }) {
  const [ref, inView] = useInView(0.2);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(20px) scale(0.95)",
        transition: `all 0.6s ease ${delay}ms`,
        textAlign: "center",
        padding: "28px 16px",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(28px, 4vw, 44px)",
          fontWeight: 900,
          color,
          lineHeight: 1,
          marginBottom: "8px",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: "13px", color: "#7A6A54", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

export default function FocusAreasPage() {
  const [heroRef, heroInView] = useInView(0.05);

  return (
    <div
      style={{
        background: "#F5F0E8",
        minHeight: "100vh",
        fontFamily: "'DM Sans', sans-serif",
        paddingTop: "80px",
        overflowX: "hidden",
      }}
    >
      {/* ── Hero ── */}
      <section
        ref={heroRef}
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "80px 24px 60px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Decorative ring */}
        <div
          style={{
            position: "absolute",
            top: 40,
            left: "50%",
            transform: "translateX(-50%)",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            border: "1px solid #C4773B22",
            pointerEvents: "none",
            opacity: heroInView ? 1 : 0,
            transition: "opacity 1.2s ease 300ms",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 80,
            left: "50%",
            transform: "translateX(-50%)",
            width: "340px",
            height: "340px",
            borderRadius: "50%",
            border: "1px solid #C4773B33",
            pointerEvents: "none",
            opacity: heroInView ? 1 : 0,
            transition: "opacity 1.2s ease 500ms",
          }}
        />

        <div
          style={{
            display: "inline-block",
            background: "#C4773B",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "6px 18px",
            borderRadius: "20px",
            marginBottom: "28px",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 100ms",
          }}
        >
          Our Focus Areas
        </div>

        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(38px, 6vw, 72px)",
            fontWeight: 900,
            color: "#1C1410",
            lineHeight: 1.1,
            margin: "0 0 24px",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.8s ease 200ms",
          }}
        >
          Where Every Rupee<br />
          <em style={{ color: "#C4773B", fontStyle: "italic" }}>Changes Lives</em>
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "#6B5B46",
            lineHeight: 1.8,
            maxWidth: "640px",
            margin: "0 auto 48px",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 400ms",
          }}
        >
          At Sarita Foundation, we believe every person deserves basic dignity. Our
          work spans education, health, financial relief, and cleanliness — reaching
          the most vulnerable with the most essential.
        </p>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            background: "#fff",
            borderRadius: "16px",
            border: "1.5px solid #E8D8C4",
            overflow: "hidden",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(24px)",
            transition: "all 0.8s ease 600ms",
          }}
        >
          <CounterStat value="1 Lakh+" label="Lives Touched" color="#C4773B" delay={0} />
          <div style={{ borderLeft: "1px solid #E8D8C4", borderRight: "1px solid #E8D8C4" }}>
            <CounterStat value="6 Pillars" label="Focus Areas" color="#2E7D5B" delay={100} />
          </div>
          <CounterStat value="15+ Years" label="Of Service" color="#1A5E8C" delay={200} />
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ maxWidth: "120px", margin: "0 auto 72px", height: "2px", background: "linear-gradient(to right, transparent, #C4773B, transparent)" }} />

      {/* ── Cards ── */}
      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 24px 100px",
          display: "flex",
          flexDirection: "column",
          gap: "40px",
        }}
      >
        {FOCUS_AREAS.map((area, i) => (
          <FocusCard key={area.id} area={area} index={i} />
        ))}
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          background: "#1C1410",
          padding: "80px 24px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        {[320, 520, 700].map((size, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: size,
              height: size,
              borderRadius: "50%",
              border: `1px solid rgba(196,119,59,${0.06 + i * 0.04})`,
              pointerEvents: "none",
            }}
          />
        ))}

        <div style={{ position: "relative" }}>
          <p style={{ color: "#C4773B", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "12px", marginBottom: "20px" }}>
            Join Our Mission
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 900,
              color: "#F5F0E8",
              margin: "0 0 20px",
              lineHeight: 1.2,
            }}
          >
            Be the Change.<br />
            <em style={{ color: "#C4773B" }}>Donate Today.</em>
          </h2>
          <p style={{ color: "#9A8878", fontSize: "16px", maxWidth: "500px", margin: "0 auto 40px", lineHeight: 1.8 }}>
            Every contribution, no matter how small, directly reaches the families who need it most.
          </p>
          <a
            href="/donate"
            style={{
              display: "inline-block",
              background: "#C4773B",
              color: "#fff",
              fontWeight: 700,
              fontSize: "16px",
              padding: "16px 40px",
              borderRadius: "50px",
              textDecoration: "none",
              letterSpacing: "0.02em",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { e.target.style.background = "#E8943A"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#C4773B"; e.target.style.transform = "translateY(0)"; }}
          >
            Donate Now →
          </a>
        </div>
      </section>
    </div>
  );
}