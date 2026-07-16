import React, { useState, useEffect, useRef } from "react";
import Logo from "../../assets/logo.png";
import DarkMode from "./DarkMode";
import { Link, useLocation } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

/* ─── MAIN NAV LINKS ──────────────────────────────────────────────────────── */
const NAV_LINKS = [
  { id: 1, name: "Home",           link: "/"           },
  { id: 2, name: "About Voltcore", link: "/about"      },
  { id: 3, name: "Technology",     link: "/technology" },
  { id: 4, name: "Industries",     link: "/industries" },
  { id: 5, name: "Products",       link: "/products"   },
];

/* ─── SECTION ANCHORS PER PAGE ────────────────────────────────────────────── */
const PAGE_SECTIONS = {
  "/": [
    { id: "hero",       label: "Top"           },
    { id: "who-we-are", label: "01 Who We Are" },
    { id: "technology", label: "02 Technology" },
    { id: "industries", label: "03 Industries" },
    { id: "news",       label: "04 News"       },
    { id: "leadership", label: "05 Leadership" },
  ],
  "/about": [
    { id: "about-hero",  label: "Top"            },
    { id: "values",      label: "01 Values"      },
    { id: "milestones",  label: "02 Milestones"  },
    { id: "press",       label: "03 Press"       },
    { id: "team",        label: "04 Team"        },
    { id: "location",    label: "05 Location"    },
    { id: "careers",     label: "06 Careers"     },
  ],
  "/technology": [
    { id: "tech-hero",   label: "Top"            },
    { id: "second-skin", label: "01 Second Skin" },
    { id: "schema",      label: "02 Architecture"},
    { id: "platforms",   label: "03 Platforms"   },
    { id: "pillars",     label: "04 Why Voltcore"},
    { id: "poc",         label: "05 Pipeline"    },
  ],
  "/industries": [
    { id: "industries-hero",     label: "Top" },
  ],
  "/products": [
    { id: "products-hero",      label: "Top" },
    { id: "value-chain",        label: "Value Chain" },
    { id: "industry-products",  label: "By Industry" },
    { id: "comparison",         label: "Comparison" },
  ]
};

/* ── INDUSTRY SUB-PAGES — for the Industries dropdown ────────────────────── */
const INDUSTRY_SUBPAGES = [
  { id: "automotive",         label: "Automotive",         route: "/industries/automotive" },
  { id: "food-delivery",      label: "Food & Delivery",    route: "/industries/thermal-logistics" },
  { id: "heated-apparel",     label: "Heated Apparel",     route: "/industries/heated-apparel" },
  { id: "underfloor-heating", label: "Underfloor Heating", route: "/industries/floorheating" },
  { id: "defense",            label: "Defense",            route: "/industries/defense" },
];

/* ─── SCROLL TO SECTION ──────────────────────────────────────────────────── */
const scrollTo = (sectionId) => {
  const el = document.getElementById(sectionId);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ─── NAVBAR ──────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled,      setScrolled]      = useState(false);
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hoveredNav,    setHoveredNav]    = useState(null);
  const location = useLocation();
  const currentSections = PAGE_SECTIONS[location.pathname] ?? [];
  const hasSections = currentSections.length > 0;

  /* scroll → glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* scroll-spy */
  useEffect(() => {
    if (!hasSections) return;
    setActiveSection(currentSections[0]?.id ?? "");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    currentSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname, hasSections]);

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* scroll to section after cross-page navigation */
  useEffect(() => {
    const target = sessionStorage.getItem("scrollTo");
    if (!target) return;
    sessionStorage.removeItem("scrollTo");
    const attempt = (tries = 0) => {
      const el = document.getElementById(target);
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
      if (tries < 10) setTimeout(() => attempt(tries + 1), 120);
    };
    setTimeout(() => attempt(), 200);
  }, [location.pathname]);

  const bg = scrolled
    ? "bg-white/85 dark:bg-[#14141B]/85 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_rgba(255,255,255,0.04)]"
    : "bg-transparent";

  return (
    <>
      {/* ── MAIN NAV BAR ────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-500 ease-out ${bg}`}
      >
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-[68px]">
            {/* LOGO */}
            <Link to="/" onClick={() => location.pathname === "/" && scrollTo("hero")} className="flex items-center gap-3 shrink-0">
              <img
                src={Logo}
                alt="Voltcore"
                className={`h-5 transition-all duration-500 ${scrolled ? "dark:invert" : "invert"}`}
              />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ id, name, link }) => {
                const active = location.pathname === link;
                const linkSections = PAGE_SECTIONS[link] ?? [];
                const hasDropdown = linkSections.length > 0;
                const isCurrentPage = location.pathname === link;
                const isHovered = hoveredNav === id;

                const textClass = scrolled
                  ? active
                    ? "text-[#14141B] dark:text-white"
                    : "text-[#14141B]/60 dark:text-[#B8B7A4]/70 hover:text-[#14141B] dark:hover:text-white"
                  : active
                    ? "text-white"
                    : "text-white/60 hover:text-white";

                return (
                  <div
                    key={id}
                    className="relative flex items-center"
                    onMouseEnter={() => setHoveredNav(id)}
                    onMouseLeave={() => setHoveredNav(null)}
                  >
                    {/* Link */}
                    <Link
                      to={link}
                      onClick={() => isCurrentPage && scrollTo(linkSections[0]?.id)}
                      className={`relative px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition-colors duration-200 ${textClass}`}
                    >
                      {name}
                      {active && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D9FE42]" />
                      )}
                    </Link>

                    {/* Chevron + dropdown */}
                    {hasDropdown && (
                      <div className="relative">
                        <button
                          className={`flex items-center justify-center w-5 h-5 rounded-full transition-all duration-200 -ml-1
                            ${scrolled ? "hover:bg-black/8 dark:hover:bg-white/8" : "hover:bg-white/10"}
                            ${textClass}`}
                          aria-label={`${name} sections`}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 2.5L4 5.5L6.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>

                        {/* Dropdown panel */}
                        <div
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 pointer-events-none transition-all duration-200 ease-out z-50
                            ${isHovered ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-2 pointer-events-none"}`}
                        >
                          {/* Arrow tip */}
                          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45
                            bg-white dark:bg-[#1c1c24] border-l border-t border-black/8 dark:border-white/10" />

                          {/* Panel */}
                          <div className="relative bg-white dark:bg-[#1c1c24] border border-black/8 dark:border-white/10
                            rounded-2xl shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden min-w-[200px]">

                            {/* Industries dropdown — navigates to sub-pages */}
                            {link === "/industries" ? (
                              <>
                                {/* Top link */}
                                <Link
                                  to="/industries"
                                  className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-150 group/item
                                    ${isCurrentPage ? "bg-[#D9FE42]/10 dark:bg-[#D9FE42]/8" : "hover:bg-black/4 dark:hover:bg-white/5"}`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200
                                    ${isCurrentPage
                                      ? "bg-[#D9FE42] shadow-[0_0_6px_rgba(217,254,66,0.8)]"
                                      : "bg-black/15 dark:bg-white/20 group-hover/item:bg-[#D9FE42]/60"}`}
                                  />
                                  <span className={`text-[10px] font-black uppercase tracking-[0.14em] transition-colors duration-150
                                    ${isCurrentPage
                                      ? "text-[#14141B] dark:text-white"
                                      : "text-[#14141B]/60 dark:text-[#B8B7A4]/70 group-hover/item:text-[#14141B] dark:group-hover/item:text-white"}`}>
                                    Overview
                                  </span>
                                </Link>
                                {/* Sub-pages */}
                                {INDUSTRY_SUBPAGES.map((sub, i) => (
                                  <Link
                                    key={sub.id}
                                    to={sub.route}
                                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-150 group/item
                                      ${i !== 0 ? "border-t border-black/5 dark:border-white/5" : ""}
                                      hover:bg-black/4 dark:hover:bg-white/5`}
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-black/15 dark:bg-white/20 group-hover/item:bg-[#D9FE42]/60 transition-all duration-200" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#14141B]/60 dark:text-[#B8B7A4]/70 group-hover/item:text-[#14141B] dark:group-hover/item:text-white transition-colors duration-150">
                                      {sub.label}
                                    </span>
                                  </Link>
                                ))}
                              </>
                            ) : (
                              /* Other pages — scroll to sections */
                              linkSections.filter(s => s.label !== "Top").map(({ id: sid, label }, i) => {
                                const isCurrent = isCurrentPage && activeSection === sid;
                                return (
                                  <Link
                                    key={sid}
                                    to={link}
                                    onClick={(e) => {
                                      if (isCurrentPage) {
                                        e.preventDefault();
                                        scrollTo(sid);
                                      } else {
                                        sessionStorage.setItem("scrollTo", sid);
                                      }
                                    }}
                                    className={`w-full flex items-center gap-3 px-5 py-3 text-left transition-colors duration-150 group/item
                                      ${isCurrent ? "bg-[#D9FE42]/10 dark:bg-[#D9FE42]/8" : "hover:bg-black/4 dark:hover:bg-white/5"}`}
                                  >
                                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200
                                      ${isCurrent
                                        ? "bg-[#D9FE42] shadow-[0_0_6px_rgba(217,254,66,0.8)]"
                                        : "bg-black/15 dark:bg-white/20 group-hover/item:bg-[#D9FE42]/60"}`}
                                    />
                                    <span className={`text-[10px] font-black uppercase tracking-[0.14em] transition-colors duration-150
                                      ${isCurrent
                                        ? "text-[#14141B] dark:text-white"
                                        : "text-[#14141B]/60 dark:text-[#B8B7A4]/70 group-hover/item:text-[#14141B] dark:group-hover/item:text-white"}`}>
                                      {label}
                                    </span>
                                    {isCurrent && (
                                      <span className="ml-auto text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[#D9FE42] text-[#14141B]">
                                        Here
                                      </span>
                                    )}
                                  </Link>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="ml-2"><DarkMode /></div>
            </nav>

            {/* MOBILE CONTROLS */}
            <div className="md:hidden flex items-center gap-3">
              <DarkMode />
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle menu"
                className={`w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-xl transition-colors duration-200
                  ${scrolled ? "hover:bg-black/5 dark:hover:bg-white/5" : "hover:bg-white/10"}`}
              >
                <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center
                  ${mobileOpen ? "w-5 rotate-45 translate-y-[6.5px]" : "w-5"}
                  ${scrolled ? "text-[#14141B] dark:text-white" : "text-white"}`}
                  style={{ background: "currentColor" }}
                />
                <span className={`block h-[1.5px] transition-all duration-300
                  ${mobileOpen ? "w-0 opacity-0" : "w-4"}
                  ${scrolled ? "bg-[#14141B] dark:bg-white" : "bg-white"}`}
                />
                <span className={`block h-[1.5px] bg-current transition-all duration-300 origin-center
                  ${mobileOpen ? "w-5 -rotate-45 -translate-y-[6.5px]" : "w-5"}
                  ${scrolled ? "text-[#14141B] dark:text-white" : "text-white"}`}
                  style={{ background: "currentColor" }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── MOBILE FULL-SCREEN MENU ──────────────────────────────────────── */}
      <div
        className={`md:hidden fixed inset-0 z-[9998] transition-all duration-500 ease-out
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        style={{ background: "#14141B" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10" style={{ background: "#D9FE42" }} />
          <div className="absolute top-1/3 right-0 w-48 h-48 rounded-full blur-3xl opacity-6" style={{ background: "#94C356" }} />
        </div>

        <div className="relative h-full flex flex-col px-8 pt-28 pb-10 overflow-y-auto">
          <ul className="flex flex-col gap-2 mb-8">
            {NAV_LINKS.map(({ id, name, link }, i) => (
              <li key={id}>
                <Link
                  to={link}
                  onClick={() => { setMobileOpen(false); link === "/" && scrollTo("hero"); }}
                  className="group flex items-center justify-between py-4 border-b border-white/8"
                  style={{
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.4s ${i * 60 + 100}ms, transform 0.4s ${i * 60 + 100}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <span className={`text-3xl font-black uppercase tracking-tighter
                    ${location.pathname === link ? "text-[#D9FE42]" : "text-white/80 group-hover:text-white"}`}
                  >
                    {name}
                  </span>
                  {location.pathname === link && (
                    <span className="w-2 h-2 rounded-full bg-[#D9FE42]" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {hasSections && (
            <div
              className="mb-8"
              style={{
                opacity: mobileOpen ? 1 : 0,
                transition: "opacity 0.4s 420ms",
              }}
            >
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D9FE42]/60 mb-4">// Sections</p>
              <div className="flex flex-wrap gap-2">
                {currentSections.filter(s => s.label !== "Top").map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => { setMobileOpen(false); setTimeout(() => scrollTo(id), 300); }}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-200
                      ${activeSection === id
                        ? "bg-[#D9FE42] text-[#14141B]"
                        : "border border-white/15 text-white/50 hover:border-white/40 hover:text-white"
                      }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div
            className="mt-auto"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.4s 500ms, transform 0.4s 500ms",
            }}
          >
            <Link
              to="/contact"
              onClick={() => setMobileOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#D9FE42] text-[#14141B] rounded-2xl text-sm font-black uppercase tracking-widest hover:bg-white transition-colors duration-200"
            >
              Contact Our Team <FaArrowRight size={10} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;