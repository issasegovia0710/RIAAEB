// frontend/src/lib/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
const TOKEN_KEY = 'riaaeb_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);
export const isLogged = () => !!getToken();

async function request(path, { auth = false, ...options } = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  if (auth && getToken()) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${API_URL}${path}`, { ...options, headers });
  const json = await res.json().catch(() => ({}));
  if (res.status === 401) clearToken();
  if (!res.ok || json.success === false) {
    throw new Error(json.message || 'Error de comunicación con el servidor.');
  }
  return json.data;
}

// ---- Público ----
export const getInvestigadores = () => request('/investigadores');
export const getInvestigaciones = () => request('/investigaciones');
export const getNoticias = () => request('/noticias');
export const getInstituciones = () => request('/instituciones');
export const getAbout = () => request('/about');
export const enviarContacto = (payload) =>
  request('/contacto', { method: 'POST', body: JSON.stringify(payload) });

// ---- Auth ----
export const login = (usuario, password) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ usuario, password }) });

// ---- Admin CRUD ----
const crud = (base) => ({
  list:   () => request(`/${base}`),
  create: (d) => request(`/${base}`, { method: 'POST', auth: true, body: JSON.stringify(d) }),
  update: (id, d) => request(`/${base}/${id}`, { method: 'PUT', auth: true, body: JSON.stringify(d) }),
  remove: (id) => request(`/${base}/${id}`, { method: 'DELETE', auth: true }),
});
export const adminInvestigaciones = crud('investigaciones');
export const adminNoticias = crud('noticias');
export const adminInvestigadores = crud('investigadores');
export const adminInstituciones = crud('instituciones');
export const saveAbout = (d) => request('/about', { method: 'PUT', auth: true, body: JSON.stringify(d) });

// ---- Subida de archivos ----
export async function subirArchivo(file) {
  const fd = new FormData();
  fd.append('archivo', file);
  const headers = {};
  if (getToken()) headers.Authorization = `Bearer ${getToken()}`;
  const res = await fetch(`${API_URL}/upload`, { method: 'POST', headers, body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false) throw new Error(json.message || 'No se pudo subir el archivo.');
  return json.data; // { url, filename }
}
