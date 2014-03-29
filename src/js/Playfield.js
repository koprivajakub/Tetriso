function Playfield(sizeY, sizeX) {
    this.canvas = $('canvas#playfield');
    this.canvas.offsetTop = this.canvas.offset().top;
    this.canvas.offsetLeft = this.canvas.offset().left;
    this.blockSize = 32;
    this.terminoTypes = {1:'I', 2:'O', 3:'T', 4:'S', 5:'Z', 6:'J', 7:'L'};
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.canvas.attr('height', this.sizeY*this.blockSize);
    this.canvas.attr('width', this.sizeX*this.blockSize);
    this.interval = 1000;
    // this.hideY = 5; schovani generovani Termin kvuli kolizim.
    this.hideY = 0;
}

Playfield.prototype = {

    init: function() {
        this.playMatrix = new PlayMatrix(this.sizeY, this.sizeX);
        this.playMatrix.init();
        this.drawGrid();
        this.runLoop();
    },

    drawGrid: function() {

        var matrix = this.playMatrix.getMatrixArray();
        for (i = 5; i < matrix.length; i++) {
      //for (i = this.hideY; i < matrix.length; i++) {
            for (j = 0; j < matrix[i].length; j++) {
                this.canvas.drawRect({
                    x: j*this.blockSize, y: i*this.blockSize-this.hideY*this.blockSize,
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
            if (_this.termino.sealed) {
                _this.startNewTermino();
            }
            _this.moveTerminoDown();
        },this.interval);
        setInterval(function(){
            _this.redraw();
        },1);
    },

    startNewTermino: function() {
        var typeInt = Math.floor(Math.random() * 7)+1;
        var terminoType = this.terminoTypes[typeInt];
        this.termino = new Termino(terminoType);
        this.playMatrix.startTermino(this.termino);
    },

    redraw: function() {
        var matrix = this.playMatrix.getMatrixArray();
        this.canvas.clearCanvas();
        this.drawGrid();
        for (i = this.hideY; i < matrix.length; i++) {
            for (j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] !== 0) {                    
                    var color = matrix[i][j] * 32 - 16;
                    this.canvas.drawImage({
                        source: 'img/brick-color.png',
                        x: j*this.blockSize, y: i*this.blockSize-this.hideY*this.blockSize,
                        sWidth: 32,
                        sHeight: 32,
                        sx: color, sy: 0,
                        fromCenter: false,
                    });
                }
            }
        }
    },

    moveTerminoLeft: function() {
        if (this.playMatrix.moveAllowed(-1,0,this.termino)) {
            this.termino.moveLeft();
        }
        this.redraw();
    },

    rotateTermino: function() {
        this.termino.rotate();
        this.redraw();
    },

    moveTerminoRight: function() {
        if (this.playMatrix.moveAllowed(1,0,this.termino)) {
            this.termino.moveRight();
        }
        this.redraw();
    },

    moveTerminoDown: function() {
        if (this.playMatrix.moveAllowed(0,1,this.termino)) {
            this.termino.moveDown();
        } else {
            var _this = this;
            setTimeout(function() {
                var sealed = _this.playMatrix.sealTermino(_this.termino);
                if (sealed) {
                    _this.startNewTermino();                    
                }
            },100);
        }
        this.redraw();
    },

};
