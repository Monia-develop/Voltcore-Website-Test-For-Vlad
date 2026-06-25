import React, { useState } from "react";

const PerformanceSimulator2 = () => {
  const [p2View, setP2View] = useState("after");

  return (
    <div className="space-y-4 pt-2">
      <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setP2View("before")} 
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${p2View === "before" ? "bg-red-500 text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
        >
          Zig-Zag Wire Mats (Before)
        </button>
        <button 
          onClick={() => setP2View("after")} 
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${p2View === "after" ? "bg-emerald-500 text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
        >
          Voltcore Mesh (After)
        </button>
      </div>

      <div className={`p-5 rounded-2xl border transition-all duration-300 ${p2View === "before" ? "bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900/30" : "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/30"}`}>
        {p2View === "before" ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">⚠️ <strong>Single-Line Loops:</strong> Heat concentrates strictly on the localized wire tracks, leaving vast cold spaces. Puncturing a single wire breaks the loop, destroying the entire component.</p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">✨ <strong>Continuous Thermal Matrix:</strong> Radiant heat spreads seamlessly across 100% of the area. Even if sliced or cut, current auto-routes around the gap with zero power loss.</p>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Thermal Distribution Uniformity (%)</span>
        <div className="space-y-1 bg-gray-50 dark:bg-zinc-900/30 p-3 rounded-xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-red-500">Standard Wire Mat</span>
            <span>42% surface coverage</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: "42%" }}></div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-2 mb-1">
            <span className="text-emerald-500">Voltcore Uniform Mesh</span>
            <span>98% surface coverage</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "98%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSimulator2;