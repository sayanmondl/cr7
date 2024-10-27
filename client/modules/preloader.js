const loader = document.getElementById('preloader');
const app = document.querySelector('.app');

document.addEventListener('DOMContentLoaded', function () {
  setTimeout(() => {
    app.style.opacity = 1;
    loader.style.opacity = 0;
    loader.style.zIndex = -1;
  }, 500);
});
