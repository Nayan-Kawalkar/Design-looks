import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Cursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use GSAP quickTo for performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });

    const moveCursor = (e) => {
      // Offset by half the base size (32px / 2 = 16) to center the dot
      xTo(e.clientX - 16);
      yTo(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveCursor);

    // Hover handlers for interactive elements (links, buttons)
    const handleMouseEnterInteractive = () => {
      gsap.to(cursor, { 
        scale: 2.5, 
        backgroundColor: "transparent", 
        border: "1px solid var(--accent)", 
        duration: 0.3 
      });
    };

    // Hover handlers for text content
    const handleMouseEnterText = (target) => {
      // Get font size of hovered text
      const computedStyle = window.getComputedStyle(target);
      const fontSize = parseFloat(computedStyle.fontSize);
      
      // Calculate target size (min 40px, up to 1.5x the font size)
      const targetSize = Math.max(fontSize * 1.5, 40); 
      // Calculate scale relative to the base 32px size
      const newScale = targetSize / 32;

      gsap.to(cursor, { 
        scale: newScale,
        backgroundColor: "#ffffff", // Solid white creates the perfect inverted color effect with mix-blend-mode: difference
        border: "none", 
        duration: 0.3 
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: "var(--accent)", 
        border: "none", 
        duration: 0.3 
      });
    };

    // Use event delegation on document
    const handleMouseOver = (e) => {
      // 1. Check for links/buttons first
      const interactiveTarget = e.target.closest('a, button, .magnetic');
      if (interactiveTarget) {
        handleMouseEnterInteractive();
        return;
      }

      // 2. Check for text elements
      const textTarget = e.target.closest('h1, h2, h3, h4, h5, h6, p, span, li');
      if (textTarget) {
        // Prevent scaling if the text is inside a button/link (already handled above)
        if (!textTarget.closest('a, button, .magnetic')) {
          handleMouseEnterText(textTarget);
        }
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target.closest('a, button, .magnetic, h1, h2, h3, h4, h5, h6, p, span, li');
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
        mixBlendMode: 'difference', // This is what inverts the colors inside the cursor
        willChange: 'transform'
      }}
    />
  );
};

export default Cursor;
