import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

const CelestialMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchingLoc, setSearchingLoc] = useState(false);
  const [activeMode, setActiveMode] = useState<'address' | 'coords' | 'map'>('address');
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  const [mapBlob, setMapBlob] = useState<Blob | null>(null);

  const [dados, setDados] = useState({
    lat: -23.5505,
    lon: -46.6333,
    date: new Date().toISOString().split('T')[0],
    title: "O NASCER DE UMA ESTRELA"
  });

  const dropdownRef = useRef<HTMLDivElement>(null);
  const fetchSuggestions = async (query: string) => {
    if (query.length < 3) return;
    setSearchingLoc(true);
    try {
      const response = await fetch(`https://astro.gbonis.com.br/geocode?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error("Erro na rede");
      const data = await response.json();
      setSuggestions(Array.isArray(data) ? data : data.lat ? [data] : []);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Erro no geocode:", error);
    } finally {
      setSearchingLoc(false);
    }
  };

  // Debounce para não sobrecarregar a API enquanto digita
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeMode === 'address' && address.length > 3 && showSuggestions) {
        fetchSuggestions(address);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [address, activeMode, showSuggestions]);

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

  const handleMapClick = (e: any) => {
    const newLat = e.detail.latLng.lat;
    const newLon = e.detail.latLng.lng;
    setDados(prev => ({ 
      ...prev, 
      lat: Number(newLat.toFixed(6)), 
      lon: Number(newLon.toFixed(6)) 
    }));
  };

  const selectAddress = (s: any) => {
    setDados(prev => ({
      ...prev,
      lat: parseFloat(s.lat),
      lon: parseFloat(s.lon)
    }));
    setAddress(s.display_name);
    setShowSuggestions(false); // Importante: Limpa para evitar novo fetch imediato
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
      if (!response.ok) throw new Error("Falha ao gerar mapa");
      const blob = await response.blob();
      setMapBlob(blob);
      setMapUrl(URL.createObjectURL(blob));
    } catch (error) {
      alert("Houve um erro ao processar o seu mapa estelar. Tente novamente. ");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!mapBlob || !mapUrl) return;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || !!navigator.share;
    if (isMobile && navigator.share) {
      const file = new File([mapBlob], `mapa-${dados.date}.png`, { type: 'image/png' });
      try {
        await navigator.share({ title: dados.title, files: [file] });
      } catch (err) {
        console.log("Compartilhamento cancelado", err);
      }
    } else {
      const link = document.createElement('a');
      link.href = mapUrl;
      link.download = `mapa-celestial-${dados.date}.png`;
      link.click();
    }
  };

  // Estilos Space Premium
  const glassPanel = "bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden";
  const inputBase = "bg-black/40 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition-all placeholder:text-neutral-600 w-full";
  const tabBtn = (mode: string) => `flex-1 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${activeMode === mode ? 'bg-blue-600 text-white shadow-inner' : 'bg-transparent text-neutral-500 hover:text-neutral-300'}`;

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
      <div className="relative w-full min-h-screen bg-[#020205] text-white overflow-hidden pb-20">
        
        {/* Background Decorativo (Glows) */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-30"
             style={{ backgroundImage: 'radial-gradient(circle at 20% 30%, #1e3a8a 0%, transparent 40%), radial-gradient(circle at 80% 70%, #581c87 0%, transparent 40%)' }}>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16">
          <header className="mb-16 text-center">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter">
              Mapa <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-300 to-blue-600 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">Celestial</span>.
            </h1>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* PAINEL DE CONTROLE (Lado Esquerdo) */}
            <div className="lg:col-span-5 space-y-6">
              <div className={glassPanel}>
                
                {/* Seleção de Modo (Tabs) */}
                <div className="flex border-b border-white/10">
                  <button onClick={() => { setActiveMode('address'); setShowSuggestions(true); }} className={tabBtn('address')}>Endereço</button>
                  <button onClick={() => setActiveMode('coords')} className={tabBtn('coords')}>Coordenadas</button>
                  <button onClick={() => setActiveMode('map')} className={tabBtn('map')}>Mapa</button>
                </div>

                <form onSubmit={generateMap} className="p-8 space-y-8">
                  
                  {/* CONTEÚDO DINÂMICO DOS MODOS */}
                  <div className="min-h-[140px] flex items-end">
                    {activeMode === 'address' && (
                      <div className="w-full space-y-3 relative" ref={dropdownRef}>
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Rua ou Cidade</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            placeholder="Ex: Av. Paulista, São Paulo" 
                            value={address} 
                            onChange={(e) => { setAddress(e.target.value); setShowSuggestions(true); }} 
                            className={inputBase} 
                          />
                          {searchingLoc && <div className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                        </div>
                        {showSuggestions && suggestions.length > 0 && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50">
                            {suggestions.map((s, i) => (
                              <button 
                                key={i} 
                                type="button" 
                                onClick={() => selectAddress(s)} 
                                className="w-full text-left px-5 py-4 text-xs text-neutral-400 hover:bg-blue-600/20 hover:text-white transition-colors border-b border-white/5 last:border-none"
                              >
                                {s.display_name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {activeMode === 'coords' && (
                      <div className="grid grid-cols-2 gap-4 w-full animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Latitude</label>
                          <input type="number" step="0.000001" value={dados.lat} onChange={(e) => setDados(prev => ({...prev, lat: parseFloat(e.target.value) || 0}))} className={inputBase} />
                        </div>
                        <div className="space-y-3">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Longitude</label>
                          <input type="number" step="0.000001" value={dados.lon} onChange={(e) => setDados(prev => ({...prev, lon: parseFloat(e.target.value) || 0}))} className={inputBase} />
                        </div>
                      </div>
                    )}

                    {activeMode === 'map' && (
                      <div className="w-full space-y-3 animate-in zoom-in-95 duration-500">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">Toque no mapa para selecionar</label>
                        <div className="h-64 rounded-3xl overflow-hidden border border-white/10 relative shadow-inner">
                          <Map
                            center={{lat: dados.lat, lng: dados.lon}}
                            zoom={13}
                            gestureHandling={'greedy'}
                            disableDefaultUI={true}
                            mapId={'bf50a8a655974052'}
                            onClick={handleMapClick}
                          >
                            <Marker position={{lat: dados.lat, lng: dados.lon}} />
                          </Map>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CONFIGURAÇÕES GERAIS */}
                  <div className="space-y-6 pt-6 border-t border-white/5">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Data do Evento</label>
                      <input type="date" value={dados.date} onChange={(e) => setDados(prev => ({...prev, date: e.target.value}))} className={`${inputBase} [color-scheme:dark]`} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Título Personalizado</label>
                      <input type="text" value={dados.title} onChange={(e) => setDados(prev => ({...prev, title: e.target.value}))} className={inputBase} />
                    </div>
                  </div>

                  <button type="submit" disabled={loading} className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-[0.2em] text-sm hover:bg-blue-500 transition-all active:scale-[0.97] disabled:opacity-50 shadow-lg shadow-blue-600/20">
                    {loading ? "Sincronizando Astros..." : "Gerar Mapa Estelar"}
                  </button>
                </form>
              </div>
            </div>

            {/* PREVIEW DO MAPA (Lado Direito) */}
            <div className="lg:col-span-7 flex flex-col items-center gap-10">
              <div className={`${glassPanel} p-4 w-full aspect-[4/5] max-w-[550px] relative group overflow-hidden`}>
                <div className="w-full h-full bg-black/40 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-inner">
                  
                  {loading && (
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-20 flex flex-col items-center justify-center gap-6">
                      <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin shadow-[0_0_20px_rgba(59,130,246,0.2)]"></div>
                      <p className="text-blue-400 font-bold text-[10px] uppercase tracking-[0.4em] animate-pulse text-center">Cruzando dados do catálogo Hipparcos</p>
                    </div>
                  )}

                  {mapUrl ? (
                    <img src={mapUrl} alt="Celestial Preview" className="w-full h-full object-contain animate-in fade-in zoom-in duration-1000" />
                  ) : (
                    <div className="text-center opacity-20 group-hover:opacity-40 transition-opacity flex flex-col items-center gap-4">
                      <svg className="w-20 h-20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                      <p className="text-xs font-light uppercase tracking-[0.3em]">Aguardando coordenadas</p>
                    </div>
                  )}
                </div>
              </div>

              {mapUrl && !loading && (
                <button 
                  onClick={handleAction}
                  className="w-full max-w-[550px] bg-white text-black py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-50 transition-all flex items-center justify-center gap-4 shadow-2xl hover:shadow-white/20 active:scale-95"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  <span className="tracking-[0.1em]">
                    { ( /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ) ? "Compartilhar Mapa" : "Baixar Alta Definição (PNG)" }
                  </span>
                </button>
              )}
            </div>

          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default CelestialMap;