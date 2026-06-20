import React, { useEffect, useRef } from "react";

import "../css/ImpactSection.css";
import educationImg from "../assets/education.png";
import healthImg from "../assets/health.png";
import cleanlinessImg from "../assets/cleanliness.png";
import financeImg from "../assets/finance.png";

const focusAreas = [
  {
   
    title: "Education",
    tagline: "Empowering Minds. Shaping Futures.",
    description: [
       "Education is the most powerful tool we have to break the cycle of poverty. We distribute books, stationery, and learning materials to underprivileged children who would otherwise go without, ensuring that financial hardship is never a barrier to learning.",
      "Our awareness programs reach deep into rural and semi-urban communities, working with local schools, teachers, and parents to build a culture where education is valued and prioritized. We train volunteers to conduct after-school sessions, bridging the gap between classroom learning and real-world understanding.",
      "We believe that every child, regardless of where they are born or how much their family earns, deserves access to quality education. Through our programs, we have supported thousands of children across communities — giving them not just books, but the belief that their future is worth investing in.",
    ],
    image: educationImg, 
    imageAlt: "Children engasged in education programs",
  },
  {
    
    title: "Healthcare",
    tagline: "Accessible Care for All.",
    description: [
      "Good health is not a privilege — it is a fundamental human right. Yet millions of people in underserved communities lack access to even the most basic medical care. Our healthcare initiative works to close this gap by bringing medicines, vaccines, and trained medical professionals directly to those who need them most.",
      "We organise regular healthcare camps in remote and low-income areas, offering free consultations, diagnostic tests, and treatment for common illnesses. Our mobile health units travel to villages and urban slums where permanent clinics are absent, ensuring that distance and cost are no longer reasons people go without care.",
      "Beyond treatment, we focus heavily on prevention — running hygiene education workshops, maternal and child health programs, and nutrition awareness drives. We work with local health workers and ASHA volunteers to create a grassroots network of care that is sustainable, community-led, and deeply trusted.",
    ],
    image: healthImg,
    imageAlt: "Healthcare camp in a community",
    reverse: true,
  },
  {
   
    title: "Cleanliness",
    tagline: "Cleaner Communities. Healthier Lives.",
    description: [
      "A clean environment is the foundation of a dignified life. Lack of sanitation and poor waste management are among the leading causes of disease in low-income communities, affecting children most severely. Our cleanliness initiative tackles this crisis head-on through community-led drives, infrastructure support, and behavioral change programs.",
      "We organise large-scale cleanliness drives in partnership with local governments, resident welfare associations, and schools — mobilising hundreds of volunteers to clean public spaces, rivers, and open grounds. But we go beyond one-time events: we work to install waste bins, build sanitation facilities, and create long-term waste disposal systems in areas that lack them.",
      "True cleanliness begins with awareness. Our workshops in schools and community centres teach children and adults alike about hygiene, the importance of clean water, and the environmental impact of littering. When communities take ownership of their spaces, lasting change becomes possible.",
    ],
   
    image: cleanlinessImg,
    imageAlt: "Community cleanliness drive volunteers",
  },
  {
 
    title: "Financial Aid",
    tagline: "Stability. Dignity. Independence.",
    description: [
       "Economic hardship can strip a family of its dignity overnight. A sudden illness, a job loss, or a natural disaster can push even a working family into a cycle of debt and despair. Our financial aid programs are designed to provide a safety net — immediate, targeted support that helps families stabilise their lives without compromising their self-respect.",
      "We identify vulnerable individuals and families through our grassroots network and provide direct financial assistance for education fees, medical emergencies, livelihood restoration, and basic necessities. Every rupee is accounted for and disbursed with transparency, ensuring that help reaches exactly where it is needed.",
      "Financial aid alone is not enough. Alongside monetary support, we connect beneficiaries with skill development programs, microfinance opportunities, and employment networks — because our goal is not dependency, but empowerment. We walk with families not just through their crisis, but towards a future where they no longer need us.",
    ],
    image: financeImg,
    imageAlt: "Financial aid program recipients",
    reverse: true,
  },
];

function ImpactAreaItem({ label, title, tagline, description, image, imageAlt, reverse }) {
  const itemRef = useRef(null);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          observer.unobserve(el); // animate once only
        }
      },
      {
        threshold: 0.15, // trigger when 15% of the row is visible
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`impact-areas__item${reverse ? " impact-areas__item--reverse" : ""}`}
    >
      <div className="impact-areas__image">
        <img src={image} alt={imageAlt} />
      </div>
      <div className="impact-areas__text">
        <p className="impact-areas__label">{label}</p>
        <h3 className="impact-areas__title">{title}</h3>
        <p className="impact-areas__tagline">{tagline}</p>
        {description.map((para, i) => (
          <p key={i} className="impact-areas__description">{para}</p>
        ))}
      </div>
    </div>
  );
}

export default function ImpactAreas() {
  return (
    <section className="impact-areas">
      <div className="impact-areas__header">
        <h2>Our Areas Of Impact</h2>
      </div>

      {focusAreas.map((area, index) => (
        <ImpactAreaItem key={index} {...area} />
      ))}
    </section>
  );
}
