import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaBolt, FaWeightHanging,
  FaThermometerHalf, FaClock, FaCheckCircle, FaLayerGroup,
} from "react-icons/fa";

import Img34        from "../assets/website/industries/image34.png";
import Img35        from "../assets/website/industries/image35.png";
import Img36        from "../assets/website/industries/image36.png";
import Img37        from "../assets/website/industries/image37.png";
import HeatingJacketVideo from "../assets/website/HeatingJacket.mp4";

/* ─── THEME ───────────────────────────────────────────────────────────────── */
const GREEN  = "#94C356";
const NEON   = "#D9FE42";
const ORANGE = "#F07E26";
const FONT   = "ui-sans-serif, system-ui, sans-serif";

/* ─── HOOKS ───────────────────────────────────────────────────────────────── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, shown];
};

const Reveal = ({ children, delay = 0, y = 20, className = "" }) => {
  const [ref, shown] = useInView(0.1);
  return (
    <div ref={ref} className={className} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translateY(${y}px)`,
      transition: `opacity 0.65s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.65s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
};

/* ─── ANIMATED COUNTER ────────────────────────────────────────────────────── */
const CountUp = ({ to, suffix = "", prefix = "", duration = 1000 }) => {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const t0 = performance.now();
        const step = (now) => {
          const p = Math.min((now - t0) / duration, 1);
          setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to, duration, started]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
};

/* ─── DATA: 2 CASE STUDIES FROM PDF ────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    id: "copper",
    num: "01",
    icon: FaBolt,
    tag: "vs Copper Heater",
    title: "Voltcore vs Copper Wire Heater",
    tagline: "Same energy input (10.4W @ 7V). Voltcore reaches higher temperature, faster, with uniform heat distribution.",
    headline: "+10°C higher temperature · ~60s faster to comfort · 3/3 testers report uniform heat.",
    kpis: [
      { val: 10, suffix: "°C", label: "Higher temperature", prefix: "+" },
      { val: 60, suffix: " s", label: "Faster to comfort",   prefix: "~" },
      { val: 3,  suffix: "/3", label: "Testers: uniform heat", prefix: "" },
    ],
    bullets: [
      { icon: FaThermometerHalf, title: "Higher peak temperature", desc: "Voltcore reaches 46°C vs 36.3°C for copper — at the same 10.4W energy input." },
      { icon: FaClock,           title: "Faster time-to-comfort",   desc: "First warmth at 0:47 vs 2:02 for copper. Comfort reached at 1:36 vs 2:37." },
      { icon: FaLayerGroup,      title: "Uniform heat distribution", desc: "Surface ΔT = 6°C vs 16°C for copper. All 3 testers confirmed homogeneous warmth." },
    ],
    chart: {
      xKey: "min", xLabel: "Minutes", yLabel: "Temperature (°C)",
      data: [
        { min: 0, volt: 24.9, copper: 24.9 },
        { min: 1, volt: 40.5, copper: 34.0 },
        { min: 2, volt: 43.5, copper: 35.1 },
        { min: 3, volt: 44.9, copper: 36.1 },
        { min: 4, volt: 45.3, copper: 36.2 },
        { min: 5, volt: 46.0, copper: 36.3 },
      ],
      series: [
        { key: "copper", name: "Copper Wire · 10.4W", color: "#8a8a8a" },
        { key: "volt",   name: "Voltcore · 10.4W",    color: GREEN, highlight: true },
      ],
    },
    bars: [
      {
        title: "Peak temperature at same energy",
        note: "Voltcore reaches 46°C vs 36.3°C for copper — same 10.4W input.",
        rows: [
          { label: "Copper Wire System", value: "36.3°C", pct: 79 },
          { label: "Voltcore",            value: "46.0°C · +10°C", pct: 100, highlight: true },
        ],
      },
      {
        title: "Tester perception — uniform heat",
        note: "All 3 testers reported homogeneous warmth with Voltcore. Only 1/3 reported comfort with copper.",
        rows: [
          { label: "Copper Wire System", value: "1/3 testers", pct: 33 },
          { label: "Voltcore",           value: "3/3 testers", pct: 100, highlight: true },
        ],
      },
    ],
    timeline: [
      { label: "First Warmth", volt: "0:47", copper: "2:02" },
      { label: "Comfort",      volt: "1:36", copper: "2:37" },
    ],
    footNote: "ΔT = 6°C (Voltcore) vs 16°C (copper) — uniform heat, no hot spots.",
    images: [
      { src: Img37, label: "Outdoor & Hiking", sub: "Jacket with Voltcore chest heating zones — uniform warmth in extreme cold" },
      { src: Img35, label: "Fishing & Sport", sub: "Flexible textile heating adapts to any outer garment geometry" },
    ],
  },
  {
    id: "carbon",
    num: "02",
    icon: FaWeightHanging,
    tag: "vs Carbon Ink Heater",
    title: "Voltcore vs Carbon Ink Heater",
    tagline: "Same temperature performance, dramatically less energy. 50 extra minutes of runtime on the same battery.",
    headline: "~20% less energy · +50 min runtime · same thermal performance.",
    kpis: [
      { val: 20, suffix: "%", label: "Less energy consumption", prefix: "−" },
      { val: 50, suffix: " min", label: "Extra runtime",          prefix: "+" },
      { val: 2,  suffix: "h 50", label: "Total runtime (Voltcore)", prefix: "" },
    ],
    bullets: [
      { icon: FaBolt,          title: "20% less energy at same temp",  desc: "Voltcore draws 8.88W vs 12.79W for carbon ink — same temperature curve, 30% less power density." },
      { icon: FaClock,         title: "50 minutes extra runtime",      desc: "2h 50min vs 2h 00min at max power on 7.4V / 3500mAh battery — same heat, longer wear." },
      { icon: FaLayerGroup,    title: "Uniform heat distribution",    desc: "Surface ΔT = 6°C (Voltcore) vs 10°C (carbon). Homogeneous warmth across all zones." },
    ],
    chart: {
      xKey: "min", xLabel: "Minutes", yLabel: "Temperature (°C)",
      data: [
        { min: 0, volt: 24.9, carbon: 24.9 },
        { min: 1, volt: 40.5, carbon: 40.8 },
        { min: 2, volt: 43.5, carbon: 43.1 },
        { min: 3, volt: 44.9, carbon: 43.6 },
        { min: 4, volt: 45.3, carbon: 43.9 },
        { min: 5, volt: 46.0, carbon: 44.2 },
      ],
      series: [
        { key: "carbon", name: "Carbon Ink · 12.79W", color: "#8a8a8a" },
        { key: "volt",   name: "Voltcore · 8.88W (−20%)", color: GREEN, highlight: true },
      ],
    },
    bars: [
      {
        title: "Total power consumption",
        note: "Voltcore delivers the same thermal performance at 30% less power density (28.8 vs 36.1 mW/cm²).",
        rows: [
          { label: "Carbon Ink System", value: "12.79W", pct: 100 },
          { label: "Voltcore",           value: "8.88W · −20%", pct: 69, highlight: true },
        ],
      },
      {
        title: "Runtime on 3500mAh battery",
        note: "50 extra minutes of continuous heat at max power.",
        rows: [
          { label: "Carbon Ink System", value: "2h 00min", pct: 70 },
          { label: "Voltcore",           value: "2h 50min · +50 min", pct: 100, highlight: true },
        ],
      },
    ],
    powerTable: {
      volt: [
        { zone: "Back",     area: 143, power: 2.64, density: 28.8 },
        { zone: "Chest R",  area: 60,  power: 1.68, density: 28.8 },
        { zone: "Chest L",  area: 60,  power: 1.68, density: 28.8 },
        { zone: "Pocket R", area: 51,  power: 1.44, density: 28.8 },
        { zone: "Pocket L", area: 51,  power: 1.44, density: 28.8 },
        { zone: "TOTAL",    area: 365, power: 8.88, density: 28.8 },
      ],
      carbon: [
        { zone: "Back",     area: 138, power: 4.254, density: 30.8 },
        { zone: "Chest R",  area: 60,  power: 2.119, density: 35.3 },
        { zone: "Chest L",  area: 60,  power: 2.119, density: 35.3 },
        { zone: "Pocket R", area: 48,  power: 2.120, density: 44.2 },
        { zone: "Pocket L", area: 48,  power: 2.176, density: 45.3 },
        { zone: "TOTAL",    area: 354, power: 12.79, density: 36.1 },
      ],
    },
    footNote: "Same temperature, 20% less energy → 50 minutes of additional runtime.",
    images: [
      { src: Img36, label: "Workwear & Industrial", sub: "Construction & cold storage — Voltcore integrated in high-vis safety vest" },
      { src: Img34, label: "Medical & Wellness", sub: "Therapeutic back warmer — uniform heat across full lumbar surface, no hotspots" },
    ],
  },
];

/* ─── YOUTUBE VIDEO SECTION ────────────────────────────────────────────────── */
const YouTubeEmbed = ({ dark }) => (
  <Reveal delay={100}>
    <div className={`rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className={`text-xs font-black uppercase tracking-widest ${dark ? "text-zinc-300" : "text-zinc-500"}`}>
          Heating Jacket — Video Demo
        </h4>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#94C356]">YouTube</span>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl border border-zinc-700/50 shadow-lg" style={{ aspectRatio: "16/9" }}>
        <iframe
          src="https://www.youtube.com/embed/TNHwBlgjuj4"
          title="Voltcore Heating Jacket Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: 0 }}
        />
      </div>
    </div>
  </Reveal>
);

/* ─── HEATING JACKET VIDEO (local mp4) ─────────────────────────────────────── */
const JacketVideo = ({ dark }) => (
  <Reveal delay={120}>
    <div className={`rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h4 className={`text-xs font-black uppercase tracking-widest ${dark ? "text-zinc-300" : "text-zinc-500"}`}>
          Heating Jacket — Animation
        </h4>
        <span className="text-[10px] font-black uppercase tracking-widest text-[#F07E26]">Animation</span>
      </div>
      <div className="relative w-full overflow-hidden rounded-xl border border-zinc-700/50 shadow-lg bg-black" style={{ aspectRatio: "16/9" }}>
        <video
          src={HeatingJacketVideo}
          className="absolute inset-0 w-full h-full object-contain"
          autoPlay muted loop playsInline
        />
      </div>
    </div>
  </Reveal>
);

/* ─── INTERACTIVE LINE CHART ───────────────────────────────────────────────── */
const LineChart = ({ data, xKey, xLabel, yLabel, series, dark }) => {
  const [hoverIdx, setHoverIdx] = useState(null);
  const [drawn, setDrawn] = useState(false);
  const [ref, shown] = useInView(0.3);
  const svgRef = useRef(null);

  useEffect(() => { if (shown) setTimeout(() => setDrawn(true), 100); }, [shown]);

  const W = 540, H = 220;
  const PAD = { top: 16, right: 16, bottom: 28, left: 34 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const xVals = data.map((d) => d[xKey]);
  const xMin = xVals[0], xMax = xVals[xVals.length - 1];
  const allY = data.flatMap((d) => series.map((s) => d[s.key]));
  const yMax = Math.max(...allY) * 1.12;
  const xScale = (v) => PAD.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const yScale = (v) => PAD.top + plotH - (v / yMax) * plotH;
  const linePath = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(d[xKey]).toFixed(1)} ${yScale(d[key]).toFixed(1)}`).join(" ");
  const pathLength = 999;

  const gridColor = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const textColor = dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.38)";

  const handleMove = (e) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * W;
    let closest = 0, closestDist = Infinity;
    data.forEach((d, i) => {
      const dist = Math.abs(xScale(d[xKey]) - relX);
      if (dist < closestDist) { closestDist = dist; closest = i; }
    });
    setHoverIdx(closest);
  };

  return (
    <div ref={ref} className={`rounded-2xl p-5 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <h4 className={`text-xs font-black uppercase tracking-widest ${dark ? "text-zinc-300" : "text-zinc-500"}`}>{yLabel}</h4>
        <div className="flex items-center gap-4 flex-wrap">
          {series.map((s) => (
            <span key={s.key} className="flex items-center gap-1.5 text-[10px] font-bold" style={{ color: s.color }}>
              <span className={`inline-block rounded-full ${s.highlight ? "w-6 h-[3px]" : "w-4 h-[2px]"}`} style={{ background: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="w-full h-auto cursor-crosshair"
        onMouseMove={handleMove} onMouseLeave={() => setHoverIdx(null)}>
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const v = pct * yMax;
          const y = yScale(v);
          return (
            <g key={pct}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke={gridColor} strokeWidth="1" />
              <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill={textColor}>{Math.round(v)}</text>
            </g>
          );
        })}
        {data.map((d) => (
          <text key={d[xKey]} x={xScale(d[xKey])} y={H - PAD.bottom + 16} textAnchor="middle" fontSize="9" fill={textColor}>{d[xKey]}</text>
        ))}
        <text x={W - PAD.right} y={H - 2} textAnchor="end" fontSize="9" fill={textColor}>{xLabel}</text>

        {series.map((s) => (
          <g key={s.key}>
            {s.highlight && drawn && (
              <path d={linePath(s.key)} fill="none" stroke={s.color} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.12" />
            )}
            <path d={linePath(s.key)} fill="none" stroke={s.color}
              strokeWidth={s.highlight ? 3 : 2} strokeLinecap="round" strokeLinejoin="round"
              strokeDasharray={drawn ? "none" : pathLength}
              strokeDashoffset={drawn ? 0 : pathLength}
              style={{ transition: drawn ? "stroke-dashoffset 1.4s cubic-bezier(.22,.61,.36,1)" : "none" }} />
          </g>
        ))}

        {hoverIdx !== null && (
          <>
            <line x1={xScale(data[hoverIdx][xKey])} x2={xScale(data[hoverIdx][xKey])}
              y1={PAD.top} y2={H - PAD.bottom} stroke={textColor} strokeDasharray="3 3" strokeWidth="1" />
            {series.map((s) => (
              <circle key={s.key} cx={xScale(data[hoverIdx][xKey])} cy={yScale(data[hoverIdx][s.key])}
                r={s.highlight ? 5 : 3.5} fill={s.color} stroke={dark ? "#14141B" : "#fff"} strokeWidth="2" />
            ))}
          </>
        )}
      </svg>

      <div className={`mt-2 flex flex-wrap gap-x-5 gap-y-1 text-[11px] rounded-lg px-3 py-2 min-h-[32px] transition-opacity duration-150 ${hoverIdx === null ? "opacity-0" : "opacity-100"} ${dark ? "bg-black/25" : "bg-black/[0.04]"}`}>
        <span className={`font-black ${dark ? "text-white" : "text-[#14141B]"}`}>{xLabel}: {hoverIdx !== null ? data[hoverIdx][xKey] : "—"}</span>
        {series.map((s) => (
          <span key={s.key} style={{ color: s.color }} className="font-bold">
            {s.name.split("·")[0].trim()}: {hoverIdx !== null ? data[hoverIdx][s.key] : "—"}°C
          </span>
        ))}
      </div>
    </div>
  );
};

/* ─── ANIMATED BAR ──────────────────────────────────────────────────────────── */
const CompareBars = ({ title, note, rows, dark }) => {
  const [ref, shown] = useInView(0.4);
  return (
    <div ref={ref} className={`rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
      {title && <h4 className={`text-xs font-black uppercase tracking-widest mb-5 ${dark ? "text-zinc-300" : "text-zinc-500"}`}>{title}</h4>}
      <div className="space-y-5">
        {rows.map((b, i) => (
          <div key={b.label}>
            <div className="flex items-center justify-between mb-2 gap-3">
              <span className="text-xs font-bold" style={{ color: b.highlight ? GREEN : (dark ? "#71717a" : "#52525b") }}>{b.label}</span>
              <span className="text-xs font-black text-right" style={{ color: b.highlight ? GREEN : (dark ? "#d4d4d8" : "#3f3f46") }}>{b.value}</span>
            </div>
            <div className={`h-3 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
              <div className="h-full rounded-full transition-all duration-[1400ms] ease-out relative overflow-hidden"
                style={{
                  width: shown ? `${b.pct}%` : "0%",
                  background: b.highlight ? `linear-gradient(to right, ${GREEN}, ${NEON})` : (dark ? "#52525b" : "#a1a1aa"),
                  transitionDelay: `${i * 200}ms`,
                }}>
                {b.highlight && shown && (
                  <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 1.8s ease infinite" }} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {note && <p className={`mt-5 text-xs leading-relaxed italic ${dark ? "text-zinc-500" : "text-zinc-500"}`}>{note}</p>}
    </div>
  );
};

/* ─── TIMELINE COMPARISON ────────────────────────────────────────────────────── */
const TimelineCompare = ({ items, dark }) => (
  <Reveal delay={80}>
    <div className={`rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
      <h4 className={`text-xs font-black uppercase tracking-widest mb-5 ${dark ? "text-zinc-300" : "text-zinc-500"}`}>Time-to-Comfort Comparison</h4>
      <div className="grid grid-cols-2 gap-4">
        {items.map((t) => (
          <div key={t.label} className={`rounded-xl p-4 border ${dark ? "bg-[#14141B] border-zinc-700" : "bg-[#F0EFEA] border-zinc-200"}`}>
            <div className={`text-[9px] font-bold uppercase tracking-widest mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{t.label}</div>
            <div className="flex items-baseline gap-3">
              <span className="text-xl font-black" style={{ color: GREEN }}>{t.volt}</span>
              <span className={`text-xs line-through ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{t.copper}</span>
            </div>
            <div className={`text-[9px] mt-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>Voltcore vs Legacy</div>
          </div>
        ))}
      </div>
    </div>
  </Reveal>
);

/* ─── POWER TABLE ────────────────────────────────────────────────────────────── */
const PowerTable = ({ data, color, label, dark }) => (
  <div className={`rounded-2xl border overflow-hidden ${dark ? "border-zinc-700 bg-[#14141B]" : "border-zinc-200 bg-[#F0EFEA]"}`}>
    <div className="px-4 py-2 flex items-center justify-between" style={{ background: `${color}22` }}>
      <span className="text-[11px] font-black uppercase tracking-widest" style={{ color }}>{label}</span>
    </div>
    <table className="w-full text-[11px]">
      <thead>
        <tr className={dark ? "bg-zinc-900" : "bg-[#E8E7E0]"}>
          {["Zone", "Area (cm²)", "P @7V (W)", "mW/cm²"].map((h) => (
            <th key={h} className={`px-3 py-1.5 text-left font-bold ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className={i === data.length - 1 ? (dark ? "bg-zinc-900 font-bold" : "bg-[#E8E7E0] font-bold") : ""}>
            <td className={`px-3 py-1.5 ${dark ? "text-zinc-200" : "text-[#14141B]"}`}>{row.zone}</td>
            <td className={`px-3 py-1.5 ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{row.area}</td>
            <td className={`px-3 py-1.5 ${dark ? "text-zinc-300" : "text-[#14141B]"}`}>{row.power}</td>
            <td className="px-3 py-1.5 font-bold" style={{ color }}>{row.density}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─── BULLET CARD ────────────────────────────────────────────────────────────── */
const BulletCard = ({ b, dark, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  const Icon = b.icon;
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        className="h-full rounded-2xl p-6 border cursor-default transition-all duration-300"
        style={{
          background:  hov ? (dark ? "#14141B" : "#eceae5") : (dark ? "#1C1C24" : "#fff"),
          borderColor: hov ? GREEN : (dark ? "#3f3f46" : "#e4e4e7"),
          transform:   hov ? "translateY(-5px)" : "none",
          boxShadow:   hov ? `0 16px 40px rgba(148,195,86,0.14)` : "none",
        }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
          style={{ background: hov ? `${GREEN}22` : (dark ? "#14141B" : "#F0EFEA"), color: GREEN }}>
          <Icon size={17} />
        </div>
        <h4 className="text-sm font-black mb-2 leading-snug transition-colors duration-300"
          style={{ color: hov ? GREEN : (dark ? "#fff" : "#14141B") }}>{b.title}</h4>
        <p className="text-xs leading-relaxed" style={{ color: dark ? "#71717a" : "#52525b" }}>{b.desc}</p>
        <div className="mt-5 h-[2px] rounded-full transition-all duration-500"
          style={{ width: hov ? "100%" : "18%", background: GREEN, opacity: hov ? 1 : 0.35 }} />
      </div>
    </Reveal>
  );
};

/* ─── KPI ROW ─────────────────────────────────────────────────────────────────── */
const KpiRow = ({ kpis, dark }) => (
  <Reveal delay={40}>
    <div className="grid grid-cols-3 gap-4">
      {kpis.map((kpi) => {
        const [hov, setHov] = useState(false);
        return (
          <div key={kpi.label} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="rounded-2xl p-5 border text-center cursor-default transition-all duration-300"
            style={{
              borderColor: hov ? `${GREEN}70` : `${GREEN}25`,
              background:  hov ? `${GREEN}12` : `${GREEN}06`,
              transform:   hov ? "translateY(-3px) scale(1.02)" : "none",
            }}>
            <div className="text-3xl md:text-4xl font-black leading-none mb-1.5" style={{ color: GREEN }}>
              <CountUp to={kpi.val} prefix={kpi.prefix} suffix={kpi.suffix} />
            </div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(20,20,27,0.4)" }}>{kpi.label}</div>
          </div>
        );
      })}
    </div>
  </Reveal>
);

/* ─── CASE STUDY PANEL ────────────────────────────────────────────────────────── */
const CaseStudyPanel = ({ cs, dark }) => (
  <div className="grid grid-cols-1 gap-10">
    {/* 1. Header */}
    <Reveal>
      <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>{cs.num} — {cs.tag}</span>
      <h3 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 ${dark ? "text-white" : "text-[#14141B]"}`}>{cs.title}</h3>
      <p className={`text-sm md:text-base max-w-2xl leading-relaxed mb-5 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{cs.tagline}</p>
      {cs.headline && (
        <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2"
          style={{ borderColor: `${GREEN}40`, background: `${GREEN}10` }}>
          <span style={{ color: GREEN }}>✦</span>
          <span className={`text-xs md:text-sm font-black ${dark ? "text-[#B8B7A4]" : "text-[#3f5528]"}`}>{cs.headline}</span>
        </div>
      )}
    </Reveal>

    {/* 2. KPIs */}
    <KpiRow kpis={cs.kpis} dark={dark} />

    {/* 3. Bullets */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {cs.bullets.map((b, i) => <BulletCard key={b.title} b={b} dark={dark} delay={i * 80} />)}
    </div>

    {/* 3b. Application images — 2 per case study */}
    <Reveal delay={60}>
      <div className="grid grid-cols-2 gap-4">
        {cs.images.map(({ src, label, sub }) => (
          <div key={label}
            className={`group rounded-2xl overflow-hidden border cursor-default transition-all duration-300 ${dark ? "border-zinc-800" : "border-zinc-200"}`}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${GREEN}60`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 20px 50px rgba(148,195,86,0.10)`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            <div className="relative overflow-hidden" style={{ height: 240 }}>
              <img src={src} alt={label}
                className="w-full h-full object-cover object-top transition-transform duration-500"
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-white font-black text-sm leading-snug">{label}</div>
                {sub && <div className="text-white/55 text-[10px] mt-0.5">{sub}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>

    {/* 4. Chart + bars */}
    {cs.chart && (
      <Reveal delay={100}>
        <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
          <LineChart {...cs.chart} dark={dark} />
          <div className="flex flex-col gap-4">
            {cs.bars?.map((block) => (
              <CompareBars key={block.title} title={block.title} note={block.note} rows={block.rows} dark={dark} />
            ))}
          </div>
        </div>
      </Reveal>
    )}

    {/* 5. Timeline (case 01 only) */}
    {cs.timeline && <TimelineCompare items={cs.timeline} dark={dark} />}

    {/* 6. Power tables (case 02 only) */}
    {cs.powerTable && (
      <Reveal delay={100}>
        <div className={`rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <h4 className={`text-xs font-black uppercase tracking-widest mb-5 ${dark ? "text-zinc-300" : "text-zinc-500"}`}>
            Zone Power Density Breakdown (7V)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PowerTable data={cs.powerTable.volt}   color={GREEN}      label="Voltcore · 8.88W"    dark={dark} />
            <PowerTable data={cs.powerTable.carbon} color={ORANGE}     label="Carbon Ink · 12.79W" dark={dark} />
          </div>
        </div>
      </Reveal>
    )}

    {/* 7. Video — YouTube + local animation */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <YouTubeEmbed dark={dark} />
      <JacketVideo dark={dark} />
    </div>

    {/* 8. Footnote */}
    {cs.footNote && (
      <Reveal delay={160}>
        <div className="rounded-2xl border px-6 py-4" style={{ borderColor: `${GREEN}35`, background: `${GREEN}06` }}>
          <p className={`text-xs md:text-sm font-bold ${dark ? "text-[#94C356]" : "text-[#5c7a3b]"}`}>✦ {cs.footNote}</p>
        </div>
      </Reveal>
    )}
  </div>
);

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────────── */
const HeatedApparelCaseStudies = () => {
  const [dark, setDark] = useState(() => typeof document !== "undefined" && document.documentElement.classList.contains("dark"));
  const [activeId, setActiveId] = useState(CASE_STUDIES[0].id);
  const active = CASE_STUDIES.find((c) => c.id === activeId) || CASE_STUDIES[0];
  const panelRef = useRef(null);

  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const handleTabHover = (id) => {
    if (id !== activeId) {
      setActiveId(id);
      panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F0EFEA] text-[#14141B]"}`}
      style={{ fontFamily: FONT }}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 55% at 65% 35%, rgba(148,195,86,0.09) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 15% 75%, rgba(217,254,66,0.05) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/20 to-transparent" />

        <Link to="/industries/heated-apparel"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-[#94C356] transition-colors">
          <FaArrowLeft size={10} /> Heated Apparel
        </Link>

        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-16 pt-40">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: GREEN }}>
              5.3 — Heated Apparel / Case Studies
            </span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
              Head-to-Head.<br /><span style={{ color: GREEN }}>By Heater.</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed">
              Two real heated-apparel benchmarks — Voltcore CNT textile vs copper wire and carbon ink —
              temperature curves, power draw, and runtime, side by side.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── STICKY TABS ──────────────────────────────────────────────────── */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur-md ${dark ? "bg-[#14141B]/92 border-zinc-800" : "bg-[#F0EFEA]/92 border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex gap-0 overflow-x-auto">
            {CASE_STUDIES.map((cs) => {
              const Icon = cs.icon;
              const isActive = activeId === cs.id;
              return (
                <button key={cs.id}
                  onMouseEnter={() => handleTabHover(cs.id)}
                  onClick={() => handleTabHover(cs.id)}
                  className="relative flex items-center gap-2 px-5 py-5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-250"
                  style={{ color: isActive ? (dark ? "#fff" : "#14141B") : (dark ? "#52525b" : "#a1a1aa") }}>
                  <Icon size={12} style={{ color: isActive ? GREEN : "currentColor", transition: "color 0.25s" }} />
                  {cs.num} — {cs.tag}
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full transition-all duration-300 origin-left"
                    style={{ background: GREEN, transform: isActive ? "scaleX(1)" : "scaleX(0)" }} />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── ACTIVE PANEL ─────────────────────────────────────────────────── */}
      <section ref={panelRef} id="case-study-panel"
        className={`py-20 px-6 ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
        <div className="container mx-auto max-w-6xl">
          <CaseStudyPanel key={active.id} cs={active} dark={dark} />
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden bg-[#14141B] rounded-3xl p-12 md:p-20 text-center shadow-xl border border-zinc-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1 rounded-full blur-md opacity-70" style={{ background: GREEN }} />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${GREEN}08 0%, transparent 70%)` }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: GREEN }}>
              // Request Heated Apparel Evaluation Kit
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 max-w-2xl mx-auto">
              Ready to bring Voltcore into your product line?
            </h2>
            <p className="text-white/55 max-w-lg mx-auto mb-10 text-sm leading-relaxed">
              Material samples, Technical Data Sheets, and direct engineering support for qualified apparel brands and OEM development teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: GREEN, color: "#14141B" }}
                onMouseEnter={e => { e.currentTarget.style.background = NEON; }}
                onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}>
                Request Samples & TDS <FaArrowRight size={10} />
              </Link>
              <Link to="/industries/heated-apparel"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:border-[#94C356] hover:text-[#94C356]">
                Back to Heated Apparel Overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
};

export default HeatedApparelCaseStudies;
