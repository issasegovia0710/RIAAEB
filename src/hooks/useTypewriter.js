// frontend/src/hooks/useTypewriter.js
import { useEffect, useState } from 'react';

/**
 * Efecto máquina de escribir que rota entre varias palabras/frases.
 * Escribe una, espera, la borra y pasa a la siguiente (en bucle).
 */
export default function useTypewriter(palabras, {
  typeSpeed = 70,
  deleteSpeed = 40,
  pause = 1400,
} = {}) {
  const [texto, setTexto] = useState('');
  const [i, setI] = useState(0);       // índice de palabra
  const [borrando, setBorrando] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTexto(palabras[0]); // sin animación: muestra la primera
      return;
    }

    const actual = palabras[i % palabras.length];
    let delay = borrando ? deleteSpeed : typeSpeed;

    if (!borrando && texto === actual) {
      delay = pause;                       // pausa al completar la palabra
    } else if (borrando && texto === '') {
      setBorrando(false);
      setI((v) => v + 1);                  // siguiente palabra
      delay = 250;
    }

    const t = setTimeout(() => {
      if (!borrando && texto !== actual) {
        setTexto(actual.slice(0, texto.length + 1));
      } else if (!borrando && texto === actual) {
        setBorrando(true);
      } else if (borrando) {
        setTexto(actual.slice(0, texto.length - 1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [texto, borrando, i, palabras, typeSpeed, deleteSpeed, pause]);

  return texto;
}
