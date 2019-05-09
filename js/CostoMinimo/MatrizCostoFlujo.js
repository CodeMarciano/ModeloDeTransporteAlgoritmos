class MatrizCostoFlujo {
    constructor(fila, columna){
        this.filaNormal = fila;
        this.columnaNormal = columna;

        this.filaAdicional = fila + 1;
        this.columnaAdicional = columna + 1;

        this.arrayACacularCostos = [];
        this.arrayCostosForzarGuardarDatos = [];

        this.arrayDemanda = [];
        this.arrayOferta = [];

        this.sumaOferta = 0;
        this.sumaDemanda = 0;

        this.arrayParaFicticio = [];
    }

    getTodo(){
        console.log(this.filaNormal, this.columnaNormal);
        console.log(this.filaAdicional, this.columnaAdicional);
    }

    getArrayACalcularCostos(){
        return this.arrayACacularCostos
    }

    getArrayCostosForzarGuardarDatos(){
        return this.arrayCostosForzarGuardarDatos;
    }

    dibujarMatrizConDatosInput(elemento, arrayADibujar){
        let cadenaConcat = "<tr>";

        for (let i = 0; i < this.filaAdicional; i++) {
            for (let j = 0; j < this.columnaAdicional; j++) {

                if (j === this.columnaAdicional-1) {
                    if (i === this.filaAdicional-1) {
                        cadenaConcat +="";
                    } else {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' value='${arrayADibujar[i][j]}' required></td>
                        `;
                    }
                } else {

                    if (i === this.filaAdicional -1) {
                        cadenaConcat += `
                            <td><input type='text' style='width: 50px;' class='green accent-1' value='${arrayADibujar[i][j]}' required></td>
                        `;
                    } else {

                        cadenaConcat += `
                                <td><input type='text' style='width: 50px;' value='${arrayADibujar[i][j]}' required></td>
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

    comenzarDibujarMatrizSinDatosInput(elemento) {
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

    copyArrayMultidimensional(arrayContenedorCopia, arrayParaCopiar) {

        for (let elems of arrayParaCopiar) {
            arrayContenedorCopia.push(elems.slice());
        }
    }

    guardarArrayCostosParaCalcular(arrayAGuardar){
        this.copyArrayMultidimensional(this.arrayACacularCostos, arrayAGuardar);
        this.copyArrayMultidimensional(this.arrayCostosForzarGuardarDatos, arrayAGuardar);
    }

    apartarArrayDatosOfertaDemandaAparte() {
        let indexStaticoFilaDemanda = this.filaNormal;
        let indexStaticoColumnaOferta = this.columnaNormal;


        for (let j = 0; j < this.columnaNormal; j++) {
            this.arrayDemanda.push(this.arrayACacularCostos[indexStaticoFilaDemanda][j]);
        }

        for (let i = 0; i < this.filaNormal; i++) {
            this.arrayOferta.push(this.arrayACacularCostos[i][indexStaticoColumnaOferta]);
        }

    }

    esSumaIguaOfertaDemanda(){
        this.apartarArrayDatosOfertaDemandaAparte();

        for (let elemento of this.arrayDemanda) {
            this.sumaDemanda += elemento
        }

        for (let elemento of this.arrayOferta) {
            this.sumaOferta += elemento;
        }

        if (this.sumaDemanda === this.sumaOferta) {
            console.log("Suma Oferta = " + this.sumaOferta);
            console.log("Suma Demanda = " + this.sumaDemanda);

            return true;
        }

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


}