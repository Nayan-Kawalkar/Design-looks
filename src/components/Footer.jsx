import React from 'react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-inner">
        <div className="footer-left">
          <span className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            © {year} — Designed & Engineered with precision.
          </span>
        </div>
        <div className="footer-right">
          <span className="mono" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            SYS.VER: 2.0.26 &nbsp;|&nbsp; BUILD: PRODUCTION
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
