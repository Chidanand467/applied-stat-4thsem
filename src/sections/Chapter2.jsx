import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '../components/Slider';

export default function Chapter2() {
  const [failProb, setFailProb] = useState(0.05);
  const [warningProb, setWarningProb] = useState(0.90);
  const [falseAlarmProb, setFalseAlarmProb] = useState(0.04);

  const calculateBayes = () => {
    const goodProb = 1 - failProb;
    const pWarning = (warningProb * failProb) + (falseAlarmProb * goodProb);
    const pFailGivenWarning = (warningProb * failProb) / pWarning;
    return { pWarning, pFailGivenWarning };
  };

  const { pWarning, pFailGivenWarning } = calculateBayes();

  return (
    <section id="chapter2" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Chapter 2: Probabilistic Modeling</h2>
          <p className="text-gray-300 text-lg">
            Mastering probability theory, conditional probability, and Bayesian reasoning for automation systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">Bayes Theorem Simulator</h3>
            <p className="text-sm text-gray-400 mb-6">
              Adjust parameters to see how probability updates in a fault detection system
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">
                  Fault Probability: {(failProb * 100).toFixed(1)}%
                </label>
                <Slider value={failProb * 100} onChange={(v) => setFailProb(v / 100)} min={0} max={20} />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  Detection Accuracy: {(warningProb * 100).toFixed(1)}%
                </label>
                <Slider value={warningProb * 100} onChange={(v) => setWarningProb(v / 100)} min={50} max={100} />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  False Alarm Rate: {(falseAlarmProb * 100).toFixed(1)}%
                </label>
                <Slider value={falseAlarmProb * 100} onChange={(v) => setFalseAlarmProb(v / 100)} min={0} max={20} />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">Results</h3>

            <div className="space-y-4">
              <motion.div
                className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg"
                key={pWarning}
                animate={{ scale: [1, 1.02, 1] }}
              >
                <div className="text-sm text-gray-400 mb-1">P(Warning Triggered)</div>
                <div className="text-3xl font-bold text-neon-cyan">{(pWarning * 100).toFixed(2)}%</div>
                <div className="text-xs text-gray-500 mt-2">Probability of system triggering alarm</div>
              </motion.div>

              <motion.div
                className="p-4 bg-neon-purple/10 border border-neon-purple/30 rounded-lg"
                key={pFailGivenWarning}
                animate={{ scale: [1, 1.02, 1] }}
              >
                <div className="text-sm text-gray-400 mb-1">P(Fault | Warning)</div>
                <div className="text-3xl font-bold text-neon-purple">{(pFailGivenWarning * 100).toFixed(2)}%</div>
                <div className="text-xs text-gray-500 mt-2">Probability fault is real given alarm</div>
              </motion.div>

              <div className="p-4 border border-neon-cyan/20 rounded-lg bg-neon-cyan/5">
                <p className="text-sm text-gray-300">
                  <strong>Insight:</strong> Even with high detection accuracy, the posterior probability depends heavily on the base rate of faults.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Core Concepts</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Addition Rule',
                formula: 'P(A ∪ B) = P(A) + P(B) - P(A ∩ B)',
                desc: 'Probability of at least one event'
              },
              {
                title: 'Multiplication Rule',
                formula: 'P(A ∩ B) = P(A) × P(B|A)',
                desc: 'Probability of both events'
              },
              {
                title: 'Conditional Probability',
                formula: 'P(A|B) = P(A ∩ B) / P(B)',
                desc: 'Probability of A given B occurred'
              },
              {
                title: 'Bayes Theorem',
                formula: "P(A|B) = P(B|A)P(A) / P(B)",
                desc: 'Updating probability with evidence'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-4 border border-neon-cyan/20 rounded-lg bg-neon-cyan/5 hover:bg-neon-cyan/10 transition"
                whileHover={{ scale: 1.02 }}
              >
                <h4 className="font-bold text-neon-cyan mb-2">{item.title}</h4>
                <div className="font-mono text-sm text-neon-blue mb-2">{item.formula}</div>
                <p className="text-xs text-gray-400">{item.desc}</p>
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
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Lab 2: Robotic Gripper Reliability</h3>
          <div className="text-gray-300 space-y-3">
            <p><strong>Scenario:</strong> A robotic gripper has a failure probability of 5%. A warning system detects failures 90% of the time but has a 4% false alarm rate.</p>
            <p className="text-neon-cyan font-mono">Given: P(Fail) = 0.05, P(Warning|Fail) = 0.90, P(Warning|Good) = 0.04</p>
            <p><strong>Question:</strong> If the system triggers a warning, what's the probability the gripper actually failed?</p>
            <p className="p-3 bg-neon-blue/10 border border-neon-blue/30 rounded mt-4">
              <span className="text-neon-cyan font-bold">Answer:</span> Use the simulator above to discover!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
