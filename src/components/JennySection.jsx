import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * Hero section — "I'm Jenny, Product Designer"
 * Navbar intentionally omitted per request.
 *
 * INTRO SEQUENCE (plays once on mount):
 *   1. SPLASH: a full-screen orange overlay covers the section. A big
 *      "Hello!" pops in dead-center and holds for a beat — a genuine
 *      splash-screen greeting.
 *   2. REVEAL: the big "Hello!" shrinks and flies toward its real, final
 *      badge position (measured live via getBoundingClientRect, so it's
 *      exact at any breakpoint) while — at the very same moment — the
 *      orange overlay performs a circular iris-wipe that closes toward
 *      the real circle's position. Both motions are yoked to the same
 *      start time, so the greeting and the curtain move together.
 *   3. The small "Hello!" badge crossfades in at its real spot as the
 *      big one lands/fades, and the orange circle appears right as the
 *      wipe finishes closing, so the handoff reads as one continuous shape.
 *   4. The portrait pops in on top of the circle with a springy scale-in.
 *   5. The quote (left column) slides in from the left; the rating/years
 *      stat (right column) slides in from the right, at the same time.
 *   6. The headline sweeps itself into view line by line, finishing with
 *      a blinking cursor.
 *
 * NOTE on the portrait: PORTRAIT_SRC ships with a generic, license-free
 * inline SVG silhouette so the layout renders correctly out of the box.
 * Swap it for your own transparent-background PNG/WEBP cutout to get the
 * exact final look.
 */

const PORTRAIT_SRC = "/src/assets/jenny-portrait-cutout.png";

const PORTRAIT_FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 500">
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#2b2b2b"/>
  <path d="M92 210 C92 320 60 360 40 500 L300 500 C280 360 248 320 248 210 Z" fill="#1c1c1c"/>
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#3a3a3a" opacity="0.5"/>
</svg>
`);

/* ---------------------------------------------------------------------- */
/* Timing constants — tweak these to speed up / slow down the intro       */
/* ---------------------------------------------------------------------- */
const SPLASH_POP_DURATION = 0.15; // big "Hello!" popping in
const SPLASH_HOLD = 0.35; // how long it sits still on screen, full orange behind it
const OVERLAY_DURATION = 0.85; // how long the iris-wipe + "Hello!" fly-to-badge takes
const WIPE_START_DELAY = SPLASH_POP_DURATION + SPLASH_HOLD; // when the curtain + greeting both start moving
const WIPE_END = WIPE_START_DELAY + OVERLAY_DURATION; // everything downstream is rebased off this

const BADGE_DELAY = WIPE_END - 0.1; // small badge crossfades in as the big "Hello!" lands
const IMAGE_DELAY = WIPE_END + 0.05; // portrait pop
const CTA_DELAY = IMAGE_DELAY + 0.12;
const SIDE_DELAY = IMAGE_DELAY + 0.05; // quote (left) + stats (right) slide in
const HEADLINE_DELAY = SIDE_DELAY + 0.2; // typing starts after side content lands

const LINE1_TYPE_DELAY = HEADLINE_DELAY;
const LINE1_TYPE_DURATION = 0.45;
const LINE2_TYPE_DELAY = LINE1_TYPE_DELAY + LINE1_TYPE_DURATION + 0.1;
const LINE2_TYPE_DURATION = 0.5;
const CURSOR_DELAY = LINE2_TYPE_DELAY + LINE2_TYPE_DURATION + 0.05;

/* ---------------------------------------------------------------------- */
/* Variants                                                                */
/* ---------------------------------------------------------------------- */
/* One shared, smooth "expo-out" curve used across every stage so nothing
   feels like a separate, disconnected snap — everything decelerates the
   same way. */
const SMOOTH_EASE = [0.16, 1, 0.3, 1];

const OVERLAY_TRANSITION = {
  duration: OVERLAY_DURATION,
  delay: WIPE_START_DELAY,
  ease: SMOOTH_EASE,
};

/* Splash "Hello!" keyframe timeline: pop in -> hold -> fly/shrink toward
   its real badge position (dx/dy/scale supplied at render time, once
   measured). Using explicit `times` keeps the hold rock-solid regardless
   of the fly-out duration. */
const SPLASH_TOTAL = SPLASH_POP_DURATION + SPLASH_HOLD + OVERLAY_DURATION;
const SPLASH_TIMES = [
  0,
  SPLASH_POP_DURATION / SPLASH_TOTAL,
  WIPE_START_DELAY / SPLASH_TOTAL,
  1,
];

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

/* Typing effect: a single overflow-hidden wrapper per line, revealed
   left-to-right via clip-path. Reads as "typing" without splitting the
   text into dozens of individual DOM nodes (which is what was breaking
   word-wrap/layout before). */
const lineMaskVariants = (delay, duration) => ({
  hidden: { clipPath: "inset(0 100% 0 0)" },
  visible: {
    clipPath: "inset(0 0% 0 0)",
    transition: { duration, delay, ease: SMOOTH_EASE },
  },
});
const line1MaskVariants = lineMaskVariants(LINE1_TYPE_DELAY, LINE1_TYPE_DURATION);
const line2MaskVariants = lineMaskVariants(LINE2_TYPE_DELAY, LINE2_TYPE_DURATION);

const cursorVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0, 1, 0],
    transition: { delay: CURSOR_DELAY, duration: 0.9, repeat: Infinity },
  },
};

export default function JennySection() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const badgeRef = useRef(null);
  // Fallback origin (bottom-center) used only for the very first paint before
  // measurement runs; useLayoutEffect below corrects it before the browser
  // paints, so there's no visible flash.
  const [origin, setOrigin] = useState({ x: 50, y: 100 });
  // Wipe radius expressed as a clip-path circle() percentage that matches the
  // real circle's edge. circle() percentages resolve against the reference box
  // diagonal (d = sqrt(W^2 + H^2) / sqrt(2)), so we convert the circle's px
  // radius into that same percentage space to guarantee an exact size match.
  const [radiusPct, setRadiusPct] = useState(12);
  // True once the big circle has shrunk to the real circle's size — the real
  // circle then appears and the overlay fades, reading as one continuous circle
  // that started covering the screen and minimized to its original size.
  const [introDone, setIntroDone] = useState(false);
  // Fallback fly-to-badge offset/scale for the splash "Hello!", corrected
  // the same way once the real badge's position is measured.
  const [flip, setFlip] = useState({ dx: 0, dy: -240, scale: 0.3 });

  useLayoutEffect(() => {
    function measure() {
      if (!sectionRef.current || !circleRef.current) return;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const circleRect = circleRef.current.getBoundingClientRect();
      const centerX = circleRect.left + circleRect.width / 2 - sectionRect.left;
      const centerY = circleRect.top + circleRect.height / 2 - sectionRect.top;
      setOrigin({
        x: (centerX / sectionRect.width) * 100,
        y: (centerY / sectionRect.height) * 100,
      });
      const diag = Math.sqrt(sectionRect.width ** 2 + sectionRect.height ** 2) / Math.SQRT2;
      setRadiusPct(((circleRect.width / 2) / diag) * 100);

      if (badgeRef.current) {
        const badgeRect = badgeRef.current.getBoundingClientRect();
        const sectionCenterX = sectionRect.left + sectionRect.width / 2;
        const sectionCenterY = sectionRect.top + sectionRect.height / 2;
        const dx = badgeRect.left + badgeRect.width / 2 - sectionCenterX;
        const dy = badgeRect.top + badgeRect.height / 2 - sectionCenterY;
        const scale = Math.min(0.55, Math.max(0.18, badgeRect.height / 70));
        setFlip({ dx, dy, scale });
      }
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Reveal the real circle and fade the big one out at exactly WIPE_END (the
  // moment the big circle reaches its original size), so there's no callback
  // lag between the two animations.
  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), WIPE_END * 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="js-section" data-theme={theme} ref={sectionRef}>
      <style>{CSS}</style>

      {/* Big orange circle that starts covering the whole screen and minimizes to
          the real circle's size — one continuous element (the real circle stays
          hidden until the big one lands on it, then the overlay fades away). */}
      <motion.div
        className="js-intro-overlay"
        initial={{ clipPath: `circle(150% at ${origin.x}% ${origin.y}%)` }}
        animate={
          introDone
            ? {
                clipPath: `circle(${radiusPct}% at ${origin.x}% ${origin.y}%)`,
                opacity: 0,
              }
            : { clipPath: `circle(${radiusPct}% at ${origin.x}% ${origin.y}%)` }
        }
        transition={
          introDone
            ? { clipPath: { duration: 0.2, ease: "easeOut" }, opacity: { duration: 0.2, ease: "easeOut" } }
            : OVERLAY_TRANSITION
        }
        aria-hidden="true"
      />

      {/* Theme toggle */}
      <motion.div
        className="js-toggle-row"
        initial="hidden"
        animate="visible"
        variants={badgeVariants}
      >
        <button
          className="js-toggle-btn"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle light and dark theme"
        >
          <span
            className="js-toggle-knob"
            style={{ transform: isDark ? "translateX(22px)" : "translateX(0px)" }}
          />
        </button>
        <span className="js-toggle-label">{isDark ? "Dark" : "Light"}</span>
      </motion.div>

      {/* Hello badge */}
      <motion.div
        className="js-badge-row"
        initial="hidden"
        animate="visible"
        variants={badgeVariants}
      >
        <span className="js-badge">Hello!</span>
      </motion.div>

      {/* Headline — typewriter-style sweep reveal, one clean element per line */}
      <div className="js-headline-row">
        <motion.div
          className="js-headline-mask"
          initial="hidden"
          animate="visible"
          variants={line1MaskVariants}
        >
          <h1 className="js-headline">
            I&apos;m <span className="js-accent">Jenny,</span>
          </h1>
        </motion.div>
      </div>
      <div className="js-headline-row">
        <motion.div
          className="js-headline-mask"
          initial="hidden"
          animate="visible"
          variants={line2MaskVariants}
        >
          <h1 className="js-headline js-headline-second">
            Product Designer
            <motion.span
              className="js-cursor"
              initial="hidden"
              animate="visible"
              variants={cursorVariants}
            >
              |
            </motion.span>
          </h1>
        </motion.div>
      </div>

      {/* Content row: quote / portrait / stats */}
      <div className="js-content-row">
        {/* Left: quote + stat — slides in from the left */}
        <motion.div
          className="js-left-col"
          initial="hidden"
          animate="visible"
          variants={leftColVariants}
        >
          <span className="js-quote-mark">&ldquo;</span>
          <p className="js-quote-text">
            Jenny&apos;s exceptional product designer ensure our website&apos;s
            success. Highly recommended!
          </p>

          <p className="js-stat-number">450+</p>
          <p className="js-stat-label">Client Server</p>
        </motion.div>

        {/* Center: portrait + circle, cropped at the section's bottom edge */}
        <div className="js-center-col">
          <div className="js-photo-stage">
            <div className="js-circle-clip">
              <div className="js-circle-pos" ref={circleRef}>
                <div
                  className="js-half-circle"
                  style={{ opacity: introDone ? 1 : 0 }}
                />
              </div>
            </div>

            <div className="js-portrait-pos">
              <motion.img
                src={PORTRAIT_SRC}
                alt="Jenny, product designer"
                className="js-portrait"
                initial="hidden"
                animate="visible"
                variants={portraitVariants}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = PORTRAIT_FALLBACK;
                }}
              />
            </div>

            {/* Curved arrow, pointing at the Portfolio button, pencil-sketch style */}
            <motion.svg
              className="js-arrow"
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
            <div className="js-cta-pos">
              <motion.div
                className="js-cta-row"
                initial="hidden"
                animate="visible"
                variants={ctaVariants}
              >
                <button className="js-portfolio-btn">
                  Portfolio <span style={{ fontSize: 16 }}>↗</span>
                </button>
                <button className="js-hire-btn">Hire Me</button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right: rating + experience — slides in from the right */}
        <motion.div
          className="js-right-col"
          initial="hidden"
          animate="visible"
          variants={rightColVariants}
        >
          <div className="js-stars">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="js-star">
                {star}
              </span>
            ))}
          </div>
          <p className="js-years">10 Years</p>
          <p className="js-experts">Experts</p>
          <div className="js-underline" />
        </motion.div>
      </div>
    </section>
  );
}

const CSS = `
.js-section {
  --orange: #FF4E17;
  --bg: #ffffff;
  --text-primary: #111111;
  --text-secondary: #1a1a1a;
  --text-muted: #333333;
  --badge-border: #d8d3c8;
  --badge-text: #555555;
  --arch-border: #FFC9A8;
  --button-border: #111111;
  --hire-bg: #ffffff;
  --hire-text: #111111;
  --underline-color: #c9a227;
  --toggle-track: #eeeeee;

  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: clamp(24px, 5dvh, 48px) clamp(16px, 4vw, 40px) 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-primary);
  background: var(--bg);
  overflow: hidden;
  box-sizing: border-box;
  transition: background 0.3s ease, color 0.3s ease;
}
.js-section[data-theme="dark"] {
  --bg: #0A0A0A;
  --text-primary: #ffffff;
  --text-secondary: #dddddd;
  --text-muted: #bbbbbb;
  --badge-border: #444444;
  --badge-text: #cccccc;
  --arch-border: #FFB08A;
  --button-border: #ffffff;
  --hire-bg: transparent;
  --hire-text: #ffffff;
  --underline-color: var(--orange);
  --toggle-track: #222222;
}
.js-section *, .js-section *::before, .js-section *::after { box-sizing: border-box; }

.js-intro-overlay {
  position: absolute;
  inset: 0;
  background: var(--orange);
  z-index: 50;
  pointer-events: none;
}

.js-toggle-row { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-bottom: 16px; position: relative; z-index: 5; }
.js-toggle-btn { width: 46px; height: 26px; border-radius: 999px; border: 1px solid var(--badge-border); background: var(--toggle-track); padding: 2px; cursor: pointer; display: flex; align-items: center; }
.js-toggle-knob { width: 20px; height: 20px; border-radius: 50%; background: var(--orange); transition: transform 0.2s ease; display: block; }
.js-toggle-label { font-size: 13px; color: var(--badge-text); min-width: 34px; }

.js-badge-row { display: flex; justify-content: center; margin-bottom: 24px; position: relative; z-index: 5; }
.js-badge { border: 1px solid var(--badge-border); border-radius: 999px; padding: 8px 24px; font-size: 15px; color: var(--badge-text); }

.js-headline-row { display: flex; justify-content: center; position: relative; z-index: 5; }
.js-headline-mask { display: inline-block; overflow: hidden; }
.js-headline { text-align: left; font-weight: 800; font-size: clamp(34px, 6vw, 78px); line-height: 1.05; margin: 0; letter-spacing: -1px; color: var(--text-primary); white-space: nowrap; }
.js-headline-second { margin-top: -8px; }
.js-accent { color: var(--orange); }
.js-cursor { color: var(--orange); font-weight: 400; margin-left: 4px; }

.js-content-row { display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: stretch; flex: 1; min-height: 0; margin-top: 40px; gap: 24px; position: relative; z-index: 5; }

.js-left-col { display: flex; flex-direction: column; justify-content: center; padding-top: 0; padding-right: 24px; max-width: 340px; }
.js-quote-mark { font-size: 40px; font-weight: 800; line-height: 1; display: block; margin-bottom: 8px; color: var(--orange); }
.js-quote-text { font-size: 17px; line-height: 1.5; color: var(--text-secondary); margin: 0 0 40px; }
.js-stat-number { font-size: 22px; font-weight: 800; margin: 0; color: var(--text-primary); }
.js-section[data-theme="dark"] .js-stat-number { color: var(--orange); }
.js-stat-label { font-size: 16px; color: var(--text-muted); margin: 2px 0 0; }

.js-center-col { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; min-height: 0; }

.js-photo-stage {
  --circle-size: 400px;
  --clip-height: 300px;
  --circle-offset: -100px;
  --portrait-w: 340px;
  --stage-height: 520px;
  --arrow-left: -6px;
  --arrow-bottom: 70px;
  --cta-bottom: 34px;
  position: relative;
  width: 420px;
  max-width: 100%;
  height: var(--stage-height);
  margin: 0 auto;
}
.js-circle-clip { position: absolute; bottom: 0; left: 0; right: 0; height: var(--clip-height); overflow: hidden; }
.js-circle-pos {
  position: absolute;
  bottom: var(--circle-offset);
  left: 50%;
  transform: translateX(-50%);
  width: var(--circle-size);
  height: var(--circle-size);
}
.js-half-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 42%, var(--orange) 0%, #7A2100 65%, #1A0800 100%);
  border: 6px solid var(--arch-border);
  transition: opacity 0.25s ease;
}
.js-portrait-pos {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: var(--portrait-w);
  max-width: 92%;
  z-index: 2;
}
.js-portrait {
  display: block;
  width: 100%;
  height: auto;
  max-height: var(--stage-height);
  object-fit: contain;
  object-position: bottom;
}
.js-arrow { position: absolute; left: var(--arrow-left); bottom: var(--arrow-bottom); z-index: 3; }
.js-cta-pos {
  position: absolute;
  bottom: var(--cta-bottom);
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}
.js-cta-row {
  display: flex;
  gap: 10px;
  flex-wrap: nowrap;
  justify-content: center;
  white-space: nowrap;
}
.js-portfolio-btn { display: flex; align-items: center; gap: 6px; padding: 14px 26px; border-radius: 999px; border: 1.5px solid var(--button-border); background: var(--orange); color: #fff; font-size: 16px; font-weight: 500; cursor: pointer; }
.js-hire-btn { padding: 14px 30px; border-radius: 999px; border: 1.5px solid var(--button-border); background: var(--hire-bg); color: var(--hire-text); font-size: 16px; font-weight: 500; cursor: pointer; }

.js-right-col { display: flex; flex-direction: column; justify-content: center; padding-top: 0; padding-left: 24px; text-align: right; }
.js-stars { display: flex; justify-content: flex-end; gap: 6px; margin-bottom: 16px; }
.js-star { color: var(--orange); font-size: 26px; }
.js-years { font-family: 'Courier New', monospace; font-size: 28px; letter-spacing: 4px; margin: 0; color: var(--text-primary); }
.js-experts { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 34px; margin: 4px 0 8px; color: var(--text-primary); }
.js-underline { height: 3px; background: var(--underline-color); width: 100%; margin-left: auto; }

/* Tablet: stack into a single column, photo first */
@media (max-width: 900px) {
  .js-section { padding: 20px 24px 0; }
  .js-content-row { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 36px; margin-top: 32px; }
  .js-left-col { order: 2; padding-top: 0; max-width: 480px; padding-right: 0; }
  .js-center-col { order: 1; }
  .js-right-col { order: 3; padding-top: 0; padding-left: 0; text-align: center; }
  .js-stars { justify-content: center; }
  .js-underline { margin-left: auto; margin-right: auto; }
  .js-quote-text { margin-bottom: 24px; }

  .js-photo-stage {
    --circle-size: 340px;
    --clip-height: 255px;
    --circle-offset: -85px;
    --portrait-w: 290px;
    --stage-height: 440px;
    --arrow-left: -4px;
    --arrow-bottom: 56px;
    --cta-bottom: 26px;
    width: 380px;
  }
}

/* Mobile: tighter type, smaller circle/portrait, wrapping buttons */
@media (max-width: 600px) {
  .js-section { padding: 16px 16px 0; }
  .js-badge { padding: 6px 18px; font-size: 14px; }
  .js-headline { font-size: clamp(24px, 8.5vw, 78px); }
  .js-content-row { gap: 28px; margin-top: 24px; }
  .js-quote-text { font-size: 16px; }
  .js-years { font-size: 22px; letter-spacing: 2px; }
  .js-experts { font-size: 26px; }

  .js-photo-stage {
    --circle-size: 260px;
    --clip-height: 195px;
    --circle-offset: -65px;
    --portrait-w: 220px;
    --stage-height: 340px;
    --arrow-left: -2px;
    --arrow-bottom: 40px;
    --cta-bottom: 18px;
    width: 280px;
  }
  .js-portfolio-btn, .js-hire-btn { padding: 10px 14px; font-size: 13px; gap: 4px; }
  .js-cta-row { gap: 8px; }
  .js-arrow { display: none; }
}
`;