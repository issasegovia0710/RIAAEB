// frontend/src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) {
    throw new Error(json.message || 'Error de comunicación con el servidor.');
  }
  return json.data;
}

export const getInvestigadores = () => request('/investigadores');
export const getInvestigaciones = () => request('/investigaciones');
export const getNoticias = () => request('/noticias');
export const enviarContacto = (payload) =>
  request('/contacto', { method: 'POST', body: JSON.stringify(payload) });
