import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaArrowUp } from "react-icons/fa"; // Changement ici : FaArrowUp au lieu de FaArrowUpRight

import CarSeatImg       from "../assets/website/industries/CarSeatHeating.png";
import FoodDeliveryImg  from "../assets/website/industries/FoodDelivery.png";
import HeatedApparelImg from "../assets/website/industries/Heated-Apparel.png";
import UnderfloorImg    from "../assets/website/industries/Underfloor-Heating.png";
import DefenseImg       from "../assets/website/industries/Defense.png";

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

const INDUSTRIES = [
  {
    slug: "automotive",
    num: "01",
    title: "Automotive",
    tagline: "Cabin Cocoon heating for EV & premium interiors",
    detail: "Seat, panel, and console heating elements that warm the cabin in seconds, not minutes — engineered to recover the range legacy resistive heating costs an EV.",
    stat: "+13% EV winter range",
    image: CarSeatImg,
    accent: "#94C356",
  },
  {
    slug: "food-delivery",
    num: "02",
    title: "Food & Delivery",
    tagline: "Active heating inserts maintaining ≥65°C for over 3 hours",
    detail: "Thin, flexible heating inserts built into delivery bags and food carriers — holding serving temperature across a full shift without bulk or hot spots.",
    stat: "3h+ heat retention",
    image: FoodDeliveryImg,
    accent: "#F07E26",
  },
  {
    slug: "heated-apparel",
    num: "03",
    title: "Heated Apparel",
    tagline: "Wire-free, weightless warmth for outdoor gear & workwear",
    detail: "CNT polymer filaments replace copper wiring inside jackets, vests, and gloves — uniform warmth with none of the stiffness, bulk, or failure points of wire.",
    stat: "2× battery runtime",
    image: HeatedApparelImg,
    accent: "#4A5DA7",
  },
  {
    slug: "underfloor-heating",
    num: "04",
    title: "Underfloor Heating",
    tagline: "Zero-lag mats reaching 28°C in 3 minutes",
    detail: "Low-mass heating mats that respond almost instantly under tile, wood, or laminate — none of the thermal lag or standby losses of cable systems.",
    stat: "4× less energy",
    image: UnderfloorImg,
    accent: "#94C356",
  },
  {
    slug: "defense",
    num: "05",
    title: "Defense",
    tagline: "Specialized thermal & EM solutions — under NDA only",
    detail: "Custom thermal signature and electromagnetic engineering for defense and government programs. Specifications shared under NDA.",
    stat: "NDA Required",
    image: DefenseImg,
    accent: "#B8B7A4",
  },
];

const Industries = () => {
  const [active, setActive] = useState(0);
  const current = INDUSTRIES[active];

  return (
    <div className="min-h-screen bg-[#F2F0EA] dark:bg-[#0E0E13] text-[#14141B] dark:text-white">

      {/* ── HEADER ── */}
{/* ── HERO ───────────────────────────────────────────── */}
<section
  id="industries-hero"
  className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#14141B]"
>
  {/* Background */}
  <div className="absolute inset-0 pointer-events-none">
    <div
      className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10"
      style={{ background: "#D9FE42" }}
    />
    <div
      className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5"
      style={{ background: "#94C356" }}
    />
    <div
      className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl opacity-5"
      style={{ background: "#4A5DA7" }}
    />
  </div>

  {/* Grid */}
  <div
    className="absolute inset-0 opacity-[0.03]"
    style={{
      backgroundImage:
        "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />

  <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pt-32 pb-24">

    <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-6 text-[#D9FE42]">
      04 // Industries
    </span>

<Reveal>
  <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-6">
    Heating Solutions<br />
    <span style={{ color: "#D9FE42" }}>
      Across Industries
    </span>
  </h1>
</Reveal>
<Reveal delay={120}>
    <p
      className="text-base leading-relaxed max-w-2xl mb-10"
      style={{ color: "#B8B7A4" }}
    >
      One conductive polymer platform powering applications across automotive,
      apparel, logistics, residential heating and defence. Explore how the
      same technology adapts to completely different industries.
    </p>
</Reveal>
<Reveal delay={220}>
    <div className="flex flex-wrap gap-4 mb-16">
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_0_30px_rgba(217,254,66,0.25)]"
        style={{ background: "#D9FE42", color: "#14141B" }}
      >

        Contact Us
        <FaArrowRight size={9} />
      </Link>

      <Link
        to="/technology"
        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 text-white hover:border-white/50 transition-all duration-300"
      >
        Explore Technology
        <FaArrowRight size={9} />
      </Link>
    </div>
</Reveal>
  </div>
</section>


      {/* ── INDEX STRIP ── */}
      <section className="bg-[#0E0E13] border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-x-10 gap-y-3 py-5 overflow-x-auto">
            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.slug}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                className="flex items-center gap-2 shrink-0 group"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: active === i ? ind.accent : "rgba(255,255,255,0.25)" }}
                />
                <span
                  className="text-[11px] font-mono uppercase tracking-widest transition-colors duration-300"
                  style={{ color: active === i ? "#fff" : "rgba(255,255,255,0.4)" }}
                >
                  {ind.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDEX / VIEWER ── */}
      <section className="py-16 md:py-24 px-6 bg-[#F2F0EA] dark:bg-[#0E0E13]">
        <div className="container mx-auto max-w-7xl">
          <div className="hidden md:grid grid-cols-12 gap-12">

            {/* List */}
            <div className="col-span-5">
              <div className="border-t border-[#14141B]/15 dark:border-white/10">
                {INDUSTRIES.map((ind, i) => {
                  const isActive = active === i;
                  return (
                         <Reveal key={ind.slug} delay={i * 70}>
                    <div
                      key={ind.slug}
                      onMouseEnter={() => setActive(i)}
                      className="border-b border-[#14141B]/15 dark:border-white/10"
                    >
                      <Link
                        to={`/industries/${ind.slug}`}
                        className="flex items-start justify-between gap-6 py-7 group"
                      >
                        <div className="flex items-baseline gap-5 min-w-0">
                          <span
                            className="text-xs font-mono tabular-nums transition-colors duration-300 shrink-0"
                            style={{ color: isActive ? ind.accent : undefined }}
                          >
                            {ind.num}
                          </span>
                          <div className="min-w-0">
                            <h3
                              className="text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-300"
                              style={{
                                color: isActive ? ind.accent : undefined,
                                transform: isActive ? "translateX(4px)" : "translateX(0)",
                              }}
                            >
                              {ind.title}
                            </h3>
                            <div
                              className="grid transition-all duration-500 ease-out"
                              style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}
                            >
                              <div className="overflow-hidden">
                                <p className="text-sm text-[#5C6654] dark:text-[#B8B7A4] leading-relaxed pt-2 pr-4">
                                  {ind.detail}
                                </p>
                                <span
                                  className="inline-block mt-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1"
                                  style={{ color: ind.accent, background: `${ind.accent}18`, border: `1px solid ${ind.accent}40` }}
                                >
                                  {ind.stat}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Modification ici : Rotation de FaArrowUp pour faire une flèche haut-droite */}
                        <FaArrowUp
                          size={16}
                          className="shrink-0 mt-2 transition-all duration-300 rotate-45"
                          style={{
                            color: isActive ? ind.accent : "currentColor",
                            opacity: isActive ? 1 : 0.25,
                            transform: isActive ? "translate(2px,-2px)" : "translate(0,0)",
                          }}
                        />
                      </Link>
                    </div>
               </Reveal>
                  );
                })}
              </div>
            </div>

            {/* Sticky visual */}
            <div className="col-span-7">
              <div className="sticky top-28">
                <Reveal delay={250}>
                <Link
                  to={`/industries/${current.slug}`}
                  className="relative block w-full h-[600px] rounded-3xl overflow-hidden bg-[#14141B] group"
                  style={{ boxShadow: `0 30px 80px -30px ${current.accent}40` }}
                >
                  
                  {INDUSTRIES.map((ind, i) => (
                    <img
                      key={ind.slug}
                      src={ind.image}
                      alt={ind.title}
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out"
                      style={{ opacity: active === i ? 1 : 0 }}
                    />
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `radial-gradient(circle at 50% 100%, ${current.accent}25, transparent 60%)` }}
                  />

                  <span
                    className="absolute top-7 right-7 text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 backdrop-blur-sm transition-colors duration-500"
                    style={{ color: current.accent, background: `${current.accent}1f`, border: `1px solid ${current.accent}55` }}
                  >
                    {current.stat}
                  </span>

                  <span className="absolute top-7 left-7 text-[120px] leading-none font-black text-white/[0.06] select-none tracking-tighter">
                    {current.num}
                  </span>

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-6">
                    <p className="text-white text-lg md:text-xl font-medium leading-snug max-w-md">
                      {current.tagline}
                    </p>
                    <span
                      className="flex items-center gap-2 shrink-0 text-xs font-black uppercase tracking-widest pb-1 transition-colors duration-300"
                      style={{ color: current.accent }}
                    >
                      Explore <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
                </Reveal>
              </div>
            </div>
          </div>
          

          {/* ── MOBILE STACK ── */}
          <div className="md:hidden flex flex-col gap-4">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.slug}
                to={`/industries/${ind.slug}`}
                className="relative block w-full h-[300px] rounded-2xl overflow-hidden bg-[#14141B]"
              >
                <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <span className="absolute top-5 left-5 text-xs font-mono text-white/50">{ind.num}</span>
                <span
                  className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1"
                  style={{ color: ind.accent, background: `${ind.accent}1f`, border: `1px solid ${ind.accent}55` }}
                >
                  {ind.stat}
                </span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">{ind.title}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-3">{ind.tagline}</p>
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: ind.accent }}>
                    Explore <FaArrowRight size={10} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA FOOTER ── */}
   
      <section className="py-24 px-6 bg-[#0E0E13] border-t border-white/10">
         <Reveal>
        <div className="container mx-auto max-w-3xl text-center">
          <div className="text-[11px] tracking-[0.3em] uppercase text-[#94C356] font-mono mb-5">// Custom Applications</div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-5 leading-tight">
            Don't see your industry?
          </h2>
          <p className="text-[#B8B7A4] mb-10 max-w-md mx-auto text-sm leading-relaxed">
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
        </Reveal>
      </section>


    </div>
  );
};

export default Industries;