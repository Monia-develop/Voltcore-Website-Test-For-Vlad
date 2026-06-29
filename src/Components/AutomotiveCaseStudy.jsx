import React, { useEffect, useRef, useState } from "react";
import {
  FaBolt, FaClock, FaThermometerHalf, FaLayerGroup,
  FaWeightHanging, FaRecycle, FaChevronDown, FaPlay,
  FaHandPointer, FaCarSide, FaTabletAlt, FaPause,
} from "react-icons/fa";
import videoSeats   from "../assets/website/anim1-2.mp4";
import videoSurface from "../assets/website/Anim2Automotive.mp4";

/* ── Stat chip ─────────────────────────────────────────────────── */
const Stat = ({ value, label, accent = true }) => (
  <div className="rounded-2xl bg-[#1a1a22] border border-[#2a2a3a] px-5 py-4 text-center flex-1 min-w-[140px]">
    <div className={`text-2xl md:text-3xl font-black tracking-tight ${accent ? "text-[#94C356]" : "text-white"}`}>{value}</div>
    <div className="text-[11px] text-[#B8B7A4]/50 mt-1 leading-tight">{label}</div>
  </div>
);

/* ── VideoPanel — avec label explicatif ─────────────────────────── */
const VideoPanel = ({ src, label, badge, isLegacy }) => {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [loaded, setLoaded] = useState(false);
  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };
  return (
    <div>
      {/* Label au-dessus de la vidéo */}
      <div className={`rounded-t-xl px-4 py-2.5 border-t border-l border-r flex items-center gap-2 ${
        isLegacy
          ? "bg-[#1a1a22] border-[#2a2a3a]"
          : "bg-[#94C356]/10 border-[#94C356]/30"
      }`}>
        <span className={`text-[9px] font-black uppercase tracking-widest ${isLegacy ? "text-[#B8B7A4]/40" : "text-[#94C356]"}`}>
          {isLegacy ? "❌ Legacy copper system" : "✦ Voltcore — second skin"}
        </span>
        <span className={`text-[10px] ml-auto ${isLegacy ? "text-[#B8B7A4]/30" : "text-[#94C356]/70"}`}>
          {isLegacy ? "Caméra thermique — chaleur inégale" : "Caméra thermique — distribution homogène"}
        </span>
      </div>
      <div
        className={`relative rounded-b-2xl overflow-hidden bg-zinc-950 aspect-video group cursor-pointer mb-1 border-b border-l border-r ${
          isLegacy ? "border-[#2a2a3a]" : "border-[#94C356]/30"
        }`}
        onClick={toggle}
      >
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-zinc-950">
            <div className="w-8 h-8 border-2 border-[#94C356]/30 border-t-[#94C356] rounded-full animate-spin" />
          </div>
        )}
        <video
          ref={videoRef} src={src} autoPlay muted loop playsInline
          onCanPlay={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${isLegacy ? "opacity-80" : ""}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        {badge && (
          <div className="absolute top-3 left-3">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
              isLegacy ? "bg-black/70 text-[#B8B7A4]/70" : "bg-[#94C356] text-[#14141B]"
            }`}>{badge}</span>
          </div>
        )}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex flex-wrap gap-2">
            {isLegacy
              ? [["ΔT > 10°C","text-red-400"],["5–13mm","text-white/60"],["< 40% eff.","text-red-400"]]
                  .map(([v,c]) => <span key={v} className={`text-[10px] font-black font-mono ${c}`}>{v}</span>)
              : [["ΔT ≈ 3°C","text-[#94C356]"],["2–3mm","text-[#94C356]"],["85–95% eff.","text-[#94C356]"]]
                  .map(([v,c]) => <span key={v} className={`text-[10px] font-black font-mono ${c}`}>{v}</span>)
            }
          </div>
          <button onClick={(e) => { e.stopPropagation(); toggle(); }}
            className="w-7 h-7 rounded-full bg-black/40 border border-white/20 flex items-center justify-center text-white/60 hover:bg-[#94C356]/30 hover:text-[#94C356] hover:border-[#94C356]/40 transition-all duration-200"
          >
            {playing ? <FaPause size={8} /> : <FaPlay size={8} />}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── RaceChart ──────────────────────────────────────────────────── */
const RaceChart = ({ time, a, b, aLabel, bLabel, unit, colorA = "#71717a", colorB }) => {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef(null);
  const startedRef = useRef(false);

  const play = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setPlaying(true);
    const duration = 2200;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setProgress(p);
      if (p < 1) rafRef.current = requestAnimationFrame(step);
      else setPlaying(false);
    };
    rafRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !startedRef.current) { startedRef.current = true; play(); } },
      { threshold: 0.4 }
    );
    if (wrapRef.current) obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [a, b]);

  useEffect(() => { draw(progress); }, [progress, a, b]);

  function lerp(x, y, f) { return x + (y - x) * f; }
  function valueAt(arr, p) {
    const pos = p * (arr.length - 1);
    const i0 = Math.floor(pos);
    const i1 = Math.min(arr.length - 1, i0 + 1);
    return lerp(arr[i0], arr[i1], pos - i0);
  }

  function draw(p) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    const ctx = canvas.getContext("2d");
    const W = canvas.width, H = canvas.height;
    const pad = { l: 34 * dpr, r: 10 * dpr, t: 12 * dpr, b: 24 * dpr };
    ctx.clearRect(0, 0, W, H);
    const all = [...a, ...b];
    const minV = Math.floor(Math.min(...all) - 2);
    const maxV = Math.ceil(Math.max(...all) + 2);
    const x = (i) => pad.l + ((W - pad.l - pad.r) * i) / (time.length - 1);
    const y = (v) => H - pad.b - ((H - pad.t - pad.b) * (v - minV)) / (maxV - minV);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1 * dpr;
    ctx.font = 10 * dpr + "px IBM Plex Mono, monospace";
    ctx.fillStyle = "rgba(255,255,255,0.35)";
    for (let k = 0; k <= 2; k++) {
      const v = minV + ((maxV - minV) * k) / 2;
      ctx.beginPath(); ctx.moveTo(pad.l, y(v)); ctx.lineTo(W - pad.r, y(v)); ctx.stroke();
      ctx.fillText(Math.round(v) + "°", 2 * dpr, y(v) + 3 * dpr);
    }
    time.forEach((t, i) => { ctx.fillText(t + (i === time.length - 1 ? unit : ""), x(i) - 8 * dpr, H - 6 * dpr); });

    function drawLine(arr, color, glow = false) {
      if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 10 * dpr; }
      ctx.beginPath(); ctx.strokeStyle = color; ctx.lineWidth = (glow ? 3 : 2.2) * dpr;
      ctx.lineJoin = "round"; ctx.lineCap = "round";
      const steps = 160, full = Math.floor(steps * p);
      for (let s = 0; s <= full; s++) {
        const pp = s / steps, v = valueAt(arr, pp);
        const px = pad.l + (W - pad.l - pad.r) * pp, py = y(v);
        if (s === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      ctx.stroke(); ctx.shadowBlur = 0;
      time.forEach((t, i) => {
        const pp = i / (time.length - 1);
        if (pp <= p + 0.001) {
          ctx.beginPath(); ctx.fillStyle = color;
          if (glow) { ctx.shadowColor = color; ctx.shadowBlur = 6 * dpr; }
          ctx.arc(x(i), y(arr[i]), (glow ? 4.5 : 3) * dpr, 0, Math.PI * 2); ctx.fill();
          ctx.shadowBlur = 0;
        }
      });
    }
    drawLine(a, colorA);
    drawLine(b, colorB, true);
  }

  return (
    <div ref={wrapRef} className="rounded-2xl bg-[#111118] border border-[#2a2a3a] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: colorA }}>
            <span className="w-3 h-0.5 inline-block rounded-full" style={{ background: colorA }} /> {aLabel}
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: colorB }}>
            <span className="w-3 h-0.5 inline-block rounded-full" style={{ background: colorB }} /> {bLabel}
          </span>
        </div>
        <button onClick={() => { startedRef.current = false; setProgress(0); setTimeout(play, 50); }}
          className="text-[10px] font-bold uppercase tracking-wider text-[#B8B7A4]/40 hover:text-[#94C356] transition-colors flex items-center gap-1"
        >
          <FaPlay size={8} /> Replay
        </button>
      </div>
      <canvas ref={canvasRef} className="w-full" style={{ height: 160 }} />
    </div>
  );
};

/* ── SeatsTab ────────────────────────────────────────────────────── */
const TIME_WARMUP = [0, 1, 2, 3, 5, 7, 10, 15, 20];
const SeatsTab = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <VideoPanel src={videoSeats}   label="Copper wire — thermal camera"   badge="Thermal Camera" isLegacy={true} />
      <VideoPanel src={videoSurface} label="Voltcore — thermal camera"       badge="Thermal Camera" isLegacy={false} />
    </div>
    <div className="mb-6 rounded-xl bg-[#1a1a22] border border-[#2a2a3a] px-4 py-3 text-[12px] text-[#B8B7A4]/60 leading-relaxed">
      <span className="text-[#94C356] font-bold">Comment lire ces vidéos :</span> les zones claires = chaleur élevée, les zones sombres = froid. À gauche le cuivre crée des bandes chaudes et froides irrégulières. À droite Voltcore couvre toute la surface de façon homogène.
    </div>
    <RaceChart
      time={TIME_WARMUP} unit="min"
      a={[20, 21, 22, 24, 27, 30, 32, 33, 34]}
      b={[20, 25, 30, 33, 35, 36, 36.5, 37, 37]}
      aLabel="Legacy copper" bLabel="Voltcore™"
      colorA="#71717a" colorB="#94C356"
    />
    <div className="flex flex-wrap gap-3 mt-4">
      {[["< 40%","Efficiency (copper)","text-zinc-400"],["85–95%","Efficiency (Voltcore)","text-[#94C356]"],["ΔT > 10°C","Thermal variance (copper)","text-red-400"],["ΔT ≈ 3°C","Thermal variance (Voltcore)","text-[#94C356]"]].map(([v,l,c]) => (
        <div key={v} className="rounded-xl bg-[#1a1a22] border border-[#2a2a3a] px-4 py-3 flex-1 min-w-[130px]">
          <div className={`text-xl font-black tracking-tight ${c}`}>{v}</div>
          <div className="text-[10px] text-[#B8B7A4]/40 mt-0.5">{l}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ── SurfaceTab ─────────────────────────────────────────────────── */
const SURFACE_APPS = [
  { icon: FaCarSide,    zone: "Door Panels",       title: "Laminated beneath A-surface", desc: "Applied directly under trim material — no additional structure required." },
  { icon: FaTabletAlt,  zone: "Glovebox",          title: "Over-molded integration",     desc: "Heat distributed across the full panel face at consistent temperature." },
  { icon: FaLayerGroup, zone: "Center Console",    title: "Compression-molded insert",   desc: "Fits existing hard plastic components, heating on-demand." },
];
const SurfaceTab = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <VideoPanel src={videoSeats}   label="Laminated surface — copper"          badge="Thermal Camera" isLegacy={true} />
      <VideoPanel src={videoSurface} label="Laminated surface — Voltcore"        badge="Thermal Camera" isLegacy={false} />
    </div>
    <div className="mb-6 rounded-xl bg-[#1a1a22] border border-[#2a2a3a] px-4 py-3 text-[12px] text-[#B8B7A4]/60 leading-relaxed">
      <span className="text-[#94C356] font-bold">Surface laminée :</span> le tissu Voltcore est intégré directement sous l'A-surface (cuir, tissu, plastique) par lamination haute pression. Aucun espaceur mousse requis.
    </div>
    <span className="text-[11px] font-bold uppercase tracking-wide text-[#B8B7A4]/40 block mb-3">Applications</span>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SURFACE_APPS.map((a) => {
        const Icon = a.icon;
        return (
          <div key={a.zone} className="rounded-2xl bg-[#1a1a22] border border-[#2a2a3a] p-5 hover:border-[#94C356]/30 transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-[#94C356] mb-4"><Icon size={14} /></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F07E26] block mb-1">{a.zone}</span>
            <h4 className="text-sm font-bold text-white mb-2">{a.title}</h4>
            <p className="text-xs text-[#B8B7A4]/50 leading-relaxed">{a.desc}</p>
          </div>
        );
      })}
    </div>
  </div>
);

/* ── MoldingTab ─────────────────────────────────────────────────── */
const MoldingTab = () => (
  <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <VideoPanel src={videoSeats}   label="Injection molding — copper insert" badge="Thermal Camera" isLegacy={true} />
      <VideoPanel src={videoSurface} label="Injection molding — Voltcore"      badge="Thermal Camera" isLegacy={false} />
    </div>
    <div className="mb-6 rounded-xl bg-[#1a1a22] border border-[#2a2a3a] px-4 py-3 text-[12px] text-[#B8B7A4]/60 leading-relaxed">
      <span className="text-[#94C356] font-bold">Injection molding :</span> le filament ActiveFil™ est extrudé directement dans la matière plastique pendant le moulage. Aucun assemblage secondaire — la chaleur est native au composant.
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { title:"SensiTerm Active Seats", desc:"Deployed directly within the seat upholstery matrix for simultaneous high-velocity heating and intrinsic occupancy/posture sensing without standalone sensor mats." },
        { title:"TargetHeat Complex Trim", desc:"Integrated via high-volume industrial lamination, injection over-molding, or compression molding into curved door cards, center consoles, and dashboard structures." },
      ].map((c) => (
        <div key={c.title} className="rounded-2xl bg-[#1a1a22] border border-[#2a2a3a] p-6 hover:border-[#94C356]/30 transition-all duration-300">
          <h4 className="text-sm font-bold text-white mb-2">{c.title}</h4>
          <p className="text-xs text-[#B8B7A4]/50 leading-relaxed">{c.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ── SensingTab ─────────────────────────────────────────────────── */
const SENSING_APPS = [
  { icon: FaCarSide,    zone: "Seat Surface",       title: "Occupancy & posture detection", desc: "No standalone sensor mat required — the heating layer doubles as the sensing layer." },
  { icon: FaTabletAlt,  zone: "Steering Wheel",     title: "Grip & presence sensing",       desc: "Detects hand contact and adjusts heat zones in real time." },
  { icon: FaHandPointer, zone: "Armrest & Central Panel", title: "Comfort heating + hand detection", desc: "Plus hidden controls — handrests, central console, cupholders, storage lids activating heat only when needed." },
];
const SensingTab = () => (
  <div>
    <div className="rounded-2xl bg-[#1a1a22] border border-[#2a2a3a] p-5 mb-6">
      <span className="text-[11px] font-bold uppercase tracking-wide text-[#94C356] block mb-2">2-in-1 : sensing + heating</span>
      <p className="text-sm text-[#B8B7A4]/70 leading-relaxed">Heating fabric with a built-in sensing feature, covered with the leather A-layer — using one layer ensures reduced complexity, with fewer wires and less weight.</p>
    </div>
    <span className="text-[11px] font-bold uppercase tracking-wide text-[#B8B7A4]/40 block mb-3">Potential applications</span>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {SENSING_APPS.map((a) => {
        const Icon = a.icon;
        return (
          <div key={a.zone} className="rounded-2xl bg-[#1a1a22] border border-[#2a2a3a] p-5 hover:border-[#94C356]/30 transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-9 h-9 rounded-xl bg-zinc-950 flex items-center justify-center text-[#94C356] mb-4"><Icon size={14} /></div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F07E26] block mb-1">{a.zone}</span>
            <h4 className="text-sm font-bold text-white mb-2">{a.title}</h4>
            <p className="text-xs text-[#B8B7A4]/50 leading-relaxed">{a.desc}</p>
          </div>
        );
      })}
    </div>
  </div>
);

/* ── Overview ───────────────────────────────────────────────────── */
const OVERVIEW_ROWS = [
  { id: "efficiency",  icon: FaBolt,            label: "Thermal Efficiency",       legacyLabel: "< 40%",     voltcoreLabel: "85–95%",        legacyValue: 35,  voltcoreValue: 90,  caption: "Higher is better", impact: "Reduces total thermal energy consumption by up to 2×, directly extending vehicle range." },
  { id: "warmup",      icon: FaClock,           label: "Warm-Up Velocity",         legacyLabel: "Baseline",  voltcoreLabel: "40–70% faster", legacyValue: 100, voltcoreValue: 45,  caption: "Shorter is better", impact: "Reaches target passenger comfort zones significantly quicker from a cold start." },
  { id: "homogeneity", icon: FaThermometerHalf, label: "Thermal Homogeneity (ΔT)", legacyLabel: "> 10°C",   voltcoreLabel: "≈ 3–4°C",       legacyValue: 12,  voltcoreValue: 3.5, caption: "Shorter is better", impact: "Complements premium brand standards by completely eliminating cold spots." },
  { id: "envelope",    icon: FaLayerGroup,      label: "Integration Envelope",     legacyLabel: "5–13 mm",  voltcoreLabel: "2–3 mm",        legacyValue: 9,   voltcoreValue: 2.5, caption: "Shorter is better", impact: "Eliminates massive foam spacer layers; allows immediate placement beneath delicate A-surfaces." },
];
const OVERVIEW_QUAL = [
  { id: "weight",      icon: FaWeightHanging, label: "Linear Weight Profile",   legacy: "Heavy metallic wiring",    voltcore: "Ultra-lightweight — 30–60 g/km of filament", impact: "Supports aggressive vehicle lightweighting and lower structural mass targets." },
  { id: "circularity", icon: FaRecycle,       label: "End-of-Life Circularity", legacy: "Non-recyclable composite", voltcore: "100% polymer mono-material matrix",           impact: "Enables straightforward mechanical recycling, matching strict environmental mandates." },
];

const OverviewRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  const max = Math.max(row.legacyValue, row.voltcoreValue);
  const Icon = row.icon;
  return (
    <div ref={ref} className="border-b border-[#2a2a3a] last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 py-5 text-left">
        <div className="w-9 h-9 rounded-xl bg-[#1a1a22] flex items-center justify-center text-[#94C356] flex-shrink-0"><Icon size={14} /></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-sm font-bold text-white">{row.label}</span>
            <span className="text-[11px] text-[#B8B7A4]/30">{row.caption}</span>
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-[11px] w-16 flex-shrink-0 text-[#B8B7A4]/40 font-semibold">Legacy</span>
              <div className="flex-1 h-2 rounded-full bg-[#2a2a3a] overflow-hidden">
                <div className="h-full rounded-full bg-[#3a3a4a] transition-all duration-1000 ease-out" style={{ width: visible ? `${(row.legacyValue / max) * 100}%` : "0%" }} />
              </div>
              <span className="text-[11px] w-24 text-right text-[#B8B7A4]/40 font-mono flex-shrink-0">{row.legacyLabel}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[11px] w-16 flex-shrink-0 text-[#94C356] font-semibold">Voltcore</span>
              <div className="flex-1 h-2 rounded-full bg-[#2a2a3a] overflow-hidden">
                <div className="h-full rounded-full bg-[#94C356] transition-all duration-1000 ease-out delay-150 shadow-[0_0_8px_rgba(148,195,86,0.5)]" style={{ width: visible ? `${(row.voltcoreValue / max) * 100}%` : "0%" }} />
              </div>
              <span className="text-[11px] w-24 text-right text-[#94C356] font-mono font-semibold flex-shrink-0">{row.voltcoreLabel}</span>
            </div>
          </div>
        </div>
        <FaChevronDown size={12} className={`text-[#B8B7A4]/30 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-24 pb-5" : "max-h-0"}`}>
        <p className="text-xs text-[#B8B7A4]/50 leading-relaxed pl-[52px]">{row.impact}</p>
      </div>
    </div>
  );
};

const OverviewQualRow = ({ row }) => {
  const [open, setOpen] = useState(false);
  const Icon = row.icon;
  return (
    <div className="border-b border-[#2a2a3a] last:border-b-0">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 py-5 text-left">
        <div className="w-9 h-9 rounded-xl bg-[#1a1a22] flex items-center justify-center text-[#94C356] flex-shrink-0"><Icon size={14} /></div>
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="text-sm font-bold text-white block mb-1">{row.label}</span>
            <span className="text-[11px] text-[#B8B7A4]/40">{row.legacy}</span>
          </div>
          <div className="sm:text-right"><span className="text-xs font-semibold text-[#94C356]">{row.voltcore}</span></div>
        </div>
        <FaChevronDown size={12} className={`text-[#B8B7A4]/30 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-24 pb-5" : "max-h-0"}`}>
        <p className="text-xs text-[#B8B7A4]/50 leading-relaxed pl-[52px]">{row.impact}</p>
      </div>
    </div>
  );
};

const OverviewTab = () => (
  <div>
    {OVERVIEW_ROWS.map((r) => <OverviewRow key={r.id} row={r} />)}
    {OVERVIEW_QUAL.map((r) => <OverviewQualRow key={r.id} row={r} />)}
  </div>
);

/* ── Main tabbed component ──────────────────────────────────────── */
const TABS = [
  { id: "overview", label: "Platform Overview",      render: OverviewTab },
  { id: "seats",    label: "01 — Seats",             render: SeatsTab },
  { id: "surface",  label: "02 — Laminated Surface", render: SurfaceTab },
  { id: "molding",  label: "03 — Injection Molding", render: MoldingTab },
  { id: "sensing",  label: "04 — Sensing & Touch",   render: SensingTab },
];

const AutomotiveCaseStudies = () => {
  const [active, setActive] = useState("overview");
  const ActiveComponent = TABS.find((t) => t.id === active).render;
  return (
    <div className="rounded-3xl bg-[#111118] border border-[#2a2a3a] p-6 md:p-8">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#94C356]">Head-to-Head Evaluation</span>
        <span className="text-[11px] text-[#B8B7A4]/30 font-mono">Voltcore vs. legacy &amp; serial solutions</span>
      </div>
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 -mx-1 px-1">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setActive(t.id)}
            className={`flex-shrink-0 text-xs font-bold uppercase tracking-wide px-4 py-2.5 rounded-full border transition-all duration-200 ${
              active === t.id
                ? "border-[#94C356] text-[#14141B] bg-[#94C356]"
                : "border-[#2a2a3a] text-[#B8B7A4]/40 hover:text-[#B8B7A4] hover:border-[#3a3a4a]"
            }`}
          >{t.label}</button>
        ))}
      </div>
      <ActiveComponent />
    </div>
  );
};

export default AutomotiveCaseStudies;
