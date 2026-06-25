import React from "react";

const Career = () => {
  const jobs = [
    {
      title: "R&D Engineer",
      type: "Full-time",
      desc: "Work on cutting-edge nanocomposite heating technology.",
    },
    {
      title: "Business Developer",
      type: "Full-time",
      desc: "Expand Voltcore's presence in the automotive market.",
    },
    {
      title: "Internship",
      type: "3-6 months",
      desc: "Join us as an intern and work on real projects.",
    },
  ];

  return (
    <div className="w-full bg-white dark:bg-black text-black dark:text-white py-32 duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* En-tête avec ton dégradé officiel Bleu/Violet */}
        <div className="text-center max-w-2xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 block mb-3">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            Join <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3b82f6] to-[#bc13fe]">Our Team</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            Be part of the green energy revolution. We're looking for passionate people to design the future of thermal intelligence.
          </p>
        </div>

        {/* Liste des offres d'emploi */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {jobs.map((job, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              /* Bordure subtile au repos + dégradé bleu/violet complet et lueur au survol */
              className="group relative rounded-2xl p-[1px] transition-all duration-500 bg-gray-200 dark:bg-zinc-800/60 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-md dark:shadow-[0_0_20px_rgba(59,130,246,0.01)] hover:dark:shadow-[0_0_25px_rgba(188,19,254,0.12)]"
            >
              {/* Fond interne avec légère variation d'opacité au hover */}
              <div className="rounded-[15px] bg-zinc-50 dark:bg-zinc-950 p-6 md:p-8 transition-all duration-500 group-hover:dark:bg-zinc-900/40">
                
                {/* Ligne du haut : Titre + Badge Type */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#3b82f6] group-hover:to-[#bc13fe]">
                    {job.title}
                  </h2>
                  <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gray-100 dark:bg-zinc-900 text-gray-500 dark:text-zinc-400 border border-gray-200 dark:border-zinc-800 transition-colors duration-300 group-hover:border-[#3b82f6]/30 group-hover:text-[#3b82f6] self-start sm:self-auto">
                    {job.type}
                  </span>
                </div>
                
                {/* Description du poste */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                  {job.desc}
                </p>
                
                {/* Bouton d'action interactif */}
                <div className="flex justify-between items-center">
                  <button className="relative overflow-hidden rounded-xl font-bold text-xs tracking-wider uppercase px-5 py-3 transition-all duration-300 bg-black dark:bg-white text-white dark:text-black border border-transparent hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white hover:border-black dark:hover:border-white shadow-sm">
                    Apply Now
                  </button>
                  
                  {/* Petite flèche esthétique qui réagit au survol de la carte */}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-gray-400 dark:text-zinc-600 transition-all duration-500 transform group-hover:translate-x-1 group-hover:text-[#bc13fe]" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Career;