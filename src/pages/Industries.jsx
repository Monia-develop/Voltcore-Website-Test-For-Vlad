import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaArrowUp, FaLinkedin, FaYoutube,
  FaEnvelope, FaMapMarkerAlt
} from "react-icons/fa";
import CarSeatImg       from "../assets/website/industries/CarSeatHeating.png";
import FoodDeliveryImg  from "../assets/website/industries/FoodDelivery.png";
import HeatedApparelImg from "../assets/website/industries/Heated-Apparel.png";
import UnderfloorImg    from "../assets/website/industries/Underfloor-Heating.png";
import DefenseImg       from "../assets/website/industries/Defense.png";

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShown(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, shown];
};

const Reveal = ({ children, delay = 0, y = 28, className = " ", tag: Tag = "div" }) => {
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
  { slug: "automotive", num: "01", title: "Automotive", tagline: "Cabin Cocoon heating for EV & premium interiors", detail: "Seat, panel, and console heating elements that warm the cabin in seconds, not minutes — engineered to recover the range legacy resistive heating costs an EV.", stat: "+13% EV winter range", image: CarSeatImg, accent: "#D9FE42" },
  { slug: "thermal-logistics", num: "02", title: "Food & Delivery", tagline: "Active heating inserts maintaining ≥65°C for over 3 hours", detail: "Thin, flexible heating inserts built into delivery bags and food carriers — holding serving temperature across a full shift without bulk or hot spots.", stat: "3h+ heat retention", image: FoodDeliveryImg, accent: "#D9FE42" },
  { slug: "heated-apparel", num: "03", title: "Heated Apparel", tagline: "Wire-free, weightless warmth for outdoor gear & workwear", detail: "CNT polymer filaments replace copper wiring inside jackets, vests, and gloves — uniform warmth with none of the stiffness, bulk, or failure points of wire.", stat: "2× battery runtime", image: HeatedApparelImg, accent: "#D9FE42" },
  { slug: "floorheating", num: "04", title: "Underfloor Heating", tagline: "Zero-lag mats reaching 28°C in 3 minutes", detail: "Low-mass heating mats that respond almost instantly under tile, wood, or laminate — none of the thermal lag or standby losses of cable systems.", stat: "4× less energy", image: UnderfloorImg, accent: "#D9FE42" },
  { slug: "defense", num: "05", title: "Defense", tagline: "Specialized thermal & EM solutions — under NDA only", detail: "Custom thermal signature and electromagnetic engineering for defense and government programs. Specifications shared under NDA.", stat: "NDA Required", image: DefenseImg, accent: "#D9FE42" },
];

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
          {[["Home", "/"],["Technology", "/technology"],["Industries", "/industries"],["About us", "/about"],["News", "/news"],["Contact", "/contact"]].map(([l,to])=>(
            <li key={to}><Link to={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">{l}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-[#14141B] dark:text-white mb-4">// Platforms</h4>
        <ul className="flex flex-col gap-2.5">
          {[["ActiveFil™", "/technology"],["TargetHeat™", "/technology"],["SensiTerm", "/technology"]].map(([l,to])=>(
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

const Industries = () => {
  const [active, setActive] = useState(0);
  const current = INDUSTRIES[active];
  
  return (
    <div className="min-h-screen bg-[#F2F0EA] dark:bg-[#0E0E13] text-[#14141B] dark:text-white">
      <section id="industries-hero" className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: "#12503B" }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background: "#12503B" }} />
          <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full blur-3xl opacity-5" style={{ background: "#12503B" }} />
        </div>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg,#fff 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pt-32 pb-24">
          <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-6 text-[#D9FE42]">04 // Industries</span>
          <Reveal>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.9] text-white uppercase mb-6">Heating Solutions <br /> <span style={{ color: "#D9FE42" }}>Across Industries</span></h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="text-base leading-relaxed max-w-2xl mb-10" style={{ color: "#B8B7A4" }}>One conductive polymer platform powering applications across automotive, apparel, logistics, residential heating and defence. Explore how the same technology adapts to completely different industries.</p>
          </Reveal>
          <Reveal delay={220}>
            <div className="flex flex-wrap gap-4 mb-16">
              <Link to="/#contact-form" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_0_30px_rgba(18,80,59,0.25)]" style={{ background: "#D9FE42", color: "#14141B" }}>Contact Us <FaArrowRight size={9} /></Link>
              <Link to="/technology" className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 text-white hover:border-white/50 transition-all duration-300">Explore Technology <FaArrowRight size={9} /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#0E0E13] border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap gap-x-10 gap-y-3 py-5 overflow-x-auto">
            {INDUSTRIES.map((ind, i) => (
              <button key={ind.slug} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} className="flex items-center gap-2 shrink-0 group">
                <span className="w-1.5 h-1.5 rounded-full transition-all duration-300" style={{ background: active === i ? ind.accent : "rgba(255,255,255,0.25)" }} />
                <span className="text-[11px] font-mono uppercase tracking-widest transition-colors duration-300" style={{ color: active === i ? "#fff" : "rgba(255,255,255,0.4)" }}>{ind.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6 bg-[#F2F0EA] dark:bg-[#0E0E13]">
        <div className="container mx-auto max-w-7xl">
          <div className="hidden md:grid grid-cols-12 gap-12">
            <div className="col-span-5">
              <div className="border-t border-[#14141B]/15 dark:border-white/10">
                {INDUSTRIES.map((ind, i) => {
                  const isActive = active === i;
                  return (
                    <Reveal key={ind.slug} delay={i * 70}>
                      <div onMouseEnter={() => setActive(i)} className="border-b border-[#14141B]/15 dark:border-white/10">
                        <Link to={`/industries/${ind.slug}`} className="flex items-start justify-between gap-6 py-7 group">
                          <div className="flex items-baseline gap-5 min-w-0">
                            <span className="text-xs font-mono tabular-nums transition-colors duration-300 shrink-0" style={{ color: isActive ? ind.accent : undefined }}>{ind.num}</span>
                            <div className="min-w-0">
                              <h3 className="text-2xl md:text-3xl font-black tracking-tight uppercase transition-all duration-300" style={{ color: isActive ? ind.accent : undefined, transform: isActive ? "translateX(4px)" : "translateX(0)" }}>{ind.title}</h3>
                              <div className="grid transition-all duration-500 ease-out" style={{ gridTemplateRows: isActive ? "1fr" : "0fr" }}>
                                <div className="overflow-hidden">
                                  <p className="text-sm text-[#5C6654] dark:text-[#B8B7A4] leading-relaxed pt-2 pr-4">{ind.detail}</p>
                                  <span className="inline-block mt-3 text-[10px] font-mono uppercase tracking-widest px-2 py-1" style={{ color: ind.accent, background: `${ind.accent}18`, border: `1px solid ${ind.accent}40` }}>{ind.stat}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <FaArrowUp size={16} className="shrink-0 mt-2 transition-all duration-300 rotate-45" style={{ color: isActive ? ind.accent : "currentColor", opacity: isActive ? 1 : 0.25, transform: isActive ? "translate(2px,-2px)" : "translate(0,0)" }} />
                        </Link>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>
            <div className="col-span-7">
              <div className="sticky top-28">
                <Reveal delay={250}>
                  <Link to={`/industries/${current.slug}`} className="relative block w-full h-[600px] rounded-3xl overflow-hidden bg-[#14141B] group" style={{ boxShadow: `0 30px 80px -30px ${current.accent}40` }}>
                    {INDUSTRIES.map((ind, i) => (
                      <img key={ind.slug} src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out" style={{ opacity: active === i ? 1 : 0 }} />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/10" />
                    <span className="absolute top-7 right-7 text-[11px] font-mono uppercase tracking-widest px-3 py-1.5 backdrop-blur-sm transition-colors duration-500" style={{ color: current.accent, background: `${current.accent}1f`, border: `1px solid ${current.accent}55` }}>{current.stat}</span>
                    <span className="absolute top-7 left-7 text-[120px] leading-none font-black text-white/[0.06] select-none tracking-tighter">{current.num}</span>
                    <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-6">
                      <p className="text-white text-lg md:text-xl font-medium leading-snug max-w-md">{current.tagline}</p>
                      <span className="flex items-center gap-2 shrink-0 text-xs font-black uppercase tracking-widest pb-1 transition-colors duration-300" style={{ color: current.accent }}>Explore <FaArrowRight size={10} className="transition-transform duration-300 group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </Reveal>
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-col gap-4">
            {INDUSTRIES.map((ind) => (
              <Link key={ind.slug} to={`/industries/${ind.slug}`} className="relative block w-full h-[300px] rounded-2xl overflow-hidden bg-[#14141B]">
                <img src={ind.image} alt={ind.title} className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <span className="absolute top-5 left-5 text-xs font-mono text-white/50">{ind.num}</span>
                <span className="absolute top-5 right-5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1" style={{ color: ind.accent, background: `${ind.accent}1f`, border: `1px solid ${ind.accent}55` }}>{ind.stat}</span>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-1">{ind.title}</h3>
                  <p className="text-zinc-300 text-sm leading-relaxed mb-3">{ind.tagline}</p>
                  <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest" style={{ color: ind.accent }}>Explore <FaArrowRight size={10} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Industries;