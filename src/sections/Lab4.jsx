import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Line, LineChart, ReferenceLine
} from 'recharts';

const rawData = [
  { x: 1.0, y: 2.1 }, { x: 1.5, y: 3.2 }, { x: 2.0, y: 4.0 }, { x: 2.5, y: 5.1 },
  { x: 3.0, y: 5.9 }, { x: 3.5, y: 6.8 }, { x: 4.0, y: 8.2 }, { x: 4.5, y: 9.0 },
  { x: 5.0, y: 10.1 }, { x: 5.5, y: 11.0 }, { x: 6.0, y: 12.3 }, { x: 6.5, y: 13.1 },
  { x: 7.0, y: 13.8 }, { x: 7.5, y: 14.5 }, { x: 8.0, y: 15.9 },
];

function computeRegression(data) {
  const n = data.length;
  const sumX  = data.reduce((s, d) => s + d.x, 0);
  const sumY  = data.reduce((s, d) => s + d.y, 0);
  const sumXY = data.reduce((s, d) => s + d.x * d.y, 0);
  const sumXX = data.reduce((s, d) => s + d.x * d.x, 0);
  const b = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
  const a = (sumY - b * sumX) / n;
  const yMean = sumY / n;
  const ssTot = data.reduce((s, d) => s + Math.pow(d.y - yMean, 2), 0);
  const ssRes = data.reduce((s, d) => s + Math.pow(d.y - (a + b * d.x), 2), 0);
  const r2 = 1 - ssRes / ssTot;
  return { a: a.toFixed(4), b: b.toFixed(4), r2: r2.toFixed(4) };
}

export default function Lab4() {
  const [slope, setSlope] = useState(1.95);
  const [intercept, setIntercept] = useState(0.25);

  const reg = computeRegression(rawData);
  const lineData = rawData.map(d => ({
    x: d.x,
    actual: d.y,
    predicted: parseFloat((Number(intercept) + Number(slope) * d.x).toFixed(3)),
    best: parseFloat((Number(reg.a) + Number(reg.b) * d.x).toFixed(3)),
  }));

  const userSSE = rawData.reduce((s, d) => s + Math.pow(d.y - (Number(intercept) + Number(slope) * d.x), 2), 0).toFixed(3);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="section-tag">Lab 4 · Regression Analysis</div>
        <h2 className="text-4xl font-bold gradient-text mb-2">Simple Linear Regression</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          Modelling the relationship between applied force (kN) and deflection (mm) in a cantilever beam for structural health monitoring.
        </p>
      </div>

      {/* Objective */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--neon-cyan)' }}>🎯 Objective</h3>
        <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <li>→ Fit a Simple Linear Regression model: Deflection = β₀ + β₁ × Force</li>
          <li>→ Compute the Least-Squares estimates of β₀ (intercept) and β₁ (slope)</li>
          <li>→ Evaluate model fit using the Coefficient of Determination (R²)</li>
          <li>→ Use the model to predict deflection for new force values</li>
        </ul>
      </motion.div>

      {/* Observed Data */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>📋 Experimental Data</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(0,217,255,0.2)' }}>
                <th className="pb-2 text-left px-2" style={{ color: 'var(--neon-blue)' }}>Force x (kN)</th>
                {rawData.slice(0, 8).map((d, i) => <th key={i} className="pb-2 px-2" style={{ color: 'var(--text-muted)' }}>{d.x}</th>)}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-2 font-semibold" style={{ color: 'var(--neon-cyan)' }}>Deflection y (mm)</td>
                {rawData.slice(0, 8).map((d, i) => <td key={i} className="py-2 px-2 text-center" style={{ color: 'var(--text-secondary)' }}>{d.y}</td>)}
              </tr>
            </tbody>
          </table>
          <p className="text-xs mt-2" style={{ color: 'var(--text-faint)' }}>Showing first 8 of {rawData.length} observations. Full dataset used in calculations.</p>
        </div>
      </motion.div>

      {/* Best Fit Results */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>📐 Least-Squares Regression Results</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Intercept (β₀)', value: reg.a, unit: 'mm', color: 'var(--neon-blue)' },
            { label: 'Slope (β₁)', value: reg.b, unit: 'mm/kN', color: 'var(--neon-cyan)' },
            { label: 'R² (Goodness of Fit)', value: reg.r2, unit: '', color: 'var(--neon-purple)' },
          ].map((s, i) => (
            <div key={i} className="glass rounded-lg p-4 text-center neon-border">
              <div className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
              <div className="text-3xl font-bold font-mono" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs mt-1" style={{ color: 'var(--text-faint)' }}>{s.unit}</div>
            </div>
          ))}
        </div>
        <div className="glass rounded-lg p-4 neon-border text-center">
          <p className="text-sm font-mono font-bold" style={{ color: 'var(--neon-cyan)' }}>
            ŷ = {reg.a} + {reg.b} × x
          </p>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            Deflection (mm) = {reg.a} + {reg.b} × Force (kN)
          </p>
        </div>
      </motion.div>

      {/* Interactive Regression Playground */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-4" style={{ color: 'var(--neon-cyan)' }}>🎛️ Interactive Regression Playground</h3>
        <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
          Adjust slope and intercept to see how SSE changes. Try to match the optimal (best-fit) line.
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-xs mb-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Slope (β₁): <span style={{ color: 'var(--neon-cyan)' }}>{slope}</span>
            </label>
            <input type="range" min="0.5" max="3.5" step="0.05" value={slope}
              onChange={e => setSlope(Number(e.target.value))}
              className="w-full accent-cyan-400" />
          </div>
          <div>
            <label className="block text-xs mb-2 font-semibold" style={{ color: 'var(--text-secondary)' }}>
              Intercept (β₀): <span style={{ color: 'var(--neon-cyan)' }}>{intercept}</span>
            </label>
            <input type="range" min="-2" max="3" step="0.05" value={intercept}
              onChange={e => setIntercept(Number(e.target.value))}
              className="w-full accent-cyan-400" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="glass rounded-lg p-3 text-center neon-border">
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Your SSE</div>
            <div className="text-2xl font-bold font-mono" style={{ color: '#FFD700' }}>{userSSE}</div>
          </div>
          <div className="glass rounded-lg p-3 text-center neon-border">
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Best Fit SSE</div>
            <div className="text-2xl font-bold font-mono" style={{ color: 'var(--neon-cyan)' }}>
              {rawData.reduce((s, d) => s + Math.pow(d.y - (Number(reg.a) + Number(reg.b) * d.x), 2), 0).toFixed(3)}
            </div>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,217,255,0.1)" />
            <XAxis dataKey="x" stroke="var(--text-faint)" label={{ value: 'Force (kN)', position: 'insideBottom', offset: -2, fill: 'var(--text-muted)', fontSize: 11 }} />
            <YAxis stroke="var(--text-faint)" label={{ value: 'Deflection (mm)', angle: -90, position: 'insideLeft', fill: 'var(--text-muted)', fontSize: 11 }} />
            <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: '1px solid var(--neon-blue)', color: 'var(--text-primary)' }} />
            <Line type="monotone" dataKey="actual" stroke="#FFD700" dot={{ r: 4, fill: '#FFD700' }} name="Actual" strokeWidth={0} />
            <Line type="monotone" dataKey="best" stroke="#00D9FF" strokeWidth={2} dot={false} name="Best Fit" strokeDasharray="0" />
            <Line type="monotone" dataKey="predicted" stroke="#FF6B6B" strokeWidth={2} dot={false} name="Your Line" strokeDasharray="6 3" />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 justify-center text-xs" style={{ color: 'var(--text-muted)' }}>
          <span><span style={{ color: '#FFD700' }}>●</span> Actual Data</span>
          <span><span style={{ color: '#00D9FF' }}>—</span> Best Fit</span>
          <span><span style={{ color: '#FF6B6B' }}>- -</span> Your Line</span>
        </div>
      </motion.div>

      {/* Conclusions */}
      <motion.div
        className="glass rounded-xl p-6 neon-border"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
      >
        <h3 className="font-bold text-lg mb-3" style={{ color: 'var(--neon-cyan)' }}>✅ Conclusions</h3>
        <div className="space-y-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>A strong linear relationship exists between applied force and beam deflection (R² = {reg.r2}).</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>Each 1 kN increase in force causes approximately {reg.b} mm increase in deflection.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>The model ŷ = {reg.a} + {reg.b}x can be used to predict safe load limits in structural monitoring.</span></p>
          <p className="flex gap-2"><span style={{ color: 'var(--neon-cyan)' }}>→</span><span>Least-Squares minimises SSE, giving the statistically optimal line through the data.</span></p>
        </div>
      </motion.div>
    </div>
  );
}
