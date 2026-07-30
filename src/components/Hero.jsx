import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const Hero = () => {
  return (
    <section className="hero-section container" id="hero">
      <ZoomBlurReveal delay={0.1} duration={0.9}>
        <h1 className="hero-title">
          <div>Engineering</div>
          <div><span className="text-accent">Agentic</span> Systems</div>
          <div>& Digital Luxury.</div>
        </h1>
      </ZoomBlurReveal>
      
      <ZoomBlurReveal delay={0.25} duration={0.9}>
        <p className="hero-subtitle">
          I bridge the gap between complex AI architecture and high-end, gallery-grade user experiences. 
          Precision meets aesthetics.
        </p>
      </ZoomBlurReveal>

      <ZoomBlurReveal delay={0.4} duration={0.9}>
        <div>
          <a href="#projects" className="btn-primary magnetic">
            <span>View Case Studies</span>
            <ArrowRight size={18} />
          </a>
        </div>
      </ZoomBlurReveal>
    </section>
  );
};

export default Hero;
