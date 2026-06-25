import React from "react";
import { Link } from "react-router-dom";
import AutomotiveThumb from "../assets/website/industries/automotive-hero.jpg";

const INDUSTRIES = [
  {
    slug: "automotive",
    title: "Automotive",
    icon: "🚗",
    tagline: "Cabin Cocoon heating for EV & premium interiors",
    image: AutomotiveThumb,
    ready: true,
  },
  {
    slug: "food-delivery",
    title: "Food & Delivery",
    icon: "📦",
    tagline: "Smart heating grids for thermal delivery bags",
    image: null,
    ready: false,
  },
  {
    slug: "heated-apparel",
    title: "Heated Apparel",
    icon: "🧥",
    tagline: "Ultra-thin elements woven into smart clothing",
    image: null,
    ready: false,
  },
  {
    slug: "underfloor-heating",
    title: "Underfloor Heating",
    icon: "🏠",
    tagline: "Low-profile radiant heating for floors & surfaces",
    image: null,
    ready: false,
  },
  {
    slug: "defense",
    title: "Defense",
    icon: "🛡️",
    tagline: "Rugged thermal systems for extreme environments",
    image: null,
    ready: false,
  },
];

const Industries = () => {
  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white py-32 duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-20" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 block mb-3">
            Where Voltcore Heats
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]">
              Industries
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Select an industry to see how Voltcore's polymer heating platform performs against legacy
            technology, with the bench data to back it up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRIES.map((ind, index) => (
            <Link
              key={ind.slug}
              to={`/industries/${ind.slug}`}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="group relative rounded-3xl p-[1px] transition-all duration-500 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-md dark:shadow-[0_0_25px_rgba(59,130,246,0.02)] hover:dark:shadow-[0_0_30px_rgba(188,19,254,0.15)]"
            >
              <div className="relative rounded-[23px] overflow-hidden bg-zinc-50 dark:bg-zinc-950 h-72 flex flex-col justify-end transition-all duration-500 group-hover:dark:bg-zinc-900/30">
                {ind.image && (
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                )}
                {!ind.image && (
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
                    {ind.icon}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                {!ind.ready && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-black/70 text-zinc-300 border border-zinc-700">
                    Coming soon
                  </span>
                )}

                <div className="relative z-10 p-7">
                  <div className="text-3xl mb-2">{ind.icon}</div>
                  <h3 className="text-2xl font-bold tracking-tight text-white mb-1 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3b82f6] group-hover:to-[#bc13fe]">
                    {ind.title}
                  </h3>
                  <p className="text-zinc-300 text-sm leading-relaxed">{ind.tagline}</p>
                  <div className="mt-4 flex items-center text-xs font-bold text-zinc-400 transition-colors duration-300 group-hover:text-[#3b82f6]">
                    <span>{ind.ready ? "EXPLORE" : "PREVIEW"}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1 transform transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Industries;
