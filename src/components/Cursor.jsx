import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const textEl = textRef.current;
    if (!cursor || !textEl) return;

    // Use GSAP quickTo for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e) => {
      xTo(e.clientX - 16);
      yTo(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover handler for view-now card cursor (data-cursor-text)
    const handleMouseEnterViewText = (cursorText) => {
      textEl.innerText = cursorText;
      gsap.to(cursor, { 
        scale: 3.2, 
        backgroundColor: "var(--accent)", 
        mixBlendMode: "normal",
        border: "none", 
        duration: 0.3 
      });
      gsap.to(textEl, { opacity: 1, duration: 0.2 });
    };

    // Hover handlers for interactive elements (links, buttons)
    const handleMouseEnterInteractive = () => {
      textEl.innerText = "";
      gsap.to(cursor, { 
        scale: 2.5, 
        backgroundColor: "transparent", 
        mixBlendMode: "difference",
        border: "1px solid var(--accent)", 
        duration: 0.3 
      });
    };

    // Hover handlers for text content
    const handleMouseEnterText = (target) => {
      textEl.innerText = "";
      const computedStyle = window.getComputedStyle(target);
      const fontSize = parseFloat(computedStyle.fontSize);
      const targetSize = Math.max(fontSize * 1.5, 40); 
      const newScale = targetSize / 32;

      gsap.to(cursor, { 
        scale: newScale,
        backgroundColor: "#ffffff", 
        mixBlendMode: "difference",
        border: "none", 
        duration: 0.3 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(textEl, { opacity: 0, duration: 0.15 });
      textEl.innerText = "";
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: "var(--accent)", 
        mixBlendMode: "difference",
        border: "none", 
        duration: 0.3 
      });
    };

    // Use event delegation on document
    const handleMouseOver = (e) => {
      // 1. Check for custom cursor text first (e.g. Playground cards)
      const viewTextTarget = e.target.closest('[data-cursor-text]');
      if (viewTextTarget) {
        handleMouseEnterViewText(viewTextTarget.dataset.cursorText);
        return;
      }

      // 2. Check for links/buttons
      const interactiveTarget = e.target.closest('a, button, .magnetic');
      if (interactiveTarget) {
        handleMouseEnterInteractive();
        return;
      }

      // 3. Check for text elements
      const textTarget = e.target.closest('h1, h2, h3, h4, h5, h6, p, span, li');
      if (textTarget) {
        if (!textTarget.closest('a, button, .magnetic, [data-cursor-text]')) {
          handleMouseEnterText(textTarget);
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('[data-cursor-text], a, button, .magnetic, h1, h2, h3, h4, h5, h6, p, span, li');
      if (target) {
        const related = e.relatedTarget;
        if (!target.contains(related)) {
          handleMouseLeave();
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="custom-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'var(--accent)',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        willChange: 'transform'
      }}
    >
      <span 
        ref={textRef} 
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: '7px',
          fontWeight: '700',
          color: '#0a0a0a',
          textAlign: 'center',
          textTransform: 'uppercase',
          lineHeight: '1.1',
          opacity: 0,
          pointerEvents: 'none',
          padding: '2px'
        }}
      />
    </div>
  );
};

export default Cursor;
