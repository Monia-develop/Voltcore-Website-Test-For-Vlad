import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaChair, FaClone, FaCubes, FaHandPointer,
  FaLayerGroup, FaBolt, FaWeightHanging,
} from "react-icons/fa";
import Armrest               from "../../assets/website/industries/Armrest.png";
import TouchDemo             from "../../assets/website/industries/TouchDemo.png";
import DoorPanelsPhoto       from "../../assets/website/industries/DoorPannel.png";
import GloveboxPhoto         from "../../assets/website/industries/Glovebox.png";
import SeatsOverviewPhoto    from "../../assets/website/industries/image55.png";
import SeatsMeshZoom         from "../../assets/website/industries/image61.png";
import CopperThermalSeats    from "../../assets/website/industries/AutoHeatCopSystem.png";
import VoltcoreThermalSeats  from "../../assets/website/industries/AutoHeatVoltcore.png";
import VoltcoreThermalHero   from "../../assets/website/industries/HeatVoltcoreAuto.png";
import SerialThermalLam      from "../../assets/website/industries/SerialSolutions.png";
import VoltcoreThermalLam    from "../../assets/website/industries/VoltcoreSolutions.png";
import LamSamplePhoto        from "../../assets/website/industries/Surface.png";
import InjectionMeshPhoto    from "../../assets/website/industries/Accoudoir.png";
import InjectionWeaveZoom    from "../../assets/website/industries/ZoomAccourdoir.png";
import InjectionThermal      from "../../assets/website/industries/ThermalAuto.png";
import SensingLaptopPhoto    from "../../assets/website/industries/Sensing01.png";
import SensingFabricPhoto    from "../../assets/website/industries/Sensing02.png";
import HeroVideo             from "../../assets/website/Anim2Automotive.mp4";
import SeatsVideo            from "../../assets/website/anim1-2.mp4";
// NOUVEL IMPORT POUR LA VIDEO
const ThermalVideoGlobox = null;
import GloveboxIntegrationAnim from "../../assets/website/GloveboxAnim.mp4";

/* ─── THEME ───────────────────────────────────────────────────────────────── */
const GREEN  = "#94C356";
const NEON   = "#D9FE42";
const ORANGE = "#F07E26";
const FONT   = "'AkkuratLL', ui-sans-serif, system-ui, sans-serif";

/* ── HOOKS ───────────────────────────────────────────────────────────────── */
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
const CountUp = ({ to, suffix = " ", prefix = " ", duration = 1000 }) => {
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

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const CASE_STUDIES = [
  {
    id: "seats", num: "01", icon: FaChair, tag: "Seats",
    title: "Breathable Open-Cell Mesh",
    tagline: "Homogeneous, energy-efficient heating woven directly into the seat upholstery.",
    headline: "−30% power at matched speed, or −40% faster at −15% less power.",
    kpis: [
      { val: 30, suffix: "%", label: "Less power consumption", prefix: "−" },
      { val: 40, suffix: "%", label: "Faster time-to-comfort", prefix: "−" },
      { val: 4,  suffix: "°C", label: "Surface ΔT (vs >10°C)", prefix: "ΔT ~" },
    ],
    bullets: [
      { icon: FaLayerGroup,    title: "Homogeneous and more even heat distribution", desc: "Even warmth across the full seating surface — no cold zones, no hotspots. Surface ΔT ~4°C vs >10°C for copper." },
      { icon: FaBolt,          title: "More energy efficient & faster heating",       desc: "−30% power at same time-to-comfort, or −40% faster at −15% less power than copper wire at 33 W." },
      { icon: FaWeightHanging, title: "Full air permeability & lower weight",         desc: "Open-cell mesh breathes with seat foam. 30–60 g/m² — drastically lighter than copper snake systems." },
    ],
animCompare: {
  left:  { src: SeatsVideo, label: "Copper Wire System", temp: "Surface ΔT >10°C", note: "Uneven heat — hotspots & cold zones" },
  right: { src: HeroVideo,  label: "Voltcore",           temp: "Surface ΔT ~4°C",  note: "Perfectly uniform warmth" },
},
thermal: {
  leftImg: CopperThermalSeats,   leftLabel: "Copper Wire — Cen 39.0°C",  leftTemp: "Surface ΔT >10°C",
  rightImg: VoltcoreThermalSeats, rightLabel: "Voltcore — Max 50.5°C",   rightTemp: "Surface ΔT ~4°C",
},
    chart: {
      xKey: "min", xLabel: "Minutes", yLabel: "Temp gain (°C)",
      data: [
        { min: 0,  copper: 0,    volt28: 0,    volt24: 0 },
        { min: 2,  copper: 3.4,  volt28: 5.6,  volt24: 3.8 },
        { min: 4,  copper: 6.0,  volt28: 8.7,  volt24: 6.3 },
        { min: 6,  copper: 8.0,  volt28: 10.6, volt24: 8.2 },
        { min: 8,  copper: 9.4,  volt28: 11.9, volt24: 9.6 },
        { min: 10, copper: 10.5, volt28: 12.8, volt24: 10.6 },
        { min: 12, copper: 11.3, volt28: 13.5, volt24: 11.4 },
        { min: 14, copper: 11.9, volt28: 14.0, volt24: 12.0 },
        { min: 16, copper: 12.4, volt28: 14.4, volt24: 12.5 },
        { min: 18, copper: 12.8, volt28: 14.7, volt24: 12.9 },
        { min: 20, copper: 13.1, volt28: 15.0, volt24: 13.2 },
      ],
      series: [
        { key: "copper", name: "Copper Wire · 33 W",           color: "#8a8a8a" },
        { key: "volt28", name: "Voltcore · 28 W (−40% time)",  color: GREEN, highlight: true },
        { key: "volt24", name: "Voltcore · 24 W (−30% power)", color: NEON },
      ],
    },
    bars: [
      { title: "Same time-to-comfort", note: "Voltcore draws 30% less power at matched heat-up speed.",
        rows: [
          { label: "Copper Wire System", value: "33 W", pct: 100 },
          { label: "Voltcore",           value: "24 W · −30%", pct: 73, highlight: true },
        ]},
      { title: "Same power budget", note: "Voltcore reaches comfort 40% faster at matched power.",
        rows: [
          { label: "Copper Wire System", value: "Baseline", pct: 100 },
          { label: "Voltcore",           value: "28 W · −40% time", pct: 60, highlight: true },
        ]},
    ],
    gallery: [
      { img: SeatsMeshZoom,      caption: "Open-cell mesh, close-up" },
      { img: SeatsOverviewPhoto, caption: "Cabin Cocoon — twin-seat demo" },
    ],
    footNote: "Weight: 30–60 g/m² — full air permeability preserved.",
  },
  {
    id: "laminated", num: "02", icon: FaClone, tag: "Laminated Surface",
    title: "Laminated Heated Surface",
    tagline: "Faster, more homogeneous heat — laminated straight into the interior trim.",
    headline: "−30% time-to-comfort on just −6% less power.",
    kpis: [
      { val: 30, suffix: "%", label: "Faster time-to-comfort", prefix: "−" },
      { val: 6,  suffix: "%", label: "Less power consumption", prefix: "−" },
      { val: 3,  suffix: "steps", label: "Fewer integration steps", prefix: "2–" },
    ],
    bullets: [
      { icon: FaLayerGroup, title: "More homogeneous heat distribution",      desc: "Tighter, more even thermal spread vs serial (copper-based) solutions. Surface ΔT ~4°C vs ~8°C serial." },
      { icon: FaBolt,       title: "More energy efficient & faster heating",   desc: "Reaches comfort temperature 30% faster on 6% less power than serial solution." },
      { icon: FaClone,      title: "Faster & cheaper integration to interior", desc: "2–3 fewer integration steps than legacy laminated assemblies, cutting production cost." },
    ],
    // MODIFICATION: Suppression de thermal et ajout de video
    challenge: "The Challenge — legacy copper-wire laminated surfaces heat unevenly and never reach target ΔT within a normal cabin warm-up window. Voltcore's laminated mesh gets there in under 40 seconds.",
    video: { src: ThermalVideoGlobox, targetSec: 39, totalSec: 180 },
    integrationVideo: { src: GloveboxIntegrationAnim, caption: "Laminated straight into the glovebox — 2–3 fewer integration steps than a legacy assembly." },
    chart: {
      xKey: "sec", xLabel: "Seconds", yLabel: "Δ Temperature (°C)",
      yDomain: [20, 50], yTicks: [20, 25, 30, 35, 40, 45, 50],
      xTicks: [0, 20, 40, 60, 80, 100, 120, 140, 160, 180],
      data: [
        { sec: 0,   serial: 22,   volt: 22 },
        { sec: 20,  serial: 27,   volt: 31 },
        { sec: 40,  serial: 31,   volt: 36 },
        { sec: 60,  serial: 35,   volt: 40 },
        { sec: 80,  serial: 38,   volt: 43 },
        { sec: 100, serial: 41,   volt: 45 },
        { sec: 120, serial: 43,   volt: 46.5 },
        { sec: 140, serial: 45,   volt: 47.5 },
        { sec: 160, serial: 46.5, volt: 48 },
        // MODIFICATION: Correction de "s ec" en "sec" et ajout de la fin à 180s
        { sec: 180, serial: 47.5, volt: 48.5 },
      ],
      series: [
        { key: "serial", name: "Copper Wire System",             color: "#8a8a8a" },
        { key: "volt",   name: "Voltcore (−30% time, −6% pwr)", color: GREEN, highlight: true },
      ],
    },
    bars: [
      { title: "Time to comfort & power",
        note: "Voltcore reaches target temperature 30% faster while drawing 6% less power.",
        rows: [
          { label: "Serial Solution", value: "Baseline", pct: 100 },
          { label: "Voltcore",        value: "−30% time · −6% power", pct: 70, highlight: true },
        ]},
    ],
    gallery: [
      { img: LamSamplePhoto,      caption: "Laminated sample — 2–3 fewer integration steps" },
      { img: VoltcoreThermalHero, caption: "Voltcore laminated heating pattern" },
    ],
    footNote: "Faster and cheaper to laminate directly onto A-surface trim components.",
  },
  {
    id: "injection", num: "03", icon: FaCubes, tag: "Injection Co-Molding",
    title: "Injection Co-Molding",
    tagline: "Radiative heating meshes co-molded straight into PP interior components.",
    headline: "Fewer assembly steps, mono-material recyclability at end-of-life.",
    kpis: [
      { val: 48, suffix: "°C", label: "Max surface temperature", prefix: " " },
      { val: 40, suffix: "°C", label: "Center surface temperature", prefix: " " },
      { val: 100, suffix: "%", label: "Mono-material recyclable", prefix: " " },
    ],
    bullets: [
      { icon: FaCubes,      title: "Seamless & cost-effective integration", desc: "Co-molded directly into PP components — no bonding layer, no extra assembly step vs traditional solutions." },
      { icon: FaLayerGroup, title: "Radiative panels or contact surface",   desc: "Works as ambient radiative panel and direct-touch heated surface. Max 48.2°C · Center 40.5°C." },
      { icon: FaBolt,       title: "Lower cost, higher recyclability",       desc: "Mono-material design lowers integration cost and improves end-of-life recyclability to 100%." },
    ],
    thermalCompare: {
      left:  { img: InjectionMeshPhoto, label: "Mesh after injection", temp: "Post co-molding", note: "Heating mesh integrated into PP component" },
      right: { img: InjectionThermal,   label: "Thermal imaging",      temp: "Max 48.2°C · Cen 40.5°C", note: "Even heat distribution across molded surface" },
    },
    single: {
      img: InjectionThermal,
      label: "Thermal image — post injection molding",
      value: "Max 48.2°C · Center 40.5°C",
    },
    gallery: [
      { img: InjectionWeaveZoom, caption: "Weave detail, close-up" },
    ],
    applications: [
      { img: DoorPanelsPhoto,    label: "01 — Door Panels" },
      { img: GloveboxPhoto,      label: "02 — Glovebox" },
      { img: Armrest,            label: "03 — Armrest & Central Panel" },
      { img: SeatsOverviewPhoto, label: "04 — Back of the Seat" },
    ],
    footNote: "Lower cost of integration & higher recyclability rate (mono-material).",
  },
  {
    id: "sensing", num: "04", icon: FaHandPointer, tag: "Sensing & Touch",
    title: "Presence Detection & Touch Control",
    tagline: "Heating and sensing merged into a single layer — less wiring, less weight, less complexity.",
    headline: "One fabric layer replaces a separate heater + sensor stack.",
    kpis: [
      { val: 1,   suffix: "layer",  label: "Instead of 2 stacked layers", prefix: " " },
      { val: 50,  suffix: "%",      label: "Less wiring & weight", prefix: "−" },
      { val: 3,   suffix: "zones",  label: "Adaptive sensing zones", prefix: " " },
    ],
    bullets: [
      { icon: FaHandPointer, title: "2-in-1: sensing + heating",   desc: "A single fabric layer detects presence, posture, or touch — and heats. No extra sensor layer needed." },
      { icon: FaLayerGroup,  title: "One layer, reduced complexity", desc: "Fewer wires, less weight, fewer failure points than stacked sensor + heater mats." },
      { icon: FaBolt,        title: "Zonal, on-demand comfort",     desc: "Activates heat only where and when detected — cutting HVAC dependency significantly." },
    ],
    thermalCompare: {
      left:  { img: SensingLaptopPhoto, label: "Heating + Sensing fabric", temp: "2-in-1 layer",      note: "Heating fabric with integrated sensing feature" },
      right: { img: SensingFabricPhoto, label: "Leather A-layer applied",  temp: "Under trim",       note: "Fabric covered with leather — invisible technology" },
    },
    gallery: [
      { img: TouchDemo, caption: "Touch-controlled heated surface" },
    ],
    applications: [
      { icon: FaChair,       label: "Seats",                   desc: "Heating + presence detection for cushion and backrest — zonal comfort, occupancy-based activation, posture/contact sensing, lower HVAC dependency." },
      { icon: FaClone,       label: "Door Panels",             desc: "Warm-touch surfaces with integrated touch sensing under leather, textile, or soft-touch trims." },
      { icon: FaHandPointer, label: "Armrest & Central Panel", desc: "Comfort heating + hand detection + hidden controls across armrests, console, cupholders, storage lids." },
    ],
    footNote: "Using one layer instead of two ensures reduced complexity — less wires and weight.",
  },
];

/* ─── BEFORE / AFTER THERMAL IMAGE SLIDER ─────────────────────────────────── */
const BeforeAfterSlider = ({ leftImg, leftLabel, leftTemp, rightImg, rightLabel, rightTemp }) => {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);
  const updateFromClientX = (clientX) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.min(96, Math.max(4, ((clientX - rect.left) / rect.width) * 100)));
  };
  useEffect(() => {
    const move = (e) => { if (!dragging.current) return; updateFromClientX(e.touches ? e.touches[0].clientX : e.clientX); };
    const stop = () => { dragging.current = false; };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", move, { passive: true });
    window.addEventListener("touchend", stop);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseup", stop); window.removeEventListener("touchmove", move); window.removeEventListener("touchend", stop); };
  }, []);
  return (
    <div ref={ref}
      className="relative w-full rounded-2xl overflow-hidden select-none border border-white/10 shadow-2xl cursor-ew-resize bg-black"
      style={{ height: 320 }}
      onMouseDown={(e) => { dragging.current = true; updateFromClientX(e.clientX); }}
      onTouchStart={(e) => { dragging.current = true; updateFromClientX(e.touches[0].clientX); }}
      onMouseMove={(e) => { if (dragging.current) updateFromClientX(e.clientX); }}
    >
      <img src={rightImg} alt={rightLabel} draggable={false}
        className="absolute inset-0 w-full h-full object-contain bg-black"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }} />
      <img src={leftImg} alt={leftLabel} draggable={false}
        className="absolute inset-0 w-full h-full object-contain bg-black"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }} />
      {/* divider */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white/80 pointer-events-none" style={{ left: `${pos}%` }} />
      <div className="absolute top-1/2 w-10 h-10 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-xl flex items-center justify-center pointer-events-none z-10" style={{ left: `${pos}%` }}>
        <FaArrowLeft size={9} className="text-[#14141B]" />
        <FaArrowRight size={9} className="text-[#14141B] -ml-0.5" />
      </div>
      <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white/80 border border-white/10 pointer-events-none">{leftLabel}</span>
      <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm border pointer-events-none" style={{ background: `${GREEN}cc`, color: "#14141B", borderColor: GREEN }}>{rightLabel}</span>
      <span className="absolute bottom-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-black/70 backdrop-blur-sm text-white/70 pointer-events-none">{leftTemp}</span>
      <span className="absolute bottom-4 right-4 text-xs font-black px-3 py-1 rounded-full pointer-events-none" style={{ background: `${GREEN}cc`, color: "#14141B" }}>{rightTemp}</span>
    </div>
  );
};

/* ─── STATIC THERMAL COMPARE (2 photos side by side, hover) ──────────────── */
const ThermalCompare = ({ left, right, dark }) => {
  const [hov, setHov] = useState(null);
  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        {[{ side: "left", data: left, col: "#8a8a8a" }, { side: "right", data: right, col: GREEN }].map(({ side, data, col }) => (
          <div key={side}
            onMouseEnter={() => setHov(side)} onMouseLeave={() => setHov(null)}
            className="relative rounded-2xl overflow-hidden border-2 cursor-default transition-all duration-350"
            style={{ height: 260, borderColor: hov === side ? col : `${col}25` }}
          >
            <img src={data.img} alt={data.label}
              className="absolute inset-0 w-full h-full transition-transform duration-500"
              style={{ objectFit: "contain", background: "#111118", transform: hov === side ? "scale(1.03)" : "scale(1)" }} />
            <div className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
              style={{ background: "rgba(0,0,0,0.35)", opacity: hov && hov !== side ? 0.6 : 0 }} />
            {/* top badge */}
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full backdrop-blur-sm border pointer-events-none"
              style={{ background: side === "right" ? `${GREEN}22` : "rgba(0,0,0,0.65)", borderColor: side === "right" ? `${GREEN}60` : "rgba(255,255,255,0.15)" }}>
              <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: side === "right" ? GREEN : "rgba(255,255,255,0.7)" }}>{data.label}</span>
            </div>
            {/* bottom temp */}
            <span className="absolute bottom-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full pointer-events-none"
              style={{ background: side === "right" ? `${GREEN}22` : "rgba(0,0,0,0.65)", color: side === "right" ? GREEN : "rgba(255,255,255,0.7)" }}>{data.temp}</span>
            {/* hover note */}
            <div className="absolute inset-x-3 bottom-10 transition-all duration-300 pointer-events-none"
              style={{ opacity: hov === side ? 1 : 0, transform: hov === side ? "none" : "translateY(6px)" }}>
              <p className="text-[10px] font-bold px-3 py-2 rounded-xl backdrop-blur-sm text-center"
                style={{ background: side === "right" ? `${GREEN}20` : "rgba(0,0,0,0.7)", color: side === "right" ? GREEN : "rgba(255,255,255,0.8)" }}>{data.note}</p>
            </div>
            {/* top glow on active side */}
            <div className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300 pointer-events-none"
              style={{ background: `linear-gradient(to right, ${col}, transparent)`, opacity: hov === side ? 1 : 0 }} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── VIDEO ANIMATION COMPARE (only case 01) ─────────────────────────────── */
const VideoCompare = ({ left, right }) => {
  const [hov, setHov] = useState(null);
  const leftVideoRef = useRef(null);
  // Loop only the first 5 seconds of copper wire video
  useEffect(() => {
    const video = leftVideoRef.current;
    if (!video) return;
    const handleTimeUpdate = () => {
      if (video.currentTime >= 5) {
        video.currentTime = 0;
        video.play().catch(() => {});
      }
    };
    video.addEventListener('timeupdate', handleTimeUpdate);
    return () => video.removeEventListener('timeupdate', handleTimeUpdate);
  }, []);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-black uppercase tracking-widest text-white/35">Legacy Copper Wire</span>
        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>Voltcore</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {/* LEFT copper — SeatsVideo */}
        <div onMouseEnter={() => setHov("left")} onMouseLeave={() => setHov(null)}
          className="relative rounded-2xl overflow-hidden border-2 cursor-default transition-all duration-350"
          style={{ height: 200, borderColor: hov === "left" ? "#8a8a8a" : "rgba(138,138,138,0.2)" }}
        >
          <video ref={leftVideoRef} src={left.src} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-400"
            style={{ background: "rgba(0,0,0,0.5)", opacity: hov === "right" ? 0.75 : 0.15 }} />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/65 border border-white/15 pointer-events-none">
            <span className="text-[9px] font-black uppercase tracking-widest text-white/70">{left.label}</span>
          </div>
          <span className="absolute bottom-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full bg-black/65 pointer-events-none" style={{ color: "#ff6b6b" }}>{left.temp}</span>
          <div className="absolute inset-x-3 bottom-10 transition-all duration-300 pointer-events-none"
            style={{ opacity: hov === "left" ? 1 : 0, transform: hov === "left" ? "none" : "translateY(5px)" }}>
            <p className="text-[10px] font-bold text-white/80 text-center px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-sm">{left.note}</p>
          </div>
        </div>
        {/* RIGHT voltcore — HeroVideo */}
        <div onMouseEnter={() => setHov("right")} onMouseLeave={() => setHov(null)}
          className="relative rounded-2xl overflow-hidden border-2 cursor-default transition-all duration-350"
          style={{ height: 200, borderColor: hov === "right" ? GREEN : `${GREEN}30` }}
        >
          <video src={right.src} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline />
          <div className="absolute inset-0 pointer-events-none transition-opacity duration-400"
            style={{ background: "rgba(0,0,0,0.4)", opacity: hov === "left" ? 0.7 : 0.08 }} />
          <div className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400"
            style={{ boxShadow: `inset 0 0 40px ${GREEN}25`, opacity: hov === "right" ? 1 : 0 }} />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full border pointer-events-none"
            style={{ background: `${GREEN}22`, borderColor: `${GREEN}55` }}>
            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: GREEN }}>{right.label}</span>
          </div>
          <span className="absolute bottom-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full pointer-events-none"
            style={{ background: `${GREEN}20`, color: GREEN }}>{right.temp}</span>
          <div className="absolute inset-x-3 bottom-10 transition-all duration-300 pointer-events-none"
            style={{ opacity: hov === "right" ? 1 : 0, transform: hov === "right" ? "none" : "translateY(5px)" }}>
            <p className="text-[10px] font-black text-center px-3 py-1.5 rounded-xl backdrop-blur-sm"
              style={{ background: `${GREEN}20`, color: GREEN }}>{right.note}</p>
          </div>
        </div>
      </div>
      {/* KPI pills */}
      <div className="grid grid-cols-3 gap-2 mt-1">
        {[{ val: "−30%", label: "less power" }, { val: "−40%", label: "faster heat" }, { val: "ΔT 4°C", label: "vs >10°C" }].map((kpi) => {
          const [h, setH] = useState(false);
          return (
            <div key={kpi.label} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
              className="rounded-xl p-3 text-center border cursor-default transition-all duration-250"
              style={{ borderColor: h ? `${GREEN}70` : `${GREEN}20`, background: h ? `${GREEN}15` : `${GREEN}06`, transform: h ? "translateY(-2px)" : "none" }}
            >
              <div className="text-base font-black" style={{ color: GREEN }}>{kpi.val}</div>
              <div className="text-[9px] uppercase tracking-wider text-white/40">{kpi.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── ANIMATED BAR ────────────────────────────────────────────────────────── */
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
                }}
              >
                {b.highlight && shown && (
                  <div className="absolute inset-0 animate-shimmer" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)", animation: "shimmer 1.8s ease infinite" }} />
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

/* ─── INTERACTIVE LINE CHART ─────────────────────────────────────────────── */
const LineChart = ({ data, xKey, xLabel, yLabel, series, dark, yDomain, yTicks, xTicks }) => {
  const [hoverIdx, setHoverIdx] = useState(null);
  const [drawn, setDrawn] = useState(false);
  const [axesShown, setAxesShown] = useState(false);
  const [ref, shown] = useInView(0.3);
  const svgRef = useRef(null);
  useEffect(() => {
    if (!shown) return;
    const t1 = setTimeout(() => setAxesShown(true), 60);
    const t2 = setTimeout(() => setDrawn(true), 500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [shown]);
  const W = 540, H = 220;
  const PAD = { top: 16, right: 16, bottom: 28, left: 34 };
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;
  const xVals = data.map((d) => d[xKey]);
  const xMin = xVals[0], xMax = xVals[xVals.length - 1];
  const allY = data.flatMap((d) => series.map((s) => d[s.key]));
  // Use a fixed axis (yDomain/yTicks) when the caller supplies one — needed to
  // match a source chart exactly — otherwise fall back to auto quarter-ticks.
  const [yAxisMin, yAxisMax] = yDomain || [0, Math.max(...allY) * 1.12];
  const ticks = yTicks || [0, 0.25, 0.5, 0.75, 1].map((pct) => Math.round(pct * yAxisMax));
  const xScale = (v) => PAD.left + ((v - xMin) / (xMax - xMin)) * plotW;
  const yScale = (v) => PAD.top + plotH - ((v - yAxisMin) / (yAxisMax - yAxisMin)) * plotH;
  const linePath = (key) => data.map((d, i) => `${i === 0 ? "M" : "L"} ${xScale(d[xKey]).toFixed(1)} ${yScale(d[key]).toFixed(1)}`).join("  ");
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
        {ticks.map((v, i) => {
          const y = yScale(v);
          return (
            <g key={v} style={{
              opacity: axesShown ? 1 : 0,
              transform: axesShown ? "translateX(0)" : "translateX(-6px)",
              transition: `opacity 0.4s ease ${i * 40}ms, transform 0.4s ease ${i * 40}ms`,
            }}>
              <line x1={PAD.left} x2={W - PAD.right} y1={y} y2={y} stroke={gridColor} strokeWidth="1" />
              <text x={PAD.left - 6} y={y + 4} textAnchor="end" fontSize="9" fill={textColor}>{v}</text>
            </g>
          );
        })}
        {data.map((d, i) => {
          const showLabel = xTicks ? xTicks.includes(d[xKey]) : (i === 0 || i === data.length - 1 || d[xKey] % 40 === 0);
          if (showLabel) {
            return (
              <text key={d[xKey]} x={xScale(d[xKey])} y={H - PAD.bottom + 16} textAnchor="middle" fontSize="9" fill={textColor}
                style={{ opacity: axesShown ? 1 : 0, transition: `opacity 0.4s ease ${i * 30}ms` }}>{d[xKey]}</text>
            );
          }
          return null;
        })}
        <text x={W - PAD.right} y={H - 2} textAnchor="end" fontSize="9" fill={textColor} style={{ opacity: axesShown ? 1 : 0, transition: "opacity 0.4s ease" }}>{xLabel}</text>
        {series.map((s) => (
          <g key={s.key}>
            {/* glow duplicate for highlight */}
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
      {/* tooltip row */}
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

/* ── STOPWATCH — realistic analog face, synced to real <video> playback time ─
   A proper stopwatch dial: bezel, 12 tick marks, a sweeping hand that
   completes one full turn over `total` seconds, and a digital readout under
   the dial. The "target" clock (Voltcore) freezes the instant the video
   crosses its target-reached second; the "baseline" clock keeps sweeping for
   the full clip since it never gets there. ──────────────────────────────── */
const Stopwatch = ({ elapsed, total, color, label, sublabel, done, dark }) => {
  const pct = total ? Math.min(1, elapsed / total) : 0;
  const angle = pct * 360;
  const mm = Math.floor(elapsed / 60);
  const ss = Math.floor(elapsed % 60);
  const faceBg = dark ? "#0f0f14" : "#fbfbf9";
  const bezel = dark ? "#3a3a44" : "#d8d6cd";
  const tick = dark ? "rgba(255,255,255,0.28)" : "rgba(20,20,27,0.28)";

  return (
    <div className="flex flex-row md:flex-col items-center gap-4 md:gap-3 w-full md:w-32 shrink-0">
      <div className="relative w-20 h-20 md:w-24 md:h-24 shrink-0">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* outer bezel */}
          <circle cx="50" cy="50" r="47" fill={faceBg} stroke={bezel} strokeWidth="3" />
          <circle cx="50" cy="50" r="47" fill="none" stroke={done ? color : "transparent"} strokeWidth="3" opacity="0.6" />
          {/* progress arc, subtle, along the inner edge */}
          <circle cx="50" cy="50" r="41" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 41} strokeDashoffset={2 * Math.PI * 41 * (1 - pct)}
            transform="rotate(-90 50 50)" opacity="0.35"
            style={{ transition: "stroke-dashoffset 0.15s linear" }} />
          {/* 12 tick marks like a real stopwatch face */}
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 * Math.PI) / 180;
            const isMajor = i % 3 === 0;
            const r1 = isMajor ? 34 : 37, r2 = 41;
            return (
              <line key={i}
                x1={50 + r1 * Math.sin(a)} y1={50 - r1 * Math.cos(a)}
                x2={50 + r2 * Math.sin(a)} y2={50 - r2 * Math.cos(a)}
                stroke={tick} strokeWidth={isMajor ? 1.6 : 1} />
            );
          })}
          {/* sweeping hand */}
          <g style={{ transition: "transform 0.15s linear" }} transform={`rotate(${angle} 50 50)`}>
            <line x1="50" y1="50" x2="50" y2="18" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
            <line x1="50" y1="50" x2="50" y2="60" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          </g>
          <circle cx="50" cy="50" r="3.2" fill={color} stroke={dark ? "#0f0f14" : "#fbfbf9"} strokeWidth="1" />
        </svg>
        {done && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-md" style={{ background: color }}>✓</span>
        )}
      </div>
      <span className="text-xs font-black tabular-nums -mt-1 md:-mt-1" style={{ color: dark ? "white" : "#14141B" }}>
        {mm}:{String(ss).padStart(2, "0")}
      </span>
      <div className="text-left md:text-center">
        <div className="text-[10px] font-black uppercase tracking-widest" style={{ color }}>{label}</div>
        <div className={`text-[10px] md:text-[9px] mt-0.5 leading-snug ${dark ? "text-zinc-500" : "text-zinc-500"}`}>{sublabel}</div>
      </div>
    </div>
  );
};

/* ── VIDEO + DUAL STOPWATCH COMPARISON ──────────────────────────────────── */
const VideoStopwatchCompare = ({ src, targetSec = 39, totalSec = 180, dark }) => {
  const videoRef = useRef(null);
  const [t, setT] = useState(0);
  const [duration, setDuration] = useState(totalSec);
  const reachedTarget = t >= targetSec;

  return (
    <div className={`rounded-2xl p-5 md:p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <h4 className={`text-sm md:text-base font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
          Copper Wire System <span className={dark ? "text-zinc-600" : "text-zinc-400"}>vs.</span> <span style={{ color: GREEN }}>Voltcore</span>
        </h4>
        <span className={`text-[10px] font-bold uppercase tracking-widest ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
          Live thermal test — glovebox heating
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5 md:gap-6">
        <Stopwatch
          elapsed={t} total={duration}
          color={dark ? "#9a9a9a" : "#8a8a8a"}
          label="Copper Wire System"
          sublabel={reachedTarget ? "Never reaches target ΔT" : "Heating…"}
          done={false}
          dark={dark}
        />

        <div className="relative w-full flex-1 rounded-xl overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={src}
            className="w-full h-[280px] md:h-[320px] object-contain bg-black"
            controls
            autoPlay
            muted
            loop
            playsInline
            onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
            onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || totalSec)}
          />
          <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white/80">
            Copper Wire System
          </span>
          <span className="absolute top-3 right-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full backdrop-blur-sm text-[#14141B]" style={{ background: `${GREEN}E6` }}>
            Voltcore
          </span>
        </div>

        <Stopwatch
          elapsed={Math.min(t, targetSec)} total={targetSec}
          color={GREEN}
          label="Voltcore"
          sublabel={reachedTarget ? `Target ΔT reached — ${targetSec}s` : "Heating…"}
          done={reachedTarget}
          dark={dark}
        />
      </div>

      <p className={`text-[11px] mt-4 leading-relaxed ${dark ? "text-zinc-500" : "text-zinc-500"}`}>
        Both clocks track the video in real time. Voltcore's clock stops the moment the glovebox surface reaches target ΔT ({targetSec}s in) — the Copper Wire System never gets there across the full {Math.round(duration)}s clip.
      </p>
    </div>
  );
};

/* ── STEP HEADER — labels a proof block (video/chart/animation) with the
   bullet text it demonstrates, mirroring the numbered layout on the source
   slide so the section reads clearly without prior context. ─────────────── */
const StepHeader = ({ num, b, dark }) => {
  const Icon = b.icon;
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black shrink-0" style={{ background: `${GREEN}20`, color: GREEN }}>{num}</span>
      {Icon && <Icon size={13} style={{ color: GREEN }} className="shrink-0" />}
      <h5 className={`text-sm font-bold ${dark ? "text-white" : "text-[#14141B]"}`}>{b.title}</h5>
    </div>
  );
};

/* ── BULLET CARD ────────────────────────────────────────────────────────── */
const BulletCard = ({ b, dark, delay = 0 }) => {
  const [hov, setHov] = useState(false);
  const Icon = b.icon;
  return (
    <Reveal delay={delay}>
      <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        className="h-full rounded-2xl p-6 border cursor-default transition-all duration-300"
        style={{
          background: hov ? (dark ? "#14141B" : "#eceae5") : (dark ? "#1C1C24" : "#fff"),
          borderColor: hov ? GREEN : (dark ? "#3f3f46" : "#e4e4e7"),
          transform: hov ? "translateY(-5px)" : "none",
          boxShadow: hov ? `0 16px 40px rgba(148,195,86,0.14)` : "none",
        }}
      >
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

/* ─── KPI ROW ────────────────────────────────────────────────────────────── */
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
              background: hov ? `${GREEN}12` : `${GREEN}06`,
              transform: hov ? "translateY(-3px) scale(1.02)" : "none",
            }}
          >
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

/* ─── GALLERY — handles single item with centered design ─────────────────── */
const Gallery = ({ items, dark, cols = 2 }) => {
  const isSingle = items.length === 1;
  return (
    <Reveal delay={120}>
      {isSingle ? (
        /* Single item — centered, elegant card */
        <div className="flex justify-center">
          <div className="relative rounded-2xl overflow-hidden border cursor-default transition-all duration-350 group"
            style={{
              width: "100%",
              maxWidth: 640,
              height: 380,
              borderColor: "rgba(255,255,255,0.10)",
            }}
          >
            <img src={items[0].img} alt={items[0].caption}
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
              style={{ objectFit: "cover", background: "#111118" }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
            <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `linear-gradient(to right, ${GREEN}, ${NEON}, transparent)` }} />
            <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-sm border mb-3"
                style={{ background: `${GREEN}18`, borderColor: `${GREEN}40` }}>
                <span style={{ color: GREEN, fontSize: 10 }}>✦</span>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: GREEN }}>Detail View</span>
              </div>
              <p className="text-sm font-bold text-white leading-snug">{items[0].caption}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`grid gap-4 ${cols === 4 ? "grid-cols-2 md:grid-cols-4" : cols === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-2"}`}>
          {items.map((g) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={g.caption || g.label}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                className="relative rounded-2xl overflow-hidden border cursor-default transition-all duration-350"
                style={{
                  height: 200,
                  borderColor: hov ? `${GREEN}55` : "rgba(255,255,255,0.10)",
                  transform: hov ? "translateY(-4px) scale(1.01)" : "none",
                  boxShadow: hov ? `0 16px 40px rgba(0,0,0,0.4)` : "none",
                }}
              >
                <img src={g.img} alt={g.caption || g.label}
                  className="absolute inset-0 w-full h-full transition-transform duration-500"
                  style={{ objectFit: "contain", background: "#111118", transform: hov ? "scale(1.05)" : "scale(1)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none transition-opacity duration-300"
                  style={{ opacity: hov ? 1 : 0.4 }} />
                <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, ${GREEN}, transparent)`, opacity: hov ? 1 : 0 }} />
                <span className="absolute bottom-3 left-3 right-3 text-[11px] font-bold text-white leading-snug pointer-events-none transition-all duration-300"
                  style={{ opacity: hov ? 1 : 0, color: hov ? GREEN : "white", transform: hov ? "none" : "translateY(5px)" }}>
                  {g.caption || g.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </Reveal>
  );
};

/* ─── APP CARDS (icon-based) ─────────────────────────────────────────────── */
const AppCards = ({ items, dark }) => (
  <Reveal delay={140}>
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4`}>
      {items.map((a) => {
        const [hov, setHov] = useState(false);
        const Icon = a.icon;
        return (
          <div key={a.label} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            className="rounded-2xl p-6 border cursor-default transition-all duration-300"
            style={{
              background: hov ? (dark ? "#14141B" : "#eceae5") : (dark ? "#1C1C24" : "#fff"),
              borderColor: hov ? GREEN : (dark ? "#3f3f46" : "#e4e4e7"),
              transform: hov ? "translateY(-4px)" : "none",
              boxShadow: hov ? `0 12px 32px rgba(148,195,86,0.12)` : "none",
            }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
              style={{ background: hov ? `${GREEN}22` : (dark ? "#14141B" : "#F0EFEA"), color: GREEN }}>
              <Icon size={15} />
            </div>
            <h5 className="text-xs font-black uppercase tracking-wide mb-2 transition-colors duration-300"
              style={{ color: hov ? GREEN : (dark ? "#fff" : "#14141B") }}>{a.label}</h5>
            <p className="text-[11px] leading-relaxed" style={{ color: dark ? "#71717a" : "#52525b" }}>{a.desc}</p>
            <div className="mt-4 h-[2px] rounded-full transition-all duration-400"
              style={{ width: hov ? "60%" : "12%", background: GREEN, opacity: hov ? 1 : 0.3 }} />
          </div>
        );
      })}
    </div>
  </Reveal>
);

/* ─── CASE STUDY PANEL — unified order across all 4 sections ─────────────── */
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
    {/* 4. Video animation compare (01 only) */}
    {cs.animCompare && (
      <Reveal delay={60}>
        <div className={`rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <VideoCompare left={cs.animCompare.left} right={cs.animCompare.right} />
        </div>
      </Reveal>
    )}
    {/* Challenge framing — marketing context so the 3 proof steps below make sense at a glance */}
    {cs.challenge && (
      <Reveal delay={90}>
        <div className={`rounded-2xl px-6 py-5 border-l-4 ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`} style={{ borderLeftColor: GREEN }}>
          <p className={`text-sm leading-relaxed ${dark ? "text-zinc-300" : "text-zinc-700"}`}>{cs.challenge}</p>
        </div>
      </Reveal>
    )}

    {/* Step 1 — thermal video + dual stopwatch (proves bullet #1: homogeneous / faster heat) */}
    {cs.video && (
      <Reveal delay={100}>
        {cs.bullets?.[0] && <StepHeader num="1" b={cs.bullets[0]} dark={dark} />}
        <VideoStopwatchCompare src={cs.video.src} targetSec={cs.video.targetSec} totalSec={cs.video.totalSec} dark={dark} />
      </Reveal>
    )}

    {/* Step 2 — chart + bars (proves bullet #2: energy efficiency / speed) */}
    {cs.chart && (
      <Reveal delay={120}>
        {cs.bullets?.[1] && <StepHeader num="2" b={cs.bullets[1]} dark={dark} />}
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

    {/* Step 3 — integration animation (proves bullet #3: faster / cheaper integration) */}
    {cs.integrationVideo && (
      <Reveal delay={140}>
        {cs.bullets?.[2] && <StepHeader num="3" b={cs.bullets[2]} dark={dark} />}
        <div className={`rounded-2xl overflow-hidden border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <video
            src={cs.integrationVideo.src}
            className="w-full h-[280px] md:h-[340px] object-contain bg-black"
            autoPlay muted loop playsInline
          />
          {cs.integrationVideo.caption && (
            <p className={`text-[11px] px-5 py-3 leading-relaxed ${dark ? "text-zinc-500" : "text-zinc-500"}`}>{cs.integrationVideo.caption}</p>
          )}
        </div>
      </Reveal>
    )}

    {/* 5b. Thermal photo compare (03 04) */}
    {cs.thermalCompare && (
      <Reveal delay={80}>
        <div className={`rounded-2xl p-6 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <ThermalCompare left={cs.thermalCompare.left} right={cs.thermalCompare.right} dark={dark} />
        </div>
      </Reveal>
    )}
    {/* 5a. Thermal drag slider (01) */}
    {cs.thermal && (
      <Reveal delay={80}>
        <div className={`rounded-2xl p-5 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
          <BeforeAfterSlider {...cs.thermal} />
        </div>
      </Reveal>
    )}
    {/* 7. Gallery — centered single item or grid */}
    {cs.gallery && <Gallery items={cs.gallery} dark={dark} />}
    {/* 8. Applications photo grid */}
    {cs.applications && cs.applications[0]?.img && (
      <Reveal delay={140}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cs.applications.map((a) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={a.label} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                className="relative rounded-2xl overflow-hidden border cursor-default transition-all duration-350"
                style={{
                  height: 300,
                  borderColor: hov ? `${GREEN}60` : "rgba(255,255,255,0.1)",
                  transform: hov ? "translateY(-5px) scale(1.02)" : "none",
                  boxShadow: hov ? `0 20px 50px rgba(0,0,0,0.45), 0 0 30px ${GREEN}18` : "none",
                }}
              >
                <img src={a.img} alt={a.label}
                  className="absolute inset-0 w-full h-full transition-transform duration-500"
                  style={{ objectFit: "cover", background: "#111118", transform: hov ? "scale(1.07)" : "scale(1)" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-[2px] pointer-events-none transition-opacity duration-300"
                  style={{ background: `linear-gradient(to right, ${GREEN}, ${NEON}, transparent)`, opacity: hov ? 1 : 0 }} />
                <span className="absolute bottom-4 left-4 right-4 text-sm font-black uppercase tracking-wide pointer-events-none transition-colors duration-300"
                  style={{ color: hov ? GREEN : "white" }}>{a.label}</span>
              </div>
            );
          })}
        </div>
      </Reveal>
    )}
    {/* 8. Applications icon cards (04) */}
    {cs.applications && cs.applications[0]?.icon && <AppCards items={cs.applications} dark={dark} />}
    {/* 9. Footnote */}
    {cs.footNote && (
      <Reveal delay={160}>
        <div className="rounded-2xl border px-6 py-4" style={{ borderColor: `${GREEN}35`, background: `${GREEN}06` }}>
          <p className={`text-xs md:text-sm font-bold ${dark ? "text-[#94C356]" : "text-[#5c7a3b]"}`}>✦ {cs.footNote}</p>
        </div>
      </Reveal>
    )}
  </div>
);

/* ─── MAIN PAGE ───────────────────────────────────────────────────────────── */
const AutomotiveCaseStudiesPage = () => {
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
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[72vh] flex items-end overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 55% at 65% 35%, rgba(148,195,86,0.09) 0%, transparent 65%), radial-gradient(ellipse 40% 30% at 15% 75%, rgba(217,254,66,0.05) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/20 to-transparent" />
        <Link to="/industries/automotive"
          className="absolute top-32 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-[#94C356] transition-colors">
          <FaArrowLeft size={10} /> Automotive
        </Link>
        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-16 pt-40">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: GREEN }}>4.3 — Automotive / Case Studies</span>
            <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
              Head-to-Head.  <br />  <span style={{ color: GREEN }}>By Product.</span>
            </h1>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-white/65 text-base md:text-lg max-w-2xl leading-relaxed">
              Four real product architectures benchmarked against legacy copper and serial solutions —
              thermal imaging, power draw, and time-to-comfort, side by side.
            </p>
          </Reveal>
        </div>
      </section>
      {/* ── STICKY TABS — hover to switch ────────────────────────────────── */}
      <div className={`sticky top-0 z-40 border-b backdrop-blur-md ${dark ? "bg-[#14141B]/92 border-zinc-800" : "bg-[#F0EFEA]/92 border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex gap-0 overflow-x-auto">
            {CASE_STUDIES.map((cs) => {
              const Icon = cs.icon;
              const isActive = activeId === cs.id;
              return (
                <button key={cs.id}
                  onMouseEnter={() => handleTabHover(cs.id)}
                  className="relative flex items-center gap-2 px-5 py-5 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all duration-250"
                  style={{ color: isActive ? (dark ? "#fff" : "#14141B") : (dark ? "#52525b" : "#a1a1aa") }}
                >
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
      {/* ── ACTIVE PANEL ──────────────────────────────────────────────────── */}
      <section ref={panelRef} id="case-study-panel"
        className={`py-20 px-6 ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
        <div className="container mx-auto max-w-6xl">
          <CaseStudyPanel key={active.id} cs={active} dark={dark} />
        </div>
      </section>
      <style>{`@keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }`}</style>
    </div>
  );
};

export default AutomotiveCaseStudiesPage;