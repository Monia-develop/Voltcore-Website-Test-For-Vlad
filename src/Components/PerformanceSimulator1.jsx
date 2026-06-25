import React, { useState } from "react";

const PerformanceSimulator1 = () => {
  const [p1View, setP1View] = useState("after");

  return (
    <div className="space-y-4 pt-2">
      <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setP1View("before")} 
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${p1View === "before" ? "bg-red-500 text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
        >
          Traditional Copper (Before)
        </button>
        <button 
          onClick={() => setP1View("after")} 
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${p1View === "after" ? "bg-emerald-500 text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
        >
          Voltcore Innovation (After)
        </button>
      </div>

      <div className={`p-5 rounded-2xl border transition-all duration-300 ${p1View === "before" ? "bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900/30" : "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/30"}`}>
        {p1View === "before" ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">⚠️ <strong>Rigid Copper Wires:</strong> Add significant weight, create uncomfortable stiff points in textiles, and suffer from micro-fractures under repetitive bending cycles.</p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">✨ <strong>Microscopic Fiber:</strong> Seamlessly knitted or embroidered by standard machinery. Zero added weight, 100% flexible, and immune to mechanical shearing.</p>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Flexibility & Lifecycle (Bending Cycles)</span>
        <div className="space-y-1 bg-gray-50 dark:bg-zinc-900/30 p-3 rounded-xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-red-500">Classic Copper Wire</span>
            <span>12,000 cycles</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: "15%" }}></div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-2 mb-1">
            <span className="text-emerald-500">Voltcore Filament</span>
            <span>150,000+ cycles</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "100%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSimulator1;