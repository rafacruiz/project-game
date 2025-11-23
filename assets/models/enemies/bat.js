class Bat extends Enemy {

    constructor (ctx, vx, config, x, y) {
        super(ctx, vx, config, x, y);

        this.damage = 2;
    }

    animate() {       
        this.animateFrames(0, 0, this.sprite.framesV, 6);
    }
}