import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const hideTimer = useRef(null);
  const isHoveredRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (isMobile) {
      if (mobileMenuOpen) return;
    }
    if (latest <= 50) {
      setIsAtTop(true);
      setIsHidden(false);
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    } else {
      if (isAtTop) {
        setIsAtTop(false);
        if (!isHoveredRef.current && !mobileMenuOpen) {
          clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => {
            if (!isHoveredRef.current && !mobileMenuOpen) {
              setIsHidden(true);
            }
            hideTimer.current = null;
          }, 1500);
        }
      }

      if (latest < lastScrollY.current) {
        setIsHidden(false);
        if (!isHoveredRef.current && !mobileMenuOpen) {
          clearTimeout(hideTimer.current);
          hideTimer.current = setTimeout(() => {
            if (!isHoveredRef.current && !mobileMenuOpen) {
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
    if (!isAtTop && !mobileMenuOpen) {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      hideTimer.current = setTimeout(() => {
        if (!isHoveredRef.current && !mobileMenuOpen) {
          setIsHidden(true);
        }
        hideTimer.current = null;
      }, 1500);
    }
  };

  const isExpanded = (isAtTop || isHovered) && !isMobile;

  const handleNavClick = useCallback((e, sectionId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <motion.header
      className="fixed top-0 w-full z-[1000] flex justify-center pointer-events-none"
      animate={{ y: isHidden && !isAtTop && !isHovered && !mobileMenuOpen ? -90 : 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div
        className="pointer-events-auto flex flex-col items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: isMobile ? 'calc(100% - 1.5rem)' : (isExpanded ? 'calc(100% - 2.5rem)' : 'auto'),
          maxWidth: isMobile ? '500px' : (isExpanded ? '1400px' : '320px'),
          marginTop: '1.25rem',
          transition: 'width 0.35s cubic-bezier(0.4, 0, 0.2, 1), max-width 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Main Floating Pill Bar */}
        <nav
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(22, 22, 24, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '100px',
            padding: '0.45rem 1.1rem 0.45rem 0.45rem',
            boxShadow: '0 10px 32px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
            boxSizing: 'border-box',
          }}
        >
          {/* LEFT: Avatar + Status Dot + Name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexShrink: 0 }}>
            <div style={{ position: 'relative', width: 42, height: 42 }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <img
                  src="/images/2222.jpeg"
                  alt="Nayan K."
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              {/* Online Green Status Dot */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 11,
                  height: 11,
                  borderRadius: '50%',
                  background: '#22c55e',
                  border: '2.5px solid rgba(18,18,18,0.95)',
                  boxShadow: '0 0 8px rgba(34,197,94,0.9)',
                }}
              />
            </div>
            <span
              style={{
                fontWeight: 500,
                fontSize: '1.05rem',
                color: '#ffffff',
                fontFamily: "'Inter', sans-serif",
                letterSpacing: '-0.01em',
              }}
            >
              Nayan K.
            </span>
          </div>

          {/* RIGHT SIDE: DESKTOP OR MOBILE */}
          {!isMobile ? (
            /* ===== DESKTOP NAVIGATION ===== */
            <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
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

                <div style={{ width: 1, height: 24, background: 'rgba(255,255,255,0.12)', flexShrink: 0 }} />

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
                    href="mailto:kawalkarnayan07@gmail.com"
                    className="social-pill magnetic email-pill"
                    aria-label="Email"
                  >
                    <FaEnvelope size={16} />
                  </a>
                </div>
              </div>

              {/* Compact 3 Dots */}
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
          ) : (
            /* ===== MOBILE HAMBURGER BUTTON ===== */
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.4rem 0.6rem',
                cursor: 'pointer',
                fontSize: '1.4rem',
              }}
            >
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </button>
          )}
        </nav>

        {/* MOBILE MENU DROPDOWN DRAWER */}
        <AnimatePresence>
          {isMobile && mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                marginTop: '0.6rem',
                background: 'rgba(22, 22, 24, 0.95)',
                backdropFilter: 'blur(25px)',
                WebkitBackdropFilter: 'blur(25px)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '24px',
                padding: '1.25rem 1.5rem',
                boxShadow: '0 15px 40px rgba(0,0,0,0.6)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxSizing: 'border-box',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    style={{
                      fontSize: '1.05rem',
                      fontWeight: 500,
                      color: '#e4e4e7',
                      textDecoration: 'none',
                      fontFamily: "'Inter', sans-serif",
                      padding: '0.4rem 0',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <span>{item.label}</span>
                    <span style={{ fontSize: '0.85rem', color: '#71717a' }}>↗</span>
                  </a>
                ))}
              </div>

              {/* Mobile Menu Social Links */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#71717a', fontFamily: "'Space Mono', monospace" }}>CONNECT</span>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-pill"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin size={15} />
                  </a>
                  <a
                    href="mailto:kawalkarnayan07@gmail.com"
                    className="social-pill email-pill"
                    aria-label="Email"
                  >
                    <FaEnvelope size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
