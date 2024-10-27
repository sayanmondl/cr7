import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const cards = gsap.utils.toArray('.card');

cards.forEach(card => {
  let texts = card.querySelectorAll('.card-text > *');

  gsap.fromTo(
    card,
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
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: card,
        start: 'top 170%'
      }
    }
  );

  gsap.fromTo(
    texts,
    {
      y: 50,
      opacity: 0
    },
    {
      y: 0,
      opacity: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: card,
        start: 'top 130%'
      }
    }
  );
});
