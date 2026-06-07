// import "../css/ImpactSection.css";

// const IMPACT_CARDS = [
//   {
//     icon: "📚",
//     iconBg: "#FFF3E0",
//     label: "Education",
//     desc: "Distributing books, educational materials, and running awareness programs for underprivileged children and youth across communities.",
//   },
//   {
//     icon: "🏥",
//     iconBg: "#E8F5E9",
//     label: "Healthcare",
//     desc: "Providing medicines, vaccines, and running healthcare camps to ensure basic medical access for all, regardless of financial status.",
//   },
//   {
//     icon: "💧",
//     iconBg: "#E3F2FD",
//     label: "Cleanliness",
//     desc: "Organizing cleanliness drives and sanitation initiatives to improve community hygiene, dignity, and environmental well-being.",
//   },
//   {
//     icon: "💰",
//     iconBg: "#FCE4EC",
//     label: "Financial Aid",
//     desc: "Offering targeted financial support programs to vulnerable individuals and families facing hardship and economic instability.",
//   },
// ];

// export default function ImpactSection() {
//   return (
//     <section className="impact">
//       <div className="impact__header">
//         <p className="impact__eyebrow">What We Do</p>
//         <h2 className="impact__heading">Our Areas of Impact</h2>
//         <p className="impact__subheading">
//           Through dedicated programs and passionate volunteers, we create lasting change
//           across four core pillars of community development.
//         </p>
//       </div>

//       <div className="impact__grid">
//         {IMPACT_CARDS.map(({ icon, iconBg, label, desc }) => (
//           <div key={label} className="impact__card">
//             <div className="impact__card-icon" style={{ background: iconBg }}>
//               {icon}
//             </div>
//             <h3 className="impact__card-title">{label}</h3>
//             <p className="impact__card-desc">{desc}</p>
//             <a href="#" className="impact__card-link">Learn more →</a>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
