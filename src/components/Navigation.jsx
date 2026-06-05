import React from 'react';
import { motion } from 'framer-motion';

export default function Navigation({ theme }) {
  const [activeSection, setActiveSection] = React.useState('hero');

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'chapter1', label: 'Ch1: Data' },
    { id: 'chapter2', label: 'Ch2: Probability' },
    { id: 'chapter3', label: 'Ch3: Distributions' },
    { id: 'chapter4', label: 'Ch4: Inference' },
    { id: 'chapter5', label: 'Ch5: Regression' },
    { id: 'lab1', label: 'Lab 1' },
    { id: 'lab2', label: 'Lab 2' },
    { id: 'dashboard', label: 'Dashboard' }
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-40 glass border-b border-neon-blue/20"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center overflow-x-auto">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold gradient-text">STATS</div>
          <div className="text-sm text-gray-400">Applied Statistics Portfolio</div>
        </div>

        <div className="flex gap-1 overflow-x-auto pb-2">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`px-3 py-2 rounded text-sm font-medium whitespace-nowrap transition-colors ${
                activeSection === section.id
                  ? 'bg-neon-blue/20 text-neon-blue'
                  : 'text-gray-400 hover:text-neon-cyan'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              {section.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
