function Termino(type) {    
    this.x = 0;
    this.y = 0;
    switch (type) {
        case 'I':
            this.type = 1;
            break;
        case 'O':
            this.type = 2;
            break;
        case 'T':
            this.type = 3;
            break;
        case 'S':
            this.type = 4;
            break;
        case 'Z':
            this.type = 5;
            break;
        case 'J':
            this.type = 6;
            break;
        case 'L':
            this.type = 7;
            break;
    }
    this.init(type);
}

Termino.prototype = { 
    init: function(type) {
        switch (type) {
            case 'I':
                this.terminoMatrix = this.getTerminoI();
                this.type = 1;
                break;
            case 'O':
                this.terminoMatrix = this.getTerminoO();
                this.type = 2;
                break;
            case 'T':
                this.terminoMatrix = this.getTerminoT();
                this.type = 3;
                break;
            case 'S':
                this.terminoMatrix = this.getTerminoS();
                this.type = 4;
                break;
            case 'Z':
                this.terminoMatrix = this.getTerminoZ();
                this.type = 5;
                break;
            case 'J':
                this.terminoMatrix = this.getTerminoJ();
                this.type = 6;
                break;
            case 'L':
                this.terminoMatrix = this.getTerminoL();
                this.type = 7;
                break;
        }
    },

    getTerminoI: function() {
        var X = this.type;
        var termino = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0, 0, 0, 0), new Array(X, X, X, X));
        return termino;
    },

    getTerminoO: function() {
        var X = this.type;
        var termino = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0, X, X, 0), new Array(0, X, X, 0));
        return termino;
    },

    getTerminoT: function() {
        var X = this.type;
        var termino = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0, X, 0, 0), new Array(X, X, X, 0));
        return termino;
    },

    getTerminoS: function() {
        var X = this.type;
        var termino = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0, X, X, 0), new Array(X, X, 0, 0));
        return termino;
    },

    getTerminoZ: function() {
        var X = this.type;
        var termino = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(X, X, 0, 0), new Array(0, X, X, 0));
        return termino;
    },

    getTerminoJ: function() {
        var X = this.type;
        var termino = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(X, 0, 0, 0), new Array(X, X, X, 0));
        return termino;
    },

    getTerminoL: function() {
        var X = this.type;
        var termino = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0, 0, X, 0), new Array(X, X, X, 0));
        return termino;
    },

    getTerminoMatrix: function() {
        return this.terminoMatrix;
    },

    moveLeft: function() {
        this.x -= 1;
    },

    moveRight: function() {
        this.x += 1;
    },

    moveDown: function() {
        this.y += 1;
    },

    rotate: function() {
        
    }
};
