// frontend/src/components/News.jsx
import { useEffect, useRef, useState } from 'react';
import { Calendar, History, X, Tag } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { getNoticias } from '../lib/api.js';

function formatoFecha(fecha) {
  try {
    return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch { return fecha; }
}

/* Tarjeta de noticia (solo texto) que entra con animación al ser visible. */
function Tarjeta({ n, lado, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const izq = lado === 'izq';
  const trans = visible
    ? 'translate-x-0 translate-y-0 opacity-100 rotate-0'
    : `${izq ? '-translate-x-16' : 'translate-x-16'} translate-y-6 opacity-0 ${izq ? '-rotate-2' : 'rotate-2'}`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${i * 0.08}s` }}
      className={`spotlight group relative w-full max-w-md rounded-2xl border border-line bg-white p-5 shadow-card transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift ${trans}`}
    >
      {/* Conector hacia la carretera */}
      <span className={`absolute top-1/2 hidden h-px w-8 -translate-y-1/2 bg-gradient-to-r from-primary-400 to-transparent md:block ${izq ? 'right-0 translate-x-full rotate-0' : 'left-0 -translate-x-full scale-x-[-1]'}`} />

      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-500 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white">
          <Tag size={11} /> {n.categoria}
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-400">
          <Calendar size={12} /> {formatoFecha(n.fecha)}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-700 leading-snug text-ink transition-colors group-hover:text-primary-600">
        {n.titulo}
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{n.extracto}</p>
    </div>
  );
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

  // Solo las 6 más recientes
  const recientes = noticias.slice(0, 6);

  return (
    <section id="noticias" className="relative overflow-hidden border-t border-line py-24">
      <div className="glow-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            index="03"
            eyebrow="Noticias"
            title="Lo último de la Red"
            subtitle="Recorre nuestras seis publicaciones más recientes a lo largo de la línea del tiempo."
          />
          <button
            onClick={() => setHistorial(true)}
            disabled={estado !== 'listo'}
            className="btn-shine group inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-600 text-ink transition-all hover:border-primary-400 hover:text-primary-600 hover:shadow-card disabled:opacity-50"
          >
            <History size={16} /> Ver historial ({noticias.length})
          </button>
        </div>

        {/* CARRETERA en perspectiva 3D */}
        <div className="relative mt-16" style={{ perspective: '1200px' }}>
          {/* Plano de la carretera que se aleja */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[min(620px,80%)] -translate-x-1/2 md:block"
               style={{ transform: 'translateX(-50%) rotateX(48deg)', transformOrigin: 'top center' }}>
            {/* superficie */}
            <div className="absolute inset-0 rounded-[40%] bg-gradient-to-b from-primary-500/12 via-primary-400/5 to-transparent" />
            {/* líneas que convergen */}
            <div className="absolute inset-0" style={{
              background: 'repeating-linear-gradient(to bottom, transparent 0, transparent 46px, rgba(225,29,58,.35) 46px, rgba(225,29,58,.35) 64px)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,.9), transparent 85%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,.9), transparent 85%)',
              clipPath: 'polygon(48% 0, 52% 0, 70% 100%, 30% 100%)',
            }} />
            {/* bordes de la carretera */}
            <div className="absolute inset-0" style={{ clipPath: 'polygon(48% 0, 48.6% 0, 31% 100%, 29% 100%)', background: 'linear-gradient(to bottom, #e11d3a, transparent)' }} />
            <div className="absolute inset-0" style={{ clipPath: 'polygon(51.4% 0, 52% 0, 71% 100%, 69% 100%)', background: 'linear-gradient(to bottom, #e11d3a, transparent)' }} />
          </div>

          {/* Eje vertical de respaldo (móvil) */}
          <div className="absolute left-[9px] top-0 h-full w-px bg-gradient-to-b from-primary-400 via-line to-transparent md:hidden" />

          {estado === 'cargando' && (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="ml-8 h-24 animate-pulse rounded-2xl border border-line bg-white md:ml-0 md:w-md" />
              ))}
            </div>
          )}
          {estado === 'error' && (
            <p className="ml-8 rounded-xl border border-primary-200 bg-primary-50 p-6 text-sm text-primary-700 md:ml-0">
              No pudimos cargar las noticias. Verifica que el backend esté en ejecución.
            </p>
          )}
          {estado === 'listo' && (
            <div className="relative space-y-8 md:space-y-12">
              {recientes.map((n, i) => {
                const izq = i % 2 === 0;
                return (
                  <div key={n.id} className="relative flex pl-8 md:pl-0">
                    {/* punto sobre la carretera (desktop) */}
                    <span className="absolute left-[9px] top-8 z-20 grid h-5 w-5 -translate-x-1/2 place-items-center rounded-full border-2 border-white bg-primary-500 shadow-[0_0_0_4px_rgba(225,29,58,0.15)] md:left-1/2" >
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </span>
                    {/* tarjeta a un lado u otro */}
                    <div className={`flex w-full md:w-1/2 ${izq ? 'md:justify-end md:pr-12' : 'md:ml-auto md:justify-start md:pl-12'}`}>
                      <Tarjeta n={n} lado={izq ? 'izq' : 'der'} i={i} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Panel de historial completo (sin imágenes) */}
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
            <div className="space-y-3">
              {noticias.map((n) => (
                <article key={n.id} className="group rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-lift">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-primary-500 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-white">{n.categoria}</span>
                    <span className="font-mono text-[11px] text-slate-400">{formatoFecha(n.fecha)}</span>
                  </div>
                  <h4 className="mt-2 font-display text-base font-700 leading-snug text-ink">{n.titulo}</h4>
                  <p className="mt-1 text-sm leading-relaxed text-slate-500">{n.extracto}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
