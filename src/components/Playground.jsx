import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const playgroundProjects = [
  {
    title: 'Nook',
    desc: 'An inspiration archive for creatives to save, organize, and revisit references in a more immersive way.',
    tags: ['Creative Tool', 'Chrome Extension'],
    image: '/images/cans.jpg',
    video: '',
  },
  {
    title: 'Remake',
    desc: 'A creative-stack builder to assemble, remix, and deploy UI kits with modular design tokens.',
    tags: ['Web App', 'Creative Dev'],
    image: '/images/gardern-1.png',
    video: '/videos/gardern.mp4',
  },
  {
    title: 'Signal',
    desc: 'A real-time notification orchestration layer for multi-agent systems with priority queuing.',
    tags: ['Backend', 'Python', 'WebSocket'],
    image: '/images/shoes.png',
    video: '',

  },
  {
    title: 'Construct',
    desc: 'A node-based visual pipeline editor for building and debugging AI agent workflows in the browser.',
    tags: ['React', 'Canvas API', 'LangGraph'],
    image: '/images/bhushido.png',
    video: '',

  },
];

const Playground = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Calculate total horizontal distance to scroll the entire section (intro + cards)
      const getScrollAmount = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  return (
    <section id="playground" className="playground-section" ref={sectionRef}>
      {/* Whole Section Horizontal Track */}
      <div className="playground-track" ref={trackRef}>
        {/* Intro Block (moves with horizontal scroll) */}
        <div className="playground-intro">
          <div className="playground-label mono">
            <span className="text-accent mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>05 //</span>

            <span className="green-dot"></span>
            SINCE 2025
          </div>
          <ZoomBlurReveal>
            <h2 className="playground-title">Playground</h2>
          </ZoomBlurReveal>
          <ZoomBlurReveal delay={0.15}>
            <p className="playground-desc">
              A space for self-initiated products, prototypes, and creative systems shaped by curiosity, code, and fast iteration.
            </p>
          </ZoomBlurReveal>
          <div className="playground-scroll-hint mono">
            SCROLL →
          </div>
        </div>

        {/* Project Cards (move right along with intro) */}
        {playgroundProjects.map((project, i) => (
          <div className="playground-card" key={i}>
            <div
              className="playground-card-image"
              data-cursor-text="View Now"
            >
              <video
                autoplay
                muted
                loop
                playsinline
                poster={project.image}
                alt={project.title}
              >
                <source src={project.video} alt={project.title} type="video/mp4" />
              </video>            </div>
            <h3 className="playground-card-title">{project.title}</h3>
            <p className="playground-card-desc">{project.desc}</p>
            <div className="playground-card-tags">
              {project.tags.map((tag, j) => (
                <span className="playground-tag" key={j}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Playground;
