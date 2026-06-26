import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const VALUES = [
  {
    label: "Efficiency",
    desc: "Maximizing thermal performance while cutting energy demand by up to 2× compared to legacy metal wire configurations.",
  },
  {
    label: "Sustainability",
    desc: "Driving a circular economy through a mono-material polymer approach that integrates up to 75% recycled content and ensures total end-of-lifecycle recyclability.",
  },
  {
    label: "Precision",
    desc: "Delivering continuous, zero-hotspot surface warmth (ΔT∼4°C) with advanced, fabric-integrated intrinsic state regulation.",
  },
  {
    label: "Scalability",
    desc: "Designing CNT solutions fully compatible with standard industrial extrusion, lamination, and injection co-molding processes.",
  },
];

const MILESTONES = [
  { year: "2024", title: "Foundation", desc: "Voltcore founded in Luxembourg's deep-tech ecosystem to bridge advanced nanotechnology and industrial polymer processing." },
  { year: "2024", title: "First PoC", desc: "Successfully dispersed conductive CNT fillers into standard polymer matrices, achieving controlled electrical resistivity without altering processability." },
  { year: "2024", title: "IP Secured", desc: "Globally registered trademarks including Voltcore® and TargetHeat® — locking in proprietary material stack ownership." },
  { year: "2025", title: "24+ PoCs", desc: "Completed over 24 successful Proof of Concept iterations with global OEMs and Tier-1 suppliers across 6 industries." },
  { year: "2026", title: "Commercial Scale", desc: "7th industrial PoC graduates to full commercial production. Scaling capabilities for massive, commercial-grade volume rollouts." },
];

// LE LIEN FORBES COMPLET A ÉTÉ AJOUTÉ ICI
const ARTICLES = [
  {
    source: "Forbes",
    title: "How Voltcore is Disrupting the Global Thermal Management Industry",
    desc: "An in-depth look into how Luxembourg's deep-tech ecosystem is fostering advanced materials capable of replacing legacy copper infrastructure.",
    link: "https://www.forbes.lu/luxembourg-voltcore-heats-up-ev-innovation-across-europe/" 
  }
];

const TEAM = [
  {
    name: "Fabrice Bertinchamps",
    role: "Co-founder & CEO",
    detail: "PhD in Catalysis, UCLouvain. Alumnus of Harvard, London Business School, INSEAD, and HEC Paris. 20+ years leading global polymer and chemicals innovation at SABIC and TotalEnergies.",
  },
  {
    name: "Vlad Batkhin",
    role: "Co-founder & CTO",
    detail: "MSc in Applied Physics, Moscow Institute of Physics and Technology. Diploma, CWC School for Energy, London. 15+ years taking breakthrough R&D chemistry to full commercial launches.",
  },
  {
    name: "Sachin Kumar",
    role: "Polymer Process Engineer",
    detail: "Leading advanced polymer processing, extrusion engineering, and material compound scalability.",
  },
  {
    name: "Daria Voronina",
    role: "Sustainability & BD",
    detail: "Spearheading corporate sustainability initiatives, Life Cycle Assessments (LCA), and green energy material partnerships.",
  },
  {
    name: "Aviral Kapoor",
    role: "International Sales & BD",
    detail: "Driving global commercial strategy, industrial partnerships, and client integration pipelines across major vertical industries.",
  },
];

const ADVISORS = [
  {
    name: "Georges De Pelsemaeker",
    role: "Tech Board Head",
    detail: "PhD ÉPL; MBA HEC Paris. 27+ years at Valeo managing global automotive thermal management. Original inventor of the automotive 'Cabin Comfort Cocoon' concept.",
  },
  {
    name: "Thierry Goniva",
    role: "Advisor",
    detail: "MSc Electrical Engineering, ETH Zürich. CSO Programme, INSEAD. 25+ years scaling IEE from 120 to 4,000 employees; former CTO at B Medical Systems.",
  },
  {
    name: "Pierre Orlewski",
    role: "Strategy Advisor",
    detail: "Advising on corporate growth roadmap, deep-tech scalability, and global technology deployment.",
  },
];

const TeamCard = ({ member }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="group rounded-3xl overflow-hidden border transition-all duration-300 cursor-pointer border-[#14141B]/10 bg-white hover:border-[#14141B]/30 hover:shadow-lg dark:bg-[#1a1a22] dark:border-[#2a2a35] dark:hover:border-[#D9FE42] dark:hover:shadow-[0_0_30px_rgba(217,254,66,0.08)]"
      onClick={() => setOpen(!open)}
    >
      <div className="relative h-64 overflow-hidden bg-[#14141B] dark:bg-[#0d0d13] flex items-center justify-center">
        <span className="text-6xl font-black" style={{ color: "#D9FE42" }}>{member.name[0]}</span>
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B]/60 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-black tracking-tight text-[#14141B] dark:text-white">{member.name}</h3>
        <span className="text-xs font-bold uppercase tracking-widest text-[#D9FE42] block mt-1 mb-3" style={{ color: "#D9FE42" }}>
          {member.role}
        </span>

        <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"}`}>
          <p className="text-sm leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4] pb-2">{member.detail}</p>
        </div>

        <button className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider mt-2 text-[#14141B]/40 dark:text-[#B8B7A4]/50 group-hover:text-[#14141B] dark:group-hover:text-[#D9FE42] transition-colors duration-300">
          {open ? "Less" : "Read more"} <FaArrowRight size={9} className={`transition-transform duration-300 ${open ? "rotate-90" : ""}`} />
        </button>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <div className="w-full bg-[#B8B7A4]/20 dark:bg-[#14141B] text-[#14141B] dark:text-white min-h-screen">

      <section className="relative w-full py-40 overflow-hidden bg-[#14141B]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(217,254,66,0.08),transparent_60%)]" />
        <div className="relative z-10 container mx-auto px-6 max-w-4xl" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-4" style={{ color: "#D9FE42" }}>
            02 — About Us
          </span>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-tight mb-6">
            Empowering Sustainable<br />
            <span style={{ color: "#D9FE42" }}>Material Systems.</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl" style={{ color: "#B8B7A4" }}>
            Heating accounts for 40% of global CO₂ emissions, yet industrial sectors still rely on the rigid constraints of metal wiring.
            Voltcore is leading the global materials transition by rendering traditional copper heating elements obsolete.
          </p>
        </div>
      </section>

      <section className="w-full py-24 bg-[#B8B7A4]/15 dark:bg-[#1a1a22]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-14" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#14141B] dark:text-[#D9FE42]">
              2.1 — Mission & Vision
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#14141B] dark:text-white mb-4">
              Our Brand Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((v, i) => (
              <div
                key={v.label}
                data-aos="fade-up"
                data-aos-delay={i * 80}
                className="rounded-2xl p-7 border bg-white/60 border-[#14141B]/10 dark:bg-[#14141B] dark:border-[#2a2a35]"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#D9FE42" }} />
                  <h3 className="text-lg font-black tracking-tight text-[#14141B] dark:text-white">{v.label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-24 bg-white/40 dark:bg-[#14141B]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-14" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#14141B] dark:text-[#D9FE42]">
              2.2 — The Voltcore Story
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#14141B] dark:text-white">
              History & Milestones
            </h2>
          </div>

          <div className="relative mb-16">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-[#14141B]/10 dark:bg-[#2a2a35]" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <div key={i} data-aos="fade-up" data-aos-delay={i * 80} className="flex gap-8 items-start">
                  <div className="relative flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-[10px] z-10" style={{ background: "#D9FE42", color: "#14141B" }}>
                    {m.year.slice(2)}
                  </div>
                  <div className="pt-1 pb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#14141B]/40 dark:text-[#B8B7A4]/50 block mb-1">{m.year}</span>
                    <h3 className="text-lg font-black text-[#14141B] dark:text-white mb-1">{m.title}</h3>
                    <p className="text-sm leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4]">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16 border-t border-[#14141B]/10 dark:border-[#2a2a35] pt-12" data-aos="fade-up">
            <h3 className="text-xl font-black text-[#14141B] dark:text-white mb-6 tracking-tight">In the Press</h3>
            <div className="grid grid-cols-1 gap-4">
              {ARTICLES.map((art, i) => (
                <a
                  key={i}
                  href={art.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl p-6 border bg-white/60 border-[#14141B]/10 hover:border-[#14141B]/30 dark:bg-[#1a1a22] dark:border-[#2a2a35] dark:hover:border-[#D9FE42] transition-all duration-300"
                >
                  <span className="text-xs font-bold uppercase tracking-widest block mb-2" style={{ color: "#D9FE42" }}>{art.source}</span>
                  <h4 className="font-black text-lg text-[#14141B] dark:text-white mb-2">{art.title}</h4>
                  <p className="text-sm leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4]">{art.desc}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="team" className="w-full py-24 bg-[#B8B7A4]/15 dark:bg-[#1a1a22]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="mb-14" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#14141B] dark:text-[#D9FE42]">
              2.3 — Team & Governance
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#14141B] dark:text-white mb-2">
              The People Behind Voltcore
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {TEAM.map((m, i) => (
              <div key={m.name} data-aos="fade-up" data-aos-delay={i * 80}>
                <TeamCard member={m} />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;