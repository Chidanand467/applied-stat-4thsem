import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Star, Zap } from 'lucide-react';

export default function Dashboard() {
  const [expandedSection, setExpandedSection] = useState(null);

  const chapters = [
    { id: 1, name: 'Data Characterization', status: 'complete', progress: 100 },
    { id: 2, name: 'Probabilistic Modeling', status: 'complete', progress: 100 },
    { id: 3, name: 'Statistical Distributions', status: 'complete', progress: 100 },
    { id: 4, name: 'Statistical Inference', status: 'complete', progress: 100 },
    { id: 5, name: 'Regression Modeling', status: 'complete', progress: 100 }
  ];

  const achievements = [
    { icon: '📊', label: 'Data Analyst', desc: 'Master data characterization' },
    { icon: '🎲', label: 'Probability Master', desc: 'Understand probability theory' },
    { icon: '📈', label: 'Distribution Expert', desc: 'Apply statistical distributions' },
    { icon: '🎯', label: 'Inference Specialist', desc: 'Conduct hypothesis testing' },
    { icon: '📐', label: 'Regression Engineer', desc: 'Build predictive models' },
    { icon: '🏆', label: 'Statistics Champion', desc: 'Complete all topics' }
  ];

  const skills = [
    'Descriptive Statistics',
    'Probability Theory',
    'Hypothesis Testing',
    'Regression Analysis',
    'Bayesian Reasoning',
    'Data Visualization',
    'Statistical Modeling',
    'Quality Control'
  ];

  return (
    <section id="dashboard" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Statistics Command Center</h2>
          <p className="text-gray-300 text-lg">
            Course progress, achievements, and learning summary
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">Course Progress</h3>
            <div className="space-y-4">
              {chapters.map((chapter, idx) => (
                <motion.div
                  key={chapter.id}
                  className="p-4 border border-neon-cyan/20 rounded-lg hover:bg-neon-cyan/5 transition cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setExpandedSection(expandedSection === chapter.id ? null : chapter.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-neon-cyan font-bold">Ch{chapter.id}</span>
                      <span className="text-sm text-gray-300">{chapter.name}</span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <div className="w-full bg-neon-blue/10 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-neon-cyan to-neon-blue h-2 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${chapter.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">{chapter.progress}% Complete</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">Skills Acquired</h3>
            <div className="grid grid-cols-2 gap-3">
              {skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 border border-neon-cyan/20 rounded-lg bg-neon-cyan/5 flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-neon-cyan text-lg">✓</span>
                  <span className="text-sm text-gray-300">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6 flex items-center gap-2">
            <Star className="w-6 h-6" />
            Achievement Badges
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achievement, idx) => (
              <motion.div
                key={idx}
                className="p-4 border border-neon-cyan/20 rounded-lg hover:bg-neon-cyan/10 transition text-center"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="text-5xl mb-2">{achievement.icon}</div>
                <h4 className="font-bold text-neon-cyan text-sm mb-1">{achievement.label}</h4>
                <p className="text-xs text-gray-400">{achievement.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-4 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            Key Takeaways
          </h3>
          <div className="space-y-4 text-gray-300">
            <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded">
              <p className="font-bold text-neon-cyan mb-2">1. Data Tells Stories</p>
              <p className="text-sm">Statistics reveals patterns, trends, and anomalies in automation systems that raw data cannot show.</p>
            </div>
            <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded">
              <p className="font-bold text-neon-cyan mb-2">2. Probability Guides Decisions</p>
              <p className="text-sm">Understanding uncertainty through probability and Bayesian reasoning improves decision-making quality.</p>
            </div>
            <div className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded">
              <p className="font-bold text-neon-cyan mb-2">3. Models Enable Prediction</p>
              <p className="text-sm">Regression and distribution models let engineers predict system behavior and optimize performance.</p>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded">
              <p className="font-bold text-neon-cyan mb-2">4. Validation is Essential</p>
              <p className="text-sm">Always validate hypotheses with appropriate statistical tests before making critical engineering decisions.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
