import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const About = () => {
  const containerRef = useRef(null);
  const countersRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in the about text
      gsap.from('.about-text', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        }
      });

      // Animate stat counters
      countersRef.current.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        const obj = { val: 0 };
        
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%',
          },
          onUpdate: () => {
            counter.textContent = Math.floor(obj.val);
          }
        });
      });

      // Stagger the stat cards
      gsap.from('.stat-card', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.stats-grid',
          start: 'top 80%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about-section" ref={containerRef}>
      <h2 className="section-title">
        <span className="text-accent mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>01 //</span>
        About Me
      </h2>

      <div className="about-content">
        <div className="about-text">
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            I'm a software engineer who obsesses over the intersection of <span className="text-accent">complex systems</span> and <span className="text-accent">refined user experiences</span>. I believe the best engineering is invisible — it just works, and it feels right.
          </p>
          <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-secondary)' }}>
            Currently focused on building agentic AI pipelines and high-performance interfaces. When I'm not shipping code, I'm studying systems design, typography, and the craft of making technology feel human.
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-number" ref={el => countersRef.current[0] = el} data-target="4">0</span>
            <span className="stat-suffix">+</span>
            <span className="stat-label mono">Years of Experience</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" ref={el => countersRef.current[1] = el} data-target="20">0</span>
            <span className="stat-suffix">+</span>
            <span className="stat-label mono">Projects Shipped</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" ref={el => countersRef.current[2] = el} data-target="10">0</span>
            <span className="stat-suffix">K</span>
            <span className="stat-label mono">Lines of Code</span>
          </div>
          <div className="stat-card">
            <span className="stat-number" ref={el => countersRef.current[3] = el} data-target="99">0</span>
            <span className="stat-suffix">%</span>
            <span className="stat-label mono">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
