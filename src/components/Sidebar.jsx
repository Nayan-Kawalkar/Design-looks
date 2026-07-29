import React from 'react';
import { FaEnvelope, FaLinkedin, FaXTwitter, FaInstagram } from 'react-icons/fa6';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div>
        <h2 className="mono" style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your Name</h2>
        <p className="text-secondary" style={{ fontSize: '0.9rem' }}>Agentic AI & UI Engineer</p>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
        <a href="#about" className="magnetic mono" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          01 // About
        </a>
        <a href="#experience" className="magnetic mono" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          02 // Experience
        </a>
        <a href="#projects" className="magnetic mono text-accent" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          03 // Case Studies
        </a>
      </nav>

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="mailto:hello@example.com" className="magnetic" aria-label="Email">
            <FaEnvelope size={20} className="text-secondary hover-accent transition-colors" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="magnetic" aria-label="LinkedIn">
            <FaLinkedin size={20} className="text-secondary hover-accent transition-colors" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="magnetic" aria-label="Twitter">
            <FaXTwitter size={20} className="text-secondary hover-accent transition-colors" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="magnetic" aria-label="Instagram">
            <FaInstagram size={20} className="text-secondary hover-accent transition-colors" />
          </a>
        </div>

        <p className="mono text-secondary" style={{ fontSize: '0.75rem' }}>
          SYS.STAT: ONLINE<br/>
          LOC: GLOBAL
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
