import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Navigation({ theme }) {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero',      label: 'Home' },
    { id: 'chapter1',  label: 'Ch 1: Data' },
    { id: 'chapter2',  label: 'Ch 2: Probability' },
    { id: 'chapter3',  label: 'Ch 3: Distributions' },
    { id: 'chapter4',  label: 'Ch 4: Inference' },
    { id: 'chapter5',  label: 'Ch 5: Regression' },
    { id: 'labs',      label: '🧪 Labs' },
    { id: 'dashboard', label: 'Dashboard' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass"
      style={{ borderBottom: '1px solid var(--glass-border)' }}
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-xl font-bold gradient-text">STATS</div>
          <div className="text-xs hidden sm:block" style={{ color: 'var(--text-faint)' }}>Applied Statistics Portfolio</div>
        </div>

        {/* Nav links */}
        <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
          {sections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <motion.button
                key={section.id}
                id={`nav-${section.id}`}
                onClick={() => scrollTo(section.id)}
                className="px-3 py-2 rounded text-xs font-semibold whitespace-nowrap transition-all duration-200"
                style={{
                  color: isActive ? 'var(--neon-cyan)' : 'var(--text-muted)',
                  background: isActive ? 'rgba(0,217,255,0.1)' : 'transparent',
                  border: isActive ? '1px solid rgba(0,217,255,0.3)' : '1px solid transparent',
                }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                {section.label}
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
