import { Dithering } from '@paper-design/shaders';

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initStepInteractions();
  initHeroDithering();
});

function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function initStepInteractions() {
  document.querySelectorAll('.product-steps').forEach((container) => {
    const steps = Array.from(container.querySelectorAll('.step'));
    if (steps.length === 0) return;

    steps.forEach((step) => {
      step.addEventListener('click', () => {
        steps.forEach((s) => s.classList.remove('expanded', 'active'));
        step.classList.add('expanded', 'active');
      });
    });
  });
}

function initHeroDithering() {
  const canvas = document.getElementById('hero-dithering');
  if (!canvas) return;

  // Use the official Paper Design Dithering shader
  const dithering = new Dithering(canvas, {
    colorBack: '#000000',
    colorFront: '#38943e',
    shape: 'warp',
    type: '4x4',
    size: 2.5,
    speed: 0.34,
    scale: 1,
  });

  // Handle visibility changes to pause/resume animation
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      dithering.stop();
    } else {
      dithering.play();
    }
  });
}
