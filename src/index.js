// Test import of a JavaScript module
import { initHelpReportCarousel, initHeroCarousel } from "@/js/carousel";
import { initCopyButtons } from '@/js/copyButtons'
import '@/js/initMap';

// Test import of styles
import '@/styles/index.scss'


window.addEventListener('DOMContentLoaded', () => {
    initHeroCarousel();
    initHelpReportCarousel();
    initCopyButtons();
});
