// frontend/src/components/ui/Reveal.jsx
import useReveal from '../../hooks/useReveal.js';

// Envuelve cualquier contenido y lo revela con animación al entrar en pantalla.
// delay (ms) permite escalonar elementos.
export default function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal--in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
