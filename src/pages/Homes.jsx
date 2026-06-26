import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaLinkedin, FaYoutube, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

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

const PLATFORMS = [
  {
    name: "ActiveFil™",
    tag: "Core Material",
    desc: "CNT-enhanced conductive polymer filaments offering controlled resistivity in a flexible, lightweight, and extrusion-ready format.",
    accentColor: "#94C356",
    image: ActiveFilImg,
  },
  {
    name: "TargetHeat™",
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
    date: "August 2025",
    tag: "Media Coverage",
    title: "Luxembourg's Voltcore™ Heats Up EV Innovation Across Europe",
    summary: "Featured in Forbes Luxembourg: Discover how our patented Carbon Nanotube (CNT) technology is reshaping the automotive footprint.",
    link: "https://www.forbes.lu/luxembourg-voltcore-heats-up-ev-innovation-across-europe/",
    isExternal: true
  },
  {
    date: "October 2025",
    tag: "Production",
    title: "Voltcore™ Graduates Industrial Validation into Full Commercial Production",
    summary: "Top-tier global Tier-1 automotive and industrial partners officially transition from pilot testing to volume manufacturing.",
    link: "/news",
    isExternal: false
  },
  {
    date: "February 2026",
    tag: "Sustainability",
    title: "LCA Assessment Confirms up to 75% Lower CO₂ Footprint vs Copper",
    summary: "Third-party Life Cycle Assessments validate our mono-material polymer approach for total end-of-life recyclability.",
    link: "/news",
    isExternal: false
  }
];

const TEAM_PREVIEW = [
  { name: "Fabrice Bertinchamps", role: "Co-founder & CEO" },
  { name: "Vlad Batkhin",         role: "Co-founder & CTO" },
  { name: "Daria Voronina",       role: "Sustainability & BD" },
];

const HERO_WORDS = ["GO GREEN.", "DRIVE SMART.", "HEAT EFFICIENTLY."];

// ── Petit composant magique pour animer au défilement ────────────────────────
const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      {children}
    </div>
  );
};

const Home = () => {
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
    <div className="bg-white dark:bg-[#14141B] text-[#14141B] dark:text-[#B8B7A4] min-h-screen selection:bg-[#D9FE42] selection:text-[#14141B] overflow-x-hidden font-sans">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden bg-[#B8B7A4] dark:bg-[#14141B]">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,27,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,27,0.08)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(184,183,164,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(184,183,164,0.06)_1px,transparent_1px)] bg-[size:90px_90px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#D9FE42]/0 dark:bg-[#D9FE42]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#14141B]/10 dark:bg-[#B8B7A4]/10 border border-[#14141B]/20 dark:border-[#B8B7A4]/20 text-xs tracking-[0.2em] uppercase text-[#14141B] dark:text-[#B8B7A4] mb-8 font-semibold backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#14141B] dark:bg-[#D9FE42] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#14141B] dark:bg-[#D9FE42]" />
            </span>
            Advanced Materials — Bissen, Luxembourg
          </div>

          <div className="h-8 mb-4 flex items-center justify-center">
            <span className="text-xs font-black tracking-[0.4em] text-[#14141B]/60 dark:text-[#D9FE42] uppercase">
              {text}<span className="animate-pulse ml-0.5">|</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.95] text-[#14141B] dark:text-white uppercase max-w-4xl mb-8">
            Surface Heating is Stuck <br />
            <span className="text-[#14141B]/30 dark:text-white/20">in the Last Century.</span> <br />
            We Are Rewriting <span className="text-[#14141B] dark:text-[#D9FE42]">the Rules.</span>
          </h1>

          <p className="text-base md:text-lg text-[#14141B]/70 dark:text-[#B8B7A4] max-w-2xl font-light leading-relaxed mb-12">
            Replacing heavy copper wiring with patented, ultra-thin Carbon Nanotube (CNT) synthetic yarns for next-generation thermal management.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              to="/technology"
              className="group px-8 py-5 bg-[#14141B] dark:bg-[#D9FE42] text-white dark:text-[#14141B] font-black uppercase text-xs tracking-widest rounded-full transition-all duration-300 hover:bg-[#D9FE42] hover:text-[#14141B] dark:hover:bg-white flex items-center justify-center gap-3"
            >
              <span>Discover Our Technology</span>
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" size={12} />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-5 border border-[#14141B]/40 dark:border-[#B8B7A4]/40 hover:border-[#14141B] dark:hover:border-[#B8B7A4] text-[#14141B] dark:text-[#B8B7A4] font-black uppercase text-xs tracking-widest rounded-full transition-all duration-300 bg-transparent flex items-center justify-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. METRICS ── */}
      <section className="relative z-20 border-y border-[#14141B]/10 dark:border-[#B8B7A4]/10 bg-white dark:bg-[#14141B]">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#14141B]/10 dark:divide-[#B8B7A4]/10">
          {[
            { stat: "-75%",    label: "CO₂ Footprint vs Copper",      labelColor: "text-[#14141B] dark:text-[#B8B7A4]", statColor: "text-[#94C356]", desc: "Validated lifecycle efficiency improvements targeting high production sustainability standards." },
            { stat: "Up to 4x", label: "Less Energy Consumption",     labelColor: "text-[#94C356]",                      statColor: "text-[#14141B] dark:text-white", desc: "Unidirectional micro-heating architecture channeling thermal focus exactly where it's needed." },
            { stat: "3 Mins",  label: "To Reach Target Temperature",  labelColor: "text-[#14141B] dark:text-[#B8B7A4]", statColor: "text-[#14141B] dark:text-white", desc: "Instant heat delivery profiles overcoming structural resistance thresholds without thermal lag." },
          ].map((m) => (
            <div key={m.label} className="p-12 lg:p-16 flex flex-col justify-between group hover:bg-[#B8B7A4]/10 dark:hover:bg-[#B8B7A4]/5 transition-colors duration-300">
              <span className={`text-6xl lg:text-7xl font-black tracking-tighter block mb-6 transition-transform duration-500 group-hover:-translate-y-1 ${m.statColor}`}>{m.stat}</span>
              <div>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${m.labelColor}`}>{m.label}</h4>
                <p className="text-xs text-[#14141B]/50 dark:text-[#B8B7A4]/60">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. WHO WE ARE ── */}
      <section className="w-full py-32 bg-[#B8B7A4]/20 dark:bg-[#14141B] relative overflow-hidden border-t border-[#14141B]/5 dark:border-[#B8B7A4]/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-5 sticky top-28">
                <span className="text-xs font-bold uppercase tracking-[0.3em] block text-[#94C356] mb-4">01 // Who We Are</span>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-[0.95] text-[#14141B] dark:text-white">
                  Deep-tech advanced materials, <span className="text-[#14141B]/30 dark:text-white/20">built in Luxembourg.</span>
                </h2>
              </div>

              <div className="lg:col-span-7 space-y-12 lg:pl-12">
                <p className="text-xl md:text-2xl text-[#14141B] dark:text-[#B8B7A4] font-light leading-relaxed">
                  Based in Bissen, Luxembourg, Voltcore™ is a pioneering advanced materials company that eliminates the weight, cost, and design limitations of traditional metal heating elements.
                </p>
                <p className="text-base text-[#14141B]/60 dark:text-[#B8B7A4]/70 leading-relaxed">
                  By integrating conductive nanofillers directly into standard polymer matrices, we deliver uniform, flexible, and highly energy-efficient smart surfaces designed for seamless industrial scale-up.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
                  {[
                    { label: "Founded", value: "2024" },
                    { label: "Headquarters", value: "Bissen, LU" },
                    { label: "Trademarks", value: "Voltcore™ ActiveFil™ TargetHeat™" },
                    { label: "Active Sectors", value: "6 Industries" },
                  ].map((f) => (
                    <div key={f.label} className="p-6 border border-[#14141B]/5 dark:border-[#B8B7A4]/10 bg-white dark:bg-[#B8B7A4]/5 rounded-2xl">
                      <span className="text-[10px] font-black uppercase tracking-widest block text-[#14141B]/40 dark:text-[#B8B7A4]/50 mb-1">{f.label}</span>
                      <span className="text-sm font-bold text-[#14141B] dark:text-white block">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 4. TECHNOLOGY PLATFORMS ── */}
      <section className="w-full py-32 bg-white dark:bg-[#14141B] border-t border-[#14141B]/5 dark:border-[#B8B7A4]/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] block text-[#94C356] mb-3">02 // Technology Platforms</span>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-[#14141B] dark:text-white">Our Proprietary <span className="text-[#14141B]/25 dark:text-white/20">Material Stack</span></h2>
              </div>
              <p className="text-[#14141B]/60 dark:text-[#B8B7A4]/70 max-w-sm text-sm font-light">
                Voltcore's proprietary platforms built on advanced polymer science, designed for OEMs, Tier-1s, and engineers.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-6">
            {PLATFORMS.map((p) => (
              <ScrollReveal key={p.name}>
                <div className="group relative border border-transparent bg-[#14141B] overflow-hidden rounded-3xl transition-all duration-500 hover:border-[#94C356]/40 shadow-xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                    <div className="p-8 md:p-12 lg:col-span-7 relative z-10 flex flex-col justify-center h-full">
                      <span className="text-[10px] font-bold tracking-[0.25em] text-[#94C356] uppercase mb-2 block">// {p.tag}</span>
                      <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-4">{p.name}</h3>
                      <p className="text-sm md:text-base text-gray-400 leading-relaxed max-w-xl mb-6">{p.desc}</p>
                      <div>
                        <span className="inline-block h-1 w-12 rounded-full" style={{ backgroundColor: p.accentColor }} />
                      </div>
                    </div>
                    <div className="lg:col-span-5 bg-black/40 h-64 lg:h-full min-h-[260px] flex items-center justify-center p-8 relative border-t lg:border-t-0 lg:border-l border-white/5">
                      <img src={p.image} alt={p.name} className="max-h-44 w-auto object-contain relative z-10 transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/technology" className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#94C356] hover:text-[#14141B] dark:hover:text-white transition-colors group">
              <span>Discover Our Technology Platform</span>
              <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. INDUSTRIES ── */}
      <section className="w-full py-32 bg-[#B8B7A4]/20 dark:bg-[#14141B] border-t border-[#14141B]/5 dark:border-[#B8B7A4]/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="max-w-2xl mb-24">
              <span className="text-xs font-bold uppercase tracking-[0.3em] block text-[#94C356] mb-3">03 // Industry Presence</span>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-[#14141B] dark:text-white">Tailored Thermal Performance for <span className="text-[#14141B]/25 dark:text-white/20">Global Industrial Scales</span></h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {INDUSTRIES.map((ind, i) => {
              const colSpan = i === 0 || i === 1 ? "lg:col-span-6" : "lg:col-span-4";
              return (
                <div key={ind.slug} className={`${colSpan} w-full`}>
                  <ScrollReveal>
                    <Link to={`/industries/${ind.slug}`} className="group relative rounded-2xl overflow-hidden block border border-transparent bg-[#14141B] h-80 flex flex-col justify-end p-8 transition-all duration-500 hover:border-[#94C356]/30 shadow-lg w-full">
                      {ind.image && (
                        <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                      <div className="relative z-10">
                        <h3 className="text-xl font-bold tracking-tight text-white mb-2 group-hover:text-[#D9FE42] transition-colors">{ind.title}</h3>
                        <p className="text-xs text-gray-200 leading-relaxed line-clamp-3">{ind.tagline}</p>
                      </div>
                    </Link>
                  </ScrollReveal>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-16">
            <Link to="/industries" className="inline-flex items-center gap-2 font-black text-xs uppercase tracking-widest text-[#94C356] hover:text-[#14141B] dark:hover:text-white transition-colors group">
              <span>Explore All Applications</span>
              <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 6. NEWS ── */}
      <section className="w-full py-32 bg-white dark:bg-[#14141B] border-t border-[#14141B]/5 dark:border-[#B8B7A4]/10">
        <div className="container mx-auto px-6 max-w-5xl">
          <ScrollReveal>
            <div className="text-center max-w-xl mx-auto mb-24">
              <span className="text-xs font-bold uppercase tracking-[0.3em] block text-[#94C356] mb-3">04 // News & Recognition</span>
              <h2 className="text-4xl font-black uppercase tracking-tight text-[#14141B] dark:text-white">Latest from Voltcore™</h2>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-[#14141B]/10 dark:divide-[#B8B7A4]/10">
            {NEWS.map((n) => {
              const LinkComponent = n.isExternal ? "a" : Link;
              const linkProps = n.isExternal
                ? { href: n.link, target: "_blank", rel: "noopener noreferrer" }
                : { to: n.link };

              return (
                <ScrollReveal key={n.title}>
                  <LinkComponent {...linkProps} className="group py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 block transition-all duration-300">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-[#94C356]/10 text-[#94C356] rounded-full">{n.tag}</span>
                        <span className="text-xs text-[#14141B]/50 dark:text-[#B8B7A4]/60">{n.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#14141B] dark:text-white group-hover:text-[#94C356] transition-colors duration-300 mb-2">{n.title}</h3>
                      <p className="text-sm text-[#14141B]/60 dark:text-[#B8B7A4]/70 font-light">{n.summary}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-[#14141B]/10 dark:border-[#B8B7A4]/20 flex items-center justify-center text-[#14141B]/40 dark:text-[#B8B7A4]/50 group-hover:text-[#94C356] group-hover:border-[#94C356] transition-all flex-shrink-0 group-hover:translate-x-1">
                      <FaArrowRight size={12} />
                    </div>
                  </LinkComponent>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. LEADERSHIP ── */}
      <section className="w-full py-32 bg-[#B8B7A4]/20 dark:bg-[#14141B] border-t border-[#14141B]/5 dark:border-[#B8B7A4]/5">
        <div className="container mx-auto px-6 max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] block text-[#94C356] mb-3">05 // Leadership</span>
                <h2 className="text-4xl font-black uppercase tracking-tighter text-[#14141B] dark:text-white">People Behind Voltcore™</h2>
              </div>
              <Link to="/about#team" className="text-xs font-black uppercase tracking-widest text-[#94C356] flex items-center gap-2 group">
                <span>Meet the full team</span>
                <FaArrowRight size={10} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {TEAM_PREVIEW.map((m) => (
              <ScrollReveal key={m.name}>
                <div className="group bg-white dark:bg-[#B8B7A4]/5 border border-[#14141B]/5 dark:border-[#B8B7A4]/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#94C356]/30">
                  <div className="h-64 bg-[#B8B7A4]/20 dark:bg-[#B8B7A4]/5 flex items-center justify-center relative">
                    <span className="text-7xl font-black text-[#14141B]/5 dark:text-[#B8B7A4]/10 group-hover:text-[#94C356]/15 transition-colors duration-500">{m.name[0]}</span>
                  </div>
                  <div className="p-6 bg-white dark:bg-transparent">
                    <h3 className="text-base font-bold text-[#14141B] dark:text-white">{m.name}</h3>
                    <span className="text-xs font-semibold tracking-wide text-[#94C356] block mt-0.5">{m.role}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CTA ── */}
      <section className="w-full py-20 bg-white dark:bg-[#14141B] px-6 border-t border-[#14141B]/5 dark:border-[#B8B7A4]/5">
        <div className="container mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="relative rounded-3xl p-10 md:p-16 overflow-hidden bg-[#B8B7A4]/20 dark:bg-[#B8B7A4]/5 border border-[#14141B]/5 dark:border-[#B8B7A4]/10 text-center flex flex-col items-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(217,254,66,0.08),transparent_60%)] pointer-events-none" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-[#94C356] mb-3">// Partner with us</span>
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-[#14141B] dark:text-white mb-8 max-w-xl">Ready to partner with Voltcore™?</h3>
              <Link
                to="/contact"
                className="px-8 py-5 bg-[#14141B] dark:bg-[#D9FE42] text-white dark:text-[#14141B] font-black uppercase text-xs tracking-widest rounded-full transition-all duration-300 hover:bg-[#D9FE42] hover:text-[#14141B] dark:hover:bg-white"
              >
                Contact Our Team
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 9. FOOTER ── */}
      <footer className="w-full bg-[#B8B7A4]/20 dark:bg-[#0e0e13] text-[#14141B]/60 dark:text-[#B8B7A4]/70 py-20 border-t border-[#14141B]/10 dark:border-[#B8B7A4]/10 relative z-10 text-xs">
        <div className="container mx-auto px-6 max-w-6xl grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-lg font-black tracking-widest mb-4 text-[#14141B] dark:text-white">VOLTCORE™</h3>
            <p className="leading-relaxed mb-6 max-w-xs">
              Next-generation polymer matrix smart heating configurations replacing traditional metal wire infrastructures.
            </p>
            <div className="flex gap-3">
              <a href="https://www.linkedin.com/company/voltcore-tech/posts/?feedView=all" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-[#14141B]/5 dark:bg-[#B8B7A4]/5 flex items-center justify-center text-[#14141B] dark:text-[#B8B7A4] hover:bg-[#94C356] hover:text-white transition-colors duration-300">
                <FaLinkedin size={14} />
              </a>
              <a href="https://www.youtube.com/channel/UCpsmhxcP-_XRV9fFRuIZXCA" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-[#14141B]/5 dark:bg-[#B8B7A4]/5 flex items-center justify-center text-[#14141B] dark:text-[#B8B7A4] hover:bg-[#94C356] hover:text-white transition-colors duration-300">
                <FaYoutube size={14} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#14141B] dark:text-white tracking-wider uppercase mb-4">// Sitemap</h4>
            <ul className="space-y-2.5">
              {[["Home","/"],["Technology","/technology"],["Industries","/industries"],["About Us","/about"],["News","/news"],["Contact","/contact"]].map(([label, to]) => (
                <li key={to}><Link to={to} className="hover:text-[#94C356] transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#14141B] dark:text-white tracking-wider uppercase mb-4">// Platforms</h4>
            <ul className="space-y-2.5">
              {["ActiveFil™ Matrix","TargetHeat™ Systems","SensiTerm Fabric"].map((p) => (
                <li key={p}><Link to="/technology" className="hover:text-[#94C356] transition-colors">{p}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[#14141B] dark:text-white tracking-wider uppercase mb-4">// Contact HQ</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <FaMapMarkerAlt className="mt-0.5 text-[#94C356]" size={12} />
                <span>11, rue de l'Industrie,<br />L-7735 Bissen, Luxembourg</span>
              </li>
              <li className="flex items-center gap-2.5">
                <FaEnvelope className="text-[#94C356]" size={12} />
                <a href="mailto:info@voltcore.tech" className="hover:text-[#14141B] dark:hover:text-white transition-colors">info@voltcore.tech</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-6xl mt-16 pt-8 border-t border-[#14141B]/10 dark:border-[#B8B7A4]/10 flex flex-col md:flex-row justify-between text-[10px] text-[#14141B]/30 dark:text-[#B8B7A4]/40 gap-4">
          <span>&copy; {new Date().getFullYear()} Voltcore™ S.A. All rights reserved. Registered trademark.</span>
          <div className="flex gap-4">
            <a href="#privacy" className="hover:text-[#14141B] dark:hover:text-white">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#14141B] dark:hover:text-white">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Home;