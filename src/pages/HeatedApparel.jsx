import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaArrowLeft,
  FaBolt, FaThermometerHalf, FaClock,
  FaWeightHanging,
} from "react-icons/fa";

/* ─── IMPORTATION CORRECTE DES IMAGES COMME MODULES ──────────────────────── */
import IMAGE_40 from "../assets/website/industries/image40.png"; // Arrière-plan & Hotspots
import IMAGE_39 from "../assets/website/industries/image39.png"; // Breakdown des couches

/* ─── THEME ──────────────────────────────────────────────────────────────── */
const GREEN  = "#94C356";
const ORANGE = "#F07E26";
const BLACK  = "#14141B";

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "+10°C",    label: "Higher Temp vs Copper (same energy)" },
  { value: "~60 s",   label: "Faster Time-to-Comfort" },
  { value: "ΔT 6°C",  label: "Thermal Deviation (vs 16°C copper)" },
  { value: "+50 min",  label: "Extra Runtime vs Carbon Heater" },
];

const PROBLEMS = [
  {
    icon: FaClock,
    sub: "Endurance Gap",
    title: "Heat Doesn't Last Long Enough",
    desc: "Legacy copper and carbon heating pads draw excessive power, draining batteries in under 2 hours — forcing users to choose between warmth and weight.",
  },
  {
    icon: FaThermometerHalf,
    sub: "The Comfort Gap",
    title: "Hot Spots & Cold Zones",
    desc: "Copper wires create ΔT > 16°C across the garment. Testers consistently report uncomfortable hot spots next to cold zones — every wash makes it worse.",
  },
  {
    icon: FaWeightHanging,
    sub: "Ergonomic Penalty",
    title: "Stiff, Bulky & Uncomfortable",
    desc: "Copper traces are rigid and bulky, destroying the natural drape of performance fabrics. The feeling of wires against skin remains the top user complaint.",
  },
];

const HOTSPOTS = [
  {
    id: "chest",
    x: 28, y: 42,
    num: "01",
    title: "Chest Heating Matrices",
    desc: "CNT polymer filaments woven directly into the insulation layer. ΔT = 6°C across the full zone — no hot spots, no cold corners.",
  },
  {
    id: "back",
    x: 72, y: 38,
    num: "02",
    title: "Back Heating Zone",
    desc: "Full-coverage back pad. Homogeneous warmth from collar to waist — 120–250 g/m² fabric weight, invisible under any outer shell.",
  },
  {
    id: "power",
    x: 30, y: 72,
    num: "03",
    title: "5V–12V Power Interface",
    desc: "Compatible with standard consumer power banks. At max power on 7.4V / 3500mAh: 2h 50min continuous — 50 minutes longer than carbon competitors.",
  },
];

const POCS = [
  {
    category: "OUTDOOR — 4 PoCs",
    color: GREEN,
    items: [
      { label: "Vest", region: "US", pct: 40 },
      { label: "Vest & Jacket", region: "Global", pct: 65 },
      { label: "Jacket & Longsleeve", region: "Europe", pct: 50 },
      { label: "Vest", region: "US", pct: 30 },
    ],
  },
  {
    category: "WORKWEAR, MOTORCYCLE & MEDICAL",
    color: ORANGE,
    items: [
      { label: "Jacket", region: "Global — Workwear", pct: 35, status: "PoC" },
      { label: "Jacket", region: "US — Workwear", pct: 25, status: "PoC" },
      { label: "Vest", region: "Europe — Motorcycle", pct: 100, status: "Ind.", highlight: true },
      { label: "Heated Belt", region: "Asia — Medical", pct: 20, status: "PoC" },
    ],
  },
];

/* ─── HOTSPOT MAP ────────────────────────────────────────────────────────── */
const HotspotMap = ({ dark }) => {
  const [active, setActive] = useState(null);
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden select-none border shadow-xl group/map ${
        dark ? "border-zinc-700" : "border-zinc-300"
      }`}
      style={{ aspectRatio: "16/9" }}
    >
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(135deg, rgba(148,195,86,0.15), #14141B)" }}
      />

      <Link
        to="/industries/heated-apparel/case-studies"
        className="absolute inset-0 z-0"
        aria-label="Explore heated apparel case studies"
      >
        <img
          src={IMAGE_40}
          alt="Voltcore Heated Apparel — Front & Back"
          draggable={false}
          onLoad={() => setLoaded(true)}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover/map:scale-[1.03]"
          style={{ opacity: loaded ? 1 : 0, transitionProperty: "opacity, transform" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B]/60 via-transparent to-transparent pointer-events-none" />
      </Link>

      <Link
        to="/industries/heated-apparel/case-studies"
        className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14141B]/85 backdrop-blur-md border border-[#94C356]/40 text-[11px] font-black uppercase tracking-widest text-white hover:bg-[#94C356] hover:text-[#14141B] transition-all duration-300"
      >
        Explore Case Studies <FaArrowRight size={9} />
      </Link>

      {HOTSPOTS.map((h) => {
        const isActive = active === h.id;
        const flipX = h.x > 60;
        const flipY = h.y > 55;
        return (
          <div
            key={h.id}
            className="absolute z-20"
            style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%,-50%)" }}
            onMouseEnter={() => setActive(h.id)}
            onMouseLeave={() => setActive((cur) => cur === h.id ? null : cur)}
          >
            {!isActive && (
              <span className="absolute inset-0 rounded-full animate-ping bg-[#94C356] opacity-60 pointer-events-none" />
            )}
            <button
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActive((cur) => cur === h.id ? null : h.id); }}
              className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center text-[11px] font-black transition-all duration-200 ${
                isActive
                  ? "bg-[#94C356] border-[#94C356] text-[#14141B] scale-110 shadow-[0_0_15px_rgba(148,195,86,0.6)]"
                  : "bg-[#14141B]/90 border-white/80 text-white hover:border-[#94C356] hover:text-[#94C356]"
              }`}
            >
              {h.num}
            </button>

            {isActive && (
              <div
                className="absolute z-30 w-56 rounded-xl bg-[#14141B]/95 backdrop-blur-md border border-[#94C356]/30 shadow-2xl p-4 pointer-events-none"
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
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── ANIMATED BAR ───────────────────────────────────────────────────────── */
const AnimBar = ({ pct, color, delay = 0, dark }) => {
  const ref = useRef(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setTimeout(() => setW(pct), delay);
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [pct, delay]);
  return (
    <div ref={ref} className={`w-full h-2 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
      <div
        className="h-full rounded-full transition-all duration-1000 ease-out"
        style={{ width: `${w}%`, background: color }}
      />
    </div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
const HeatedApparel = () => {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const toggleDark = () => { document.documentElement.classList.toggle("dark"); setDark(d => !d); };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F0EFEA] text-[#14141B]"}`}>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#14141B]">
        <img
          src={IMAGE_40}
          alt="Voltcore Heated Apparel Header"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/30 to-transparent" />

        <Link
          to="/industries"
          className="absolute top-8 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#94C356] transition-colors"
        >
          <FaArrowLeft size={10} /> Industries
        </Link>

        <button
          onClick={toggleDark}
          className="absolute top-8 right-8 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-all text-sm"
        >
          {dark ? "☀" : "🌙"}
        </button>

        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-4">
            Wearables — Heated Apparel
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
            Heat<br /><span className="text-[#94C356]">Woven</span><br />Into The Fabric.
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            CNT-based polymer filaments replace copper wires — delivering homogeneous warmth, longer runtime, and invisible integration into any garment.
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

      {/* ── 2. PROBLEMS ─────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#F07E26] block mb-3">
              5.1 // The Client Problem
            </span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              Three bottlenecks legacy heating can't solve.
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
                      ? "bg-[#1C1C24] border-zinc-700 hover:border-[#F07E26]/40 hover:shadow-[0_0_30px_rgba(240,126,38,0.08)]"
                      : "bg-[#E8E7E0] border-zinc-300 hover:border-[#F07E26]/40 hover:shadow-md"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#F07E26] mb-6 ${dark ? "bg-[#14141B]" : "bg-[#D8D7CF]"}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                    {p.sub}
                  </span>
                  <h3 className={`text-lg font-bold mb-3 ${dark ? "text-white" : "text-[#14141B]"}`}>{p.title}</h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTION ─────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-y ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">
              5.2 // The Voltcore Solution
            </span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              CNT textile replaces the wire. Entirely.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 mb-10 items-center">
            {/* Visual Screen Layer */}
            <div className="rounded-2xl overflow-hidden shadow-lg border border-zinc-700 max-h-[380px]">
              <img src={IMAGE_39} alt="Voltcore layer breakdown" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Legacy */}
              <div className={`rounded-2xl p-6 border ${dark ? "bg-[#14141B] border-zinc-700" : "bg-[#D8D7CF] border-zinc-300"}`}>
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-4 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                  — Legacy copper / carbon architecture
                </span>
                <div className="space-y-2">
                  {[
                    "Outer fabric shell",
                    "Copper wire snake or carbon pad",
                    "Connector harness",
                    "Insulation fill",
                    "Inner lining",
                  ].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0 border ${dark ? "bg-[#1C1C24] border-zinc-600 text-zinc-400" : "bg-[#E8E7E0] border-zinc-300 text-zinc-500"}`}>
                        {i + 1}
                      </div>
                      <span className={`text-xs ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{s}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-4 pt-4 border-t ${dark ? "border-zinc-700" : "border-zinc-300"}`}>
                  <span className={`text-xs font-black ${dark ? "text-zinc-500" : "text-zinc-400"}`}>ΔT up to 16°C — Uneven heat</span>
                </div>
              </div>
              {/* Voltcore */}
              <div className="rounded-2xl p-6 border border-[#94C356]/30 bg-[#94C356]/5">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#94C356] block mb-4">
                  ✦ Voltcore CNT textile architecture
                </span>
                <div className="space-y-2">
                  {[
                    "Outer fabric shell",
                    "Voltcore Heating Textile (120–250 g/m²)",
                    "5–12V connection — power bank compatible",
                    "Inner lining",
                  ].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black text-white bg-[#94C356] flex-shrink-0">
                        {i + 1}
                      </div>
                      <span className={`text-xs font-bold ${dark ? "text-[#B8B7A4]" : "text-[#14141B]"}`}>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-[#94C356]/20">
                  <span className={`text-xs font-black ${dark ? "text-white" : "text-[#14141B]"}`}>
                    ΔT 6°C — Uniform heat · +50 min runtime
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Material specs row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "40–70%", label: "Faster than copper", sub: "same energy input" },
              { val: "2×",     label: "Longer battery life", sub: "vs carbon heaters" },
              { val: "3–4°C",  label: "Thermal deviation", sub: "homogeneous surface" },
              { val: "75%",    label: "Recycled polymers", sub: "mono-material recyclable" },
            ].map((spec) => (
              <div
                key={spec.label}
                className={`rounded-xl p-5 border text-center ${dark ? "bg-[#14141B] border-zinc-700" : "bg-white border-zinc-200"}`}
              >
                <div className="text-2xl font-black text-[#94C356] mb-1">{spec.val}</div>
                <div className={`text-xs font-bold mb-0.5 ${dark ? "text-white" : "text-[#14141B]"}`}>{spec.label}</div>
                <div className={`text-[10px] ${dark ? "text-zinc-500" : "text-zinc-500"}`}>{spec.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOTSPOT MAP ──────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">
                5.3 // Interactive Map
              </span>
              <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
                Every Zone. Heated.
              </h2>
            </div>
            <p className={`text-sm max-w-xs leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
              Hover the numbered markers to explore each heating zone — or click anywhere on the image to open the full case studies.
            </p>
          </div>
          <HotspotMap dark={dark} />
        </div>
      </section>

      {/* ── 5. POC TRACKER ──────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">
              5.4 // POCs & Traction
            </span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              8 PoCs — 1 moving to industrialization.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {POCS.map((group) => (
              <div
                key={group.category}
                className={`rounded-2xl p-8 border ${dark ? "bg-[#14141B] border-zinc-700" : "bg-[#F0EFEA] border-zinc-200"}`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest block mb-6" style={{ color: group.color }}>
                  {group.category}
                </span>
                <div className="space-y-5">
                  {group.items.map((item, i) => (
                    <div key={`${item.label}-${item.region}`}>
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <div>
                          <span className={`text-xs font-bold ${item.highlight ? "text-[#F07E26]" : dark ? "text-white" : "text-[#14141B]"}`}>
                            {item.label}
                          </span>
                          <span className={`text-[10px] ml-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                            {item.region}
                          </span>
                        </div>
                        <span
                          className="text-[10px] font-black uppercase tracking-wider whitespace-nowrap"
                          style={{ color: item.highlight ? ORANGE : GREEN }}
                        >
                          {item.highlight ? "● Ind." : "PoC →"}
                        </span>
                      </div>
                      <AnimBar
                        pct={item.pct}
                        color={item.highlight ? "linear-gradient(90deg, #F07E26, #ff5500)" : group.color}
                        delay={i * 80}
                        dark={dark}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA ──────────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${dark ? "bg-[#14141B] border-zinc-800" : "bg-[#F0EFEA] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="relative overflow-hidden bg-[#14141B] rounded-3xl p-12 md:p-20 text-center shadow-xl border border-zinc-800">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-1 bg-[#94C356] blur-sm opacity-60 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-4">
              // Request Heated Apparel Evaluation Kit
            </span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 max-w-2xl mx-auto">
              Ready to bring Voltcore into your product line?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#94C356] text-[#14141B] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#D9FE42] transition-all duration-300"
              >
                Request Samples & TDS <FaArrowRight size={10} />
              </Link>
              <Link
                to="/industries/heated-apparel/case-studies"
                className="inline-flex items-center gap-2 border border-white/20 text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:border-[#94C356] hover:text-[#94C356] transition-all duration-300"
              >
                View Case Studies <FaArrowRight size={10} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ping { 75%,100%{transform:scale(2);opacity:0} }
        .animate-ping { animation: ping 1.4s cubic-bezier(0,0,0.2,1) infinite; }
      `}</style>
    </div>
  );
};

export default HeatedApparel;