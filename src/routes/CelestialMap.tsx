import React, { useState } from 'react';

const CelestialMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchingLoc, setSearchingLoc] = useState(false);
  const [address, setAddress] = useState("");
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  
  const [dados, setDados] = useState({
    lat: -23.55,
    lon: -46.63,
    date: new Date().toISOString().split('T')[0], // Data de hoje como padrão
    title: "O NASCER DE UMA ESTRELA"
  });

  // 1. BUSCA DE ENDEREÇO (Geocoding via seu Backend)
  const handleAddressSearch = async () => {
    if (!address) return;
    setSearchingLoc(true);
    
    try {
      // Chamando sua rota no FastAPI para evitar bloqueio de CORS do Nominatim
      const response = await fetch(
        `https://astro.gbonis.com.br/geocode?q=${encodeURIComponent(address)}`
      );
      const data = await response.json();

      if (data && data.lat && data.lon) {
        setDados((prev) => ({ ...prev, lat: data.lat, lon: data.lon }));
        // Opcional: Feedback visual no console ou em um toast
        console.log("Localização resolvida:", data.display_name);
      } else {
        alert(data.erro || "Localização não encontrada. Tente incluir a cidade ou estado.");
      }
    } catch (error) {
      console.error("Erro na busca:", error);
      alert("Erro ao conectar com o serviço de geolocalização.");
    } finally {
      setSearchingLoc(false);
    }
  };

  // 2. GERAÇÃO DO MAPA (POST para sua API Astro)
  const generateMap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch("https://astro.gbonis.com.br/sky-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (!response.ok) throw new Error("Erro ao gerar mapa");

      // Recebendo o arquivo binário .png e convertendo em URL temporária
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setMapUrl(url);
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao processar o mapa estelar.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "bg-[#0a0a0a] border border-neutral-800 text-white rounded-xl px-4 py-3 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-neutral-700 w-full";

  return (
    <div className="relative w-full max-w-6xl mx-auto px-6 pt-12 pb-20">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <header className="relative z-10 mb-12 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
          Mapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Celestial</span>.
        </h1>
        <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed font-light">
          Visualize a posição exata das estrelas e constelações em qualquer lugar do mundo e em qualquer data.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 relative z-10">
        
        {/* Painel de Configuração */}
        <div className="lg:col-span-2">
          <form onSubmit={generateMap} className="bg-[#111]/80 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl flex flex-col gap-6">
            
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Onde e Quando?
            </h3>

            {/* Busca por Endereço */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-blue-500">Buscar por Endereço ou Cidade</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ex: Avenida Paulista, São Paulo"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddressSearch())}
                  className={`${inputStyle} pr-12`} 
                />
                <button 
                  type="button"
                  onClick={handleAddressSearch}
                  disabled={searchingLoc}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-neutral-500 hover:text-white transition-colors"
                >
                  {searchingLoc ? (
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  )}
                </button>
              </div>
            </div>

            {/* Feedback das Coordenadas (Apenas Leitura) */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1 opacity-60">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Latitude</label>
                <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300">
                  {dados.lat.toFixed(4)}°
                </div>
              </div>
              <div className="flex flex-col gap-1 opacity-60">
                <label className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Longitude</label>
                <div className="bg-[#0a0a0a] border border-neutral-800 rounded-lg px-3 py-2 text-sm text-neutral-300">
                  {dados.lon.toFixed(4)}°
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Data do Evento</label>
              <input 
                type="date" 
                value={dados.date}
                onChange={(e) => setDados({...dados, date: e.target.value})}
                className={inputStyle} 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">Título no Mapa</label>
              <input 
                type="text" 
                placeholder="Ex: O dia em que nos conhecemos"
                value={dados.title}
                onChange={(e) => setDados({...dados, title: e.target.value})}
                className={inputStyle} 
              />
            </div>

            <button 
              type="submit"
              disabled={loading || searchingLoc}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-500 text-white font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-blue-500/10 active:scale-[0.98]"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                  Renderizar Mapa
                </>
              )}
            </button>
          </form>
        </div>

        {/* Quadro de Exibição */}
        <div className="lg:col-span-3 flex items-center justify-center">
          <div className="w-full aspect-[4/5] md:aspect-square max-w-[500px] bg-[#111] border border-neutral-800 rounded-3xl overflow-hidden relative shadow-2xl flex items-center justify-center group">
            
            {/* Estado Inicial */}
            {!mapUrl && !loading && (
              <div className="text-center p-12 flex flex-col items-center">
                <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center mb-6 border border-neutral-800 text-neutral-700">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h4 className="text-white font-medium mb-2">Aguardando coordenadas</h4>
                <p className="text-neutral-500 text-sm max-w-[200px]">Busque uma localização e renderize para gerar seu mapa exclusivo.</p>
              </div>
            )}

            {/* Estado de Carregamento */}
            {loading && (
              <div className="absolute inset-0 bg-[#0a0a0a]/60 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-6">
                <div className="relative">
                   <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin"></div>
                   <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400/5 rounded-full animate-ping"></div>
                </div>
                <p className="text-blue-400 font-medium animate-pulse tracking-widest text-xs uppercase">Calculando posições estelares...</p>
              </div>
            )}

            {/* Imagem Renderizada */}
            {mapUrl && (
              <img 
                src={mapUrl} 
                alt="Mapa Celestial Gerado" 
                className="w-full h-full object-contain animate-in fade-in zoom-in duration-1000"
              />
            )}
            
            {/* Botão de Download Flutuante */}
            {mapUrl && !loading && (
              <a 
                href={mapUrl} 
                download={`mapa-celestial-${dados.date}.png`}
                className="absolute bottom-8 right-8 p-4 bg-white text-black rounded-full shadow-2xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:scale-110 active:scale-95 z-30"
                title="Baixar Mapa em Alta Resolução"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CelestialMap;