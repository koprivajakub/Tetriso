function Termino(type) {
    this.init(type);
    this.x = 0;
    this.y = 0;
}

Termino.prototype = {

    init: function(type) {
        switch (type) {
            case 'I':
                this.terminoMatrix = this.getTerminoI();
                this.type = 1;
                break;
            case 'O':
                break;
            case 'T':
                break;
            case 'S':
                break;
            case 'Z':
                break;
            case 'J':
                break;
            case 'L':
                break;
        }
    },

    getTerminoI: function() {
        var termino = new Array(new Array(0, 0, 0, 0), new Array(1, 1, 1, 1));
        return termino;
    },

    getTerminoMatrix: function() {
        return this.terminoMatrix;
    }
};
