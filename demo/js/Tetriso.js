function Tetriso(sizeY, sizeX) {
	this.init(sizeY+3, sizeX); 
    this.isMuted = false;  
    this.gamePaused = true; 
    this.infoShowed = false;
    this.controlsShowed = false;
    this.scoreShowed = false;
    this.messageCenter = $('div#message-center');
    this.infoDiv = $('<div></div>');
    this.infoDiv.attr('id', 'info');
    this.infoDiv.html('<h2>Info</h2>Tetriso is JavaScript Tetris with minor game design improvements. It is developed as semestral project at CTU in Prague on course (KAJ - Client Applications in JavaScript). It\'s now in early development phase, it should be finished until July of 2014. I hope you will enjoy this little JavaScript game and if you would like to contribute, I will be more than happy to hear from you. <br /> <br /> <a href="http://github.com/koprivajakub/Tetriso">GitHub Project</a>');        
    this.controlsDiv = $('<div></div>');
    this.controlsDiv.attr('id', 'info');
    this.controlsDiv.html('<h2>Controls</h2>Control falling termino by keyboard arrows. <br /> For ROTATION use \'UP ARROW\'<br /> <br /> By \'Q\' key you can put current termino on hold for later use.');
    this.gameOverDiv = $('<div></div>');
    this.gameOverDiv.attr('id', 'gameOver');    
}

Tetriso.prototype = {

    init: function(sizeY, sizeX) {
        this.playfield = new Playfield(sizeY, sizeX, this);
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
        this.scoreLink = document.querySelector('a[href="#high-score"]');
        this.scoreLink.addEventListener('click', this.toggleScore.bind(this), false);        
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
        if (event.target.innerHTML === 'Play') {
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
        if (this.scoreShowed) {
            this.scoreDiv.remove();
            this.scoreShowed = false;
        }
        if (!this.playfield.isGameOver()) {
            this.playfield.play();        
            this.playLink.innerHTML = 'Pause';
        } else {
            this.restart();
        }    
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
        if (this.scoreShowed) {
            this.scoreDiv.remove();
            this.scoreShowed = false;
        }
        if (this.controlsShowed) {
            this.controlsDiv.remove();
            this.controlsShowed = false;
        }
        if (this.gameOverShowed) {
            this.gameOverDiv.remove();
            this.gameOverShowed = false;
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
        if (this.scoreShowed) {
            this.scoreDiv.remove();
            this.scoreShowed = false;
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
        if (this.scoreShowed) {
            this.scoreDiv.remove();
            this.scoreShowed = false;
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

    gameOver: function() {        
        var gameOverData = this.playfield.getGameOverData();
        this.gameOverDiv.html('<h2>GAME OVER</h2><p>Your score: <br />' + gameOverData.score + '</p><p>Completed lines: <br />' + gameOverData.lines + '</p><p>Highest level: <br />' + gameOverData.level + '</p><p>For new game click on restart in menu.</p> <form><input type="text" placeholder="Your name" /><button type="submit">Save HighScore</button></form>');        
        this.messageCenter.append(this.gameOverDiv);
        var form = $('#gameOver form');
        form.on('submit', {score: gameOverData.score}, this.saveHighScore);
        this.gameOverShowed = true;        
        this.playLink.innerHTML = 'Play';
    },

    toggleScore: function() {
        if (this.scoreShowed) {
            this.scoreDiv.remove();
            this.scoreShowed = false;
        } else {
            this.showHighScore();
            this.scoreShowed = true;
        }
    },

    showHighScore: function() {
        if (this.infoShowed) {
            this.infoDiv.remove();
            this.infoShowed = false;
        }        
        if (this.controlsShowed) {
            this.controlsDiv.remove();
            this.controlsShowed = false;
        }
        this.scoreDiv = $('<div></div>');
        this.scoreDiv.attr('id', 'high-score');
        this.scoreDiv.html('<h2>SCORES</h2>')
        for(var key in localStorage) {
            if (!isNaN(localStorage.getItem(key))) {
                this.scoreDiv.append(localStorage.getItem(key));
                this.scoreDiv.append('<br>');
            }
        }
        this.messageCenter.append(this.scoreDiv);
    },

    saveHighScore: function(event) {
        var form = event.target;
        var name = form[0].value;
        var time = Date.now();
        var score = event.data.score;
        localStorage.setItem(time, score);
        console.log(localStorage.length);        
        event.preventDefault();
    },

};
