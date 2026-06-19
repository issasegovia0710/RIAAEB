// frontend/src/components/News.jsx
import { useEffect, useState } from 'react';
import { Calendar, History, X, ArrowRight } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import Spotlight from './ui/Spotlight.jsx';
import { getNoticias } from '../lib/api.js';

function formatoFecha(fecha) {
  try {
    return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return fecha; }
}

export default function News() {
  const [noticias, setNoticias] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [historial, setHistorial] = useState(false);

  useEffect(() => {
    getNoticias()
      .then((data) => { setNoticias(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  useEffect(() => {
    document.body.style.overflow = historial ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [historial]);

  const recientes = noticias.slice(0, 5);

  return (
    <section id="noticias" className="relative overflow-hidden border-t border-line py-24">
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitle
          index="03"
          eyebrow="Noticias"
          title="Lo último de la Red"
          subtitle="Las publicaciones más recientes en una línea de tiempo. Abre el historial para ver todas."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[260px_1fr]">
          {/* Historial (izquierda) */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Spotlight className="rounded-2xl border border-line bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-lift">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-50 text-primary-500">
                <History size={20} />
              </span>
              <h3 className="mt-4 font-display text-lg font-700 text-ink">Historial</h3>
              <p className="mt-1 text-sm text-slate-500">
                Consulta el archivo completo de comunicados, eventos y convocatorias.
              </p>
              <button
                onClick={() => setHistorial(true)}
                disabled={estado !== 'listo'}
                className="btn-shine group mt-4 inline-flex items-center gap-2 rounded-xl border border-line bg-soft px-4 py-2.5 text-sm font-600 text-ink transition-all hover:border-primary-400 hover:text-primary-600 hover:shadow-card disabled:opacity-50"
              >
                Ver todo ({noticias.length})
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Spotlight>
          </div>

          {/* Línea de tiempo (derecha) */}
          <div className="relative">
            {estado === 'cargando' && (
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 animate-pulse rounded-2xl border border-line bg-white" />
                ))}
              </div>
            )}
            {estado === 'error' && (
              <p className="rounded-xl border border-primary-200 bg-primary-50 p-6 text-sm text-primary-700">
                No pudimos cargar las noticias. Verifica que el backend esté en ejecución.
              </p>
            )}
            {estado === 'listo' && (
              <ol className="relative ml-3 border-l border-line">
                {recientes.map((n) => (
                  <li key={n.id} className="relative mb-8 pl-8">
                    <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-primary-500 shadow-[0_0_12px_rgba(225,29,58,.5)]" />
                    <Spotlight className="group rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift">
                      <div className="flex items-center gap-3">
                        <span className="rounded-full bg-primary-500 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white">
                          {n.categoria}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-400">
                          <Calendar size={12} /> {formatoFecha(n.fecha)}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-lg font-700 leading-snug text-ink group-hover:text-primary-600">
                        {n.titulo}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{n.extracto}</p>
                    </Spotlight>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>

      {/* Panel de historial completo */}
      {historial && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="animate-overlay-in absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={() => setHistorial(false)} />
          <div className="animate-modal-in relative z-10 h-full w-full max-w-2xl overflow-y-auto border-l border-line bg-soft p-7">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-500">Historial</p>
                <h3 className="font-display text-2xl font-700 text-ink">Todas las noticias</h3>
              </div>
              <button onClick={() => setHistorial(false)} aria-label="Cerrar"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-slate-500 transition-colors hover:border-primary-400 hover:text-primary-600">
                <X size={18} />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {noticias.map((n) => (
                <article key={n.id} className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift">
                  <div className="relative h-36 overflow-hidden">
                    <img src={n.imagen_url} alt={n.titulo} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                    <span className="absolute left-3 top-3 rounded-full bg-primary-500 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">
                      {n.categoria}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="font-mono text-[11px] text-slate-400">{formatoFecha(n.fecha)}</p>
                    <h4 className="mt-1 font-display text-sm font-700 leading-snug text-ink">{n.titulo}</h4>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{n.extracto}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
