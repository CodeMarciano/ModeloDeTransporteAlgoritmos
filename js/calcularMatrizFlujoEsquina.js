class EsquinaNoroeste{

    constructor(filaAdicional, columnaAdicional){
        this.filaAdicional = filaAdicional;
        this.columnaAdicional = columnaAdicional;

        this.filaNormal = filaAdicional - 1;
        this.columnaNormal = columnaAdicional - 1;

        this.arrayACalcularCostos = [];

        this.arrayOferta = [];
        this.arrayDemanda = [];

        this.sumaDemanda = 0;
        this.sumaOferta = 0;

        this.matrizFlujo = [];
    }

    getArrayCalcularCostos(){
        return this.arrayACalcularCostos;
    }

    getMatrizFlujo(){
        return this.matrizFlujo;
    }

    crearArrayFlujo(){
        // for (let i = 0; i < this.filaAdicional; i++) {
        //     for (let j = 0; j < this.columnaAdicional; j++) {
        //
        //     }
        // }


    }

    crearMatriz(filas, columnas) {
        let array = [];

        for (let i = 0; i < filas; i++) {
            array.push(new Array(columnas));
        }
        return array;
    }

    limpiarMatrizCostosParaAlistarMatrizDeFlujos(matrizAlimpiarCostosParaFlujo){

        for  (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {
                matrizAlimpiarCostosParaFlujo[i][j] = 0;
            }
        }

        this.matrizFlujo = matrizAlimpiarCostosParaFlujo.slice();
        // console.log(this.matrizFlujo);
    }

    resolverAlgoritmoEsquinaNoroeste(){
        let indexDemanda = 0, indexOferta = 0;

        let arrayDemandaCopy = this.arrayDemanda.slice(),
            arrayOfertaCopy = this.arrayOferta.slice();

        while (
            indexDemanda < this.columnaNormal &&
            indexOferta < this.filaNormal
            ) {

            if (arrayDemandaCopy[indexDemanda] < arrayOfertaCopy[indexOferta]) {

                if (arrayDemandaCopy[indexDemanda] === 0) {
                    this.ponerNumeroIndiceMatrizCostos(indexOferta, indexDemanda, arrayOfertaCopy[indexOferta]);
                    arrayOfertaCopy[indexOferta] = 0;

                    indexDemanda++;
                } else {
                    this.ponerNumeroIndiceMatrizCostos(indexOferta, indexDemanda, arrayDemandaCopy[indexDemanda]);
                    let restaResultado = arrayOfertaCopy[indexOferta] - arrayDemandaCopy[indexDemanda];
                    arrayOfertaCopy[indexOferta] = restaResultado;
                    indexDemanda++;
                }

            } else if (arrayDemandaCopy[indexDemanda] > arrayOfertaCopy[indexOferta]) {

                if (arrayOfertaCopy[indexOferta] === 0) {
                    this.ponerNumeroIndiceMatrizCostos(indexOferta, indexDemanda, arrayDemandaCopy[indexDemanda]);
                    arrayDemandaCopy[indexDemanda] = 0;
                    indexOferta++;
                } else {

                    this.ponerNumeroIndiceMatrizCostos(indexOferta, indexDemanda, arrayOfertaCopy[indexOferta]);
                    let restaResultado = arrayDemandaCopy[indexDemanda] - arrayOfertaCopy[indexOferta];
                    arrayDemandaCopy[indexDemanda] = restaResultado;
                    indexOferta++;
                }

            } else {
                this.ponerNumeroIndiceMatrizCostos(indexOferta, indexDemanda, arrayOfertaCopy[indexOferta]);
                indexDemanda++;
                indexOferta++;
            }

        }

    }

    ponerNumeroIndiceMatrizCostos(indexOferta, indexDemanda, numeroAPoner){
        this.matrizFlujo[indexOferta][indexDemanda] = numeroAPoner;
    }

    esSumaIguaOfertaDemanda(){
        for (let elemento of this.arrayDemanda) {
            this.sumaDemanda += elemento
        }

        for (let elemento of this.arrayOferta) {
            this.sumaOferta += elemento;
        }

        if (this.sumaDemanda === this.sumaOferta) {
            return true;
        }

        // console.log("Suma Oferta = " + this.sumaOferta);
        // console.log("Suma Demanda = " + this.sumaDemanda);
        return false;
    }

    apartarArrayDatosOfertaDemandaAparte(){
        let indexStaticoFilaDemanda = this.filaNormal;
        let indexStaticoColumnaOferta = this.columnaNormal;

        for (let j = 0; j < this.columnaNormal; j++) {
            this.arrayDemanda.push(this.arrayACalcularCostos[indexStaticoFilaDemanda][j]);
        }

        for (let i = 0; i < this.filaNormal; i++) {
            this.arrayOferta.push(this.arrayACalcularCostos[i][indexStaticoColumnaOferta]);
        }

        // console.log(this.arrayOferta);
        // console.log(this.arrayDemanda);

    }

    guardarArrayParaCalcular(nuevoArrayACalcular){

        this.arrayACalcularCostos = nuevoArrayACalcular.slice();
    }

    mostrarArrayFlujo(){
        return this.arrayACalcularCostos;
    }
}


let frmCalcularFlujoMatriz = document.getElementById('calcularMatrizFlujo');
let aniadidoCostos = document.getElementById('aniadirMatrizCostos');

function extraerDatosInputsDeLaVistaArray(itemsTd) {

    let arrayParaMatrizEsquinaNoroeste = [];
    
    let arrayAux = [];
    for (let elements of itemsTd) {
        for (let el of elements) {
            arrayAux.push(parseInt(el.querySelector('input').value, 0));
        }
        arrayParaMatrizEsquinaNoroeste.push(arrayAux);
        arrayAux = [];
    }

    return arrayParaMatrizEsquinaNoroeste;
}

frmCalcularFlujoMatriz.addEventListener('submit', function (e) {
    e.preventDefault();
    let itemsTr = [...aniadidoCostos.querySelectorAll('tr')];
    let itemsTd = itemsTr.map(a => [...a.querySelectorAll('td')]);

    let fila = itemsTr.length;
    let columna = itemsTd[0].length;

    // Guarda los datos del tamanio de la matriz de la vista
    let objetoEsquinaNoroeste = new EsquinaNoroeste(fila, columna);

    objetoEsquinaNoroeste.guardarArrayParaCalcular(extraerDatosInputsDeLaVistaArray(itemsTd));

    // console.log(objetoEsquinaNoroeste.mostrarArrayFlujo());
    objetoEsquinaNoroeste.apartarArrayDatosOfertaDemandaAparte();

    let esIgualSumaOfertaDemanda = objetoEsquinaNoroeste.esSumaIguaOfertaDemanda();

    if (esIgualSumaOfertaDemanda) {
        // console.log("Son Iguales :)");
        alertify.success("Demanda y Oferta Iguales Resolviendo :)");
        let arrayCostosSinFicticio = objetoEsquinaNoroeste.getArrayCalcularCostos().slice();

        objetoEsquinaNoroeste.limpiarMatrizCostosParaAlistarMatrizDeFlujos(arrayCostosSinFicticio);

        objetoEsquinaNoroeste.resolverAlgoritmoEsquinaNoroeste();

        let auxTempResultado = objetoEsquinaNoroeste.getMatrizFlujo().slice();

        console.log(auxTempResultado);

    } else {
        console.log("No son iguales");
    }

});