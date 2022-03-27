import Glide  from '@glidejs/glide';

// Todo move to general settings repeatable options
const HERO_CAROUSEL_OPTIONS = {
  type: 'carousel',
  // autoplay: 3000,
  animationDuration: 1000,
  animationTimingFunc: 'ease-out',
  startAt: 1,
  perView: 1,
  gap: 33,
  peek: {
    before: 100,
    after: 100,
  },
  breakpoints: {
    900: {
      gap: 20,
      peek: {
        before: 40,
        after: 40,
      },
    },
    768: {
      gap: 8,
      peek: {
        before: 16,
        after: 16,
      },
    },
  },
};
const HELP_REPORT_CAROUSEL_OPTIONS = {
  type: 'carousel',
  // autoplay: 3000,
  animationDuration: 1000,
  animationTimingFunc: 'ease-out',
  startAt: 1,
  perView: 1,
  gap: 33,
  peek: {
    before: 100,
    after: 100,
  },
  breakpoints: {
    900: {
      gap: 20,
      peek: {
        before: 40,
        after: 40,
      },
    },
    768: {
      gap: 8,
      peek: {
        before: 16,
        after: 16,
      },
    },
  },
};

export function initHeroCarousel() {
  new Glide('.mc-hero-slider', HERO_CAROUSEL_OPTIONS).mount()
}

export function initHelpReportCarousel() {
  new Glide('.mc-help-report-slider', HELP_REPORT_CAROUSEL_OPTIONS).mount()
}
