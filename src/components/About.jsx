// frontend/src/components/About.jsx
import { Target, Eye, Heart } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';

const PILARES = [
  { icon: Target, titulo: 'Misión', texto: 'Desarrollar y difundir inteligencia artificial que reduzca desigualdades y mejore el bienestar de las personas.' },
  { icon: Eye, titulo: 'Visión', texto: 'Una red de referencia en IA responsable, donde la investigación se hace en abierto y en colaboración.' },
  { icon: Heart, titulo: 'Valores', texto: 'Equidad, transparencia, rigor científico y compromiso con el impacto social positivo.' },
];

export default function About() {
  return (
    <section id="nosotros" className="py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-line shadow-card">
            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1000&q=80"
              alt="Visualización abstracta de una red de inteligencia artificial"
              className="h-[460px] w-full object-cover"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary-400/20" />
        </div>

        <div>
          <SectionTitle
            index="01"
            eyebrow="Quiénes somos"
            title="Una red que investiga IA con propósito"
            subtitle="Reunimos perfiles de distintas disciplinas —ciencia de datos, salud, ciencias sociales y ética— para abordar problemas reales de equidad y bienestar, documentando y compartiendo cada paso."
          />
          <div className="mt-8 space-y-4">
            {PILARES.map((p) => (
              <div
                key={p.titulo}
                className="flex gap-4 rounded-xl border border-line bg-surface/60 p-5 transition-all duration-300 hover:border-primary-400/50"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-400/10 text-primary-300">
                  <p.icon size={20} />
                </span>
                <div>
                  <p className="font-display font-700 text-white">{p.titulo}</p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
