import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const headingRef = useRef(null);

  // Track scroll position of the footer heading relative to viewport
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 95%", "center 50%"],
  });

  // "Let's" glides from the left (-350px -> 0px) and fades in
  const letsX = useTransform(scrollYProgress, [0, 1], [-350, 0]);
  const letsOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  // "Collaborate!" glides from the right (350px -> 0px) and fades in
  const collaborateX = useTransform(scrollYProgress, [0, 1], [350, 0]);
  const collaborateOpacity = useTransform(scrollYProgress, [0, 0.85], [0, 1]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'top') {
      scrollToTop();
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#09090b',
        color: '#ffffff',
        paddingTop: '6rem',
        paddingBottom: '3rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Responsive scoped styles */}
      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 3rem;
          margin-bottom: 5rem;
        }
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }
          .footer-grid ul {
            align-items: center !important;
          }
          .footer-grid a {
            justify-content: center !important;
          }
          .footer-bottom-bar {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
          .footer-availability {
            justify-content: center !important;
          }
        }
      `}</style>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        {/* HUGE HEADING: Let's (from Left) & Collaborate! (from Right) */}
        <div
          ref={headingRef}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            overflow: 'hidden',
            padding: '1rem 0',
          }}
        >
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <motion.h2
              style={{
                x: letsX,
                opacity: letsOpacity,
                fontSize: 'clamp(3.8rem, 10vw, 8.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: '#ffffff',
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                display: 'inline-block',
              }}
            >
              Let's
            </motion.h2>
          </div>

          <div style={{ overflow: 'hidden', width: '100%' }}>
            <motion.h2
              style={{
                x: collaborateX,
                opacity: collaborateOpacity,
                fontSize: 'clamp(3.8rem, 10vw, 8.5rem)',
                fontWeight: 500,
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: '#ffffff',
                margin: 0,
                fontFamily: "'Inter', sans-serif",
                display: 'inline-block',
              }}
            >
              Collaborate!
            </motion.h2>
          </div>
        </div>

        {/* THIN HORIZONTAL DIVIDER */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(255, 255, 255, 0.12)',
            marginBottom: '3.5rem',
          }}
        />

        {/* THREE COLUMNS GRID */}
        <div className="footer-grid">
          {/* COLUMN 1: MENU */}
          <div>
            <ZoomBlurReveal>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: '#666666',
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.4rem',
                }}
              >
                MENU
              </span>
            </ZoomBlurReveal>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {['Home', 'Work', 'Playground', 'About'].map((item) => {
                const sectionId = item === 'Home' ? 'hero' : item.toLowerCase();
                return (
                  <li key={item}>
                    <a
                      href={`#${sectionId}`}
                      onClick={(e) => handleNavClick(e, sectionId)}
                      style={{
                        color: '#d4d4d8',
                        fontSize: '0.95rem',
                        textDecoration: 'none',
                        fontFamily: "'Inter', sans-serif",
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                      onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                    >
                      {item}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* COLUMN 2: CONNECT */}
          <div>
            <ZoomBlurReveal delay={0.1}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: '#666666',
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.4rem',
                }}
              >
                CONNECT
              </span>
            </ZoomBlurReveal>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <li>
                <a
                  href="mailto:kawalkarnayan07@gmail.com"
                  style={{
                    color: '#d4d4d8',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                >
                  Email
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/nayan-kawalkar-164725352/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#d4d4d8',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                >
                  LinkedIn ↗
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/Nayan-Kawalkar"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#d4d4d8',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                >
                  Github ↗
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/itsbyNayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: '#d4d4d8',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                >
                  X/ Twitter ↗
                </a>
              </li>

              <li>
                <a
                  href="#resources"
                  style={{
                    color: '#d4d4d8',
                    fontSize: '0.95rem',
                    textDecoration: 'none',
                    fontFamily: "'Inter', sans-serif",
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#ffffff')}
                  onMouseLeave={(e) => (e.target.style.color = '#d4d4d8')}
                >
                  Resources ↗
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: SAY HELLO */}
          <div style={{ gridColumn: 'span 1' }}>
            <ZoomBlurReveal delay={0.2}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: '#666666',
                  fontFamily: "'Space Mono', monospace",
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.4rem',
                }}
              >
                SAY HELLO
              </span>
            </ZoomBlurReveal>

            {/* Email Address */}
            <ZoomBlurReveal delay={0.3}>
              <a
                href="mailto:jingjinghan46@gmail.com"
                style={{
                  display: 'block',
                  color: '#ffffff',
                  fontSize: 'clamp(1.4rem, 2.5vw, 2.2rem)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  letterSpacing: '-0.02em',
                  marginBottom: '1.2rem',
                  wordBreak: 'break-all',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={(e) => (e.target.style.opacity = '0.85')}
                onMouseLeave={(e) => (e.target.style.opacity = '1')}
              >
                kawalkarnayan07@gmail.com
              </a>
            </ZoomBlurReveal>

            {/* Availability Status Badge */}
            <div className="footer-availability" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#22c55e',
                  boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)',
                  display: 'inline-block',
                }}
              />
              <span style={{ fontSize: '0.88rem', color: '#a1a1aa', fontFamily: "'Inter', sans-serif" }}>
                Available for work — Maharastra, India
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & BACK TO TOP BAR */}
        <div className="footer-bottom-bar">
          <span style={{ fontSize: '0.82rem', color: '#71717a', fontFamily: "'Inter', sans-serif" }}>
            ©{currentYear} Nayan Kawalkar — All rights reserved
          </span>

          <button
            onClick={scrollToTop}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#a1a1aa',
              fontSize: '0.82rem',
              fontFamily: "'Space Mono', monospace",
              letterSpacing: '0.08em',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#a1a1aa')}
          >
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
