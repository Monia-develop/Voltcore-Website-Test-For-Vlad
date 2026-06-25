import React, { useState } from "react";

const PerformanceSimulator = () => {
  const [voltage, setVoltage] = useState(12);
  const [hours, setHours] = useState(2);

  const classicConsumption = Math.round(voltage * 3.5 * hours); 
  const voltcoreConsumption = Math.round(voltage * 1.9 * hours);

  const classicWidth = Math.min(100, (classicConsumption / 670) * 100);
  const voltcoreWidth = Math.min(100, (voltcoreConsumption / 670) * 100);

  return (
    <div className="mt-6 p-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 space-y-6 shadow-sm">
      <div className="border-b border-gray-200 dark:border-zinc-800 pb-3">
        <h4 className="text-sm font-black uppercase tracking-wider text-orange-500">🎛️ Live Performance Simulator</h4>
        <p className="text-xs text-gray-400 mt-1">Drag the sliders below to see the consumption chart change in real-time.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex justify-between">
            <span>Input Voltage:</span>
            <span className="text-black dark:text-white font-mono font-bold">{voltage} V</span>
          </label>
          <input 
            type="range" min="5" max="24" value={voltage} 
            onChange={(e) => setVoltage(Number(e.target.value))} 
            className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-gray-500 flex justify-between">
            <span>Duration:</span>
            <span className="text-black dark:text-white font-mono font-bold">{hours} h</span>
          </label>
          <input 
            type="range" min="1" max="8" value={hours} 
            onChange={(e) => setHours(Number(e.target.value))} 
            className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Calculated Power Consumption (Watt-Hours)</span>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-red-500">Traditional High-Voltage Heater</span>
            <span className="font-mono text-red-500 font-bold">{classicConsumption} Wh</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full transition-all duration-150" style={{ width: `${classicWidth}%` }}></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-emerald-500">Voltcore Smart Nano-Matrix</span>
            <span className="font-mono text-emerald-500 font-bold">{voltcoreConsumption} Wh</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-150" style={{ width: `${voltcoreWidth}%` }}></div>
          </div>
        </div>

        <div className="text-center bg-emerald-500/10 text-emerald-500 rounded-xl py-2 text-xs font-bold uppercase tracking-wider border border-emerald-500/20 font-mono">
          ⚡ Energy Saved: {classicConsumption - voltcoreConsumption} Wh ({Math.round(((classicConsumption - voltcoreConsumption) / classicConsumption) * 100)}%)
        </div>
      </div>
    </div>
  );
};

export default PerformanceSimulator;