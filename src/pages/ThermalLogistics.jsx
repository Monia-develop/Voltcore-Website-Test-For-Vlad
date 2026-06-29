import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight, FaChevronDown, FaCheckCircle,
  FaHourglassHalf, FaFire, FaBolt, FaChartBar,
  FaHandPointer, FaSun, FaMoon, FaPlay, FaPause, FaVolumeMute, FaVolumeUp
} from "react-icons/fa";

// Visual assets
import image29_2 from "../assets/website/industries/image29.jpeg";
import image30_2 from "../assets/website/industries/image30.png";
import videoDelivery from "../assets/website/Enhancer-UltraHD_60fps.mp4";

/* ─── DATA ──────────────────────────────────────────────────────────────────── */
const COMPARISONS = [
  {
    criterion: "Structural Weight",
    legacy: "Heavy rigid elements (+1.5kg to 3kg) reducing vehicle range.",
    voltcore: "Ultra-light design. 30–60g/km filament, 120–250g/m² fabrics (+150g to 250g max).",
  },
  {
    criterion: "Thermal Homogeneity",
    legacy: "Extreme cold zones & localized hot spots risking food damage.",
    voltcore: "Perfect uniform radiant heat. Max deviation within 3–4°C across all faces.",
  },
  {
    criterion: "Energy & Speed",
    legacy: "Standard copper wires with high consumption and slow heat-up.",
    voltcore: "40%–70% faster heating than copper. Up to 2x less energy consumed.",
  },
  {
    criterion: "Sustainability",
    legacy: "Non-recyclable multi-material heating grids.",
    voltcore: "100% mono-material for easy end-of-life recycling. 50–75% lower CO2 footprint.",
  }
];

const BAG_HOTSPOTS = [
  { id: 1, top: "22%", left: "50%", title: "Top Active Membrane", desc: "Upper CNT heating layer countering convective heat loss during opening cycles. Maintains strict food hygiene standards." },
  { id: 2, top: "55%", left: "25%", title: "Side-Wall Matrix", desc: "Ultra-thin continuous heating panels perfectly matching the bag's flexible structure without adding structural rigidity." },
  { id: 3, top: "85%", left: "50%", title: "Radiant Core Base", desc: "Bottom conductive filament element delivering rapid, homogeneous heat to eliminate soggy food boxes." },
  { id: 4, top: "65%", left: "75%", title: "Multi-Power Socket", desc: "Smart adaptive hardware connection compatible with 12V Car cigarette lighters, 36V E-Bike power lines, or separate external battery packs." },
];

const STATS = [
  { value: "20%", label: "Customers consistently irritated by cold food", color: "#F07E26" },
  { value: "15%", label: "Customers who would order more if food arrived hot", color: "#94C356" },
  { value: "≥63°C", label: "EU / UK Hot Holding Legal Requirement", color: "#D9FE42" },
  { value: "3h+", label: "Permanent Active Thermal Heat Retention", color: "#83D0F5" },
];

const CASE_STUDIES = [
  {
    id: "platform-asia",
    tabLabel: "01. Food Platform (Asia)",
    title: "IoT Connected Integration for Top Asian Platform",
    problem: "Food arriving cold was identified as the #1 platform complaint, increasing customer churn and refunds.",
    solution: "Developed a custom lightweight heating solution integrated directly with the client's existing IoT digital frameworks and hardware.",
    metrics: "Maintained a stable internal matrix baseline of 60°C with absolute minimum power draw. Successful PoC completed.",
    status: "Finalizing Extended Field Tests"
  },
  {
    id: "dominos-zurich",
    tabLabel: "02. Domino's Pizza Pilot",
    title: "Domino's x Voltcore Last-Mile Fleet Validation",
    problem: "High volume of temperature-related complaints in long-route suburban delivery zones.",
    solution: "Blind field test execution over a 20–30 riders deployment in Zurich, upgrading gear without modifying app or IT backends.",
    metrics: "Tracked temperature complaint rates, operational reimbursement drops, and e-bike driving range impact.",
    status: "PoC Scheduled (Jan-Feb Target Window)"
  },
  {
    id: "catering-uk",
    tabLabel: "03. Commercial Catering (UK)",
    title: "Industrialized Rollout for Premium Takeaway Platform",
    problem: "Standard passive insulation failed to protect target culinary payloads during harsh Nordic/UK winter cycles.",
    solution: "Laminated removable and integrated non-removable (+150g) custom heaters tailored inside a premium bag manufacturer's blueprint.",
    metrics: "First commercial batch of 50 active connected units ordered and successfully deployed for field riders.",
    status: "First Commercial Batch Active"
  }
];

/* ─── SCROLL REVEAL ──────────────────────────────────────────────────────────── */
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [v, setV] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: 0.08, rootMargin: "0px 0px -60px 0px" });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0) scale(1)" : "translateY(32px) scale(0.97)", transition: `opacity 0.7s ${delay}ms ease, transform 0.7s ${delay}ms cubic-bezier(0.22,1,0.36,1)`, willChange: "opacity, transform" }}>
      {children}
    </div>
  );
};

/* ─── STAT CARD ──────────────────────────────────────────────────────────────── */
const StatCard = ({ s, idx }) => {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = React.useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border-2 rounded-2xl p-6 shadow-xl transition-all duration-400 cursor-default dark:bg-[#1e1e26] bg-white dark:border-zinc-700/60 border-[#14141B]"
      style={{
        borderTopWidth: 3,
        borderTopColor: s.color,
        transform: visible ? (hovered ? "translateY(-8px)" : "translateY(0)") : "translateY(24px)",
        opacity: visible ? 1 : 0,
        boxShadow: hovered ? `0 20px 50px ${s.color}25` : "0 4px 20px rgba(0,0,0,0.06)",
        transition: `opacity 0.5s ${idx * 100}ms, transform 0.5s ${idx * 100}ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s`,
      }}
    >
      <div className="text-4xl font-black tracking-tight flex items-center justify-center" style={{ color: s.color }}>
        {s.value}
      </div>
      <div className="text-xs font-semibold uppercase tracking-wider mt-2 text-center leading-tight dark:text-zinc-400 text-zinc-600">
        {s.label}
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────────── */
export default function ThermalLogistics() {
  const [activeSpot, setActiveSpot] = useState(BAG_HOTSPOTS[1]);
  const [showActiveView, setShowActiveView] = useState(true);
  const [activeCase, setActiveCase] = useState(CASE_STUDIES[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [scanOffset, setScanOffset] = useState(0);
  const [cursor, setCursor] = useState({ x: -300, y: -300 });

  // Video Controls States
  const videoRef = React.useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // ── Sync dark mode → <html class="dark"> so Tailwind dark: utilities work ──
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    return () => root.classList.remove("dark");
  }, [darkMode]);

  // Scan animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScanOffset((prev) => (prev >= 100 ? 0 : prev + 1.5));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Cursor glow
  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
      setIsVideoMuted(!isVideoMuted);
    }
  };

  return (
    <div className="min-h-screen font-sans antialiased transition-colors duration-500 selection:bg-[#94C356] selection:text-[#14141B] bg-[#F4F4F0] dark:bg-[#14141B] text-[#14141B] dark:text-zinc-100">

      {/* Cursor ambient glow */}
      <div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          width: 500, height: 500,
          left: cursor.x - 250, top: cursor.y - 250,
          background: "radial-gradient(circle, rgba(148,195,86,0.04) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* ── FLOATING DARK MODE TOGGLE ── */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle Dark Mode"
          className="p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.3)] border-2 transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center bg-[#14141B] text-white border-[#14141B] dark:bg-zinc-800 dark:text-yellow-400 dark:border-zinc-700 dark:shadow-[0_0_20px_rgba(217,254,66,0.2)]"
        >
          {darkMode
            ? <FaSun size={22} style={{ animation: "spin 3s linear infinite" }} />
            : <FaMoon size={22} />
          }
        </button>
      </div>

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden border-b pt-24 px-4 md:px-8 transition-colors duration-500 bg-gradient-to-b from-white to-[#E8E7E0] dark:from-[#101015] dark:to-[#14141B] border-[#E8E7E0] dark:border-zinc-800">
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#14141B_1px,transparent_1px),linear-gradient(to_bottom,#14141B_1px,transparent_1px)] bg-[size:40px_40px] dark:invert dark:opacity-[0.02]" />

        {/* Dark mode ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#94C356]/10 blur-[120px] rounded-full pointer-events-none opacity-0 dark:opacity-100 transition-opacity duration-700" style={{ animation: "pulse 4s ease-in-out infinite" }} />

        <div className="relative max-w-5xl w-full text-center space-y-8 z-10">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider shadow-sm border transition-all bg-white text-[#14141B] border-zinc-300 dark:bg-zinc-900/80 dark:text-zinc-300 dark:border-zinc-800">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D9FE42]" style={{ animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
              Voltcore Deep-Tech Heat Solutions
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tight leading-[0.9] transition-transform duration-300 hover:scale-[1.01]">
              Active Heating <br /> Replaces{" "}
              <span className="text-[#94C356] relative inline-block">
                Passive
                <span className="absolute bottom-1 left-0 w-full h-2 bg-[#94C356]/30 -skew-x-12" />
              </span>{" "}
              Failure.
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="max-w-3xl mx-auto text-base md:text-xl font-normal leading-relaxed text-zinc-600 dark:text-zinc-400">
              Patented Carbon Nanotubes (CNT) technology from Luxembourg. We eliminate food delivery refunds, poor ratings, and customer churn by replacing obsolete rigid heaters with ultra-thin, flexible textile membranes.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/contact"
                className="w-full sm:w-auto bg-[#14141B] text-white font-bold text-xs uppercase tracking-widest px-8 py-5 rounded-xl hover:shadow-[0_0_25px_rgba(148,195,86,0.4)] hover:opacity-95 transition-all duration-300 text-center shadow-lg hover:bg-[#94C356] hover:text-[#14141B] dark:bg-[#94C356] dark:text-[#14141B] dark:hover:bg-[#D9FE42]"
              >
                Evaluate Fleet Technology
              </Link>
              <a
                href="#interactive-matrix"
                className="w-full sm:w-auto font-bold text-xs uppercase tracking-widest px-8 py-5 rounded-xl border-2 transition-all duration-300 text-center bg-white border-[#14141B] text-[#14141B] hover:bg-zinc-900 hover:text-white dark:bg-zinc-900 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800 dark:hover:border-zinc-500"
              >
                Analyze Live Matrix
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── METRICS CHIPS ── */}
      <section className="relative z-20 -mt-12 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, idx) => (
            <StatCard key={idx} s={s} idx={idx} />
          ))}
        </div>
      </section>

      {/* ── INTERACTIVE MATRIX SIMULATOR ── */}
      <section id="interactive-matrix" className="pt-24 pb-12 max-w-6xl mx-auto px-4">
        <Reveal className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#94C356] block mb-2">// HARDWARE LIVE SIMULATION</span>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            CNT Polymer Structural Integration
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-2 p-6 md:p-10 rounded-3xl shadow-2xl transition-colors duration-500 bg-white border-[#14141B] dark:bg-[#181822] dark:border-zinc-800">

          {/* Left: Image + Hotspots */}
          <div className="lg:col-span-6 flex flex-col items-center w-full">
            <div className="flex p-1.5 rounded-xl mb-6 border transition-colors bg-[#F4F4F0] border-zinc-300 dark:bg-zinc-900 dark:border-zinc-700">
              <button
                onClick={() => setShowActiveView(false)}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  !showActiveView
                    ? "bg-[#14141B] text-white shadow-md dark:bg-zinc-700"
                    : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                Passive State (Off)
              </button>
              <button
                onClick={() => setShowActiveView(true)}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  showActiveView ? "bg-[#94C356] text-[#14141B] shadow-md font-black" : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                }`}
              >
                <FaFire className={showActiveView ? "text-orange-600" : ""} style={showActiveView ? { animation: "bounce 1s infinite" } : {}} />
                Active Matrix (On)
              </button>
            </div>

            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border-2 border-[#14141B] dark:border-zinc-700 shadow-2xl group transition-all">
              <img
                src={showActiveView ? image29_2 : image30_2}
                alt="Voltcore Custom Bag Engineering Matrix"
                className="w-full h-full object-cover transition-all duration-500 brightness-95 group-hover:scale-105"
              />

              {showActiveView && (
                <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-90 z-10">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#94C356]/10 via-orange-500/5 to-transparent" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                  <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#94C356_1px,transparent_1px),linear-gradient(to_bottom,#94C356_1px,transparent_1px)] bg-[size:16px_16px]" />
                  <div
                    style={{ top: `${scanOffset}%` }}
                    className="absolute left-0 w-full h-1 bg-[#D9FE42] shadow-[0_0_20px_#94C356,0_0_10px_#94C356] opacity-90 transition-all duration-100"
                  />
                </div>
              )}

              {BAG_HOTSPOTS.map((spot) => (
                <button
                  key={spot.id}
                  onClick={() => setActiveSpot(spot)}
                  style={{ top: spot.top, left: spot.left }}
                  className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-300 z-30 transform hover:scale-125 ${
                    activeSpot.id === spot.id
                      ? "bg-[#D9FE42] text-[#14141B] border-2 border-[#14141B] shadow-[0_0_25px_rgba(217,254,66,1)] font-black"
                      : "bg-[#14141B] text-white hover:bg-[#94C356] hover:text-[#14141B] border border-zinc-600"
                  }`}
                >
                  <FaHandPointer size={13} className={activeSpot.id === spot.id ? "" : "opacity-80"} style={activeSpot.id === spot.id ? { animation: "pulse 1s infinite" } : {}} />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Analysis */}
          <div className="lg:col-span-6 space-y-6 w-full">
            <div className="bg-[#14141B] dark:bg-zinc-950 text-white rounded-2xl p-6 border-2 border-zinc-800 shadow-2xl transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#94C356]/5 blur-xl rounded-full" />
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#94C356]" style={{ animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
                <h3 className="text-xs font-mono uppercase text-[#D9FE42] tracking-widest font-black">
                  Terminal Active Node: {activeSpot.title}
                </h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light transition-all duration-300">
                {activeSpot.desc}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">// CONTINUOUS MATERIAL COMPARISON</h4>
              <div className="divide-y border-t border-b divide-zinc-300 border-zinc-300 dark:divide-zinc-800 dark:border-zinc-800">
                {COMPARISONS.map((item, idx) => (
                  <div key={idx} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-2 items-center hover:bg-zinc-500/5 px-2 rounded-lg transition-all">
                    <div className="md:col-span-4 font-black text-xs uppercase tracking-tight flex items-center gap-1">
                      <FaBolt className="text-[#94C356]" size={11} />
                      {item.criterion}
                    </div>
                    <div className="md:col-span-8 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                      {item.voltcore}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO SHOWCASE ── */}
      <section className="py-12 max-w-6xl mx-auto px-4">
        <div className="border-2 p-6 md:p-8 rounded-3xl transition-all duration-500 shadow-2xl bg-white border-[#14141B] dark:bg-[#181822] dark:border-zinc-800 dark:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <Reveal>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#94C356] block mb-1 font-mono">// REAL-TIME INFRASTRUCTURE MONITORING</span>
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight">Fleet Operations & Durability Cycle</h3>
              </div>
            </Reveal>
            <div className="flex items-center gap-2 bg-[#14141B] dark:bg-zinc-900 p-2 rounded-xl text-white border border-zinc-800 self-start md:self-center">
              <button
                onClick={togglePlay}
                className="p-2.5 rounded-lg bg-zinc-800 hover:bg-[#94C356] hover:text-[#14141B] transition-all text-xs flex items-center gap-1.5 font-bold uppercase tracking-wider"
              >
                {isVideoPlaying ? <><FaPause /> Pause</> : <><FaPlay /> Play</>}
              </button>
              <button
                onClick={toggleMute}
                className="p-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 transition-all text-xs"
                title={isVideoMuted ? "Unmute" : "Mute"}
              >
                {isVideoMuted ? <FaVolumeMute className="text-red-400" /> : <FaVolumeUp className="text-[#94C356]" />}
              </button>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-zinc-800 bg-black aspect-video w-full max-w-5xl mx-auto group shadow-2xl">
            <video
              ref={videoRef}
              src={videoDelivery}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              controls={true}
              autoPlay
              loop
              muted={isVideoMuted}
              playsInline
            />
            <div className="absolute inset-0 border border-white/5 rounded-2xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* ── PROVEN USE CASES ── */}
      <section className="py-24 border-t border-b transition-colors duration-500 px-4 bg-white border-[#E8E7E0] dark:bg-[#111118] dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#94C356] block mb-2">// TRACKING RECORD</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Proven Use Cases & Field PoC
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Tabs */}
            <div className="lg:col-span-4 flex flex-col gap-3 justify-start">
              {CASE_STUDIES.map((cs, i) => (
                <Reveal key={cs.id} delay={i * 80}>
                  <button
                    onClick={() => setActiveCase(cs)}
                    className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 flex items-center justify-between transform ${
                      activeCase.id === cs.id
                        ? "bg-[#14141B] text-white border-[#14141B] shadow-xl translate-x-2 font-bold dark:bg-zinc-800 dark:border-zinc-700"
                        : "bg-[#F4F4F0] text-zinc-700 border-[#E8E7E0] hover:bg-zinc-800/10 dark:bg-zinc-900 dark:text-zinc-400 dark:border-zinc-800 dark:hover:bg-zinc-800/40"
                    }`}
                  >
                    <span className="text-xs uppercase tracking-wider">{cs.tabLabel}</span>
                    <FaChevronDown
                      className={`transform transition-transform duration-300 ${activeCase.id === cs.id ? "-rotate-90 text-[#94C356]" : "opacity-40"}`}
                      size={12}
                    />
                  </button>
                </Reveal>
              ))}
            </div>

            {/* Tab Panel */}
            <Reveal delay={100} className="lg:col-span-8">
              <div className="rounded-2xl border-2 p-6 md:p-8 space-y-6 flex flex-col justify-between transition-colors duration-500 h-full bg-[#F4F4F0] border-[#14141B] dark:bg-[#181822] dark:border-zinc-700">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 bg-[#94C356]/10 text-[#94C356] border border-[#94C356]/30 px-3 py-1 rounded-md text-xs font-mono font-bold" style={{ animation: "pulse 2s infinite" }}>
                    <FaChartBar size={12} /> {activeCase.status}
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    {activeCase.title}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="p-4 rounded-xl border transition-colors bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-orange-400 block mb-1 font-mono">// Identified Loss Point</span>
                      <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-300">{activeCase.problem}</p>
                    </div>
                    <div className="p-4 rounded-xl border transition-colors bg-white border-zinc-300 dark:bg-zinc-900 dark:border-zinc-800">
                      <span className="text-[10px] uppercase font-bold text-[#94C356] block mb-1 font-mono">// Voltcore Action</span>
                      <p className="text-xs font-semibold leading-relaxed">{activeCase.solution}</p>
                    </div>
                  </div>
                </div>

                <div className="border-2 p-5 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors bg-white border-[#14141B] dark:bg-zinc-950 dark:border-zinc-800 dark:text-white">
                  <div>
                    <span className="text-[10px] uppercase font-black tracking-wider text-zinc-400 block font-mono">Validated Metric Outcome</span>
                    <p className="text-sm font-bold text-[#94C356] mt-0.5">{activeCase.metrics}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="container mx-auto max-w-6xl py-24 px-4">
        <Reveal>
          <div className="relative overflow-hidden bg-[#14141B] dark:bg-zinc-950 rounded-3xl p-12 md:p-16 text-center border-2 border-[#14141B] dark:border-zinc-800 shadow-2xl">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-[#94C356] to-transparent opacity-50" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#94C356] block mb-3">// DATA SHEET REQUEST KITS</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6 max-w-2xl mx-auto leading-none">
              Ready to upgrade your logistic payload matrices?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#94C356] text-[#14141B] font-black text-xs uppercase tracking-widest px-8 py-5 rounded-xl hover:bg-[#D9FE42] hover:shadow-[0_0_30px_rgba(218,254,66,0.4)] transition-all duration-300"
              >
                Request Technical TDS Samples <FaArrowRight size={10} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
