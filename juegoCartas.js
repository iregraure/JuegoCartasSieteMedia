// Array con todas los palos
let arrayPalos = ['Bastos', 'Copas', 'Espadas', 'Oros'];

// Recuperamos los div de los mazos
let mazoJ = document.getElementById("mazoJ");
let mazoB = document.getElementById("mazoB");

// Otras variables globales necesarias
let cartasUsadas = [];
let puntosJugador = 0;
let puntosBanca = 0;

// Comportamiento cuando el jugador pide carta
mazoJ.addEventListener('click', (e) => {
    let usada = true;
    while(usada){
        // Obtenemos la posición del palo y su nombre de forma aleatoria
        let posPalo = Math.floor(Math.random()*4);
        let palo = arrayPalos[posPalo];
        // Obtenemos el número de la carta
        let numCarta = Math.floor(Math.random()*(11-1))+1;
        // Se obtiene la ruta de la carta
        let rutaCarta = `imagenes/${numCarta}${palo}.jpg`;
        // Una vez tenemos la ruta de la carta, comprobamos si ya se ha usado
        if(!cartasUsadas.includes(rutaCarta)){
            // Llamamos a la función que muestra la carta 
            muestraCarta(rutaCarta);
            // Añadimos la ruta de la carta mostrada al array de cartas utilizadas
            cartasUsadas.push(rutaCarta);
            // Cambiamos el valor de usada a false para que salga del while
            usada = false;
            // Llamamos a la función que calcula el número de puntos
            puntosJugador = calculaPuntos(puntosJugador, numCarta);
            // Llamamos a la función que muestra el número de puntos
            muestraPuntos(puntosJugador, 'jugador');
        }        
    }
})

// Función que va a reemplazar la imagen de la carta anterior por la nueva carta
const muestraCarta = (rutaCarta) => {
    // Se crea el nuevo nodo de imagen
    let nuevaCarta = document.createElement("img");
    // Se añade el atributo src a la nueva carta
    nuevaCarta.setAttribute('src', rutaCarta);
    // Se le añade el atributo id a la nueva carta
    nuevaCarta.setAttribute('id', 'cartaJug');
    // Se obtiene el nodo de la imagen existente
    let viejaCarta = document.getElementById('cartaJug');
    // Reemplazamos la carta antigua por la nueva
    viejaCarta.parentNode.replaceChild(nuevaCarta, viejaCarta);
}

// Función que calcula los puntos
const calculaPuntos = (puntos, numCarta) => {
    if (numCarta == 8 || numCarta == 9 || numCarta == 10) {
        puntos = puntos + 0.5;
    }
    else {
        puntos = puntos + numCarta;
    }
    return puntos;
}

// Función que va a cambiar los puntos actuales por los números tras sacar la nueva carta
const muestraPuntos = (puntos, jugador) => {
    // Creamos el nuevo nodo p
    let nuevoP = document.createElement("p");
    let texto, viejoP;
    // Si los puntos son del jugador
    if (jugador == 'jugador') {
        // Le añadimos el id al nuevo nodo
        nuevoP.setAttribute('id', 'puntosJugador');
        // Creamos el texto para el nuevo nodo
        texto = `Puntos jugador: ${puntosJugador}`;
        // Añadimos el texto al nuevo nodo
        nuevoP.appendChild(document.createTextNode(texto));
        // Recuperamos el nodo antiguo
        viejoP = document.getElementById("puntosJugador");
        // Cambiamos el nodo antiguo por el nuevo
        viejoP.parentNode.replaceChild(nuevoP, viejoP);
    }
    // Si los puntos son de la banca
    else{
        // Le añadimos el id al nuevo nodo
        nuevoP.setAttribute('id', 'puntosBanca');
        // Creamos el texto para el nuevo nodo
        texto = `Puntos banca: ${puntosBanca}`;
        // Añadimos el texto al nuevo nodo
        nuevoP.appendChild(document.createTextNode(texto));
        // Recuperamos el nodo antiguo
        viejoP = document.getElementById("puntosBanca");
        // Cambiamos el nodo antiguo por el nuevo
        viejoP.parentNode.replaceChild(nuevoP, viejoP);
    }
}