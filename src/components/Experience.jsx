import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const experiences = [
  {
    id: 1,
    date: 'Mar 2026 – Present',
    role: 'Full Stack Developer Intern',
    company: 'Win Design Labs',
    description: 'Developing full-stack features end-to-end with React.js and Node.js/Express — UI components, backend APIs, and database schemas. Integrating LLM providers (Gemini, MiniMax) into production features, including prompt design, retrieval-augmented generation, and dynamic UI rendering from chat responses.'
  },
  {
    id: 2,
    date: 'Aug 2025 – Nov 2025',
    role: 'Senior Web Development Intern',
    company: 'KodeKalp Pvt. Ltd.',
    description: 'Built and maintained end-to-end web applications with React.js and Node.js/Express across the MERN stack — features, APIs, and integrations — collaborating cross-functionally to improve scalability, performance, and code quality.'
  },
  {
    id: 3,
    date: 'Jun 2023 – Jul 2024',
    role: 'Junior Web Development Intern',
    company: 'SSIT Pvt. Ltd.',
    description: 'Developed web application components with Django and supported backend feature implementation. Performed unit testing with pytest and built basic SEO tooling in Python.'
  },
  {
    id: 4,
    date: 'Mar 2025',
    role: 'Team Lead',
    company: 'National-Level Project Competition',
    description: 'Led a team end-to-end through a national-level project competition — an AI-based Smart Farming Application — and won 1st Prize on 21 March 2025.'
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
          <span className="text-accent mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>03 //</span>
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
