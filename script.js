/**
 * constantes
 */
    const primerOcteto = document.getElementById("primerOcteto");
    const segundoOcteto = document.getElementById("segundoOcteto");
    const tercerOcteto = document.getElementById("tercerOcteto");
    const cuartoOcteto = document.getElementById("cuartoOcteto");
    let arrayBits= new Array(32);
    let numBits = 0;
    let clase = null;
    let tipo= null;
    let mascara = null;
    var correcto= false;
    let ipRed;
    
    
/** 
 * funcionalidad botón
 */
const botonCalc= document.getElementById("boton1");

botonCalc.addEventListener("click", () => {
    //llamar funciones y mostrar info
    
    if (validaciones()){
        
        calcularClase();
        calcularMascara();
        calcularTipo();
        mostrarIpRed();

    }

});


/**



 * funcion validaciones


 */


function validaciones(){


    const pattern = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;





    if (primerOcteto==""|| segundoOcteto==""||tercerOcteto==""||cuartoOcteto==""){


        alert("Rellena todos los campos.");


    }else if(primerOcteto==pattern|| segundoOcteto==pattern||tercerOcteto==pattern||cuartoOcteto==pattern){
        return true;
    }


return true;


}



/**
 * funcion calcular clase de la red
 */
function calcularClase(){
    if(primerOcteto.value < 128){
        clase = "A";
        console.log("Clase A");
    }else if( primerOcteto.value >= 128 && primerOcteto.value < 192){
        clase = "B";
        console.log("Clase B");
    }else if(primerOcteto.value >= 192 && primerOcteto.value < 224){
        clase = "C";
        console.log("Clase C");
    }else if(primerOcteto.value >= 224 && primerOcteto.value < 240){
        clase = "D";
        console.log("Clase D");
    }else if(primerOcteto.value >= 240 && primerOcteto.value < 256){
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
            ipRed = primerOcteto.value + ".0.0.0";
            numBits = 8;
            break;
        case "B":
            mascara = "255.255.0.0";
            ipRed = primerOcteto.value + "." + segundoOcteto.value + ".0.0";
            break;
        case "C":
            mascara = "255.255.255.0";
            ipRed = primerOcteto.value + "." + segundoOcteto.value + "." + tercerOcteto.value + ".0"; 
            break;
       case "D":
            mascara = "Sin máscara por defecto";
            break;
        case "E":
            mascara = "Sin máscara por defecto";
            break;
        default:
            mascara = "Error";
            break;

    }
    document.getElementById("mascaraSubred").textContent =`${mascara}`;
}
/**
 * funcion mostrar ip introducida
 */
function mostrarIpRed(){

    document.getElementById("ipRed").textContent =`${ipRed}`;

}
/**
 * funcion calcular tipo
 */
function calcularTipo(){
    if(clase="A" && primerOcteto===10){
        tipo="Privada";
    }else if(clase= "B" && primerOcteto===172 && segundoOcteto>=16 &&segundoOcteto<=31){
        tipo="Privada";
    }else if(clase="C" && primerOcteto===192 && segundoOcteto===168){
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