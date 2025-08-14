export async function loadFooter() {
    return new Promise((resolve) => {
        const footer = `
        <footer>
            <section class="footer pt-6 pb-5 pb-md-6 pt-md-12 body-light">
                <div class="container justify-content-center">
                    <p class="text-center">© Atchugarry <span id="currentYear"></span>  /  18 de Julio 2163 - Montevideo, Uruguay</p>
                </div>
            </section>
        </footer>
        `;

        // 👇 Insertar dentro de #smooth-content en vez de body
        document.querySelector('#footer-content').insertAdjacentHTML("beforeend", footer);
        document.getElementById("currentYear").textContent = new Date().getFullYear();

        resolve();
    });
}
