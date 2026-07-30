import React, { useState } from "react";

/**
 * Hero section — "I'm Nayan, Product Designer"
 * Navbar intentionally omitted per request.
 *
 * - Light / dark (black + orange) theme toggle, driven by a `data-theme`
 *   attribute + CSS variables, so no per-node inline color logic is needed.
 * - Fully responsive: 3-column grid on desktop, single stacked column on
 *   tablet/mobile, with the circle/portrait/buttons scaling at each
 *   breakpoint via CSS custom properties.
 *
 * NOTE on the portrait: PORTRAIT_SRC ships with a generic, license-free
 * inline SVG silhouette so the layout renders correctly out of the box.
 * Swap it for your own transparent-background PNG/WEBP cutout to get the
 * exact final look.
 */

const PORTRAIT_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 500">
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#2b2b2b"/>
  <path d="M92 210 C92 320 60 360 40 500 L300 500 C280 360 248 320 248 210 Z" fill="#1c1c1c"/>
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#3a3a3a" opacity="0.5"/>
</svg>
`);

type Theme = "light" | "dark";

export default function NayanHero() {
  const [theme, setTheme] = useState<Theme>("light");
  const isDark = theme === "dark";

  return (
    <section className="jh-section " data-theme={theme}>
      <style>{CSS}</style>

      {/* Theme toggle */}
      <div className="jh-toggle-row container">
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
      </div>

      {/* Hello badge */}
      <div className="jh-badge-row">
        <span className="jh-badge">Hello!</span>
      </div>

      {/* Headline */}
      <h1 className="jh-headline">
        I&apos;m <span className="jh-accent">Nayan,</span>
      </h1>
      <h1 className="jh-headline jh-headline-second">Product Designer</h1>

      {/* Content row: quote / portrait / stats */}
      <div className="jh-content-row">
        {/* Left: quote + stat */}
        <div className="jh-left-col">
          <span className="jh-quote-mark">&ldquo;</span>
          <p className="jh-quote-text">
            Nayan&apos;s exceptional product designer ensure our website&apos;s
            success. Highly recommended!
          </p>

          <p className="jh-stat-number">450+</p>
          <p className="jh-stat-label">Client Server</p>
        </div>

        {/* Center: portrait + circle, cropped at the section's bottom edge */}
        <div className="jh-center-col">
          <div className="jh-photo-stage">
            <div className="jh-circle-clip">
              <div className="jh-half-circle" />
            </div>

            <img
              src="images/nobg.png"
              alt="Nayan, product designer"
              className="jh-portrait"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />

            {/* Curved arrow, pointing at the Portfolio button, pencil-sketch style */}
            <svg
              className="jh-arrow"
              width="110"
              height="90"
              viewBox="0 0 110 90"
              fill="none"
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
            </svg>

            {/* CTA buttons, overlapping the orange circle near the bottom */}
            <div className="jh-cta-row">
              <button className="jh-portfolio-btn">
                Portfolio <span style={{ fontSize: 16 }}>↗</span>
              </button>
              <button className="jh-hire-btn">Hire Me</button>
            </div>
          </div>
        </div>

        {/* Right: rating + experience */}
        <div className="jh-right-col">
          <div className="jh-stars">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="jh-star">
                {star}
              </span>
            ))}
          </div>
          <p className="jh-years">10 Years</p>
          <p className="jh-experts">Experts</p>
          <div className="jh-underline" />
        </div>
      </div>
    </section>
  );
}

const CSS = `
.jh-section {
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
  margin: 0 auto;
  padding: 80px 40px 0;
  font-family: 'Helvetica Neue', Arial, sans-serif;
  color: var(--text-primary);
  background: var(--bg);
  overflow: hidden;
  box-sizing: border-box;
  border-bottom-left-radius: 80px;
  border-bottom-right-radius: 80px;
  transition: background 0.3s ease, color 0.3s ease;
}
.jh-section[data-theme="dark"] {
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
.jh-section *, .jh-section *::before, .jh-section *::after { box-sizing: border-box; }

.jh-toggle-row { display: flex; justify-content: flex-end; align-items: center; gap: 8px; margin-bottom: 16px; }
.jh-toggle-btn { width: 46px; height: 26px; border-radius: 999px; border: 1px solid var(--badge-border); background: var(--toggle-track); padding: 2px; cursor: pointer; display: flex; align-items: center; }
.jh-toggle-knob { width: 20px; height: 20px; border-radius: 50%; background: var(--orange); transition: transform 0.2s ease; display: block; }
.jh-toggle-label { font-size: 13px; color: var(--badge-text); min-width: 34px; }

.jh-badge-row { display: flex; justify-content: center; margin-bottom: 24px; }
.jh-badge { border: 1px solid var(--badge-border); border-radius: 999px; padding: 8px 24px; font-size: 15px; color: var(--badge-text); }

.jh-headline { text-align: center; font-weight: 800; font-size: clamp(34px, 6vw, 78px); line-height: 1.05; margin: 0; letter-spacing: -1px; color: var(--text-primary); }
.jh-headline-second { margin-top: -8px; }
.jh-accent { color: var(--orange); }

.jh-content-row { display: grid; grid-template-columns: 1fr 1fr 1fr; align-items: start; margin-top: 40px; gap: 24px; position: relative; }

.jh-left-col { padding-top: 90px; padding-right: 24px; max-width: 340px; }
.jh-quote-mark { font-size: 40px; font-weight: 800; line-height: 1; display: block; margin-bottom: 8px; color: var(--orange); }
.jh-quote-text { font-size: 17px; line-height: 1.5; color: var(--text-secondary); margin: 0 0 40px; }
.jh-stat-number { font-size: 22px; font-weight: 800; margin: 0; color: var(--text-primary); }
.jh-section[data-theme="dark"] .jh-stat-number { color: var(--orange); }
.jh-stat-label { font-size: 16px; color: var(--text-muted); margin: 2px 0 0; }

.jh-center-col { position: relative; display: flex; flex-direction: column; align-items: center; }

.jh-photo-stage {
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
.jh-circle-clip { position: absolute; bottom: 0; left: 0; right: 0; height: var(--clip-height); overflow: hidden; }
.jh-half-circle {
  position: absolute;
  bottom: var(--circle-offset);
  left: 50%;
  transform: translateX(-50%);
  width: var(--circle-size);
  height: var(--circle-size);
  border-radius: 50%;
  background: radial-gradient(circle at 50% 42%, var(--orange) 0%, #7A2100 65%, #1A0800 100%);
  border: 6px solid var(--arch-border);
}
.jh-portrait {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 62px
  max-width: 200%;
  height: auto;
  max-height: var(--stage-height);
  object-fit: contain;
  object-position: bottom;
  z-index: 2;
}
.jh-arrow { position: absolute; left: var(--arrow-left); bottom: var(--arrow-bottom); z-index: 3; }
.jh-cta-row {
  position: absolute;
  bottom: var(--cta-bottom);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 3;
  flex-wrap: nowrap;
  justify-content: center;
  white-space: nowrap;
}
.jh-portfolio-btn { display: flex; align-items: center; gap: 6px; padding: 14px 26px; border-radius: 999px; border: 1.5px solid var(--button-border); background: var(--orange); color: #fff; font-size: 16px; font-weight: 500; cursor: pointer; }
.jh-hire-btn { padding: 14px 30px; border-radius: 999px; border: 1.5px solid var(--button-border); background: var(--hire-bg); color: var(--hire-text); font-size: 16px; font-weight: 500; cursor: pointer; }

.jh-right-col { padding-top: 90px; padding-left: 24px; text-align: right; }
.jh-stars { display: flex; justify-content: flex-end; gap: 6px; margin-bottom: 16px; }
.jh-star { color: var(--orange); font-size: 26px; }
.jh-years { font-family: 'Courier New', monospace; font-size: 28px; letter-spacing: 4px; margin: 0; color: var(--text-primary); }
.jh-experts { font-family: Georgia, 'Times New Roman', serif; font-style: italic; font-size: 34px; margin: 4px 0 8px; color: var(--text-primary); }
.jh-underline { height: 3px; background: var(--underline-color); width: 100%; margin-left: auto; }

/* Tablet: stack into a single column, photo first */
@media (max-width: 900px) {
  .jh-section { padding: 20px 24px 0; }
  .jh-content-row { grid-template-columns: 1fr; justify-items: center; text-align: center; gap: 36px; margin-top: 32px; }
  .jh-left-col { order: 2; padding-top: 0; max-width: 480px; padding-right: 0; }
  .jh-center-col { order: 1; }
  .jh-right-col { order: 3; padding-top: 0; padding-left: 0; text-align: center; }
  .jh-stars { justify-content: center; }
  .jh-underline { margin-left: auto; margin-right: auto; }
  .jh-quote-text { margin-bottom: 24px; }

  .jh-photo-stage {
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
  .jh-section { padding: 16px 16px 0; }
  .jh-badge { padding: 6px 18px; font-size: 14px; }
  .jh-content-row { gap: 28px; margin-top: 24px; }
  .jh-quote-text { font-size: 16px; }
  .jh-years { font-size: 22px; letter-spacing: 2px; }
  .jh-experts { font-size: 26px; }

  .jh-photo-stage {
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
  .jh-portfolio-btn, .jh-hire-btn { padding: 10px 14px; font-size: 13px; gap: 4px; }
  .jh-cta-row { gap: 8px; }
  .jh-arrow { display: none; }
}
`;
