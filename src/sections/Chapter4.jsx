import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Slider } from '../components/Slider';

export default function Chapter4() {
  const [sampleSize, setSampleSize] = useState(50);
  const [significance, setSignificance] = useState(0.05);
  const [type1, setType1] = useState(5);
  const [type2, setType2] = useState(15);

  return (
    <section id="chapter4" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Chapter 4: Statistical Inference</h2>
          <p className="text-gray-300 text-lg">
            Making decisions about systems using sample data and hypothesis testing
          </p>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Hypothesis Testing Arena</h3>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <label className="block text-sm mb-2">Sample Size: {sampleSize}</label>
              <Slider value={sampleSize} onChange={setSampleSize} min={10} max={500} />

              <label className="block text-sm mb-2 mt-6">Significance Level (α): {(significance * 100).toFixed(1)}%</label>
              <Slider value={significance * 100} onChange={(v) => setSignificance(v / 100)} min={0.5} max={10} />
            </div>

            <div className="p-4 bg-gradient-to-br from-neon-blue/10 to-neon-purple/10 border border-neon-cyan/20 rounded-lg">
              <h4 className="font-bold text-neon-cyan mb-3">Null vs Alternative</h4>
              <p className="text-sm text-gray-300 mb-2">
                <strong>H₀:</strong> System operates within spec (no change)
              </p>
              <p className="text-sm text-gray-300">
                <strong>H₁:</strong> System deviates from spec (change detected)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-bold text-red-400 mb-3">Type I Error (False Positive)</h4>
              <div className="text-sm text-gray-300 mb-4">
                Reject H₀ when it's true. You claim the system failed when it's actually fine.
              </div>
              <label className="block text-xs mb-2">α = {significance.toFixed(3)}</label>
              <div className="text-2xl font-bold text-red-400">{(type1).toFixed(0)}%</div>
            </motion.div>

            <motion.div
              className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <h4 className="font-bold text-yellow-400 mb-3">Type II Error (False Negative)</h4>
              <div className="text-sm text-gray-300 mb-4">
                Fail to reject H₀ when it's false. You miss the system failure.
              </div>
              <label className="block text-xs mb-2">β = {(type2 / 100).toFixed(3)}</label>
              <div className="text-2xl font-bold text-yellow-400">{type2.toFixed(0)}%</div>
            </motion.div>
          </div>

          <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded-lg">
            <p className="text-sm text-gray-300">
              <strong>Power of Test:</strong> 1 - β = {(100 - type2).toFixed(0)}% - Probability of correctly rejecting H₀ when false
            </p>
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Confidence Intervals</h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[90, 95, 99].map((conf) => (
              <motion.div
                key={conf}
                className="p-4 border border-neon-cyan/20 rounded-lg hover:bg-neon-cyan/5 transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-sm text-gray-400 mb-2">{conf}% Confidence</div>
                <div className="font-mono text-neon-cyan font-bold">{conf}% CI</div>
                <p className="text-xs text-gray-500 mt-2">
                  {conf === 90 && 'Narrower range, less confidence'}
                  {conf === 95 && 'Standard choice, balanced'}
                  {conf === 99 && 'Wider range, higher confidence'}
                </p>
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
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Engineering Decision Framework</h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">1.</span>
              <span><strong>Define Hypotheses:</strong> What are you testing?</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">2.</span>
              <span><strong>Choose α Level:</strong> How much risk of Type I error?</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">3.</span>
              <span><strong>Collect Data:</strong> Take appropriate sample size</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">4.</span>
              <span><strong>Calculate Test Statistic:</strong> Compare to critical value</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">5.</span>
              <span><strong>Make Decision:</strong> Reject or fail to reject H₀</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
