import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro animation timeline
      const tl = gsap.timeline();
      
      tl.from(".hero-line", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.2
      })
      .from(".hero-subtitle", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6")
      .from(".btn-primary", {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.8");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero-section" ref={containerRef}>
      <h1 className="hero-title">
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line">Engineering</div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line"><span className="text-accent">Agentic</span> Systems</div>
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div className="hero-line">& Digital Luxury.</div>
        </div>
      </h1>
      
      <p className="hero-subtitle">
        I bridge the gap between complex AI architecture and high-end, gallery-grade user experiences. 
        Precision meets aesthetics.
      </p>

      <div>
        <a href="#projects" className="btn-primary magnetic">
          <span>View Case Studies</span>
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
