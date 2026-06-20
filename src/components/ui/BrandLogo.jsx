// frontend/src/components/ui/BrandLogo.jsx
import { useState } from 'react';
import LogoMark from './LogoMark.jsx';

/* Marca compuesta: [ logo Ibero (blanco) | separador | LogoMark RIAAEB + texto ]
   El logo de la Universidad Iberoamericana es marca registrada; colócalo tú
   como archivo en /public (por defecto busca /ibero-logo.svg, o pásalo por prop
   `iberoSrc`). Debe ser una versión BLANCA/monocroma sobre fondo transparente.
   Mientras no exista el archivo, se muestra un respaldo de texto "IBERO". */
export default function BrandLogo({
  size = 36,
  iberoSrc = '/ibero-logo.svg',
  mostrarTexto = true,
  variante = 'oscuro', // 'oscuro' => texto del nombre en tinta; 'claro' => texto blanco (sobre fondos rojos/oscuros)
}) {
  const [iberoOk, setIberoOk] = useState(true);
  const textoNombre = variante === 'claro' ? 'text-white' : 'text-ink';
  const acento = variante === 'claro' ? 'text-white/80' : 'text-primary-500';

  return (
    <span className="flex items-center gap-3">
      {/* Logo Universidad Iberoamericana CDMX (en blanco) */}
      <span className="flex h-9 items-center">
        {iberoOk ? (
          <img
            src={iberoSrc}
            alt="Universidad Iberoamericana Ciudad de México"
            onError={() => setIberoOk(false)}
            className="h-8 w-auto brightness-0 invert"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        ) : (
          // Respaldo en blanco mientras se coloca el archivo oficial
          <span className="font-display text-lg font-700 leading-none tracking-[0.06em] text-white drop-shadow-sm">
            IBERO
          </span>
        )}
      </span>

      {/* Separador */}
      <span className="h-7 w-px bg-white/30" />

      {/* Logo propio de la página (RIAAEB) */}
      <span className="flex items-center gap-2">
        <LogoMark size={size} />
        {mostrarTexto && (
          <span className={`font-display text-lg font-700 leading-none tracking-[0.04em] ${textoNombre}`}>
            RIA<span className={acento}>AEB</span>
          </span>
        )}
      </span>
    </span>
  );
}
