// frontend/src/components/Stats.jsx
import { BookOpen, Users, Globe, FlaskConical } from 'lucide-react';

const CIFRAS = [
  { icon: BookOpen, valor: '48', label: 'Publicaciones científicas' },
  { icon: FlaskConical, valor: '23', label: 'Proyectos de investigación' },
  { icon: Users, valor: '15', label: 'Investigadores y becarios' },
  { icon: Globe, valor: '9', label: 'Colaboraciones internacionales' },
];

export default function Stats() {
  return (
    <section className="bg-primary-900 py-20 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-10 font-mono text-xs tracking-[0.2em] uppercase text-primary-300">
          02 — Cifras de impacto
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CIFRAS.map((c) => (
            <div key={c.label} className="border-l border-white/15 pl-5">
              <span className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-primary-200">
                <c.icon size={20} />
              </span>
              <p className="font-display text-4xl font-700 sm:text-5xl">{c.valor}</p>
              <p className="mt-2 text-sm text-primary-100/70">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
