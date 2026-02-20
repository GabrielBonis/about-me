import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  techs: string[];
  featured?: boolean;
  icon?: string;
}

const ProjectsPage: React.FC = () => {
  // Array de Projetos de Portfólio (Produtos e Arquiteturas Complexas)
  const portfolioProjects = [
    {
      id: "marketplace-go",
      title: "Marketplace Engine",
      description: "Simulação de um ecossistema estilo Mercado Livre focado em alta performance. Construído com Go utilizando Arquitetura Hexagonal, gRPC e microsserviços.",
      techs: ["Go", "gRPC", "Docker", "Kubernetes", "Hexagonal"],
      featured: true,
    },
    {
      id: "sp-crime-data",
      title: "Análise Criminal SP",
      description: "Pipeline robusto de Engenharia de Dados processando volumes massivos de dados públicos de segurança de São Paulo, realizando ETL complexo de Excel e Parquet.",
      techs: ["PySpark", "Polars", "Python", "Data Engineering"],
      featured: false,
    },
    {
      id: "chatsub-rag",
      title: "ChatSub RAG",
      description: "Motor de inteligência artificial corporativa utilizando o padrão RAG (Retrieval-Augmented Generation) integrado com bases de dados vetoriais e Databricks.",
      techs: ["Python", "LLMs", "Databricks", "Vector DB"],
      featured: false,
    }
  ];

  // Array de Projetos para Apoiar DEV (Ferramentas, APIs, Utilities)
  const devProjects = [
    {
      id: "celestial-map-api",
      title: "Celestial Map API",
      description: "API de código aberto para gerar mapas astronômicos precisos do céu com base em uma data, hora e coordenadas geográficas específicas.",
      techs: ["FastAPI", "Python", "Astronomy"],
      icon: "🌌",
    },
    {
      id: "hexagonal-boilerplate",
      title: "Go Hex Boilerplate",
      description: "Template pronto para iniciar projetos em Go aplicando Domain-Driven Design (DDD) e Arquitetura Hexagonal com injeção de dependências configurada.",
      techs: ["Go", "DDD", "Clean Architecture"],
      icon: "📦",
    },
    {
      id: "pyspark-utils",
      title: "DataOps CLI",
      description: "Interface de linha de comando para automatizar a criação de jobs rotineiros do Apache Airflow e validação de schemas em PySpark.",
      techs: ["Python", "Airflow", "CLI"],
      icon: "⚡",
    }
  ];

  // Componente de Card reutilizável
  const ProjectCard = ({ project, isDevTool = false }: { project: Project, isDevTool?: boolean }) => (
    <Link 
      to={`/projects/${project.id}`} 
      className="group relative flex flex-col bg-[#111] border border-neutral-800 rounded-[2rem] p-8 hover:bg-[#151515] hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 shadow-lg h-full"
    >
      {/* Badge de Destaque */}
      {project.featured && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
          Em Destaque
        </div>
      )}

      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-4">
          {isDevTool ? (
            <span className="text-3xl">{project.icon}</span>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </div>
          )}
          <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
        </div>
        
        <p className="text-neutral-400 leading-relaxed text-sm mb-6">
          {project.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techs.map((tech: string) => (
            <span key={tech} className="px-2.5 py-1 bg-[#0a0a0a] border border-neutral-800 rounded-md text-xs font-medium text-neutral-400 group-hover:border-neutral-700 transition-colors">
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
          Explorar Projeto
          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="relative w-full min-h-screen py-12 px-6 overflow-hidden flex flex-col items-center">
      
      {/* Luzes de Fundo (Glow) */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-16">
        
        {/* Cabeçalho da Página */}
        <header className="flex flex-col items-center text-center mt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
            Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Projetos</span>.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Uma seleção de aplicações em produção, arquiteturas de dados e ferramentas de código aberto criadas para resolver problemas reais.
          </p>
        </header>

        {/* SEÇÃO 1: Projetos de Portfólio */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white">Projetos Portfólio</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-neutral-800 to-transparent"></div>
          </div>
          
          {/* GRID: 3 colunas em telas grandes (lg), 2 em médias (md), 1 em celular. Gap de 8 padronizado. */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        {/* SEÇÃO 2: Projetos para Apoiar o DEV */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white">Ferramentas & Apoio ao Dev</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-neutral-800 to-transparent"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devProjects.map((project) => (
              <ProjectCard key={project.id} project={project} isDevTool={true} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ProjectsPage;