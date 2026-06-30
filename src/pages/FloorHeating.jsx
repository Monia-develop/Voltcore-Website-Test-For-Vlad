import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaCheckCircle, FaBolt, FaClock, FaLeaf, FaRecycle,
  FaThermometerHalf, FaCouch, FaBed, FaHome, FaChevronRight, FaLayerGroup,
  FaWind, FaTools
} from "react-icons/fa";

import FloorHeroImage from "../assets/website/industries/underfloor-Heating2.png";
import FloorHeatingVideo from "../assets/website/FloorHeating.mp4";

/* ─── THEME CONTEXT (reads from app's ThemeContext if available) ─────────── */
const _ThemeCtx = createContext(undefined);
const useAppDark = (darkProp) => {
  if (darkProp !== undefined) return darkProp;
  try {
    const ctx = useContext(_ThemeCtx);
    if (ctx !== undefined) return !!ctx?.dark ?? !!ctx;
  } catch (_) {}
  return null;
};

/* ─── REAL DATA FROM 04d — SPACE & SURFACE HEATING ──────────────────────── */
// Technical Comparison Matrix (4.3)
const COMPARISON_DATA = [
  { dim: "Material Cost (per m²)", voltcore: "20€ + CoV*", film: "40–60€ + CoV*", cable: "40–70€ + CoV*", liquid: "70–90€ + CoV*" },
  { dim: "Time to Heat (20→28°C)", voltcore: "3 Minutes", film: "1 Hour", cable: "1.5 Hours", liquid: "Slow / High Inertia" },
  { dim: "Energy Consumption", voltcore: "56 Wh", film: "240 Wh", cable: "340 Wh", liquid: "400 Wh (Theoretical)" },
  { dim: "Total Energy Savings", voltcore: "Save up to 30%", film: "Baseline", cable: "Inherently inefficient", liquid: "High system losses" },
  { dim: "Installation (100 m²)", voltcore: "4 Hours", film: "3 Days", cable: "5 Days", liquid: "10–14 Days" },
  { dim: "Shapeability & Flex", voltcore: "3 — Highest", film: "2 — Moderate", cable: "2 — Moderate", liquid: "1 — Rigid Tubes" },
  { dim: "Warranty / Durability", voltcore: "10 Years", film: "5–15 Years", cable: "10–30 Years", liquid: "10–20 Years" },
];

// Installation time bars (days, lower = better) — normalized for display
const INSTALL_BARS = [
  { l: "Voltcore TargetHeat", days: 0.17, label: "4 Hours", pct: 100, color: "#D9FE42" },
  { l: "Carbon Film", days: 3, label: "3 Days", pct: 46, color: "#83D0F5" },
  { l: "Electric Cable", days: 5, label: "5 Days", pct: 30, color: "#F07E26" },
  { l: "Liquid (Hydronic)", days: 12, label: "10–14 Days", pct: 12, color: "#902053" },
];

// Energy consumption bars (Wh, lower = better)
const ENERGY_BARS = [
  { l: "Voltcore TargetHeat", wh: 56, pct: 100, color: "#D9FE42" },
  { l: "Carbon Film", wh: 240, pct: 70, color: "#83D0F5" },
  { l: "Electric Cable", wh: 340, pct: 50, color: "#F07E26" },
  { l: "Liquid (Hydronic)", wh: 400, pct: 40, color: "#902053" },
];

const INTEGRATION_MODULES = [
  { id: "mats", num: "01", title: "Retrofit-Ready Slim Mats", weight: "30–60 g/m²",
    desc: "Voltcore's Heating Mesh — an open structural layout engineered for rigid laminations, thin-set adhesives, or direct embedding. Applies directly over existing floors during renovations, no tear-out required." },
  { id: "textile", num: "02", title: "Radiant Wall & Ceiling Modules", weight: "120–250 g/m²",
    desc: "The drapable Heating Textile conforms to curved, complex, and bending architectural geometries. Embedded behind drywall or plaster to turn entire walls or ceilings into gentle, low-voltage (12–48V) radiant envelopes." },
  { id: "uni", num: "03", title: "The Uni-Directional Advantage", weight: "85–95% focused",
    desc: "Focuses generated energy strictly toward the target surface while insulating the bottom backing layer — zero heat wasted into the concrete substrate." },
];

const PROBLEMS = [
  { icon: <FaBolt size={18}/>, title: "Exorbitant Operational Costs", body: "Standard heating cables and carbon films waste significant thermal energy downward into the subfloor rather than focusing it upward toward the occupant." },
  { icon: <FaClock size={18}/>, title: "Long, Disruptive Installation", body: "Hydronic or standard electric wire layouts demand 3 to 14 days of specialized labor, screed layering, or destructive removal of old flooring." },
  { icon: <FaThermometerHalf size={18}/>, title: "High Thermal Inertia", body: "Legacy electric cables or carbon films take 1 hour to 90 minutes just to raise room temperatures from 20°C to a comfortable 28°C." },
  { icon: <FaWind size={18}/>, title: "Air Quality Degradation", body: "Forced-air and many conventional radiant setups dry out indoor air while continuously circulating dust, pet dander, and allergens." },
];

// Market sizing (Slide 3 — TAM/SAM/SOM)
const MARKET_DATA = [
  { l: "TAM", v: "$3.2B", d: "Global electric underfloor heating market (2025)", pct: 100, color: "#83D0F5" },
  { l: "SAM", v: "$1.4B", d: "Europe electric underfloor heating market (2025)", pct: 44, color: "#94C356" },
  { l: "SOM", v: "$0.8B", d: "Retrofit-ready electric segment in EU & UK", pct: 25, color: "#D9FE42" },
];

// Market growth chart — Slide 3 (actual chart data extracted from PPTX)
const MARKET_GROWTH = [
  { year: "2024", v: 3.1 }, { year: "2025", v: 3.2 }, { year: "2027", v: 3.6 },
  { year: "2029", v: 4.0 }, { year: "2032", v: 4.5 }, { year: "2034", v: 4.9 },
];

// Heating trend data — Slide 11 (simplified from actual chart: time in min → surface °C)
// Voltcore: 20→28°C in 3 min. Carbon film: ~60 min. Electric cable: ~90 min.
const HEATING_TREND = {
  time:    [0,   3,   10,  20,  30,  45,  60,  75,  90],
  voltcore:[20,  28,  28,  28,  28,  28,  28,  28,  28],
  film:    [20,  20.5,21.5,23,  24.5,26.2,28,  28,  28],
  cable:   [20,  20.2,20.8,21.8,22.8,24.5,26,  27.3,28],
};


// Competitive radar — Slide 8 (Voltcore vs legacy technologies, 5 dimensions, 0-5 scale)
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

// Real-world PoC / application examples (Slides 10 & 12)
const POC_PROJECTS = [
  {
    tag: "VINYL FLOORING — CLIENT SAMPLE", color: "#94C356", status: "Active integration", pct: 80,
    title: "Vinyl Flooring Sandwich Construction",
    desc: "Voltcore's mesh integrated between the layers of a vinyl flooring \"sandwich\" — can also be deployed as a reinforcing mesh. Efficient, uniform surface heating with zero heat lost to the bottom layer thanks to the uni-directional effect.",
    specs: [
      { l: "Design", v: "Wood" }, { l: "Format", v: "Rolls" }, { l: "Size", v: "20.5 ml × 1.5 m" },
    ],
    layers: ["Triple Action Protecsol® surface treatment", "Design film", "Recycled calendared surface backing", "D-MAX layer", "CXP-HD+ double-density foam"],
  },
  {
    tag: "DESSO CARPET TILE — ANTISTATIC", color: "#F07E26", status: "P2 — Direct Belltron displacement", pct: 60,
    title: "Conductive Carpet Tile Program",
    desc: "Four Voltcore plays mapped onto a DESSO carpet tile stack, ordered by readiness × strategic value — from a drop-in conductive backing fleece to a commercial conductive PET core shipping target of Q3 2026.",
    specs: [
      { l: "P1 — Conductive PP fleece", v: "Drop-in" }, { l: "P2 — PA6 monofilament", v: "The Prize" }, { l: "P4 — Conductive PET core", v: "Q3 2026" },
    ],
    layers: ["Face pile yarn (PA6)", "Primary backing (PET core + PP sleeve)", "Pre-coat / stabilizer", "Heavy backing (75% recycled chalk)", "Secondary fleece (PP)"],
  },
];

const FURNITURE_ITEMS = [
  { icon: <FaBed size={18}/>, title: "Smart Mattresses & Bedding", body: "Perfectly homogeneous heat distribution without rigid nodes or localized wires consumers can feel through the quilting. Safe low-voltage thresholds (12–48V)." },
  { icon: <FaCouch size={18}/>, title: "Active Sofas & Seating", body: "Embedded directly into internal padding foam, upholstery fabrics, performance leathers, or overmolded plastics without altering silhouette or compressibility." },
  { icon: <FaHome size={18}/>, title: "Therapeutic Cushions & Pillows", body: "Stable electrical resistivity across the entire surface over years of compression. Zero self-abrasion profile for long-term hospitality or residential use." },
];

/* ─── INTERSECTION HOOK ───────────────────────────────────────────────────── */
const useInView = (threshold = 0.3) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
};

/* ─── SCROLL REVEAL WRAPPER ───────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 28, className = "", as: Tag = "div", once = true, threshold = 0.15 }) => {
  const ref = useRef();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setShown(true);
        if (once) obs.disconnect();
      } else if (!once) {
        setShown(false);
      }
    }, { threshold, rootMargin: "0px 0px -8% 0px" });
    obs.observe(node);
    return () => obs.disconnect();
  }, [once, threshold]);
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0) scale(1)" : `translateY(${y}px) scale(0.985)`,
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
};

/* ─── ANIMATED COUNT-UP ───────────────────────────────────────────────────── */
const CountUp = ({ value, duration = 1200 }) => {
  const [ref, inView] = useInView(0.4);
  const [display, setDisplay] = useState(value.replace(/[0-9.]+/g, m => (m.includes(".") ? "0.0" : "0")));
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/-?\d+(\.\d+)?/);
    if (!match) { setDisplay(value); return; }
    const target = parseFloat(match[0]);
    const isFloat = match[0].includes(".");
    let start = null;
    const tick = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = target * eased;
      const curStr = isFloat ? cur.toFixed(1) : Math.round(cur).toString();
      setDisplay(value.replace(match[0], curStr));
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
  }, [inView, value, duration]);
  return <span ref={ref}>{display}</span>;
};

/* ─── ANIMATED BAR ────────────────────────────────────────────────────────── */
const Bar = ({ pct, color, delay = 0, dark }) => {
  const [ref, inView] = useInView(0.3);
  const [w, setW] = useState(0);
  useEffect(() => { if (inView) setTimeout(() => setW(pct), delay); }, [inView, pct, delay]);
  return (
    <div ref={ref} className={`w-full h-2.5 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: color }} />
    </div>
  );
};

/* ─── MARKET GROWTH BAR CHART (Slide 3 — animated, interactive) ──────────── */
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

  // Build animated polyline path
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

        {/* Area fill */}
        {visiblePts.length > 1 && (
          <polygon
            points={[...visiblePts, [visiblePts[visiblePts.length-1][0], PT+cH], [PL, PT+cH]].map(p=>p.join(",")).join(" ")}
            fill="#94C356" fillOpacity="0.10"
          />
        )}
        {/* Line */}
        <path d={path} fill="none" stroke="#94C356" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* Dots + tooltips */}
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

        {/* CAGR badge */}
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

/* ─── HEATING TREND LINE CHART (Slide 11 — temperature vs time) ────────────── */
const HeatingTrendChart = ({ dark, limeText }) => {
  const [ref, inView] = useInView(0.2);
  const [prog, setProg] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const dur = 1800;
    const tick = (ts) => { if (!s) s = ts; setProg(Math.min((ts - s) / dur, 1)); if ((ts - s) < dur) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  }, [inView]);

  const W = 560, H = 260, PL = 48, PR = 20, PT = 20, PB = 40;
  const cW = W - PL - PR, cH = H - PT - PB;
  const times = HEATING_TREND.time, yMin = 19, yMax = 30;
  const xScale = (i) => PL + (times[i] / 90) * cW;
  const yScale = (v) => PT + cH - ((v - yMin) / (yMax - yMin)) * cH;
  const textColor = dark ? "#71717a" : "#6b7280";
  const gridColor = dark ? "#27272a" : "#e5e7eb";

  const buildAnimPath = (vals) => {
    const allPts = vals.map((v, i) => [xScale(i), yScale(v)]);
    const n = Math.max(1, Math.round(allPts.length * prog));
    const pts = allPts.slice(0, n);
    if (pts.length < 2) return "";
    return pts.map((p, i) => `${i===0?"M":"L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  };

  const series = [
    { key: "voltcore", label: "Voltcore TargetHeat", color: limeText, dash: "", vals: HEATING_TREND.voltcore },
    { key: "film",     label: "Carbon Film",          color: "#83D0F5", dash: "6 3", vals: HEATING_TREND.film },
    { key: "cable",    label: "Electric Cable",       color: "#F07E26", dash: "3 3", vals: HEATING_TREND.cable },
  ];

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible">
        {/* grid */}
        {[20,22,24,26,28,30].map(v => (
          <g key={v}>
            <line x1={PL} x2={W-PR} y1={yScale(v)} y2={yScale(v)} stroke={v===28?"#94C35655":gridColor} strokeWidth={v===28?1.5:1} strokeDasharray={v===28?"4 4":""}/>
            <text x={PL-6} y={yScale(v)+4} textAnchor="end" fontSize="10" fill={textColor}>{v}°</text>
          </g>
        ))}
        {/* 28°C label */}
        <text x={W-PR+4} y={yScale(28)+4} fontSize="9" fill="#94C356" fontWeight="bold">28°C</text>

        {/* x axis ticks */}
        {[0,15,30,45,60,75,90].map(t => (
          <text key={t} x={PL + (t/90)*cW} y={H-6} textAnchor="middle" fontSize="10" fill={textColor}>{t}m</text>
        ))}
        <text x={W/2} y={H+2} textAnchor="middle" fontSize="10" fill={textColor}>Time (minutes)</text>
        <text x={12} y={H/2} textAnchor="middle" fontSize="10" fill={textColor} transform={`rotate(-90,12,${H/2})`}>°C</text>

        {/* curves */}
        {series.map(s => (
          <path key={s.key} d={buildAnimPath(s.vals)} fill="none" stroke={s.color} strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round" strokeDasharray={s.dash}/>
        ))}

        {/* Milestone: Voltcore hits 28°C at 3 min */}
        {prog > 0.95 && (
          <g>
            <line x1={xScale(1)} x2={xScale(1)} y1={yScale(28)} y2={PT+cH} stroke={limeText} strokeWidth="1" strokeDasharray="4 2" opacity="0.6"/>
            <circle cx={xScale(1)} cy={yScale(28)} r="5" fill={limeText} stroke="#14141B" strokeWidth="1.5"/>
            <rect x={xScale(1)+8} y={yScale(28)-16} width="42" height="18" rx="5" fill={dark?"#1c1c24":"#fff"} stroke={limeText} strokeWidth="1"/>
            <text x={xScale(1)+29} y={yScale(28)-4} textAnchor="middle" fontSize="9" fontWeight="bold" fill={limeText}>3 min</text>
          </g>
        )}

        {/* Legend */}
        {series.map((s, i) => (
          <g key={s.key} transform={`translate(${PL + 10}, ${PT + 8 + i * 14})`}>
            <line x1="0" y1="1" x2="14" y2="1" stroke={s.color} strokeWidth="2" strokeDasharray={s.dash}/>
            <text x="18" y="5" fontSize="10" fontWeight="bold" fill={s.color}>{s.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/* ─── RADAR CHART (competitive comparison) ──────────────────────────────── */
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

/* ─── INTERACTIVE FLOOR STACK MAP ─────────────────────────────────────────── */
// Visualizes the uni-directional heating effect: heat focused upward through
// the floor layer, with an active/passive toggle, mirroring the vest-map pattern.
const FloorStackMap = ({ dark }) => {
  const [heat, setHeat] = useState(false);
  const layers = [
    { label: "Flooring Finish (Vinyl / Laminate / Wood)", h: 54 },
    { label: "Voltcore TargetHeat Mesh — 2.2mm", h: 34, active: true },
    { label: "Substrate / Existing Subfloor", h: 54 },
  ];
  return (
    <div className={`relative w-full rounded-3xl overflow-hidden select-none border transition-all duration-300 p-6 shadow-2xl min-h-[420px] flex flex-col justify-center
      ${dark ? "bg-[#0b0c10] border-zinc-800" : "bg-[#f0f4ed] border-[#c8d8b8]"}`}>
      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#94C356] to-transparent opacity-30 pointer-events-none z-10 animate-scan" />
      <div className="absolute top-6 left-6 z-30">
        <button onClick={() => setHeat(!heat)}
          className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105
            ${heat ? "bg-[#F07E26] text-white shadow-[0_0_20px_rgba(240,126,38,0.5)]"
              : dark ? "bg-[#1c1c24] text-[#B8B7A4] border border-zinc-700"
              : "bg-white text-[#1A1F14] border border-[#c8d8b8]"}`}>
          {heat ? "🔥 Active — 3 min to 28°C" : "❄️ Passive State (20°C)"}
        </button>
      </div>
      <div className="relative flex flex-col items-center justify-center gap-2 py-10 max-w-[420px] mx-auto w-full">
        {/* Upward heat arrows */}
        {heat && [0,1,2].map(i => (
          <div key={i} className="absolute z-30 flex flex-col items-center" style={{ left: `${28 + i*22}%`, bottom: "46%" }}>
            <div className="w-[2px] h-10 animate-pulse" style={{ background: "linear-gradient(to top, #F07E26, transparent)" }} />
          </div>
        ))}
        {layers.map((layer, i) => (
          <div key={i} className="w-full relative" style={{ perspective: "600px" }}>
            <div
              className={`w-full rounded-lg border flex items-center justify-center text-[10px] font-bold uppercase tracking-wider transition-all duration-700 relative overflow-hidden
                ${layer.active
                  ? heat
                    ? "border-[#F07E26] shadow-[0_0_30px_rgba(240,126,38,0.6)]"
                    : dark ? "border-[#94C356]/60" : "border-[#94C356]/60"
                  : dark ? "border-zinc-700" : "border-[#c8d8b8]"}`}
              style={{
                height: `${layer.h}px`,
                transform: `rotateX(8deg)`,
                background: layer.active
                  ? (heat
                      ? "repeating-linear-gradient(90deg, #F07E26 0px, #ff7a1a 6px, #2a1408 6px, #2a1408 14px)"
                      : (dark ? "repeating-linear-gradient(90deg, #2a3a22 0px, #3a4d2c 6px, #14141B 6px, #14141B 14px)" : "repeating-linear-gradient(90deg, #d4e3c4 0px, #c0d6a8 6px, #f0f4ed 6px, #f0f4ed 14px)"))
                  : i === 0
                    ? (dark ? "#2b2118" : "#7a5a3a")
                    : (dark ? "#1c1c24" : "#d9d9d9"),
                color: i === 0 ? "#fff" : (layer.active && heat ? "#fff" : (dark ? "#B8B7A4" : "#1A1F14")),
              }}
            >
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

/* ─── PRODUCT AT A GLANCE — HOTSPOT DATA ─────────────────────────────────────
   Positions tuned for the isometric floor-stack render:
   - top-right = the wood/laminate surface  → x:76, y:29
   - centre    = the TargetHeat mesh layer  → x:52, y:54  (visible gold edge)
   - bottom-left = the concrete substrate   → x:27, y:73                        */
const FLOOR_HOTSPOTS = [
  { id: "surface", x: 63, y: 52, title: "Heated Surface",
    desc: "Laminate, tile, parquet, or vinyl — the finish layer sits directly on top. It receives 85–95% of the mesh's energy focused straight upward." },
  { id: "mesh", x: 50, y: 64, title: "Voltcore TargetHeat Mesh",
    desc: "Voltcore's uni-directional heating laminate — a 2.2mm CNT mesh that reaches 28°C in just 3 minutes and consumes only 56 Wh (vs 340 Wh for electric cable)." },
  { id: "substrate", x: 30, y: 74, title: "Substrate",
    desc: "Existing subfloor or concrete slab. The mesh insulates downward — close to zero heat wasted into the substrate, no screed removal needed." },
];

/* ─── HOTSPOT IMAGE COMPONENT ────────────────────────────────────────────────
   Pure CSS transitions — no extra runtime dependency.                          */
const HotspotImage = ({ src, alt, hotspots = [], dark }) => {
  const [activeId, setActiveId] = useState(null);
  return (
    <div className="relative w-full rounded-3xl overflow-hidden bg-black select-none shadow-2xl">
      <img src={src} alt={alt} className="w-full h-auto block" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />

      {hotspots.map((h, i) => {
        const isActive = activeId === h.id;
        const flip = h.x > 55;
        const dropUp = h.y > 60;
        return (
          <div key={h.id} className="absolute z-20"
            style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}>
            <button
              type="button"
              aria-label={h.title}
              onClick={() => setActiveId(isActive ? null : h.id)}
              onMouseEnter={() => setActiveId(h.id)}
              className="relative flex items-center justify-center w-9 h-9 focus:outline-none"
            >
              <span className={`absolute inline-flex h-full w-full rounded-full opacity-50 ${isActive ? "" : "animate-ping"}`}
                style={{ background: "#94C356" }} />
              <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black backdrop-blur-sm border-2 transition-all duration-300"
                style={{
                  background: isActive ? "#D9FE42" : "rgba(0,0,0,0.78)",
                  borderColor: isActive ? "#D9FE42" : "rgba(255,255,255,0.75)",
                  color: isActive ? "#14141B" : "#fff",
                  boxShadow: isActive ? "0 0 18px rgba(217,254,66,0.6)" : "none",
                  transform: isActive ? "scale(1.12)" : "scale(1)",
                }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>

            {isActive && (
              <div className="absolute z-30"
                style={{
                  left: flip ? "auto" : "calc(100% + 12px)",
                  right: flip ? "calc(100% + 12px)" : "auto",
                  top: dropUp ? "auto" : "50%",
                  bottom: dropUp ? "50%" : "auto",
                  transform: dropUp ? "translateY(50%)" : "translateY(-50%)",
                }}
                onMouseLeave={() => setActiveId(null)}>
                <div className="w-64 rounded-2xl p-4 border animate-fadeInUp"
                  style={{
                    background: "rgba(11,12,16,0.97)",
                    borderColor: "rgba(148,195,86,0.5)",
                    boxShadow: "0 0 30px rgba(148,195,86,0.15)",
                  }}>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: "#D9FE42" }}>
                    {String(i + 1).padStart(2, "0")} //
                  </span>
                  <h4 className="text-sm font-bold text-white mt-1 mb-1 leading-snug">{h.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
// USAGE: <FloorHeating dark={isDark} />
const FloorHeating = ({ dark: darkProp }) => {
  const [activeIntegration, setActiveIntegration] = useState(null);

  const getSystemDark = () => {
    if (typeof document === "undefined") return false;
    if (document.documentElement.classList.contains("dark")) return true;
    if (document.body.classList.contains("dark")) return true;
    try { return localStorage.getItem("theme") === "dark"; } catch (_) {}
    return false;
  };
  const [domDark, setDomDark] = useState(getSystemDark);
  useEffect(() => {
    if (darkProp !== undefined) return;
    const obs = new MutationObserver(() => setDomDark(getSystemDark()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    obs.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [darkProp]);
  const dark = darkProp !== undefined ? darkProp : domDark;

  const limeText = dark ? "#D9FE42" : "#12503C";
  const limeTextSoft = dark ? "#D9FE42" : "#3F6B2B";

  const pageBg     = dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F2F5EF] text-[#1A1F14]";
  const pageBgOnly = dark ? "bg-[#14141B]" : "bg-[#F2F5EF]";
  const heroBg     = dark ? "bg-[#0b0c10]" : "bg-[#E4EBE0]";
  const altBg      = dark ? "bg-[#111116]" : "bg-[#E8EEE4]";
  const cardBg     = dark ? "bg-[#1c1c24] border-zinc-800" : "bg-white border-[#c8d8b8]";
  const bdColor    = dark ? "border-zinc-800" : "border-[#c8d8b8]";
  const h2Color    = dark ? "text-white" : "text-[#1A1F14]";
  const mutedTxt   = dark ? "text-zinc-400" : "text-[#5C6654]";

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${pageBg}`}>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        className={`relative h-[85vh] flex items-end overflow-hidden ${heroBg}`}
        onMouseMove={e => {
          const r = e.currentTarget.getBoundingClientRect();
          const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
          const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
          e.currentTarget.style.setProperty("--mx", mx.toFixed(3));
          e.currentTarget.style.setProperty("--my", my.toFixed(3));
        }}
      >
        <Link to="/industries" className={`absolute top-28 left-8 z-20 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-colors hover:translate-x-[-2px] duration-300 ${dark?"text-white/60 hover:text-[#94C356]":"text-[#1A1F14]/60 hover:text-[#94C356]"}`}>
          <FaArrowLeft size={10} /> Back to Industries
        </Link>

        {/* Background showcase image */}
        <div className="absolute inset-0 z-0">
          <img src={FloorHeroImage} alt="Voltcore TargetHeat Underfloor Heating" className="w-full h-full object-cover opacity-90" draggable={false} />
          <div className={`absolute inset-0 ${dark ? "bg-gradient-to-t from-[#0b0c10] via-[#0b0c10]/40 to-transparent" : "bg-gradient-to-t from-[#E4EBE0] via-[#E4EBE0]/30 to-transparent"}`} />
        </div>

        <div className="absolute inset-0 pointer-events-none z-[1]">
          <div
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 transition-transform duration-700 ease-out"
            style={{background:"radial-gradient(circle,#94C356,transparent)", transform:"translate(calc(var(--mx,0) * 18px), calc(var(--my,0) * 18px))"}}/>
          <div
            className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-8 transition-transform duration-700 ease-out"
            style={{background:"radial-gradient(circle,#F07E26,transparent)", transform:"translate(calc(var(--mx,0) * -14px), calc(var(--my,0) * -14px))"}}/>
        </div>

        <div className="container mx-auto px-6 md:px-12 pb-16 relative z-20 max-w-7xl">
          <div className="max-w-4xl">
            <Reveal y={16}><span className="text-xs font-black uppercase tracking-[0.3em] text-[#94C356] block mb-4">// SPACE & SURFACE HEATING DIVISION</span></Reveal>
            <Reveal delay={90} y={22}>
              <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none ${h2Color}`}>
                Heat Engineered <br /><span className="text-[#F07E26]">Directly Into The</span> Surface.
              </h1>
            </Reveal>
            <Reveal delay={180} y={22}>
              <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${mutedTxt}`}>
                A CNT-based nanocomposite filament woven into ultra-thin meshes and textiles — replacing slow, wasteful legacy underfloor, wall, and ceiling heating with a precise, energy-efficient surface heating solution.
              </p>
            </Reveal>
            {/* KPI row */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[{v:"3 Minutes",l:"20°C → 28°C"},{v:"4 Hours",l:"100m² Install"},{v:"30%",l:"Energy Savings"},{v:"95%",l:"Heat Focused Up"}].map(({v,l},i)=>(
                <Reveal as="div" key={l} delay={260 + i*90} y={18}>
                  <div className={`text-2xl font-black leading-none transition-transform duration-300 hover:scale-110 hover:text-[#94C356] cursor-default ${h2Color}`}><CountUp value={v}/></div>
                  <div className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${mutedTxt}`}>{l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT AT A GLANCE — HOTSPOTS ──────────────────────────────── */}
      <section className={`py-20 border-b ${pageBgOnly} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// PRODUCT AT A GLANCE</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Three Layers, One Direction</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Tap a marker to break down exactly what's underfoot.</p>
          </Reveal>
          <Reveal delay={120} y={26}>
            <HotspotImage
              src={FloorHeroImage}
              alt="Voltcore TargetHeat mesh layer stack — heated surface, mesh, substrate"
              hotspots={FLOOR_HOTSPOTS}
              dark={dark}
            />
          </Reveal>
        </div>
      </section>

      {/* ── VIDEO ─────────────────────────────────────────────────────── */}
      <section className={`py-16 border-b ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-4" y={20}>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F07E26] block mb-2">// TARGETHEAT SHOWCASE</span>
              <h3 className={`text-2xl md:text-3xl font-black uppercase mb-4 ${h2Color}`}>The Floor That Heats Itself</h3>
              <p className={`text-xs leading-relaxed mb-6 ${mutedTxt}`}>
                Watch the TargetHeat mesh installed beneath a finished floor — a slim, retrofit-ready layer that brings a full room from 20°C to 28°C in roughly three minutes.
              </p>
              <div className="flex gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5" style={{ color: limeText }}><span className="w-3 h-0.5 inline-block" style={{ background: limeText }}/> TargetHeat Mesh</span>
                <span className={`flex items-center gap-1.5 ${mutedTxt}`}><span className={`w-3 h-0.5 inline-block ${dark?"bg-zinc-500":"bg-zinc-400"}`} style={{borderTop:"2px dashed currentColor"}}/> Legacy Cable</span>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={120} y={24}>
              <div className={`relative rounded-3xl overflow-hidden border shadow-xl max-h-[450px] transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(148,195,86,0.25)] ${dark?"border-zinc-800 bg-black":"border-[#c8d8b8] bg-[#E4EBE0]"}`}>
                <video controls preload="metadata" className="w-full h-full max-h-[450px] object-contain">
                  <source src={FloorHeatingVideo} type="video/mp4"/>
                </video>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MARKET SIZING (Slide 3 — TAM/SAM/SOM) ───────────────────────── */}
      <section className={`py-16 border-b ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// MARKET OPPORTUNITY</span>
            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>Global Electric Underfloor Heating Market</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {MARKET_DATA.map(({l,v,d,pct,color},i)=>(
              <Reveal key={l} delay={i*120} y={26}>
                <div className={`p-7 rounded-3xl border h-full hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 ${cardBg}`}>
                  <span className="text-[10px] font-black uppercase tracking-widest" style={{color}}>{l}</span>
                  <div className="text-3xl md:text-4xl font-black mt-1 mb-3" style={{color}}><CountUp value={v}/></div>
                  <p className={`text-xs leading-relaxed mb-4 ${mutedTxt}`}>{d}</p>
                  <Bar pct={pct} color={color} delay={i*100} dark={dark}/>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              {t:"Energy Efficiency", d:"EU climate goals push low-CO₂ heating."},
              {t:"Retrofit Demand", d:"55–60% of EU electric UFH used in renovations."},
              {t:"5–7% CAGR", d:"Steady growth through 2034 globally."},
              {t:"Europe Leads", d:"Germany 23% · France 17% · UK 17%."},
            ].map(({t,d},i)=>(
              <Reveal key={t} delay={300 + i*80} y={18}>
                <div className={`p-4 rounded-2xl border ${dark?"border-zinc-800 bg-[#14141B]":"border-[#c8d8b8] bg-[#f0f5eb]"}`}>
                  <div className={`text-xs font-black mb-1 ${h2Color}`}>{t}</div>
                  <div className={`text-[10px] ${mutedTxt}`}>{d}</div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Market growth line chart — real PPTX data 2024→2034 */}
          <Reveal y={24}>
            <div className={`p-6 rounded-3xl border ${cardBg}`}>
              <div className="text-[10px] font-mono text-[#94C356] mb-1 uppercase tracking-widest">Market growth — USD billions · 2024 → 2034</div>
              <p className={`text-[10px] mb-4 ${mutedTxt}`}>Global electric underfloor heating market projection. Hover each data point to see the value.</p>
              <MarketGrowthChart dark={dark} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEMS (4.1) ───────────────────────────────────────────── */}
      <section className={`py-16 border-b ${pageBgOnly} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// THE CLIENT PROBLEM</span>
            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>Why Legacy Systems Fail</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map(({icon,title,body},i)=>(
              <Reveal key={title} delay={i*110} y={26}>
                <div className={`p-8 rounded-3xl border h-full hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${cardBg}`}>
                  <div className="w-12 h-12 bg-[#F07E26]/10 rounded-2xl flex items-center justify-center text-[#F07E26] mb-6">{icon}</div>
                  <h4 className={`text-sm font-bold mb-2 ${h2Color}`}>{title}</h4>
                  <p className={`text-xs leading-relaxed ${mutedTxt}`}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TARGETHEAT SOLUTION (4.2) ───────────────────────────────────── */}
      <section className={`py-20 border-b ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// THE VOLTCORE ANSWER</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Underfloor &amp; Surface Heating — TargetHeat</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Ultra-responsive, targeted heat that transforms the installation workflow.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INTEGRATION_MODULES.map(({id,num,title,weight,desc},i)=>(
              <Reveal key={id} delay={i*120} y={26}>
                <div
                  onClick={() => setActiveIntegration(p => p === id ? null : id)}
                  className={`p-7 rounded-3xl border h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${cardBg} ${activeIntegration===id ? "ring-2 ring-[#94C356]" : ""}`}>
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

      {/* ── INTERACTIVE FLOOR STACK ─────────────────────────────────────── */}
      <section className={`py-24 ${pageBgOnly}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-5" y={24}>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// UNI-DIRECTIONAL ADVANTAGE</span>
              <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-none ${h2Color}`}>Zero Heat Wasted Downward</h2>
              <p className={`text-xs leading-relaxed mb-6 ${mutedTxt}`}>Toggle the panel to see the layer stack. Voltcore focuses 85–95% of all generated energy strictly toward the target surface, insulating the bottom backing layer.</p>
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

      {/* ── TECHNICAL COMPARISON MATRIX (4.3) ───────────────────────────── */}
      <section className={`py-20 border-t ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// STANDARDIZED PERFORMANCE TESTING</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>Technical Comparison Matrix</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Total energy to raise a surface from 20°C to 28°C and maintain it for exactly 1 hour.</p>
          </Reveal>

          {/* Animated comparison bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-14">
            <Reveal y={20}>
              <h5 className={`text-xs font-bold uppercase tracking-widest mb-4 ${h2Color}`}>Installation Time (100 m²)</h5>
              <div className="space-y-4">
                {INSTALL_BARS.map((row,i)=>(
                  <div key={row.l}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={h2Color}>{row.l}</span>
                      <span className="font-mono text-[10px]" style={{color:row.color}}>{row.label}</span>
                    </div>
                    <Bar pct={row.pct} color={row.color} delay={i*90} dark={dark}/>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} y={20}>
              <h5 className={`text-xs font-bold uppercase tracking-widest mb-4 ${h2Color}`}>Energy Consumption (1hr hold)</h5>
              <div className="space-y-4">
                {ENERGY_BARS.map((row,i)=>(
                  <div key={row.l}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={h2Color}>{row.l}</span>
                      <span className="font-mono text-[10px]" style={{color:row.color}}>{row.wh} Wh</span>
                    </div>
                    <Bar pct={row.pct} color={row.color} delay={i*90} dark={dark}/>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Full matrix table */}
          <Reveal y={24}>
            <div className={`rounded-2xl border overflow-x-auto ${dark?"border-zinc-800 bg-[#111116]":"border-[#c8d8b8] bg-[#f7faf4]"}`}>
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
                      <td className={`px-4 py-2.5 font-bold ${dark?"text-zinc-200":"text-[#1A1F14]"}`}>{row.dim}</td>
                      <td className="px-4 py-2.5 font-black" style={{color:limeText}}>{row.voltcore}</td>
                      <td className={`px-4 py-2.5 ${mutedTxt}`}>{row.film}</td>
                      <td className={`px-4 py-2.5 ${mutedTxt}`}>{row.cable}</td>
                      <td className={`px-4 py-2.5 ${mutedTxt}`}>{row.liquid}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={`text-[10px] mt-2 ${mutedTxt}`}>*CoV = average baseline cost of 1 m² vinyl flooring (ranging 15–60€).</p>
          </Reveal>
        </div>
      </section>

      {/* ── COMPETITIVE RADAR (Slide 8) ─────────────────────────────────── */}
      <section className={`py-20 border-t ${pageBgOnly} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// HEAD-TO-HEAD</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>How Voltcore Compares</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Voltcore's materials surpass competing solutions on all key dimensions.</p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-5 flex justify-center" y={26}><RadarChart dark={dark}/></Reveal>
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {COMPETITIVE_POINTS.map(({title,body},i)=>(
                <Reveal key={title} delay={i*110} y={20}>
                  <div className={`p-5 rounded-2xl border h-full transition-transform duration-300 hover:-translate-y-1 ${cardBg}`}>
                    <h5 className={`text-xs font-bold mb-1.5 ${h2Color}`} style={{color:limeText}}>{title}</h5>
                    <p className={`text-[11px] leading-relaxed ${mutedTxt}`}>{body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REAL APPLICATIONS / PoC PROJECTS ─────────────────────────────── */}
      <section className={`py-20 border-t ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// PROOF OF CONCEPT</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>Real Application Examples</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Working pilots with industry partners, from vinyl flooring to conductive carpet tile.</p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {POC_PROJECTS.map(({tag,color,status,pct,title,desc,specs,layers},i)=>(
              <Reveal key={title} delay={i*130} y={28}>
                <div className={`p-7 rounded-3xl border h-full transition-transform duration-300 hover:scale-[1.01] ${cardBg}`}>
                  <span className="text-[10px] font-mono block mb-3" style={{color}}>{tag}</span>
                  <h4 className={`text-base font-bold mb-2 ${h2Color}`}>{title}</h4>
                  <p className={`text-xs leading-relaxed mb-5 ${mutedTxt}`}>{desc}</p>

                  <div className="flex justify-between text-[11px] font-bold mb-1.5">
                    <span className={h2Color}>Pilot status</span>
                    <span className="font-mono text-[10px]" style={{color}}>{status}</span>
                  </div>
                  <Bar pct={pct} color={color} delay={i*90} dark={dark}/>

                  <div className="grid grid-cols-3 gap-2 mt-5 mb-5">
                    {specs.map(({l,v})=>(
                      <div key={l} className={`p-2.5 rounded-xl border text-center ${dark?"border-zinc-800 bg-[#111116]":"border-[#c8d8b8] bg-[#f7faf4]"}`}>
                        <div className={`text-[9px] uppercase font-bold ${mutedTxt}`}>{l}</div>
                        <div className="text-[11px] font-black mt-0.5" style={{color}}>{v}</div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    {layers.map((layer, li)=>(
                      <div key={layer} className="flex items-center gap-2">
                        <span className="text-[9px] font-mono w-4 shrink-0" style={{color:dark?"#4a4a55":"#9aab85"}}>{li+1}</span>
                        <span className={`text-[10px] ${mutedTxt}`}>{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FURNITURE & BEDDING INTEGRATION (4.4) ───────────────────────── */}
      <section className={`py-20 border-t ${pageBgOnly} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// BEYOND THE FLOOR</span>
            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>Furniture &amp; Bedding Integration</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Active heating textiles behave like premium synthetic fabrics — bypassing the limitations of copper wires in consumer furnishings.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FURNITURE_ITEMS.map(({icon,title,body},i)=>(
              <Reveal key={title} delay={i*120} y={26}>
                <div className={`p-8 rounded-3xl border h-full hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${cardBg}`}>
                  <div className="w-12 h-12 bg-[#94C356]/10 rounded-2xl flex items-center justify-center text-[#94C356] mb-6">{icon}</div>
                  <h4 className={`text-sm font-bold mb-2 ${h2Color}`}>{title}</h4>
                  <p className={`text-xs leading-relaxed ${mutedTxt}`}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MATERIAL SPECIFICATIONS (4.5) ───────────────────────────────── */}
      <section className={`py-20 border-t ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4" y={24}>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// MATERIAL & ECO-DESIGN</span>
              <h3 className={`text-2xl md:text-3xl font-black uppercase mb-4 ${h2Color}`}>Deep-Tech Material Matrix</h3>
              <p className={`text-xs leading-relaxed ${mutedTxt}`}>CNT nanofillers infused and oriented into a polymer matrix — exact electrical conductivity, original mechanical performance retained.</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  {icon:<FaTools size={14}/>,title:"Resistance",val:"10kΩ–2MΩ/m",c:"#F07E26"},
                  {icon:<FaBolt size={14}/>,title:"Power Output",val:"50–1000 W/lin.m",c:"#94C356"},
                  {icon:<FaRecycle size={14}/>,title:"Recycled Content",val:"Up to 75%",c:limeText},
                  {icon:<FaLeaf size={14}/>,title:"Mono-Material",val:"100% PP/PA/PET",c:"#94C356"},
                ].map(({icon,title,val,c})=>(
                  <div key={title} className={`p-4 rounded-2xl border transition-transform duration-300 hover:scale-105 hover:-translate-y-0.5 ${cardBg}`}>
                    <span style={{color:c}}>{icon}</span>
                    <div className={`text-[10px] font-bold mt-2 ${h2Color}`}>{title}</div>
                    <div className="text-xs font-black" style={{color:c}}>{val}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <div className="lg:col-span-8 space-y-3">
              {[
                {l:"Roll Width", v:"10cm – 2m"},
                {l:"Roll Length", v:"Up to 10m"},
                {l:"Layer Thickness", v:"2.2mm"},
                {l:"Supply Voltage", v:"5V – 220V"},
                {l:"Power Density", v:"50–1000 W/lin.m."},
                {l:"Heating Mesh Weight", v:"30–60 g/m²"},
                {l:"Heating Textile Weight", v:"120–250 g/m²"},
                {l:"Furniture Voltage Range", v:"12–48V (low-voltage safe)"},
              ].map(({l,v},i)=>(
                <Reveal key={l} delay={i*60} y={14}>
                  <div className={`flex items-center justify-between p-4 rounded-xl border transition-transform duration-300 hover:translate-x-1 ${dark?"border-zinc-800 bg-[#14141B]":"border-[#c8d8b8] bg-[#f0f5eb]"}`}>
                    <span className={`text-xs font-bold ${h2Color}`}>{l}</span>
                    <span className="text-xs font-mono font-black" style={{ color: limeTextSoft }}>{v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className={`py-20 ${pageBgOnly}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className={`relative overflow-hidden rounded-3xl p-12 md:p-20 text-center border transition-transform duration-500 hover:scale-[1.01] ${cardBg}`} y={32}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-20" style={{background:"#94C356"}}/>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-10" style={{background:"#F07E26"}}/>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#94C356] block mb-4 relative">// REQUEST SAMPLES</span>
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 max-w-3xl mx-auto relative ${h2Color}`}>
              Ready to upgrade your flooring product line?
            </h2>
            <div className="flex justify-center relative">
              <Link to="/contact" className="group inline-flex items-center gap-2 bg-[#94C356] text-[#14141B] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#D9FE42] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(148,195,86,0.4)] hover:scale-105">
                Request TargetHeat Samples &amp; TDS <FaChevronRight size={10} className="transition-transform duration-300 group-hover:translate-x-1"/>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes scanLine { 0%{top:0%;opacity:0.1} 50%{top:100%;opacity:0.6} 100%{top:0%;opacity:0.1} }
        .animate-scan { animation: scanLine 4s linear infinite; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(-30%)} to{opacity:1;transform:translateY(-50%)} }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out forwards; }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(6px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .animate-fadeInUp { animation: fadeInUp 0.2s cubic-bezier(.22,.61,.36,1) forwards; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default FloorHeating;
