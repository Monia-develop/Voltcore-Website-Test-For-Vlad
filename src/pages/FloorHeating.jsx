import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft, FaArrowRight, FaBolt, FaClock, FaLeaf, FaRecycle,
  FaThermometerHalf, FaWind, FaLayerGroup, FaTools, FaHome,
} from "react-icons/fa";
import FloorHeroImage from "../assets/website/industries/underfloor-Heating2.png";
import FloorHeatingVideo from "../assets/website/FloorHeating.mp4";

/* ─── THEME ─────────────────────────────────────────────────────────────── */
const GREEN  = "#94C356"; 
const NEON   = "#D9FE42";
const ORANGE = "#F07E26";
const BLACK  = "#14141B";
const CRAFT  = "#B8B7A4";
const CREAM  = "#F0EFEA";
const CREAM2 = "#E8E7E0"; 
 
/* ─── DATA ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: "3 min",   label: "20°C → 28°C Warm-Up" },
  { value: "4h",      label: "100m² Install Time" },
  { value: "−30%",    label: "Energy Bill Savings" },
  { value: "85–95%",  label: "Heat Focused Upward" },
];

const PROBLEMS = [
  {
    icon: FaBolt,
    sub: "Operational Costs",
    title: "Exorbitant Energy Waste",
    desc: "Standard heating cables and carbon films waste significant thermal energy downward into the subfloor rather than focusing it upward toward the occupant — up to 60% of energy is lost.",
  },
  {
    icon: FaClock,
    sub: "Installation Disruption",
    title: "Long, Destructive Installation",
    desc: "Hydronic or standard electric wire layouts demand 3 to 14 days of specialized labor, screed layering, or destructive removal of old flooring — impossible for quick renovations.",
  },
  {
    icon: FaThermometerHalf,
    sub: "Thermal Inertia",
    title: "Slow Heat-Up Times",
    desc: "Legacy electric cables or carbon films take 1 hour to 90 minutes just to raise room temperatures from 20°C to a comfortable 28°C — no on-demand comfort.",
  },
  {
    icon: FaWind,
    sub: "Indoor Air Quality",
    title: "Air Quality Degradation",
    desc: "Forced-air and many conventional radiant setups dry out indoor air while continuously circulating dust, pet dander, and allergens — unhealthy for sensitive occupants.",
  },
];

const HOTSPOTS = [
  {
    id: "substrate",
    x: 22, y: 78, num: "01",
    title: "Substrate",
    desc: "Existing subfloor or concrete slab. The mesh insulates downward — close to zero heat wasted into the substrate, no screed removal needed.",
  },
  {
    id: "mesh",
    x: 38, y: 68, num: "02",
    title: "Voltcore TargetHeat Mesh",
    desc: "A 2.2mm CNT nanocomposite mesh that reaches 28°C in just 3 minutes and consumes only 56 Wh (vs 340 Wh for electric cable). Uni-directional heating — zero heat lost to substrate.",
  },
  {
    id: "surface",
    x: 72, y: 60, num: "03",
    title: "Heated Surface Finish",
    desc: "Laminate, tile, parquet, or vinyl — the finish layer sits directly on top. It receives 85–95% of the mesh's energy focused straight upward. No heat wasted downward.",
  },
];

const RESIDENTIAL_POC = {
  pocs: 4,
  pocsCompleted: 1,
  pocsOngoing: 3,
  jdAs: 1,
  jdaCompleted: 0,
  jdaOngoing: 1,
  commercial: 0,
  application: "Floor heating",
  partners: ["Tarkett", "Gerflor", "Forbo", "Karndean"],
}; 

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
          style={{
            width: shown ? `${pct}%` : "0%",
            background: color,
            transitionDelay: `${delay}ms`,
          }}>
          <div className="absolute inset-0" style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            animation: shown ? "shimmer 1.8s ease infinite" : "none",
          }} />
        </div>
      </div> 
    </div>
  );
};

/* ─── POC PROGRESS BAR (Residential) ────────────────────────────────────── */
const POCProgressBar = ({ dark }) => {
  const [ref, shown] = useInView(0.3);
  const { pocs, pocsCompleted, pocsOngoing, jdAs, jdaOngoing, commercial, partners } = RESIDENTIAL_POC;

  const renderDots = (total, completed, ongoing) => {
    const dots = [];
    for (let i = 0; i < total; i++) {
      if (i < completed) dots.push(<span key={i} className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: GREEN }} />);
      else if (i < completed + ongoing) dots.push(<span key={i} className="w-2.5 h-2.5 rounded-full inline-block border-2" style={{ borderColor: GREEN, background: "transparent" }} />);
      else dots.push(<span key={i} className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: dark ? "#3f3f46" : "#d4d4d8" }} />);
    }
    return dots;
  };

  return (
    <div ref={ref} className={`rounded-2xl p-8 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
      <div className="flex items-center justify-between mb-6">
        <h4 className={`text-xs font-black uppercase tracking-widest ${dark ? "text-zinc-300" : "text-zinc-500"}`}>
          Residential — Floor Heating Traction
        </h4>
        <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: `${GREEN}20`, color: GREEN }}>
          [04] Residential 
        </span>
      </div>

      {/* PoCs */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-bold ${dark ? "text-white" : "#14141B"}`}>
            <span style={{ color: GREEN }}>{pocs}</span> PoCs
          </span>
          <div className="flex gap-1.5">{renderDots(pocs, pocsCompleted, pocsOngoing)}</div>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
          <div className="h-full rounded-full transition-all duration-[1400ms] ease-out"
            style={{ width: shown ? `${(pocsCompleted / pocs) * 100}%` : "0%", background: GREEN }} />
        </div>
      </div>

      {/* JDAs */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-bold ${dark ? "text-white" : "#14141B"}`}>
            <span style={{ color: ORANGE }}>{jdAs}</span> Joint Dvlpt
          </span>
          <div className="flex gap-1.5">{renderDots(jdAs, 0, jdaOngoing)}</div>
        </div>
        <div className={`h-2 rounded-full overflow-hidden ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
          <div className="h-full rounded-full transition-all duration-[1400ms] ease-out"
            style={{ width: "0%", background: ORANGE }} />
        </div>
      </div>

      {/* Commercial */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-sm font-bold ${dark ? "text-white" : "#14141B"}`}>
            <span style={{ color: dark ? "#71717a" : "#a1a1aa" }}>{commercial}</span> Commercial
          </span>
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: dark ? "#3f3f46" : "#d4d4d8" }} />
          </div>
        </div>
      </div>

      {/* Application */}
      <div className={`mb-6 p-4 rounded-xl ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
        <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>1 Application</span>
        <span className={`text-sm font-bold ${dark ? "text-white" : "#14141B"}`}>• Floor heating</span>
      </div>

      {/* Partners */}
      <div>
        <span className={`text-[10px] font-black uppercase tracking-widest block mb-3 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>4 Partners</span>
        <div className="grid grid-cols-4 gap-3">
          {partners.map((p) => (
            <div key={p} className={`rounded-xl p-4 text-center border transition-all duration-300 hover:scale-105 ${dark ? "bg-[#14141B] border-zinc-700 hover:border-[#94C356]/40" : "bg-[#F0EFEA] border-zinc-200 hover:border-[#94C356]/40"}`}>
              <span className={`text-xs font-black ${dark ? "text-white" : "#14141B"}`}>{p}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── HOTSPOT MAP (SANS PHOTOS - TEXTE SEULEMENT) ───────────────────────── */
const HotspotMap = ({ dark }) => {
  const [active, setActive] = useState(null);
  const borderCol = dark ? "border-zinc-700" : "border-zinc-300";

  return (
    <div className={`relative w-full aspect-[16/9] rounded-2xl overflow-hidden select-none border shadow-xl group/map ${borderCol}`}>
      
      {/* IMAGE DE FOND */}
      <Link to="/industries/floorheating/case-studies" className="absolute inset-0 z-0" aria-label="Explore floor heating case studies">
        <img 
          src={FloorHeroImage} 
          alt="Voltcore Layer Setup Diagram" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/map:scale-[1.03]"
          style={{ opacity: 0.92 }}
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B]/50 via-transparent to-transparent pointer-events-none" />
      </Link>

      {/* Trame de grille technique décorative */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(148,195,86,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,195,86,0.15) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      {/* Bouton d'action en superposition */}
      <Link to="/industries/floorheating/case-studies"
        className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#14141B]/85 backdrop-blur-md border border-[#94C356]/40 text-[11px] font-black uppercase tracking-widest text-white hover:bg-[#94C356] hover:text-[#14141B] transition-all duration-300">
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
            style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%, -50%)" }}
            onMouseEnter={() => setActive(h.id)}
            onMouseLeave={() => setActive((cur) => (cur === h.id ? null : cur))}
          >
            {/* Animation de pulsation ping */}
            {!isActive && (
              <span className="absolute inset-0 rounded-full animate-ping bg-[#94C356] opacity-60 pointer-events-none" />
            )}
            
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActive((cur) => (cur === h.id ? null : h.id)); }}
              className={`relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center text-[11px] font-black transition-all duration-200 ${
                isActive
                  ? "bg-[#94C356] border-[#94C356] text-[#14141B] scale-110 shadow-[0_0_15px_rgba(148,195,86,0.6)]"
                  : "bg-[#14141B]/90 border-white/80 text-white hover:border-[#94C356] hover:text-[#94C356]"
              }`}
            >
              {h.num}
            </button>
            
            {/* Popover / Tooltip - SANS IMAGE */}
            {isActive && (
              <div 
                className="absolute z-30 w-64 rounded-xl bg-[#14141B]/95 backdrop-blur-md border border-[#94C356]/30 shadow-2xl p-4 pointer-events-none"
                style={{
                  left: flipX ? "auto" : "calc(100% + 12px)",
                  right: flipX ? "calc(100% + 12px)" : "auto",
                  top: flipY ? "auto" : "50%",
                  bottom: flipY ? "50%" : "auto",
                  transform: flipY ? "translateY(50%)" : "translateY(-50%)",
                }}
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-[#94C356] block mb-1">
                  {h.num}
                </span>
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

/* ─── MAIN PAGE ────────────────────────────────────────────────────────── */
const FloorHeating = () => {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const toggleDark = () => {
    document.documentElement.classList.toggle("dark");
    setDark((d) => !d);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F0EFEA] text-[#14141B]"}`}>
      {/* ── 1. HERO ─────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#14141B]">
        <img src={FloorHeroImage} alt="Voltcore TargetHeat Underfloor Heating"
          className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.92 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/20 to-transparent" />
        <Link to="/industries"
          className="absolute top-32 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#94C356] transition-colors">
          <FaArrowLeft size={10} /> Industries
        </Link>
  
        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-20">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-4">
            Residential — Underfloor Heating
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
            Heat Engineered<br /><span className="text-[#94C356]">Directly Into</span><br />The Surface.
          </h1>
          <p className="text-white/80 text-lg max-w-xl leading-relaxed">
            A CNT-based nanocomposite filament woven into ultra-thin meshes and textiles — replacing slow, wasteful legacy underfloor heating with a precise, energy-efficient surface heating solution.
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

      {/* ── 2. PROBLEMS (COMPACT COMME AUTOMOTIVE) ───────────────────────── */}
      <section className={`py-24 px-6 ${dark ? "bg-[#14141B]" : "bg-[#F0EFEA]"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-#94C356] block mb-3">4.1 // The Client Problem</span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              Why Legacy Systems Fail
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title}
                  className={`group rounded-2xl p-6 border transition-all duration-300 ${
                    dark
                      ? "bg-[#1C1C24] border-zinc-700 hover:border-[#F07E26]/40 shadow-none hover:shadow-[0_0_30px_rgba(240,126,38,0.08)]"
                      : "bg-[#E8E7E0] border-zinc-300 hover:border-[#F07E26]/40 shadow-sm hover:shadow-md"
                  }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-[#94C356] mb-4 ${dark ? "bg-[#14141B]" : "bg-[#D8D7CF]"}`}>
                    <Icon size={16} />
                  </div>
                  <span className={`text-[9px] font-black uppercase tracking-widest block mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{p.sub}</span>
                  <h3 className={`text-base font-bold mb-2 ${dark ? "text-white" : "text-[#14141B]"}`}>{p.title}</h3>
                  <p className={`text-xs leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTION ─────────────────────────────────────── */}
      <section className={`py-24 px-6 border-y ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">4.2 // The Voltcore Solution</span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              Uni-Directional Heating Beats Bi-Directional Waste.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Legacy */}
            <div className={`rounded-2xl p-8 border ${dark ? "bg-[#14141B] border-zinc-700" : "bg-[#D8D7CF] border-zinc-300"}`}>
              <span className={`text-[10px] font-black uppercase tracking-widest block mb-6 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                — Legacy copper / carbon film architecture
              </span>
              <div className="space-y-3">
                {["Floor finish (vinyl/laminate)", "Screed / adhesive layer (10–30mm)", "Heating cable / carbon film", "Insulation board", "Concrete substrate"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-black flex-shrink-0 border ${dark ? "bg-[#1C1C24] border-zinc-600 text-zinc-400" : "bg-[#E8E7E0] border-zinc-300 text-zinc-500"}`}>{i + 1}</div>
                    <span className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{s}</span>
                  </div>
                ))}
              </div>
              <div className={`mt-6 pt-6 border-t ${dark ? "border-zinc-700" : "border-zinc-300"}`}>
                <span className={`text-2xl font-black ${dark ? "text-zinc-500" : "text-zinc-400"}`}>~40%</span>
                <span className={`text-xs block mt-1 ${dark ? "text-zinc-600" : "text-zinc-500"}`}>Energy reaching the surface (60% wasted downward)</span>
              </div>
            </div>
            {/* Voltcore */}
            <div className="rounded-2xl p-8 border border-[#94C356]/30 bg-[#94C356]/5 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#94C356] block mb-6">✦ Voltcore TargetHeat architecture</span>
              <div className="space-y-3">
                {["Floor finish (vinyl/laminate)", "Voltcore TargetHeat Mesh (2.2mm)", "Existing subfloor / substrate"].map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-black text-white bg-[#94C356] flex-shrink-0">{i + 1}</div>
                    <span className={`text-sm font-bold ${dark ? "text-[#B8B7A4]" : "text-[#14141B]"}`}>{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[#94C356]/20">
                <span className={`text-2xl font-black ${dark ? "text-white" : "text-[#14141B]"}`}>85–95%</span>
                <span className={`text-xs block mt-1 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Energy focused upward — zero heat wasted into substrate</span>
              </div>
            </div>
          </div>

          {/* Key advantages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FaBolt, title: "Superior Energy Efficiency", desc: "Delivers 85–95% of energy to the surface vs ~40% for copper. Up to 50% energy savings and 40% faster warm-up." },
              { icon: FaLayerGroup, title: "Seamless Integration", desc: "Ultra-thin (120–250 g/m²), drapable CNT textiles integrate into foam, textiles, plastics, and overmolded parts." },
              { icon: FaRecycle, title: "Sustainable & Recyclable", desc: "Contains up to 75% recycled content. 100% mono-material PP/PA/PET matrix for effortless end-of-life recycling." },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={item.title}
                  className={`rounded-2xl p-8 border transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 ${
                    dark ? "bg-[#14141B] border-zinc-700 hover:border-[#94C356]/40" : "bg-white border-zinc-300 hover:border-[#94C356]/40 shadow-sm hover:shadow-md"
                  }`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-[#94C356] mb-6 ${dark ? "bg-[#1C1C24]" : "bg-[#94C356]/10"}`}>
                    <Icon size={18} />
                  </div>
                  <h3 className={`text-lg font-bold mb-3 ${dark ? "text-white" : "text-[#14141B]"}`}>{item.title}</h3>
                  <p className={`text-sm leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. HOTSPOT MAP ──────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">4.3 // Interactive Map</span>
              <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
                Three Layers. One Direction.
              </h2>
            </div>
            <p className={`text-sm max-w-xs leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
              Hover the numbered markers to explore each layer of the TargetHeat system — or open the full case studies for technical deep-dives.
            </p>
          </div>
          <HotspotMap dark={dark} /> 
        </div> 
      </section> 

      {/* ─ 5. POC TRACKER (Residential) ───────────────────── */}
      <section className={`py-24 px-6 border-t ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-[#E8E7E0] border-zinc-300"}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">4.4 // POCs & Traction</span>
            <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${dark ? "text-white" : "text-[#14141B]"}`}>
              Active Across Key Residential Partners.
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <POCProgressBar dark={dark} />
            {/* Market context card */}
            <div className={`rounded-2xl p-8 border ${dark ? "bg-[#1C1C24] border-zinc-800" : "bg-white border-zinc-200"}`}>
              <h4 className={`text-xs font-black uppercase tracking-widest mb-6 ${dark ? "text-zinc-300" : "text-zinc-500"}`}>
                Market Context — EU & UK
              </h4>
              <div className="space-y-5">
                <AnimatedBar pct={100} color={GREEN} delay={0} dark={dark} label="TAM — Global Electric UFH (2025)" value="$3.2B" />
                <AnimatedBar pct={44} color="#94C356" delay={100} dark={dark} label="SAM — Europe Electric UFH (2025)" value="$1.4B" />
                <AnimatedBar pct={25} color={NEON} delay={200} dark={dark} label="SOM — Retrofit-Ready EU & UK" value="$0.8B" />
              </div>
              <div className={`mt-6 pt-6 border-t ${dark ? "border-zinc-700" : "border-zinc-200"}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>CAGR</span>
                    <span className={`text-xl font-black ${dark ? "text-white" : "#14141B"}`}>5–7%</span>
                    <span className={`text-xs block ${dark ? "text-zinc-500" : "text-zinc-500"}`}>Through 2034 globally</span>
                  </div>
                  <div>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-1 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>Retrofit Share</span>
                    <span className={`text-xl font-black ${dark ? "text-white" : "#14141B"}`}>55–60%</span>
                    <span className={`text-xs block ${dark ? "text-zinc-500" : "text-zinc-500"}`}>Of EU electric UFH in renovations</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─ 6. CTA ──────────────────────────────────────────── */}


      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
};

export default FloorHeating;