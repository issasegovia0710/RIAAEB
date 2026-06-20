// frontend/src/components/Investigadores.jsx
import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowUpRight, Users } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { getInvestigadores } from '../lib/api.js';

/* Tarjeta individual (estilo "perfil" con foto, datos y botón). */
function Card({ p, frente }) {
  return (
    <article
      className={`relative h-[420px] w-[300px] overflow-hidden rounded-[28px] border bg-white shadow-card transition-all duration-500
        ${frente ? 'border-primary-300' : 'border-line'}`}
    >
      {/* Foto */}
      <div className="relative h-[62%] overflow-hidden">
        <img
          src={p.foto_url}
          alt={p.nombre}
          className={`h-full w-full object-cover transition-transform duration-700 ${frente ? 'scale-100' : 'scale-105'}`}
        />
        {/* Velo rojo solo en la del frente */}
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${frente ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-primary-600/30 via-transparent to-transparent" />
        </div>
        {p.enlace && (
          <a
            href={p.enlace}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Perfil de ${p.nombre}`}
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-primary-500 shadow-sm backdrop-blur transition-all hover:bg-primary-500 hover:text-white"
          >
            <ArrowUpRight size={16} />
          </a>
        )}
      </div>

      {/* Datos */}
      <div className="flex h-[38%] flex-col p-4">
        <h3 className="font-display text-lg font-700 leading-tight text-ink">{p.nombre}</h3>
        <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-slate-500">
          {p.rol}{p.area ? ` · ${p.area}` : ''}
        </p>

        <div className="mt-auto flex items-center justify-between">
          <span className="inline-flex items-center gap-1 truncate pr-2 text-xs text-slate-500">
            <Users size={13} className="shrink-0 text-primary-400" /> {p.institucion || '—'}
          </span>
          {p.enlace ? (
            <a
              href={p.enlace}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine shrink-0 rounded-full bg-primary-500 px-4 py-1.5 text-xs font-600 text-white transition-all hover:bg-primary-600"
            >
              Ver perfil
            </a>
          ) : (
            <span className="shrink-0 rounded-full border border-line px-4 py-1.5 text-xs font-600 text-slate-400">Perfil</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Investigadores() {
  const [personas, setPersonas] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [activo, setActivo] = useState(0);
  const autoRef = useRef(null);
  const reduce = useRef(false);

  useEffect(() => {
    reduce.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    getInvestigadores()
      .then((data) => { setPersonas(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  const n = personas.length;
  const ir = useCallback((i) => { if (n) setActivo((i % n + n) % n); }, [n]);

  useEffect(() => {
    if (estado !== 'listo' || n <= 1 || reduce.current) return;
    autoRef.current = setInterval(() => setActivo((v) => (v + 1) % n), 3800);
    return () => clearInterval(autoRef.current);
  }, [estado, n]);

  const detener = () => clearInterval(autoRef.current);

  // Posición de cada tarjeta sobre un "circulo" (coverflow 3D).
  const estilo = (i) => {
    let off = i - activo;
    if (off > n / 2) off -= n;
    if (off < -n / 2) off += n;
    const abs = Math.abs(off);
    const visible = abs <= 2;
    return {
      transform: `translateX(${off * 56}%) translateZ(${-abs * 220}px) rotateY(${off * -32}deg) scale(${1 - abs * 0.08})`,
      opacity: visible ? 1 - abs * 0.28 : 0,
      zIndex: 100 - abs,
      pointerEvents: off === 0 ? 'auto' : 'none',
      filter: off === 0 ? 'none' : 'brightness(0.8)',
    };
  };

  return (
    <section id="investigadores" className="relative overflow-hidden border-t border-line bg-soft py-24">
      <div className="glow-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitle
          index="04"
          eyebrow="Investigadores"
          title="Las personas detrás de la Red"
          subtitle="Un equipo interdisciplinario que combina ingeniería, ciencia de datos, salud y ciencias sociales para construir tecnología con impacto."
        />

        {estado === 'cargando' && (
          <div className="mt-16 flex justify-center">
            <div className="h-[420px] w-[300px] animate-pulse rounded-[28px] border border-line bg-white" />
          </div>
        )}

        {estado === 'error' && (
          <p className="mt-12 rounded-xl border border-primary-200 bg-primary-50 p-6 text-sm text-primary-700">
            No pudimos cargar a los investigadores. Verifica que el backend esté en ejecución.
          </p>
        )}

        {estado === 'listo' && n > 0 && (
          <div className="mt-10">
            <div
              className="relative mx-auto flex h-[460px] items-center justify-center"
              style={{ perspective: '1400px' }}
              onMouseEnter={detener}
            >
              {personas.map((p, i) => (
                <div
                  key={p.id}
                  className="absolute cursor-pointer transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]"
                  style={estilo(i)}
                  onClick={() => { if (i !== activo) { ir(i); detener(); } }}
                >
                  <Card p={p} frente={i === activo} />
                </div>
              ))}
            </div>

            {n > 1 && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button onClick={() => { ir(activo - 1); detener(); }} aria-label="Anterior"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-slate-500 shadow-sm transition-all hover:border-primary-400 hover:text-primary-600 hover:shadow-lift">
                  <ChevronLeft size={18} />
                </button>

                <div className="flex gap-2">
                  {personas.map((_, i) => (
                    <button key={i} onClick={() => { ir(i); detener(); }} aria-label={`Investigador ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === activo ? 'w-8 bg-primary-500' : 'w-2.5 bg-line hover:bg-primary-200'}`} />
                  ))}
                </div>

                <button onClick={() => { ir(activo + 1); detener(); }} aria-label="Siguiente"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-slate-500 shadow-sm transition-all hover:border-primary-400 hover:text-primary-600 hover:shadow-lift">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
