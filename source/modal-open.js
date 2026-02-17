document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.modal-open').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      const target = el.getAttribute('href');
      if (target && document.querySelector(target)) {
        document.querySelector(target).style.display = 'block';
      }
    });
  });

  document.querySelectorAll('.modal .close').forEach(function (el) {
    el.addEventListener('click', function () {
      const modal = el.closest('.modal');
      if (modal) modal.style.display = 'none';
    });
  });
});