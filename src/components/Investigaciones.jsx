// frontend/src/components/Investigaciones.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { ExternalLink, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import Spotlight from './ui/Spotlight.jsx';
import { getInvestigaciones } from '../lib/api.js';

export default function Investigaciones() {
  const [items, setItems] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [activo, setActivo] = useState(0);
  const [offset, setOffset] = useState(0);
  const trackRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    getInvestigaciones()
      .then((data) => { setItems(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  // Alinea la tarjeta activa al borde izquierdo (responsive-safe)
  const recalcular = useCallback(() => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;
    const child = track.children[activo];
    if (!child) return;
    // No dejar hueco al final: limita el desplazamiento máximo
    const maxScroll = track.scrollWidth - track.clientWidth;
    setOffset(Math.min(child.offsetLeft, Math.max(0, maxScroll)));
  }, [activo]);

  useEffect(() => { recalcular(); }, [recalcular, items.length]);
  useEffect(() => {
    window.addEventListener('resize', recalcular);
    return () => window.removeEventListener('resize', recalcular);
  }, [recalcular]);

  // autoplay
  useEffect(() => {
    if (estado !== 'listo' || items.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    autoRef.current = setInterval(() => setActivo((v) => (v + 1) % items.length), 4500);
    return () => clearInterval(autoRef.current);
  }, [estado, items.length]);

  const ir = (i) => {
    setActivo((i + items.length) % items.length);
    clearInterval(autoRef.current);
  };

  return (
    <section id="investigaciones" className="relative overflow-hidden border-t border-line py-24">
      <div className="glow-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle
            index="02"
            eyebrow="Investigaciones"
            title="Publicaciones y recursos abiertos"
            subtitle="Artículos, conjuntos de datos y reportes técnicos. Desliza el carrusel y abre cada recurso."
          />
          {estado === 'listo' && items.length > 1 && (
            <div className="flex gap-2">
              <button onClick={() => ir(activo - 1)} aria-label="Anterior"
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/60 text-slate-300 transition-all hover:border-primary-400 hover:text-white hover:shadow-glow">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => ir(activo + 1)} aria-label="Siguiente"
                className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-surface/60 text-slate-300 transition-all hover:border-primary-400 hover:text-white hover:shadow-glow">
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="mt-12">
          {estado === 'cargando' && (
            <div className="grid gap-5 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-56 animate-pulse rounded-2xl border border-line bg-surface/60" />
              ))}
            </div>
          )}

          {estado === 'error' && (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
              No pudimos cargar las investigaciones. Verifica que el backend esté en ejecución.
            </p>
          )}

          {estado === 'listo' && (
            <>
              <div className="overflow-hidden">
                <div
                  ref={trackRef}
                  className="flex transition-transform duration-700"
                  style={{ transform: `translateX(-${offset}px)`, transitionTimingFunction: 'cubic-bezier(.22,1,.36,1)' }}
                >
                  {items.map((inv) => (
                    <div key={inv.id} className="w-full shrink-0 px-2.5 sm:w-1/2 lg:w-1/3">
                      <Spotlight
                        as="a"
                        href={inv.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary-400/60 hover:shadow-[0_18px_50px_rgba(56,225,255,.18)]"
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-base/60 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-primary-300">
                            <FileText size={12} /> {inv.tipo}
                          </span>
                          <span className="font-mono text-xs text-slate-500">{inv.anio}</span>
                        </div>
                        <h3 className="font-display text-lg font-700 leading-snug text-white">{inv.titulo}</h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-400">{inv.resumen}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                          <span className="truncate pr-2 text-xs text-slate-500">{inv.autores}</span>
                          <span className="inline-flex shrink-0 items-center gap-1.5 text-sm font-600 text-primary-400">
                            Ver recurso
                            <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </Spotlight>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-2">
                {items.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => ir(i)}
                    aria-label={`Ir a la investigación ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activo ? 'w-8 bg-primary-400' : 'w-2.5 bg-line hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
