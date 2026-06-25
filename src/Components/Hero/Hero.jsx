import React, { useState, useEffect } from "react";
import VoltHeroPng from "../../assets/voltcore-hero.mp4";
import { BiPlayCircle } from "react-icons/bi";
import { motion } from "framer-motion";

const Hero = ({ togglePlay }) => {
  // Liste de mots-clés plus percutants pour Voltcore
  const words = ["GO GREEN", "DRIVE SMART", "HEAT EFFICIENTLY"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentFullText = words[currentWordIndex];
      
      if (!isDeleting) {
        // En train d'écrire
        setText(currentFullText.substring(0, text.length + 1));
        setTypingSpeed(150);

        if (text === currentFullText) {
          // Pause quand le mot est complet
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        // En train d'effacer
        setText(currentFullText.substring(0, text.length - 1));
        setTypingSpeed(75);

        if (text === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    };

    const timeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentWordIndex]);

  return (
    <div id="home" className="relative w-full h-screen overflow-hidden">
      {/* Vidéo de fond */}
      <video autoPlay muted loop playsInline
        className="absolute top-0 left-0 w-full h-full object-cover">
        <source src={VoltHeroPng} type="video/mp4" />
      </video>

      {/* Overlay sombre */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50" />

      {/* Contenu principal */}
      <div className="relative z-10 flex flex-col justify-center h-full container text-white px-6 md:px-12">
        
        {/* Le petit texte du haut avec une animation de pulse discret */}
        <p data-aos="fade-right" className="text-yellow-400 font-semibold tracking-widest text-sm mb-4 uppercase animate-pulse">
          Advanced Materials & Mobility Tech
        </p>
        
        {/* Titre principal avec dégradé animé */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
          HEAT SMART, <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 bg-[length:200%_auto] animate-gradient-x">
            {text}
          </span>
          <span className="text-orange-500 animate-blink font-light">|</span>
        </h1>

        <p data-aos="fade-up" data-aos-delay="300"
          className="text-lg md:text-xl mb-10 max-w-xl opacity-90 leading-relaxed text-gray-200">
          Innovative nanocomposite heating solutions for next-generation automotive and building applications.
        </p>

        {/* Boutons d'action */}
        <div data-aos="fade-up" data-aos-delay="500" className="flex gap-6 items-center">
          <button className="primary-btn text-lg px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-105 transition-transform duration-300 rounded-full font-medium text-black">
            Discover
          </button>
          <button onClick={togglePlay} className="flex items-center gap-2 text-white hover:text-yellow-400 transition-colors duration-300 group">
            <BiPlayCircle className="text-4xl group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg">See Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;