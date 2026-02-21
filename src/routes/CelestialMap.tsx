import React, { useState, useEffect, useRef } from 'react';

const CelestialMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchingLoc, setSearchingLoc] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [mapBlob, setMapBlob] = useState<Blob | null>(null);
  
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dados, setDados] = useState({
    lat: -23.55,
    lon: -46.63,
    date: new Date().toISOString().split('T')[0],
    title: "O NASCER DE UMA ESTRELA"
  });

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounce para busca de endereço
  useEffect(() => {
    const timer = setTimeout(() => {
      if (address.length > 3 && !isManualMode) fetchSuggestions();
    }, 600);
    return () => clearTimeout(timer);
  }, [address]);

  const fetchSuggestions = async () => {
    setSearchingLoc(true);
    try {
      const response = await fetch(`https://astro.gbonis.com.br/geocode?q=${encodeURIComponent(address)}`);
      const data = await response.json();
      setSuggestions(Array.isArray(data) ? data : data.lat ? [data] : []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erro ao buscar sugestões");
    } finally {
      setSearchingLoc(false);
    }
  };

  const selectSuggestion = (s: any) => {
    setDados({ ...dados, lat: parseFloat(s.lat), lon: parseFloat(s.lon) });
    setAddress(s.display_name);
    setShowSuggestions(false);
  };

  const generateMap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("https://astro.gbonis.com.br/sky-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });
      const blob = await response.blob();
      setMapBlob(blob);
      setMapUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Erro ao processar o mapa.");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!mapBlob || !mapUrl) return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || !!navigator.share;
    if (isMobile && navigator.share) {
      const file = new File([mapBlob], `mapa-${dados.date}.png`, { type: 'image/png' });
      try { await navigator.share({ title: dados.title, files: [file] }); } catch (err) {}
    } else {
      const link = document.createElement('a');
      link.href = mapUrl;
      link.download = `mapa-celestial-${dados.date}.png`;
      link.click();
    }
  };

  // Estilos reutilizáveis
  const glassPanel = "bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_0_40px_rgba(0,0,0,0.5)]";
  const inputBase = "bg-black/40 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-neutral-600";

  return (
    <div className="relative w-full min-h-screen bg-[#020205] text-white font-sans selection:bg-blue-500/30">
      
      {/* 1. TEXTURA DE FUNDO (Nebulosa e Estrelas) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] opacity-40 mix-blend-screen"
             style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #1e3a8a 0%, transparent 40%), radial-gradient(circle at 80% 70%, #581c87 0%, transparent 40%)' }}>
        </div>
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-24">
        
        {/* HEADER */}
        <header className="mb-20 text-center space-y-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
            Mapa <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]">Celestial</span>.
          </h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LADO ESQUERDO: PARÂMETROS */}
          <div className="lg:col-span-5">
            <div className={`${glassPanel} p-10 relative overflow-hidden group`}>
              {/* Efeito de brilho na borda */}
              <div className="absolute inset-0 border border-blue-500/20 rounded-[2.5rem] pointer-events-none group-hover:border-blue-500/40 transition-colors"></div>
              
              <form onSubmit={generateMap} className="space-y-8">
                <div className="flex justify-between items-end">
                  <h2 className="text-2xl font-bold tracking-tight">Parâmetros</h2>
                  <button type="button" onClick={() => setIsManualMode(!isManualMode)} className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-400 hover:text-white transition-colors">
                    {isManualMode ? "Busca Inteligente" : "Coordenadas Manuais"}
                  </button>
                </div>

                <div className="space-y-6">
                  {!isManualMode ? (
                    <div className="flex flex-col gap-3 relative" ref={dropdownRef}>
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Localização</label>
                      <div className="relative">
                        <input type="text" placeholder="Ex: Avenida Paulista, SP" value={address} onChange={(e) => setAddress(e.target.value)} className={`${inputBase} pr-14 w-full`} />
                        <div className="absolute right-5 top-1/2 -translate-y-1/2 text-blue-500">
                          {searchingLoc ? <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div> : 
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                          }
                        </div>
                      </div>

                      {showSuggestions && suggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-3 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                          {suggestions.map((s, i) => (
                            <button key={i} type="button" onClick={() => selectSuggestion(s)} className="w-full text-left px-5 py-4 text-xs text-neutral-400 hover:bg-blue-600/20 hover:text-white transition-colors border-b border-white/5 last:border-none">
                              {s.display_name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Latitude</label>
                        <input type="number" step="any" value={dados.lat} onChange={(e) => setDados({...dados, lat: parseFloat(e.target.value)})} className={inputBase} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Longitude</label>
                        <input type="number" step="any" value={dados.lon} onChange={(e) => setDados({...dados, lon: parseFloat(e.target.value)})} className={inputBase} />
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Data do Evento</label>
                    <input type="date" value={dados.date} onChange={(e) => setDados({...dados, date: e.target.value})} className={`${inputBase} w-full [color-scheme:dark]`} />
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Título Personalizado</label>
                    <input type="text" value={dados.title} onChange={(e) => setDados({...dados, title: e.target.value})} className={`${inputBase} w-full`} />
                  </div>
                </div>

                <button type="submit" disabled={loading} className="w-full group relative py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.2em] text-sm overflow-hidden transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  {loading ? "Processando..." : "Gerar Mapa Estelar"}
                </button>
              </form>
            </div>
          </div>

          {/* LADO DIREITO: PREVIEW */}
          <div className="lg:col-span-7 flex flex-col items-center gap-10">
            <div className={`${glassPanel} p-4 w-full aspect-[4/5] max-w-[550px] relative group overflow-hidden`}>
              {/* Moldura de luz interna */}
              <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_60px_rgba(59,130,246,0.2)] pointer-events-none"></div>
              
              <div className="w-full h-full bg-black/40 rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                {loading && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-6">
                    <div className="w-20 h-20 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin shadow-[0_0_30px_rgba(59,130,246,0.3)]"></div>
                    <p className="text-blue-400 font-black text-xs uppercase tracking-[0.4em] animate-pulse">Sincronizando Astros</p>
                  </div>
                )}

                {mapUrl ? (
                  <img src={mapUrl} alt="Mapa Estelar" className="w-full h-full object-contain animate-in fade-in zoom-in duration-1000" />
                ) : (
                  <div className="text-center space-y-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <svg className="w-20 h-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                    <p className="font-light tracking-widest uppercase text-sm">Aguardando coordenadas</p>
                  </div>
                )}
              </div>
            </div>

            {/* BOTÃO DE AÇÃO PRINCIPAL */}
            {mapUrl && !loading && (
              <button 
                onClick={handleAction}
                className="w-full max-w-[550px] bg-white text-black py-6 rounded-3xl flex items-center justify-center gap-4 hover:bg-blue-50 transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] group"
              >
                <svg className="w-6 h-6 group-hover:bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <span className="font-black uppercase tracking-[0.3em] text-sm">
                  {( /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ) ? "Compartilhar Mapa" : "Baixar Mapa (PNG)"}
                </span>
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default CelestialMap;