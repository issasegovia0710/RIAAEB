// frontend/src/components/Contact.jsx
import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import SectionTitle from './ui/SectionTitle.jsx';
import { enviarContacto } from '../lib/api.js';

const INICIAL = { nombre: '', correo: '', telefono: '', asunto: '', mensaje: '' };

const DATOS = [
  { icon: Mail, label: 'Correo', valor: 'contacto@red-ia-equidad.org' },
  { icon: Phone, label: 'Teléfono', valor: '+52 747 000 0000' },
  { icon: MapPin, label: 'Ubicación', valor: 'Chilpancingo, Guerrero, México' },
];

export default function Contact() {
  const [form, setForm] = useState(INICIAL);
  const [estado, setEstado] = useState('idle');
  const [mensaje, setMensaje] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setEstado('enviando');
    setMensaje('');
    try {
      const res = await enviarContacto(form);
      setEstado('ok');
      setMensaje(res?.mensaje || 'Mensaje enviado correctamente.');
      setForm(INICIAL);
    } catch (err) {
      setEstado('error');
      setMensaje(err.message);
    }
  };

  return (
    <section id="contacto" className="border-t border-line py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionTitle
          index="05"
          eyebrow="Contacto"
          title="Escríbenos"
          subtitle="¿Tienes una propuesta de colaboración, una pregunta o quieres acceder a nuestros recursos? Completa el formulario y te responderemos."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-5">
          <form onSubmit={onSubmit} className="lg:col-span-3 rounded-2xl border border-line bg-surface/60 p-7">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nombre" name="nombre" value={form.nombre} onChange={onChange} required />
              <Field label="Correo" name="correo" type="email" value={form.correo} onChange={onChange} required />
              <Field label="Teléfono" name="telefono" value={form.telefono} onChange={onChange} />
              <Field label="Asunto" name="asunto" value={form.asunto} onChange={onChange} required />
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-400">Mensaje</label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={onChange}
                required
                rows={5}
                placeholder="Cuéntanos en qué podemos colaborar…"
                className="w-full resize-none rounded-xl border border-line bg-base/60 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-slate-600 focus:border-primary-400"
              />
            </div>
            <button
              type="submit"
              disabled={estado === 'enviando'}
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-400 px-7 py-3.5 text-sm font-600 text-base transition-all duration-300 hover:bg-primary-300 disabled:opacity-60"
            >
              {estado === 'enviando' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
            </button>

            {estado === 'ok' && (
              <p className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                <CheckCircle2 size={16} /> {mensaje}
              </p>
            )}
            {estado === 'error' && (
              <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{mensaje}</p>
            )}
          </form>

          <div className="lg:col-span-2">
            <div className="space-y-4">
              {DATOS.map((d) => (
                <div key={d.label} className="flex items-start gap-4 rounded-xl border border-line bg-surface/60 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary-400/10 text-primary-300">
                    <d.icon size={19} />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-slate-500">{d.label}</p>
                    <p className="font-500 text-white">{d.valor}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-line">
              <iframe
                title="Ubicación"
                className="h-56 w-full grayscale"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-99.55%2C17.52%2C-99.45%2C17.58&layer=mapnik"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, type = 'text', required = false }) {
  return (
    <div>
      <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate-400">
        {label}{required && <span className="text-primary-400"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full rounded-xl border border-line bg-base/60 px-4 py-3 text-sm text-white outline-none transition-colors focus:border-primary-400"
      />
    </div>
  );
}
