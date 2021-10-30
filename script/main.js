//Asumimos que la pagina de entrada es 0
let currentPage = 0;
let main = document.getElementsByTagName("main")[0];
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
            changeDom()
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
    main.classList.add("change-page-animation");
    switch (currentPage) {
        //Section 1
        case 0:
            if (!s2.classList.contains("no-visibility")) {
                changeFade(s2, 1)
            }
            if (!s3.classList.contains("no-visibility")) {
                changeFade(s3, 1)
            }
            changeFade(s1, 0)
            break;

        //Section 2
        case 1:
            //Actualizamos opciones siempre que se vaya a visualizar section2
            createOptions();
            if (!s1.classList.contains("no-visibility")) {
                changeFade(s1, 1)
            }
            if (!s3.classList.contains("no-visibility")) {

                changeFade(s3, 1)
            }
            changeFade(s2, 0)
            break;
        //Section 3
        case 2:
            if (!s1.classList.contains("no-visibility")) {
                changeFade(s1, 1)
            }
            if (!s2.classList.contains("no-visibility")) {
                changeFade(s2, 1)
            }
            changeFade(s3, 0)
            break;

        default:
            break;

    }

}

//change-page-animation
//Animaciones para cambio de pagina

function changeFade(label, option) {
    if (option == 0) {

        setTimeout(() => {
            label.classList.remove("no-visibility");
            main.classList.remove("change-page-animation");
        }, 200);






    } else {
        setTimeout(() => label.classList.add("no-visibility"), 200);

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
        valores[0].value = "";

    } else {

        value = aux;
    }
    //Recibimos el valor del input y lo introducimos a players
    //Comprobamos el tamaño del nombre para evitar missclick
    if (value.length <= 2) {
        return 'Nombre no valido'
    }
    let filteredValue = normalizeName(value)

    if (!players.includes(filteredValue)) {
        players.push(filteredValue);
        drawPlayer(filteredValue, 0);
    } else {
        isDuplicated();
    }
}

/**
 * Comprobamos si metieron nombre y apellidos
 * Si es asi abreviaremos todo que tenga mayor length que 2
 * Si no es asi comprobaremos unicamente la cadena entrante con un microfor
 */
function normalizeName(value) {
    let count = 0;
    let filteredName = value.split(' ');

    if (filteredName.length > 1) {
        filteredName = filteredName.reduce((acc, el, i) => {
            if (el.length > 2) {
                if (count >= 4) {
                    return acc;
                }

                if (i == 1) {
                    count++;
                    return acc + ' ' + el.charAt(0).toUpperCase();
                } else {
                    count++;
                    return acc + el.charAt(0).toUpperCase();
                }
            }
            return acc
        })
    } else if (value.length > 10) {
        filteredName = '';
        for (let i = 0; i < 10; i++) {
            filteredName += value.charAt(i)
        }
    }
    return filteredName.toString();
}

//Animacion para prevenir la entrada de nombres duplicados
function isDuplicated() {
    valores[0].style.borderBottom = '1px solid red';
    valores[0].disabled = true;
    valores[0].style.textAlign = 'center'
    valores[0].value = '!Nombre invalido!'
    setTimeout(() => {
        valores[0].style.borderBottom = '1px solid #0c0';
        valores[0].style.textAlign = 'left'
        valores[0].value = '';
        valores[0].disabled = false;
        valores[0].focus();
    }, 1000);

}

//Dibujamos al player, value pasa el string y option es referente de donde le llegara la orden, s1 o s2
function drawPlayer(value, option) {
    if (value != undefined) {
        let container = document.createElement('div');
        container.classList.add("player");

        let player = document.createElement('p');
        value = document.createTextNode(value);
        player.appendChild(value);
        player.setAttribute("onclick", "modifyPlayer(this)");

        let close = document.createElement("span");
        close.innerHTML = "X";
        close.setAttribute("onclick", "removePlayer(this)");

        container.appendChild(player);
        container.appendChild(close);

        if (option == 0) {
            playerBoards[0].appendChild(container);
        } else if (option == 1) {
            return container;
        }
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
    if (!players.includes(player.textContent) || players[preValue] == player.textContent) {
        value = player.textContent;
        players[preValue] = value;
    } else {
        player.style.border = '1px solid red'
        setTimeout(() => {
            player.textContent = players[preValue];
            player.style.border = '1px solid #0c0'
        }, 500);
    }
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
    player.parentNode.remove();
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
    for (let index = 2; index < len / 2; index++) {
        //Verificamos que los equipos sean de minimo 2 participantes
        if (len % index == 0 || len % index == 1) {
            let option = generateOptionHTML(index)
            if (len % index == 0 || index == 2) {
                auxArrOptions.push(option);
            } else if (len % index == 1) {
                option.classList.add('is-odd')
                auxArrOptions.push(option);
            }
        }
    }

    return auxArrOptions;
}
//Generar lista de options en base a numero de players
function generateByPlayerNumber(len) {
    let auxArrOptions = [];
    //Los equipos pueden ser minimo de dos participantes, por lo que hacemos len.lenght/2 en el for-
    for (let index = 2; index <= len / 2; index++) {
        if (len % index == 0 || len % index == 1) {
            auxArrOptions.push(generateOptionHTML(index));
        }
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

let selects = document.getElementsByClassName('selection')
selects[0].addEventListener('click', targetOption);
selects[1].addEventListener('click', targetOption);

function targetOption() {
    let selectTeam = document.getElementById("select-team-container");
    let selectPlayer = document.getElementById("select-player-container");

    if (this == selects[1]) {
        selectPlayer.classList.add("no-visibility");
        selectTeam.classList.remove("no-visibility");
        this.classList.add('selected')
        selects[0].classList.remove('selected')

    } else if (this == selects[0]) {
        selectTeam.classList.add("no-visibility");
        selectPlayer.classList.remove("no-visibility");
        this.classList.add('selected')
        selects[1].classList.remove('selected')
    }
}

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
        makeByTeams(value);
    }

    currentPage++;
    changeDom();
}

//Esta funcion sera llamada iterativamente para crear los teams devolviendo el elemento html creado y montado
//Si queremos agregar valores a la creacion del grupo bastaria tocar los valores que recibe y usa drawTeam()
function drawTeam(numered) {
    let divElement = document.createElement("div");
    let title = document.createElement("div");
    numered = parseInt(numered) + 1
    title.innerHTML = "Equipo " + numered;
    title.classList.add("nameTeam")
    divElement.classList.add("team");
    divElement.appendChild(title);

    return divElement
}

//Esta funcion los repartira por jugadores
function makeByPlayers(value) {
    //Borra todos los elementos de la section 3 pero no el arr players, si lo hace se carga la generacion de teams
    removeAll(1);
    let randoms = randomTeams();
    let index = 0;
    let teams = players.length / value;
    let numPlayers = value;

    for (let i = 0; i < teams; i++) {
        let divElement = drawTeam(i); //Dibujamos equipo

        for (let j = 0; j < numPlayers; j++) {
            if (randoms[index] == undefined) {
                break;
            }
            let player = drawPlayer(randoms[index], 1); //Dibujamos cada jugador
            divElement.appendChild(player)
            index++;
        }

        playerBoards[1].appendChild(divElement);

        if (divElement.children <= 1) {
            divElement.remove();
        }

    }

    normalizeTeams();
    mapTeams();
}

//Esta los repartira por equipos
function makeByTeams(value) {
    removeAll(1);
    let randoms = randomTeams();
    let index = 0;
    let teams = value;
    let numPlayers = players.length / value;

    for (let i = 0; i < teams; i++) {
        let divElement = drawTeam(i); //Dibujamos equipo

        for (let j = 0; j < numPlayers; j++) {
            if (randoms[index] == undefined) {
                break;
            }
            let player = drawPlayer(randoms[index], 1); //Dibujamos cada jugador
            divElement.appendChild(player)
            index++;
        }

        playerBoards[1].appendChild(divElement);
    }

    normalizeTeams();//Igualamos equipos
    mapTeams();//Los mapeamos

}

//Esta funcion normalizara los equipos si no se pudieron distribuir correctamente
function normalizeTeams() {
    //Mientras el largo de los hijos del primer hijo del tablero sea diferente al largo de los hijos del ultimo elemento
    while (playerBoards[1].firstElementChild.childElementCount != playerBoards[1].lastElementChild.childElementCount &&
        playerBoards[1].childElementCount > 2) {
        //Si el largo de los hijos del ultimo elemento es = 1 es que esta vacio, lo borramos
        if (playerBoards[1].lastElementChild.childElementCount == 1) {
            playerBoards[1].lastElementChild.remove();
        } else {
            //Si no capturamos el ultimo hijo del ultimo elemento del tablero a la vez que lo removemos
            let player = playerBoards[1].children[playerBoards[1].childElementCount - 1].children[1];
            playerBoards[1].children[playerBoards[1].childElementCount - 1].children[1].remove();
            //Y si es diferente a undefined(el ultimo elemento que sacara es undefined)
            if (player != undefined) {
                //Lo metera en el penultimo hijo del tablero
                playerBoards[1].children[playerBoards[1].children.length - 2].appendChild(player);
            }
            //casi na
        }
    }
}

//Mapeo de teams tras la normalizacion
function mapTeams() {
    let arr = playerBoards[1].children
    let result = []
    let result1 = []

    for (let i = 0; i < arr.length; i++) {
        result.push(arr[i].children[0].innerText);
        for (let j = 1; j < arr[i].childElementCount; j++) {
            let p = arr[i].children[j].children[0].innerText
            result1.push(p)
        }
        result.push(result1);
        result1 = [];
    }
    list = result
}

let list = []

//Para testear rapido
function renovar(numero) {
    for (let i = 0; i < numero; i++) {
        addPlayer(`random${i}`)
    }
}

//Evento en carga de pagina
window.addEventListener("load", e => {
    let main = document.getElementsByTagName("main")[0];
    let modalWelcome = document.getElementsByClassName("modal-welcome")[0];
    setTimeout(() => modalWelcome.remove(), 3000);
    setTimeout(() => main.classList.remove("no-visibility"), 3000);
})

