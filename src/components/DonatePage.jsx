import { useState } from "react";
import "../css/donate.css";

/*
  ─────────────────────────────────────────────────────────────
  SETUP CHECKLIST:

  RAZORPAY:
    1. Sign up at https://razorpay.com → Settings → API Keys
    2. Copy Key ID (starts with rzp_test_ or rzp_live_)
    3. Replace RAZORPAY_KEY_ID below

  EMAILJS (your existing setup — just add to template):
    New variables: {{payment_id}}, {{payment_status}}
  ─────────────────────────────────────────────────────────────
*/

const RAZORPAY_KEY_ID     = "rzp_test_XXXXXXXXXXXXXXXX";
const EMAILJS_SERVICE_ID  = "service_pwamgiz";
const EMAILJS_TEMPLATE_ID = "template_5tgyabg";
const EMAILJS_PUBLIC_KEY  = "UbCmtDxYs00u-Ox--";

const AMOUNTS = [
  { value: 500,  label: "₹500",   impact: "Stationery kit for one child" },
  { value: 1500, label: "₹1,500", impact: "Medicines for a family" },
  { value: 3000, label: "₹3,000", impact: "Sanitation kit for 5 households" },
  { value: 6000, label: "₹6,000", impact: "School fees for one student" },
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
  { img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&q=80", label: "Books & stationery for underprivileged children" },
  { img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=300&q=80", label: "Free health camps & medicines for rural families" },
  { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=80", label: "Teacher training & capacity building" },
  { img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&q=80",    label: "Sanitation drives & hygiene kit distribution" },
  { img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80", label: "Financial aid for widows & vulnerable families" },
  { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=300&q=80", label: "Merit scholarships for girl children" },
  { img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80", label: "Livelihood & skill development programs" },
  { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=300&q=80", label: "Digital literacy for rural & tribal children" },
];

const FAQS = [
  { q: "How does my donation make a difference?",             a: "100% of your donation goes directly to our programs in education, healthcare, sanitation, and financial support. We are launching our first campaigns in 2026 and will publish full impact reports so you can see exactly where your money goes." },
  { q: "Will I receive updates about my donation?",           a: "Yes. You will receive an email confirmation immediately after your payment. As we launch our campaigns, we will send updates with stories and impact data from the communities your donation supports." },
  { q: "Can I claim tax benefits on my donation?",            a: "Absolutely. Sarita Foundation is registered under Section 80G of the Income Tax Act. You will receive a tax receipt via email within 7 working days of your donation." },
  { q: "How does Sarita Foundation ensure transparency?",     a: "We are committed to full financial transparency from day one — audited accounts, an independent governing board, and publicly accessible program reports. We are a new organisation and our credibility is built on this from the start." },
  { q: "Is there a minimum donation amount?",                 a: "There is no minimum. Every rupee counts. Even ₹500 can provide a stationery kit for one child for an entire academic year." },
];

const STATS = [
  { n: "2026",    l: "Year Founded" },
  { n: "6",       l: "Campaigns Planned" },
  { n: "Maharashtra", l: "Starting Region" },
  { n: "100%",    l: "Donation Transparency" },
];

/* ── Helpers ── */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) { resolve(); return; }
    const s = document.createElement("script");
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

/* ═══════════════════════════════════════════ */
export default function DonatePage() {
  const [selected, setSelected]   = useState(1500);
  const [custom, setCustom]       = useState("");
  const [frequency, setFrequency] = useState("once");
  const [form, setForm]           = useState({ name:"", email:"", phone:"", pan:"", state:"", city:"", address:"", pincode:"" });
  const [openFaq, setOpenFaq]     = useState(null);
  const [status, setStatus]       = useState("idle");
  const [paymentId, setPaymentId] = useState("");
  const [errorMsg, setErrorMsg]   = useState("");

  const finalAmount = custom ? Number(custom) : selected;
  const impact = AMOUNTS.find(a => a.value === selected)?.impact || "Making a direct impact";
  const isProcessing = status === "paying" || status === "sending";

  function handleField(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function sendConfirmationEmail(rzpPaymentId) {
    await loadScript("https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js");
    if (window.emailjs && !window.emailjs._initialized) {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      window.emailjs._initialized = true;
    }
    await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      donor_name:     form.name,
      donor_email:    form.email,
      donor_phone:    form.phone,
      donor_pan:      form.pan      || "Not provided",
      donor_state:    form.state    || "Not provided",
      donor_city:     form.city     || "Not provided",
      donor_address:  form.address  || "Not provided",
      donor_pincode:  form.pincode  || "Not provided",
      amount:         `₹${finalAmount.toLocaleString()}`,
      frequency:      frequency === "monthly" ? "Monthly" : "One-time",
      payment_id:     rzpPaymentId  || "N/A",
      payment_status: "Payment Successful",
    });
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

    setStatus("paying");
    setErrorMsg("");

    try {
      await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    } catch {
      setStatus("error");
      setErrorMsg("Could not load payment gateway. Please check your internet connection and try again.");
      return;
    }

    const options = {
      key:         RAZORPAY_KEY_ID,
      amount:      finalAmount * 100,
      currency:    "INR",
      name:        "Sarita Foundation",
      description: frequency === "monthly"
        ? `Monthly Donation — ₹${finalAmount.toLocaleString()}/month`
        : `One-time Donation — ₹${finalAmount.toLocaleString()}`,
      prefill: { name: form.name, email: form.email, contact: form.phone },
      notes:   { pan: form.pan, state: form.state, city: form.city, address: form.address, pincode: form.pincode, frequency },
      theme:   { color: "#D4621A" },
      modal: {
        ondismiss: () => setStatus("idle"),
      },
      handler: async function (response) {
        const pid = response.razorpay_payment_id;
        setPaymentId(pid);
        setStatus("sending");
        try {
          await sendConfirmationEmail(pid);
        } catch (e) {
          console.error("EmailJS error:", e);
        }
        setStatus("success");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      setStatus("error");
      setErrorMsg(`Payment failed: ${response.error.description || "Unknown error"}. Please try again.`);
    });
    rzp.open();
  }

  const buttonLabel = () => {
    if (status === "paying")  return "Opening Payment…";
    if (status === "sending") return "Sending Confirmation…";
    return `Donate ₹${finalAmount.toLocaleString()} ${frequency === "monthly" ? "/ Month" : "Now"} →`;
  };

  /* ── Success screen ── */
  if (status === "success") {
    return (
      <div className="success-screen">
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80"
          alt="Thank you"
          className="success-screen__img"
        />
        <h1 className="success-screen__title">Thank you, {form.name.split(" ")[0]}!</h1>
        <p className="success-screen__para">
          Your donation of <strong>₹{finalAmount.toLocaleString()}</strong> has been received.
          A confirmation has been sent to <strong>{form.email}</strong>.
        </p>
        {paymentId && (
          <p className="success-screen__pid">
            Payment ID: <code>{paymentId}</code>
          </p>
        )}
        <p className="success-screen__note">Your 80G tax receipt will be emailed within 7 working days.</p>
        <button
          className="success-screen__btn"
          onClick={() => {
            setStatus("idle"); setPaymentId("");
            setForm({ name:"", email:"", phone:"", pan:"", state:"", city:"", address:"", pincode:"" });
          }}
        >
          Donate Again
        </button>
      </div>
    );
  }

  /* ── Main page ── */
  return (
    <div className="donate-page">

      {/* Hero */}
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

      {/* Main grid */}
      <div className="main-grid">

        {/* LEFT — Story */}
        <div>
          <h2 className="story__heading">Help us reach the families who need it most — from day one</h2>
          <p className="story__para">
            Education, healthcare, and dignity are not privileges — they are rights. But for countless families across rural and urban India, these remain out of reach. Poverty, lack of awareness, and systemic inequalities push children out of classrooms and families into crisis.
          </p>
          <p className="story__para">
            Sarita Foundation was founded in 2026 to change that. We are at the very beginning — planning our first campaigns in Maharashtra, building our volunteer network, and laying the groundwork for programs in education, healthcare, sanitation, and financial support.
          </p>
          <p className="story__para">
            Your donation today is not just money — it is the foundation stone. It determines how fast we can launch, how many families we reach in year one, and how credibly we can grow.
          </p>
          <p className="story__para story__para--last">
            These are resilient communities full of potential. They cannot do it alone. Be among the first to stand with them — your support directly shapes what Sarita Foundation becomes in its first year.
          </p>

          <div className="tax-box">
            <p className="tax-box__main">
              <strong>Your contributions are eligible for 50% tax benefit</strong> under Section 80G as Sarita Foundation is a registered non-profit organisation.
            </p>
            <p className="tax-box__meta">PAN: XXXXX0000X · 80G Number: XXXXX0000XF20210</p>
          </div>

          <div className="stats-grid">
            {STATS.map(({ n, l }) => (
              <div key={l} className="stat-card">
                <span className="stat-card__number">{n}</span>
                <span className="stat-card__label">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Donation form */}
        <div className="form-card">
          <div className="form-card__header">
            <p className="form-card__title">SUPPORT THE CAUSE</p>
            <p className="form-card__subtitle">MAKE A DIFFERENCE</p>
          </div>

          <div className="form-card__body">

            {/* Frequency toggle */}
            <div className="freq-toggle">
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

            {/* Amount selection */}
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

            {!custom && (
              <p className="impact-hint">
                YOUR DONATION WILL HELP: <strong>{impact}</strong>
              </p>
            )}

            <input
              className="input-field input-field--mb"
              placeholder="Enter other amount (₹)"
              type="number"
              value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null); }}
            />

            {/* Donor details */}
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

            {/* Pay button */}
            <button
              onClick={handleDonate}
              disabled={isProcessing}
              className={`donate-btn ${isProcessing ? "donate-btn--loading" : "donate-btn--active"}`}
            >
              {isProcessing && <span className="spinner" />}
              {buttonLabel()}
            </button>

            {status === "error" && (
              <p className="error-msg">
                {errorMsg || "Something went wrong. Please try again or contact donations@saritafoundation.org"}
              </p>
            )}

            <div className="pay-methods">
              {["UPI", "Cards", "Net Banking", "Wallets"].map(m => (
                <span key={m} className="pay-pill">{m}</span>
              ))}
            </div>

            <p className="form-card__note">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:"inline",verticalAlign:"middle",marginRight:4}}>
                <rect x="2" y="6" width="10" height="7" rx="2" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Secured by Razorpay · 80G tax receipt via email · All major UPI, cards &amp; net banking accepted
            </p>
          </div>
        </div>
      </div>

      {/* What your donation supports */}
      <div className="supports-section">
        <div className="supports-inner">
          <h2 className="section-heading">WHAT WILL YOUR DONATION SUPPORT?</h2>
          <div className="supports-grid">
            {SUPPORTS.map(({ img, label }, i) => (
              <div
                key={label}
                className={`support-item ${i % 4 !== 3 ? "support-item--right-border" : ""} ${i < 4 ? "support-item--bottom-border" : ""}`}
              >
                <div className="support-item__img-wrap">
                  <img src={img} alt={label} className="support-item__img" />
                </div>
                <p className="support-item__label">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="stats-strip">
        <div className="stats-strip-inner">
          {STATS.map(({ n, l }) => (
            <div key={l}>
              <span className="strip-stat__number">{n}</span>
              <span className="strip-stat__label">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <h2 className="faq-heading">Frequently Asked Questions</h2>
        <div className="faq-list">
          {FAQS.map(({ q, a }, i) => (
            <div key={q} className={i === 0 ? "faq-item--top-border" : "faq-item--bottom-border"}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className={`faq-btn ${openFaq === i ? "faq-btn--open" : "faq-btn--closed"}`}
              >
                <span>{q}</span>
                <span className={`faq-icon ${openFaq === i ? "faq-icon--open" : "faq-icon--closed"}`}>
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && <p className="faq-answer">{a}</p>}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
