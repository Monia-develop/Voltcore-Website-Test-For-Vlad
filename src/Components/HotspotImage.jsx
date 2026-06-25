import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const HotspotImage = ({ src, alt, hotspots = [] }) => {
  const [activeId, setActiveId] = useState(null);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-black select-none">
      <img src={src} alt={alt} className="w-full h-auto block" draggable={false} />

      {hotspots.map((h, i) => {
        const isActive = activeId === h.id;
        const flip = h.x > 60;
        const dropUp = h.y > 60;

        return (
          <div
            key={h.id}
            className="absolute"
            style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
          >
            <button
              type="button"
              aria-label={h.title}
              onClick={() => setActiveId(isActive ? null : h.id)}
              onMouseEnter={() => setActiveId(h.id)}
              className="relative flex items-center justify-center w-8 h-8 rounded-full focus:outline-none"
            >
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-60 ${
                  isActive ? "animate-none" : "animate-ping"
                } bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]`}
              />
              <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-full bg-black/80 border border-white/70 text-white text-xs font-bold backdrop-blur-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: dropUp ? 8 : -8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  onMouseLeave={() => setActiveId(null)}
                  className="absolute z-10 w-60 rounded-2xl bg-zinc-950/95 border border-zinc-700 shadow-[0_0_25px_rgba(188,19,254,0.18)] p-4"
                  style={{
                    left: flip ? "auto" : "calc(100% + 12px)",
                    right: flip ? "calc(100% + 12px)" : "auto",
                    top: dropUp ? "auto" : "50%",
                    bottom: dropUp ? "50%" : "auto",
                    transform: dropUp ? "translateY(50%)" : "translateY(-50%)",
                  }}
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1 mb-1 leading-snug">{h.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{h.desc}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default HotspotImage;
