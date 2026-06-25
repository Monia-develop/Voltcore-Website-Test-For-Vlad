import React from "react";
import { Link } from "react-router-dom";
import HotspotImage from "../../Components/HotspotImage";
import AutomotiveCaseStudy from "../../Components/AutomotiveCaseStudy";
import AutomotiveHero from "../../assets/website/industries/automotive-hero.jpg";
import { FaSnowflake, FaWeightHanging, FaThermometerHalf } from "react-icons/fa";

/**
 * Hotspot positions are (x, y) as % of the full image dimensions.
 *
 * Based on the screenshot:
 *  01 – Seats: the heated seat pattern is clearly visible on the front seat
 *       → centre of the front seat back (left portion of image)
 *  02 – Heated Sensing / Touch: the steering wheel + centre screen cluster
 *       → upper-centre area, where the wheel and dash screen are
 *  03 – Heated Surfaces: armrest / centre console glow
 *       → middle-right, around the console/armrest area
 *  04 – Heated Door Panel: door card far left edge
 *       → left side, mid-height on the door card
 */
const HOTSPOTS = [
  {
    id: "seats",
    x: 34,
    y: 52,
    title: "Heating & Presence Detection — 2-in-1 for Seats",
    desc: "Deployed directly within the seat upholstery matrix for simultaneous high-velocity heating and intrinsic occupancy/posture sensing.",
  },
  {
    id: "touch",
    x: 62,
    y: 30,
    title: "Heated Sensing / Touch Elements",
    desc: "Sensing and touch controls incorporated directly into the heated surface; no separate sensor mat required.",
  },
  {
    id: "surfaces",
    x: 72,
    y: 55,
    title: "Heated Surfaces",
    desc: "Armrests, door panels, gloveboxes and cupholders — laminated, over-molded, or compression-molded into the trim.",
  },
  {
    id: "doorpanel",
    x: 8,
    y: 58,
    title: "Heated Door Panel",
    desc: "Ultra-thin heating fabric integrated beneath the door card A-surface as part of the Cabin Cocoon.",
  },
];

const PROBLEMS = [
  {
    icon: FaSnowflake,
    title: "The Winter Range Drain",
    sub: "Battery Bottleneck",
    desc: "Conventional HVAC heats the entire cabin air volume, draining up to 30% of an EV's winter driving range.",
  },
  {
    icon: FaWeightHanging,
    title: "Legacy Structural Bulk",
    sub: "Packaging & Weight",
    desc: "Copper-wire heating snakes need a 5–13 mm install envelope, forcing bulky foam spacers beneath the surface.",
  },
  {
    icon: FaThermometerHalf,
    title: "Poor Thermal Dynamics",
    sub: "The Comfort Gap",
    desc: "Copper networks run ΔT > 10°C — slow to heat, uneven, and full of hot spots next to cold zones.",
  },
];

const FORMATS = [
  {
    title: "SensiTerm Active Seats",
    desc: "Deployed directly within the seat upholstery matrix to provide simultaneous high-velocity heating and intrinsic occupancy/posture sensing without the weight of standalone sensor mats.",
  },
  {
    title: "TargetHeat Complex Trim",
    desc: "Integrated smoothly via high-volume industrial lamination, injection over-molding, or compression molding into curved door cards, center consoles, and dashboard structures.",
  },
];

const TRACTION = [
  {
    tag: "Major US OEM",
    desc: "Multi-phase testing of the Cabin Cocoon architecture for a next-generation electric pickup truck and SUV platform to maximize winter battery range.",
  },
  {
    tag: "Leading Global Vehicle Manufacturer",
    desc: "Validation of SensiTerm integrated seat layers combining premium thermal delivery with regulatory-compliant occupant classification.",
  },
  {
    tag: "European Automotive Brands",
    desc: "Active validation of ultra-thin heating elements within advanced luxury electric sedan concepts.",
  },
  {
    tag: "Tier-1 Automotive Suppliers",
    desc: "Joint Development Agreements focused on high-volume automated over-molding for door panels and console trims.",
  },
];

const FlowDiagram = ({ steps, accent }) => (
  <div className="flex items-center gap-2 overflow-x-auto pb-2">
    {steps.map((s, i) => (
      <React.Fragment key={s}>
        <div
          className={`flex-shrink-0 text-[11px] font-semibold px-3 py-2 rounded-lg border ${
            accent
              ? "border-[#3b82f6]/40 text-[#3b82f6] bg-[#3b82f6]/5"
              : "border-zinc-700 text-zinc-400 bg-zinc-900"
          }`}
        >
          {s}
        </div>
        {i < steps.length - 1 && <span className="text-zinc-600 flex-shrink-0">→</span>}
      </React.Fragment>
    ))}
  </div>
);

const Automotive = () => {
  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white py-32 duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* HEADER */}
        <div className="max-w-3xl mb-16" data-aos="fade-up">
          <Link
            to="/industries"
            className="text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-[#3b82f6] transition-colors"
          >
            ← Industries
          </Link>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400 block mt-4 mb-3">
            Mobility — Automotive
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]">
              Cabin Cocoon
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Voltcore replaces heavy, legacy copper wiring with an ultra-thin, software-integrable polymer
            heating architecture — a true second-skin thermal solution for EV and premium ICE interiors.
          </p>
        </div>

        {/* HOTSPOT HERO */}
        <div className="mb-4" data-aos="fade-up">
          <HotspotImage src={AutomotiveHero} alt="Voltcore heated automotive interior" hotspots={HOTSPOTS} />
        </div>
        <p className="text-center text-xs text-zinc-500 mb-24">
          Drag to explore the cabin. Tap the markers to see what's heated, sensed, and warmed.
        </p>

        {/* CLIENT PROBLEM */}
        <div className="mb-24">
          <div className="max-w-2xl mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-2">
              4.1 — The Client Problem
            </span>
            <h2 className="text-3xl font-black tracking-tight">
              Three thermal bottlenecks legacy tech can't resolve
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROBLEMS.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                  className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6"
                >
                  <div className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-[#3b82f6] mb-5">
                    <Icon size={16} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500 block mb-1">
                    {p.sub}
                  </span>
                  <h3 className="text-lg font-bold tracking-tight mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* VOLTCORE SOLUTION */}
        <div className="mb-24">
          <div className="max-w-2xl mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-2">
              4.2 — The Voltcore Solution
            </span>
            <h2 className="text-3xl font-black tracking-tight mb-4">
              From volumetric air convection to direct surface radiation
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              Instead of wasting energy heating air that quickly escapes, Voltcore laminates ultra-thin
              (2–3 mm) fully drapable heating fabrics immediately beneath the interior A-surfaces — warming
              the steering wheel, armrests, door panels, glovebox, and seats directly.
            </p>
          </div>

          <div className="space-y-5 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6" data-aos="fade-up">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 block mb-2">
                Legacy copper architecture — thick, insulated, slow
              </span>
              <FlowDiagram steps={["A-Surface", "Thick spacer (5–13mm)", "Copper wire snake", "Inner base"]} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#3b82f6] block mb-2">
                Voltcore second-skin architecture — ultra-thin, direct, rapid
              </span>
              <FlowDiagram steps={["A-Surface", "Voltcore mesh (2–3mm)", "Inner base"]} accent />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {FORMATS.map((f, i) => (
              <div
                key={f.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-6"
              >
                <h3 className="text-lg font-bold tracking-tight mb-2">{f.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CASE STUDY */}
        <div className="mb-24">
          <div className="max-w-2xl mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-2">
              4.3 — Case Study: Smart Seat Heating
            </span>
            <h2 className="text-3xl font-black tracking-tight">
              Voltcore Polymer vs. Standard Copper Wire
            </h2>
          </div>
          <div data-aos="fade-up">
            <AutomotiveCaseStudy />
          </div>
        </div>

        {/* TRACTION */}
        <div className="mb-24">
          <div className="max-w-2xl mb-10" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block mb-2">
              4.4 — POCs &amp; Traction
            </span>
            <h2 className="text-3xl font-black tracking-tight">Active across key automotive regions</h2>
          </div>
          <div className="space-y-4">
            {TRACTION.map((t, i) => (
              <div
                key={t.tag}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6 rounded-2xl border border-gray-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 p-5"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#3b82f6] sm:w-56 flex-shrink-0">
                  {t.tag}
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-3xl bg-gradient-to-r from-[#3b82f6] to-[#bc13fe] p-10 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-3">
            Request the Automotive Evaluation Kit
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8 text-sm">
            Sample fabrics, Technical Data Sheets, and dedicated hardware integration engineering support
            for qualified OEM and Tier-1 advanced development teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-black text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:scale-105 duration-300"
            >
              Request Sample Fabrics &amp; TDS
            </Link>
            <Link
              to="/contact"
              className="bg-white text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full hover:scale-105 duration-300"
            >
              Schedule a Technical JDA
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Automotive;
