document.addEventListener('DOMContentLoaded', function () {
  var nav    = document.querySelector('nav');
  var toggle = document.querySelector('.nav-toggle');
  var links  = document.querySelector('.nav-links');

  if (!toggle) return;

  toggle.addEventListener('click', function () {
    var isOpen = links.classList.toggle('nav-open');
    nav.classList.toggle('nav-open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  // Lukk ved klikk utenfor
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) {
      links.classList.remove('nav-open');
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Lukk ved navigasjon
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('nav-open');
      nav.classList.remove('nav-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
