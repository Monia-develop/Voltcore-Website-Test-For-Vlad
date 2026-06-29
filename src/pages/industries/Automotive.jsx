import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaArrowLeft,
  FaSnowflake, FaWeightHanging, FaThermometerHalf,
} from "react-icons/fa";
import AutomotiveCaseStudies from "../../Components/AutomotiveCaseStudy";
import AutomotivePOCTracker  from "../../Components/AutomotivePOCTracker";
import AutomotiveHero        from "../../assets/website/industries/automotive-hero.jpg";

/* ─── THEME ─────────────────────────────────────────────────────────────── */
// Light palette: craft (#B8B7A4) replaces most white surfaces
// Dark palette:  near-black #14141B + accents
const CRAFT   = "#B8B7A4";
const NEON    = "#D9FE42";
const GREEN   = "#94C356";
const ORANGE  = "#F07E26";
const BLACK   = "#14141B";
const CREAM   = "#F0EFEA";  // warmer than pure white
const CREAM2  = "#E8E7E0";  // slightly deeper for alternating sections

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "−30%",   label: "EV Battery Drain in Winter" },
  { value: "2–3mm",  label: "Install Profile vs 5–13mm" },
  { value: "ΔT 3°C", label: "Thermal Variance vs >10°C" },
  { value: "85–95%", label: "Thermal Efficiency" },
];

const PROBLEMS = [
  { icon: FaSnowflake,       sub: "Battery Bottleneck", title: "The Winter Range Drain",  desc: "Conventional HVAC heats the entire cabin air volume, draining up to 30% of an EV's winter driving range." },
  { icon: FaWeightHanging,   sub: "Packaging & Weight", title: "Legacy Structural Bulk",  desc: "Copper-wire heating snakes need a 5–13 mm install envelope, forcing bulky foam spacers beneath the surface." },
  { icon: FaThermometerHalf, sub: "The Comfort Gap",    title: "Poor Thermal Dynamics",   desc: "Copper networks run ΔT > 10°C — slow to heat, uneven, and full of hot spots next to cold zones." },
];

const HOTSPOTS = [
  { id: "seats",     x: 32, y: 60, num: "01", title: "Seat Heating & Presence Detection", desc: "Deployed within the seat upholstery matrix for simultaneous high-velocity heating and occupancy/posture sensing." },
  { id: "touch",     x: 60, y: 38, num: "02", title: "Heated Sensing / Touch Elements",   desc: "Sensing and touch controls incorporated directly into the heated surface — no separate sensor mat required." },
  { id: "surfaces",  x: 84, y: 42, num: "03", title: "Heated Surfaces",                   desc: "Armrests, door panels, gloveboxes and cupholders — laminated, over-molded, or compression-molded into the trim." },
  { id: "doorpanel", x:  9, y: 80, num: "04", title: "Heated Door Panel",                 desc: "Ultra-thin heating fabric beneath the door card A-surface as part of the Cabin Cocoon." },
];

/* ─── COMPONENTS ─────────────────────────────────────────────────────────── */

const HotspotMap = ({ src, dark }) => {
  const [active, setActive] = useState(null);
  const borderCol = dark ? "border-zinc-700" : "border-zinc-300";
  return (
    <div className={`relative w-full rounded-2xl overflow-hidden select-none border shadow-xl ${borderCol}`}>
      <img src={src} alt="Cabin Cocoon" className="w-full h-auto block" draggable={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#14141B]/50 via-transparent to-transparent pointer-events-none" />
      {HOTSPOTS.map((h) => {
        const isActive = active === h.id;
        const flipX = h.x > 60;
        const flipY = h.y > 60;
        return (
          <div key={h.id} className="absolute" style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%,-50%)" }}>
            {!isActive && <span className="absolute inset-0 rounded-full animate-ping bg-[#94C356] opacity-60 pointer-events-none" />}
            <button
              onClick={() => setActive(isActive ? null : h.id)}
              className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center text-[11px] font-black transition-all duration-200 ${
                isActive
                  ? "bg-[#94C356] border-[#94C356] text-[#14141B] scale-110 shadow-[0_0_15px_rgba(148,195,86,0.6)]"
                  : "bg-[#14141B]/90 border-white/80 text-white hover:border-[#94C356] hover:text-[#94C356]"
              }`}
            >{h.num}</button>
            {isActive && (
              <div
                className="absolute z-20 w-56 rounded-xl bg-[#14141B]/95 backdrop-blur-md border border-[#94C356]/30 shadow-2xl p-4"
                style={{
                  left:   flipX ? "auto" : "calc(100% + 12px)",
                  right:  flipX ? "calc(100% + 12px)" : "auto",
                  top:    flipY ? "auto" : "50%",
                  bottom: flipY ? "50%" : "auto",
                  transform: flipY ? "translateY(50%)" : "translateY(-50%)",
                }}
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-[#94C356] block mb-1">{h.num}</span>
                <h4 className="text-sm font-bold text-white mb-1 leading-snug">{h.title}</h4>
                <p className="text-xs text-[#B8B7A4]/80 leading-relaxed">{h.desc}</p>
                <button onClick={(e) => { e.stopPropagation(); setActive(null); }} className="absolute top-2 right-3 text-[#B8B7A4]/40 hover:text-white text-sm">×</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */

const Automotive = () => {
  // Dark mode: reads from <html class="dark"> (Tailwind convention)
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  // Keep in sync if parent toggles dark mode externally
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // Local toggle (bridges gap if no global toggle exists yet)
  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F0EFEA] text-[#14141B]"
    }`}>

      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#14141B]">
        {/*
          Opacity raised to 0.95 so the photo is clearly visible.
          The gradient below provides legibility for the text.
        */}
        <img
          src={AutomotiveHero}
          alt="Voltcore Cabin Cocoon"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.92 }}
        />
        {/* Gradient: only covers the bottom third, keeps top image clear */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/20 to-transparent" />

        {/* Back link */}
        <Link
          to="/industries"
          className="absolute top-32 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#94C356] transition-colors"
        >
          <FaArrowLeft size={10} /> Industries
        </Link>

        {/* Dark mode toggle */}
        <button
          onClick={toggleDark}
          className="absolute top-32 right-8 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all text-sm"
          title="Toggle dark mode"
        >
          {dark ? "☀" : "🌙"}
        </button>

        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-4">
            Mobility — Automotive
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
            The<br /><span className="text-[#94C356]">Cabin</span><br />Cocoon
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            Voltcore replaces heavy copper wiring with an ultra-thin polymer heating architecture — a true second-skin thermal solution for EV and premium ICE interiors.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10">
            {STATS.map((s) => (
              <div key={s.label} className="border-l-2 border-[#94C356]/40 pl-4">
                <div className="text-2xl md:text-4xl font-black text-white mb-1">{s.value}</div>
                <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. HOTSPOT ──────────────────────────────────────── */}
      <section className={`py-24 px-6 border-b ${
        dark
          ? "bg-[#1C1C24] border-zinc-800"
          : "bg-[#E8E7E0] border-zinc-300"
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">// Interactive Map</span>
              <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
                Every Surface. Heated.
              </h2>
            </div>
            <p className={`text-sm max-w-xs leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
              Click the numbered markers to explore each heated zone inside the Cabin Cocoon.
            </p>
          </div>
          <HotspotMap src={AutomotiveHero} dark={dark} />
        </div>
      </section>

      {/* ── 3. PROBLEMS ─────────────────────────────────────── */}
      <section className={`py-24 px-6 ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F07E26] block mb-3">4.1 // The Client Problem</span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              Three bottlenecks legacy tech can't resolve
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`group rounded-2xl p-8 border transition-all duration-300 ${
                    dark
                      ? "bg-[#1C1C24] border-zinc-700 hover:border-[#F07E26]/40 shadow-none hover:shadow-[0_0_30px_rgba(240,126,38,0.08)]"
                      : "bg-[#E8E7E0] border-zinc-300 hover:border-[#F07E26]/40 shadow-sm hover:shadow-md"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#F07E26] mb-6 ${dark ? "bg-[#14141B]" : "bg-[#D8D7CF]"}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{p.sub}</span>
                  <h3 className={`text-lg font-bold mb-3 ${dark ? "text-white" : "text-[#14141B]"}`}>{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. SOLUTION ─────────────────────────────────────── */}
      <section className={`py-24 px-6 border-y ${
        dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">4.2 // The Voltcore Solution</span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              Surface radiation beats air convection.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Legacy */}
            <div className={`rounded-2xl p-8 border ${
              dark ? "bg-[#14141B] border-zinc-700" : "bg-[#D8D7CF] border-zinc-300"
            }`}>
              <span className={`text-[10px] font-black uppercase tracking-widest block mb-6 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                — Legacy copper architecture
              </span>
              <div className="space-y-3">
                {["A-Surface", "Thick foam spacer (5–13mm)", "Copper wire snake", "Inner base structure"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0 border ${
                      dark ? "bg-[#1C1C24] border-zinc-600 text-zinc-400" : "bg-[#E8E7E0] border-zinc-300 text-zinc-500"
                    }`}>{i + 1}</div>
                    <span className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{s}</span>
                  </div>
                ))}
              </div>
              <div className={`mt-6 pt-6 border-t ${dark ? "border-zinc-700" : "border-zinc-300"}`}>
                <span className={`text-2xl font-black ${dark ? "text-zinc-500" : "text-zinc-400"}`}>5–13mm</span>
                <span className={`text-xs block mt-1 ${dark ? "text-zinc-600" : "text-zinc-500"}`}>Total install envelope</span>
              </div>
            </div>
            {/* Voltcore */}
            <div className="rounded-2xl p-8 border border-[#94C356]/30 bg-[#94C356]/5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#94C356] block mb-6">✦ Voltcore second-skin architecture</span>
              <div className="space-y-3">
                {["A-Surface", "Voltcore Mesh / Textile (2–3mm)", "Inner base structure"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-black text-white bg-[#94C356] flex-shrink-0">{i + 1}</div>
                    <span className={`text-sm font-bold ${dark ? "text-[#B8B7A4]" : "text-[#14141B]"}`}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#94C356]/20">
                <span className={`text-2xl font-black ${dark ? "text-white" : "text-[#14141B]"}`}>2–3mm</span>
                <span className={`text-xs block mt-1 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Ultra-thin second-skin profile</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CASE STUDIES ─────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#14141B] text-[#B8B7A4]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">4.3 // Case Studies</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">
              Head-to-head. <span className="text-white/20">By product.</span>
            </h2>
          </div>
          <AutomotiveCaseStudies />
        </div>
      </section>

      {/* ── 6. POC TRACKER ──────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${
        dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">4.4 // POCs & Traction</span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              Active across key automotive regions.
            </h2>
          </div>
          <AutomotivePOCTracker dark={dark} />
        </div>
      </section>

      {/* ── 7. CTA ──────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${
        dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-300"
      }`}>
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden bg-[#14141B] rounded-3xl p-12 md:p-20 text-center shadow-xl border border-zinc-800">
            {/* Neon glow accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1 bg-[#94C356] blur-sm opacity-60 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-4">// Request Automotive Evaluation Kit</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 max-w-2xl mx-auto">
              Ready to bring Voltcore into your platform?
            </h2>
            <p className="text-white/60 max-w-lg mx-auto mb-10 text-sm leading-relaxed">
              Sample fabrics, Technical Data Sheets, and dedicated hardware integration engineering support for qualified OEM and Tier-1 advanced development teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#94C356] text-[#14141B] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#D9FE42] transition-all duration-300"
              >
                Request Sample Fabrics &amp; TDS <FaArrowRight size={10} />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Automotive;
