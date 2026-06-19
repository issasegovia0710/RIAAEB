// frontend/src/components/Hero.jsx
import { Cpu, Scale, HeartPulse, ArrowDown } from 'lucide-react';
import Button from './ui/Button.jsx';
import AICore from './ui/AICore.jsx';
import useTypewriter from '../hooks/useTypewriter.js';
import { useContactModal } from '../context/ContactModalContext.jsx';

const CAMPOS = ['la equidad', 'el bienestar', 'la salud', 'la robótica', 'los datos', 'la sociedad', 'el futuro'];

const VALORES = [
  { icon: Scale, titulo: 'Equidad', frase: 'Tecnología auditada y sin sesgos.' },
  { icon: HeartPulse, titulo: 'Bienestar', frase: 'Innovación centrada en las personas.' },
  { icon: Cpu, titulo: 'Avance abierto', frase: 'Datos y código para la comunidad.' },
];

export default function Hero() {
  const palabra = useTypewriter(CAMPOS, { typeSpeed: 75, deleteSpeed: 40, pause: 1500 });
  const { open } = useContactModal();

  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* velo para legibilidad del texto sobre el fondo global */}
      <div className="pointer-events-none absolute inset-0 -z-[1] bg-gradient-to-r from-white via-white/70 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 font-mono text-xs uppercase tracking-wider text-primary-600">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-primary-400" />
              Red de investigación abierta
            </span>
            <h1 className="font-display text-4xl font-700 leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Tecnología que impulsa
              <br />
              <span className="text-gradient">
                {palabra}
                <span className="ml-1 inline-block w-[3px] -translate-y-1 animate-pulse bg-primary-400 align-middle" style={{ height: '0.9em' }} />
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500">
              Investigamos y difundimos el avance tecnológico en múltiples campos, con
              datos abiertos y métodos reproducibles, para que beneficie a todas las personas.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#investigaciones">Explora nuestras investigaciones</Button>
              <Button as="button" onClick={open} variant="outline" icon={false}>Súmate a la Red</Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <AICore />
          </div>
        </div>

        <div className="mt-16 grid gap-4 border-t border-line pt-10 sm:grid-cols-3">
          {VALORES.map((v, i) => (
            <div
              key={v.titulo}
              className="spotlight group flex animate-fade-up items-start gap-3 rounded-xl border border-transparent p-3 transition-all duration-300 hover:border-line hover:bg-white hover:shadow-card"
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-500 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white group-hover:shadow-[0_0_18px_rgba(225,29,58,.4)]">
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
