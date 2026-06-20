// frontend/src/components/ui/Portal.jsx
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

/* Renderiza a sus hijos directamente en <body>, fuera de cualquier contenedor
   con transform/perspective/filter. Esto garantiza que un overlay con
   `position: fixed` se posicione respecto a la VENTANA (centro real de la
   pantalla) y no respecto a un ancestro transformado. */
export default function Portal({ children }) {
  const [el] = useState(() => document.createElement('div'));

  useEffect(() => {
    el.setAttribute('data-portal', '');
    document.body.appendChild(el);
    return () => { document.body.removeChild(el); };
  }, [el]);

  return createPortal(children, el);
}
