import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-headline-word', {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });

      gsap.from('.contact-body', {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 60%',
        }
      });

      gsap.from('.contact-cta', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact-section container" ref={containerRef}>
      <div className="contact-inner">
        <h2 className="contact-headline">
          <div style={{ overflow: 'hidden' }}>
            <span className="contact-headline-word">Let's</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span className="contact-headline-word gradient-text">Build</span>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <span className="contact-headline-word">Together.</span>
          </div>
        </h2>

        <p className="contact-body">
          Have a project in mind, want to collaborate, or just want to connect? I'm always open to discussing new ideas and opportunities.
        </p>

        <div className="contact-cta">
          <a href="mailto:hello@example.com" className="btn-cta magnetic">
            <span>Get In Touch</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
