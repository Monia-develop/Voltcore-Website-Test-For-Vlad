import React from "react";
import { FaArrowRight, FaRegClock, FaExternalLinkAlt } from "react-icons/fa";

const ALL_NEWS = [
  {
    date: "August 2025",
    tag: "Media Coverage",
    title: "Luxembourg’s Voltcore™ Heats Up EV Innovation Across Europe",
    summary: "Featured in Forbes Luxembourg: Discover how our patented Carbon Nanotube (CNT) technology is reshaping the automotive footprint and extending EV winter driving ranges.",
    link: "https://www.forbes.lu/luxembourg-voltcore-heats-up-ev-innovation-across-europe/",
    isExternal: true,
    featured: true
  },
  {
    date: "October 2025",
    tag: "Production",
    title: "Voltcore™ Graduates Industrial Validation into Full Commercial Production",
    summary: "Top-tier global Tier-1 automotive and industrial partners officially transition from pilot testing to volume manufacturing at our advanced manufacturing site.",
    link: "#",
    isExternal: false,
    featured: false
  },
  {
    date: "February 2026",
    tag: "Sustainability",
    title: "LCA Assessment Confirms up to 75% Lower CO₂ Footprint vs Copper Elements",
    summary: "Third-party Life Cycle Assessments validate our mono-material polymer configurations for total end-of-life recyclability and clean footprint engineering.",
    link: "#",
    isExternal: false,
    featured: false
  },
  {
    date: "June 2026",
    tag: "Event",
    title: "Voltcore™ at VivaTech 2026 — Live Smart Mesh Demos in Paris",
    summary: "Our executive and tech team showcased interactive smart seating and flexible heating structures to hundreds of industrial operators and deep-tech tech venture firms.",
    link: "#",
    isExternal: false,
    featured: false
  }
];

const News = () => {
  return (
    <div className="w-full min-h-screen bg-[#B8B7A4]/15 dark:bg-[#14141B] pt-32 pb-24 transition-colors duration-300">
      
      {/* Header section */}
      <div className="container mx-auto px-6 max-w-6xl mb-20 text-center md:text-left">
        <span className="text-xs font-bold uppercase tracking-[0.25em] inline-block mb-4 px-3 py-1 rounded-full bg-[#14141B]/5 dark:bg-[#D9FE42]/10 text-[#14141B] dark:text-[#D9FE42]">
          Pressroom & Insights
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[#14141B] dark:text-white leading-tight">
          Latest from <br />
          <span className="text-[#14141B]/50 dark:text-[#B8B7A4]">Voltcore™ Corporate</span>
        </h1>
        <p className="mt-4 text-base md:text-lg text-[#14141B]/70 dark:text-[#B8B7A4] max-w-xl">
          Follow our updates on manufacturing scale-up, technological milestones, corporate partnerships, and industry highlights.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 gap-8">
          
          {ALL_NEWS.map((item, index) => {
            const CardWrapper = item.isExternal ? "a" : "div";
            const extraProps = item.isExternal ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <CardWrapper
                key={index}
                {...extraProps}
                className={`group rounded-3xl border transition-all duration-300 block bg-white dark:bg-[#1a1a22] border-[#14141B]/10 hover:border-[#14141B]/30 dark:border-[#2a2a35] dark:hover:border-[#D9FE42] ${
                  item.featured 
                    ? "p-8 md:p-10 ring-2 ring-[#D9FE42]/40 dark:shadow-[0_0_40px_rgba(217,254,66,0.06)]" 
                    : "p-8"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="flex-1">
                    
                    {/* Tags line */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                        item.featured 
                          ? "bg-[#14141B] text-[#D9FE42] dark:bg-[#D9FE42] dark:text-[#14141B]" 
                          : "bg-[#14141B]/10 text-[#14141B] dark:bg-white/10 dark:text-[#B8B7A4]"
                      }`}>
                        {item.tag}
                      </span>
                      <span className="text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 text-[#14141B]/50 dark:text-[#B8B7A4]/50">
                        <FaRegClock size={11} /> {item.date}
                      </span>
                    </div>

                    {/* News Title */}
                    <h2 className={`font-black tracking-tight mb-4 group-hover:text-[#14141B]/70 dark:group-hover:text-[#D9FE42] transition-colors duration-300 ${
                      item.featured ? "text-2xl md:text-3xl text-[#14141B] dark:text-white" : "text-xl text-[#14141B] dark:text-white"
                    }`}>
                      {item.title}
                    </h2>

                    {/* Summary text */}
                    <p className="text-sm leading-relaxed text-[#14141B]/70 dark:text-[#B8B7A4] max-w-4xl">
                      {item.summary}
                    </p>
                  </div>

                  {/* Icon indicator */}
                  <div className="flex-shrink-0 self-end md:self-start pt-2">
                    <span className="w-10 h-10 rounded-full border border-[#14141B]/10 dark:border-white/10 flex items-center justify-center text-[#14141B] dark:text-white group-hover:bg-[#14141B] group-hover:text-[#D9FE42] dark:group-hover:bg-[#D9FE42] dark:group-hover:text-[#14141B] transition-all duration-300">
                      {item.isExternal ? <FaExternalLinkAlt size={12} /> : <FaArrowRight size={12} />}
                    </span>
                  </div>

                </div>
              </CardWrapper>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default News;