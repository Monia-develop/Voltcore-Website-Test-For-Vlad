import React, { useState, useEffect, useRef, useCallback } from "react";

/* ─── useInView ───────────────────────────────────────────────────────────
   IntersectionObserver hook — returns [ref, inView]. Fires once. */
export const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.15, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ─── Reveal ──────────────────────────────────────────────────────────────
   Fade/slide element in when scrolled into view. */
export const Reveal = ({
  children, delay = 0, y = 30, x = 0, scale = 1, className = "", style = {}, as: Tag = "div",
}) => {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView
          ? "translate(0,0) scale(1)"
          : `translate(${x}px, ${y}px) scale(${scale})`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </Tag>
  );
};

/* ─── CountUp ──────────────────────────────────────────────────────────────
   Animated number counter — starts when visible, eases to target. */
export const CountUp = ({
  end, duration = 1800, prefix = "", suffix = "", decimals = 0, className = "", style = {},
}) => {
  const [ref, inView] = useInView();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(end * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}{val.toFixed(decimals)}{suffix}
    </span>
  );
};

/* ─── ScrollProgress ───────────────────────────────────────────────────────
   Fixed top bar showing scroll progress through the page. */
export const ScrollProgress = ({ color = "#F07E26" }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight);
      setProgress(Math.min(scrolled, 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        className="h-full origin-left transition-transform duration-75 ease-out"
        style={{ transform: `scaleX(${progress})`, background: color }}
      />
    </div>
  );
};

/* ─── CursorGlow ───────────────────────────────────────────────────────────
   Soft radial glow that follows the cursor — adds atmosphere to dark sections. */
export const CursorGlow = ({ color = "#F07E26" }) => {
  const ref = useRef(null);
  useEffect(() => {
    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
        }
      });
    };
    window.addEventListener("mousemove", move);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div
      ref={ref}
      className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none z-[5] hidden md:block"
      style={{
        background: `radial-gradient(circle, ${color}10 0%, transparent 60%)`,
        mixBlendMode: "screen",
      }}
    />
  );
};

/* ─── MagneticButton ───────────────────────────────────────────────────────
   Wraps children in a span that subtly pulls toward the cursor on hover.
   Drop it inside any <Link>/<button>/<a> to add the magnetic effect. */
export const MagneticButton = ({ children, className = "", style = {}, pull = 18 }) => {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x / rect.width * pull}px, ${y / rect.height * pull}px)`;
  }, [pull]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);
  return (
    <span
      ref={ref}
      className={`inline-block transition-transform duration-200 ease-out ${className}`}
      style={style}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </span>
  );
};

/* ─── TiltCard ─────────────────────────────────────────────────────────────
   Card that tilts in 3D toward the cursor. */
export const TiltCard = ({ children, className = "", style = {}, max = 8 }) => {
  const ref = useRef(null);
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateY(-4px)`;
  }, [max]);
  const handleLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateY(0) rotateX(0)";
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{ transformStyle: "preserve-3d", transition: "transform 0.25s ease-out", ...style }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
};
