import React, { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Intro = ({ onEnter }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Configuration très fluide pour la lueur
  const lightSpringConfig = { stiffness: 45, damping: 22, mass: 0.6 };
  const lightX = useSpring(mouseX, lightSpringConfig);
  const lightY = useSpring(mouseY, lightSpringConfig);

  // Configuration pour le pointeur central
  const pointerX = useSpring(mouseX, { stiffness: 150, damping: 22 });
  const pointerY = useSpring(mouseY, { stiffness: 150, damping: 22 });

  // Effet d'échelle dynamique selon la vitesse de la souris
  const cursorVelocityX = useSpring(mouseX, { stiffness: 50, damping: 10 });
  const lightScale = useTransform(cursorVelocityX, (value) => {
    return 1 + Math.min(Math.abs(value) * 0.0004, 0.25);
  });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100vh", 
        opacity: 0,
        transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black text-white overflow-hidden cursor-none"
    >
      {/* 1. HALO LUMINEUX CORRIGÉ (ZÉRO CARRÉ DE TEXTURE) */}
      <motion.div
        style={{ 
          x: lightX, 
          y: lightY,
          scale: lightScale,
          transform: "translate(-50%, -50%)",
          // Utilisation d'un vrai dégradé radial natif pour un fondu parfait sans gros flou CSS instable
          background: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(239,68,68,0.05) 40%, rgba(0,0,0,0) 70%)"
        }}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none mix-blend-screen"
      />

      {/* Point chaud central fluide */}
      <motion.div
        style={{ 
          x: lightX, 
          y: lightY,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(253,224,71,0.3) 0%, rgba(249,115,22,0) 60%)"
        }}
        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none mix-blend-screen"
      />

      {/* 2. POINTEUR CENTRAL */}
      <motion.div
        style={{ 
          x: pointerX, 
          y: pointerY,
          transform: "translate(-50%, -50%)" 
        }}
        className="absolute top-0 left-0 w-8 h-8 border border-orange-500/30 rounded-full pointer-events-none flex items-center justify-center backdrop-blur-[1px]"
      >
        <div className="w-1.5 h-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-[0_0_10px_#f59e0b]" />
      </motion.div>

      {/* CONTENU TEXTE */}
      <div className="relative z-10 text-center px-4 select-none pointer-events-none">
        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-black tracking-[0.2em] mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
        >
          VOLTCORE
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-500 tracking-[0.3em] text-xs md:text-sm uppercase mb-16"
        >
          Future of Nanocomposite Heating
        </motion.p>
      </div>

      {/* BOUTON INTERACTIF */}
      <motion.button
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05, borderColor: "rgba(249, 115, 22, 1)" }}
        whileTap={{ scale: 0.95 }}
        onClick={onEnter}
        className="relative z-50 px-10 py-4 rounded-full font-bold tracking-widest text-xs uppercase bg-black/60 border border-white/20 text-white transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.9)] overflow-hidden group"
      >
        <span className="relative z-10">Click to Enter</span>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 duration-300" />
      </motion.button>
    </motion.div>
  );
};

export default Intro;