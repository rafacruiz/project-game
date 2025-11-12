class Mario {

    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.h = 50;
        this.w = 50;

        this.vx = 0;
        this.vy = 0;
        this.ay = 0;

        this.ground = 0;

        this.sprite = new Image();
        this.sprite.src = SP_MARIO;
        this.sprite.framesV = 2; // Cantidad de sprite en la imagen
        this.sprite.framesH = 2;
        this.sprite.frameIndexV = 0; // indice para eligir el sprite
        this.sprite.frameIndexH = 1;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.Wframe = Math.floor(this.sprite.width / this.sprite.framesV); // medida un sprite
            this.sprite.Hframe = Math.floor(this.sprite.height / this.sprite.framesH);
            this.w = this.sprite.Wframe;
            //this.h = this.sprite.Hframe; // Asignamos la media del sprite al objeto
        }

        this.isJumping = false;

        this.drawCount = 0;

        this.lifeMario = 100;
    }

    groundTo(groundY) {
        this.y = groundY - this.h; // Altura de en el suelo restado la altura de mario
        this.ground = this.y; // Suelo de mario
    }

    onKeypress(event) {
        const isPressButton = event.type === 'keydown';
        
        switch (event.keyCode) {
            case KEY_LEFT:
                if (isPressButton) {
                    this.vx = -MARIO_VX;
                } else {
                    this.vx = 0;
                }
                break;
            case KEY_RIGTH:
                if (isPressButton) {
                    this.vx = MARIO_VX;
                } else {
                    this.vx = 0;
                }
                break;
            case KEY_UP:
                if (!this.isJumping) {
                    this.isJumping = true;
                    this.vy = -MARIO_VY;
                    this.ay = MARIO_AY;
                }
                break;
        }
    }

    move() {
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;

        if (this.y > this.ground) {
            this.isJumping = false;
            this.vy = 0;
            this.ay = 0
            this.y = this.ground;
        }
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
            this.sprite.frameIndexH = 0;
            this.sprite.frameIndexV = 0;
        } else if (this.vx !== 0) {
            this.animateFrames(1, 0, 2, 7); // Repasar
        } else {
            this.sprite.frameIndexH = 1;
            this.sprite.frameIndexV = 0;
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