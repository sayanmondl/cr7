import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchData } from '../../main.js';

gsap.registerPlugin(ScrollTrigger);

function runAnimations() {
  gsap.to('.clubs-text', {
    opacity: 1,
    y: 0,
    ease: 'power1.inOut',
    stagger: 0.3,
    scrollTrigger: {
      trigger: '.clubs-text',
      start: 'bottom bottom'
    }
  });

  gsap.fromTo(
    '.clubs-carousel-track',
    {
      opacity: 0
    },
    {
      duration: 1,
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.clubs-carousel-track',
        start: 'top bottom'
      }
    }
  );
}

runAnimations();

const clubStats = document.querySelectorAll('.club-stats-item');
clubStats.forEach(item => {
  gsap.fromTo(
    item,
    {
      opacity: 0,
      y: 400,
      scale: 0.2
    },
    {
      duration: 0.7,
      y: 0,
      opacity: 1,
      scale: 1,
      ease: 'power3.inOut',
      scrollTrigger: {
        trigger: item,
        start: 'top 170%'
      }
    }
  );
});

const carousel = document.querySelector('.clubs-carousel-track');
const carouselItems = document.querySelectorAll('.clubs-carousel-item');

const manchesterButton = document.getElementById('button-manchester');
const madridButton = document.getElementById('button-madrid');
const juveButton = document.getElementById('button-juve');
const manchesterButton2 = document.getElementById('button-manchester-2');
const alnassrButton = document.getElementById('button-alnassr');

let currentIndex = 0;

function updateCarousel(index) {
  const newTranslateX = -index * 100;
  carousel.style.transform = `translateX(${newTranslateX}%)`;

  carouselItems.forEach((item, idx) => {
    item.classList.toggle('active', idx === index);
  });
}

updateCarousel(currentIndex);

function animateClubName(name) {
  gsap.fromTo(
    name,
    {
      display: 'none',
      opacity: 0,
      scale: 0,
      x: -100
    },
    {
      duration: 0.4,
      x: 0,
      scale: 1,
      opacity: 1,
      display: 'flex',
      ease: 'back.inOut'
    }
  );
}

function resetClubName() {
  const clubnames = document.querySelectorAll('.clubname');
  clubnames.forEach(name => {
    gsap.killTweensOf(name);
    name.style.display = 'none';
  });
}

function clubTextAnimation() {
  gsap.fromTo(
    '.clubs-carousel-text',
    {
      opacity: 0,
      x: -2000,
      duration: 0.7
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.7
    }
  );

  gsap.fromTo(
    '.clubs-underline',
    {
      width: '0%'
    },
    {
      duration: 0.7,
      scrollTrigger: {
        trigger: '.clubs-carousel-text',
        start: 'bottom bottom'
      },
      width: '100%'
    }
  );
}

clubTextAnimation();
if (!window.matchMedia('(max-width: 520px)').matches) {
  animateClubName('.manchester');
}

carousel.style.cursor = `url("/clubs/ManchesterUnited.svg"), auto`;

manchesterButton.addEventListener('click', function () {
  currentIndex = 0;
  updateCarousel(currentIndex);
  resetClubName();
  if (!window.matchMedia('(max-width: 520px)').matches) {
    animateClubName('.manchester');
  }
  clubTextAnimation();
  carousel.style.cursor = `url("/clubs/ManchesterUnited.svg"), auto`;
});
madridButton.addEventListener('click', function () {
  currentIndex = 1;
  updateCarousel(currentIndex);
  resetClubName();
  if (!window.matchMedia('(max-width: 520px)').matches) {
    animateClubName('.madrid');
  }
  clubTextAnimation();
  carousel.style.cursor = `url("/clubs/RealMadrid.svg"), auto`;
});
juveButton.addEventListener('click', function () {
  currentIndex = 2;
  updateCarousel(currentIndex);
  resetClubName();
  if (!window.matchMedia('(max-width: 520px)').matches) {
    animateClubName('.juve');
  }
  clubTextAnimation();
  carousel.style.cursor = `url("/clubs/Juventus.svg"), auto`;
});
manchesterButton2.addEventListener('click', function () {
  currentIndex = 3;
  updateCarousel(currentIndex);
  resetClubName();
  if (!window.matchMedia('(max-width: 520px)').matches) {
    animateClubName('.manchester2');
  }
  clubTextAnimation();
  carousel.style.cursor = `url("/clubs/ManchesterUnited.svg"), auto`;
});
alnassrButton.addEventListener('click', function () {
  currentIndex = 4;
  updateCarousel(currentIndex);
  resetClubName();
  if (!window.matchMedia('(max-width: 520px)').matches) {
    animateClubName('.alnassr');
  }
  clubTextAnimation();
  carousel.style.cursor = `url("/clubs/AlNassr.svg"), auto`;
});

document.addEventListener('DOMContentLoaded', function () {
  let lazyVideos = [].slice.call(document.querySelectorAll('.clubs-carousel-video'));

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

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});


const updateStats = (sectionClass, stats) => {
  const goalElement = document.querySelector(`.${sectionClass} .goals`);
  const appsElement = document.querySelector(`.${sectionClass} .apps`);

  goalElement.innerHTML = stats.goals;
  appsElement.innerHTML = stats.apps;
};

fetchData()
  .then(data => {
    updateStats('portugal', {
      goals: data.international.total.overall.goals,
      apps: data.international.total.overall.apps
    });

    updateStats('sporting-cp', {
      goals: data.clubs.madeira.total.goals,
      apps: data.clubs.madeira.total.apps
    });

    updateStats('manchester-united', {
      goals: data.clubs.manchester.total.goals,
      apps: data.clubs.manchester.total.apps
    });

    updateStats('real-madrid', {
      goals: data.clubs.madrid.total.goals,
      apps: data.clubs.madrid.total.apps
    });

    updateStats('juventus', {
      goals: data.clubs.turin.total.goals,
      apps: data.clubs.turin.total.apps
    });

    updateStats('al-nassr', {
      goals: data.clubs.riyadh.total.goals,
      apps: data.clubs.riyadh.total.apps
    });
  })
  .catch(console.error);
