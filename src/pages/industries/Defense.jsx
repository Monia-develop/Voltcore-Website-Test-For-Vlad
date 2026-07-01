import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaChevronRight, FaShieldAlt,
  FaBolt, FaWeightHanging, FaEye, FaWifi,
} from "react-icons/fa";

import DefImg1 from "../../assets/website/industries/Def1.png";
import DefImg2 from "../../assets/website/industries/Def2.png";
import Therm1  from "../../assets/website/industries/Therm1.png";
import Therm2  from "../../assets/website/industries/Therm2.png";

/* ─── THEME AUTO-DETECT ─────────────────────────────────────────────────── */
const useSystemDark = () => {
  const get = () =>
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const [dark, setDark] = useState(get);
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(get()));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
};

/* ─── INTERSECTION OBSERVER HOOK ────────────────────────────────────────── */
const useInView = (threshold = 0.15) => {
  const ref = useRef();
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold, rootMargin: "0px 0px -6% 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
};

/* ─── REVEAL ─────────────────────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 26, className = "", as: Tag = "div" }) => {
  const [ref, vis] = useInView(0.12);
  return (
    <Tag ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .65s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform .65s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
    }}>{children}</Tag>
  );
};

/* ─── ANIMATED BAR ───────────────────────────────────────────────────────── */
const Bar = ({ pct, color, delay = 0 }) => {
  const [ref, vis] = useInView(0.2);
  const [w, setW] = useState(0);
  useEffect(() => { if (vis) setTimeout(() => setW(pct), delay); }, [vis, pct, delay]);
  return (
    <div ref={ref} className="w-full h-2 rounded-full overflow-hidden bg-white/10">
      <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${w}%`, background: color }} />
    </div>
  );
};

/* ─── BEFORE/AFTER SLIDER ────────────────────────────────────────────────── */
const BeforeAfter = ({ before, after, label }) => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef();

  const move = (e) => {
    if (!dragging && e.type !== "mousemove") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    setPos(Math.min(100, Math.max(0, (x / rect.width) * 100)));
  };

  return (
    <div
      ref={ref}
      className="relative w-full rounded-3xl overflow-hidden select-none cursor-ew-resize shadow-2xl"
      style={{ aspectRatio: "1/1" }}
      onMouseDown={() => setDragging(true)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onMouseMove={move}
      onTouchMove={move}
    >
      {/* After (thermal) — full width underneath */}
      <img src={after} alt="thermal" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      {/* Before (visible) — clipped to left of divider */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="visible" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>
      {/* Divider line */}
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
        style={{ left: `${pos}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 7H10M4 7L2 5M4 7L2 9M10 7L12 5M10 7L12 9" stroke="#14141B" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
      </div>
      {/* Labels */}
      <div className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-widest text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-md">Visible</div>
      <div className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-widest text-white bg-[#F07E26]/80 backdrop-blur-sm px-2.5 py-1 rounded-md">IR / Thermal</div>
      {label && <div className="absolute bottom-4 left-4 right-4 text-[9px] font-mono uppercase tracking-wider text-white/70 text-center">{label}</div>}
    </div>
  );
};

/* ─── HOTSPOT IMAGE ──────────────────────────────────────────────────────── */
const HotspotMap = ({ src, alt, hotspots }) => {
  const [active, setActive] = useState(null);
  return (
    <div className="relative w-full rounded-3xl overflow-hidden select-none shadow-2xl">
      <img src={src} alt={alt} className="w-full h-auto block" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none" />
      {hotspots.map((h, i) => {
        const isActive = active === h.id;
        const flip = h.x > 55, dropUp = h.y > 55;
        return (
          <div key={h.id} className="absolute z-20" style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%,-50%)" }}>
            <button
              type="button"
              onClick={() => setActive(isActive ? null : h.id)}
              onMouseEnter={() => setActive(h.id)}
              className="relative flex items-center justify-center w-9 h-9 focus:outline-none"
            >
              {!isActive && <span className="absolute inset-0 rounded-full animate-ping opacity-60" style={{ background: "#F07E26" }} />}
              <span className="relative inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-black backdrop-blur-sm border-2 transition-all duration-300"
                style={{
                  background: isActive ? "#F07E26" : "rgba(0,0,0,0.75)",
                  borderColor: isActive ? "#F07E26" : "rgba(255,255,255,0.7)",
                  color: "#fff",
                  boxShadow: isActive ? "0 0 18px rgba(240,126,38,0.6)" : "none",
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
                onMouseLeave={() => setActive(null)}>
                <div className="w-64 rounded-2xl p-4 border"
                  style={{ background: "rgba(11,12,16,0.97)", borderColor: "rgba(240,126,38,0.5)", boxShadow: "0 0 30px rgba(240,126,38,0.15)" }}>
                  <span className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: "#F07E26" }}>{String(i + 1).padStart(2, "0")} //</span>
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

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const STATS = [
  { v: "TRL 5–7", l: "Technology Readiness" },
  { v: "−10→−30dB", l: "Radar RCS Reduction" },
  { v: "3–4°C", l: "Thermal Uniformity ΔT" },
  { v: "< 90 g/m²", l: "Mesh Weight" },
];

const CAPABILITIES = [
  {
    num: "01",
    title: "Soldier Thermal Comfort",
    sub: "Active heating — TRL 6–7",
    icon: FaShieldAlt,
    color: "#94C356",
    body: "Localized active heating for core body comfort during cold-weather operations. Reduces cold stress and fatigue, sustains mobility and readiness. Integrated into body armor, base layers, and shelters. Compatible with 5–48V power supply.",
    specs: [
      { l: "Thermal efficiency", v: "85–95%", pct: 92 },
      { l: "Weight (fabric)", v: "120–250 g/m²", pct: 78 },
      { l: "Heating uniformity", v: "ΔT < 4°C", pct: 95 },
    ],
  },
  {
    num: "02",
    title: "Active IR Illusion",
    sub: "Signature management — TRL 5",
    icon: FaEye,
    color: "#F07E26",
    body: "Signature-engineered fabrics and meshes with the ability to mask, flatten, or modulate IR contrast on demand. Compatible with blankets, nets, shelters and vehicle covers. Fully operational prototype developed for a leading Israeli partner in IR camouflage — passed lab tests, field tests in preparation.",
    specs: [
      { l: "IR contrast control", v: "Active modulation", pct: 85 },
      { l: "Integration", v: "Blankets / nets / covers", pct: 90 },
      { l: "Heating speed", v: "40–70% vs copper", pct: 88 },
    ],
  },
  {
    num: "03",
    title: "Passive Radar Camouflage",
    sub: "EMF absorption — TRL 4",
    icon: FaWifi,
    color: "#83D0F5",
    body: "Passive radar-absorbing textile architectures with conductivity-controlled patterns and layer stacks. First non-optimized designs already deliver −10 to −20 dB return loss in the X- and Ku-bands, directly relevant for UAV detection. Lightweight, flexible alternative to metallic solutions — no power supply required.",
    specs: [
      { l: "RCS reduction", v: "−10 to −30 dB", pct: 80 },
      { l: "Frequency bands", v: "X-band & Ku-band", pct: 75 },
      { l: "Weight vs metallic", v: "< 90 g/m²", pct: 95 },
    ],
  },
];

const SOLDIER_HOTSPOTS = [
  { id: "chest", x: 48, y: 36, title: "Chest Heating Pads", desc: "Four zoned CNT heating panels integrated into the ballistic vest. Operates at 12–48V. Uniform surface temperature ΔT < 4°C with zero hot spots." },
  { id: "core", x: 48, y: 55, title: "Core Body Zone", desc: "Heating pads positioned over the torso's core thermal core — most effective location for fighting cold stress and maintaining combat readiness." },
];

const RADAR_SPECS = [
  { l: "Circuit resistance", d: "Controls primary absorption bandwidth" },
  { l: "Cell geometry", d: "Macrocell pattern tunes frequency response" },
  { l: "Layer surface Ω/m²", d: "Adjusts impedance matching to free space" },
  { l: "Layer stacks", d: "Broadband suppression via multi-layer design" },
];

/* ─── PAGE ───────────────────────────────────────────────────────────────── */
const Defense = () => {
  const dark = useSystemDark();
  const [activeTab, setActiveTab] = useState(0);

  const bg     = dark ? "bg-[#0E0E13]" : "bg-[#F2F0EA]";
  const altBg  = dark ? "bg-[#14141B]" : "bg-[#E8E6DF]";
  const card   = dark ? "bg-[#1A1A22] border-white/8" : "bg-white border-[#c8d8b8]";
  const h2c    = dark ? "text-white" : "text-[#14141B]";
  const muted  = dark ? "text-zinc-400" : "text-[#5C6654]";
  const border = dark ? "border-white/8" : "border-[#c8d8b8]";

  const cap = CAPABILITIES[activeTab];

  return (
    <div className={`min-h-screen font-sans transition-colors duration-500 overflow-x-hidden ${dark ? "bg-[#0E0E13] text-[#B8B7A4]" : "bg-[#F2F0EA] text-[#14141B]"}`}>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#0E0E13]">
        {/* split background: Def1 left + Def2 right */}
        <div className="absolute inset-0">
          <img src={DefImg2} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E13] via-[#0E0E13]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E13]/60 via-transparent to-[#0E0E13]/20" />
          {/* Subtle orange/warm glow from the soldier's heating pads */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/4 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle,#F07E26,transparent)" }} />
        </div>

        <Link to="/industries" className="absolute top-32 left-8 z-20 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/50 hover:text-[#94C356] transition-colors">
          <FaArrowLeft size={10} /> Industries
        </Link>

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl pb-20">
          <Reveal y={12}>
            <span className="text-[11px] font-mono uppercase tracking-[0.35em] text-[#F07E26] flex items-center gap-2 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F07E26]" /> Defense & Dual-Use // NDA Required
            </span>
          </Reveal>
          <Reveal delay={80} y={22}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.88] text-white mb-6 max-w-4xl">
              Advanced<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)" }}>Materials</span><br />
              <span className="text-[#F07E26]">for Survival.</span>
            </h1>
          </Reveal>
          <Reveal delay={160} y={20}>
            <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed mb-12">
              Voltcore's CNT-based conductive polymer platform enables tactical heating, active IR signature management, and passive radar camouflage — in a single lightweight, flexible textile architecture.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
            {STATS.map(({ v, l }, i) => (
              <Reveal key={l} delay={240 + i * 70} y={16} as="div">
                <div className="border-l-2 border-[#F07E26]/40 pl-4">
                  <div className="text-2xl md:text-3xl font-black text-white leading-none mb-1">{v}</div>
                  <div className="text-[10px] text-white/45 font-bold uppercase tracking-wider">{l}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── NDA NOTICE BANNER ─────────────────────────────────────────────── */}
      <div className="bg-[#F07E26]/10 border-y border-[#F07E26]/30 py-3 px-6">
        <div className="container mx-auto max-w-7xl flex items-center gap-3">
          <FaShieldAlt size={12} className="text-[#F07E26] shrink-0" />
          <p className="text-[11px] font-mono text-[#F07E26] tracking-wider">
            All detailed technical specifications, client identities, and field test results are shared under NDA only. Contact us to initiate a confidential engagement.
          </p>
        </div>
      </div>

      {/* ── THREE CAPABILITY TABS ─────────────────────────────────────────── */}
      <section className={`py-20 md:py-28 ${bg}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#94C356] block mb-3">// Material-Level Capabilities</span>
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight ${h2c}`}>
              IR. Radar. Heat.<br />
              <span className={`${dark ? "text-white/20" : "text-black/15"}`}>One textile platform.</span>
            </h2>
          </Reveal>

          {/* Tab selector */}
          <div className={`flex gap-0 border rounded-2xl overflow-hidden mb-10 w-fit ${border}`}>
            {CAPABILITIES.map((c, i) => (
              <button key={c.num} onClick={() => setActiveTab(i)}
                className="px-6 py-3 text-[11px] font-black uppercase tracking-widest transition-all duration-300"
                style={{
                  background: activeTab === i ? c.color : "transparent",
                  color: activeTab === i ? "#14141B" : (dark ? "#71717a" : "#5C6654"),
                }}>
                {c.num} {c.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <Reveal key={activeTab} y={20}>
              <div className={`p-8 rounded-3xl border ${card}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: cap.color + "22" }}>
                    <cap.icon size={14} style={{ color: cap.color }} />
                  </span>
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest" style={{ color: cap.color }}>{cap.sub}</div>
                    <h3 className={`text-lg font-black uppercase ${h2c}`}>{cap.title}</h3>
                  </div>
                </div>
                <p className={`text-sm leading-relaxed mb-8 ${muted}`}>{cap.body}</p>
                <div className="space-y-4">
                  {cap.specs.map(({ l, v, pct }, i) => (
                    <div key={l}>
                      <div className="flex justify-between text-xs font-bold mb-1.5">
                        <span className={h2c}>{l}</span>
                        <span style={{ color: cap.color }}>{v}</span>
                      </div>
                      <Bar pct={pct} color={cap.color} delay={i * 120} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120} y={24}>
              <div className={`p-8 rounded-3xl border space-y-4 ${card}`}>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#94C356] mb-2">// Technical Parameters</div>
                {[
                  { l: "Filament resistance", v: "10 kΩ – 2 MΩ/m" },
                  { l: "Power supply range", v: "5 – 220V" },
                  { l: "Max temperature", v: "Up to 100°C" },
                  { l: "Fabric weight", v: "120–250 g/m² (textile) / <90 g/m² (mesh)" },
                  { l: "Filament density", v: "30–60 g/km" },
                  { l: "Linear density", v: "400–600 den / 450–700 dtex" },
                  { l: "Matrix materials", v: "PP / PA / PET" },
                  { l: "Patents", v: "4 applied EU/WIPO" },
                ].map(({ l, v }) => (
                  <div key={l} className={`flex justify-between text-xs py-2.5 border-b ${border}`}>
                    <span className={muted}>{l}</span>
                    <span className={`font-bold ${h2c}`}>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SOLDIER IR — BEFORE/AFTER + HOTSPOT ──────────────────────────── */}
      <section className={`py-20 md:py-28 border-y ${altBg} ${border}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#F07E26] block mb-3">// Field Evidence</span>
            <h2 className={`text-3xl md:text-5xl font-black uppercase tracking-tight ${h2c}`}>Thermal Signature,<br />Visible & Controlled.</h2>
            <p className={`text-sm mt-4 max-w-xl ${muted}`}>
              Drag the divider to compare the visible and infrared views. The Voltcore heating panels deliver a surface temperature delta of only 3–4°C — eliminating hot spots while maximising core comfort.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <Reveal y={28}>
              <BeforeAfter
                before={DefImg2}
                after={DefImg1}
                label="Military vehicle — aerial view · Visible vs Thermal IR"
              />
            </Reveal>
            <Reveal delay={140} y={28}>
              <div className="space-y-6">
                <HotspotMap
                  src={DefImg2}
                  alt="Voltcore heated soldier system"
                  hotspots={SOLDIER_HOTSPOTS}
                />
                <div className={`p-5 rounded-2xl border text-xs ${card}`}>
                  <div className="font-mono text-[#F07E26] uppercase tracking-widest text-[9px] mb-3">// Thermal camera readings — actual lab data</div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: "Test A — Surface max", val: "40.1°C", sub: "Pad active at 12V" },
                      { label: "Test A — Ambient", val: "18.1°C", sub: "Air temp" },
                      { label: "Test B — Surface max", val: "34.2°C", sub: "Reduced power" },
                      { label: "Test B — Ambient", val: "18.8°C", sub: "Air temp" },
                    ].map(({ label, val, sub }) => (
                      <div key={label} className={`p-3 rounded-xl ${dark ? "bg-[#0E0E13]" : "bg-[#f0f4eb]"}`}>
                        <div className={`text-[9px] uppercase tracking-widest mb-1 ${muted}`}>{label}</div>
                        <div className="text-xl font-black text-[#F07E26]">{val}</div>
                        <div className={`text-[9px] ${muted}`}>{sub}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── THERMAL CAMERA GALLERY ────────────────────────────────────────── */}
      <section className={`py-20 ${bg}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="mb-12">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#94C356] block mb-3">// Lab Validation</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2c}`}>Thermal Imaging Data</h2>
            <p className={`text-sm mt-3 max-w-lg ${muted}`}>
              FLIR thermal camera captures of Voltcore heating pads under active power. ΔT uniformity confirmed across both test runs.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { img: Therm1, cap: "Test A — Voltcore pad at 12V", detail: "MAX: 40.1°C · MIN: 18.1°C · Uniformity ΔT = 4°C" },
              { img: Therm2, cap: "Test B — Voltcore pad reduced power", detail: "MAX: 34.2°C · MIN: 18.8°C · Uniformity ΔT = 3.8°C" },
            ].map(({ img, cap, detail }, i) => (
              <Reveal key={cap} delay={i * 120} y={26}>
                <div className={`rounded-3xl overflow-hidden border ${card}`}>
                  <img src={img} alt={cap} className="w-full h-auto block" />
                  <div className="p-5">
                    <div className={`text-xs font-bold ${h2c} mb-1`}>{cap}</div>
                    <div className="text-[10px] font-mono text-[#F07E26]">{detail}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RADAR SECTION ─────────────────────────────────────────────────── */}
      <section className={`py-20 md:py-28 border-y ${altBg} ${border}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <Reveal y={24}>
              <span className="text-xs font-black uppercase tracking-[0.25em] text-[#83D0F5] block mb-3">// Passive Radar Camouflage</span>
              <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-6 ${h2c}`}>RCS Reduction.<br />No Power Needed.</h2>
              <p className={`text-sm leading-relaxed mb-8 ${muted}`}>
                By applying different conductivity patterns and macrocell geometries, Voltcore's conductive filament creates woven absorber structures that significantly reduce reflected radar waves across broad frequency ranges. First non-optimized designs already deliver −10 to −20 dB return loss in X- and Ku-bands — relevant for UAV detection.
              </p>
              <div className="space-y-4">
                {[
                  { band: "X-Band (8–12 GHz)", reduction: "−10 to −20 dB", pct: 70, note: "Anti-drone, air surveillance" },
                  { band: "Ku-Band (12–18 GHz)", reduction: "−10 to −20 dB", pct: 65, note: "UAV, missile guidance" },
                  { band: "Theoretical (optimised)", reduction: "Up to −30 dB", pct: 90, note: "Advanced layer stacks" },
                ].map(({ band, reduction, pct, note }, i) => (
                  <div key={band}>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className={h2c}>{band}</span>
                      <span className="text-[#83D0F5]">{reduction}</span>
                    </div>
                    <Bar pct={pct} color="#83D0F5" delay={i * 150} />
                    <div className={`text-[9px] mt-0.5 ${muted}`}>{note}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={130} y={26}>
              <div className={`p-8 rounded-3xl border space-y-0 ${card}`}>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#83D0F5] mb-6">// Four Design Variables for RCS Control</div>
                {RADAR_SPECS.map(({ l, d }, i) => (
                  <div key={l} className={`flex items-start gap-4 py-5 border-b ${border} group`}>
                    <span className="text-3xl font-black shrink-0 leading-none" style={{ color: `rgba(131,208,245,${0.15 + i*0.06})` }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className={`text-xs font-black ${h2c} mb-0.5`}>{l}</div>
                      <div className={`text-[11px] ${muted}`}>{d}</div>
                    </div>
                  </div>
                ))}
                <div className={`pt-5 text-[10px] font-mono ${muted}`}>
                  * Metal plate baseline, vertical incidence. Performance can be further improved with multiperiodic structures and advanced 3D fabric designs.
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGY OVERVIEW ───────────────────────────────────────────── */}
      <section className={`py-20 ${bg}`}>
        <div className="container mx-auto px-6 md:px-12 max-w-7xl">
          <Reveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-[#94C356] block mb-3">// Core Materials Platform</span>
            <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2c}`}>One Filament. Three Applications.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { n:"01", title:"Conductive Filament", trl:"TRL 7", color:"#94C356",
                points:["10 kΩ – 2 MΩ/m linear range","30–60 g/km density","PP/PA/PET matrix","Up to 100°C working temperature","Same drawing speed as standard polymer yarns","4 patents applied EU/WIPO"] },
              { n:"02", title:"Heating Mesh / Textile", trl:"TRL 6–7", color:"#F07E26",
                points:["5–150 cm width, up to 30 m length","Open mesh for airflow or dense textile for wearables","5–220V power supply","Homogeneous heat ΔT < 4°C","Voltcore designs, outsourced production"] },
              { n:"03", title:"Integrated Heating Pads", trl:"TRL 5–6", color:"#83D0F5",
                points:["In-mold, lamination, or bonding integration","12–48V power supply","Curved or flat geometries","Retrofit or OEM-production compatible","Seamlessly integrated in covering layer fabric"] },
            ].map(({ n, title, trl, color, points }, i) => (
              <Reveal key={n} delay={i * 100} y={26}>
                <div className={`p-7 rounded-3xl border h-full flex flex-col ${card}`}>
                  <div className="flex items-baseline justify-between mb-5">
                    <span className="text-4xl font-black" style={{ color: color + "30" }}>{n}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full"
                      style={{ color, background: color + "18", border: `1px solid ${color}44` }}>{trl}</span>
                  </div>
                  <h4 className={`text-base font-black uppercase mb-5 ${h2c}`}>{title}</h4>
                  <ul className="space-y-2 flex-1">
                    {points.map(p => (
                      <li key={p} className={`text-xs flex items-start gap-2 ${muted}`}>
                        <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#0E0E13] border-t border-white/8">
        <div className="container mx-auto px-6 md:px-12 max-w-4xl text-center">
          <Reveal>
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#F07E26] mb-5">// Confidential Engagement</div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-5 leading-tight">
              Let's discuss your program.
            </h2>
            <p className="text-white/50 mb-10 max-w-md mx-auto text-sm leading-relaxed">
              Voltcore operates under strict confidentiality. All technical details, field test results, and client references are disclosed under NDA. Reach out to start a confidential conversation.
            </p>
            <Link to="/contact"
              className="group inline-flex items-center gap-2 text-[#14141B] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 hover:scale-105"
              style={{ background: "#F07E26", boxShadow: "0 0 40px rgba(240,126,38,0.3)" }}>
              Request NDA & Technical Brief
              <FaChevronRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        .animate-ping { animation: ping 1.2s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </div>
  );
};

export default Defense;
