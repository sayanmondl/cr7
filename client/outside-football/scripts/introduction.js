import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function animations() {
  const tl = gsap.timeline();

  tl.to('.introduction', {
    opacity: 1,
    duration: 1,
    ease: 'power1.inOut'
  });

  tl.fromTo(
    '.background',
    {
      opacity: 0
    },
    {
      opacity: 0.4,
      duration: 1,
      ease: 'power1.inOut'
    }
  ).fromTo(
    '.introduction-text .anim',
    {
      opacity: 0,
      y: 100
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.2,
      ease: 'power2.out'
    }
  );
}

animations();

const diveIn = document.getElementById('diveIn');
diveIn.onclick = function () {
  gsap.to(window, {
    scrollTo: {
      y: '.business-ventures .section:first-child'
    },
    ease: 'power1.inOut',
    duration: 0.8
  });
};
