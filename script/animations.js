//Evento en carga de pagina
window.addEventListener("load", e => {

    let s1 = document.getElementById("section1");
    let main = document.getElementsByTagName("main");
    setTimeout(() => main[0].classList.remove("no-visibility"), 2000);
    setTimeout(() => s1.classList.remove("no-visibility"), 4000);
})