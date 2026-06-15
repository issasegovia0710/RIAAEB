// frontend/src/components/News.jsx
import { useEffect, useState } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { getNoticias } from '../lib/api.js';

function formatoFecha(fecha) {
  try {
    return new Date(fecha).toLocaleDateString('es-MX', {
      day: '2-digit', month: 'long', year: 'numeric',
    });
  } catch {
    return fecha;
  }
}

export default function News() {
  const [noticias, setNoticias] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    getNoticias()
      .then((data) => { setNoticias(data.slice(0, 6)); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  return (
    <section id="noticias" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          index="04"
          eyebrow="Noticias y publicaciones"
          title="Lo último del equipo"
          subtitle="Hallazgos, eventos, convenios y datos abiertos. Aquí compartimos los avances más recientes de nuestras líneas de investigación."
        />

        <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {estado === 'cargando' &&
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-96 animate-pulse rounded-2xl border border-slate-200 bg-slate-50" />
            ))}

          {estado === 'error' && (
            <p className="col-span-full rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              No pudimos cargar las noticias. Asegúrate de que el backend esté en ejecución.
            </p>
          )}

          {estado === 'listo' &&
            noticias.map((n) => (
              <article
                key={n.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={n.imagen_url}
                    alt={n.titulo}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-primary-500 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-white">
                    {n.categoria}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="mb-3 flex items-center gap-1.5 font-mono text-xs text-slate-400">
                    <Calendar size={13} /> {formatoFecha(n.fecha)}
                  </p>
                  <h3 className="font-display text-lg font-700 leading-snug text-ink">{n.titulo}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{n.extracto}</p>
                  <a
                    href="#contacto"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-600 text-primary-600"
                  >
                    Leer más
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
