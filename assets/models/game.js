class Game {

    constructor(canvaId) {
        this.canvas = document.getElementById(canvaId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.fps = FPS;

        this.drawIntervalId = undefined;
                    
        this.background = new Background(this.ctx);

        this.indianaJones = new Indianajones(this.ctx, 0, 0);
        this.indianaJones.groundTo(this.canvas.height - GROUND_Y);

        this.levelLifePlayer = 100;
        this.levelStartTime = Date.now();
        this.fadeTimeTransition = 0;
        this.state = 'playing'; // 'playing' | 'fade'
                
        this.enemies = [];

        this.setupListeners();
        this.showEnemiesRandom();
    }

    start() {
        if (!this.drawIntervalId) {
            console.log('Inicio Game'); 
            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.checkLevel();
                this.draw();
            }, this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    showEnemiesRandom() {
        setInterval(() => {            
            const directionEnemyRandom = SP_ENEMIES[Math.floor(Math.random() * SP_ENEMIES.length)];
            
            const speedEnemy = (Math.random() > 0.2 && directionEnemyRandom.direction > 0) ? -(3 + Math.random() * 3) : (3 + Math.random() * 3);

            const enemy = new Enemy(this.ctx, speedEnemy, directionEnemyRandom);
            enemy.groundTo(this.canvas.height - GROUND_Y);
            this.enemies.push(enemy);

        }, SP_ENEMY_SPAWN_INTERVAL);
    }

    checkLevel() {
        const timeNow = Date.now();

        if (this.background.isFadeTransition) {
            if (timeNow - this.fadeTimeTransition > TRANSITION_FADE_DURATION) {
                console.log('Transicion realizada y cargando level');
                this.enemies = [];
                this.levelStartTime = Date.now();
                this.background.isFadeTransition = false;
                this.indianaJones.levelEnd = false;
            }
        } else {
            if (timeNow - this.levelStartTime > LEVEL_DURATION && this.indianaJones.lifeIndi > 0) {
                this.nextLevel();
            }
        }
        
        this.gameWin();
    }

    nextLevel() {
        if (this.background.isFadeTransition) return;
        
        this.background.isFadeTransition = true;
            
        this.indianaJones.x = (this.canvas.width - this.indianaJones.w) / 2;
        this.indianaJones.levelEnd = true;

        this.fadeTimeTransition = Date.now();

        const nextBackgroundLevel = this.background.currentLevel+=1;
        this.background.setLevel(nextBackgroundLevel);

        console.log('Change Next Level: ', this.background.currentLevel);
    }

    setupListeners() {
        addEventListener('keydown', (event) => this.indianaJones.onKeypress(event));
        addEventListener('keyup', (event) => this.indianaJones.onKeypress(event));
    }

    checkColisions() {

    }

    gameWin() {
        if (this.indianaJones.lifeIndi > 0 && this.background.currentLevel > 1) {
            this.stop();
            console.log('GAME WIN!!');
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.enemies = this.enemies.filter(enemy => {
            return (enemy.vx < 0 && enemy.x + enemy.w > 0) ||
            (enemy.vx > 0 && enemy.x < this.canvas.width)
        });
    }

    move() {
        this.enemies.forEach((enemy) => enemy.move());
        this.indianaJones.move();
    }

    draw() {
        
        this.background.draw();
        
        if (this.background.isFadeTransition) {
            this.indianaJones.draw();
            return;
        } else {
            this.enemies.forEach((enemy) => enemy.draw());
        }
            
        this.indianaJones.draw();
    }
}