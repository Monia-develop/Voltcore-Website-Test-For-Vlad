import React from "react";

const Applications = () => {
  const apps = [
    {
      title: "Automotive",
      icon: "🚗",
      desc: "Voltcore heating integrated into car interiors for better battery range and premium zone comfort during winter.",
    },
    {
      title: "Textile",
      icon: "👕",
      desc: "Ultra-thin heating elements woven directly into smart clothing, sports gear, and technical outdoor wearables.",
    },
    {
      title: "Delivery & Logistics",
      icon: "📦",
      desc: "Smart heating grids for thermal delivery bags and on-demand courier gear to keep meals hot and intact until arrival.",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white py-32 duration-300">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-20" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 block mb-3">
            Industrial Solutions
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]">Applications</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Discover how Voltcore technology is transforming everyday comfort and performance across key sectors.
          </p>
        </div>

        {/* Grille des applications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {apps.map((app, index) => (
            <div 
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              /* Bordure intacte au repos + dégradé d'origine complet au survol + ombre néon diffuse */
              className="group relative rounded-3xl p-[1px] transition-all duration-500 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-md dark:shadow-[0_0_25px_rgba(59,130,246,0.02)] hover:dark:shadow-[0_0_30px_rgba(188,19,254,0.15)]"
            >
              {/* Fond de la carte légèrement dynamique au survol */}
              <div className="rounded-[23px] bg-zinc-50 dark:bg-zinc-950 p-8 h-full flex flex-col justify-between min-h-[420px] transition-all duration-500 group-hover:dark:bg-zinc-900/30">
                <div>
                  {/* Icône stylisée dans un conteneur avec micro-animation au survol */}
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-zinc-900 flex items-center justify-center text-3xl mb-6 shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800">
                    {app.icon}
                  </div>
                  
                  {/* Le titre s'illumine aussi avec ton dégradé au survol */}
                  <h3 className="text-2xl font-bold tracking-tight mb-3 transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3b82f6] group-hover:to-[#bc13fe]">
                    {app.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {app.desc}
                  </p>
                </div>
                
                <div>
                  {/* Zone placeholder vidéo modernisée avec un point d'enregistrement clignotant */}
                  <div className="w-full h-28 rounded-xl bg-gray-100 dark:bg-zinc-900/60 border border-dashed border-gray-300 dark:border-zinc-800/80 flex flex-col gap-1 items-center justify-center p-4 transition-all duration-300 group-hover:border-solid group-hover:border-zinc-700">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold tracking-wide">
                        Lab Video
                      </span>
                    </div>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">Coming soon</span>
                  </div>

                  {/* Lien d'appel à l'action interactif et discret */}
                  <div className="mt-5 pt-1 flex items-center text-xs font-bold text-gray-400 dark:text-zinc-500 transition-colors duration-300 group-hover:text-[#3b82f6]">
                    <span>LEARN MORE</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Applications;