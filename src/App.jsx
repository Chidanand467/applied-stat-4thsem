import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import HeroSection from './sections/HeroSection';
import Chapter1 from './sections/Chapter1';
import Chapter2 from './sections/Chapter2';
import Chapter3 from './sections/Chapter3';
import Chapter4 from './sections/Chapter4';
import Chapter5 from './sections/Chapter5';
import LabsSection from './sections/LabsSection';
import Dashboard from './sections/Dashboard';
import Navigation from './components/Navigation';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / scrollHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let konamiCode = [];
    const konamiPattern = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'
    ];
    const handleKeyDown = (e) => {
      konamiCode.push(e.key);
      if (konamiCode.length > konamiPattern.length) konamiCode.shift();
      if (konamiCode.join(',') === konamiPattern.join(',')) {
        for (let i = 0; i < 100; i++) {
          const el = document.createElement('div');
          el.style.cssText = `position:fixed;left:${Math.random()*100}%;top:-10px;width:10px;height:10px;background:${['#00D9FF','#BB86FC','#00F5FF'][Math.floor(Math.random()*3)]};border-radius:50%;pointer-events:none;z-index:9999;`;
          document.body.appendChild(el);
          let y = -10;
          const interval = setInterval(() => {
            y += 5;
            el.style.top = y + 'px';
            el.style.opacity = Math.max(0, 1 - y / 500);
            if (y > window.innerHeight) { clearInterval(interval); el.remove(); }
          }, 30);
        }
        konamiCode = [];
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={theme === 'light' ? 'light-mode' : ''} style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>
      {/* Static gradient background */}
      <div className="static-bg" />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 z-50"
        style={{
          width: `${scrollProgress}%`,
          background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-cyan), var(--neon-purple))'
        }}
      />

      <Navigation theme={theme} />
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <HeroSection theme={theme} />
      <Chapter1 theme={theme} />
      <Chapter2 theme={theme} />
      <Chapter3 theme={theme} />
      <Chapter4 theme={theme} />
      <Chapter5 theme={theme} />
      <LabsSection theme={theme} />
      <Dashboard theme={theme} />

      <footer style={{ borderTop: '1px solid rgba(0,217,255,0.15)', marginTop: '5rem' }} className="text-center py-8 px-4">
        <p className="text-muted">Applied Statistics Portfolio © 2026 | Chidanand Karennavar</p>
        <p className="text-faint text-sm mt-2">Automation &amp; Robotics Engineering | KLE Technological University</p>
      </footer>
    </div>
  );
}
