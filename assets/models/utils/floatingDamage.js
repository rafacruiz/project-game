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
        this.ctx.font = "10px" + UI_TYPE_TEXT;
        this.ctx.fillStyle = UI_COLOR_TEXT;
        this.ctx.fillText(this.text, this.x, this.y);
        this.ctx.restore();
    }

    isDead() {
        return this.alpha <= 0;
    }
}