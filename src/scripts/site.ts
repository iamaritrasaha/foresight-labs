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
menu?.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') === 'true'; menu.setAttribute('aria-expanded', String(!open)); nav?.classList.toggle('is-open', !open); });
document.addEventListener('click', (event) => { if (nav?.classList.contains('is-open') && !nav.contains(event.target as Node) && event.target !== menu) closeMenu(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
window.addEventListener('scroll', () => document.querySelector('[data-header]')?.classList.toggle('is-scrolled', window.scrollY > 24), { passive: true });

const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const field = document.querySelector<HTMLElement>('[data-intelligence-field]');
const canvas = field?.querySelector<HTMLCanvasElement>('canvas');
if (field && canvas && !prefersReduced.matches) {
  const context = canvas.getContext('2d');
  type FieldPoint = { angle: number; radius: number; speed: number; size: number; depth: number; phase: number; wobble: number };
  type RenderedPoint = { x: number; y: number; size: number; depth: number };
  let points: FieldPoint[] = [];
  let frame = 0; let resizeFrame = 0; let visible = true; let width = 0; let height = 0;
  let pointerInside = false; let pointerX = 0; let pointerY = 0; let lastPointerAt = 0; let pinStrength = 0;

  const makePoints = (count: number): FieldPoint[] => Array.from({ length: count }, (_, index) => ({
    angle: index * 2.399963,
    radius: .13 + (index % 11) / 22,
    speed: (index % 2 ? 1 : -1) * (.000018 + (index % 5) * .000004),
    size: 1.1 + (index % 4) * .38,
    depth: .35 + (index % 7) / 10,
    phase: index * .73,
    wobble: 5 + (index % 6) * 2.4
  }));

  const resize = () => {
    const rect = field.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
    width = rect.width; height = rect.height;
    canvas.width = Math.round(width * ratio); canvas.height = Math.round(height * ratio);
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    points = makePoints(width < 760 ? 24 : 42);
  };

  const queueResize = () => {
    if (resizeFrame) return;
    resizeFrame = requestAnimationFrame(() => { resizeFrame = 0; resize(); });
  };

  const draw = (time: number) => {
    frame = 0;
    if (!visible || document.hidden || !context) return;
    context.clearRect(0, 0, width, height);

    const idle = pointerInside && time - lastPointerAt > 680;
    pinStrength += ((idle ? 1 : 0) - pinStrength) * (idle ? .065 : .16);
    const spread = Math.max(width, height) * .9;
    const pointerOffsetX = pointerInside ? (pointerX / Math.max(width, 1) - .5) * width * .035 : 0;
    const pointerOffsetY = pointerInside ? (pointerY / Math.max(height, 1) - .5) * height * .035 : 0;
    const cx = width * .55 + pointerOffsetX + Math.sin(time * .00007) * width * .025;
    const cy = height * .46 + pointerOffsetY + Math.cos(time * .00006) * height * .03;

    const dots: RenderedPoint[] = points.map((point) => {
      const angle = point.angle + time * point.speed;
      const radius = spread * point.radius + Math.sin(time * .00024 + point.phase) * point.wobble;
      let x = cx + Math.cos(angle) * radius;
      let y = cy + Math.sin(angle) * radius * (.54 + point.depth * .08);
      if (pinStrength > .01) {
        const dx = pointerX - x; const dy = pointerY - y; const distance = Math.hypot(dx, dy);
        const pull = Math.max(0, 1 - distance / 270) * pinStrength * .095;
        x += dx * pull; y += dy * pull;
      }
      return { x, y, size: point.size, depth: point.depth };
    });

    context.lineWidth = .72;
    dots.forEach((dot, index) => {
      let neighbours = 0;
      for (let nextIndex = index + 1; nextIndex < dots.length && neighbours < 2; nextIndex += 1) {
        const next = dots[nextIndex];
        const distance = Math.hypot(next.x - dot.x, next.y - dot.y);
        const limit = Math.min(270, Math.max(155, width * .2));
        if (distance < limit) {
          const alpha = (1 - distance / limit) * (.16 + dot.depth * .07);
          context.strokeStyle = `rgba(112, 139, 198, ${alpha})`;
          context.beginPath(); context.moveTo(dot.x, dot.y); context.lineTo(next.x, next.y); context.stroke();
          neighbours += 1;
        }
      }
      const next = dots[(index + 1) % dots.length];
      context.strokeStyle = `rgba(112, 139, 198, ${index % 5 === 0 ? .16 : .07})`;
      context.beginPath(); context.moveTo(dot.x, dot.y); context.lineTo(next.x, next.y); context.stroke();
    });

    const signalColours = ['rgba(93,174,207,.92)', 'rgba(136,112,218,.9)', 'rgba(73,166,151,.88)'];
    for (let signal = 0; signal < 6; signal += 1) {
      const startIndex = (signal * 7) % dots.length;
      const start = dots[startIndex]; const end = dots[(startIndex + 1) % dots.length];
      const progress = (time * (.000025 + signal * .000002) + signal * .17) % 1;
      const x = start.x + (end.x - start.x) * progress; const y = start.y + (end.y - start.y) * progress;
      context.beginPath(); context.arc(x, y, 1.65, 0, Math.PI * 2);
      context.fillStyle = signalColours[signal % signalColours.length];
      context.shadowBlur = 10; context.shadowColor = signalColours[signal % signalColours.length]; context.fill(); context.shadowBlur = 0;
    }

    dots.forEach((dot, index) => {
      context.beginPath(); context.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      context.fillStyle = signalColours[index % signalColours.length];
      context.fill();
    });

    if (pinStrength > .01) {
      const nearest = dots.map((dot) => ({ dot, distance: Math.hypot(dot.x - pointerX, dot.y - pointerY) })).sort((a, b) => a.distance - b.distance).slice(0, 5);
      nearest.forEach(({ dot, distance }) => {
        const alpha = Math.max(0, 1 - distance / 420) * pinStrength * .62;
        context.strokeStyle = `rgba(103, 137, 215, ${alpha})`;
        context.beginPath(); context.moveTo(pointerX, pointerY); context.lineTo(dot.x, dot.y); context.stroke();
      });
      const pulse = 6.5 + Math.sin(time * .004) * 1.4;
      context.beginPath(); context.arc(pointerX, pointerY, pulse, 0, Math.PI * 2);
      context.strokeStyle = `rgba(110, 151, 229, ${pinStrength * .5})`; context.stroke();
      context.beginPath(); context.arc(pointerX, pointerY, 2.1, 0, Math.PI * 2);
      context.fillStyle = `rgba(113, 177, 215, ${pinStrength * .95})`;
      context.shadowBlur = 13; context.shadowColor = 'rgba(109,162,226,.9)'; context.fill(); context.shadowBlur = 0;
    }

    frame = requestAnimationFrame(draw);
  };

  const schedule = () => { if (!frame && visible && !document.hidden) frame = requestAnimationFrame(draw); };
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) schedule();
    else if (frame) { cancelAnimationFrame(frame); frame = 0; }
  });
  visibility.observe(field);
  resize();
  window.addEventListener('resize', queueResize, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; }
    else schedule();
  });
  if (finePointer.matches) {
    window.addEventListener('pointermove', (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      const rect = field.getBoundingClientRect();
      pointerX = event.clientX - rect.left; pointerY = event.clientY - rect.top;
      pointerInside = pointerX >= 0 && pointerX <= rect.width && pointerY >= 0 && pointerY <= rect.height;
      lastPointerAt = event.timeStamp;
    }, { passive: true });
    window.addEventListener('blur', () => { pointerInside = false; });
    document.addEventListener('mouseout', (event) => { if (!event.relatedTarget) pointerInside = false; });
  }
  schedule();
}

if (finePointer.matches && !prefersReduced.matches) document.querySelectorAll<HTMLElement>('[data-tilt-card]').forEach((card) => { const art = card.querySelector<HTMLElement>('[data-spotlight]'); card.addEventListener('pointermove', (event) => { const rect = card.getBoundingClientRect(); const x = event.clientX - rect.left; const y = event.clientY - rect.top; card.style.transform = `perspective(900px) rotateX(${(y / rect.height - .5) * -2}deg) rotateY(${(x / rect.width - .5) * 2}deg)`; art?.style.setProperty('--mx', `${x}px`); art?.style.setProperty('--my', `${y}px`); }); card.addEventListener('pointerleave', () => { card.style.transform = ''; }); });

const productDescriptions: Record<string, string> = { foresight: 'A calm layer for personal context, memory and intent.', aura: 'A considered reading space for information that matters.', novarx: 'A clearer way to explore health and medicine information.' };
const ecosystem = document.querySelector<HTMLElement>('.ecosystem');
const ecosystemSvg = ecosystem?.querySelector<SVGSVGElement>('[data-ecosystem-lines]');
const syncEcosystemLines = () => {
  if (!ecosystem || !ecosystemSvg) return;
  const bounds = ecosystem.getBoundingClientRect();
  const mark = ecosystem.querySelector<HTMLElement>('.ecosystem-center .mark-large');
  if (!mark || !bounds.width || !bounds.height) return;
  const markBounds = mark.getBoundingClientRect();
  const sourceX = markBounds.left - bounds.left + markBounds.width / 2;
  const sourceY = markBounds.top - bounds.top + markBounds.height / 2;
  ecosystemSvg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
  ecosystem.querySelectorAll<HTMLElement>('[data-eco-node]').forEach((node) => {
    const line = ecosystemSvg.querySelector<SVGPathElement>(`[data-eco-line="${node.dataset.ecoNode}"]`);
    if (!line) return;
    const targetBounds = node.getBoundingClientRect();
    const targetCenterX = targetBounds.left - bounds.left + targetBounds.width / 2;
    const targetCenterY = targetBounds.top - bounds.top + targetBounds.height / 2;
    const dx = targetCenterX - sourceX; const dy = targetCenterY - sourceY;
    const distance = Math.max(1, Math.hypot(dx, dy));
    const startX = sourceX + dx / distance * markBounds.width * .48;
    const startY = sourceY + dy / distance * markBounds.height * .48;
    const edgeScale = Math.min((targetBounds.width / 2) / Math.max(Math.abs(dx), 1), (targetBounds.height / 2) / Math.max(Math.abs(dy), 1));
    const endX = targetCenterX - dx * edgeScale;
    const endY = targetCenterY - dy * edgeScale;
    line.setAttribute('d', `M ${startX} ${startY} C ${startX + dx * .32} ${startY}, ${endX - dx * .24} ${endY}, ${endX} ${endY}`);
  });
};
if (ecosystem && ecosystemSvg) {
  syncEcosystemLines();
  window.addEventListener('resize', syncEcosystemLines, { passive: true });
  document.fonts?.ready.then(syncEcosystemLines);
  if ('ResizeObserver' in window) new ResizeObserver(syncEcosystemLines).observe(ecosystem);
}
document.querySelectorAll<HTMLElement>('[data-eco-node]').forEach((node) => {
  const select = () => {
    document.querySelectorAll('[data-eco-node]').forEach((item) => item.setAttribute('aria-selected', 'false'));
    document.querySelectorAll('[data-eco-line]').forEach((line) => line.classList.toggle('is-active', line.getAttribute('data-eco-line') === node.dataset.ecoNode));
    node.setAttribute('aria-selected', 'true');
    const detail = document.querySelector<HTMLElement>('[data-eco-detail] p');
    if (detail) detail.textContent = productDescriptions[node.dataset.ecoNode || ''] || '';
  };
  node.addEventListener('mouseenter', select); node.addEventListener('focus', select);
});
