import React from 'react';

const BentoGrid: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div className="md:col-span-2 bg-[#111] border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors shadow-lg">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          Sobre Mim
        </h3>
        <p className="text-neutral-400 leading-relaxed text-lg mb-4">
          Sou um Engenheiro Full Stack movido por resolver problemas complexos e arquitetar soluções escaláveis do zero. Especialista em unir o mundo do desenvolvimento backend com pipelines de engenharia de dados.
        </p>
        <p className="text-neutral-400 leading-relaxed text-lg">
          Minha fundação é baseada em <strong className="text-white">Arquitetura Hexagonal e DDD</strong>, garantindo que o código não apenas funcione, mas seja limpo, manutenível e preparado para o futuro.
        </p>
      </div>

      <div className="relative md:col-span-1 bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-neutral-800 rounded-3xl p-8 flex flex-col justify-center overflow-hidden group shadow-lg hover:border-[#008542]/40 transition-all duration-500">
        
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#008542]/10 rounded-full blur-3xl group-hover:bg-[#008542]/20 transition-all duration-500 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FDB913]/10 rounded-full blur-3xl group-hover:bg-[#FDB913]/20 transition-all duration-500 pointer-events-none"></div>

        <div className="flex items-center gap-2 mb-4 relative z-10">
          <svg className="w-4 h-4 text-[#FDB913]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <h4 className="text-[#FDB913] font-bold uppercase tracking-widest text-[11px]">Destaque do Período</h4>
        </div>

        {/* Container do Logo animado */}
        <div className="bg-white/95 px-4 py-3 rounded-xl inline-flex items-center justify-center mb-6 w-fit shadow-md border border-neutral-200/50 relative z-10 group-hover:scale-105 transition-transform duration-300">
          <img 
            src="../src/assets/Petrobras-Logo.wine.svg" 
            alt="Petrobras" 
            className="h-8 md:h-10 object-contain" 
          />
        </div>

        <p className="text-neutral-300 relative z-10 text-sm leading-relaxed">
          Liderança técnica na migração de banco legado com <strong className="text-white">zero perda de dados</strong> via PySpark, orquestrando pipelines complexos.
        </p>
      </div>

    </section>
  );
};

export default BentoGrid;