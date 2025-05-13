/**
 * constantes
 */
    const primerOcteto = document.getElementById("primerOcteto");
    const segundoOcteto = document.getElementById("segundoOcteto");
    const tercerOcteto = document.getElementById("tercerOcteto");
    const cuartoOcteto = document.getElementById("cuartoOcteto");
    var correcto= false;
    
/** 
 * funcionalidad botón
 */
const botonCalc= document.getElementById("boton1");

botonCalc.addEventListener("click", () => {
    //llamar funciones y mostrar info
    validaciones();

});


/**
 * funcion validaciones
 */
function validaciones(){
    if (primerOcteto==""|| segundoOcteto==""||tercerOcteto==""||cuartoOcteto==""){
        alert("Rellena todos los campos.");
    }else{
        alert("Rellena con valores válidos.")
    }

}
function mostrarIp(){
    

}
function calcularClase(){

    
}
function calcularMascara(){

}

function calcularTipo(){

}