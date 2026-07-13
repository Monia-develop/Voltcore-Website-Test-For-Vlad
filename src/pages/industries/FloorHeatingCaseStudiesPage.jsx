import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaBolt, FaClock, FaLeaf, FaRecycle,
  FaThermometerHalf, FaLayerGroup, FaTools, FaHome, FaBed, FaCouch,
  FaCheckCircle, FaWind,
} from "react-icons/fa";
import FloorHeroImage from "../../assets/website/industries/underfloor-Heating2.png";
import FloorHeatingVideo from "../../assets/website/FloorHeating.mp4";
import Under1 from "../../assets/website/industries/Under1.png";
import Under2 from "../../assets/website/industries/Under2.png";
import Under3 from "../../assets/website/industries/Under3.png";

/* ─── THEME ─────────────────────────────────────────────────────────────── */
const GREEN  = "#94C356";
const NEON   = "#D9FE42";
const ORANGE = "#F07E26";
const BLUE   = "#83D0F5";
const PINK   = "#902053";
const BLACK  = "#14141B";
const CRAFT  = "#B8B7A4";
const CREAM  = "#F0EFEA";

/* ─── DATA FROM POWERPOINT ──────────────────────────────────────────────── */
const COMPARISON_DATA = [
  { dim: "Material Cost (per m²)", voltcore: "20€ + CoV*", film: "40–60€ + CoV*", cable: "40–70€ + CoV*", liquid: "70–90€ + CoV*" },
  { dim: "Time to Heat (20→28°C)", voltcore: "3 Minutes", film: "1 Hour", cable: "1.5 Hours", liquid: "Slow / High Inertia" },
  { dim: "Energy Consumption (1h hold)", voltcore: "56 Wh", film: "240 Wh", cable: "340 Wh", liquid: "400 Wh (Theoretical)" },
  { dim: "Total Energy Savings", voltcore: "Save up to 30%", film: "Baseline", cable: "Inherently inefficient", liquid: "High system losses" },
  { dim: "Installation (100 m²)", voltcore: "4 Hours", film: "3 Days", cable: "5 Days", liquid: "10–14 Days" },
  { dim: "Shapeability & Flex", voltcore: "3 — Highest", film: "2 — Moderate", cable: "2 — Moderate", liquid: "1 — Rigid Tubes" },
  { dim: "Warranty / Durability", voltcore: "10 Years", film: "5–15 Years", cable: "10–30 Years", liquid: "10–20 Years" },
];

const INSTALL_BARS = [
  { l: "Voltcore TargetHeat", days: 0.17, label: "4 Hours", pct: 100, color: "#D9FE42" },
  { l: "Carbon Film", days: 3, label: "3 Days", pct: 46, color: "#83D0F5" },
  { l: "Electric Cable", days: 5, label: "5 Days", pct: 30, color: "#F07E26" },
  { l: "Liquid (Hydronic)", days: 12, label: "10–14 Days", pct: 12, color: "#902053" },
];

const ENERGY_BARS = [
  { l: "Voltcore TargetHeat", wh: 56, pct: 100, color: "#D9FE42" },
  { l: "Carbon Film", wh: 240, pct: 70, color: "#83D0F5" },
  { l: "Electric Cable", wh: 340, pct: 50, color: "#F07E26" },
  { l: "Liquid (Hydronic)", wh: 400, pct: 40, color: "#902053" },
];

const MARKET_DATA = [
  { l: "TAM", v: "$3.2B", d: "Global electric underfloor heating market (2025)", pct: 100, color: "#83D0F5" },
  { l: "SAM", v: "$1.4B", d: "Europe electric underfloor heating market (2025)", pct: 44, color: "#94C356" },
  { l: "SOM", v: "$0.8B", d: "Retrofit-ready electric segment in EU & UK", pct: 25, color: "#D9FE42" },
];

const MARKET_GROWTH = [
  { year: "2024", v: 3.1 }, { year: "2025", v: 3.2 }, { year: "2027", v: 3.6 },
  { year: "2029", v: 4.0 }, { year: "2032", v: 4.5 }, { year: "2034", v: 4.9 },
];

// Données exactes du PowerPoint - Voltcore atteint 28°C en 3 min, Carbon film en 60 min, Electric cable en 90 min
const HEATING_TREND = {
  voltcore: [
    { time: 0, temp: 20 },
    { time: 3, temp: 28 },
    { time: 10, temp: 28 },
    { time: 30, temp: 28 },
    { time: 60, temp: 28 },
    { time: 90, temp: 28 },
    { time: 120, temp: 28 },
    { time: 150, temp: 28 },
  ],
  film: [
    { time: 0, temp: 20 },
    { time: 15, temp: 22 },
    { time: 30, temp: 24 },
    { time: 45, temp: 26 },
    { time: 60, temp: 28 },
    { time: 90, temp: 28 },
    { time: 120, temp: 28 },
    { time: 150, temp: 28 },
  ],
  cable: [
    { time: 0, temp: 20 },
    { time: 15, temp: 21 },
    { time: 30, temp: 22 },
    { time: 45, temp: 23 },
    { time: 60, temp: 24 },
    { time: 75, temp: 25 },
    { time: 90, temp: 28 },
    { time: 120, temp: 28 },
    { time: 150, temp: 28 },
  ],
};

const RADAR_AXES = ["Energy Efficiency", "Integration", "Durability", "Flexibility", "Affordability"];
const RADAR_SERIES = [
  { name: "Voltcore", color: "#D9FE42", values: [5, 5, 4, 5, 4] },
  { name: "Carbon Film", color: "#83D0F5", values: [2, 3, 3, 3, 2] },
  { name: "Copper Wiring", color: "#F07E26", values: [2, 2, 4, 2, 2] },
  { name: "Water (Hydronic)", color: "#902053", values: [2, 1, 4, 1, 1] },
];

const COMPETITIVE_POINTS = [
  { title: "Superior Energy Efficiency", body: "Delivers 85–95% of energy to the surface vs ~40% for copper — up to 50% energy savings and 40% faster warm-up." },
  { title: "Seamless Integration", body: "Ultra-thin (120–250 g/m²), drapable CNT textiles integrate into foam, textiles, plastics, and overmolded parts." },
  { title: "High Flexibility & Uniformity", body: "Smooth, unidirectional heating with no hotspots, achieved without any heat-spreading layers." },
  { title: "Durable & Failure Resistant", body: "Maintains stable resistivity across the full surface — a roadmap toward a 40% cost advantage via simple polymer base and no metal content." },
];

const INTEGRATION_MODULES = [
  { id: "mats", num: "01", title: "Retrofit-Ready Slim Mats", weight: "30–60 g/m²",
    desc: "Voltcore's Heating Mesh — an open structural layout engineered for rigid laminations, thin-set adhesives, or direct embedding. Applies directly over existing floors during renovations, no tear-out required." },
  { id: "textile", num: "02", title: "Radiant Wall & Ceiling Modules", weight: "120–250 g/m²",
    desc: "The drapable Heating Textile conforms to curved, complex, and bending architectural geometries. Embedded behind drywall or plaster to turn entire walls or ceilings into gentle, low-voltage (12–48V) radiant envelopes." },
  { id: "uni", num: "03", title: "The Uni-Directional Advantage", weight: "85–95% focused",
    desc: "Focuses generated energy strictly toward the target surface while insulating the bottom backing layer — zero heat wasted into the concrete substrate." },
];

// Un seul POC project - Vinyl Flooring (DESSO enlevé)
const POC_PROJECTS = [
  {
    tag: "VINYL FLOORING — CLIENT SAMPLE", color: "#94C356", status: "Active integration", pct: 80,
    title: "Vinyl Flooring Sandwich Construction",
    desc: "Voltcore's mesh integrated between the layers of a vinyl flooring 'sandwich' — can also be deployed as a reinforcing mesh. Efficient, uniform surface heating with zero heat lost to the bottom layer thanks to the uni-directional effect.",
    specs: [
      { l: "Design", v: "Wood" }, { l: "Product format", v: "Rolls" }, { l: "Size", v: "20.5 ml × 1.5 m" },
    ],
    layers: ["Triple Action Protecsol® surface treatment", "Design Film", "Recycled calendared surface backing", "D-MAX", "CXP-HD+ double-density foam"],
    images: [Under1, Under2, Under3],
    captions: {
      left: "Sample of vinyl flooring of our client",
      middle: "Voltcore's mesh integrated between the layers of a \"sandwich\". It also can be used as reinforcing mesh",
      right: "Efficient and uniform heating of the surface without heating the bottom layer due to uni-directional heating effect"
    }
  },
];

const FURNITURE_ITEMS = [
  { icon: FaBed, title: "Smart Mattresses & Bedding", body: "Perfectly homogeneous heat distribution without rigid nodes or localized wires consumers can feel through the quilting. Safe low-voltage thresholds (12–48V)." },
  { icon: FaCouch, title: "Active Sofas & Seating", body: "Embedded directly into internal padding foam, upholstery fabrics, performance leathers, or overmolded plastics without altering silhouette or compressibility." },
  { icon: FaHome, title: "Therapeutic Cushions & Pillows", body: "Stable electrical resistivity across the entire surface over years of compression. Zero self-abrasion profile for long-term hospitality or residential use." },
];

const MATERIAL_SPECS = [
  { l: "Roll Width", v: "10cm – 2m" },
  { l: "Roll Length", v: "Up to 10m" },
  { l: "Layer Thickness", v: "2.2mm" },
  { l: "Supply Voltage", v: "5V – 220V" },
  { l: "Power Density", v: "50–1000 W/lin.m." },
  { l: "Heating Mesh Weight", v: "30–60 g/m²" },
  { l: "Heating Textile Weight", v: "120–250 g/m²" },
  { l: "Furniture Voltage Range", v: "12–48V (low-voltage safe)" },
  { l: "Resistance Range", v: "10kΩ – 2MΩ/m" },
  { l: "Max Temperature", v: "Up to 100°C" },
  { l: "Recycled Content", v: "Up to 75%" },
  { l: "Matrix Material", v: "100% PP/PA/PET" },
];

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */
const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setShown(true);
    }, { threshold });
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

const CountUp = ({ to, suffix = "", prefix = "", duration = 1200 }) => {
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

/* ─── ANIMATED BAR ─────────────────────────────────────────────────────── */
const AnimatedBar = ({ pct, color, delay = 0, dark, label, value }) => {
  const [ref, shown] = useInView(0.3);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between mb-2 gap-3">
        <span className="text-xs font-bold" style={{ color: color }}>{label}</span>
        <span className="text-xs font-black text-right" style={{ color: dark ? "#d4d4d8" : "#3f3f46" }}>{value}</span>
      </div>
      <div className={`h-3 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
        <div className="h-full rounded-full transition-all duration-[1400ms] ease-out relative overflow-hidden"
          style={{ width: shown ? `${pct}%` : "0%", background: color, transitionDelay: `${delay}ms` }}>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: shown ? "shimmer 1.8s ease infinite" : "none",
          }} />
        </div>
      </div>
    </div>
  );
};

/* ─── MARKET GROWTH CHART ───────────────────────────────────────────────── */
const MarketGrowthChart = ({ dark }) => {
  const [ref, inView] = useInView(0.2);
  const [prog, setProg] = useState(0);
  const [hovered, setHovered] = useState(null);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const dur = 1200;
    const tick = (ts) => { if (!s) s = ts; setProg(Math.min((ts - s) / dur, 1)); if ((ts - s) < dur) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [inView]);
  const W = 560, H = 260, PL = 44, PR = 20, PT = 20, PB = 40;
  const cW = W - PL - PR, cH = H - PT - PB;
  const maxV = 5.5, minV = 2.5;
  const xStep = cW / (MARKET_GROWTH.length - 1);
  const yScale = (v) => PT + cH - ((v - minV) / (maxV - minV)) * cH;
  const gridLines = [3.0, 3.5, 4.0, 4.5, 5.0];
  const textColor = dark ? "#71717a" : "#6b7280";
  const gridColor = dark ? "#27272a" : "#e5e7eb";
  const pts = MARKET_GROWTH.map((d, i) => [PL + i * xStep, yScale(d.v)]);
  const totalLen = pts.reduce((acc, p, i) => i === 0 ? 0 : acc + Math.hypot(p[0]-pts[i-1][0], p[1]-pts[i-1][1]), 0);
  const visLen = totalLen * prog;
  let walked = 0;
  const visiblePts = [];
  for (let i = 0; i < pts.length; i++) {
    if (i === 0) { visiblePts.push(pts[0]); continue; }
    const seg = Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]);
    if (walked + seg <= visLen) { visiblePts.push(pts[i]); walked += seg; }
    else {
      const t = (visLen - walked) / seg;
      visiblePts.push([pts[i-1][0] + t*(pts[i][0]-pts[i-1][0]), pts[i-1][1] + t*(pts[i][1]-pts[i-1][1])]);
      break;
    }
  }
  const path = visiblePts.length < 2 ? "" : visiblePts.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible">
        {gridLines.map(v => (
          <g key={v}>
            <line x1={PL} x2={W-PR} y1={yScale(v)} y2={yScale(v)} stroke={gridColor} strokeWidth="1" />
            <text x={PL-6} y={yScale(v)+4} textAnchor="end" fontSize="10" fill={textColor}>${v}B</text>
          </g>
        ))}
        {MARKET_GROWTH.map((d, i) => (
          <text key={i} x={PL + i*xStep} y={H-6} textAnchor="middle" fontSize="10" fill={textColor}>{d.year}</text>
        ))}
        <text x={W/2} y={H+2} textAnchor="middle" fontSize="10" fill={textColor}>Year</text>
        {visiblePts.length > 1 && (
          <polygon points={[...visiblePts, [visiblePts[visiblePts.length-1][0], PT+cH], [PL, PT+cH]].map(p=>p.join(",")).join(" ")}
            fill="#94C356" fillOpacity="0.10" />
        )}
        <path d={path} fill="none" stroke="#94C356" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {MARKET_GROWTH.map((d, i) => {
          const px = PL + i*xStep, py = yScale(d.v);
          const isVis = visiblePts.length > i;
          if (!isVis) return null;
          return (
            <g key={i} style={{cursor:"pointer"}} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
              <circle cx={px} cy={py} r="16" fill="transparent" />
              <circle cx={px} cy={py} r={hovered === i ? 7 : 5} fill={hovered === i ? "#D9FE42" : "#94C356"} stroke="#14141B" strokeWidth="2" style={{transition:"r 0.2s"}}/>
              {hovered === i && (
                <g>
                  <rect x={px-26} y={py-32} width="52" height="22" rx="6" fill={dark?"#1c1c24":"#fff"} stroke="#94C356" strokeWidth="1"/>
                  <text x={px} y={py-17} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#94C356">${d.v}B</text>
                </g>
              )}
            </g>
          );
        })}
        {prog > 0.95 && (
          <g>
            <rect x={W-PR-90} y={PT+4} width="82" height="22" rx="6" fill="#94C35622" stroke="#94C35655" strokeWidth="1"/>
            <text x={W-PR-49} y={PT+18} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#94C356">5–7% CAGR</text>
          </g>
        )}
      </svg>
    </div>
  );
};

/* ── HEATING TREND CHART (CORRIGÉ - Données exactes du PowerPoint) ────── */
const HeatingTrendChart = ({ dark }) => {
  const [ref, inView] = useInView(0.2);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const dur = 1800;
    const tick = (ts) => { if (!s) s = ts; setProg(Math.min((ts - s) / dur, 1)); if ((ts - s) < dur) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [inView]);
  
  const W = 700, H = 340, PL = 60, PR = 40, PT = 40, PB = 60;
  const cW = W - PL - PR, cH = H - PT - PB;
  const yMin = 18, yMax = 32;
  const xMax = 150; // 150 minutes max
  const xScale = (min) => PL + (min / xMax) * cW;
  const yScale = (v) => PT + cH - ((v - yMin) / (yMax - yMin)) * cH;
  const textColor = dark ? "#71717a" : "#6b7280";
  const gridColor = dark ? "#27272a" : "#e5e7eb";
  
  const buildPath = (data) => {
    return data.map((d, i) => `${i===0?"M":"L"} ${xScale(d.time).toFixed(1)} ${yScale(d.temp).toFixed(1)}`).join(" ");
  };
  
  const voltcorePath = buildPath(HEATING_TREND.voltcore);
  const filmPath = buildPath(HEATING_TREND.film);
  const cablePath = buildPath(HEATING_TREND.cable);
  
  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible">
        {/* Grid lines */}
        {[20, 22, 24, 26, 28, 30, 32].map(v => (
          <g key={v}>
            <line x1={PL} x2={W-PR} y1={yScale(v)} y2={yScale(v)} stroke={gridColor} strokeWidth="1" opacity="0.5" />
            <text x={PL-10} y={yScale(v)+4} textAnchor="end" fontSize="11" fill={textColor}>{v}°</text>
          </g>
        ))}
        
        {/* X-axis labels */}
        {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150].map(t => (
          <text key={t} x={xScale(t)} y={H-PB+20} textAnchor="middle" fontSize="10" fill={textColor}>{t}m</text>
        ))}
        <text x={W/2} y={H-10} textAnchor="middle" fontSize="12" fill={textColor} fontWeight="600">Heating time</text>
        
        {/* 28°C line */}
        <line x1={PL} x2={W-PR} y1={yScale(28)} y2={yScale(28)} stroke="#94C356" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
        <text x={W-PR+8} y={yScale(28)+4} fontSize="11" fill="#94C356" fontWeight="bold">28°C</text>
        
        {/* Animated paths */}
        <path d={cablePath} fill="none" stroke="#a0a0a0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
          strokeDasharray={prog > 0.95 ? "none" : "1000"} strokeDashoffset={prog > 0.95 ? 0 : 1000*(1-prog)} 
          style={{transition: "stroke-dashoffset 1.8s ease-out"}} />
        <path d={filmPath} fill="none" stroke="#F07E26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={prog > 0.95 ? "none" : "1000"} strokeDashoffset={prog > 0.95 ? 0 : 1000*(1-prog)} 
          style={{transition: "stroke-dashoffset 1.8s ease-out"}} />
        <path d={voltcorePath} fill="none" stroke="#D9FE42" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          strokeDasharray={prog > 0.95 ? "none" : "1000"} strokeDashoffset={prog > 0.95 ? 0 : 1000*(1-prog)} 
          style={{transition: "stroke-dashoffset 1.8s ease-out"}} />
        
        {/* Voltcore 3min marker */}
        {prog > 0.95 && (
          <g>
            <line x1={xScale(3)} x2={xScale(3)} y1={yScale(28)} y2={H-PB} stroke="#D9FE42" strokeWidth="2" strokeDasharray="4 3" opacity="0.7" />
            <circle cx={xScale(3)} cy={yScale(28)} r="6" fill="#D9FE42" stroke="#14141B" strokeWidth="2" />
            <rect x={xScale(3)+12} y={yScale(28)-20} width="60" height="26" rx="6" fill="#D9FE42" stroke="#14141B" strokeWidth="1.5"/>
            <text x={xScale(3)+42} y={yScale(28)-3} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#14141B">3 min</text>
          </g>
        )}
        
        {/* Legend */}
        <g transform={`translate(${PL}, ${PT-15})`}>
          <line x1="0" y1="2" x2="20" y2="2" stroke="#D9FE42" strokeWidth="3" />
          <text x="26" y="6" fontSize="11" fontWeight="bold" fill="#D9FE42">Voltcore. Insulated linoleum</text>
          
          <line x1="280" y1="2" x2="300" y2="2" stroke="#F07E26" strokeWidth="2" />
          <text x="306" y="6" fontSize="11" fontWeight="bold" fill="#F07E26">Carbon film</text>
          
          <line x1="450" y1="2" x2="470" y2="2" stroke="#a0a0a0" strokeWidth="2" />
          <text x="476" y="6" fontSize="11" fontWeight="bold" fill="#a0a0a0">Electric cable</text>
        </g>
      </svg>
      
      {/* Summary text */}
      <div className={`mt-6 p-5 rounded-xl ${dark ? "bg-[#1C1C24]" : "bg-[#F0EFEA]"}`}>
        <p className={`text-sm font-bold mb-3 ${dark ? "text-white" : "text-[#14141B]"}`}>From 20°C to 28°C:</p>
        <div className="flex flex-wrap gap-6 text-sm">
          <span style={{color: "#D9FE42"}} className="font-bold">Voltcore — 3 min</span>
          <span style={{color: "#F07E26"}} className="font-bold">Carbon film — 1 hour</span>
          <span style={{color: "#a0a0a0"}} className="font-bold">Electric cable — 1.5 hour</span>
        </div>
      </div>
    </div>
  );
};

/* ─── RADAR CHART ─────────────────────────────────────────────────────── */
const RadarChart = ({ dark }) => {
  const [ref, inView] = useInView(0.3);
  const size = 360, cx = size/2, cy = size/2, r = 130, levels = 5;
  const axisCount = RADAR_AXES.length;
  const angleFor = (i) => (Math.PI * 2 * i) / axisCount - Math.PI / 2;
  const pointFor = (i, val) => {
    const a = angleFor(i);
    const rad = (val / levels) * r;
    return [cx + rad * Math.cos(a), cy + rad * Math.sin(a)];
  };
  const ringColor = dark ? "#2a2a33" : "#d4ddc8";
  const axisColor = dark ? "#3a3a45" : "#c0cdab";
  return (
    <div ref={ref} className="flex flex-col items-center">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-[380px]">
        {[1,2,3,4,5].map(lvl => (
          <polygon key={lvl}
            points={Array.from({length:axisCount}).map((_,i)=>pointFor(i, lvl).join(",")).join(" ")}
            fill="none" stroke={ringColor} strokeWidth="1" />
        ))}
        {RADAR_AXES.map((_, i) => {
          const [x,y] = pointFor(i, levels);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={axisColor} strokeWidth="1" />;
        })}
        {RADAR_SERIES.map((s, si) => {
          const pts = s.values.map((v,i) => pointFor(i, inView ? v : 0));
          return (
            <polygon key={s.name}
              points={pts.map(p=>p.join(",")).join(" ")}
              fill={s.color} fillOpacity={si===0 ? 0.28 : 0.08}
              stroke={s.color} strokeWidth={si===0 ? 2.5 : 1.5}
              style={{ transition: "all 1s cubic-bezier(.22,.61,.36,1)" }} />
          );
        })}
        {RADAR_AXES.map((label, i) => {
          const a = angleFor(i);
          const lx = cx + (r + 34) * Math.cos(a);
          const ly = cy + (r + 34) * Math.sin(a);
          return (
            <text key={label} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle"
              fontSize="9.5" fontWeight="700" fill={dark ? "#B8B7A4" : "#5C6654"} className="uppercase">
              {label}
            </text>
          );
        })}
      </svg>
      <div className="flex flex-wrap justify-center gap-4 mt-2">
        {RADAR_SERIES.map(s => (
          <span key={s.name} className="flex items-center gap-1.5 text-[10px] font-bold" style={{color: dark ? "#B8B7A4" : "#5C6654"}}>
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{background:s.color}}/> {s.name}
          </span>
        ))}
      </div>
    </div>
  );
};

/* ── INTERACTIVE FLOOR STACK MAP ───────────────────────────────────────── */
const FloorStackMap = ({ dark }) => {
  const [heat, setHeat] = useState(false);
  const layers = [
    { label: "Flooring Finish (Vinyl / Laminate / Wood)", h: 54 },
    { label: "Voltcore TargetHeat Mesh — 2.2mm", h: 34, active: true },
    { label: "Substrate / Existing Subfloor", h: 54 },
  ];
  return (
    <div className={`relative w-full rounded-3xl overflow-hidden select-none border transition-all duration-300 p-6 shadow-2xl min-h-[420px] flex flex-col justify-center ${dark ? "bg-[#0b0c10] border-zinc-800" : "bg-[#f0f4ed] border-[#c8d8b8]"}`}>
      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#94C356] to-transparent opacity-30 pointer-events-none z-10" style={{animation: "scanLine 4s linear infinite"}} />
      <div className="absolute top-6 left-6 z-30">
        <button onClick={() => setHeat(!heat)}
          className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105 ${heat ? "bg-[#F07E26] text-white shadow-[0_0_20px_rgba(240,126,38,0.5)]" : dark ? "bg-[#1c1c24] text-[#B8B7A4] border border-zinc-700" : "bg-white text-[#1A1F14] border border-[#c8d8b8]"}`}>
          {heat ? "🔥 Active — 3 min to 28°C" : "❄️ Passive State (20°C)"}
        </button>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-2 py-10 max-w-[420px] mx-auto w-full">
        {heat && [0,1,2].map(i => (
          <div key={i} className="absolute z-30 flex flex-col items-center" style={{ left: `${28 + i*22}%`, bottom: "46%" }}>
            <div className="w-[2px] h-10" style={{ background: "linear-gradient(to top, #F07E26, transparent)", animation: "pulse 1.5s ease infinite" }} />
          </div>
        ))}
        {layers.map((layer, i) => (
          <div key={i} className="w-full relative" style={{ perspective: "600px" }}>
            <div
              className={`w-full rounded-lg border flex items-center justify-center text-[10px] font-bold uppercase tracking-wider transition-all duration-700 relative overflow-hidden ${layer.active ? heat ? "border-[#F07E26] shadow-[0_0_30px_rgba(240,126,38,0.6)]" : dark ? "border-[#94C356]/60" : "border-[#94C356]/60" : dark ? "border-zinc-700" : "border-[#c8d8b8]"}`}
              style={{
                height: `${layer.h}px`,
                transform: `rotateX(8deg)`,
                background: layer.active
                  ? (heat ? "repeating-linear-gradient(90deg, #F07E26 0px, #ff7a1a 6px, #2a1408 6px, #2a1408 14px)" : (dark ? "repeating-linear-gradient(90deg, #2a3a22 0px, #3a4d2c 6px, #14141B 6px, #14141B 14px)" : "repeating-linear-gradient(90deg, #d4e3c4 0px, #c0d6a8 6px, #f0f4ed 6px, #f0f4ed 14px)"))
                  : i === 0 ? (dark ? "#2b2118" : "#7a5a3a") : (dark ? "#1c1c24" : "#d9d9d9"),
                color: i === 0 ? "#fff" : (layer.active && heat ? "#fff" : (dark ? "#B8B7A4" : "#1A1F14")),
              }}>
              {layer.label}
            </div>
          </div>
        ))}
      </div>
      <div className={`absolute bottom-4 right-6 text-[9px] font-mono tracking-wider uppercase ${dark?"text-zinc-600":"text-[#8a9e7a]"}`}>
        {heat ? "85–95% ENERGY FOCUSED UPWARD" : "SYSTEM STATE: PASSIVE_MONITORING"}
      </div>
    </div>
  );
};

/* ── BULLET CARD ──────────────────────────────────────────────────────── */
const BulletCard = ({ icon: Icon, title, desc, dark, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        className="h-full rounded-2xl p-6 border cursor-default transition-all duration-300"
        style={{
          background: hov ? (dark ? "#14141B" : "#eceae5") : (dark ? "#1C1C24" : "#fff"),
          borderColor: hov ? GREEN : (dark ? "#3f3f46" : "#e4e4e7"),
          transform: hov ? "translateY(-5px)" : "none",
          boxShadow: hov ? `0 16px 40px rgba(148,195,86,0.14)` : "none",
        }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
          style={{ background: hov ? `${GREEN}22` : (dark ? "#14141B" : "#F0EFEA"), color: GREEN }}>
          <Icon size={17} />
        </div>
        <h4 className="text-sm font-black mb-2 leading-snug transition-colors duration-300"
          style={{ color: hov ? GREEN : (dark ? "#fff" : "#14141B") }}>{title}</h4>
        <p className="text-xs leading-relaxed" style={{ color: dark ? "#71717a" : "#52525b" }}>{desc}</p>
        <div className="mt-5 h-[2px] rounded-full transition-all duration-500"
          style={{ width: hov ? "100%" : "18%", background: GREEN, opacity: hov ? 1 : 0.35 }} />
      </div>
    </Reveal>
  );
};

/* ─── MAIN PAGE ────────────────────────────────────────────────────────── */
const FloorHeatingCaseStudiesPage = () => {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const [activeIntegration, setActiveIntegration] = useState(null);
  
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);
  
  const limeText = dark ? "#D9FE42" : "#12503C";
  const limeTextSoft = dark ? "#D9FE42" : "#3F6B2B";
  const h2Color = dark ? "text-white" : "text-[#14141B]";
  const mutedTxt = dark ? "text-zinc-400" : "text-[#5C6654]";
  const cardBg = dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200";
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F0EFEA] text-[#14141B]"}`}>
      {/* ─ HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 55% at 65% 35%, rgba(148,195,86,0.09) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 15% 75%, rgba(217,254,66,0.05) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/20 to-transparent" />
        <Link to="/industries/floorheating"
          className="absolute top-32 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-[#94C356] transition-colors">
          <FaArrowLeft size={10} /> Floor Heating
        </Link>
        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-16 pt-40">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: GREEN }}>4.3 — Residential / Case Studies</span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
              Head-to-Head.<br /><span style={{ color: GREEN }}>By Technology.</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed">
              Voltcore's CNT nanocomposite heating mesh benchmarked against carbon film, electric cable, and hydronic systems — thermal imaging, energy consumption, and installation time, side by side.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── MARKET OPPORTUNITY ───────────────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Market Opportunity</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Global Electric Underfloor Heating Market</h2>
            <p className={`text-sm mt-3 ${mutedTxt}`}>EU climate goals push low-CO₂ heating. 55–60% of EU electric UFH is used in renovations. Europe leads with Germany 23%, France 17%, UK 17%.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {MARKET_DATA.map(({l,v,d,pct,color},i)=>(
              <Reveal key={l} delay={i*120} y={26}>
                <div className={`p-7 rounded-2xl border h-full hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ${cardBg}`}>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{color}}>{l}</span>
                  <div className="text-3xl md:text-4xl font-black mt-1 mb-3" style={{color}}><CountUp to={parseFloat(v.replace(/[^0-9.]/g,''))} prefix="$" suffix="B"/></div>
                  <p className={`text-xs leading-relaxed mb-4 ${mutedTxt}`}>{d}</p>
                  <div className={`h-2.5 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
                    <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${pct}%`, background: color }} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal y={24}>
            <div className={`p-6 rounded-2xl border ${cardBg}`}>
              <div className="text-[10px] font-mono text-[#94C356] mb-1 uppercase tracking-widest">Market growth — USD billions · 2024 → 2034</div>
              <p className={`text-[10px] mb-4 ${mutedTxt}`}>Global electric underfloor heating market projection. Hover each data point to see the value.</p>
              <MarketGrowthChart dark={dark} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── VIDEO SHOWCASE ───────────────────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-4" y={20}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: ORANGE }}>// TargetHeat Showcase</span>
              <h3 className={`text-2xl md:text-3xl font-black uppercase mb-4 ${h2Color}`}>The Floor That Heats Itself</h3>
              <p className={`text-sm leading-relaxed mb-6 ${mutedTxt}`}>
                Watch the TargetHeat mesh installed beneath a finished floor — a slim, retrofit-ready layer that brings a full room from 20°C to 28°C in roughly three minutes. No screed removal, no destructive installation.
              </p>
              <div className="flex gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5" style={{ color: limeText }}><span className="w-3 h-0.5 inline-block" style={{ background: limeText }}/> TargetHeat Mesh</span>
                <span className={`flex items-center gap-1.5 ${mutedTxt}`}><span className="w-3 h-0.5 inline-block" style={{borderTop:"2px dashed currentColor"}}/> Legacy Cable</span>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={120} y={24}>
              <div className={`relative rounded-2xl overflow-hidden border shadow-xl max-h-[450px] transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(148,195,86,0.25)] ${dark?"border-zinc-800 bg-black":"border-zinc-200 bg-[#E4EBE0]"}`}>
                <video controls preload="metadata" className="w-full h-full max-h-[450px] object-contain">
                  <source src={FloorHeatingVideo} type="video/mp4"/>
                </video>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─ INTEGRATION MODULES ─────────────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// The Voltcore Answer</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Underfloor & Surface Heating — TargetHeat</h2>
            <p className={`text-sm mt-3 ${mutedTxt}`}>Ultra-responsive, targeted heat that transforms the installation workflow. Three product formats for every application.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INTEGRATION_MODULES.map(({id,num,title,weight,desc},i)=>(
              <Reveal key={id} delay={i*120} y={26}>
                <div
                  onMouseEnter={() => setActiveIntegration(id)}
                  onMouseLeave={() => setActiveIntegration(null)}
                  className={`p-7 rounded-2xl border h-full cursor-default transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${cardBg} ${activeIntegration===id ? "ring-2 ring-[#94C356]" : ""}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black" style={{ color: limeText }}>{num}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md" style={{ background: "#94C35622", color: "#94C356" }}>{weight}</span>
                  </div>
                  <h4 className={`text-sm font-bold mb-2 ${h2Color}`}>{title}</h4>
                  <p className={`text-xs leading-relaxed ${mutedTxt}`}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE FLOOR STACK ─────────────────────────────────── */}
      <section className={`py-24 px-6 border-b ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-5" y={24}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Uni-Directional Advantage</span>
              <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-none ${h2Color}`}>Zero Heat Wasted Downward</h2>
              <p className={`text-sm leading-relaxed mb-6 ${mutedTxt}`}>Toggle the panel to see the layer stack. Voltcore focuses 85–95% of all generated energy strictly toward the target surface, insulating the bottom backing layer. No heat is wasted into the concrete substrate.</p>
              <div className="space-y-4">
                {[
                  {icon:<FaLayerGroup className="text-[#94C356]" size={14}/>,title:"2.2mm layer thickness",body:"Slim retrofit profile, integrates into a vinyl sandwich or as a reinforcing mesh."},
                  {icon:<FaBolt className="text-[#F07E26]" size={14}/>,title:"5V–220V supply range",body:"Scalable from low-voltage furniture to full building power networks."},
                  {icon:<FaRecycle className="text-[#94C356]" size={14}/>,title:"Up to 75% recycled content",body:"100% mono-material PP/PA/PET matrix for effortless end-of-life recycling."},
                ].map(({icon,title,body},i)=>(
                  <Reveal key={title} delay={150 + i*100} y={14}>
                    <div className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1">
                      <span className="mt-0.5 shrink-0">{icon}</span>
                      <div>
                        <h5 className={`text-xs font-bold ${h2Color}`}>{title}</h5>
                        <p className={`text-[11px] ${mutedTxt}`}>{body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" delay={120} y={30}><FloorStackMap dark={dark}/></Reveal>
          </div>
        </div>
      </section>

      {/* ── TECHNICAL COMPARISON MATRIX ──────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Standardized Performance Testing</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Technical Comparison Matrix</h2>
            <p className={`text-sm mt-3 ${mutedTxt}`}>Total energy to raise a surface from 20°C to 28°C and maintain it for exactly 1 hour. CoV = average baseline cost of 1 m² vinyl flooring (ranging 15–60€).</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
            <Reveal y={20}>
              <h5 className={`text-xs font-bold uppercase tracking-widest mb-4 ${h2Color}`}>Installation Time (100 m²)</h5>
              <div className="space-y-4">
                {INSTALL_BARS.map((row,i)=>(
                  <AnimatedBar key={row.l} pct={row.pct} color={row.color} delay={i*90} dark={dark} label={row.l} value={row.label} />
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} y={20}>
              <h5 className={`text-xs font-bold uppercase tracking-widest mb-4 ${h2Color}`}>Energy Consumption (1hr hold at 28°C)</h5>
              <div className="space-y-4">
                {ENERGY_BARS.map((row,i)=>(
                  <AnimatedBar key={row.l} pct={row.pct} color={row.color} delay={i*90} dark={dark} label={row.l} value={`${row.wh} Wh`} />
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal y={24}>
            <div className={`rounded-2xl border overflow-x-auto ${dark?"border-zinc-800 bg-[#111116]":"border-zinc-200 bg-[#f7faf4]"}`}>
              <table className="w-full text-[11px] min-w-[640px]">
                <thead>
                  <tr className={dark?"bg-zinc-900":"bg-[#edf2e8]"}>
                    {["Performance Dimension","Voltcore TargetHeat","Carbon Film","Electric Cable","Liquid (Hydronic)"].map((h,i)=>(
                      <th key={h} className={`px-4 py-3 text-left font-bold ${i===1 ? "" : dark?"text-zinc-400":"text-[#5C6654]"}`} style={i===1?{color:limeText}:{}}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_DATA.map((row,i)=>(
                    <tr key={row.dim} className={i%2===0 ? "" : (dark?"bg-zinc-900/40":"bg-[#edf2e8]/50")}>
                      <td className={`px-4 py-2.5 font-bold ${dark?"text-zinc-200":"text-[#14141B]"}`}>{row.dim}</td>
                      <td className="px-4 py-2.5 font-black" style={{color:limeText}}>{row.voltcore}</td>
                      <td className={`px-4 py-2.5 ${mutedTxt}`}>{row.film}</td>
                      <td className={`px-4 py-2.5 ${mutedTxt}`}>{row.cable}</td>
                      <td className={`px-4 py-2.5 ${mutedTxt}`}>{row.liquid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── HEATING TREND CHART ──────────────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Time-to-Comfort Benchmark</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Heating Trend: 20°C → 28°C</h2>
            <p className={`text-sm mt-3 ${mutedTxt}`}>From 20°C to 28°C: Voltcore reaches target in 3 minutes. Carbon film takes ~1 hour. Electric cable takes ~1.5 hours.</p>
          </Reveal>
          <Reveal y={24}>
            <div className={`p-6 rounded-2xl border ${cardBg}`}>
              <HeatingTrendChart dark={dark} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── COMPETITIVE RADAR ────────────────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Head-to-Head</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>How Voltcore Compares</h2>
            <p className={`text-sm mt-3 ${mutedTxt}`}>Voltcore's materials surpass competing solutions on all key dimensions — energy efficiency, integration, durability, flexibility, and affordability.</p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-5 flex justify-center" y={26}><RadarChart dark={dark}/></Reveal>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {COMPETITIVE_POINTS.map(({title,body},i)=>(
                <BulletCard key={title} icon={FaCheckCircle} title={title} desc={body} dark={dark} delay={i*110} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL APPLICATION EXAMPLES (RESTRUCTURÉ) ─────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Proof of Concept</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Real Application Examples</h2>
            <p className={`text-sm mt-3 ${mutedTxt}`}>Working pilots with industry partners, from vinyl flooring to conductive carpet tile. Each project demonstrates a different integration pathway.</p>
          </Reveal>
          
          {POC_PROJECTS.map((project, idx) => (
            <Reveal key={project.title} delay={idx*130} y={28}>
              <div className={`p-8 rounded-2xl border transition-transform duration-300 hover:scale-[1.01] ${cardBg}`}>
                <span className="text-[10px] font-mono block mb-3" style={{color:project.color}}>{project.tag}</span>
                <h4 className={`text-base font-bold mb-3 ${h2Color}`}>{project.title}</h4>
                <p className={`text-sm leading-relaxed mb-8 ${mutedTxt}`}>{project.desc}</p>
                
                {/* 3 images en ligne avec légendes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {project.images.map((img, i) => (
                    <div key={i} className="space-y-3">
                      <div className="rounded-xl overflow-hidden border border-zinc-700 aspect-[4/3]">
                        <img src={img} alt={`Application example ${i+1}`} className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[11px] text-center italic leading-relaxed" style={{color: dark ? "#9ca3af" : "#6b7280"}}>
                        {i === 0 ? project.captions.left : i === 1 ? project.captions.middle : project.captions.right}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Sample specs et Layer structure en dessous */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`p-5 rounded-xl ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
                    <p className="text-xs font-bold mb-3" style={{color:project.color}}>Sample</p>
                    <div className="space-y-2">
                      {project.specs.map((spec, i) => (
                        <p key={i} className="text-xs"><span className="font-bold">{spec.l}:</span> <span className={mutedTxt}>{spec.v}</span></p>
                      ))}
                    </div>
                  </div>
                  
                  <div className={`p-5 rounded-xl ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
                    <p className="text-xs font-bold mb-3" style={{color:project.color}}>Layer Structure</p>
                    <div className="space-y-1.5">
                      {project.layers.map((layer, i) => (
                        <p key={i} className="text-xs"><span className="font-mono" style={{color:project.color}}>{i+1}.</span> <span className={mutedTxt}>{layer}</span></p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── FURNITURE & BEDDING INTEGRATION ──────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Beyond The Floor</span>
            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Furniture & Bedding Integration</h2>
            <p className={`text-sm mt-3 ${mutedTxt}`}>Active heating textiles behave like premium synthetic fabrics — bypassing the limitations of copper wires in consumer furnishings. Safe low-voltage thresholds (12–48V).</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FURNITURE_ITEMS.map(({icon:Icon,title,body},i)=>(
              <BulletCard key={title} icon={Icon} title={title} desc={body} dark={dark} delay={i*120} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIAL SPECIFICATIONS ──────────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4" y={24}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Material & Eco-Design</span>
              <h3 className={`text-2xl md:text-3xl font-black uppercase mb-4 ${h2Color}`}>Deep-Tech Material Matrix</h3>
              <p className={`text-sm leading-relaxed ${mutedTxt}`}>CNT nanofillers infused and oriented into a polymer matrix — exact electrical conductivity, original mechanical performance retained. With the help of CNTs, we make a synthetic yarn that can replace copper wire, and create fabrics or textiles that can be used as a heater.</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  {icon:<FaTools size={14}/>,title:"Resistance",val:"10kΩ–2MΩ/m",c:"#F07E26"},
                  {icon:<FaBolt size={14}/>,title:"Power Output",val:"50–1000 W/lin.m",c:"#94C356"},
                  {icon:<FaRecycle size={14}/>,title:"Recycled Content",val:"Up to 75%",c:limeText},
                  {icon:<FaLeaf size={14}/>,title:"Mono-Material",val:"100% PP/PA/PET",c:"#94C356"},
                ].map(({icon,title,val,c})=>(
                  <div key={title} className={`p-4 rounded-xl border transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5 ${cardBg}`}>
                    <span style={{color:c}}>{icon}</span>
                    <div className={`text-[10px] font-bold mt-2 ${h2Color}`}>{title}</div>
                    <div className="text-xs font-black" style={{color:c}}>{val}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="lg:col-span-8 space-y-3">
              {MATERIAL_SPECS.map(({l,v},i)=>(
                <Reveal key={l} delay={i*60} y={14}>
                  <div className={`flex items-center justify-between p-4 rounded-xl border transition-transform duration-300 hover:translate-x-1 ${dark?"border-zinc-800 bg-[#14141B]":"border-zinc-200 bg-[#f0f5eb]"}`}>
                    <span className={`text-xs font-bold ${h2Color}`}>{l}</span>
                    <span className="text-xs font-mono font-black" style={{ color: limeTextSoft }}>{v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SUSTAINABILITY ───────────────────────────────────────────── */}
      <section className={`py-20 px-6 border-b ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-200"}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Sustainability & Production</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Ultimate Customer Experience</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: FaBolt, title: "Immediate Heat Radiation", desc: "Starts to radiate heat immediately after being turned on. Heats from 20 to 30°C in 5 mins." },
              { icon: FaWind, title: "Healthy Indoor Air", desc: "Does not spread allergens and does not dry the air. No forced air circulation of dust or pet dander." },
              { icon: FaRecycle, title: "Easily Upcycled", desc: "Easily upcycled at the end of the lifecycle. Contains up to 75% of recycled content." },
              { icon: FaLeaf, title: "Lower CO₂ Emissions", desc: "Materials show superior energy efficiency, lightweight design, competitive price, lower CO₂ emissions and higher recyclability." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i*100} y={20}>
                  <div className={`p-7 rounded-2xl border h-full hover:scale-[1.03] hover:-translate-y-1 transition-all duration-300 ${cardBg}`}>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#94C356] mb-5 ${dark ? "bg-[#14141B]" : "bg-[#94C356]/10"}`}>
                      <Icon size={18} />
                    </div>
                    <h4 className={`text-sm font-bold mb-2 ${h2Color}`}>{item.title}</h4>
                    <p className={`text-xs leading-relaxed ${mutedTxt}`}>{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden bg-[#14141B] rounded-3xl p-12 md:p-20 text-center shadow-xl border border-zinc-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1 bg-[#94C356] blur-sm opacity-60 rounded-full" />
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 60% 50% at 50% 100%, ${GREEN}08 0%, transparent 70%)` }} />
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: GREEN }}>// Request TargetHeat Samples</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 max-w-2xl mx-auto">
              Ready to Upgrade Your Flooring Product Line?
            </h2>
            <p className="text-white/55 max-w-lg mx-auto mb-10 text-sm leading-relaxed">
              Sample meshes, Technical Data Sheets, and dedicated hardware integration engineering support for qualified flooring manufacturers and renovation specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"
                className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
                style={{ background: GREEN, color: "#14141B" }}
                onMouseEnter={e => { e.currentTarget.style.background = NEON; }}
                onMouseLeave={e => { e.currentTarget.style.background = GREEN; }}>
                Request TargetHeat Samples & TDS <FaArrowRight size={10} />
              </Link>
              <Link to="/industries/floorheating"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:border-[#94C356] hover:text-[#94C356]">
                Back to Floor Heating Overview
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
        @keyframes scanLine { 0%{top:0%;opacity:0.1} 50%{top:100%;opacity:0.6} 100%{top:0%;opacity:0.1} }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

export default FloorHeatingCaseStudiesPage;