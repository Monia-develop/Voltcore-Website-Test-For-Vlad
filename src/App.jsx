import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./Components/Navbar/Navbar";
import PopupPlayer from "./Components/PopupPlayer/PopupPlayer";
import Home from "./pages/Homes";
import AOS from "aos";
import "aos/dist/aos.css";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Intro from "./Components/Intro";
import Career from "./pages/Career";
import OurTeam from "./pages/OurTeam";
import Industries from "./pages/Industries";
import About from "./pages/About";
import Automotive from "./pages/industries/Automotive";
import AutomotiveCaseStudiesPage from "./pages/industries/AutomotiveCaseStudiesPage";
import HeatedApparel from "./pages/HeatedApparel";
import HeatedApparelCaseStudies from "./pages/HeatedApparelCaseStudies";
import Technology from "./pages/Technology";
import News from "./pages/News";
import ThermalLogistics from "./pages/ThermalLogistics";
import FloorHeating from "./pages/FloorHeating";
import FloorHeatingCaseStudiesPage from "./pages/industries/FloorHeatingCaseStudiesPage";
import Defense from "./pages/industries/Defense";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.slice(1));
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
};

const App = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    AOS.init({ offset: 100, duration: 800, easing: "ease-in-sine", delay: 100 });
    AOS.refresh();
  }, []);

  const togglePlay = () => setIsPlay(!isPlay);

  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white duration-300 min-h-screen">
      <ScrollToTop /> 
      <AnimatePresence>
        {!hasEntered && <Intro onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>
      <Navbar />
      <main className="relative w-full overflow-x-hidden">
        <Routes>
          <Route path="/"                                          element={<Home togglePlay={togglePlay} />} />
          <Route path="/about"                                     element={<About />} />
          <Route path="/technology"                                element={<Technology />} />
          <Route path="/products"                                  element={<Products togglePlay={togglePlay} />} />
          <Route path="/team"                                      element={<OurTeam />} />
          <Route path="/contact"                                   element={<Contact />} />
          <Route path="/career"                                    element={<Career />} />
          <Route path="/news"                                      element={<News />} />
          <Route path="/industries"                                element={<Industries />} />
          <Route path="/industries/automotive"                     element={<Automotive />} />
          <Route path="/industries/automotive/case-studies"        element={<AutomotiveCaseStudiesPage />} />
          <Route path="/industries/heated-apparel"                 element={<HeatedApparel />} />
          <Route path="/industries/heated-apparel/case-studies"    element={<HeatedApparelCaseStudies />} />
          <Route path="/industries/floorheating" element={<FloorHeating />} />
          <Route path="/industries/floorheating/case-studies" element={<FloorHeatingCaseStudiesPage />} />
          <Route path="/industries/thermal-logistics"              element={<ThermalLogistics />} />
          <Route path="/industries/thermal-logistics/case-studies" element={<FoodDeliveryCaseStudies />} />
          <Route path="/industries/defense"                        element={<Defense />} />
        </Routes>
      </main>
      <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
    </div>
  );
};

export default App;