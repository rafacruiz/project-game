class Background {

    constructor(ctx, x = 0, y = 0) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        //this.vx = BG_VX;

        this.currentLevel = 0;
        this.fadeAlpha = 0;
        this.fading = false;
        this.levelCompleted = false;
        this.levelStartTime = 0;

        this.backgrounds = BG_MAIN;

        this.loadImagenBackground();
    }

    loadImagenBackground() {
        this.sprite = new Image();
        this.sprite.src = this.loadSrcBackground();
        this.sprite.onload = () => {
            this.sprite.isReady = true;
        };
    }

    loadSrcBackground() {
        console.log("Cargando fondo:", this.backgrounds, "nivel:", this.currentLevel);
        return this.backgrounds[this.currentLevel];
    }

    nextLevel() {
        this.fadeAlpha = 0;
        this.levelCompleted = false;
        this.fading = false;
        this.currentLevel = (this.currentLevel + 1) % BG_MAIN.length;
        this.levelStartTime = Date.now();

        this.loadImagenBackground();
    }

    changeLevel() {
        const now = Date.now();

        if (!this.levelCompleted && now - this.levelStartTime > LEVEL_DURATION) {
            this.levelCompleted = true;
            this.fading = true;
        }

        if (this.fading) {
            this.fadeAlpha += 1 / (FADE_DURATION / 16);
            if (this.fadeAlpha >= 1) {
                this.fadeAlpha = 1;
                this.fading = false;
                this.nextLevel();
            }
        }

        this.draw();
        requestAnimationFrame(() => this.changeLevel());
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

            if (this.fading || this.fadeAlpha > 0) {
    this.ctx.fillStyle = `rgba(0, 0, 0, ${this.fadeAlpha})`;
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
        }
    }
}