import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const projects = [
  {
    id: 1,
    title: 'Agentic Workflow Orchestrator',
    description: 'A visual programming interface for AI agents. Built with a bespoke WebGL node graph and high-performance React architecture. Achieved 60fps rendering with over 10,000 active nodes.',
    tech: ['React', 'Three.js', 'WebSockets', 'Python'],
    image: 'https://picsum.photos/id/48/1200/800' // Dark, tech-looking placeholder
  },
  {
    id: 2,
    title: 'Neural Interface UI',
    description: 'A conceptual interface for brain-computer interaction. Focused on micro-animations and non-obtrusive, ambient feedback loops using GSAP and custom shaders.',
    tech: ['Next.js', 'GSAP', 'GLSL', 'Figma'],
    image: 'https://picsum.photos/id/350/1200/800'
  },
  {
    id: 3,
    title: 'DeFi Liquidity Dashboard',
    description: 'An institutional-grade dashboard for monitoring liquidity pools. Minimalist design paired with high-density data visualizations.',
    tech: ['TypeScript', 'D3.js', 'Tailwind', 'Ethers.js'],
    image: 'https://picsum.photos/id/201/1200/800'
  }
];

const Projects = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.project-card');
      
      cards.forEach((card) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 60%',
            end: 'bottom 40%',
            toggleClass: 'is-active',
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects-section" ref={containerRef}>
      <h2 className="section-title">
        <span className="text-accent mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>03 //</span>
        Case Studies
      </h2>

      <div className="projects-list">
        {projects.map((project, index) => (
          <div key={project.id} className="project-card magnetic">
            <div className="project-info">
              <span className="project-number mono">0{index + 1}</span>
              <h3 className="project-title">{project.title}</h3>
            </div>
            
            <div className="project-image-wrapper">
              {/* Added a subtle overlay to make images fit the dark theme better */}
              <div style={{ position: 'absolute', inset: 0, backgroundColor: 'var(--bg-primary)', opacity: 0.3, zIndex: 1, mixBlendMode: 'multiply' }}></div>
              <img src={project.image} alt={project.title} className="project-image" />
            </div>

            <div className="project-details">
              <p className="project-desc">{project.description}</p>
              <div className="project-tech">
                {project.tech.map(t => (
                  <span key={t} className="tech-tag mono">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
