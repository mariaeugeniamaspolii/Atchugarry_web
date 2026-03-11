import { logoLoader } from './components/logoLoader.js';

document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('projects-container');
    console.log('container: ', container);
    
    // Agregar el loader al contenedor
    container.innerHTML = logoLoader();
    console.log('container: ', container);

    // Cargar el archivo JSON utilizando fetch
    fetch('./js/db/projects_base.json')
    .then(response => response.json()) // Convertir la respuesta a JSON
    .then(projects => {
        console.log('projects: ', projects);
        
        // Limpiar el contenido del contenedor antes de agregar los proyectos
        container.innerHTML = '';
        container.classList.remove('vh-85');

        // Recorrer cada proyecto y generar el HTML correspondiente
        projects.forEach(project => {
            const projectNameEncoded = encodeURIComponent(project.title);
            const article = document.createElement('article');
            article.classList.add('col-12', 'col-md-4', 'slideInUp');

            article.innerHTML = `
                <a href="detalle.html?project=${projectNameEncoded}">
                    <div class="card">
                        <div class="image-container ${project.format}">
                            <img class="card-image base-image" src="${project.images[0]}" alt="${project.title}">
                            <img src="${project.imageHover}" class="hover-image" alt="Hover Image">
                        </div>
                        <div class="card-body">
                            <strong class="card-title">${project.title}</strong>
                        </div>
                    </div>
                </a>
            `;

            // Añadir el proyecto al contenedor
            container.appendChild(article);
        });
    })
    .catch(error => console.error('Error loading JSON data:', error)); // Manejo de errores
});
