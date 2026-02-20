import React from 'react';

const Experience: React.FC = () => {
  return (
    <section>
      <h3 className="text-3xl font-bold text-white mb-10">Experiência Profissional</h3>
      
      <div className="space-y-8">
        {/* Tecservice */}
        <div className="group flex flex-col md:flex-row gap-6 md:gap-12 bg-[#111] border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors shadow-lg">
          <div className="md:w-1/4 shrink-0">
            <div className="text-neutral-500 font-mono text-sm mb-2">Out/2024 - Presente</div>
            <div className="font-bold text-blue-400">Tecservice Engenharia e Consultoria</div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-3">Engenheiro de Dados e Ciência de Dados</h4>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex gap-3 items-start"><span className="text-blue-500 shrink-0 mt-1">▹</span> <span>Desenvolvimento e manutenção de pipelines de dados em larga escala.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-500 shrink-0 mt-1">▹</span> <span>Desenvolvimento e implementação de APIs em FastAPI e integração com sistemas internos.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-500 shrink-0 mt-1">▹</span> <span>Desenvolvimento do Sistema de Monitoramento de Embarcações em FastAPI e ReactJS.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-500 shrink-0 mt-1">▹</span> <span>Participação no desenvolvimento do "ChatSub" - Modelo RAG integrado com bancos de dados e Databricks.</span></li>
              <li className="flex gap-3 items-start"><span className="text-blue-500 shrink-0 mt-1">▹</span> <span>Automação de processos e otimização de fluxos de dados.</span></li>
            </ul>
          </div>
        </div>

        {/* Capco */}
        <div className="group flex flex-col md:flex-row gap-6 md:gap-12 bg-[#111] border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors shadow-lg">
          <div className="md:w-1/4 shrink-0">
            <div className="text-neutral-500 font-mono text-sm mb-2">Dez/2023 - Out/2024</div>
            <div className="font-bold text-neutral-300">Capco</div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-3 flex flex-wrap items-center gap-3">
              Engenheiro de Produção
            </h4>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Alocado no cliente Petrobras, fui reconhecido como 'Destaque do Período' por liderar a automação e migração de um banco de dados legado, orquestrando pipelines complexos com PySpark e garantindo zero perda de dados durante a transição.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Desenvolvimento e Automação de processos e otimização de fluxos de dados utilizando pipelines PySpark e AirFlow.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Construção de dashboards interativos e relatórios automatizados em BI, Python e SQL.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Análise de grandes volumes de dados e criação de relatórios de performance para clientes.</span></li>
            </ul>
          </div>
        </div>

        {/* Grupo GPS */}
        <div className="group flex flex-col md:flex-row gap-6 md:gap-12 bg-[#111] border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors shadow-lg">
          <div className="md:w-1/4 shrink-0">
            <div className="text-neutral-500 font-mono text-sm mb-2">Mai/2023 - Dez/2023</div>
            <div className="font-bold text-neutral-300">Grupo GPS</div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-3">Analista de Sistemas</h4>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Desenvolvimento de aplicações internas em Python/Django, ReactJS.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Criação e manutenção de APIs e soluções para integração de dados.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Apoio ao time de análise de dados com queries SQL, pipelines de automação em PySpark.</span></li>
            </ul>
          </div>
        </div>

        {/* Power Master */}
        <div className="group flex flex-col md:flex-row gap-6 md:gap-12 bg-[#111] border border-neutral-800 rounded-3xl p-8 hover:border-neutral-700 transition-colors shadow-lg">
          <div className="md:w-1/4 shrink-0">
            <div className="text-neutral-500 font-mono text-sm mb-2">Fev/2022 - Mai/2023</div>
            <div className="font-bold text-neutral-300">Power Master Tecnologia</div>
          </div>
          <div>
            <h4 className="text-xl font-bold text-white mb-3">Estagiário de Engenharia Mecânica - Analista Comercial</h4>
            <ul className="space-y-3 text-neutral-400">
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Elaboração de propostas técnicas e análise de requisitos para clientes.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Desenvolvimento de indicadores de desempenho e relatórios estratégicos.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Apoio à engenharia na viabilidade técnica de projetos.</span></li>
              <li className="flex gap-3 items-start"><span className="text-neutral-600 shrink-0 mt-1">▹</span> <span>Gestão de documentação técnica e iniciativas de melhoria de processos.</span></li>
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;