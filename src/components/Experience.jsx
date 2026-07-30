import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const experiences = [
  {
    id: 1,
    date: '2024 - Present',
    role: 'Senior UI/AI Engineer',
    company: 'Agentic Systems Co.',
    description: 'Spearheading the development of neural interfaces and AI-driven user experiences. Optimizing generative workflows for high-performance enterprise applications.'
  },
  {
    id: 2,
    date: '2022 - 2024',
    role: 'Creative Developer',
    company: 'Digital Luxury Agency',
    description: 'Built award-winning, WebGL-heavy promotional sites for luxury brands. Focused on micro-interactions, custom shaders, and scroll-based storytelling.'
  },
  {
    id: 3,
    date: '2020 - 2022',
    role: 'Frontend Developer',
    company: 'Tech Innovators',
    description: 'Developed scalable React architectures. Transitioned legacy monolithic frontends into modular, high-speed jamstack applications.'
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the timeline line height based on scroll
      gsap.to(lineRef.current, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: true,
        }
      });

      // Animate each item
      const items = gsap.utils.toArray('.timeline-item');
      items.forEach((item) => {
        gsap.to(item, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 80%',
            toggleClass: 'is-active', // Adds class for dot highlighting
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience-section container" ref={containerRef}>
      <ZoomBlurReveal>
        <h2 className="section-title">
          <span className="text-accent mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>02 //</span>
          Experience
        </h2>
      </ZoomBlurReveal>

      <div className="timeline">
        <div className="timeline-line"></div>
        <div className="timeline-line-active" ref={lineRef}></div>

        {experiences.map((exp) => (
          <div key={exp.id} className="timeline-item">
            <div className="timeline-dot"></div>
            <span className="timeline-date mono">{exp.date}</span>
            <ZoomBlurReveal delay={0.1}>
              <h3 className="timeline-role">{exp.role}</h3>
            </ZoomBlurReveal>
            <div className="timeline-company mono">{exp.company}</div>
            <ZoomBlurReveal delay={0.2}>
              <p className="timeline-desc">{exp.description}</p>
            </ZoomBlurReveal>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
