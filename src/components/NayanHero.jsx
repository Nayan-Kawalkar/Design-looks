import React, { useState } from 'react';

const PORTRAIT_SRC =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 500">
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#2b2b2b"/>
  <path d="M92 210 C92 320 60 360 40 500 L300 500 C280 360 248 320 248 210 Z" fill="#1c1c1c"/>
  <ellipse cx="170" cy="150" rx="78" ry="90" fill="#3a3a3a" opacity="0.5"/>
</svg>
`);

export default function NayanHero() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";

  return (
    <section className="jh-section" data-theme={theme}>
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
          {/* Theme toggle, just above the circle, aligned right */}
          <div className="jh-toggle-row">
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

          <div className="jh-photo-stage">
            <div className="jh-circle-clip">
              <div className="jh-half-circle" />
            </div>

            <img
              src="images/nobg.png"
              alt="Nayan, product designer"
              className="jh-portrait"
              onError={(e) => {
                e.target.style.display = "none";
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
