import React, { useState, useRef, useEffect } from "react";
import { useInView } from "./anim.jsx";

const ORANGE = "#F07E26";
const GREEN  = "#94C356";
const BLACK  = "#14141B";
const CRAFT  = "#B8B7A4";

const STAGE_LABELS = {
  poc:        "Proof of Concept (PoC)",
  jda:        "Industrialization (JDA)",
  commercial: "Commercialization / Series",
  completed:  "Completed",
};

/* Automotive-style interactive progress bar: thin track, filled portion
   in the stage color, animated width on scroll-in, hover tooltip per stage. */
const ProgressBar = ({ color, filled, total, stages, dark, animate }) => {
  const [hovered, setHovered] = useState(null);
  const pct = Math.round((filled / total) * 100);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (animate) {
      const t = setTimeout(() => setWidth(pct), 100);
      return () => clearTimeout(t);
    }
  }, [animate, pct]);

  return (
    <div className="flex items-center gap-3 w-full">
      {/* Track */}
      <div className="relative flex-1 h-2 rounded-full overflow-hidden"
        style={{ background: dark ? "#2A2A33" : "#D8D7CF" }}>
        {/* Filled */}
        <div className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${animate ? width : pct}%`,
            background: color,
            transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)",
            boxShadow: animate ? `0 0 8px ${color}60` : "none",
          }} />
        {/* Stage tick markers */}
        <div className="absolute inset-0 flex">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="relative flex-1"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}>
              {/* Tick divider */}
              {i > 0 && (
                <div className="absolute top-0 bottom-0 w-px"
                  style={{ background: dark ? "#14141B" : "#B8B7A4", opacity: 0.5 }} />
              )}
              {/* Hover tooltip */}
              {hovered === i && stages && stages[i] && (
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider pointer-events-none z-50"
                  style={{
                    background: "rgba(20,20,27,0.95)",
                    color: i < filled ? color : (dark ? "#888" : "#666"),
                    border: `1px solid ${i < filled ? color + "40" : (dark ? "#444" : "#ccc")}`,
                    animation: "fadeInUp 0.2s ease-out",
                  }}>
                  {stages[i]}
                  <span className="absolute top-full left-1/2 -translate-x-1/2 w-1.5 h-1.5 rotate-45"
                    style={{
                      background: "rgba(20,20,27,0.95)",
                      borderRight: `1px solid ${i < filled ? color + "40" : (dark ? "#444" : "#ccc")}`,
                      borderBottom: `1px solid ${i < filled ? color + "40" : (dark ? "#444" : "#ccc")}`,
                    }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Percentage label */}
      <span className="text-xs font-black tabular-nums shrink-0"
        style={{ color: dark ? "#B8B7A4" : "#14141B", minWidth: 36, textAlign: "right" }}>
        {animate ? width : pct}%
      </span>
    </div>
  );
};

const StageRow = ({ color, label, filled, total, stages, dark, animate, delay }) => (
  <div className="mb-5"
    style={{
      opacity: animate ? 1 : 0,
      transform: animate ? "translateY(0)" : "translateY(15px)",
      transition: `opacity 0.5s ease-out ${delay}ms, transform 0.5s ease-out ${delay}ms`,
    }}>
    <div className="flex items-center justify-between mb-2">
      <span className="text-[11px] font-black uppercase tracking-widest"
        style={{ color: dark ? "#B8B7A4" : "#14141B" }}>
        {label}
      </span>
      <span className="text-[11px] font-bold tabular-nums"
        style={{ color: dark ? "#666" : "#999" }}>
        {filled}/{total}
      </span>
    </div>
    <ProgressBar color={color} filled={filled} total={total} stages={stages} dark={dark} animate={animate} />
  </div>
);

const PARTNERS = [
  { name: "INTEDGE",    bg: "#fff",    color: BLACK },
  { name: "SpartanPac", bg: "#fff",    color: BLACK },
  { name: "zomato",     bg: "#E23744", color: "#fff" },
];

const LEGEND = [
  { color: GREEN,  label: STAGE_LABELS.poc },
  { color: ORANGE, label: STAGE_LABELS.jda },
  { color: "#fff", label: STAGE_LABELS.commercial },
  { color: "#555", label: STAGE_LABELS.completed },
];

const ThermalLogisticsPOCTracker = ({ dark }) => {
  const [ref, inView] = useInView();
  const cardBg = dark ? "bg-[#1C1C24] border-zinc-700" : "bg-white border-zinc-200";
  const text   = dark ? "text-[#B8B7A4]" : "text-[#14141B]";

  return (
    <div ref={ref} className="space-y-8">
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } }`}</style>

      {/* ── Main tracker card ── */}
      <div
        className={`rounded-2xl border p-8 transition-all duration-700 ${cardBg}`}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest block mb-2" style={{ color: ORANGE }}>
              // Thermal Logistics — Food Delivery
            </span>
            <h3 className={`text-2xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              POC Pipeline &amp; Traction
            </h3>
          </div>
          <div className={`text-right text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ background: GREEN }} />
              <span className="relative w-2 h-2 rounded-full" style={{ background: GREEN }} />
            </span>
            Live data
          </div>
        </div>

        {/* Progress bars — automotive style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-2 mb-8">
          <StageRow
            color={GREEN}
            label="PoCs"
            filled={3}
            total={5}
            dark={dark}
            animate={inView}
            delay={200}
            stages={["PoC 1 — INTEDGE", "PoC 2 — SpartanPac", "PoC 3 — Zomato", "PoC 4 — Pending", "PoC 5 — Pending"]}
          />
          <StageRow
            color={ORANGE}
            label="Joint Development"
            filled={1}
            total={3}
            dark={dark}
            animate={inView}
            delay={400}
            stages={["JDA 1 — INTEDGE", "JDA 2 — Pending", "JDA 3 — Pending"]}
          />
          <StageRow
            color={dark ? "#E8E7E0" : "#14141B"}
            label="Commercialization"
            filled={1}
            total={3}
            dark={dark}
            animate={inView}
            delay={600}
            stages={["Commercial 1 — SpartanPac", "Commercial 2 — Pending", "Commercial 3 — Pending"]}
          />
        </div>

        {/* Applications & Partners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.5s ease-out 700ms, transform 0.5s ease-out 700ms",
            }}
          >
            <span className={`text-sm font-black uppercase tracking-widest block mb-3 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
              1 Application
            </span>
            <ul className="space-y-1">
              <li className={`flex items-center gap-2 text-sm ${text}`}>
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: ORANGE }} />
                Food delivery box
              </li>
            </ul>
          </div>

          <div
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateY(0)" : "translateY(15px)",
              transition: "opacity 0.5s ease-out 850ms, transform 0.5s ease-out 850ms",
            }}
          >
            <span className={`text-sm font-black uppercase tracking-widest block mb-3 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>
              3 Partners
            </span>
            <div className="flex flex-wrap gap-3">
              {PARTNERS.map(({ name, bg, color }, i) => (
                <span key={name}
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-black tracking-wide transition-all duration-200 hover:scale-110 hover:-rotate-1"
                  style={{
                    background: bg, color,
                    opacity: inView ? 1 : 0,
                    transform: inView ? "translateY(0)" : "translateY(10px)",
                    transition: `opacity 0.4s ease-out ${900 + i * 100}ms, transform 0.2s ease-out, background 0.2s`,
                  }}>
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className={`flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-wider transition-all duration-700 ${dark ? "text-zinc-500" : "text-zinc-400"}`}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(10px)",
          transitionDelay: "1000ms",
        }}>
        {LEGEND.map(({ color, label }) => (
          <span key={label} className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full border border-white/30 transition-transform duration-200 group-hover:scale-125" style={{ background: color }} />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ThermalLogisticsPOCTracker;
