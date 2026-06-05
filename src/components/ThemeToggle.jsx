import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle({ theme, setTheme }) {
  return (
    <motion.button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed bottom-8 right-8 p-3 glass rounded-full border border-neon-blue/30 z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'dark' ? (
        <Sun className="w-6 h-6 text-neon-cyan" />
      ) : (
        <Moon className="w-6 h-6 text-neon-blue" />
      )}
    </motion.button>
  );
}
