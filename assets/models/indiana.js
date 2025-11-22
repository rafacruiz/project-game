class Indianajones {

    constructor (ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.h = INDI_HEIGHT;
        this.w = INDI_WIDTH;

        this.vx = 0;
        this.vy = 0;
        this.ay = 0;

        this.ground = 0;

        this.sprite = new Image();
        this.sprite.src = SP_INDI;
        this.sprite.framesV = 9; // Cantidad de sprite en la imagen
        this.sprite.framesH = 9;
        this.sprite.frameIndexV = 0; // indice para eligir el sprite
        this.sprite.frameIndexH = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.Wframe = Math.floor(this.sprite.width / this.sprite.framesV); // medida un sprite
            this.sprite.Hframe = Math.floor(this.sprite.height / this.sprite.framesH);
        }

        this.indiIsJumping = false;
        this.indiIsDown = false;
        this.indiIsShoot = false;
        this.indiDirection = 'right';
        this.indiLife = 100;
        this.indiGameOver = false;

        this.levelEnd = false;

        this.drawCount = 0;

        this.bullets = [];
    }

    groundTo(groundY) {
        this.y = groundY - this.h; // Altura de en el suelo restado la altura
        this.ground = this.y; // Suelo al saltar
    }

    onKeypress(event) {
        const isPressButton = event.type === 'keydown';
        this.levelEnd = false;
        
        switch (event.keyCode) {
            case KEY_LEFT:
                if (isPressButton) {
                        this.vx = -INDI_VX;
                        this.indiDirection = 'left';
                } else {
                    this.vx = 0;
                }
                break;
            case KEY_RIGTH:
                if (isPressButton) {
                        this.vx = INDI_VX;
                        this.indiDirection = 'right';
                } else {
                    this.vx = 0;
                }
                break;
            case KEY_UP:
                if (isPressButton) {
                    if (!this.indiIsJumping && !this.indiIsDown) {
                        this.indiIsJumping = true;

                        this.vy = -INDI_VY;
                        this.ay = INDI_AY;
                    }
                }
                break;
            case KEY_DOWN:
                if (isPressButton) {
                    if (!this.indiIsDown && !this.indiIsJumping) {
                        this.indiIsDown = true;

                        const toCrouch = INDI_HEIGHT * 0.60;

                        this.y += this.h - toCrouch;
                        this.h = toCrouch;

                        this.ground = this.y;
                    }
                } else {
                    if (this.indiIsDown && !this.indiIsJumping) {
                        this.indiIsDown = false;

                        this.y -= INDI_HEIGHT - this.h;
                        this.h = INDI_HEIGHT;

                        this.ground = this.y;
                    }
                }
                break;
            case KEY_SHOOT:
                if (isPressButton) {
                    if (!this.indiIsShoot && !this.indiIsJumping && !this.indiIsDown) {
                        this.indiIsShoot = true;

                        let bulletX = 0;
                        let bulletVx = 0;

                        if (this.indiDirection === 'right') {
                            bulletX = this.x + this.w + 3;
                            bulletVx = 3;
                        } else {
                            bulletX = this.x - 10;
                            bulletVx = -3;
                        }

                        this.bullets.push(
                            new Bullet(this.ctx, bulletX, this.y + this.h / 3, 16, 10, bulletVx)
                        );
                    }
                } else {
                    this.indiIsShoot = false;
                }
                break;
        }
    }

    move() {
        this.vy += this.ay;

        this.x += this.vx;
        this.y += this.vy;

        if (this.y > this.ground) {
            this.indiIsJumping = false;
            this.vy = 0;
            this.ay = 0
            this.y = this.ground;
        }

        this.bullets.forEach((bullet) => bullet.move());
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

            this.bullets.forEach((bullet) => bullet.draw());
        }
    }

    animate() {
        if (this.indiIsJumping) {
            //this.sprite.frameIndexH = 8;
            //this.sprite.frameIndexV = 0;
            this.animateFrames(5, 1, 2, 18);
        } else if (this.indiIsDown) {
            this.sprite.frameIndexH = 5;
            this.sprite.frameIndexV = 0;
        } else if (this.vx !== 0) {
            if (this.indiDirection === 'right') this.animateFrames(3, 0, 9, 5)
            else this.animateFrames(4, 0, 9, 5);
        } else if (this.levelEnd) {
            this.animateFrames(1, 0, 5, 17);
        } else if (this.indiIsShoot) {
            if (this.indiDirection === 'right') {
                this.sprite.frameIndexH = 6;
                this.sprite.frameIndexV = 3;
            } else {
                this.sprite.frameIndexH = 7;
                this.sprite.frameIndexV = 0;
            }
                //this.animateFrames(6, 0, 4, 5)
                //this.animateFrames(7, 0, 4, 5);
        } else if (this.indiLife <= 0) {
            this.animateFrames(8, 0, 5, 12);
            this.indiGameOver = true;
        } else {
            //this.sprite.frameIndexH = 0;
            //this.sprite.frameIndexV = 0;
            this.animateFrames(0, 0, 3, 45);
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

    clear() {
        this.bullets = this.bullets.filter(bullet => {
            return !bullet.isUsed &&
                bullet.x >= 0 &&
                bullet.x + bullet.w < this.ctx.canvas.width
        });
    }
}