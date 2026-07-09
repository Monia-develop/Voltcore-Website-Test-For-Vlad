import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLinkedin,
  FaYoutube,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

import FilamentsPhoto from "../assets/website/platforms/Filaments.png";
import HeatingMeshPhoto from "../assets/website/platforms/heatingMesh.png";
import HeatingTextilePhoto from "../assets/website/platforms/heatingTextile.png";

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

const useMouseGlow = (enabled) => {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [enabled]);
  return pos;
};

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "activefil",
    num: 1,
    name: "ActiveFil",
    subtitle: "Conductive Polymer Filament",
    tag: "Core Material Patented",
    color: GREEN,
    trl: "TRL 7-8",
    photo: FilamentsPhoto,
    tagline: "The yarn that replaced copper wire.",
    intro:
      "We infuse and orient nanofillers in the polymer, giving desired conductivity in a controlled manner while keeping the mechanical properties of synthetic yarns.",
    desc:
      "CNT nanofillers are infused and oriented inside a thermoplastic polymer matrix, giving the filament precise, tunable conductivity while keeping every mechanical property of standard synthetic yarn. No metal. No brittleness. No compromise.",
    highlight: "4 patent families, 2 granted, 2 PCTs, 1 EP, 3 trademarks.",
    specs: [
      { label: "Linear density", val: "400–600 den / 450–700 dtex" },
      { label: "Resistance", val: "10 kΩ – 2 MΩ" },
      { label: "Polymer matrix", val: "PP / PA / PET" },
      { label: "Weight", val: "30–60 g/km" },
      { label: "Tensile strength", val: "25–30 cN/tex" },
      { label: "Voltage range", val: "5–220 V" },
    ],
    advantages: [
      "Precisely tunable resistance from 10 kΩ to 2 MΩ.",
      "100% mono-material drop-in for standard extrusion lines.",
      "Up to 75% recycled polymer content by mass.",
      "No metal corrosion, no breakage points.",
    ],
  },
  {
    id: "targetheat",
    num: 2,
    name: "TargetHeat",
    subtitle: "Heating Textile Platform",
    tag: "Heating Platform",
    color: ORANGE,
    trl: "TRL 6-7",
    photo: HeatingMeshPhoto,
    tagline: "85–95% of heat reaches the surface. Nothing wasted.",
    intro:
      "Woven from ActiveFil, TargetHeat is a family of heating textiles using unidirectional heat delivery; almost nothing is lost through the back.",
    desc:
      "Open mesh structure for automotive flooring, dense weave for apparel and medical. Engineered heating patterns for maximum comfort at the lowest energy density.",
    highlight:
      "Hard to copy: four patent families protect the platform end to end — compound, process, monofilament, laminate and engineered heating patterns.",
    specs: [
      { label: "Structure", val: "Open mesh / Dense weave" },
      { label: "Weight", val: "30–250 GSM" },
      { label: "Voltage", val: "5–230 V" },
      { label: "Temp max", val: "Up to 100°C" },
      { label: "Uniformity", val: "±4°C" },
      { label: "Roll width", val: "Up to 2 m" },
    ],
    advantages: [
      "85–95% heat delivery to A-surface, zero energy wasted to back.",
      "±4°C uniformity, no hotspots, no cold zones across the surface.",
      "Open mesh 30–60 GSM for automotive airflow breathability.",
      "Dense weave 120–250 GSM for apparel wearable softness.",
    ],
    subProducts: [
      {
        num: "2.1",
        name: "Heating Mesh",
        platform: "TargetHeat",
        photo: HeatingMeshPhoto,
        color: ORANGE,
        trl: "TRL 6",
        specs: ["30–60 GSM", "5–230 V", "Up to 100°C"],
        desc:
          "Open mesh structure with increased spacing between yarns. Used mainly in automotive flooring applications, optimized for airflow, ventilation and multi-layer integration.",
      },
      {
        num: "2.2",
        name: "Heating Textile",
        platform: "TargetHeat",
        photo: HeatingTextilePhoto,
        color: "#F18932",
        trl: "TRL 6",
        specs: ["120–250 GSM", "5–230 V", "Up to 100°C"],
        desc:
          "Controlled yarn layout with engineered heating patterns for maximum comfort at the lowest energy density W/m². For soft, wearable applications like apparel.",
      },
    ],
  },
  {
    id: "sensiterm",
    num: 3,
    name: "SensiTerm",
    subtitle: "Sensing Heating Platform",
    tag: "Sensing Heating",
    color: BLUE,
    trl: "TRL 6",
    photo: HeatingTextilePhoto,
    tagline: "One textile. Heat and sense. No extra layer.",
    intro:
      "SensiTerm co-designs electrical heating and intrinsic piezoresistive sensing in the same textile; the resistance of the filament itself becomes the sensor.",
    desc:
      "Occupancy detection, zoned control, and fault monitoring without any additional sensor hardware. The resistance of the filament itself changes under pressure, enabling intrinsic sensing.",
    highlight:
      "Zero external sensors required: sensing is intrinsic to the CNT filaments piezoresistive behaviour.",
    specs: [
      { label: "Sensing type", val: "Piezoresistive" },
      { label: "Zones", val: "Adaptive multi-zone" },
      { label: "Mapping", val: "Occupancy detection" },
      { label: "Fault detection", val: "Loop integrity alerts" },
      { label: "Integration", val: "No external sensors" },
      { label: "Power control", val: "Zoned adaptive" },
    ],
    advantages: [
      "Intrinsic resistance telemetry, no separate sensor layer.",
      "Occupancy mapping heats only where contact is detected.",
      "Loop integrity alerts mitigate overheat and overcurrent faults.",
      "Zoned adaptive control reduces energy in unoccupied areas.",
    ],
  },
];

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

const COMPAREROWS = [
  { label: "Surface uniformity", voltcore: "±4°C", copper: "±16°C", ink: "±10°C" },
  { label: "Heat delivery to surface", voltcore: "85–95%", copper: "40–60%", ink: "60–70%" },
  { label: "Profile thickness", voltcore: "2–3 mm", copper: "5–13 mm", ink: "3–8 mm" },
  { label: "Energy vs copper", voltcore: "40–60%", copper: "Baseline", ink: "15–20%" },
  { label: "Recyclability", voltcore: "100% mono-material", copper: "Non-recyclable metal", ink: "Non-recyclable composite" },
  { label: "Corrosion / breakage", voltcore: "Zero", copper: "High flex fatigue", ink: "Medium crack-prone" },
  { label: "Sensing capability", voltcore: "Intrinsic SensiTerm", copper: "None", ink: "None" },
  { label: "Industrial compatibility", voltcore: "Drop-in extrusion", copper: "Custom tooling", ink: "Screen-print only" },
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

/* ─── VALUE CHAIN SECTION ────────────────────────────────────────────────── */
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

        <div className="mt-12 relative">
          <div
            className="hidden lg:block absolute left-6 right-6 top-1/2 h-px -translate-y-1/2"
            style={{
              background: dark
                ? "linear-gradient(90deg, rgba(217,254,66,0.15), rgba(217,254,66,0.6), rgba(217,254,66,0.15))"
                : "linear-gradient(90deg, rgba(18,80,60,0.15), rgba(18,80,60,0.55), rgba(18,80,60,0.15))",
            }}
          />
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 relative z-10">
            {VALUECHAIN.map((step, i) => {
              const active = hovered === i;
              return (
                <Reveal key={step.num} delay={i * 80}>
                  <div
                    className="relative h-full rounded-2xl border p-5 transition-all duration-300 cursor-default"
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(i)}
                    style={{
                      background: active ? (dark ? "rgba(217,254,66,0.06)" : "rgba(217,254,66,0.08)") : dark ? "rgba(255,255,255,0.02)" : "white",
                      borderColor: active ? `${NEON}60` : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                      transform: active ? "translateY(-6px)" : "translateY(0)",
                      boxShadow: active ? "0 20px 50px rgba(217,254,66,0.10)" : "none",
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-4 text-xs font-black"
                      style={{
                        background: active ? NEON : dark ? "rgba(217,254,66,0.1)" : "rgba(18,80,60,0.08)",
                        color: BLACK,
                      }}
                    >
                      {step.num}
                    </div>

                    <div
                      className="text-sm font-black mb-3 leading-snug uppercase"
                      style={{ color: dark ? "white" : BLACK }}
                    >
                      {step.label}
                    </div>

                    <p
                      className="text-xs leading-relaxed mb-5"
                      style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(20,20,27,0.62)" }}
                    >
                      {step.desc}
                    </p>

                    <div className="mt-auto space-y-2">
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
                              ? dark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.05)"
                              : `${ORANGE}18`,
                            color: step.production.includes("Client")
                              ? dark
                                ? "rgba(255,255,255,0.4)"
                                : "rgba(0,0,0,0.4)"
                              : ORANGE,
                          }}
                        >
                          {step.production}
                        </div>
                      </div>
                    </div>

                    <div
                      className="hidden lg:flex absolute -right-4 top-12 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center"
                      style={{ color: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)" }}
                    >
                      {i !== VALUECHAIN.length - 1 ? <FaChevronRight size={10} /> : null}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── PRODUCT SECTION ───────────────────────────────────────────────────── */
const ProductSection = ({ p, idx }) => {
  const dark = useIsDark();
  const [tab, setTab] = useState("benefits");
  const [subActive, setSubActive] = useState(0);
  const isEven = idx % 2 === 0;
  const bg = isEven ? (dark ? BLACK : "white") : dark ? "#1a1a22" : "#f5f4f0";
  const displayPhoto = p.subProducts ? p.subProducts[subActive].photo : p.photo;

  return (
    <section
      id={p.id}
      className="w-full py-24 relative overflow-hidden"
      style={{ background: bg }}
    >
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          filter: "blur(140px)",
          opacity: 0.05,
          background: p.color,
          top: -10,
          right: isEven ? -15 : "auto",
          left: isEven ? "auto" : -15,
        }}
      />

      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-7xl">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${!isEven ? "lg:[&>*:first-child]:order-2" : ""}`}>
          <div className="flex flex-col gap-5">
            <Reveal delay={40}>
              <div
                className="relative rounded-3xl overflow-hidden group aspect-[4/3]"
                style={{ border: `1px solid ${dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}` }}
              >
                <img
                  src={displayPhoto}
                  alt={p.subProducts ? p.subProducts[subActive].name : p.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => (e.target.style.opacity = 0)}
                />
                <div
                  className="absolute top-4 right-4 backdrop-blur-md rounded-full px-4 py-1.5"
                  style={{
                    background: "rgba(20,20,27,0.70)",
                    border: `1px solid ${p.color}40`,
                  }}
                >
                  <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: p.color }}>
                    {p.subProducts ? p.subProducts[subActive].trl : p.trl}
                  </span>
                </div>
                <div
                  className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
                  style={{ background: `linear-gradient(to top, ${p.color}15, transparent)` }}
                />
              </div>
            </Reveal>

            {p.subProducts && (
              <Reveal delay={80}>
                <div className="grid grid-cols-2 gap-3">
                  {p.subProducts.map((sub, si) => (
                    <div
                      key={sub.name}
                      className="rounded-2xl border p-4 cursor-pointer transition-all duration-300"
                      style={{
                        background: subActive === si ? `${sub.color}12` : dark ? "rgba(255,255,255,0.02)" : "white",
                        borderColor: subActive === si ? `${sub.color}60` : dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
                        transform: subActive === si ? "translateY(-3px)" : "none",
                        boxShadow: subActive === si ? `0 8px 30px ${sub.color}15` : "none",
                      }}
                      onMouseEnter={() => setSubActive(si)}
                    >
                      <div
                        className="text-[10px] font-black uppercase tracking-widest mb-1"
                        style={{ color: sub.color }}
                      >
                        {sub.num} {sub.name}
                      </div>
                      <p
                        className="text-[11px] leading-relaxed mb-3"
                        style={{ color: dark ? "rgba(255,255,255,0.45)" : "rgba(20,20,27,0.5)" }}
                      >
                        {sub.desc}
                      </p>
                      <ul className="space-y-1">
                        {sub.specs.map((s) => (
                          <li key={s} className="text-[10px] font-bold" style={{ color: sub.color }}>
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={120}>
              <div
                className="rounded-2xl p-5 border"
                style={{
                  background: `${p.color}08`,
                  borderColor: `${p.color}25`,
                }}
              >
                <div className="text-[9px] font-black uppercase tracking-[0.18em] mb-2" style={{ color: p.color }}>
                  Why it&apos;s hard to copy
                </div>
                <p className="text-xs leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.55)" : "rgba(20,20,27,0.6)" }}>
                  {p.highlight}
                </p>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-7">
            <Reveal>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] block mb-4" style={{ color: p.color }}>
                {p.tag}
              </span>
              <div className="flex items-center gap-4 flex-wrap mb-2">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-[0.95]" style={{ color: dark ? "white" : BLACK }}>
                  {p.num} {p.name}
                </h2>
                <span
                  className="px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest"
                  style={{
                    background: `${p.color}18`,
                    color: p.color,
                    border: `1px solid ${p.color}35`,
                  }}
                >
                  {p.trl}
                </span>
              </div>
              <p className="text-base font-bold mb-1" style={{ color: dark ? "rgba(255,255,255,0.4)" : "rgba(20,20,27,0.4)" }}>
                {p.subtitle}
              </p>
              <p className="text-sm italic" style={{ color: p.color }}>
                &quot;{p.tagline}&quot;
              </p>
            </Reveal>

            <Reveal delay={50}>
              <p className="text-sm leading-relaxed" style={{ color: dark ? CRAFT : "rgba(20,20,27,0.65)" }}>
                {p.intro}
              </p>
            </Reveal>

            <Reveal delay={80}>
              <div className="flex gap-1 p-1 rounded-xl border w-fit mb-4" style={{ background: dark ? "#111118" : "#f0eee8", borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}>
                {[
                  ["benefits", "Key Benefits"],
                  ["specs", "Specifications"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    onMouseEnter={() => setTab(id)}
                    onClick={() => setTab(id)}
                    className="px-5 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all duration-200"
                    style={{
                      background: tab === id ? p.color : "transparent",
                      color: tab === id ? BLACK : dark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>

              {tab === "benefits" ? (
                <ul className="space-y-3">
                  {p.advantages.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 p-4 rounded-xl border transition-all duration-250"
                      style={{
                        background: `${p.color}07`,
                        borderColor: `${p.color}22`,
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: p.color }}
                      >
                        <FaCheck size={7} color={BLACK} />
                      </div>
                      <span className="text-sm leading-relaxed" style={{ color: dark ? "rgba(255,255,255,0.78)" : "rgba(20,20,27,0.72)" }}>
                        {a}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  {p.specs.map(({ label, val }) => (
                    <div
                      key={label}
                      className="p-4 rounded-xl border transition-all duration-250"
                      style={{
                        borderColor: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
                        background: dark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                      }}
                    >
                      <div className="text-[9px] font-black uppercase tracking-wider mb-1.5" style={{ color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.32)" }}>
                        {label}
                      </div>
                      <div className="text-xs font-black" style={{ color: p.color }}>
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Reveal>

            <Reveal delay={130}>
              <div className="flex gap-3 flex-wrap pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105"
                  style={{ background: p.color, color: BLACK }}
                >
                  Request samples <FaArrowRight size={9} />
                </Link>
                <Link
                  to="/technology"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    borderColor: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)",
                    color: dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = p.color;
                    e.currentTarget.style.color = p.color;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)";
                    e.currentTarget.style.color = dark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
                  }}
                >
                  See in Technology <FaChevronRight size={9} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── COMPARISON SECTION ────────────────────────────────────────────────── */
const CompareSection = () => {
  const dark = useIsDark();
  const [hovRow, setHovRow] = useState(null);

  return (
    <section className="w-full py-24 bg-[#14141B] relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(217,254,66,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-14">
          <span className="text-xs font-black uppercase tracking-[0.22em] block mb-3 text-[#D9FE42]">
            Head-to-Head
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
            Voltcore vs legacy tech
          </h2>
        </Reveal>

        <div className="grid grid-cols-4 gap-3 mb-2 px-4">
          <div className="text-[9px] font-black uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.2)" }}>
            Criterion
          </div>
          {[
            ["Voltcore", NEON],
            ["Copper Wire", "#E63323"],
            ["Carbon Ink", ORANGE],
          ].map(([label, color]) => (
            <div
              key={label}
              className="text-center py-2 px-3 rounded-full text-[10px] font-black uppercase tracking-widest"
              style={{ background: `${color}14`, color }}
            >
              {label}
            </div>
          ))}
        </div>

        <div className="rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          {COMPAREROWS.map((row, i) => (
            <div
              key={row.label}
              className="grid grid-cols-4 gap-3 px-4 py-4 transition-all duration-200 cursor-default border-b"
              style={{
                background: hovRow === i ? "rgba(255,255,255,0.04)" : "transparent",
                borderColor: "rgba(255,255,255,0.04)",
              }}
              onMouseEnter={() => setHovRow(i)}
              onMouseLeave={() => setHovRow(null)}
            >
              <div className="text-xs font-bold flex items-center" style={{ color: "rgba(255,255,255,0.45)" }}>
                {row.label}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${NEON}22` }}>
                  <FaCheck size={7} color={NEON} />
                </div>
                <span className="text-xs font-black" style={{ color: NEON }}>
                  {row.voltcore}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(230,51,35,0.15)" }}>
                  <FaTimes size={7} color="#E63323" />
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {row.copper}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: `${ORANGE}18` }}>
                  <FaTimes size={7} color={ORANGE} />
                </div>
                <span className="text-xs" style={{ color: "rgba(255,255,255,0.38)" }}>
                  {row.ink}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── PAGE ──────────────────────────────────────────────────────────────── */
export default function Products() {
  const dark = useIsDark();
  const glow = useMouseGlow(dark);

  const visibleProducts = PRODUCTS.filter((p) => p.id !== "sensiterm");

  return (
    <div
      className="w-full bg-white dark:bg-[#14141B] text-[#14141B] dark:text-white min-h-screen"
      style={{
        fontFamily: "Akurat, sans-serif",
      }}
    >
      {dark && (
        <div
          className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 320px at ${glow.x}% ${glow.y}%, rgba(217,254,66,0.12), rgba(217,254,66,0.04) 25%, transparent 65%)`,
          }}
        />
      )}

      <main className="relative z-10">
        <section className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#14141B]">
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute top-14 left-14 w-96 h-96 rounded-full blur-[120px] opacity-10"
              style={{ background: GREEN }}
            />
            <div
              className="absolute bottom-0 right-14 w-80 h-80 rounded-full blur-[100px] opacity-10"
              style={{ background: ORANGE }}
            />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.16) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pt-32 pb-20">
            <Reveal>
              <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-6 text-[#D9FE42]">
                Products
              </span>
            </Reveal>

            <Reveal delay={70}>
              <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.92] text-white uppercase mb-6">
                Three products.
                <br />
                <span style={{ color: NEON }}>One platform.</span>
                <br />
                <span style={{ color: "rgba(255,255,255,0.18)" }}>Zero copper.</span>
              </h1>
            </Reveal>

            <Reveal delay={150}>
              <p className="text-base leading-relaxed max-w-lg mb-10" style={{ color: CRAFT }}>
                With the help of Carbon NanoTubes (CNTs), we make synthetic yarn that can replace copper wire and create fabrics and textiles that can be used as heaters — engineered and patented in Europe.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border mb-10" style={{ background: "rgba(217,254,66,0.10)", borderColor: "rgba(217,254,66,0.30)" }}>
                <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: NEON }}>
                  4 patent families • 2 granted • 2 PCTs • 1 EP • 3 trademarks
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        <ValueChainSection />

        {visibleProducts.map((p, i) => (
          <ProductSection key={p.id} p={p} idx={i} />
        ))}

        <CompareSection />

        <section className="relative py-24 text-center flex flex-col items-center bg-[#f5f4f0] dark:bg-[#0e0e14] overflow-hidden">
          <Reveal>
            <div className="text-xs tracking-[0.18em] uppercase font-bold mb-3" style={{ color: dark ? NEON : DKGREEN }}>
              Request technical samples
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight max-w-2xl mx-auto mb-5" style={{ color: dark ? "white" : BLACK }}>
              Ready to integrate
              <br />
              <span style={{ color: dark ? NEON : DKGREEN }}>Voltcore materials?</span>
            </h2>
            <p className="text-base max-w-lg mx-auto mb-8 leading-relaxed" style={{ color: dark ? "rgba(184,183,164,0.6)" : "rgba(20,20,27,0.5)" }}>
              Our application engineering team will identify which product configuration fits your geometry, voltage, and performance requirements and ship a calibrated sample kit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-105"
                style={{ background: dark ? NEON : BLACK, color: dark ? BLACK : "white" }}
              >
                Contact our team <FaArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/technology"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-[12px] font-black uppercase tracking-widest border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  borderColor: dark ? "rgba(255,255,255,0.15)" : "rgba(20,20,27,0.2)",
                  color: dark ? "rgba(255,255,255,0.5)" : "rgba(20,20,27,0.5)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = dark ? NEON : BLACK;
                  e.currentTarget.style.color = dark ? NEON : BLACK;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = dark ? "rgba(255,255,255,0.15)" : "rgba(20,20,27,0.2)";
                  e.currentTarget.style.color = dark ? "rgba(255,255,255,0.5)" : "rgba(20,20,27,0.5)";
                }}
              >
                Explore the technology <FaChevronRight size={9} />
              </Link>
            </div>
          </Reveal>
        </section>

        <Footer />
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Akurat:wght@400;500;600;700;800;900&display=swap');
        * {
          font-family: 'AkkuratLL', sans-serif !important;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}