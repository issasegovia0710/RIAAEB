// frontend/src/components/CTABanner.jsx
import { ArrowRight } from 'lucide-react';
import { useContactModal } from '../context/ContactModalContext.jsx';

export default function CTABanner() {
  const { open } = useContactModal();
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="spotlight group relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 px-8 py-14 text-center shadow-lift transition-all duration-500 sm:px-16">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
          {/* destellos suaves */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-glow/30 blur-3xl" />
          <div className="relative">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-white/80">Colabora con la Red</p>
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-700 leading-tight text-white sm:text-4xl">
              ¿Quieres impulsar tecnología con impacto social? <span className="text-white/90 underline decoration-white/40 decoration-2 underline-offset-4">Hablemos.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Propón un proyecto, súmate como investigador o solicita acceso a nuestros datos,
              publicaciones y recursos en IA, salud, robótica y más.
            </p>
            <button
              onClick={open}
              className="btn-shine group/btn mx-auto mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-600 text-primary-600 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,0,0,.25)]"
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
