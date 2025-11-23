class Gun extends Powerup {

    constructor (ctx, config, x, y) {
        super(ctx, config, x, y);

        this.bullets = INDI_BULLETS;
    }

    animate() {       
        this.animateFrames(0, 0, this.sprite.framesV, 20);
    }

    showRandom() {
        this.x = (Math.random() * 0.9) * this.ctx.canvas.width;
    }
}