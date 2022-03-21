import Glide from '@glidejs/glide'

new Glide('.glide', {
  type: 'carousel',
  autoplay: 5000,
  hoverpause: false,
  swipeThreshold: false,
  dragThreshold: false,
  keyboard: false,
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
}).mount()
