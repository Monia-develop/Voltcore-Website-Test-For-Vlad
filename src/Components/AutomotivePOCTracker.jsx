import React, { useEffect, useRef, useState } from "react";
import { FaChevronDown, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";

const POC_CATEGORIES = [
  {
    name: "Seat cushion & backrest heating",
    items: [
      { client: "OEM", region: "US", status: "poc" },
      { client: "OEM", region: "Global", status: "poc" },
      { client: "OEM", region: "Europe", status: "poc" },
      { client: "Tier-1", region: "Global", status: "industrialized" },
      { client: "Tier-1", region: "Global", status: "industrialized" },
      { client: "Tier-1", region: "Global", status: "poc" },
      { client: "Tier-1", region: "Global", status: "poc" },
    ],
  },
  {
    name: "Full Comfort Cocoon",
    items: [
      { client: "OEM", region: "Asia", status: "poc" },
      { client: "OEM", region: "Europe", status: "poc" },
    ],
  },
  {
    name: "Glovebox heating & interior trims",
    items: [
      { client: "OEM", region: "Global", status: "poc", label: "Glovebox heating" },
      { client: "Tier-1", region: "Global", status: "industrialized", label: "Glovebox & interior trims" },
      { client: "Tier-1", region: "Europe", status: "industrialized", label: "Over-molding integration" },
      { client: "OEM", region: "Global", status: "poc", label: "Over-molding integration" },
    ],
  },
  {
    name: "Battery heater",
    items: [{ client: "OEM", region: "Asia", status: "poc" }],
  },
  {
    name: "Air-filter integrated heater",
    items: [{ client: "Tier-1", region: "Europe", status: "industrialized" }],
  },
  {
    name: "De-icing & thermal piping",
    items: [{ client: "Tier-1", region: "Europe", status: "industrialized" }],
  },
];

const TOTAL = POC_CATEGORIES.reduce((sum, c) => sum + c.items.length, 0);
const INDUSTRIALIZED = POC_CATEGORIES.reduce(
  (sum, c) => sum + c.items.filter((i) => i.status === "industrialized").length,
  0
);

const StatusPill = ({ status }) =>
  status === "industrialized" ? (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#14141B] bg-[#94C356] border border-[#94C356] rounded-full px-3 py-1 shadow-[0_0_10px_rgba(148,195,86,0.4)]">
      <FaCheckCircle size={10} /> Industrialized
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-white bg-[#F07E26] border border-[#F07E26] rounded-full px-3 py-1 shadow-[0_0_10px_rgba(240,126,38,0.4)]">
      <FaHourglassHalf size={10} /> PoC in progress
    </span>
  );

const useVisible = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  
  return [ref, visible];
};

const CategoryRow = ({ cat, delay, dark }) => {
  const [open, setOpen] = useState(false);
  const [ref, visible] = useVisible();
  const done = cat.items.filter((i) => i.status === "industrialized").length;
  const pct = (done / cat.items.length) * 100;
  
  const border     = dark ? "border-[#2a2a3a]" : "border-zinc-200";
  const cardBg     = dark ? "bg-[#1a1a22]" : "bg-white";
  const cardBorder = dark ? "border-[#2a2a3a] hover:border-[#3a3a4a]" : "border-zinc-200 hover:border-zinc-300";
  const trackBg    = dark ? "bg-[#2a2a3a]" : "bg-zinc-200";
  const textMain   = dark ? "text-white" : "text-[#14141B]";
  const textMuted  = dark ? "text-[#B8B7A4]/60" : "text-zinc-500";
  
  return (
    <div 
      ref={ref} 
      className={`border-b ${border} last:border-b-0 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 py-5 text-left hover:opacity-80 transition-opacity"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
            <span className={`text-sm font-bold ${textMain}`}>{cat.name}</span>
            <span className={`text-[11px] font-mono font-bold ${dark ? "text-[#94C356]" : "text-[#94C356]"}`}>
              {done}/{cat.items.length} industrialized
            </span>
          </div>
          <div className={`h-2.5 rounded-full ${trackBg} overflow-hidden`}>
            <div
              className="h-full rounded-full bg-[#94C356] transition-all ease-out shadow-[0_0_8px_rgba(148,195,86,0.5)]"
              style={{ 
                width: visible ? `${pct}%` : "0%", 
                transitionDuration: "1200ms", 
                transitionDelay: `${delay + 200}ms` 
              }}
            />
          </div>
        </div>
        <FaChevronDown
          size={12}
          className={`${textMuted} flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-96 pb-5" : "max-h-0"}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {cat.items.map((it, i) => (
            <div
              key={i}
              className={`flex items-center justify-between gap-3 rounded-xl ${cardBg} border ${cardBorder} px-3 py-2.5 transition-all duration-300 hover:scale-[1.02] ${
                visible ? "opacity-100" : "opacity-0"
              }`}
              style={{ transitionDelay: `${delay + 300 + (i * 50)}ms` }}
            >
              <div className="min-w-0">
                <span className={`text-xs font-bold ${textMain} block truncate`}>
                  {it.label || cat.name}
                </span>
                <span className={`text-[11px] font-semibold ${textMuted}`}>
                  {it.client} · {it.region}
                </span>
              </div>
              <StatusPill status={it.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AutomotivePOCTracker = ({ dark = false }) => {
  const [headerRef, headerVisible] = useVisible();
  const overallPct = (INDUSTRIALIZED / TOTAL) * 100;
  
  const wrapBg     = dark ? "bg-[#14141B] border-[#2a2a3a]" : "bg-[#E8E7E0] border-zinc-300";
  const trackBg    = dark ? "bg-[#2a2a3a]" : "bg-zinc-300";
  const textMain   = dark ? "text-white" : "text-[#14141B]";
  const textMuted  = dark ? "text-[#B8B7A4]/70" : "text-zinc-600";
  
  return (
    <div className={`rounded-3xl border p-6 md:p-8 ${wrapBg}`}>
      <div 
        ref={headerRef} 
        className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8 transition-all duration-700 ${
          headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#94C356] block mb-2">
            Live deal tracker
          </span>
          <h3 className={`text-3xl md:text-4xl font-black tracking-tight ${textMain}`}>
            {TOTAL} PoCs{" "}
            <span className={`font-bold text-xl ${textMuted}`}>with </span>
            <span className="text-[#94C356] drop-shadow-[0_0_8px_rgba(148,195,86,0.5)]">{INDUSTRIALIZED} moving </span>{" "}
            <span className={`font-bold text-xl ${textMuted}`}>to industrialization</span>
          </h3>
          <p className={`text-sm mt-2 max-w-md ${textMuted}`}>
            We're working with top OEMs and Tier-1s passing PoCs and getting
            assigned for prospective models and platforms.
          </p>
        </div>
        
        <div className="w-full sm:w-56 flex-shrink-0">
          <div className={`flex justify-between text-[11px] font-mono mb-2 ${dark ? "text-[#B8B7A4]/70" : "text-zinc-600"}`}>
            <span>Overall progress</span>
            <span className="font-bold text-[#94C356]">{Math.round(overallPct)}%</span>
          </div>
          <div className={`h-3 rounded-full ${trackBg} overflow-hidden`}>
            <div
              className="h-full rounded-full bg-[#94C356] transition-all duration-[1400ms] ease-out shadow-[0_0_12px_rgba(148,195,86,0.6)]"
              style={{ width: headerVisible ? `${overallPct}%` : "0%" }}
            />
          </div>
        </div>
      </div>
      
      <div>
        {POC_CATEGORIES.map((cat, i) => (
          <CategoryRow key={cat.name} cat={cat} delay={i * 100} dark={dark} />
        ))}
      </div>
    </div>
  );
};

export default AutomotivePOCTracker;