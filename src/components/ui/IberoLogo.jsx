// frontend/src/components/ui/IberoLogo.jsx
import { useState } from 'react';

/* Logo de la Universidad Iberoamericana Ciudad de México.
   El logotipo oficial es marca registrada de la universidad. Si tienes el
   archivo vectorial oficial, colócalo en /public como `ibero-logo.svg`
   (o .png/.webp) y se usará tal cual (en su color rojo institucional).
   Si no existe el archivo, se muestra una versión tipográfica de respaldo
   ("IBERO" + "CIUDAD DE MÉXICO") en rojo sobre fondo claro, como la oficial.

   Props:
   - tono: 'rojo' (por defecto, para fondos claros) | 'blanco' (para fondos oscuros). */
export default function IberoLogo({ src = '/ibero-logo.svg', tono = 'rojo' }) {
  const [ok, setOk] = useState(true);
  const blanco = tono === 'blanco';

  if (ok) {
    return (
      <img
        src={src}
        alt="Universidad Iberoamericana Ciudad de México"
        onError={() => setOk(false)}
        className="h-8 w-auto"
        style={blanco ? { filter: 'brightness(0) invert(1)' } : undefined}
      />
    );
  }

  // Respaldo tipográfico
  const colorPrincipal = blanco ? 'text-white' : 'text-primary-600';
  const colorSub = blanco ? 'text-white/90' : 'text-primary-500';
  return (
    <span className="flex flex-col items-start leading-none" aria-label="Universidad Iberoamericana Ciudad de México">
      <span className={`text-[22px] font-700 tracking-[0.02em] ${colorPrincipal}`} style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        IBERO
      </span>
      <span className={`mt-0.5 text-[7.5px] font-600 uppercase tracking-[0.16em] ${colorSub}`} style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
        Ciudad de México
      </span>
    </span>
  );
}
