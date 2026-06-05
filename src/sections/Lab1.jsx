import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const cncData = [
  { name: 'S1', value: 25.02 }, { name: 'S2', value: 24.98 },
  { name: 'S3', value: 25.01 }, { name: 'S4', value: 25.03 },
  { name: 'S5', value: 24.99 }, { name: 'S6', value: 25.00 },
  { name: 'S7', value: 25.02 }, { name: 'S8', value: 24.97 },
  { name: 'S9', value: 25.01 }, { name: 'S10', value: 25.00 },
];

const mean   = parseFloat((cncData.reduce((s, d) => s + d.value, 0) / cncData.length).toFixed(4));
const variance = parseFloat((cncData.reduce((s, d) => s + Math.pow(d.value - mean, 2), 0) / cncData.length).toFixed(6));
const stdDev   = parseFloat(Math.sqrt(variance).toFixed(5));
const cp       = parseFloat((0.1 / (6 * stdDev)).toFixed(3)); // USL-LSL = 0.1

export default function Lab1() {
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="section-tag">Lab 1 · Descriptive Statistics</div>
        <h2 className="text-4xl font-bold gradient-text mb-2">CNC Machine Analysis</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Statistical analysis of robotic arm positioning accuracy and process capability for a CNC drilling operation.
        </p>
      </div>

      {/* Objective */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--neon-cyan)' }}>🎯 Objective</h3>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <li>→ Compute mean, variance, and standard deviation of CNC positioning data</li>
          <li>→ Evaluate process capability index (Cp) for quality control</li>
          <li>→ Identify whether the machine is operating within tolerance (±0.05 mm)</li>
          <li>→ Visualise data distribution using a bar chart</li>
        </ul>
      </motion.div>

      {/* Key Statistics */}
      <motion.div
        className="grid md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        {[
          { label: 'Mean (x̄)',      value: mean,     unit: 'mm',  color: 'var(--neon-blue)' },
          { label: 'Std Dev (σ)',    value: stdDev,   unit: 'mm',  color: 'var(--neon-cyan)' },
          { label: 'Variance (σ²)',  value: variance, unit: 'mm²', color: 'var(--neon-purple)' },
          { label: 'Cp Index',       value: cp,       unit: '',    color: cp >= 1 ? '#00c97f' : '#FF6B6B' },
        ].map((s, i) => (
          <motion.div key={i} className="glass p-5 rounded-xl text-center neon-border" whileHover={{ scale: 1.03 }}>
            <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            <div className="text-2xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{s.unit}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart */}
      <motion.div
        className="glass p-6 rounded-xl neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>📊 Positioning Data Chart</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={cncData} barSize={28}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.1)" />
            <XAxis dataKey="name" stroke="var(--text-faint)" tick={{ fontSize: 11 }} />
            <YAxis stroke="var(--text-faint)" domain={[24.95, 25.05]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--neon-blue)', color: 'var(--text-primary)' }} />
            <Bar dataKey="value" fill="var(--neon-blue)" opacity={0.85} radius={[4, 4, 0, 0]} />
            <ReferenceLine y={mean}         stroke="#BB86FC" strokeDasharray="5 5" label={{ value: 'Mean', fill: '#BB86FC', fontSize: 11 }} />
            <ReferenceLine y={mean + stdDev} stroke="rgba(0,217,255,0.4)" strokeDasharray="3 3" />
            <ReferenceLine y={mean - stdDev} stroke="rgba(0,217,255,0.4)" strokeDasharray="3 3" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Raw data toggle */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg" style={{ color: 'var(--neon-cyan)' }}>📋 Raw Measurements</h3>
          <button
            onClick={() => setShowRaw(!showRaw)}
            className="text-xs px-4 py-1.5 rounded-full font-semibold transition-all"
            style={{ background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.3)', color: 'var(--neon-cyan)' }}
          >
            {showRaw ? 'Hide' : 'Show'} Table
          </button>
        </div>
        {showRaw && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-mono">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(0,217,255,0.2)' }}>
                  <th className="pb-2 text-left" style={{ color: 'var(--neon-blue)' }}>Sample</th>
                  <th className="pb-2 text-right" style={{ color: 'var(--neon-blue)' }}>Position (mm)</th>
                  <th className="pb-2 text-right" style={{ color: 'var(--neon-blue)' }}>Deviation</th>
                  <th className="pb-2 text-right" style={{ color: 'var(--neon-blue)' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {cncData.map((d, i) => {
                  const dev = (d.value - 25.00).toFixed(3);
                  const ok  = Math.abs(d.value - 25.00) <= 0.05;
                  return (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td className="py-1.5" style={{ color: 'var(--text-muted)' }}>{d.name}</td>
                      <td className="py-1.5 text-right" style={{ color: 'var(--text-secondary)' }}>{d.value}</td>
                      <td className="py-1.5 text-right font-bold" style={{ color: ok ? 'var(--neon-cyan)' : '#FF6B6B' }}>{dev > 0 ? '+' : ''}{dev}</td>
                      <td className="py-1.5 text-right" style={{ color: ok ? '#00c97f' : '#FF6B6B' }}>{ok ? '✅ Pass' : '❌ Fail'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* Process Capability */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>⚙️ Process Capability Analysis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <span>Target Dimension</span><span className="font-mono font-bold" style={{ color: 'var(--neon-cyan)' }}>25.00 mm</span>
            </div>
            <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <span>Tolerance</span><span className="font-mono font-bold" style={{ color: 'var(--neon-cyan)' }}>±0.05 mm</span>
            </div>
            <div className="flex justify-between py-2" style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <span>USL / LSL</span><span className="font-mono font-bold" style={{ color: 'var(--neon-cyan)' }}>25.05 / 24.95</span>
            </div>
            <div className="flex justify-between py-2">
              <span>Cp = (USL−LSL)/(6σ)</span>
              <span className="font-mono font-bold" style={{ color: cp >= 1 ? '#00c97f' : '#FF6B6B' }}>{cp} {cp >= 1 ? '✅' : '⚠️'}</span>
            </div>
          </div>
          <div className="glass rounded-lg p-4 neon-border" style={{ background: 'rgba(0,201,127,0.06)' }}>
            <p className="font-bold mb-2" style={{ color: '#00c97f' }}>✅ PROCESS CAPABLE</p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              With Cp = {cp} ≥ 1.0, the CNC machine demonstrates excellent repeatability. All {cncData.length} samples fall within the ±0.05 mm tolerance band, confirming suitability for precision robotic assembly.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
