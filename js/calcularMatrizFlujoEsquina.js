class EsquinaNoroeste{

    constructor(filaAdicional, columnaAdicional){
        // No tocar tanto la fila adicional porque esta dibujando Matriz Flujo
        this.filaAdicional = filaAdicional;
        this.columnaAdicional = columnaAdicional;

        this.filaNormal = filaAdicional - 1;
        this.columnaNormal = columnaAdicional - 1;

        this.arrayACalcularCostos = [];
        this.arrayCostosForzarGuardarDatos = [];

        this.arrayOferta = [];
        this.arrayDemanda = [];

        this.sumaDemanda = 0;
        this.sumaOferta = 0;

        this.matrizFlujo = [];

        this.totalVariables = [];
        this.total = 0;

        this.arrayParaFicticio = [];
    }

    getArrayCostosForzarGuardarDatos(){
        return this.arrayCostosForzarGuardarDatos;
    }

    getArrayCalcularCostos(){
        return this.arrayACalcularCostos;
    }

    getMatrizFlujo(){
        return this.matrizFlujo;
    }

    getTotalVariables(){
        return this.totalVariables;
    }

    getTotal(){
        return this.total;
    }

    getArrayOferta(){
        return this.arrayOferta;
    }

    getArrayDemanda(){
        return this.arrayDemanda;
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
        let resultadoMulti = numeroAPoner * this.arrayCostosForzarGuardarDatos[indexOferta][indexDemanda];
        this.total += resultadoMulti;

        let cadenaCostosIndex = this.arrayCostosForzarGuardarDatos[indexOferta][indexDemanda];

        let concatVariablesTotal = `[ X(${indexOferta + 1},${indexDemanda + 1}) = ${numeroAPoner} ]  [Costos: ${cadenaCostosIndex}]`;
        this.totalVariables.push(concatVariablesTotal);

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

    mensajeDinamicoDeCualEsElMayorOfertaDemanda(){

        if (this.sumaOferta > this.sumaDemanda) {
            return "LA OFERTA ES MAYOR QUE LA DEMANDA";
        } else {
            return "LA DEMANDA ES MAYOR QUE LA OFERTA";
        }
    }

    obtenerArrayConDatosFicticios(){
        this.copyArrayMultidimensional(this.arrayParaFicticio, this.arrayCostosForzarGuardarDatos);

        if (this.sumaOferta > this.sumaDemanda) {
            let diferneciaSumaAniadir = this.sumaOferta - this.sumaDemanda;
            this.arrayParaFicticio[this.filaNormal].splice(this.columnaNormal, 0, diferneciaSumaAniadir);

            for (let i = 0; i < this.filaNormal; i++) {
                this.arrayParaFicticio[i].splice(this.columnaNormal, 0, 0);
            }
            this.columnaNormal += 1;
            this.columnaAdicional += 1;
        } else {
            let diferneciaSumaAniadir = this.sumaDemanda - this.sumaOferta;

            let arrayCeroParaFicticio = [];
            for (let i = 0; i < this.columnaNormal; i++) {
                arrayCeroParaFicticio.push(0);
            }
            arrayCeroParaFicticio.push(diferneciaSumaAniadir);
            this.arrayParaFicticio.splice(this.filaNormal, 0, arrayCeroParaFicticio.slice());
            this.filaNormal += 1;
            this.filaAdicional += 1;
        }

        this.arrayACalcularCostos = [];
        this.arrayCostosForzarGuardarDatos = [];

        this.copyArrayMultidimensional(this.arrayACalcularCostos, this.arrayParaFicticio);
        this.copyArrayMultidimensional(this.arrayCostosForzarGuardarDatos, this.arrayParaFicticio);

        return this.arrayParaFicticio;
    }

    flusOfertaDemandaVariabes(){
        this.arrayOferta = [];
        this.arrayDemanda = [];
    }

    apartarArrayDatosOfertaDemandaAparte(){
        let indexStaticoFilaDemanda = this.filaNormal;
        let indexStaticoColumnaOferta = this.columnaNormal;

        console.log(indexStaticoFilaDemanda, indexStaticoColumnaOferta);

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

        // this.arrayACalcularCostos = nuevoArrayACalcular.slice();
        this.copyArrayMultidimensional(this.arrayACalcularCostos, nuevoArrayACalcular);
        this.copyArrayMultidimensional(this.arrayCostosForzarGuardarDatos, nuevoArrayACalcular);
    }

    mostrarArrayFlujo(){
        return this.arrayACalcularCostos;
    }


    copyArrayMultidimensional(arrayNuevo, arrayACopiar) {

        for (let elems of arrayACopiar) {
            arrayNuevo.push(elems.slice());
        }
    }

    comenzarDibujarMatriz(elemento) {
        let cadenaConcat = "<tr>";
        console.log(this.filaAdicional);
        console.log(this.columnaAdicional);

        for (let i = 0; i < this.filaAdicional; i++) {
            for (let j = 0; j < this.columnaAdicional; j++) {

                if (j === this.columnaAdicional-1) {
                    if (i === this.filaAdicional-1) {
                        cadenaConcat +="";
                    } else {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' value='${this.matrizFlujo[i][j]}' disabled required></td>
                        `;
                    }
                } else {

                    if (i === this.filaAdicional -1) {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' value='${this.matrizFlujo[i][j]}' disabled required></td>
                        `;
                    } else {

                        cadenaConcat += `
                                <td><input type='text' style='width: 50px;' value='${this.matrizFlujo[i][j]}' disabled required></td>
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

    comenzarDibujarMatrizConFicticio(elemento) {
        let cadenaConcat = "<tr>";
        console.log(this.filaAdicional);
        console.log(this.columnaAdicional);

        for (let i = 0; i < this.filaAdicional; i++) {
            for (let j = 0; j < this.columnaAdicional; j++) {

                if (j === this.columnaAdicional-1) {
                    if (i === this.filaAdicional-1) {
                        cadenaConcat +="";
                    } else {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' value='${this.arrayACalcularCostos[i][j]}' disabled required></td>
                        `;
                    }
                } else {

                    if (i === this.filaAdicional -1) {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' value='${this.arrayACalcularCostos[i][j]}' disabled required></td>
                        `;
                    } else {

                        cadenaConcat += `
                                <td><input type='text' style='width: 50px;' value='${this.arrayACalcularCostos[i][j]}' disabled required></td>
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

    comenzarDibujarTotalesResultadosVariables(elemento) {
        let cadenaConcat = "";
        for (let variables of this.totalVariables) {
            cadenaConcat += `<tr>
                                <td>${variables}</td>
                            </tr>`;
        }
        cadenaConcat += `<tr><td>Total = ${this.total}</td></tr>`;
        elemento.innerHTML = cadenaConcat;
    }

}


let frmCalcularFlujoMatriz = document.getElementById('calcularMatrizFlujo');
let aniadidoCostos = document.getElementById('aniadirMatrizCostos');

// Pintar ID PARA NO FICTICIOS MATRIZ
let mostrarResultadoFlujo = document.getElementById('mostrarResultado');
let mensajeResultadoFlujo = document.getElementById('mensajeResultado');

//Pintar SI FICTICIOS ID
let mostrarMatrizCostoFicticio = document.getElementById('mostrarMatrizCostoConficticio');
let mensajeCostoFicticio = document.getElementById('mensajeMatrizCostoFicticio');

// Pintar Resultados ID
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

frmCalcularFlujoMatriz.addEventListener('submit', function (e) {
    e.preventDefault();
    let itemsTr = [...aniadidoCostos.querySelectorAll('tr')];
    let itemsTd = itemsTr.map(a => [...a.querySelectorAll('td')]);

    let fila = itemsTr.length;
    let columna = itemsTd[0].length;

    // Guarda los datos del tamanio de la matriz de la vista
    let objetoEsquinaNoroeste = new EsquinaNoroeste(fila, columna);

    objetoEsquinaNoroeste.guardarArrayParaCalcular(extraerDatosInputsDeLaVistaArray(itemsTd));

    objetoEsquinaNoroeste.apartarArrayDatosOfertaDemandaAparte();

    let esIgualSumaOfertaDemanda = objetoEsquinaNoroeste.esSumaIguaOfertaDemanda();

    if (esIgualSumaOfertaDemanda) {
        alertify.success("Demanda y Oferta Iguales Resolviendo :)");

        mensajeCostoFicticio.setAttribute('hidden', '');
        mostrarMatrizCostoFicticio.innerHTML = '';
        resultadoVariablesTotal.innerHTML = '';

        let arrayCostosSinFicticio = objetoEsquinaNoroeste.getArrayCalcularCostos().slice();

        objetoEsquinaNoroeste.limpiarMatrizCostosParaAlistarMatrizDeFlujos(arrayCostosSinFicticio);

        objetoEsquinaNoroeste.resolverAlgoritmoEsquinaNoroeste();

        let auxTempResultado = objetoEsquinaNoroeste.getMatrizFlujo();

        objetoEsquinaNoroeste.comenzarDibujarMatriz(mostrarResultadoFlujo);
        mensajeResultadoFlujo.removeAttribute('hidden');

        objetoEsquinaNoroeste.comenzarDibujarTotalesResultadosVariables(resultadoVariablesTotal);

        console.log(auxTempResultado);
        console.log(objetoEsquinaNoroeste.getArrayCostosForzarGuardarDatos());

    } else {
        let mensajeModalDinamico = objetoEsquinaNoroeste.mensajeDinamicoDeCualEsElMayorOfertaDemanda();

        alertify.confirm('NO ESTAN BALENCEADOS ' + mensajeModalDinamico +' :V', '¿Quiere añadir ficticios Automaticamente?', function () {
                alertify.success('Ok');

                let capturarArrayFicticio = objetoEsquinaNoroeste.obtenerArrayConDatosFicticios().slice();
                console.log("Datos bASE FICTICIO");

                console.log(objetoEsquinaNoroeste.getArrayCalcularCostos());
                console.log(capturarArrayFicticio);

                console.log(objetoEsquinaNoroeste.getArrayOferta());
                console.log(objetoEsquinaNoroeste.getArrayDemanda());

                objetoEsquinaNoroeste.flusOfertaDemandaVariabes();
                objetoEsquinaNoroeste.apartarArrayDatosOfertaDemandaAparte();


                console.log(objetoEsquinaNoroeste.getArrayOferta());
                console.log(objetoEsquinaNoroeste.getArrayDemanda());


                objetoEsquinaNoroeste.limpiarMatrizCostosParaAlistarMatrizDeFlujos(capturarArrayFicticio);

                objetoEsquinaNoroeste.resolverAlgoritmoEsquinaNoroeste();

                let auxTempResultado = objetoEsquinaNoroeste.getMatrizFlujo().slice();

                objetoEsquinaNoroeste.comenzarDibujarMatrizConFicticio(mostrarMatrizCostoFicticio);
                mensajeCostoFicticio.removeAttribute('hidden');

                objetoEsquinaNoroeste.comenzarDibujarMatriz(mostrarResultadoFlujo);
                mensajeResultadoFlujo.removeAttribute('hidden');

                objetoEsquinaNoroeste.comenzarDibujarTotalesResultadosVariables(resultadoVariablesTotal);

                console.log("Resultado");
                console.log(auxTempResultado);
                console.log("Total Total " + objetoEsquinaNoroeste.getTotal());
                console.log("Variables " + objetoEsquinaNoroeste.getTotalVariables());
                console.log("Forzado====")
                console.log(objetoEsquinaNoroeste.getArrayCostosForzarGuardarDatos());

            }
            , function () {
                alertify.error('Cancelado');
            });

    }

});