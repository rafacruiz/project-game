class FloatingDamage {
    constructor(ctx, text, x, y) {
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y;

        this.alpha = 1;
        this.speed = Math.random() * 0.4 + 0.2;
        this.fadeSpeed = 0.01;
    }

    update() {
        this.x += (Math.random() - 0.5) * 2;
        this.y -= this.speed;
        this.alpha -= this.fadeSpeed;
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.font = "20px PixelFont";
        this.ctx.fillStyle = "red";
        this.ctx.fillText(this.text, this.x, this.y);
        this.ctx.restore();
    }

    isDead() {
        return this.alpha <= 0;
    }
}