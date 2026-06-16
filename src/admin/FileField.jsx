// frontend/src/admin/FileField.jsx
import { useState } from 'react';
import { Upload, Loader2, Link2 } from 'lucide-react';
import { subirArchivo } from '../lib/api.js';

export default function FileField({ label, value, onChange }) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');
  const [modoUrl, setModoUrl] = useState(false);

  const onFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendo(true); setError('');
    try {
      const { url } = await subirArchivo(file);
      onChange(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label className="font-mono text-xs uppercase tracking-wider text-slate-400">{label}</label>
        <button type="button" onClick={() => setModoUrl((v) => !v)}
          className="inline-flex items-center gap-1 text-[11px] text-primary-400 hover:text-primary-300">
          <Link2 size={11} /> {modoUrl ? 'Subir archivo' : 'Pegar URL'}
        </button>
      </div>

      <div className="flex items-center gap-3">
        {value && (
          <img src={value} alt="vista previa"
            className="h-14 w-14 shrink-0 rounded-lg border border-line bg-base object-contain" />
        )}
        <div className="flex-1">
          {modoUrl ? (
            <input
              type="text" value={value || ''} onChange={(e) => onChange(e.target.value)}
              placeholder="https://…"
              className="w-full rounded-lg border border-line bg-base px-3 py-2.5 text-sm text-white outline-none focus:border-primary-400"
            />
          ) : (
            <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-line bg-base px-3 py-2.5 text-sm text-slate-300 hover:border-primary-400">
              {subiendo ? <Loader2 size={15} className="animate-spin" /> : <Upload size={15} />}
              {subiendo ? 'Subiendo…' : 'Seleccionar imagen'}
              <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={subiendo} />
            </label>
          )}
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
}
