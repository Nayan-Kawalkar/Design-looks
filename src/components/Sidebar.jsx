import React, { useEffect, useState } from 'react';
import { FaEnvelope, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';

const navItems = [
  { id: 'about', label: '01 // About' },
  { id: 'experience', label: '02 // Experience' },
  { id: 'projects', label: '03 // Case Studies' },
  { id: 'tech', label: '04 // Tech Arsenal' },
  { id: 'contact', label: '05 // Contact' },
];

const Sidebar = () => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="sidebar">
      <div>
        <h2 className="mono" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your Name</h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Agentic AI & UI Engineer</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleNavClick(e, id)}
            className={`sidebar-nav-link magnetic mono ${activeSection === id ? 'active' : ''}`}
          >
            <span className="nav-indicator"></span>
            {label}
          </a>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="mailto:hello@example.com" className="magnetic social-icon" aria-label="Email">
            <FaEnvelope size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="magnetic social-icon" aria-label="LinkedIn">
            <FaLinkedin size={18} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="magnetic social-icon" aria-label="Twitter">
            <FaXTwitter size={18} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="magnetic social-icon" aria-label="Instagram">
            <FaInstagram size={18} />
          </a>
        </div>

        <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
          SYS.STAT: ONLINE<br/>
          LOC: GLOBAL
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
