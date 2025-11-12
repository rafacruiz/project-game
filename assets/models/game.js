class Game {

    constructor(canvaId) {
        this.canvas = document.getElementById(canvaId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.fps = FPS;
        this.drawIntervalId = undefined;

        this.levelCompleted = false;
        this.levelStartTime = Date.now();
        this.levelLifePlayer = 100;

        this.background = new Background(this.ctx);

        this.fading = false;
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkColisions();
                //this.checkLevel();
            }, this.fps);
        }
    }

    checkLevel() {
        const now = Date.now();
        console.log('Dentro check', this.levelCompleted, 'time: ',  now - this.levelStartTime );
        if (!this.levelCompleted && now - this.levelStartTime > LEVEL_DURATION) {
            this.levelCompleted = true;
            this.fading = true;
            this.nextLevel();
        }

        this.background.draw();
        requestAnimationFrame(() => this.checkLevel());
    }

    nextLevel() {
        console.log('NEXT LEVEL');
        this.fadeAlpha = 0;
        this.levelCompleted = false;
        this.fading = false;
        this.background.currentLevel = (this.background.currentLevel + 1) % BG_MAIN.length;
        this.levelStartTime = Date.now();
        this.background.loadNextPlatform(this.background.currentLevel);
    }

    checkColisions() {

    }

    clear() {

    }

    move() {

    }

    draw() {
        this.background.draw();
    }
}