// frontend/src/components/Process.jsx
import { Search, FlaskConical, BarChart3, Send } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';

const PASOS = [
  { icon: Search, titulo: 'Pregunta', texto: 'Definimos un problema relevante y revisamos el estado del arte.' },
  { icon: FlaskConical, titulo: 'Experimentación', texto: 'Diseñamos métodos reproducibles y recolectamos datos.' },
  { icon: BarChart3, titulo: 'Análisis', texto: 'Modelamos y validamos resultados con rigor estadístico.' },
  { icon: Send, titulo: 'Difusión', texto: 'Publicamos en abierto y transferimos el conocimiento.' },
];

export default function Process() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          index="05"
          eyebrow="Cómo trabajamos"
          title="Nuestro proceso de investigación"
          center
        />

        <div className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-slate-200 lg:block" />
          {PASOS.map((p, i) => (
            <div key={p.titulo} className="relative text-center">
              <span className="relative z-10 mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl border border-slate-200 bg-white text-primary-600 shadow-card">
                <p.icon size={22} />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-primary-500 font-mono text-[11px] font-600 text-white">
                  {i + 1}
                </span>
              </span>
              <h3 className="font-display font-700 text-ink">{p.titulo}</h3>
              <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-600">{p.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
