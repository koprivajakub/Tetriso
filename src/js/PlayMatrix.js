function PlayMatrix(sizeY, sizeX) {
    this.rows = sizeY;
    this.columns = sizeX;
}
PlayMatrix.prototype = {

    init: function() {
        this.matrix = new Array(this.rows);
        for (i = 0; i < this.matrix.length; i++) {
            this.matrix[i] = new Array(this.columns);
            for (j = 0; j < this.matrix[i].length; j++) {
                this.matrix[i][j] = 0;
            }
        }
    },

    getMatrixArray: function() {
        return this.getMatrixWithTermino();
    },

    displayMatrix: function() {
        console.log(this.getMatrixWithTermino());
    },

    startTermino: function(termino) {
        this.termino = termino;
        this.termino.x = this.columns/2-2;
        this.termino.y = 0;
    },

    getMatrixWithTermino: function() {
        var matrix = new Array(this.matrix.length);
        for (i = 0; i < this.matrix.length; i++) {
            matrix[i] = new Array(this.matrix[i].length);
            for (j = 0; j < this.matrix[i].length; j++) {
                matrix[i][j] = this.matrix[i][j];
            }
        }
        if (this.termino) {
            var terminoMatrix = this.termino.getTerminoMatrix();
            for (i = 0; i < terminoMatrix.length; i++) {
                for (j = 0; j < terminoMatrix[i].length; j++) {
                    if (terminoMatrix[i][j] !== 0) {
                        matrix[this.termino.y+i][this.termino.x+j] = terminoMatrix[i][j];
                    }
                }
            }
        }
        return matrix;
    },

    moveAllowed: function(dx, dy, termino) {
        var matrix = new Array(this.matrix.length);
        for (i = 0; i < this.matrix.length; i++) {
            matrix[i] = new Array(this.matrix[i].length);
            for (j = 0; j < this.matrix[i].length; j++) {
                matrix[i][j] = this.matrix[i][j];
            }
        }
        if (termino) {
            var terminoMatrix = termino.getTerminoMatrix();
            for (i = 0; i < terminoMatrix.length; i++) {
                for (j = 0; j < terminoMatrix[i].length; j++) {                
                    if (terminoMatrix[i][j] !== 0) {
                        // JE TAM NĚJAKEJ ČTVEREC
                        if (termino.y+dy+i >= matrix.length) {
                            // TERMINO JE DOLE
                            return false;
                        }
                        if (matrix[termino.y+dy+i][termino.x+dx+j] !== 0) {
                            // NEMUŽU SE TAM HNOUT
                            if (termino.y+i <= 5) {
                                alert('GAME OVER');
                            }
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    },

    sealTermino: function(termino) {               
        if (termino.y > 2) {
            var terminoMatrix = termino.getTerminoMatrix();
            for (i = 0; i < terminoMatrix.length; i++) {
                for (j = 0; j < terminoMatrix[i].length; j++) {
                    if (terminoMatrix[i][j] !== 0) {
                        this.matrix[termino.y+i][termino.x+j] = terminoMatrix[i][j];
                    }
                }
            }
            return true;
        }
        return false;
    }



};
