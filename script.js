(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = [...document.querySelectorAll('.nav-link')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const toTop = document.querySelector('.to-top');

  // Restore a saved theme, otherwise follow the visitor's system preference.
  const savedTheme = localStorage.getItem('bharath-portfolio-theme');
  const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedTheme || (preferredDark ? 'dark' : 'light'));

  function setTheme(theme) {
    root.dataset.theme = theme;
    const dark = theme === 'dark';
    themeIcon.textContent = dark ? '☀' : '☾';
    themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#17151d' : '#fff8fa';
  }

  themeButton.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('bharath-portfolio-theme', next);
  });

  function closeMenu() {
    navLinks.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
  }
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    menuButton.setAttribute('aria-label', opening ? 'Close navigation' : 'Open navigation');
    navLinks.classList.toggle('open', opening);
  });
  navItems.forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

  // Reveal sections as they enter the viewport. Keep content visible if unsupported.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Update the active navigation item and back-to-top control on scroll.
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }
  const updateScrollControls = () => toTop.classList.toggle('visible', window.scrollY > 500);
  window.addEventListener('scroll', updateScrollControls, { passive: true });
  updateScrollControls();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  document.querySelector('#year').textContent = new Date().getFullYear();

  // Validate locally, then prepare a mailto draft. No form data is sent to a server.
  const form = document.querySelector('#contact-form');
  const status = document.querySelector('#form-status');
  const validators = {
    name: value => value.trim().length >= 2 ? '' : 'Please enter at least 2 characters.',
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? '' : 'Please enter a valid email address.',
    message: value => value.trim().length >= 10 ? '' : 'Please enter at least 10 characters.'
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    let valid = true;
    Object.entries(validators).forEach(([field, validate]) => {
      const input = form.elements[field];
      const error = document.querySelector(`#${field}-error`);
      const message = validate(input.value);
      error.textContent = message;
      input.setAttribute('aria-invalid', String(Boolean(message)));
      if (message) valid = false;
    });
    if (!valid) {
      status.textContent = 'Please correct the highlighted fields and try again.';
      form.querySelector('[aria-invalid="true"]').focus();
      return;
    }
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    status.textContent = 'Opening your email application with the message details…';
    window.location.href = `mailto:mbarathu635@gmail.com?subject=${subject}&body=${body}`;
  });
  Object.keys(validators).forEach(field => {
    form.elements[field].addEventListener('input', () => {
      const error = document.querySelector(`#${field}-error`);
      if (error.textContent) {
        error.textContent = validators[field](form.elements[field].value);
        form.elements[field].setAttribute('aria-invalid', String(Boolean(error.textContent)));
      }
    });
  });
})();
