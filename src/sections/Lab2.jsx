import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Lab2() {
  const [failProb,      setFailProb]      = useState(5);
  const [detectionRate, setDetectionRate] = useState(95);
  const [falseAlarmRate,setFalseAlarmRate]= useState(4);

  const pF  = failProb      / 100;
  const pDr = detectionRate / 100;
  const pFa = falseAlarmRate / 100;
  const pG  = 1 - pF;

  const pWarning          = (pDr * pF + pFa * pG);
  const pFailGivenWarning = (pDr * pF) / pWarning;
  const pGoodGivenWarning = (pFa * pG) / pWarning;

  const SliderCtrl = ({ label, value, setter, min, max, unit }) => (
    <div>
      <label className="flex justify-between text-xs mb-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>
        <span>{label}</span>
        <span style={{ color: 'var(--neon-cyan)' }}>{value}{unit}</span>
      </label>
      <input type="range" min={min} max={max} step="0.5" value={value}
        onChange={e => setter(Number(e.target.value))}
        className="w-full accent-cyan-400" />
      <div className="flex justify-between text-xs mt-1" style={{ color: 'var(--text-faint)' }}>
        <span>{min}{unit}</span><span>{max}{unit}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="section-tag">Lab 2 · Bayesian Probability</div>
        <h2 className="text-4xl font-bold gradient-text mb-2">Robotic Gripper Reliability</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Applying Bayes' theorem to analyse defect detection accuracy in an automated inspection system for robotic grippers.
        </p>
      </div>

      {/* Objective */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--neon-cyan)' }}>🎯 Objective</h3>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <li>→ Apply Bayes' Theorem: P(A|B) = P(B|A)·P(A) / P(B)</li>
          <li>→ Compute P(Failure | Warning) — the probability a triggered alarm is genuine</li>
          <li>→ Understand the base-rate fallacy in quality inspection systems</li>
          <li>→ Recommend inspection strategies to minimise false rejections</li>
        </ul>
      </motion.div>

      {/* Bayes Formula */}
      <motion.div
        className="glass rounded-xl p-6 neon-border text-center"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>📐 Bayes' Theorem</h3>
        <p className="text-lg font-mono font-bold mb-3" style={{ color: 'var(--neon-blue)' }}>
          P(F|W) = P(W|F) · P(F) / P(W)
        </p>
        <div className="grid md:grid-cols-3 gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          <div className="glass rounded-lg p-3 neon-border">
            <div className="font-bold mb-1" style={{ color: 'var(--neon-cyan)' }}>P(F) = Prior</div>
            <div>Probability the part is faulty before inspection</div>
          </div>
          <div className="glass rounded-lg p-3 neon-border">
            <div className="font-bold mb-1" style={{ color: 'var(--neon-cyan)' }}>P(W|F) = Likelihood</div>
            <div>Probability sensor triggers given the part is faulty</div>
          </div>
          <div className="glass rounded-lg p-3 neon-border">
            <div className="font-bold mb-1" style={{ color: 'var(--neon-cyan)' }}>P(W) = Evidence</div>
            <div>Total probability of sensor triggering</div>
          </div>
        </div>
      </motion.div>

      {/* Interactive Sliders + Results */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-6" style={{ color: 'var(--neon-cyan)' }}>🎛️ Interactive Bayesian Calculator</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sliders */}
          <div className="space-y-6">
            <SliderCtrl label="Failure Rate P(F)"      value={failProb}       setter={setFailProb}       min={1}  max={30} unit="%" />
            <SliderCtrl label="Detection Rate P(W|F)"  value={detectionRate}  setter={setDetectionRate}  min={50} max={100} unit="%" />
            <SliderCtrl label="False Alarm Rate P(W|G)" value={falseAlarmRate} setter={setFalseAlarmRate} min={1}  max={20} unit="%" />
          </div>

          {/* Results */}
          <div className="space-y-4">
            {[
              { label: 'P(Warning Triggered)', value: (pWarning*100).toFixed(2)+'%', sub: 'Probability alarm fires', color: 'var(--neon-cyan)' },
              { label: 'P(Failure | Warning)', value: (pFailGivenWarning*100).toFixed(2)+'%', sub: 'Alarm is genuine failure', color: 'var(--neon-purple)' },
              { label: 'P(Good | Warning)',    value: (pGoodGivenWarning*100).toFixed(2)+'%', sub: 'Alarm is false positive', color: '#FFD700' },
            ].map((r, i) => (
              <motion.div
                key={i}
                className="glass rounded-xl p-5 neon-border"
                layout
              >
                <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{r.label}</div>
                <div className="text-4xl font-bold font-mono" style={{ color: r.color }}>{r.value}</div>
                <div className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{r.sub}</div>
                {/* Progress bar */}
                <div className="mt-3 rounded-full overflow-hidden" style={{ height: 4, background: 'rgba(255,255,255,0.08)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: r.color }}
                    animate={{ width: r.value }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Key Findings */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>🔍 Key Findings</h3>
        <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>Even at {detectionRate}% detection accuracy, only <strong style={{ color: 'var(--neon-purple)' }}>{(pFailGivenWarning*100).toFixed(1)}%</strong> of triggered alarms are genuine failures.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span><strong style={{ color: '#FFD700' }}>{(pGoodGivenWarning*100).toFixed(1)}%</strong> of alarms are false positives, wasting production time.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>Low base rate P(F) = {failProb}% dominates the posterior — this is the <em>base-rate fallacy</em>.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>A two-stage inspection strategy is recommended to reduce false rejections while maintaining quality.</span></p>
        </div>
      </motion.div>

      {/* Engineering Recommendation */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        style={{ background: 'rgba(0,217,255,0.04)' }}
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--neon-cyan)' }}>🏭 Engineering Recommendation</h3>
        <p className="text-sm mb-3 font-bold" style={{ color: 'var(--text-primary)' }}>Never reject parts based on a single inspection result.</p>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Implement a <strong>two-stage inspection pipeline</strong>: Stage 1 uses a fast optical sensor for initial screening. Stage 2 applies a slower, high-accuracy tactile sensor only to flagged parts. This reduces false rejection rate while maintaining throughput and quality assurance standards.
        </p>
      </motion.div>
    </div>
  );
}
