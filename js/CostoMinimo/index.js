let formularioTamanioMatriz = document.getElementById('formularioTamanioMatriz');
let aniadirMatrizCostos = document.getElementById('aniadirMatrizCostos');

let mensaje = document.getElementById('mensaje');
let ocultarBoton = document.getElementById('ocultarBotonCalcular');


let removerResultadoFlujoMatriz = document.getElementById('mostrarResultado');

let mostrarMensajeResultadoMatrizFlujo = document.getElementById('mensajeResultado');

// formularioTamanioMatriz.removeAttribute()

let auxShowFiciticio = document.getElementById('mostrarMatrizCostoConficticio');
let auxMessageFicticio = document.getElementById('mensajeMatrizCostoFicticio');
let auxResulVarTotal = document.getElementById('mostrarTotal');
// let resultadoVariablesTotal = document.getElementById('mostrarTotal');


function resetContenidoInput(items){
    for (el of items) {
        el.value = "";
    }
}

function dibujarMatrizAPedirDatos(e){

    e.preventDefault();

    let dataForm = new FormData(formularioTamanioMatriz);
    let numberOrigen = parseInt(dataForm.get('origen'), 0),
        numberDestino = parseInt(dataForm.get('destino'), 0);

    if (
        !isNaN(numberOrigen) &&
        !isNaN(numberDestino)
    ) {

        if (
            numberOrigen > 20 ||
            numberDestino > 20
        ) {
            alertify.error("Inserta numeros validos entre ----[ 1 a 20 ] ");

        } else {
            // Dibjando MatrizCostoFlujo de costos
            removerResultadoFlujoMatriz.innerHTML = '';
            mostrarMensajeResultadoMatrizFlujo.setAttribute('hidden', "");

            alertify.success("Exito :D");

            mensaje.removeAttribute('hidden');
            ocultarBoton.setAttribute('class', 'btn green');
            ocultarBoton.removeAttribute('hidden');

            auxMessageFicticio.setAttribute('hidden', '');
            auxShowFiciticio.innerHTML = '';
            auxResulVarTotal.innerHTML = '';

            let objetoMatrizCostos = new MatrizCostoFlujo(numberOrigen, numberDestino);
            objetoMatrizCostos.comenzarDibujarMatrizSinDatosInput(aniadirMatrizCostos);

        }

    } else {
        alertify.error("Digite solo Numeros :C")
    }

    let itemInputs = [...formularioTamanioMatriz.querySelectorAll('input')];
    resetContenidoInput(itemInputs);

}


formularioTamanioMatriz.addEventListener('submit', dibujarMatrizAPedirDatos);