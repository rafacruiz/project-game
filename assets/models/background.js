class Background {

    constructor(ctx, x = 0, y = 0, currentLevel = 0) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        //this.vx = BG_VX;
        this.currentLevel = currentLevel;
        
        this.fadeAlpha = 0;
        this.fadeDelta = 0.0001;

        this.backgrounds = BG_MAIN;

        this.loadNextPlatform();
    }

    loadNextPlatform() {
        this.sprite = new Image();
        this.sprite.src = this.loadCurrentBackground();
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        };
    }

    loadCurrentBackground() {
        console.log("Cargando fondo:", this.backgrounds, "nivel:", this.currentLevel);
        return this.backgrounds[this.currentLevel];
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
    }
}