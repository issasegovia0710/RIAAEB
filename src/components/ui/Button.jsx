// frontend/src/components/ui/Button.jsx
import { ArrowRight } from 'lucide-react';

export default function Button({ children, href = '#', variant = 'primary', icon = true, as, onClick, type }) {
  const base =
    'btn-shine group inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-600 transition-all duration-300';
  const variants = {
    primary:
      'bg-gradient-to-r from-primary-500 to-primary-400 text-white shadow-[0_8px_30px_rgba(225,29,58,.30)] hover:shadow-[0_12px_40px_rgba(225,29,58,.45)] hover:-translate-y-0.5',
    outline:
      'border border-line bg-white text-ink hover:border-primary-400 hover:text-primary-600 hover:-translate-y-0.5 hover:shadow-card',
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
