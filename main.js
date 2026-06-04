let translations = {};
let currentLang = 'es';

async function loadTranslations() {
  const res = await fetch('./translations.json');
  translations = await res.json();
  applyTranslation('es');
}

function applyTranslation(lang) {
  currentLang = lang;
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (!t[key]) return;

    if (el.tagName === 'H2' && el.classList.contains('section-title')) {
      el.innerHTML = t[key].replace(/(.+\s)(\S+)$/, '$1<em>$2</em>');
    } else {
      el.textContent = t[key];
    }
  });

  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.lang = lang;
}

function initLangSwitcher() {
  document.querySelectorAll('.lang-opt').forEach(btn => {
    btn.addEventListener('click', () => applyTranslation(btn.dataset.lang));
  });
}

function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    btn.textContent = isDark ? '☾' : '☀';
  });
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  initLangSwitcher();
  initThemeToggle();
  initScrollReveal();
  loadTranslations();
});
