import React from "react";
import TeamImg from "../assets/website/Team.jpg";
import FabriceImg from "../assets/website/Fabrice.jpg";

const OurTeam = () => {
  return (
    <div id="our-team" className="w-full bg-white dark:bg-black text-black dark:text-white py-32 duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* ================= EN-TÊTE DE SECTION ================= */}
        <div className="max-w-3xl mb-16" data-aos="fade-up">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-orange-500 dark:text-orange-400 block mb-3">
            Voltcore Materials & Intelligence
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Our Team
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Driving the future of smart thermal textiles with deep tech innovation and industrial excellence.
          </p>
        </div>

        {/* ================= BLOC 1 : LA GRANDE PHOTO D'ÉQUIPE ================= */}
        <div className="w-full mb-24" data-aos="fade-up">
          {/* Bordure et ombre néon diffuse pour faire ressortir le bloc du fond noir */}
          <div className="group relative rounded-3xl p-[1px] transition-all duration-500 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-md dark:shadow-[0_0_25px_rgba(59,130,246,0.02)] hover:dark:shadow-[0_0_30px_rgba(188,19,254,0.12)]">
            <div className="rounded-[23px] overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-4 transition-all duration-500 group-hover:dark:bg-zinc-900/20">
              <img 
                src={TeamImg} 
                alt="The Voltcore Crew" 
                className="w-full h-auto object-contain max-h-[600px] mx-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.01]" 
              />
            </div>
          </div>
          <div className="mt-6 max-w-2xl">
            <h3 className="text-xl font-bold tracking-tight mb-2 transition-colors duration-300 group-hover:text-[#3b82f6]">
              The Voltcore Crew
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              Our multidisciplinary engineering and commercial team collaborating at full scale to design, test, and manufacture the materials that put the heater inside the fabric.
            </p>
          </div>
        </div>

        {/* ================= BLOC 2 : LE FOCUS FONDATEUR (HORIZONTAL) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center border-t border-gray-100 dark:border-zinc-900 pt-16">
          
          {/* Photo de Fabrice avec le même effet bleu-violet dynamique au survol */}
          <div className="md:col-span-5" data-aos="fade-right">
            <div className="group relative rounded-3xl p-[1px] transition-all duration-500 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-lg dark:shadow-[0_0_25px_rgba(59,130,246,0.02)] hover:dark:shadow-[0_0_30px_rgba(188,19,254,0.12)] max-w-sm mx-auto">
              <div className="rounded-[23px] overflow-hidden bg-zinc-50 dark:bg-zinc-950 p-4 transition-all duration-500 group-hover:dark:bg-zinc-900/20">
                <img 
                  src={FabriceImg} 
                  alt="Fabrice - Founder" 
                  className="w-full h-auto object-cover max-h-[450px] rounded-2xl transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
            </div>
          </div>

          {/* Message du Fondateur */}
          <div className="md:col-span-7 space-y-6" data-aos="fade-left">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500 block">
              Founder's Vision
            </span>
            <h2 className="text-3xl font-black tracking-tight transition-colors duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe]">
              Fabrice
            </h2>
            <p className="text-orange-500 font-semibold text-sm -mt-4">Founder & Innovator</p>
            
            <blockquote className="text-lg text-gray-600 dark:text-gray-300 italic font-medium border-l-4 border-orange-500 pl-4 py-1 leading-relaxed">
              "We are not just creating another heating component. We are integrating intelligence directly into the textile structure to redefine energy efficiency in tomorrow's mobility."
            </blockquote>
          </div>

        </div>

      </div>
    </div>
  );
};

export default OurTeam;