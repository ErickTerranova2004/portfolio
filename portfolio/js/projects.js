const colabMedicalPreview = 'https://i.ibb.co/GvZ3Mbp4/Captura-de-pantalla-2026-09-22-234401.png';
const easyRentPreview = 'https://i.ibb.co/mV5r1zY1/Captura-de-pantalla-2026-09-22-233359.png';

const guiosPreview = 'https://i.ibb.co/5yj4kF2/Captura-de-pantalla-2026-09-22-234139.png';

const projects = [
  {
    id: 1,
    name: 'EasyRent',
    description:
      'Proyecto académico desarrollado como una plataforma web para la gestión y presentación de propiedades disponibles para alquiler.',
    problem:
      'Facilitar la gestión y presentación de propiedades disponibles para alquiler mediante una plataforma web.',
    technologies: ['Python', 'Django', 'HTML', 'CSS', 'JavaScript', 'SQL'],
    status: 'Proyecto académico',
    repo: 'https://github.com/AnghelloAlmeida/proyecto-final-Erick-Terranova.git',
    filters: ['Python', 'Django', 'JavaScript', 'SQL'],
    visual: 'project-visual-one',
    image: easyRentPreview
  },
  {
    id: 2,
    name: 'Modelo de predicción de costos médicos',
    description:
      'Proyecto académico de Machine Learning desarrollado en Google Colab para analizar y predecir costos médicos utilizando diferentes variables de un conjunto de datos.',
    problem:
      'Analizar datos médicos para identificar patrones y predecir costos con base en variables relevantes.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Google Colab'],
    status: 'Proyecto desarrollado en Google Colab.',
    repo: 'https://colab.research.google.com/drive/1d8lvYUD_Jkd1VeAIwDGO6f4ZmQOgxL5t?usp=sharing',
    filters: ['Python', 'Machine Learning'],
    visual: 'project-visual-two',
    image: colabMedicalPreview
  },
  {
    id: 3,
    name: 'GUIOSPRO_FLOSS',
    description:
      'Proyecto académico orientado a la gestión de proyectos de software mediante prácticas y metodologías ágiles.',
    problem:
      'Organizar y facilitar la gestión de actividades y seguimiento de proyectos de software bajo metodologías ágiles.',
    technologies: ['Python', 'Django', 'SQL'],
    status: 'Proyecto académico',
    repo: 'https://github.com/ErickTerranova2004/GUIOSPRO_FLOSS',
    filters: ['Python', 'Django', 'SQL'],
    visual: 'project-visual-guios',
    image: guiosPreview
  }
];

const projectGrid = document.getElementById('project-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalProblem = document.getElementById('modal-problem');
const modalTechnologies = document.getElementById('modal-technologies');
const modalStatus = document.getElementById('modal-status');
const modalRepo = document.getElementById('modal-repo');
const modalClose = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');

let activeFilter = 'all';

const renderProjects = (filter = 'all') => {
  if (!projectGrid) return;

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((project) => project.filters.includes(filter));

  projectGrid.innerHTML = filteredProjects
    .map(
      (project) => `
        <article class="project-card" data-project-id="${project.id}">
          <div class="project-visual ${project.visual}" aria-hidden="true">
            ${project.image ? `<img src="${project.image}" alt="${project.name}" />` : ''}
          </div>
          <div class="project-info">
            <div class="project-topline">
              <h3>${project.name}</h3>
              <span class="project-status">${project.status}</span>
            </div>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.technologies.slice(0, 5).map((tech) => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-actions">
              <button class="btn btn-outline detail-btn" type="button" data-project-id="${project.id}">Ver detalles</button>
              ${project.repo ? `<a class="btn btn-secondary" href="${project.repo}" target="_blank" rel="noreferrer">${project.name === 'Modelo de predicción de costos médicos' ? 'Ver Colab' : 'Ver repositorio'}</a>` : ''}
            </div>
          </div>
        </article>
      `
    )
    .join('');

  const detailButtons = document.querySelectorAll('.detail-btn');
  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const project = projects.find((item) => item.id === Number(button.dataset.projectId));
      if (!project) return;
      openModal(project);
    });
  });
};

const openModal = (project) => {
  if (!modal) return;

  modalTitle.textContent = project.name;
  modalDescription.textContent = project.description;
  modalProblem.textContent = project.problem;
  modalStatus.textContent = project.status;
  modalTechnologies.innerHTML = project.technologies.map((tech) => `<li>${tech}</li>`).join('');

  if (project.repo) {
    modalRepo.href = project.repo;
    modalRepo.style.display = 'inline-flex';
    modalRepo.textContent = project.name === 'Modelo de predicción de costos médicos' ? 'Ver Colab' : 'Ver repositorio';
  } else {
    modalRepo.href = '#';
    modalRepo.style.display = 'none';
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
};

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));
    renderProjects(activeFilter);
  });
});

modalClose?.addEventListener('click', closeModal);
modalBackdrop?.addEventListener('click', closeModal);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal?.classList.contains('is-open')) {
    closeModal();
  }
});

renderProjects(activeFilter);
