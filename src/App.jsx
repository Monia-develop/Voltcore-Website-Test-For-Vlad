import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import IndustryComingSoon from "./pages/industries/ComingSoon";
import Technology from "./pages/Technology";
import News from "./pages/News"; 

const App = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  const togglePlay = () => {
    setIsPlay(!isPlay);
  };

  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white duration-300 min-h-screen">
      
      {/* ÉCRAN D'INTRO */}
      <AnimatePresence>
        {!hasEntered && <Intro onEnter={() => setHasEntered(true)} />}
      </AnimatePresence>

      <Navbar />

      {/* ZONE DE CONTENU ÉPURÉE */}
      <main className="relative w-full overflow-x-hidden">
        
        <Routes>
          {/* AVEC HASHROUTER, LA RACINE DEVANT EST TOUJOURS SÛRE ET UNIQUE */}
          <Route path="/" element={<Home togglePlay={togglePlay} />} />
          
          {/* AUTRES PAGES */}
          <Route path="/about" element={<About />} />
          
          {/* LA ROUTE TECHNOLOGY BIEN PLACÉE ICI ET MISE À JOUR */}
          <Route path="/technology" element={<Technology />} />
          
          <Route path="/products" element={<Products togglePlay={togglePlay} />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/career" element={<Career />} />
          
          {/* DÉCLARATION DE LA ROUTE DE LA PAGE NEWS */}
          <Route path="/news" element={<News />} />

          {/* INDUSTRIES */}
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/automotive" element={<Automotive />} />
          <Route
            path="/industries/food-delivery"
            element={<IndustryComingSoon name="Food & Delivery" />}
          />
          <Route
            path="/industries/heated-apparel"
            element={<IndustryComingSoon name="Heated Apparel" />}
          />
          <Route
            path="/industries/underfloor-heating"
            element={<IndustryComingSoon name="Underfloor Heating" />}
          />
          <Route path="/industries/defense" element={<IndustryComingSoon name="Defense" />} />
        </Routes>
        
      </main>
      
      <PopupPlayer isPlay={isPlay} togglePlay={togglePlay} />
    </div>
  );
};

export default App;