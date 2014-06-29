function Playfield(sizeY, sizeX, tetrisoGame) {
    this.tetrisoGame = tetrisoGame;
    this.canvas = $('canvas#playfield');
    this.leftPane = $('canvas#leftField');
    this.rightPane = $('canvas#rightField');
    this.canvas.offsetTop = this.canvas.offset().top;
    this.canvas.offsetLeft = this.canvas.offset().left;
    this.blockSize = 32;    
    this.sizeX = sizeX;
    this.sizeY = sizeY;    
    this.interval = 1000;
    this.hideY = 3; //schovani generovani Termin kvuli kolizim.
    // this.hideY = 0;
    this.canvas.attr('height', (this.sizeY-this.hideY)*this.blockSize);
    this.canvas.attr('width', this.sizeX*this.blockSize);    
    this.nextTermino = new Termino();
    this.lineCounter = 0;
    this.terminoOnHold = null;
    this.canStashTermino = true;
    this.strokeStyle = '#1fb7d1';
    this.fillStyle = 'rgba(25,25,25,0.7)';
    this.gamePaused = true;
    this.level = 1;
    this.messageCenter = $('div#message-center');
    this.pauseMessage = $('<div></div>');
    this.pauseMessage.attr('id', 'message');
    this.pauseMessage.html('Paused ... <br /> Press play in menu...');
    this.pauseMessage.css('lineHeight', '1.5em');
    this.levelUpMessage = $('<div></div>');
    this.levelUpMessage.attr('id', 'message');
    this.levelUpMessage.html('!!! Level UP !!!');
    this.sounds = [];
    this.sounds['success'] = new Howl({
                urls: ['./sound/success.mp3', './sound/success.ogg'],
                buffer: true,
            });
    this.sounds['lvlUp'] = new Howl({
                urls: ['./sound/levelUp.mp3', './sound/levelUp.ogg'],
                buffer: true,
            });
}

Playfield.prototype = {

    init: function() {
        this.termino = null;
        this.nextTermino = new Termino();
        this.terminoOnHold = null;
        this.score = 0;
        this.lineCounter = 0;
        this.level = 1;
        this.gameOver = false;
        this.playMatrix = new PlayMatrix(this.sizeY, this.sizeX);
        this.playMatrix.init();
        this.drawGrid();
        this.drawNextTermino();
        this.drawHoldTermino();
        this.startGame();
    },

    drawGrid: function() {
        var matrix = this.playMatrix.getMatrix();
        for (i = this.hideY; i < matrix.length; i++) {
            for (j = 0; j < matrix[i].length; j++) {
                this.canvas.drawRect({
                    x: j*this.blockSize, y: i*this.blockSize-this.hideY*this.blockSize,
                    width: this.blockSize, height: this.blockSize,
                    strokeStyle: this.strokeStyle,
                    strokeWidth: '1px',
                    fromCenter: false,
                    fillStyle: this.fillStyle,
                });
            }
        }
    },

    play: function() {
        this.gamePaused = false;
        this.loopInterval_id = setInterval(this.runLoop.bind(this),this.interval);
        this.hideMessage(this.pauseMessage);
    },

    pause: function() {
        this.gamePaused = true;
        clearInterval(this.loopInterval_id);
        this.showMessage(this.pauseMessage);
    },

    restart: function() {
        if (this.loopInterval_id) {
            clearInterval(this.loopInterval_id);
        }
        if (this.gamePaused) {
            this.hideMessage(this.pauseMessage);
        }
        this.gamePaused = false;        
        this.init();        
    },

    levelUp: function() {        
        if (this.level < 10) {
            this.level++;
            this.showMessage(this.levelUpMessage);
            setTimeout(this.hideMessage.bind(this, this.levelUpMessage), 1000);
            this.sounds['lvlUp'].play();
            this.interval = 1000 - 100*(this.level-1);            
        }
        if (this.loopInterval_id) {
            clearInterval(this.loopInterval_id);        
        }
        this.loopInterval_id = setInterval(this.runLoop.bind(this),this.interval);
    },

    startGame: function() {
        this.startNewTermino();
        if (!this.gamePaused) {
            this.loopInterval_id = setInterval(this.runLoop.bind(this),this.interval);
        } else {
            this.showMessage(this.pauseMessage);
        }
    },

    runLoop: function() {
        if (this.gameOver) {
            clearInterval(this.loopInterval_id);
            this.tetrisoGame.gameOver();
            return;
        }
        this.moveTerminoDown();
    },

    startNewTermino: function(termino, nextTermino) {        
        this.testGameOver();        

        if (termino == null) {            
            this.termino = this.nextTermino;
        } else {
            this.termino = termino;
        }
        if (nextTermino == null) {
            this.nextTermino = new Termino();
        } else {
            this.nextTermino = nextTermino;
        }
        this.playMatrix.startTermino(this.termino);
    },

    redraw: function() {
        var matrix = this.playMatrix.getMatrixWithTermino();
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
        this.drawNextTermino();
        this.drawHoldTermino();
        this.redrawScore();
    },

    drawNextTermino: function() {
        var matrix = new Array(4);
        this.rightPane.clearCanvas();
        for (i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(4);
            for (j = 0; j < matrix[i].length; j++) {
                this.rightPane.drawRect({
                    x: j*this.blockSize, y: i*this.blockSize,
                    width: this.blockSize, height: this.blockSize,
                    strokeStyle: this.strokeStyle,
                    strokeWidth: '1px',
                    fromCenter: false,
                    fillStyle: this.fillStyle,
                });
            }
        }
        for (i = 0; i < this.nextTermino.terminoMatrix.length; i++) {
            for (j = 0; j < this.nextTermino.terminoMatrix[i].length; j++) {
                if (this.nextTermino.terminoMatrix[i][j] !== 0) {                    
                    var color = this.nextTermino.terminoMatrix[i][j] * 32 - 16;
                    this.rightPane.drawImage({
                        source: 'img/brick-color.png',
                        x: j*this.blockSize, y: i*this.blockSize,
                        sWidth: 32,
                        sHeight: 32,
                        sx: color, sy: 0,
                        fromCenter: false,
                    });
                }
            }
        }
    },

    drawHoldTermino: function() {
        var matrix = new Array(4);
        this.leftPane.clearCanvas();
        for (i = 0; i < matrix.length; i++) {
            matrix[i] = new Array(4);
            for (j = 0; j < matrix[i].length; j++) {
                this.leftPane.drawRect({
                    x: j*this.blockSize, y: i*this.blockSize,
                    width: this.blockSize, height: this.blockSize,
                    strokeStyle: this.strokeStyle,
                    strokeWidth: '1px',
                    fromCenter: false,
                    fillStyle: this.fillStyle,
                });
            }
        }        
        if (this.terminoOnHold != null) {
            for (i = 0; i < this.terminoOnHold.terminoMatrix.length; i++) {
                for (j = 0; j < this.terminoOnHold.terminoMatrix[i].length; j++) {
                    if (this.terminoOnHold.terminoMatrix[i][j] !== 0) {                    
                        var color = this.terminoOnHold.terminoMatrix[i][j] * 32 - 16;
                        this.leftPane.drawImage({
                            source: 'img/brick-color.png',
                            x: j*this.blockSize, y: i*this.blockSize,
                            sWidth: 32,
                            sHeight: 32,
                            sx: color, sy: 0,
                            fromCenter: false,
                        });
                    }
                }
            }
        }
    },

    stashTermino: function() {
        if (!this.gameOver) {
            if (!this.gamePaused) {
                if (this.canStashTermino) {
                    this.canStashTermino = false;
                    if (this.terminoOnHold == null) {
                        this.terminoOnHold = this.termino;
                        this.startNewTermino();
                    } else {
                        var terminoToStart = this.terminoOnHold;
                        this.terminoOnHold = this.termino;
                        this.startNewTermino(terminoToStart, this.nextTermino);
                    }
                    this.redraw();
                }
            }
        }
    },    

    rotateTermino: function() {
        if (this.isGameRunning()) {
            if (this.termino !== null) {
                var terminoCopy = this.termino.clone();
                terminoCopy.rotate();
                if (this.playMatrix.moveAllowed(0,0,terminoCopy)) {
                    this.termino.rotate();
                    this.redraw();
                } else {
                    this.kickTermino();
                }
            }  
        }      
    },

    kickTermino: function() {
        var numberOfKicksRight = this.canKickRight();
        var numberOfKicksLeft = this.canKickLeft();
        var numberOfKicksTop = this.canKickTop();
        if (numberOfKicksRight > 0) {
            this.kickTerminoRight(numberOfKicksRight);
        } else if (numberOfKicksLeft > 0) {
            this.kickTerminoLeft(numberOfKicksLeft);
        } else if (numberOfKicksTop > 0) {
            this.kickTerminoTop(numberOfKicksTop);
        }
    },

    canKickRight: function() {
        var terminoCopy = this.termino.clone();
        terminoCopy.rotate();
        if (this.playMatrix.moveAllowed(1,0,terminoCopy)) {
            return 1;
        }
        if (this.playMatrix.moveAllowed(2,0,terminoCopy)) {
            return 2;
        }
        return 0;
    },

    canKickLeft: function() {
        var terminoCopy = this.termino.clone();
        terminoCopy.rotate();
        if (this.playMatrix.moveAllowed(-1,0,terminoCopy)) {
            return 1;
        }
        if (this.playMatrix.moveAllowed(-2,0,terminoCopy)) {
            return 2;
        }
        return 0;
    },

    canKickTop: function() {
        var terminoCopy = this.termino.clone();
        terminoCopy.rotate();
        if (this.playMatrix.moveAllowed(0,-1,terminoCopy)) {
            return 1;
        }
        if (this.playMatrix.moveAllowed(0,-2,terminoCopy)) {
            return 2;
        }
        return 0;
    },

    kickTerminoRight: function(numberOfKicks) {
        for (var i = 0; i < numberOfKicks; i++) {
            this.termino.moveRight();
        }
        this.termino.rotate();
        this.redraw();
    },

    kickTerminoLeft: function(numberOfKicks) {
        for (var i = 0; i < numberOfKicks; i++) {
            this.termino.moveLeft();
        }        
        this.termino.rotate();
        this.redraw();
    },

    kickTerminoTop: function(numberOfKicks) {
        for (var i = 0; i < numberOfKicks; i++) {
            this.termino.moveUp();
        }
        this.termino.rotate();
        this.redraw();
    },

    moveTerminoLeft: function() {
        if (this.isGameRunning()) {
            if (this.termino !== null) {
                if (this.playMatrix.moveAllowed(-1,0,this.termino)) {
                    this.termino.moveLeft();
                }
            }
            this.redraw();
        }
    },

    moveTerminoRight: function() {
        if (this.isGameRunning()) {
            if (this.termino !== null) {
                if (this.playMatrix.moveAllowed(1,0,this.termino)) {
                    this.termino.moveRight();
                }
            }
            this.redraw();
        }
    },

    moveTerminoDown: function() {
        if (this.isGameRunning()) {
            if (this.termino !== null) {
                if (this.playMatrix.moveAllowed(0,1,this.termino)) {
                    this.termino.moveDown();
                    this.score += 4;
                } else {
                    var _this = this;
                    var terminoToSeal = this.termino;
                    this.termino = null;
                    setTimeout(function() {
                        _this.sealTermino(terminoToSeal);
                        _this.startNewTermino();                   
                    },100);
                }
                this.redraw();
            }
        }
    },

    sealTermino: function(termino) {
            this.playMatrix.sealTermino(termino);
            this.checkLineComplete(termino);
            this.canStashTermino = true;
    },

    testGameOver: function() {
        var matrix = this.playMatrix.getMatrix();
        var gameOver = false;
        for (var i = 0; i < this.hideY; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] !== 0) {
                    this.gameOver = true;
                }
            };
        };
    },

    checkLineComplete: function(termino) {
        var matrix = this.playMatrix.getMatrix();
        var height = termino.y + termino.height;
        if (height > matrix.length) {
            height = matrix.length;
        }
        var lines = 0;
        for (var i = termino.y; i < height; i++) {
            isLineComplete = 1;
            for (var j = 0; j < matrix[i].length; j++) {                                
                if (matrix[i][j] == 0) {
                    isLineComplete *= 0;
                }
            }
            if (isLineComplete == 1) {
                this.lineCounter++;                
                lines++;
                for (var j = 0; j < matrix[i].length; j++) {
                    matrix[i][j] = 0;
                }
                for (var k = 0; k < i; k++) {
                    var line = matrix[i-k-1].slice(0);
                    matrix[i-k] = line;
                }
            }
        }
        var message = $('<div></div>');
        message.attr('id', 'message');
        switch (lines) {
            case 1:
                this.score += (this.level*40);
                message.html('! GOOD !');
                setTimeout(this.showMessage.bind(this,message), 1000);
                setTimeout(this.hideMessage.bind(this, message), 2000);
                break;
            case 2:
                this.score += (this.level*100);
                message.html('!! GREAT !!');
                setTimeout(this.showMessage.bind(this,message), 1000);
                setTimeout(this.hideMessage.bind(this, message), 2000);
                break;
            case 3:
                this.score += (this.level*300);
                message.html('!!! AWESOME !!!');
                setTimeout(this.showMessage.bind(this,message), 1000);
                setTimeout(this.hideMessage.bind(this, message), 2000);
                break;
            case 4:
                this.score += (this.level*1200);
                message.html('!!!! SPECTACULAR !!!!');
                setTimeout(this.showMessage.bind(this,message), 1000);
                setTimeout(this.hideMessage.bind(this, message), 2000);
                break;    
        }
        if (lines > 0) {
            this.sounds['success'].play();
        }
    },

    showMessage: function(div) {        
        this.messageCenter.append(div);
    },

    hideMessage: function(div) {
        div.remove();
    },

    redrawScore: function() {
        var linesElement = $('aside#lines-number');        
        linesElement.html("Lines <br/>" + this.lineCounter);

        var scoreElement = $('aside#score-number');
        scoreElement.html("Score <br />" + this.score);

        var levelElement = $('aside#level-number');
        levelElement.html("Level <br />" + this.level);

        if (this.score > this.level * 5000) {
            this.levelUp();
        }
    },

    isGameRunning: function() {
        if (this.gameOver || this.gamePaused) {
            return false;
        }
        return true;
    },

    isGameOver: function() {
        return this.gameOver;
    },

    getGameOverData: function() {
        return {'gameOver': this.gameOver, 'score': this.score, 'lines': this.lineCounter, 'level': this.level };
    }

};
