import { smoother } from '../js/scroll.js';

document.addEventListener("DOMContentLoaded", () => {
    smoother.paused(true);
    console.log(smoother.paused());
})

window.addEventListener("load", () => {
    document.querySelector(".intro").classList.add("fadeInUp");
    document.querySelector(".intro-img").classList.add("fadeInUp-img");
    document.querySelector(".intro-logo").classList.add("fadeInUp-logo");
    document.querySelector(".intro-icon").classList.add("fadeInUp-icon");
    document.querySelector(".home-footer").classList.add("slideInUp");

    document.querySelector(".slideDown-element").classList.add("slideDown");
    document.querySelector(".slideUp2-element").classList.add("slideUp2");
    document.querySelector(".slideUp1-element").classList.add("slideUp1");

    setTimeout(() => {
        document.documentElement.classList.remove('lock-scroll');
        smoother.paused(false);
        console.log(smoother.paused());

    }, 2000);
});
