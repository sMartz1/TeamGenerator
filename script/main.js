//Asumimos que la pagina de entrada es 0
let currentPage = 0;

let s1 = document.getElementById("section1");
let s2 = document.getElementById("section2");
let s3 = document.getElementById("section3");
let botones = document.getElementsByClassName("menuButton");
let valores = document.getElementsByClassName("text");
const playerBoards = document.getElementsByClassName('boxText');

console.log(s1);


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


/* ------- Funcionalidades Section 1 -------- */
//Añadir funcionalidad tecla ENTER para agregar usuario (y a ser posible terminar de editarlo tambien)
//Necesito usar un evento para comenzar a editar el nombre y un evento para terminar de editarlo y guardar definitivamente el valor

//Este array sera el que contendra todos los nombre, debe ser declarado en el cuerpo
//dado que sera usado en las section 2 y 3
var players = [];

function addPlayer() {
    //Recibimos el valor del input y lo introducimos a players
    let valor = valores[0].value;
    players.push(valor);

    //Convertimos el valor a un textNode y creamos una nueva etiqueta para juntar ambos
    valor = document.createTextNode(valor);
    let player = document.createElement('p');
    player.appendChild(valor);

    //Añadimos atributos a nuestras etiquetas
    player.setAttribute("onclick", "modifyPlayer(this)");

    //Agregamos el elemento al div boxText de la section 1
    playerBoards[0].appendChild(player)
}

//Primera parte: recoge el valor de la etiqueta antes del cambio, lo busca y lo elimina
function modifyPlayer(player) {
    player.setAttribute("contentEditable", "true");
    player = player.textContent;
    players.splice(players.indexOf(player), 1);
}

//Segunda parte: recoge el valor editado y lo pushea al array
function setModify(player) {
    player = player.textContent;
    players.push(player);
}

//Aun sin trabajar
function removePlayer(player) {
    player = player.textContent;

    if (players.contains[player]) {
        players.indexOf(player);
    }

    console.log('Proximamente');
}

//Esta funcion eliminaria todos los players tanto en el array como en el boxText
function removeAll() {
    players = [];

    while (playerBoards[0].firstChild) {
        playerBoards[0].removeChild(playerBoards[0].firstChild);
    }
}