import React, { useEffect, useRef, useState } from "react";
import { FaBolt, FaClock, FaThermometerHalf, FaLayerGroup, FaWeightHanging, FaRecycle, FaChevronDown } from "react-icons/fa";

const ROWS = [
  {
    id: "efficiency",
    icon: FaBolt,
    label: "Thermal Efficiency",
    legacyLabel: "< 40%",
    voltcoreLabel: "85–95%",
    legacyValue: 35,
    voltcoreValue: 90,
    caption: "Higher is better — share of energy directed to the surface",
    impact: "Reduces total thermal energy consumption by up to 2×, directly extending vehicle range.",
  },
  {
    id: "warmup",
    icon: FaClock,
    label: "Warm-Up Velocity",
    legacyLabel: "Baseline",
    voltcoreLabel: "40–70% faster",
    legacyValue: 100,
    voltcoreValue: 45,
    caption: "Shorter bar is better — time to reach passenger comfort",
    impact: "Reaches target passenger comfort zones significantly quicker from a cold start.",
  },
  {
    id: "homogeneity",
    icon: FaThermometerHalf,
    label: "Thermal Homogeneity (ΔT)",
    legacyLabel: "> 10°C",
    voltcoreLabel: "≈ 3–4°C",
    legacyValue: 12,
    voltcoreValue: 3.5,
    caption: "Shorter bar is better — temperature variance across the surface",
    impact: "Complements premium brand standards by completely eliminating cold spots.",
  },
  {
    id: "envelope",
    icon: FaLayerGroup,
    label: "Integration Envelope",
    legacyLabel: "5–13 mm",
    voltcoreLabel: "2–3 mm",
    legacyValue: 9,
    voltcoreValue: 2.5,
    caption: "Shorter bar is better — package thickness beneath the A-surface",
    impact: "Eliminates massive foam spacer layers; allows immediate placement beneath delicate A-surfaces.",
  },
];

const QUALITATIVE = [
  {
    id: "weight",
    icon: FaWeightHanging,
    label: "Linear Weight Profile",
    legacy: "Heavy metallic wiring",
    voltcore: "Ultra-lightweight — 30–60 g/km of filament",
    impact: "Supports aggressive vehicle lightweighting and lower structural mass targets.",
  },
  {
    id: "circularity",
    icon: FaRecycle,
    label: "End-of-Life Circularity",
    legacy: "Non-recyclable composite (complex metal-plastic splitting)",
    voltcore: "100% polymer mono-material matrix",
    impact: "Enables straightforward mechanical recycling, matching strict environmental mandates.",
  },
];

const Row = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.4 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const max = Math.max(row.legacyValue, row.voltcoreValue);
  const legacyPct = (row.legacyValue / max) * 100;
  const voltcorePct = (row.voltcoreValue / max) * 100;
  const Icon = row.icon;

  return (
    <div ref={ref} className="border-b border-zinc-800 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 py-5 text-left group"
      >
        <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-[#3b82f6] flex-shrink-0">
          <Icon size={14} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-sm font-bold text-white">{row.label}</span>
            <span className="text-[11px] text-zinc-500">{row.caption}</span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] w-20 flex-shrink-0 text-zinc-500 font-semibold">Legacy</span>
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-zinc-600 transition-all duration-1000 ease-out"
                  style={{ width: visible ? `${legacyPct}%` : "0%" }}
                />
              </div>
              <span className="text-[11px] w-24 text-right text-zinc-400 font-mono flex-shrink-0">{row.legacyLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] w-20 flex-shrink-0 text-[#3b82f6] font-semibold">Voltcore</span>
              <div className="flex-1 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#3b82f6] to-[#bc13fe] transition-all duration-1000 ease-out delay-150"
                  style={{ width: visible ? `${voltcorePct}%` : "0%" }}
                />
              </div>
              <span className="text-[11px] w-24 text-right text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe] font-mono font-semibold flex-shrink-0">
                {row.voltcoreLabel}
              </span>
            </div>
          </div>
        </div>
        <FaChevronDown
          size={12}
          className={`text-zinc-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-24 pb-5" : "max-h-0"}`}>
        <p className="text-xs text-zinc-400 leading-relaxed pl-[52px]">{row.impact}</p>
      </div>
    </div>
  );
};

const QualRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const Icon = row.icon;
  return (
    <div className="border-b border-zinc-800 last:border-b-0">
      <button type="button" onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 py-5 text-left">
        <div className="w-9 h-9 rounded-xl bg-zinc-900 flex items-center justify-center text-[#3b82f6] flex-shrink-0">
          <Icon size={14} />
        </div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="text-sm font-bold text-white block mb-1">{row.label}</span>
            <span className="text-[11px] text-zinc-500">{row.legacy}</span>
          </div>
          <div className="sm:text-right">
            <span className="text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]">
              {row.voltcore}
            </span>
          </div>
        </div>
        <FaChevronDown
          size={12}
          className={`text-zinc-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-24 pb-5" : "max-h-0"}`}>
        <p className="text-xs text-zinc-400 leading-relaxed pl-[52px]">{row.impact}</p>
      </div>
    </div>
  );
};

const AutomotiveCaseStudy = () => {
  return (
    <div className="rounded-3xl bg-zinc-950 border border-zinc-800 p-6 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
          Head-to-Head Evaluation
        </span>
        <span className="text-[11px] text-zinc-500 font-mono">Voltcore vs. Standard Copper Wire</span>
      </div>
      <p className="text-sm text-zinc-400 mb-6">
        Tap any row to see the system-level impact. All figures from identical automotive power parameters.
      </p>

      <div>
        {ROWS.map((row) => (
          <Row key={row.id} row={row} />
        ))}
        {QUALITATIVE.map((row) => (
          <QualRow key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
};

export default AutomotiveCaseStudy;
