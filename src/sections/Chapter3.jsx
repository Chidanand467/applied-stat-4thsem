import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Slider } from '../components/Slider';

export default function Chapter3() {
  const [mean, setMean] = useState(0);
  const [stdDev, setStdDev] = useState(1);

  const generateNormalDistribution = (m, s) => {
    const data = [];
    for (let x = -4; x <= 4; x += 0.1) {
      const exponent = -Math.pow((x - m) / s, 2) / 2;
      const y = (1 / (s * Math.sqrt(2 * Math.PI))) * Math.exp(exponent);
      data.push({ x: (x * s + m).toFixed(1), y: y.toFixed(4) });
    }
    return data;
  };

  const data = generateNormalDistribution(mean, stdDev);

  const calculateZScore = (value) => (value - mean) / stdDev;
  const normalCDF = (z) => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = z < 0 ? -1 : 1;
    z = Math.abs(z) / Math.sqrt(2);
    const t = 1 / (1 + p * z);
    const t2 = t * Math.exp(-z * z - 1.26551223 + t * (a1 + t * (a2 + t * (a3 + t * (a4 + t * a5)))));
    return 0.5 * (1 + sign * t2);
  };

  return (
    <section id="chapter3" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Chapter 3: Statistical Distributions</h2>
          <p className="text-gray-300 text-lg">
            Exploring distribution models for system variability and performance prediction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { name: 'Binomial', desc: 'Discrete outcomes (pass/fail)', icon: '🎯' },
            { name: 'Poisson', desc: 'Event count in time interval', icon: '⏱️' },
            { name: 'Normal', desc: 'Continuous natural variation', icon: '📊' }
          ].map((dist, idx) => (
            <motion.div
              key={idx}
              className="glass p-6 rounded-lg border border-neon-blue/30 cursor-pointer hover:border-neon-cyan transition"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-2">{dist.icon}</div>
              <h4 className="font-bold text-neon-cyan mb-2">{dist.name}</h4>
              <p className="text-sm text-gray-400">{dist.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Normal Distribution Explorer</h3>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Mean (μ): {mean.toFixed(1)}</label>
                <Slider value={mean + 5} onChange={(v) => setMean(v - 5)} min={0} max={10} />
              </div>

              <div>
                <label className="block text-sm mb-2">Std Dev (σ): {stdDev.toFixed(2)}</label>
                <Slider value={stdDev * 100} onChange={(v) => setStdDev(v / 100)} min={20} max={300} />
              </div>

              <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded">
                <h4 className="font-bold text-neon-cyan mb-3">68-95-99.7 Rule</h4>
                <div className="space-y-2 text-sm">
                  <p>μ ± σ: <span className="text-neon-cyan font-bold">68%</span> of data</p>
                  <p>μ ± 2σ: <span className="text-neon-cyan font-bold">95%</span> of data</p>
                  <p>μ ± 3σ: <span className="text-neon-cyan font-bold">99.7%</span> of data</p>
                </div>
              </div>
            </div>

            <div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorY" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#00D9FF" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#00D9FF20" />
                  <XAxis stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #00D9FF' }} />
                  <Area type="monotone" dataKey="y" stroke="#00D9FF" fill="url(#colorY)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Z-Score Calculator</h3>

          <div className="grid md:grid-cols-2 gap-8">
            {[100, 105, 95, 110].map((val) => {
              const z = calculateZScore(val);
              const percentile = (normalCDF(z) * 100).toFixed(2);
              return (
                <motion.div
                  key={val}
                  className="p-4 border border-neon-cyan/20 rounded-lg"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="text-sm text-gray-400 mb-2">Value: {val}</div>
                  <div className="font-mono text-neon-cyan font-bold mb-2">Z = {z.toFixed(3)}</div>
                  <div className="text-sm text-gray-400">Percentile: {percentile}%</div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Central Limit Theorem</h3>
          <div className="text-gray-300 space-y-3">
            <p>
              Regardless of the original distribution shape, when you take many random samples and calculate their means, those means follow a <strong>normal distribution</strong>.
            </p>
            <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded">
              <p className="text-sm"><strong>Automation Impact:</strong> This theorem justifies using normal distribution for average measurements in robotic systems, even when individual samples vary.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
