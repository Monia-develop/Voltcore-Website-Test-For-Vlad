import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaMountain,
  FaMotorcycle,
  FaRunning,
  FaHardHat,
  FaBriefcaseMedical,
  FaGem,
} from "react-icons/fa";

// Industry photos — same imports already used in each industry page.
import AutomotiveHero  from "../assets/website/industries/automotive-hero.jpg";
import LivreurImg      from "../assets/website/industries/Livreur.png";
import ScootImg        from "../assets/website/industries/Scoot.png";
import BImg            from "../assets/website/industries/B.png";
import ApparelHero     from "../assets/website/industries/image40.png";
import FloorHeroImage  from "../assets/website/industries/underfloor-Heating2.png";

/* ─── COLORS ─────────────────────────────────────────────────────────────── */
const GREEN = "#94C356";
const ORANGE = "#F07E26";
const BLUE = "#4A5DA7";
const NEON = "#D9FE42";
const DKGREEN = "#12503C";
const BLACK = "#14141B";
const CRAFT = "#B8B7A4";

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
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

const useInView = (threshold = 0.1) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setShown(true);
      },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
};

const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const [ref, shown] = useInView(0.08);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0px)" : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms, transform 0.7s cubic-bezier(.22,.61,.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const VALUECHAIN = [
  {
    num: "01",
    label: "Compounding",
    design: "In-house",
    production: "In-house",
    desc: "Core formulation and CNT dispersion under direct process control.",
  },
  {
    num: "02",
    label: "Filament Drawing",
    design: "In-house",
    production: "Own Plant 2026",
    desc: "Scaling filament conversion with controlled mechanical and electrical properties.",
  },
  {
    num: "03",
    label: "Fabric Weaving / Treating",
    design: "In-house",
    production: "Own Plant 2028",
    desc: "Textile architecture and finishing for heating surfaces and performance fabrics.",
  },
  {
    num: "04",
    label: "Heating Mat Production",
    design: "In-house",
    production: "Own Plant 2028",
    desc: "Assembly of complete heating mats optimized for application integration.",
  },
  {
    num: "05",
    label: "End-Use Integration",
    design: "Co-Development",
    production: "At Client Tier",
    desc: "Joint integration with customer hardware, geometry, and certification constraints.",
  },
];

/* ─── FOOTER ─────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#f5f4f0] dark:bg-[#0e0e14] border-t border-[#e8e6e0] dark:border-[#2a2a3a] px-10 pt-16 pb-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
      <div>
        <div className="text-sm font-black tracking-widest text-[#14141B] dark:text-white mb-3">
          VOLTCORE
        </div>
        <p className="text-xs text-[#8a8880] leading-relaxed max-w-[200px] mb-5">
          Next-generation polymer matrix smart heating configurations replacing traditional metal wire infrastructures.
        </p>
        <div className="flex gap-2">
          {[
            ["https://www.linkedin.com/company/voltcore-tech/posts/?feedView=all", FaLinkedin],
            ["https://www.youtube.com/channel/UCpsmHxcP-XRV9fFRuIZXCA", FaYoutube],
          ].map(([href, Icon]) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-[#e8e6e0] dark:border-[#2a2a3a] flex items-center justify-center text-[#8a8880] transition-all duration-200 hover:border-[#D9FE42] hover:text-[#D9FE42]"
            >
              <Icon size={12} />
            </a>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">
          Sitemap
        </h4>
        <ul className="flex flex-col gap-2.5">
          {[
            ["Home", "/"],
            ["Technology", "/technology"],
            ["Industries", "/industries"],
            ["About us", "/about"],
            ["Products", "/products"],
            ["Contact", "/contact"],
          ].map(([label, to]) => (
            <li key={to}>
              <Link to={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">
          Products
        </h4>
        <ul className="flex flex-col gap-2.5">
          {[
            ["ActiveFil", "/products#activefil"],
            ["TargetHeat", "/products#targetheat"],
            ["SensiTerm", "/products#sensiterm"],
          ].map(([label, to]) => (
            <li key={to}>
              <a href={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">
          Contact HQ
        </h4>
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-2 text-[12px] text-[#8a8880]">
            <FaMapMarkerAlt className="text-[#D9FE42] mt-0.5 shrink-0" size={11} />
            <span>2, rue de l’Industrie, L-7735 Bissen, Luxembourg</span>
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-[#D9FE42] shrink-0" size={11} />
            <a href="mailto:info@voltcore.tech" className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">
              info@voltcore.tech
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#e8e6e0] dark:border-[#2a2a3a] text-[10px] text-[#8a888060]">
      <span>© {new Date().getFullYear()} Voltcore S.A. All rights reserved. Registered trademark.</span>
      <div className="flex gap-5">
        <a href="/privacy" className="hover:text-[#14141B] dark:hover:text-white transition-colors">
          Privacy Policy
        </a>
        <a href="/terms" className="hover:text-[#14141B] dark:hover:text-white transition-colors">
          Terms of Service
        </a>
      </div>
    </div>
  </footer>
);

/* ─── VALUE CHAIN SECTION ───────────────────────────────────────────────── */
const StepIcon = ({ num, dark }) => {
  const color = dark ? "#d9fe42" : "#12503c";
  
  switch(num) {
    case "01":
      return (
        <svg viewBox="0 0 100 60" className="w-full h-16 my-2 opacity-80" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M15 20h15v10H15zM30 25h35v15H30zM65 30h15v5H65zM20 20l-5-10h25l-5 10" />
          <circle cx="37" cy="47" r="4" /><circle cx="58" cy="47" r="4" />
          <path d="M75 35l10 5v-15l-10 5" fill={color} opacity="0.3" />
        </svg>
      );
    case "02":
      return (
        <svg viewBox="0 0 100 60" className="w-full h-16 my-2 opacity-80" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="20" y="15" width="25" height="30" rx="3" />
          <path d="M25 20h15M25 25h15M25 30h15M25 35h15M25 40h15" strokeWidth="1" />
          <path d="M45 30c15 0 20-15 35-15s15 15 20 15" />
        </svg>
      );
    case "03":
      return (
        <svg viewBox="0 0 100 60" className="w-full h-16 my-2 opacity-80" fill="none" stroke={color} strokeWidth="1.5">
          <ellipse cx="35" cy="30" rx="12" ry="18" />
          <path d="M35 12h40c8 0 12 8 12 18s-4 18-12 18H35" />
          <path d="M47 15c5 5 5 25 0 30" strokeDasharray="3 3" />
        </svg>
      );
    case "04":
      return (
        <svg viewBox="0 0 100 60" className="w-full h-16 my-2 opacity-80" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M20 15h50l15 30H35z" />
          <path d="M30 20l10 20M40 20l10 20M50 20l10 20M60 20l10 20" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M25 35h50" strokeWidth="1" />
        </svg>
      );
    case "05":
      return (
        <svg viewBox="0 0 100 60" className="w-full h-16 my-2 opacity-80" fill="none" stroke={color} strokeWidth="1.5">
          <path d="M25 10c3 0 8 4 8 10l-2 15h20l15 15H20L15 25l5-12z" />
          <path d="M31 15h2v15h-2z" fill={color} opacity="0.4" stroke="none" />
          <path d="M35 38h15v2H35z" fill={color} opacity="0.4" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
};

const ValueChainSection = () => {
  const dark = useIsDark();
  const [hovered, setHovered] = useState(0);

  return (
    <section className={`w-full py-24 relative overflow-hidden ${dark ? "bg-[#1a1a22]" : "bg-[#f5f4f0]"}`}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <Reveal className="mb-4">
          <span
            className="text-xs font-black uppercase tracking-[0.22em] block mb-5"
            style={{ color: dark ? NEON : DKGREEN }}
          >
            Value Chain Strategy
          </span>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95] mb-4"
            style={{ color: dark ? "white" : BLACK }}
          >
            From compound
            <br />
            <span style={{ color: dark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.15)" }}>
              to end-use integration
            </span>
          </h2>
          <p
            className="text-sm max-w-2xl leading-relaxed"
            style={{ color: dark ? CRAFT : "rgba(20,20,27,0.55)" }}
          >
            We develop and design all products from compounds to heating mat. We own and operate compounding and will soon own and operate filament drawing. Fabric weaving and heating mat production will follow the most cost-efficient model: in-house or toll-manufacturing.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-5 gap-5 relative z-10">
          {VALUECHAIN.map((step, i) => {
            const active = hovered === i;
            return (
              <Reveal key={step.num} delay={i * 80}>
                <div
                  className="relative h-full rounded-2xl border p-5 transition-all duration-300 cursor-default flex flex-col justify-between"
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(i)}
                  style={{
                    background: active 
                      ? (dark ? "#22291a" : "rgba(217,254,66,0.08)") 
                      : (dark ? "#1c1c24" : "white"),
                    borderColor: active ? `${NEON}60` : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                    transform: active ? "translateY(-6px)" : "translateY(0)",
                    boxShadow: active ? "0 20px 50px rgba(217,254,66,0.10)" : "none",
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-black"
                        style={{
                          background: active ? NEON : dark ? "rgba(217,254,66,0.1)" : "rgba(18,80,60,0.08)",
                          color: BLACK,
                        }}
                      >
                        {step.num}
                      </div>
                      
                      {i !== VALUECHAIN.length - 1 && (
                        <div 
                          className="hidden lg:block text-lg font-light translate-x-7"
                          style={{ color: active ? NEON : dark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)" }}
                        >
                          →
                        </div>
                      )}
                    </div>

                    <div
                      className="text-sm font-black mb-2 leading-snug uppercase tracking-tight"
                      style={{ color: dark ? "white" : BLACK }}
                    >
                      {step.label}
                    </div>

                    <div className="w-full flex justify-center py-2 border-b border-dashed my-3" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                      <StepIcon num={step.num} dark={dark} />
                    </div>

                    <p
                      className="text-xs leading-relaxed mb-6"
                      style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(20,20,27,0.62)" }}
                    >
                      {step.desc}
                    </p>
                  </div>

                  <div className="space-y-2.5 mt-auto pt-2">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider mb-1 font-bold" style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>
                        Design
                      </div>
                      <div
                        className="text-[10px] font-black px-2.5 py-1 rounded-lg w-fit"
                        style={{ background: `${NEON}20`, color: dark ? NEON : DKGREEN }}
                      >
                        {step.design}
                      </div>
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider mb-1 font-bold" style={{ color: dark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>
                        Production
                      </div>
                      <div
                        className="text-[10px] font-black px-2.5 py-1 rounded-lg w-fit"
                        style={{
                          background: step.production.includes("Client")
                            ? dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"
                            : `${ORANGE}18`,
                          color: step.production.includes("Client")
                            ? dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)"
                            : ORANGE,
                        }}
                      >
                        {step.production}
                      </div>
                    </div>
                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── DATA — every product is what's actually deployed inside each industry
       page (the hotspot photo / application grid), not a separate catalog ── */
const AMBER = "#D9A441";

const INDUSTRY_PRODUCTS = [
  {
    id: "automotive",
    kicker: "01 // Automotive",
    name: "Cabin Cocoon",
    tagline: "Every heated surface inside the vehicle, mapped to one integration.",
    color: GREEN,
    route: "/industries/automotive",
    visual: "pins",
    hero: AutomotiveHero,
    items: [
      { num: "01", title: "Seat Heating & Presence Detection", desc: "2-in-1 heating and occupancy sensing woven into the seat matrix.", x: 30, y: 64 },
      { num: "02", title: "Heated Sensing / Touch Elements",   desc: "Touch controls incorporated directly into the heated surface.", x: 57, y: 34 },
      { num: "03", title: "Heated Surfaces",                    desc: "Armrests, door panels, gloveboxes and cupholders.", x: 89, y: 47 },
      { num: "04", title: "Heated Door Panel",                  desc: "Ultra-thin heating fabric beneath the door card A-surface.", x: 7, y: 87 },
    ],
  },
  {
    id: "food-delivery",
    kicker: "02 // Food Delivery",
    name: "Thermal Logistics",
    tagline: "Active heating across the hot-meal value chain — rider bag to institutional cart.",
    color: ORANGE,
    route: "/industries/thermal-logistics",
    visual: "mosaic",
    items: [
      { num: "01", title: "Soft Food Delivery Backpacks & Boxes", desc: "For cyclists and on-foot couriers — removable or integrated heater.", img: LivreurImg },
      { num: "02", title: "Hard Food Delivery Boxes & Containers", desc: "For motorcycle and scooter couriers — side-wall + base radiant layer.", img: ScootImg },
      { num: "03", title: "Institutional Hot Food Transport", desc: "For catering, hospitals and school food service — cart-integrated heating.", img: BImg },
    ],
  },
  {
    id: "heated-apparel",
    kicker: "03 // Heated Apparel",
    name: "Wearable Heating",
    tagline: "One heating textile platform, deployed across six very different markets.",
    color: BLUE,
    route: "/industries/heated-apparel",
    visual: "grid",
    hero: ApparelHero,
    items: [
      { icon: FaMountain,         title: "Outdoor",               desc: "Hiking, fishing, hunting, etc." },
      { icon: FaMotorcycle,       title: "Motorcycle",             desc: "Jackets, vests, gloves, liners, trousers." },
      { icon: FaRunning,          title: "Sports & Performance",    desc: "Skiwear, cycling, running, sailing." },
      { icon: FaHardHat,          title: "Workwear & Industrial",   desc: "Construction, logistics, cold storage, etc." },
      { icon: FaBriefcaseMedical, title: "Medical & Wellness",      desc: "Back warmers, therapeutic heat pads, recovery garments." },
      { icon: FaGem,              title: "Accessories",             desc: "Gloves, socks, insoles, scarves, collars, heated cushions." },
    ],
  },
  {
    id: "underfloor-heating",
    kicker: "04 // Underfloor Heating",
    name: "TargetHeat",
    tagline: "Voltcore's unidirectional heating laminate — no heat is wasted.",
    color: AMBER,
    route: "/industries/floorheating",
    visual: "layers",
    hero: FloorHeroImage,
    items: [
      { num: "01", title: "Heated Surface Finish", desc: "Laminate, tile, parquet or vinyl — receives 85–95% of the mesh's energy." },
      { num: "02", title: "Voltcore TargetHeat Mesh", desc: "2.2mm CNT nanocomposite mesh — reaches 28°C in 3 minutes on 56 Wh." },
      { num: "03", title: "Substrate", desc: "Existing subfloor or concrete slab — near-zero heat wasted downward." },
    ],
  },
];

/* ─── INDUSTRY PRODUCTS SECTION ──────────────────────────────────────────
   An alternating editorial layout — one full-width row per industry, photo
   and product list swapping sides down the page. Deliberately different
   from the hotspot-map / tab patterns used on the industry pages themselves,
   since this is a catalog view that always links back out to them. ────── */
const PinDot = ({ x, y, num, title, color, active, onHover }) => (
  <div
    className="absolute z-10"
    style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%,-50%)" }}
    onMouseEnter={() => onHover(num)}
    onMouseLeave={() => onHover(null)}
  >
    {!active && <span className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ background: color }} />}
    <div
      className="relative w-7 h-7 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all duration-200"
      style={{
        background: active ? color : "rgba(20,20,27,0.9)",
        borderColor: active ? color : "rgba(255,255,255,0.8)",
        color: active ? BLACK : "white",
        transform: active ? "scale(1.15)" : "scale(1)",
      }}
    >
      {num}
    </div>
  </div>
);

const IndustryRow = ({ industry, idx, dark }) => {
  const [ref, shown] = useInView(0.1);
  const [hoveredNum, setHoveredNum] = useState(null);
  const flip = idx % 2 === 1;
  const c = industry.color;

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-16 border-t"
      style={{
        borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)",
        opacity: shown ? 1 : 0,
        transform: shown ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s cubic-bezier(.22,.61,.36,1), transform 0.7s cubic-bezier(.22,.61,.36,1)",
      }}
    >
      {/* Visual */}
      <div className={flip ? "lg:order-2" : ""}>
        {industry.visual === "mosaic" ? (
          <div className="grid grid-cols-3 gap-3 h-[340px]">
            <div className="col-span-2 rounded-2xl overflow-hidden relative">
              <img src={industry.items[0].img} alt={industry.items[0].title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="absolute bottom-3 left-3 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: `${c}CC` }}>{industry.items[0].num}</span>
            </div>
            <div className="grid grid-rows-2 gap-3">
              {industry.items.slice(1).map((it) => (
                <div key={it.num} className="rounded-2xl overflow-hidden relative">
                  <img src={it.img} alt={it.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-2 left-2 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ background: `${c}CC` }}>{it.num}</span>
                </div>
              ))}
            </div>
          </div>
        ) : industry.visual === "pins" ? (
          <div className="relative w-full h-[340px] rounded-2xl overflow-hidden border" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
            <img src={industry.hero} alt={industry.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            {industry.items.map((it) => (
              <PinDot key={it.num} x={it.x} y={it.y} num={it.num} title={it.title} color={c} active={hoveredNum === it.num} onHover={setHoveredNum} />
            ))}
          </div>
        ) : industry.visual === "layers" ? (
          <div className="relative w-full h-[340px] rounded-2xl overflow-hidden border" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
            <img src={industry.hero} alt={industry.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-2">
              {industry.items.map((it) => (
                <div key={it.num} className="flex items-center gap-2.5 px-3 py-2 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest w-fit" style={{ background: "rgba(20,20,27,0.75)", color: "white" }}>
                  <span style={{ color: c }}>{it.num}</span> {it.title}
                </div>
              ))}
            </div>
          </div>
        ) : (
          // grid (heated apparel) — hero photo with 6 category chips below
          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
            <div className={`relative flex items-center justify-center overflow-hidden ${dark ? "bg-[#0c0c11]" : "bg-[#eeede7]"}`} style={{ height: 300 }}>
              <img src={industry.hero} alt={industry.name} className="max-h-full max-w-full w-auto h-auto object-contain" />
            </div>
            <div className={`grid grid-cols-3 gap-px ${dark ? "bg-zinc-800" : "bg-zinc-200"}`}>
              {industry.items.map((it) => {
                const Icon = it.icon;
                return (
                  <div key={it.title} className={`flex flex-col items-center justify-center gap-1.5 py-4 px-2 text-center ${dark ? "bg-[#1C1C24]" : "bg-white"}`}>
                    <Icon size={13} style={{ color: c }} />
                    <span className={`text-[9px] font-black uppercase tracking-wide leading-tight ${dark ? "text-white" : "text-[#14141B]"}`}>{it.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Text */}
      <div className={flip ? "lg:order-1" : ""}>
        <span className="text-[10px] font-black uppercase tracking-[0.3em] block mb-3" style={{ color: c }}>{industry.kicker}</span>
        <h3 className={`text-3xl md:text-4xl font-black uppercase tracking-tight mb-3 ${dark ? "text-white" : "text-[#14141B]"}`}>{industry.name}</h3>
        <p className={`text-sm leading-relaxed mb-7 max-w-md ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{industry.tagline}</p>

        <div className="space-y-3 mb-8">
          {industry.items.map((it) => (
            <div
              key={it.title}
              className={`flex items-start gap-3 rounded-xl p-3.5 border transition-colors duration-200 ${dark ? "border-zinc-800 hover:border-zinc-600" : "border-zinc-200 hover:border-zinc-400"}`}
              onMouseEnter={() => it.num && setHoveredNum(it.num)}
              onMouseLeave={() => setHoveredNum(null)}
            >
              {it.num ? (
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: `${c}20`, color: c }}>{it.num}</span>
              ) : (
                <span className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${c}20`, color: c }}><it.icon size={11} /></span>
              )}
              <div>
                <h4 className={`text-xs font-bold mb-0.5 ${dark ? "text-white" : "text-[#14141B]"}`}>{it.title}</h4>
                <p className={`text-[11px] leading-relaxed ${dark ? "text-zinc-500" : "text-zinc-500"}`}>{it.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          to={industry.route}
          className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105"
          style={{ background: c, color: BLACK }}
        >
          Explore {industry.name} <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

const IndustryProductsSection = () => {
  const dark = useIsDark();
  return (
    <section className={`py-24 px-6 ${dark ? "bg-[#14141B]" : "bg-white"}`}>
      <div className="container mx-auto max-w-6xl">
        <Reveal>
          <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-4" style={{ color: dark ? NEON : DKGREEN }}>
            // Products By Industry
          </span>
          <h2 className={`text-4xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-4 max-w-2xl ${dark ? "text-white" : "text-[#14141B]"}`}>
            Where the platform ships.
          </h2>
          <p className={`text-sm max-w-xl leading-relaxed mb-6 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>
            Every Voltcore deployment, grouped by the industry it lives in. Hover a marker or a line item, then jump straight into the full story.
          </p>
        </Reveal>

        <div>
          {INDUSTRY_PRODUCTS.map((industry, i) => (
            <IndustryRow key={industry.id} industry={industry} idx={i} dark={dark} />
          ))}
        </div>
      </div>
    </section>
  );
};


/* ─── COMPARISON SECTION ────────────────────────────────────────────────── */
const ComparisonSection = () => {
  const dark = useIsDark();

  const criteria = [
    {
      name: "Energy Efficiency",
      voltcore: "85–95% efficiency (50% energy savings & 40% faster warm up)",
      legacy: "~40% efficiency (Standard Copper baseline)",
    },
    {
      name: "Flexibility & Uniformity",
      voltcore: "Smooth, unidirectional heating with zero hotspots",
      legacy: "Requires heat spreading layers, prone to uneven temperatures",
    },
    {
      name: "Cost Competitiveness",
      voltcore: "40% cost advantage (Simple polymer-base, no metal)",
      legacy: "Expensive metal contents, vulnerable to copper inflation",
    },
    {
      name: "Seamless Integration",
      voltcore: "Ultra-thin (120–250 g/m²), drapable CNT textiles for complex parts",
      legacy: "Rigid structure, difficult to overmold into foam or plastics",
    },
    {
      name: "Durability & Stability",
      voltcore: "Maintains stable resistivity across full surface, failure resistant",
      legacy: "High risk of corrosion, breakage, and flex fatigue",
    },
  ];

  return (
    <section className={`w-full py-24 relative ${dark ? "bg-[#14141b]" : "bg-white"}`}>
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="mb-12">
          <span
            className="text-xs font-black uppercase tracking-[0.22em] block mb-3"
            style={{ color: dark ? NEON : DKGREEN }}
          >
            Head-to-Head
          </span>
          <h2
            className="text-4xl md:text-5xl font-black tracking-tighter uppercase"
            style={{ color: dark ? "white" : BLACK }}
          >
            Voltcore vs Legacy Tech
          </h2>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr style={{ background: dark ? "#1c1c24" : "#f5f4f0" }}>
                <th className="p-5 text-xs font-black uppercase tracking-wider opacity-40" style={{ color: dark ? "white" : BLACK }}>
                  Key Dimensions
                </th>
                <th className="p-5 text-xs font-black uppercase tracking-wider text-center" style={{ color: dark ? NEON : DKGREEN }}>
                  Voltcore
                </th>
                <th className="p-5 text-xs font-black uppercase tracking-wider text-center" style={{ color: ORANGE }}>
                  Legacy Tech
                </th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}>
              {criteria.map((item, idx) => (
                <tr key={idx} className="transition-colors hover:bg-white/5">
                  <td className="p-5 text-xs font-black uppercase tracking-tight w-1/4" style={{ color: dark ? "white" : BLACK }}>
                    {item.name}
                  </td>
                  
                  <td className="p-5 text-xs font-medium leading-relaxed w-2/5">
                    <div className="flex items-start gap-2.5" style={{ color: dark ? NEON : DKGREEN }}>
                      <span className="font-black text-sm">✓</span>
                      <span>{item.voltcore}</span>
                    </div>
                  </td>

                  <td className="p-5 text-xs font-medium leading-relaxed w-2/5">
                    <div className="flex items-start gap-2.5" style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.5)" }}>
                      <span style={{ color: ORANGE }} className="font-black text-sm">✕</span>
                      <span>{item.legacy}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

/* ─── PAGE ──────────────────────────────────────────────────────────────── */
export default function Products() {
  const dark = useIsDark();
  const navigate = useNavigate();

  const [cursor, setCursor] = useState({ x: -300, y: -300 });
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const scrollToHomeContact = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("contact-form");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="w-full bg-white dark:bg-[#14141B] text-[#14141B] dark:text-white min-h-screen font-['AkkuratLL',_sans-serif] selection:bg-[#D9FE42] selection:text-[#14141B]">
      {/* Cursor light — same as Home / About */}
      <div className="fixed pointer-events-none z-50 rounded-full mix-blend-screen"
        style={{
          width: 650,
          height: 650,
          left: cursor.x - 325,
          top: cursor.y - 325,
          background: "radial-gradient(circle, rgba(217,254,66,0.06) 0%, transparent 65%)",
        }}
      />

      <main className="relative z-10">
        <section id="products-hero" className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#14141B]">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: GREEN }} />
            <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background: ORANGE }} />
          </div>
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />

          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pt-32 pb-24">
            <Reveal>
              <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-6 text-[#D9FE42]">
                05 // Products
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] text-white uppercase mb-6">
                One platform. <br /> <span style={{ color: NEON }}>Four industries.</span>
              </h1>
            </Reveal>

            <Reveal delay={180}>
              <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: CRAFT }}>
                The same conductive polymer heating platform, shaped into a different product for every industry we ship to — automotive, food delivery, heated apparel, and underfloor heating. See where it lives.
              </p>
            </Reveal>

            <Reveal delay={260} className="flex flex-wrap gap-4">
              <Link to="/industries"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_0_30px_rgba(217,254,66,0.25)]"
                style={{ background: NEON, color: BLACK }}>
                Explore Industries <FaArrowRight size={9} />
              </Link>
              <button
                onClick={scrollToHomeContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 text-white hover:border-white/50 transition-all duration-300">
                Contact Us <FaArrowRight size={9} />
              </button>
            </Reveal>
          </div>
        </section>

        <ValueChainSection />

        <IndustryProductsSection />

        <ComparisonSection />

        <Footer />
      </main>

      <style>{`
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}