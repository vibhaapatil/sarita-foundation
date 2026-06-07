import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   About Us — Sarita Foundation
   Layout inspired by Smile Foundation (full-bleed hero + sticky tab nav)
   Design system matches the home page:
     Playfair Display + DM Sans | #F5F0E8 cream | #D4621A orange | #4A7C59 green
   ───────────────────────────────────────────────────────────── */

const TABS = ["Our Story", "Vision", "Mission", "Our Values", "How We Work", "Why Trust Us"];

const cream = "#F5F0E8";
const dark  = "#2C2416";
const orange= "#D4621A";
const green = "#4A7C59";
const mid   = "#5C4A30";
const muted = "#7A6040";
const pf    = "'Playfair Display', serif";
const dm    = "'DM Sans', sans-serif";

const eyebrow = { fontFamily:dm, fontSize:12, fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase", color:orange, marginBottom:14 };
const secHead  = { fontFamily:pf, fontSize:"clamp(1.8rem,3vw,2.6rem)", fontWeight:700, color:dark, lineHeight:1.2, marginBottom:20 };
const bodyTxt  = { fontFamily:dm, fontSize:15.5, color:mid, lineHeight:1.85, marginBottom:16 };

/* ─── Shared card shell ─── */
function Card({ children, style={} }) {
  return (
    <div style={{ background:"#fff", borderRadius:20, padding:"28px 24px", boxShadow:"0 4px 20px rgba(44,36,22,0.07)", ...style }}>
      {children}
    </div>
  );
}

/* ─── Stat strip shared ─── */
function StatStrip() {
  return (
    <div style={{ background:dark, padding:"52px 40px" }}>
      <div style={{ maxWidth:900, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24, textAlign:"center" }}>
        {[{n:"2016",l:"Founded"},{n:"5,000+",l:"Lives Impacted"},{n:"8",l:"States Reached"},{n:"200+",l:"Volunteers"}].map(({n,l})=>(
          <div key={l}>
            <span style={{ fontFamily:pf, fontSize:"2.4rem", fontWeight:900, color:orange, display:"block", marginBottom:6 }}>{n}</span>
            <span style={{ fontFamily:dm, fontSize:13, color:"rgba(245,240,232,0.75)" }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ OUR STORY ══ */
function OurStory() {
  return (
    <div>
      <div style={{ maxWidth:820, margin:"0 auto", padding:"72px 40px 0", textAlign:"center" }}>
        <p style={{ ...bodyTxt, fontSize:18, color:dark, fontStyle:"italic" }}>
          Sarita Foundation was born in 2016 when a school teacher from Pune began distributing notebooks and medicines to families in her neighbourhood — out of her own savings. Word spread. Volunteers joined. A movement began.
        </p>
        <p style={bodyTxt}>
          Inspired by the belief that every person deserves dignity and opportunity regardless of where they were born, the foundation formalised its work and expanded across Maharashtra. Today it operates across 8 states, touching 5,000+ lives through education, healthcare, sanitation, and financial support programs.
        </p>
      </div>

      {/* Full-bleed image */}
      <div style={{ position:"relative", marginTop:56 }}>
        <img
          src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1400&q=80"
          alt="Children at a Sarita Foundation program"
          style={{ width:"100%", height:400, objectFit:"cover", filter:"grayscale(55%)", display:"block" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(44,36,22,0.6) 0%, transparent 55%)" }} />
        <p style={{
          position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
          fontFamily:pf, fontSize:"clamp(1.3rem,2.5vw,1.9rem)", fontWeight:700, color:"#fff",
          textAlign:"center", width:"100%", padding:"0 40px",
        }}>
          "Together, we can build stronger communities and brighter futures."
        </p>
      </div>

      {/* Two-col story */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"72px 40px", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60 }}>
        <div>
          <p style={eyebrow}>The Beginning</p>
          <h2 style={secHead}>A kitchen table idea that became a movement</h2>
          <p style={bodyTxt}>What began as weekend drives handing out stationery to children in Pune slums quickly evolved into structured programs. Volunteers from local colleges joined. Corporate donors came on board. By 2018 the foundation had its first full-time staff.</p>
          <p style={bodyTxt}>The growth was never about scale for its own sake. Every expansion followed a demonstrated need — a village without a health camp, a school without books, a widow without income support.</p>
        </div>
        <div>
          <p style={eyebrow}>Where We Are Today</p>
          <h2 style={secHead}>8 states, one shared mission</h2>
          <p style={bodyTxt}>Sarita Foundation now runs 12+ active campaigns with over 200 volunteers on the ground. Our programs span rural Maharashtra, Rajasthan, Uttar Pradesh, and more — always co-designed with the communities we serve.</p>
          <p style={bodyTxt}>We remain intentionally lean. A small, accountable team means donations reach the right hands faster, and every rupee is accounted for in our public quarterly reports.</p>
        </div>
      </div>

      <StatStrip />
    </div>
  );
}

/* ══ VISION ══ */
function Vision() {
  const items = [
    { icon:"🔄", text:"Work as a catalyst in bringing sustainable change in the lives of underprivileged children and families with a life-cycle approach to development." },
    { icon:"🌍", text:"Enable civil society across India to engage proactively in the change process through the philosophy of community-driven progress." },
    { icon:"🏛️", text:"Adopt the highest standards of governance to emerge as a knowledge and community-driven, innovative, and scalable development institution." },
  ];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 40px" }}>
      <div style={{ textAlign:"center", marginBottom:64 }}>
        <p style={eyebrow}>Our Vision</p>
        <h2 style={{ ...secHead, maxWidth:600, margin:"0 auto 16px" }}>
          A just and <span style={{ color:orange, fontStyle:"italic" }}>dignified</span> India for all
        </h2>
        <p style={{ ...bodyTxt, maxWidth:560, margin:"0 auto", textAlign:"center" }}>
          We envision a nation where access to education, healthcare, and opportunity is not determined by birth — but by possibility.
        </p>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28, marginBottom:56 }}>
        {items.map(({ icon, text }) => (
          <Card key={text} style={{ borderTop:`4px solid ${orange}` }}>
            <div style={{ fontSize:30, background:"#FFF3E0", borderRadius:14, width:60, height:60, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>{icon}</div>
            <p style={{ ...bodyTxt, marginBottom:0, fontSize:15 }}>{text}</p>
          </Card>
        ))}
      </div>

      {/* Quote image */}
      <div style={{ borderRadius:24, overflow:"hidden", position:"relative", height:320 }}>
        <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200&q=80" alt="Children learning" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(212,98,26,0.78) 0%,rgba(44,36,22,0.65) 100%)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:40 }}>
          <p style={{ fontFamily:pf, fontSize:"clamp(1.3rem,2.5vw,2rem)", fontWeight:700, color:"#fff", maxWidth:580 }}>
            "No child should grow up believing that their circumstances define their ceiling."
          </p>
          <p style={{ fontFamily:dm, fontSize:14, color:"rgba(255,255,255,0.75)", marginTop:14 }}>— Sarita Devi, Founder</p>
        </div>
      </div>
    </div>
  );
}

/* ══ MISSION ══ */
function Mission() {
  const pillars = [
    { icon:"📚", label:"Education",    color:"#FFF3E0", accent:orange,    desc:"Distributing books, stationery, and running learning programs for underprivileged children across India." },
    { icon:"🏥", label:"Healthcare",   color:"#E8F5E9", accent:green,     desc:"Providing medicines, vaccines, and running free health camps to ensure medical access for all." },
    { icon:"💧", label:"Sanitation",   color:"#E3F2FD", accent:"#1565C0", desc:"Organising cleanliness drives, building sanitation infrastructure, and distributing hygiene kits." },
    { icon:"💰", label:"Financial Aid",color:"#FCE4EC", accent:"#B71C1C", desc:"Offering targeted financial support programs to vulnerable individuals and families in need." },
  ];

  return (
    <div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 40px 48px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={eyebrow}>Our Mission</p>
          <h2 style={{ ...secHead, maxWidth:640, margin:"0 auto 16px" }}>
            Uplift, empower, and{" "}
            <span style={{ color:orange, fontStyle:"italic" }}>never leave anyone behind</span>
          </h2>
          <p style={{ ...bodyTxt, maxWidth:580, margin:"0 auto", textAlign:"center" }}>
            At Sarita Foundation, our mission is to uplift underprivileged communities by delivering essential support across four pillars of sustainable development.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24, marginBottom:56 }}>
          {pillars.map(({ icon, label, color, desc }) => (
            <div key={label} style={{ display:"flex", gap:20, alignItems:"flex-start", background:"#fff", borderRadius:18, padding:"26px 24px", boxShadow:"0 3px 16px rgba(44,36,22,0.07)" }}>
              <div style={{ fontSize:28, background:color, borderRadius:14, width:58, height:58, flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
              <div>
                <h3 style={{ fontFamily:pf, fontSize:"1.15rem", fontWeight:700, color:dark, marginBottom:8 }}>{label}</h3>
                <p style={{ fontFamily:dm, fontSize:14, color:muted, lineHeight:1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission statement banner */}
      <div style={{ background:orange, padding:"64px 40px", textAlign:"center" }}>
        <p style={{ fontFamily:pf, fontSize:"clamp(1.4rem,2.8vw,2rem)", fontWeight:700, color:"#fff", maxWidth:700, margin:"0 auto 24px", lineHeight:1.4 }}>
          "Through cleanliness drives, awareness campaigns, healthcare initiatives, and financial support programs, we strive to improve the quality of life for every vulnerable family."
        </p>
        <button style={{ padding:"14px 32px", background:"#fff", color:orange, border:"none", borderRadius:12, fontFamily:dm, fontWeight:700, fontSize:15, cursor:"pointer" }}>
          Support Our Mission →
        </button>
      </div>
    </div>
  );
}

/* ══ OUR VALUES ══ */
function OurValues() {
  const values = [
    { icon:"🤝", title:"Compassion",     desc:"We lead with empathy, treating every individual with dignity and care — never as a beneficiary, but as a partner." },
    { icon:"🔍", title:"Transparency",   desc:"Every donation is tracked and reported publicly. Quarterly impact reports, no hidden costs, no surprises." },
    { icon:"🌱", title:"Sustainability", desc:"Our programs are built for lasting change. We exit only when communities are fully self-sufficient." },
    { icon:"💪", title:"Community-Led",  desc:"We work alongside communities, co-creating solutions. Local voices always shape our programs." },
    { icon:"⚡", title:"Accountability", desc:"We hold ourselves to the highest standards — every rupee, every volunteer hour is tracked and justified." },
    { icon:"🎯", title:"Focus",          desc:"We stay deliberately small and focused. Depth of impact over breadth of presence — always." },
  ];

  return (
    <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 40px" }}>
      <div style={{ textAlign:"center", marginBottom:52 }}>
        <p style={eyebrow}>What Guides Us</p>
        <h2 style={{ ...secHead, maxWidth:500, margin:"0 auto" }}>Our Core Values</h2>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:28 }}>
        {values.map(({ icon, title, desc }) => (
          <div key={title} style={{ background:cream, borderRadius:20, padding:"32px 26px", borderTop:`4px solid ${orange}` }}>
            <div style={{ fontSize:28, background:"#fff", borderRadius:14, width:56, height:56, marginBottom:18, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:"0 2px 8px rgba(44,36,22,0.08)" }}>{icon}</div>
            <h3 style={{ fontFamily:pf, fontSize:"1.15rem", fontWeight:700, color:dark, marginBottom:10 }}>{title}</h3>
            <p style={{ fontFamily:dm, fontSize:14, color:muted, lineHeight:1.7 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══ HOW WE WORK ══ */
function HowWeWork() {
  const models = [
    { icon:"🌐", title:"Community Partnership Model", bg:"#FFF3E0", desc:"Sarita Foundation identifies and partners with credible grassroots organisations. We build their capacity, provide funding, and handhold them toward sustainability — so impact scales beyond our direct reach." },
    { icon:"📣", title:"Direct Outreach",              bg:"#E8F5E9", desc:"For high-urgency needs — floods, health emergencies, school enrollment drives — we deploy our own volunteers directly. Speed and precision matter when lives are at stake." },
    { icon:"🔬", title:"Evidence-Based Programs",      bg:"#E3F2FD", desc:"Every program we run is designed around community needs assessments. We measure outcomes, not outputs — and we publish results publicly every quarter." },
  ];

  const steps = [
    { n:"01", label:"Assess",  desc:"Ground-level needs mapping with communities" },
    { n:"02", label:"Design",  desc:"Co-create solutions with local partners" },
    { n:"03", label:"Execute", desc:"Deploy programs with full accountability" },
    { n:"04", label:"Measure", desc:"Track outcomes and publish results" },
  ];

  return (
    <div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 40px 56px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={eyebrow}>Our Approach</p>
          <h2 style={{ ...secHead, maxWidth:560, margin:"0 auto" }}>How We Create Lasting Change</h2>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:28, marginBottom:72 }}>
          {models.map(({ icon, title, bg, desc }) => (
            <div key={title} style={{ display:"grid", gridTemplateColumns:"80px 1fr", gap:28, alignItems:"flex-start", background:"#fff", borderRadius:20, padding:"32px", boxShadow:"0 4px 20px rgba(44,36,22,0.07)" }}>
              <div style={{ fontSize:34, background:bg, borderRadius:18, width:72, height:72, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
              <div>
                <h3 style={{ fontFamily:pf, fontSize:"1.25rem", fontWeight:700, color:dark, marginBottom:10 }}>{title}</h3>
                <p style={{ fontFamily:dm, fontSize:15, color:mid, lineHeight:1.8 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process steps */}
      <div style={{ background:"#fff", padding:"56px 40px" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>
          <p style={{ ...eyebrow, textAlign:"center" }}>The Process</p>
          <h2 style={{ ...secHead, textAlign:"center", marginBottom:48 }}>From Idea to Impact</h2>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", position:"relative" }}>
            <div style={{ position:"absolute", top:28, left:"12.5%", right:"12.5%", height:2, background:"#E8DCC8", zIndex:0 }} />
            {steps.map(({ n, label, desc }) => (
              <div key={n} style={{ textAlign:"center", padding:"0 16px", position:"relative", zIndex:1 }}>
                <div style={{ width:56, height:56, borderRadius:"50%", background:orange, color:"#fff", fontFamily:dm, fontWeight:700, fontSize:16, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>{n}</div>
                <h4 style={{ fontFamily:pf, fontSize:"1.05rem", fontWeight:700, color:dark, marginBottom:8 }}>{label}</h4>
                <p style={{ fontFamily:dm, fontSize:13, color:muted, lineHeight:1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══ WHY TRUST US ══ */
function WhyTrustUs() {
  const reasons = [
    { icon:"📊", title:"Quarterly Public Reports",  desc:"We publish detailed income and expenditure reports every quarter — available for download on our website." },
    { icon:"✅", title:"80G Tax Exemption",          desc:"All donations to Sarita Foundation qualify for tax deduction under Section 80G of the Income Tax Act." },
    { icon:"🏆", title:"FCRA Registered",            desc:"Registered under the Foreign Contribution Regulation Act, enabling transparent international donations." },
    { icon:"🔒", title:"Zero Overhead Promise",      desc:"100% of public donations fund direct programs. Operational costs are covered by institutional grants." },
    { icon:"👥", title:"Independent Board",          desc:"Our governing board includes independent professionals who review all major financial and program decisions." },
    { icon:"📰", title:"Press Coverage",             desc:"Our work has been featured in The Hindu, Times of India, and NDTV — independently verifiable impact stories." },
  ];

  const testimonials = [
    { quote:"My daughter is the first in our family to finish school. Sarita Foundation made it possible.", name:"Priya Desai", role:"Parent, Pune", img:"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=80&q=80" },
    { quote:"The healthcare camp reached our village when no one else would. These are real heroes.", name:"Ramesh Yadav", role:"Farmer, Nashik", img:"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80" },
    { quote:"Donating was seamless. Knowing exactly where my money goes makes all the difference.", name:"Ananya Iyer", role:"Donor, Bengaluru", img:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80" },
  ];

  return (
    <div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"80px 40px 56px" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <p style={eyebrow}>Trust and Accountability</p>
          <h2 style={{ ...secHead, maxWidth:560, margin:"0 auto" }}>Why donors choose us — and stay with us</h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, marginBottom:72 }}>
          {reasons.map(({ icon, title, desc }) => (
            <Card key={title}>
              <div style={{ fontSize:26, background:"#FFF3E0", borderRadius:12, width:52, height:52, marginBottom:16, display:"flex", alignItems:"center", justifyContent:"center" }}>{icon}</div>
              <h3 style={{ fontFamily:pf, fontSize:"1.05rem", fontWeight:700, color:dark, marginBottom:8 }}>{title}</h3>
              <p style={{ fontFamily:dm, fontSize:13.5, color:muted, lineHeight:1.7 }}>{desc}</p>
            </Card>
          ))}
        </div>

        <p style={{ ...eyebrow, textAlign:"center" }}>Voices from the Field</p>
        <h2 style={{ ...secHead, textAlign:"center", marginBottom:36 }}>What people say</h2>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
          {testimonials.map(({ quote, name, role, img }) => (
            <div key={name} style={{ background:cream, borderRadius:18, padding:"28px 24px", borderLeft:`4px solid ${orange}` }}>
              <p style={{ fontFamily:pf, fontSize:15, fontStyle:"italic", color:dark, lineHeight:1.8, marginBottom:20 }}>"{quote}"</p>
              <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                <img src={img} alt={name} style={{ width:42, height:42, borderRadius:"50%", objectFit:"cover" }} />
                <div>
                  <p style={{ fontFamily:dm, fontWeight:700, fontSize:13.5, color:dark }}>{name}</p>
                  <p style={{ fontFamily:dm, fontSize:12, color:muted }}>{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════ MAIN PAGE ══════════════ */
export default function AboutPage() {
  const [activeTab, setActiveTab] = useState(0);
  const content = [<OurStory />, <Vision />, <Mission />, <OurValues />, <HowWeWork />, <WhyTrustUs />];

  return (
    <div style={{ fontFamily:dm, background:cream, color:dark, minHeight:"100vh" }}>

      {/* Full-bleed hero (Smile Foundation pattern) */}
      <div style={{ position:"relative", width:"100%", height:480, overflow:"hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1600&q=80"
          alt="Sarita Foundation community work"
          style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 60%" }}
        />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(44,36,22,0.3) 0%, rgba(44,36,22,0.72) 100%)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", textAlign:"center", padding:"0 40px" }}>
          <p style={{ ...eyebrow, color:orange, position:"relative" }}>About Sarita Foundation</p>
          <h1 style={{ fontFamily:pf, fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:700, color:cream, lineHeight:1.1, maxWidth:680, margin:"8px auto 0" }}>
            REAL COMPASSION.{" "}<span style={{ color:orange, fontStyle:"italic" }}>REAL CHANGE.</span>
          </h1>
        </div>
      </div>

      {/* Sticky tab bar — orange like Smile's yellow, green active like Smile's green */}
      <div style={{
        position:"sticky", top:0, zIndex:100,
        background:orange,
        display:"flex", overflowX:"auto",
        borderBottom:"3px solid rgba(44,36,22,0.18)",
        scrollbarWidth:"none",
      }}>
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            style={{
              flex:"1 0 auto",
              padding:"18px 22px",
              fontFamily:dm, fontWeight:700,
              fontSize:12.5, letterSpacing:"0.07em",
              textTransform:"uppercase",
              background: activeTab === i ? green : "transparent",
              color:"#fff",
              border:"none", cursor:"pointer",
              whiteSpace:"nowrap",
              borderRight:"1px solid rgba(255,255,255,0.18)",
              transition:"background 0.2s",
              opacity: activeTab === i ? 1 : 0.88,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ background:cream, minHeight:500 }}>
        {content[activeTab]}
      </div>

      {/* Final CTA — matches home page dark section */}
      <div style={{ background:dark, padding:"72px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, left:-80, width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(212,98,26,0.28) 0%, transparent 70%)" }} />
        <div style={{ position:"absolute", bottom:-60, right:-60, width:260, height:260, borderRadius:"50%", background:"radial-gradient(circle, rgba(74,124,89,0.22) 0%, transparent 70%)" }} />
        <p style={{ ...eyebrow, position:"relative", zIndex:1 }}>Join Us</p>
        <h2 style={{ fontFamily:pf, fontSize:"clamp(1.8rem,3.5vw,2.8rem)", fontWeight:700, color:cream, marginBottom:16, position:"relative", zIndex:1 }}>
          Ready to be part of the story?
        </h2>
        <p style={{ fontFamily:dm, fontSize:16, color:"rgba(245,240,232,0.7)", marginBottom:36, position:"relative", zIndex:1 }}>
          Whether you donate or spread the word — every action matters.
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", position:"relative", zIndex:1, flexWrap:"wrap" }}>
          <button style={{ padding:"16px 36px", background:orange, color:"#fff", border:"none", borderRadius:12, fontFamily:dm, fontWeight:700, fontSize:15, cursor:"pointer" }}>
            Donate Now →
          </button>
         
        </div>
      </div>
    </div>
  );
}
