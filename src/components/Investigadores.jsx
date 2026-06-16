// frontend/src/components/Investigadores.jsx
import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { getInvestigadores } from '../lib/api.js';

export default function Investigadores() {
  const [personas, setPersonas] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    getInvestigadores()
      .then((data) => { setPersonas(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  return (
    <section id="investigadores" className="relative overflow-hidden border-t border-line bg-primary-950/40 py-24">
      <div className="glow-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6">
        <SectionTitle
          index="04"
          eyebrow="Investigadores"
          title="Las personas detrás de la Red"
          subtitle="Un equipo interdisciplinario que combina ingeniería, ciencia de datos, salud y ciencias sociales para construir tecnología con impacto."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {estado === 'cargando' &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl border border-line bg-surface/60" />
            ))}

          {estado === 'error' && (
            <p className="col-span-full rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
              No pudimos cargar a los investigadores. Verifica que el backend esté en ejecución.
            </p>
          )}

          {estado === 'listo' &&
            personas.map((p) => (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface/60 pt-10 transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-400/60 hover:shadow-[0_24px_60px_rgba(56,225,255,.18)]"
              >
                {/* resplandor superior al hover */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-primary-400/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Foto PNG (sin fondo) que crece y se resalta al hover */}
                <div className="relative mx-auto h-44 w-44">
                  <div className="absolute inset-0 rounded-full bg-primary-400/20 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <img
                    src={p.foto_url}
                    alt={p.nombre}
                    className="relative h-full w-full object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Enlace al perfil */}
                {p.enlace && (
                  <a
                    href={p.enlace}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Perfil de ${p.nombre}`}
                    className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-lg border border-line bg-base/70 text-primary-300 backdrop-blur transition-all hover:bg-primary-400 hover:text-base"
                  >
                    <ArrowUpRight size={16} />
                  </a>
                )}

                <div className="relative border-t border-line p-6 text-center">
                  <h3 className="font-display text-lg font-700 text-white">{p.nombre}</h3>
                  <p className="mt-0.5 text-sm font-600 text-primary-400">{p.rol}</p>
                  {p.area && (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">{p.area}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.bio}</p>

                  {/* Institución con logo en blanco */}
                  {(p.institucion || p.logo_institucion_url) && (
                    <div className="mt-5 flex items-center justify-center gap-2 border-t border-line pt-4">
                      {p.logo_institucion_url && (
                        <img
                          src={p.logo_institucion_url}
                          alt={p.institucion || 'Institución'}
                          className="h-5 w-auto opacity-70 brightness-0 invert transition-opacity group-hover:opacity-100"
                        />
                      )}
                      {p.institucion && (
                        <span className="text-xs text-slate-400">{p.institucion}</span>
                      )}
                    </div>
                  )}
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
