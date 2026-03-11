document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('project') || "maca";

    // Change page title "Atchugarry - [Name project]"
    document.title = `${projectName.replace(/\b\w/g, (char) => char.toUpperCase())}`;

    // Contenedor de proyecto
    const projectDetail = document.getElementById("project-detail");
    const imgDetails = document.getElementById("detail-imgs");

    // Primero cargamos ambos JSON: proyectos y templates
    Promise.all([
        fetch('./js/db/projects_base.json').then(res => res.json()),
        fetch('./js/db/templates.json').then(res => res.json())
    ])
        .then(([projects, templates]) => {
            imgDetails.classList.remove('vh-100')
            document.documentElement.style.overflow = ''; 
            document.body.style.overflow = '';    
            console.log('projects cargados:', projects);   // Ver todos los proyectos
            console.log('templates cargados:', templates);
            // Find project + index
            const projectIndex = projects.findIndex(p => p.title === projectName.toLowerCase());
            const total = projects.length;
            const project = projects[projectIndex];
            if (projectIndex === -1) {
                projectDetail.innerHTML = "<p>Proyecto no encontrado.</p>";
                return;
            }

            const templateIndex = project.template || 0;
            const template = templates[templateIndex];
            console.log('template: ', template);

            // Limpiamos contenedor de imágenes
            imgDetails.innerHTML = "";

            // Renderizamos las secciones según la plantilla
            template.forEach(sectionDef => {
                const section = document.createElement("section");
                section.className = sectionDef.alignment;

                sectionDef.articles.forEach(articleDef => {
                    // Caso con varios hijos
                    if (articleDef.children) {
                        const article = document.createElement("article");
                        article.className = articleDef.wrapperClass || "";

                        articleDef.children.forEach(childDef => {
                            const imgData = project.images[childDef.index];
                            if (!imgData) return; // si no hay imagen, saltamos

                            const div = document.createElement("div");
                            div.className = [imgData.colSize, imgData.format, childDef.wrapperClass].filter(Boolean).join(" ");


                            const img = document.createElement("img");
                            img.src = imgData.src;
                            img.alt = project.title;

                            div.appendChild(img);
                            article.appendChild(div);
                        });

                        // solo agregamos el article si tiene hijos válidos
                        if (article.children.length > 0) {
                            section.appendChild(article);
                        }
                    }
                    // Caso simple (una sola imagen por article)
                    else {
                        const imgData = project.images[articleDef.index];
                        if (!imgData) return; // si no hay imagen, no creamos nada

                        const article = document.createElement("article");
                        article.className = `${imgData.colSize || ''} ${articleDef.colSize || ''} ${imgData.format || ''}`.trim();

                        const img = document.createElement("img");
                        img.src = imgData.src;
                        img.alt = project.title;

                        article.appendChild(img);
                        section.appendChild(article);
                    }
                });

                // 🔑 solo agregamos la sección si contiene algo
                if (section.children.length > 0) {
                    imgDetails.appendChild(section);
                }
            });



            // Nav buttons prev-next
            const prevIndex = (projectIndex - 1 + total) % total;
            console.log('prevIndex: ', prevIndex);
            const nextIndex = (projectIndex + 1) % total;
            console.log('nextIndex: ', nextIndex);

            // Project info
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
                `;
        })
        .catch(err => {
            console.error("Error al cargar JSON:", err);
            projectDetail.innerHTML = "<p>Hubo un error al cargar el proyecto.</p>";
        });
});
