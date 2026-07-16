import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaArrowLeft,
  FaExclamationTriangle, FaChartLine, FaShieldAlt,
  FaBolt, FaWeightHanging, FaPlug,
} from "react-icons/fa";
import PizzaBagImg     from "../assets/website/industries/PizzaBag.png";
import LivreurImg      from "../assets/website/industries/Livreur.png";
import ScootImg        from "../assets/website/industries/Scoot.png";
import BImg            from "../assets/website/industries/B.png";
import Image29         from "../assets/website/industries/image29.png";
import ThermalLogisticsPOCTracker from "../components/ThermalLogisticsPOCTracker";
import { Reveal, CountUp, ScrollProgress, CursorGlow, TiltCard } from "../components/anim";
import ThermalBagImg from "../assets/website/industries/image30.png";

const ORANGE = "#F07E26";
const NEON   = "#D9FE42";
const GREEN  = "#94C356";
const BLACK  = "#14141B";
const CRAFT  = "#B8B7A4";
const CREAM  = "#F0EFEA";
const CREAM2 = "#E8E7E0";

/* ─── DATA ──────────────────────────────────────────────────────────────── */
const STATS = [
  { value: 20,   suffix: "%",  prefix: "~", label: "Customers irritated by cold food" },
  { value: 15,   suffix: "%",  prefix: "~", label: "More orders if food arrived hot" },
  { value: 2.5,  suffix: "×",  prefix: "",  label: "Longer heat retention vs passive bags", decimals: 1 },
  { value: 63,   suffix: "°C", prefix: "≥", label: "EU / UK regulatory minimum" },
];

const PROBLEMS = [
  {
    icon: FaExclamationTriangle, sub: "Customer Complaint #1",
    title: "Hot food arriving cold",
    desc: "~20% of customers are 'consistently irritated' by food arriving at the wrong temperature — the single biggest food delivery complaint globally.",
  },
  {
    icon: FaChartLine, sub: "Business Impact",
    title: "Complaints, refunds & churn",
    desc: "Cold deliveries directly increase chargebacks and refund rates, lower restaurant and platform ratings, and drive customer churn — fewer repeat orders.",
  },
  {
    icon: FaShieldAlt, sub: "Regulatory Pressure",
    title: "New safety regulations",
    desc: "EU food hygiene legislation & UK Food Safety Regulations require hot holding at ≥63°C. USA FDA Food Code mandates ≥57°C/135°F. Passive bags cannot comply.",
  },
];

/* 3 hotspots: 01 moved left to grey zone, 02 on base, 03 on the lid/cover panel */
const HOTSPOTS = [
  { id: "base",   x: 52, y: 65, num: "01", title: "Full-Bottom Radiant Layer", desc: "Dense TargetHeat™ textile on the base provides the primary heat reservoir — keeps the food platform consistently above the 63°C regulatory threshold." },
];

/* ─── HOTSPOT MAP ──────────────────────────────────────────────────────── */
const HotspotMap = ({ dark }) => {
  const [active, setActive] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(false);
  const borderCol = dark ? "border-zinc-700" : "border-zinc-300";

  return (
    <div className={`relative w-full max-w-4xl mx-auto aspect-[4/3] rounded-2xl overflow-hidden select-none border shadow-xl group/map ${borderCol}`}>
      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(240,126,38,0.18), #14141B)" }}>
        {broken && (
          <span className="text-xs font-bold uppercase tracking-widest text-white/40 px-4 text-center">
            Image not found — check /images/thermal-logistics/image.png
          </span>
        )}
      </div>
      <Link to="/industries/thermal-logistics/case-studies" className="absolute inset-0 z-0" aria-label="Explore food delivery case studies">
        {!broken && (
          <img
            src={ThermalBagImg}
            alt="Voltcore heated delivery bag interior"
            className={`absolute inset-0 w-full h-full object-cover block transition-all duration-700 group-hover/map:scale-[1.05] ${loaded ? "opacity-100" : "opacity-0"}`}
            style={{ transitionProperty: "opacity, transform" }}
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => setBroken(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B]/55 via-transparent to-transparent pointer-events-none" />
      </Link>
      <Link to="/industries/thermal-logistics/case-studies"
        className="absolute top-4 right-4 z-30 inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border text-[11px] font-black uppercase tracking-widest text-white transition-all duration-300 hover:scale-105"
        style={{ background: "rgba(20,20,27,0.85)", borderColor: `${GREEN}40` }}
        onMouseEnter={e => { e.currentTarget.style.background = GREEN; e.currentTarget.style.color = BLACK; }}
        onMouseLeave={e => { e.currentTarget.style.background = "rgba(20,20,27,0.85)"; e.currentTarget.style.color = "white"; }}>
        Explore Case Studies <FaArrowRight size={9} />
      </Link>
      {HOTSPOTS.map((h, idx) => {
        const isActive = active === h.id;
        const flipX = h.x > 60;
        const flipY = h.y > 55;
        return (
          <div key={h.id} className="absolute z-20"
            style={{ left: `${h.x}%`, top: `${h.y}%`, transform: "translate(-50%,-50%)" }}
            onMouseEnter={() => setActive(h.id)}
            onMouseLeave={() => setActive(cur => cur === h.id ? null : cur)}>
            {!isActive && <span className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none" style={{ background: ORANGE }} />}
            <button type="button"
              onClick={e => { e.preventDefault(); e.stopPropagation(); setActive(cur => cur === h.id ? null : h.id); }}
              className="relative z-10 w-9 h-9 rounded-full border-2 flex items-center justify-center text-[11px] font-black transition-all duration-200"
              style={{
                background: isActive ? GREEN : "rgba(20,20,27,0.90)",
                borderColor: isActive ? GREEN : "rgba(255,255,255,0.80)",
                color: isActive ? BLACK : "white",
                transform: isActive ? "scale(1.15)" : "scale(1)",
                boxShadow: isActive ? `0 0 20px ${GREEN}80` : "none",
              }}>
              {h.num}
            </button>
            {isActive && (
              <div className="absolute z-30 w-56 rounded-xl backdrop-blur-md border shadow-2xl p-4 pointer-events-none"
                style={{
                  background: "rgba(20,20,27,0.95)", borderColor: `${GREEN}30`,
                  left: flipX ? "auto" : "calc(100% + 12px)",
                  right: flipX ? "calc(100% + 12px)" : "auto",
                  top: flipY ? "auto" : "50%", bottom: flipY ? "50%" : "auto",
                  transform: flipY ? "translateY(50%)" : "translateY(-50%)",
                  animation: "fadeInUp 0.25s ease-out",
                }}>
                <span className="text-[10px] font-black uppercase tracking-widest block mb-1" style={{ color: GREEN }}>{h.num}</span>
                <h4 className="text-sm font-bold text-white mb-1 leading-snug">{h.title}</h4>
                <p className="text-xs leading-relaxed" style={{ color: `${CRAFT}CC` }}>{h.desc}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

/* ─── MAIN PAGE ──────────────────────────────────────────────────────────── */
const ThermalLogistics = () => {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const bg0  = dark ? "bg-[#14141B]"  : "bg-[#F0EFEA]";
  const bg1  = dark ? "bg-[#1C1C24]"  : "bg-[#E8E7E0]";
  const bd   = dark ? "border-zinc-800" : "border-zinc-300";
  const h2c  = dark ? "text-white"     : "text-[#14141B]";
  const card = dark ? "bg-[#1C1C24] border-zinc-700" : "bg-[#E8E7E0] border-zinc-300";

  return (
    <div className={`min-h-screen transition-colors duration-300 ${dark ? "bg-[#14141B] text-[#B8B7A4]" : "bg-[#F0EFEA] text-[#14141B]"}`}>
      <ScrollProgress color={ORANGE} />
      <CursorGlow color={ORANGE} />
      <style>{`@keyframes fadeInUp { from { opacity:0; transform:translateY(8px) } to { opacity:1; transform:translateY(0) } } @keyframes shimmer { 0% { background-position: -200% 0 } 100% { background-position: 200% 0 } } @keyframes float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }`}</style>

      {/* ── 1. HERO ─────────────────────────────────────────────────────── */}
      <section className="relative h-screen flex items-end overflow-hidden bg-[#14141B]">
        <img src={LivreurImg} alt="Food delivery rider with Voltcore heated bag"
          className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.88 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/25 to-transparent" />
        <Link to="/industries"
          className="absolute top-32 left-8 z-10 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/60 hover:text-[#F07E26] transition-colors">
          <FaArrowLeft size={10} /> Industries
        </Link>
        <div className="relative z-10 container mx-auto px-6 max-w-6xl pb-20">
          <Reveal>
            <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-4" style={{ color: GREEN }}>
              Thermal Logistics — Food Delivery
            </span>
          </Reveal>
          <Reveal delay={100}>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none text-white mb-6 max-w-4xl">
              Keep food<br /><span style={{ color: GREEN }}>hot.</span><br />Every delivery.
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p className="text-white/80 text-lg max-w-xl leading-relaxed">
              Voltcore active heating maintains food at safe serving temperature 2–3× longer than passive insulation — meeting EU, UK and FDA regulatory requirements.
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-12 border-t border-white/10">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={300 + i * 100} y={20}>
                <div className="border-l-2 pl-4" style={{ borderColor: `${GREEN}50` }}>
                  <div className="text-2xl md:text-4xl font-black text-white mb-1">
                    <CountUp end={s.value} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals || 0} duration={2000} />
                  </div>
                  <div className="text-[10px] text-white/50 font-bold uppercase tracking-wider">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. PROBLEM ──────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 ${bg0}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>
                // The Client Problem
              </span>
              <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${h2c}`}>
                Hot food arriving cold<br />is the #1 complaint.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <Reveal key={p.title} delay={i * 150}>
                  <div
                    className={`group rounded-2xl p-8 border transition-all duration-300 ${
                      dark
                        ? "bg-[#1C1C24] border-zinc-700 hover:border-[#F07E26]/40 shadow-none hover:shadow-[0_0_30px_rgba(240,126,38,0.08)]"
                        : "bg-[#E8E7E0] border-zinc-300 hover:border-[#F07E26]/40 shadow-sm hover:shadow-md"
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 ${dark ? "bg-[#14141B]" : "bg-[#D8D7CF]"}`}
                      style={{ color: GREEN }}>
                      <Icon size={18} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-widest block mb-2 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>{p.sub}</span>
                    <h3 className={`text-lg font-bold mb-3 ${h2c}`}>{p.title}</h3>
                    <p className={`text-sm leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{p.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTION ─────────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-y ${bg1} ${bd}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>
                // The Voltcore Solution
              </span>
              <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${h2c}`}>
                Active heating beats passive insulation.
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Reveal x={-30} y={0}>
              {/* Legacy */}
              <div className={`rounded-2xl p-8 border h-full ${dark ? "bg-[#14141B] border-zinc-700" : "bg-[#D8D7CF] border-zinc-300"}`}>
                <span className={`text-[10px] font-black uppercase tracking-widest block mb-6 ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                  — Passive insulated bag
                </span>
                <div className="space-y-3">
                  {["Insulated outer shell", "Foam / foil lining (no active heat)", "Food cools 1–2°C per minute", "Below 63°C within 15–20 min"].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[9px] font-black shrink-0 border ${dark ? "bg-[#1C1C24] border-zinc-600 text-zinc-400" : "bg-[#E8E7E0] border-zinc-300 text-zinc-500"}`}>
                        {i + 1}
                      </div>
                      <span className={`text-sm ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{s}</span>
                    </div>
                  ))}
                </div>
                <div className={`mt-6 pt-6 border-t ${dark ? "border-zinc-700" : "border-zinc-300"}`}>
                  <span className={`text-2xl font-black ${dark ? "text-zinc-500" : "text-zinc-400"}`}>~15 min</span>
                  <span className={`text-xs block mt-1 ${dark ? "text-zinc-600" : "text-zinc-500"}`}>Until food drops below safe serving temp</span>
                </div>
              </div>
            </Reveal>
            <Reveal x={30} y={0} delay={150}>
              {/* Voltcore */}
              <div className="rounded-2xl p-8 border shadow-sm h-full relative overflow-hidden" style={{ borderColor: `${GREEN}35`, background: `${GREEN}08` }}>
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${GREEN}, transparent)`, animation: "shimmer 3s linear infinite", backgroundSize: "200% 100%" }} />
                <span className="text-[10px] font-black uppercase tracking-widest block mb-6" style={{ color: GREEN }}>
                  ✦ Voltcore active heating
                </span>
                <div className="space-y-3">
                  {["TargetHeat™ mesh on all inner walls", "Full-bottom radiant textile layer", "Maintains 60–66°C throughout delivery", "3h+ of continuous active heat*"].map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded flex items-center justify-center text-[9px] font-black text-black shrink-0" style={{ background: GREEN }}>{i + 1}</div>
                      <span className={`text-sm font-bold ${dark ? "text-[#B8B7A4]" : "text-[#14141B]"}`}>{s}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t" style={{ borderColor: `${GREEN}25` }}>
                  <span className={`text-2xl font-black ${dark ? "text-white" : "text-[#14141B]"}`}>2–3× longer</span>
                  <span className={`text-xs block mt-1 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>Food stays at safe serving temperature</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Magnitude stats row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {[
              { icon: FaBolt,        val: "3h+",        sub: "Continuous permanent heat*",        note: "*18V, 6Ah battery" },
              { icon: FaWeightHanging, val: "+250g only", sub: "Removable laminated heater + connectors" },
              { icon: FaPlug,        val: "+150–200g",  sub: "Integrated non-removable version" },
            ].map(({ icon: Icon, val, sub, note }, i) => (
              <Reveal key={val} delay={i * 120}>
                <TiltCard
                  className={`h-full rounded-2xl p-6 border transition-colors duration-300 cursor-default ${dark ? "border-zinc-700 bg-[#14141B]" : "border-zinc-300 bg-white/70"}`}
                  max={6}
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-3" style={{ color: GREEN, background: `${GREEN}12` }}>
                    <Icon size={14} />
                  </div>
                  <div className="text-2xl font-black mb-1" style={{ color: GREEN }}>{val}</div>
                  <div className={`text-xs font-bold ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{sub}</div>
                  {note && <div className={`text-[10px] mt-1 ${dark ? "text-zinc-600" : "text-zinc-500"}`}>{note}</div>}
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOTSPOT MAP ─────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${bg1} ${bd}`}>
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <Reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>
                  // Interactive Bag Map
                </span>
                <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight ${h2c}`}>
                  Every surface. Heated.
                </h2>
              </div>
            </Reveal>
            <Reveal delay={150} x={30} y={0}>
              <p className={`text-sm max-w-xs leading-relaxed ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
                Hover the markers to explore each heating zone — or open the full case studies.
              </p>
            </Reveal>
          </div>
          <Reveal y={40}>
            <HotspotMap dark={dark} />
          </Reveal>
        </div>
      </section>

      {/* ── 5. POC TRACKER ─────────────────────────────────────────────── */}
      <section className={`py-24 px-6 border-t ${bg1} ${bd}`}>
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <div className="mb-14">
              <span className="text-xs font-bold uppercase tracking-[0.3em] block mb-3" style={{ color: GREEN }}>// POCs &amp; Traction</span>
              <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight ${h2c}`}>
                Active across key delivery markets.
              </h2>
            </div>
          </Reveal>
          <Reveal y={40}>
            <ThermalLogisticsPOCTracker dark={dark} />
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default ThermalLogistics;