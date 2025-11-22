class Enemy {

    constructor (ctx, vx = 5, config = {}, x = 0, y = 0) {
        this.ctx = ctx;
        this.x = config.direction ?? x;
        this.y = y;
        this.h = config.h ?? 80;
        this.w = config.w ?? 70;

        this.vx = vx;

        this.damage = 1;
        this.isUsed = false;
        this.isDead = false;
    
        this.ground = 0;

        this.sprite = this.initSprite(config);

        this.drawCount = 0;
    }

    initSprite(config) {
        const sprite = new Image();
        sprite.src = config.src;
        sprite.framesV = config.framesV; // Cantidad de sprite en la imagen
        sprite.framesH = config.framesH;
        sprite.frameIndexV = config.initV ?? 1; // indice para eligir el sprite
        sprite.frameIndexH = config.initH ?? 0;
        sprite.onload = () => {
            sprite.isReady = true;
            sprite.Wframe = Math.floor(sprite.width / sprite.framesV); // medida un sprite
            sprite.Hframe = Math.floor(sprite.height / sprite.framesH);
        }

        return sprite;
    }

    groundTo(groundY) {
        this.y = groundY - this.h;
    }

    move() {
        this.x += this.vx;
    }

    draw() {
        if (this.sprite.isReady) {

            this.ctx.drawImage(
                this.sprite,
                this.sprite.frameIndexV * this.sprite.Wframe,
                this.sprite.frameIndexH * this.sprite.Hframe,
                this.sprite.Wframe,
                this.sprite.Hframe,
                this.x,
                this.y,
                this.w,
                this.h
            );

            this.animate();
            this.drawCount++;
        }
    }

    animate() {       
        this.animateFrames(0, 0, this.sprite.framesV, 10);
    }

    animateFrames(initialHFrames, initialVFrames, frames, frequency) {
        if (this.sprite.frameIndexH !== initialHFrames) {
            this.sprite.frameIndexH = initialHFrames;
            this.sprite.frameIndexV = initialVFrames;
        } else if (this.drawCount % frequency === 0) {
            this.drawCount = 0;
            this.sprite.frameIndexV = (this.sprite.frameIndexV + 1) % frames;
        }
    }

    collidesWith(element) {
        return (
            this.x < element.x + element.w &&
            this.x + this.w > element.x &&
            this.y < element.y + element.h &&
            this.y + this.h > element.y
        );
    }
}