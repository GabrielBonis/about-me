import React from 'react';

const ProjectsHighlight: React.FC = () => {
  return (
    <div className="md:col-span-3 bg-[#111] border border-neutral-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-6 hover:border-neutral-700 transition-colors shadow-lg">
      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
        <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2">Projeto ChatSub</h4>
        <p className="text-neutral-400">
          Desenvolvimento de modelo RAG integrado com bancos de dados e Databricks utilizando LLMs. Uma solução de ponta para análise inteligente de dados.
        </p>
      </div>
    </div>
  );
};

export default ProjectsHighlight;