import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isHovered, setIsHovered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mensagem enviada com sucesso, ${formData.name}!`);
    setFormData({ name: '', email: '', message: '' });
  };

  // Estilo base para os blocos de contato
  const contactCardStyle = "flex items-center gap-5 p-5 bg-[#111]/80 backdrop-blur-sm border border-neutral-800/60 rounded-2xl text-neutral-400 hover:text-white hover:bg-[#151515] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl group cursor-pointer";

  return (
    <div className="relative w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center py-12 px-6 overflow-hidden">
      
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex flex-col items-center text-center mb-16">
          
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-white">
            Vamos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">construir</span> algo juntos.
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-5xl mx-auto leading-relaxed">
            Seja para uma nova oportunidade, um projeto desafiador ou apenas para trocar ideias sobre código e arquitetura, minha caixa de entrada está aberta.
          </p>
        </div>

        {/* Grid Dividido */}
        <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-16">
          
          {/* COLUNA ESQUERDA: Cards de Contato Sociais */}
          <div className="lg:col-span-2 flex flex-col justify-center space-y-8">
            
            {/* E-mail */}
            <a href="mailto:gabrieldebonis@gmail.com" className={`${contactCardStyle} hover:border-emerald-500/30 hover:shadow-emerald-500/5`}>
              <div className="p-4 rounded-xl bg-neutral-900 group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-all duration-500">
                <svg className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">E-mail Direto</p>
                <p className="font-semibold text-white text-lg">gabrieldebonis@gmail.com</p>
              </div>
            </a>

            {/* LinkedIn */}
            <a href="https://www.linkedin.com/in/gabrieldebonis/" target="_blank" rel="noreferrer" className={`${contactCardStyle} hover:border-[#0A66C2]/30 hover:shadow-[#0A66C2]/5`}>
              <div className="p-4 rounded-xl bg-neutral-900 group-hover:bg-[#0A66C2]/20 group-hover:text-[#0A66C2] transition-all duration-500">
                <svg className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 21.227.792 22 1.771 22h20.451C23.2 22 24 21.227 24 20.271V1.729C24 .774 23.2 0 22.225 0z"/></svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">LinkedIn</p>
                <p className="font-semibold text-white text-lg">in/gabrieldebonis</p>
              </div>
            </a>

            {/* GitHub */}
            <a href="https://github.com/GabrielBonis" target="_blank" rel="noreferrer" className={`${contactCardStyle} hover:border-white/30 hover:shadow-white/5`}>
              <div className="p-4 rounded-xl bg-neutral-900 group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
                 <svg className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23 .957-.266 1.983-.399 3.003-.404 1.02.005 2.047.133 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">GitHub</p>
                <p className="font-semibold text-white text-lg">GabrielBonis</p>
              </div>
            </a>

            {/* WhatsApp (NOVO!) */}
            <a href="https://wa.me/5511933868414" target="_blank" rel="noreferrer" className={`${contactCardStyle} hover:border-[#25D366]/30 hover:shadow-[#25D366]/5`}>
              <div className="p-4 rounded-xl bg-neutral-900 group-hover:bg-[#25D366]/20 group-hover:text-[#25D366] transition-all duration-500">
                 <svg className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 .002 5.383.002 12.029c0 2.127.552 4.204 1.6 6.035L.052 24l6.096-1.598c1.78.951 3.791 1.452 5.881 1.452 6.645 0 12.026-5.382 12.026-12.029C24.055 5.383 18.675 0 12.031 0zm3.896 17.228c-.595 1.677-3.411 1.772-4.706 1.554-1.218-.206-3.868-1.59-5.463-3.262-1.745-1.83-2.617-3.69-2.585-5.641.033-2.071 1.134-3.132 1.533-3.564.398-.432 1.05-.515 1.416-.515.366 0 .616.017.899.683.283.666 1.032 2.513 1.115 2.68.083.166.166.382.033.649-.133.266-.233.416-.432.665-.183.233-.4.516-.566.682-.183.183-.383.383-.166.749.216.366.982 1.614 2.113 2.628 1.463 1.314 2.729 1.714 3.095 1.88.366.166.616.149.832-.1.216-.25 1.015-1.181 1.281-1.58.266-.399.582-.316.898-.2.316.116 2.013.948 2.363 1.131.349.183.582.283.666.433.083.15.083.849-.233 1.714z"/></svg>
              </div>
              <div>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-1">WhatsApp</p>
                <p className="font-semibold text-white text-lg">+55 (11) 93386-8414</p>
              </div>
            </a>
          </div>

          {/* COLUNA DIREITA: Formulário "Glassmorphism" */}
          <div className="lg:col-span-3">
            <form 
              onSubmit={handleSubmit} 
              className="bg-[#111]/80 backdrop-blur-xl border border-neutral-800/60 rounded-[2rem] p-8 md:p-10 shadow-2xl flex flex-col gap-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-2xl font-bold text-white">Envie uma Mensagem</h3>
              </div>
              
              {/* Inputs com estilo fosco */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-neutral-500 pl-1">Seu Nome</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    placeholder="Ex: João Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-[#0a0a0a]/50 border border-neutral-800 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-neutral-700"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-neutral-500 pl-1">Seu E-mail</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    placeholder="exemplo@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="bg-[#0a0a0a]/50 border border-neutral-800 text-white rounded-xl px-5 py-3.5 outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-neutral-700"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-neutral-500 pl-1">Sobre o que quer falar?</label>
                <textarea 
                  id="message"
                  required
                  rows={4}
                  placeholder="Escreva sua mensagem aqui..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="bg-[#0a0a0a]/50 border border-neutral-800 text-white rounded-xl px-5 py-4 outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none placeholder:text-neutral-700 custom-scrollbar"
                ></textarea>
              </div>

              {/* Botão Glow Enviar */}
              <button 
                type="submit" 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="mt-4 relative w-full group overflow-hidden rounded-xl"
              >
                {/* Efeito luminoso animado atrás do botão */}
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-600 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-80'}`}></div>
                
                {/* Conteúdo do botão */}
                <div className="relative flex items-center justify-center gap-3 bg-[#111] m-[1px] rounded-[11px] px-6 py-4 transition-all duration-300 group-hover:bg-transparent">
                  <span className="font-bold text-white tracking-wide">Enviar Mensagem</span>
                  <svg 
                    className={`w-5 h-5 text-white transition-transform duration-300 ${isHovered ? 'translate-x-1 -translate-y-1' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </button>

            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;