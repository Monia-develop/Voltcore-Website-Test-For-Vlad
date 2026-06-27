import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaLinkedin, FaYoutube,
  FaEnvelope, FaMapMarkerAlt,
} from "react-icons/fa";

import CarSeatImg       from "../assets/website/industries/CarSeatHeating.png";
import FoodDeliveryImg  from "../assets/website/industries/FoodDelivery.png";
import HeatedApparelImg from "../assets/website/industries/Heated-Apparel.png";
import UnderfloorImg    from "../assets/website/industries/Underfloor-Heating.png";
import DefenseImg       from "../assets/website/industries/Defense.png";
import TargetHeatImg    from "../assets/website/platforms/BRD-02-targetheat.png";
import ActiveFilImg     from "../assets/website/platforms/BRD-03-activefil.png";
import SensiTermImg     from "../assets/website/platforms/BRD-04-sensiterm.png";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────
const METRICS = [
  { val:"−75%",      numPrefix:"−",      numEnd:75, numSuffix:"%",   label:"CO₂ footprint vs copper",     sub:"Third-party LCA validated",        barColor:"#94C356", glowColor:"rgba(148,195,86,0.18)"  },
  { val:"Up to 4×",  numPrefix:"Up to ", numEnd:4,  numSuffix:"×",   label:"Less energy consumption",     sub:"Versus conventional alternatives", barColor:"#F07E26", glowColor:"rgba(240,126,38,0.18)"  },
  { val:"3 min",     numPrefix:"",       numEnd:3,  numSuffix:" min",label:"To reach target temperature", sub:"Zero thermal lag",                 barColor:"#4A5DA7", glowColor:"rgba(74,93,167,0.18)"   },
];

const PARTNERS = ["Drive TLV","Salbi","FEDIL","OCSiAl","Gerflor","Hyundai Motor Group","Quantum","Plug and Play"];

const PLATFORMS = [
  { name:"ActiveFil™",  tag:"Core material",    desc:"CNT-enhanced conductive polymer filaments offering controlled resistivity in a flexible, lightweight, and extrusion-ready format.", accent:"#94C356", image:ActiveFilImg  },
  { name:"TargetHeat™", tag:"Heating platform",  desc:"Fabric-integrated electrical heating solution generating highly efficient, uniform heat distribution (ΔT∼4°C) across complex geometries.", accent:"#F07E26", image:TargetHeatImg },
  { name:"SensiTerm",   tag:"Sensing + heating", desc:"Advanced fabric platform co-designing electrical heating and intrinsic resistance-based sensing for zoned control and occupancy detection without external sensors.", accent:"#4A5DA7", image:SensiTermImg  },
];

const INDUSTRIES = [
  { slug:"automotive",         title:"Mobility",              tagline:"Extending EV winter driving range by up to 13% through energy-efficient cabin comfort and localized surface heating.", image:CarSeatImg,       span:"lg:col-span-6", h:"h-[300px]" },
  { slug:"food-delivery",      title:"Thermal Logistics",     tagline:"Active, ultra-lightweight heating inserts maintaining safe food delivery temperatures (≥65°C) for over 3 hours.",       image:FoodDeliveryImg,  span:"lg:col-span-6", h:"h-[300px]" },
  { slug:"heated-apparel",     title:"Individual / Apparel",  tagline:"Wire-free, weightless homogeneous warmth for outdoor gear and safety workwear, optimizing battery runtime.",            image:HeatedApparelImg, span:"lg:col-span-4", h:"h-[240px]" },
  { slug:"underfloor-heating", title:"In-Home & Residential", tagline:"Zero-lag underfloor heating mats reaching 28°C in 3 minutes — up to 4× less energy than conventional alternatives.",   image:UnderfloorImg,    span:"lg:col-span-4", h:"h-[240px]" },
  { slug:"defense",            title:"Defense & Security",    tagline:"Specialized, low-observable thermal support and electromagnetic solutions — available only under NDA.",                  image:DefenseImg,       span:"lg:col-span-4", h:"h-[240px]" },
];

const NEWS = [
  { date:"May 2026",   tag:"Commercial Scale-Up", title:"Voltcore™ Graduates 7th Industrial PoC into Full Commercial Production",   summary:"Top-tier global Tier-1 automotive and industrial partners officially transition from pilot testing to volume manufacturing.", link:"/news" },
  { date:"April 2026", tag:"Sustainability",       title:"LCA Assessment Confirms up to 75% Lower CO₂ Footprint vs Copper",        summary:"Third-party Life Cycle Assessments validate our mono-material polymer approach for total end-of-life recyclability.",     link:"/news" },
  { date:"June 2026",  tag:"Global Events",        title:"Meet Voltcore™'s Executive and Tech Team at VivaTech 2026",               summary:"Join us in Paris to experience live demonstrations of our interactive smart seating and flexible heating mesh platforms.",   link:"/news" },
];

const TEAM = [
  { name:"Fabrice Bertinchamps", role:"Co-founder & CEO"   },
  { name:"Vlad Batkhin",         role:"Co-founder & CTO"   },
  { name:"Daria Voronina",       role:"Sustainability & BD" },
];

const WORDS = ["GO GREEN.", "DRIVE SMART.", "HEAT EFFICIENTLY."];

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// COUNT UP — animates a number into view on scroll, reacts to hover
// ─────────────────────────────────────────────────────────────────────────────
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
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration, started]);
  return <span ref={ref}>{prefix}{count.toFixed(decimals)}{suffix}</span>;
};

// ─────────────────────────────────────────────────────────────────────────────
// METRIC CARD — light bg in light mode, dark bg in dark mode
// ─────────────────────────────────────────────────────────────────────────────
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
      className="group relative overflow-hidden rounded-2xl cursor-default
        bg-white dark:bg-[#1a1a22]
        border border-[#e8e6e0] dark:border-[#2a2a3a]"
      style={{
        borderTopWidth: 3,
        borderTopColor: m.barColor,
        boxShadow: hovered ? `0 20px 50px ${m.glowColor}` : "0 2px 8px rgba(0,0,0,0.06)",
        opacity: visible ? 1 : 0,
        transform: `translateY(${visible ? (hovered ? "-6px" : "0") : "24px"})`,
        transition: `opacity 0.6s ${idx * 120}ms, transform 0.6s ${idx * 120}ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s`,
      }}
    >
      <div className="absolute top-0 right-0 pointer-events-none rounded-full" style={{ width: 120, height: 120, top: -30, right: -30, background: `radial-gradient(circle, ${m.barColor}30, transparent 70%)`, opacity: hovered ? 1 : 0, transition: "opacity 0.4s" }} />
      {ripple && <div className="absolute pointer-events-none rounded-full" style={{ left: ripple.x - 50, top: ripple.y - 50, width: 100, height: 100, background: `${m.barColor}25`, animation: "rippleOut 0.6s ease-out forwards" }} />}
      <div className="p-7 relative z-10">
        <div className="text-5xl font-black tracking-tighter mb-3 transition-colors duration-300 text-[#14141B] dark:text-white" style={{ color: hovered ? m.barColor : undefined }}>
          {visible ? <CountUp prefix={m.numPrefix} end={m.numEnd} suffix={m.numSuffix} /> : <span>{m.numPrefix}0{m.numSuffix}</span>}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-[#B8B7A4] mb-1">{m.label}</div>
        <div className="text-xs text-[#8a8880] dark:text-[#555]">{m.sub}</div>
        <div className="mt-4 h-px bg-[#e8e6e0] dark:bg-[#2a2a3a] rounded-full overflow-hidden">
          <div style={{ height: "100%", background: m.barColor, width: hovered ? "100%" : "28%", transition: "width 0.6s cubic-bezier(0.34,1.56,0.64,1)" }} />
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// INDUSTRY CARD
// ─────────────────────────────────────────────────────────────────────────────
const IndustryCard = ({ ind }) => {
  const [hovered, setHovered] = useState(false);
  const [mp, setMp] = useState({ x: 0.5, y: 0.5 });
  const ref = useRef(null);
  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setMp({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };
  return (
    <Link to={`/industries/${ind.slug}`} ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMp({ x: 0.5, y: 0.5 }); }}
      onMouseMove={handleMove}
      className={`${ind.span} ${ind.h} group relative rounded-2xl overflow-hidden block`}
      style={{
        border: hovered ? "1px solid rgba(148,195,86,0.7)" : "1px solid rgba(0,0,0,0.1)",
        boxShadow: hovered ? "0 25px 60px rgba(0,0,0,0.35)" : "0 4px 20px rgba(0,0,0,0.08)",
        transform: hovered ? `perspective(600px) rotateX(${(mp.y - 0.5) * -4}deg) rotateY(${(mp.x - 0.5) * 4}deg) translateY(-4px)` : "perspective(600px) rotateX(0) rotateY(0)",
        transition: "border-color 0.3s, box-shadow 0.3s, transform 0.2s ease-out",
      }}
    >
      <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: hovered ? "scale(1.1)" : "scale(1)", filter: hovered ? "grayscale(0%) brightness(1.05)" : "grayscale(12%) brightness(0.8)", transition: "transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.5s" }}
      />
      {hovered && <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle at ${mp.x * 100}% ${mp.y * 100}%, rgba(148,195,86,0.18) 0%, transparent 60%)` }} />}
      <div className="absolute inset-0" style={{ background: hovered ? "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" : "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.38) 60%, transparent 100%)", transition: "background 0.5s" }} />
      <div className="absolute top-4 right-4 bg-[#94C356] text-[#0f0f0f] text-[10px] font-bold tracking-widest uppercase rounded-full px-3 py-1" style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.9)", transition: "opacity 0.3s, transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}>Explore →</div>
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <div className="text-[11px] text-[#94C356] font-medium tracking-wide mb-1.5" style={{ opacity: hovered ? 1 : 0.75, transform: hovered ? "translateY(0)" : "translateY(4px)", transition: "opacity 0.3s, transform 0.3s" }}>{ind.tagline}</div>
        <div className="text-white font-semibold text-base tracking-tight" style={{ transform: hovered ? "translateY(0)" : "translateY(6px)", transition: "transform 0.35s" }}>{ind.title}</div>
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PLATFORM ROW — dark section, same in both modes
// ─────────────────────────────────────────────────────────────────────────────
const PlatformRow = ({ p }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-1 lg:grid-cols-[1fr_280px] relative overflow-hidden"
      style={{ background: hovered ? "#181820" : "#111118", transition: "background 0.3s" }}
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5" style={{ background: p.accent, transform: hovered ? "scaleY(1)" : "scaleY(0)", transformOrigin: "top", transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1)" }} />
      <div className="p-10 border-b lg:border-b-0 lg:border-r border-white/5 pl-12">
        <div className="text-[10px] font-bold tracking-[0.18em] uppercase mb-2" style={{ color: p.accent }}>// {p.tag}</div>
        <h3 className="text-3xl font-black tracking-tight mb-3 transition-colors duration-300" style={{ color: hovered ? p.accent : "#ffffff" }}>{p.name}</h3>
        <p className="text-sm text-[#555] leading-relaxed max-w-lg">{p.desc}</p>
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

// ─────────────────────────────────────────────────────────────────────────────
// NEWS ROW
// ─────────────────────────────────────────────────────────────────────────────
const NewsRow = ({ n }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Link to={n.link} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="grid grid-cols-[90px_1fr_44px] items-center gap-6 py-7 border-b border-[#e8e6e0] dark:border-[#2a2a3a] relative overflow-hidden"
      style={{ textDecoration: "none" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(148,195,86,0.04)", opacity: hovered ? 1 : 0, transition: "opacity 0.25s" }} />
      <div className="text-[11px] text-[#8a8880] tracking-wide font-medium relative z-10">{n.date}</div>
      <div className="relative z-10">
        <span className="inline-block text-[10px] tracking-[0.12em] uppercase font-bold text-[#94C356] bg-[#94C356]/10 px-2.5 py-0.5 rounded-full mb-2">{n.tag}</span>
        <div className="text-[15px] font-semibold tracking-tight mb-1.5 transition-colors duration-200 text-[#14141B] dark:text-white" style={{ color: hovered ? "#94C356" : undefined }}>{n.title}</div>
        <div className="text-[13px] text-[#8a8880] leading-relaxed">{n.summary}</div>
      </div>
      <div className="w-10 h-10 rounded-full border flex items-center justify-center flex-shrink-0 relative z-10 transition-all duration-300"
        style={{ borderColor: hovered ? "#94C356" : "#e8e6e0", color: hovered ? "#94C356" : "#c0beb8", transform: hovered ? "translateX(4px) scale(1.1)" : "translateX(0) scale(1)", background: hovered ? "rgba(148,195,86,0.08)" : "transparent" }}
      >
        <FaArrowRight size={12} />
      </div>
    </Link>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// TEAM CARD
// ─────────────────────────────────────────────────────────────────────────────
const TeamCard = ({ m }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden bg-white dark:bg-[#1a1a22] transition-all duration-400"
      style={{ border: hovered ? "1px solid #94C356" : "1px solid #e8e6e0", borderColor: hovered ? "#94C356" : undefined, boxShadow: hovered ? "0 16px 40px rgba(148,195,86,0.14)" : "0 2px 8px rgba(0,0,0,0.04)", transform: hovered ? "translateY(-4px)" : "translateY(0)", transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)" }}
    >
      <div className="h-48 flex items-center justify-center border-b border-[#e8e6e0] dark:border-[#2a2a3a] relative overflow-hidden transition-colors duration-300"
        style={{ background: hovered ? "#f0f7e8" : "#f5f4f0" }}
      >
        {hovered && [1,2,3].map(i => (
          <div key={i} className="absolute rounded-full border border-[#94C356]/20 pointer-events-none"
            style={{ width: i * 60, height: i * 60, animation: `ringPulse 1.5s ${i * 0.2}s ease-out infinite` }}
          />
        ))}
        <span className="text-8xl font-black tracking-tighter transition-colors duration-300 relative z-10"
          style={{ color: hovered ? "rgba(148,195,86,0.35)" : "#e0deda" }}
        >{m.name[0]}</span>
      </div>
      <div className="p-5">
        <div className="text-sm font-bold text-[#14141B] dark:text-white">{m.name}</div>
        <div className="text-[11px] text-[#94C356] font-medium tracking-wide mt-1">{m.role}</div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────
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

  // Cursor glow
  const [cursor, setCursor] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div className="bg-white dark:bg-[#14141B] text-[#14141B] dark:text-[#B8B7A4] min-h-screen overflow-x-hidden font-sans selection:bg-[#D9FE42] selection:text-[#14141B]">

      {/* Cursor ambient glow — subtle, only visible on dark sections */}
      <div className="fixed pointer-events-none z-50 rounded-full" style={{ width: 500, height: 500, left: cursor.x - 250, top: cursor.y - 250, background: "radial-gradient(circle, rgba(148,195,86,0.03) 0%, transparent 70%)", mixBlendMode: "screen" }} />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      {/* Light mode: official Voltcore beige (#B8B7A4). Dark mode: unchanged brand-dark block. */}
      <section
        className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[760px] lg:min-h-[820px] border-b border-[#2a2a3a] bg-[#B8B7A4] dark:bg-[#14141B]"
        onMouseMove={handleMouseMove}
      >
        {/* Left */}
        <div className="relative flex flex-col justify-center px-10 py-20 border-b lg:border-b-0 lg:border-r border-[#2a2a3a] overflow-hidden">
          {/* Grid bg — visible carreaux on beige in light mode, faint in dark mode */}
          <div
            className="absolute inset-0 bg-[linear-gradient(rgba(20,20,27,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,27,0.09)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(184,183,164,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(184,183,164,0.04)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none"
            style={{ transform: `translate(${mouse.x * 16}px, ${mouse.y * 16}px)`, transition: "transform 0.4s ease-out" }}
          />
          {/* Warm glow blob from brand colors */}
          <div className="absolute pointer-events-none" style={{ width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(217,254,66,0.05) 0%, rgba(240,126,38,0.03) 40%, transparent 70%)", top: -150, left: -100, transform: `translate(${mouse.x * 50}px, ${mouse.y * 50}px)`, transition: "transform 0.4s ease-out" }} />

          {/* Location badge */}
          <div className="inline-flex items-center gap-2 mb-8 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#94C356] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#94C356]" />
            </span>
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#555] dark:text-[#555] font-medium">Advanced Materials — Bissen, Luxembourg</span>
          </div>

          {/* Typing word */}
          <div className="text-[11px] tracking-[0.2em] uppercase text-[#12503C] dark:text-[#94C356] font-semibold mb-3 h-5">
            {displayed}<span className="animate-pulse ml-px">|</span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[1.02] text-[#14141B] dark:text-white uppercase mb-6 max-w-lg"
            style={{ transform: `translate(${mouse.x * -8}px, ${mouse.y * -4}px)`, transition: "transform 0.15s ease-out" }}
          >
            Surface Heating is Stuck in the Last Century.{" "}
            <span className="text-[#12503C] dark:text-[#94C356]">We Are Rewriting the Rules.</span>
          </h1>

          <p className="text-[15px] text-[#14141B]/60 dark:text-[#B8B7A4]/60 leading-relaxed max-w-[400px] mb-10">
            Replacing heavy copper wiring with patented, ultra-thin Carbon Nanotube (CNT) synthetic yarns for next-generation thermal management.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/technology"
              className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#D9FE42] text-[#14141B] rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:bg-[#94C356] hover:text-white hover:scale-105 hover:shadow-[0_0_30px_rgba(217,254,66,0.25)]"
            >
              Discover Our Technology
              <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#14141B]/15 dark:border-[#2a2a3a] text-[#14141B] dark:text-[#B8B7A4] rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:border-[#12503C] dark:hover:border-[#94C356] hover:text-[#12503C] dark:hover:text-[#94C356] hover:bg-[#12503C]/5 dark:hover:bg-[#94C356]/5"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right — metrics */}
        <div className="relative flex flex-col justify-center gap-4 p-10 overflow-hidden bg-[#B8B7A4] dark:bg-[#111118]" style={{ transform: `translate(${mouse.x * 6}px, ${mouse.y * 3}px)`, transition: "transform 0.15s ease-out" }}>
          {/* Warm gradient wash from brand palette — orange/neon */}
          <div className="absolute pointer-events-none inset-0" style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(240,126,38,0.07) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(217,254,66,0.05) 0%, transparent 60%)" }} />
          <div aria-hidden className="absolute select-none pointer-events-none font-black text-[#14141B]/[0.08] dark:text-[#1e1e28] leading-none" style={{ fontSize: 200, top: -20, right: -20, letterSpacing: "-0.06em", zIndex: 0 }}>CNT</div>
          {METRICS.map((m, i) => <MetricCard key={m.label} m={m} idx={i} />)}
        </div>
      </section>

      {/* ── PARTNERS MARQUEE ─────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-[#e8e6e0] dark:border-[#2a2a3a] bg-[#fafaf8] dark:bg-[#1a1a22]">
        <div className="absolute left-0 inset-y-0 w-20 bg-gradient-to-r from-[#fafaf8] dark:from-[#1a1a22] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 bg-gradient-to-l from-[#fafaf8] dark:from-[#1a1a22] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 left-0 z-20 flex">
          <div className="bg-[#B8B7A4] dark:bg-[#D9FE42] text-[#14141B] dark:text-[#14141B] text-[9px] font-black tracking-[0.2em] uppercase px-5 flex items-center border-r border-[#e8e6e0] dark:border-[#2a2a3a]">
            Partners
          </div>
        </div>
        <div className="flex w-max" style={{ animation: "marquee 28s linear infinite", paddingLeft: 120 }}>
          {[...PARTNERS,...PARTNERS,...PARTNERS,...PARTNERS,...PARTNERS].map((p, i) => (
            <div key={i} className="flex items-center px-10 border-r border-[#e8e6e0] dark:border-[#2a2a3a] py-3.5 text-[11px] tracking-[0.14em] text-[#8a8880] uppercase font-semibold whitespace-nowrap hover:text-[#94C356] transition-colors cursor-default">{p}</div>
          ))}
        </div>
      </div>

      {/* ── WHO WE ARE ───────────────────────────────────────────────────────── */}
      <section className="px-10 py-24 bg-white dark:bg-[#14141B]">
        <Reveal>
          <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold mb-4">01 // Who we are</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight mb-5 max-w-2xl">
            Deep-tech advanced materials,{" "}
            <span className="text-[#14141B]/20 dark:text-white/20">built in Luxembourg.</span>
          </h2>
          <p className="text-[15px] text-[#4a4a46] dark:text-[#B8B7A4]/70 leading-relaxed max-w-2xl">
            Based in the deep-tech hub of Luxembourg, Voltcore™ is a pioneering advanced materials company that eliminates the weight, cost, and design limitations of traditional metal heating elements. By integrating conductive nanofillers directly into standard polymer matrices, we deliver uniform, flexible, and highly energy-efficient smart surfaces designed for seamless industrial scale-up.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#e8e6e0] dark:bg-[#2a2a3a] mt-16 rounded-2xl overflow-hidden border border-[#e8e6e0] dark:border-[#2a2a3a]">
          <Reveal delay={0} className="bg-white dark:bg-[#1a1a22] p-10 group">
            <div className="text-6xl font-black tracking-tighter text-[#14141B] dark:text-white mb-2 inline-block transition-transform duration-300 group-hover:scale-110 group-hover:text-[#94C356]"><CountUp end={2024} duration={1400} /></div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-[#8a8880] font-semibold">Founded</div>
          </Reveal>
          <Reveal delay={80} className="bg-white dark:bg-[#1a1a22] p-10 group">
            <div className="text-6xl font-black tracking-tighter text-[#94C356] mb-2 inline-block transition-transform duration-300 group-hover:scale-110"><CountUp end={6} duration={1000} /></div>
            <div className="text-[11px] tracking-[0.12em] uppercase text-[#8a8880] font-semibold">Active industries</div>
          </Reveal>
          <Reveal delay={120} className="bg-white dark:bg-[#1a1a22] p-10">
            {[
              { key:"Founded",           val:"2024" },
              { key:"HQ",                val:"Luxembourg" },
              { key:"Trademarks",        val:"Voltcore™ · TargetHeat™ · ActiveFil™" },
              { key:"Active Industries", val:"Mobility · Thermal Logistics · Apparel · Residential · Industrial · Defense" },
            ].map(f => (
              <div key={f.key} className="flex justify-between items-baseline py-3.5 border-b border-[#e8e6e0] dark:border-[#2a2a3a] text-[13px] last:border-0">
                <span className="text-[#8a8880] font-medium">{f.key}</span>
                <span className="text-[#14141B] dark:text-[#B8B7A4] font-semibold text-right max-w-[55%]">{f.val}</span>
              </div>
            ))}
          </Reveal>
          <Reveal delay={160} className="bg-[#B8B7A4] dark:bg-[#14141B] p-10 flex flex-col justify-between">
            <div>
              <div className="text-4xl text-[#12503C] dark:text-[#94C356] font-black leading-none mb-5">"</div>
              <p className="text-[15px] text-[#14141B]/70 dark:text-[#B8B7A4] leading-relaxed">
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

      {/* ── TECHNOLOGY PLATFORMS — always dark ───────────────────────────────── */}
      <section className="px-10 py-24" style={{ background: "#14141B" }}>
        <Reveal>
          <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold mb-4">02 // Technology platforms</div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
              Our proprietary{" "}
              <span className="text-white/20">material stack</span>
            </h2>
            <p className="text-[13px] text-[#555] leading-relaxed max-w-sm">
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
          <Link to="/technology" className="group inline-flex items-center gap-2 mt-10 text-[11px] font-black uppercase tracking-widest text-[#94C356] hover:text-white transition-colors">
            Discover Our Technology Platform <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* ── INDUSTRIES ───────────────────────────────────────────────────────── */}
      <section className="px-10 py-24 bg-white dark:bg-[#14141B]">
        <Reveal>
          <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold mb-4">03 // Industry presence</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight mb-16 max-w-3xl">
            Tailored thermal performance{" "}
            <span className="text-[#14141B]/20 dark:text-white/20">for global industrial scales</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.slug} delay={i * 60} className={ind.span}><IndustryCard ind={ind} /></Reveal>
          ))}
        </div>
        <Reveal delay={300}>
          <Link to="/industries" className="group inline-flex items-center gap-2 mt-10 text-[11px] font-black uppercase tracking-widest text-[#94C356] hover:text-[#14141B] dark:hover:text-white transition-colors">
            Explore Applications <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* ── NEWS ─────────────────────────────────────────────────────────────── */}
      <section className="px-10 py-24 bg-[#f5f4f0] dark:bg-[#1a1a22] border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
        <Reveal>
          <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold mb-4">04 // News & recognition</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight mb-0">Latest from Voltcore™</h2>
        </Reveal>
        <div className="mt-14 border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
          {NEWS.map((n, i) => <Reveal key={n.title} delay={i * 80}><NewsRow n={n} /></Reveal>)}
        </div>
        <Reveal delay={280}>
          <div className="mt-10 text-center">
            <Link to="/news" className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#94C356] hover:text-[#14141B] dark:hover:text-white transition-colors">
              See All News <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ── NEWSLETTER ───────────────────────────────────────────────────────── */}
      <section className="px-10 py-20 bg-white dark:bg-[#14141B] border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
        <Reveal>
          <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold">// Newsletter</div>
            <h3 className="text-3xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase">Stay Ahead in Thermal Innovation.</h3>
            <p className="text-[14px] text-[#8a8880] leading-relaxed">Sign up to receive our technical whitepapers, materials updates, and corporate rollouts.</p>
            <div className="flex gap-2 w-full max-w-md">
              <input type="email" placeholder="Enter your corporate email"
                className="flex-1 px-5 py-3 text-[13px] rounded-full border border-[#e8e6e0] dark:border-[#2a2a3a] bg-[#f5f4f0] dark:bg-[#1a1a22] text-[#14141B] dark:text-[#B8B7A4] outline-none focus:border-[#94C356] transition-colors"
              />
              <button className="px-6 py-3 bg-[#14141B] dark:bg-[#D9FE42] text-white dark:text-[#14141B] rounded-full text-[12px] font-black uppercase tracking-wider whitespace-nowrap hover:bg-[#94C356] hover:text-white transition-all duration-200 hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── LEADERSHIP ───────────────────────────────────────────────────────── */}
      <section className="px-10 py-24 bg-[#f5f4f0] dark:bg-[#1a1a22] border-t border-[#e8e6e0] dark:border-[#2a2a3a]">
        <Reveal>
          <div className="flex justify-between items-end mb-14">
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold mb-4">05 // Leadership</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight">People behind Voltcore™</h2>
            </div>
            <Link to="/about#team" className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#94C356] hover:text-[#14141B] dark:hover:text-white transition-colors">
              Meet the full team <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {TEAM.map((m, i) => <Reveal key={m.name} delay={i * 80}><TeamCard m={m} /></Reveal>)}
        </div>
      </section>

      {/* ── CTA — always dark ────────────────────────────────────────────────── */}
      <section className="relative px-10 py-24 text-center flex flex-col items-center gap-6 overflow-hidden" style={{ background: "#14141B" }}>
        {/* Brand gradient wash */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(217,254,66,0.06) 0%, rgba(240,126,38,0.04) 30%, transparent 70%)" }} />
        <Reveal>
          <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold mb-2">// Partner with us</div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight max-w-2xl mx-auto mb-4">Ready to partner with Voltcore™?</h2>
          <p className="text-[14px] text-[#B8B7A4]/50 max-w-lg mx-auto mb-8 leading-relaxed">
            Request detailed technology specifications, discuss custom geometry integrations, or order your material samples today.
          </p>
          <Link to="/contact"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-[#D9FE42] text-[#14141B] rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(217,254,66,0.2)] hover:bg-[#94C356] hover:text-white"
          >
            Contact Our Team <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer className="bg-[#f5f4f0] dark:bg-[#0e0e14] border-t border-[#e8e6e0] dark:border-[#2a2a3a] px-10 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          <div>
            <div className="text-sm font-black tracking-widest text-[#14141B] dark:text-white mb-3">VOLTCORE™</div>
            <p className="text-[12px] text-[#8a8880] leading-relaxed max-w-[200px] mb-5">
              Next-generation polymer matrix smart heating configurations replacing traditional metal wire infrastructures.
            </p>
            <div className="flex gap-2">
              {[
                { href:"https://www.linkedin.com/company/voltcore-tech/posts/?feedView=all", Icon:FaLinkedin },
                { href:"https://www.youtube.com/channel/UCpsmhxcP-_XRV9fFRuIZXCA", Icon:FaYoutube },
              ].map(({ href, Icon }) => (
                <a key={href} href={href} target="_blank" rel="noreferrer"
                  className="w-8 h-8 rounded-lg border border-[#e8e6e0] dark:border-[#2a2a3a] flex items-center justify-center text-[#8a8880] transition-all duration-200 hover:border-[#94C356] hover:text-[#94C356]">
                  <Icon size={12} />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Sitemap</h4>
            <ul className="flex flex-col gap-2.5">
              {[["Home","/"],["Technology","/technology"],["Industries","/industries"],["About us","/about"],["News","/news"],["Contact","/contact"]].map(([l,to])=>(
                <li key={to}><Link to={to} className="text-[12px] text-[#8a8880] hover:text-[#94C356] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Platforms</h4>
            <ul className="flex flex-col gap-2.5">
              {[["ActiveFil™","/technology"],["TargetHeat™","/technology"],["SensiTerm","/technology"]].map(([l,to])=>(
                <li key={l}><Link to={to} className="text-[12px] text-[#8a8880] hover:text-[#94C356] transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Contact HQ</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-2 text-[12px] text-[#8a8880]">
                <FaMapMarkerAlt className="text-[#94C356] mt-0.5 shrink-0" size={11} />
                <span>11, rue de l'Industrie,<br />L-7735 Bissen, Luxembourg</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-[#94C356] shrink-0" size={11} />
                <a href="mailto:info@voltcore.tech" className="text-[12px] text-[#8a8880] hover:text-[#94C356] transition-colors">info@voltcore.tech</a>
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
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-20%); } }
        @keyframes rippleOut { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(4); opacity: 0; } }
        @keyframes ringPulse { 0% { transform: scale(0.5); opacity: 0.8; } 100% { transform: scale(2.5); opacity: 0; } }
      `}</style>
    </div>
  );
};

export default Home;
