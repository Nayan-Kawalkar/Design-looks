import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const playgroundProjects = [
  {
    title: 'AXIOM',
    desc: 'Interactive 3D sneaker brand experience built with Three.js and Sketchfab. A sci-fi runner with live photonic core, math-driven motion, and real-time PBR shading.',
    tags: ['Three.js', '3D Web', 'Interactive', 'WebGL'],
    link: 'https://3-d-shoe-web.vercel.app/',
    image: '/images/shoes.png',
    video: '',
  },
  {
    title: 'Moving Garden',
    desc: 'Animated, award-style website created with Google Antigravity + Google Flow. A living garden experience built in a short time.',
    tags: ['Antigravity', 'Google Flow', 'Animation', 'Creative Dev'],
    link: 'https://moving-gardern.vercel.app/',
    image: '/images/gardern.png',
    video: '/videos/gardern.mp4',
  },
  {
    title: 'NOVA – 3D Drink Cans',
    desc: '3D product showcase of drink cans built in about one hour using Google Flow, AI image generation, and Antigravity.',
    tags: ['3D', 'Product Showcase', 'AI Tools', 'WebGL'],
    link: 'https://3d-drink-cans.vercel.app/',
    image: '/images/cans.jpg',
    video: '',
  },
  {
    title: 'Bushido Zen',
    desc: 'Samurai creed & focus trainer website. An immersive AI-studio style experience exploring discipline and mindfulness.',
    tags: ['AI Studio', 'Immersive', 'Interactive', 'Concept'],
    link: 'https://sword-willa.vercel.app/',
    image: '/images/bhushido.png',
    video: '',
  },
  {
    title: 'Arcane Experience',
    desc: 'Cinematic, vibe-driven website inspired by Arcane and League of Legends. Immersive web experience created in minutes.',
    tags: ['Cinematic', 'Web Design', 'Creative Dev', 'Arcane'],
    link: 'https://arcane-rust.vercel.app/',
    image: '/images/arcane.png',
    video: '',
  },
  {
    title: 'Fluid Animation Study',
    desc: 'Interactive real-time shader experiment with fluid motion, soft diffraction, and mouse-reactive behavior. Built with Google AI Studio.',
    tags: ['Shaders', 'WebGL', 'Interactive', 'AI Studio'],
    link: 'https://fluid-animation-sigma.vercel.app/',
    image: '/images/fluid.png',
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

    const mm = gsap.matchMedia();

    // Desktop horizontal scroll (only above 768px)
    mm.add("(min-width: 769px)", () => {
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
    });

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timer);
      mm.revert();
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
          <a
            className="playground-card"
            key={i}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="playground-card-image"
              data-cursor-text="View Now"
            >
              {project.video ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={project.image}
                >
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : (
                <img src={project.image} alt={project.title} />
              )}
            </div>
            <h3 className="playground-card-title">{project.title}</h3>
            <p className="playground-card-desc">{project.desc}</p>
            <div className="playground-card-tags">
              {project.tags.map((tag, j) => (
                <span className="playground-tag" key={j}>{tag}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Playground;
