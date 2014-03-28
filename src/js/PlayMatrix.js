function PlayMatrix(rows, columns) {
    this.rows = rows;
    this.columns = columns;
}
PlayMatrix.prototype = {

    init: function() {
        this.matrix = new Array(this.rows);
        for (i = 0; i < this.rows; i++) {
            this.matrix[i] = new Array(this.columns);
            for (j = 0; j < this.columns; j++) {
                this.matrix[i][j] = 0;
            }
        }
    },

    getMatrixArray: function() {
        return this.getMatrixWithTermino();
    },

    displayMatrix: function() {
        console.log(this.matrix);
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
                    matrix[this.termino.y+i][this.termino.x+j] = terminoMatrix[i][j];
                }
            }
        }
        return matrix;
    }

};
