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
    const pattern = /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)$/;

    if (primerOcteto==""|| segundoOcteto==""||tercerOcteto==""||cuartoOcteto==""){
        alert("Rellena todos los campos.");
    }else if(primerOcteto==pattern|| segundoOcteto==pattern||tercerOcteto==pattern||cuartoOcteto==pattern){
        return correcto=true;
    }else{
        alert("Rellena con valores válidos.")
    }

}