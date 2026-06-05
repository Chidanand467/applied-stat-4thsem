import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '../components/Slider';

export default function Lab2() {
  const [failProb, setFailProb] = useState(0.05);
  const [detectionRate, setDetectionRate] = useState(0.95);
  const [falseAlarmRate, setFalseAlarmRate] = useState(0.04);

  const calculateBayesian = () => {
    const goodProb = 1 - failProb;
    const pWarning = (detectionRate * failProb) + (falseAlarmRate * goodProb);
    const pFailGivenWarning = (detectionRate * failProb) / pWarning;
    const pGoodGivenWarning = (falseAlarmRate * goodProb) / pWarning;

    return {
      pWarning: (pWarning * 100).toFixed(2),
      pFailGivenWarning: (pFailGivenWarning * 100).toFixed(2),
      pGoodGivenWarning: (pGoodGivenWarning * 100).toFixed(2)
    };
  };

  const results = calculateBayesian();

  return (
    <section id="lab2" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Lab 2: Robotic Gripper Reliability</h2>
          <p className="text-gray-300 text-lg">
            Bayesian analysis of defect detection in automated inspection systems
          </p>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Interactive Parameters</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">
                  Failure Probability: {(failProb * 100).toFixed(2)}%
                </label>
                <Slider
                  value={failProb * 100}
                  onChange={(v) => setFailProb(v / 100)}
                  min={1}
                  max={20}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Detection Rate: {(detectionRate * 100).toFixed(2)}%
                </label>
                <Slider
                  value={detectionRate * 100}
                  onChange={(v) => setDetectionRate(v / 100)}
                  min={50}
                  max={100}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  False Alarm Rate: {(falseAlarmRate * 100).toFixed(2)}%
                </label>
                <Slider
                  value={falseAlarmRate * 100}
                  onChange={(v) => setFalseAlarmRate(v / 100)}
                  min={1}
                  max={20}
                />
              </div>
            </div>

            <div className="space-y-4">
              <motion.div
                className="p-6 bg-gradient-to-br from-neon-blue/10 to-neon-cyan/10 border border-neon-blue/30 rounded-lg"
                key={results.pWarning}
                animate={{ scale: [1, 1.02, 1] }}
              >
                <div className="text-sm text-gray-400 mb-2">P(Warning Triggered)</div>
                <div className="text-4xl font-bold text-neon-cyan">{results.pWarning}%</div>
                <p className="text-xs text-gray-500 mt-3">Probability inspection flags a defect</p>
              </motion.div>

              <motion.div
                className="p-6 bg-gradient-to-br from-neon-purple/10 to-neon-cyan/10 border border-neon-purple/30 rounded-lg"
                key={results.pFailGivenWarning}
                animate={{ scale: [1, 1.02, 1] }}
              >
                <div className="text-sm text-gray-400 mb-2">P(Failure | Warning)</div>
                <div className="text-4xl font-bold text-neon-purple">{results.pFailGivenWarning}%</div>
                <p className="text-xs text-gray-500 mt-3">Probability failure is real given alarm</p>
              </motion.div>

              <motion.div
                className="p-6 bg-gradient-to-br from-yellow-500/10 to-neon-cyan/10 border border-yellow-500/30 rounded-lg"
                key={results.pGoodGivenWarning}
                animate={{ scale: [1, 1.02, 1] }}
              >
                <div className="text-sm text-gray-400 mb-2">P(Good | Warning)</div>
                <div className="text-4xl font-bold text-yellow-500">{results.pGoodGivenWarning}%</div>
                <p className="text-xs text-gray-500 mt-3">Probability of false alarm</p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Key Findings</h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">→</span>
              <span>Even with 95% detection accuracy, only {results.pFailGivenWarning}% of alarms indicate real failures</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">→</span>
              <span>{results.pGoodGivenWarning}% of flags are false alarms - wasting production time</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">→</span>
              <span>Base rate (5% failure) heavily influences posterior probability</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">→</span>
              <span>Multiple sensors or secondary verification recommended</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Engineering Recommendation</h3>
          <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
            <p className="text-gray-300 mb-3">
              <strong>Never rely on a single inspection result for product rejection.</strong>
            </p>
            <p className="text-sm text-gray-400">
              Use a two-stage inspection process: Initial high-speed scan followed by detailed secondary verification for flagged parts. This reduces false rejections while maintaining quality assurance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
