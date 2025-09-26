import { logoLoader } from './components/logoLoader.js';

document.addEventListener("DOMContentLoaded", function () {
    // Get name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('project') || "maca";;

    // Change page title "Atchugarry - [Name project]"
    document.title = `Atchugarry - ${projectName.replace(/\b\w/g, (char) => char.toUpperCase())}`;

    // Get project detail container
    const projectDetail = document.getElementById("project-detail");
    projectDetail.innerHTML = logoLoader();

    // fetch to JSON
    fetch('./assets/js/db/projects_base.json')
        .then(response => response.json()) // Convert res to JSON
        .then(projects => {

            // Find project + index
            const projectIndex = projects.findIndex(p => p.title === projectName.toLowerCase());
            const total = projects.length;
            const project = projects[projectIndex];

            function replaceNewlinesWithBR(text) {
                return text.replace(/\n/g, "<br>");
            }

            if (project) {
                projectDetail.classList.remove('vh-85');

                // índice anterior y siguiente con efecto carrusel
                const prevIndex = (projectIndex - 1 + total) % total;
                console.log('prevIndex: ', prevIndex);
                const nextIndex = (projectIndex + 1) % total;
                console.log('nextIndex: ', nextIndex);

                // Fill project values
                projectDetail.innerHTML = `
            <article class="col-12 col-md-3 project-description position-md-fixed">
                <article class="col-12 d-md-none mb-5 lansdcape">
                    <img src="${project.images[0].src}" alt="Imagen principal">
                </article>
                <div class="row body-light">
                    <div class="mb-5 mb-md-5 d-flex align-items-center gap-2">
                        <h4>${project.title.toUpperCase()}</h4>
                        <p class="d-none d-md-block d-xxl-none">${project.description.year}</p>
                    </div>
                    <p>Proyecto</p>
                    <strong>${project.description.project}</strong>
                    <p>Construcción</p>
                    <strong>${project.description.construction}</strong>
                    <p>Estructura</p>
                    <strong>Atchugarry Ingeniería en Madera</strong>
                    <p>Categoría</p>
                    <strong>${project.description.category}</strong>
                    <p>Cliente</p>
                    <strong>Fundación Pablo Atchugarry</strong>
                    <p>Estado</p>
                    <strong>${project.description.status}</strong>
                    <p>Locación</p>
                    <strong>${project.description.location}</strong>
                    <p class="d-md-none d-xxl-block">Año</p>
                    <strong class="d-md-none d-xxl-block">${project.description.year}</strong>
                </div>
                    <div class="row navigation-buttons position-fixed py-5 py-lg-0" style=" bottom: 20px;">
                    <div class="navigation-buttons-div row">
                        <div class="col-auto pe-6">
                            <a href="detalle.html?project=${projects[prevIndex].title}">
                                <svg width="12" height="14" viewBox="0 0 12 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M12 7.16216L0.999999 7.16216M0.999999 7.16216L4.45714 1M0.999999 7.16216L4.45714 13"
                                        stroke="black" />
                                </svg>
                                anterior
                            </a>
                        </div>
                        <div class="col-auto ps-6">
                            <a href="detalle.html?project=${projects[nextIndex].title}">
                                siguiente
                                <svg width="13" height="14" viewBox="0 0 13 14" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.5 6.83784L11.5 6.83784M11.5 6.83784L8.04286 13M11.5 6.83784L8.04286 1"
                                        stroke="black" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                </article>
                <div class="col-0 col-md-3"></div>
                <div class="col-0 col-md-1"></div>
                <article class="col-12 ${project.images[0].colSize} ${project.images[0].format}">
                    <img src="${project.images[0].src}" alt="Imagen principal">
                </article>
                `;

                // Add sections
                const imgDetails = document.getElementById("detail-imgs");
                console.log('imgDetails: ', imgDetails);

                // project.images.forEach((image, index) => {
                //     if (index > 0) {
                //         const section = document.createElement('section');
                //         section.className = `row justify-content-${index % 2 === 0 ? 'end' : 'start'} mt-13`;
                //         const article = document.createElement('article');
                //         article.className = `col-12 col-md-5 landscape`;
                //         const img = document.createElement('img');
                //         img.src = image.src;
                //         img.alt = "Imagen principal";
                //         article.appendChild(img);
                //         section.appendChild(article);
                //         projectDetail.appendChild(section);
                //     }
                // });
                const container = document.getElementById("detail-imgs");
                container.innerHTML = ""; // limpiar antes de renderizar

                project.images.forEach(img => {
                    // Creamos la estructura section -> article -> img
                    const section = document.createElement("section");
                    section.className = `row mt-5 mt-md-15 ${img.alignment}`;

                    const article = document.createElement("article");
                    article.className = `${img.colSize} ${img.format}`;

                    const image = document.createElement("img");
                    image.src = img.src;
                    image.alt = project.title;

                    article.appendChild(image);
                    section.appendChild(article);

                    container.appendChild(section);
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