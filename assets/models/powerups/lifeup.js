class Lifeup extends Powerup {

    constructor (ctx, config, x, y) {
        super(ctx, config, x, y);

        this.life = INDI_LIFE_NEW;
    }

    animate() {       
        this.animateFrames(0, 0, this.sprite.framesV, 10);
    }

    showRandom() {
        this.x = (Math.random() * 0.9) * this.ctx.canvas.width;
    }
}