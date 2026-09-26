const body = document.body;
const themeToggleBtn = document.getElementById('theme-toggle');
const themeLabel = document.querySelector('.theme-label');
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.nav-links a');
const backToTopBtn = document.querySelector('.back-to-top');

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') {
  body.setAttribute('data-theme', 'light');
  if (themeLabel) {
    themeLabel.textContent = 'Light Mode';
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const isLight = body.getAttribute('data-theme') === 'light';
    body.setAttribute('data-theme', isLight ? 'dark' : 'light');
    localStorage.setItem('portfolio-theme', isLight ? 'dark' : 'light');

    if (themeLabel) {
      themeLabel.textContent = isLight ? 'Dark Mode' : 'Light Mode';
    }
  });
}

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const sections = document.querySelectorAll('main section[id]');
const setActiveLink = () => {
  const scrollPosition = window.scrollY + 120;

  sections.forEach((section) => {
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);

    if (!link) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((navLink) => navLink.classList.remove('active'));
      link.classList.add('active');
    }
  });
};

window.addEventListener('scroll', () => {
  if (window.scrollY > 250) {
    backToTopBtn?.classList.add('visible');
  } else {
    backToTopBtn?.classList.remove('visible');
  }

  setActiveLink();
});

backToTopBtn?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
