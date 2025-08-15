import { logoLoader } from './components/logoLoader.js';

document.addEventListener("DOMContentLoaded", function () {
    // Get name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('project');

    // Change page title "Atchugarry - [Name project]"
    document.title = `Atchugarry - ${projectName.replace(/\b\w/g, (char) => char.toUpperCase())}`;

    // Get project detail container
    const projectDetail = document.getElementById("project-detail");
    projectDetail.innerHTML = logoLoader();

    // fetch to JSON
    fetch('./assets/js/db/projects_base.json')
        .then(response => response.json()) // Convert res to JSON
        .then(projects => {
            // Find project
            const project = projects.find(p => p.title === projectName.toLowerCase());

            function replaceNewlinesWithBR(text) {
                return text.replace(/\n/g, "<br>");
            }

            if (project) {
                projectDetail.classList.remove('vh-85');

                // Fill project values
                projectDetail.innerHTML = `
                <article class="col-12 col-md-3 project-description position-fixed">
                    <div class="row body-light">
                        <h4 class="mb-5">${project.title.toUpperCase()}</h4>
                        <p>Proyecto</p>
                        <strong>${project.description["architect-concept"]}</strong>
                        <p>Construcción</p>
                        <strong>${project.description["architect-record"]}</strong>
                        <p>Estructura</p>
                        <strong>Atchugarry Ingeniería en Madera</strong>
                        <p>Categoría</p>
                        <strong>${project.category}</strong>
                        <p>Cliente</p>
                        <strong>Fundación Pablo Atchugarry</strong>
                        <p>Estado</p>
                        <strong>${project.description.state}</strong>
                        <p>Locación</p>
                        <strong>${project.description.location}</strong>
                        <p>Año</p>
                        <strong>${project.description.year}</strong>
                    </div>
                    <div class="row position-fixed navigation-buttons" style="bottom: 40px; z-index: 1000;">
                        <div class="col-auto pe-6">
                            <button>
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 7.16216L0.999999 7.16216M0.999999 7.16216L4.45714 1M0.999999 7.16216L4.45714 13" stroke="black" />
                                </svg>
                                anterior
                            </button>
                        </div>
                        <div class="col-auto ps-6">
                            <button>
                                siguiente
                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 6.83784L11.5 6.83784M11.5 6.83784L8.04286 13M11.5 6.83784L8.04286 1" stroke="black" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </article>
                <div class="col-0 col-md-3"></div>
                <div class="col-0 col-md-1"></div>
                <article class="col-12 col-md-7 landscape">
                    <img src="${project.images[0].src}" alt="Imagen principal">
                </article>
                `;

                // Add sections
                project.images.forEach((image, index) => {
                    if (index > 0) {
                        const section = document.createElement('section');
                        section.className = `row justify-content-${index % 2 === 0 ? 'end' : 'start'} mt-13`;
                        const article = document.createElement('article');
                        article.className = `col-12 col-md-5 landscape`;
                        const img = document.createElement('img');
                        img.src = image.src;
                        img.alt = "Imagen principal";
                        article.appendChild(img);
                        section.appendChild(article);
                        projectDetail.appendChild(section);
                    }
                });
            } else {
                // If project doesn't exist show msg
                projectDetail.innerHTML = "<p>Proyecto no encontrado.</p>";
            }
        })
        .catch(error => {
            console.error("Error al cargar el archivo JSON:", error);
            projectDetail.classList.add('vh-85');
            projectDetail.innerHTML = "<p>Hubo un error al cargar el proyecto.</p>";
        });
});