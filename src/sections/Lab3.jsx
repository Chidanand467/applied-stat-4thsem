import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Area, AreaChart
} from 'recharts';

function normalPDF(x, mean, std) {
  return (1 / (std * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / std, 2));
}

export default function Lab3() {
  const [mean, setMean] = useState(70);
  const [std, setStd] = useState(10);
  const [zValue, setZValue] = useState(80);

  const generateCurve = () => {
    const points = [];
    for (let x = mean - 4 * std; x <= mean + 4 * std; x += std / 10) {
      points.push({ x: parseFloat(x.toFixed(2)), y: parseFloat(normalPDF(x, mean, std).toFixed(5)) });
    }
    return points;
  };

  const curveData = generateCurve();
  const zScore = ((zValue - mean) / std).toFixed(3);
  const percentile = (0.5 * (1 + erf((zValue - mean) / (std * Math.SQRT2))) * 100).toFixed(2);

  function erf(x) {
    const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741;
    const a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    const sign = x < 0 ? -1 : 1;
    x = Math.abs(x);
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
    return sign * y;
  }

  const observations = [62, 68, 71, 74, 65, 69, 73, 70, 66, 72, 75, 67, 71, 68, 74, 63, 70, 72, 69, 71];
  const obsMean = (observations.reduce((a, b) => a + b, 0) / observations.length).toFixed(2);
  const obsStd = Math.sqrt(observations.reduce((s, v) => s + Math.pow(v - obsMean, 2), 0) / observations.length).toFixed(2);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="section-tag">Lab 3 · Statistical Distributions</div>
        <h2 className="text-4xl font-bold gradient-text mb-2">Normal Distribution Analysis</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Analysing tensile strength distribution of steel components using Normal / Gaussian distribution and Z-score standardisation.
        </p>
      </div>

      {/* Objective */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--neon-cyan)' }}>🎯 Objective</h3>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <li>→ Verify that manufacturing data follows a normal distribution</li>
          <li>→ Calculate Z-scores and percentile ranks for component quality</li>
          <li>→ Apply the 68–95–99.7 empirical rule to set quality thresholds</li>
          <li>→ Determine process capability for precision-machined parts</li>
        </ul>
      </motion.div>

      {/* Observed Data */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>📋 Observed Tensile Strength Data (MPa)</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {observations.map((v, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-xs font-mono font-bold"
              style={{ background: 'rgba(0,217,255,0.1)', border: '1px solid rgba(0,217,255,0.2)', color: 'var(--neon-cyan)' }}>
              {v}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Sample Mean (x̄)', value: obsMean + ' MPa', color: 'var(--neon-blue)' },
            { label: 'Std Deviation (σ)', value: obsStd + ' MPa', color: 'var(--neon-cyan)' },
            { label: 'Sample Size (n)', value: observations.length, color: 'var(--neon-purple)' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-lg p-4 text-center neon-border">
              <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Interactive Bell Curve */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>🔔 Interactive Bell Curve</h3>
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {[
            { label: 'Mean (μ)', value: mean, setter: setMean, min: 40, max: 100 },
            { label: 'Std Dev (σ)', value: std, setter: setStd, min: 2, max: 25 },
            { label: 'Test Value (x)', value: zValue, setter: setZValue, min: mean - 4*std, max: mean + 4*std },
          ].map((ctrl, i) => (
            <div key={i}>
              <label className="block text-xs mb-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {ctrl.label}: <span style={{ color: 'var(--neon-cyan)' }}>{ctrl.value}</span>
              </label>
              <input type="range" min={ctrl.min} max={ctrl.max} value={ctrl.value}
                onChange={e => ctrl.setter(Number(e.target.value))}
                className="w-full accent-cyan-400" />
            </div>
          ))}
        </div>

        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={curveData}>
            <defs>
              <linearGradient id="bellGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00D9FF" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#00D9FF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.1)" />
            <XAxis dataKey="x" stroke="var(--text-faint)" tick={{ fontSize: 11 }} />
            <YAxis stroke="var(--text-faint)" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--neon-blue)', color: 'var(--text-primary)' }} />
            <Area type="monotone" dataKey="y" stroke="#00D9FF" fill="url(#bellGrad)" strokeWidth={2} dot={false} />
            <ReferenceLine x={mean} stroke="#BB86FC" strokeDasharray="5 5" label={{ value: 'μ', fill: '#BB86FC', fontSize: 12 }} />
            <ReferenceLine x={Number(zValue)} stroke="#FFD700" strokeDasharray="5 5" label={{ value: 'x', fill: '#FFD700', fontSize: 12 }} />
          </AreaChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="glass rounded-lg p-4 neon-border text-center">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Z-Score</div>
            <div className="text-3xl font-bold font-mono" style={{ color: 'var(--neon-cyan)' }}>{zScore}</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>z = (x − μ) / σ</div>
          </div>
          <div className="glass rounded-lg p-4 neon-border text-center">
            <div className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>Percentile Rank</div>
            <div className="text-3xl font-bold font-mono" style={{ color: 'var(--neon-purple)' }}>{percentile}%</div>
            <div className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>Area under curve to the left</div>
          </div>
        </div>
      </motion.div>

      {/* Empirical Rule */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>📐 68–95–99.7 Empirical Rule</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { range: '±1σ', pct: '68.27%', lower: (mean - std).toFixed(1), upper: (mean + std).toFixed(1), color: '#00D9FF' },
            { range: '±2σ', pct: '95.45%', lower: (mean - 2*std).toFixed(1), upper: (mean + 2*std).toFixed(1), color: '#BB86FC' },
            { range: '±3σ', pct: '99.73%', lower: (mean - 3*std).toFixed(1), upper: (mean + 3*std).toFixed(1), color: '#FFD700' },
          ].map((r, i) => (
            <div key={i} className="glass rounded-lg p-4 text-center neon-border">
              <div className="text-2xl font-bold mb-1" style={{ color: r.color }}>{r.pct}</div>
              <div className="text-sm font-semibold mb-2" style={{ color: 'var(--text-secondary)' }}>{r.range}</div>
              <div className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>[{r.lower}, {r.upper}] MPa</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Conclusions */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--neon-cyan)' }}>✅ Conclusions</h3>
        <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>The tensile strength data is approximately normally distributed with mean ≈ {obsMean} MPa and σ ≈ {obsStd} MPa.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>Z-scores allow standardised comparison across different manufacturing batches.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>Components with Z &gt; 2 (strength &gt; {(Number(obsMean)+2*Number(obsStd)).toFixed(1)} MPa) can be classified as high-grade.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>The empirical rule enables quick quality threshold setting without requiring full population data.</span></p>
        </div>
      </motion.div>
    </div>
  );
}
