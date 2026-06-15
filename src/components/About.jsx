// frontend/src/components/About.jsx
import { Target, Eye, Heart } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';

const PILARES = [
  {
    icon: Target,
    titulo: 'Misión',
    texto: 'Generar conocimiento riguroso y difundirlo de forma abierta para que tenga impacto real en la sociedad.',
  },
  {
    icon: Eye,
    titulo: 'Visión',
    texto: 'Ser un referente de investigación reproducible y colaborativa, donde la ciencia se construye en comunidad.',
  },
  {
    icon: Heart,
    titulo: 'Valores',
    texto: 'Integridad, transparencia, curiosidad y compromiso con el acceso abierto al conocimiento.',
  },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-card">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=1000&q=80"
              alt="Investigadores analizando datos frente a una pizarra"
              className="h-[460px] w-full object-cover"
            />
          </div>
        </div>

        <div>
          <SectionTitle
            index="01"
            eyebrow="Quiénes somos"
            title="Un equipo que investiga en abierto"
            subtitle="Reunimos perfiles de distintas disciplinas para abordar problemas complejos. Documentamos cada paso y compartimos nuestros resultados para que otros puedan construir sobre ellos."
          />

          <div className="mt-8 space-y-4">
            {PILARES.map((p) => (
              <div
                key={p.titulo}
                className="flex gap-4 rounded-xl border border-slate-200/80 bg-white p-5 transition-all duration-300 hover:border-primary-200 hover:shadow-card"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-500/10 text-primary-600">
                  <p.icon size={20} />
                </span>
                <div>
                  <p className="font-display font-700 text-ink">{p.titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
