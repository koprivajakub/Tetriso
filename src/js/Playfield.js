function Playfield() {
    this.canvas = $('canvas#playfield');
    this.canvas.offsetTop = this.canvas.offset().top;
    this.canvas.offsetLeft = this.canvas.offset().left;
    this.blockSize = 32;
}

Playfield.prototype = {

    init: function() {
        this.playMatrix = new PlayMatrix(22, 10);
        this.playMatrix.init();
        this.drawGrid();
        this.runLoop();
    },

    drawGrid: function() {
        var matrix = this.playMatrix.getMatrixArray();
        for (i = 0; i < matrix.length; i++) {
            for (j = 0; j < matrix[i].length; j++) {
                this.canvas.drawRect({
                    x: j*this.blockSize, y: i*this.blockSize,
                    width: this.blockSize, height: this.blockSize,
                    strokeStyle: '#000',
                    strokeWidth: '1px',
                    fromCenter: false
                });
            }
        }
    },

    runLoop: function() {
        var _this = this;
        _this.startNewTermino();
        setInterval(function(){
            _this.moveTerminoDown();
            _this.redraw();
        },2000);

    },

    startNewTermino: function() {
        this.termino = new Termino('I');
        this.playMatrix.startTermino(this.termino);
    },

    redraw: function() {
        var matrix = this.playMatrix.getMatrixArray();
        this.canvas.clearCanvas();
        this.drawGrid();
        for (i = 0; i < matrix.length; i++) {
            for (j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] !== 0) {
                    this.canvas.drawImage({
                        source: 'img/brick-grey.png',
                        x: j*this.blockSize-16, y: i*this.blockSize-16,
                        fromCenter: false,
                        scale: 0.5
                    });
                }
            }
        }
    },

    moveTerminoLeft: function() {
        this.termino.x -= 1;
        this.redraw();
    },

    rotateTermino: function() {

    },

    moveTerminoRight: function() {
        this.termino.x += 1;
        this.redraw();
    },

    moveTerminoDown: function() {
        this.termino.y += 1;
        this.redraw();
    },

};
