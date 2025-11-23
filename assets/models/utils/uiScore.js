class Uiscore {
    constructor(ctx, x = 20, y = 6) {
        this.ctx = ctx;
        
        this.x = x;
        this.y = y;
        this.h = 16;
        this.w = 60;

        this.index = 1;
        this.indexFrameV = 2;
        this.indexFrameH = 3;
    
        this.sprite = null;

        this.spArray = UTILS_TOOLS;

        this.loadImage();
    }

    loadImage() {
        this.sprite = new Image();
        this.sprite.src = this.spArray[this.index];
        this.sprite.framesV = 2;
        this.sprite.framesH = 3;
        this.sprite.frameIndexV = 0;
        this.sprite.frameIndexH = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.Wframe = Math.floor(this.sprite.width / this.sprite.framesV); // medida un sprite
            this.sprite.Hframe = Math.floor(this.sprite.height / this.sprite.framesH);
        }
    }

    draw(bullets, weaponGun = false) {
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

            this.animateScore(bullets, weaponGun);
        }
    }

    animateScore(bullets, weaponGun) {

        if (!weaponGun) bullets = 0;

        switch (bullets) {
            case 1:
                this.sprite.frameIndexH = 2;
                this.sprite.frameIndexV = 1;
                break;
            case 2:
                this.sprite.frameIndexH = 1;
                this.sprite.frameIndexV = 1;
                break;
            case 3:
                this.sprite.frameIndexH = 0;
                this.sprite.frameIndexV = 1;
                break;
            case 4:
                this.sprite.frameIndexH = 2;
                this.sprite.frameIndexV = 0;
                break;
            case 5:
                this.sprite.frameIndexH = 1;
                this.sprite.frameIndexV = 0;
                break;
            default:
                this.sprite.frameIndexH = 0;
                this.sprite.frameIndexV = 0;
                break;
        }
    }
}