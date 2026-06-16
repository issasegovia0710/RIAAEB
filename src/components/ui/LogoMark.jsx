// frontend/src/components/ui/LogoMark.jsx
// Marca animada para RIAAEB: un núcleo con anillos orbitando (avance tecnológico).
export default function LogoMark({ size = 36 }) {
  return (
    <span
      className="relative inline-grid place-items-center rounded-xl bg-primary-400/15 ring-1 ring-primary-400/40"
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40" width={size * 0.7} height={size * 0.7} aria-hidden="true">
        <defs>
          <radialGradient id="riaCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38e1ff" />
            <stop offset="100%" stopColor="#4d8dff" />
          </radialGradient>
        </defs>

        {/* anillos orbitando */}
        <g fill="none" stroke="#4d8dff" strokeWidth="1.4" opacity="0.8">
          <ellipse cx="20" cy="20" rx="16" ry="7">
            <animateTransform attributeName="transform" type="rotate"
              from="0 20 20" to="360 20 20" dur="6s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="20" cy="20" rx="16" ry="7" stroke="#38e1ff" opacity="0.6">
            <animateTransform attributeName="transform" type="rotate"
              from="60 20 20" to="420 20 20" dur="8s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="20" cy="20" rx="7" ry="16">
            <animateTransform attributeName="transform" type="rotate"
              from="0 20 20" to="-360 20 20" dur="7s" repeatCount="indefinite" />
          </ellipse>
        </g>

        {/* núcleo pulsante */}
        <circle cx="20" cy="20" r="4" fill="url(#riaCore)">
          <animate attributeName="r" values="3.5;5;3.5" dur="2.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </span>
  );
}
