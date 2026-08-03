import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const technologies = [
  'React.js', 'Node.js', 'Express', 'Django', 'TypeScript', 'Python',
  'Java', 'C/C++', 'React Native', 'MongoDB', 'Supabase', 'Upstash Redis',
  'Gemini API', 'Claude API', 'MiniMax LLM', 'LangGraph', 'RAG Pipelines',
  'Multi-Agent AI', 'Figma', 'Framer', 'WordPress', 'Git',
];

const TechMarquee = () => {
  const marqueeRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in on scroll
      gsap.from(marqueeRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: marqueeRef.current,
          start: 'top 85%',
        }
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  // Duplicate the list for seamless loop
  const doubledTech = [...technologies, ...technologies];

  return (
    <section className="marquee-section" ref={marqueeRef}>
      <ZoomBlurReveal>
        <h2 className="section-title" style={{ padding: '0 2rem 2rem' }}>
          <span className="text-accent mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>04 //</span>
          Tech Arsenal
        </h2>
      </ZoomBlurReveal>

      <div className="marquee-container">
        <div className="marquee-track">
          {doubledTech.map((tech, i) => (
            <span key={i} className="marquee-item magnetic">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Second row, reversed direction */}
      <div className="marquee-container reverse" style={{ marginTop: '1rem' }}>
        <div className="marquee-track reverse-track">
          {doubledTech.map((tech, i) => (
            <span key={i} className="marquee-item magnetic">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechMarquee;
