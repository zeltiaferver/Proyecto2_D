/**
 * constantes
 */

const ipCompleta = document.getElementById("dirIp");
let primerOcteto = null;
let segundoOcteto = null;
let tercerOcteto = null;
let cuartoOcteto = null;
let arrayBits = new Array(32);
let numBitsHost = 32;
let clase = null;
let tipo = null;
let mascara = null;
let bits = null;
var correcto = false;
let ipRed;
let numHosts = 0;
let bitsMascara;
let dirBroadcast = "";
let ipBinario = "";
let direccionRedBinario = "";
let dirRedDecimal = "";
const generarBits = document.getElementById("bitsMascara");

/**
 * Función que valida la máscara de red introducida por el ususario y aplica la máscara por defecto
 * si no se quieren crear subredes.
 */
generarBits.addEventListener("click", () => {
    obtenerOctetos();
    validaciones();

    mascaraDefecto();
    generarBits.value = `${bits}`;
});

/** 
 * funcionalidad botón "Cacular red" en index
 */
const botonCalc = document.getElementById("boton1");

botonCalc.addEventListener("click", () => {

    obtenerOctetos();

    if (validaciones() && validacionesBits()) {
        cambioDiv();

        //Mostrar datos

        mostrarDatosIp();
        let redBinJunto = calcularIpRed();
        let maskBin = calcularMascara();
        dirBroadcast = calcularBroadcast(redBinJunto);

        obtenerBitsMascara();
        calcularClase();

        calcularTipo();

        calcularWildCard(maskBin);

        calcularHosts()
        calcularSubredes();
        hostMinMax();


    }

});
/**
 * función cambio de panel en index
 */
function cambioDiv() {
    document.getElementById("entradaIp").style.display = "none";
    document.getElementById("mostrarDatos").style.display = "block";

}

/**
 * función generar máscara por defecto dependiendo de la clase
 */
function mascaraDefecto() {
    calcularClase();


    if (clase === "A") {
        bits = 8;

    } else if (clase === "B") {
        bits = 16;

    } else if (clase === "C") {
        bits = 24

    } else if (clase === "D") {
        bits = " ";

    } else if (clase === "E") {
        bits = " ";
    };


}

/**
 * funcion obtener octetos de la dirección ip
 */
function obtenerOctetos() {

    [primerOcteto, segundoOcteto, tercerOcteto, cuartoOcteto] = ipCompleta.value.split(".")


}

/**
 * función para obtener los bits de la mascara
 */
function obtenerBitsMascara() {
    bitsMascara = generarBits.value;
}

/**
 * funcion validaciones de ip introducida
 */
function validaciones() {

    const pattern = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

    if (primerOcteto == "" || segundoOcteto == "" || tercerOcteto == "" || cuartoOcteto == "") {
        alert("Rellena todos los campos.");
        return false;

    } else if (!pattern.test(primerOcteto) ||
        !pattern.test(segundoOcteto) ||
        !pattern.test(tercerOcteto) ||
        !pattern.test(cuartoOcteto)) {
        alert("Introduce campos válidos.")
        return false;
    }
    primerOcteto = parseInt(primerOcteto);
    segundoOcteto = parseInt(segundoOcteto);
    tercerOcteto = parseInt(tercerOcteto);
    cuartoOcteto = parseInt(cuartoOcteto);
    return true;
}
/**
* funcion validacion de máscara de red
*/

function validacionesBits() {
    calcularClase();
    obtenerBitsMascara();

    if (bitsMascara > 30 || bitsMascara < 8) {
        alert("Introduce un valor de máscara válido.")
        return false;
    } else if (clase === "A") {
        if (bitsMascara >= 8 && bitsMascara <= 30) {
            return true;

        } else {
            alert("La máscara no coincide con la clase de la red.");
            return false;
        }

    } else if (clase === "B") {
        if (bitsMascara >= 16 && bitsMascara <= 30) {
            return true;
        } else {
            alert("La máscara no coincide con la clase de la red.");
            return false;
        }


    } else if (clase === "C") {
        if (bitsMascara >= 24 && bitsMascara <= 30) {
            return true;
        } else {
            alert("La máscara no coincide con la clase de la red.");
            return false;
        }

    } else if (clase === "D" || clase === "E") {
        if (bitsMascara = " ") {
            return true;
        } else if (bitsMascara <= 30) {
            return true;
        } else if (bitsMascara > 30) {
            alert("Introduce un valor de máscara válido.")
            return false;
        }
    }



}
/**
 * función recoge la ip introducida, la muestra , la covierte a binario y hexadecimal
 */
function mostrarDatosIp() {
    let ipCompletaValue = ipCompleta.value;
    const hex = calcularHexadecimal(ipCompletaValue)


    ipBinario = convertirABinario(ipCompletaValue);
    ipBinarioSinPuntos = quitarPuntos(ipBinario);
    document.getElementById("redBinario").textContent = `${ipBinario}`;
    document.getElementById("ipIntroducida").textContent = `${ipCompletaValue}`;
    document.getElementById("redHexadecimal").textContent = `${hex}`;

}

/**
 *Función que calcula todos los parámetros de la dirección de red.
 * Retorna la dirección en binario sin separar 
 */


function calcularIpRed() {
    let recogeBinarioConPuntos = "";
    let recogeBinariosSinPuntos = "";
    let redBinariaAMostrar = "";
    let redDecimal = "";
    let redHexadecimal = "";

    recogeBinarioConPuntos = convertirABinario(ipCompleta.value);

    recogeBinariosSinPuntos = quitarPuntos(recogeBinarioConPuntos);

    redBinariaAMostrar = calcularDireccionRed(recogeBinariosSinPuntos);

    redDecimal = dirRedDesdeBinario(redBinariaAMostrar);

    redHexadecimal = calcularHexadecimal(redDecimal);

    redBinariaAMostrar = separarBinario(redBinariaAMostrar);



    document.getElementById("DirBinario").textContent = `${redBinariaAMostrar}`;
    document.getElementById("DirRed").textContent = `${redDecimal}/ ${generarBits.value}`;
    document.getElementById("DirHexa").textContent = `${redHexadecimal}`;

    return recogeBinariosSinPuntos;

}


/**
 * Funcion para quitar los puntos de la ipBinario
 * @param {*} direccionBinaria Dirección ip en octetos binarios
 * @returns Retorna ip binaria sin separar en octetos
 */
function quitarPuntos(direccionBinaria) {

    let ipBinarioSinPuntos = "";

    for (let i = 0; i < direccionBinaria.length; i++) {
        if (direccionBinaria[i] != ".") {
            ipBinarioSinPuntos += direccionBinaria[i];
        }
    }
    return ipBinarioSinPuntos;
}

/**
 * Funcion que rellena la dirección de red dependiendo de la dirección y la máscara introducidas
 * @param {*} cadena Dirección ip intorducida en binario
 * @returns Dirección de red en formato binario
 */
function calcularDireccionRed(cadena) {
    let binarioRecibido = cadena;


    for (let i = 0; i < bitsMascara; i++) {
        direccionRedBinario += ipBinarioSinPuntos[i];
    }


    while (direccionRedBinario.length < 32) {
        direccionRedBinario += "0";
    }

    dirRedDesdeBinario(direccionRedBinario);
    return direccionRedBinario;


}

/**
 * Función que convierte desde binario a decimal y separa con puntos en formato ip
 * Redibe la cadena en binario sin separar y retorna la ip en formato ip (Ej: 192.168.0.1)
 */
function dirRedDesdeBinario(cadena) {
    let binarioRecibido = cadena;

    let decimal = "";
    let octetoA = 0;
    let octetoB = 0;
    let octetoC = 0;
    let octetoD = 0;
    octetoA = binarioPorOctetos(binarioRecibido.substr(0, 8));
    octetoB = binarioPorOctetos(binarioRecibido.substr(8, 8));
    octetoC = binarioPorOctetos(binarioRecibido.substr(16, 8));
    octetoD = binarioPorOctetos(binarioRecibido.substr(24, 8));



    decimal = octetoA + "." + octetoB + "." + octetoC + "." + octetoD


    return decimal;

}

/**
 * Función para convertir a decimal desde binario por octetos
 */
function binarioPorOctetos(octeto) {
    let octetoRecibido = octeto;
    let octetoDecimal = 0;

    for (let i = 0; i < octetoRecibido.length; i++) {
        octetoDecimal += parseInt(octetoRecibido[i] * 2 ** (octetoRecibido.length - 1 - i));
    }
    return octetoDecimal;
}

/**
 * funcion calcular clase de la red
 */
function calcularClase() {
    if (primerOcteto < 128) {
        clase = "A";

    } else if (primerOcteto >= 128 && primerOcteto < 192) {
        clase = "B";

    } else if (primerOcteto >= 192 && primerOcteto < 224) {
        clase = "C";

    } else if (primerOcteto >= 224 && primerOcteto < 240) {
        clase = "D";

    } else if (primerOcteto >= 240 && primerOcteto < 256) {
        clase = "E";

    }
    document.getElementById("clase").textContent = `${clase}`;
    return clase;
}

/**
 * Función que calcula la máscara en formato decimal, binario y hexadecimal
 */
function calcularMascara() {
    let mascaraBinario = "";

    for (let i = 0; i < bitsMascara; i++) {
        mascaraBinario += "1";
    }


    while (mascaraBinario.length < 32) {
        mascaraBinario += "0";
    }

    let dirDevolver = mascaraBinario;


    let mascaraDecimal = dirRedDesdeBinario(mascaraBinario);
    let mascaraHexa = calcularHexadecimal(mascaraDecimal)

    mascaraBinario = separarBinario(mascaraBinario);

    document.getElementById("mascaraBinario").textContent = `${mascaraBinario}`;
    document.getElementById("mascaraSubred").textContent = `${mascaraDecimal}`;
    document.getElementById("mascaraHexa").textContent = `${mascaraHexa}`;
    return dirDevolver;
}

/**
 * Función calcular Host posibles
 */

function calcularHosts() {
    numBitsHost = 32 - bitsMascara;
    numHosts = Math.pow(2, numBitsHost) - 2;

    if (clase === "D" || clase === "E") {
        numHosts = "Sin hosts por defecto";
    }

    document.getElementById("numHosts").textContent = `${numHosts}`;
}
/**
 * Función que calcula la primera y última dirección disponibles en la red
 */
function hostMinMax() {
    obtenerOctetos(ipCompleta);
    let min = primerOcteto + "." + segundoOcteto + "." + tercerOcteto + "." + (parseInt(cuartoOcteto) + 1);

    let [o1, o2, o3, o4] = dirBroadcast.split(".");
    let max = o1 + "." + o2 + "." + o3 + "." + (o4 - 1);


    document.getElementById("hostMin").textContent = min;
    document.getElementById("hostMax").textContent = max;
}


/**
 * Función que calcula el tipo de red (publica o privada) dependiendo de la ip
 */
function calcularTipo() {
    if (clase === "A" && primerOcteto === 10) {
        tipo = "Privada";
    } else if (clase === "B" && primerOcteto === 172 && segundoOcteto >= 16 && segundoOcteto <= 31) {
        tipo = "Privada";
    } else if (clase === "C" && primerOcteto === 192 && segundoOcteto === 168) {
        tipo = "Privada";
    } else {
        tipo = "Pública";
    }
    document.getElementById("tipoRed").textContent = `${tipo}`;
}


/**
 * función para calcular la dirección broadcast en formato decimal, binario y hexadecimal
 */
function calcularBroadcast(cadena) {
    let dir = cadena.substr(0, Number(bitsMascara));

    for (let i = 0; dir.length < 32; i++) {
        dir += "1";
    }

    dirBroadcastBinario = dir;
    let dirBroadcast = dirRedDesdeBinario(dir);
    let broadcastHexa = calcularHexadecimal(dirBroadcast);
    dirBroadcastBinario = separarBinario(dirBroadcastBinario);

    //Imprime
    document.getElementById("broadcastBinario").textContent = `${dirBroadcastBinario}`;
    document.getElementById("ipBroadcast").textContent = `${dirBroadcast}`;
    document.getElementById("broadcastHexa").textContent = `${broadcastHexa}`;
    return dirBroadcast;
}
/**
 * función para calcular la dirección wildcard en formato decimal, binario y hexadecimal
 */
function calcularWildCard(maskBin) {
    let maskRed = maskBin;
    let dirWildCard = "";
    let wildcardBinario = "";


    for (let i = 0; i < maskRed.length; i++) {
        if (maskRed[i] == "1") {
            wildcardBinario += 0;
        } else {
            wildcardBinario += 1;
        }
    }

    dirWildCard = dirRedDesdeBinario(wildcardBinario);
    let WildCardhex = calcularHexadecimal(dirWildCard);
    wildcardBinario = separarBinario(wildcardBinario);
    1
    document.getElementById("wildcardBinario").textContent = `${wildcardBinario}`;
    document.getElementById("wildcard").textContent = `${dirWildCard}`;
    document.getElementById("wildCardHexa").textContent = `${WildCardhex}`;
}


/**
 * Función que formatea una cadena binaria en octetos
 * @param {*} cadena Cadena en binario sin separar en octetos
 * @returns Cadena separada
 */
function separarBinario(cadena) {
    let cadenaAJuntar = cadena;
    cadenaAJuntar = cadenaAJuntar.substr(0, 8) + "." +
        cadenaAJuntar.substr(8, 8) + "." +
        cadenaAJuntar.substr(16, 8) + "." +
        cadenaAJuntar.substr(24, 8);
    return cadenaAJuntar

}
/**
 * funcion calcular hexadecimal
 */
function calcularHexadecimal(cadena) {
    let cadenaASeparar = cadena;
    let cadenaSeparada = separarCadena(cadenaASeparar);
    let octetosHexadecimales = [];

    for (let i = 0; i < cadenaSeparada.length; i++) {
        let octetoHex = cadenaSeparada[i].toString(16).toUpperCase();
        octetoHex = octetoHex.padStart(2, '0');
        octetosHexadecimales.push(octetoHex);
    }

    let resultado = octetosHexadecimales.join('.');
    return resultado;
}


/**
 * Función para convertir a binario recibe la cadena en formato decimal
 * y la convierte a binario, asegurándose de que cada octeto tenga 8 bits.
 */
function convertirABinario(cadena) {
    let cadenaAConvertir = cadena;

    let cadenaSeparada = separarCadena(cadenaAConvertir);

    let cadenaBinaria = "";
    let octetoBinario = "";

    for (let i = 0; i < cadenaSeparada.length; i++) {
        octetoBinario = cadenaSeparada[i].toString(2); // Convertir a binario
        octetoBinario = octetoBinario.padStart(8, '0'); // Asegurarse de que tenga 8 bits)
        cadenaBinaria += octetoBinario;
        if (i < cadenaSeparada.length - 1) {
            cadenaBinaria += ".";
        }
    }
    return cadenaBinaria;
}

/**
 * Función para separar una ip en octetos
 */
function separarCadena(cadena) {
    let cadenaASeparar = cadena;
    let cadenaSeparada = cadenaASeparar.split(".");

    for (let i = 0; i < cadenaSeparada.length; i++) {
        cadenaSeparada[i] = parseInt(cadenaSeparada[i]); // Convertir cada octeto a número
    }
    return cadenaSeparada;
}

/**
 * Funcion para calcular subredes
 */
function calcularSubredes() {
    let nSubredes = 0;
    let n;

    n = parseInt(30 - bitsMascara);
    nSubredes = Math.pow(2, n);
    document.getElementById("numSubredes").textContent = `${nSubredes}`;
}