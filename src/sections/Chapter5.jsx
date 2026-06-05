import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ScatterChart, Scatter, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Slider } from '../components/Slider';

export default function Chapter5() {
  const [slope, setSlope] = useState(2);
  const [intercept, setIntercept] = useState(1);
  const [correlation, setCorrelation] = useState(0.85);

  const generateRegressionData = () => {
    const data = [];
    for (let x = 0; x <= 10; x += 1) {
      const y = intercept + slope * x + (Math.random() - 0.5) * 5 * (1 - correlation);
      data.push({ x, y, predicted: intercept + slope * x });
    }
    return data;
  };

  const data = generateRegressionData();

  const calculateR2 = () => {
    const mean = data.reduce((sum, p) => sum + p.y, 0) / data.length;
    const ssTot = data.reduce((sum, p) => sum + Math.pow(p.y - mean, 2), 0);
    const ssRes = data.reduce((sum, p) => sum + Math.pow(p.y - p.predicted, 2), 0);
    return (1 - ssRes / ssTot).toFixed(3);
  };

  return (
    <section id="chapter5" className="min-h-screen py-20 px-4 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-bold gradient-text mb-4">Chapter 5: Regression Modeling</h2>
          <p className="text-gray-300 text-lg">
            Predicting system behavior through relationship modeling
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-neon-cyan mb-6">Regression Laboratory</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm mb-2">Slope (m): {slope.toFixed(2)}</label>
                <Slider value={slope + 5} onChange={(v) => setSlope(v - 5)} min={0} max={10} />
              </div>

              <div>
                <label className="block text-sm mb-2">Intercept (b): {intercept.toFixed(2)}</label>
                <Slider value={intercept + 5} onChange={(v) => setIntercept(v - 5)} min={0} max={10} />
              </div>

              <div>
                <label className="block text-sm mb-2">Correlation (r): {correlation.toFixed(2)}</label>
                <Slider value={correlation * 100} onChange={(v) => setCorrelation(v / 100)} min={0} max={100} />
              </div>

              <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded">
                <div className="text-sm text-gray-400 mb-2">R² (Coefficient of Determination)</div>
                <div className="text-3xl font-bold text-neon-cyan">{calculateR2()}</div>
                <p className="text-xs text-gray-500 mt-2">Proportion of variance explained</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="glass p-8 rounded-xl border border-neon-blue/30"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold text-neon-cyan mb-4">Scatter Plot with Regression</h3>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#00D9FF20" />
                <XAxis type="number" stroke="#666" />
                <YAxis type="number" stroke="#666" />
                <Tooltip contentStyle={{ background: '#0A0E27', border: '1px solid #00D9FF' }} />
                <Scatter name="Data" data={data} fill="#00D9FF" />
                <Scatter
                  name="Fit"
                  data={data}
                  fill="none"
                  line={{ stroke: '#BB86FC', strokeWidth: 2 }}
                  shape="line"
                />
              </ScatterChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        <motion.div
          className="glass p-8 rounded-xl border border-neon-blue/30 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold text-neon-cyan mb-6">Types of Regression</h3>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                name: 'Simple Linear',
                formula: 'Y = b₀ + b₁X',
                use: 'One predictor variable',
                icon: '📈'
              },
              {
                name: 'Multiple Linear',
                formula: 'Y = b₀ + b₁X₁ + b₂X₂...',
                use: 'Multiple predictor variables',
                icon: '📊'
              },
              {
                name: 'Logistic',
                formula: 'P(Y=1) = e^(b₀+b₁X) / (1+e^(b₀+b₁X))',
                use: 'Binary classification',
                icon: '🎯'
              },
              {
                name: 'Polynomial',
                formula: 'Y = b₀ + b₁X + b₂X²...',
                use: 'Non-linear relationships',
                icon: '↗️'
              }
            ].map((reg, idx) => (
              <motion.div
                key={idx}
                className="p-4 border border-neon-cyan/20 rounded-lg hover:bg-neon-cyan/5 transition"
                whileHover={{ scale: 1.02 }}
              >
                <div className="text-2xl mb-2">{reg.icon}</div>
                <h4 className="font-bold text-neon-cyan mb-1">{reg.name}</h4>
                <div className="font-mono text-xs text-neon-blue mb-2">{reg.formula}</div>
                <p className="text-xs text-gray-400">{reg.use}</p>
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
          <h3 className="text-2xl font-bold text-neon-cyan mb-4">Model Validation Checklist</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Linearity: Relationship is linear',
              'Independence: Observations are independent',
              'Normality: Residuals are normally distributed',
              'Homoscedasticity: Constant variance',
              'No Multicollinearity: Predictors not correlated',
              'R² > 0.7: Model explains variation'
            ].map((check, idx) => (
              <motion.div
                key={idx}
                className="p-3 border border-neon-cyan/20 rounded flex items-start gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-neon-cyan mt-1">✓</span>
                <span className="text-sm text-gray-300">{check}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
