const root = document.documentElement;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(pointer: fine)');
const saved = localStorage.getItem('fl-theme');
if (saved) root.dataset.theme = saved;

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('fl-theme', next);
});

const menu = document.querySelector<HTMLButtonElement>('.menu-toggle');
const nav = document.querySelector<HTMLElement>('.site-nav');
const closeMenu = () => { menu?.setAttribute('aria-expanded', 'false'); nav?.classList.remove('is-open'); };
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('is-open', !open);
});
document.addEventListener('click', (event) => { if (nav?.classList.contains('is-open') && !nav.contains(event.target as Node) && event.target !== menu) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('scroll', () => document.querySelector('[data-header]')?.classList.toggle('is-scrolled', window.scrollY > 24), { passive: true });

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const field = document.querySelector<HTMLElement>('[data-intelligence-field]');
const canvas = field?.querySelector<HTMLCanvasElement>('canvas');
if (field && canvas && !prefersReduced.matches) {
  const context = canvas.getContext('2d');
  const points = Array.from({ length: 34 }, (_, index) => ({ angle: index * .92, radius: 65 + (index % 6) * 35, speed: (index % 2 ? 1 : -1) * (.0007 + (index % 4) * .0002), size: 1.2 + index % 3 * .4 }));
  let frame = 0; let visible = true; let pointerX = 0; let pointerY = 0; let width = 0; let height = 0;
  const resize = () => { const rect = field.getBoundingClientRect(); const ratio = Math.min(window.devicePixelRatio || 1, 1.5); width = rect.width; height = rect.height; canvas.width = width * ratio; canvas.height = height * ratio; canvas.style.width = `${width}px`; canvas.style.height = `${height}px`; context?.setTransform(ratio, 0, 0, ratio, 0, 0); };
  const draw = (time: number) => { if (!visible || !context) return; context.clearRect(0, 0, width, height); const cx = width * (.55 + pointerX * .025); const cy = height * (.5 + pointerY * .025); const dots = points.map((point) => { point.angle += point.speed * 16; return { x: cx + Math.cos(point.angle) * point.radius, y: cy + Math.sin(point.angle) * point.radius * .68, size: point.size }; }); context.lineWidth = .7; dots.forEach((dot, index) => { const next = dots[(index + 1) % dots.length]; context.strokeStyle = `rgba(102, 129, 190, ${index % 4 === 0 ? .3 : .12})`; context.beginPath(); context.moveTo(dot.x, dot.y); context.lineTo(next.x, next.y); context.stroke(); if (index % 3 === 0) { context.beginPath(); context.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2); context.fillStyle = index % 2 ? 'rgba(84,168,194,.75)' : 'rgba(123,103,200,.7)'; context.fill(); } }); context.beginPath(); context.arc(cx, cy, 72 + Math.sin(time / 700) * 5, 0, Math.PI * 2); context.strokeStyle = 'rgba(122,143,203,.18)'; context.stroke(); frame = requestAnimationFrame(draw); };
  const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible && !frame) frame = requestAnimationFrame(draw); if (!visible && frame) { cancelAnimationFrame(frame); frame = 0; } }); visibility.observe(field); resize(); window.addEventListener('resize', resize); field.addEventListener('pointermove', (event) => { const rect = field.getBoundingClientRect(); pointerX = (event.clientX - rect.left) / rect.width - .5; pointerY = (event.clientY - rect.top) / rect.height - .5; }); frame = requestAnimationFrame(draw);
}

if (finePointer.matches && !prefersReduced.matches) document.querySelectorAll<HTMLElement>('[data-tilt-card]').forEach((card) => { const art = card.querySelector<HTMLElement>('[data-spotlight]'); card.addEventListener('pointermove', (event) => { const rect = card.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; card.style.transform = `perspective(900px) rotateX(${(y / rect.height - .5) * -2}deg) rotateY(${(x / rect.width - .5) * 2}deg)`; art?.style.setProperty('--mx', `${x}px`); art?.style.setProperty('--my', `${y}px`); }); card.addEventListener('pointerleave', () => { card.style.transform = ''; }); });

const productDescriptions: Record<string, string> = { foresight: 'A calm layer for personal context, memory and intent.', aura: 'A considered reading space for information that matters.', novarx: 'A clearer way to explore health and medicine information.' };
document.querySelectorAll<HTMLElement>('[data-eco-node]').forEach((node) => { const select = () => { document.querySelectorAll('[data-eco-node]').forEach((item) => item.setAttribute('aria-selected', 'false')); node.setAttribute('aria-selected', 'true'); const detail = document.querySelector<HTMLElement>('[data-eco-detail] p'); if (detail) detail.textContent = productDescriptions[node.dataset.ecoNode || ''] || ''; }; node.addEventListener('mouseenter', select); node.addEventListener('focus', select); });
