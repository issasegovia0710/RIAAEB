// frontend/src/components/CTABanner.jsx
import { ArrowRight } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl bg-primary-900 px-8 py-14 text-center sm:px-16">
          <div className="grid-bg absolute inset-0 opacity-20" />
          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-300">
              ¿Trabajamos juntos?
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
              ¿Tienes una pregunta de investigación? <span className="text-primary-400">Hablemos.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-100/80">
              Colabora con nuestro equipo, propón un proyecto o solicita acceso a nuestros datos y publicaciones.
            </p>
            <a
              href="#contacto"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-600 text-primary-700 transition-all duration-300 hover:bg-primary-50"
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
