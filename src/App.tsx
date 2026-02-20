import { BrowserRouter, Routes, Route, NavLink, Link } from 'react-router-dom';
import AboutPage from './routes/AboutPage';
import ContactPage from './routes/ContactPage'; // IMPORTANTE: Ajuste o caminho conforme sua pasta
import ProjectsPage from './routes/ProjectsPage';
import Terminal from './routes/Terminal';

function App() {
  // Função auxiliar para controlar a cor do link ativo vs inativo
  const navLinkStyle = ({ isActive }: { isActive: boolean }) =>
    `transition-colors duration-200 font-medium ${
      isActive ? "text-white" : "text-neutral-400 hover:text-white"
    }`;

  return (
    <BrowserRouter>
      {/* Navbar Premium Dark */}
      <nav className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-neutral-800 z-50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          
          <Link to="/" className="text-xl font-bold tracking-tight text-white flex items-center gap-1 group">
            <span className="text-blue-500 group-hover:text-emerald-400 transition-colors">&gt;</span>
            gbonis<span className="text-neutral-600">.dev</span>
            <span className="w-2.5 h-5 bg-blue-500 animate-pulse ml-1 opacity-75"></span>
          </Link>

          <div className="flex items-center gap-8 text-sm">
            <NavLink to="/" className={navLinkStyle}>Sobre</NavLink>
            <NavLink to="/projects" className={navLinkStyle}>Projetos</NavLink>
            <NavLink to="/contact" className={navLinkStyle}>Contato</NavLink>
            
            <NavLink 
              to="/terminal" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-lg font-mono text-xs border transition-all duration-300 flex items-center gap-2 hidden md:flex ${
                  isActive 
                    ? "bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]" 
                    : "bg-[#111] border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white"
                }`
              }
            >
              $_ console
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <div className="pt-20 min-h-screen bg-[#0a0a0a] flex flex-col"> 
        <Routes>
          <Route path="/" element={<AboutPage />} />
          <Route path="/terminal" element={<Terminal />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/projects" element={<ProjectsPage/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;