import React, { useState } from "react";

const PerformanceSimulator3 = () => {
  const [p3View, setP3View] = useState("after");

  return (
    <div className="space-y-4 pt-2">
      <div className="flex bg-gray-100 dark:bg-zinc-900 p-1 rounded-xl w-fit">
        <button 
          onClick={() => setP3View("before")} 
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${p3View === "before" ? "bg-red-500 text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
        >
          Heavy Wire Harness (Before)
        </button>
        <button 
          onClick={() => setP3View("after")} 
          className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${p3View === "after" ? "bg-emerald-500 text-white shadow-md" : "text-gray-400 hover:text-gray-600"}`}
        >
          Flat Ribbon System (After)
        </button>
      </div>

      <div className={`p-5 rounded-2xl border transition-all duration-300 ${p3View === "before" ? "bg-red-50/50 dark:bg-red-950/10 border-red-200 dark:border-red-900/30" : "bg-emerald-50/50 dark:bg-emerald-950/10 border-emerald-200 dark:border-emerald-900/30"}`}>
        {p3View === "before" ? (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">⚠️ <strong>Bulky Interconnects:</strong> Round insulated copper cables require tedious routing paths and manual soldering points that are impossible to hide in sleek designs.</p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">✨ <strong>Monolithic Profile:</strong> Integrates custom heating pathways and power bus-bars directly inside a micro-thin ribbon profile with plug-and-play clips.</p>
        )}
      </div>

      <div className="pt-2 space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block">Thickness / Profile Height (mm) - Lower is better</span>
        <div className="space-y-1 bg-gray-50 dark:bg-zinc-900/30 p-3 rounded-xl border border-gray-100 dark:border-zinc-800">
          <div className="flex items-center justify-between text-xs font-semibold mb-1">
            <span className="text-red-500">Standard Insulated Harness</span>
            <span>4.5 mm</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: "90%" }}></div>
          </div>
          <div className="flex items-center justify-between text-xs font-semibold pt-2 mb-1">
            <span className="text-emerald-500">Voltcore Flat Track</span>
            <span>0.3 mm</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: "8%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceSimulator3;