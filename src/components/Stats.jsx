// frontend/src/components/Stats.jsx
import { FileText, Users, Handshake, Database } from 'lucide-react';

const CIFRAS = [
  { icon: FileText, valor: '30+', label: 'Investigaciones publicadas' },
  { icon: Users, valor: '15', label: 'Investigadores en la red' },
  { icon: Handshake, valor: '12', label: 'Alianzas institucionales' },
  { icon: Database, valor: '8', label: 'Conjuntos de datos abiertos' },
];

export default function Stats() {
  return (
    <section className="border-y border-line bg-primary-950 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CIFRAS.map((c) => (
            <div key={c.label} className="border-l border-line pl-5">
              <span className="mb-4 inline-grid h-11 w-11 place-items-center rounded-xl bg-primary-400/10 text-primary-300">
                <c.icon size={20} />
              </span>
              <p className="font-display text-4xl font-700 text-white sm:text-5xl">{c.valor}</p>
              <p className="mt-2 text-sm text-slate-400">{c.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
