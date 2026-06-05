import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Lab1() {
  const [showDetails, setShowDetails] = useState(false);

  const cncData = [
    { name: 'Sample 1', value: 25.02 },
    { name: 'Sample 2', value: 24.98 },
    { name: 'Sample 3', value: 25.01 },
    { name: 'Sample 4', value: 25.03 },
    { name: 'Sample 5', value: 24.99 },
    { name: 'Sample 6', value: 25.00 },
    { name: 'Sample 7', value: 25.02 },
    { name: 'Sample 8', value: 24.97 }
  ];

  const mean = (cncData.reduce((sum, d) => sum + d.value, 0) / cncData.length).toFixed(3);
  const variance = (cncData.reduce((sum, d) => sum + Math.pow(d.value - mean, 2), 0) / cncData.length).toFixed(4);
  const stdDev = Math.sqrt(variance).toFixed(4);

  return (
    <section id="lab1" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Lab 1: CNC Machine Analysis</h2>
          <p className="text-gray-300 text-lg">
            Statistical analysis of robotic arm positioning accuracy and repeatability
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: 'Mean', value: mean, unit: 'mm', color: 'neon-blue' },
            { label: 'Std Dev', value: stdDev, unit: 'mm', color: 'neon-cyan' },
            { label: 'Variance', value: variance, unit: 'mm²', color: 'neon-purple' }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              className={`glass p-6 rounded-lg border border-${stat.color}/30`}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className={`text-3xl font-bold text-${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-2">{stat.unit}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Machine Positioning Data</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={cncData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#00D9FF20" />
              <XAxis stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #00D9FF' }} />
              <Bar dataKey="value" fill="#00D9FF" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Process Capability</h3>
          <div className="space-y-4">
            <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded">
              <p className="text-sm text-gray-300 mb-2"><strong>Target:</strong> 25.00 mm</p>
              <p className="text-sm text-gray-300 mb-2"><strong>Tolerance:</strong> ±0.05 mm</p>
              <p className="text-sm text-gray-300"><strong>Capability:</strong> Process is within spec - PASS</p>
            </div>
            <div className="p-4 bg-neon-cyan/10 border border-neon-cyan/30 rounded">
              <p className="text-sm text-gray-300">The CNC machine demonstrates excellent repeatability with low variance, making it suitable for precision assembly applications.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
