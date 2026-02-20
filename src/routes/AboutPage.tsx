import React from 'react';
import BentoGrid from '../components/BentoGrid';
import Experience from '../components/Experience';
import Hero from '../components/Hero';
import ProjectsHighlight from '../components/ProjectsHighlight';
import TechStack from '../components/TechStack';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200 font-sans pb-20 selection:bg-blue-500/30">
      
      {/* Background Glows (Luz Azul Global) */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      {/* Adicionado: flex flex-col gap-8 para padronizar o espaçamento entre tudo */}
      <main className="max-w-6xl mx-auto pt-8 px-6 relative z-10 flex flex-col gap-8">
        <Hero />
        <BentoGrid />
        <TechStack />
        <ProjectsHighlight />
        <Experience />
      </main>
      
    </div>
  );
};

export default AboutPage;