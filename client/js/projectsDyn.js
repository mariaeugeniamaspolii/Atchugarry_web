// import { logoLoader } from './components/logoLoader.js';

document.addEventListener("DOMContentLoaded", () => {
    const projectsContainer = document.getElementById("projectsContainer");

    function capitalizeWords(str) {
        return str.replace(/\b\w/g, char => char.toUpperCase());
    }
    // projectsContainer.innerHTML = logoLoader();

    setTimeout(() => {
        fetch('../js/db/projects_base.json')
            .then(response => response.json())
            .then(projects => {

                projectsContainer.innerHTML = `<section class="row justify-content-end">
            <article class="col-12 col-md-9">
            </article>
        </section>

        <section class="row ">
            <article class="col-12 col-md-5">
            </article>

            <article class="col-0 col-md-3">
            </article>

            <article class="col-12 col-md-4 pushed">
            </article>
        </section>

        <section class="row">
            <article class="col-12 col-md-4">
            </article>

            <article class="col-0 col-md-1">
            </article>

            <article class="col-12 col-md-6">
            </article>

            <article class="col-0 col-md-1">
            </article>
        </section>

        <section class="row align-items-end justify-content-end">

            <article class="col-12 col-md-5">
            </article>

            <article class="col-0 col-md-2">
            </article>

            <article class="col-12 col-md-4">
            </article>
        </section>

        <section class="row">
            <article class="col-12 col-md-4">
            </article>

            <article class="col-0 col-md-1">
            </article>

            <article class="col-12 col-md-6">
            </article>

            <article class="col-0 col-md-1">
            </article>
        </section>

        <section class="row align-items-end">
            <article class="col-12 col-md-4">
            </article>

            <article class="col-0 col-md-2">
            </article>

            <article class="col-12 col-md-5">
            </article>
        </section>`;

                const allArticles = document.querySelectorAll("main article");
                const validArticles = Array.from(allArticles).filter(article => !article.classList.contains("col-0"));

                projects.forEach((project, index) => {
                    const slug = project.slug;


                    const article = validArticles[index];
                    if (!article) return;

                    article.innerHTML = `
                    <a href="/detalle/?project=${slug}">
                        <div class="card">
                            <div class="image-container ${project.imageCover.format}">
                                <img class="card-image base-image" src="../${project.imageCover.src}" alt="${project.alt}">
                                <div class="hover-image bg-background">
                                    <img src="../${project.imageHover}" class="hover-image hover-white" alt="Hover Image">
                                </div>
                            </div>
                            <div class="card-body">
                                <h2 class="card-title">${project.title}</h2>
                            </div>
                        </div>
                    </a>
                `;
                })
            })
            
        }, 3000)
        setTimeout(() => {
            const footerContainer = document.getElementById('footer-content');
            footerContainer.classList.add('d-block')
            footerContainer.classList.remove('d-none')
        }, 4000)
})
