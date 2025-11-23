class Monkey extends Enemy {

    constructor (ctx, vx, config, x, y) {
        super(ctx, vx, config, x, y);

        this.damage = 2;

        this.isMonkey = true;
    }

    animate() {       
        this.animateFrames(0, 0, this.sprite.framesV, 8);
    }

    showRandom() {
        this.x = (Math.random() * 0.9) * this.ctx.canvas.width;
    }
}