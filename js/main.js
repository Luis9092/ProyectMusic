const modalconf = document.querySelector("#modalconf");
const btconf = document.querySelector("#btconf");
const icocerrar = document.querySelector(".ico-cerrar");


btconf.addEventListener("click", () => {
    modalconf.showModal();
});

icocerrar.addEventListener("click", () => {
    modalconf.close();
});

