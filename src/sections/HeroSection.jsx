import React from 'react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden dot-grid">
      <motion.div
        className="text-center z-10 relative px-4 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Badge */}
        <motion.div
          className="section-tag mx-auto w-fit mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          📊 Applied Statistics · 25EMAB218
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <span className="gradient-text glow-text">Applied</span>{' '}
          <span style={{ color: 'var(--text-primary)' }}>Statistics</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto"
          style={{ color: 'var(--text-secondary)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Transforming Data into&nbsp;
          <span style={{ color: 'var(--neon-cyan)', fontWeight: 700 }}>Engineering Intelligence</span>
        </motion.p>

        {/* Feature chips */}
        <motion.div
          className="flex gap-4 justify-center flex-wrap mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {[
            { icon: '📊', label: 'Data Analysis' },
            { icon: '🎲', label: 'Probability' },
            { icon: '📈', label: 'Modeling' },
            { icon: '🤖', label: 'Automation' },
            { icon: '🧪', label: '4 Labs' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="glass card-hover px-5 py-3 rounded-xl neon-border"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-semibold" style={{ color: 'var(--neon-cyan)' }}>{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Author block */}
        <motion.div
          className="glass rounded-2xl px-8 py-6 inline-block neon-border"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="font-bold text-lg" style={{ color: 'var(--text-primary)' }}>Chidanand Karennavar</p>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Automation &amp; Robotics Engineering</p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>KLE Technological University · 01FE24BAR027</p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://linkedin.com/in/chidanand-s-karennavar-096b21332"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--neon-cyan)' }}
            >
              🔗 LinkedIn
            </a>
            <a
              href="https://github.com/Chidanand467"
              target="_blank" rel="noopener noreferrer"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--neon-cyan)' }}
            >
              🐙 GitHub
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ color: 'var(--neon-cyan)' }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}
