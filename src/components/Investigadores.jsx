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
    <section id="investigadores" className="border-t border-line bg-primary-950 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          index="04"
          eyebrow="Investigadores"
          title="Las personas detrás de la Red"
          subtitle="Un equipo interdisciplinario que combina ciencia de datos, salud, ciencias sociales y ética para construir IA con impacto social."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {estado === 'cargando' &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-2xl border border-line bg-surface/60" />
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
                className="group overflow-hidden rounded-2xl border border-line bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/50 hover:shadow-glow"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={p.foto_url}
                    alt={p.nombre}
                    className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/20 to-transparent" />
                  {p.enlace && (
                    <a
                      href={p.enlace}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Perfil de ${p.nombre}`}
                      className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-lg border border-line bg-base/70 text-primary-300 backdrop-blur transition-colors hover:bg-primary-400 hover:text-base"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-700 text-white">{p.nombre}</h3>
                  <p className="mt-0.5 text-sm font-600 text-primary-400">{p.rol}</p>
                  {p.area && (
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-slate-500">{p.area}</p>
                  )}
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{p.bio}</p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
