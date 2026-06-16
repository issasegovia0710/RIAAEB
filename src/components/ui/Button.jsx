// frontend/src/components/ui/Button.jsx
import { ArrowRight } from 'lucide-react';

export default function Button({ children, href = '#', variant = 'primary', icon = true, as, onClick, type }) {
  const base =
    'btn-shine group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-600 transition-all duration-300';
  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-primary-400 text-base shadow-[0_0_0_1px_rgba(77,141,255,.4),0_8px_30px_rgba(77,141,255,.35)] hover:shadow-[0_0_0_1px_rgba(56,225,255,.6),0_10px_40px_rgba(56,225,255,.45)] hover:-translate-y-0.5',
    outline:
      'border border-line bg-surface/40 text-slate-200 backdrop-blur hover:border-primary-400 hover:text-white hover:-translate-y-0.5',
  };
  const cls = `${base} ${variants[variant]}`;
  const content = (
    <>
      {children}
      {icon && <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (as === 'button') {
    return <button type={type || 'button'} onClick={onClick} className={cls}>{content}</button>;
  }
  return <a href={href} onClick={onClick} className={cls}>{content}</a>;
}
