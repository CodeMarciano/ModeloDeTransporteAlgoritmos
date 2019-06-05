let frmCalcularFlujoMatriz = document.getElementById('calcularMatrizFlujo');
let aniadidoCostos = document.getElementById('aniadirMatrizCostos');

// Sin ficticios
let mostrarResultadoFlujo = document.getElementById('mostrarResultado');
let mensajeResultadoFlujo = document.getElementById('mensajeResultado');

// Con ficticios
let mostrarMatrizCostoFicticio = document.getElementById('mostrarMatrizCostoConficticio');
let mensajeCostoFicticio = document.getElementById('mensajeMatrizCostoFicticio');


let resultadoVariablesTotal = document.getElementById('mostrarTotal');

function extraerDatosInputsDeLaVistaArray(itemsTd) {

    let arrayParaMatrizEsquinaNoroeste = [];

    let arrayAux = [];
    for (let elements of itemsTd) {
        for (let el of elements) {
            arrayAux.push(parseFloat(el.querySelector('input').value, 0));
        }
        arrayParaMatrizEsquinaNoroeste.push(arrayAux);
        arrayAux = [];
    }

    return arrayParaMatrizEsquinaNoroeste;
}


function calcularResultadoCostoMinimoMostrar(e) {
    e.preventDefault();

    let itemsTr = [...aniadidoCostos.querySelectorAll('tr')];
    let itemsTd = itemsTr.map(a => [...a.querySelectorAll('td')]);

    // Restarle para que entre a las clases
    let fila = itemsTr.length - 1;
    let columna = itemsTd[0].length - 1;

    let objetoCostoMinimo = new CostoMinimo(fila, columna);
    // console.log(fila, columna);


    objetoCostoMinimo.guardarArrayCostosParaCalcular(extraerDatosInputsDeLaVistaArray(itemsTd));

    let esIgualSumaOfertaDemanda = objetoCostoMinimo.esSumaIguaOfertaDemanda();


    if (esIgualSumaOfertaDemanda) {
        alertify.success("Exito :)");
        // let arraySinFicticio = objetoCostoMinimo.getArrayACalcularCostos();
        mensajeCostoFicticio.setAttribute('hidden', '');
        mostrarMatrizCostoFicticio.innerHTML = '';
        resultadoVariablesTotal.innerHTML = '';


        objetoCostoMinimo.resolverCostoMinimo();

        let matrizFlujo = objetoCostoMinimo.getMatrizFlujo();
        objetoCostoMinimo.dibujarMatrizConDatosInput(mostrarResultadoFlujo, matrizFlujo);
        mensajeResultadoFlujo.removeAttribute('hidden');
        objetoCostoMinimo.comenzarDibujarTotalesResultadosVariables(resultadoVariablesTotal);

    } else {

        let mensajeModalDinamico = objetoCostoMinimo.mensajeDinamicoDeCualEsElMayorOfertaDemanda();

        alertify.confirm('NO ESTAN BALENCEADOS ' + mensajeModalDinamico + ' :V', '¿Quiere añadir ficticios Automaticamente?', function () {
                alertify.success('Ok');
                objetoCostoMinimo.creandoArrayConDatosFicticiosDerivados();
                objetoCostoMinimo.resolverCostoMinimo();

                let matrizFlujo = objetoCostoMinimo.getMatrizFlujo();
                objetoCostoMinimo.dibujarMatrizConDatosInput(mostrarResultadoFlujo, matrizFlujo);

                let costosTempFicticio = objetoCostoMinimo.getArrayACalcularCostos();
                objetoCostoMinimo.dibujarMatrizConDatosInput(mostrarMatrizCostoFicticio, costosTempFicticio);
                mensajeCostoFicticio.removeAttribute('hidden');

                mensajeResultadoFlujo.removeAttribute('hidden');
                objetoCostoMinimo.comenzarDibujarTotalesResultadosVariables(resultadoVariablesTotal);

            }
            , function () {
                alertify.error('Cancelado');
            });
    }

}

frmCalcularFlujoMatriz.addEventListener('submit', calcularResultadoCostoMinimoMostrar);