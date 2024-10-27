import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = gsap.utils.toArray('.business-ventures .section');
const sections2 = gsap.utils.toArray('.honours .section');

let scrollTween = gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.business-ventures .scroll-container',
    pin: true,
    scrub: 1,
    end: '+=2000'
  }
});

sections.forEach(section => {
  let text = section.querySelectorAll('.anim');

  if (text.length === 0) return;

  gsap.from(text, {
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween,
      start: 'left center'
    }
  });

  gsap.from(section, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'elastic',
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween,
      start: 'left center'
    }
  });
});

let scrollTween2 = gsap.to(sections2, {
  xPercent: -100 * (sections2.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.honours .scroll-container',
    pin: true,
    scrub: 1,
    end: '+=1500'
  }
});

sections2.forEach(section => {
  let text = section.querySelectorAll('.anim');

  if (text.length === 0) return;

  gsap.from(text, {
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween2,
      start: 'left center'
    }
  });

  gsap.from(section, {
    y: 100,
    opacity: 0,
    duration: 1,
    ease: 'elastic',
    stagger: 0.1,
    scrollTrigger: {
      trigger: section,
      containerAnimation: scrollTween2,
      start: 'left center'
    }
  });
});

const hoverText = document.querySelector('.honours section:last-child .texts span');
const hoverSection = document.querySelector('.hover-showcase');

hoverText.addEventListener('click', function (event) {
  event.stopPropagation();
  gsap.killTweensOf('.app');
  if (!window.matchMedia('(max-width: 650px)').matches) {
    hoverSection.style.display = 'flex';
  } else {
    hoverSection.style.display = 'grid';
  }

  gsap.fromTo(
    '.hover-showcase .item',
    {
      opacity: 0,
      y: 100
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out'
    }
  );

  document.addEventListener('click', closeView, { once: true });
});

function closeView(event) {
  if (!hoverSection.contains(event.target)) {
    gsap.to('.hover-showcase .item', {
      opacity: 0,
      y: 100,
      duration: 0.4,
      stagger: 0.1,
      ease: 'back.in',
      onComplete: () => {
        hoverSection.style.display = 'none';
      }
    });
  } else {
    event.stopPropagation();
    document.addEventListener('click', closeView, { once: true });
  }
}
