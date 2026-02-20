import React from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  description: string;
  techs: string[];
  featured?: boolean;
  icon?: string;
  isTool?: boolean; // Nova flag para identificar ferramentas interativas
}

const ProjectsPage: React.FC = () => {
  const portfolioProjects: Project[] = [
    {
      id: "marketplace-go",
      title: "Marketplace Engine",
      description: "Sistema de alta performance inspirado no Mercado Livre. Desenvolvido em Go com Arquitetura Hexagonal, gRPC e suporte a microsserviços escaláveis.",
      techs: ["Go", "gRPC", "Docker", "Kubernetes", "Hexagonal"],
      featured: true,
    },
    {
      id: "sp-crime-data",
      title: "Análise Criminal SP",
      description: "Pipeline de ETL para processamento de dados massivos da Secretaria de Segurança de SP, utilizando PySpark e Polars para limpeza e unificação de arquivos Parquet.",
      techs: ["PySpark", "Polars", "Python", "Data Engineering"],
      featured: false,
    },
    {
      id: "chatsub-rag",
      title: "ChatSub RAG",
      description: "Implementação de Retrieval-Augmented Generation (RAG) integrada ao Databricks para análise inteligente de documentos e bases de dados corporativas.",
      techs: ["Python", "LLMs", "Databricks", "Vector DB"],
      featured: false,
    }
  ];

  const devProjects: Project[] = [
    {
      id: "celestial-map", // Alterado para bater com a rota interativa
      title: "Celestial Map Tool",
      description: "Ferramenta interativa que consome minha API de astronomia para renderizar mapas estelares precisos baseados em coordenadas e tempo.",
      techs: ["FastAPI", "Python", "React", "Astronomy API"],
      icon: "🌌",
      isTool: true,
    },
    {
      id: "hexagonal-boilerplate",
      title: "Go Hex Boilerplate",
      description: "Template pronto para microsserviços em Go, aplicando DDD e Injeção de Dependência para acelerar o desenvolvimento de novas APIs.",
      techs: ["Go", "DDD", "Dependency Injection"],
      icon: "📦",
    },
    {
      id: "dataops-cli",
      title: "DataOps CLI",
      description: "Ferramenta de terminal para automação de jobs no Apache Airflow e validação de contratos de dados em pipelines PySpark.",
      techs: ["Python", "Airflow", "CLI"],
      icon: "⚡",
    }
  ];

  const ProjectCard = ({ project, isDevTool = false }: { project: Project, isDevTool?: boolean }) => {
    // Se for uma ferramenta interativa, aponta para a rota principal da ferramenta
    const targetPath = project.isTool ? `/${project.id}` : `/projects/${project.id}`;

    return (
      <Link 
        to={targetPath} 
        className="group relative flex flex-col bg-[#111] border border-neutral-800 rounded-[2rem] p-8 hover:bg-[#151515] hover:border-neutral-600 transition-all duration-300 hover:-translate-y-1 shadow-lg h-full"
      >
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
            {project.techs.map((tech) => (
              <span key={tech} className="px-2.5 py-1 bg-[#0a0a0a] border border-neutral-800 rounded-md text-xs font-medium text-neutral-400 group-hover:border-neutral-700 transition-colors">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
            {project.isTool ? "Abrir Ferramenta" : "Explorar Projeto"}
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className="relative w-full min-h-screen py-12 px-6 overflow-hidden flex flex-col items-center">
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col gap-16">
        <header className="flex flex-col items-center text-center mt-8">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
            Meus <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Projetos</span>.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Uma seleção de aplicações em produção, arquiteturas de dados e ferramentas de código aberto.
          </p>
        </header>

        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-white">Projetos Portfólio</h2>
            <div className="h-[1px] flex-grow bg-gradient-to-r from-neutral-800 to-transparent"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>

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