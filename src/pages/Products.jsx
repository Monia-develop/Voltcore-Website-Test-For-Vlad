import React from "react";
import AppStore from "../Components/AppStore/AppStore";
import fabricHeaterVideo from '../assets/website/2. Fabric heater + thermal camera.mp4';
import PerformanceSimulator1 from "../Components/PerformanceSimulator1";
import PerformanceSimulator2 from "../Components/PerformanceSimulator2";
import PerformanceSimulator3 from "../Components/PerformanceSimulator3";
import PerformanceSimulator4 from "../Components/PerformanceSimulator4";

import VoltcoreImg from "../assets/website/Voltcore.jpg";
import Voltcore2Img from "../assets/website/Voltcore_2.jpg";
import Voltcore3Img from "../assets/website/Voltcore_3.jpg";
import VoltcoreSeatImg from "../assets/website/Voltcore_seat.jpg";

const Products = ({ togglePlay }) => {
  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-black dark:text-white duration-300">
      
      {/* ================= HEADER SECTION ================= */}
      <div className="container mx-auto pt-32 pb-20 px-6 max-w-6xl">
        <div className="max-w-3xl" data-aos="fade-up">
          <span className="text-xs uppercase tracking-[0.25em] font-bold text-orange-500 dark:text-yellow-400 block mb-3">
            Voltcore Materials & Intelligence
          </span>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
            Our Products
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed">
            Discover our next-generation heating filaments and polymer nanocomposites. Use the interactive benchmarks below to audit our live performance metrics against industry standards.
          </p>
        </div>
      </div>

      {/* ================= DETAILED PRODUCTS SECTIONS ================= */}
      <div className="container mx-auto px-6 space-y-32 mb-32 max-w-6xl">
        
        {/* PRODUIT 1 : THE CONDUCTIVE YARN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="group relative rounded-3xl p-[1px] transition-all duration-300 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-lg" data-aos="fade-right">
            <div className="rounded-[23px] overflow-hidden h-[450px] bg-zinc-50 dark:bg-zinc-900/40 p-6 flex items-center justify-center">
              <img src={VoltcoreImg} alt="Voltcore Conductive Yarn" className="w-full h-full object-contain rounded-2xl" />
            </div>
          </div>
          <div className="space-y-6" data-aos="fade-left">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">01 . Core Material</span>
            <h2 className="text-3xl font-black tracking-tight">The Conductive Yarn</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our foundation product. It is a flexible, ultra-thin polymer filament embedded with advanced carbon nanocomposites. It behaves exactly like standard textile fiber while offering high electrical conductivity.
            </p>
            <PerformanceSimulator1 />
          </div>
        </div>

        {/* PRODUIT 2 : SEMI-FINISHED MESH / HEATING TAPES */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 lg:order-2" data-aos="fade-right">
              <div className="group relative rounded-3xl p-[1px] transition-all duration-300 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-lg">
                <div className="rounded-[23px] overflow-hidden h-[450px] bg-zinc-50 dark:bg-zinc-900/40 p-6 flex items-center justify-center">
                  <img src={Voltcore2Img} alt="Voltcore Heating Tapes" className="w-full h-full object-contain rounded-2xl" />
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:order-1" data-aos="fade-left">
              <span className="text-xs font-bold uppercase tracking-widest text-orange-500">02 . Integration Mesh</span>
              <h2 className="text-3xl font-black tracking-tight">Heating Tapes & Sheets</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Pre-woven wide conductive layers tailored for large-surface lamination. Perfect for automotive interior parts, composite panels, or architectural heating surfaces.
              </p>
              <PerformanceSimulator2 />
            </div>
          </div>

          {/* Section Vidéo Horizontale avec l'effet de lueur au survol */}
          <div className="w-full max-w-4xl mx-auto px-4 mt-16" data-aos="fade-up">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-4 text-center">
              Click to watch: Fabric Heater + Thermal Camera
            </span>
            <div className="group relative rounded-3xl p-[1px] transition-all duration-300 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-xl cursor-pointer">
              <div className="rounded-[23px] overflow-hidden bg-zinc-50 dark:bg-zinc-900/40 p-2">
                <video 
                  src={fabricHeaterVideo} 
                  controls 
                  muted
                  preload="metadata"
                  playsInline
                  className="w-full h-auto max-h-[500px] object-cover rounded-2xl mx-auto"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PRODUIT 3 : SMART RIBBON TRACKS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="group relative rounded-3xl p-[1px] transition-all duration-300 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-lg" data-aos="fade-right">
            <div className="rounded-[23px] overflow-hidden h-[450px] bg-zinc-50 dark:bg-zinc-900/40 p-6 flex items-center justify-center">
              <img src={Voltcore3Img} alt="Voltcore Ribbon Tracks" className="w-full h-full object-contain rounded-2xl" />
            </div>
          </div>
          <div className="space-y-6" data-aos="fade-left">
            <span className="text-xs font-bold uppercase tracking-widest text-orange-500">03 . Power Delivery</span>
            <h2 className="text-3xl font-black tracking-tight">Flexible Ribbon Tracks</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Narrow, highly flexible connection strips designed for seamless power distribution across multi-zone systems without stiff boundaries.
            </p>
            <PerformanceSimulator3 />
          </div>
        </div>

        {/* PRODUIT 4 : END APPLICATION HEATED SYSTEMS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="group relative rounded-3xl p-[1px] transition-all duration-300 bg-gray-200 dark:bg-zinc-800/80 hover:bg-gradient-to-r hover:from-[#3b82f6] hover:to-[#bc13fe] shadow-lg lg:order-2" data-aos="fade-right">
            <div className="rounded-[23px] overflow-hidden h-[450px] bg-zinc-50 dark:bg-zinc-900/40 p-6 flex items-center justify-center">
              <img src={VoltcoreSeatImg} alt="Voltcore Heated Smart Cushion" className="w-full h-full object-contain rounded-2xl" />
            </div>
          </div>
          <div className="space-y-6 lg:order-1" data-aos="fade-left">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-500">04 . Smart System</span>
            <h2 className="text-3xl font-black tracking-tight">Heated System Modules</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Fully operational low-voltage integrated prototypes demonstrating system-level power thrift and uniform heat dispersion under severe conditions.
            </p>
            <PerformanceSimulator4 />
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default Products;