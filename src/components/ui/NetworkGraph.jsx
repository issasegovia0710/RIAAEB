// frontend/src/components/ui/NetworkGraph.jsx
// Grafo de nodos y conexiones — evoca la "Red" (elemento firma del sitio).
const NODOS = [
  { x: 90, y: 60 }, { x: 220, y: 40 }, { x: 330, y: 110 }, { x: 160, y: 150 },
  { x: 60, y: 210 }, { x: 280, y: 210 }, { x: 380, y: 260 }, { x: 180, y: 290 },
  { x: 90, y: 340 }, { x: 300, y: 330 },
];
const ARISTAS = [
  [0, 1], [1, 2], [0, 3], [3, 1], [3, 5], [2, 5], [4, 3], [4, 7],
  [5, 6], [5, 7], [7, 8], [7, 9], [9, 6], [8, 4], [3, 4], [2, 6],
];

export default function NetworkGraph() {
  return (
    <svg viewBox="0 0 440 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38e1ff" />
          <stop offset="100%" stopColor="#4d8dff" />
        </radialGradient>
      </defs>

      {ARISTAS.map(([a, b], i) => (
        <line
          key={i}
          x1={NODOS[a].x} y1={NODOS[a].y}
          x2={NODOS[b].x} y2={NODOS[b].y}
          stroke="#4d8dff"
          strokeOpacity="0.25"
          strokeWidth="1"
        />
      ))}

      {NODOS.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="9" fill="#4d8dff" opacity="0.12">
            <animate
              attributeName="r"
              values="9;14;9"
              dur={`${3 + (i % 4)}s`}
              repeatCount="indefinite"
            />
          </circle>
          <circle cx={n.x} cy={n.y} r="4" fill="url(#nodeGlow)">
            <animate
              attributeName="opacity"
              values="0.6;1;0.6"
              dur={`${2.5 + (i % 3)}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
    </svg>
  );
}
