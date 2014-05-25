function Termino() {
    this.terminoTypes = {1:'I', 2:'O', 3:'T', 4:'S', 5:'Z', 6:'J', 7:'L'};
    var typeInt = Math.floor(Math.random() * 7)+1;
    var terminoType = this.terminoTypes[typeInt];
    var type = terminoType;
    this.x = 0;
    this.y = 0;    
    this.rotation = 0;
    this.height = 3;
    switch (type) {
        case 'I':
            this.height = 4;
            this.type = 1;
            break;
        case 'O':
            this.height = 4;
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

    clone: function() {
        var temp = this.constructor();

        for(var key in this)
            temp[key] = this[key];
        return temp;
    },

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
        var termino = [[0,0,0,0], [0,0,0,0], [X, X, X, X], [0, 0, 0, 0]];
        return termino;
    },

    getTerminoO: function() {
        var X = this.type;
        var termino = [[0,0,0,0], [0,0,0,0], [0, X, X, 0], [0, X, X, 0]];
        return termino;
    },

    getTerminoT: function() {
        var X = this.type;
        var termino = [[0, 0, 0], [0, X, 0], [X, X, X]];
        return termino;
    },

    getTerminoS: function() {
        var X = this.type;
        var termino = [[0, 0, 0], [0, X, X], [X, X, 0]];
        return termino;
    },

    getTerminoZ: function() {
        var X = this.type;
        var termino = [[0, 0, 0], [X, X, 0], [0, X, X]];
        return termino;
    },

    getTerminoJ: function() {
        var X = this.type;
        var termino = [[0, 0, 0], [X, X, X], [0, 0, X]];
        return termino;
    },

    getTerminoL: function() {
        var X = this.type;
        var termino = [[0, 0, 0], [X, X, X], [X, 0, 0]];
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

    moveUp: function() {
        this.y -= 1;
    },

    rotate: function() {
        switch(this.type) {
            case 1:                
                this.terminoMatrix = this.getRotationMatrixI();
                break;
            case 2:
                this.terminoMatrix = this.getRotationMatrixO();
                break;
            case 3:
                this.terminoMatrix = this.getRotationMatrixT();
                break;
            case 4:
                this.terminoMatrix = this.getRotationMatrixS();
                break;
            case 5:
                this.terminoMatrix = this.getRotationMatrixZ();
                break;
            case 6:
                this.terminoMatrix = this.getRotationMatrixJ();
                break;
            case 7:
                this.terminoMatrix = this.getRotationMatrixL();
                break;
        }
    },

    getRotationMatrixI: function() {
        var X = this.type;        
        switch (this.rotation) {            
            case 0:
                this.rotation = 1;
                return [[0, 0, X, 0], [0, 0, X, 0], [0, 0, X, 0], [0, 0, X, 0]];
            case 1:
                this.rotation = 2;
                return [[0, 0, 0, 0], [0, 0, 0, 0], [X, X, X, X], [0, 0, 0, 0]];
            case 2:
                this.rotation = 3;
                return [[0, X, 0, 0], [0, X, 0, 0], [0, X, 0, 0], [0, X, 0, 0]];
            case 3:
                this.rotation = 0;
                return [[0, 0, 0, 0], [0, 0, 0, 0], [X, X, X, X], [0, 0, 0, 0]];
        }
    },

    getRotationMatrixO: function() {
        var X = this.type;
        return [[0,0,0,0], [0,0,0,0], [0, X, X, 0], [0, X, X, 0]];
    },

    getRotationMatrixT: function() {
        var X = this.type;
        switch (this.rotation) {            
            case 0:
                this.rotation = 1;
                return [[0,X,0], [0, X, X], [0, X, 0]];
            case 1:
                this.rotation = 2;
                return [[0,0,0], [X, X, X], [0, X, 0]];
            case 2:
                this.rotation = 3;
                return [[0,X,0], [X, X, 0], [0, X, 0]];
            case 3:
                this.rotation = 0;
                return [[0,0,0], [0, X, 0], [X, X, X]];
        }        
    },

    getRotationMatrixS: function() {
        var X = this.type;
        switch (this.rotation) {            
            case 0:
                this.rotation = 1;
                return [[0, X, 0], [0, X, X], [0, 0, X]];
            case 1:
                this.rotation = 2;
                return [[0, 0, 0], [0, X, X], [X, X, 0]];
            case 2:
                this.rotation = 3;
                return [[0, X, 0], [0, X, X], [0, 0, X]];
            case 3:
                this.rotation = 0;
                return [[0, 0, 0], [0, X, X], [X, X, 0]];
        }
    },

    getRotationMatrixZ: function() {
        var X = this.type;
        switch (this.rotation) {            
            case 0:
                this.rotation = 1;
                return [[0, 0, X], [0, X, X], [0, X, 0]];
            case 1:
                this.rotation = 2;
                return [[0, 0, 0], [X, X, 0], [0, X, X]];
            case 2:
                this.rotation = 3;
                return [[0, 0, X], [0, X, X], [0, X, 0]];
            case 3:
                this.rotation = 0;
                return [[0, 0, 0], [X, X, 0], [0, X, X]];
        }
        
    },

    getRotationMatrixJ: function() {
        var X = this.type;
        switch (this.rotation) {            
            case 0:
                this.rotation = 1;
                return [[0, X, 0], [0, X, 0], [X, X, 0]];
            case 1:
                this.rotation = 2;
                return [[0, 0, 0], [X, 0, 0], [X, X, X]];
            case 2:
                this.rotation = 3;
                return [[0, X, X], [0, X, 0], [0, X, 0]];
            case 3:
                this.rotation = 0;
                return [[0, 0, 0], [X, X, X], [0, 0, X]];
        }        
    },

    getRotationMatrixL: function() {
        var X = this.type;
        switch (this.rotation) {            
            case 0:
                this.rotation = 1;
                return [[X, X, 0], [0, X, 0], [0, X, 0]];
            case 1:
                this.rotation = 2;
                return [[0, 0, 0], [0, 0, X], [X, X, X]];
            case 2:
                this.rotation = 3;
                return [[0, X, 0], [0, X, 0], [0, X, X]];
            case 3:
                this.rotation = 0;
                return [[0, 0, 0], [X, X, X], [X, 0, 0]];
        }
    },
};
