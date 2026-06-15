// frontend/src/components/CTABanner.jsx
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-line bg-primary-950 px-8 py-14 text-center shadow-glow sm:px-16">
          <div className="glow-bg absolute inset-0 opacity-80" />
          <div className="grid-bg absolute inset-0 opacity-40" />
          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-300">Colabora con la Red</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
              ¿Quieres investigar IA con impacto social? <span className="text-primary-400">Hablemos.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Propón un proyecto, súmate como investigador o solicita acceso a nuestros datos y publicaciones.
            </p>
            <a
              href="#contacto"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary-400 px-7 py-3.5 text-sm font-600 text-base transition-all duration-300 hover:bg-primary-300"
            >
              Contáctanos
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
