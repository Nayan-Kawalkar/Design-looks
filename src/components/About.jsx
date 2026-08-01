import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const audienceData = [
  {
    id: 'anyone',
    label: 'For anyone',
    accentColor: '#22c55e',
    content: (
      <>
        I'm a <span className="about-highlight">&#123;creative_technologist&#125;</span> building
        modern web apps &amp; interactive experiences; I design with intent and code with{' '}
        <span className="about-link">(precision)</span> from scratch.
      </>
    ),
  },
  {
    id: 'recruiters',
    label: 'Recruiters',
    accentColor: '#3b82f6',
    content: (
      <>
        I have <span className="about-highlight">&#123;4+_years&#125;</span> of experience shipping
        production web apps; fast learner, outcome-driven, and fluent in{' '}
        <span className="about-link">React</span>,{' '}
        <span className="about-link">TypeScript</span> &amp; modern UI systems.
      </>
    ),
  },
  {
    id: 'designers',
    label: 'Product Designers',
    accentColor: '#a855f7',
    content: (
      <>
        I bridge the gap between <span className="about-link">(design.intent)</span> &amp;&amp;{' '}
        <span className="about-link">(engineering.reality)</span>; micro-animations,
        pixel-perfection, and fluid physics are second nature.
      </>
    ),
  },
  {
    id: 'managers',
    label: 'Product Managers',
    accentColor: '#f59e0b',
    content: (
      <>
        I ship <span className="about-highlight">&#123;high_impact&#125;</span> features on
        schedule without technical debt; clear communicator, system-thinker, and focused on user
        metric velocity.
      </>
    ),
  },
  {
    id: 'engineers',
    label: 'Engineers',
    accentColor: '#06b6d4',
    content: (
      <>
        I'm <span className="about-highlight">&#123;highly_technical&#125;</span> and while (I'm
        &ne; traditional engineer) I know my way /around &amp; can speak{' '}
        <span className="about-highlight">"fluently"</span> with you; I built{' '}
        <a href="#hero" className="about-link">(this.site)</a> from scratch +{' '}
        <a href="#projects" className="about-link">(this.one)</a> &amp;&amp;{' '}
        <a href="#playground" className="about-link">(this.too)</a>.
      </>
    ),
  },
];

/* Typing cursor blink component */
const TypingCursor = ({ color }) => (
  <motion.span
    animate={{ opacity: [1, 0] }}
    transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
    style={{
      display: 'inline-block',
      width: '3px',
      height: '1.6em',
      backgroundColor: color,
      marginLeft: '6px',
      verticalAlign: 'text-bottom',
      borderRadius: '2px',
      boxShadow: `0 0 8px ${color}66`,
    }}
  />
);

/* Floating code snippet decoration */
const FloatingTag = ({ text, top, left, delay = 0 }) => (
  <motion.span
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 0.12, scale: 1 }}
    transition={{ delay, duration: 1, ease: 'easeOut' }}
    style={{
      position: 'absolute',
      top,
      left,
      fontSize: '0.72rem',
      fontFamily: "'Space Mono', monospace",
      color: '#ffffff',
      pointerEvents: 'none',
      userSelect: 'none',
      letterSpacing: '0.05em',
      whiteSpace: 'nowrap',
    }}
  >
    {text}
  </motion.span>
);

const About = () => {
  const [activeTab, setActiveTab] = useState('engineers');
  const [typedPrefix, setTypedPrefix] = useState('');
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const currentAudience = audienceData.find((item) => item.id === activeTab) || audienceData[4];

  // Card tilt effect based on mouse position
  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Typing effect for the "// speaking to:" prefix
  useEffect(() => {
    const targetText = `// speaking to: ${currentAudience.label}`;
    let charIndex = 0;
    setTypedPrefix('');

    const interval = setInterval(() => {
      if (charIndex <= targetText.length) {
        setTypedPrefix(targetText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section id="about" style={{ paddingTop: '6.5rem', paddingBottom: '8.5rem', overflow: 'hidden' }}>
      {/* Inject scoped styles for highlights and links */}
      <style>{`
        .about-highlight {
          color: ${currentAudience.accentColor};
          font-weight: 500;
          transition: color 0.3s ease;
        }
        .about-link {
          color: #ffffff;
          text-decoration: underline;
          text-decoration-color: ${currentAudience.accentColor}55;
          text-underline-offset: 6px;
          text-decoration-thickness: 2px;
          transition: text-decoration-color 0.3s ease, color 0.2s ease;
          cursor: pointer;
        }
        .about-link:hover {
          text-decoration-color: ${currentAudience.accentColor};
          color: ${currentAudience.accentColor};
        }
        .about-grid-layout {
          display: grid;
          grid-template-columns: minmax(220px, 280px) 1fr;
          gap: 3.5rem;
          align-items: start;
          border-top: 1px solid var(--border-color);
          padding-top: 2rem;

        }
        @media (max-width: 900px) {
          .about-grid-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 768px) {
          .about-grid-layout {
            grid-template-columns: 1fr;
            gap: 2rem;
            text-align: center;
          }
        }
      `}</style>

      <div className="container about-grid-layout" style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem clamp(1rem, 4vw, 1.5rem)' }}>
        {/* ===== LEFT COLUMN ===== */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ZoomBlurReveal>
            <h2
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 500,
                color: '#ffffff',
                marginBottom: '2.5rem',
                letterSpacing: '-0.02em',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              <span className="text-accent mono" style={{ fontSize: '1rem', display: 'block', marginBottom: '0.5rem' }}>02 //</span>

              Intro
            </h2>
          </ZoomBlurReveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
            {audienceData.map((item, index) => {
              const isActive = item.id === activeTab;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    color: isActive ? '#ffffff' : '#52525b',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '1.08rem',
                    fontFamily: "'Inter', sans-serif",
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.65rem 0.85rem',
                    borderRadius: '10px',
                    transition: 'all 0.25s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#a1a1aa';
                    if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#52525b';
                    if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {/* Animated dash line */}
                  <motion.span
                    animate={{
                      width: isActive ? 24 : 10,
                      backgroundColor: isActive ? item.accentColor : '#3f3f46',
                    }}
                    transition={{ duration: 0.3 }}
                    style={{
                      display: 'inline-block',
                      height: '2px',
                      borderRadius: '2px',
                      flexShrink: 0,
                    }}
                  />
                  <span>{item.label}</span>

                  {/* Active glow dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeDot"
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: item.accentColor,
                        boxShadow: `0 0 10px ${item.accentColor}`,
                        marginLeft: 'auto',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ===== RIGHT COLUMN: 3D-TILT WRAPPER (mouse tilt) + FULL CARD FLIP (tab switch) ===== */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, x: 160 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{
            // This wrapper ONLY handles the continuous mouse-tilt.
            // The actual card (background/border/shadow/content) lives in the
            // AnimatePresence child below, so THAT is what flips on tab change.
            rotateX,
            rotateY,
            perspective: 1400,
            transformStyle: 'preserve-3d',
            position: 'relative',
            minHeight: '480px',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          {/* The whole card — background, border, shadow, decorations, text — flips as one piece */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentAudience.id}
              initial={{ opacity: 0, rotateY: 110, scale: 0.92 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -110, scale: 0.92 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                minHeight: '480px',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                background: '#111114',
                backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1.2px, transparent 1.2px)',
                backgroundSize: '22px 22px',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: `0 30px 60px rgba(0,0,0,0.5), inset 0 0 80px rgba(${currentAudience.accentColor === '#22c55e' ? '34,197,94' :
                  currentAudience.accentColor === '#3b82f6' ? '59,130,246' :
                    currentAudience.accentColor === '#a855f7' ? '168,85,247' :
                      currentAudience.accentColor === '#f59e0b' ? '245,158,11' :
                        '6,182,212'
                  },0.03)`,
                boxSizing: 'border-box',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4.5rem 3.8rem',
              }}
            >
              {/* Decorative floating code snippets */}
              <FloatingTag text="const persona = {" top="18px" left="22px" delay={0.15} />
              <FloatingTag text="}" top="90%" left="92%" delay={0.3} />
              <FloatingTag text="// v2.0" top="92%" left="22px" delay={0.4} />

              {/* Top-right dog-ear corner fold */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '45px',
                  height: '45px',
                  background: `linear-gradient(225deg, #09090b 50%, ${currentAudience.accentColor}22 50%)`,
                  borderBottomLeftRadius: '12px',
                  pointerEvents: 'none',
                }}
              />

              {/* Accent glow orb (subtle animated gradient) */}
              <motion.div
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -20, 15, 0],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${currentAudience.accentColor}15 0%, transparent 70%)`,
                  pointerEvents: 'none',
                  filter: 'blur(35px)',
                }}
              />

              {/* Typed prefix line: "// speaking to: Engineers" */}
              <div
                style={{
                  marginBottom: '2.5rem',
                  fontSize: '0.88rem',
                  fontFamily: "'Space Mono', monospace",
                  color: currentAudience.accentColor,
                  letterSpacing: '0.04em',
                  opacity: 0.7,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  zIndex: 5,
                }}
              >
                <span>{typedPrefix}</span>
                <TypingCursor color={currentAudience.accentColor} />
              </div>

              {/* Statement content */}
              <div
                style={{
                  fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                  lineHeight: 1.75,
                  color: '#52525b',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 400,
                  letterSpacing: '-0.015em',
                  position: 'relative',
                  zIndex: 5,
                }}
              >
                {currentAudience.content}
              </div>

              {/* Bottom-right line count decoration */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '18px',
                  right: '24px',
                  fontSize: '0.72rem',
                  fontFamily: "'Space Mono', monospace",
                  color: '#ffffff',
                  letterSpacing: '0.06em',
                  opacity: 0.15,
                }}
              >
                Ln 42, Col 8
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default About;