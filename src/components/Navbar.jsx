import React, { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaEllipsisH } from 'react-icons/fa';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'playground', label: 'Playground' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const { scrollY } = useScroll();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);
  const isHoveredRef = useRef(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest <= 50) {
      setIsAtTop(true);
      setIsHidden(false);
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    } else {
      if (isAtTop) {
        setIsAtTop(false);
        if (!isHoveredRef.current) {
          clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => {
            if (!isHoveredRef.current) {
              setIsHidden(true);
            }
            hideTimer.current = null;
          }, 1500);
        }
      }

      if (latest < lastScrollY.current) {
        setIsHidden(false);
        if (!isHoveredRef.current) {
          clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => {
            if (!isHoveredRef.current) {
              setIsHidden(true);
            }
            hideTimer.current = null;
          }, 1500);
        }
      }
    }
    lastScrollY.current = latest;
  });

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
    setIsHidden(false);
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    if (!isAtTop) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        if (!isHoveredRef.current) {
          setIsHidden(true);
        }
        hideTimer.current = null;
      }, 1500);
    }
  };

  const isExpanded = isAtTop || isHovered;

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.header
      className="fixed top-0 w-full z-[1000] flex justify-center pointer-events-none"
      animate={{ y: isHidden && !isAtTop && !isHovered ? -80 : 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className="pointer-events-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          /* Expanded = full width with side margins, Compact = auto (shrink to fit) */
          width: isExpanded ? 'calc(100% - 2.5rem)' : 'auto',
          maxWidth: isExpanded ? '1400px' : '320px',
          marginTop: '1.25rem',
          transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(18, 18, 18, 0.88)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '100px',
            padding: '0.5rem 0.6rem 0.5rem 0.5rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {/* ===== LEFT: Avatar + Name ===== */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.12)',
                  transition: 'transform 0.2s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'rotate(-15deg) scale(1.15)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'rotate(0deg) scale(1)')}
              >
                <img
                  src="/src/assets/profile phto.jpg"
                  alt="Nayan H."
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.75, 1, 0.75],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: 'absolute',
                  bottom: -1,
                  right: -1,
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2.5px solid rgba(18,18,18,0.9)',
                  boxShadow: '0 0 10px rgba(34,197,94,0.8)',
                }}
              />
            </div>
            <span
              style={{
                fontWeight: 500,
                fontSize: '1.05rem',
                color: '#f5f5f5',
                fontFamily: "'Space Mono', monospace",
                letterSpacing: '-0.01em',
              }}
            >
              Nayan K.
            </span>
          </div>

          {/* ===== RIGHT: Nav links + Socials (expanded) OR 3-dot (compact) ===== */}
          <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
            {/* Expanded content — links + divider + socials */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                overflow: 'hidden',
                transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease',
                maxWidth: isExpanded ? '800px' : '0px',
                opacity: isExpanded ? 1 : 0,
              }}
            >
              {/* Navigation Links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="navbar-link magnetic"
                    style={{
                      fontSize: '0.95rem',
                      color: '#888',
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      transition: 'color 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#fff')}
                    onMouseLeave={(e) => (e.target.style.color = '#888')}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Vertical Divider */}
              <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />

              {/* Social Icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexShrink: 0, paddingRight: '0.3rem' }}>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill magnetic"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
                <a
                  href="mailto:hello@example.com"
                  className="social-pill magnetic email-pill"
                  aria-label="Email"
                >
                  <FaEnvelope size={16} />
                </a>
              </div>
            </div>

            {/* Compact content — 3-dot icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                transition: 'max-width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.2s ease, padding-left 0.3s ease',
                maxWidth: isExpanded ? '0px' : '75px',
                paddingLeft: isExpanded ? '0px' : '1.5rem',
                opacity: isExpanded ? 0 : 1,
              }}
            >
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                aria-label="Expand menu"
              >
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    animate={{
                      y: [0, -4, 0],
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.18,
                    }}
                    style={{
                      width: '5px',
                      height: '5px',
                      backgroundColor: '#22c55e',
                      borderRadius: '50%',
                      display: 'inline-block',
                      boxShadow: '0 0 6px rgba(34,197,94,0.6)',
                    }}
                  />
                ))}
              </button>
            </div>
          </div>
        </nav>
      </div>
    </motion.header>
  );
};

export default Navbar;
