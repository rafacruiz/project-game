class Character {

    constructor (ctx, x, y, h, w, src, framesV, framesH, initFrameV, initFrameH) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.h = h;
        this.w = w;

        this.vx = 0;
        this.vy = 0;
        this.ay = 0;

        this.ground = 0;

        this.sprite = new Image();
        this.sprite.src = src;
        this.sprite.framesV = framesV;
        this.sprite.framesH = framesH;
        this.sprite.frameIndexV = initFrameV;
        this.sprite.frameIndexH = initFrameH;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.Wframe = Math.floor(this.sprite.width / this.sprite.framesV);
            this.sprite.Hframe = Math.floor(this.sprite.height / this.sprite.framesH);
        }

        this.isJumping = false;

        this.drawCount = 0;
    }

    groundTo(groundY) {
        this.y = groundY - this.h;
    }

    move() {
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;
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
        if (this.isJumping) {
            this.sprite.frameIndexH = 1;
            this.sprite.frameIndexV = 2;
        } else if (this.vx !== 0) {
            this.animateFrames(1, 2, 3, 5); // Repasar
        } else {
            this.sprite.frameIndexH = 1;
            this.sprite.frameIndexV = 1;
        }
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