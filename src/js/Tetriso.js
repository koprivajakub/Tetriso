function Tetriso(sizeY, sizeX) {
	this.init(sizeY+5, sizeX);
}

Tetriso.prototype = {

    init: function(sizeY, sizeX) {
        this.playfield = new Playfield(sizeY, sizeX);
        this.playfield.init();
        this.initKeyBindings();
    },

    initKeyBindings: function() {   
    	var _this = this;
    	$(document).keydown(function(event) {
    		switch (event.keyCode) {    			
    			case 37:
    				_this.moveTermino('L');
    				event.preventDefault();
    				break;
    			case 38:
    				_this.moveTermino('T');
    				event.preventDefault();
    				break;
				case 39:
					_this.moveTermino('R');
					event.preventDefault();
    				break;
				case 40:
					_this.moveTermino('D');
					event.preventDefault();
    				break;
    		}    		
    	}); 
    }, 

    moveTermino: function(keypressed) {
    	switch (keypressed) {
    		case 'L':
    			this.playfield.moveTerminoLeft();
				break;
			case 'T':
				this.playfield.rotateTermino();
				break;
			case 'R':
				this.playfield.moveTerminoRight();
				break;
			case 'D':
				this.playfield.moveTerminoDown();
				break;
    	}
    }



};
