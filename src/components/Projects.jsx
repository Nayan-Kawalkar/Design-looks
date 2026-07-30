import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const caseStudies = [
  {
    id: 'crypto-wallet',
    name: 'Social Crypto',
    title: 'Social Crypto Wallet',
    description: 'Founding designer of a social crypto wallet that simplifies digital asset management and peer-to-peer transactions.',
    bgGradient: 'linear-gradient(135deg, #0052ff 0%, #0036b8 50%, #001038 100%)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-loop-31804-large.mp4',
    centerScreen: {
      user: 'Sophia Turner',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'Hey Anna, have you been following the crypto market lately?' },
        { sender: 'them', text: "I'm considering it. I've been reading up on Bitcoin and Ethereum..." },
        { sender: 'me', text: "I'm a bit more cautious. It's all about diversification." },
        { sender: 'them', text: 'Hey, can you send $200 for Ben\'s birthday?' },
      ],
    },
    leftScreen: {
      title: 'Select a Crypto',
      tokens: [
        { name: 'Ethereum', symbol: 'ETH', price: '$2,359', change: '+4.31%', color: '#627eea' },
        { name: 'Bitcoin', symbol: 'BTC', price: '$270', change: '+4.31%', color: '#f7931a' },
        { name: 'Tether', symbol: 'USDT', price: '$10', change: '-0.02%', color: '#26a17b' },
      ],
    },
  },
  {
    id: 'fosterhealth-ai',
    name: 'FosterHealth AI',
    title: 'Healthcare SaaS',
    description: 'Led the UX design of customizable features that let doctors personalize their AI-generated notes.',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #047857 50%, #022c22 100%)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-abstract-lines-loop-41484-large.mp4',
    centerScreen: {
      user: 'Dr. Marcus Vance',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'Patient assessment loaded: Medial Collateral Ligament Sprain.' },
        { sender: 'me', text: 'Generated note template verified. Prescribed Naproxen 500mg bid.' },
        { sender: 'them', text: 'Follow-up appointment scheduled in 1 week.' },
      ],
    },
    leftScreen: {
      title: 'EHR Templates',
      tokens: [
        { name: 'Ortho Eval', symbol: 'MCL', price: 'Active', change: 'v2.4', color: '#10b981' },
        { name: 'Cardio Note', symbol: 'ECG', price: 'Ready', change: 'v1.8', color: '#3b82f6' },
      ],
    },
  },
  {
    id: 'sourcing',
    name: 'DeFi Dashboard',
    title: 'DeFi Liquidity Dashboard',
    description: 'An institutional-grade dashboard for monitoring liquidity pools. Minimalist design paired with high-density data visualizations.',
    bgGradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 50%, #1e1b4b 100%)',
    centerScreen: {
      user: 'Pool Analytics',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'Total Value Locked: $142.8M across 12 automated pools.' },
        { sender: 'me', text: 'Average APY yield optimized at 14.2% with automated rebalancing.' },
      ],
    },
    leftScreen: {
      title: 'Active Pools',
      tokens: [
        { name: 'USDC/ETH', symbol: 'UNI-v3', price: '$84.2M', change: '+18.4%', color: '#6366f1' },
        { name: 'WBTC/USDT', symbol: 'CURVE', price: '$42.1M', change: '+9.2%', color: '#ec4899' },
      ],
    },
  },
  {
    id: 'salona',
    name: 'Neural BCI',
    title: 'Neural Interface UI',
    description: 'A conceptual interface for brain-computer interaction. Focused on micro-animations and non-obtrusive, ambient feedback loops.',
    bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #2e1065 100%)',
    centerScreen: {
      user: 'BCI Signal Lock',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'Alpha wave frequency locked at 98.4% confidence.' },
        { sender: 'me', text: 'Zero-latency motor intent translation active.' },
      ],
    },
    leftScreen: {
      title: 'Neural Channels',
      tokens: [
        { name: 'Cortex Alpha', symbol: '12Hz', price: 'Locked', change: '99%', color: '#8b5cf6' },
        { name: 'Motor Beta', symbol: '22Hz', price: 'Active', change: '96%', color: '#06b6d4' },
      ],
    },
  },
];

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % caseStudies.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const currentStudy = caseStudies[currentIndex];

  const formatIndex = (idx, total) => {
    const currentStr = String(idx + 1).padStart(2, '0');
    const totalStr = String(total).padStart(2, '0');
    return `${currentStr} / ${totalStr}`;
  };

  return (
    <section id="projects" className="projects-section container" style={{ paddingTop: '3.5rem', paddingBottom: '5rem' }}>
      {/* Section Title Header */}
      <ZoomBlurReveal>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>
          <span className="text-accent mono" style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>
            03 //
          </span>
          Case Studies
        </h2>
      </ZoomBlurReveal>

      {/* Main Carousel Wrapper */}
      <div style={{ position: 'relative', width: '100%', maxWidth: '740px', margin: '0 auto' }}>
        {/* Left Arrow Button */}
        <button
          onClick={handlePrev}
          aria-label="Previous case study"
          style={{
            position: 'absolute',
            left: '-52px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(18, 18, 18, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <FaChevronLeft size={13} />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={handleNext}
          aria-label="Next case study"
          style={{
            position: 'absolute',
            right: '-52px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(18, 18, 18, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 30,
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <FaChevronRight size={13} />
        </button>

        {/* Main Featured Card - Proportionally scaled for 740px width & 490px max height */}
        <div
          style={{
            width: '100%',
            aspectRatio: '12 / 10',
            maxHeight: '490px',
            borderRadius: '15px',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 20px 50px rgba(0,0,0,0.65)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStudy.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: '100%',
                height: '100%',
                background: currentStudy.bgGradient,
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.5rem 1.8rem',
                boxSizing: 'border-box',
              }}
            >
              {/* LOOPING BACKGROUND VIDEO INSIDE MAIN FRAME */}
              {currentStudy.videoUrl && (
                <video
                  key={currentStudy.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: 0.4,
                    mixBlendMode: 'screen',
                    pointerEvents: 'none',
                    zIndex: 1,
                  }}
                >
                  <source src={currentStudy.videoUrl} type="video/mp4" />
                </video>
              )}

              {/* TOP LEFT COUNTER BADGE INSIDE CARD */}
              <div style={{ zIndex: 20 }}>
                <div
                  style={{
                    display: 'inline-block',
                    background: 'rgba(0, 0, 0, 0.45)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: '0.35rem 0.95rem',
                    borderRadius: '100px',
                    color: '#ffffff',
                    fontSize: '0.78rem',
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: '0.08em',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {formatIndex(currentIndex, caseStudies.length)}
                </div>
              </div>

              {/* CENTER MOCKUP SCREENS (Proportionally Scaled for 490px Height Card) */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              >
                {/* Left Peek Phone Mockup Screen */}
                <div
                  className="mockup-left-peek"
                  style={{
                    position: 'absolute',
                    left: '-30px',
                    top: '55px',
                    width: '210px',
                    height: '370px',
                    background: '#ffffff',
                    borderRadius: '24px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                    padding: '1rem',
                    boxSizing: 'border-box',
                    opacity: 0.85,
                    transform: 'rotate(-4deg)',
                    color: '#18181b',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.7rem',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.8rem', color: '#09090b' }}>
                    {currentStudy.leftScreen.title}
                  </div>
                  {currentStudy.leftScreen.tokens.map((token, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.45rem 0',
                        borderBottom: '1px solid #f4f4f5',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <div style={{ width: 16, height: 16, borderRadius: '50%', background: token.color }} />
                        <span style={{ fontWeight: 600 }}>{token.name}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 600 }}>{token.price}</div>
                        <div style={{ fontSize: '0.65rem', color: token.change.startsWith('+') ? '#10b981' : '#ef4444' }}>
                          {token.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main Center Phone Mockup Screen */}
                <div
                  style={{
                    position: 'absolute',
                    top: '25px',
                    width: '255px',
                    height: '390px',
                    background: '#ffffff',
                    borderRadius: '28px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.45)',
                    padding: '1rem 1.1rem',
                    boxSizing: 'border-box',
                    color: '#18181b',
                    fontFamily: "'Inter', sans-serif",
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '3.5px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Status Bar */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', fontWeight: 600, color: '#09090b' }}>
                    <span>9:41</span>
                    <span>📶 🔋</span>
                  </div>

                  {/* App Header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem', paddingBottom: '0.6rem', borderBottom: '1px solid #f4f4f5' }}>
                    <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#2563eb', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700 }}>
                      {currentStudy.centerScreen.user.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '0.8rem' }}>{currentStudy.centerScreen.user}</span>
                  </div>

                  {/* Chat Messages */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', flex: 1, marginTop: '0.75rem', overflow: 'hidden' }}>
                    {currentStudy.centerScreen.messages.map((msg, i) => (
                      <div
                        key={i}
                        style={{
                          alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                          background: msg.sender === 'me' ? '#2563eb' : '#f4f4f5',
                          color: msg.sender === 'me' ? '#ffffff' : '#27272a',
                          padding: '0.5rem 0.75rem',
                          borderRadius: msg.sender === 'me' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                          fontSize: '0.7rem',
                          lineHeight: 1.4,
                          maxWidth: '88%',
                        }}
                      >
                        {msg.text}
                      </div>
                    ))}
                  </div>

                  {/* Bottom Input */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f4f4f5', padding: '0.4rem 0.7rem', borderRadius: '100px', fontSize: '0.7rem', color: '#a1a1aa' }}>
                    <span>Start typing...</span>
                    <span>🎤</span>
                  </div>
                </div>

                {/* Right Peek Phone Mockup Screen */}
                <div
                  className="mockup-right-peek"
                  style={{
                    position: 'absolute',
                    right: '-30px',
                    top: '55px',
                    width: '210px',
                    height: '370px',
                    background: '#ffffff',
                    borderRadius: '24px',
                    boxShadow: '0 15px 30px rgba(0,0,0,0.3)',
                    padding: '1rem',
                    boxSizing: 'border-box',
                    opacity: 0.85,
                    transform: 'rotate(4deg)',
                    color: '#18181b',
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.8rem' }}>Activity</div>
                  <div style={{ background: '#2563eb', height: 95, borderRadius: 14, padding: '0.8rem', color: '#fff' }}>
                    <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>Wallet Balance</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.2rem' }}>$14,250.00</div>
                  </div>
                </div>
              </div>

              {/* BOTTOM LEFT OVERLAY TYPOGRAPHY (Scaled proportionally to fit 490px max-height) */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 25,
                  maxWidth: '560px',
                  marginTop: 'auto',
                  textShadow: '0 3px 15px rgba(0,0,0,0.85)',
                }}
              >
                <motion.h3
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.28, delay: 0.08 }}
                  style={{
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.4rem)',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                  }}
                >
                  {currentStudy.title}
                </motion.h3>

                <motion.p
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.28, delay: 0.12 }}
                  style={{
                    fontSize: 'clamp(0.88rem, 1.4vw, 0.98rem)',
                    color: 'rgba(255, 255, 255, 0.9)',
                    lineHeight: 1.5,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                    maxWidth: '520px',
                  }}
                >
                  {currentStudy.description}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM TAB NAVIGATION (Responsive spacing & font sizes) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.8rem',
            flexWrap: 'wrap',
            marginTop: '2rem',
          }}
        >
          {caseStudies.map((study, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={study.id}
                onClick={() => setCurrentIndex(index)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: isActive ? '#ffffff' : '#666666',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: '0.9rem',
                  fontFamily: "'Inter', sans-serif",
                  cursor: 'pointer',
                  padding: '0.35rem 0',
                  position: 'relative',
                  transition: 'color 0.25s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#bbbbbb';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.color = '#666666';
                }}
              >
                {study.name}
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#ffffff',
                      borderRadius: '2px',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
