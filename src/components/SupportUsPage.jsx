import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const VOLUNTEER_ROLES = [
  { icon: "✏️", label: "Teach Students", desc: "Conduct weekly classes for underprivileged children in your area." },
  { icon: "📦", label: "Donation Drives", desc: "Organize and participate in collection drives at your locality." },
  { icon: "📢", label: "Campaign Support", desc: "Help plan and execute our cleanliness & awareness campaigns." },
  { icon: "🩺", label: "Health Camps", desc: "Assist medical volunteers at our free health camps." },
];

const PARTNERS = [
  { icon: "🏫", label: "Schools", color: "#2E7D5B", bg: "#E8F5EE" },
  { icon: "🎓", label: "Colleges", color: "#1A5E8C", bg: "#E6F2FB" },
  { icon: "🏥", label: "Hospitals", color: "#8B2252", bg: "#FAE8F2" },
  { icon: "🏢", label: "Corporate CSR", color: "#5B4A8A", bg: "#EEE8FA" },
  { icon: "🛍️", label: "Local Businesses", color: "#7A4A20", bg: "#F7EDDE" },
];

const IN_KIND = [
  { icon: "📚", label: "Books", color: "#C4773B" },
  { icon: "📓", label: "Notebooks", color: "#2E7D5B" },
  { icon: "🎒", label: "School Bags", color: "#1A5E8C" },
  { icon: "👕", label: "Clothes", color: "#8B2252" },
  { icon: "💊", label: "Medicines", color: "#5B4A8A" },
  { icon: "🧴", label: "Hygiene Kits", color: "#7A4A20" },
];

function VolunteerCard({ role, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-6px) rotate(-1deg)" : "translateY(0) rotate(0)"
          : "translateY(40px)",
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.4s ease`,
        background: hovered ? "#1C1410" : "#fff",
        border: `2px solid ${hovered ? "#C4773B" : "#EDE4D4"}`,
        borderRadius: "18px",
        padding: "32px 28px",
        cursor: "default",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative corner accent */}
      <div style={{
        position: "absolute", top: 0, right: 0,
        width: "80px", height: "80px",
        background: hovered ? "#C4773B22" : "#EDE5D4",
        borderRadius: "0 18px 0 80px",
        transition: "all 0.4s ease",
      }} />
      <div style={{ fontSize: "36px", marginBottom: "16px" }}>{role.icon}</div>
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "20px", fontWeight: 900,
        color: hovered ? "#EDE5D4" : "#1C1410",
        margin: "0 0 10px",
        transition: "color 0.3s ease",
      }}>{role.label}</h3>
      <p style={{
        fontSize: "14px", lineHeight: 1.7,
        color: hovered ? "#9A8878" : "#6B5B46",
        margin: 0,
        transition: "color 0.3s ease",
      }}>{role.desc}</p>
    </div>
  );
}

function PartnerPill({ partner, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "scale(1.06)" : "scale(1)"
          : "scale(0.85)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.35s ease`,
        background: hovered ? partner.color : partner.bg,
        border: `2px solid ${partner.color}44`,
        borderRadius: "50px",
        padding: "14px 28px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "default",
      }}
    >
      <span style={{ fontSize: "22px" }}>{partner.icon}</span>
      <span style={{
        fontWeight: 700, fontSize: "15px",
        color: hovered ? "#fff" : partner.color,
        transition: "color 0.3s ease",
      }}>{partner.label}</span>
    </div>
  );
}

function InKindItem({ item, index }) {
  const [ref, inView] = useInView(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(30px) rotate(4deg)",
        transition: `opacity 0.55s ease ${index * 70}ms, transform 0.35s ease`,
        background: "#fff",
        border: `2px dashed ${item.color}66`,
        borderRadius: "14px",
        padding: "24px 16px",
        textAlign: "center",
        cursor: "default",
      }}
    >
      <div style={{
        fontSize: "34px", marginBottom: "10px",
        filter: hovered ? "none" : "grayscale(20%)",
        transition: "filter 0.3s",
      }}>{item.icon}</div>
      <div style={{
        fontWeight: 700, fontSize: "13px",
        color: hovered ? item.color : "#4A3D30",
        letterSpacing: "0.04em",
        transition: "color 0.3s",
      }}>{item.label}</div>
    </div>
  );
}

function SectionLabel({ children }) {
  const [ref, inView] = useInView(0.1);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateX(0)" : "translateX(-24px)",
      transition: "all 0.6s ease",
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      marginBottom: "16px",
    }}>
      <div style={{ width: "32px", height: "2px", background: "#C4773B" }} />
      <span style={{
        fontSize: "11px", fontWeight: 700,
        color: "#C4773B", letterSpacing: "0.15em",
        textTransform: "uppercase",
      }}>{children}</span>
    </div>
  );
}

function SectionHeading({ children, delay = 0 }) {
  const [ref, inView] = useInView(0.1);
  return (
    <h2 ref={ref} style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "clamp(30px, 4vw, 48px)",
      fontWeight: 900,
      color: "#1C1410",
      lineHeight: 1.15,
      margin: "0 0 20px",
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `all 0.7s ease ${delay}ms`,
    }}>{children}</h2>
  );
}

export default function SupportUsPage() {
  const [heroRef, heroInView] = useInView(0.05);

  return (
    <div style={{
      background: "#EDE5D4",
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: "80px",
      overflowX: "hidden",
    }}>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "80px 24px 70px",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "center",
      }}>
        <div>
          <div style={{
            display: "inline-block",
            background: "#C4773B",
            color: "#fff",
            fontSize: "11px", fontWeight: 700,
            letterSpacing: "0.15em", textTransform: "uppercase",
            padding: "6px 18px", borderRadius: "20px",
            marginBottom: "28px",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(16px)",
            transition: "all 0.6s ease 100ms",
          }}>Support Us</div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(38px, 5vw, 64px)",
            fontWeight: 900,
            color: "#1C1410",
            lineHeight: 1.1,
            margin: "0 0 24px",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.8s ease 200ms",
          }}>
            You Can Be<br />
            <em style={{ color: "#C4773B" }}>Someone's</em><br />
            Hero Today.
          </h1>

          <p style={{
            fontSize: "17px", color: "#6B5B46",
            lineHeight: 1.85, margin: "0 0 36px",
            maxWidth: "480px",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 400ms",
          }}>
            There are many ways to make a difference — volunteer your time,
            partner your organisation, or donate essentials. Every act of
            kindness multiplies when it reaches those who need it most.
          </p>

          <div style={{
            display: "flex", gap: "14px", flexWrap: "wrap",
            opacity: heroInView ? 1 : 0,
            transform: heroInView ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s ease 600ms",
          }}>
            {["Volunteer", "Partner", "Donate In-Kind"].map((label, i) => (
              <a key={label} href={`#${label.toLowerCase().replace(/\s/g, "-")}`}
                style={{
                  background: i === 0 ? "#1C1410" : "transparent",
                  color: i === 0 ? "#EDE5D4" : "#1C1410",
                  border: "2px solid #1C1410",
                  fontSize: "14px", fontWeight: 700,
                  padding: "12px 24px", borderRadius: "50px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#C4773B";
                  e.target.style.borderColor = "#C4773B";
                  e.target.style.color = "#fff";
                }}
                onMouseLeave={e => {
                  e.target.style.background = i === 0 ? "#1C1410" : "transparent";
                  e.target.style.borderColor = "#1C1410";
                  e.target.style.color = i === 0 ? "#EDE5D4" : "#1C1410";
                }}
              >{label}</a>
            ))}
          </div>
        </div>

        {/* Hero image collage */}
        <div style={{
          position: "relative", height: "480px",
          opacity: heroInView ? 1 : 0,
          transform: heroInView ? "translateX(0)" : "translateX(40px)",
          transition: "all 0.9s ease 300ms",
        }}>
          <img src="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=700&q=80"
            alt="Volunteers helping community"
            style={{
              position: "absolute", top: 0, left: "10%",
              width: "75%", height: "300px",
              objectFit: "cover", borderRadius: "20px",
              border: "4px solid #fff",
              boxShadow: "0 12px 40px #1C141022",
            }} />
          <img src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=500&q=80"
            alt="Donation drive"
            style={{
              position: "absolute", bottom: 0, left: 0,
              width: "52%", height: "200px",
              objectFit: "cover", borderRadius: "16px",
              border: "4px solid #fff",
              boxShadow: "0 8px 28px #1C141022",
            }} />
          <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=500&q=80"
            alt="Health camp"
            style={{
              position: "absolute", bottom: 20, right: 0,
              width: "44%", height: "170px",
              objectFit: "cover", borderRadius: "16px",
              border: "4px solid #fff",
              boxShadow: "0 8px 28px #1C141022",
            }} />
          {/* Floating badge */}
          <div style={{
            position: "absolute", top: "18%", right: "-10px",
            background: "#C4773B", color: "#fff",
            borderRadius: "14px", padding: "12px 18px",
            fontFamily: "'Playfair Display', serif",
            fontSize: "13px", fontWeight: 900,
            boxShadow: "0 4px 20px #C4773B44",
            lineHeight: 1.3,
          }}>
            🙋 Join<br />1200+ Volunteers
          </div>
        </div>
      </section>

      {/* ── Volunteer Section ── */}
      <section id="volunteer" style={{ background: "#EDE5D4", padding: "90px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ marginBottom: "56px" }}>
            <SectionLabel>Get Involved</SectionLabel>
            <SectionHeading>🙋 Volunteer<em style={{ color: "#C4773B", fontStyle: "italic" }}> With Us</em></SectionHeading>
            <p style={{ fontSize: "17px", color: "#6B5B46", maxWidth: "560px", lineHeight: 1.8, margin: 0 }}>
              Volunteers are the heartbeat of our work. Whether you give an hour or a year, your time creates real change for real people.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "24px", marginBottom: "48px" }}>
            {VOLUNTEER_ROLES.map((role, i) => (
              <VolunteerCard key={role.label} role={role} index={i} />
            ))}
          </div>

          {/* Image strip */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "16px", borderRadius: "20px", overflow: "hidden" }}>
            {[
              { src: "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=900&q=80", alt: "Volunteers teaching children" },
              { src: "https://images.unsplash.com/photo-1416339306562-f3d12fefd36f?w=600&q=80", alt: "Donation campaign" },
              { src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&q=80", alt: "Team organizing" },
            ].map(({ src, alt }) => (
              <div key={src} style={{ overflow: "hidden", height: "220px" }}>
                <img src={src} alt={alt}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
                  onMouseEnter={e => (e.target.style.transform = "scale(1.06)")}
                  onMouseLeave={e => (e.target.style.transform = "scale(1)")}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Section ── */}
      <section id="partner" style={{ padding: "90px 24px", background: "#EDE5D4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
          {/* Image */}
          <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", height: "420px" }}>
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=900&q=80"
              alt="Corporate partnership meeting"
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              onMouseEnter={e => (e.target.style.transform = "scale(1.04)")}
              onMouseLeave={e => (e.target.style.transform = "scale(1)")}
            />
            <div style={{
              position: "absolute", bottom: 24, left: 24, right: 24,
              background: "rgba(28,20,16,0.85)",
              backdropFilter: "blur(8px)",
              borderRadius: "14px", padding: "18px 22px",
              color: "#EDE5D4",
            }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 900, margin: "0 0 4px" }}>
                "Together we reach further."
              </p>
              <p style={{ fontSize: "13px", color: "#9A8878", margin: 0 }}>— Sarita Foundation Partners</p>
            </div>
          </div>

          {/* Content */}
          <div>
            <SectionLabel>Collaborate</SectionLabel>
            <SectionHeading delay={100}>🏢 Partner<em style={{ color: "#C4773B", fontStyle: "italic" }}> With Us</em></SectionHeading>
            <p style={{ fontSize: "16px", color: "#6B5B46", lineHeight: 1.85, margin: "0 0 36px" }}>
              Institutions and businesses can amplify their social impact by joining hands with us. Whether through CSR initiatives, on-campus drives, or resource sharing — every partnership matters.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {PARTNERS.map((p, i) => (
                <PartnerPill key={p.label} partner={p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── In-Kind Section ── */}
      <section id="donate-in-kind" style={{ background: "#1C1410", padding: "90px 24px", position: "relative", overflow: "hidden" }}>
        {/* Decorative rings */}
        {[400, 600, 800].map((size, i) => (
          <div key={i} style={{
            position: "absolute", top: "50%", right: "-100px",
            transform: "translateY(-50%)",
            width: size, height: size, borderRadius: "50%",
            border: `1px solid rgba(196,119,59,${0.05 + i * 0.03})`,
            pointerEvents: "none",
          }} />
        ))}

        <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
          <div style={{ marginBottom: "56px", textAlign: "center" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              marginBottom: "16px",
            }}>
              <div style={{ width: "32px", height: "2px", background: "#C4773B" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#C4773B", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Donate In-Kind
              </span>
              <div style={{ width: "32px", height: "2px", background: "#C4773B" }} />
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 4vw, 48px)",
              fontWeight: 900, color: "#EDE5D4",
              lineHeight: 1.15, margin: "0 0 20px",
            }}>
              🤲 What We<em style={{ color: "#C4773B", fontStyle: "italic" }}> Accept</em>
            </h2>
            <p style={{ fontSize: "17px", color: "#9A8878", maxWidth: "520px", margin: "0 auto", lineHeight: 1.8 }}>
              Can't donate money? No problem. Your unused books, clothes, and medicines reach families who need them most.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "20px", marginBottom: "60px" }}>
            {IN_KIND.map((item, i) => (
              <InKindItem key={item.label} item={item} index={i} />
            ))}
          </div>

          {/* Drop-off CTA */}
          <div style={{
            background: "#2A1E17",
            border: "1.5px solid #C4773B44",
            borderRadius: "20px",
            padding: "40px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "24px",
          }}>
            <div>
              <p style={{ color: "#C4773B", fontWeight: 700, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "8px" }}>
                Drop-Off or Arrange Pickup
              </p>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "24px", fontWeight: 900,
                color: "#EDE5D4", margin: "0 0 8px",
              }}>Got something to donate?</h3>
              <p style={{ fontSize: "15px", color: "#9A8878", margin: 0 }}>
                Reach out and we'll coordinate collection at your convenience.
              </p>
            </div>
            <a href="/contact" style={{
              background: "#C4773B", color: "#fff",
              fontWeight: 700, fontSize: "15px",
              padding: "14px 32px", borderRadius: "50px",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "all 0.3s ease",
              flexShrink: 0,
            }}
              onMouseEnter={e => { e.target.style.background = "#E8943A"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "#C4773B"; e.target.style.transform = "translateY(0)"; }}
            >
              Contact Us →
            </a>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section style={{ padding: "80px 24px", textAlign: "center", background: "#EDE5D4" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <p style={{ fontSize: "48px", marginBottom: "20px" }}>🌟</p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 900, color: "#1C1410",
            margin: "0 0 20px",
          }}>
            Ready to <em style={{ color: "#C4773B" }}>Make a Difference?</em>
          </h2>
          <p style={{ fontSize: "16px", color: "#6B5B46", lineHeight: 1.8, marginBottom: "36px" }}>
            Whether you have time, resources, or connections — there's a place for you in our mission.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/contact" style={{
              background: "#1C1410", color: "#EDE5D4",
              fontWeight: 700, fontSize: "15px",
              padding: "14px 32px", borderRadius: "50px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.target.style.background = "#C4773B"; }}
              onMouseLeave={e => { e.target.style.background = "#1C1410"; }}
            >Get in Touch →</a>
            <a href="/donate" style={{
              background: "transparent", color: "#1C1410",
              border: "2px solid #1C1410",
              fontWeight: 700, fontSize: "15px",
              padding: "14px 32px", borderRadius: "50px",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
              onMouseEnter={e => { e.target.style.background = "#C4773B"; e.target.style.borderColor = "#C4773B"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.borderColor = "#1C1410"; e.target.style.color = "#1C1410"; }}
            >Donate Money</a>
          </div>
        </div>
      </section>
    </div>
  );
}