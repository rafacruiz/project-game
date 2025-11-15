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

        this.isFadeTransition = false;
        this.fadeOpacity = 1;
        this.fadeAmount = 0.01;
    }

    loadNextPlatform() {
        this.sprite = new Image();
        this.sprite.src = this.backgrounds[this.currentLevel]; //|| this.backgrounds[0];
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        };
    }

    setLevel(index) {
        this.currentLevel = index;
        this.loadNextPlatform();
    }

    draw() {
        if (this.sprite.isReady) {
        
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );
        }

        if (this.isFadeTransition) {
            this.ctx.fillStyle = "black";
            //this.ctx.globalAlpha = this.game.transition;
            this.ctx.fillRect(0, 0, this.w, this.h);
            this.ctx.globalAlpha = 1;
        }
    }
}