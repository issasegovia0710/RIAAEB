// frontend/src/Noticias.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Search } from 'lucide-react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import SiteBackground from './components/ui/SiteBackground.jsx';
import NewsModal from './components/ui/NewsModal.jsx';
import { getNoticias } from './lib/api.js';

function formatoFecha(fecha) {
  try {
    return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return fecha; }
}

export default function Noticias() {
  const [noticias, setNoticias] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [abierta, setAbierta] = useState(null);
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('Todas');

  useEffect(() => {
    window.scrollTo(0, 0);
    getNoticias()
      .then((data) => { setNoticias(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  const categorias = ['Todas', ...Array.from(new Set(noticias.map((n) => n.categoria).filter(Boolean)))];
  const filtradas = noticias.filter((n) => {
    const okCat = cat === 'Todas' || n.categoria === cat;
    const txt = `${n.titulo} ${n.extracto}`.toLowerCase();
    const okQ = !q || txt.includes(q.toLowerCase());
    return okCat && okQ;
  });

  return (
    <>
      <SiteBackground />
      <Header />
      <main className="relative min-h-screen pt-32">
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <Link to="/#noticias" className="inline-flex items-center gap-2 text-sm font-600 text-primary-500 hover:text-primary-600">
            <ArrowLeft size={16} /> Volver al inicio
          </Link>

          <div className="mt-6">
            <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary-500">
              <span className="h-px w-6 bg-primary-400" /> Historial de noticias
            </p>
            <h1 className="font-display text-4xl font-700 leading-tight text-ink sm:text-5xl">Todas las noticias</h1>
            <p className="mt-3 max-w-2xl text-lg text-slate-500">
              El archivo completo de comunicados, eventos, publicaciones y convocatorias de la Red.
            </p>
          </div>

          {/* Buscador + filtros */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar noticia…"
                className="w-full rounded-xl border border-line bg-white py-2.5 pl-9 pr-3 text-sm text-ink outline-none transition-colors placeholder:text-slate-400 focus:border-primary-400"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categorias.map((c) => (
                <button key={c} onClick={() => setCat(c)}
                  className={`rounded-full px-3 py-1.5 text-xs font-600 transition-all ${cat === c ? 'bg-primary-500 text-white' : 'border border-line bg-white text-slate-500 hover:border-primary-300 hover:text-primary-600'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Listado */}
          <div className="mt-10">
            {estado === 'cargando' && (
              <div className="grid gap-4 sm:grid-cols-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-36 animate-pulse rounded-2xl border border-line bg-white" />
                ))}
              </div>
            )}
            {estado === 'error' && (
              <p className="rounded-xl border border-primary-200 bg-primary-50 p-6 text-sm text-primary-700">
                No pudimos cargar las noticias. Verifica que el backend esté en ejecución.
              </p>
            )}
            {estado === 'listo' && (
              filtradas.length === 0 ? (
                <p className="rounded-xl border border-line bg-white p-6 text-sm text-slate-500">
                  No hay noticias que coincidan con tu búsqueda.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {filtradas.map((n) => (
                    <button key={n.id} onClick={() => setAbierta(n)}
                      className="spotlight group rounded-2xl border border-line bg-white p-5 text-left shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white">
                          <Tag size={10} /> {n.categoria}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
                          <Calendar size={11} /> {formatoFecha(n.fecha)}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-700 leading-snug text-ink transition-colors group-hover:text-primary-600">{n.titulo}</h3>
                      <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-slate-500">{n.extracto}</p>
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      </main>
      <Footer />
      {abierta && <NewsModal noticia={abierta} onClose={() => setAbierta(null)} />}
    </>
  );
}
