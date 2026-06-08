import { useState, useEffect, useRef } from "react";
import "../css/Hero.css";

import hero_img1 from "../assets/hero_img1.png";
import hero_img2 from "../assets/hero_img2.png";
import hero_img3 from "../assets/hero_img3.png";
import hero_img4 from "../assets/hero_img4.png";

const SLIDES = [
  { src: hero_img1, alt: "Community outreach" },
  { src: hero_img2, alt: "Education drive" },
  { src: hero_img3, alt: "Healthcare camp" },
   { src: hero_img4, alt: "Cleanliness drive" },
];


export default function Hero() {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);

  // Keep ref in sync with state
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Auto-advance — single interval, never restarts
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (currentRef.current + 1) % SLIDES.length;
      setCurrent(next);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  function goTo(index) { setCurrent(index); }
  function prev() { goTo((currentRef.current - 1 + SLIDES.length) % SLIDES.length); }
  function next() { goTo((currentRef.current + 1) % SLIDES.length);  }

  return (
    <section className="hero">
      <div className="hero__blob hero__blob--orange" />
      <div className="hero__blob hero__blob--green" />

      <svg className="hero__squiggle" viewBox="0 0 60 60" fill="none">
        <path d="M10 50 Q30 10 50 30 Q60 40 40 50" stroke="#D4621A" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>

      <div className="hero__inner">

        {/* LEFT: Text */}
        <div className="hero__text">

          <h1 className="hero__heading">
            Make big <span className="hero__heading--accent">changes</span> and help the world
          </h1>

          <p className="hero__body">
            At Sarita Foundation, we believe that every individual deserves access to education,
            healthcare, dignity, and opportunities for a better future. Our mission is to uplift
            underprivileged communities by providing essential support in the areas of education,
            health, financial assistance, and social welfare.
          </p>
          <p className="hero__body">
            We are committed to creating meaningful change by distributing books, educational
            materials, medicines, vaccines, and basic necessities to those who need them most.
            Through cleanliness drives, awareness campaigns, healthcare initiatives, and financial
            support programs, we strive to improve the quality of life for vulnerable individuals
            and families.
          </p>
          <p className="hero__body hero__body--quote">
            Together, we can build stronger communities, nurture brighter futures, and ensure
            that no one is left behind.
          </p>

          <div className="hero__cta-row">
            <button className="hero__cta-btn">Get Started →</button>
            <span className="hero__social-label">Follow us on</span>
            <div className="hero__socials">
              {["f", "in", "ig", "𝕏"].map((s, i) => (
                <a key={i} href="#" className="hero__social-icon">{s}</a>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Slideshow */}
        <div className="hero__image-wrapper">
          <div className="hero__image-frame">
            {SLIDES.map((slide, i) =>
              slide.src ? (
                <img
                  key={i}
                  src={slide.src}
                  alt={slide.alt}
                  className={`hero__slide ${i === current ? "hero__slide--active" : ""}`}
                />
              ) : (
                <div
                  key={i}
                  className={`hero__slide hero__slide--placeholder ${i === current ? "hero__slide--active" : ""}`}
                >
    
                  <p className="hero__placeholder-text">{slide.alt}</p>
                </div>
              )
            )}
          </div>

          <button className="hero__arrow hero__arrow--prev" onClick={prev} aria-label="Previous">‹</button>
          <button className="hero__arrow hero__arrow--next" onClick={next} aria-label="Next">›</button>

          <div className="hero__dots">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                className={`hero__dot ${i === current ? "hero__dot--active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="hero__chip hero__chip--bottom-left">
            <span className="hero__chip-number">5000+</span>
            <span className="hero__chip-label">Lives Impacted</span>
          </div>
          <div className="hero__chip hero__chip--top-right">
            <span className="hero__chip-number hero__chip-number--green">12+</span>
            <span className="hero__chip-label">Active Campaigns</span>
          </div>
        </div>

      </div>
    </section>
  );
}
