import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lab1 from './Lab1';
import Lab2 from './Lab2';
import Lab3 from './Lab3';
import Lab4 from './Lab4';

const TABS = [
  {
    id: 'lab1',
    label: 'Lab 1',
    title: 'CNC Machine Analysis',
    icon: '⚙️',
    description: 'Descriptive statistics & process capability of robotic arm positioning',
    component: Lab1,
  },
  {
    id: 'lab2',
    label: 'Lab 2',
    title: 'Robotic Gripper Reliability',
    icon: '🤖',
    description: 'Bayesian analysis of defect detection in automated inspection systems',
    component: Lab2,
  },
  {
    id: 'lab3',
    label: 'Lab 3',
    title: 'Normal Distribution Analysis',
    icon: '🔔',
    description: 'Z-score & percentile analysis of tensile strength in manufactured parts',
    component: Lab3,
  },
  {
    id: 'lab4',
    label: 'Lab 4',
    title: 'Simple Linear Regression',
    icon: '📐',
    description: 'Force–deflection regression model for structural health monitoring',
    component: Lab4,
  },
];

export default function LabsSection() {
  const [activeTab, setActiveTab] = useState('lab1');
  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component;
  const activeInfo = TABS.find(t => t.id === activeTab);

  return (
    <section id="labs" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="section-tag">🧪 Lab Assessments</div>
          <h2 className="text-5xl font-bold gradient-text mb-3">Lab Portfolio</h2>
          <p style={{ color: 'var(--text-muted)' }}>
            Four hands-on lab assessments applying statistical concepts to real engineering problems.
          </p>
        </motion.div>

        {/* Tab bar */}
        <div className="flex gap-2 flex-wrap mb-0">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                id={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="lab-tab"
                style={isActive ? {
                  color: 'var(--neon-cyan)',
                  background: 'var(--glass-bg)',
                  border: '1px solid rgba(0,217,255,0.3)',
                  borderBottom: '2px solid var(--bg-primary)',
                } : {}}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="mr-1">{tab.icon}</span>
                {tab.label}
              </motion.button>
            );
          })}
        </div>

        {/* Tab content panel */}
        <div
          className="glass rounded-b-2xl rounded-tr-2xl p-8 neon-border"
          style={{ borderTopLeftRadius: activeTab === 'lab1' ? '0' : undefined }}
        >
          {/* Active lab description badge */}
          <motion.div
            key={activeTab + '-header'}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-8 pb-5"
            style={{ borderBottom: '1px solid var(--glass-border)' }}
          >
            <span className="text-3xl">{activeInfo?.icon}</span>
            <div>
              <div className="text-xs font-semibold mb-1" style={{ color: 'var(--neon-cyan)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                {activeInfo?.label} · 01FE24BAR027
              </div>
              <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{activeInfo?.title}</h3>
              <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>{activeInfo?.description}</p>
            </div>
          </motion.div>

          {/* Animated component swap */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {ActiveComponent && <ActiveComponent />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation between labs */}
        <div className="flex justify-between mt-4">
          {(() => {
            const idx = TABS.findIndex(t => t.id === activeTab);
            const prev = TABS[idx - 1];
            const next = TABS[idx + 1];
            return (
              <>
                {prev ? (
                  <motion.button
                    onClick={() => setActiveTab(prev.id)}
                    className="glass px-5 py-2 rounded-lg text-sm font-semibold neon-border"
                    style={{ color: 'var(--neon-cyan)' }}
                    whileHover={{ scale: 1.04, x: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    ← {prev.icon} {prev.label}
                  </motion.button>
                ) : <div />}
                {next && (
                  <motion.button
                    onClick={() => setActiveTab(next.id)}
                    className="glass px-5 py-2 rounded-lg text-sm font-semibold neon-border"
                    style={{ color: 'var(--neon-cyan)' }}
                    whileHover={{ scale: 1.04, x: 2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    {next.icon} {next.label} →
                  </motion.button>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
