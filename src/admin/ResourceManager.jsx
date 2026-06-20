// frontend/src/admin/ResourceManager.jsx
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, Loader2, Save } from 'lucide-react';
import FileField from './FileField.jsx';
import AdminLoader from './AdminLoader.jsx';

function vacio(fields) {
  const o = {};
  fields.forEach((f) => (o[f.name] = f.type === 'number' ? '' : ''));
  return o;
}

export default function ResourceManager({ titulo, api, fields, label }) {
  const [items, setItems] = useState([]);
  const [estado, setEstado] = useState('cargando');
  const [error, setError] = useState('');
  const [form, setForm] = useState(null);   // null = lista; objeto = editando/creando
  const [editId, setEditId] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const cargar = () => {
    setEstado('cargando');
    api.list()
      .then((d) => { setItems(d); setEstado('listo'); })
      .catch((e) => { setError(e.message); setEstado('error'); });
  };
  useEffect(cargar, []); // eslint-disable-line

  const nuevo = () => { setForm(vacio(fields)); setEditId(null); };
  const editar = (item) => {
    const f = {};
    fields.forEach((fl) => (f[fl.name] = item[fl.name] ?? ''));
    setForm(f); setEditId(item.id);
  };
  const cancelar = () => { setForm(null); setEditId(null); setError(''); };

  const set = (name, val) => setForm((p) => ({ ...p, [name]: val }));

  const guardar = async (e) => {
    e.preventDefault();
    setGuardando(true); setError('');
    try {
      const payload = { ...form };
      fields.forEach((f) => { if (f.type === 'number') payload[f.name] = Number(payload[f.name]) || 0; });
      if (editId) await api.update(editId, payload);
      else await api.create(payload);
      cancelar(); cargar();
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  };

  const borrar = async (id) => {
    if (!window.confirm('¿Eliminar este registro? Esta acción no se puede deshacer.')) return;
    try { await api.remove(id); cargar(); } catch (err) { setError(err.message); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-700 text-white">{titulo}</h2>
        {!form && (
          <button onClick={nuevo}
            className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 px-4 py-2.5 text-sm font-600 text-base hover:-translate-y-0.5">
            <Plus size={16} /> Nuevo
          </button>
        )}
      </div>

      {error && <p className="mb-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      {/* Formulario */}
      {form ? (
        <form onSubmit={guardar} className="rounded-2xl border border-line bg-surface p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-lg font-700 text-white">{editId ? 'Editar' : 'Nuevo'} registro</h3>
            <button type="button" onClick={cancelar} aria-label="Cerrar"
              className="grid h-8 w-8 place-items-center rounded-lg border border-line text-slate-300 hover:text-white"><X size={16} /></button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
                {f.type === 'file' ? (
                  <FileField label={f.label} value={form[f.name]} onChange={(v) => set(f.name, v)} />
                ) : f.type === 'textarea' ? (
                  <>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-400">{f.label}</label>
                    <textarea rows={4} value={form[f.name]} required={f.required}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full resize-none rounded-lg border border-line bg-base px-3 py-2.5 text-sm text-white outline-none focus:border-primary-400" />
                  </>
                ) : (
                  <>
                    <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-400">{f.label}</label>
                    <input
                      type={f.type === 'number' ? 'number' : f.type === 'date' ? 'date' : 'text'}
                      value={form[f.name]} required={f.required}
                      onChange={(e) => set(f.name, e.target.value)}
                      className="w-full rounded-lg border border-line bg-base px-3 py-2.5 text-sm text-white outline-none focus:border-primary-400" />
                  </>
                )}
              </div>
            ))}
          </div>
          <button type="submit" disabled={guardando}
            className="btn-shine mt-5 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-500 to-primary-400 px-6 py-3 text-sm font-600 text-base hover:-translate-y-0.5 disabled:opacity-60">
            {guardando ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Guardar
          </button>
        </form>
      ) : estado === 'cargando' ? (
        <AdminLoader texto={`Cargando ${titulo.toLowerCase()}…`} />
      ) : (
        /* Lista */
        <div className="overflow-hidden rounded-2xl border border-line">
          {items.length === 0 && <p className="p-6 text-sm text-slate-400">Sin registros. Crea el primero con “Nuevo”.</p>}
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b border-line bg-surface/40 px-5 py-4 last:border-0 hover:bg-surface/70">
              {item.foto_url || item.imagen_url || item.logo_url ? (
                <img src={item.foto_url || item.imagen_url || item.logo_url} alt=""
                  className="h-12 w-12 shrink-0 rounded-lg border border-line bg-base object-contain" />
              ) : (
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-line bg-base font-mono text-xs text-slate-500">#{item.id}</span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-600 text-white">{label(item)}</p>
                <p className="truncate text-xs text-slate-400">{item.rol || item.autores || item.categoria || item.enlace || ''}</p>
              </div>
              <button onClick={() => editar(item)} aria-label="Editar"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-slate-300 hover:border-primary-400 hover:text-primary-300"><Pencil size={15} /></button>
              <button onClick={() => borrar(item.id)} aria-label="Eliminar"
                className="grid h-9 w-9 place-items-center rounded-lg border border-line text-slate-300 hover:border-red-500/60 hover:text-red-400"><Trash2 size={15} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
