import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// ── Images industries ──────────────────────────────────────────────────────────
import CarSeatImg        from "../assets/website/industries/CarSeatHeating.png";
import FoodDeliveryImg   from "../assets/website/industries/FoodDelivery.png";
import HeatedApparelImg  from "../assets/website/industries/Heated-Apparel.png";
import UnderfloorImg     from "../assets/website/industries/Underfloor-Heating.png";
import DefenseImg        from "../assets/website/industries/Defense.png";

// ── Images plateformes ─────────────────────────────────────────────────────────
import TargetHeatImg     from "../assets/website/platforms/BRD-02-targetheat.png";
import ActiveFilImg      from "../assets/website/platforms/BRD-03-activefil.png";
import SensiTermImg      from "../assets/website/platforms/BRD-04-sensiterm.png";

// ── Photos VivaTech ────────────────────────────────────────────────────────────
import VivaTech1Img      from "../assets/website/news/vivatech-booth.jpeg";
import VivaTech2Img      from "../assets/website/news/vivatech-crowd.jpeg";

// ── Footer ─────────────────────────────────────────────────────────────────────
import Footer from "../Components/Footer/Footer";

// ─────────────────────────────────────────────────────────────────────────────
// BRAND TOKENS
// Light  → bg: #B8B7A4 (craft)   text: #14141B   accent: neon green #D9FE42
// Dark   → bg: #14141B (black)   text: #B8B7A4   accent: neon green #D9FE42
//
// Tailwind custom colors expected in tailwind.config.js:
//   voltBlack : "#14141B"
//   voltNeon  : "#D9FE42"
//   voltCraft : "#B8B7A4"
// ─────────────────────────────────────────────────────────────────────────────

const PLATFORMS = [
  {
    name: "ActiveFil",
    tag: "Core Material",
    desc: "CNT-enhanced conductive polymer filaments offering controlled resistivity in a flexible, lightweight, and extrusion-ready format.",
    accentColor: "#94C356",
    image: ActiveFilImg,
  },
  {
    name: "TargetHeat",
    tag: "Heating Platform",
    desc: "Fabric-integrated electrical heating solution generating highly efficient, uniform heat distribution (ΔT ∼4°C) across complex geometries.",
    accentColor: "#F07E26",
    image: TargetHeatImg,
  },
  {
    name: "SensiTerm",
    tag: "Sensing + Heating",
    desc: "Advanced fabric platform co-designing electrical heating and intrinsic resistance-based sensing for zoned control and occupancy detection without external sensors.",
    accentColor: "#4A5DA7",
    image: SensiTermImg,
  },
];

const INDUSTRIES = [
  { slug: "automotive",         title: "Automotive",         tagline: "Extending EV winter driving range by up to 13% through energy-efficient cabin comfort and localized surface heating.", image: CarSeatImg },
  { slug: "food-delivery",      title: "Food & Delivery",    tagline: "Active, ultra-lightweight heating inserts maintaining safe delivery temperatures (≥65°C) for over 3 hours.",          image: FoodDeliveryImg },
  { slug: "heated-apparel",     title: "Heated Apparel",     tagline: "Wire-free, weightless homogeneous warmth for outdoor gear and safety workwear, optimizing battery runtime.",           image: HeatedApparelImg },
  { slug: "underfloor-heating", title: "Underfloor Heating", tagline: "Zero-lag heating mats reaching 28°C in 3 minutes — up to 4× less energy than conventional alternatives.",            image: UnderfloorImg },
  { slug: "defense",            title: "Defense",            tagline: "Specialized, low-observable thermal support and electromagnetic solutions — available only under NDA.",                image: DefenseImg },
];

const NEWS = [
  {
    date: "May 2026",
    tag: "Production",
    title: "Voltcore Graduates 7th Industrial PoC into Full Commercial Production",
    summary: "Top-tier global Tier-1 automotive and industrial partners officially transition from pilot testing to volume manufacturing.",
  },
  {
    date: "April 2026",
    tag: "Sustainability",
    title: "LCA Assessment Confirms up to 75% Lower CO₂ Footprint vs Copper",
    summary: "Third-party Life Cycle Assessments validate our mono-material polymer approach for total end-of-life recyclability.",
  },
  {
    date: "June 2026",
    tag: "Event",
    title: "Voltcore at VivaTech 2026 — Live Demos in Paris",
    summary: "Our executive and tech team showcased interactive smart seating and flexible heating mesh platforms to hundreds of visitors.",
    images: [VivaTech1Img, VivaTech2Img],
  },
];

const STATS = [
  { value: "16",  unit: " PoCs",  label: "Active proof-of-concepts with global OEMs & Tier-1s" },
  { value: "75%", unit: "",       label: "Lower CO₂ footprint vs traditional copper wire systems" },
  { value: "13%", unit: "",       label: "EV winter range extension via localized surface heating" },
  { value: "4×",  unit: "",       label: "Less energy than conventional underfloor heating" },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

/* ── HERO ── */
const HERO_WORDS = ["GO GREEN.", "DRIVE SMART.", "HEAT EFFICIENTLY."];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const full = HERO_WORDS[currentWordIndex];
    const tick = () => {
      if (!isDeleting) {
        setText(full.substring(0, text.length + 1));
        setTypingSpeed(150);
        if (text === full) { setTypingSpeed(2000); setIsDeleting(true); }
      } else {
        setText(full.substring(0, text.length - 1));
        setTypingSpeed(75);
        if (text === "") { setIsDeleting(false); setCurrentWordIndex((p) => (p + 1) % HERO_WORDS.length); }
      }
    };
    const t = setTimeout(tick, typingSpeed);
    return () => clearTimeout(t);
  }, [text, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#B8B7A4] dark:bg-[#14141B]">
      {/* Neon glow — visible in both modes, stronger in dark */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] bg-[#D9FE42]/10 dark:bg-[#D9FE42]/15" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full blur-[120px] bg-[#D9FE42]/8 dark:bg-[#D9FE42]/12" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] dark:opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(#14141B 1px,transparent 1px),linear-gradient(90deg,#14141B 1px,transparent 1px)", backgroundSize: "72px 72px" }}
      />

      <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center">
        {/* Badge */}
        <div
          data-aos="fade-down"
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#14141B]/20 bg-[#14141B]/10 text-[#14141B] dark:border-[#D9FE42]/30 dark:bg-[#D9FE42]/10 dark:text-[#D9FE42] text-xs font-bold uppercase tracking-[0.2em]"
        >
          <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#14141B] dark:bg-[#D9FE42]" />
          Advanced Materials — Bissen, Luxembourg
        </div>

        {/* Typewriter */}
        <div data-aos="fade-up" className="h-12 md:h-16 flex items-center justify-center mb-4">
          <span className="text-3xl md:text-5xl font-black tracking-[0.15em] uppercase text-[#14141B] dark:text-[#D9FE42]">
            {text}
          </span>
          <span className="text-3xl md:text-5xl font-black ml-0.5 animate-pulse text-[#14141B] dark:text-[#D9FE42]">|</span>
        </div>

        {/* Headline */}
        <h1
          data-aos="fade-up"
          data-aos-delay="100"
          className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight mb-6 text-[#14141B] dark:text-white"
        >
          Surface Heating is Stuck<br />
          <span className="text-[#14141B]/60 dark:text-[#B8B7A4]">in the Last Century.</span><br />
          We Are Rewriting the Rules.
        </h1>

        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4]"
        >
          Replacing heavy copper wiring with patented, ultra-thin Carbon Nanotube (CNT) synthetic yarns
          for next-generation thermal management.
        </p>

        <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/technology"
            className="font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:brightness-110 bg-[#14141B] text-[#D9FE42] dark:bg-[#D9FE42] dark:text-[#14141B]"
          >
            Discover Our Technology
          </Link>
          <Link
            to="/contact"
            className="font-bold text-sm uppercase tracking-wider px-8 py-4 rounded-full border transition-all duration-300 hover:bg-[#14141B]/10 dark:hover:bg-white/10 border-[#14141B]/30 text-[#14141B] dark:border-[#B8B7A4]/40 dark:text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs uppercase tracking-widest text-[#14141B] dark:text-[#B8B7A4]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[#14141B] dark:from-[#B8B7A4] to-transparent" />
      </div>
    </section>
  );
};

/* ── STATS TICKER ── */
const StatsTicker = () => (
  <section className="w-full py-8 bg-[#D9FE42]">
    <div className="container mx-auto px-6 max-w-6xl flex gap-10 items-center justify-around flex-wrap">
      {STATS.map((s, i) => (
        <div key={i} className="flex items-center gap-4 min-w-fit">
          <span className="text-3xl md:text-4xl font-black text-[#14141B]">
            {s.value}<span className="text-xl">{s.unit}</span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wide max-w-[160px] leading-snug text-[#14141B]/60">
            {s.label}
          </span>
        </div>
      ))}
    </div>
  </section>
);

/* ── COMPANY INTRO ── */
const CompanyIntro = () => (
  <section className="w-full py-28 bg-[#B8B7A4]/30 dark:bg-[#14141B]">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div data-aos="fade-right">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-4 text-[#14141B] dark:text-[#D9FE42]">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-6 leading-tight text-[#14141B] dark:text-white">
            Deep-tech advanced materials,{" "}
            <span className="text-[#14141B]/60 dark:text-[#B8B7A4]">built in Luxembourg.</span>
          </h2>
          <p className="leading-relaxed text-lg mb-8 text-[#14141B]/70 dark:text-[#B8B7A4]">
            Based in Bissen, Luxembourg, Voltcore is a pioneering advanced materials company
            that eliminates the weight, cost, and design limitations of traditional metal heating elements.
            By integrating conductive nanofillers directly into standard polymer matrices, we deliver
            uniform, flexible, and highly energy-efficient smart surfaces designed for seamless industrial scale-up.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:gap-4 text-[#14141B] dark:text-[#D9FE42]"
          >
            About Voltcore <FaArrowRight size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4" data-aos="fade-left">
          {[
            { label: "Founded",      value: "2024" },
            { label: "Headquarters", value: "Bissen, LU" },
            { label: "Trademarks",   value: "Voltcore® TargetHeat®" },
            { label: "Active Sectors",value: "6 Industries" },
          ].map((f) => (
            <div
              key={f.label}
              className="rounded-2xl p-6 border bg-white/60 border-[#14141B]/10 dark:bg-[#1e1e27] dark:border-[#2a2a35]"
            >
              <span className="text-xs font-bold uppercase tracking-widest block mb-2 text-[#14141B]/40 dark:text-[#B8B7A4]/50">
                {f.label}
              </span>
              <span className="text-xl font-black text-[#14141B] dark:text-white">{f.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ── PLATFORMS ── */
const Platforms = () => (
  <section className="w-full py-28 bg-[#B8B7A4]/15 dark:bg-[#1a1a22]">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
        <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#14141B] dark:text-[#D9FE42]">
          Technology Platforms
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 text-[#14141B] dark:text-white">
          Our Proprietary{" "}
          <span className="text-[#14141B]/60 dark:text-[#B8B7A4]">Material Stack</span>
        </h2>
        <p className="text-[#14141B]/70 dark:text-[#B8B7A4]">
          Voltcore's proprietary platforms built on advanced polymer science,
          designed for OEMs, Tier-1s, and engineers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {PLATFORMS.map((p, i) => (
          <div
            key={p.name}
            data-aos="fade-up"
            data-aos-delay={i * 120}
            className="group rounded-3xl overflow-hidden border transition-all duration-500 bg-white border-[#14141B]/10 hover:border-[#14141B]/40 hover:shadow-lg dark:bg-[#14141B] dark:border-[#2a2a35] dark:hover:border-[#D9FE42] dark:hover:shadow-[0_0_40px_rgba(217,254,66,0.10)]"
          >
            <div className="relative h-44 flex items-center justify-center overflow-hidden bg-[#14141B]">
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-7">
              <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 text-[#14141B]/40 dark:text-[#B8B7A4]/50">
                {p.tag}
              </span>
              <h3
                className="text-xl font-black tracking-tight mb-3"
                style={{ color: p.accentColor }}
              >
                {p.name}
              </h3>
              <p className="text-sm leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4]">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center" data-aos="fade-up">
        <Link
          to="/technology"
          className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:gap-4 text-[#14141B] dark:text-[#D9FE42]"
        >
          Discover Our Technology Platform <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  </section>
);

/* ── INDUSTRIES ── */
const IndustriesSection = () => (
  <section className="w-full py-28 bg-[#B8B7A4]/30 dark:bg-[#14141B]">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
        <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#14141B] dark:text-[#D9FE42]">
          Industry Presence
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight text-[#14141B] dark:text-white">
          Tailored Thermal Performance for{" "}
          <span className="text-[#14141B]/60 dark:text-[#B8B7A4]">Global Industrial Scales</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        {INDUSTRIES.slice(0, 2).map((ind, i) => <IndustryCard key={ind.slug} ind={ind} delay={i * 80} tall />)}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {INDUSTRIES.slice(2).map((ind, i) => <IndustryCard key={ind.slug} ind={ind} delay={(i + 2) * 80} />)}
      </div>

      <div className="text-center mt-10" data-aos="fade-up">
        <Link
          to="/industries"
          className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:gap-4 text-[#14141B] dark:text-[#D9FE42]"
        >
          Explore All Applications <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  </section>
);

const IndustryCard = ({ ind, delay, tall }) => (
  <Link
    to={`/industries/${ind.slug}`}
    data-aos="fade-up"
    data-aos-delay={delay}
    className="group relative rounded-3xl overflow-hidden block border border-transparent transition-all duration-500 hover:border-[#14141B]/40 hover:shadow-xl dark:hover:border-[#D9FE42] dark:hover:shadow-[0_0_40px_rgba(217,254,66,0.10)]"
  >
    <div className={`relative ${tall ? "h-80" : "h-64"} flex flex-col justify-end bg-[#14141B]/10 dark:bg-[#1a1a22]`}>
      {ind.image && (
        <img
          src={ind.image}
          alt={ind.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-[#14141B]/30 to-transparent" />
      <div className="relative z-10 p-7">
        <h3 className="text-xl font-bold tracking-tight mb-1 text-white transition-colors duration-300 group-hover:text-[#D9FE42]">
          {ind.title}
        </h3>
        <p className="text-sm leading-relaxed text-[#B8B7A4]">{ind.tagline}</p>
        <div className="mt-3 flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#B8B7A4]/50 transition-colors duration-300 group-hover:text-[#D9FE42]">
          <span>Explore</span>
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  </Link>
);

/* ── NEWS ── */
const NewsSection = () => (
  <section className="w-full py-28 bg-[#B8B7A4]/15 dark:bg-[#1a1a22]">
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
        <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#14141B] dark:text-[#D9FE42]">
          News & Recognition
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#14141B] dark:text-white">
          Latest from <span className="text-[#14141B]/60 dark:text-[#B8B7A4]">Voltcore</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {NEWS.map((n, i) => (
          <div
            key={n.title}
            data-aos="fade-up"
            data-aos-delay={i * 100}
            className="group rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer bg-white border-[#14141B]/10 hover:border-[#14141B]/30 hover:shadow-lg dark:bg-[#14141B] dark:border-[#2a2a35] dark:hover:border-[#D9FE42] dark:hover:shadow-[0_0_30px_rgba(217,254,66,0.08)]"
          >
            {n.images && n.images.length > 0 && (
              <div className="grid grid-cols-2 gap-0.5 h-44">
                {n.images.slice(0, 2).map((img, idx) => (
                  <div key={idx} className="overflow-hidden">
                    <img src={img} alt={`VivaTech ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                ))}
              </div>
            )}
            <div className="p-7">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#14141B]/10 text-[#14141B] dark:bg-[#D9FE42]/20 dark:text-[#D9FE42]">
                  {n.tag}
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#14141B]/40 dark:text-[#B8B7A4]/50">
                  {n.date}
                </span>
              </div>
              <h3 className="text-base font-bold mb-3 leading-snug text-[#14141B] dark:text-white transition-colors duration-300 group-hover:text-[#14141B]/70 dark:group-hover:text-[#D9FE42]">
                {n.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#14141B]/60 dark:text-[#B8B7A4]">{n.summary}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center" data-aos="fade-up">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:gap-4 text-[#14141B] dark:text-[#D9FE42]"
        >
          See All News <FaArrowRight size={12} />
        </Link>
      </div>
    </div>
  </section>
);

/* ── FOOTER CTA ── */
const FooterCTA = () => {
  const [email, setEmail] = useState("");

  return (
    <section className="w-full py-28 bg-[#B8B7A4]/30 dark:bg-[#14141B]">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Newsletter */}
          <div
            data-aos="fade-right"
            className="rounded-3xl p-10 border bg-white/70 border-[#14141B]/10 dark:bg-[#1a1a22] dark:border-[#2a2a35]"
          >
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-4 text-[#14141B] dark:text-[#D9FE42]">
              Newsletter
            </span>
            <h3 className="text-2xl font-black tracking-tight mb-3 text-[#14141B] dark:text-white">
              Stay Ahead in Thermal Innovation.
            </h3>
            <p className="text-sm mb-6 text-[#14141B]/60 dark:text-[#B8B7A4]">
              Receive our technical whitepapers, materials updates, and corporate rollouts.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your corporate email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-colors bg-[#B8B7A4]/20 border border-[#14141B]/15 text-[#14141B] placeholder-[#14141B]/40 focus:border-[#14141B] dark:bg-[#14141B] dark:border-[#2a2a35] dark:text-white dark:placeholder-[#B8B7A4]/40 dark:focus:border-[#D9FE42]"
              />
              <button
                className="font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 hover:brightness-110 hover:scale-105 bg-[#14141B] text-[#D9FE42] dark:bg-[#D9FE42] dark:text-[#14141B]"
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Contact CTA */}
          <div
            data-aos="fade-left"
            className="rounded-3xl p-10 flex flex-col justify-between relative overflow-hidden bg-[#D9FE42]"
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-15 -translate-y-1/2 translate-x-1/2 bg-[#14141B]" />
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-4 text-[#14141B]/60">
                Partner with us
              </span>
              <h3 className="text-2xl font-black tracking-tight mb-3 text-[#14141B]">
                Ready to partner with Voltcore?
              </h3>
              <p className="text-sm leading-relaxed text-[#14141B]/70">
                Request technology specifications, discuss custom geometry integrations,
                or order your material samples today.
              </p>
            </div>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 w-fit relative z-10 bg-[#14141B] text-[#D9FE42]"
            >
              Contact Our Team <FaArrowRight size={12} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

// ─────────────────────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────────────────────

const Home = () => (
  <>
    <Hero />
    <StatsTicker />
    <CompanyIntro />
    <Platforms />
    <IndustriesSection />
    <NewsSection />
    <FooterCTA />
    <Footer />
  </>
);

export default Home;
