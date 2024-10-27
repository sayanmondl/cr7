import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

gsap.to('.moment-banner-text h1:nth-child(1)', {
  y: 0,
  scrollTrigger: {
    trigger: '.moment-banner-text',
    start: 'bottom 160%',
    scrub: true
  }
});

gsap.to('.moment-banner-text h1:nth-child(2)', {
  y: 0,
  scrollTrigger: {
    trigger: '.moment-banner-text',
    start: 'bottom 160%',
    scrub: true
  }
});
