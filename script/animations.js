//Evento en carga de pagina
window.addEventListener("load", e => {
    let main = document.getElementsByTagName("main")[0];
    let modalWelcome = document.getElementsByClassName("modal-welcome")[0];
    setTimeout(() => modalWelcome.remove(), 3000);
    setTimeout(() => main.classList.remove("no-visibility"), 3000);


})