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
    let bits=null;
    var correcto= false;
    let ipRed;
    let numHosts = 0;

    const generarBits= document.getElementById("bitsMascara");

    generarBits.addEventListener("click", () => {
        obtenerOctetos();
        validaciones();
        
        mascaraDefecto();
        document.getElementById("bitsMascara").value = `${bits}`;
    });

    /**
     * función generar máscara por defecto
     */
     function mascaraDefecto(){
        calcularClase();
        

        if( clase === "A"){
            bits=8;
            
        }else if( clase === "B"){
            bits=16;
            
        }else if(clase === "C"){
            bits=24
            
        }else if(clase === "D"){
            bits=" ";
        
        }else if(clase === "E"){
            bits=" ";
        };
        console.log(bits);
       
    }
/** 
 * funcionalidad botón
 */
const botonCalc= document.getElementById("boton1");

botonCalc.addEventListener("click", () => {
    
    obtenerOctetos();

    if (validaciones() && validacionesBits()){
        cambioDiv();
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
 * función cambio de panel
 */
function cambioDiv(){
    document.getElementById("entradaIp").style.display = "none";
    document.getElementById("mostrarDatos").style.display = "block";
    
}


/**
 * funcion obtener octetos
 */
function obtenerOctetos(){
    
     [primerOcteto, segundoOcteto, tercerOcteto, cuartoOcteto]= ipCompleta.value.split(".")


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
function validacionesBits(){
    
}
/**
 * función mostrar ip introducida
 */
function ip(){
    var ipCompleta = document.getElementById("dirIp").value;
    let ipBinario = "";

    console.log( "IP completa: " + ipCompleta);
    
    ipBinario = convertirABinario(ipCompleta);
    document.getElementById("redBinario").textContent = `${ipBinario}`;
    document.getElementById("ipIntroducida").textContent = `${ipCompleta}`;
}


/**
 * funcion calcular clase de la red
 */
function calcularClase(){
    if(primerOcteto < 128){
        clase = "A";
        
    }else if( primerOcteto>= 128 && primerOcteto < 192){
        clase = "B";
        
    }else if(primerOcteto >= 192 && primerOcteto < 224){
        clase = "C";
        
    }else if(primerOcteto >= 224 && primerOcteto < 240){
        clase = "D";
       
    }else if(primerOcteto >= 240 && primerOcteto < 256){
        clase = "E";
       
    }
    document.getElementById("clase").textContent =`${clase}`;
    return clase;
}

/**
 * funcion calcular mascara
 */
function calcularMascara(){
    let mascaraBinario = "";
    
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
    if(mascara !== "Sin máscara por defecto" && mascara !== "Error"){
        mascaraBinario = convertirABinario(mascara);
        document.getElementById("mascaraBinario").textContent = `${mascaraBinario}`;
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
    let ipRedBinario = "";
    ipRedBinario = convertirABinario(ipRed);
    document.getElementById("DirBinario").textContent = `${ipRedBinario}`;
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

}

/**
 * función para calcular la dirección broadcast
 */
function calcularBroadcast(){
    let dirBroadcast = "";
    let dirBroadcastBinario = "";
    let octetoUno = 255;
    let octetoDos = 255;
    let octetoTres = 255;
    let octetoCuatro = 255;
    

    if(clase==="A"){
        octetoUno= primerOcteto;
    }else if(clase==="B"){
        octetoUno= primerOcteto;
        octetoDos= segundoOcteto;
    }else if(clase==="C"){
        octetoUno= primerOcteto;
        octetoDos= segundoOcteto;
        octetoTres= tercerOcteto;
    }
    dirBroadcast = `${octetoUno}.${octetoDos}.${octetoTres}.${octetoCuatro}`;

    dirBroadcastBinario = convertirABinario(dirBroadcast);

    //Imprime
    document.getElementById("broadcastBinario").textContent = `${dirBroadcastBinario}`;
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
    let wildcardBinario = "";

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
        dirWildCard = `${octeto1}.${octeto2}.${octeto3}.${octeto4}`;
        wildcardBinario = convertirABinario(dirWildCard);
        document.getElementById("wildcardBinario").textContent = `${wildcardBinario}`;
    }

    document.getElementById("wildcard").textContent =`${dirWildCard}`;
}

/**
 * Función para convertir a binario recibe la cadena en formato decimal
 * y la convierte a binario, asegurándose de que cada octeto tenga 8 bits.
 */
function convertirABinario(cadena) {

    console.log("Cadena original: " + cadena);

    let cadenaSeparada = separarCadena(cadena);

    let cadenaBinaria = "";
    let octetoBinario = "";

    for (let i = 0; i < cadenaSeparada.length; i++) {
        octetoBinario = cadenaSeparada[i].toString(2); // Convertir a binario
        octetoBinario = octetoBinario.padStart(8, '0'); // Asegurarse de que tenga 8 bits)
        cadenaBinaria += octetoBinario ;
        if ( i < cadenaSeparada.length - 1){
            cadenaBinaria += ".";
        }
    }
    return cadenaBinaria;
}

/**
 * Función para separar Strings
 */
function separarCadena(cadena) {
    let cadenaSeparada = cadena.split(".");

    console.log("Cadena separada: " + cadenaSeparada);
    for (let i = 0; i < cadenaSeparada.length; i++) {
        cadenaSeparada[i] = parseInt(cadenaSeparada[i]); // Convertir cada octeto a número
    }
    return cadenaSeparada;
}

