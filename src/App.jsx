import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './index.css';
import HeroSection from './sections/HeroSection';
import Chapter1 from './sections/Chapter1';
import Chapter2 from './sections/Chapter2';
import Chapter3 from './sections/Chapter3';
import Chapter4 from './sections/Chapter4';
import Chapter5 from './sections/Chapter5';
import Lab1 from './sections/Lab1';
import Lab2 from './sections/Lab2';
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

  const handleKonamiCode = () => {
    const confetti = () => {
      for (let i = 0; i < 100; i++) {
        const el = document.createElement('div');
        el.style.position = 'fixed';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = -10 + 'px';
        el.style.width = '10px';
        el.style.height = '10px';
        el.style.backgroundColor = ['#00D9FF', '#BB86FC', '#00F5FF'][Math.floor(Math.random() * 3)];
        el.style.borderRadius = '50%';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '9999';
        document.body.appendChild(el);

        const duration = 2 + Math.random() * 1;
        let y = -10;
        const interval = setInterval(() => {
          y += 5;
          el.style.top = y + 'px';
          el.style.opacity = Math.max(0, 1 - (y - (-10)) / 500);
          if (y > window.innerHeight) {
            clearInterval(interval);
            el.remove();
          }
        }, 30);
      }
    };

    confetti();
  };

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
        handleKonamiCode();
        konamiCode = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}>
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-neon-blue via-neon-cyan to-neon-purple z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <Navigation theme={theme} />
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <HeroSection />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Lab1 />
      <Lab2 />
      <Dashboard />

      <footer className="text-center py-8 border-t border-neon-blue/20 mt-20">
        <p className="text-gray-400">
          Applied Statistics Portfolio © 2026 | Chidanand Karennavar
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Automation & Robotics Engineering | KLE Technological University
        </p>
      </footer>
    </div>
  );
}
