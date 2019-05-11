class AproximacionVoguel extends MatrizCostoFlujo{
    constructor(fila, columna){
        super(fila, columna);
        this.arrayTablaVirtual = [];
        this.copyArrayTablaVirtual = [];

        this.simboloEquis = 'x';
        this.simboloGuion = '-';
        this.simboloQueSeaO = 'o';

    }

    resolverAproximacionDeVoguel(){
        this.crearTablaVirtual();
        // this.copyArrayMultidimensional(this.copyArrayTablaVirtual, this.arrayTablaVirtual);

        this.limpiarMatrizCostosParaAlistarMatrizDeFlujos();

        console.log("====Antes============");
        console.log(this.matrizFlujo);
        console.log(this.arrayOferta);
        console.log(this.arrayDemanda);
        console.log(this.arrayTablaVirtual);

        while (this.noSeTerminoSimboloGuion()) {
            let arrayIndiceFull = this.obtenerIndicesFilaColumna();
            let filaEncontrada = arrayIndiceFull[0];
            let columnaEncontrada = arrayIndiceFull[1];

            if (this.arrayOferta[filaEncontrada] > this.arrayDemanda[columnaEncontrada]) {
                this.arrayTablaVirtual[filaEncontrada][columnaEncontrada] = this.simboloEquis;
                this.matrizFlujo[filaEncontrada][columnaEncontrada] = this.arrayDemanda[columnaEncontrada];
                let resta = this.arrayOferta[filaEncontrada] - this.arrayDemanda[columnaEncontrada];
                this.arrayOferta[filaEncontrada] = resta;
                this.ponerEnQueseaOColumna(columnaEncontrada);

            } else if (this.arrayDemanda[columnaEncontrada] > this.arrayOferta[filaEncontrada]) {
                this.arrayTablaVirtual[filaEncontrada][columnaEncontrada] = this.simboloEquis;
                this.matrizFlujo[filaEncontrada][columnaEncontrada] = this.arrayOferta[filaEncontrada];
                let resta = this.arrayDemanda[columnaEncontrada] - this.arrayOferta[filaEncontrada];
                this.arrayDemanda[columnaEncontrada] = resta;
                this.ponerEnQueseaOFila(filaEncontrada);

            } else {
                this.arrayTablaVirtual[filaEncontrada][columnaEncontrada] = this.simboloEquis;
                this.matrizFlujo[filaEncontrada][columnaEncontrada] = this.arrayDemanda[columnaEncontrada];
                let resta = this.arrayDemanda[columnaEncontrada] - this.arrayOferta[filaEncontrada];
                this.arrayDemanda[columnaEncontrada] = resta;
                this.arrayOferta[filaEncontrada] = resta;
                this.ponerEnQueseaOFila(filaEncontrada);
                this.ponerEnQueseaOColumna(columnaEncontrada);

            }

            let resultadoMulti = this.matrizFlujo[filaEncontrada][columnaEncontrada] * this.arrayCostosForzarGuardarDatos[filaEncontrada][columnaEncontrada];
            this.total += resultadoMulti;

            let cadenaCostosIndex = this.arrayCostosForzarGuardarDatos[filaEncontrada][columnaEncontrada];
            let concatVariablesTotal = `[ X(${filaEncontrada + 1},${columnaEncontrada + 1}) = ${this.matrizFlujo[filaEncontrada][columnaEncontrada]} ]  [Costos: ${cadenaCostosIndex}]`;
            this.totalVariables.push(concatVariablesTotal);

        }

        console.log(this.matrizFlujo);
        console.log(this.total);
        console.log(this.totalVariables);

        // this.obtenerIndicesFilaColumna();

    }

    obtenerIndicesFilaColumna() {
        // Prodriamos Copiarlo
        // let arrayFilaVirtual = this.obtenerCopyFilaVirtual();
        // let arraColumnaVirtual = this.obtenerCopyColumnaVirtual();
        let arrayFilaValorMasIndiceMasEsColumnaOFilaValor = [];

        for (let i = 0; i < this.filaNormal; i++) {
            let arrayFilaVirtual = this.obtenerCopyFilaVirtual(i);

            if (this.existeGuionEnArray(arrayFilaVirtual)) {
                let arrayFilaCostos = this.obtenerCopyFilaCostos(i);

                let valorRestaFila = this.obtenerRestaEncontrandoDosMenoresVirtual(arrayFilaVirtual, arrayFilaCostos);
                let arrayAux = [];
                arrayAux.push(valorRestaFila);
                arrayAux.push(i);
                arrayAux.push(0);
                arrayFilaValorMasIndiceMasEsColumnaOFilaValor.push(arrayAux.slice());
            }

        }

        for (let j = 0; j < this.columnaNormal; j++) {
            let arrayColumnaVirtual = this.obtenerCopyColumnaVirtual(j);

            if (this.existeGuionEnArray(arrayColumnaVirtual)) {
                let arrayColumnaCostos = this.obtenerCopyColumnaCostos(j);

                let valorRestaColumna = this.obtenerRestaEncontrandoDosMenoresVirtual(arrayColumnaVirtual, arrayColumnaCostos);
                let arrayAux = [];
                arrayAux.push(valorRestaColumna);
                arrayAux.push(j);
                arrayAux.push(1);
                arrayFilaValorMasIndiceMasEsColumnaOFilaValor.push(arrayAux.slice());
            }
        }

        console.log(arrayFilaValorMasIndiceMasEsColumnaOFilaValor);

        let arrayMayor = this.obtenerValorMayor(arrayFilaValorMasIndiceMasEsColumnaOFilaValor);
        let esFilaOColumna = arrayMayor[2];
        let arrayDevolverIndiceFilaColumna = [];

        if (esFilaOColumna === 0) {

            let indicefila = arrayMayor[1];
            let arrayVirtualFila = this.obtenerCopyFilaVirtual(indicefila);
            let arrayFilaCostos = this.obtenerCopyFilaCostos(indicefila);
            let indexColumnaEncontrada = this.encontraNumeroMenorDelArrayVirtualIndex(arrayVirtualFila, arrayFilaCostos);
            arrayDevolverIndiceFilaColumna.push(indicefila);
            arrayDevolverIndiceFilaColumna.push(indexColumnaEncontrada);
        } else {
            let indiceColumna = arrayMayor[1];
            let arrayVirtualColumna = this.obtenerCopyColumnaVirtual(indiceColumna);
            let arrayColumnaCostos = this.obtenerCopyColumnaCostos(indiceColumna);
            let indiceFilaEncontrada = this.encontraNumeroMenorDelArrayVirtualIndex(arrayVirtualColumna, arrayColumnaCostos);
            arrayDevolverIndiceFilaColumna.push(indiceFilaEncontrada, indiceColumna);
        }

        return arrayDevolverIndiceFilaColumna;
    }

    existeGuionEnArray(arrayABuscarSiExiste){
        let haEntrado = false;

        for (let index = 0; index < arrayABuscarSiExiste.length; index++) {
            if (arrayABuscarSiExiste[index] === '-' && haEntrado === false) {
                haEntrado = true;
            }
        }

        return haEntrado;
    }

    obtenerRestaEncontrandoDosMenoresVirtual(arrayACalcularVirtual, arrayACalcularCostos){

        let tamanioArray = arrayACalcularVirtual.length;
        let repetir = 2;
        let indexRepetir = 0;
        let restaTotal = 0;
        let datosEncontrados = [];

        if (this.cantidadQuiones(arrayACalcularVirtual) === 1) {
            let arrayCuandoEsUnGuionValor = this.obtenerElMenorEnLosGuiones(arrayACalcularVirtual, arrayACalcularCostos);
            restaTotal = arrayCuandoEsUnGuionValor[1];
        } else {
            while (indexRepetir < repetir) {
                let indexEncontradoMenor = this.encontraNumeroMenorDelArrayVirtualIndex(arrayACalcularVirtual, arrayACalcularCostos);
                datosEncontrados.push(arrayACalcularCostos[indexEncontradoMenor]);
                arrayACalcularVirtual[indexEncontradoMenor] = this.simboloEquis;
                indexRepetir++;
            }

            restaTotal = datosEncontrados[1] - datosEncontrados[0];
        }

        return restaTotal;
    }

    cantidadQuiones(arrayAContarGuionVirtual){
        let contador = 0;

        for (let index = 0; index < arrayAContarGuionVirtual.length; index++) {
            if (arrayAContarGuionVirtual[index] === '-') {
                contador++;
            }
        }

        return contador;
    }

    encontraNumeroMenorDelArrayVirtualIndex(arrayAEncontrarMenorVirtual, arrayAEncontrarMenorCostos){
        let variableIndex = 0;

        let indiceEncontrado = 0;

        let entroAdentro = false;

        let variableAEcontrarMenorDerivados = this.obtenerElMenorEnLosGuiones(arrayAEncontrarMenorVirtual, arrayAEncontrarMenorCostos);
        let variableAEncontrarMenorIndex = variableAEcontrarMenorDerivados[0];
        let variableAEncontrarMenor = variableAEcontrarMenorDerivados[1];

        for (let index = 0; index < arrayAEncontrarMenorVirtual.length; index++) {
            if (arrayAEncontrarMenorCostos[index] < variableAEncontrarMenor &&
                arrayAEncontrarMenorVirtual[index] !== this.simboloQueSeaO &&
                arrayAEncontrarMenorVirtual[index] !== this.simboloEquis
            ) {
                indiceEncontrado = index;
                variableAEncontrarMenor = arrayAEncontrarMenorCostos[index];
                entroAdentro = true;
            }
        }

        if (entroAdentro) {
            variableIndex = indiceEncontrado;
        } else {
            variableIndex = variableAEncontrarMenorIndex;
        }

        return variableIndex;
    }

    obtenerElMenorEnLosGuiones(arrayAEncontrarGuionVirtual, arrayAEncontrarGuionCostos){
        let arrayIndexValor = [];
        let haEntrado = false;

        for (let index = 0; index < arrayAEncontrarGuionVirtual.length; index++) {
            if (arrayAEncontrarGuionVirtual[index] === '-' && haEntrado === false) {
                    arrayIndexValor.push(index);
                    arrayIndexValor.push(arrayAEncontrarGuionCostos[index]);
                    haEntrado = true;
            }
        }

        return arrayIndexValor;
    }


    obtenerCopyFilaVirtual(i){
        let arrayFilaVirtual = [];

        for (let j = 0; j < this.columnaNormal; j++) {
            arrayFilaVirtual.push(this.arrayTablaVirtual[i][j])
        }

        return arrayFilaVirtual;
    }

    obtenerCopyFilaCostos(i){
        let arrayFilaCostos = [];

        for (let j = 0; j < this.columnaNormal; j++) {
            arrayFilaCostos.push(this.arrayACacularCostos[i][j])
        }

        return arrayFilaCostos;

    }

    obtenerCopyColumnaCostos(j){
        let arrayColumnaCostos = [];

        for (let i = 0; i < this.filaNormal; i++) {
            arrayColumnaCostos.push(this.arrayACacularCostos[i][j])
        }

        return arrayColumnaCostos;
    }

    obtenerCopyColumnaVirtual(j){
        let arrayColumnaVirtual = [];

        for (let i = 0; i < this.filaNormal; i++) {
            arrayColumnaVirtual.push(this.arrayTablaVirtual[i][j])
        }

        return arrayColumnaVirtual;
    }

    crearTablaVirtual() {
        this.arrayTablaVirtual = this.crearMatriz(this.filaNormal, this.columnaNormal);

        for (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {
                this.arrayTablaVirtual[i][j] = this.simboloGuion;
            }
        }
    }

    obtenerValorMayor(arrayCalcular){
        let arrayMayorContodo = [];

        let mayor = arrayCalcular[0][0];
        let indiceEncontradoMayor = arrayCalcular[0][1];
        let esFilaOColumna = arrayCalcular[0][2];

        for (let index = 0; index < arrayCalcular.length; index++) {
            if (arrayCalcular[index][0] > mayor) {
                mayor = arrayCalcular[index][0];
                indiceEncontradoMayor = arrayCalcular[index][1];
                esFilaOColumna = arrayCalcular[index][2];
            }
        }

        arrayMayorContodo.push(mayor, indiceEncontradoMayor, esFilaOColumna);

        return arrayMayorContodo;
    }

    noSeTerminoSimboloGuion(){
        let existeSimboloGuion = false;

        for (let i = 0; i < this.filaNormal; i++) {
            for (let j = 0; j < this.columnaNormal; j++) {
                if (this.arrayTablaVirtual[i][j] === this.simboloGuion) {
                    existeSimboloGuion = true;
                }
            }
        }
        return existeSimboloGuion;
    }

    ponerEnQueseaOFila(indiceFilaStatica) {
        for (let j = 0; j < this.columnaNormal; j++) {
            if (this.arrayTablaVirtual[indiceFilaStatica][j] !== this.simboloEquis) {
                this.arrayTablaVirtual[indiceFilaStatica][j] = this.simboloQueSeaO;
            }
        }
    }

    ponerEnQueseaOColumna(indiceColumnaEstatica) {
        for (let i = 0; i < this.filaNormal; i++) {
            if (this.arrayTablaVirtual[i][indiceColumnaEstatica] !== this.simboloEquis) {
                this.arrayTablaVirtual[i][indiceColumnaEstatica] = this.simboloQueSeaO;
            }
        }

    }

}