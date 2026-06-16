// frontend/src/components/CTABanner.jsx
import { ArrowRight } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext.jsx';

export default function CTABanner() {
  const { open } = useContactModal();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="spotlight group relative overflow-hidden rounded-2xl border border-line bg-primary-950 px-8 py-14 text-center shadow-glow transition-all duration-500 hover:border-primary-400/60 sm:px-16">
          <div className="glow-bg pointer-events-none absolute inset-0 opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-primary-300">Colabora con la Red</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
              ¿Quieres impulsar tecnología con impacto social? <span className="text-primary-400">Hablemos.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Propón un proyecto, súmate como investigador o solicita acceso a nuestros datos,
              publicaciones y recursos en IA, salud, robótica y más.
            </p>
            <button
              onClick={open}
              className="btn-shine group/btn mx-auto mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 px-7 py-3.5 text-sm font-600 text-base transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_40px_rgba(56,225,255,.45)]"
            >
              Contáctanos
              <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
