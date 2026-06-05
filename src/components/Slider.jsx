import React from 'react';

function Slider({ value, onChange, min, max }) {
  return (
    <input
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-neon-blue/20 rounded-lg appearance-none cursor-pointer accent-neon-cyan"
      style={{
        background: `linear-gradient(to right, #00D9FF 0%, #00D9FF ${((value - min) / (max - min)) * 100}%, #00D9FF20 ${((value - min) / (max - min)) * 100}%, #00D9FF20 100%)`
      }}
    />
  );
}

export { Slider };
export default Slider;
