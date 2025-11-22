class Game {

    constructor(canvaId) {
        this.canvas = document.getElementById(canvaId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.fps = FPS;

        this.drawIntervalId = undefined;
                    
        this.background = new Background(this.ctx);

        this.uiPlayer = new Ui(this.ctx);

        this.indianaJones = new Indianajones(this.ctx, 0, 0);
        this.indianaJones.groundTo(this.canvas.height - GROUND_Y);

        this.levelLifePlayer = 100; // Mirar si esta en uso
        this.levelStartTime = Date.now();

        this.transitionNextLevel = null;
        this.transitionStart = 0;
                        
        this.enemies = [];

        this.floatingTexts = [];

        this.setupListeners();

        this.enemyInterval = undefined;

        this.currentLoadedLevel = undefined;

    }

    start() {
        if (!this.drawIntervalId) {
            console.log('Init Game');

            this.drawIntervalId = setInterval(() => {
                this.clear();
                this.move();
                this.checkLevel();
                this.checkColisions();
                this.draw();
                this.uiPlayer.drawHUD(this.background.currentLevel + 1, this.levelStartTime, this.indianaJones.indiLife);
            }, this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
    }

    showEnemiesRandom() {

        if (this.enemyInterval) {
            clearInterval(this.enemyInterval);
        }
        
        switch (this.background.currentLevel + 1) {
            case 1:
                

                console.info('Enemies Level 1');
                break;
            case 2:
                this.enemyInterval = setInterval(() => {            
                    const directionEnemyRandom = SP_ENEMIES_LEVEL1[Math.floor(Math.random() 
                                                * SP_ENEMIES_LEVEL1.length)];
                    
                    const speedEnemy = (Math.random() > 0.2 && 
                                        directionEnemyRandom.direction > 0) 
                                        ? -(3 + Math.random() * 3) : (3 + Math.random() * 3);

                    const enemy = new Ninja(this.ctx, speedEnemy, directionEnemyRandom);
                    enemy.groundTo(this.canvas.height - GROUND_Y);

                    this.enemies.push(enemy);

                }, SP_ENEMY_SPAWN_INTERVAL);
                
                console.info('Enemies Level 2');
                break;
            case 3:
                this.enemyInterval = setInterval(() => {
                    const indexEnemy = Math.floor(Math.random() 
                                        * SP_ENEMIES_LEVEL2.length);
                    
                    const enemyRandom = SP_ENEMIES_LEVEL2[indexEnemy];

                    const speedEnemy =  -(3 + Math.random() * 3);

                    let enemy = null;
                    let heightEnemy = null;

                    switch (indexEnemy) {
                        case 0:
                            heightEnemy = (this.canvas.height - GROUND_Y) 
                                            - (6 + Math.random() * 70);
                    
                            enemy = new Bat(this.ctx, speedEnemy, enemyRandom);
                            enemy.groundTo(heightEnemy);
                            break;
                        case 1:
                            heightEnemy = (this.canvas.height - GROUND_Y);
                    
                            enemy = new Rat(this.ctx, speedEnemy, enemyRandom);
                            enemy.groundTo(heightEnemy);
                            break;
                    }
                    
                    this.enemies.push(enemy);
                }, 700);

                console.info('Enemies Level 3');
                break;
            case 4:
                this.enemyInterval = setInterval(() => {

                    const speedEnemy =  -(3 + Math.random() * 2);
                    
                    const enemy = new Skeleton(this.ctx, speedEnemy, SP_ENEMIES_LEVEL4[0]);
                    enemy.groundTo(this.canvas.height - GROUND_Y);

                    this.enemies.push(enemy);
                }, 700);

                console.info('Enemies Level 4');
                break;
        }
    }

    checkLevel() {
        if (this.background.isFadeTransition) {

            const timeNow = Date.now();
            const elapsed = timeNow - this.transitionStart;

            if (this.background.fadeTransitionState === 'fadeOut') {
                if (elapsed >= TRANSITION_FADE_DURATION) {
                    this.background.setLevel(this.transitionNextLevel);

                    this.background.fadeTransitionState = 'pause';
                    
                    this.transitionStart = Date.now();
                }
            } else if (this.background.fadeTransitionState === 'pause') {
                if (elapsed >= TRANSITION_PAUSE_DURATION) {
                    this.background.fadeTransitionState = 'fadeIn';                  

                    this.indianaJones.x = (this.canvas.width - this.indianaJones.w) / 2;

                    this.transitionStart = Date.now();
                }
            } else if (this.background.fadeTransitionState === 'fadeIn') {
                if (elapsed >= TRANSITION_FADE_DURATION) {
                    this.enemies = [];
                
                    this.levelStartTime = Date.now();

                    this.background.isFadeTransition = false;

                    this.indianaJones.levelEnd = false;

                    this.transitionNextLevel = null;
                }
            }
            return;

        } else {
            const timeNow = Date.now();
            
            if (timeNow - this.levelStartTime > LEVEL_DURATION && this.indianaJones.indiLife > 0) {
                this.nextLevel();
            }

            if (this.background.currentLevel != this.currentLoadedLevel) {
                this.currentLoadedLevel = this.background.currentLevel;

                this.showEnemiesRandom();
            }
        }
        
        this.gameWin();
        this.gameOver();
    }

    nextLevel() {
        if (this.background.isFadeTransition) return;
               
        const nextBackgroundLevel = this.background.currentLevel+=1;
        this.transitionNextLevel = nextBackgroundLevel;
        this.transitionStart = Date.now();

        this.background.isFadeTransition = true;
        this.background.fadeTransitionState = 'fadeOut';
           
        this.indianaJones.levelEnd = true;

        console.info('Finish Level: ', this.background.currentLevel);
    }

    setupListeners() {
        addEventListener('keydown', (event) => this.indianaJones.onKeypress(event));
        addEventListener('keyup', (event) => this.indianaJones.onKeypress(event));
    }

    checkLimit() {
        if (this.indianaJones.x <= 0) {
            this.indianaJones.x = 0;
        } else if (this.indianaJones.x + this.indianaJones.w > this.canvas.width) {
            this.indianaJones.x = this.canvas.width - this.indianaJones.w;
        }
    }

    checkColisions() {

        for (const enemy of this.enemies) {
            for (const bullet of this.indianaJones.bullets) {
                if (bullet.collidesWith(enemy) && !bullet.isUsed) {
                    enemy.isDead = true;
                    bullet.isUsed = true;
                }
            }
        }

        for(const enemy of this.enemies) {
            if (this.indianaJones.collidesWith(enemy) 
                && !this.background.isFadeTransition
                && ! enemy.isUsed) {

                this.indianaJones.indiLife -= enemy.damage;

                if (this.indianaJones.indiLife < 0) this.indianaJones.indiLife = 0;

                enemy.isUsed = true;

                this.floatingTexts.push(new FloatingDamage(this.ctx, "-" + enemy.damage, 
                                        this.indianaJones.x, 
                                        this.indianaJones.y));

                console.log('Health player: ', this.indianaJones.indiLife);
            }
        }
    }

    gameWin() {
        if (this.indianaJones.indiLife > 0 && this.background.currentLevel > BG_MAIN.length - 1) {
            this.stop();
            console.log('YOUR WIN!!');
        }
    }

    gameOver() {
        if (this.indianaJones.indiLife <= 0) {
            if (this.indianaJones.indiGameOver) {
                this.stop();
                console.log('GAME OVER!!')
            }
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.enemies = this.enemies.filter(enemy => {
            return (enemy.vx < 0 && enemy.x + enemy.w > 0) ||
            (enemy.vx > 0 && enemy.x < this.canvas.width)
        });

        this.floatingTexts = this.floatingTexts.filter(text => {
            text.update();
            return !text.isDead();
        });

        this.indianaJones.clear();
    }

    move() {
        this.enemies.forEach((enemy) => enemy.move());
        this.indianaJones.move();

        this.checkLimit();
    }

    draw() {
        this.background.draw();
        
        if (!this.background.isFadeTransition) {   
            this.enemies.forEach((enemy) => enemy.draw());
        }

        this.floatingTexts.forEach((text) => text.draw());
                
        this.indianaJones.draw();
    }
}