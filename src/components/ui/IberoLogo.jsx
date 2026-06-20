// frontend/src/components/ui/IberoLogo.jsx
import { useState } from 'react';

/* Logo de la Universidad Iberoamericana Ciudad de México, en BLANCO.
   El logotipo oficial es marca registrada de la universidad. Si tienes el
   archivo vectorial oficial, colócalo en /public como `ibero-logo.svg`
   (o .png/.webp) y se usará automáticamente, forzado a blanco.
   Si no existe el archivo, se muestra esta versión tipográfica de respaldo
   ("IBERO" + "CIUDAD DE MÉXICO") que evoca el wordmark institucional. */
export default function IberoLogo({ src = '/ibero-logo.svg' }) {
  const [ok, setOk] = useState(true);

  if (ok) {
    return (
      <img
        src={src}
        alt="Universidad Iberoamericana Ciudad de México"
        onError={() => setOk(false)}
        className="h-7 w-auto"
        style={{ filter: 'brightness(0) invert(1)' }}
      />
    );
  }

  // Respaldo tipográfico (blanco)
  return (
    <span className="flex flex-col items-start leading-none text-white" aria-label="Universidad Iberoamericana Ciudad de México">
      <span className="font-display text-[19px] font-700 tracking-[0.04em]" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        IBERO
      </span>
      <span className="mt-0.5 text-[7px] font-600 uppercase tracking-[0.18em] text-white/90" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        Ciudad de México
      </span>
    </span>
  );
}
