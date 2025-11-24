class Lifeup extends Powerup {

    constructor (ctx, config, x, y) {
        super(ctx, config, x, y);

        this.life = POWERUP_NEW_LIFE_PLAYER;

        this.duration = POWERUP_DURATION_LIFE;
    }

    animate() {       
        this.animateFrames(0, 0, this.sprite.framesV, 10);
    }

    showRandom() {
        this.x = (Math.random() * 0.9) * this.ctx.canvas.width;
    }
}