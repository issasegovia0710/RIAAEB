// frontend/src/components/Hero.jsx
import { Play, ArrowDown } from 'lucide-react';
import { ShieldCheck, GitBranch, Database } from 'lucide-react';
import Button from './ui/Button.jsx';

const VALORES = [
  { icon: ShieldCheck, titulo: 'Rigor metodológico', frase: 'Procesos verificables y revisados por pares.' },
  { icon: GitBranch, titulo: 'Ciencia abierta', frase: 'Código y datos disponibles para la comunidad.' },
  { icon: Database, titulo: 'Resultados reproducibles', frase: 'Cualquiera puede repetir nuestros experimentos.' },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="grid-bg absolute inset-0 -z-10" />
      <div className="absolute inset-x-0 top-0 -z-10 h-[420px] bg-gradient-to-b from-primary-50/80 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-4 py-1.5 font-mono text-xs tracking-[0.18em] uppercase text-primary-600">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" /> Equipo de investigación
            </p>
            <h1 className="font-display text-4xl font-700 leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              Hacemos ciencia.<br />
              <span className="text-primary-500">La compartimos contigo.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
              Somos un equipo dedicado a producir y difundir investigación con datos
              abiertos y métodos reproducibles. Convertimos preguntas complejas en
              conocimiento útil para la sociedad.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#servicios">Conoce nuestro trabajo</Button>
              <a
                href="#nosotros"
                className="group inline-flex items-center gap-2 rounded-xl border border-primary-200 px-6 py-3 text-sm font-600 text-ink transition-all duration-300 hover:border-primary-500 hover:text-primary-600"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary-50 text-primary-600">
                  <Play size={13} className="ml-0.5" />
                </span>
                Ver presentación
              </a>
            </div>
          </div>

          {/* Composición visual */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lift">
              <img
                src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1100&q=80"
                alt="Equipo de investigación trabajando en un laboratorio"
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:block">
              <p className="font-mono text-xs uppercase tracking-widest text-primary-500">Publicaciones</p>
              <p className="font-display text-3xl font-700 text-ink">48</p>
              <p className="text-xs text-slate-500">artículos revisados por pares</p>
            </div>
          </div>
        </div>

        {/* Franja de propuestas de valor */}
        <div className="mt-16 grid gap-4 border-t border-slate-200 pt-10 sm:grid-cols-3">
          {VALORES.map((v) => (
            <div key={v.titulo} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-500/10 text-primary-600">
                <v.icon size={18} />
              </span>
              <div>
                <p className="font-600 text-ink">{v.titulo}</p>
                <p className="text-sm text-slate-500">{v.frase}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
          <ArrowDown size={14} className="animate-bounce" /> Desplázate para descubrir
        </p>
      </div>
    </section>
  );
}
