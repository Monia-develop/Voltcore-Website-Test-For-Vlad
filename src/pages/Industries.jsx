import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import CarSeatImg       from "../assets/website/industries/CarSeatHeating.png";
import FoodDeliveryImg  from "../assets/website/industries/FoodDelivery.png";
import HeatedApparelImg from "../assets/website/industries/Heated-Apparel.png";
import UnderfloorImg    from "../assets/website/industries/Underfloor-Heating.png";
import DefenseImg       from "../assets/website/industries/Defense.png";

const INDUSTRIES = [
  {
    slug: "automotive",
    num: "01",
    title: "Automotive",
    tagline: "Cabin Cocoon heating for EV & premium interiors",
    stat: "+13% EV winter range",
    image: CarSeatImg,
    ready: true,
    accent: "#94C356",
  },
  {
    slug: "food-delivery",
    num: "02",
    title: "Food & Delivery",
    tagline: "Active heating inserts maintaining ≥65°C for over 3 hours",
    stat: "3h+ heat retention",
    image: FoodDeliveryImg,
    ready: true,
    accent: "#F07E26", 
  },
  {
    slug: "heated-apparel",
    num: "03",
    title: "Heated Apparel",
    tagline: "Wire-free, weightless warmth for outdoor gear & workwear",
    stat: "2× battery runtime",
    image: HeatedApparelImg,
    ready: true,
    accent: "#4A5DA7",
  },
  {
    slug: "underfloor-heating",
    num: "04",
    title: "Underfloor Heating",
    tagline: "Zero-lag mats reaching 28°C in 3 minutes",
    stat: "4× less energy",
    image: UnderfloorImg,
    ready: true,
    accent: "#94C356",
  },
  {
    slug: "defense",
    num: "05",
    title: "Defense",
    tagline: "Specialized thermal & EM solutions — under NDA only",
    stat: "NDA Required",
    image: DefenseImg,
    ready: true,
    accent: "#B8B7A4",
  },
];

const Industries = () => {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="min-h-screen bg-[#f5f4f0] dark:bg-[#14141B] text-[#14141B] dark:text-white">

      {/* ── HEADER ── */}
      <section className="relative pt-36 pb-20 px-6 overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(148,195,86,0.07),transparent_60%)] pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-4">
            03 // Industry Presence
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none text-white max-w-2xl">
              Where Voltcore™ <span className="text-white/20">Heats the World</span>
            </h1>
            <p className="text-[#B8B7A4] max-w-sm text-sm font-light leading-relaxed">
              Select an industry to see how our polymer heating platform performs against legacy
              technology — with the bench data to back it up.
            </p>
          </div>
        </div>
      </section>

      {/* ── STAT STRIP ── */}
      <section className="border-y border-[#e8e6e0] dark:border-[#2a2a3a] bg-[#f5f4f0] dark:bg-[#1a1a22]">
        <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-[#e8e6e0] dark:divide-[#2a2a3a]">
          {INDUSTRIES.map((ind) => (
            <div key={ind.slug} className="p-6 text-center group hover:bg-[#94C356]/5 transition-colors duration-300">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#14141B]/30 dark:text-white/20 block mb-1">
                {ind.num}
              </span>
              <span className="text-sm font-bold text-[#14141B] dark:text-white block">{ind.title}</span>
              <span className="text-xs font-mono" style={{ color: ind.accent }}>{ind.stat}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN GRID ── */}
      <section className="py-20 px-6 bg-[#f5f4f0] dark:bg-[#14141B]">
        <div className="container mx-auto max-w-6xl">

          {/* Row 1 : 2 tall cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {INDUSTRIES.slice(0, 2).map((ind) => (
              <IndustryCard key={ind.slug} ind={ind} hovered={hovered} setHovered={setHovered} tall />
            ))}
          </div>

          {/* Row 2 : 3 medium cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INDUSTRIES.slice(2).map((ind) => (
              <IndustryCard key={ind.slug} ind={ind} hovered={hovered} setHovered={setHovered} />
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA FOOTER ── */}
      <section className="py-20 px-6 bg-[#14141B] border-t border-[#2a2a3a]">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="text-[11px] tracking-[0.18em] uppercase text-[#94C356] font-bold mb-4">// Custom Applications</div>
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-4">
            Don't see your industry?
          </h2>
          <p className="text-[#B8B7A4] mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Voltcore's polymer heating platform adapts to any surface, geometry, or thermal requirement.
            Let's discuss your application.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#D9FE42] text-[#14141B] font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full hover:bg-[#94C356] hover:text-white transition-all duration-300 hover:scale-105"
          >
            Contact Our Engineering Team <FaArrowRight size={10} />
          </Link>
        </div>
      </section>

    </div>
  );
};

const IndustryCard = ({ ind, hovered, setHovered, tall }) => {
  const isHovered = hovered === ind.slug;

  return (
    <Link
      to={`/industries/${ind.slug}`}
      onMouseEnter={() => setHovered(ind.slug)}
      onMouseLeave={() => setHovered(null)}
      className={`group relative overflow-hidden block transition-all duration-500 rounded-2xl ${tall ? "h-[420px]" : "h-[320px]"}`}
      style={{
        outline: isHovered ? `2px solid ${ind.accent}` : "2px solid transparent",
      }}
    >
      {/* Image */}
      {ind.image && (
        <img
          src={ind.image}
          alt={ind.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
          style={{ opacity: isHovered ? 0.55 : 0.35, transform: isHovered ? "scale(1.05)" : "scale(1)" }}
        />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

      {/* Number top left */}
      <span className="absolute top-6 left-6 text-[11px] font-black tracking-widest text-white/40 z-10">
        {ind.num}
      </span>

      {/* Stat top right */}
      <span
        className="absolute top-6 right-6 text-[10px] font-black uppercase tracking-wider px-3 py-1 z-10 transition-all duration-300"
        style={{
          color: ind.accent,
          background: `${ind.accent}18`,
          border: `1px solid ${ind.accent}40`,
        }}
      >
        {ind.stat}
      </span>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
        <h3
          className="text-2xl md:text-3xl font-black tracking-tight text-white mb-2 transition-colors duration-300"
          style={{ color: isHovered ? ind.accent : "white" }}
        >
          {ind.title}
        </h3>
        <p className="text-zinc-300 text-sm leading-relaxed mb-4 transition-all duration-300"
           style={{ opacity: isHovered ? 1 : 0.7 }}>
          {ind.tagline}
        </p>
        <div
          className="flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all duration-300"
          style={{ color: isHovered ? ind.accent : "rgba(255,255,255,0.4)" }}
        >
          <span>Explore</span>
          <FaArrowRight size={10} className={`transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`} />
        </div>
      </div>
    </Link>
  );
};

export default Industries;
