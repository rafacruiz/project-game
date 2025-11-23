class Ui {
    constructor(ctx, x = 20, y = 20) {
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;

        this.index = 0;
    
        this.sprite = null;

        this.spArray = UTILS_TOOLS;

        this.loadImage();

        this.isCountDown = false;
        this.countdownTimer = 0;
        this.countdown = 0;
    }

    loadImage() {
        this.sprite = new Image();
        this.sprite.src = this.spArray[this.index];
        this.sprite.framesV = 10;
        this.sprite.framesH = 1;
        this.sprite.frameIndexV = 0;
        this.sprite.frameIndexH = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.Wframe = Math.floor(this.sprite.width / this.sprite.framesV);
            this.sprite.Hframe = this.sprite.height;
        }
    }

    setNumber(number) {
        this.countdown = number;
    }

    update() {
        if (this.isCountDown) {
            const now = Date.now();

            if (now - this.countdownTimer > 800) {
                this.countdown--;

                this.countdownTimer = now;

                if (this.countdown < 1) {
                    this.isCountDown = false;
        
                }
            }
        }
    }

    drawCountDown() {
        if (this.sprite.isReady) {
           
            this.ctx.drawImage(
                this.sprite,
                this.countdown * this.sprite.Wframe,
                0,
                this.sprite.Wframe,
                this.sprite.Hframe,
                (this.ctx.canvas.width - this.sprite.Wframe - 30) / 2,
                (this.ctx.canvas.height - 250) / 2,
                this.sprite.Wframe + 50,
                this.sprite.Hframe + 50
            );
        }
    }

    timeGameRemain(timeGame) {
        const timeNow = Date.now();
        const timeRemaining = (LEVEL_DURATION - (timeNow - timeGame)) / 1000;

        if (timeRemaining <= 0) return 0;

        return timeRemaining;
    }

    scoreBullet() {
        this.index = 1;
        this.loadImage();
    }

    drawHUD(levelGame, timeGame, lifePlayer) {
        this.ctx.font = "12px" + UI_TYPE_TEXT;
        this.ctx.fillStyle = UI_COLOR_TEXT;
        this.ctx.fillText("Level: " + levelGame, this.x, this.y);
        this.ctx.fillText("Life: " + Math.floor(lifePlayer), this.x + 120, this.y);
        this.ctx.fillText("Time: " + this.timeGameRemain(timeGame).toFixed(2), this.x + 240, this.y);
    }
}