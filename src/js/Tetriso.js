function Tetriso(sizeY, sizeX) {
	this.init(sizeY+3, sizeX); 
    this.isMuted = false;  
    this.gamePaused = true; 
    this.infoShowed = false;
    this.controlsShowed = false;
    this.messageCenter = $('div#message-center');
    this.infoDiv = document.createElement('div');
    this.infoDiv.setAttribute('id', 'info');
    this.infoDiv.innerHTML = '<h2>Info</h2>Tetriso is JavaScript Tetris with minor game design improvements. It is developed as semestral project at CTU in Prague on course (KAJ - Client Applications in JavaScript). It\'s now in early development phase, it should be finished until July of 2014. I hope you will enjoy this little JavaScript game and if you would like to contribute, I will be more than happy to hear from you. <br /> <br /> <a href="http://github.com/koprivajakub/Tetriso">GitHub Project</a>';        
    this.controlsDiv = document.createElement('div');
    this.controlsDiv.setAttribute('id', 'info');
    this.controlsDiv.innerHTML = '<h2>Controls</h2>Control falling termino by keyboard arrows. <br /> <br /> By \'Q\' key you can put current termino on hold for later use.';
}

Tetriso.prototype = {

    init: function(sizeY, sizeX) {
        this.playfield = new Playfield(sizeY, sizeX);
        this.playfield.init();
        this.sounds = [];
        this.sounds['loop'] = new Howl({
                urls: ['./sound/loop.mp3', './sound/loop.ogg'],
                loop: true,
            });
        this.sounds['loop'].play();
        document.addEventListener('keydown', this.initKeyBindings.bind(this), false);
        this.muteLink = document.querySelector('a[href="#mute"]');
        this.muteLink.addEventListener('click', this.toggleMuteSounds.bind(this), false);
        this.playLink = document.querySelector('a[href="#play"]');
        this.playLink.addEventListener('click', this.togglePlay.bind(this), false);
        this.restartLink = document.querySelector('a[href="#restart"]');
        this.restartLink.addEventListener('click', this.restart.bind(this), false);
        this.infoLink = document.querySelector('a[href="#info"]');
        this.infoLink.addEventListener('click', this.toggleInfo.bind(this), false);
        this.controlsLink = document.querySelector('a[href="#controls"]');
        this.controlsLink.addEventListener('click', this.toggleControls.bind(this), false);
    },

    initKeyBindings: function(event) {
    		switch (event.keyCode) {
                case 81:
                    this.playfield.stashTermino();
                    event.preventDefault();
                    break;
                case 32:              
                    // this.playfield.levelUp();
                    // console.log(this.playfield.level);      
                    // console.log(this.playfield.interval);
                    event.preventDefault();
                    break;
    			case 37:
    				this.moveTermino('L');
    				event.preventDefault();
    				break;
    			case 38:
    				this.moveTermino('T');
    				event.preventDefault();
    				break;
    			case 39:
    				this.moveTermino('R');
    				event.preventDefault();
    				break;
    			case 40:
    				this.moveTermino('D');
    				event.preventDefault();
    				break;
    		}
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
    },

    togglePlay: function(event) {
        if (event.target.innerHTML == 'Play') {
            this.play();
        } else {
            this.pause();
        }
    },

    play: function() {
        if (this.infoShowed) {
            this.infoDiv.remove();
            this.infoShowed = false;
        }
        if (this.controlsShowed) {
            this.controlsDiv.remove();
            this.controlsShowed = false;
        }
        this.playfield.play();
        this.playLink.innerHTML = 'Pause';        
    },

    pause: function() {
        this.playfield.pause();
        this.playLink.innerHTML = 'Play';
    },

    restart: function(event) {
        if (this.infoShowed) {
            this.infoDiv.remove();
            this.infoShowed = false;
        }
        if (this.controlsShowed) {
            this.controlsDiv.remove();
            this.controlsShowed = false;
        }
        this.playfield.restart();
        this.playLink.innerHTML = 'Pause';
    },

    toggleMuteSounds: function(event) {
        if (this.isMuted) {
            this.isMuted = false;
            Howler.unmute();
            event.target.innerHTML = 'Mute sounds';
        } else {
            this.isMuted = true;
            Howler.mute();
            event.target.innerHTML = 'Unmute sounds';
        }        
        
    },

    toggleInfo: function() {
        if (this.controlsShowed) {
            this.controlsDiv.remove();
            this.controlsShowed = false;
        }
        if (this.infoShowed) {
            this.infoDiv.remove();
            this.infoShowed = false;
        } else {
            this.pause();            
            this.messageCenter.append(this.infoDiv);
            this.infoShowed = true;
        }
    },

    toggleControls: function() {
        if (this.infoShowed) {
            this.infoDiv.remove();
            this.infoShowed = false;
        }
        if (this.controlsShowed) {
            this.controlsDiv.remove();
            this.controlsShowed = false;
        } else {
            this.pause();            
            this.messageCenter.append(this.controlsDiv);
            this.controlsShowed = true;
        }
    },

};
