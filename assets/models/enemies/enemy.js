class Enemy {

    constructor (ctx, vx = 5, config = {}, x = 0, y = 0) {
        this.ctx = ctx;
        this.x = config.direction ?? x;
        this.y = y;
        this.h = config.h ?? 80;
        this.w = config.w ?? 70;

        this.vx = vx;
    
        this.ground = 0;

        this.sprite = new Image();
        this.sprite.src = config.src ?? SP_ENEMY;
        this.sprite.framesV = config.framesV; // Cantidad de sprite en la imagen
        this.sprite.framesH = config.framesH;
        this.sprite.frameIndexV = config.initV ?? 1; // indice para eligir el sprite
        this.sprite.frameIndexH = config.initH ?? 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.Wframe = Math.floor(this.sprite.width / this.sprite.framesV); // medida un sprite
            this.sprite.Hframe = Math.floor(this.sprite.height / this.sprite.framesH);
        }

        this.drawCount = 0;
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