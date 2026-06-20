// frontend/src/components/ui/SiteBackground.jsx
import NeuralNetwork from './NeuralNetwork.jsx';

// Fondo fijo de red neuronal para TODA la página (versión clara).
export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-base" />
      {/* lavado de color claro de arriba a abajo */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-white to-white" />
      <div className="absolute inset-0 opacity-40 blur-[1.5px]">
        <NeuralNetwork intensity={0.7} />
      </div>
      <div className="glow-bg absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-50" />
    </div>
  );
}
