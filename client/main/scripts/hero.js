import gsap from 'gsap';

async function runAnimations() {
  const tl = gsap.timeline();

  tl.to('.hero', {
    opacity: 1,
    duration: 1.2,
    ease: 'power1.inOut'
  })
    .fromTo(
      '.hero-text-line',
      {
        opacity: 0,
        y: 50
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6
      }
    )
    .fromTo(
      '.hero-para',
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        ease: 'power2.out'
      }
    )
    .fromTo(
      '.hero .underline',
      {
        width: '0%'
      },
      {
        duration: 0.4,
        width: '100%'
      }
    );

  const tl2 = gsap.timeline();
  tl2
    .fromTo(
      '.image',
      {
        opacity: 0,
        scale: 0.5
      },
      {
        delay: 1.5,
        duration: 1,
        opacity: 1,
        scale: 1,
        ease: 'expo.inOut'
      }
    )
    .to('.image-text-line', {
      opacity: 1,
      duration: 0.2
    })
    .to('.image-para', {
      opacity: 1,
      duration: 0.2
    })
    .fromTo(
      '.dots span',
      {
        opacity: 0,
        y: 50
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5
      }
    )
    .to('.right-arrow', {
      opacity: 1
    });
}

runAnimations();

var siuu = document.getElementById('siuu');
siuu.addEventListener('mouseover', function () {
  siuu.style.color = '#f88e47';
  gsap.to('.siuu', {
    duration: 0.8,
    opacity: 1,
    x: 80,
    y: -70,
    scale: 1.5,
    ease: 'elastic.inOut'
  });
});

siuu.addEventListener('mouseout', function () {
  siuu.style.color = '#f9f9f9';
  gsap.to('.siuu', {
    duration: 0.9,
    opacity: 0,
    x: 0,
    y: 0,
    scale: 0,
    ease: 'elastic.inOut'
  });
});

const carouselInner = document.querySelector('.carousel');
const items = document.querySelectorAll('.carousel-item');
const nextButton = document.getElementById('next-button');
const bar = document.querySelectorAll('.dots span');

let currentIndex = 0;
let startX = 0;
let isDragging = false;

function showItem(index) {
  const newTranslateX = -index * 100;
  carouselInner.style.transform = `translateX(${newTranslateX}%)`;

  items.forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });

  bar.forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });
}

nextButton.addEventListener('click', function () {
  currentIndex = (currentIndex + 1) % items.length;
  showItem(currentIndex);
});

carouselInner.addEventListener('touchstart', handleTouchStart);
carouselInner.addEventListener('touchmove', handleTouchMove);
carouselInner.addEventListener('touchend', handleTouchEnd);

function handleTouchStart(event) {
  startX = event.touches[0].clientX;
  isDragging = true;
}

function handleTouchMove(event) {
  if (!isDragging) return;
  const currentX = event.touches[0].clientX;
  const difference = currentX - startX;

  if (Math.abs(difference) > 50) {
    if (difference > 0) {
      currentIndex = (currentIndex - 1 + items.length) % items.length;
    } else {
      currentIndex = (currentIndex + 1) % items.length;
    }
    showItem(currentIndex);
    isDragging = false;
  }
}

function handleTouchEnd() {
  isDragging = false;
}

showItem(currentIndex);

document.addEventListener('DOMContentLoaded', function () {
  let lazyVideo = document.querySelector('video.cristiano');

  if ('IntersectionObserver' in window) {
    let lazyVideoObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let video = entry.target;
          let sources = video.querySelectorAll('source');
          sources.forEach(function (source) {
            source.src = source.dataset.src;
          });
          video.load();
          lazyVideoObserver.unobserve(video);
        }
      });
    });

    lazyVideoObserver.observe(lazyVideo);
  }
});
