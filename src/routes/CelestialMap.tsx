import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

const GOOGLE_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const CelestialMap: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [activeMode, setActiveMode] = useState<'address' | 'coords' | 'map'>('address');
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapUrl, setMapUrl] = useState<string | null>(null);
  
  const [dados, setDados] = useState({
    lat: -23.5505, lon: -46.6333,
    date: new Date().toISOString().split('T')[0],
    title: "O NASCER DE UMA ESTRELA"
  });

  const fetchSuggestions = async (q: string) => {
    const res = await fetch(`https://astro.gbonis.com.br/geocode?q=${q}`);
    const data = await res.json();
    setSuggestions(data);
    setShowSuggestions(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => { if (address.length > 3 && activeMode === 'address') fetchSuggestions(address); }, 600);
    return () => clearTimeout(timer);
  }, [address]);

  const generateMap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("https://astro.gbonis.com.br/sky-map", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    const result = await res.json();
    if (result.url) setMapUrl(result.url);
    setLoading(false);
  };

  const handleAction = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile && navigator.share) {
      navigator.share({ title: dados.title, url: mapUrl! });
    } else {
      window.open(mapUrl!, '_blank');
    }
  };

  const glass = "bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden";
  const input = "bg-black/40 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500/20 w-full transition-all";

  return (
    <APIProvider apiKey={GOOGLE_KEY}>
      <div className="relative w-full min-h-screen bg-[#020205] text-white p-6 md:p-16">
        <header className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter">Mapa <span className="text-blue-500">Celestial</span>.</h1>
        </header>

        <div className="grid lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
          <div className="lg:col-span-5 space-y-6">
            <div className={glass}>
              <div className="flex border-b border-white/10">
                {['address', 'coords', 'map'].map((m) => (
                  <button key={m} onClick={() => setActiveMode(m as any)} className={`flex-1 py-4 text-[10px] font-black uppercase tracking-widest ${activeMode === m ? 'bg-blue-600' : ''}`}>{m}</button>
                ))}
              </div>
              <form onSubmit={generateMap} className="p-8 space-y-6">
                {activeMode === 'address' && (
                  <div className="relative">
                    <input value={address} onChange={(e) => setAddress(e.target.value)} className={input} placeholder="Rua ou Cidade..." />
                    {showSuggestions && (
                      <div className="absolute top-full w-full bg-black border border-white/10 z-50 rounded-xl mt-2">
                        {suggestions.map((s, i) => (
                          <button key={i} type="button" onClick={() => { setDados({...dados, lat: parseFloat(s.lat), lon: parseFloat(s.lon)}); setAddress(s.display_name); setShowSuggestions(false); }} className="w-full text-left p-4 text-xs hover:bg-blue-600">{s.display_name}</button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {activeMode === 'coords' && (
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" step="any" value={dados.lat} onChange={(e) => setDados({...dados, lat: parseFloat(e.target.value)})} className={input} />
                    <input type="number" step="any" value={dados.lon} onChange={(e) => setDados({...dados, lon: parseFloat(e.target.value)})} className={input} />
                  </div>
                )}
                {activeMode === 'map' && (
                  <div className="h-64 rounded-2xl overflow-hidden border border-white/10">
                    <Map center={{lat: dados.lat, lng: dados.lon}} zoom={10} mapId="dark_map" onClick={(e: any) => setDados({...dados, lat: e.detail.latLng.lat, lon: e.detail.latLng.lng})}>
                      <Marker position={{lat: dados.lat, lng: dados.lon}} />
                    </Map>
                  </div>
                )}
                <input type="date" value={dados.date} onChange={(e) => setDados({...dados, date: e.target.value})} className={input} />
                <input type="text" value={dados.title} onChange={(e) => setDados({...dados, title: e.target.value})} className={input} />
                <button type="submit" className="w-full py-5 bg-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs">{loading ? "Processando..." : "Gerar Mapa"}</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center gap-8">
            <div className={`${glass} p-4 w-full aspect-[4/5] max-w-[500px] flex items-center justify-center`}>
              {mapUrl ? <img src={mapUrl} className="w-full h-full object-contain animate-in zoom-in duration-700" /> : <p className="opacity-20 uppercase tracking-widest text-xs">Aguardando...</p>}
            </div>
            {mapUrl && <button onClick={handleAction} className="w-full max-w-[500px] bg-white text-black py-6 rounded-3xl font-black uppercase tracking-widest text-xs">{( /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ) ? "Compartilhar" : "Download PNG"}</button>}
          </div>
        </div>
      </div>
    </APIProvider>
  );
};

export default CelestialMap;