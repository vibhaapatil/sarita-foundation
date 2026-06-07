// import "../css/Footer.css";
// const FOOTER_LINKS = {
//   "Quick Links": ["Home", "About Us", "Campaigns", "Our Work", "Resource Center"],
//   "Get Involved": ["Volunteer", "Donate", "Partner With Us", "Fundraise"],
//   "Contact": ["info@saritafoundation.org", "+91 98765 43210", "Mumbai, Maharashtra, India"],
// };

// export default function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer__top">
//         {/* Brand */}
//         <div className="footer__brand">
//           <div className="footer__logo">
//             <div className="footer__logo-icon">♥</div>
//             <span className="footer__logo-text">Sarita Foundation</span>
//           </div>
//           <p className="footer__tagline">
//             Uplifting underprivileged communities through education, healthcare,
//             dignity, and financial support across India.
//           </p>
//           <div className="footer__socials">
//             {["f", "in", "ig", "𝕏"].map((s, i) => (
//               <a key={i} href="#" className="footer__social" aria-label={`Social ${s}`}>{s}</a>
//             ))}
//           </div>
//         </div>

//         {/* Link columns */}
//         {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
//           <div key={heading} className="footer__col">
//             <h4 className="footer__col-heading">{heading}</h4>
//             <ul className="footer__col-list">
//               {links.map((link) => (
//                 <li key={link}>
//                   <a href="#" className="footer__col-link">{link}</a>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       <div className="footer__bottom">
//         <p className="footer__copyright">© 2026 Sarita Foundation · All rights reserved</p>
//         <div className="footer__legal-links">
//           <a href="#" className="footer__legal-link">Privacy Policy</a>
//           <span className="footer__legal-dot">·</span>
//           <a href="#" className="footer__legal-link">Terms of Use</a>
//           <span className="footer__legal-dot">·</span>
//           <a href="#" className="footer__legal-link">Sitemap</a>
//         </div>
//       </div>
//     </footer>
//   );
// }
