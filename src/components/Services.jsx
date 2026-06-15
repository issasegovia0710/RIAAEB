// frontend/src/components/Services.jsx
import { useEffect, useState } from 'react';
import {
  FlaskConical, LineChart, BookOpen, Share2, GraduationCap, Cpu,
  Microscope, Beaker, Atom, ArrowRight,
} from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { getServicios } from '../lib/api.js';

// Mapa de íconos disponibles (clave = valor guardado en la columna `icono` de MySQL)
const ICONOS = {
  'flask-conical': FlaskConical,
  'line-chart': LineChart,
  'book-open': BookOpen,
  'share-2': Share2,
  'graduation-cap': GraduationCap,
  'cpu': Cpu,
  'microscope': Microscope,
  'beaker': Beaker,
  'atom': Atom,
};

export default function Services() {
  const [servicios, setServicios] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    getServicios()
      .then((data) => { setServicios(data); setEstado('listo'); })
      .catch(() => setEstado('error'));
  }, []);

  return (
    <section id="servicios" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          index="03"
          eyebrow="Nuestros servicios"
          title="Líneas de trabajo del equipo"
          subtitle="Desde la investigación aplicada hasta la transferencia de conocimiento, así es como llevamos la ciencia de la pregunta a la práctica."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {estado === 'cargando' &&
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white" />
            ))}

          {estado === 'error' && (
            <p className="col-span-full rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              No pudimos cargar los servicios. Verifica que el backend esté en ejecución e inténtalo de nuevo.
            </p>
          )}

          {estado === 'listo' &&
            servicios.map((s) => {
              const Icon = ICONOS[s.icono] || FlaskConical;
              return (
                <article
                  key={s.id}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lift"
                >
                  <span className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl bg-primary-500/10 text-primary-600 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                    <Icon size={22} />
                  </span>
                  <h3 className="font-display text-lg font-700 text-ink">{s.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.descripcion}</p>
                  <a
                    href="#contacto"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-600 text-primary-600"
                  >
                    Conocer más
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}
