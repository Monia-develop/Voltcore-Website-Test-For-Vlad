import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaLinkedin, FaYoutube,
  FaEnvelope, FaMapMarkerAlt,
} from "react-icons/fa";
import CarSeatImg       from  "../assets/website/industries/CarSeatHeating.png";
import FoodDeliveryImg  from  "../assets/website/industries/FoodDelivery.png";
import HeatedApparelImg from  "../assets/website/industries/Heated-Apparel.png";
import UnderfloorImg    from  "../assets/website/industries/Underfloor-Heating.png";
import DefenseImg       from  "../assets/website/industries/Defense.png";
import TargetHeatImg    from  "../assets/website/platforms/BRD-02-targetheat.png";
import ActiveFilImg     from  "../assets/website/platforms/BRD-03-activefil.png";
import SensiTermImg     from  "../assets/website/platforms/BRD-04-sensiterm.png";
import HeroVideo from "../assets/voltcore-hero.mp4";

// Team photos - same as About.jsx
import FabricePhoto from "../assets/website/team/Fabrice.png";
import VladPhoto from "../assets/website/team/vlad.png";
import DariaPhoto from "../assets/website/team/Daria.png";

const METRICS = [
  { val: "−75% ",      numPrefix: "− ",      numEnd:75, numSuffix: "% ",   label: "CO₂ footprint vs copper ",     sub: "Third-party LCA validated ",        barColor: "#D9FE42", glowColor: "rgba(217,254,66,0.18)"  },
  { val: "Up to 2x ",  numPrefix: "Up to  ", numEnd:2,  numSuffix: "× ",   label: "Less energy consumption ",     sub: "Versus conventional alternatives ", barColor: "#D9FE42", glowColor: "rgba(217,254,66,0.18)"  },
  { val: "3 min ",     numPrefix: " ",       numEnd:3,  numSuffix: " min ",label: "To reach target temperature ", sub: "Zero thermal lag ",                 barColor: "#D9FE42", glowColor: "rgba(217,254,66,0.18)"  },
];

const PLATFORMS = [
  { name: "ActiveFil™",  tag: "Core material",    desc: "CNT-enhanced conductive polymer filaments offering controlled resistivity in a flexible, lightweight, and extrusion-ready format.", accent: "#D9FE42", image:ActiveFilImg  },
  { name: "TargetHeat™", tag: "Heating platform",  desc: "Fabric-integrated electrical heating solution generating highly efficient, uniform heat distribution (ΔT∼4°C) across complex geometries.", accent: "#D9FE42", image:TargetHeatImg },
  { name: "SensiTerm",   tag: "Sensing + heating", desc: "Advanced fabric platform co-designing electrical heating and intrinsic resistance-based sensing for zoned control and occupancy detection without external sensors.", accent: "#D9FE42", image:SensiTermImg  },
];

const INDUSTRIES = [
  { slug: "automotive",         num: "01", title: "Automotive",           tagline: "Extending EV winter driving range by up to 13% through energy-efficient cabin comfort and localized surface heating.", detail: "Seat, panel, and console heating elements that warm the cabin in seconds, not minutes — engineered to recover the range legacy resistive heating costs an EV.", stat: "+13% EV winter range", image:CarSeatImg,       accent: "#12503B" },
  { slug: "thermal-logistics",  num: "02", title: "Food & Delivery",      tagline: "Active, ultra-lightweight heating inserts maintaining safe food delivery temperatures (≥65°C) for over 3 hours.", detail: "Thin, flexible heating inserts built into delivery bags and food carriers — holding serving temperature across a full shift without bulk or hot spots.", stat: "3h+ heat retention", image:FoodDeliveryImg,  accent: "#12503B" },
  { slug: "heated-apparel",     num: "03", title: "Heated Apparel",       tagline: "Wire-free, weightless warmth for outdoor gear and safety workwear, optimizing battery runtime.", detail: "CNT polymer filaments replace copper wiring inside jackets, vests, and gloves — uniform warmth with none of the stiffness, bulk, or failure points of wire.", stat: "2× battery runtime", image:HeatedApparelImg, accent: "#12503B" },
  { slug: "floorheating",       num: "04", title: "Underfloor Heating",   tagline: "Zero-lag underfloor heating mats reaching 28°C in 3 minutes — up to 4× less energy than conventional alternatives.", detail: "Low-mass heating mats that respond almost instantly under tile, wood, or laminate — none of the thermal lag or standby losses of cable systems.", stat: "4× less energy", image:UnderfloorImg,    accent: "#12503B" },
  { slug: "defense",            num: "05", title: "Defense",              tagline: "Specialized, low-observable thermal support and electromagnetic solutions — available only under NDA.", detail: "Custom thermal signature and electromagnetic engineering for defense and government programs. Specifications shared under NDA.", stat: "NDA Required", image:DefenseImg,       accent: "#12503B" },
];

// News from About.jsx - Press articles
const NEWS = [
  {
    source: "Forbes Luxembourg",
    date: "January 2025",
    title: "Luxembourg's Voltcore Heats Up EV Innovation Across Europe",
    summary: "Voltcore is scaling its conductive polymer technology from Luxembourg, with growing traction in the automotive sector and plans to convert pilot engagements into confirmed OEM programs.",
    link: "https://www.forbes.lu/luxembourg-voltcore-heats-up-ev-innovation-across-europe/",
  },
  {
    source: "Silicon Luxembourg",
    date: "May 2024",
    title: "Voltcore Reveals 'Last-Mile' Plans For Its Unique Green Heating Technology",
    summary: "An in-depth profile on founder Vlad Batkhin and the company's roadmap: from pilot plant ambitions to first sales, and a Q3 2025 fundraising round to scale production volumes.",
    link: "https://www.siliconluxembourg.lu/voltcore-reveals-last-mile-plans-for-its-unique-green-heating-technology/",
  },
  {
    source: "Chronicle.lu",
    date: "October 2024",
    title: "Luxembourg Startup Launches TargetHeat Energy-Efficient Heating Technology",
    summary: "Voltcore officially launches TargetHeat at Batimat Paris — a new generation of unidirectional heating materials using 40% less energy than best-in-class solutions.",
    link: "https://chronicle.lu/category/energy/51712-luxembourg-startup-launches-targetheat-energy-efficient-heating-technology",
  },
];

const TEAM = [
  { name: "Fabrice Bertinchamps", role: "Co-founder & CEO", photo: FabricePhoto },
  { name: "Vlad Batkhin",         role: "Co-founder & CTO", photo: VladPhoto },
  { name: "Daria Voronina",       role: "Sustainability & BD", photo: DariaPhoto },
];

const WORDS = ["GO GREEN.", "DRIVE SMART.", "HEAT EFFICIENTLY."];

const Reveal = ({ children, delay = 0, className = "" }) => {
  const [v, setV] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0) scale(1)" : "translateY(42px) scale(0.96)", transition: `opacity 0.8s ${delay}ms ease, transform 0.8s ${delay}ms cubic-bezier(0.22,1,0.36,1)`, willChange: "opacity, transform" }}>
      {children}
    </div>
  );
};

const CountUp = ({ end, duration = 1300, prefix = "", suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) {
        setStarted(true);
        const startTime = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(end * eased);
          if (progress < 1) requestAnimationFrame(animate);
          else setCount(end);
        };
        animate(startTime);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration, started]);
  return <span ref={ref}>{prefix}{count.toFixed(decimals)}{suffix}</span>;
};

const MetricCard = ({ m, idx }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripple, setRipple] = useState(null);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const handleClick = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setRipple({ x: e.clientX - r.left, y: e.clientY - r.top });
    setTimeout(() => setRipple(null), 600);
  };
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="group relative overflow-hidden rounded-2xl cursor-default bg-black/50 backdrop-blur-md border border-white/10"
      style={{
        borderTopWidth: 3,
        borderTopColor: m.barColor,
        boxShadow: hovered ? `0 20px 50px ${m.glowColor}` : "0 4px 12px rgba(0,0,0,0.3)",
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? (hovered ? "-6px" : "0") : "24px"})`,
        transition: `opacity 0.6s ${idx * 120}ms, transform 0.6s ${idx * 120}ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s`,
      }}
    >
      <div className="absolute top-0 right-0 pointer-events-none rounded-full" style={{ width: 120, height: 120, top: -30, right: -30, background: `radial-gradient(circle, ${m.barColor}30, transparent 70%)`, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
      {ripple && <div className="absolute pointer-events-none rounded-full" style={{ left: ripple.x - 50, top: ripple.y - 50, width: 100, height: 100, background: `${m.barColor}25`, animation: "rippleOut 0.6s ease-out forwards" }} />}
      <div className="p-5 relative z-10">
        <div className="text-4xl font-black tracking-tighter mb-2 text-white" style={{ color: hovered ? m.barColor : undefined }}>
          {visible ? <CountUp prefix={m.numPrefix} end={m.numEnd} suffix={m.numSuffix} /> : <span>{m.numPrefix}0{m.numSuffix}</span>}
        </div>
        <div className="text-[11px] font-bold uppercase tracking-widest text-white/80 mb-1">{m.label}</div>
        <div className="text-[10px] text-[#B8B7A4]/60">{m.sub}</div>
        <div className="mt-3 h-px bg-white/10 rounded-full overflow-hidden">
          <div style={{ height: "100%", background: m.barColor, width: hovered ? "100%" : "28%", transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)" }} />
        </div>
      </div>
    </div>
  );
};

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(scrolled, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[3px] pointer-events-none">
      <div
        className="h-full origin-left"
        style={{
          transform: `scaleX(${progress})`,
          background: "linear-gradient(90deg, #D9FE42, #94C356)",
          transition: "transform 0.1s linear",
        }}
      />
    </div>
  );
};

// Professional Industry Section - NO dots/navigation line, more dynamic
const IndustrySection = () => {
  const [active, setActive] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const current = INDUSTRIES[active];

  return (
    <section id="industries" className="px-10 py-24 bg-white dark:bg-[#14141B]">
      <Reveal>
        <div className="text-xs tracking-[0.18em] uppercase font-bold mb-4 text-[#12503C] dark:text-[#D9FE42]">03 // Industry presence</div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight mb-16 max-w-3xl">
          Tailored thermal performance{" "}
          <span className="text-[#14141B]/20 dark:text-white/20">for global industrial scales</span>
        </h2>
      </Reveal>

      <div className="container mx-auto max-w-7xl">
        <div className="hidden md:grid grid-cols-12 gap-12">
          {/* Left side - Industry list with details */}
          <div className="col-span-5">
            <div className="border-t border-[#14141B]/15 dark:border-white/10">
              {INDUSTRIES.map((ind, i) => {
                const isActive = active === i;
                return (
                  <Reveal key={ind.slug} delay={i * 70}>
                    <div
                      onMouseEnter={() => { setActive(i); setHoveredIndex(i); }}
                      onMouseLeave={() => setHoveredIndex(null)}
                      className="border-b border-[#14141B]/15 dark:border-white/10 cursor-pointer group/industry"
                    >
                      <Link
                        to={`/industries/${ind.slug}`}
                        className="flex items-start justify-between gap-6 py-7"
                      >
                        <div className="flex items-baseline gap-5 min-w-0">
                          <span className="text-xs font-mono tabular-nums transition-colors duration-300 shrink-0" style={{ color: isActive ? "#D9FE42" : undefined }}>{ind.num}</span>
                          <div className="min-w-0">
                            <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-300 group-hover/industry:translate-x-2" style={{ color: isActive ? "#D9FE42" : undefined }}>
                              {ind.title}
                            </h3>
                            <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}>
                              <div className="overflow-hidden">
                                <p className="text-sm text-[#5C6654] dark:text-[#B8B7A4] leading-relaxed pt-2 pr-4">{ind.detail}</p>
                                <span className="inline-block mt-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1 transition-all duration-300 hover:scale-105" style={{ color: "#D9FE42", background: `rgba(217,254,66,0.1)`, border: `1px solid rgba(217,254,66,0.3)` }}>{ind.stat}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <FaArrowRight size={16} className="shrink-0 mt-2 transition-all duration-300 group-hover/industry:translate-x-2" style={{ color: isActive ? "#D9FE42" : "currentColor", opacity: isActive ? 1 : 0.25 }} />
                      </Link>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          {/* Right side - Featured image with enhanced animations */}
          <div className="col-span-7">
            <div className="sticky top-28">
              <Reveal delay={250}>
                <Link to={`/industries/${current.slug}`} className="relative block w-full h-[600px] rounded-3xl overflow-hidden bg-[#14141B] group/image" style={{ boxShadow: `0 30px 80px -30px rgba(217,254,66,0.25)` }}>
                  {INDUSTRIES.map((ind, i) => (
                    <img
                      key={ind.slug}
                      src={ind.image}
                      alt={ind.title}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out"
                      style={{ 
                        opacity: active === i ? 1 : 0,
                        transform: active === i ? "scale(1)" : "scale(1.05)",
                        filter: active === i ? "brightness(1)" : "brightness(0.8)"
                      }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10 transition-opacity duration-700" />
                  
                  {/* Animated corner accent */}
                  <div className="absolute top-0 right-0 w-40 h-40 transition-all duration-700" style={{ 
                    background: `radial-gradient(circle, rgba(217,254,66,0.15) 0%, transparent 70%)`,
                    transform: `scale(${active + 1})`,
                    opacity: 0.6
                  }} />
                  
                  <span className="absolute top-7 right-7 text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 backdrop-blur-sm transition-all duration-500 hover:scale-110 cursor-pointer" style={{ color: "#D9FE42", background: `rgba(217,254,66,0.12)`, border: `1px solid rgba(217,254,66,0.35)` }}>{current.stat}</span>
                  <span className="absolute top-7 left-7 text-[120px] leading-none font-black text-white/[0.06] select-none tracking-tighter transition-all duration-500" style={{ transform: `translateY(${active * 10}px)` }}>{current.num}</span>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-6">
                    <p className="text-white text-lg md:text-xl font-medium leading-snug max-w-md transition-all duration-500" style={{ transform: `translateY(${active * 5}px)` }}>{current.tagline}</p>
                    <span className="flex items-center gap-2 shrink-0 text-xs font-black uppercase tracking-widest pb-1 transition-all duration-300 group-hover/image:gap-4" style={{ color: "#D9FE42" }}>
                      Explore <FaArrowRight size={10} className="transition-transform duration-300" />
                    </span>
                  </div>

                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div className="h-full bg-[#D9FE42] transition-all duration-500" style={{ width: `${((active + 1) / INDUSTRIES.length) * 100}%` }} />
                  </div>
                </Link>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Mobile view */}
        <div className="md:hidden flex flex-col gap-4">
          {INDUSTRIES.map((ind) => (
            <Link key={ind.slug} to={`/industries/${ind.slug}`} className="relative block w-full h-[300px] rounded-2xl overflow-hidden bg-[#14141B] group">
              <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              <span className="absolute top-5 left-5 text-xs font-mono text-white/50">{ind.num}</span>
              <span className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 transition-all duration-300 group-hover:scale-110" style={{ color: "#D9FE42", background: `rgba(217,254,66,0.12)`, border: `1px solid rgba(217,254,66,0.35)` }}>{ind.stat}</span>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">{ind.title}</h3>
                <p className="text-zinc-300 text-sm leading-relaxed mb-3">{ind.tagline}</p>
                <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: "#D9FE42" }}>
                  Explore <FaArrowRight size={10} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-16 text-center">
            <Link to="/industries" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#12503C] dark:text-[#D9FE42] hover:text-[#14141B] dark:hover:text-white transition-colors">
              View All Industries <FaArrowRight size={10} className="transition-transform group-hover:translate-x-2" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const PlatformRow = ({ p }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-1 lg:grid-cols-[1fr_280px] relative overflow-hidden"
      style={{ background: hovered ? "#181820" : "#111118", transition: "background 0.3s" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: p.accent, transform: hovered ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
      <div className="p-10 border-b lg:border-b-0 lg:border-r border-white/5 pl-12">
        <div className="text-xs font-bold tracking-[0.18em] uppercase mb-2" style={{ color: p.accent }}>// {p.tag}</div>
        <h3 className="text-3xl font-black tracking-tight mb-3 transition-colors duration-300" style={{ color: hovered ? p.accent : "#ffffff" }}>{p.name}</h3>
        <p className="text-sm text-[#B8B7A4]/60 leading-relaxed max-w-lg">{p.desc}</p>
        <div className="mt-5 h-[2px] rounded-full" style={{ width: hovered ? 64 : 24, background: p.accent, transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
      </div>
      <div className="flex items-center justify-center p-8 bg-black/40 min-h-[160px]">
        <img src={p.image} alt={p.name} className="max-h-[110px] w-auto object-contain"
          style={{ opacity: hovered ? 1 : 0.6, transform: hovered ? "scale(1.1) rotate(-2deg)" : "scale(1) rotate(0deg)", filter: hovered ? `drop-shadow(0 0 20px ${p.accent}60)` : "none", transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s, filter 0.4s" }}
        />
      </div>
    </div>
  );
};

const NewsRow = ({ n }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <a href={n.link} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-[90px_1fr_44px] items-center gap-6 py-7 border-b border-[#e8e6e0] dark:border-[#2a2a3a] relative overflow-hidden"
      style={{ textDecoration: "none" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(217,254,66,0.04)", opacity: hovered ? 1 : 0, transition: "opacity 0.25s" }} />
      <div className="text-[11px] text-[#8a8880] tracking-wide font-medium relative z-10">{n.date}</div>
      <div className="relative z-10">
        <span className="inline-block text-[10px] tracking-[0.12em] uppercase font-bold text-[#12503C] dark:text-[#D9FE42] bg-[#12503C]/10 dark:bg-[#D9FE42]/10 px-2.5 py-0.5 rounded-full mb-2">{n.source}</span>
        <div className="text-base font-semibold tracking-tight mb-1.5 transition-colors duration-200 text-[#14141B] dark:text-white" style={{ color: hovered ? "#D9FE42" : undefined }}>{n.title}</div>
        <div className="text-sm text-[#8a8880] leading-relaxed">{n.summary}</div>
      </div>
      <div className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300"
        style={{ borderColor: hovered ? "#D9FE42" : "#e8e6e0", color: hovered ? "#D9FE42" : "#c0beb8", transform: hovered ? "translateX(4px) scale(1.1)" : "translateX(0) scale(1)", background: hovered ? "rgba(217,254,66,0.08)" : "transparent" }}
      >
        <FaArrowRight size={12} />
      </div>
    </a>
  );
};

// TeamCard with photos like in About.jsx
const TeamCard = ({ m, delay = 0 }) => {
  const acc = "#D9FE42";
  const initials = m.name.split(" ").map((p) => p[0]).slice(0, 2).join("");

  return (
    <Reveal delay={delay}>
      <article className="group relative flex items-start gap-6 rounded-3xl p-6 md:p-7 border overflow-hidden transition-all duration-400 cursor-default bg-black border-white/10 hover:shadow-2xl hover:-translate-y-1 hover:border-white/20">
        {/* Glow radial au hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 0% 0%, ${acc}15, transparent 60%)` }} />
        
        {/* Photo container - même noir que la carte */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" 
            style={{ background: acc }} />
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black">
            {m.photo ? (
              <img 
                src={m.photo} 
                alt={m.name} 
                className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-2xl" 
                style={{ background: acc, color: "#000000" }}>
                {initials}
              </div>
            )}
          </div>
        </div>
        
        {/* Info */}
        <div className="relative z-10 min-w-0 flex-1">
          <span className="inline-block mb-2 rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.16em]"
            style={{ background: `${acc}22`, color: acc }}>Leadership</span>
          <h3 className="text-xl font-black tracking-tight text-white truncate">{m.name}</h3>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.06em] text-white/70">{m.role}</p>
        </div>
      </article>
    </Reveal>
  );
};

const Home = () => {
  const [wordIdx, setWordIdx]   = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting]   = useState(false);
  const [speed, setSpeed]         = useState(150);
  useEffect(() => {
    const full = WORDS[wordIdx];
    const tick = () => {
      if (!deleting) {
        setDisplayed(full.substring(0, displayed.length + 1));
        setSpeed(150);
        if (displayed === full) { setSpeed(2000); setDeleting(true); }
      } else {
        setDisplayed(full.substring(0, displayed.length - 1));
        setSpeed(75);
        if (displayed === "") { setDeleting(false); setWordIdx(p => (p + 1) % WORDS.length); }
      }
    };
    const t = setTimeout(tick, speed);
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx, speed]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
  };

  const [cursor, setCursor] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white dark:bg-[#14141B] text-[#14141B] dark:text-[#B8B7A4] min-h-screen overflow-x-hidden font-['AkkuratLL',_sans-serif] selection:bg-[#D9FE42] selection:text-[#14141B]">
      <ScrollProgress />
      <div className="fixed pointer-events-none z-50 rounded-full mix-blend-screen" 
        style={{ 
          width: 650, 
          height: 650, 
          left: cursor.x - 325, 
          top: cursor.y - 325, 
          background: "radial-gradient(circle, rgba(217,254,66,0.06) 0%, transparent 65%)" 
        }} 
      />
      <section
        id="hero"
        className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#14141B] text-white"
        onMouseMove={handleMouseMove}
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-60">
            <source src={HeroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(20,20,27,0.55) 0%, rgba(20,20,27,0.25) 50%, rgba(20,20,27,0.65) 100%)" }} />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: "#D9FE42" }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background: "#94C356" }} />
          <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ background: "#4A5DA7" }} />
        </div>
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
            transition: "transform 0.6s cubic-bezier(0.1, 0.8, 0.2, 1)",
          }}
        />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pt-32 pb-24 w-full">
          <Reveal>
            <div className="inline-flex items-center gap-2 mb-6 bg-black/40 border border-white/10 px-4 py-1.5 rounded-full w-fit backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D9FE42] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#D9FE42]" />
              </span>
              <span className="text-[11px] tracking-[0.16em] uppercase text-white/90 font-medium">Advanced Materials — Bissen</span>
            </div>
          </Reveal>
          <Reveal delay={40}>
            <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-6 text-[#D9FE42]">
              {displayed}<span className="animate-pulse ml-px">|</span>
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1
              className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] text-white uppercase mb-6"
              style={{ transform: `translate(${mouse.x * -12}px, ${mouse.y * -6}px)`, transition: "transform 0.2s ease-out" }}
            >
              Heat Smart <br />
              <span style={{ color: "#D9FE42" }}>Go Green</span>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "#B8B7A4" }}>
              Voltcore is an advanced materials company. Our mission is to create the most sustainable and energy-efficient surface{" "}
              <strong className="text-white font-black">HEATING SOLUTIONS.</strong>
            </p>
          </Reveal>
          <Reveal delay={260} className="flex flex-wrap gap-4 mb-16">
            <Link
              to="/technology"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_0_30px_rgba(217,254,66,0.25)]"
              style={{ background: "#D9FE42", color: "#14141B" }}
            >
              Discover Our Technology <FaArrowRight size={9} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 text-white hover:border-white/50 transition-all duration-300"
            >
              Contact Us <FaArrowRight size={9} />
            </button>
          </Reveal>
          <Reveal delay={340}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl">
              {METRICS.map((m, i) => <MetricCard key={m.label} m={m} idx={i} />)}
            </div>
          </Reveal>
        </div>
      </section>
      <section id="who-we-are" className="px-10 py-24 bg-white dark:bg-[#14141B]">
        <Reveal>
          <div className="text-xs tracking-[0.18em] uppercase font-bold mb-4 text-[#12503C] dark:text-[#D9FE42]">01 // Who we are</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight mb-5 max-w-2xl">
            Deep-tech advanced materials,{" "}
            <span className="text-[#14141B]/20 dark:text-white/20">built in Luxembourg.</span>
          </h2>
          <p className="text-base text-[#4a4a46] dark:text-[#B8B7A4]/70 leading-relaxed max-w-2xl">
            Based in the deep-tech hub of Luxembourg, Voltcore™ is a pioneering advanced materials company that eliminates the weight, cost, and design limitations of traditional metal heating elements. By integrating conductive nanofillers directly into standard polymer matrices, we deliver uniform, flexible, and highly energy-efficient smart surfaces designed for seamless industrial scale-up.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8e6e0] dark:bg-[#2a2a3a] mt-16 rounded-2xl overflow-hidden border border-[#e8e6e0] dark:border-[#2a2a3a]">
          <Reveal delay={0} className="bg-white dark:bg-[#1a1a22] p-10 group">
            <div className="text-6xl font-black tracking-tighter text-[#14141B] dark:text-white mb-2 inline-block transition-transform duration-300 group-hover:scale-110 group-hover:text-[#D9FE42]"><CountUp end={2024} duration={1400} /></div>
            <div className="text-xs tracking-[0.12em] uppercase text-[#8a8880] font-semibold">Founded</div>
          </Reveal>
          <Reveal delay={80} className="bg-white dark:bg-[#1a1a22] p-10 group">
            <div className="text-6xl font-black tracking-tighter text-[#D9FE42] mb-2 inline-block transition-transform duration-300 group-hover:scale-110"><CountUp end={5} duration={1000} /></div>
            <div className="text-xs tracking-[0.12em] uppercase text-[#8a8880] font-semibold">Active industries</div>
          </Reveal>
          <Reveal delay={120} className="bg-white dark:bg-[#1a1a22] p-10">
            {[
              { key:"Founded",           val:"2024" },
              { key:"HQ",                val:"Luxembourg" },
              { key:"Trademarks",        val:"Voltcore™ · TargetHeat™ · ActiveFil™" },
              { key:"Active Industries", val:"Automotive · Food & Delivery · Heated Apparel · Underfloor Heating · Defense" },
            ].map(f => (
              <div key={f.key} className="flex justify-between items-baseline py-3.5 border-b border-[#e8e6e0] dark:border-[#2a2a3a] text-sm last:border-0">
                <span className="text-[#8a8880] font-medium">{f.key}</span>
                <span className="text-[#14141B] dark:text-[#B8B7A4] font-semibold text-right max-w-[55%]">{f.val}</span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={160} className="bg-[#B8B7A4] dark:bg-[#14141B] p-10 flex flex-col justify-between">
            <div>
              <div className="text-4xl text-[#12503C] dark:text-[#D9FE42] font-black leading-none mb-5">"</div>
              <p className="text-base text-[#14141B]/70 dark:text-[#B8B7A4] leading-relaxed">
                Third-party Life Cycle Assessments validate our mono-material polymer approach for total end-of-life recyclability and a carbon footprint up to{" "}
                <span className="text-[#12503C] dark:text-[#D9FE42] font-bold inline-block transition-transform duration-300 hover:scale-110 cursor-default">75% lower than copper</span> alternatives.
              </p>
            </div>
            <a href="https://www.forbes.lu/luxembourg-voltcore-heats-up-ev-innovation-across-europe/" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 mt-8 px-5 py-2.5 bg-[#D9FE42] text-[#14141B] rounded-full text-[11px] font-black uppercase tracking-wider w-fit transition-all duration-200 hover:opacity-85 hover:scale-105"
            >
              Read on Forbes <FaArrowRight size={9} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
      <section id="technology" className="px-10 py-24" style={{ background: "#14141B" }}>
        <Reveal>
          <div className="text-xs tracking-[0.18em] uppercase font-bold mb-4 text-[#12503C] dark:text-[#D9FE42]">02 // Technology platforms</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
              Our proprietary{" "}
              <span className="text-white/20">material stack</span>
            </h2>
            <p className="text-sm text-[#B8B7A4]/60 leading-relaxed max-w-sm">
              Discover Voltcore™'s proprietary technology platforms built on advanced polymer science, designed to meet the exact requirements of OEMs, Tier-1s, and engineers.
            </p>
          </div>
        </Reveal>
        <div className="flex flex-col gap-px border border-white/5 rounded-2xl overflow-hidden">
          {PLATFORMS.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}><PlatformRow p={p} /></Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <Link to="/technology" className="group inline-flex items-center gap-2 mt-10 text-[11px] font-black uppercase tracking-widest text-[#D9FE42] hover:text-white transition-colors">
            Discover Our Technology Platform <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>
      
      {/* New Professional Industry Section */}
      <IndustrySection />
      
      <section id="news" className="px-10 py-24 bg-[#f5f4f0] dark:bg-[#1a1a22] border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
        <Reveal>
          <div className="text-xs tracking-[0.18em] uppercase font-bold mb-4 text-[#12503C] dark:text-[#D9FE42]">04 // News & recognition</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight mb-0">Latest from Voltcore™</h2>
        </Reveal>
        <div className="mt-14 border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
          {NEWS.map((n, i) => <Reveal key={n.title} delay={i * 80}><NewsRow n={n} /></Reveal>)}
        </div>
        <Reveal delay={280}>
          <div className="mt-10 text-center">
            <Link to="/about#press" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#12503C] dark:text-[#D9FE42] hover:text-[#14141B] dark:hover:text-white transition-colors">
              See All News <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>
      <section className="px-10 py-20 bg-white dark:bg-[#14141B] border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
        <Reveal>
          <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-5">
            <div className="text-xs tracking-[0.18em] uppercase font-bold text-[#12503C] dark:text-[#D9FE42]">// Newsletter</div>
            <h3 className="text-3xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase">Stay Ahead in Thermal Innovation.</h3>
            <p className="text-sm text-[#8a8880] leading-relaxed">Sign up to receive our technical whitepapers, materials updates, and corporate rollouts.</p>
            <div className="flex gap-2 w-full max-w-md">
              <input type="email" placeholder="Enter your corporate email"
                className="flex-1 px-5 py-3 text-[13px] rounded-full border border-[#e8e6e0] dark:border-[#2a2a3a] bg-[#f5f4f0] dark:bg-[#1a1a22] text-[#14141B] dark:text-[#B8B7A4] outline-none focus:border-[#D9FE42] transition-colors"
              />
              <button className="px-6 py-3 bg-[#14141B] dark:bg-[#D9FE42] text-white dark:text-[#14141B] rounded-full text-[12px] font-black uppercase tracking-wider whitespace-nowrap hover:bg-[#D9FE42] hover:text-[#14141B] transition-all duration-200 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>
      </section>
      <section id="leadership" className="px-10 py-24 bg-[#f5f4f0] dark:bg-[#1a1a22] border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
        <Reveal>
          <div className="flex justify-between items-end mb-14">
            <div>
              <div className="text-xs tracking-[0.18em] uppercase font-bold mb-4 text-[#12503C] dark:text-[#D9FE42]">05 // Leadership</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight">People behind Voltcore™</h2>
            </div>
            <Link to="/about#team" className="group inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#12503C] dark:text-[#D9FE42] hover:text-[#14141B] dark:hover:text-white transition-colors">
              Meet the full team <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TEAM.map((m, i) => <TeamCard key={m.name} m={m} delay={i * 80} />)}
        </div>
      </section>
      <section id="contact-form" className="px-10 py-24 bg-white dark:bg-[#14141B] border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-black tracking-tighter mb-6 uppercase text-[#14141B] dark:text-white">Contact us</h2>
          <p className="text-lg mb-12 text-[#4a4a46] dark:text-[#B8B7A4]/70">Ready to take the next step? Fill out our feedback form to order or ask questions!</p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="name" className="bg-transparent border-b border-black dark:border-white/20 py-2 outline-none text-[#14141B] dark:text-white" />
            <input type="email" placeholder="email" className="bg-transparent border-b border-black dark:border-white/20 py-2 outline-none text-[#14141B] dark:text-white" />
            <input type="tel" placeholder="phone" className="bg-transparent border-b border-black dark:border-white/20 py-2 outline-none text-[#14141B] dark:text-white" />
            <input type="text" placeholder="subject" className="bg-transparent border-b border-black dark:border-white/20 py-2 outline-none text-[#14141B] dark:text-white" />
            <textarea placeholder="message" className="col-span-1 md:col-span-2 bg-transparent border-b border-black dark:border-white/20 py-2 outline-none text-[#14141B] dark:text-white" rows="4"></textarea>
            <div className="col-span-1 md:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-4">
              <label className="text-sm text-[#4a4a46] dark:text-[#B8B7A4]/70"><input type="checkbox" className="mr-2" /> By submitting the form, you agree to the privacy policy</label>
              <button type="submit" className="bg-[#12503B] text-white px-10 py-3 rounded-full font-black uppercase tracking-widest hover:opacity-90 transition-all">Send →</button>
            </div>
          </form>
        </div>
      </section>
      <footer className="bg-[#f5f4f0] dark:bg-[#0e0e14] border-t border-[#e8e6e0] dark:border-[#2a2a3a] px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div>
            <div className="text-sm font-black tracking-widest text-[#14141B] dark:text-white mb-3">VOLTCORE™</div>
            <p className="text-xs text-[#8a8880] leading-relaxed max-w-[200px] mb-5">
              Next-generation polymer matrix smart heating configurations replacing traditional metal wire infrastructures.
            </p>
            <div className="flex gap-2">
              {[
                { href:"https://www.linkedin.com/company/voltcore-tech/posts/?feedView=all", Icon:FaLinkedin },
                { href:"https://www.youtube.com/channel/UCpsmhxcP-_XRV9fFRuIZXCA", Icon:FaYoutube },
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
              {[["Home","/"],["Technology","/technology"],["Industries","/industries"],["About us","/about"],["News","/news"],["Contact","/contact"]].map(([l,to])=>(
                <li key={to}><Link to={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Platforms</h4>
            <ul className="flex flex-col gap-2.5">
              {[["ActiveFil™","/technology"],["TargetHeat™","/technology"],["SensiTerm","/technology"]].map(([l,to])=>(
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
      <style>{`
        @keyframes rippleOut { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(4); opacity: 0; } }
        @keyframes ringPulse { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes scrollBob { 0%, 100% { transform: translateY(0); opacity: 1; } 50% { transform: translateY(6px); opacity: 0.3; } }
      `}</style>
    </div>
  );
};

export default Home;