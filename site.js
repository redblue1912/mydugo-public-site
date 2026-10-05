const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');
const header = document.querySelector('.site-header');

if (menuButton && navigation) {
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    navigation.classList.toggle('is-open', open);
  };

  menuButton.addEventListener('click', () => {
    setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuOpen(false);
      menuButton.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (menuButton.getAttribute('aria-expanded') === 'true' &&
        !menuButton.contains(event.target) && !navigation.contains(event.target)) {
      setMenuOpen(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1020) setMenuOpen(false);
  });
}

if (header) {
  const updateHeader = () => header.classList.toggle('is-compact', window.scrollY > 24);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const roleButtons = [...document.querySelectorAll('.role-switcher button[data-role]')];
const roleShots = [...document.querySelectorAll('.role-shot[data-role]')];
const roleDetails = [...document.querySelectorAll('.role-detail[data-role]')];
const roleStage = document.querySelector('.role-stage');
if (roleStage && roleButtons.length === 3 && roleShots.length === 3) {
  const roles = roleButtons.map((button) => button.dataset.role);
  const selectRole = (role) => {
    const index = roles.indexOf(role);
    if (index < 0) return;
    const next = roles[(index + 1) % roles.length];
    roleStage.setAttribute('aria-label', `MyDugo ${role} Flutter widget preview`);
    roleButtons.forEach((button) => {
      const selected = button.dataset.role === role;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    roleShots.forEach((shot) => {
      const selected = shot.dataset.role === role;
      shot.classList.toggle('is-active', selected);
      shot.classList.toggle('is-next', shot.dataset.role === next);
      shot.setAttribute('aria-hidden', String(!selected));
    });
    roleDetails.forEach((detail) => { detail.hidden = detail.dataset.role !== role; });
  };
  roleButtons.forEach((button) => button.addEventListener('click', () => selectRole(button.dataset.role)));
}
