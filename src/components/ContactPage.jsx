import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
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

function FadeIn({ children, delay = 0, direction = "up", style = {} }) {
  const [ref, inView] = useInView(0.1);
  const transforms = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    scale: "scale(0.92)",
  };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[direction],
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      ...style,
    }}>
      {children}
    </div>
  );
}

const CONTACT_INFO = [
  {
    icon: "📍",
    label: "Visit Us",
    value: "Mumbai, Maharashtra",
    color: "#C4773B",
    bg: "#FDF3E7",
  },
  {
    icon: "📞",
    label: "Call Us",
    value: "+91 98765 43210\nMon–Sat, 9am–6pm",
    color: "#2E7D5B",
    bg: "#E8F5EE",
  },
  {
    icon: "✉️",
    label: "Email Us",
    value: "saritafoundation715@gmail.com\nWe reply within 24 hours",
    color: "#1A5E8C",
    bg: "#E6F2FB",
  },
  {
    icon: "📱",
    label: "WhatsApp",
    value: "+91 98765 43210\nQuick queries & updates",
    color: "#5B4A8A",
    bg: "#EEE8FA",
  },
];

const SUBJECTS = [
  "Volunteer With Us",
  "Partnership Inquiry",
  "In-Kind Donation",
  "General Query",
  "Media & Press",
  "Other",
];

export default function ContactPage() {
  const [heroRef, heroInView] = useInView(0.05);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!form.email.trim()) e.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email.";
    if (!form.subject) e.subject = "Please select a subject.";
    if (!form.message.trim()) e.message = "Please write a message.";
    return e;
  }

  function handleChange(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setErrors(er => ({ ...er, [e.target.name]: undefined }));
  }


  

async function handleSubmit(e) {
  e.preventDefault();
  const e2 = validate();
  if (Object.keys(e2).length) { setErrors(e2); return; }
  setSubmitting(true);

  try {
    await emailjs.send(
      "service_pwamgiz",
      "template_ainz6f7",
      form,
      "UbCmtDxYs00u-Ox--"
    );
    setSubmitted(true);
  } catch {
    alert("Failed to send. Please try again.");
  } finally {
    setSubmitting(false);
  }
}

  const inputStyle = (name) => ({
    width: "100%",
    padding: "14px 18px",
    fontSize: "15px",
    fontFamily: "'DM Sans', sans-serif",
    border: `2px solid ${errors[name] ? "#E24B4A" : focusedField === name ? "#C4773B" : "#EDE4D4"}`,
    borderRadius: "12px",
    background: focusedField === name ? "#FFFBF7" : "#fff",
    color: "#1C1410",
    outline: "none",
    transition: "all 0.25s ease",
    boxSizing: "border-box",
  });

  return (
    <div style={{
      background: "#EDE5D4",
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      paddingTop: "80px",
      overflowX: "hidden",
    }}>

      {/* ── Hero ── */}
      <section ref={heroRef} style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px 60px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

          {/* Left: text */}
          <div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "24px",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.6s ease 100ms",
            }}>
              <div style={{ width: "32px", height: "2px", background: "#C4773B" }} />
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#C4773B", letterSpacing: "0.15em", textTransform: "uppercase" }}>
                Get In Touch
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(36px, 5vw, 62px)",
              fontWeight: 900, color: "#1C1410",
              lineHeight: 1.1, margin: "0 0 22px",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(28px)",
              transition: "all 0.8s ease 200ms",
            }}>
              We'd Love<br />to <em style={{ color: "#C4773B" }}>Hear</em><br />From You.
            </h1>

            <p style={{
              fontSize: "17px", color: "#6B5B46", lineHeight: 1.85, margin: "0 0 40px", maxWidth: "440px",
              opacity: heroInView ? 1 : 0,
              transform: heroInView ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.8s ease 400ms",
            }}>
              Whether you want to volunteer, partner, donate, or simply ask a question — our team is ready to connect.
            </p>

            {/* Contact info cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              {CONTACT_INFO.map((item, i) => (
                <div key={item.label} style={{
                  background: item.bg,
                  border: `1.5px solid ${item.color}22`,
                  borderRadius: "14px",
                  padding: "18px 20px",
                  opacity: heroInView ? 1 : 0,
                  transform: heroInView ? "translateY(0)" : "translateY(24px)",
                  transition: `all 0.7s ease ${400 + i * 100}ms`,
                }}>
                  <div style={{ fontSize: "22px", marginBottom: "8px" }}>{item.icon}</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: item.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "4px" }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: "13px", color: "#4A3D30", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image */}
          <FadeIn direction="right" delay={200}>
            <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", height: "500px" }}>
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80"
                alt="Team ready to help"
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
                onMouseEnter={e => (e.target.style.transform = "scale(1.04)")}
                onMouseLeave={e => (e.target.style.transform = "scale(1)")}
              />
              {/* Overlay badge */}
              <div style={{
                position: "absolute", bottom: 28, left: 28, right: 28,
                background: "rgba(28,20,16,0.88)",
                backdropFilter: "blur(8px)",
                borderRadius: "14px", padding: "18px 22px",
              }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 900, color: "#F5F0E8", margin: "0 0 4px" }}>
                  "Every message matters."
                </p>
                <p style={{ fontSize: "13px", color: "#9A8878", margin: 0 }}>We read every single one.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Divider ── */}
      <div style={{ maxWidth: "120px", margin: "0 auto 72px", height: "2px", background: "linear-gradient(to right, transparent, #C4773B, transparent)" }} />

      {/* ── Contact Form ── */}
      <section style={{ maxWidth: "820px", margin: "0 auto", padding: "0 24px 100px" }}>
        <FadeIn direction="up" delay={0}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900, color: "#1C1410",
              margin: "0 0 16px",
            }}>
              Send Us a <em style={{ color: "#C4773B" }}>Message</em>
            </h2>
            <p style={{ fontSize: "16px", color: "#6B5B46", margin: 0 }}>
              Fill in the form below and we'll get back to you within 24 hours.
            </p>
          </div>
        </FadeIn>

        {submitted ? (
          <FadeIn direction="scale">
            <div style={{
              background: "#fff",
              border: "2px solid #2E7D5B44",
              borderRadius: "24px",
              padding: "72px 40px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: "64px", marginBottom: "24px" }}>🎉</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "30px", fontWeight: 900, color: "#1C1410",
                margin: "0 0 14px",
              }}>Thank You!</h3>
              <p style={{ fontSize: "17px", color: "#6B5B46", lineHeight: 1.8, margin: "0 0 32px", maxWidth: "420px", marginLeft: "auto", marginRight: "auto" }}>
                We've received your message and will get back to you at <strong style={{ color: "#1C1410" }}>{form.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                style={{
                  background: "#C4773B", color: "#fff",
                  border: "none", borderRadius: "50px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "15px", fontWeight: 700,
                  padding: "14px 32px", cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={e => (e.target.style.background = "#E8943A")}
                onMouseLeave={e => (e.target.style.background = "#C4773B")}
              >
                Send Another Message
              </button>
            </div>
          </FadeIn>
        ) : (
          <FadeIn direction="up" delay={100}>
            <form
              onSubmit={handleSubmit}
              noValidate
              style={{
                background: "#fff",
                borderRadius: "24px",
                border: "1.5px solid #EDE4D4",
                padding: "52px 52px",
                boxShadow: "0 8px 48px #1C141010",
              }}
            >
              {/* Name + Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#4A3D30", marginBottom: "8px", letterSpacing: "0.04em" }}>
                    Full Name <span style={{ color: "#C4773B" }}>*</span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Priya Sharma"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle("name")}
                  />
                  {errors.name && <p style={{ color: "#E24B4A", fontSize: "12px", margin: "6px 0 0" }}>{errors.name}</p>}
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#4A3D30", marginBottom: "8px", letterSpacing: "0.04em" }}>
                    Email Address <span style={{ color: "#C4773B" }}>*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="priya@email.com"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle("email")}
                  />
                  {errors.email && <p style={{ color: "#E24B4A", fontSize: "12px", margin: "6px 0 0" }}>{errors.email}</p>}
                </div>
              </div>

              {/* Phone + Subject */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#4A3D30", marginBottom: "8px", letterSpacing: "0.04em" }}>
                    Phone Number <span style={{ color: "#9A8878", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    style={inputStyle("phone")}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#4A3D30", marginBottom: "8px", letterSpacing: "0.04em" }}>
                    Subject <span style={{ color: "#C4773B" }}>*</span>
                  </label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("subject")}
                    onBlur={() => setFocusedField(null)}
                    style={{ ...inputStyle("subject"), appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23C4773B' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center", paddingRight: "40px", cursor: "pointer" }}
                  >
                    <option value="">Select a subject…</option>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.subject && <p style={{ color: "#E24B4A", fontSize: "12px", margin: "6px 0 0" }}>{errors.subject}</p>}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: 700, color: "#4A3D30", marginBottom: "8px", letterSpacing: "0.04em" }}>
                  Your Message <span style={{ color: "#C4773B" }}>*</span>
                </label>
                <textarea
                  name="message"
                  placeholder="Tell us how you'd like to get involved, or ask us anything…"
                  value={form.message}
                  onChange={handleChange}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  rows={5}
                  style={{ ...inputStyle("message"), resize: "vertical", minHeight: "130px" }}
                />
                {errors.message && <p style={{ color: "#E24B4A", fontSize: "12px", margin: "6px 0 0" }}>{errors.message}</p>}
              </div>

              {/* Submit */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
                <p style={{ fontSize: "13px", color: "#9A8878", margin: 0 }}>
                  🔒 We never share your information with anyone.
                </p>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{
                    background: submitting ? "#9A8878" : "#1C1410",
                    color: "#EDE5D4",
                    border: "none", borderRadius: "50px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "16px", fontWeight: 700,
                    padding: "16px 40px", cursor: submitting ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}
                  onMouseEnter={e => { if (!submitting) e.currentTarget.style.background = "#C4773B"; }}
                  onMouseLeave={e => { if (!submitting) e.currentTarget.style.background = "#1C1410"; }}
                >
                  {submitting ? (
                    <>
                      <span style={{
                        display: "inline-block", width: "16px", height: "16px",
                        border: "2px solid #F5F0E866", borderTopColor: "#EDE5D4",
                        borderRadius: "50%",
                        animation: "spin 0.8s linear infinite",
                      }} />
                      Sending…
                    </>
                  ) : "Send Message →"}
                </button>
              </div>
            </form>
          </FadeIn>
        )}
      </section>

    

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder, textarea::placeholder { color: #B8A898; }
        select option { background: #fff; color: #1C1410; }
      `}</style>
    </div>
  );
}