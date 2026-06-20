// frontend/src/components/ui/IberoLogo.jsx
import { useState } from 'react';

/* Logo de la Universidad Iberoamericana Ciudad de México, mostrado en BLANCO.
   El escudo/wordmark es marca registrada de la universidad, por lo que NO se
   recrea aquí: coloca el archivo oficial en /public con el nombre
   `ibero-logo.svg` (o `.png`/`.webp`), preferentemente la versión monocroma.
   El filtro lo fuerza a blanco para fondos oscuros. Si el archivo no existe,
   se muestra el respaldo de texto "IBERO". */
export default function IberoLogo({ src = '/ibero-logo.svg', alt = 'Universidad Iberoamericana Ciudad de México', className = 'h-6' }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <span className="font-display text-base font-700 leading-none tracking-[0.08em] text-white">
        IBERO
      </span>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setOk(false)}
      className={`${className} w-auto`}
      style={{ filter: 'brightness(0) invert(1)' }}
    />
  );
}
