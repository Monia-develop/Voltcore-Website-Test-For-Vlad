import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaLinkedin, FaYoutube,
  FaEnvelope, FaMapMarkerAlt, FaDirections,
} from "react-icons/fa";

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const VALUES = [
  { label: "Energy Efficiency", stat: "2×", statLabel: "less energy consumed", desc: "Up to 2 times less energy consumed, setting a new standard for eco-friendly heating solutions." },
  { label: "Lightweight", stat: "30-60g/km", statLabel: "filament · 120-250g/m² fabrics", desc: "Ultra-light filament design at 30-60g/km, with fabrics at 120-250g/m² for minimal weight impact." },
  { label: "Cost-Competitiveness", stat: "Co-molding", statLabel: "seamless surface integration", desc: "Cost-effective to integrate into any surface including via co-molding processes." },
  { label: "Homogeneous Heating", stat: "ΔT 3-4°C", statLabel: "temperature uniformity", desc: "Temperature deviation across the entire heating area within 3-4°C for consistent comfort." },
  { label: "Mechanical Durability", stat: "25-30 cN/tex", statLabel: "tensile strength · no self-abrasion", desc: "High tensile strength of 25-30 cN/tex with no self-abrasion for long-lasting performance." },
  { label: "Recyclability", stat: "100%", statLabel: "mono-material · 75% recycled", desc: "100% mono-material for easy end-of-lifecycle recycling & up to 75% of recycled polymers." },
  { label: "Fast Heating", stat: "40-70%", statLabel: "faster than copper cable", desc: "Up to 40%-70% faster heating than copper cable with the same energy consumption." },
  { label: "Multiple Power Sources", stat: "7-230V", statLabel: "universal compatibility", desc: "Compatible with multiple sources: car battery & lighter (12-48V), e-bike power socket (36V), separate battery (7-12V), domestic current (110-230V)." },
  { label: "LCA", stat: "50%", statLabel: "lower CO₂ footprint vs. copper", desc: "50% lower CO₂ footprint compared to copper across the full lifecycle." },
];

const MILESTONES = [
  { year: "2021", groups: [{ label: "Technology development", items: ["First explorations of nanocarbon fillers for polymer filaments"] }] },
  { year: "2022", groups: [{ label: "Technology development", items: ["Lab prototype of conductive filament with repeatable results"] }] },
  {
    year: "2023", tag: "Voltcore Founded",
    groups: [
      { label: "Technology development", items: ["Voltcore founded", "Lab-scale compounding & spinning validated", "Heating fabrics first designs and samples"] },
      { label: "Automotive", items: ["Start of discussions with OEMs and Tier-1", "OEMs and Tier-1 R&D interviews"] },
    ],
  },
  {
    year: "2024",
    groups: [
      { label: "Technology development", items: ["Technology steps 1 (compounds) & 2 (fibers) scaled up with OCSiAl, CENTEXBEL and ITA", "PP-based compounds first industrial batches", "Fabric's new designs introduced"] },
      { label: "Automotive", items: ["Heating pads samples provided for initial tests across OEMs and Tier-1"] },
      { label: "Food-delivery, Underfloor & Garments", items: ["Early tests with flooring companies on linoleum and Luxury Vinyl Tiles (LVTs) integration"] },
    ],
  },
  {
    year: "2025",
    groups: [
      { label: "Technology development", items: ["Technology step 3 (weaving) scaled up and first industrial batches of heating fabrics", "Sensing feature introduced at Gamic and IAA", "Over-molding technology developed", "PA-based family introduced"] },
      { label: "Automotive", items: ["13 PoCs secured (5 successfully completed)", "Seat heating POC success", "Glovebox heating POC with overmolding technology", "OEM heating comfort cocoon tests"] },
      { label: "Food-delivery, Underfloor & Garments", items: ["2 POCs with leading motorsport and apparel brand, first commercial batch secured", "3 POCs with leading LVT producer", "Pilots for food delivery in EU, US and Asia"] },
    ],
  },
  {
    year: "2026", tag: "Now",
    groups: [
      { label: "Technology development", items: ["Voltcore own industrial compounding", "Voltcore own industrial spinning line", "TRL-7/8 full industrialization and certified"] },
      { label: "Automotive", items: ["Full industrial validation with OEMs & Tier-1", "Early nominations for perspective programs"] },
      { label: "Food-delivery, Underfloor & Garments", items: ["First apparel/wearable sales", "Food-delivery heated bag launches", "Flooring products pre-marketing"] },
    ],
  },
  {
    year: "2027",
    groups: [
      { label: "Automotive", items: ["RfQs, program confirmations", "Expansion to new automotive modules", "First automotive commercial sales"] },
      { label: "Food-delivery, Underfloor & Garments", items: ["Under-floor heating serial sales launch", "Expansion into wellness & medical"] },
    ],
  },
];

/* ─── ARTICLES ────────────────────────────────────────────────────────────── */
const ARTICLES = [
  {
    source: "Forbes Luxembourg",
    date: "January 2025",
    title: "Luxembourg's Voltcore Heats Up EV Innovation Across Europe",
    desc: "Voltcore is scaling its conductive polymer technology from Luxembourg, with growing traction in the automotive sector and plans to convert pilot engagements into confirmed OEM programs.",
    link: "https://www.forbes.lu/luxembourg-voltcore-heats-up-ev-innovation-across-europe/",
    imgUrl: "https://www.forbes.lu/wp-content/uploads/2025/01/Voltcore-Forbes-Luxembourg.jpg",
  },
  {
    source: "Silicon Luxembourg",
    date: "May 2024",
    title: "Voltcore Reveals 'Last-Mile' Plans For Its Unique Green Heating Technology",
    desc: "An in-depth profile on founder Vlad Batkhin and the company's roadmap: from pilot plant ambitions to first sales, and a Q3 2025 fundraising round to scale production volumes.",
    link: "https://www.siliconluxembourg.lu/voltcore-reveals-last-mile-plans-for-its-unique-green-heating-technology/",
    imgUrl: "https://www.siliconluxembourg.lu/wp-content/uploads/2024/05/voltcore.jpg",
  },
  {
    source: "Chronicle.lu",
    date: "October 2024",
    title: "Luxembourg Startup Launches TargetHeat Energy-Efficient Heating Technology",
    desc: "Voltcore officially launches TargetHeat at Batimat Paris — a new generation of unidirectional heating materials using 40% less energy than best-in-class solutions.",
    link: "https://chronicle.lu/category/energy/51712-luxembourg-startup-launches-targetheat-energy-efficient-heating-technology",
    imgUrl: "https://chronicle.lu/wp-content/uploads/2024/10/voltcore-targetheat.jpg",
  },
  {
    source: "Startup Valley",
    date: "September 2024",
    title: "Voltcore: Revolutionizing Heating Technology with Smart Materials",
    desc: "How Voltcore's ultra-thin conductive polymer filament delivers precision heating from EV batteries to smart homes — with a 2.5M m² pilot plant and industrial certifications on the horizon.",
    link: "https://startupvalley.news/uk/voltcore/",
    imgUrl: "https://startupvalley.news/wp-content/uploads/2024/09/voltcore-heating.jpg",
  },
  {
    source: "Luxembourg Official",
    date: "September 2024",
    title: "Vlad Batkhin (Voltcore): Pioneering Sustainable Heating Solutions with Advanced Nanocomposites",
    desc: "A deep-dive into Voltcore's technology vision, roadmap to TRL-9, and ambition to become the industrial standard for oriented heating laminates by 2027.",
    link: "https://luxembourgofficial.com/voltcore/",
    imgUrl: "https://luxembourgofficial.com/wp-content/uploads/2024/09/voltcore-batkhin.jpg",
  },
  {
    source: "Luxembourg Trade & Invest",
    date: "March 2025",
    title: "Luxembourg's AutoMobility Incubator: A Gateway to Europe",
    desc: "Voltcore highlighted as a standout innovation at Luxembourg's AutoMobility Incubator, developing conductive polymer filaments for EV cabin and battery heating.",
    link: "https://luxembourgtradeandinvest.com/news/luxembourg-s-automobility-incubator-a-gateway-to-europe",
    imgUrl: "https://luxembourgtradeandinvest.com/wp-content/uploads/automobility-incubator.jpg",
  },
];

/* ─── TEAM ────────────────────────────────────────────────────────────────── */
const GROUP_STYLE = {
  "Leadership": { accent: "#D9FE42", ink: "#14141B" },
  "Board & Advisors": { accent: "#12503C", ink: "#FFFFFF" },
  "Business": { accent: "#4A5DA7", ink: "#FFFFFF" },
  "Engineering": { accent: "#F07E26", ink: "#14141B" },
  "Operations": { accent: "#902053", ink: "#FFFFFF" },
  "Interns": { accent: "#ED6EA7", ink: "#14141B" },
};
const GROUP_ORDER = ["Leadership", "Board & Advisors", "Business", "Engineering", "Operations", "Interns"];

const TEAM = [
  {
    name: "Fabrice Bertinchamps",
    role: "Co-founder and CEO",
    detail: "Fabrice holds a PhD in Catalysis from UCLouvain and completed executive programs at Harvard, London Business School, INSEAD, and HEC Paris. He has 20+ years in the polymer industry, leading global strategy, R&D, and business units at SABIC and TotalEnergies. His expertise spans transformative research, scaling innovations from pilot to full commercial deployment, and developing advanced solutions for the automotive sector.",
    group: "Leadership",
    photo: new URL("../assets/website/team/Fabrice.png", import.meta.url).href
  },
  {
    name: "Vlad Batkhin",
    role: "Co-founder and CTO",
    detail: "Vlad holds an MSc degree in applied physics from Moscow Institute of Physics and Technology and a diploma from CWC School for Energy (London). Vlad brings 15+ years in the chemical industry, bringing R&D developments to successful launches of new plants and businesses. Vlad has extensive expertise in recycled polymers and the high-end compounds value chain, with several plants engineered and launched before starting Voltcore.",
    group: "Leadership",
    photo: new URL("../assets/website/team/vlad.png", import.meta.url).href
  },
  {
    name: "Georges De Pelsemaeker",
    role: "Advisor and Tech board head",
    detail: "Georges holds a PhD from École polytechnique de Louvain (EPL) and an MBA degree from HEC Paris. Georges spent 27+ years at Valeo, focusing on thermal management, comfort, and well-being. Georges is the godfather of the comfort cocoon concept and author of a row of patents in the thermal management field.",
    group: "Board & Advisors",
    photo: new URL("../assets/website/team/Georges.png", import.meta.url).href
  },
  {
    name: "Thierry Goniva",
    role: "Advisor",
    detail: "Thierry holds an MSc in Electrical Engineering from ETH Zürich and is completing the Chief Strategy Officer Programme at INSEAD. He brings 25+ years of end-to-end leadership at IEE (automotive sensor company that grew from 120 to 4,000 people during his tenure) and most recently served as CTO of B Medical Systems. His expertise spans concept-to-production product development, cross-functional team building, market entry, strategy, and intrapreneurship.",
    group: "Board & Advisors",
    photo: new URL("../assets/website/team/Thierry.png", import.meta.url).href
  },
  {
    name: "Pierre Orlewski",
    role: "Advisor",
    detail: "Pierre holds a PhD in biophysics and computational chemistry from ENSIC Polytechnics in France, further completed by an industrial innovation management program in Luxembourg. Pierre is a seasoned innovation manager and technology ventures architect in automotive IoT safety sensing systems, corporate venture funding, and startup investments. He totals 28+ years in automotive innovations, new products, and process developments, backed with 40+ patents. Pierre acts as a private investor, mentor, and adviser across several EU technology startups.",
    group: "Board & Advisors",
    photo: new URL("../assets/website/team/Pierre.png", import.meta.url).href
  },
  {
    name: "Dmitrii Prokopiuk",
    role: "Advisor & International Lawyer",
    detail: "Dmitrii holds degrees in Computer Systems Engineering and International Law and completed executive training at Canterbury Business School, University of Kent. He brings 20+ years of experience advising international companies on corporate structuring, cross-border M&A, and deep-tech commercialization. His expertise covers investor relations, corporate governance, AI and digital regulation, as well as legal support for advanced materials, additive manufacturing, and space technologies.",
    group: "Board & Advisors",
    photo: new URL("../assets/website/team/Dmitrii.png", import.meta.url).href
  },
  {
    name: "Daria Voronina",
    role: "Sustainability and Business Development Manager",
    detail: "Daria holds a Master's degree from the University of Geneva and has a background in international relations. She leads Voltcore's commercial development across Europe and represents the company at key industry events, trade fairs, and conferences. Daria also drives Voltcore's sustainability strategy, bringing strong expertise in project coordination and climate impact metrics.",
    group: "Business",
    photo: new URL("../assets/website/team/Daria.png", import.meta.url).href
  },
  {
    name: "Aviral Kapoor",
    role: "Business Development Manager",
    detail: "Aviral has over 10 years of experience in international B2B sales across high-tech and green-energy sectors, including Tata Group. He leads Voltcore's commercial development in North America and Asia.",
    group: "Business",
    photo: new URL("../assets/website/team/Aviral.png", import.meta.url).href
  },
  {
    name: "Arjun Chandra",
    role: "Sales Manager",
    detail: "Arjun is a Business Studies graduate with over 15 years of experience driving business growth across the automotive, defence, and technology sectors. He brings extensive expertise in global sourcing, strategic procurement, and developing resilient supply chains, with a proven track record in business development, market expansion, and building long-term partnerships across international markets.",
    group: "Business",
    photo: new URL("../assets/website/team/Arjun.png", import.meta.url).href
  },
  {
    name: "Andrei Zanko",
    role: "Electrical Engineer",
    detail: "Andrey is an expert in electrical engineering, with deep hands-on experience in developing heating technologies for automotive and industrial applications. At Voltcore, he leads integration of active heating materials into electronic and thermal control systems.",
    group: "Engineering",
    photo: new URL("../assets/website/team/Andrei.png", import.meta.url).href
  },
  {
    name: "Sachin Kumar Enganati",
    role: "Polymer Process Engineer",
    detail: "Sachin holds a PhD in Materials Science from the University of Luxembourg and a Master of Science (M.Sc.) in Novel Materials from Delft University of Technology. He brings an analytical, hands-on engineering approach and practical problem-solving to the development of advanced materials, processes, and products. His professional experience spans high-performance polymer fibers at DSM, carcass composite adhesive characterization with Goodyear at LIST, and polyester thin film R&D process development at Mylar Specialty Films.",
    group: "Engineering",
    photo: new URL("../assets/website/team/Sachin.png", import.meta.url).href
  },
  {
    name: "Anastasia Batkhina",
    role: "QMS & Operations Consultant",
    detail: "Anastasia holds a PhD from National Research University Higher School of Economics, Moscow. She brings 10+ years of experience in operations, administration, management, and business process development across US-based startups, educational institutions, and UN agencies. At Voltcore, Anastasia supports QMS implementation, process governance, documentation, and the development of scalable operational practices.",
    group: "Operations",
    photo: new URL("../assets/website/team/AnastasiaBatkhina.png", import.meta.url).href
  },
  {
    name: "Monia Azzaiz",
    role: "Computer Sciences Intern",
    detail: "Monia is a second-year (L2) student in Computer Science and Mathematics Applied to Social Sciences at the Université de Lorraine in Nancy, France.",
    group: "Interns",
    photo: new URL("../assets/website/team/monia.png", import.meta.url).href
  },
  {
    name: "Lina El Keddah",
    role: "Financial Accountant and AI Intern",
    detail: "Lina is a student in the Programme Grande École at KEDGE Business School, majoring in Financial Mathematics. As Treasurer of the Phoenix Égalité des Chances association, she has developed practical experience in financial management, budgeting, and organisational planning. Passionate about finance, data, and artificial intelligence, Lina is excited to contribute to innovative and sustainable solutions at Voltcore.",
    group: "Interns",
    photo: new URL("../assets/website/team/lina.png", import.meta.url).href
  },
];

const HQ_FACTS = [
  { label: "HQ", value: "Bissen" },
  { label: "Focus", value: "Scale-up" },
  { label: "Access", value: "EU" },
];
const MAP_URL = "https://www.google.com/maps?q=2%20Rue%20de%20l'Industrie%2C%207735%20Bissen%2C%20Luxembourg&output=embed";
const MAP_DIRECTIONS_URL = "https://www.google.com/maps/dir/?api=1&destination=2%20Rue%20de%20l'Industrie%2C%207735%20Bissen%2C%20Luxembourg";

/* ─── HELPERS ─────────────────────────────────────────────────────────────── */
const useIsDark = () => {
  const [dark, setDark] = useState(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
};

const accent = (dark) => dark ? "#D9FE42" : "#12503C";

/* ─── SCROLL REVEAL ───────────────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, y = 24, className = "", as: Tag = "div" }) => {
  const ref = useRef();
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); obs.disconnect(); } },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
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

/* ─── SECTION LABEL ───────────────────────────────────────────────────────── */
const SectionLabel = ({ children }) => {
  const dark = useIsDark();
  return (
    <span
      className="text-xs tracking-[0.18em] uppercase font-bold block mb-3"
      style={{ color: accent(dark) }}
    >
      {children}
    </span>
  );
};

/* ─── 01 VALUES ───────────────────────────────────────────────────────────── */
const ValuesSection = () => {
  const dark = useIsDark();
  return (
    <section id="values" className="w-full py-24 bg-[#f5f4f0] dark:bg-[#1a1a22]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-12">
          <SectionLabel>01 // Mission & Vision</SectionLabel>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight">
              Our Brand Values
            </h2>
            <p className="hidden md:block text-xs font-sans text-[#14141B]/40 dark:text-[#B8B7A4]/40 max-w-[220px] leading-relaxed">
              Hover each value to reveal the detail.
            </p>
          </div>
        </Reveal>
        <div className="border-t border-[#14141B]/8 dark:border-[#2a2a35]">
          {VALUES.map((v, i) => {
            const [hovered, setHovered] = React.useState(false);
            return (
              <Reveal key={v.label} delay={i * 70}>
                <div
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="relative grid grid-cols-[48px_1fr] lg:grid-cols-[64px_1fr_180px_260px] items-center gap-6 py-7 px-4 border-b border-[#14141B]/8 dark:border-[#2a2a35] cursor-default overflow-hidden transition-colors duration-300"
                  style={{ background: hovered ? (dark ? "#14141B" : "#eceae5") : "transparent" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom transition-transform duration-500"
                    style={{ background: accent(dark), transform: hovered ? "scaleY(1)" : "scaleY(0)" }} />
                  <span className="text-xs font-black tracking-widest text-[#14141B]/20 dark:text-white/15 select-none pl-3">0{i + 1}</span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tighter uppercase transition-colors duration-300"
                    style={{ color: hovered ? accent(dark) : (dark ? "#fff" : "#14141B") }}>
                    {v.label}
                  </h3>
                  <div className="hidden lg:block text-right transition-all duration-300" style={{ opacity: hovered ? 1 : 0.3 }}>
                    <div className="text-3xl font-black tracking-tighter"
                      style={{ color: accent(dark), transform: hovered ? "scale(1.1)" : "scale(1)", display: "inline-block", transition: "transform 0.3s" }}>
                      {v.stat}
                    </div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#14141B]/40 dark:text-white/30 mt-0.5">{v.statLabel}</div>
                  </div>
                  <p className="hidden lg:block text-xs font-antonym leading-relaxed text-[#14141B]/60 dark:text-[#B8B7A4]/70 transition-all duration-400"
                    style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateX(0)" : "translateX(16px)" }}>
                    {v.desc}
                  </p>
                  <p className="lg:hidden col-span-2 text-xs font-antonym leading-relaxed text-[#14141B]/55 dark:text-[#B8B7A4]/60 -mt-3 pl-[calc(48px+1.5rem)]">{v.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── 02 TIMELINE ─────────────────────────────────────────────────────────── */
const TimelineSection = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current; if (!el) return;
      const rect = el.getBoundingClientRect(), vh = window.innerHeight;
      const pct = Math.max(0, Math.min(1, (vh * 0.75 - rect.top) / (rect.height + vh * 0.5)));
      setProgress(pct * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section id="milestones" className="w-full py-24 bg-white dark:bg-[#14141B]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-14">
          <SectionLabel>02 // The Voltcore Story</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight">
            Tech & Market Development Timeline
          </h2>
        </Reveal>
        <div ref={containerRef} className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px bg-[#14141B]/8 dark:bg-[#2a2a35]" />
          <div className="absolute left-5 top-2 w-px transition-[height] duration-150 ease-out"
            style={{ height: `${progress}%`, background: "linear-gradient(to bottom, #D9FE42, #12503C)" }} />
          <div className="space-y-10">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 60}>
                <div className="group flex gap-8 items-start transition-transform duration-400 hover:-translate-y-0.5">
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] z-10 shadow-lg transition-all duration-400 group-hover:scale-125"
                    style={{ background: "#D9FE42", color: "#14141B", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}>
                    {m.year.slice(2)}
                    <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-400 blur-md" style={{ background: "#D9FE42" }} />
                  </div>
                  <div className="flex-1 min-w-0 pb-2 rounded-2xl transition-all duration-400 md:group-hover:pl-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-lg font-black tracking-tight text-[#14141B] dark:text-white transition-colors duration-300 group-hover:text-[#12503C] dark:group-hover:text-[#D9FE42]">{m.year}</span>
                      {m.tag && (
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase tracking-[0.14em]"
                          style={{ background: "rgba(217,254,66,0.16)", color: "#12503C" }}>{m.tag}</span>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-5">
                      {m.groups.map((g, gi) => (
                        <div key={g.label} className={gi !== 0 ? "sm:border-l sm:border-[#14141B]/8 sm:dark:border-white/10 sm:pl-9" : ""}>
                          <h4 className="text-[10px] font-black uppercase tracking-[0.14em] mb-3 text-[#14141B]/45 dark:text-white/45">{g.label}</h4>
                          <ul className="space-y-2.5">
                            {g.items.map((item, k) => (
                              <li key={k} className="flex gap-2.5 text-[13px] font-sans leading-relaxed text-[#14141B]/75 dark:text-[#B8B7A4]">
                                <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#D9FE42" }} />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ─── 03 PRESS ────────────────────────────────────────────────────────────── */
const PressSection = () => {
  const dark = useIsDark();
  return (
    <section id="press" className="w-full py-24 bg-[#f5f4f0] dark:bg-[#1a1a22]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-12">
          <SectionLabel>03 // Media</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#14141B] dark:text-white uppercase leading-tight">
            In the Press
          </h2>
        </Reveal>
        <div className="border-t border-[#14141B]/8 dark:border-[#2a2a35]">
          {ARTICLES.map((art, i) => {
            const [hovered, setHovered] = React.useState(false);
            return (
              <Reveal key={i} delay={i * 60}>
                <a
                  href={art.link} target="_blank" rel="noopener noreferrer"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className="relative grid grid-cols-1 lg:grid-cols-[160px_1fr] items-start gap-4 lg:gap-10 py-7 px-4 border-b border-[#14141B]/8 dark:border-[#2a2a35] overflow-hidden transition-colors duration-300 block"
                  style={{ background: hovered ? (dark ? "#14141B" : "#eceae5") : "transparent", textDecoration: "none" }}
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom transition-transform duration-500"
                    style={{ background: accent(dark), transform: hovered ? "scaleY(1)" : "scaleY(0)" }} />
                  <div className="pl-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.18em] block"
                      style={{ color: accent(dark) }}>{art.source}</span>
                    {art.date && <span className="text-[10px] font-bold text-[#14141B]/35 dark:text-white/25 block mt-0.5">{art.date}</span>}
                  </div>
                  <div>
                    <h4 className="font-black text-base tracking-tight text-[#14141B] dark:text-white mb-2 transition-colors duration-300"
                      style={{ color: hovered ? accent(dark) : undefined }}>
                      {art.title}
                    </h4>
                    <p className="text-xs font-sans leading-relaxed text-[#14141B]/55 dark:text-[#B8B7A4]/70 transition-all duration-300"
                      style={{ opacity: hovered ? 1 : 0.7 }}>
                      {art.desc}
                    </p>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── TEAM CARDS (FOND NOIR UNIFORME AVEC BORDURE) ───────────────────────── */
const MemberCard = ({ member, delay = 0 }) => {
  const { accent: acc } = GROUP_STYLE[member.group] ?? GROUP_STYLE["Business"];
  const initials = member.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  return (
    <Reveal delay={delay}>
      <article className="group relative rounded-2xl p-5 border text-center flex flex-col items-center cursor-default transition-all duration-400 bg-black border-white/10 hover:-translate-y-1.5 hover:shadow-xl hover:border-white/20">
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl" style={{ background: acc }} />
        <div className="relative mb-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-black transition-all duration-400 group-hover:scale-110">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-black text-base" style={{ background: `${acc}20`, color: acc }}>
                {initials}
              </div>
            )}
          </div>
        </div>
        <h4 className="text-sm font-black tracking-tight text-white leading-snug">{member.name}</h4>
        <p className="mt-1.5 text-[10px] font-bold uppercase tracking-[0.06em] leading-snug text-white/55">{member.role}</p>
        <div className="overflow-hidden max-h-0 opacity-0 group-hover:max-h-[260px] group-hover:opacity-100 group-hover:mt-3 transition-all duration-500">
          <p className="text-[11px] font-antonym leading-relaxed text-[#B8B7A4]">{member.detail}</p>
        </div>
      </article>
    </Reveal>
  );
};

const LeaderCard = ({ member, delay = 0 }) => {
  const { accent: acc } = GROUP_STYLE["Leadership"];
  const initials = member.name.split(" ").map((p) => p[0]).slice(0, 2).join("");
  const [hovered, setHovered] = useState(false);
  
  return (
    <Reveal delay={delay}>
      <article 
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex items-start gap-6 rounded-3xl p-6 md:p-7 border overflow-hidden transition-all duration-400 cursor-default
          bg-black border-white/10 hover:shadow-2xl hover:-translate-y-1 hover:border-white/20"
      >
        {/* Glow radial au hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 0% 0%, ${acc}15, transparent 60%)` }} />
        
        {/* Conteneur photo - même noir que la carte */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" 
            style={{ background: acc }} />
          <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-black">
            {member.photo ? (
              <img 
                src={member.photo} 
                alt={member.name} 
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
          <h3 className="text-xl font-black tracking-tight text-white truncate">{member.name}</h3>
          <p className="mt-1 text-xs font-black uppercase tracking-[0.06em] text-white/70">{member.role}</p>
          
          {/* Bio cachée qui apparaît au hover - hauteur augmentée pour les bios longues */}
          <div className="overflow-hidden max-h-0 opacity-0 transition-all duration-500"
            style={{ 
              maxHeight: hovered ? "400px" : "0", 
              opacity: hovered ? 1 : 0,
              marginTop: hovered ? "12px" : "0"
            }}>
            <p className="text-xs font-antonym leading-relaxed text-[#B8B7A4]">{member.detail}</p>
          </div>
          
          {/* Indicateur visuel "Hover pour voir plus" */}
          {!hovered && (
            <div className="mt-2 text-[10px] font-bold uppercase tracking-widest text-white/30">
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
};
/* ─── 04 TEAM ─────────────────────────────────────────────────────────────── */
const TeamSection = () => {
  const leaders = TEAM.filter((m) => m.group === "Leadership");
  const otherGroups = GROUP_ORDER.filter((g) => g !== "Leadership")
    .map((g) => ({ group: g, members: TEAM.filter((m) => m.group === g) }))
    .filter((g) => g.members.length > 0);
  return (
    <section id="team" className="w-full py-24 bg-[#14141B]">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-14">
          <SectionLabel>04 // Team & Governance</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
            The People Behind Voltcore
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {leaders.map((m, i) => <LeaderCard key={m.name} member={m} delay={i * 80} />)}
        </div>
        <div className="space-y-12">
          {otherGroups.map(({ group, members }) => {
            const { accent: acc } = GROUP_STYLE[group];
            return (
              <div key={group}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: acc }} />
                  <h3 className="text-xs font-black uppercase tracking-[0.16em] text-white/55 whitespace-nowrap">{group}</h3>
                  <span className="flex-1 h-px bg-white/10" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {members.map((m, i) => <MemberCard key={m.name} member={m} delay={i * 60} />)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ─── 05 LOCATION ─────────────────────────────────────────────────────────── */
const LocationMap = () => {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % HQ_FACTS.length), 3200);
    return () => clearInterval(id);
  }, []);
  return (
    <section id="location" className="w-full py-24 bg-[#14141B] text-white overflow-hidden">
      <style>{`@keyframes factProgress { from { width: 0% } to { width: 100% } }`}</style>
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">
        <Reveal className="mb-10">
          <SectionLabel>05 // Location</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-tight">
              Voltcore HQ <br /> <span className="text-white/25">Bissen, Luxembourg</span>
            </h2>
            <p className="text-sm font-antonym leading-relaxed text-[#B8B7A4] max-w-md">
              Our team develops and scales smart heating material systems from Luxembourg, close to European industrial partners and manufacturing networks.
            </p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="relative w-full h-[460px] md:h-[540px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
            <iframe title="Voltcore HQ map" src={MAP_URL}
              className="absolute inset-0 w-full h-full grayscale-[0.35] contrast-[1.1] brightness-[0.9]"
              loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(20,20,27,0.85)_0%,rgba(20,20,27,0.35)_28%,transparent_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(20,20,27,0.55)_0%,transparent_38%)]" />
            <div className="absolute right-6 top-6 rounded-full border border-white/15 bg-[#14141B]/70 backdrop-blur-md px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-[#D9FE42]">
              Google Map
            </div>
            <div className="absolute left-5 right-5 bottom-5 md:left-8 md:bottom-8 md:right-auto md:max-w-md">
              <div className="rounded-3xl border border-white/15 bg-[#14141B]/70 backdrop-blur-xl p-6 md:p-7 shadow-2xl">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-[#D9FE42] text-[#14141B] flex items-center justify-center shrink-0 shadow-[0_0_24px_rgba(217,254,66,0.35)]">
                    <FaMapMarkerAlt size={14} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[9px] uppercase tracking-[0.18em] text-[#B8B7A4]/70">Registered address</div>
                    <div className="text-sm font-black truncate">2, rue de l'Industrie, L-7735 Bissen</div>
                  </div>
                </div>
                <div className="flex gap-2 mb-5">
                  {HQ_FACTS.map((fact, i) => {
                    const isActive = active === i;
                    return (
                      <div key={fact.label} onMouseEnter={() => setActive(i)}
                        className="flex-1 rounded-xl px-3 py-2.5 text-center transition-all duration-300 cursor-default"
                        style={{ border: `1px solid ${isActive ? "#D9FE42" : "rgba(255,255,255,0.1)"}`, background: isActive ? "rgba(217,254,66,0.08)" : "rgba(255,255,255,0.04)" }}>
                        <div className="text-[8px] font-black uppercase tracking-[0.14em] text-[#B8B7A4]/70">{fact.label}</div>
                        <div className="mt-1 text-sm font-black tracking-tight" style={{ color: isActive ? "#D9FE42" : "#fff" }}>{fact.value}</div>
                        <div className="mt-2 h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                          {isActive && <div key={active} className="h-full bg-[#D9FE42]" style={{ animation: "factProgress 3.2s linear" }} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <a href={MAP_DIRECTIONS_URL} target="_blank" rel="noopener noreferrer"
                  className="group/btn w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#D9FE42] text-[#14141B] text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] hover:bg-white">
                  <FaDirections size={12} /> Open directions
                  <FaArrowRight size={9} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

/* ─── FOOTER ──────────────────────────────────────────────────────────────── */
const Footer = () => (
  <footer className="bg-[#0e0e14] border-t border-[#2a2a3a] px-10 pt-16 pb-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
      <div>
        <div className="text-sm font-black tracking-widest text-white mb-3">VOLTCORE™</div>
        <p className="text-xs text-[#8a8880] leading-relaxed max-w-[200px] mb-5">
          Next-generation polymer matrix smart heating configurations replacing traditional metal wire infrastructures.
        </p>
        <div className="flex gap-2">
          {[
            { href: "https://www.linkedin.com/company/voltcore-tech/posts/?feedView=all", Icon: FaLinkedin },
            { href: "https://www.youtube.com/channel/UCpsmhxcP-_XRV9fFRuIZXCA", Icon: FaYoutube },
          ].map(({ href, Icon }) => (
            <a key={href} href={href} target="_blank" rel="noreferrer"
              className="w-8 h-8 rounded-lg border border-[#2a2a3a] flex items-center justify-center text-[#8a8880] transition-all duration-200 hover:border-[#D9FE42] hover:text-[#D9FE42]">
              <Icon size={12} />
            </a>
          ))}
        </div>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">// Sitemap</h4>
        <ul className="flex flex-col gap-2.5">
          {[["Home", "/"], ["Technology", "/technology"], ["Industries", "/industries"], ["About us", "/about"], ["News", "/news"], ["Contact", "/contact"]].map(([l, to]) => (
            <li key={to}> <Link to={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">{l}</Link> </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">// Platforms</h4>
        <ul className="flex flex-col gap-2.5">
          {[["ActiveFil™", "/technology"], ["TargetHeat™", "/technology"], ["SensiTerm", "/technology"]].map(([l, to]) => (
            <li key={l}> <Link to={to} className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">{l}</Link> </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">// Contact HQ</h4>
        <ul className="flex flex-col gap-4">
          <li className="flex items-start gap-2 text-[12px] text-[#8a8880]">
            <FaMapMarkerAlt className="text-[#D9FE42] mt-0.5 shrink-0" size={11} />
            <span>2, rue de l'Industrie, <br />L-7735 Bissen, Luxembourg</span>
          </li>
          <li className="flex items-center gap-2">
            <FaEnvelope className="text-[#D9FE42] shrink-0" size={11} />
            <a href="mailto:info@voltcore.tech" className="text-sm text-[#8a8880] hover:text-[#D9FE42] transition-colors">info@voltcore.tech</a>
          </li>
        </ul>
      </div>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-6 border-t border-[#2a2a3a] text-[10px] text-[#8a8880]/60">
      <span>© {new Date().getFullYear()} Voltcore™ S.A. All rights reserved. Registered trademark.</span>
      <div className="flex gap-5">
        <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
    </div>
  </footer>
);

/* ─── 06 CAREERS ──────────────────────────────────────────────────────────── */
const OPEN_POSITIONS = [
  {
    title: "Chief Commercial Officer",
    type: "OPEN · HIRING 2026",
    location: "Luxembourg · Hybrid",
    desc: "Senior commercial leader to convert PoCs and JDAs into serial contracts; diverse & female candidates prioritised.",
  },
];

const CareersSection = () => (
  <section id="careers" className="w-full py-24 bg-[#14141B] relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-56 rounded-full blur-3xl opacity-[0.07]" style={{ background: "#D9FE42" }} />
    </div>
    <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl">
      <Reveal className="mb-14">
        <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-3 text-[#D9FE42]">06 // Careers</span>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase leading-tight">
            Join the <br /> <span style={{ color: "#D9FE42" }}>Voltcore Team</span>
          </h2>
          <p className="text-base font-antonym text-white/55 leading-relaxed max-w-lg">
            At Voltcore, we are shifting the paradigms of industrial thermal management. We foster an environment of high-performance engineering, scientific rigor, and bold execution in Luxembourg's deep-tech ecosystem.
          </p>
        </div>
      </Reveal>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-16">
        {[
          { emoji: "🔬", title: "Science First", desc: "We never compromise on material quality. Every decision is grounded in rigorous polymer science and real-world testing." },
          { emoji: "🌍", title: "Sustainable Impact", desc: "Our work directly reduces global CO₂ emissions. You'll contribute to something that matters at a planetary scale." },
          { emoji: "🚀", title: "Fast Execution", desc: "Startup energy with deep-tech credibility. We move fast, iterate hard, and trust everyone to own their domain." },
        ].map(({ emoji, title, desc }, i) => {
          const [h, setH] = React.useState(false);
          return (
            <Reveal key={title} delay={i * 80}>
              <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                className="p-10 cursor-default transition-colors duration-300"
                style={{ background: h ? "#1a1a22" : "#111118" }}>
                <div className="text-3xl mb-4">{emoji}</div>
                <h4 className="text-sm font-black uppercase tracking-tight text-white mb-2">{title}</h4>
                <p className="text-xs font-antonym text-white/50 leading-relaxed">{desc}</p>
                <div className="mt-5 h-0.5 rounded-full transition-all duration-500"
                  style={{ width: h ? 48 : 16, background: "#D9FE42" }} />
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal className="mb-8">
        <span className="text-xs tracking-[0.18em] uppercase font-bold text-[#D9FE42]/50">// Open Positions</span>
      </Reveal>
      <div className="border-t border-white/8">
        {OPEN_POSITIONS.map((pos, i) => {
          const [h, setH] = React.useState(false);
          return (
            <Reveal key={pos.title} delay={i * 70}>
              <div onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
                className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-6 py-7 px-4 border-b border-white/8 cursor-default transition-colors duration-300 overflow-hidden"
                style={{ background: h ? "#1a1a22" : "transparent" }}>
                <div className="absolute left-0 top-0 bottom-0 w-[3px] origin-bottom transition-transform duration-500"
                  style={{ background: "#D9FE42", transform: h ? "scaleY(1)" : "scaleY(0)" }} />
                <div className="pl-3">
                  <h4 className="text-base font-black tracking-tight mb-2 transition-colors duration-300"
                    style={{ color: h ? "#D9FE42" : "white" }}>{pos.title}</h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#D9FE42]/10 text-[#D9FE42]">{pos.type}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 text-white/40">{pos.location}</span>
                  </div>
                  <p className="text-xs font-antonym text-white/45 leading-relaxed transition-all duration-300"
                    style={{ opacity: h ? 1 : 0.6 }}>{pos.desc}</p>
                </div>
                <a href="mailto:info@voltcore.tech"
                  className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 whitespace-nowrap"
                  style={{ background: h ? "#D9FE42" : "transparent", color: h ? "#14141B" : "rgba(255,255,255,0.4)", border: h ? "none" : "1px solid rgba(255,255,255,0.15)" }}>
                  Apply <FaArrowRight size={8} />
                </a>
              </div>
            </Reveal>
          );
        })}
      </div>
      <Reveal delay={300}>
        <div className="mt-10 p-8 rounded-2xl border border-white/8 flex flex-col md:flex-row items-center gap-6 justify-between"
          style={{ background: "rgba(255,255,255,0.03)" }}>
          <div>
            <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Don't see your role?</h4>
            <p className="text-xs font-antonym text-white/45">Send us a spontaneous application — we're always looking for exceptional people.</p>
          </div>
          <a href="mailto:info@voltcore.tech"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-white text-xs font-black uppercase tracking-widest hover:border-[#D9FE42] hover:text-[#D9FE42] transition-all duration-300">
            Send Resume <FaArrowRight size={9} />
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ─── PAGE ────────────────────────────────────────────────────────────────── */
const About = () => (
  <div className="w-full bg-[#14141B] text-white min-h-screen font-sans selection:bg-[#D9FE42] selection:text-[#14141B]">
    <section id="about-hero" className="relative w-full min-h-[88vh] flex items-center overflow-hidden bg-[#14141B]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10" style={{ background: "#D9FE42" }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-5" style={{ background: "#94C356" }} />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />
      <div className="relative z-10 container mx-auto px-6 md:px-12 max-w-6xl pt-32 pb-24">
        <Reveal>
          <span className="text-xs tracking-[0.18em] uppercase font-bold block mb-6 text-[#D9FE42]">02 // About Voltcore</span>
        </Reveal>
        <Reveal delay={80}>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-[0.95] text-white uppercase mb-6">
            Empowering <br /> <span style={{ color: "#D9FE42" }}>Sustainable</span> <br />Material Systems.
          </h1>
        </Reveal>
        <Reveal delay={180}>
          <p className="text-base font-sans leading-relaxed max-w-2xl mb-10" style={{ color: "#B8B7A4" }}>
            Heating accounts for 40% of global CO₂ emissions, yet industrial sectors still rely on the rigid constraints of metal wiring.
            Voltcore is leading the global materials transition — rendering traditional copper heating elements obsolete.
          </p>
        </Reveal>
        <Reveal delay={260} className="flex flex-wrap gap-4">
          <Link to="/technology"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-black uppercase tracking-widest transition-all duration-300 hover:opacity-90 hover:scale-105 hover:shadow-[0_0_30px_rgba(217,254,66,0.25)]"
            style={{ background: "#D9FE42", color: "#14141B" }}>
            Our Technology <FaArrowRight size={9} />
          </Link>
          <Link to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest border border-white/20 text-white hover:border-white/50 transition-all duration-300">
            Contact Us <FaArrowRight size={9} />
          </Link>
        </Reveal>
      </div>
    </section>
    <ValuesSection />
    <TimelineSection />
    <PressSection />
    <TeamSection />
    <LocationMap />
    <CareersSection />
    <Footer />
  </div>
);

export default About;