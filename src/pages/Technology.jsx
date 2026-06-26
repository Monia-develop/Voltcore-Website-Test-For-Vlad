import React, { useState } from "react";
import { FaArrowRight, FaLeaf, FaShieldAlt, FaBolt, FaCheckCircle } from "react-icons/fa";

import SecondSkinImg from "../assets/website/platforms/SecondSkinAutomotive.png";

const TECH_PILLARS = [
  {
    icon: <FaBolt className="text-[#618532] dark:text-[#D9FE42]" size={24} />,
    title: "Thermal Performance & Efficiency",
    points: [
      "Unidirectional Heat Transfer: Delivers 85–95% of generated thermal energy directly to the target A-Surface.",
      "Up to 2× less energy consumption compared to legacy copper wire systems.",
      "40–70% faster warm-up speed to reach target comfort temperatures.",
      "Absolute homogeneity (ΔT≈3–4°C) completely eliminating painful cold spots."
    ]
  },
  {
    icon: <FaLeaf className="text-[#618532] dark:text-[#D9FE42]" size={24} />,
    title: "Sustainability & Lifecycle",
    points: [
      "100% polymer mono-material matrix allowing straightforward mechanical recycling at end-of-life.",
      "Formulated to integrate up to 75% post-industrial recycled polymer content by mass.",
      "50–75% lower CO₂ equivalent manufacturing footprint compared to resource-intensive copper components."
    ]
  },
  {
    icon: <FaShieldAlt className="text-[#618532] dark:text-[#D9FE42]" size={24} />,
    title: "Operational Safety",
    points: [
      "Inherent Overheat Mitigation: Self-regulating thermal response preventing local electrical thermal runaway.",
      "Low-Voltage Optimization: Engineered for 5-12V and 12-48V architectures, eliminating high-voltage shocks or sparks.",
      "Compatible with multiple power sources: car cigarette lighter, e-bike power socket, separate batteries, or domestic current."
    ]
  }
];

const Technology = () => {
  const [activeNode, setActiveNode] = useState(null);

  return (
    <div className="w-full bg-[#B8B7A4]/20 dark:bg-[#14141B] text-[#14141B] dark:text-white min-h-screen">
      
{/* ── HEADER */}
      <section className="w-full bg-[#14141B] py-32 md:py-40 relative overflow-hidden flex items-center justify-center min-h-[60vh]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(217,254,66,0.06),transparent_70%)]" />
        <div className="relative z-10 container mx-auto px-6 max-w-5xl text-center" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-4 text-[#D9FE42]">
            03 — Technology Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-tight mb-6">
            Our Proprietary <br />
            <span className="text-[#D9FE42]">Material Stack & Functionalities</span>
          </h1>
          <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-[#B8B7A4]">
            Transforming surface heating from an inefficient, metal-dependent legacy framework into a highly 
            sustainable, software-integrable deep-tech solution.
          </p>
        </div>
      </section>

      {/* CONTENEUR GLOBAL DE STRUCTURE (Pour éviter que le reste ne s'étale trop sur les grands écrans) */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* ── SECTION INTERACTIVE : LE SCHÉMA DU BOSS ──────────────────────── */}
        <section className="w-full py-20">
          <div className="mb-12 text-center" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-[#618532] dark:text-[#D9FE42] block mb-2">Architecture Mapping</span>
            <h2 className="text-3xl font-black tracking-tight">Interactive Product Ecosystem</h2>
            <p className="text-sm text-[#14141B]/60 dark:text-[#B8B7A4] mt-2">Click or hover over the ecosystem nodes to discover our core technological architecture.</p>
          </div>

          <div className="bg-white/50 dark:bg-[#1a1a22] border border-[#14141B]/10 dark:border-[#2a2a35] rounded-3xl p-8 md:p-12 shadow-inner" data-aos="fade-up">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative">
              
              {/* Step 1 */}
              <div 
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${activeNode === "activefil" ? "border-[#618532] dark:border-[#D9FE42] bg-[#D9FE42]/5 dark:bg-[#D9FE42]/10 shadow-lg" : "border-[#14141B]/10 dark:border-[#2a2a35] bg-white dark:bg-[#14141B]"}`}
                onMouseEnter={() => setActiveNode("activefil")}
                onClick={() => setActiveNode("activefil")}
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full bg-[#14141B] text-[#D9FE42]">STEP 01 — PRODUCTS</span>
                  <span className="text-xs font-black text-[#618532] dark:text-[#D9FE42]">PATENTED</span>
                </div>
                <h3 className="text-2xl font-black text-[#94C356] mb-2">ActiveFil™</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-[#14141B]/40 dark:text-[#B8B7A4]/50 mb-3">Filaments & Base Technology</p>
                <p className="text-sm text-[#14141B]/70 dark:text-[#B8B7A4] leading-relaxed">
                  High-purity carbon nanotube (CNT) nanofillers precisely infused into thermoplastic polymer matrices (PP, PA, PET).
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-6 relative">
                <div className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 text-[#618532] dark:text-[#D9FE42] animate-pulse"><FaArrowRight /></div>
                
                <div 
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${activeNode === "targetheat" ? "border-[#618532] dark:border-[#D9FE42] bg-[#D9FE42]/5 dark:bg-[#D9FE42]/10 shadow-lg" : "border-[#14141B]/10 dark:border-[#2a2a35] bg-white dark:bg-[#14141B]"}`}
                  onMouseEnter={() => setActiveNode("targetheat")}
                  onClick={() => setActiveNode("targetheat")}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-black text-[#F07E26]">TargetHeat® Meshes</h4>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#F07E26]/20 text-[#F07E26]">TRL 7</span>
                  </div>
                  <p className="text-xs font-bold uppercase text-[#14141B]/40 dark:text-[#B8B7A4]/50 mb-2">Open Structure Heating</p>
                  <p className="text-xs text-[#14141B]/70 dark:text-[#B8B7A4]">Maximizes airflow, ventilation, and structural breathability (30–60 g/m²).</p>
                </div>

                <div 
                  className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${activeNode === "sensiterm" ? "border-[#618532] dark:border-[#D9FE42] bg-[#D9FE42]/5 dark:bg-[#D9FE42]/10 shadow-lg" : "border-[#14141B]/10 dark:border-[#2a2a35] bg-white dark:bg-[#14141B]"}`}
                  onMouseEnter={() => setActiveNode("sensiterm")}
                  onClick={() => setActiveNode("sensiterm")}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-black text-[#4A5DA7]">SensiTerm Fabrics</h4>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[#4A5DA7]/20 text-[#4A5DA7]">TRL 6</span>
                  </div>
                  <p className="text-xs font-bold uppercase text-[#14141B]/40 dark:text-[#B8B7A4]/50 mb-2">Dense Structure / Sensing + Heating</p>
                  <p className="text-xs text-[#14141B]/70 dark:text-[#B8B7A4]">Tightly woven layout maximizing surface coverage and intrinsic telemetry feedback.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-2xl border border-[#14141B]/10 dark:border-[#2a2a35] bg-[#14141B] text-white h-full flex flex-col justify-center relative">
                <div className="hidden lg:block absolute -left-6 top-1/2 -translate-y-1/2 text-[#D9FE42] animate-pulse"><FaArrowRight /></div>
                <span className="text-[10px] font-bold tracking-widest text-[#D9FE42] block mb-2">STEP 02 & 03 — PROPERTIES</span>
                <h4 className="text-xl font-black mb-4">Client Applications & Benefits</h4>
                
                <ul className="space-y-3 text-xs text-[#B8B7A4]">
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-[#D9FE42] flex-shrink-0" /> Unidirectional Surface Heating</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-[#D9FE42] flex-shrink-0" /> Intrinsic Sensing (No external sensors)</li>
                  <li className="flex items-center gap-2"><FaCheckCircle className="text-[#D9FE42] flex-shrink-0" /> Directly Scalable on Textiles/Pads/Panels</li>
                </ul>
              </div>

            </div>

            <div className="mt-8 pt-6 border-t border-[#14141B]/10 dark:border-[#2a2a35] min-h-[100px]">
              {activeNode === "activefil" && (
                <div className="animate-fadeIn">
                  <h5 className="font-black text-[#94C356] text-lg mb-1">ActiveFil™ Deep Tech Specifications:</h5>
                  <p className="text-sm text-[#14141B]/80 dark:text-[#B8B7A4]">
                    Features an exact resistance range from 10 kΩ to 2 MΩ/m. Extremely lightweight (30–60 g/km of filament) with a high tensile strength of 25–30 cN/tex ensuring absolute mechanical durability without cyclic self-abrasion.
                  </p>
                </div>
              )}
              {activeNode === "targetheat" && (
                <div className="animate-fadeIn">
                  <h5 className="font-black text-[#F07E26] text-lg mb-1">TargetHeat® Performance Profile:</h5>
                  <p className="text-sm text-[#14141B]/80 dark:text-[#B8B7A4]">
                    Functions as a low-voltage safe (12–48V) open-loop thermal surface plane. Reaches up to 100°C homogeneous temperature without any localized copper hot spots. Delivered in high-volume production roll widths up to 2 meters.
                  </p>
                </div>
              )}
              {activeNode === "sensiterm" && (
                <div className="animate-fadeIn">
                  <h5 className="font-black text-[#4A5DA7] text-lg mb-1">SensiTerm Advanced Awareness Matrix:</h5>
                  <p className="text-sm text-[#14141B]/80 dark:text-[#B8B7A4]">
                    Utilizes piezoresistive behavior for direct resistance telemetry. Includes occupancy mapping, zoned adaptive power regulation (heats only what you touch), and loop integrity alerts that instantly mitigate overheat or overcurrent faults.
                  </p>
                </div>
              )}
              {!activeNode && (
                <p className="text-sm text-center italic text-[#14141B]/40 dark:text-[#B8B7A4]/40 pt-4">
                  Hover over or touch any platform section above to extract live material characteristics.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* ── SECTION ARCHITECTURE VISUELLE METTANT L'IMAGE EN AVANT ── */}
        <section className="w-full py-20">
          <div className="text-center max-w-3xl mx-auto mb-12" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#618532] dark:text-[#D9FE42]">
              Architectural Integration
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
              The "Second Skin" Integration Architecture
            </h2>
            <p className="text-base text-[#14141B]/70 dark:text-[#B8B7A4] leading-relaxed">
              At a thickness profile of <strong>only 2–3 mm</strong> (compared to the massive 5–13 mm stack envelope required for standard insulated legacy copper configurations), Voltcore meshes are integrated immediately below the exterior surface material.
            </p>
          </div>

          <div 
            className="rounded-3xl overflow-hidden border border-[#14141B]/15 dark:border-[#2a2a35] shadow-2xl bg-[#14141B] p-4 md:p-8 max-w-4xl mx-auto backdrop-blur-md"
            data-aos="zoom-in"
          >
            <img 
              src={SecondSkinImg} 
              alt="Voltcore Second Skin Architectural Comparison vs Copper Wire System" 
              className="w-full h-auto rounded-2xl object-contain mx-auto"
            />
          </div>

          <div className="max-w-3xl mx-auto mt-10 text-center" data-aos="fade-up">
            <p className="text-sm md:text-base text-[#14141B]/70 dark:text-[#B8B7A4] leading-relaxed">
              This design completely removes the need for thick, heavy intermediate isolation foam layers. It ensures direct, instant heat transfer while remaining fully compatible with rapid automated manufacturing lines, complex injection over-molding, and compression lamination.
            </p>
          </div>
        </section>

        {/* ── SECTION PILLIERS DES AVANTAGES ─────────────────── */}
        <section className="w-full py-20">
          <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-[0.25em] block mb-3 text-[#618532] dark:text-[#D9FE42]">
              Performance Indicators
            </span>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Why Voltcore Outperforms Legacy Systems
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TECH_PILLARS.map((pillar, idx) => (
              <div 
                key={idx}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group p-8 rounded-3xl border bg-white dark:bg-[#1a1a22] border-[#14141B]/10 dark:border-[#2a2a35] hover:border-[#618532] dark:hover:border-[#D9FE42] transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#14141B] flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-black mb-4 tracking-tight text-[#14141B] dark:text-white group-hover:text-[#618532] dark:group-hover:text-[#D9FE42] transition-colors duration-300">
                  {pillar.title}
                </h3>
                <ul className="space-y-3">
                  {pillar.points.map((pt, ptIdx) => (
                    <li key={ptIdx} className="text-xs leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4] flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#618532] dark:bg-[#D9FE42] mt-1.5 flex-shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

      </div> {/* FIN DU CONTENEUR DE STRUCTURE */}

    </div>
  );
};

export default Technology;