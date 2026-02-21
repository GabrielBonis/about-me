import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

interface Suggestion {
  display_name: string;
  lat: number;
  lon: number;
}

const CelestialMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'address' | 'coords' | 'map'>('address');
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  
  const skipFetch = useRef(false);
  
  const [mapCenter, setMapCenter] = useState({ lat: -23.5505, lng: -46.6333 });
  
  // Usando number | string para permitir que o usuário apague (fique vazio) sem bugar com zeros
  const [dados, setDados] = useState<{lat: number | string, lon: number | string, date: string, title: string}>({
    lat: -23.5505, 
    lon: -46.6333,
    date: new Date().toISOString().split('T')[0],
    title: ""
  });

  const fetchSuggestions = async (q: string) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&limit=5&accept-language=pt-BR`);
      const data = await res.json();
      
      if (data && data.length > 0) {
        const formattedSuggestions: Suggestion[] = data.map((r: any) => ({
          display_name: r.display_name,
          lat: parseFloat(r.lat),
          lon: parseFloat(r.lon)
        }));
        setSuggestions(formattedSuggestions);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error("Erro ao buscar endereço:", error);
    }
  };

  const fetchAddressFromCoords = async (lat: number, lon: number) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&accept-language=pt-BR`);
      const data = await res.json();
      
      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.village || data.address.state || "Local Desconhecido";
        const country = data.address.country || "Brasil";
        const formatado = `${city}, ${country}`.toUpperCase();
        
        skipFetch.current = true; 
        setAddress(formatado);
      } else {
        setAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
      }
    } catch (error) {
      setAddress(`${lat.toFixed(4)}, ${lon.toFixed(4)}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => { 
      if (skipFetch.current) {
        skipFetch.current = false;
        return;
      }
      if (address.length > 3 && activeMode === 'address') {
        fetchSuggestions(address); 
      }
    }, 600);
    return () => clearTimeout(timer);
  }, [address, activeMode]);

  const generateMap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const payload = {
      lat: Number(dados.lat) || 0,
      lon: Number(dados.lon) || 0,
      date: dados.date,
      title: dados.title || "O NASCER DE UMA ESTRELA"
    };

    try {
      const res = await fetch("https://astro.gbonis.com.br/sky-map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (result.url) setMapUrl(result.url);
    } catch (error) {
      console.error("Erro ao gerar mapa:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      navigator.share({ title: dados.title, url: mapUrl! });
    } else {
      window.open(mapUrl!, '_blank');
    }
  };

  // Estilos base reaproveitáveis
  const glass = "bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden relative";
  const input = "bg-white/5 border border-white/10 text-white rounded-xl px-5 py-4 outline-none focus:bg-white/10 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 w-full transition-all duration-300 placeholder:text-gray-500";
  const contactCardStyle = "group flex items-center gap-4 p-4 rounded-2xl transition-all text-white no-underline w-full mt-4";

  return (
    <APIProvider apiKey={GOOGLE_KEY}>
      {/* Background com radial gradient para dar um ar de espaço */}
      <div className="relative w-full min-h-screen bg-[#020205] text-white p-6 md:p-16 font-sans overflow-hidden">
        
        {/* Efeitos de Luz de Fundo */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-violet-600/20 rounded-full blur-[100px] pointer-events-none"></div>

        <header className="text-center mb-12 relative z-10">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">
            Mapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-500">Celestial</span>.
          </h1>
          <p className="text-gray-400 mt-4 tracking-widest text-sm uppercase font-medium">Eternize o céu de um momento especial</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start relative z-10">
          
          {/* PAINEL ESQUERDO: CONTROLES */}
          <div className="lg:col-span-5 space-y-6 sticky top-10">
            <div className={glass}>
              
              {/* Abas */}
              <div className="flex border-b border-white/10 bg-black/20">
                {(['address', 'coords', 'map'] as const).map((m) => (
                  <button 
                    key={m} 
                    onClick={() => setActiveMode(m)} 
                    className={`flex-1 py-4 text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${activeMode === m ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-inner' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                  >
                    {m === 'address' ? 'Endereço' : m === 'coords' ? 'Coordenadas' : 'Mapa'}
                  </button>
                ))}
              </div>
              
              <form onSubmit={generateMap} className="p-8 space-y-6">
                
                {activeMode === 'address' && (
                  <div className="relative animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Buscar Local</label>
                    <input 
                      value={address} 
                      onChange={(e) => {
                        setAddress(e.target.value);
                        if (e.target.value.length <= 3) setShowSuggestions(false);
                      }} 
                      className={input} 
                      placeholder="Ex: São Paulo, Brasil..." 
                    />
                    {showSuggestions && suggestions.length > 0 && (
                      <div className="absolute top-full w-full bg-[#1a1a24] border border-white/10 z-50 rounded-xl mt-2 overflow-hidden shadow-2xl">
                        {suggestions.map((s, i) => (
                          <button 
                            key={i} 
                            type="button" 
                            onClick={() => { 
                              setDados({...dados, lat: s.lat, lon: s.lon}); 
                              setMapCenter({ lat: s.lat, lng: s.lon });
                              skipFetch.current = true;
                              setAddress(s.display_name); 
                              setShowSuggestions(false); 
                              setSuggestions([]);
                            }} 
                            className="w-full text-left p-4 text-xs hover:bg-blue-600 transition-colors border-b border-white/5 last:border-0"
                          >
                            {s.display_name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                
                {activeMode === 'coords' && (
                  <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Latitude</label>
                      <input 
                        type="number" 
                        step="any" 
                        placeholder="-23.5505" 
                        value={dados.lat} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setDados({...dados, lat: val});
                          if(val) setMapCenter({ lat: parseFloat(val), lng: Number(dados.lon) });
                        }} 
                        onBlur={() => fetchAddressFromCoords(Number(dados.lat), Number(dados.lon))} 
                        className={input} 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Longitude</label>
                      <input 
                        type="number" 
                        step="any" 
                        placeholder="-46.6333" 
                        value={dados.lon} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setDados({...dados, lon: val});
                          if(val) setMapCenter({ lat: Number(dados.lat), lng: parseFloat(val) });
                        }} 
                        onBlur={() => fetchAddressFromCoords(Number(dados.lat), Number(dados.lon))} 
                        className={input} 
                      />
                    </div>
                  </div>
                )}
                
                {activeMode === 'map' && (
                  <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                     <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Toque para marcar</label>
                    <div className="h-48 rounded-xl overflow-hidden border border-white/10 relative ring-2 ring-transparent transition-all hover:ring-white/20">
                      <Map 
                        center={mapCenter} 
                        onCameraChanged={(ev) => setMapCenter(ev.detail.center)} 
                        zoom={10} 
                        mapId="DEMO_MAP_ID" 
                        gestureHandling={'greedy'} 
                        disableDefaultUI={true}
                        onClick={(e: any) => {
                          if(e.detail.latLng) {
                            const newLat = e.detail.latLng.lat;
                            const newLon = e.detail.latLng.lng;
                            
                            // Atualiza os inputs e o texto perfeitamente
                            setDados({...dados, lat: newLat, lon: newLon});
                            fetchAddressFromCoords(newLat, newLon);
                          }
                        }}
                      >
                        <AdvancedMarker position={{lat: Number(dados.lat), lng: Number(dados.lon)}} />
                      </Map>
                    </div>
                  </div>
                )}

                <div className="space-y-5 pt-2">
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Data do Evento</label>
                    <input type="date" value={dados.date} onChange={(e) => setDados({...dados, date: e.target.value})} className={input} />
                  </div>
                  <div>
                    <label className="block text-[10px] text-gray-400 uppercase tracking-widest mb-2 font-bold">Título da Arte</label>
                    <input type="text" placeholder="O NASCER DE UMA ESTRELA" value={dados.title} onChange={(e) => setDados({...dados, title: e.target.value})} className={input} />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-5 bg-white text-black hover:bg-gray-200 disabled:bg-gray-600 disabled:text-gray-400 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:-translate-y-1"
                >
                  {loading ? "Calculando Estrelas..." : "Gerar Mapa"}
                </button>
              </form>
            </div>

            {/* CARD DE DOAÇÃO MERCADO PAGO */}
            <a
              href="https://mpago.la/2rMcUC5"
              target="_blank"
              rel="noreferrer"
              className={`${contactCardStyle} border border-amber-500/20 bg-amber-500/5 hover:border-amber-500/50 hover:bg-amber-500/10 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] relative overflow-hidden`}
            >
              {/* Efeito de brilho sutil no fundo */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-2xl rounded-full"></div>

              <div className="p-3 rounded-xl bg-neutral-900 group-hover:bg-amber-500/20 text-gray-300 group-hover:text-amber-500 transition-all duration-500 z-10">
                <svg
                  className="w-6 h-6 transform group-hover:rotate-12 transition-transform duration-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v3m0 0v3m0-3h3m-3 0H9" />
                </svg>
              </div>
              
              <div className="flex flex-col z-10">
                <span className="text-sm font-bold text-amber-500">Apoie o Projeto</span>
                <span className="text-xs text-gray-400">Contribua via Mercado Pago</span>
              </div>
            </a>

          </div>

          {/* PAINEL DIREITO: RESULTADO */}
          <div className="lg:col-span-7 flex flex-col items-center gap-8 justify-center h-full">
            <div className="relative w-full aspect-[3/4] max-w-[450px] bg-[#050508] shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/5 flex items-center justify-center rounded-md overflow-hidden group">
              {mapUrl ? (
                <>
                  <img src={mapUrl} alt="Mapa Celestial Gerado" className="w-full h-full object-cover animate-in zoom-in duration-1000" />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-6 opacity-20">
                  <div className="w-24 h-24 rounded-full border-t-2 border-l-2 border-white animate-spin"></div>
                  <p className="uppercase tracking-[0.4em] text-[10px] font-bold">Aguardando coordenadas</p>
                </div>
              )}
            </div>

            {mapUrl && (
              <button 
                onClick={handleAction} 
                className="w-full max-w-[450px] bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_10px_30px_rgba(37,99,235,0.3)] transform hover:-translate-y-1"
              >
                {( /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ) ? "Compartilhar Arte" : "Download PNG"}
              </button>
            )}
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default CelestialMap;