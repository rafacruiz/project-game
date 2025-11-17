class Ninja extends Enemy {

    constructor (ctx, vx, config, x, y) {
        super(ctx, vx, config, x, y);
    }

    animate() {       
        this.animateFrames(0, 0, this.sprite.framesV, 10);
    }
}