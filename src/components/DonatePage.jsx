import { useState } from "react";

/*
  ─────────────────────────────────────────────────────────────
  Donate Now — Sarita Foundation
  Layout inspired by Smile Foundation donate page:
    • Full-bleed hero image with bold heading
    • Left story text + Right sticky donation form
    • "What your donation supports" icon grid
    • Stats section
    • FAQ accordion
  
  EMAIL SETUP (EmailJS — free, no backend needed):
    1. Go to https://emailjs.com and create a free account
    2. Add an Email Service (Gmail works fine)
    3. Create an Email Template — use these variables in it:
         {{donor_name}}, {{donor_email}}, {{donor_phone}},
         {{donor_pan}}, {{donor_state}}, {{donor_city}},
         {{donor_address}}, {{amount}}, {{frequency}}
    4. Replace the three constants below with your real IDs:
         EMAILJS_SERVICE_ID
         EMAILJS_TEMPLATE_ID
         EMAILJS_PUBLIC_KEY
  ─────────────────────────────────────────────────────────────
*/
 
// ── Replace these with your real EmailJS credentials ──
const EMAILJS_SERVICE_ID  = "service_pwamgiz";
const EMAILJS_TEMPLATE_ID = "template_5tgyabg";
const EMAILJS_PUBLIC_KEY  = "UbCmtDxYs00u-Ox--";
 
// ── Design tokens (matches home page) ──
const cream  = "#F5F0E8";
const dark   = "#2C2416";
const orange = "#D4621A";
const green  = "#4A7C59";
const mid    = "#5C4A30";
const muted  = "#7A6040";
const border = "#E8DCC8";
const pf     = "'Playfair Display', serif";
const dm     = "'DM Sans', sans-serif";
 
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
  { q: "How does my donation make a difference?", a: "100% of your donation goes directly to our programs in education, healthcare, sanitation, and financial support. We publish quarterly impact reports so you can see exactly where your money goes." },
  { q: "Will I receive updates about my donation?", a: "Yes! You will receive an email confirmation immediately. We also send quarterly newsletters with stories and impact data from the communities your donation supports." },
  { q: "Can I claim tax benefits on my donation?", a: "Absolutely. Sarita Foundation is registered under Section 80G of the Income Tax Act. You will receive a tax receipt via email within 7 working days of your donation." },
  { q: "How does Sarita Foundation ensure my donation is used properly?", a: "We maintain complete financial transparency with audited accounts published annually. An independent board reviews all expenditure, and our program reports are publicly accessible on our website." },
  { q: "Is there a minimum donation amount?", a: "There is no minimum. Every rupee counts. However, even ₹500 can provide stationery for one child for an entire month." },
];
 
const STATS = [
  { n: "5,000+", l: "Lives Impacted" },
  { n: "12+",    l: "Active Campaigns" },
  { n: "8",      l: "States Reached" },
  { n: "200+",   l: "Volunteers" },
];
 
/* ─── Shared input style ─── */
const inp = {
  width: "100%", padding: "11px 16px",
  border: `1.5px solid ${border}`, borderRadius: 10,
  fontFamily: dm, fontSize: 14, color: dark,
  background: "#FDFAF5", outline: "none",
  boxSizing: "border-box",
};
 
export default function DonatePage() {
  const [selected, setSelected]   = useState(1500);
  const [custom, setCustom]       = useState("");
  const [frequency, setFrequency] = useState("once");
  const [form, setForm]           = useState({ name:"", email:"", phone:"", pan:"", state:"", city:"", address:"", pincode:"" });
  const [openFaq, setOpenFaq]     = useState(null);
  const [status, setStatus]       = useState("idle"); // idle | sending | success | error
 
  const finalAmount = custom ? Number(custom) : selected;
  const impact = AMOUNTS.find(a => a.value === selected)?.impact || "Making a direct impact";
 
  function handleField(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }
 
  async function handleSubmit() {
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill in Name, Email, and Phone at minimum.");
      return;
    }
    setStatus("sending");
 
    try {
      // Dynamically load EmailJS SDK
      if (!window.emailjs) {
        await new Promise((res, rej) => {
          const s = document.createElement("script");
          s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
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
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  }
 
  /* ─── Success screen ─── */
  if (status === "success") {
    return (
      <div style={{ fontFamily:dm, background:cream, minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", textAlign:"center", padding:40 }}>
        <div style={{ fontSize:64, marginBottom:20 }}>🙏</div>
        <h1 style={{ fontFamily:pf, fontSize:"clamp(2rem,4vw,3rem)", color:dark, marginBottom:16 }}>
          Thank you, {form.name.split(" ")[0]}!
        </h1>
        <p style={{ fontSize:17, color:mid, maxWidth:520, lineHeight:1.75, marginBottom:8 }}>
          Your intention to donate <strong style={{color:orange}}>₹{finalAmount.toLocaleString()}</strong> has been received.
          The Sarita Foundation team will get in touch with you at <strong>{form.email}</strong> shortly.
        </p>
        <p style={{ fontSize:14, color:muted, maxWidth:480, lineHeight:1.7 }}>
          Your contribution will help us deliver education, healthcare, and hope to families across India.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ name:"",email:"",phone:"",pan:"",state:"",city:"",address:"",pincode:"" }); }}
          style={{ marginTop:32, padding:"14px 32px", background:orange, color:"#fff", border:"none", borderRadius:12, fontFamily:dm, fontWeight:700, fontSize:15, cursor:"pointer" }}
        >
          Donate Again
        </button>
      </div>
    );
  }
 
  return (
    <div style={{ fontFamily:dm, background:cream, color:dark, minHeight:"100vh" }}>
 
      {/* ── Hero ── */}
      <div style={{ position:"relative", width:"100%", height:480, overflow:"hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1600&q=80"
          alt="Children at a Sarita Foundation program"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 40%" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(44,36,22,0.3) 0%, rgba(44,36,22,0.75) 100%)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 40px" }}>
          <p style={{ fontFamily:dm, fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:orange, marginBottom:16 }}>
            Support Sarita Foundation
          </p>
          <h1 style={{ fontFamily:pf, fontSize:"clamp(2rem,5vw,3.8rem)", fontWeight:700, color:cream, lineHeight:1.1, maxWidth:760 }}>
            GIVE EVERY FAMILY A CHANCE<br />
            <span style={{ color:orange, fontStyle:"italic" }}>TO LIVE WITH DIGNITY</span>
          </h1>
          <p style={{ fontFamily:dm, fontSize:16, color:"rgba(245,240,232,0.8)", marginTop:18, maxWidth:560 }}>
            Join hands to support education, healthcare, and hope for underprivileged communities across India.
          </p>
        </div>
      </div>
 
      {/* ── Main: Story + Form ── */}
      <div style={{ maxWidth:1160, margin:"0 auto", padding:"72px 40px", display:"grid", gridTemplateColumns:"1fr 420px", gap:64, alignItems:"start" }}>
 
        {/* LEFT — story */}
        <div>
          <h2 style={{ fontFamily:pf, fontSize:"clamp(1.6rem,3vw,2.4rem)", fontWeight:700, color:dark, lineHeight:1.2, marginBottom:24 }}>
            Help us uplift the lives of those who need it most
          </h2>
 
          <p style={{ fontSize:16, color:mid, lineHeight:1.85, marginBottom:18 }}>
            Education, healthcare, and dignity are not privileges — they are rights. But for countless families across rural and urban India, these remain out of reach. Poverty, lack of awareness, and systemic inequalities push children out of classrooms and families into crisis.
          </p>
          <p style={{ fontSize:16, color:mid, lineHeight:1.85, marginBottom:18 }}>
            At Sarita Foundation, we believe that no child should grow up without books, no family should go without medicine, and no person should be left behind because they were born without means.
          </p>
          <p style={{ fontSize:16, color:mid, lineHeight:1.85, marginBottom:18 }}>
            Through our programs in <strong style={{color:dark}}>education, primary healthcare, sanitation, and financial inclusion</strong>, we reach the most vulnerable — in villages, slums, and tribal areas — where help is needed most.
          </p>
          <p style={{ fontSize:16, color:mid, lineHeight:1.85, marginBottom:32 }}>
            These are resilient communities full of potential. They cannot do it alone. Your support can make all the difference — keeping children in school, families healthy, and hope alive.
          </p>
 
          {/* Tax note */}
          <div style={{ background:"#fff", borderRadius:14, padding:"20px 22px", borderLeft:`4px solid ${green}`, marginBottom:32 }}>
            <p style={{ fontFamily:dm, fontSize:13.5, color:muted, lineHeight:1.7, marginBottom:6 }}>
              <strong style={{color:dark}}>Your contributions are eligible for 50% tax benefit</strong> under Section 80G as Sarita Foundation is a registered non-profit organisation.
            </p>
            <p style={{ fontFamily:dm, fontSize:12, color:muted }}>PAN: XXXXX0000X · 80G Number: XXXXX0000XF20210</p>
          </div>
 
          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:16 }}>
            {STATS.map(({ n, l }) => (
              <div key={l} style={{ background:"#fff", borderRadius:14, padding:"20px 20px", boxShadow:"0 2px 12px rgba(44,36,22,0.07)" }}>
                <span style={{ fontFamily:pf, fontSize:"2rem", fontWeight:900, color:orange, display:"block" }}>{n}</span>
                <span style={{ fontFamily:dm, fontSize:13, color:muted }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* RIGHT — sticky form */}
        <div style={{ position:"sticky", top:90, background:"#fff", borderRadius:20, boxShadow:"0 8px 40px rgba(44,36,22,0.12)", overflow:"hidden" }}>
 
          {/* Form header */}
          <div style={{ background:dark, padding:"22px 28px", textAlign:"center" }}>
            <p style={{ fontFamily:pf, fontSize:"1.3rem", fontWeight:700, color:cream, marginBottom:4 }}>SUPPORT THE CAUSE</p>
            <p style={{ fontFamily:dm, fontSize:12, fontWeight:600, letterSpacing:"0.15em", textTransform:"uppercase", color:"rgba(245,240,232,0.65)" }}>MAKE A DIFFERENCE</p>
          </div>
 
          <div style={{ padding:"28px 28px 32px" }}>
 
            {/* Frequency toggle */}
            <div style={{ display:"flex", gap:8, marginBottom:20 }}>
              {["once","monthly"].map(f => (
                <button key={f} onClick={() => setFrequency(f)} style={{
                  flex:1, padding:"10px", borderRadius:10,
                  border:`2px solid ${frequency===f ? orange : border}`,
                  background: frequency===f ? orange : "transparent",
                  color: frequency===f ? "#fff" : muted,
                  fontFamily:dm, fontWeight:700, fontSize:13.5, cursor:"pointer",
                }}>
                  {f === "once" ? "Give Once" : "Give Monthly"}
                </button>
              ))}
            </div>
 
            {/* Amount radio buttons */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
              {AMOUNTS.map(({ value, label }) => (
                <label key={value} style={{
                  display:"flex", alignItems:"center", gap:10,
                  border:`2px solid ${selected===value && !custom ? orange : border}`,
                  borderRadius:10, padding:"11px 14px", cursor:"pointer",
                  background: selected===value && !custom ? "#FFF3E0" : "transparent",
                  transition:"all 0.15s",
                }}>
                  <input
                    type="radio" name="amount" value={value}
                    checked={selected===value && !custom}
                    onChange={() => { setSelected(value); setCustom(""); }}
                    style={{ accentColor:orange }}
                  />
                  <span style={{ fontFamily:dm, fontWeight:700, fontSize:15, color: selected===value && !custom ? orange : dark }}>{label}</span>
                </label>
              ))}
            </div>
 
            {/* Impact label */}
            {!custom && (
              <p style={{ fontFamily:dm, fontSize:12, color:muted, textAlign:"center", marginBottom:12, fontStyle:"italic" }}>
                YOUR DONATION WILL HELP: <strong style={{color:dark}}>{impact}</strong>
              </p>
            )}
 
            {/* Custom amount */}
            <input
              style={{ ...inp, marginBottom:20 }}
              placeholder="Enter other amount (₹)"
              type="number"
              value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null); }}
            />
 
            {/* Donor details */}
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              <input style={inp} name="name"    placeholder="Enter Full Name *"  value={form.name}    onChange={handleField} />
              <input style={inp} name="email"   placeholder="Enter Email ID *"   value={form.email}   onChange={handleField} type="email" />
              <input style={inp} name="phone"   placeholder="Enter Mobile No *"  value={form.phone}   onChange={handleField} type="tel" />
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <input style={inp} name="pan"   placeholder="PAN Number"         value={form.pan}     onChange={handleField} />
                <select style={{ ...inp }} name="state" value={form.state} onChange={handleField}>
                  <option value="">Select State</option>
                  {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <input style={inp} name="city"    placeholder="City"     value={form.city}    onChange={handleField} />
                <input style={inp} name="pincode" placeholder="Pincode"  value={form.pincode} onChange={handleField} type="number" />
              </div>
              <input style={inp} name="address" placeholder="Address" value={form.address} onChange={handleField} />
            </div>
 
            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              style={{
                width:"100%", marginTop:18,
                padding:"15px", borderRadius:12,
                background: status==="sending" ? "#aaa" : orange,
                color:"#fff", border:"none",
                fontFamily:dm, fontWeight:700, fontSize:16,
                cursor: status==="sending" ? "not-allowed" : "pointer",
                transition:"background 0.18s",
              }}
            >
              {status === "sending" ? "Sending…" : `Donate ₹${finalAmount.toLocaleString()} ${frequency==="monthly" ? "/ Month" : "Now"} →`}
            </button>
 
            {status === "error" && (
              <p style={{ fontFamily:dm, fontSize:13, color:"#c0392b", textAlign:"center", marginTop:12 }}>
                Something went wrong. Please try again or email us directly at donations@saritafoundation.org
              </p>
            )}
 
            <p style={{ fontFamily:dm, fontSize:11.5, color:muted, textAlign:"center", marginTop:14, lineHeight:1.6 }}>
              🔒 Secured payment · 80G tax receipt via email · Sarita Foundation may contact you via WhatsApp, email, or SMS regarding your donation.
            </p>
          </div>
        </div>
      </div>
 
      {/* ── What Your Donation Supports ── */}
      <div style={{ background:dark, padding:"64px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <h2 style={{ fontFamily:pf, fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:cream, textAlign:"center", marginBottom:48 }}>
            WHAT WILL YOUR DONATION SUPPORT?
          </h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:0 }}>
            {SUPPORTS.map(({ icon, label }, i) => (
              <div key={label} style={{
                textAlign:"center", padding:"32px 20px",
                borderRight: i % 4 !== 3 ? "1px solid rgba(245,240,232,0.1)" : "none",
                borderBottom: i < 4 ? `3px solid ${orange}` : "none",
              }}>
                <div style={{ fontSize:36, marginBottom:14 }}>{icon}</div>
                <p style={{ fontFamily:dm, fontSize:13.5, color:"rgba(245,240,232,0.82)", lineHeight:1.65 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
 
      {/* ── Stats strip ── */}
      <div style={{ background:orange, padding:"52px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
          {[
            { n:"5,000+", l:"Lives Impacted" },
            { n:"12+",    l:"Active Campaigns" },
            { n:"8",      l:"States Reached" },
            { n:"200+",   l:"Volunteers" },
          ].map(({ n, l }) => (
            <div key={l}>
              <span style={{ fontFamily:pf, fontSize:"2.6rem", fontWeight:900, color:"#fff", display:"block", marginBottom:6 }}>{n}</span>
              <span style={{ fontFamily:dm, fontSize:13, color:"rgba(255,255,255,0.82)" }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
 
      {/* ── FAQ ── */}
      <div style={{ maxWidth:900, margin:"0 auto", padding:"80px 40px" }}>
        <h2 style={{ fontFamily:pf, fontSize:"clamp(1.6rem,3vw,2.2rem)", fontWeight:700, color:dark, textAlign:"center", marginBottom:48, textTransform:"uppercase", letterSpacing:"0.04em" }}>
          Frequently Asked Questions
        </h2>
        <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
          {FAQS.map(({ q, a }, i) => (
            <div key={q} style={{ borderTop: i===0 ? `1px solid ${border}` : "none", borderBottom:`1px solid ${border}` }}>
              <button
                onClick={() => setOpenFaq(openFaq===i ? null : i)}
                style={{
                  width:"100%", display:"flex", alignItems:"center",
                  justifyContent:"space-between", gap:16,
                  padding:"22px 4px", background:"none", border:"none",
                  fontFamily:dm, fontSize:15.5, fontWeight:500,
                  color: openFaq===i ? orange : dark,
                  cursor:"pointer", textAlign:"left",
                }}
              >
                <span>{q}</span>
                <span style={{
                  flexShrink:0, width:30, height:30,
                  background: openFaq===i ? orange : green,
                  color:"#fff", borderRadius:6,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18, fontWeight:700, transition:"background 0.15s",
                }}>
                  {openFaq===i ? "−" : "+"}
                </span>
              </button>
              {openFaq===i && (
                <p style={{ fontFamily:dm, fontSize:15, color:mid, lineHeight:1.8, padding:"0 4px 22px" }}>
                  {a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
 
    </div>
  );
}
 