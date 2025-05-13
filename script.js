/**
 * constantes
 */
    const primerOcteto = document.getElementById("primerOcteto");
    const segundoOcteto = document.getElementById("segundoOcteto");
    const tercerOcteto = document.getElementById("tercerOcteto");
    const cuartoOcteto = document.getElementById("cuartoOcteto");
    const clase = null;
    var correcto= false;
    
/** 
 * funcionalidad botón
 */
const botonCalc= document.getElementById("boton1");

botonCalc.addEventListener("click", () => {
    //llamar funciones y mostrar info
    ;
    if (validaciones()){
        calcularClase();
        calcularMascara();
        
    }

});


/**
 * funcion validaciones
 */
function validaciones(){
    if (primerOcteto==""|| segundoOcteto==""||tercerOcteto==""||cuartoOcteto==""){
        alert("Rellena todos los campos.");
    }

    return true;
}
function mostrarIp(){
    

}
function calcularClase(){
    if(primerOcteto.value < 128){
        clase = "A";
    }else if( primerOcteto >= 128 && primerOcteto.value < 192){
        clase = "B";
    }else if(primerOcteto >= 192 && primerOcteto.value < 224){
        clase = "C";
    }else if(primerOcteto >= 224 && primerOcteto.value < 240){
        clase = "D";
    }else if(primerOcteto >= 240 && primerOcteto.value < 256){
        clase = "E";
    }
}
function calcularMascara(){

}

function calcularTipo(){

}