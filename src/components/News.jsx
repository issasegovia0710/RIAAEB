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

/* Nodo de la línea de tiempo: aparece con animación al entrar en viewport.
   Sin imágenes: solo categoría, fecha, título y extracto. */
function Nodo({ n, lado, i }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const izq = lado === 'izq';

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] md:items-center">
      {/* Columna izquierda (desktop) */}
      <div className="hidden md:flex md:justify-end md:pr-8">
        {izq && <Tarjeta n={n} visible={visible} desde="izq" delay={i * 0.05} />}
      </div>

      {/* Eje central + punto */}
      <div className="relative flex justify-start md:justify-center">
        <span
          className={`relative z-10 mt-6 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-white bg-primary-500 shadow-[0_0_0_4px_rgba(225,29,58,0.15)] transition-all duration-500
            ${visible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>
      </div>

      {/* Columna derecha */}
      <div className="pl-6 md:pl-8">
        {/* Móvil: siempre a la derecha del eje */}
        <div className="md:hidden">
          <Tarjeta n={n} visible={visible} desde="der" delay={i * 0.05} />
        </div>
        {/* Desktop: solo si el lado es derecho */}
        <div className="hidden md:block">
          {!izq && <Tarjeta n={n} visible={visible} desde="der" delay={i * 0.05} />}
        </div>
      </div>
    </div>
  );
}

function Tarjeta({ n, visible, desde, delay }) {
  const trans = visible
    ? 'translate-x-0 opacity-100 rotate-0'
    : `${desde === 'izq' ? '-translate-x-10' : 'translate-x-10'} opacity-0`;
  return (
    <div
      style={{ transitionDelay: `${delay}s` }}
      className={`spotlight group my-4 rounded-2xl border border-line bg-white p-5 shadow-sm transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-1 hover:border-primary-300 hover:shadow-lift ${trans}`}
    >
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

  const recientes = noticias.slice(0, 6);

  return (
    <section id="noticias" className="relative overflow-hidden border-t border-line py-24">
      <div className="glow-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionTitle
            index="03"
            eyebrow="Noticias"
            title="Lo último de la Red"
            subtitle="Una línea de tiempo de nuestras publicaciones más recientes."
          />
          <button
            onClick={() => setHistorial(true)}
            disabled={estado !== 'listo'}
            className="btn-shine group inline-flex shrink-0 items-center gap-2 rounded-xl border border-line bg-white px-4 py-2.5 text-sm font-600 text-ink transition-all hover:border-primary-400 hover:text-primary-600 hover:shadow-card disabled:opacity-50"
          >
            <History size={16} /> Ver historial ({noticias.length})
          </button>
        </div>

        <div className="relative mt-14">
          {/* Eje vertical de la línea de tiempo */}
          <div className="absolute left-[9px] top-0 h-full w-px bg-gradient-to-b from-primary-400 via-line to-transparent md:left-1/2 md:-translate-x-1/2" />

          {estado === 'cargando' && (
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="ml-8 h-24 animate-pulse rounded-2xl border border-line bg-white md:ml-0" />
              ))}
            </div>
          )}
          {estado === 'error' && (
            <p className="ml-8 rounded-xl border border-primary-200 bg-primary-50 p-6 text-sm text-primary-700 md:ml-0">
              No pudimos cargar las noticias. Verifica que el backend esté en ejecución.
            </p>
          )}
          {estado === 'listo' && (
            <div className="space-y-2">
              {recientes.map((n, i) => (
                <Nodo key={n.id} n={n} i={i} lado={i % 2 === 0 ? 'izq' : 'der'} />
              ))}
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
