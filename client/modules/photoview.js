import { gsap } from 'gsap';

const app = document.getElementById('app');
const photo = document.getElementById('photo');
const photoImage = document.getElementById('photoviewImage');
const closeButton = document.getElementById('closeButton');

closeButton.onclick = async function () {
  gsap.fromTo(
    '.photoview',
    {
      scale: 1
    },
    {
      duration: 0.4,
      scale: 0,
      ease: 'back.in',
      onComplete: function () {
        app.style.filter = 'none';
        photo.style.display = 'none';
      }
    }
  );
};

const images = document.querySelectorAll('.moment-image');

images.forEach(image => {
  const img = image.querySelector('img');
  const imageSrc = img.src;

  image.onclick = function () {
    gsap.fromTo(
      '.photoview',
      {
        scale: 0
      },
      {
        duration: 0.4,
        scale: 1,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        ease: 'back.out'
      }
    );
    app.style.filter = 'blur(5px)';
    photo.style.display = 'block';
    photoImage.src = imageSrc;
  };
});
