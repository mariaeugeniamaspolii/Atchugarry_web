// Importar la función loadFooter desde footer.js
import { loadFooter } from '/assets/js/components/footer.js';

export let smoother;

document.addEventListener("DOMContentLoaded", async () => {
    // Espera a que el footer se cargue completamente
    await loadFooter();

    // Inicializa GSAP después de que el footer esté cargado
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5,
        effects: true
    });

    // Animaciones de las imágenes
    const projects = document.querySelectorAll("article");

    projects.forEach(function (project) {
        const imgs = project.querySelectorAll("img");

        imgs.forEach(function (img) {
            gsap.fromTo(img, {
                opacity: 0.5,
                y: 100,
            }, {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: project,
                    end: "top bottom",
                    scrub: 1,
                }
            });
        });
    });
});