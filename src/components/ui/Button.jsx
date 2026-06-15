// frontend/src/components/ui/Button.jsx
import { ArrowRight } from 'lucide-react';

export default function Button({ children, href = '#', variant = 'primary', icon = true, as, onClick, type }) {
  const base = 'group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-600 transition-all duration-300';
  const variants = {
    primary: 'bg-primary-400 text-base hover:bg-primary-300 shadow-glow',
    outline: 'border border-line text-slate-200 hover:border-primary-400 hover:text-white',
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
  return <a href={href} className={cls}>{content}</a>;
}
