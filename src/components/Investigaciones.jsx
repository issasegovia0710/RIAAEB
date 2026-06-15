// frontend/src/components/Investigaciones.jsx
import { useEffect, useState } from 'react';
import { ExternalLink, FileText } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { getInvestigaciones } from '../lib/api.js';

export default function Investigaciones() {
  const [items, setItems] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    getInvestigaciones()
      .then((data) => { setItems(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  return (
    <section id="investigaciones" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          index="02"
          eyebrow="Investigaciones"
          title="Publicaciones y recursos abiertos"
          subtitle="Artículos, conjuntos de datos y reportes técnicos de la Red. Cada tarjeta enlaza al recurso original."
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {estado === 'cargando' &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-44 animate-pulse rounded-2xl border border-line bg-surface/60" />
            ))}

          {estado === 'error' && (
            <p className="lg:col-span-2 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
              No pudimos cargar las investigaciones. Verifica que el backend esté en ejecución.
            </p>
          )}

          {estado === 'listo' &&
            items.map((inv) => (
              <a
                key={inv.id}
                href={inv.enlace}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-2xl border border-line bg-surface/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-400/50 hover:shadow-glow"
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
                  <span className="text-xs text-slate-500">{inv.autores}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-600 text-primary-400">
                    Ver recurso
                    <ExternalLink size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            ))}
        </div>
      </div>
    </section>
  );
}
