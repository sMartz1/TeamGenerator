//Asumimos que la pagina de entrada es 0
let currentPage = 0;


//Creamos funcion para cambiar de pagina que tendra dos posible valores ( 0 para retroceder , 1 para avanzar)
//Dado que tenemos 3 secciones los valores son entre 0-2 pero 

function changePage(option) {

    switch (option) {
        case 0:
            currentPage--;
            break;

        case 1:
            currentPage++;
            break;

        default:
            break;
    }


}