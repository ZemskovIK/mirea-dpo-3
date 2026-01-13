document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('#navbarBurger');
  const menu = document.querySelector('#navbarMenu');
  const html = document.documentElement;

  if (burger && menu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');

      if (menu.classList.contains('is-active')) {
        html.classList.add('no-scroll');
      } else {
        html.classList.remove('no-scroll');
      }
    });
  }

  document.querySelectorAll('.navbar-item').forEach(item => {
    item.addEventListener('click', () => {
      if (burger && menu) {
        burger.classList.remove('is-active');
        menu.classList.remove('is-active');
        html.classList.remove('no-scroll');
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      if (this.getAttribute('href') === '#') return;

      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
});