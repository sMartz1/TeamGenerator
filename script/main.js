//Asumimos que la pagina de entrada es 0
let currentPage = 0;

let s1 = document.getElementById("section1");
let s2 = document.getElementById("section2");
let s3 = document.getElementById("section3");
let botones = document.getElementsByClassName("menuButton");
const playerBoards = document.getElementsByClassName('boxText');


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
        //Section 1
        case 0:
            if (!s2.classList.contains("noVisibility")) {
                s2.classList.add("noVisibility");
            }
            if (!s3.classList.contains("noVisibility")) {
                s3.classList.add("noVisibility");
            }
            s1.classList.remove("noVisibility");
            break;

        //Section 2
        case 1:
            //Actualizamos opciones siempre que se vaya a visualizar section2
            createOptions();
            if (!s1.classList.contains("noVisibility")) {
                s1.classList.add("noVisibility");
            }
            if (!s3.classList.contains("noVisibility")) {
                s3.classList.add("noVisibility");
            }
            s2.classList.remove("noVisibility");
            break;
        //Section 3
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

//Acceso a input de section 1.
let valores = document.getElementsByClassName("text");
//De esta manera detectamos el evento y lo recogemos en e para comprobar el key code
//Aqui el Enter en este elemento añadira un nuevo player
valores[0].addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        addPlayer();
    }
})

//Funcion que devuelve array de usuarios en base a archivo .txt seleccionado.

function getPlayersByFile(e) {
    //Cogemos fichero seleccionado
    let file = e.target.files[0];
    if (!file) {
        //En caso de que el fichero no exista salimos.
        return;
    }
    //Usamos file reader para acceder al archivo
    let reader = new FileReader();
    //Un controlador para el evento load. Este evento se activa cada vez que la operación de lectura se ha completado satisfactoriamente.
    reader.onload = function (e) {
        //en .result encontramos la string resultante de leer el archivo.
        let content = e.target.result;
        //Parto por saltos de linea los nombres para recibirlos como array
        let arrGenerado = content.split(/\r?\n/g);
        //Tenemos la variable arrGenerado con los players del .txt para su futuro uso.
        //De momento dejamos en log el array
        for (let i = 0; i < arrGenerado.length; i++) {
            addPlayer(arrGenerado[i]);

        }

    }
    //Se le pasa archivo a leer, si lo lee correctamente haria trigger en el .onload definido anteriormente.
    reader.readAsText(file);
    document.getElementById("inputF").value = "";
}

//Añadimos Listener onChange para el input
document.getElementById('inputF').addEventListener('change', getPlayersByFile, false);

//Este array sera el que contendra todos los nombre, debe ser declarado en el cuerpo
//dado que sera usado en las section 2 y 3
let players = [];

function addPlayer(aux = "") {
    //Borramos el texto predefinido en el tablero
    if (players.length < 1) {
        playerBoards[0].innerText = "";
    }
    let value = "";
    if (aux.length == 0) {

        value = valores[0].value;

    } else {

        value = aux;
    }
    //Recibimos el valor del input y lo introducimos a players
    //Comprobamos el tamaño del nombre para evitar missclick
    if (value.length < 2) {
        return 'Nombre no valido'
    }
    players.push(value);

    drawPlayer(value, 0);
}

//Dibujamos al player, value pasa el string y option es referente de donde le llegara la orden, s1 o s2
function drawPlayer(value, option) {
    //Se crea div contenedor de la card
    let container = document.createElement('div');
    container.classList.add("player");

    //Se crea P para contener el nombre.
    let player = document.createElement('p');
    //Convertimos el valor a un textNode y creamos una nueva etiqueta para juntar ambos
    value = document.createTextNode(value);
    player.appendChild(value);
    //Añadimos atributos a nuestras etiquetas
    player.setAttribute("onclick", "modifyPlayer(this)");
    //player.setAttribute("class", "mod"); Dejo comentado por si necesitamos añadir clase en p en un futuro

    //Se crea span
    let close = document.createElement("span");
    close.innerHTML = "X";
    close.setAttribute("onclick", "removePlayer(this)");

    //Construccion de card con elementos anteriores
    container.appendChild(player);
    container.appendChild(close);

    //Si option viene a 0 dibujara el nombre en el section 1
    //Si viene a 1 devolvera el jugador dibujado para meterlo en la seleccion de teams
    if (option == 0) {
        playerBoards[0].appendChild(container);
    } else if (option == 1) {
        return container;
    }
}

//Recoge el valor, lo busca en el array y lo sobreescribe mas tarde
function modifyPlayer(player) {

    if (!player.isContentEditable) {
        let valor = player.textContent;
        var preValue = players.indexOf(valor);
        player.setAttribute("contentEditable", "true")

        //Aqui tendremos el valor postcambio
        if (player.isContentEditable) {

            //Evento que detectara si el usuario pulsa ENTER
            player.addEventListener("keydown", function (e) {
                if (e.keyCode === 13) {
                    stopEdit(player, preValue);
                }
            })

            //Evento que controlara el valor si el elemento pierde el foco
            player.addEventListener('blur', function (e) {
                stopEdit(player, preValue);
            })
        }
    }
}

//Player es el elemento HTML en si, prevalue es el valor precambio
function stopEdit(player, preValue) {
    player.removeAttribute("contentEditable")
    value = player.textContent;
    players[preValue] = value;
}


//Borra al player
function removePlayer(player) {
    let pValue = player.parentNode.firstChild.innerHTML;
    if (players.includes(pValue)) {
        //Posicion de player en array
        let posPlayer = players.indexOf(pValue);
        players.splice(posPlayer, 1);

    }
    //Eliminamos card.
    let parent = player.parentNode.remove()
}

//Esta funcion eliminaria todos los players tanto en el array como en el boxText
//Agregada funcionalidad para borrar ambos tableros
function removeAll(option) {

    if (option == 0) {
        players = [];
        while (playerBoards[0].firstChild) {
            playerBoards[0].removeChild(playerBoards[0].firstChild);
        }
    } else {
        while (playerBoards[1].firstChild) {
            playerBoards[1].removeChild(playerBoards[1].firstChild);
        }
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

//Funcionalidad para definir las opciones disponibles en section 2.
//Los equipos pueden ser de un minimo de 2 participantes.
//Tener variable con que opciones quedarian desequilibrados los equipos.
function createOptions() {
    let playerL = players.length;
    let optionsT = generateByTeamNumber(playerL);
    let optionsP = generateByPlayerNumber(playerL);
    //Limpiamos todas las opciones
    clearOptions();

    let teamContainer = document.getElementById("select-team");
    for (let index = 0; index < optionsT.length; index++) {
        teamContainer.append(optionsT[index]);
    }

    let playerContainer = document.getElementById("select-player");
    for (let index = 0; index < optionsP.length; index++) {
        playerContainer.append(optionsP[index]);
    }



}


//Generar lista de options en base a numero de equipos
function generateByTeamNumber(len) {
    //Alamcenamos las opciones en un array auxiliar
    let auxArrOptions = [];
    for (let index = 2; index < len; index++) {
        //Verificamos que los equipos sean de minimo 2 participantes
        if (len / index < 2) {
            break;
        }
        auxArrOptions.push(generateOptionHTML(index));
    }
    return auxArrOptions;

}
//Generar lista de options en base a numero de players
function generateByPlayerNumber(len) {
    let auxArrOptions = [];
    //Los equipos pueden ser minimo de dos participantes, por lo que hacemos len.lenght/2 en el for-
    for (let index = 2; index <= len / 2; index++) {
        auxArrOptions.push(generateOptionHTML(index));
    }
    return auxArrOptions;
}

//Funcion para generar elemento HTML de options.
function generateOptionHTML(num) {
    let divElement = document.createElement("div");
    divElement.classList.add("options");
    divElement.innerHTML = num;
    divElement.setAttribute('onclick', 'selectOption(this)')
    return divElement;
}

//Funcion para limpiar opciones de section2
function clearOptions() {
    let options = document.getElementsByClassName("options");
    //Mientras exista algun elemento con dicha class
    while (options[0]) {
        options[0].parentNode.removeChild(options[0]);
    }
}

//Funcionalidad slider Section 2

//Se define para check el valor del slider de section 2
let optionType = 0;
let selectTeam = document.getElementById("select-team-container");
let selectPlayer = document.getElementById("select-player-container");
let sliderTarget = document.getElementById("slider");

function sliderChange() {

    if (optionType == 0) {
        optionType = 1;
        selectPlayer.classList.add("noVisibility");
        selectTeam.classList.remove("noVisibility");
        sliderTarget.classList.add("active-slider");



    } else {
        optionType = 0;
        selectTeam.classList.add("noVisibility");
        selectPlayer.classList.remove("noVisibility");
        sliderTarget.classList.remove("active-slider");
    }
}


//Pruebas funciones randomizer for section 3

//Devuelve un arr de numeros random cuyo maximo es el nº de players
function generateRandomArr() {
    let randomArr = [];
    while (randomArr.length < players.length) {
        let random = Math.floor(Math.random() * players.length);
        if (!randomArr.includes(random)) {
            randomArr.push(random);
        }
    }
    return randomArr;
}

//Devuelve un arr usando de index la matriz generada con generateRandom para insertar nombres aleatoriamente
function randomTeams() {
    let randoms = generateRandomArr();
    let teams = [];

    for (let i = 0; i < players.length; i++) {
        teams.push(players[randoms[i]])
    }

    return teams;
}

//Entramos usando this en las options, y asi obtenemos el id del padre y actuamos en consecuencia
function selectOption(option) {
    let padre = option.parentNode.getAttribute('id')
    let value = option.innerHTML
    if (padre == 'select-player') {
        makeByPlayers(value);
    } else {
        console.log('hijo de selector por equipos');
    }
}

//Esta funcion sera llamada iterativamente para crear los teams devolviendo el elemento html creado y montado
//Si queremos agregar valores a la creacion del grupo bastaria tocar los valores que recibe y usa drawTeam()
function drawTeam() {
    let divElement = document.createElement("div");
    let title = document.createElement("div");
    title.innerHTML = "Nombre de equipo";
    title.classList.add("nameTeam")
    divElement.classList.add("team");
    divElement.appendChild(title);

    return divElement
}

//Esta funcion los repartira por jugadores
function makeByPlayers(value) {
    removeAll(1);
    let randoms = randomTeams();
    let index = 0;

    for (let i = 0; i < players.length / value; i++) {
        let divElement = drawTeam(); //Dibujamos equipo

        for (let j = 0; j < value; j++) {
            if (randoms[index] == undefined) {
                break;
            }
            let player = drawPlayer(randoms[index], 1); //Dibujamos cada jugador
            divElement.appendChild(player)
            index++;
        }

        playerBoards[1].appendChild(divElement);

    }

}

//Esta los repartira por equipos
function makeByTeams(value) {

}