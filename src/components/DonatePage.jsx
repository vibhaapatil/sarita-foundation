import { useState, useEffect, useRef } from "react";
import "../css/donate.css";

const EMAILJS_SERVICE_ID  = "service_pwamgiz";
const EMAILJS_TEMPLATE_ID = "template_5tgyabg";
const EMAILJS_PUBLIC_KEY  = "UbCmtDxYs00u-Ox--";

const AMOUNTS = [
  { value: 500,   label: "₹500",    impact: "Stationery for one child for a month" },
  { value: 1000,  label: "₹1,000",  impact: "Essential medicines for one family" },
  { value: 1500,  label: "₹1,500",  impact: "A week of nutritious meals for a family" },
  { value: 2500,  label: "₹2,500",  impact: "School supplies for 5 children" },
  { value: 5000,  label: "₹5,000",  impact: "A month of financial support for a widow" },
  { value: 10000, label: "₹10,000", impact: "A free health camp for an entire village" },
];

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman & Nicobar","Chandigarh","Delhi","Jammu & Kashmir","Ladakh","Puducherry",
];

const SUPPORTS = [
  { icon: "📚", label: "Books & stationery for underprivileged children" },
  { icon: "🏥", label: "Free health camps & medicines for rural families" },
  { icon: "👩‍🏫", label: "Teacher training & capacity building" },
  { icon: "💧", label: "Sanitation drives & hygiene kit distribution" },
  { icon: "💰", label: "Financial aid for widows & vulnerable families" },
  { icon: "🎓", label: "Merit scholarships for girl children" },
  { icon: "🌾", label: "Livelihood & skill development programs" },
  { icon: "🖥️", label: "Digital literacy for rural & tribal children" },
];

const FAQS = [
  { q: "How does my donation make a difference?",         a: "100% of your donation goes directly to our programs in education, healthcare, sanitation, and financial support. We publish quarterly impact reports so you can see exactly where your money goes." },
  { q: "Will I receive updates about my donation?",       a: "Yes! You will receive an email confirmation immediately after submitting your details. We also send quarterly newsletters with stories and impact data from the communities your donation supports." },
  { q: "Can I claim tax benefits on my donation?",        a: "Absolutely. Sarita Foundation is registered under Section 80G of the Income Tax Act. You will receive a tax receipt via email within 7 working days of your donation." },
  { q: "How does Sarita Foundation ensure transparency?", a: "We maintain complete financial transparency with audited accounts published annually. An independent board reviews all expenditure, and our program reports are publicly accessible on our website." },
  { q: "Is there a minimum donation amount?",             a: "There is no minimum. Every rupee counts. However, even ₹500 can provide stationery for one child for an entire month." },
];

const STATS = [
  { n: "2026",         l: "Founded" },
  { n: "6",            l: "Campaigns Planned" },
  { n: "Maharashtra",  l: "Starting Region" },
  { n: "100%",         l: "Donation Transparency" },
];

function loadEmailJS() {
  return new Promise((resolve, reject) => {
    if (window.emailjs) { resolve(); return; }
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

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
   Animated stat — counts up numbers, fades in text
───────────────────────────────────────────── */
function AnimatedStat({ value, className }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const match = String(value).match(/^(\d+)(%?)$/);
        if (!match) {
          setDisplay(value);
          obs.unobserve(el);
          return;
        }
        const target = parseInt(match[1], 10);
        const suffix = match[2];
        const duration = 1200;
        const start = performance.now();

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(target * eased) + suffix);
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

  return <span ref={ref} className={className}>{display ?? "0"}</span>;
}

export default function DonatePage() {
  const [selected, setSelected]   = useState(1500);
  const [custom, setCustom]       = useState("");
  const [frequency, setFrequency] = useState("once");
  const [form, setForm]           = useState({ name:"", email:"", phone:"", pan:"", state:"", city:"", address:"", pincode:"" });
  const [openFaq, setOpenFaq]     = useState(null);
  const [status, setStatus]       = useState("idle");
  const [errorMsg, setErrorMsg]   = useState("");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const finalAmount  = custom ? Number(custom) : selected;
  const impact       = AMOUNTS.find(a => a.value === selected)?.impact || "Making a direct impact";
  const isProcessing = status === "sending";

  function handleField(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleDonate() {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in Name, Email, and Phone at minimum.");
      return;
    }
    if (!finalAmount || finalAmount < 1) {
      alert("Please select or enter a valid donation amount.");
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      await loadEmailJS();

      if (!window.emailjs._initialized) {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        window.emailjs._initialized = true;
      }

      await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        donor_name:    form.name,
        donor_email:   form.email,
        donor_phone:   form.phone,
        donor_pan:     form.pan     || "Not provided",
        donor_state:   form.state   || "Not provided",
        donor_city:    form.city    || "Not provided",
        donor_address: form.address || "Not provided",
        donor_pincode: form.pincode || "Not provided",
        amount:        `₹${finalAmount.toLocaleString()}`,
        frequency:     frequency === "monthly" ? "Monthly" : "One-time",
      });

      setStatus("success");
    } catch (e) {
      console.error("EmailJS error:", e);
      setStatus("error");
      setErrorMsg("Could not send email. Please try again or contact donations@saritafoundation.org");
    }
  }

  const buttonLabel = () => {
    if (status === "sending") return "Sending…";
    return `Donate ₹${finalAmount.toLocaleString()} ${frequency === "monthly" ? "/ Month" : "Now"} →`;
  };

  if (status === "success") {
    return (
      <div className="success-screen">
        <div className="success-screen__emoji">🙏</div>
        <h1 className="success-screen__title">Thank you, {form.name.split(" ")[0]}!</h1>
        <p className="success-screen__para">
          Payment instructions have been sent to <strong>{form.email}</strong>.
          Please complete the transfer using the UPI ID or bank details in that email.
        </p>
        <p className="success-screen__note">
          Once done, reply to that email with your transaction ID or screenshot.
          Your 80G tax receipt will be sent within 7 working days.
        </p>
        <button
          className="success-screen__btn"
          onClick={() => {
            setStatus("idle");
            setForm({ name:"", email:"", phone:"", pan:"", state:"", city:"", address:"", pincode:"" });
          }}
        >
          Donate Again
        </button>
      </div>
    );
  }

  return (
    <div className="donate-page">

      <div className="hero">
        <img
          className="hero__img"
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80"
          alt="Children at a Sarita Foundation program"
        />
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="hero__eyebrow">Support Sarita Foundation</p>
          <h1 className="hero__title">
            GIVE EVERY FAMILY A CHANCE<br />
            <span>TO LIVE WITH DIGNITY</span>
          </h1>
          <p className="hero__subtitle">
            Join hands to support education, healthcare, and hope for underprivileged communities across India.
          </p>
        </div>
      </div>

      <div className="main-grid">

        <div>
          <Reveal><h2 className="story__heading">Help us uplift the lives of those who need it most</h2></Reveal>
          <Reveal delay={60}>
            <p className="story__para">
              Education, healthcare, and dignity are not privileges — they are rights. But for countless families across rural and urban India, these remain out of reach. Poverty, lack of awareness, and systemic inequalities push children out of classrooms and families into crisis.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="story__para">
              At Sarita Foundation, we believe that no child should grow up without books, no family should go without medicine, and no person should be left behind because they were born without means.
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="story__para">
              Through our programs in <strong>education, primary healthcare, sanitation, and financial inclusion</strong>, we reach the most vulnerable — in villages, slums, and tribal areas — where help is needed most.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p className="story__para story__para--last">
              These are resilient communities full of potential. They cannot do it alone. Your support can make all the difference — keeping children in school, families healthy, and hope alive.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div className="tax-box">
              <p className="tax-box__main">
                <strong>Your contributions are eligible for 50% tax benefit</strong> under Section 80G as Sarita Foundation is a registered non-profit organisation.
              </p>
              <p className="tax-box__meta">PAN: XXXXX0000X · 80G Number: XXXXX0000XF20210</p>
            </div>
          </Reveal>

          <div className="stats-grid">
            {STATS.map(({ n, l }, i) => (
              <Reveal key={l} delay={260 + i * 60}>
                <div className="stat-card">
                  <AnimatedStat value={n} className="stat-card__number" />
                  <span className="stat-card__label">{l}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="form-card-wrap">
          <div className="form-card">
            <div className="form-card__header">
              <p className="form-card__title">SUPPORT THE CAUSE</p>
              <p className="form-card__subtitle">MAKE A DIFFERENCE</p>
            </div>

            <div className="form-card__body">

              <div className="freq-toggle">
                <span
                  className="freq-toggle__indicator"
                  style={{ transform: `translateX(${frequency === "once" ? "0%" : "100%"})` }}
                />
                {["once", "monthly"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFrequency(f)}
                    className={`freq-btn ${frequency === f ? "freq-btn--active" : "freq-btn--inactive"}`}
                  >
                    {f === "once" ? "Give Once" : "Give Monthly"}
                  </button>
                ))}
              </div>

              <div className="amount-grid">
                {AMOUNTS.map(({ value, label }) => {
                  const isActive = selected === value && !custom;
                  return (
                    <label
                      key={value}
                      className={`amount-label ${isActive ? "amount-label--active" : "amount-label--inactive"}`}
                    >
                      <input
                        type="radio"
                        name="amount"
                        value={value}
                        checked={isActive}
                        onChange={() => { setSelected(value); setCustom(""); }}
                      />
                      <span className={`amount-label__text ${isActive ? "amount-label__text--active" : "amount-label__text--inactive"}`}>
                        {label}
                      </span>
                    </label>
                  );
                })}
              </div>

              <div className={`impact-hint-wrap ${!custom ? "impact-hint-wrap--open" : ""}`}>
                <p className="impact-hint">
                  YOUR DONATION WILL HELP: <strong>{impact}</strong>
                </p>
              </div>

              <input
                className="input-field input-field--mb"
                placeholder="Enter other amount (₹)"
                type="number"
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelected(null); }}
              />

              <div className="fields-stack">
                <input className="input-field" name="name"    placeholder="Enter Full Name *"  value={form.name}    onChange={handleField} />
                <input className="input-field" name="email"   placeholder="Enter Email ID *"   value={form.email}   onChange={handleField} type="email" />
                <input className="input-field" name="phone"   placeholder="Enter Mobile No *"  value={form.phone}   onChange={handleField} type="tel" />
                <div className="fields-row">
                  <input className="input-field" name="pan"   placeholder="PAN Number"         value={form.pan}     onChange={handleField} />
                  <select className="input-field" name="state" value={form.state} onChange={handleField}>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="fields-row">
                  <input className="input-field" name="city"    placeholder="City"    value={form.city}    onChange={handleField} />
                  <input className="input-field" name="pincode" placeholder="Pincode" value={form.pincode} onChange={handleField} type="number" />
                </div>
                <input className="input-field" name="address" placeholder="Address" value={form.address} onChange={handleField} />
              </div>

              <button
                onClick={handleDonate}
                disabled={isProcessing}
                className={`donate-btn ${isProcessing ? "donate-btn--loading" : "donate-btn--active"}`}
              >
                {isProcessing && <span className="spinner" />}
                {buttonLabel()}
              </button>

              {status === "error" && (
                <p className="error-msg">{errorMsg}</p>
              )}

              <div className="pay-methods">
                {["UPI", "NEFT", "IMPS", "RTGS"].map(m => (
                  <span key={m} className="pay-pill">{m}</span>
                ))}
              </div>

              <p className="form-card__note">
                🔒 Payment details will be sent to your email · 80G tax receipt within 7 working days
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="supports-section">
        <div className="supports-inner">
          <Reveal><h2 className="section-heading">WHAT WILL YOUR DONATION SUPPORT?</h2></Reveal>
          <div className="supports-grid">
            {SUPPORTS.map(({ icon, label }, i) => (
              <Reveal key={label} delay={(i % 4) * 70} className="support-item-wrap">
                <div
                  className={`support-item ${i % 4 !== 3 ? "support-item--right-border" : ""} ${i < 4 ? "support-item--bottom-border" : ""}`}
                >
                  <div className="support-item__icon">{icon}</div>
                  <p className="support-item__label">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <div className="stats-strip">
        <div className="stats-strip-inner">
          {STATS.map(({ n, l }, i) => (
            <Reveal key={l} delay={i * 70}>
              <div>
                <AnimatedStat value={n} className="strip-stat__number" />
                <span className="strip-stat__label">{l}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="faq-section">
        <Reveal><h2 className="faq-heading">Frequently Asked Questions</h2></Reveal>
        <div className="faq-list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openFaq === i;
            return (
              <Reveal key={q} delay={i * 50} className={i === 0 ? "faq-item--top-border" : "faq-item--bottom-border"}>
                <div>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className={`faq-btn ${isOpen ? "faq-btn--open" : "faq-btn--closed"}`}
                  >
                    <span>{q}</span>
                    <span className={`faq-icon ${isOpen ? "faq-icon--open" : "faq-icon--closed"}`}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div className={`faq-answer-wrap ${isOpen ? "faq-answer-wrap--open" : ""}`}>
                    <div className="faq-answer-inner">
                      <p className="faq-answer">{a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

    </div>
  );
}