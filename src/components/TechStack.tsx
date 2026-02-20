import React from "react";

const TechStack: React.FC = () => {
  const techStack = [
    {
      category: "Linguagens de Programação",
      skills: [
        {
          name: "Python",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
        },
        {
          name: "Go (Golang)",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
        },
        {
          name: "TypeScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
        },
        {
          name: "JavaScript",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
        },
        {
          name: "Java",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
        },
        { name: "SQL", icon: null },
      ],
    },
    {
      category: "Desenvolvimento Backend",
      skills: [
        {
          name: "FastAPI",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
        },
                {
          name: "Go (Golang)",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original-wordmark.svg",
        },
        {
          name: "Django",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",
        },
        { name: "APIs RESTful", icon: null },
        { name: "gRPC", icon: null },
      ],
    },
    {
      category: "Arquitetura & Metodologias",
      skills: [
        { name: "Arquitetura Hexagonal", icon: null },
        { name: "Domain-Driven Design (DDD)", icon: null },
        { name: "Microsserviços", icon: null },
        { name: "DataOps", icon: null },
        { name: "CI/CD", icon: null },
      ],
    },
    {
      category: "Dados, Orquestração & IA",
      skills: [
        {
          name: "Apache Airflow",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apacheairflow/apacheairflow-original.svg",
        },
        {
          name: "PySpark",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg",
        },
        {
          name: "Databricks",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/databricks/databricks-original.svg",
        },
        { name: "RAG (LLMs)", icon: null },
        { name: "ETL / ELT Pipelines", icon: null },
      ],
    },
    {
      category: "Bancos de Dados & Storage",
      skills: [
        {
          name: "PostgreSQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MySQL",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
        },
        { name: "NoSQL", icon: null },
        { name: "Data Lakes", icon: null },
        { name: "Vector Databases", icon: null },
      ],
    },
    {
      category: "Cloud & DevOps",
      skills: [
        {
          name: "AWS (S3, Glue, Lambda)",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
        },
        {
          name: "Docker",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
        },
        {
          name: "Git",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
        },
        {
          name: "Linux / Bash",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
        },
      ],
    },
    {
      category: "Frontend & Visualização",
      skills: [
        {
          name: "ReactJS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
        },
        {
          name: "Tailwind CSS",
          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
        },
        { name: "Power BI", icon: null },
      ],
    },
  ];

  return (
    <div className="col-span-1 md:col-span-3 bg-[#111] border border-neutral-800 rounded-3xl p-8 shadow-lg">
      <h3 className="text-2xl font-bold text-white mb-8">Stack Tecnológico</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {techStack.map((group) => (
          <div key={group.category}>
            <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">
              {group.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((tech) => (
                <span
                  key={tech.name}
                  className="px-3 py-1.5 bg-neutral-900/50 border border-neutral-800 rounded-lg text-sm font-medium text-neutral-300 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-colors cursor-default flex items-center gap-2"
                >
                  {/* Renderiza o ícone apenas se ele existir */}
                  {tech.icon && (
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="w-4 h-4 object-contain"
                    />
                  )}
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
