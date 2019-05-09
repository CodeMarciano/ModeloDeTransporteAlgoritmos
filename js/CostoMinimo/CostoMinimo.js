class CostoMinimo extends MatrizCostoFlujo{

    constructor(fila, columna){
        super(fila, columna);
    }

    funcionaG(){
        return `fila ${this.filaAdicional} Columna: ${this.columnaAdicional}`;
    }

    funcionaD(){
        return `fila ${this.filaNormal} Columna: ${this.columnaNormal}`;
    }
    
}