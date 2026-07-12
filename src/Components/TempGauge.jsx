import React, { useState, useEffect, useRef } from "react";
import { useInView } from "./anim.jsx";

const ORANGE = "#F07E26";
const GREEN  = "#94C356";
const BLACK  = "#14141B";
const CRAFT  = "#B8B7A4";

/* ─── TempGauge ─────────────────────────────────────────────────────────────
   Animated SVG line chart comparing passive bag cooling vs Voltcore active
   heating over a 90-minute delivery window. Animates the path draw on scroll
   into view, and shows a draggable time scrubber. */
const TempGauge = ({ dark }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const [scrub, setScrub] = useState(90); // minutes 0..90
  const svgRef = useRef(null);

  // Data: temperature (°C) over minutes (0..90)
  // Passive: starts 75°C, drops to ~40°C by 90 min (exponential decay)
  // Voltcore: starts 75°C, holds 63-66°C throughout
  const W = 520, H = 240, PAD = 44;
  const MINUTES = 90;
  const T_MAX = 80, T_MIN = 30;

  const xFor = (m) => PAD + (m / MINUTES) * (W - PAD * 2);
  const yFor = (t) => H - PAD + ((T_MIN - t) / (T_MIN - T_MAX)) * (H - PAD * 2);

  const passiveData = Array.from({ length: 91 }, (_, m) => {
    const temp = 75 * Math.exp(-m / 38) + 28;
    return Math.max(temp, T_MIN);
  });
  const voltcoreData = Array.from({ length: 91 }, (_, m) => {
    return 66 - Math.sin(m / 18) * 2 - m * 0.02;
  });

  const buildPath = (data) =>
    data.map((t, m) => `${m === 0 ? "M" : "L"} ${xFor(m).toFixed(1)} ${yFor(t).toFixed(1)}`).join(" ");

  const passivePath = buildPath(passiveData);
  const voltcorePath = buildPath(voltcoreData);

  // Animated dash for draw-on effect
  const [dash, setDash] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf; const start = performance.now(); const dur = 1600;
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setDash(eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const passiveLen = 1200;
  const voltcoreLen = 1100;

  // Current temps at scrubber position
  const passiveNow = passiveData[Math.round(scrub)];
  const voltcoreNow = voltcoreData[Math.round(scrub)];
  const safeLine = 63;

  const handleScrub = (e) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX ?? e.touches?.[0]?.clientX) - rect.left) / rect.width * W;
    const m = Math.max(0, Math.min(MINUTES, ((x - PAD) / (W - PAD * 2)) * MINUTES));
    setScrub(m);
  };

  const gridColor = dark ? "#2A2A33" : "#D8D7CF";
  const axisColor = dark ? "#444" : "#999";
  const labelColor = dark ? "#666" : "#888";

  return (
    <div ref={ref} className="w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        onMouseDown={handleScrub}
        onMouseMove={(e) => { if (e.buttons === 1) handleScrub(e); }}
        onTouchStart={handleScrub}
        onTouchMove={handleScrub}
        style={{ cursor: "ew-resize", userSelect: "none" }}
      >
        {/* Grid lines */}
        {[30, 40, 50, 60, 70, 80].map((t) => (
          <g key={t}>
            <line x1={PAD} y1={yFor(t)} x2={W - PAD} y2={yFor(t)} stroke={gridColor} strokeWidth={1} strokeDasharray={t === safeLine ? "0" : "3 4"} />
            <text x={PAD - 8} y={yFor(t) + 3} textAnchor="end" fontSize={9} fill={labelColor} fontWeight={700}>
              {t}°
            </text>
          </g>
        ))}
        {/* Safe zone shading (≥63°C) */}
        <rect x={PAD} y={yFor(80)} width={W - PAD * 2} height={yFor(safeLine) - yFor(80)} fill={GREEN} opacity={dark ? 0.05 : 0.06} />
        <text x={W - PAD - 4} y={yFor(safeLine) - 6} textAnchor="end" fontSize={9} fill={GREEN} fontWeight={800} opacity={0.8}>
          SAFE ZONE ≥63°C
        </text>

        {/* X-axis labels */}
        {[0, 15, 30, 45, 60, 75, 90].map((m) => (
          <text key={m} x={xFor(m)} y={H - PAD + 16} textAnchor="middle" fontSize={9} fill={labelColor} fontWeight={700}>
            {m}m
          </text>
        ))}

        {/* Passive bag line (dashed, grey) */}
        <path
          d={passivePath}
          fill="none"
          stroke={dark ? "#555" : "#aaa"}
          strokeWidth={2.5}
          strokeDasharray={`${passiveLen}`}
          strokeDashoffset={passiveLen * (1 - dash)}
          strokeLinecap="round"
        />
        {/* Voltcore line (solid, orange) */}
        <path
          d={voltcorePath}
          fill="none"
          stroke={ORANGE}
          strokeWidth={3}
          strokeDasharray={`${voltcoreLen}`}
          strokeDashoffset={voltcoreLen * (1 - dash)}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 6px ${ORANGE}50)` }}
        />

        {/* Scrubber vertical line */}
        <line x1={xFor(scrub)} y1={PAD / 2} x2={xFor(scrub)} y2={H - PAD} stroke={dark ? "#888" : "#444"} strokeWidth={1.5} strokeDasharray="4 3" />
        {/* Scrubber dots */}
        <circle cx={xFor(scrub)} cy={yFor(passiveNow)} r={5} fill={dark ? "#555" : "#aaa"} stroke={dark ? "#1C1C24" : "#fff"} strokeWidth={2} />
        <circle cx={xFor(scrub)} cy={yFor(voltcoreNow)} r={6} fill={ORANGE} stroke={dark ? "#1C1C24" : "#fff"} strokeWidth={2} style={{ filter: `drop-shadow(0 0 4px ${ORANGE})` }} />

        {/* Scrubber handle */}
        <circle cx={xFor(scrub)} cy={PAD / 2 - 2} r={7} fill={ORANGE} />
        <text x={xFor(scrub)} y={PAD / 2 + 1} textAnchor="middle" fontSize={8} fill={BLACK} fontWeight={900}>
          {Math.round(scrub)}m
        </text>
      </svg>

      {/* Readout cards */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className={`rounded-xl p-4 border ${dark ? "bg-[#14141B] border-zinc-700" : "bg-white border-zinc-200"}`}>
          <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
            Passive bag
          </span>
          <span className="text-2xl font-black" style={{ color: passiveNow >= safeLine ? (dark ? "#aaa" : "#666") : "#e44" }}>
            {passiveNow.toFixed(1)}°C
          </span>
          {passiveNow < safeLine && (
            <span className="text-[10px] font-bold uppercase tracking-wider block mt-1" style={{ color: "#e44" }}>
              ⚠ Below safe threshold
            </span>
          )}
        </div>
        <div className="rounded-xl p-4 border" style={{ borderColor: `${ORANGE}40`, background: `${ORANGE}08` }}>
          <span className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: ORANGE }}>
            Voltcore active
          </span>
          <span className="text-2xl font-black" style={{ color: voltcoreNow >= safeLine ? GREEN : "#e44" }}>
            {voltcoreNow.toFixed(1)}°C
          </span>
          {voltcoreNow >= safeLine && (
            <span className="text-[10px] font-bold uppercase tracking-wider block mt-1" style={{ color: GREEN }}>
              ✓ Safe serving temp
            </span>
          )}
        </div>
      </div>
      <p className={`text-[11px] mt-3 ${dark ? "text-zinc-600" : "text-zinc-400"}`}>
        Drag across the chart to compare temperatures at any point during a 90-minute delivery.
      </p>
    </div>
  );
};

export default TempGauge;
