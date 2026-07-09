import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaLinkedin, FaYoutube,
  FaEnvelope, FaMapMarkerAlt, FaLeaf, FaShieldAlt, FaBolt,
} from "react-icons/fa";

import SecondSkinImg      from "../assets/website/platforms/SecondSkinAutomotive.png";
import ActiveFilImg       from "../assets/website/platforms/BRD-03-activefil.png";
import TargetHeatImg      from "../assets/website/platforms/BRD-02-targetheat.png";
import SensiTermImg       from "../assets/website/platforms/BRD-04-sensiterm.png";
import ActiveFilPhoto     from "../assets/website/platforms/Filaments_activeFil_.png";
import TargetHeatPhoto    from "../assets/website/platforms/heatingTextile_targetheat_.png";
import SensiTermPhoto     from "../assets/website/platforms/HeatingSystem_sensiterm_.png";
import An1Video           from "../assets/website/platforms/An1.mp4";
import An2Video           from "../assets/website/platforms/An2.mp4";

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
const useIsDark = () => {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const update = () => setDark(document.documentElement.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
};

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
};

const Reveal = ({ children, delay = 0, y = 28, className = "", tag: Tag = "div" }) => {
  const [ref, shown] = useInView(0.1);
  return (
    <Tag ref={ref} className={className} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity 0.6s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.6s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
    }}>
      {children}
    </Tag>
  );
};

const CountUp = ({ end, duration = 1400, prefix = "", suffix = "", decimals = 0 }) => {
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
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(end * eased);
          if (p < 1) requestAnimationFrame(step);
          else setVal(end);
        };
        requestAnimationFrame(step);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration, started]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
};

/* Robust image with a graceful fallback if the source is missing/broken */
const SafeImage = ({ src, alt, color = "#D9FE42", className = "" }) => {
  const [loaded, setLoaded] = useState(false);
  const [broken, setBroken] = useState(!src);
  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Always-visible base layer — never a blank gap, even while loading or on error */}
      <div className="absolute inset-0 flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}28, #14141B)` }}>
        <span className="text-6xl font-black tracking-tighter opacity-25" style={{ color }}>
          {(alt || "V").charAt(0)}
        </span>
      </div>
      {!broken && (
        <img src={src} alt={alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setBroken(true)}
        />
      )}
    </div>
  );
};

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const PLATFORMS = [
  {
    id: "activefil",
    name: "ActiveFil™",
    tag: "Core Material · Patented",
    color: "#94C356",
    trl: "TRL 7–8",
    image: ActiveFilImg,
    photo: ActiveFilPhoto,
    desc: "CNT-enhanced conductive polymer filaments with precisely controlled resistivity — flexible, lightweight, and ready for industrial extrusion.",
    specs: [
      { label: "Resistance range",   val: "10 kΩ – 2 MΩ/m" },
      { label: "Weight",             val: "30–60 g/km" },
      { label: "Tensile strength",   val: "25–30 cN/tex" },
      { label: "Polymers",           val: "PP · PA · PET" },
      { label: "Voltage",            val: "5 – 220 V" },
      { label: "Self-abrasion",      val: "Zero" },
    ],
    bullets: [
      "Precise CNT nanofillers infused into standard thermoplastic polymer matrices",
      "Exact resistance range from 10 kΩ to 2 MΩ/m, fully tunable per application",
      "100% mono-material — drop-in for standard industrial extrusion lines",
      "Up to 75% recycled polymer content by mass",
    ],
  },
  {
    id: "targetheat",
    name: "TargetHeat™",
    tag: "Heating Platform",
    color: "#F07E26",
    trl: "TRL 7",
    image: TargetHeatImg,
    photo: TargetHeatPhoto,
    desc: "Fabric-integrated heating solution generating highly efficient, uniform heat distribution (ΔT ∼4°C) across complex geometries.",
    specs: [
      { label: "Structure",      val: "Open mesh / Textile" },
      { label: "Weight",         val: "120 – 250 g/m²" },
      { label: "Voltage",        val: "12 – 48 V" },
      { label: "Uniformity",     val: "ΔT ∼ 4°C" },
      { label: "Roll width",     val: "Up to 2 m" },
      { label: "Thermal dir.",   val: "Uni-directional" },
    ],
    bullets: [
      "Delivers 85–95% of generated heat directly to the A-surface",
      "Reaches 100°C homogeneous surface temp, zero copper hotspots",
      "Open mesh design maximises breathability and ventilation (30–60 g/m²)",
      "Production rolls up to 2 m wide — compatible with automated lamination lines",
    ],
  },
  {
    id: "sensiterm",
    name: "SensiTerm",
    tag: "Sensing + Heating",
    color: "#4A5DA7",
    trl: "TRL 6",
    image: SensiTermImg,
    photo: SensiTermPhoto,
    desc: "Advanced fabric platform co-designing electrical heating and intrinsic resistance-based sensing for zoned control without external sensors.",
    specs: [
      { label: "Sensing type",   val: "Piezoresistive" },
      { label: "Zones",          val: "Adaptive multi-zone" },
      { label: "Mapping",        val: "Occupancy detection" },
      { label: "Fault detect",   val: "Loop integrity alerts" },
      { label: "Integration",    val: "No external sensors" },
      { label: "Power ctrl",     val: "Zoned adaptive" },
    ],
    bullets: [
      "Utilises piezoresistive behaviour for direct resistance telemetry",
      "Occupancy mapping — heats only where contact is detected",
      "Loop integrity alerts instantly mitigate overheat or overcurrent faults",
      "No additional sensor layer required — sensing is intrinsic to the textile",
    ],
  },
];

const PILLARS = [
  {
    icon: <FaBolt size={20} />,
    title: "Thermal Efficiency",
    points: [
      "85–95% of energy delivered directly to the A-surface",
      "Up to 2× less energy vs. legacy copper wire systems",
      "40–70% faster warm-up to target comfort temperature",
      "ΔT ≈ 3–4°C absolute surface uniformity — zero cold spots",
    ],
  },
  {
    icon: <FaLeaf size={20} />,
    title: "Sustainability",
    points: [
      "100% mono-material polymer matrix — fully recyclable at EOL",
      "Up to 75% post-industrial recycled polymer content by mass",
      "50–75% lower CO₂ footprint vs. copper manufacturing",
      "Designed for EU circular economy compliance",
    ],
  },
  {
    icon: <FaShieldAlt size={20} />,
    title: "Operational Safety",
    points: [
      "Self-regulating thermal response — prevents local runaway",
      "12–48 V low-voltage architecture, zero high-voltage shock risk",
      "Compatible with automotive 12 V, e-bike, and domestic 220 V",
      "No metal wires — zero corrosion, zero breakage points",
    ],
  },
];

const POC_SECTORS = [
  {
    id: "01", label: "Mobility", color: "#D9FE42", ink: "#14141B",
    pocs: 17, jdas: 6, commercial: 0,
    apps: ["Seat cushion & backrest", "Full Comfort Cocoon", "Glovebox", "Interior trims", "Over-molding integration", "Battery heater", "Air-filter integrated heater", "De-icing & Thermal piping"],
    partners: ["VW", "BMW Group", "Stellantis", "Renault Group", "Hyundai", "General Motors", "FORVIA", "Zoppas", "MAGNA", "LEAR", "Toyota Boshoku", "Motherson", "Hengst", "Hutchinson"],
  },
  {
    id: "02", label: "Thermal Logistics", color: "#F07E26", ink: "#14141B",
    pocs: 3, jdas: 1, commercial: 1,
    apps: ["Food delivery box"],
    partners: ["Intedge", "SpartanPac", "Zomato"],
  },
  {
    id: "03", label: "Individual / Apparel", color: "#4A5DA7", ink: "#ffffff",
    pocs: 8, jdas: 1, commercial: 1,
    apps: ["Vest, Jacket", "Medical belt"],
    partners: ["G-Heat", "GOBI", "California Heat", "Radians", "Gerbing", "Milwaukee", "JustBrand Limited", "VISSCO"],
  },
  {
    id: "04", label: "Residential", color: "#94C356", ink: "#14141B",
    pocs: 4, jdas: 1, commercial: 0,
    apps: ["Floor heating"],
    partners: ["Tarkett", "Gerflor", "Forbo", "Karndean"],
  },
  {
    id: "05", label: "Defence", color: "#902053", ink: "#ffffff",
    pocs: 2, jdas: 0, commercial: 0,
    apps: ["Infra-red illusions", "Radar Signature management"],
    partners: ["Israeli Prime"],
  },
];

/* ─── 02 PRODUCT ARCHITECTURE — full-bleed, scroll-revealed schema ───────── */
const SchemaSection = () => {
  const dark = useIsDark();
  const [activeNode, setActiveNode] = useState(0);
  const [revealed, setRevealed] = useState(0); // max number of nodes revealed so far (never decreases)
  const sectionRef = useRef(null);

  /* Clean left-to-right DAG — every arrow leads somewhere, nothing loops back */
  const NODES = [
    { id: 0, x: 90,   y: 230, label: "ActiveFil™",      sub: "CNT polymer filament",         shape: "ellipse", color: "#94C356", size: [156, 62] },
    { id: 1, x: 350,  y: 110, label: "TargetHeat™",     sub: "Open mesh",                    shape: "ellipse", color: "#D9FE42", size: [150, 58] },
    { id: 2, x: 350,  y: 350, label: "Fabrics",         sub: "Woven textile",                shape: "ellipse", color: "#D9FE42", size: [134, 54] },
    { id: 3, x: 610,  y: 230, label: "Heating",         sub: "Textiles · pads · panels",     shape: "rect",    color: "#F07E26", size: [196, 68] },
    { id: 4, x: 860,  y: 230, label: "3 Functionalities", sub: "Heating · sensing · zoning", shape: "rect",    color: "#83D0F5", size: [200, 62] },
    { id: 5, x: 1110, y: 120, label: "Uni-directional Heat", sub: "85–95% to A-surface",     shape: "rect",    color: "#12503C", size: [214, 58] },
    { id: 6, x: 1110, y: 340, label: "Heating & Sensing", sub: "SensiTerm™ telemetry",       shape: "rect",    color: "#4A5DA7", size: [214, 58] },
    { id: 7, x: 1350, y: 230, label: "Client Benefits",  sub: "Thin · efficient · recyclable", shape: "rect",  color: "#D9FE42", size: [200, 66] },
  ];

  const EDGES = [
    { from: 0, to: 1 }, { from: 0, to: 2 },
    { from: 1, to: 3 }, { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 }, { from: 4, to: 6 },
    { from: 5, to: 7 }, { from: 6, to: 7 },
  ];

  const DETAILS = {
    0: "The conductive polymer base: tunable resistance, no metal wire, compatible with PP, PA and PET extrusion lines.",
    1: "An open textile heater engineered for breathability, roll-to-roll production, and fast heat delivery close to the surface.",
    2: "A denser textile format for apparel, medical, workwear and flexible panels where drape and comfort matter.",
    3: "The same material stack becomes pads, panels, textile rolls or laminated surfaces across mobility and building use cases.",
    4: "The architecture supports heating, intrinsic sensing, and custom multi-zone control from the same textile foundation.",
    5: "Heat is directed toward the A-surface, reducing wasted energy and improving warm-up time versus legacy wire systems.",
    6: "Resistance-based sensing enables occupancy detection and loop integrity alerts without adding a separate sensor layer.",
    7: "Thinner integration, lower energy demand, recyclable material choices, and compatibility with industrial lamination workflows.",
  };

  /* Scroll-linked progressive reveal on a NORMAL section (no position:sticky,
     no synthetic tall wrapper) — this is what broke before. Progress is derived
     straight from the section's natural position as it scrolls through the
     viewport, so nodes appear one by one exactly while you scroll past it,
     and there is zero extra blank space since the section keeps its natural height. */
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // start revealing only when section top is 20% above bottom of viewport
      // finish when section top is 60% up the viewport — longer travel = slower reveal
      const start = vh * 0.80;
      const end   = vh * -0.2;
      const pct = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, pct));
      const count = Math.max(1, Math.ceil(clamped * NODES.length));
      setRevealed((prev) => Math.max(prev, count));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="schema" className="w-full py-24 relative overflow-hidden bg-[#14141B] dark:bg-[#0e0e14]">
      <div className="absolute inset-0 opacity-[0.12] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.07) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage: "radial-gradient(circle at 50% 40%, black, transparent 78%)",
      }} />
      <div className="absolute top-10 left-1/4 w-[420px] h-[420px] rounded-full blur-[130px] opacity-[0.06] pointer-events-none" style={{ background: "#D9FE42" }} />

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-10 md:mb-14">
          <span className="text-xs font-black uppercase tracking-[0.22em] block mb-3 text-[#D9FE42]">
            02 // Product Architecture
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-[0.95] mb-4">
            From filament <span style={{ color: "#D9FE42" }}>to application</span>
          </h2>
          <p className="text-base text-[#B8B7A4]/70 max-w-2xl leading-relaxed">
            Scroll to reveal how Voltcore's conductive filament becomes heating textiles, sensing surfaces, and application-ready systems. Hover any block for detail.
          </p>
        </Reveal>

        {/* The diagram sits directly on the page — no card, no border box */}
        <div className="w-full overflow-x-auto md:overflow-visible -mx-6 px-6 md:mx-0 md:px-0">
          <svg viewBox="0 0 1470 460" className="w-full h-auto min-w-[880px] md:min-w-0 overflow-visible" style={{ maxHeight: "56vh" }}>
            <defs>
              <filter id="nodeGlow" x="-40%" y="-60%" width="180%" height="220%">
                <feGaussianBlur stdDeviation="9" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {EDGES.map(({ from, to }, ei) => {
              const a = NODES[from], b = NODES[to];
              const x1 = a.x + a.size[0] / 2, y1 = a.y;
              const x2 = b.x - b.size[0] / 2, y2 = b.y;
              const pathD = `M ${x1} ${y1} C ${x1 + 80} ${y1}, ${x2 - 80} ${y2}, ${x2} ${y2}`;
              const bothVisible = revealed > Math.max(from, to);
              const totalLen = 380;
              return (
                <path key={ei} d={pathD} fill="none"
                  stroke="rgba(217,254,66,0.36)"
                  strokeWidth="2.4" strokeLinecap="round"
                  strokeDasharray={totalLen}
                  strokeDashoffset={bothVisible ? 0 : totalLen}
                  style={{ transition: "stroke-dashoffset 0.6s ease" }}
                />
              );
            })}

            {NODES.map((n, ni) => {
              const isVisible = revealed > ni;
              const isActive = activeNode === n.id;
              return (
                <g key={n.id} style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0.7)",
                  transformOrigin: `${n.x}px ${n.y}px`,
                  transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(.22,1,.36,1)",
                  cursor: "pointer",
                }}
                  onMouseEnter={() => setActiveNode(n.id)}
                  onMouseMove={() => setActiveNode(n.id)}
                  onFocus={() => setActiveNode(n.id)}
                  tabIndex="0"
                >
                  {n.shape === "ellipse" ? (
                    <ellipse cx={n.x} cy={n.y} rx={n.size[0] / 2} ry={n.size[1] / 2}
                      fill={isActive ? n.color : "#1a1a24"}
                      stroke={n.color} strokeWidth={isActive ? 3 : 2}
                      filter={isActive ? "url(#nodeGlow)" : "none"}
                      style={{ transition: "all 0.22s" }} />
                  ) : (
                    <rect x={n.x - n.size[0] / 2} y={n.y - n.size[1] / 2} width={n.size[0]} height={n.size[1]} rx="10"
                      fill={isActive ? n.color : "#1a1a24"}
                      stroke={n.color} strokeWidth={isActive ? 3 : 2}
                      filter={isActive ? "url(#nodeGlow)" : "none"}
                      style={{ transition: "all 0.22s" }} />
                  )}
                  <text x={n.x} y={n.y - (n.sub ? 6 : 0)} textAnchor="middle" dominantBaseline="middle"
                    fontSize="17" fontWeight="900" fontFamily="AkkuratLL, sans-serif"
                    fill={isActive ? "#14141B" : "white"}
                    style={{ transition: "fill 0.2s", userSelect: "none" }}>
                    {n.label}
                  </text>
                  {n.sub && (
                    <text x={n.x} y={n.y + 15} textAnchor="middle" dominantBaseline="middle"
                      fontSize="11" fontWeight="400" fontFamily="AkkuratLL, sans-serif"
                      fill={isActive ? "#14141B99" : "rgba(255,255,255,0.45)"}
                      style={{ userSelect: "none" }}>
                      {n.sub}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        <Reveal delay={140} className="mt-8 max-w-2xl" y={12}>
          <div className="border-l-4 pl-6 py-1 transition-colors duration-300" style={{ borderColor: NODES[activeNode]?.color }}>
            <span className="text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: NODES[activeNode]?.color }}>
              {NODES[activeNode]?.label}
            </span>
            <p className="mt-2 text-sm md:text-base text-[#B8B7A4] leading-relaxed">
              {DETAILS[activeNode]}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ─── 01 SECOND SKIN ARCHITECTURE ─────────────────────────────────────────── */
const SecondSkinSection = () => {
  const [mode, setMode] = useState("copper");
  const [animStep, setAnimStep] = useState(0);
  const dark = useIsDark();

  useEffect(() => {
    const interval = setInterval(() => setAnimStep((s) => (s + 1) % 4), 1800);
    return () => clearInterval(interval);
  }, []);

  const LAYERS_COPPER = [
    { label: "A-Surface (Leather / Fabric)", thick: 2, color: "#8a7560" },
    { label: "Spacer Layer (Foam insulation)", thick: 5, color: "#B8B7A4" },
    { label: "Heating Layer (Metal wire — 5–13 mm total)", thick: 5, color: "#F07E26", highlight: true },
    { label: "Inner Layers", thick: 3, color: "#6a6a6a" },
  ];
  const LAYERS_VOLTCORE = [
    { label: "A-Surface (Leather / Fabric)", thick: 2, color: "#8a7560" },
    { label: "Voltcore Mesh/Textile — 2–3 mm total", thick: 2, color: "#D9FE42", highlight: true },
    { label: "Inner Layers", thick: 3, color: "#6a6a6a" },
  ];

  const layers = mode === "copper" ? LAYERS_COPPER : LAYERS_VOLTCORE;
  const totalThick = layers.reduce((s, l) => s + l.thick, 0);

  return (
    <section id="second-skin" className="w-full py-24 bg-[#f5f4f0] dark:bg-[#1a1a22] relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-12">
          <span className="text-xs font-black uppercase tracking-[0.22em] block mb-3 text-[#12503C] dark:text-[#D9FE42]">01 // Second Skin Architecture</span>
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-[0.95] max-w-2xl">
              Second skin<br />
              <span className="text-[#12503C] dark:text-[#D9FE42]">integration</span> makes a difference
            </h2>
            <p className="text-base text-[#14141B]/70 dark:text-[#B8B7A4] leading-relaxed max-w-md pt-2 leading-relaxed">
              We locate our heating element right under the A-surface without any insulation layer — the best thermal efficiency at
              <strong className="text-[#14141B] dark:text-white"> only 2–3 mm</strong> vs. the 5–13 mm envelope of a copper wire system.
            </p>
          </div>
        </Reveal>

        <Reveal delay={60} className="mb-8">
          <div className="relative rounded-3xl overflow-hidden border border-[#14141B]/8 dark:border-white/10 aspect-[21/9]">
            <SafeImage src={SecondSkinImg} alt="Second Skin Architecture comparison" color="#D9FE42" />
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {/* Layer stack diagram */}
          <Reveal delay={80} className="relative flex">
            <div className="flex-1 rounded-3xl p-6 border bg-white dark:bg-[#111118] border-[#14141B]/8 dark:border-white/10">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#12503C] dark:text-[#D9FE42]/70 mb-5">// Layer Stack Diagram</div>
              <div className="flex flex-col gap-1.5">
                {layers.map((layer, i) => {
                  const barH = Math.round((layer.thick / totalThick) * 170);
                  const isHot = layer.highlight && animStep % 2 === 0;
                  return (
                    <div key={i}
                      className="relative rounded-xl flex items-center gap-4 px-4 overflow-hidden transition-all duration-700"
                      style={{
                        height: barH + 20,
                        background: isHot ? `linear-gradient(90deg, ${layer.color}22, ${layer.color}44)` : `${layer.color}12`,
                        border: `1px solid ${layer.highlight ? layer.color + "60" : "rgba(120,120,120,0.15)"}`,
                        boxShadow: isHot ? `0 0 20px ${layer.color}30` : "none",
                      }}>
                      {layer.highlight && isHot && (
                        <div className="absolute inset-0 pointer-events-none" style={{
                          background: `linear-gradient(90deg, transparent, ${layer.color}25, transparent)`,
                          animation: "shimmer 1.5s ease-in-out infinite",
                        }} />
                      )}
                      <div className="w-3 h-3 rounded-full shrink-0 transition-all duration-500"
                        style={{ background: layer.color, boxShadow: isHot ? `0 0 12px ${layer.color}` : "none" }} />
                      <span className="text-[11px] font-bold text-[#14141B]/80 dark:text-white/80 relative z-10">{layer.label}</span>
                      <span className="ml-auto text-[10px] font-black shrink-0 relative z-10"
                        style={{ color: layer.highlight ? layer.color : (dark ? "rgba(255,255,255,0.3)" : "rgba(20,20,27,0.42)") }}>
                        {layer.thick} mm
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-5 flex items-center justify-between text-xs">
                <span className="text-[#14141B]/50 dark:text-[#B8B7A4]/50">Total stack thickness</span>
                <span className="font-black text-2xl transition-all duration-500" style={{ color: mode === "voltcore" ? "#D9FE42" : "#F07E26" }}>
                  {mode === "voltcore" ? "2–3 mm" : "5–13 mm"}
                </span>
              </div>
            </div>
            {mode === "voltcore" && (
              <div className="absolute -top-3 -right-3 bg-[#D9FE42] text-[#14141B] text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(217,254,66,0.5)]">
                −77% thinner
              </div>
            )}
          </Reveal>

          {/* Mode switch + video */}
          <div className="flex flex-col gap-4">
            <Reveal delay={100}>
              <div className="inline-flex rounded-full p-1 gap-1 bg-white dark:bg-white/5 border border-[#14141B]/10 dark:border-white/10">
                {[
                  { id: "copper", label: "Copper Wire System", color: "#F07E26" },
                  { id: "voltcore", label: "Voltcore System", color: "#D9FE42" },
                ].map(({ id, label, color }) => (
                  <button key={id} onMouseEnter={() => setMode(id)} onFocus={() => setMode(id)}
                    className="px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300"
                    style={{
                      background: mode === id ? color : "transparent",
                      color: mode === id ? "#14141B" : (dark ? "rgba(255,255,255,0.52)" : "rgba(20,20,27,0.52)"),
                      boxShadow: mode === id ? `0 0 20px ${color}40` : "none",
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>

            <Reveal delay={140} className="flex-1">
              <div className="rounded-3xl overflow-hidden border relative group bg-black/5 dark:bg-black/20 aspect-video w-full"
                style={{ borderColor: "rgba(148,195,86,0.25)" }}>
                <video src={An1Video} autoPlay loop muted playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${mode === "copper" ? "opacity-100" : "opacity-0"}`} />
                <video src={An2Video} autoPlay loop muted playsInline
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03] ${mode === "voltcore" ? "opacity-100" : "opacity-0"}`} />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(20,20,27,0.35), transparent 40%)" }} />
              </div>
            </Reveal>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { val: 3, unit: "mm", label: "Voltcore total stack thickness", prefix: "2–" },
            { val: 95, unit: "%", label: "Heat directed to A-surface", prefix: "" },
            { val: 2, unit: "×", label: "Less energy vs copper wire", prefix: "" },
            { val: 75, unit: "%", label: "CO₂ footprint vs copper", prefix: "−" },
          ].map(({ val, unit, label, prefix }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="rounded-2xl p-4 border transition-all duration-300 hover:-translate-y-1 hover:border-[#D9FE42]/40 hover:shadow-lg bg-white dark:bg-white/[0.03] border-[#14141B]/8 dark:border-white/10">
                <div className="text-2xl md:text-3xl font-black text-[#12503C] dark:text-[#D9FE42] mb-1">
                  <CountUp end={val} prefix={prefix} suffix={unit} decimals={val % 1 === 0 ? 0 : 1} />
                </div>
                <div className="text-[10px] text-[#14141B]/50 dark:text-[#B8B7A4]/60 uppercase tracking-wide">{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── PLATFORM SECTION ─────────────────────────────────────────────────────── */
const PlatformSection = ({ p, idx }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const dark = useIsDark();
  const isEven = idx % 2 === 0;

  return (
    <section className={`w-full py-20 relative overflow-hidden ${idx % 2 === 0 ? "bg-white dark:bg-[#14141B]" : "bg-[#f5f4f0] dark:bg-[#1a1a22]"}`}>
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${!isEven ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div>
            <Reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] block mb-3" style={{ color: p.color }}>{p.tag}</span>
              <div className="flex items-center gap-4 mb-4 flex-wrap">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase">{p.name}</h2>
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest"
                  style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}40` }}>
                  {p.trl}
                </span>
              </div>
              <p className="text-base leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4] leading-relaxed mb-6">{p.desc}</p>
            </Reveal>
            <Reveal delay={80}>
              <div className="flex gap-1 mb-6 p-1 rounded-full border border-[#14141B]/8 dark:border-white/8 w-fit"
                style={{ background: dark ? "#111118" : "#f0eee8" }}>
                {["overview", "specs"].map((tab) => (
                  <button key={tab} onMouseEnter={() => setActiveTab(tab)} onFocus={() => setActiveTab(tab)}
                    className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200"
                    style={{
                      background: activeTab === tab ? p.color : "transparent",
                      color: activeTab === tab ? "#14141B" : (dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"),
                    }}>
                    {tab === "overview" ? "Key Benefits" : "Specifications"}
                  </button>
                ))}
              </div>
            </Reveal>
            <Reveal delay={120} className="min-h-[220px]">
              {activeTab === "overview" ? (
                <ul className="space-y-3">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#14141B]/70 dark:text-[#B8B7A4]">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-black"
                        style={{ background: `${p.color}20`, color: p.color }}>{i + 1}</span>
                      {b}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  {p.specs.map(({ label, val }) => (
                    <div key={label} className="p-3 rounded-xl border"
                      style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)", background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}>
                      <div className="text-[9px] font-black uppercase tracking-wider mb-1"
                        style={{ color: dark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)" }}>{label}</div>
                      <div className="text-xs font-black" style={{ color: p.color }}>{val}</div>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>
          </div>
          <Reveal delay={60}>
            <div className="relative rounded-3xl overflow-hidden group aspect-[4/3]" style={{ boxShadow: `0 40px 80px ${p.color}15` }}>
              <SafeImage src={p.photo} alt={p.name} color={p.color}
                className="transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at 30% 70%, ${p.color}18, transparent 60%)` }} />
              <div className="absolute top-5 right-5 backdrop-blur-md rounded-full px-4 py-2 border"
                style={{ background: "rgba(0,0,0,0.6)", borderColor: `${p.color}40` }}>
                <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: p.color }}>{p.trl}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ─── PERFORMANCE PILLARS ─────────────────────────────────────────────────── */
const PILLAR_ACCENT = "#D9FE42";

const PillarCard = ({ pi, delay }) => (
  <Reveal delay={delay}>
    <div className="group relative p-6 rounded-3xl border overflow-hidden transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl cursor-default bg-[#111118] border-white/6">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
        style={{ boxShadow: `inset 0 0 0 1.5px ${PILLAR_ACCENT}60, 0 24px 60px ${PILLAR_ACCENT}14` }} />
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
        style={{ background: `${PILLAR_ACCENT}18`, color: PILLAR_ACCENT }}>{pi.icon}</div>
      <h3 className="text-xl font-black mb-4 tracking-tight text-white transition-colors duration-300 group-hover:text-[#D9FE42]">
        {pi.title}
      </h3>
      <ul className="space-y-3">
        {pi.points.map((pt, j) => (
          <li key={j} className="flex items-start gap-2.5 text-xs leading-relaxed text-[#B8B7A4]/70">
            <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: PILLAR_ACCENT }} />
            {pt}
          </li>
        ))}
      </ul>
      <div className="mt-6 h-[2px] rounded-full w-0 group-hover:w-full transition-all duration-500" style={{ background: PILLAR_ACCENT }} />
    </div>
  </Reveal>
);

const PillarsSection = () => (
  <section id="pillars" className="w-full py-24 bg-[#14141B] relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(217,254,66,0.05) 0%, transparent 60%)" }} />
    <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
      <Reveal className="mb-14">
        <span className="text-xs font-black uppercase tracking-[0.22em] block mb-3 text-[#D9FE42]">04 // Why Voltcore</span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
          Outperforming legacy<br /><span className="text-[#D9FE42]">on every dimension</span>
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {PILLARS.map((pi, i) => <PillarCard key={pi.title} pi={pi} delay={i * 100} />)}
      </div>
    </div>
  </section>
);

/* ─── POC TRACKER ─────────────────────────────────────────────────────────── */
const PocSection = () => {
  const [active, setActive] = useState("01");
  const dark = useIsDark();
  const cur = POC_SECTORS.find((s) => s.id === active);

  return (
    <section id="poc" className="w-full py-24 bg-[#f5f4f0] dark:bg-[#1a1a22] relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-10">
          <span className="text-xs font-black uppercase tracking-[0.22em] block mb-3" style={{ color: dark ? "#D9FE42" : "#12503C" }}>05 // Industry Pipeline</span>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight">
              Active Pipeline<br /><span style={{ color: dark ? "#D9FE42" : "#12503C" }}>Across 5 Industries</span>
            </h2>
            <div className="flex gap-6 text-xs flex-wrap">
              {[
                { dot: "#D9FE42", label: "Proof of Concept (PoC)" },
                { dot: "#F07E26", label: "Industrialization" },
                { dot: "#B8B7A4", label: "Commercialization/Series" },
              ].map(({ dot, label }) => (
                <span key={label} className="flex items-center gap-2 text-[#14141B]/60 dark:text-[#B8B7A4]/60">
                  <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-wrap gap-2 mb-8">
            {POC_SECTORS.map((s) => (
              <button key={s.id} onMouseEnter={() => setActive(s.id)} onFocus={() => setActive(s.id)}
                className="px-4 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300"
                style={{
                  background: active === s.id ? s.color : (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"),
                  color: active === s.id ? s.ink : (dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)"),
                  border: `1px solid ${active === s.id ? s.color : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`,
                  boxShadow: active === s.id ? `0 0 20px ${s.color}40` : "none",
                }}>
                [{s.id}] {s.label}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={active} className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <Reveal className="lg:col-span-2 rounded-3xl p-6 border space-y-5" style={{ background: dark ? "#111118" : "white", borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }}>
            <div className="text-[9px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: cur.color }}>// Pipeline Stage</div>
            {[
              { label: "Proof of Concept", val: cur.pocs, max: 20, color: "#D9FE42" },
              { label: "Industrialization", val: cur.jdas, max: 6, color: "#F07E26" },
              { label: "Commercialization", val: cur.commercial, max: 3, color: "#94C356" },
            ].map(({ label, val, max, color }) => (
              <div key={label}>
                <div className="flex justify-between items-baseline mb-1.5">
                  <span className="text-[10px] font-bold text-[#14141B]/70 dark:text-[#B8B7A4]">{label}</span>
                  <span className="text-lg font-black leading-none" style={{ color }}>{val}</span>
                </div>
                <div className="relative h-2.5 rounded-full overflow-hidden" style={{ background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)" }}>
                  <div className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000" style={{ width: `${Math.min((val / max) * 100, 100)}%`, background: color }} />
                </div>
              </div>
            ))}
          </Reveal>
          <Reveal delay={60} className="lg:col-span-1 rounded-3xl p-6 border" style={{ background: dark ? "#111118" : "white", borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }}>
            <div className="text-[9px] font-black uppercase tracking-[0.18em] mb-4" style={{ color: cur.color }}>// Applications</div>
            <ul className="space-y-3">
              {cur.apps.map((a) => (
                <li key={a} className="flex items-start gap-2 text-[11px] text-[#14141B]/70 dark:text-[#B8B7A4] leading-snug">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1" style={{ background: cur.color }} />
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-2 rounded-3xl p-6 border" style={{ background: dark ? "#111118" : "white", borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)" }}>
            <div className="text-[9px] font-black uppercase tracking-[0.18em] mb-4" style={{ color: cur.color }}>// Partners</div>
            <div className="flex flex-wrap gap-2">
              {cur.partners.map((p) => (
                <span key={p} className="px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all duration-200 cursor-default hover:scale-105"
                  style={{ background: `${cur.color}12`, borderColor: `${cur.color}30`, color: dark ? "rgba(255,255,255,0.85)" : "#14141B" }}>
                  {p}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#f5f4f0] dark:bg-[#0e0e14] border-t border-[#e8e6e0] dark:border-[#2a2a3a] px-10 pt-16 pb-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
      <div>
        <div className="text-sm font-black tracking-widest text-[#14141B] dark:text-white mb-3">VOLTCORE™</div>
        <p className="text-xs text-[#8a8880] leading-relaxed max-w-[200px] mb-5">
          Next-generation polymer matrix smart heating configurations replacing traditional metal wire infrastructures.
        </p>
        <div className="flex gap-2">
          {[
            { href: "https://www.linkedin.com/company/voltcore-tech/posts/?feedView=all", Icon: FaLinkedin },
            { href: "https://www.youtube.com/channel/UCpsmhxcP-_XRV9fFRuIZXCA", Icon: FaYoutube },
          ].map(({ href, Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-[#e8e6e0] dark:border-[#2a2a3a] flex items-center justify-center text-[#8a8880] transition-all duration-200 hover:border-[#D9FE42] hover:text-[#D9FE42]">
              <Icon size={12} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Sitemap</h4>
        <ul className="flex flex-col gap-2.5">
          {[["Home","/"],["Technology","/technology"],["Industries","/industries"],["About us","/about"],["News","/news"],["Contact","/contact"]].map(([l,to]) => (
            <li key={to}><Link to={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">{l}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Platforms</h4>
        <ul className="flex flex-col gap-2.5">
          {[["ActiveFil™","/technology"],["TargetHeat™","/technology"],["SensiTerm","/technology"]].map(([l,to]) => (
            <li key={l}><Link to={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">{l}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Contact HQ</h4>
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-2 text-[12px] text-[#8a8880]">
            <FaMapMarkerAlt className="text-[#D9FE42] mt-0.5 shrink-0" size={11} />
            <span>2, rue de l'Industrie,<br />L-7735 Bissen, Luxembourg</span>
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-[#D9FE42] shrink-0" size={11} />
            <a href="mailto:info@voltcore.tech" className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">info@voltcore.tech</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#e8e6e0] dark:border-[#2a2a3a] text-[10px] text-[#8a8880]/60">
      <span>© {new Date().getFullYear()} Voltcore™ S.A. All rights reserved. Registered trademark.</span>
      <div className="flex gap-5">
        <a href="#privacy" className="hover:text-[#14141B] dark:hover:text-white transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-[#14141B] dark:hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
const Technology = () => {
  const dark = useIsDark();

  return (
    <div className="w-full bg-white dark:bg-[#14141B] text-[#14141B] dark:text-white min-h-screen font-sans selection:bg-[#D9FE42] selection:text-[#14141B]"
      style={{ fontFamily: "'AkkuratLL', 'AkkuratLLWeb-Regular', 'Akkurat', -apple-system, sans-serif" }}>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section id="tech-hero" className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: "#D9FE42" }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background: "#94C356" }} />
          <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ background: "#4A5DA7" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pt-32 pb-24">
          <Reveal>
            <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-6 text-[#D9FE42]">
              03 // Technology Platform
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-6">
              Our Proprietary<br />
              <span style={{ color: "#D9FE42" }}>Material Stack</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-base leading-relaxed leading-relaxed max-w-2xl mb-10" style={{ color: "#B8B7A4" }}>
              Transforming surface heating from an inefficient, metal-dependent legacy framework into a highly
              sustainable, software-integrable deep-tech solution — built on advanced carbon nanotube nanocomposites.
            </p>
          </Reveal>
          <Reveal delay={260} className="flex flex-wrap gap-4 mb-16">
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_0_30px_rgba(217,254,66,0.25)]"
              style={{ background: "#D9FE42", color: "#14141B" }}>
              Request Samples <FaArrowRight size={9} />
            </Link>
            <Link to="/about"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 text-white hover:border-white/50 transition-all duration-300">
              About Voltcore <FaArrowRight size={9} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── 01 SECOND SKIN ───────────────────────────────────────────────── */}
      <SecondSkinSection />

      {/* ── 02 ARCHITECTURE (full-bleed, scroll-revealed) ────────────────── */}
      <SchemaSection />

      {/* ── 03 PLATFORMS ──────────────────────────────────────────────────── */}
      <div id="platforms">
        <div className="pt-16 pb-8 bg-white dark:bg-[#14141B]">
          <Reveal className="container mx-auto px-6 md:px-12 max-w-6xl">
            <span className="text-xs font-black uppercase tracking-[0.22em] block mb-3 text-[#12503C] dark:text-[#D9FE42]">
              03 // Technology Platforms
            </span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase">
              Three platforms,<br />
              <span style={{ color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)" }}>one material stack</span>
            </h2>
          </Reveal>
        </div>
        {PLATFORMS.map((p, i) => <PlatformSection key={p.id} p={p} idx={i} />)}
      </div>

      {/* ── 04 PILLARS ────────────────────────────────────────────────────── */}
      <PillarsSection />

      {/* ── 05 POC PIPELINE ───────────────────────────────────────────────── */}
      <PocSection />

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="relative py-24 text-center flex flex-col items-center gap-6 overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(217,254,66,0.06) 0%, transparent 70%)" }} />
        <Reveal>
          <div className="text-xs tracking-[0.18em] uppercase text-[#D9FE42] font-bold mb-2">// Partner with us</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight max-w-2xl mx-auto mb-4">
            Ready to integrate Voltcore™?
          </h2>
          <p className="text-base text-[#B8B7A4]/50 max-w-lg mx-auto mb-8 leading-relaxed leading-relaxed">
            Request detailed technology specifications, discuss custom geometry integrations, or order your material samples today.
          </p>
          <Link to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#D9FE42] text-[#14141B] rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(217,254,66,0.2)] hover:bg-white">
            Contact Our Team <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      <Footer />

      <style>{`
        @keyframes shimmer {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default Technology;
