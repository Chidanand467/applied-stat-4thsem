import React from 'react';
import { motion } from 'framer-motion';
import ParticleBackground from '../components/ParticleBackground';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <ParticleBackground />

      <motion.div
        className="text-center z-10 relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <span className="gradient-text glow-text">Applied Statistics</span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-3xl mx-auto"
        >
          Transforming Data into
          <span className="text-neon-cyan"> Engineering Intelligence</span>
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center flex-wrap"
        >
          {[
            { icon: '📊', label: 'Data Analysis' },
            { icon: '🎲', label: 'Probability' },
            { icon: '📈', label: 'Modeling' },
            { icon: '🤖', label: 'Automation' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="glass p-4 rounded-lg border border-neon-blue/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm font-medium text-neon-cyan">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 text-gray-400 text-lg"
        >
          <p>Chidanand Karennavar</p>
          <p className="text-sm mt-2">Automation & Robotics Engineering</p>
          <p className="text-sm">KLE Technological University</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://linkedin.com/in/chidanand-s-karennavar-096b21332" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-neon-blue transition">
              LinkedIn
            </a>
            <a href="https://github.com/Chidanand467" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:text-neon-blue transition">
              GitHub
            </a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="text-neon-cyan text-2xl">↓</div>
      </motion.div>
    </section>
  );
}
