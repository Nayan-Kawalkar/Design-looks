import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ZoomBlurReveal } from './ZoomBlurHeading';

const caseStudies = [
  {
    id: 'stocker',
    name: 'Stocker',
    title: 'AI Portfolio Intelligence Hub',
    description: 'A multi-broker AI portfolio analytics platform aggregating holdings, transactions, and ledgers across Indian and US brokers into one unified view — with an agentic copilot that answers free-form questions about portfolio performance.',
    bgGradient: 'linear-gradient(135deg, #0052ff 0%, #0036b8 50%, #001038 100%)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-loop-31804-large.mp4',
    centerScreen: {
      user: 'Stocker Copilot',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'Holdings synced across Zerodha, Groww & Fidelity.' },
        { sender: 'me', text: 'Best performer this month: NVDA +12.4%. Want a per-stock deep dive?' },
        { sender: 'them', text: 'What were the market conditions when I bought TCS?' },
      ],
    },
    leftScreen: {
      title: 'Connected Brokers',
      tokens: [
        { name: 'Zerodha', symbol: 'NSE', price: 'Synced', change: '+4.2%', color: '#6366f1' },
        { name: 'Groww', symbol: 'NSE', price: 'Synced', change: '+6.1%', color: '#f7931a' },
        { name: 'Fidelity', symbol: 'US', price: 'Synced', change: '+8.9%', color: '#26a17b' },
      ],
    },
    rightScreen: {
      title: 'Total Portfolio Value',
      value: '$48,250.00',
    },
  },
  {
    id: 'rag-chatbot',
    name: 'AI Portfolio Chatbot',
    title: 'Conversational RAG Assistant',
    description: 'A full RAG pipeline powering a conversational assistant for a portfolio site — content authored in Notion, synced every 6 hours, chunked and embedded via Gemini, stored as vectors in Supabase, with Upstash Redis caching and MiniMax LLM response generation.',
    bgGradient: 'linear-gradient(135deg, #10b981 0%, #047857 50%, #022c22 100%)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-abstract-lines-loop-41484-large.mp4',
    centerScreen: {
      user: 'Portfolio Assistant',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'Ask me anything about the projects or blog.' },
        { sender: 'me', text: 'Here are 3 relevant projects I found, rendered as clickable cards.' },
        { sender: 'them', text: 'Summarize the latest blog post for me.' },
      ],
    },
    leftScreen: {
      title: 'RAG Stack',
      tokens: [
        { name: 'Notion', symbol: 'Source', price: 'Synced', change: '6h', color: '#10b981' },
        { name: 'Supabase', symbol: 'Vectors', price: 'Live', change: '12k', color: '#3b82f6' },
        { name: 'Upstash', symbol: 'Cache', price: 'Active', change: '240ms', color: '#f59e0b' },
      ],
    },
    rightScreen: {
      title: 'Responses Cached',
      value: '240ms',
    },
  },
  {
    id: 'yc-directory',
    name: 'YC Directory',
    title: 'Startup Pitch Platform',
    description: 'A social platform for uploading startups with Markdown pitches — full authentication and database integration, built for founders to share and discover early-stage ideas.',
    bgGradient: 'linear-gradient(135deg, #6366f1 0%, #4338ca 50%, #1e1b4b 100%)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-white-abstract-lines-loop-41484-large.mp4',
    centerScreen: {
      user: 'YC Directory',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'New pitch: "FarmFlow — smart farming for small farms."' },
        { sender: 'me', text: 'Pitch approved and published. +24 upvotes this week.' },
        { sender: 'them', text: 'Markdown pitch submitted — awaiting review.' },
      ],
    },
    leftScreen: {
      title: 'Trending Pitches',
      tokens: [
        { name: 'FarmFlow', symbol: 'Agri', price: '24k', change: '+12%', color: '#6366f1' },
        { name: 'DevHive', symbol: 'DevTools', price: '18k', change: '+8%', color: '#ec4899' },
      ],
    },
    rightScreen: {
      title: 'Pitches Published',
      value: '1,240',
    },
  },
  {
    id: 'digital-farming',
    name: 'Digital Framing',
    title: 'AI Smart Farming',
    description: 'A cross-platform (React Native + React.js) app for farmers with chatbot support, image-based crop issue detection, and a peer knowledge-sharing feature — sharing one backend across mobile and web.',
    bgGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 50%, #2e1065 100%)',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-lines-loop-31804-large.mp4',
    centerScreen: {
      user: 'Crop Assistant',
      time: '9:41',
      messages: [
        { sender: 'them', text: 'Image analyzed: early blight detected on tomato leaves.' },
        { sender: 'me', text: 'Recommended: copper fungicide spray. Peer guidance is available nearby.' },
      ],
    },
    leftScreen: {
      title: 'Crop Diagnostics',
      tokens: [
        { name: 'Tomato', symbol: 'Blight', price: 'Detected', change: '94%', color: '#8b5cf6' },
        { name: 'Rice', symbol: 'Healthy', price: 'OK', change: '99%', color: '#06b6d4' },
      ],
    },
    rightScreen: {
      title: 'Issues Detected',
      value: '3,420',
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
    <section id="projects" className="projects-section container">
      {/* Responsive scoped styles */}
      <style>{`
        .projects-desktop-view {
          display: block;
          position: relative;
          width: 100%;
          max-width: 740px;
          margin: 0 auto;
        }
        .projects-mobile-view {
          display: none;
        }
        .projects-arrow-btn {
          position: absolute;
          top: 45%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(18, 18, 18, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.15);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 30;
          transition: all 0.2s ease;
        }
        .projects-arrow-btn:hover {
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-50%) scale(1.08);
        }
        .projects-arrow-left { left: -72px; }
        .projects-arrow-right { right: -72px; }
        .projects-tab-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.8rem;
          flex-wrap: wrap;
          margin-top: 3rem;
          border-top: 2px solid var(--border-color);
        }

        @media (max-width: 900px) {
          .projects-arrow-left { left: -56px; }
          .projects-arrow-right { right: -56px; }
          .projects-arrow-btn { width: 42px; height: 42px; }
        }

        @media (max-width: 768px) {
          .projects-desktop-view {
            display: none !important;
          }
          .projects-mobile-view {
            display: flex !important;
            flex-direction: column;
            gap: 0;
            width: 100%;
          }
          .projects-mobile-view > div + div {
            margin-top: 5rem;
            padding-top: 5rem;
            border-top: 1px solid var(--border-color);
          }
        }
      `}</style>
      {/* Section Title Header */}
      <ZoomBlurReveal>
        <h2 className="section-title" style={{ marginBottom: '2rem' }}>
          <span className="text-accent mono" style={{ fontSize: '0.9rem', display: 'block', marginBottom: '0.4rem' }}>
            04 //
          </span>
          Case Studies
        </h2>
      </ZoomBlurReveal>
      <ZoomBlurReveal delay={0.15}>
        <p className="hero-subtitle">
          Production-grade full-stack apps and agentic AI systems &mdash; multi-agent orchestration, RAG pipelines, and LLM-powered automation, built end-to-end.
        </p>
      </ZoomBlurReveal>

      {/* Desktop View: Interactive Carousel */}
      <div className="projects-desktop-view">
        {/* Arrow Buttons */}
        <div className="projects-arrows-desktop" style={{ display: 'contents' }}>
          <button
            onClick={handlePrev}
            aria-label="Previous case study"
            className="projects-arrow-btn projects-arrow-left"
          >
            <FaChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next case study"
            className="projects-arrow-btn projects-arrow-right"
          >
            <FaChevronRight size={20} />
          </button>
        </div>

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
                    <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>{currentStudy.rightScreen.title}</div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '0.2rem' }}>{currentStudy.rightScreen.value}</div>
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
        <div className="projects-tab-nav">
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
                  marginTop: '0.6rem',

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

      {/* Mobile View: Vertical Stack of All Project Cards */}
      <div className="projects-mobile-view">
        {caseStudies.map((study, index) => (
          <div key={study.id} style={{ width: '100%' }}>
              {/* GRADIENT CARD (image clipped by outer frame) */}
              <div
                style={{
                  position: 'relative',
                  background: study.bgGradient,
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                }}
              >
              {/* Preview image fills the outer frame */}
              <img
                src="images/nook.png"
                alt={`${study.title} preview`}
                style={{
                  width: '100%',
                  aspectRatio: '12 / 10',
                  maxHeight: '490px',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* INFO BLOCK */}
            <div style={{ position: 'relative', marginTop: '36px' }}>
              {/* pagi-dot */}
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 10,
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: '#ffffff',
                  opacity: 0.9,
                }}
              />
              {/* eyebrow: num + name */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 14 }}>
                <span style={{ color: '#8A8A8A', fontSize: 15, fontWeight: 400, letterSpacing: 0.5 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={{ color: '#4DD9C7', fontSize: 16, fontWeight: 600 }}>{study.name}</span>
              </div>
              {/* headline */}
              <h3
                style={{
                  color: '#ffffff',
                  fontSize: '1.7rem',
                  fontWeight: 500,
                  lineHeight: 1.12,
                  letterSpacing: -0.5,
                  maxWidth: 600,
                  marginBottom: 20,
                  paddingLeft: 40,
                }}
              >
                {study.title}
              </h3>
              {/* desc */}
              <p
                style={{
                  color: '#B8B8B8',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  maxWidth: 520,
                  margin: 0,
                }}
              >
                {study.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;

{/*<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Salona Showcase Card</title>
<style>
  :root{
    --pink:#FF3E9A;
    --pink-deep:#E8248A;
    --black:#0A0A0A;
    --teal:#4DD9C7;
    --gray:#8A8A8A;
    --gray-light:#B8B8B8;
    --white:#FFFFFF;
    --blue:#3E7BFA;
  }

  *{box-sizing:border-box; margin:0; padding:0;}

  body{
    background:var(--black);
    font-family:'Segoe UI', system-ui, -apple-system, sans-serif;
    display:flex;
    justify-content:center;
    padding:60px 20px;
  }

  .showcase{
    width:100%;
    max-width:700px;
  }

  ---------- PINK CARD ---------- 
  .card{
    position:relative;
    background:linear-gradient(160deg, var(--pink) 0%, var(--pink-deep) 100%);
    border-radius:32px;
    padding:32px;
    overflow:hidden;
  }

  .visual-zone{
    width:100%;
    height:420px;
    border-radius:20px;
    overflow:hidden;
    display:flex;
    align-items:center;
    justify-content:center;
  }

  .visual-zone img{
    width:100%;
    height:100%;
    object-fit:contain;
    display:block;
  }

   ---------- TEXT BLOCK ---------- 
  .info{
    margin-top:36px;
    position:relative;
  }
  .eyebrow{
    display:flex;
    align-items:baseline;
    gap:10px;
    margin-bottom:14px;
  }
  .eyebrow .num{
    color:var(--gray);
    font-size:15px;
    font-weight:400;
    letter-spacing:0.5px;
  }
  .eyebrow .name{
    color:var(--teal);
    font-size:16px;
    font-weight:600;
  }
  .headline{
    color:var(--white);
    font-size:44px;
    font-weight:700;
    line-height:1.12;
    letter-spacing:-0.5px;
    max-width:600px;
    margin-bottom:20px;
    padding-left:40px;
  }
  .desc{
    color:var(--gray-light);
    font-size:16px;
    line-height:1.55;
    max-width:520px;
  }
  .pagi-dot{
    position:absolute;
    right:0;
    top:10px;
    width:8px;
    height:8px;
    border-radius:50%;
    background:var(--white);
    opacity:0.9;
  }

  @media (max-width:560px){
    .headline{ font-size:32px; }
  }
</style>
</head>
<body>

<div class="showcase">

  <div class="card">
    <div class="visual-zone">
      <img src="visual.png" alt="Salona app preview" />
    </div>
  </div>

  <div class="info">
    <div class="pagi-dot"></div>
    <div class="eyebrow">
      <span class="num">04</span>
      <span class="name">Salona</span>
    </div>
    <div class="headline">Professional Networking Platform</div>
    <div class="desc">Reimagined professional networking for creatives through a more human and community-driven alternative to LinkedIn.</div>
  </div>

</div>

</body>
</html> */}