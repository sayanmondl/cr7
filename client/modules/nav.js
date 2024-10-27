import { gsap } from 'gsap';

const hamButton = document.getElementById('hamButton');
const hamMenu = document.querySelector('.hamburger-menu');

gsap.to('.navbar', {
  delay: 2,
  opacity: 1,
  duration: 0.3
});

hamButton.onclick = function () {
  gsap.fromTo(
    hamMenu,
    {
      scale: 0,
      x: 300
    },
    {
      scale: 1,
      x: 0,
      duration: 0.3,
      ease: 'back.out'
    }
  );

  setTimeout(() => {
    document.addEventListener('click', closeMenu);
  }, 0);
};

function closeMenu(event) {
  if (!hamMenu.contains(event.target) && !hamButton.contains(event.target)) {
    gsap.to(hamMenu, {
      scale: 0,
      x: 300,
      duration: 0.3,
      ease: 'back.in'
    });

    document.removeEventListener('click', closeMenu);
  }
}
