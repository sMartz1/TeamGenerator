//Asumimos que la pagina de entrada es 0
let currentPage = 0;

let s1 = document.getElementById("section1");
let s2 = document.getElementById("section2");
let s3 = document.getElementById("section3");


//Creamos funcion para cambiar de pagina que tendra dos posible valores ( 0 para retroceder , 1 para avanzar)
//Dado que tenemos 3 secciones los valores son entre 0-2 pero 

function changePage(option) {

    switch (option) {
        case 0:
            currentPage--;
            changeDom();
            break;

        case 1:
            currentPage++;
            changeDom();
            break;

        default:
            break;
    }


}
//Funcion que se ocupa de actualizar el DOM
//Dependiendo del valor de currentPage, dejara el resto de secciones en display:none para ello creo la clase con display none en css
// De tal manera siempre que queramos modificar visibilidad de una capa, añadimos o quitamos dicha clase
function changeDom() {

    switch (currentPage) {
        case 0:
            if (!s2.classList.contains("noVisibility")) {
                s2.classList.add("noVisibility");
            }
            if (!s3.classList.contains("noVisibility")) {
                s3.classList.add("noVisibility");
            }
            s1.classList.remove("noVisibility");
            break;

        case 1:
            if (!s1.classList.contains("noVisibility")) {
                s1.classList.add("noVisibility");
            }
            if (!s3.classList.contains("noVisibility")) {
                s3.classList.add("noVisibility");
            }
            s2.classList.remove("noVisibility");
            break;

        case 2:
            if (!s1.classList.contains("noVisibility")) {
                s1.classList.add("noVisibility");
            }
            if (!s2.classList.contains("noVisibility")) {
                s2.classList.add("noVisibility");
            }
            s3.classList.remove("noVisibility");
            break;

        default:
            break;

    }

}
//Funcionalidad tips en mouseOver
//Se hace que aparezca el tip en mouseOver y desaparezca en mouseLeft
function tipUpload(behavior) {
    let p = document.getElementById("tip-Upload");
    if (!behavior) {
        p.classList.add("noVisibility");
    } else {

        p.classList.remove("noVisibility");
    }


}