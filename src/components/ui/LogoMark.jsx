// frontend/src/components/ui/LogoMark.jsx
// Logo propio del sitio (RIAAEB): un nodo de red neuronal que forma un escudo
// con un núcleo-corazón al centro — IA (red) + equidad/bienestar (escudo/corazón).
export default function LogoMark({ size = 36 }) {
  return (
    <span
      className="relative inline-grid shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-[0_4px_14px_rgba(225,29,58,0.35)]"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" width={size * 0.74} height={size * 0.74} aria-hidden="true">
        <defs>
          <radialGradient id="lm-core" cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#ffd7dc" />
          </radialGradient>
        </defs>

        {/* Conexiones de la red (forman un escudo) */}
        <g stroke="rgba(255,255,255,0.55)" strokeWidth="1.1" fill="none">
          <path d="M20 6 L31 12 L31 22 Q31 31 20 35 Q9 31 9 22 L9 12 Z" />
          <path d="M20 6 L20 20 M9 12 L20 20 L31 12 M9 22 L20 20 L31 22 M20 20 L20 35" />
        </g>

        {/* Nodos */}
        <g fill="#ffffff">
          <circle cx="20" cy="6" r="2.1" />
          <circle cx="31" cy="12" r="1.9" />
          <circle cx="31" cy="22" r="1.9" />
          <circle cx="9" cy="12" r="1.9" />
          <circle cx="9" cy="22" r="1.9" />
          <circle cx="20" cy="35" r="2.1" />
        </g>

        {/* Núcleo central pulsante (corazón de la red) */}
        <circle cx="20" cy="20" r="4.6" fill="url(#lm-core)">
          <animate attributeName="r" values="4.2;5.4;4.2" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="20" cy="20" r="2.2" fill="#e11d3a" />
      </svg>
    </span>
  );
}
