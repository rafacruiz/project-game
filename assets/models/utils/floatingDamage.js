class FloatingDamage {
    constructor(ctx, text, x, y, amount) {
        this.ctx = ctx;
        this.text = text;
        this.x = x;
        this.y = y;

        this.alpha = 1;
        this.speed = Math.random() * 0.4 + 0.2;
        this.fadeSpeed = 0.01;

        this.levelDamage = amount;
    }

    update() {
        this.x += (Math.random() - 0.5) * 2;
        this.y -= this.speed;
        this.alpha -= this.fadeSpeed;
    }

    colorText() {
        if (this.levelDamage < 2) {
            return UI_COLOR_TEXT_LOW;
        } else if (this.levelDamage <= 5) {
            return UI_COLOR_TEXT_MEDIUM;
        } else {
            return UI_COLOR_TEXT_CRITICAL;
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.font = "10px" + UI_TYPE_TEXT;
        this.ctx.fillStyle = this.colorText();
        this.ctx.fillText(this.text, this.x, this.y);
        this.ctx.restore();
    }

    isDead() {
        return this.alpha <= 0;
    }
}