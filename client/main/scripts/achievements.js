import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function runAnimations() {
  gsap.to('.achievements-text', {
    opacity: 1,
    y: 0,
    ease: 'power1.inOut',
    scrollTrigger: {
      trigger: '.achievements-text',
      start: 'bottom bottom'
    }
  });

  gsap.fromTo(
    '.achievements-para',
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.achievements-para',
        start: 'bottom bottom'
      }
    }
  );
}

const carousel = document.querySelector('.achievements-carousel');
const carouselItems = document.querySelectorAll('.achievements-carousel-item');
const len = carouselItems.length;
let activeIndex = Math.floor(len / 2);
let startX = 0;
let isDragging = false;

let initialWidth;

const setInitialWidth = () => {
  if (window.matchMedia('(max-width: 520px)').matches) {
    initialWidth = 200;
  } else if (window.matchMedia('(max-width: 750px)').matches) {
    initialWidth = 225;
  } else {
    initialWidth = 300;
  }
};

setInitialWidth();

const updateCarousel = () => {
  carouselItems.forEach((item, index) => {
    const offset = index - activeIndex;
    const scale = 1 - 0.1 * Math.abs(offset);
    const width = index === activeIndex ? initialWidth * 1.2 : initialWidth;

    item.style.transform = `translate(-50%, -50%) translateX(${offset * (initialWidth * 0.65)}px) scale(${scale})`;
    item.style.width = `${width}px`;
    item.style.zIndex = 6 - Math.abs(offset);

    const texts = item.querySelector('.carousel-text');
    const image = item.querySelector('img');

    setTimeout(() => {
      texts.style.opacity = index === activeIndex ? 1 : 0;
    }, 400);

    image.style.opacity = index === activeIndex ? 0.4 : 0.7;
  });
};

const changeIndex = direction => {
  if (direction === 'left') {
    activeIndex = (activeIndex - 1 + len) % len;
  } else if (direction === 'right') {
    activeIndex = (activeIndex + 1) % len;
  }
  updateCarousel();
};

document.getElementById('leftButton').onclick = () => changeIndex('left');
document.getElementById('rightButton').onclick = () => changeIndex('right');

const startDrag = e => {
  isDragging = true;
  startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
  carousel.style.userSelect = 'none';
};

const onDrag = e => {
  if (!isDragging) return;
  const currentX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
  const diff = currentX - startX;

  if (Math.abs(diff) > 50) {
    changeIndex(diff > 0 ? 'left' : 'right');
    isDragging = false;
  }
};

const endDrag = () => {
  isDragging = false;
  carousel.style.userSelect = 'text';
};

carousel.addEventListener('mousedown', startDrag);
carousel.addEventListener('mousemove', onDrag);
carousel.addEventListener('mouseup', endDrag);
carousel.addEventListener('touchstart', startDrag);
carousel.addEventListener('touchmove', onDrag);
carousel.addEventListener('touchend', endDrag);

let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    setInitialWidth();
    updateCarousel();
  }, 500);
});

updateCarousel();

runAnimations();
