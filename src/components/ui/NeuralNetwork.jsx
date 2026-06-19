// frontend/src/components/ui/NeuralNetwork.jsx
import { useEffect, useRef } from 'react';

/**
 * Red neuronal animada en <canvas> — versión intensa.
 * - Más nodos y conexiones, líneas más brillantes.
 * - Pulsos de luz frecuentes viajando por las conexiones.
 * - Nodos con parpadeo y halo; reacción al cursor (atracción + iluminación).
 * - Capa de "estrellas" lejanas para dar profundidad.
 * Respeta prefers-reduced-motion (queda estático).
 */
export default function NeuralNetwork({ density = 0.00026, intensity = 1 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes = [];
    let stars = [];
    let pulses = [];
    const mouse = { x: -9999, y: -9999 };

    const COL_LINE = '225,29,58';
    const COL_NODE = '225,29,58';
    const COL_GLOW = '255,90,110';

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    }

    function init() {
      const count = Math.max(40, Math.min(120, Math.floor(width * height * density)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.7 + 1.2,
        phase: Math.random() * Math.PI * 2,
      }));
      const sc = Math.floor(width * height * 0.00012);
      stars = Array.from({ length: sc }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.1 + 0.3,
        a: Math.random() * 0.5 + 0.1,
        tw: Math.random() * Math.PI * 2,
      }));
      pulses = [];
    }

    const LINK_DIST = 150;

    function step() {
      ctx.clearRect(0, 0, width, height);
      const time = performance.now() / 1000;

      for (const s of stars) {
        const a = reduce ? s.a : s.a * (0.6 + 0.4 * Math.sin(time + s.tw));
        ctx.fillStyle = `rgba(225,29,58,${a*0.5})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dxm = mouse.x - n.x;
        const dym = mouse.y - n.y;
        const dm = Math.hypot(dxm, dym);
        if (dm < 180) {
          n.x += (dxm / dm) * 0.5;
          n.y += (dym / dm) * 0.5;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.32 * intensity;
            ctx.strokeStyle = `rgba(${COL_LINE},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();

            if (!reduce && Math.random() < 0.0022 * intensity) {
              pulses.push({ a, b, t: 0, speed: 0.014 + Math.random() * 0.022 });
            }
          }
        }
      }

      for (let k = pulses.length - 1; k >= 0; k--) {
        const p = pulses[k];
        p.t += p.speed;
        if (p.t >= 1) { pulses.splice(k, 1); continue; }
        const px = p.a.x + (p.b.x - p.a.x) * p.t;
        const py = p.a.y + (p.b.y - p.a.y) * p.t;
        const g = ctx.createRadialGradient(px, py, 0, px, py, 7);
        g.addColorStop(0, `rgba(${COL_GLOW},0.95)`);
        g.addColorStop(1, `rgba(${COL_GLOW},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        const dm = Math.hypot(mouse.x - n.x, mouse.y - n.y);
        const near = dm < 180;
        const twinkle = reduce ? 0.8 : 0.6 + Math.sin(time * 1.8 + n.phase) * 0.3;

        const haloR = n.r * (near ? 7 : 4.5);
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        halo.addColorStop(0, `rgba(${near ? COL_GLOW : COL_NODE},${0.28 * twinkle})`);
        halo.addColorStop(1, `rgba(${COL_NODE},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${near ? COL_GLOW : '225,29,58'},${twinkle*0.6})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() { mouse.x = -9999; mouse.y = -9999; }

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    if (reduce) {
      step();
      cancelAnimationFrame(rafRef.current);
    } else {
      rafRef.current = requestAnimationFrame(step);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [density, intensity]);

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />;
}
