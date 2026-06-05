import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, LineChart, Line, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Slider } from '../components/Slider';

export default function Chapter1() {
  const [sampleSize, setSampleSize] = useState(50);
  const [outlierCount, setOutlierCount] = useState(0);

  const generateData = () => {
    const data = [];
    for (let i = 0; i < sampleSize; i++) {
      const baseValue = 100 + (Math.random() - 0.5) * 40;
      data.push({
        id: i,
        value: baseValue,
        category: 'Sample'
      });
    }
    for (let i = 0; i < outlierCount; i++) {
      data.push({
        id: sampleSize + i,
        value: Math.random() > 0.5 ? 150 + Math.random() * 30 : 50 - Math.random() * 30,
        category: 'Outlier'
      });
    }
    return data;
  };

  const data = generateData();
  const mean = data.reduce((sum, d) => sum + d.value, 0) / data.length;
  const variance = data.reduce((sum, d) => sum + Math.pow(d.value - mean, 2), 0) / data.length;
  const stdDev = Math.sqrt(variance);

  return (
    <section id="chapter1" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Chapter 1: Data Characterization</h2>
          <p className="text-gray-300 text-lg">
            Understanding data distribution, central tendency, and dispersion in automation systems
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            whileHover={{ borderColor: 'rgba(0, 217, 255, 0.6)' }}
          >
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">Interactive Data Playground</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Sample Size: {sampleSize}</label>
                <Slider
                  value={sampleSize}
                  onChange={setSampleSize}
                  min={10}
                  max={200}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Outliers: {outlierCount}</label>
                <Slider
                  value={outlierCount}
                  onChange={setOutlierCount}
                  min={0}
                  max={10}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-neon-blue/10 p-4 rounded border border-neon-blue/20">
                  <div className="text-sm text-gray-400">Mean</div>
                  <div className="text-2xl font-bold text-neon-cyan">{mean.toFixed(2)}</div>
                </div>
                <div className="bg-neon-blue/10 p-4 rounded border border-neon-blue/20">
                  <div className="text-sm text-gray-400">Std Dev</div>
                  <div className="text-2xl font-bold text-neon-cyan">{stdDev.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 20, opacity: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-neon-cyan mb-4">Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.slice(0, 20)}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00D9FF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#00D9FF20" />
                <XAxis stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #00D9FF' }} />
                <Area type="monotone" dataKey="value" stroke="#00D9FF" fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Concept: Measures of Central Tendency</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Mean',
                description: 'Sum of all values divided by count',
                emoji: '∑',
                value: mean.toFixed(2)
              },
              {
                title: 'Median',
                description: 'Middle value when sorted',
                emoji: '📊',
                value: 'Middle'
              },
              {
                title: 'Mode',
                description: 'Most frequently occurring value',
                emoji: '⭐',
                value: 'Peak'
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="p-4 border border-neon-cyan/30 rounded-lg hover:bg-neon-cyan/5 transition"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl mb-2">{item.emoji}</div>
                <h4 className="font-bold text-neon-cyan mb-2">{item.title}</h4>
                <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                <div className="text-lg font-mono text-neon-blue">{item.value}</div>
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
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Engineering Application</h3>
          <div className="text-gray-300 space-y-3">
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">→</span>
              <span><strong>Robotic Arm Accuracy:</strong> Mean position error indicates calibration quality</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">→</span>
              <span><strong>Manufacturing Precision:</strong> Standard deviation shows consistency</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-neon-cyan">→</span>
              <span><strong>Quality Control:</strong> Outlier detection prevents defective parts</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
