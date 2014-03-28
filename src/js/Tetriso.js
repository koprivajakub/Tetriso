function Tetriso() {
}

Tetriso.prototype = {

    init: function() {
        this.playfield = new Playfield();
        this.playfield.init();
        this.initKeyBindings();
    },

    initKeyBindings: function() {
    	_this = this;
    	$(document).bind('keypress', function(event) {
    		switch (event.keyCode) {
    			case 37:
    				console.log('Left');
    				event.preventDefault();
    				break;
    			case 38:
    				console.log('Top');
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
