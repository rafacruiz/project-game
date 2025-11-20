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

        this.countDown = new Ui(this.ctx);
        
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

    transitionFade() {
        if (this.fadeTransitionState === 'fadeOut') {
            this.ctx.globalAlpha = this.fadeOpacity;
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.x, this.y, this.w, this.h);

            this.fadeOpacity += this.fadeAmount;

            this.countDown.setNumber(10);
            this.countDown.countdownTimer = Date.now();
            this.countDown.isCountDown = true;

            console.log('fadeOut');
        } else if (this.fadeTransitionState === 'pause') {
            this.ctx.globalAlpha = 1;            
            this.ctx.fillStyle = "black";
            this.ctx.fillRect(this.x, this.y, this.w, this.h);

            console.log('Total black');
        } else if (this.fadeTransitionState === 'fadeIn') {
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

        if (this.countDown.isCountDown) {
            this.countDown.drawCountDown();
            this.countDown.update();
        }
    }
}