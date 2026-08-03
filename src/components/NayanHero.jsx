import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { motion } from 'framer-motion';

const PORTRAIT_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 500">
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#2b2b2b"/>
  <path d="M92 210 C92 320 60 360 40 500 L300 500 C280 360 248 320 248 210 Z" fill="#1c1c1c"/>
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#3a3a3a" opacity="0.5"/>
</svg>
`);

/* ---------------------------------------------------------------------- */
/* Intro timing — big orange circle covers the screen, shrinks to the real */
/* circle's size; everything else cascades in after it lands.              */
/* ---------------------------------------------------------------------- */
const SPLASH_POP_DURATION = 0.15;
const SPLASH_HOLD = 0.35;
const OVERLAY_DURATION = 0.85;
const WIPE_START_DELAY = SPLASH_POP_DURATION + SPLASH_HOLD;
const WIPE_END = WIPE_START_DELAY + OVERLAY_DURATION;

const BADGE_DELAY = WIPE_END - 0.1;
const IMAGE_DELAY = WIPE_END + 0.05;
const CTA_DELAY = IMAGE_DELAY + 0.12;
const SIDE_DELAY = IMAGE_DELAY + 0.05;
const HEADLINE_DELAY = SIDE_DELAY + 0.2;

const LINE1_TYPE_DELAY = HEADLINE_DELAY;
const LINE1_TYPE_DURATION = 0.45;

/* Cycling typewriter words for the second headline line — starts at the same
   moment as the "I'm Nayan," reveal and types at the same per-character speed. */
const TYPE_WORDS = ["System Designer", "Product Designer", "Fullstack Developer"];
const LINE1_CHARS = 10; // characters in "I'm Nayan,"
const TYPE_MS = Math.round((LINE1_TYPE_DURATION * 1000) / LINE1_CHARS); // match line 1 speed
const DELETE_MS = 45; // ms per character while backspacing
const HOLD_MS = 1700; // how long a finished word stays before backspacing

const SMOOTH_EASE = [0.16, 1, 0.3, 1];

const fadeInAt = (delay, extra = {}) => ({
  hidden: { opacity: 0, ...extra.hiddenExtra },
  visible: {
    opacity: 1,
    ...extra.visibleExtra,
    transition: { duration: extra.duration ?? 0.5, delay, ease: SMOOTH_EASE },
  },
});

const badgeVariants = fadeInAt(BADGE_DELAY, {
  hiddenExtra: { y: -10 },
  visibleExtra: { y: 0 },
});

const portraitVariants = {
  hidden: { opacity: 0, scale: 0.6, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 190, damping: 24, delay: IMAGE_DELAY },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 230, damping: 26, delay: CTA_DELAY },
  },
};

const leftColVariants = {
  hidden: { opacity: 0, x: -70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: SIDE_DELAY, ease: SMOOTH_EASE },
  },
};

const rightColVariants = {
  hidden: { opacity: 0, x: 70 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, delay: SIDE_DELAY, ease: SMOOTH_EASE },
  },
};

const arrowVariants = fadeInAt(CTA_DELAY + 0.15);

const lineMaskVariants = (delay, duration) => ({
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration, delay, ease: SMOOTH_EASE },
  },
});
const line1MaskVariants = lineMaskVariants(LINE1_TYPE_DELAY, LINE1_TYPE_DURATION);

export default function NayanHero() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  // The intro overlay is a huge gradient circle centered on the real circle;
  // it scales from full-screen (scale 1) down to the circle's own size.
  const [overlayBox, setOverlayBox] = useState({ left: 0, top: 0, size: 2000, scale: 0.1 });
  const [introDone, setIntroDone] = useState(false);

  // Cycling typewriter state for the second headline line
  const [typingStarted, setTypingStarted] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);

  useLayoutEffect(() => {
    function measure() {
      if (!sectionRef.current || !circleRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const circleRect = circleRef.current.getBoundingClientRect();
      const size = Math.ceil(2 * Math.sqrt(sectionRect.width ** 2 + sectionRect.height ** 2));
      const cx = circleRect.left - sectionRect.left + circleRect.width / 2;
      const cy = circleRect.top - sectionRect.top + circleRect.height / 2;
      setOverlayBox({
        left: cx - size / 2,
        top: cy - size / 2,
        size,
        scale: circleRect.width / size,
      });
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), WIPE_END * 1000);
    return () => clearTimeout(timer);
  }, []);

  // Start the cycling typewriter at the same moment the first headline reveals
  useEffect(() => {
    const timer = setTimeout(() => setTypingStarted(true), LINE1_TYPE_DELAY * 1000);
    return () => clearTimeout(timer);
  }, []);

  // Type / backspace the current word, then cycle to the next one forever
  useEffect(() => {
    if (!typingStarted) return;
    const current = TYPE_WORDS[wordIndex % TYPE_WORDS.length];
    let timer;
    if (!deleting && typed === current) {
      timer = setTimeout(() => setDeleting(true), HOLD_MS);
    } else if (deleting && typed === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % TYPE_WORDS.length);
    } else {
      timer = setTimeout(() => {
        setTyped(deleting ? current.slice(0, typed.length - 1) : current.slice(0, typed.length + 1));
      }, deleting ? DELETE_MS : TYPE_MS);
    }
    return () => clearTimeout(timer);
  }, [typed, deleting, wordIndex, typingStarted]);

  return (
    <section className="jh-section" data-theme={theme} ref={sectionRef}>
      <style>{CSS}</style>

      {/* Big gradient circle that starts covering the whole screen and scales
          down to the real circle's size — the gradient is proportional, so it
          lands pixel-matched on the real circle. */}
      <motion.div
        className="jh-intro-overlay"
        initial={{ scale: 1, opacity: 1 }}
        animate={
          introDone
            ? { scale: overlayBox.scale, opacity: 0 }
            : { scale: overlayBox.scale, opacity: 1 }
        }
        transition={
          introDone
            ? { scale: { duration: 0.2, ease: "easeOut" }, opacity: { duration: 0.2, ease: "easeOut" } }
            : { scale: { duration: OVERLAY_DURATION, delay: WIPE_START_DELAY, ease: SMOOTH_EASE } }
        }
        style={{
          left: overlayBox.left,
          top: overlayBox.top,
          width: overlayBox.size,
          height: overlayBox.size,
        }}
        aria-hidden="true"
      />

      <div className="jh-frame">
        {/* Hello badge */}
        <motion.div
          className="jh-badge-row"
          initial="hidden"
          animate="visible"
          variants={badgeVariants}
        >
          <span className="jh-badge">Hello!</span>
        </motion.div>

        {/* Headline — typewriter-style sweep reveal, one clean element per line */}
        <div className="jh-headline-row">
          <motion.div
            className="jh-headline-mask"
            initial="hidden"
            animate="visible"
            variants={line1MaskVariants}
          >
            <h1 className="jh-headline">
              I&apos;m <span className="jh-accent">Nayan,</span>
            </h1>
          </motion.div>
        </div>
        <div className="jh-headline-row">
          <div className="jh-headline-mask">
            <h1 className="jh-headline jh-headline-second">
              {typed}
              {typingStarted && (
                <motion.span
                  className="jh-cursor"
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                >
                  |
                </motion.span>
              )}
            </h1>
          </div>
        </div>

        {/* Content row: quote / portrait / stats */}
        <div className="jh-content-row">
          {/* Left: quote + stat — slides in from the left */}
          <motion.div
            className="jh-left-col"
            initial="hidden"
            animate="visible"
            variants={leftColVariants}
          >
            <span className="jh-quote-mark">&ldquo;</span>
            <p className="jh-quote-text">
              Nayan built our portfolio&apos;s AI assistant end-to-end &mdash; RAG
              pipeline, chat UI, everything. Exceptional work, highly recommended!
            </p>

            <p className="jh-stat-number">10+</p>
            <p className="jh-stat-label">Projects Shipped</p>
          </motion.div>

          {/* Center: portrait + circle, cropped at the section's bottom edge */}
          <div className="jh-center-col">
            {/* Theme toggle, just above the circle, aligned right */}
            <motion.div
              className="jh-toggle-row"
              initial="hidden"
              animate="visible"
              variants={badgeVariants}
            >
              <button
                className="jh-toggle-btn"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                aria-label="Toggle light and dark theme"
              >
                <span
                  className="jh-toggle-knob"
                  style={{ transform: isDark ? "translateX(22px)" : "translateX(0px)" }}
                />
              </button>
              <span className="jh-toggle-label">{isDark ? "Dark" : "Light"}</span>
            </motion.div>

            <div className="jh-photo-stage">
              <div className="jh-circle-clip">
                <div
                  className="jh-half-circle"
                  ref={circleRef}
                  style={{ opacity: introDone ? 1 : 0 }}
                />
              </div>

              <div className="jh-portrait-pos">
                <motion.img
                  src="images/nobg.png"
                  alt="Nayan, product designer"
                  className="jh-portrait"
                  initial="hidden"
                  animate="visible"
                  variants={portraitVariants}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* Curved arrow, pointing at the Portfolio button, pencil-sketch style */}
              <motion.svg
                className="jh-arrow"
                width="110"
                height="90"
                viewBox="0 0 110 90"
                fill="none"
                initial="hidden"
                animate="visible"
                variants={arrowVariants}
              >
                <defs>
                  <filter id="pencilTexture" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.9"
                      numOctaves="2"
                      seed="7"
                      result="noise"
                    />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" />
                  </filter>
                </defs>
                <path
                  d="M8 8C8 55 30 78 75 80"
                  stroke="#1a1a1a"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  filter="url(#pencilTexture)"
                />
                <path
                  d="M9 9C9 56 31 79 76 81"
                  stroke="#1a1a1a"
                  strokeWidth="1"
                  strokeLinecap="round"
                  opacity="0.5"
                  filter="url(#pencilTexture)"
                />
                <path
                  d="M60 74L77 82L70 63"
                  stroke="#1a1a1a"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#pencilTexture)"
                />
              </motion.svg>

              {/* CTA buttons, overlapping the orange circle near the bottom */}
              <div className="jh-cta-pos">
                <motion.div
                  className="jh-cta-row"
                  initial="hidden"
                  animate="visible"
                  variants={ctaVariants}
                >
                  <button className="jh-portfolio-btn">
                    Portfolio <span style={{ fontSize: 16 }}>↗</span>
                  </button>
                  <button className="jh-hire-btn">Hire Me</button>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Right: rating + experience — slides in from the right */}
          <motion.div
            className="jh-right-col"
            initial="hidden"
            animate="visible"
            variants={rightColVariants}
          >
            <div className="jh-stars">
              {"★★★★★".split("").map((star, i) => (
                <span key={i} className="jh-star">
                  {star}
                </span>
              ))}
            </div>
            <p className="jh-years">4+ Years</p>
            <p className="jh-experts">Experience</p>
            <div className="jh-underline" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const CSS = `
.jh-intro-overlay {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 42%, var(--orange) 0%, #7A2100 65%, #1A0800 100%);
  z-index: 50;
  pointer-events: none;
  will-change: transform, opacity;
}

.jh-half-circle {
  transition: opacity 0.25s ease;
}

.jh-headline-row { display: flex; justify-content: center; position: relative; z-index: 5; }
.jh-headline-mask { display: inline-block; overflow: hidden; }
.jh-headline { white-space: nowrap; }
.jh-cursor { color: var(--orange); font-weight: 400; margin-left: 4px; }

.jh-portrait-pos {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: clamp(420px, 74dvh, 705px);
  max-width: 92%;
  z-index: 2;
}
.jh-portrait {
  position: static;
  transform: none;
  left: auto;
  bottom: auto;
  display: block;
  width: 100%;
  max-width: 100%;
  max-height: var(--portrait-h);
  object-fit: contain;
  object-position: bottom;
}

.jh-cta-pos {
  position: absolute;
  bottom: var(--cta-bottom);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}
.jh-cta-row {
  position: static;
  transform: none;
  left: auto;
  bottom: auto;
}
`;
