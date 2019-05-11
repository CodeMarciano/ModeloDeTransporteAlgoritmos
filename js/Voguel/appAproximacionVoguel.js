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

    let objetoAproximacionVoguel = new AproximacionVoguel(fila, columna);
    // console.log(fila, columna);


    objetoAproximacionVoguel.guardarArrayCostosParaCalcular(extraerDatosInputsDeLaVistaArray(itemsTd));

    let esIgualSumaOfertaDemanda = objetoAproximacionVoguel.esSumaIguaOfertaDemanda();


    if (esIgualSumaOfertaDemanda) {
        alertify.success("Exito :)");
        objetoAproximacionVoguel.resolverAproximacionDeVoguel();
        
        let matrizFlujo = objetoAproximacionVoguel.getMatrizFlujo();
        objetoAproximacionVoguel.dibujarMatrizConDatosInput(mostrarResultadoFlujo, matrizFlujo);
        mensajeResultadoFlujo.removeAttribute('hidden');
        objetoAproximacionVoguel.comenzarDibujarTotalesResultadosVariables(resultadoVariablesTotal);

    } else {

        let mensajeModalDinamico = objetoAproximacionVoguel.mensajeDinamicoDeCualEsElMayorOfertaDemanda();

        alertify.confirm('NO ESTAN BALENCEADOS ' + mensajeModalDinamico + ' :V', '¿Quiere añadir ficticios Automaticamente?', function () {
                alertify.success('Ok');
                objetoAproximacionVoguel.creandoArrayConDatosFicticiosDerivados();
                objetoAproximacionVoguel.resolverAproximacionDeVoguel();

                let matrizFlujo = objetoAproximacionVoguel.getMatrizFlujo();
                objetoAproximacionVoguel.dibujarMatrizConDatosInput(mostrarResultadoFlujo, matrizFlujo);

                let costosTempFicticio = objetoAproximacionVoguel.getArrayACalcularCostos();
                objetoAproximacionVoguel.dibujarMatrizConDatosInput(mostrarMatrizCostoFicticio, costosTempFicticio);
                mensajeCostoFicticio.removeAttribute('hidden');

                mensajeResultadoFlujo.removeAttribute('hidden');
                objetoAproximacionVoguel.comenzarDibujarTotalesResultadosVariables(resultadoVariablesTotal);

                // console.log(arrayConFicticio);
            }
            , function () {
                alertify.error('Cancelado');
            });
    }

}

frmCalcularFlujoMatriz.addEventListener('submit', calcularResultadoCostoMinimoMostrar);