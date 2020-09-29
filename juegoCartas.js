// Array con todas los palos
let arrayPalos = ['Bastos', 'Copas', 'Espadas', 'Oros'];
// Recuperamos el div del mazo del jugador
let mazoJ = document.getElementById("mazoJ");
//Recuperamos el botón de plantarse
let plantar = document.getElementById("planto");
// Recuperamos el botón de reiniciar
let reiniciar = document.getElementById("reiniciar");
// Otras variables globales necesarias
let cartasUsadas = [];
let puntosJugador = 0;
let puntosBanca = 0;

// Comportamiento cuando el jugador pide carta
mazoJ.addEventListener('click', (e) => {
    // Solo va a sacar una carta nueva si los puntos del jugador son menos de 7.5 y los de la banca = 0
    if (puntosJugador < 7.5 && puntosBanca == 0) {
        // Llamamos a la función que va a sacar una nueva carta
        sacaCarta('jugador');
        // Comprobamos si el jugador se ha pasado de 7.5, si se ha pasado mostramos que ha ganado la banca
        if (puntosJugador > 7.5) {
            // Llamamos a la función que muestra el ganador
            muestraGanador();
        }
    }
})

// Comportamiento cuando el jugador se planta
plantar.addEventListener('click', (e) => {
    // El botón solo va a funcionar si la puntuación del jugador es <= que 7.5
    if (puntosJugador <= 7.5){
        // Se va a repetir todo mientras que los puntos de la banca sean menores que los del jugador y menores de 7.5
        while (puntosBanca < puntosJugador && puntosBanca < 7.5) {
            // Llamamos a la función que va a sacar una nueva carta
            sacaCarta("banca");
        }
        // Cuando sale del bucle llamamos a la función que muestra el ganador
        muestraGanador();
    }
})

// Comportamiento cuando el usuario quiere reiniciar el juego
reiniciar.addEventListener('click', (e) => {
    // Recargamos la página
    window.open('index.html', "_self");
})

// Función que va a sacar una carta y la va a mostrar
const sacaCarta = (jugador) => {
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
            muestraCarta(jugador, rutaCarta);
            // Añadimos la ruta de la carta mostrada al array de cartas utilizadas
            cartasUsadas.push(rutaCarta);
            // Llamamos a la función para mostrar la miniatura
            muestraMiniatura(jugador, rutaCarta);
            // Dependiendo del valor de jugador llamamos a la función que calcula el número de puntos
            if (jugador == 'jugador'){
                puntosJugador = calculaPuntos(puntosJugador, numCarta);
            }
            else {
                puntosBanca = calculaPuntos(puntosBanca, numCarta);
            }
            // Llamamos a la función que muestra el número de puntos
            muestraPuntos(jugador);
            // Cambiamos el valor de usada a false para que salga del while
            usada = false;
        }        
    }
}

// Función que va a reemplazar la imagen de la carta anterior por la nueva carta
const muestraCarta = (jugador, rutaCarta) => {
    let viejaCarta;
    // Se crea el nuevo nodo de imagen
    let nuevaCarta = document.createElement("img");
    // Se añade el atributo src a la nueva carta
    nuevaCarta.setAttribute('src', rutaCarta);
    // Se le añade el atributo id a la nueva carta en función de la variable jugador
    if (jugador == 'jugador'){
        nuevaCarta.setAttribute('id', 'cartaJug');
        // Se obtiene el nodo de la imagen existente
        viejaCarta = document.getElementById('cartaJug');
    }
    else {
        nuevaCarta.setAttribute('id', 'cartaBan');
        // Se obtiene el nodo de la imagen existente
        viejaCarta = document.getElementById('cartaBan');
    }
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
const muestraPuntos = (jugador) => {
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

// Función para crear la miniatura de la carta y mostrarla
const muestraMiniatura = (jugador, rutaCarta) => {
    let miniaturas;
    // Creamos el nodo img
    let imagen = document.createElement("img");
    // Le añadimos la clase miniatura
    imagen.setAttribute('class', "miniatura");
    // Le añadimos la ruta de la imagen
    imagen.setAttribute('src', rutaCarta);
    // Obtenemos las miniaturas dependiendo del valor de jugador
    if (jugador == 'jugador') {
        miniaturas = document.getElementById("miniaturasJ");
    }
    else {
        miniaturas = document.getElementById("miniaturasB");
    }
    // Al div de miniaturas le añadimos la nueva imagen
    miniaturas.appendChild(imagen);
}

const muestraGanador = () => {
    console.log("entra en muestraGanador")
    // Creamos el nuevo elemento p
    let nuevoGanador = document.createElement("p");
    // Le añadimos el id
    nuevoGanador.setAttribute('id', "ganador");
    // Si los puntos de la banca son > 7.5 ha ganado el jugador
    if (puntosBanca > 7.5){
        nuevoGanador.appendChild(document.createTextNode("Ganador: Jugador"));
    }
    // Si no, ha ganado la banca
    else {
        nuevoGanador.appendChild(document.createTextNode("Ganador: Banca"));
    }
    // Obtenemos el nodo antiguo
    let viejoGanador = document.getElementById("ganador");
    // Cambiamos el nodo antiguo por el nuevo
    viejoGanador.parentNode.replaceChild(nuevoGanador, viejoGanador);
    // Después de mostrar el nombre del ganador llamamos a la función que va a mostrar la medalla
    muestraMedalla();
}

const muestraMedalla = () => {
    let miniaturas;
    console.log("entra en muestraMedalla")
    // Si gana el jugador
    if (puntosBanca > 7.5) {
        // Recuperamos las miniaturas del jugador
        miniaturas = document.getElementById("miniaturasJ");
    }
    // Si no, recuperamos las miniaturas de la banca
    else {
        miniaturas = document.getElementById("miniaturasB");
    }
    // Creamos un nodo imagen para mostrar la medalla
    let imagen = document.createElement("img");
    // Le añadimos la ruta de la imagen
    imagen.setAttribute('src', 'imagenes/medalla.jpg');
    // Le añadimos un id
    imagen.setAttribute('id', "medalla");
    // Añadimos la imagen a las miniaturas
    miniaturas.appendChild(imagen);
}