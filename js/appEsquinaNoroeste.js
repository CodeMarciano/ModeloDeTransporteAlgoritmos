class DibujarMatriz {

    constructor(tamanOrigen, tamanDestino) {
        this.fila = tamanOrigen;
        this.columna = tamanDestino;
        this.filaAdicional = tamanOrigen + 1;
        this.columnaAdicional = tamanDestino + 1;
    }

    mostrarTamanio(){
        return `Origen: ${this.fila} Destinno: ${this.columna}`;
    }

    comenzarDibujarMatriz(elemento) {
        let cadenaConcat = "<tr>";

        for (let i = 0; i < this.filaAdicional; i++) {
            for (let j = 0; j < this.columnaAdicional; j++) {

                if (j === this.columnaAdicional-1) {
                    if (i === this.filaAdicional-1) {
                        cadenaConcat +="";
                    } else {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' required></td>
                        `;
                    }
                } else {

                    if (i === this.filaAdicional -1) {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' required></td>
                        `;
                    } else {

                        cadenaConcat += `
                                <td><input type='text' style='width: 50px;' required></td>
                        `;

                    }

                }
            }
            cadenaConcat+="</tr>";
            if ( i === this.filaAdicional -1) {
                cadenaConcat +="";
            } else {
                cadenaConcat +="<tr>";
            }
        }
        elemento.innerHTML = cadenaConcat;
    }


}


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

formularioTamanioMatriz.addEventListener('submit', function (e) {
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

            let objetoDibujarMatrizCostos = new DibujarMatriz(numberOrigen, numberDestino);
            objetoDibujarMatrizCostos.comenzarDibujarMatriz(aniadirMatrizCostos);
        }

    } else {
        alertify.error("Digite solo Numeros :C")
    }


    let itemInputs = [...formularioTamanioMatriz.querySelectorAll('input')];
    resetContenidoInput(itemInputs);


    // console.log(objetoDibujarMatriz.mostrarTamanio());
    //



});