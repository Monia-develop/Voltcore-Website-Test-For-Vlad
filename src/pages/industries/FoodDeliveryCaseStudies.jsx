import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaBoxOpen, FaTruck, FaGlobeAsia,
  FaLayerGroup, FaBolt, FaWeightHanging, FaThermometerHalf,
  FaUtensils, FaMotorcycle, FaPlay, FaExpand, FaTimes, FaSnowflake,
} from "react-icons/fa";
import HeatThermBagImg from "../../assets/website/industries/HeatThermBag.png";
import RealProdBagImg  from "../../assets/website/industries/RealProdBag.png";
import InsideBagImg    from "../../assets/website/industries/InsideBag.png";
import RedBagImg       from "../../assets/website/industries/RedBag.png";
import InsidedevImg    from "../../assets/website/industries/Insidedev.png";
import ThermBagImg     from "../../assets/website/industries/ThermBag.png";
import BagDeliveryAnim from "../../assets/website/AnimBAgDelivery.mp4";
import LivreurImg      from "../../assets/website/industries/Livreur.png";
import ScootImg        from "../../assets/website/industries/Scoot.png";
import BImg            from "../../assets/website/industries/B.png";

/* ─── THEME ─────────────────────────────────────────────────────────────── */
const GREEN  = "#94C356";
const NEON   = "#D9FE42";
const ORANGE = "#F07E26";
const BLACK  = "#14141B";
const CRAFT  = "#B8B7A4";
const FONT   = "'AkkuratLL', ui-sans-serif, system-ui, sans-serif";

/* ─── HOOKS ─────────────────────────────────────────────────────────────── */
const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, shown];
};

const useCountUp = (raw, shown, duration = 900) => {
  const match = String(raw).match(/^(-?\d+(?:\.\d+)?)(.*)$/);
  const [display, setDisplay] = useState(match ? "0" + match[2] : raw);
  useEffect(() => {
    if (!shown || !match) { if (!match) setDisplay(raw); return; }
    const target = parseFloat(match[1]);
    const decimals = (match[1].split(".")[1] || "").length;
    const suffix = match[2];
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(`${(target * eased).toFixed(decimals)}${suffix}`);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [shown]);
  return display;
};

/* ─── LIGHTBOX ────────────────────────────────────────────────────────── */
const LightboxCtx = React.createContext(() => {});
const LightboxProvider = ({ children }) => {
  const [item, setItem] = useState(null);
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => { if (e.key === "Escape") setItem(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item]);
  return (
    <LightboxCtx.Provider value={setItem}>
      {children}
      <div
        className="fixed inset-0 z-[999] flex items-center justify-center p-6 md:p-16 transition-all duration-300"
        style={{
          background: "rgba(10,10,13,0.92)",
          backdropFilter: "blur(6px)",
          opacity: item ? 1 : 0,
          pointerEvents: item ? "auto" : "none",
        }}
        onClick={() => setItem(null)}
      >
        {item && (
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}
            style={{ animation: "voltcore-lb-in 0.35s cubic-bezier(.22,.61,.36,1)" }}>
            <img src={item.img} alt={item.caption} className="w-full max-h-[80vh] object-contain rounded-xl" />
            {item.caption && (
              <p className="text-center text-white/70 text-xs font-bold uppercase tracking-widest mt-4">{item.caption}</p>
            )}
            <button
              onClick={() => setItem(null)}
              className="absolute -top-4 -right-4 w-10 h-10 rounded-full flex items-center justify-center text-[#14141B] shadow-xl transition-transform duration-200 hover:scale-110"
              style={{ background: NEON }}>
              <FaTimes size={14} />
            </button>
          </div>
        )}
      </div>
      <style>{`@keyframes voltcore-lb-in { from { opacity:0; transform: scale(.96) translateY(8px);} to { opacity:1; transform:none; } }`}</style>
    </LightboxCtx.Provider>
  );
};
const useLightbox = () => React.useContext(LightboxCtx);

const Reveal = ({ children, delay = 0, y = 20, className = "" }) => {
  const [ref, shown] = useInView(0.08);
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

/* ─── HEAT RETENTION CHARTS ────────────────────────────────────────────── */
const CHART_DATA_5C = [
  { min: 1,  voltcore: 75,   passive: 75 },
  { min: 5,  voltcore: 74,   passive: 72 },
  { min: 9,  voltcore: 73,   passive: 69 },
  { min: 13, voltcore: 72.5, passive: 66 },
  { min: 16, voltcore: 72.2, passive: 65 },
  { min: 21, voltcore: 71.3, passive: 60.5 },
  { min: 25, voltcore: 70.6, passive: 58 },
  { min: 29, voltcore: 70,   passive: 56 },
  { min: 33, voltcore: 69.2, passive: 54 },
  { min: 37, voltcore: 68.5, passive: 52.5 },
  { min: 41, voltcore: 67.5, passive: 51.2 },
  { min: 44, voltcore: 65,   passive: 50.7 },
  { min: 45, voltcore: 64.8, passive: 50.5 },
];

const CHART_DATA_MINUS20 = [
  { min: 1,  voltcore: 75,   passive: 75 },
  { min: 5,  voltcore: 73.4, passive: 71 },
  { min: 9,  voltcore: 71.6, passive: 67 },
  { min: 13, voltcore: 70,   passive: 64.5 },
  { min: 17, voltcore: 68.4, passive: 60 },
  { min: 21, voltcore: 67,   passive: 56.5 },
  { min: 25, voltcore: 65.4, passive: 53.5 },
  { min: 26, voltcore: 65,   passive: 53 },
  { min: 29, voltcore: 63.8, passive: 50.5 },
  { min: 33, voltcore: 62.5, passive: 48 },
  { min: 37, voltcore: 61.3, passive: 46 },
  { min: 41, voltcore: 60,   passive: 44.3 },
  { min: 45, voltcore: 59,   passive: 43 },
];

const HeatRetentionChart = ({ dark, data, ambientLabel, ambientIcon: AmbientIcon, multiplier, extraMinutes }) => {
  const [ref, shown] = useInView(0.25);
  const [hoverIdx, setHoverIdx] = useState(null);
  const W = 560, H = 260, PL = 38, PR = 16, PT = 26, PB = 34;
  const cW = W - PL - PR, cH = H - PT - PB;
  const minTemp = 30, maxTemp = 85;
  const safeMin = 65;
  const toX = (min) => PL + ((min - 1) / 44) * cW;
  const toY = (temp) => PT + cH - ((temp - minTemp) / (maxTemp - minTemp)) * cH;
  const safeBandY = toY(safeMin);
  const pathFor = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${toX(d.min)} ${toY(d[key])}`).join(" ");
  const areaFor = (key) => `${pathFor(key)} L ${toX(data[data.length - 1].min)} ${toY(minTemp)} L ${toX(data[0].min)} ${toY(minTemp)} Z`;
  const axisColor = dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const textColor = dark ? "rgba(255,255,255,0.32)" : "rgba(0,0,0,0.35)";
  const hovPt = hoverIdx !== null ? data[hoverIdx] : null;

  return (
    <div className={`rounded-2xl p-6 border transition-all duration-300 cursor-default ${dark ? "bg-[#111118] border-zinc-800" : "bg-white border-zinc-200"}`}
      onMouseLeave={() => setHoverIdx(null)}>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 mb-1" style={{ color: GREEN }}>
            {AmbientIcon && <AmbientIcon size={10} />} {ambientLabel}
          </span>
          <div className={`text-sm font-bold ${dark ? "text-white" : "text-[#14141B]"}`}>Voltcore vs. passive insulation</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black" style={{ color: NEON }}>×{multiplier} longer</div>
          <div className="text-[10px]" style={{ color: CRAFT }}>+{extraMinutes} min more above 65°C</div>
        </div>
      </div>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width * W;
          let closest = 0, closestDist = Infinity;
          data.forEach((d, i) => {
            const dist = Math.abs(toX(d.min) - x);
            if (dist < closestDist) { closestDist = dist; closest = i; }
          });
          setHoverIdx(closest);
        }}>
        <rect x={PL} y={PT} width={cW} height={safeBandY - PT}
          fill={dark ? "rgba(148,195,86,0.06)" : "rgba(148,195,86,0.07)"} />
        <line x1={PL} y1={safeBandY} x2={PL + cW} y2={safeBandY} stroke={GREEN} strokeWidth="1" strokeDasharray="4 3" />
        <text x={PL + cW - 2} y={safeBandY - 6} textAnchor="end" fontSize="9" fill={GREEN} fontWeight="bold">65°C safe minimum</text>
        {[40, 50, 60, 70, 80].map(t => (
          <g key={t}>
            <line x1={PL} y1={toY(t)} x2={PL + cW} y2={toY(t)} stroke={axisColor} strokeWidth="1" />
            <text x={PL - 6} y={toY(t) + 3} textAnchor="end" fontSize="9" fill={textColor}>{t}</text>
          </g>
        ))}
        {data.filter((_, i) => i % 2 === 0).map(d => (
          <text key={d.min} x={toX(d.min)} y={H - 6} textAnchor="middle" fontSize="9" fill={textColor}>{d.min}</text>
        ))}
        <path d={shown ? areaFor("voltcore") : ""} fill={GREEN} fillOpacity="0.08" style={{ transition: "d 0.9s ease" }} />
        <path d={shown ? pathFor("passive") : ""} stroke={dark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)"}
          strokeWidth="2" fill="none" strokeDasharray="5 4" style={{ transition: "d 0.9s ease" }} />
        <path d={shown ? pathFor("voltcore") : ""} stroke={GREEN} strokeWidth="3" fill="none" style={{ transition: "d 0.9s ease" }} />
        {hovPt && (
          <>
            <line x1={toX(hovPt.min)} y1={PT} x2={toX(hovPt.min)} y2={PT + cH}
              stroke={dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)"} strokeWidth="1" />
            <circle cx={toX(hovPt.min)} cy={toY(hovPt.voltcore)} r="4.5" fill={GREEN} />
            <circle cx={toX(hovPt.min)} cy={toY(hovPt.passive)} r="3.5" fill={dark ? "#666" : "#999"} />
            <rect x={Math.min(toX(hovPt.min) + 8, W - 108)} y={toY(hovPt.voltcore) - 30} width="104" height="34" rx="5"
              fill={dark ? "rgba(20,20,27,0.94)" : "rgba(255,255,255,0.96)"} stroke={GREEN} strokeWidth="0.6" />
            <text x={Math.min(toX(hovPt.min) + 14, W - 102)} y={toY(hovPt.voltcore) - 16} fontSize="9.5" fill={GREEN} fontWeight="bold">
              Voltcore: {hovPt.voltcore}°C
            </text>
            <text x={Math.min(toX(hovPt.min) + 14, W - 102)} y={toY(hovPt.voltcore) - 2} fontSize="9.5" fill={dark ? "#888" : "#999"}>
              Passive: {hovPt.passive}°C
            </text>
          </>
        )}
        {(() => { const li = Math.min(data.length - 3, Math.max(2, Math.floor(data.length * 0.55))); return (
          <>
            <text x={toX(data[li].min) + 6} y={toY(data[li].voltcore) - 10} fontSize="9.5" fill={GREEN} fontWeight="bold">Voltcore</text>
            <text x={toX(data[li - 1].min) + 6} y={toY(data[li - 1].passive) + 14} fontSize="9.5" fill={dark ? "#777" : "#aaa"}>Passive bags</text>
          </>
        ); })()}
        <text x={PL} y={H - 6} textAnchor="start" fontSize="8" fill={textColor}>TIME, min</text>
      </svg>
      <p className={`text-[10px] mt-3 ${dark ? "text-zinc-600" : "text-zinc-500"}`}>
        *Test sample mass: 1 kg · Initial food temperature: 75°C · External temperature: {ambientLabel.match(/-?\d+°C/)?.[0] || "—"}
      </p>
    </div>
  );
};

/* ─── THERMAL BEFORE / AFTER SLIDER ───────────────────────────────────── */
const ThermalCompareSlider = ({ leftImg, leftLabel, rightImg, rightLabel, rightTemp }) => {
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);
  const ref = useRef(null);
  const updateFromClientX = (clientX) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.min(96, Math.max(4, pct));
    setPos(pct);
  };

  useEffect(() => {
    const move = (e) => { if (dragging.current) updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX); };
    const stop = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", stop);
    };
  }, []);

  return (
    <div className={`rounded-2xl overflow-hidden border border-zinc-800`}>
      <div
        ref={ref}
        className="relative w-full select-none overflow-hidden cursor-ew-resize bg-black"
        style={{ aspectRatio: "16 / 10" }}
        onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
        onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
      >
        <img src={rightImg} alt={rightLabel} draggable={false}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
        <img src={leftImg} alt={leftLabel} draggable={false}
          className="absolute inset-0 w-full h-full object-contain"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
        <div className="absolute top-0 bottom-0 w-[2px] bg-white/90 pointer-events-none" style={{ left: `${pos}%` }} />
        <div className="absolute top-1/2 w-10 h-10 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none"
          style={{ left: `${pos}%` }}>
          <FaArrowLeft size={9} className="text-[#14141B]" /><FaArrowRight size={9} className="text-[#14141B] -ml-0.5" />
        </div>
        <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-sm text-white/75 border border-white/10">
          {leftLabel}
        </span>
        <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-[#14141B] border"
          style={{ background: `${GREEN}E6`, borderColor: GREEN }}>
          {rightLabel}
        </span>
        <span className="absolute bottom-4 right-4 text-xs font-black px-3 py-1.5 rounded-full text-[#14141B]" style={{ background: `${GREEN}E6` }}>
          {rightTemp}
        </span>
        <span className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest text-white/45 pointer-events-none hidden md:block">
          Drag to compare
        </span>
      </div>
      <p className="text-[10px] px-4 py-2.5 text-zinc-500">
        MAX: 84.7°C · MIN: 29.9°C · Test conditions: 18V, 6Ah
      </p>
    </div>
  );
};

/* ─── THERMAL PHOTO ────────────────────────────────────────────────────── */
const ThermalPhoto = ({ img, label, value }) => {
  const openLightbox = useLightbox();
  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black cursor-zoom-in group"
      style={{ aspectRatio: "16 / 10" }}
      onClick={() => openLightbox({ img, caption: label })}>
      <img src={img} alt={label} className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent h-20 pointer-events-none" />
      <span className="absolute bottom-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-sm text-white/80">
        {label}
      </span>
      <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-[#14141B]" style={{ background: `${GREEN}E6` }}>
        {value}
      </span>
      <span className="absolute top-4 left-4 w-8 h-8 rounded-full flex items-center justify-center bg-black/55 backdrop-blur-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <FaExpand size={11} />
      </span>
    </div>
  );
};

/* ─── GALLERY TILE ─────────────────────────────────────────────────────── */
const GalleryTile = ({ img, caption, dark, feature = false }) => {
  const openLightbox = useLightbox();
  return (
    <div className={`rounded-2xl overflow-hidden border transition-all duration-300 group ${dark ? "border-zinc-800 hover:border-zinc-700" : "border-zinc-200 hover:border-zinc-300"}`}>
      <div
        className={`relative overflow-hidden cursor-zoom-in flex items-center justify-center ${dark ? "bg-[#0c0c11]" : "bg-[#eeede7]"}`}
        style={{ height: feature ? 480 : 280 }}
        onClick={() => openLightbox({ img, caption })}>
        {feature && (
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }} />
        )}
        <img src={img} alt={caption}
          className={`relative ${feature ? "max-w-[86%] max-h-[86%] w-auto h-auto" : "w-full h-full"} object-contain transition-transform duration-500 group-hover:scale-[1.04]`} />
        <span className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-black/45 backdrop-blur-sm text-white/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <FaExpand size={11} />
        </span>
      </div>
      <div className={`px-4 py-3 border-t flex items-center justify-between gap-3 ${dark ? "border-zinc-800 bg-[#111118]" : "border-zinc-100 bg-[#fafaf8]"}`}>
        <span className={`text-[11px] font-bold ${dark ? "text-zinc-400" : "text-zinc-500"}`}>{caption}</span>
        <span className={`text-[9px] font-black uppercase tracking-widest shrink-0 ${dark ? "text-zinc-600" : "text-zinc-400"}`}>Click to enlarge</span>
      </div>
    </div>
  );
};

/* ── KPI CARD ─────────────────────────────────────────────────────────── */
const KpiCard = ({ val, label, card, muted }) => {
  const [ref, shown] = useInView(0.5);
  const display = useCountUp(val, shown);
  return (
    <div ref={ref}
      className={`rounded-2xl p-6 border transition-all duration-300 cursor-default ${card}`}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${GREEN}50`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 16px 40px ${GREEN}10`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <div className="text-2xl md:text-3xl font-black mb-2 tabular-nums" style={{ color: GREEN }}>{display}</div>
      <div className={`text-xs font-bold ${muted}`}>{label}</div>
    </div>
  );
};

/* ─── VIDEO BLOCK ─────────────────────────────────────────────────────── */
const VideoBlock = ({ caption, dark }) => (
  <div className={`rounded-2xl overflow-hidden border ${dark ? "border-zinc-800" : "border-zinc-200"}`}>
    <div className="relative w-full aspect-video bg-black">
      <video src={BagDeliveryAnim} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white/85 text-xs font-bold uppercase tracking-widest bg-black/55 backdrop-blur-sm px-3 py-1.5 rounded-full">
        <FaPlay size={9} /> {caption}
      </div>
    </div>
  </div>
);

/* ─── DATA ─────────────────────────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    id: "delivery-asia", num: "01", icon: FaGlobeAsia, tag: "Delivery Platform — Asia",
    title: "Largest Food Delivery Platform in Asia",
    tagline: "An IoT-integrated heating solution keeping food at a steady 60°C, engineered for minimum power draw.",
    status: "PoC completed — extended field tests being finalised by the client",
    statusColor: GREEN,
    region: "Asia",
    segment: "Delivery",
    goal: "To create a heating solution to maintain food temperature at 60°C with minimum power consumption, with integration into an existing IoT framework.",
    kpis: [
      { val: "60°C",  label: "Continuous food temperature, IoT-controlled" },
      { val: "3h+",   label: "Permanent heat on an 18V, 6Ah battery" },
      { val: "+250g", label: "Added by the removable laminated heater" },
    ],
    bullets: [
      { icon: FaThermometerHalf, title: "IoT-connected thermal control", desc: "Heater integrated with the client's existing IoT framework — real-time temperature telemetry and remote adjustment." },
      { icon: FaWeightHanging,   title: "Ultra-lightweight add-on",      desc: "+250g only for the removable laminated heater with connectors. An integrated, non-removable version adds just +150–200g." },
      { icon: FaBolt,            title: "3h+ continuous heat",           desc: "An 18V, 6Ah battery delivers 3+ hours of permanent heating — enough to cover a full delivery shift." },
    ],
    thermalCompare: {
      left:  { img: InsidedevImg, label: "Prototype control unit", temp: "Driver board & heater wiring", note: "Control unit with driver board and heater wiring" },
      right: { img: ThermBagImg,  label: "Thermal reading",        temp: "46.6°C center · 61.3°C max",  note: "Steady-state comfort zone thermal imaging" },
    },
    gallery: [
      { img: RedBagImg, caption: "PoC delivery bag fitted with the Voltcore heater" },
    ],
    videoCaption: "Live test recording — heat-up from cold start",
    footnote: "A related Voltcore project is integrating the same lightweight heating mesh into motorcycle delivery bags across the Asian market (PoC in progress).",
  },
  {
    id: "manufacturer-scandic", num: "02", icon: FaBoxOpen, tag: "Bag Manufacturer — UK / Scandic",
    title: "Leading Bag Manufacturer for Takeaway Platforms",
    tagline: "An integrated heating system holding the inside of the bag at 65°C for the Scandic market.",
    status: "PoC completed — first commercial batch ordered",
    statusColor: NEON,
    region: "UK / Scandinavia",
    segment: "Bag Manufacturer",
    goal: "To create an integrated heating system to maintain the temperature inside the bag at 65°C for the Scandic market.",
    kpis: [
      { val: "65°C",    label: "Target interior temperature, Scandic market" },
      { val: "50 units",label: "First commercial batch, 2 bag configurations" },
      { val: "84.7°C",  label: "Peak surface reading on thermal imaging" },
    ],
    bullets: [
      { icon: FaLayerGroup,      title: "Side-wall + bottom radiant coverage", desc: "Heating mesh runs the full inner wall and base of the bag for a uniform 65°C — no cold corners at the bottom." },
      { icon: FaThermometerHalf, title: "84.7°C peak, uniform hold",           desc: "Thermal imaging shows a MAX 84.7°C / MIN 29.9°C surface spread, comfortably holding the interior above the 65°C target." },
      { icon: FaTruck,           title: "First commercial batch shipped",      desc: "50 units across 2 bag configurations ordered for winter rider trials with a UK delivery platform." },
    ],
    slider: { leftImg: InsideBagImg, leftLabel: "Interior — before heating", rightImg: HeatThermBagImg, rightLabel: "Voltcore thermal", rightTemp: "MAX 84.7°C" },
    showChart: true,
    gallery: [
      { img: RealProdBagImg, caption: "Production bag — Voltcore heater strips integrated" },
    ],
    videoCaption: "Live test recording — bag interior heat-up",
    footnote: "A parallel PoC is in progress with a second UK bag manufacturer to implement the same heater inside a tailored bag design.",
  },
];

/* ─── APPLICATIONS ─────────────────────────────────────────────────────── */
const ApplicationsSection = ({ dark }) => (
  <section className={`py-24 px-6 border-t ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
    <div className="container mx-auto max-w-6xl">
      <Reveal>
        <div className="mb-14">
          <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// Applications</span>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
            Where active heating outperforms<br />passive insulation.
          </h2>
          <p className={`text-sm mt-4 max-w-2xl leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
            Across the hot-meal value chain — from the rider's backpack to institutional trolleys.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {[
          { num: "01", title: "Soft food delivery backpacks & boxes", img: LivreurImg,
            desc: "For cyclists and on-foot couriers. Lightweight removable heater (+250g) or integrated non-removable version (+150–200g). Battery hot-swappable between deliveries." },
          { num: "02", title: "Hard food delivery boxes & containers", img: ScootImg,
            desc: "For motorcycle and scooter couriers. Side-wall heating + full-bottom radiant layer. 12 VDC plug-in compatible (bike power) or battery pack." },
          { num: "03", title: "Institutional hot food transport", img: BImg,
            desc: "For catering, hospitals, and school food service. Cart-integrated heating with full sidewall and base radiant layers, compatible with existing IoT monitoring frameworks." },
        ].map(({ num, title, img, desc }, i) => (
          <Reveal key={num} delay={i * 150}>
            <div className={`group h-full flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 cursor-default ${dark ? "bg-[#14141B] border-zinc-700" : "bg-white border-zinc-200"}`}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${GREEN}40`; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.transform = ""; }}>
              <div className="relative overflow-hidden shrink-0" style={{ height: 220 }}>
                <img src={img} alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ display: "block" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md" style={{ background: "rgba(20,20,27,0.7)", color: GREEN }}>{num}</span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className={`text-base font-bold mb-3 leading-snug shrink-0 ${dark ? "text-white" : "text-[#14141B]"}`}>{title}</h3>
                <p className={`text-sm leading-relaxed flex-1 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* ─── OTHER ACTIVE ENGAGEMENTS ─────────────────────────────────────────── */
const OTHER_ENGAGEMENTS = [
  { icon: FaBoxOpen,    segment: "Bag Manufacturer",               region: "UK",            desc: "PoC contract for implementation of the heater inside a tailored bag.", status: "PoC in progress" },
  { icon: FaUtensils,   segment: "Foodservice Equipment / Catering", region: "North America", desc: "Side-wall heating with a full-bottom radiant layer, compatible with 12 VDC plug-in and battery packs.", status: "Prototype tested — design iteration requested" },
  { icon: FaMotorcycle, segment: "Delivery",                        region: "Asia",          desc: "Integration of Voltcore's lightweight heating mesh into motorcycle delivery bags.", status: "PoC in progress" },
];

/* ─── CASE STUDY PANEL ─────────────────────────────────────────────────── */
const CaseStudyPanel = ({ cs, dark }) => {
  const h2c = dark ? "text-white" : "text-[#14141B]";
  const muted = dark ? "text-zinc-400" : "text-zinc-600";
  const card = dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200";

  return (
    <div className="space-y-12">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>
              {cs.num} // {cs.segment} · {cs.region}
            </span>
            <h2 className={`text-3xl md:text-5xl font-black tracking-tighter uppercase leading-tight mb-4 ${h2c}`}>
              {cs.title}
            </h2>
            <p className={`text-base leading-relaxed max-w-2xl ${muted}`}>{cs.tagline}</p>
          </div>
          <div className="shrink-0">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-[10px] font-black uppercase tracking-widest"
              style={{ borderColor: `${cs.statusColor}40`, background: `${cs.statusColor}10`, color: cs.statusColor }}>
              ● {cs.status}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Goal */}
      <Reveal delay={60}>
        <div className={`rounded-2xl p-6 border ${dark ? "bg-[#111118] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <span className="text-[10px] font-black uppercase tracking-widest block mb-2" style={{ color: GREEN }}>// Project Goal</span>
          <p className={`text-sm leading-relaxed font-medium ${dark ? "text-[#B8B7A4]" : "text-[#14141B]"}`}>{cs.goal}</p>
        </div>
      </Reveal>

      {/* KPI cards */}
      <Reveal delay={80}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cs.kpis.map(({ val, label }) => (
            <KpiCard key={label} val={val} label={label} card={card} muted={muted} />
          ))}
        </div>
      </Reveal>

      {/* Bullets */}
      <Reveal delay={100}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cs.bullets.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className={`rounded-2xl p-6 border transition-all duration-300 cursor-default ${card}`}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${GREEN}40`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.transform = ""; }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${GREEN}18`, color: GREEN }}>
                <Icon size={16} />
              </div>
              <h4 className={`text-sm font-bold mb-2 ${h2c}`}>{title}</h4>
              <p className={`text-xs leading-relaxed ${muted}`}>{desc}</p>
            </div>
          ))}
        </div>
      </Reveal>

      {/* Thermal Compare for case 01 */}
      {cs.thermalCompare && (
        <Reveal delay={120}>
          <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: GREEN }}>// Thermal Imaging Comparison — drag to compare</span>
          <ThermalCompareSlider
            leftImg={cs.thermalCompare.left.img}
            leftLabel={cs.thermalCompare.left.label}
            rightImg={cs.thermalCompare.right.img}
            rightLabel={cs.thermalCompare.right.label}
            rightTemp={cs.thermalCompare.right.temp}
          />
          <div className="grid grid-cols-2 gap-3 mt-3">
            <p className={`text-[10px] ${dark ? "text-zinc-500" : "text-zinc-600"}`}>{cs.thermalCompare.left.note}</p>
            <p className={`text-[10px] ${dark ? "text-zinc-500" : "text-zinc-600"}`}>{cs.thermalCompare.right.note}</p>
          </div>
        </Reveal>
      )}

      {/* Thermal slider for case 02 */}
      {cs.slider && (
        <Reveal delay={120}>
          <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: GREEN }}>// Thermal Imaging Comparison — drag to compare</span>
          <ThermalCompareSlider {...cs.slider} />
        </Reveal>
      )}

      {/* Heat retention charts */}
      {cs.showChart && (
        <Reveal delay={140}>
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest block mb-2" style={{ color: GREEN }}>// What Is the Magnitude of Improvement?</span>
            <p className={`text-sm leading-relaxed max-w-2xl mb-5 ${muted}`}>
              The comfortable, safe serving range for hot meals is 65–75°C. With Voltcore heating, this range is maintained 2–3× longer than with passive insulation.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <HeatRetentionChart dark={dark} data={CHART_DATA_5C} ambientLabel="Low temperature — 5°C exterior" multiplier="3" extraMinutes="28" />
              <HeatRetentionChart dark={dark} data={CHART_DATA_MINUS20} ambientLabel="Extreme cold — -20°C exterior" ambientIcon={FaSnowflake} multiplier="2" extraMinutes="12" />
            </div>
          </div>
        </Reveal>
      )}

      {/* Video */}
      <Reveal delay={160}>
        <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: GREEN }}>// Test Recording</span>
        <VideoBlock caption={cs.videoCaption} dark={dark} />
      </Reveal>

      {/* Gallery */}
      {cs.gallery?.length > 0 && (
        <Reveal delay={180}>
          <span className="text-[10px] font-black uppercase tracking-widest block mb-3" style={{ color: GREEN }}>// Gallery</span>
          <div className={`grid grid-cols-1 ${cs.gallery.length > 1 ? "md:grid-cols-2" : ""} gap-4`}>
            {cs.gallery.map(({ img, caption }) => (
              <GalleryTile key={caption} img={img} caption={caption} dark={dark} feature={cs.gallery.length === 1} />
            ))}
          </div>
        </Reveal>
      )}

      {/* Footnote */}
      {cs.footnote && (
        <Reveal delay={200}>
          <div className="rounded-2xl border px-6 py-4" style={{ borderColor: `${GREEN}30`, background: `${GREEN}0A` }}>
            <p className="text-xs md:text-sm font-bold" style={{ color: dark ? GREEN : "#5c7a3b" }}>✦ {cs.footnote}</p>
          </div>
        </Reveal>
      )}
    </div>
  );
};

/* ─── MAIN PAGE ────────────────────────────────────────────────────────── */
const FoodDeliveryCaseStudies = () => {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  const [activeId, setActiveId] = useState(CASE_STUDIES[0].id);
  const active = CASE_STUDIES.find(c => c.id === activeId) || CASE_STUDIES[0];
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

  const bg = dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F0EFEA] text-[#14141B]";
  const [glow, setGlow] = useState({ x: 50, y: 40 });

  return (
    <LightboxProvider>
      <div className={`min-h-screen transition-colors duration-300 ${bg}`} style={{ fontFamily: FONT }}>
        {/* HERO */}
        <section className="relative min-h-[64vh] flex items-end overflow-hidden bg-[#14141B]"
          onMouseMove={e => {
            const r = e.currentTarget.getBoundingClientRect();
            setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
          }}>
          <div className="absolute inset-0 transition-[background] duration-300 ease-out"
            style={{ background: `radial-gradient(ellipse 70% 55% at ${glow.x}% ${glow.y}%, ${GREEN}16 0%, transparent 65%)` }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/20 to-transparent" />
          <Link to="/industries/thermal-logistics"
            className="absolute top-32 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 transition-colors duration-200"
            onMouseEnter={e => { e.currentTarget.style.color = GREEN; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}>
            <FaArrowLeft size={10} /> Thermal Logistics
          </Link>
          <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-16 pt-40">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: GREEN }}>
                Thermal Logistics / Food Delivery — Case Studies
              </span>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
                Proven.<br /><span style={{ color: GREEN }}>By project.</span>
              </h1>
            </Reveal>
            <Reveal delay={80}>
              <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed">
                Two real deployments — a leading Asian delivery platform and a UK/Scandic bag manufacturer — from PoC to first commercial batch. Real thermal data, real partners, real results.
              </p>
            </Reveal>
          </div>
        </section>

        {/* STICKY TABS */}
        <div className={`sticky top-0 z-40 border-b backdrop-blur-md ${dark ? "bg-[#14141B]/92 border-zinc-800" : "bg-[#F0EFEA]/92 border-zinc-300"}`}>
          <div className="container mx-auto max-w-6xl px-6">
            <div className="flex gap-0 overflow-x-auto">
              {CASE_STUDIES.map(cs => {
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

        {/* ACTIVE PANEL */}
        <section ref={panelRef} id="case-study-panel" className={`py-20 px-6 ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
          <div className="container mx-auto max-w-6xl">
            <CaseStudyPanel key={active.id} cs={active} dark={dark} />
          </div>
        </section>

        {/* APPLICATIONS */}
        <ApplicationsSection dark={dark} />

        {/* OTHER ACTIVE ENGAGEMENTS */}
        <section className={`py-20 px-6 border-t ${dark ? "bg-[#111118] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
          <div className="container mx-auto max-w-6xl">
            <Reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-2" style={{ color: GREEN }}>// Also in the Pipeline</span>
              <h3 className={`text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 ${dark ? "text-white" : "text-[#14141B]"}`}>
                Other Active Engagements
              </h3>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {OTHER_ENGAGEMENTS.map(({ icon: Icon, segment, region, desc, status }, i) => (
                <Reveal key={segment + region} delay={i * 80}>
                  <div className={`h-full rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: `${GREEN}18`, color: GREEN }}>
                      <Icon size={14} />
                    </div>
                    <h5 className={`text-xs font-black uppercase tracking-wide mb-1 ${dark ? "text-white" : "text-[#14141B]"}`}>{segment}</h5>
                    <span className={`text-[10px] font-bold uppercase tracking-widest block mb-3 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{region}</span>
                    <p className={`text-xs leading-relaxed mb-4 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{desc}</p>
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>● {status}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </LightboxProvider>
  );
};

export default FoodDeliveryCaseStudies;