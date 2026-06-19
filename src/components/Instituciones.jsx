// frontend/src/components/Instituciones.jsx
import { useEffect, useState } from 'react';
import { getInstituciones } from '../lib/api.js';

export default function Instituciones() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getInstituciones().then(setItems).catch(() => setItems([]));
  }, []);

  if (!items.length) return null;

  return (
    <section className="border-t border-line bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-9 text-center font-mono text-xs uppercase tracking-[0.2em] text-slate-400">
          Instituciones y aliados
        </p>
        <div className="grid grid-cols-2 items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {items.map((inst) => (
            <a
              key={inst.id}
              href={inst.enlace || '#'}
              target={inst.enlace ? '_blank' : undefined}
              rel="noopener noreferrer"
              title={inst.nombre}
              className="group flex items-center justify-center"
            >
              <img
                src={inst.logo_url}
                alt={inst.nombre}
                className="h-9 w-auto opacity-60 grayscale transition-all duration-300 group-hover:scale-110 group-hover:opacity-100 group-hover:grayscale-0"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
