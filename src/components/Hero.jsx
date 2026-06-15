// frontend/src/components/Hero.jsx
import { Sparkles, Scale, HeartPulse, ArrowDown } from 'lucide-react';
import Button from './ui/Button.jsx';
import NetworkGraph from './ui/NetworkGraph.jsx';

const VALORES = [
  { icon: Scale, titulo: 'Equidad', frase: 'IA auditada para reducir sesgos.' },
  { icon: HeartPulse, titulo: 'Bienestar', frase: 'Tecnología centrada en las personas.' },
  { icon: Sparkles, titulo: 'Ciencia abierta', frase: 'Datos y código para la comunidad.' },
];

export default function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      <div className="glow-bg absolute inset-0 -z-10" />
      <div className="grid-bg absolute inset-0 -z-10 opacity-60" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-primary-300">
              <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_8px_#38e1ff]" />
              Red de investigación en IA
            </p>
            <h1 className="font-display text-4xl font-700 leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Inteligencia artificial<br />
              <span className="text-primary-400">para la equidad y el bienestar.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-400">
              Somos una red de investigadores que desarrolla y difunde IA con impacto
              social. Trabajamos con datos abiertos y métodos reproducibles para que la
              tecnología beneficie a todas las personas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#investigaciones">Explora nuestras investigaciones</Button>
              <Button href="#nosotros" variant="outline" icon={false}>Conoce la Red</Button>
            </div>
          </div>

          {/* Elemento firma: grafo de red */}
          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-md rounded-2xl border border-line bg-surface/40 shadow-glow">
              <NetworkGraph />
              <div className="absolute bottom-4 left-4 rounded-xl border border-line bg-base/70 px-4 py-3 backdrop-blur">
                <p className="font-mono text-[11px] uppercase tracking-widest text-primary-400">Nodos activos</p>
                <p className="font-display text-2xl font-700 text-white">15 investigadores</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-3">
          {VALORES.map((v) => (
            <div key={v.titulo} className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-400/10 text-primary-300">
                <v.icon size={18} />
              </span>
              <div>
                <p className="font-600 text-white">{v.titulo}</p>
                <p className="text-sm text-slate-400">{v.frase}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
          <ArrowDown size={14} className="animate-bounce" /> Desplázate para descubrir
        </p>
      </div>
    </section>
  );
}
