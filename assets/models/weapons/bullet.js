class Bullet {

    constructor(ctx, x, y, w = 16, h = 10, vx = 3) {
        this.ctx = ctx;
    
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.vx = vx; 

        this.sprite = new Image();
        this.sprite.src = '/assets/images/sprites/weapons/sprite-bullets.png';
        this.sprite.framesV = 3;
        this.sprite.framesH = 2;
        this.sprite.frameIndexV = 0;
        this.sprite.frameIndexH = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.Wframe = Math.floor(this.sprite.width / this.sprite.framesV);
            this.sprite.Hframe = Math.floor(this.sprite.height / this.sprite.framesH);
        }

        this.drawCount = 0;
        this.isUsed = false;
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
        if (this.drawCount % 10 === 0) {
            this.drawCount = 0;
            
            if (this.vx < 0 ) {
                this.sprite.frameIndexH = 1;
                this.sprite.frameIndexV = 1;
            }

            this.sprite.vFrameIndex = (this.sprite.vFrameIndex + 1) % this.sprite.vFrames;
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