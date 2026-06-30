import React, { useState, useEffect, useRef, useContext, createContext } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaCheckCircle, FaSnowflake,
  FaThermometerHalf, FaWeightHanging, FaTshirt,
  FaBriefcase, FaMotorcycle, FaHeartbeat, FaChevronRight,
  FaBolt, FaRecycle, FaLeaf
} from "react-icons/fa";

import Image40 from "../assets/website/industries/image40.png";
import HeatingJacketVideo from "../assets/website/HeatingJacket.mp4";

/* ─── THEME CONTEXT (reads from app's ThemeContext if available) ─────────── */
// Tries common context names used in React apps; gracefully falls back if none found
const _ThemeCtx = createContext(undefined);
const useAppDark = (darkProp) => {
  // 1. Prop wins if explicitly passed
  if (darkProp !== undefined) return darkProp;
  // 2. Try to read from a ThemeContext (if the app provides one)
  try {
    const ctx = useContext(_ThemeCtx);
    if (ctx !== undefined) return !!ctx?.dark ?? !!ctx;
  } catch (_) {}
  return null; // signals: use DOM fallback
};

/* ─── REAL DATA FROM PPTX SLIDES 6 & 7 ──────────────────────────────────── */
// Slide 6: temperature curves over time (min)
const CURVE_DATA_S6 = {
  time:     [0,    1,    2,    3,    4,    5],
  voltcore: [24.9, 40.5, 43.5, 44.9, 45.3, 46],
  client1:  [24.9, 34,   35.1, 36.1, 36.2, 36.3],
};
// Slide 7: temperature curves — same temp performance, less energy
const CURVE_DATA_S7 = {
  time:     [0,    1,    2,    3,    4,    5],
  voltcore: [24.9, 40.5, 43.5, 44.9, 45.3, 46],
  client2:  [24.9, 40.8, 43.1, 43.6, 43.9, 44.2],
};
const PAD_DATA_VOLTCORE = [
  { zone: "Back",    area: 143, power: 2.64,  density: 28.8 },
  { zone: "Chest R", area: 60,  power: 1.68,  density: 28.8 },
  { zone: "Chest L", area: 60,  power: 1.68,  density: 28.8 },
  { zone: "Pocket R",area: 51,  power: 1.44,  density: 28.8 },
  { zone: "Pocket L",area: 51,  power: 1.44,  density: 28.8 },
  { zone: "TOTAL",   area: 365, power: 8.88,  density: 28.8 },
];
const PAD_DATA_CLIENT2 = [
  { zone: "Back",    area: 138, power: 4.254, density: 30.8 },
  { zone: "Chest R", area: 60,  power: 2.119, density: 35.3 },
  { zone: "Chest L", area: 60,  power: 2.119, density: 35.3 },
  { zone: "Pocket R",area: 48,  power: 2.120, density: 44.2 },
  { zone: "Pocket L",area: 48,  power: 2.176, density: 45.3 },
  { zone: "TOTAL",   area: 354, power: 12.79, density: 36.1 },
];

/* ─── HOTSPOTS ─────────────────────────────────────────────────────────────── */
const HOTSPOTS = [
  { id: "chest", x: 40, y: 35, num: "01", title: "Chest Heating Matrices",
    desc: "CNT polymer filaments embedded directly into the insulation layer. ΔT = 6°C across the full zone — uniform warmth, zero hot spots." },
  { id: "collar", x: 50, y: 13, num: "02", title: "Collar Thermal Element",
    desc: "Instant ergonomic warmth at the neck zone. Mitigates extreme wind chill at high-velocity. Same 5–12V supply as chest pads." },
  { id: "battery", x: 35, y: 75, num: "03", title: "5V–12V Power Connection",
    desc: "Compatible with consumer power banks. 2h 50min continuous at max power on a 3500mAh — 50 minutes longer than carbon ink pads." },
];

/* ─── INTERSECTION HOOK ─────────────────────────────────────────────────────── */
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

/* ─── SCROLL REVEAL WRAPPER ──────────────────────────────────────────────────── */
// Generic "appear on scroll" wrapper. Wrap any block of content with <Reveal> to
// have it fade + slide into place the first time it enters the viewport.
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

// Stagger helper — wraps a list of children, each one delayed a bit more than the last.
const RevealGroup = ({ children, baseDelay = 0, step = 90, className = "" }) => (
  <>
    {React.Children.map(children, (child, i) => (
      <Reveal delay={baseDelay + i * step} className={className}>{child}</Reveal>
    ))}
  </>
);

/* ─── ANIMATED COUNT-UP (for KPI numbers, on-scroll) ─────────────────────────── */
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

/* ─── SVG LINE CHART ────────────────────────────────────────────────────────── */
const LineChart = ({ data, dark, label1, label2, color1 = "#D9FE42", color2 = "#4466FF",
  yMin = 20, yMax = 55, milestone1, milestone2 }) => {
  const [ref, inView] = useInView(0.2);
  const [progress, setProgress] = useState(0);
  const W = 560, H = 260, PL = 48, PR = 20, PT = 20, PB = 40;
  const cW = W - PL - PR, cH = H - PT - PB;

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const dur = 1400;
    const tick = (ts) => {
      if (!start) start = ts;
      setProgress(Math.min((ts - start) / dur, 1));
      if ((ts - start) < dur) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  const xScale = (i) => PL + (i / (data.time.length - 1)) * cW;
  const yScale = (v) => PT + cH - ((v - yMin) / (yMax - yMin)) * cH;

  const buildPath = (vals) => {
    const pts = vals.map((v, i) => [xScale(i), yScale(v)]);
    const n = Math.max(1, Math.floor(pts.length * progress));
    const visible = pts.slice(0, n);
    if (visible.length < 2) return `M ${visible[0]?.[0] ?? 0} ${visible[0]?.[1] ?? 0}`;
    return visible.map((p, i) => (i === 0 ? `M ${p[0]} ${p[1]}` : `L ${p[0]} ${p[1]}`)).join(" ");
  };

  const gridLines = [25, 30, 35, 40, 45, 50];
  const textColor = dark ? "#71717a" : "#6b7280";
  const gridColor = dark ? "#27272a" : "#e5e7eb";

  return (
    <div ref={ref}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="overflow-visible">
        {/* Grid */}
        {gridLines.map(v => (
          <g key={v}>
            <line x1={PL} x2={W - PR} y1={yScale(v)} y2={yScale(v)} stroke={gridColor} strokeWidth="1" />
            <text x={PL - 6} y={yScale(v) + 4} textAnchor="end" fontSize="11" fill={textColor}>{v}</text>
          </g>
        ))}
        {/* X axis labels */}
        {data.time.map((t, i) => (
          <text key={i} x={xScale(i)} y={H - 8} textAnchor="middle" fontSize="11" fill={textColor}>{t}</text>
        ))}
        <text x={W / 2} y={H - 0} textAnchor="middle" fontSize="11" fill={textColor}>Time, min</text>
        <text x={12} y={H / 2} textAnchor="middle" fontSize="11" fill={textColor}
          transform={`rotate(-90, 12, ${H / 2})`}>Av. Temp, °C</text>

        {/* Curves */}
        <path d={buildPath(data.voltcore)} fill="none" stroke={color1} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d={buildPath(data.client2 ?? data.client1)} fill="none" stroke={color2} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 3" />

        {/* Data point dots */}
        {progress > 0.95 && data.voltcore.map((v, i) => (
          <circle key={i} cx={xScale(i)} cy={yScale(v)} r="4" fill={color1} />
        ))}
        {progress > 0.95 && (data.client2 ?? data.client1).map((v, i) => (
          <circle key={i} cx={xScale(i)} cy={yScale(v)} r="4" fill={color2} />
        ))}

        {/* Value labels at last point */}
        {progress > 0.95 && (() => {
          const lastV = data.voltcore[data.voltcore.length - 1];
          const lastC = (data.client2 ?? data.client1)[(data.client2 ?? data.client1).length - 1];
          const xi = data.voltcore.length - 1;
          return <>
            <text x={xScale(xi) + 8} y={yScale(lastV) + 4} fontSize="12" fontWeight="bold" fill={color1}>{lastV}</text>
            <text x={xScale(xi) + 8} y={yScale(lastC) + 4} fontSize="12" fontWeight="bold" fill={color2}>{lastC}</text>
          </>;
        })()}

        {/* Milestone markers - Slide 6 */}
        {milestone1 && progress > 0.95 && (() => {
          // First warmth Voltcore at ~0:47 (between t=0 and t=1)
          const t_fw_v = 0.47 / 1;
          const v_fw_v = data.voltcore[0] + t_fw_v * (data.voltcore[1] - data.voltcore[0]);
          const x_fw_v = xScale(0) + t_fw_v * (xScale(1) - xScale(0));
          // Comfort Voltcore at 1:36
          const t_c_v = 1 + 36/60;
          const frac_c = t_c_v - 1;
          const v_c_v = data.voltcore[1] + frac_c * (data.voltcore[2] - data.voltcore[1]);
          const x_c_v = xScale(1) + frac_c * (xScale(2) - xScale(1));
          return <>
            <circle cx={x_fw_v} cy={yScale(v_fw_v)} r="6" fill={color1} stroke="#14141B" strokeWidth="2" />
            <text x={x_fw_v} y={yScale(v_fw_v) - 10} textAnchor="middle" fontSize="10" fill={color1} fontWeight="bold">0:47</text>
            <circle cx={x_c_v} cy={yScale(v_c_v)} r="6" fill={color1} stroke="#14141B" strokeWidth="2" />
            <text x={x_c_v} y={yScale(v_c_v) - 10} textAnchor="middle" fontSize="10" fill={color1} fontWeight="bold">1:36</text>
          </>;
        })()}

        {/* Legend */}
        <g transform={`translate(${PL + 10}, ${PT + 10})`}>
          <rect x="0" y="0" width="12" height="3" rx="1" fill={color1} />
          <text x="16" y="4" fontSize="11" fontWeight="bold" fill={color1}>{label1}</text>
          <rect x="0" y="14" width="12" height="3" rx="1" fill={color2} />
          <text x="16" y="18" fontSize="11" fontWeight="bold" fill={color2}>{label2}</text>
        </g>
      </svg>
    </div>
  );
};

/* ─── HEAT MAP 3D SVG ───────────────────────────────────────────────────────── */
const HeatMap3D = ({ deltaT, isVoltcore, dark }) => {
  const [ref, inView] = useInView(0.2);
  const [animProg, setAnimProg] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let s = null;
    const d = 1000;
    const t = (ts) => { if (!s) s = ts; setAnimProg(Math.min((ts - s) / d, 1)); if ((ts - s) < d) requestAnimationFrame(t); };
    requestAnimationFrame(t);
  }, [inView]);

  // Generate 3D-ish surface grid
  const rows = 8, cols = 10;
  const cellW = 28, cellH = 16, skewX = 10, skewY = 5;
  const W = cols * cellW + skewX * rows + 20, H = rows * cellH + skewY * cols + 80;

  const getColor = (r, c) => {
    if (!inView) return dark ? (isVoltcore ? "#1a3a2a" : "#1a1a1a") : (isVoltcore ? "#c8ddb8" : "#d4d4d4");
    // Voltcore: uniform warmth, Client: hot spots in middle + cold edges
    let heat;
    if (isVoltcore) {
      // Very uniform — slight center warmth
      const dx = Math.abs(c - cols/2) / (cols/2);
      const dy = Math.abs(r - rows/2) / (rows/2);
      heat = 0.75 + 0.25 * (1 - Math.sqrt(dx*dx + dy*dy) * 0.3) * animProg;
    } else {
      // Uneven: hot spots center-left and center-right, cold top-bottom
      const spot1 = Math.exp(-((c-2)**2 + (r-2)**2) / 8);
      const spot2 = Math.exp(-((c-8)**2 + (r-5)**2) / 6);
      const cold = Math.exp(-((c-5)**2 + (r-1)**2) / 4) * 0.3;
      heat = Math.min(1, (spot1 * 0.9 + spot2 * 0.7 + 0.2 - cold)) * animProg;
    }
    // Map heat 0–1 to color: cold=purple → blue → green → yellow → orange → red
    const stops = [
      [0,   [30,  0,  60]],
      [0.2, [0,   0, 180]],
      [0.4, [0, 150,  50]],
      [0.6, [200, 200,  0]],
      [0.8, [240, 120,  0]],
      [1.0, [255,  30,  0]],
    ];
    let r0, g0, b0, r1, g1, b1, t0 = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      if (heat >= stops[i][0] && heat <= stops[i+1][0]) {
        const tt = (heat - stops[i][0]) / (stops[i+1][0] - stops[i][0]);
        [r0,g0,b0] = stops[i][1]; [r1,g1,b1] = stops[i+1][1];
        const ri = Math.round(r0 + tt*(r1-r0));
        const gi = Math.round(g0 + tt*(g1-g0));
        const bi = Math.round(b0 + tt*(b1-b0));
        return `rgb(${ri},${gi},${bi})`;
      }
    }
    return "#ff1e00";
  };

  // Build isometric cells
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW + r * skewX + 10;
      const y = r * cellH - c * skewY + rows * cellH + 30;
      const color = getColor(r, c);
      const lighter = color.replace(/rgb\((\d+),(\d+),(\d+)\)/, (_, rr, gg, bb) =>
        `rgb(${Math.min(255,+rr+40)},${Math.min(255,+gg+40)},${Math.min(255,+bb+40)})`);
      // Top face
      cells.push(
        <polygon key={`t${r}${c}`}
          points={`${x},${y} ${x+cellW},${y-skewY} ${x+cellW},${y-cellH-skewY} ${x},${y-cellH}`}
          fill={color} stroke={dark ? "#00000040" : "#ffffff20"} strokeWidth="0.5" />
      );
      // Right face (darker)
      cells.push(
        <polygon key={`r${r}${c}`}
          points={`${x+cellW},${y-skewY} ${x+cellW+skewX},${y} ${x+cellW+skewX},${y-cellH} ${x+cellW},${y-cellH-skewY}`}
          fill={color.replace(/rgb\((\d+),(\d+),(\d+)\)/, (_, rr, gg, bb) =>
            `rgb(${Math.max(0,+rr-60)},${Math.max(0,+gg-60)},${Math.max(0,+bb-60)})`)}
          stroke={dark ? "#00000040" : "#ffffff20"} strokeWidth="0.5" />
      );
    }
  }

  return (
    <div ref={ref} className="relative">
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ maxHeight: 200, overflow: "visible" }}>
        {cells}
        {/* Axes */}
        <line x1="10" y1={rows*cellH+30} x2={cols*cellW+10} y2={rows*cellH+30-cols*skewY}
          stroke={dark?"#444":"#ccc"} strokeWidth="1" markerEnd="url(#arr)" />
        <line x1="10" y1={rows*cellH+30} x2={rows*skewX+10} y2={30}
          stroke={dark?"#444":"#ccc"} strokeWidth="1" />
      </svg>
      <div className={`absolute top-2 right-2 text-center`}>
        <div className="text-xs font-black" style={{ color: isVoltcore ? (dark ? "#D9FE42" : "#12503C") : "#4466FF" }}>ΔT = {deltaT}</div>
        <div className={`text-[9px] ${dark ? "text-zinc-500" : "text-[#5C6654]"}`}>{isVoltcore ? "Uniform" : "Hot spots"}</div>
      </div>
    </div>
  );
};

/* ─── ANIMATED BAR ──────────────────────────────────────────────────────────── */
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

/* ─── INTERACTIVE VEST MAP ──────────────────────────────────────────────────── */
const HeatedVestMap = ({ dark }) => {
  const [active, setActive] = useState(null);
  const [heat, setHeat] = useState(false);
  return (
    <div className={`relative w-full rounded-3xl overflow-hidden select-none border transition-all duration-300 p-6 shadow-2xl min-h-[520px] flex flex-col justify-center
      ${dark ? "bg-[#0b0c10] border-zinc-800" : "bg-[#f0f4ed] border-[#c8d8b8]"}`}>
      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#94C356] to-transparent opacity-30 pointer-events-none z-10 animate-scan" />
      <div className="absolute top-6 left-6 z-30">
        <button onClick={() => setHeat(!heat)}
          className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105
            ${heat ? "bg-[#F07E26] text-white shadow-[0_0_20px_rgba(240,126,38,0.5)]"
              : dark ? "bg-[#1c1c24] text-[#B8B7A4] border border-zinc-700"
              : "bg-white text-[#1A1F14] border border-[#c8d8b8]"}`}>
          {heat ? "🔥 Active Heating (42°C)" : "❄️ Passive State (21°C)"}
        </button>
      </div>
      <div className="relative flex justify-center items-center py-6 max-w-[380px] mx-auto w-full">
        <img src={Image40} alt="Voltcore Heated Vest" className={`w-full h-auto object-contain transition-all duration-700 z-10 relative ${heat ? "brightness-110" : ""}`} draggable={false} />
        {[["34%","23%","20%","22%"],["34%","23%","20%","22%",true]].map(([top,left,w,h,right],pi) => (
          <div key={pi} className={`absolute z-20 rounded-md transition-all duration-1000
            ${heat ? "bg-gradient-to-b from-[#F07E26]/50 to-[#ff4500]/40 shadow-[0_0_30px_#F07E26] animate-pulse border border-[#F07E26]/70"
              : "bg-[#94C356]/20 border border-[#94C356]/40"}`}
            style={{ top, [right?"right":"left"]: left, width: w, height: h }} />
        ))}
        <div className={`absolute z-20 rounded-t-sm transition-all duration-1000
          ${heat ? "bg-gradient-to-r from-[#F07E26]/40 via-[#ff4500]/50 to-[#F07E26]/40 shadow-[0_0_25px_#F07E26] animate-pulse border border-[#F07E26]/60"
            : "bg-[#94C356]/20 border border-[#94C356]/40"}`}
          style={{ top:"10%", left:"34%", width:"32%", height:"6%" }} />
        {HOTSPOTS.map(h => {
          const isActive = active === h.id, flipX = h.x > 50;
          return (
            <div key={h.id} className="absolute z-30 transition-all duration-300" style={{ left:`${h.x}%`, top:`${h.y}%`, transform:"translate(-50%,-50%)" }}>
              <button onClick={() => setActive(isActive ? null : h.id)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-300
                  ${isActive ? "bg-[#D9FE42] border-[#D9FE42] text-[#14141B] scale-110 shadow-[0_0_15px_rgba(217,254,66,0.8)]"
                    : heat ? (dark ? "bg-[#14141B] border-[#F07E26] text-[#F07E26]" : "bg-white border-[#F07E26] text-[#F07E26]")
                    : dark ? "bg-[#14141B] border-white text-white hover:border-[#94C356]"
                    : "bg-white border-[#1A1F14] text-[#1A1F14] hover:border-[#94C356]"}`}>
                {h.num}
              </button>
              {isActive && (
                <div className="absolute z-40 w-60 rounded-2xl p-4 shadow-2xl border animate-fadeIn"
                  style={{ [flipX?"right":"left"]:"calc(100% + 14px)", top:"50%", transform:"translateY(-50%)",
                    backgroundColor: dark ? "rgba(20,20,27,0.98)" : "rgba(255,255,255,0.98)", borderColor:"#94C356" }}>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#94C356] block mb-1">// MATRIX NODE {h.num}</span>
                  <h4 className={`text-xs font-bold mb-1 leading-snug ${dark?"text-white":"text-[#14141B]"}`}>{h.title}</h4>
                  <p className={`text-[10px] leading-relaxed ${dark?"text-[#B8B7A4]":"text-[#5C6654]"}`}>{h.desc}</p>
                  <button onClick={e=>{e.stopPropagation();setActive(null);}} className={`absolute top-2 right-3 text-xs ${dark?"text-white/50 hover:text-white":"text-black/40 hover:text-black"}`}>×</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className={`absolute bottom-4 right-6 text-[9px] font-mono tracking-wider uppercase ${dark?"text-zinc-600":"text-[#8a9e7a]"}`}>
        {heat ? "SYSTEM STATE: HEATING_ELEMENTS_POWERED" : "SYSTEM STATE: PASSIVE_MONITORING"}
      </div>
    </div>
  );
};

/* ─── POWER TABLE ────────────────────────────────────────────────────────────── */
const PowerTable = ({ data, color, label, runtime, dark }) => (
  <div className={`rounded-2xl border overflow-hidden ${dark?"border-zinc-800 bg-[#111116]":"border-[#c8d8b8] bg-[#f7faf4]"}`}>
    <div className="px-4 py-2 flex items-center justify-between" style={{ background: color + "22" }}>
      <span className="text-[11px] font-black uppercase tracking-widest" style={{ color }}>{label}</span>
      <span className="text-[11px] font-bold" style={{ color }}>{runtime}</span>
    </div>
    <table className="w-full text-[11px]">
      <thead>
        <tr className={dark?"bg-zinc-900":"bg-[#edf2e8]"}>
          {["Zone","Area (cm²)","P @7V (W)","mW/cm²"].map(h=>(
            <th key={h} className={`px-3 py-1.5 text-left font-bold ${dark?"text-zinc-400":"text-[#5C6654]"}`}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row,i)=>(
          <tr key={i} className={`${i===data.length-1?(dark?"bg-zinc-900 font-bold":"bg-[#edf2e8] font-bold"):""} ${i%2===0&&i!==data.length-1?(dark?"bg-transparent":"bg-transparent"):""}`}>
            <td className={`px-3 py-1.5 ${dark?"text-zinc-200":"text-[#1A1F14]"}`}>{row.zone}</td>
            <td className={`px-3 py-1.5 ${dark?"text-zinc-400":"text-[#5C6654]"}`}>{row.area}</td>
            <td className={`px-3 py-1.5 ${dark?"text-zinc-300":"text-[#1A1F14]"}`}>{row.power}</td>
            <td className="px-3 py-1.5 font-bold" style={{color}}>{row.density}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/* ─── MAIN PAGE ─────────────────────────────────────────────────────────────── */
// USAGE: <HeatedApparel dark={isDark} />
// If dark prop is not passed, component auto-detects from: html.dark class, body.dark class, localStorage("theme")
const HeatedApparel = ({ dark: darkProp }) => {
  const [activeCase, setActiveCase] = useState(null);
  const toggleCase = id => setActiveCase(p => p === id ? null : id);

  // Detect dark mode: prop → localStorage "theme" → html class → default light
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

  // Dark-aware accent: the brand neon-lime (#D9FE42) is unreadable as text on light
  // backgrounds, so on light mode we swap it for the brand's 'cold green' (#12503C)
  // which keeps the same family feel while staying legible.
  const limeText = dark ? "#D9FE42" : "#12503C";
  const limeTextSoft = dark ? "#D9FE42" : "#3F6B2B";

  // Semantic classes derived from dark
  const pageBg   = dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F2F5EF] text-[#1A1F14]";
  const pageBgOnly = dark ? "bg-[#14141B]" : "bg-[#F2F5EF]";
  const heroBg   = dark ? "bg-[#0b0c10]" : "bg-[#E4EBE0]";
  const altBg    = dark ? "bg-[#111116]" : "bg-[#E8EEE4]";
  const cardBg   = dark ? "bg-[#1c1c24] border-zinc-800" : "bg-white border-[#c8d8b8]";
  const bdColor  = dark ? "border-zinc-800" : "border-[#c8d8b8]";
  const h2Color  = dark ? "text-white" : "text-[#1A1F14]";
  const mutedTxt = dark ? "text-zinc-400" : "text-[#5C6654]";
  const monoTag  = dark ? "text-zinc-500" : "text-[#6b8c5a]";

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
        {/* Glow orbs — drift gently with the cursor for a sense of depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 transition-transform duration-700 ease-out"
            style={{background:"radial-gradient(circle,#94C356,transparent)", transform:"translate(calc(var(--mx,0) * 18px), calc(var(--my,0) * 18px))"}}/>
          <div
            className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full blur-3xl opacity-8 transition-transform duration-700 ease-out"
            style={{background:"radial-gradient(circle,#F07E26,transparent)", transform:"translate(calc(var(--mx,0) * -14px), calc(var(--my,0) * -14px))"}}/>
        </div>
        <div className="container mx-auto px-6 md:px-12 pb-16 relative z-20 max-w-7xl">
          <div className="max-w-4xl">
            <Reveal y={16}><span className="text-xs font-black uppercase tracking-[0.3em] text-[#94C356] block mb-4">// TECHNICAL TEXTILES & HEATED APPAREL DIVISION</span></Reveal>
            <Reveal delay={90} y={22}>
              <h1 className={`text-4xl md:text-6xl font-black uppercase tracking-tight mb-6 leading-none ${h2Color}`}>
                Thermal Energy <br /><span className="text-[#F07E26]">Embedded Into The</span> Textile Matrix.
              </h1>
            </Reveal>
            <Reveal delay={180} y={22}>
              <p className={`text-sm md:text-base max-w-2xl leading-relaxed ${mutedTxt}`}>
                Carbon nanotube (CNT)-based heating polymer filaments replace stiff copper wiring — embedding heat directly into fabrics without compromising fit, comfort, or aesthetics.
              </p>
            </Reveal>
            {/* KPI row */}
            <div className="flex flex-wrap gap-8 mt-10">
              {[{v:"+50 min",l:"Extra Runtime"},{v:"0:47 sec",l:"First Warmth"},{v:"ΔT 3–4°C",l:"Heat Deviation"},{v:"40–70%",l:"Faster than Copper"}].map(({v,l},i)=>(
                <Reveal as="div" key={l} delay={260 + i*90} y={18}>
                  <div className={`text-2xl font-black leading-none transition-transform duration-300 hover:scale-110 hover:text-[#94C356] cursor-default ${h2Color}`}><CountUp value={v}/></div>
                  <div className={`text-[10px] uppercase font-bold tracking-wider mt-0.5 ${mutedTxt}`}>{l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO ─────────────────────────────────────────────────────── */}
      <section className={`py-16 border-b ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <Reveal className="lg:col-span-4" y={20}>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F07E26] block mb-2">// BENCHMARK SHOWCASE</span>
              <h3 className={`text-2xl md:text-3xl font-black uppercase mb-4 ${h2Color}`}>Full System Video Comparison</h3>
              <p className={`text-xs leading-relaxed mb-6 ${mutedTxt}`}>
                Head-to-head thermal analysis. Voltcore delivers 17% less energy consumption, 20s faster to comfort, and 34% lighter than wire-based competitors.
              </p>
              <div className="flex gap-4 text-xs font-bold">
                <span className="flex items-center gap-1.5" style={{ color: limeText }}><span className="w-3 h-0.5 inline-block" style={{ background: limeText }}/> Voltcore</span>
                <span className={`flex items-center gap-1.5 ${mutedTxt}`}><span className={`w-3 h-0.5 inline-block ${dark?"bg-zinc-500":"bg-zinc-400"}`} style={{borderTop:"2px dashed currentColor"}}/> Wire-based</span>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-8" delay={120} y={24}>
              <div className={`relative rounded-3xl overflow-hidden border shadow-xl max-h-[450px] transition-shadow duration-500 hover:shadow-[0_0_40px_rgba(148,195,86,0.25)] ${dark?"border-zinc-800 bg-black":"border-[#c8d8b8] bg-[#E4EBE0]"}`}>
                <video controls preload="metadata" className="w-full h-full max-h-[450px] object-contain">
                  <source src={HeatingJacketVideo} type="video/mp4"/>
                </video>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROBLEMS ──────────────────────────────────────────────────── */}
      <section className={`py-16 border-b ${pageBgOnly} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// CORE INDUSTRY BOTTLENECK</span>
            <h2 className={`text-2xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>Why Traditional Elements Fail</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {icon:<FaSnowflake size={18}/>,title:"Runtime Limitation",body:"Legacy elements drain cells rapidly, forcing a choice between a bulky heavy pack or insufficient runtime."},
              {icon:<FaThermometerHalf size={18}/>,title:"Erratic Heat Profiles",body:"Copper wires heat unevenly — dangerous hot spots (ΔT up to 16°C) and cold zones across the garment."},
              {icon:<FaWeightHanging size={18}/>,title:"Ergonomic Penalty",body:"Copper traces are stiff and bulky, ruining the natural drape and fit of fine fabrics. Comfort reported by only 1 of 3 testers."},
            ].map(({icon,title,body},i)=>(
              <Reveal key={title} delay={i*120} y={26}>
                <div className={`p-8 rounded-3xl border h-full hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${cardBg}`}>
                  <div className="w-12 h-12 bg-[#F07E26]/10 rounded-2xl flex items-center justify-center text-[#F07E26] mb-6 transition-transform duration-300 group-hover:rotate-6">{icon}</div>
                  <h4 className={`text-sm font-bold mb-2 ${h2Color}`}>{title}</h4>
                  <p className={`text-xs leading-relaxed ${mutedTxt}`}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CASE STUDY 1: Voltcore vs Client 1 (Slide 6) ══════════════ */}
      <section className={`py-20 border-b ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// CASE STUDY 01</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Voltcore vs Copper Heater</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Detached XPS board · 7V · Same energy consumption (10.4W)</p>
          </Reveal>

          {/* 3 headline stats */}
          <div className="grid grid-cols-3 gap-4 mb-12 max-w-2xl mx-auto">
            {[
              {v:"+10°C",l:"Higher Temperature",c:limeText},
              {v:"~60s",l:"Faster to Comfort",c:"#94C356"},
              {v:"3/3",l:"Testers: Uniform Heat",c:"#F07E26"},
            ].map(({v,l,c},i)=>(
              <Reveal key={l} delay={i*110} y={20}>
                <div className={`p-4 rounded-2xl border text-center h-full transition-transform duration-300 hover:scale-105 ${cardBg}`}>
                  <div className="text-2xl font-black leading-none mb-1" style={{color:c}}><CountUp value={v}/></div>
                  <div className={`text-[10px] uppercase font-bold tracking-wide ${mutedTxt}`}>{l}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Chart */}
            <Reveal className={`p-6 rounded-3xl border ${cardBg}`} y={26}>
              <div className="text-[10px] font-mono text-[#94C356] mb-3">TEMPERATURE CURVE — DETACHED 7V TEST</div>
              <LineChart
                data={CURVE_DATA_S6}
                dark={dark}
                label1="VOLTCORE"
                label2="Client 1 (Copper)"
                color1={limeText}
                color2="#4488FF"
                milestone1={true}
              />
              {/* Timeline */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  {label:"First Warmth",v:"0:47",c:"2:02",color:limeText},
                  {label:"Comfort",v:"1:36",c:"2:37",color:"#94C356"},
                ].map(({label,v,c,color})=>(
                  <div key={label} className={`rounded-xl p-3 border ${dark?"bg-[#14141B] border-zinc-800":"bg-[#f0f5eb] border-[#c8d8b8]"}`}>
                    <div className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${mutedTxt}`}>{label}</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black" style={{color}}>{v}</span>
                      <span className={`text-xs line-through ${mutedTxt}`}>{c}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Heat maps + detail */}
            <Reveal className="space-y-4" delay={150} y={26}>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-2xl border ${cardBg}`}>
                  <HeatMap3D deltaT="6°C" isVoltcore={true} dark={dark} />
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-black" style={{ color: limeText }}>VOLTCORE</span>
                    <div className={`text-[9px] ${mutedTxt}`}>ΔT = 6°C — Uniform</div>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl border ${cardBg}`}>
                  <HeatMap3D deltaT="16°C" isVoltcore={false} dark={dark} />
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-black text-[#4488FF]">CLIENT 1 (COPPER)</span>
                    <div className={`text-[9px] ${mutedTxt}`}>ΔT = 16°C — Hot spots</div>
                  </div>
                </div>
              </div>

              {/* Tester perception */}
              <div className={`p-5 rounded-2xl border ${cardBg}`}>
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${mutedTxt}`}>Tester Perception Results</div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span style={{ color: limeText }}>Voltcore — Uniform heat perceived</span>
                      <span style={{ color: limeText }}>3/3</span>
                    </div>
                    <Bar pct={100} color={limeText} dark={dark} />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={mutedTxt}>Client 1 — Comfort reported</span>
                      <span className={mutedTxt}>1/3</span>
                    </div>
                    <Bar pct={33} color={dark?"#3f3f46":"#a1a1aa"} delay={100} dark={dark} />
                  </div>
                  <p className={`text-[10px] leading-relaxed mt-2 ${mutedTxt}`}>
                    Testers 2 & 3 reported insufficient chest heating on copper system. All 3 confirmed homogeneous warmth across all zones with Voltcore.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ CASE STUDY 2: Voltcore vs Client 2 (Slide 7) ══════════════ */}
      <section className={`py-20 border-b ${pageBgOnly} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F07E26] block mb-2">// CASE STUDY 02</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2Color}`}>Voltcore vs Carbon Ink Heater</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Same temperature performance · 7V · 3500mAh battery</p>
          </Reveal>

          {/* Main stat */}
          <Reveal className={`max-w-xl mx-auto mb-12 p-8 rounded-3xl border text-center transition-transform duration-300 hover:scale-[1.02] ${cardBg}`}>
            <div className="text-[10px] font-black uppercase tracking-widest text-[#F07E26] mb-2">With same thermal performance, Voltcore delivers</div>
            <div className="text-5xl font-black leading-none" style={{ color: limeText }}><CountUp value="~20% Less Energy" duration={1400}/></div>
            <div className="text-2xl font-black text-[#F07E26] mt-1">= +50 Minutes of Heat</div>
            <div className={`text-xs mt-3 ${mutedTxt}`}>2h 50min vs 2h 00min at max power on 7.4V / 3500mAh</div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Chart */}
            <Reveal className={`p-6 rounded-3xl border ${cardBg}`} y={26}>
              <div className="text-[10px] font-mono text-[#F07E26] mb-3">TEMPERATURE CURVE — SAME PERFORMANCE, LESS POWER</div>
              <LineChart
                data={CURVE_DATA_S7}
                dark={dark}
                label1="VOLTCORE (8.88W)"
                label2="Client 2 (12.79W)"
                color1={limeText}
                color2="#FF6688"
              />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className={`rounded-xl p-3 border ${dark?"bg-[#14141B] border-zinc-800":"bg-[#f0f5eb] border-[#c8d8b8]"}`}>
                  <div className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${mutedTxt}`}>Voltcore runtime</div>
                  <div className="text-xl font-black" style={{ color: limeText }}>2h 50min</div>
                  <div className={`text-[9px] ${mutedTxt}`}>at 8.88W total</div>
                </div>
                <div className={`rounded-xl p-3 border ${dark?"bg-[#14141B] border-zinc-800":"bg-[#f0f5eb] border-[#c8d8b8]"}`}>
                  <div className={`text-[9px] font-bold uppercase tracking-widest mb-1 ${mutedTxt}`}>Client 2 runtime</div>
                  <div className={`text-xl font-black ${dark?"text-zinc-500":"text-zinc-400"}`}>2h 00min</div>
                  <div className={`text-[9px] ${mutedTxt}`}>at 12.79W total</div>
                </div>
              </div>
            </Reveal>

            {/* Power tables + heat maps */}
            <Reveal className="space-y-4" delay={150} y={26}>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-3 rounded-2xl border ${cardBg}`}>
                  <HeatMap3D deltaT="6°C" isVoltcore={true} dark={dark} />
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-black" style={{ color: limeText }}>VOLTCORE</span>
                    <div className={`text-[9px] ${mutedTxt}`}>ΔT = 6°C</div>
                  </div>
                </div>
                <div className={`p-3 rounded-2xl border ${cardBg}`}>
                  <HeatMap3D deltaT="10°C" isVoltcore={false} dark={dark} />
                  <div className="mt-2 text-center">
                    <span className="text-[10px] font-black text-[#FF6688]">CLIENT 2 (CARBON)</span>
                    <div className={`text-[9px] ${mutedTxt}`}>ΔT = 10°C</div>
                  </div>
                </div>
              </div>
              <div
                className="cursor-pointer"
                onClick={() => toggleCase("powertable")}
              >
                <div className={`text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center justify-between ${mutedTxt}`}>
                  <span>Zone Power Density (7V)</span>
                  <span className="text-[#94C356]">{activeCase==="powertable"?"▲ hide":"▼ expand tables"}</span>
                </div>
                {activeCase === "powertable" && (
                  <div className="space-y-3">
                    <PowerTable data={PAD_DATA_VOLTCORE} color={limeText} label="Voltcore" runtime="→ 2h 50min" dark={dark} />
                    <PowerTable data={PAD_DATA_CLIENT2} color="#FF6688" label="Client 2 (Carbon)" runtime="→ 2h 00min" dark={dark} />
                  </div>
                )}
                {activeCase !== "powertable" && (
                  <div className={`p-4 rounded-xl border ${dark?"border-zinc-800 bg-[#111116]":"border-[#c8d8b8] bg-[#f0f5eb]"}`}>
                    <div className="flex justify-between text-xs">
                      <span className="font-bold" style={{ color: limeText }}>Voltcore total: 8.88W @ 28.8 mW/cm²</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span className={`font-bold text-[#FF6688]`}>Client 2 total: 12.79W @ 36.1 mW/cm²</span>
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── MATERIAL PROPERTIES (Slide 5) ─────────────────────────────── */}
      <section className={`py-20 border-b ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <Reveal className="lg:col-span-4" y={24}>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// MATERIAL BENCHMARK</span>
              <h3 className={`text-2xl md:text-3xl font-black uppercase mb-4 ${h2Color}`}>Property Advantage Matrix</h3>
              <p className={`text-xs leading-relaxed ${mutedTxt}`}>Hover each row to reveal the exact specification from the Voltcore datasheet.</p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  {icon:<FaBolt size={14}/>,title:"Fast Heating",val:"40–70% faster",c:"#F07E26"},
                  {icon:<FaLeaf size={14}/>,title:"Low CO₂",val:"50–75% less",c:"#94C356"},
                  {icon:<FaRecycle size={14}/>,title:"Recyclable",val:"75% recycled",c:limeText},
                  {icon:<FaCheckCircle size={14}/>,title:"Durability",val:"25–30 cN/tex",c:"#94C356"},
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
                {l:"Fast Heating",v:95,c:40,spec:"40–70% faster than copper, same energy input"},
                {l:"Homogeneous Heat",v:90,c:30,spec:"Temperature deviation only 3–4°C vs 16°C copper"},
                {l:"Energy Efficiency",v:92,c:50,spec:"Up to 2× lower energy → 2× longer battery life"},
                {l:"Lightweight",v:85,c:35,spec:"30–60 g/km filament, 120–250 g/m² fabric"},
                {l:"Mech. Durability",v:88,c:45,spec:"Tensile strength 25–30 cN/tex, no self-abrasion"},
                {l:"Recyclability",v:90,c:20,spec:"Mono-material, up to 75% recycled polymers"},
                {l:"CO₂ Footprint",v:88,c:30,spec:"50–75% lower CO₂ LCA vs copper heaters"},
              ].map(({l,v,c,spec},i)=>(
                <Reveal key={l} delay={i*70} y={14}>
                  <div className="group" tabIndex={0}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className={`text-xs font-bold ${h2Color}`}>{l}</span>
                      <span className={`text-[10px] font-mono opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity ${mutedTxt}`}>{spec}</span>
                    </div>
                    <div className={`relative h-4 rounded-full overflow-hidden cursor-pointer ${dark?"bg-zinc-800":"bg-zinc-200"}`}>
                      <Bar pct={c} color={dark?"#3f3f46":"#a1a1aa"} delay={i*60} dark={dark}/>
                      <div className="absolute inset-0">
                        <Bar pct={v} color="rgba(148,195,86,0.85)" delay={i*60+200} dark={dark}/>
                      </div>
                    </div>
                    <div className="flex justify-between text-[9px] mt-0.5">
                      <span className="font-mono font-bold" style={{ color: limeTextSoft }}>Voltcore {v}%</span>
                      <span className={`font-mono ${mutedTxt}`}>Legacy {c}%</span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE VEST MAP ──────────────────────────────────────── */}
      <section className={`py-24 ${pageBgOnly}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <Reveal className="lg:col-span-5" y={24}>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// DESIGN MODEL PROTOTYPE</span>
              <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 leading-none ${h2Color}`}>Interactive Apparel V1</h2>
              <p className={`text-xs leading-relaxed mb-6 ${mutedTxt}`}>Toggle the thermal state to simulate active voltage across the patch grids. Click nodes to trace each heating zone.</p>
              <div className="space-y-4">
                {[
                  {icon:<FaCheckCircle className="text-[#94C356]" size={14}/>,title:"120–250 g/m² weight",body:"Ultra-low profile — no bulk added to the garment."},
                  {icon:<FaBolt className="text-[#F07E26]" size={14}/>,title:"5–12V power supply",body:"Compatible with standard consumer power banks."},
                  {icon:<FaRecycle className="text-[#94C356]" size={14}/>,title:"4 patents applied EU/WIPO",body:"PP/PA/PET matrix, up to 75% recycled polymer content."},
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
            <Reveal className="lg:col-span-7" delay={120} y={30}><HeatedVestMap dark={dark}/></Reveal>
          </div>
        </div>
      </section>

      {/* ── PoC TRACKER (Slide 9 — exact data) ───────────────────────── */}
      <section className={`py-20 border-t ${altBg} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356]">// PIPELINE TRACKER</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mt-2 ${h2Color}`}>8 PoCs — 1 Moving to Industrialization</h2>
            <p className={`text-xs mt-2 ${mutedTxt}`}>Working with top brands across outdoor, workwear, motorcycle, and medical segments.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Outdoor */}
            <Reveal className={`p-6 rounded-3xl border transition-transform duration-300 hover:scale-[1.015] ${cardBg}`} y={26}>
              <span className="text-[10px] font-mono text-[#94C356] block mb-4">OUTDOOR — 4 PoCs</span>
              <div className="space-y-4">
                {[
                  {l:"Vest (US Partner)",p:40},{l:"Vest & Jacket (Global)",p:65},{l:"Jacket & Longsleeve (Europe)",p:50},{l:"Vest (US)",p:30},
                ].map(({l,p},i)=>(
                  <div key={l}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={h2Color}>{l}</span>
                      <span className="text-[#94C356] font-mono text-[10px]">PoC →</span>
                    </div>
                    <Bar pct={p} color="#94C356" delay={i*80} dark={dark}/>
                  </div>
                ))}
              </div>
            </Reveal>
            {/* Other segments */}
            <Reveal className={`p-6 rounded-3xl border transition-transform duration-300 hover:scale-[1.015] ${cardBg}`} delay={140} y={26}>
              <span className="text-[10px] font-mono text-[#F07E26] block mb-4">WORKWEAR, MOTORCYCLE & MEDICAL</span>
              <div className="space-y-4">
                {[
                  {l:"Jacket (Global — Workwear)",p:35,status:"PoC →",color:"#94C356"},
                  {l:"Jacket (US — Workwear)",p:25,status:"PoC →",color:"#94C356"},
                  {l:"Vest (Europe — Motorcycle)",p:100,status:"● Ind.",color:"#F07E26",highlight:true},
                  {l:"Heated Belt (Asia — Medical)",p:20,status:"PoC →",color:"#94C356"},
                ].map(({l,p,status,color,highlight},i)=>(
                  <div key={l}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={`${highlight?`font-black`:"font-normal"} ${h2Color}`}>{l}</span>
                      <span className="font-mono text-[10px]" style={{color}}>{status}</span>
                    </div>
                    <Bar pct={p} color={highlight?"linear-gradient(90deg,#F07E26,#ff4500)":color} delay={i*80} dark={dark}/>
                    {highlight && <p className={`text-[9px] mt-1 ${mutedTxt}`}>PoC completed — moved to industrialization</p>}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PIPELINE FRAMEWORK (Slide 11) ────────────────────────────── */}
      <section className={`py-20 border-t ${pageBgOnly} ${bdColor}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-black uppercase tracking-[0.2em] text-[#94C356] block mb-2">// COMMERCIAL INTEGRATION</span>
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${h2Color}`}>Pipeline Launch Framework</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {n:"01",title:"Introduction Call",body:"Present heating textiles. Voltcore provides connector type, tech specs, voltage, performance data, washability, timeline."},
              {n:"02",title:"Samples Exchange",body:"Ship heating material samples. Client ships garment samples. ~2 weeks review & initial check together."},
              {n:"03",title:"Testing & Analysis",body:"Run electrical & perception tests. Benchmark positioning vs 10 other brands. Review results together, iterate."},
              {n:"04",title:"PoC & Decision",body:"Define pilot or commercial batch. Align on delivery terms and QC requirements. Prepare commercial offer."},
            ].map(({n,title,body},i)=>(
              <Reveal key={n} delay={i*110} y={22}>
                <div className="transition-transform duration-300 hover:-translate-y-1">
                  <div className={`text-4xl font-black mb-2 transition-colors duration-300 ${dark?"text-zinc-700 hover:text-[#94C356]":"text-zinc-300 hover:text-[#94C356]"}`}>{n}</div>
                  <h5 className={`text-xs font-bold mb-1 ${h2Color}`}>{title}</h5>
                  <p className={`text-[11px] leading-relaxed ${mutedTxt}`}>{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className={`py-20 ${altBg}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className={`relative overflow-hidden rounded-3xl p-12 md:p-20 text-center border transition-transform duration-500 hover:scale-[1.01] ${cardBg}`} y={32}>
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full blur-3xl opacity-20" style={{background:"#94C356"}}/>
              <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full blur-3xl opacity-10" style={{background:"#F07E26"}}/>
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-[#94C356] block mb-4 relative">// REQUEST SAMPLES</span>
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight mb-6 max-w-3xl mx-auto relative ${h2Color}`}>
              Ready to eliminate wire feel across your product line?
            </h2>
            <div className="flex justify-center relative">
              <Link to="/contact" className="group inline-flex items-center gap-2 bg-[#94C356] text-[#14141B] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#D9FE42] transition-all duration-300 shadow-lg hover:shadow-[0_0_30px_rgba(148,195,86,0.4)] hover:scale-105">
                Request Technical Samples & TDS <FaChevronRight size={10} className="transition-transform duration-300 group-hover:translate-x-1"/>
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
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
};

export default HeatedApparel;
