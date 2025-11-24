class fireGround extends Enemy {

    constructor(ctx, config, duration = 2000) {
        super(ctx, 0, config);

        this.duration = duration;
        this.startTime = Date.now();

        this.damage = 10;
        this.w = config.w ?? 80;
        this.h = config.h ?? 20;

        this.shouldSlowPlayer = true;
    }

    move() {}

    update() {
        if (Date.now() - this.startTime >= this.duration) {
            this.isDead = true;
        }
    }

    animate() {
        if (this.drawCount % 12 === 0) {
            this.drawCount = 0;
            
            this.sprite.frameIndexH = (this.sprite.frameIndexH + 1) % this.sprite.framesH;
        }
    }
}