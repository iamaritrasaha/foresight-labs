const root = document.documentElement;
const saved = localStorage.getItem('fl-theme');
if (saved) root.dataset.theme = saved;

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('fl-theme', next);
});

const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav?.classList.toggle('is-open', !open);
});

window.addEventListener('scroll', () => {
  document.querySelector('[data-header]')?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });
