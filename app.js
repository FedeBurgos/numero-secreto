// Declaracion de variables
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;


/*
    @brief Funcion que coloca el texto en el elemento HTML correspondiente.
    @param elemento Elemento HTML.
        texto Texto que se quiere mostrar.
*/
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

/*
    @brief Funcion que verifica si se acierta el numero o en caso contrario da pistas.
*/
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    
    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        //El usuario no acertó.
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');
        } else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}

/*
    @brief Funcion que limpia la caja donde el usuario tipea el numero.
*/
function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

/*
    @brief Funcion que genera el numero secreto y comprueba que no se repita.
*/
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            return generarNumeroSecreto();
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

/*
    @brief Funcion que setea las condiciones iniciales del juego.
*/
function condicionesIniciales() {
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

/*
    @brief Funcion que reinicia el juego limpiando la caja, seteando las condiciones inicales
    y deshabilitando el boton de Nuevo juego.
*/
function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    
}

condicionesIniciales();