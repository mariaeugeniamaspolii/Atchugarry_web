document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('carousel-container');

    fetch('../js/db/carouselImg.json')
        .then(response => response.json())
        .then(images => {
            container.innerHTML = `
                <div class="carousel slide carousel-fade w-100 h-100" data-bs-ride="carousel" data-bs-interval="5000">
                    <div class="carousel-inner h-100" id="carousel-inner"></div>
                </div>
            `;

            const carouselInner = document.getElementById('carousel-inner');

            images.forEach((image, index) => {
                const item = document.createElement('div');
                item.className = `carousel-item h-100 ${index === 0 ? 'active' : ''}`;
                item.innerHTML = `
                    <img src="../${image.img}" class="d-block w-100 h-100 object-fit-cover" alt="${image.alt}">
                `;
                carouselInner.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
            container.innerHTML = `
                <div class="carousel slide carousel-fade w-100 h-100" data-bs-ride="carousel" data-bs-interval="5000">
                    <div class="carousel-inner h-100">
                        <div class="carousel-item h-100 active">
                            <img src="./assets/img/Component 36.png" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item h-100">
                            <img src="./assets/img/Component 37.png" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item h-100">
                            <img src="./assets/img/Component 35.png" class="d-block w-100" alt="...">
                        </div>
                        <div class="carousel-item h-100">
                            <img src="./assets/img/MACA-planeta_urbano_2024_Paisaje 1.png" class="d-block w-100" alt="...">
                        </div>
                    </div>
                </div>
            `;
        });
});
