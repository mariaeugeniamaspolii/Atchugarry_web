document.addEventListener("DOMContentLoaded", async function () {
    await insertarHeader();
    marcarMenuActivo();
});

async function insertarHeader() {
    const header = `
      <header>
        <nav class="navbar navbar-expand-lg py-4 py-xxl-5">
          <div class="container-fluid px-md-6 px-lg-5">
            <a class="navbar-brand d-lg-none" href="index.html" style="max-width: 200px;">
              <img class="object-fit-contain d-none d-md-block" src="/assets/img/logo_atchugarry.svg" alt="Logo">
            <img class="d-md-none object-fit-contain" style="height: 28px;" src="./assets/img/logo-black.svg">
            </a>
            <button class="navbar-toggler border-0 shadow-none p-0" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false"
              aria-label="Toggle navigation" height="20" style="max-width: 50px;">
              <svg width="30" height="20" viewBox="0 0 58 55" fill="none" xmlns=http://www.w3.org/2000/svg">
                <rect y="43" width="58" height="12" fill="black" />
                <rect y="22" width="58" height="12" fill="black" />
                <rect width="58" height="12" fill="black" />
              </svg>
            </button>
  
            <div class="collapse navbar-collapse justify-content-between align-items-center" id="navbarNav">
              <ul class="container-md w-100 justify-content-between navbar-nav mx-lg-auto d-flex flex-lg-row gap-lg-5 text-center bg-background">
                <li class="nav-item"><a class="nav-link" href="proyectos.html">Proyectos</a></li>
                <li class="nav-item"><a class="nav-link" href="experiencia.html">Experiencia</a></li>
                <li class="nav-item d-none d-lg-block mx-lg-5" style="max-width: 220px">
                  <a class="navbar-brand" href="index.html">
                    <img class="object-fit-contain image-fluid" src="./assets/img/logo_atchugarry.svg" alt="Logo at" height="30">
                  </a>
                </li>
                <li class="nav-item"><a class="nav-link" href="madera.html">ingeniería en madera</a></li>
                <li class="nav-item"><a class="nav-link" href="contacto.html">Contacto</a></li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", header);
}

function marcarMenuActivo() {
    const path = window.location.pathname;
    const page = path.split("/").pop();
    let activeHref = page;

    // Si estás en una página detalle, marcar como activo "proyectos.html"
    if (page.includes("detalle")) {
        activeHref = "proyectos.html";
    }

    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
        if (link.getAttribute("href") === activeHref) {
            link.classList.add("active");
        }
    });
}
