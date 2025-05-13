/**
 * constantes
 */
    const primerOcteto = document.getElementById("primerOcteto");
    const segundoOcteto = document.getElementById("segundoOcteto");
    const tercerOcteto = document.getElementById("tercerOcteto");
    const cuartoOcteto = document.getElementById("cuartoOcteto");
    let clase = null;
    var correcto= false;
    
/** 
 * funcionalidad botón
 */
const botonCalc= document.getElementById("boton1");

botonCalc.addEventListener("click", () => {
    //llamar funciones y mostrar info
    ;
    if (validaciones()){
        mostrarIp();
        calcularClase();
        calcularMascara();

    }

});


/**
 * funcion validaciones
 */
function validaciones(){
    if (primerOcteto.value==""|| segundoOcteto.value==""||tercerOcteto.value==""||cuartoOcteto.value==""){
        alert("Rellena todos los campos.");
    }

    return true;
}
function mostrarIp(){
      document.getElementById("ipRed").textContent =`${primerOcteto.value}.${segundoOcteto.value}.${tercerOcteto.value}.${cuartoOcteto.value}`;

}
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
function calcularMascara(){

}

function calcularTipo(){

}