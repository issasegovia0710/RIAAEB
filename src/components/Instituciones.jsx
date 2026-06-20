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
    <section className="relative z-10 border-y border-line bg-white py-14">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-9 text-center font-mono text-xs uppercase tracking-[0.2em] text-primary-500">
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
                className="logo-rojo h-10 w-auto opacity-80 transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
