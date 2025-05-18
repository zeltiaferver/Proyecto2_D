/**
 * constantes
 */

    const ipCompleta = document.getElementById("dirIp");
    let primerOcteto = null;
    let segundoOcteto = null;
    let tercerOcteto = null;
    let cuartoOcteto = null;
    let arrayBits= new Array(32);
    //Para borrar
    let numBitsRed = 0;



    let numBitsHost = 32;
    let clase = null;
    let tipo= null;
    let mascara = null;
    let bits=null;
    var correcto= false;
    let ipRed;
    let numHosts = 0;
    let bitsMascara; 
    let dirBroadcast = "";
    //Variables para la prueba
    let ipBinarioSinPuntos = "";
    let ipBinario = "";
    let direccionRedBinario = "";
    let dirRedDecimal = "";

    const generarBits= document.getElementById("bitsMascara");

    generarBits.addEventListener("click", () => {
        obtenerOctetos();
        validaciones();
        
        mascaraDefecto();
        generarBits.value = `${bits}`;
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

    if (validaciones() && validacionesBits() ){
        cambioDiv();
        ip();
        
        obtenerBitsMascara();
        calcularClase();
        calcularMascara();
        calcularTipo();


        quitarPuntos();
        calcularDireccionRed();

        mostrarIpRed();
        calcularBroadcast()
        calcularWildCard();
        calcularHosts()
        calcularSubredes();
        hostMinMax();
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
 * función para obtener los bits de la mascara
 */
function obtenerBitsMascara(){
    bitsMascara = generarBits.value;
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
 * funcion validacion de los bits
 */

function validacionesBits(){
    calcularClase();
    obtenerBitsMascara();

    if (bitsMascara>30 || bitsMascara<8){
        alert("Introduce un valor de máscara válido.")
        return false;
    } else if(clase === "A"){
        if (bitsMascara>=8 && bitsMascara<30){
            return true;
            
        }  else{
            alert("La máscara no coincide con la clase de la red.");
            return false;
        } 
            
    }else if(clase === "B"){
        if (bitsMascara>=16 && bitsMascara<30){
            return true;
        }  else{
            alert("La máscara no coincide con la clase de la red.");
            return false;
        } 
           
            
    }else if(clase === "C"){
            if (bitsMascara>=24 && bitsMascara<=30){
            return true;
        }  else{
            alert("La máscara no coincide con la clase de la red.");
            return false;
        } 
            
    } else if(clase === "D" || clase === "E"){
        if (bitsMascara=" " ){
            return true;
        }else if(bitsMascara<=30){
            return true;
        } else if(bitsMascara>30){
        alert("Introduce un valor de máscara válido.")
        return false;
        } 
    }
    


}
/**
 * función recoge la ip introducida
 */
function ip(){
    var ipCompleta = document.getElementById("dirIp").value;
    console.log( "IP completa: " + ipCompleta);
    const hex= calcularHexadecimal(ipCompleta)


    ipBinario = convertirABinario(ipCompleta);
    document.getElementById("redBinario").textContent = `${ipBinario}`;
    document.getElementById("ipIntroducida").textContent = `${ipCompleta}`;
    document.getElementById("redHexadecimal").textContent = `${hex}`;

}

//Funcion para quitar los puntos de la ipBinario
function quitarPuntos(){
    for(let i = 0; i < ipBinario.length;i++){
        if(ipBinario[i]!="."){
            ipBinarioSinPuntos+=ipBinario[i];
        }
    }

    console.log(ipBinario)
    console.log("Ip sin puntos: " + ipBinarioSinPuntos)
}

//Funcion de prueba para conseguir dirección de red en binario
function calcularDireccionRed(cadena){
    let binarioRecibido = cadena;
    

    for(let i = 0; i < bitsMascara; i++){
        direccionRedBinario += ipBinarioSinPuntos[i];
    }

    
    while(direccionRedBinario.length <32){
        direccionRedBinario += "0";
    }

    let hola = direccionRedBinario;
    dirRedDesdeBinario(direccionRedBinario);
    console.log("direccion red en binario: " + direccionRedBinario);

    
}

//Función para calcular direccion de red desde direccionRedBinario
function dirRedDesdeBinario(cadena){
    let binarioRecibido = cadena;
    let octetoBinario;
    let n = 0;
    let salir = false;
    let decimal ="";
    let octetoA = 0;
    let octetoB = 0;
    let octetoC = 0;
    let octetoD = 0;
    while(!salir){

        octetoBinario ="";
        if( n < 8 ){
            
            for(n; n < 8; n++){
                octetoBinario += binarioRecibido[n];
            }
            console.log(octetoBinario);
        
          octetoA = binarioPorOctetos(octetoBinario);
          console.log( "A " + octetoA);
        }else if (n > 7 && n < 16){
            for(n; n < 16; n++){
                octetoBinario += binarioRecibido[n];
            }
            octetoB = binarioPorOctetos(octetoBinario);
            console.log("B " + octetoB );
        }else if( n > 15 && n < 24){
            for(n; n < 24; n++){
                octetoBinario += binarioRecibido[n];
            }
            octetoC = binarioPorOctetos(octetoBinario);
            console.log("C " + octetoC);
    
        }else if( n > 23 && n < 32){
            for(n; n < 32; n++){
                octetoBinario += binarioRecibido[n];
            }
            octetoD = binarioPorOctetos(octetoBinario);
            console.log("D" + octetoD);
            salir = true;
        }
    }

    decimal = octetoA + "." + octetoB +"." + octetoC+"." + octetoD

    console.log("Direccion de red desde binario: " + decimal);

    return decimal;
    
}

/**
 * Función para convertir a decimal desde binario por octetos
 */
function binarioPorOctetos(octeto){
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
 * funcion host minimo y host maximo
 */
function hostMinMax(){
    obtenerOctetos(ipCompleta);
    let min= primerOcteto+"."+segundoOcteto+"."+tercerOcteto+"."+(parseInt(cuartoOcteto) + 1);
    
    let [o1, o2, o3, o4]= dirBroadcast.split(".");
    let max =o1+"."+o2+"."+o3+"."+( o4- 1);
    
    
    document.getElementById("hostMin").textContent =min;
    document.getElementById("hostMax").textContent =max;
}

/**
 * funcion mostrar dirección red
 */
function mostrarIpRed(){
    let ipRedBinario = "";
    ipRedBinario = convertirABinario(ipRed);
    document.getElementById("DirBinario").textContent = `${ipRedBinario}`;
    document.getElementById("DirRed").textContent =`${ipRed}/ ${bitsMascara}`;

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
 * funcion calcular hexadecimal
 */
function calcularHexadecimal(cadena) {
    let cadenaSeparada = separarCadena(cadena);
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

/**
 * Funcion para calcular subredes
 */
function calcularSubredes(){
    calcularClase();
    let mascaraPorDefecto;
    let nSubredes=0;
    let n;

    if (clase==="A") {
    mascaraPorDefecto = 8; 
  } else if (clase === "B") {
    mascaraPorDefecto = 16;
  } else if (clase==="C") {
    mascaraPorDefecto = 24;
  } else {
    return "";
  }
console.log("BITS "+bitsMascara)
n=parseInt(bitsMascara-mascaraPorDefecto);
nSubredes=Math.pow(2, n);
console.log("Numero de subredes "+ nSubredes)
document.getElementById("numSubredes").textContent =`${nSubredes}`;
}
