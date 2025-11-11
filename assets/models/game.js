class Game {

    constructor(canvaId) {
        this.canvas = document.getElementById(canvaId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.fps = FPS;
        this.drawIntervalId = undefined;

        this.background = new Background(this.ctx);
        this.background.levelStartTime = Date.now();
    }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.draw();
                this.checkColisions();
            }, this.fps);
        }
    }

    checkColisions() {

    }

    clear() {

    }

    move() {

    }

    draw() {
        this.background.changeLevel();
    }
}