// frontend/src/admin/Dashboard.jsx
import { useState } from 'react';
import { LogOut, FlaskConical, Newspaper, Users, Building2, Info, ExternalLink, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import LogoMark from '../components/ui/LogoMark.jsx';
import ResourceManager from './ResourceManager.jsx';
import AboutEditor from './AboutEditor.jsx';
import {
  adminInvestigaciones, adminNoticias, adminInvestigadores, adminInstituciones,
} from '../lib/api.js';

const TABS = [
  { id: 'investigaciones', label: 'Investigaciones', icon: FlaskConical },
  { id: 'noticias', label: 'Noticias', icon: Newspaper },
  { id: 'investigadores', label: 'Investigadores', icon: Users },
  { id: 'instituciones', label: 'Instituciones', icon: Building2 },
  { id: 'about', label: 'Quiénes somos', icon: Info },
];

const CFG = {
  investigaciones: {
    titulo: 'Investigaciones', api: adminInvestigaciones,
    label: (i) => i.titulo,
    fields: [
      { name: 'titulo', label: 'Título', type: 'text', required: true, full: true },
      { name: 'resumen', label: 'Resumen', type: 'textarea', required: true, full: true },
      { name: 'autores', label: 'Autores', type: 'text', required: true },
      { name: 'area', label: 'Área', type: 'text' },
      { name: 'anio', label: 'Año', type: 'number', required: true },
      { name: 'tipo', label: 'Tipo (Artículo, Dataset…)', type: 'text' },
      { name: 'enlace', label: 'Enlace (DOI/URL)', type: 'text', required: true, full: true },
    ],
  },
  noticias: {
    titulo: 'Noticias', api: adminNoticias,
    label: (i) => i.titulo,
    fields: [
      { name: 'titulo', label: 'Título', type: 'text', required: true, full: true },
      { name: 'extracto', label: 'Extracto', type: 'textarea', required: true, full: true },
      { name: 'contenido', label: 'Contenido', type: 'textarea', required: true, full: true },
      { name: 'categoria', label: 'Categoría', type: 'text' },
      { name: 'fecha', label: 'Fecha', type: 'date', required: true },
      { name: 'imagen_url', label: 'Imagen', type: 'file', full: true },
    ],
  },
  investigadores: {
    titulo: 'Investigadores', api: adminInvestigadores,
    label: (i) => i.nombre,
    fields: [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'rol', label: 'Rol', type: 'text', required: true },
      { name: 'area', label: 'Área', type: 'text' },
      { name: 'institucion', label: 'Institución', type: 'text' },
      { name: 'bio', label: 'Reseña / bio', type: 'textarea', required: true, full: true },
      { name: 'foto_url', label: 'Foto (PNG sin fondo)', type: 'file' },
      { name: 'logo_institucion_url', label: 'Logo institución', type: 'file' },
      { name: 'enlace', label: 'Enlace (perfil/ORCID)', type: 'text' },
      { name: 'orden', label: 'Orden', type: 'number' },
    ],
  },
  instituciones: {
    titulo: 'Instituciones', api: adminInstituciones,
    label: (i) => i.nombre,
    fields: [
      { name: 'nombre', label: 'Nombre', type: 'text', required: true },
      { name: 'logo_url', label: 'Logo', type: 'file', full: true },
      { name: 'enlace', label: 'Enlace', type: 'text' },
      { name: 'orden', label: 'Orden', type: 'number' },
    ],
  },
};

export default function Dashboard({ onLogout }) {
  const [tab, setTab] = useState('investigaciones');
  const [confirmar, setConfirmar] = useState(false);

  return (
    <div className="min-h-screen bg-base text-slate-300">
      <div className="mx-auto flex max-w-7xl gap-8 px-6 py-8">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <div className="sticky top-8">
            <div className="mb-8 flex items-center gap-2.5">
              <LogoMark size={34} />
              <span className="font-display text-lg font-700 tracking-[0.04em] text-white">RIA<span className="text-primary-400">AEB</span></span>
            </div>
            <nav className="space-y-1">
              {TABS.map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-500 transition-colors ${
                    tab === t.id ? 'bg-primary-400/15 text-primary-300' : 'text-slate-400 hover:bg-surface hover:text-white'}`}>
                  <t.icon size={17} /> {t.label}
                </button>
              ))}
            </nav>
            <div className="mt-8 space-y-1 border-t border-line pt-4">
              <Link to="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-surface hover:text-white">
                <ExternalLink size={16} /> Ver sitio
              </Link>
              <button onClick={() => setConfirmar(true)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-400 hover:bg-surface hover:text-red-400">
                <LogOut size={16} /> Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        {/* Contenido */}
        <main className="min-w-0 flex-1">
          {/* tabs móviles */}
          <div className="mb-6 flex gap-2 overflow-x-auto lg:hidden">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`shrink-0 rounded-lg px-3 py-2 text-xs font-600 ${tab === t.id ? 'bg-primary-400 text-base' : 'bg-surface text-slate-300'}`}>
                {t.label}
              </button>
            ))}
            <button onClick={() => setConfirmar(true)} className="shrink-0 rounded-lg bg-surface px-3 py-2 text-xs font-600 text-red-400">Salir</button>
          </div>

          {tab === 'about'
            ? <AboutEditor key="about" />
            : <ResourceManager key={tab} {...CFG[tab]} />}
        </main>
      </div>

      {/* Confirmación de cierre de sesión */}
      {confirmar && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="animate-overlay-in absolute inset-0 bg-ink/50 backdrop-blur-sm" onClick={() => setConfirmar(false)} />
          <div className="animate-modal-in relative z-10 w-full max-w-sm rounded-2xl border border-line bg-surface p-6 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-700 text-white">Cerrar sesión</h3>
              <button onClick={() => setConfirmar(false)} aria-label="Cancelar"
                className="grid h-8 w-8 place-items-center rounded-lg border border-line text-slate-400 hover:text-white"><X size={16} /></button>
            </div>
            <p className="text-sm text-slate-400">¿Seguro que deseas cerrar la sesión? Tendrás que volver a iniciar sesión para administrar el contenido.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setConfirmar(false)}
                className="rounded-xl border border-line px-4 py-2.5 text-sm font-600 text-slate-300 transition-colors hover:bg-base">
                Cancelar
              </button>
              <button onClick={() => { setConfirmar(false); onLogout(); }}
                className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 px-4 py-2.5 text-sm font-600 text-base hover:-translate-y-0.5">
                <LogOut size={15} /> Sí, cerrar sesión
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
