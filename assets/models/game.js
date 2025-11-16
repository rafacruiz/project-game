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
        this.transitionTargetLevel = null;
        this.transitionStart = 0;
                        
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
        

        if (this.background.isFadeTransition) {

            const timeNow = Date.now();
            const elapsed = timeNow - this.transitionStart;

            if (this.background.fadeTransitionState === 'fadeOut') {
                if (elapsed >= TRANSITION_FADE_DURATION) {
                    this.background.setLevel(this.transitionTargetLevel);
                    this.background.fadeTransitionState = 'pause';
                    this.transitionStart = Date.now();
                }
            } else if (this.background.fadeTransitionState === 'pause') {
                if (elapsed >= TRANSITION_FADE_DURATION) {
                    this.background.fadeTransitionState = 'fadeIn';
                    this.transitionStart = Date.now();
                }
            } else if (this.background.fadeTransitionState === 'fadeIn') {
                if (elapsed >= TRANSITION_FADE_DURATION) {
                    this.enemies = [];
                
                    this.levelStartTime = Date.now();

                    this.background.isFadeTransition = false;

                    this.transitionTargetLevel = null;

                    this.indianaJones.x = (this.canvas.width - this.indianaJones.w) / 2;
                    this.indianaJones.levelEnd = false;
                }
            }

            return;






            // if (timeNow - this.background.fadeTimeTransition > TRANSITION_FADE_DURATION) {
            //     console.log('Transicion realizada y cargando level');
            //     this.enemies = [];
                
            //     this.levelStartTime = Date.now();

            //     this.background.isFadeTransition = false;
            //     this.background.fadeTransitionState = 'fade';

            //     const nextBackgroundLevel = this.background.currentLevel+=1;
            //     this.background.setLevel(nextBackgroundLevel);

            //     this.indianaJones.x = (this.canvas.width - this.indianaJones.w) / 2;
            //     this.indianaJones.levelEnd = false;
            // }
        } else {
            const timeNow = Date.now();

            if (timeNow - this.levelStartTime > LEVEL_DURATION && this.indianaJones.lifeIndi > 0) {
                this.nextLevel();
            }
        }
        
        this.gameWin();
    }

    nextLevel() {
        if (this.background.isFadeTransition) return;
        
        this.background.fadeOpacity = 0;
        this.background.isFadeTransition = true;
        
        const nextBackgroundLevel = this.background.currentLevel+=1;
        this.transitionTargetLevel = nextBackgroundLevel;

        this.background.fadeTransitionState = 'fadeOut';
        this.transitionStart = Date.now();

        this.indianaJones.levelEnd = true;

        console.log('Current Level: ', this.background.currentLevel);
    }

    setupListeners() {
        addEventListener('keydown', (event) => this.indianaJones.onKeypress(event));
        addEventListener('keyup', (event) => this.indianaJones.onKeypress(event));
    }

    checkColisions() {

    }

    gameWin() {
        if (this.indianaJones.lifeIndi > 0 && this.background.currentLevel > 2) {
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