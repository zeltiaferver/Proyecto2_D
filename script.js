/**
 * constantes
 */
    const ipCompleta = document.getElementById("dirIp");
    let primerOcteto = null;
    let segundoOcteto = null;
    let tercerOcteto = null;
    let cuartoOcteto = null;
    let arrayBits= new Array(32);
    let numBitsRed = 0;
    let numBitsHost = 32;
    let clase = null;
    let tipo= null;
    let mascara = null;

    var correcto= false;
    let ipRed;
    let numHosts = 0;
    
    
/** 
 * funcionalidad botón
 */
const botonCalc= document.getElementById("boton1");

botonCalc.addEventListener("click", () => {
    //llamar funciones y mostrar info
    obtenerOctetos();

    if (validaciones()){
        ip();
        calcularClase();
        calcularMascara();
        calcularTipo();
        mostrarIpRed();
        calcularBroadcast()
        calcularWildCard();
        calcularHosts()

    }

});
/**
 * funcion obtener octetos
 */
function obtenerOctetos(){
    
     [primerOcteto, segundoOcteto, tercerOcteto, cuartoOcteto]= ipCompleta.value.split(".")

    console.log(primerOcteto);
    console.log(segundoOcteto);

    console.log(tercerOcteto);
    console.log(cuartoOcteto);

}

/**
 * funcion validaciones
 */
function validaciones(){

    const pattern = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

    if (primerOcteto==""|| segundoOcteto==""||tercerOcteto==""||cuartoOcteto==""){
        alert("Rellena todos los campos.");
        return false;

    }else if(!pattern.test(primerOcteto) ||
            !pattern.test(segundoOcteto) ||
            !pattern.test(tercerOcteto) ||
            !pattern.test(cuartoOcteto)){
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
 * función mostrar ip introducida
 */
function ip(){
    const ipCompleta = document.getElementById("dirIp").value;
    document.getElementById("ipIntroducida").textContent = `${ipCompleta}`;
}


/**
 * funcion calcular clase de la red
 */
function calcularClase(){
    if(primerOcteto < 128){
        clase = "A";
        console.log("Clase A");
    }else if( primerOcteto>= 128 && primerOcteto < 192){
        clase = "B";
        console.log("Clase B");
    }else if(primerOcteto >= 192 && primerOcteto < 224){
        clase = "C";
        console.log("Clase C");
    }else if(primerOcteto >= 224 && primerOcteto < 240){
        clase = "D";
        console.log("Clase D");
    }else if(primerOcteto >= 240 && primerOcteto < 256){
        clase = "E";
        console.log("Clase E");
    }
    document.getElementById("clase").textContent =`${clase}`;
}
/**
 * funcion calcular mascara
 */
function calcularMascara(){
    switch(clase){
        case "A":
            mascara = "255.0.0.0";
            ipRed = primerOcteto + ".0.0.0";
            numBitsRed = 8;
            break;
        case "B":
            mascara = "255.255.0.0";
            ipRed = primerOcteto + "." + segundoOcteto + ".0.0";
            numBitsRed = 16;
            break;
        case "C":
            mascara = "255.255.255.0";
            ipRed = primerOcteto + "." + segundoOcteto + "." + tercerOcteto + ".0";
            numBitsRed = 24;
            break;
       case "D":
            mascara = "Sin máscara por defecto";
            ipRed = "Sin dirección de red";
            break;
        case "E":
            mascara = "Sin máscara por defecto";
            ipRed = "Sin dirección de red";
            break;
        default:
            mascara = "Error";
            break;

    }
    document.getElementById("mascaraSubred").textContent =`${mascara}`;
}

/**
 * Función calcular equipos posibles
 */

function calcularHosts(){
    numBitsHost = 32 - numBitsRed;
    numHosts = Math.pow(2, numBitsHost) - 2;

    if(clase==="D" || clase==="E"){
        numHosts = "Sin hosts por defecto";}
   
    document.getElementById("numHosts").textContent =`${numHosts}`;
}

/**
 * funcion mostrar dirección red
 */
function mostrarIpRed(){

    document.getElementById("DirRed").textContent =`${ipRed}`;

}
/**
 * funcion calcular tipo
 */
function calcularTipo(){
    if(clase==="A" && primerOcteto===10){
        tipo="Privada";
    }else if(clase=== "B" && primerOcteto===172 && segundoOcteto>=16 &&segundoOcteto<=31){
        tipo="Privada";
    }else if(clase==="C" && primerOcteto===192 && segundoOcteto===168){
        tipo="Privada";
    }else{
        tipo="Pública";
    }
    document.getElementById("tipoRed").textContent =`${tipo}`;
}

/**
 * funcion calcular numero de bits
 */
function mostarBits(){
    let n = 0;
    while( n < numBits){
        arrayBits.push("1");
        n++;
    }
    while( n < arrayBits.length){
        arrayBits.push("0");
        n++;
    }
    console.log(arrayBits);
}

/**
 * función para calcular la dirección broadcast
 */
function calcularBroadcast(){
    let dirBroadcast = "";
    let octeto1 = 255;
    let octeto2 = 255;
    let octeto3 = 255;
    let octeto4 = 255;

    if(clase==="A"){
        octeto1= primerOcteto;
    }else if(clase==="B"){
        octeto1= primerOcteto;
        octeto2= segundoOcteto;
    }else if(clase==="C"){
        octeto1= primerOcteto;
        octeto2= segundoOcteto;
        octeto3= tercerOcteto;
    }
    dirBroadcast = `${octeto1}.${octeto2}.${octeto3}.${octeto4}`;
    document.getElementById("ipBroadcast").textContent =`${dirBroadcast}`;
}
/**
 * función para calcular la dirección wildcard
 */
function calcularWildCard(){
    let dirWildCard = "";
    let octeto1 = 0;
    let octeto2 = 0;
    let octeto3 = 0;
    let octeto4 = 0;

    if(clase==="A") {
        octeto2=255;
        octeto3=255;
        octeto4=255;
    }else if(clase==="B"){
        octeto3=255;
        octeto4=255;
    }else if(clase==="C"){
        octeto4=255;
    } 
    
    if(clase==="D"|| clase==="E"){
        dirWildCard="Sin wildcard por defecto";
    }else{
        dirWildCard = `${octeto1}.${octeto2}.${octeto3}.${octeto4}`;}

    document.getElementById("wildcard").textContent =`${dirWildCard}`;
}

