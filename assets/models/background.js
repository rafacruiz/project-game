class Background {

    constructor(ctx, x = 0, y = 0, currentLevel = 0) {
        this.ctx = ctx;
    
        this.x = x;
        this.y = y;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.currentLevel = currentLevel;
            
        this.backgrounds = BG_MAIN;

        this.sprite = null;

        this.loadNextPlatform();

        this.isCountDown = false;
        this.countdownTimer = 0;
        this.countdown = 0;

        this.isFadeTransition = false;
        this.fadeTransitionState = 'playing'; // 'playing' | 'fade'
        this.fadeTimeTransition = 0;

        this.fadeOpacity = 0;
        this.fadeAmount = 0.02;
    }

    loadNextPlatform() {
        this.sprite = new Image();
        this.sprite.src = this.backgrounds[this.currentLevel] || this.backgrounds[0];
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        };
    }

    setLevel(index) {
        this.currentLevel = index;
        this.loadNextPlatform();
    }

    countDown() {
        this.countdown = 8;

        this.countdownTimer = setInterval(() => {
            
            this.countdown--;
            
            if (this.countdown === 0) {
                clearInterval(this.countdownTimer);
                this.isCountDown = false;
            }

            console.log(this.countdown);
        }, 1000);
    }

    drawCountDown() {
        this.ctx.save();
        this.ctx.globalAlpha = 1; // revisar
        this.ctx.font = "40px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText(this.countdown, 
            this.ctx.canvas.width / 2, 
            this.ctx.canvas.height / 2);
        this.ctx.restore();
    }

    transitionFade() {
        if (this.fadeTransitionState == 'fadeOut') {
            
            this.ctx.globalAlpha = this.fadeOpacity;
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.x, this.y, this.w, this.h);

            this.fadeOpacity += this.fadeAmount;            

            console.log('fadeOut');
        } else if (this.fadeTransitionState == 'pause') {
            this.ctx.globalAlpha = 1;            
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.x, this.y, this.w, this.h);

            console.log('Total black');
        } else if (this.fadeTransitionState == 'fadeIn') {
            this.ctx.globalAlpha = this.fadeOpacity;
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(0, 0, this.w, this.h);

            this.fadeOpacity -= this.fadeAmount;
            
            console.log('fadeIn');
        }

        this.ctx.globalAlpha = 1;
    }

    draw() {

        if (this.fadeTransitionState !== 'pause') {
            if (this.sprite.isReady) {
            
                this.ctx.drawImage(
                    this.sprite,
                    this.x,
                    this.y,
                    this.w,
                    this.h
                );
            }
        }
        
        if (this.isFadeTransition) {
            this.transitionFade();
        }

        if (this.isCountDown) {
            this.drawCountDown();
        }
    }
}