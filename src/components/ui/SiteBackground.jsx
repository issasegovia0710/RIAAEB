// frontend/src/components/ui/SiteBackground.jsx
import NeuralNetwork from './NeuralNetwork.jsx';

// Fondo fijo de red neuronal para TODA la página.
export default function SiteBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-base" />
      <div className="absolute inset-0 opacity-70">
        <NeuralNetwork intensity={1.1} />
      </div>
      <div className="glow-bg absolute inset-0" />
      <div className="grid-bg absolute inset-0 opacity-30" />
    </div>
  );
}
