class Game {

    constructor(canvaId) {
        this.canvas = document.getElementById(canvaId);
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = CANVAS_W;
        this.canvas.height = CANVAS_H;

        this.fps = FPS;

        this.drawIntervalId = undefined;
        this.enemyInterval = undefined;
        this.lifeInterval = undefined;
                    
        this.background = new Background(this.ctx);

        this.uiPlayer = new Ui(this.ctx);
        this.uiScore = new Uiscore(this.ctx, 410);

        this.indianaJones = new Indianajones(this.ctx, 0, 0);
        this.indianaJones.groundTo(this.canvas.height - GROUND_Y);

        this.levelStartTime = Date.now();

        this.transitionNextLevel = null;
        this.transitionStart = 0;
                        
        this.enemies = [];

        this.powers = [];

        this.floatingTexts = [];

        this.currentLoadedLevel = undefined;

        this.setupListeners();
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
            }, this.fps);
        }
    }

    stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;

        clearInterval(this.enemyInterval);
        this.enemyInterval = undefined;

        clearInterval(this.lifeInterval);
        this.lifeInterval = undefined;
    }

    showEnemiesSteal() {
        const spawnTime1 = Math.random() * LEVEL_DURATION;

        setTimeout(() => {
            const monkey = new Monkey(this.ctx, -1, SP_ENEMIES_RANDOM[0]);
            monkey.showRandom();
            monkey.groundTo(this.canvas.height - GROUND_Y);
            this.enemies.push(monkey);
        }, spawnTime1);
    }

    showPowersUpGun() {
        const indiGun = new Gun(this.ctx, SP_POWERS_RANDOM[0]);

        indiGun.groundTo(this.canvas.height - GROUND_Y);
        indiGun.rangeTo(this.canvas.width);
        
        this.powers.push(indiGun);
    }

    showPowerUpLife() {
        const indiLife = new Lifeup(this.ctx, SP_POWERS_RANDOM[1]);

        indiLife.groundTo(this.canvas.height - GROUND_Y);
        indiLife.rangeTo(this.canvas.width);

        this.powers.push(indiLife);
    }

    spawnFireGround() {
        const config = SP_ENEMIES_LEVEL3[1];

        const fire = new fireGround(this.ctx, config, 10000);
        
        fire.groundTo(this.canvas.height - GROUND_Y);
        
        this.enemies.push(fire);
    }

    showEnemiesRandom() {

        if (this.enemyInterval) clearInterval(this.enemyInterval);

        if (this.lifeInterval) clearInterval(this.lifeInterval);
    
        //if (this.background.isFadeTransition) return; REVISAR

        console.info('Enemies Level: ', this.background.currentLevel + 1);

        switch (this.background.currentLevel + 1) {
            case 1:
                this.enemyInterval = setInterval(() => {            
                    const directionEnemyRandom = SP_ENEMIES_LEVEL1[Math.floor(Math.random() 
                                                * SP_ENEMIES_LEVEL1.length)];
                    
                    const speedEnemy = (Math.random() > 0.2 && 
                                        directionEnemyRandom.direction > 0) 
                                        ? -(3 + Math.random() * 3) : (3 + Math.random() * 3);

                    const enemy = new Ninja(this.ctx, speedEnemy, directionEnemyRandom);
                    enemy.groundTo(this.canvas.height - GROUND_Y);

                    this.enemies.push(enemy);
                    
                }, SP_ENEMY_SPAWN_INTERVAL_LEVEL1);
                
                this.showPowersUpGun();
                
                this.lifeInterval = setInterval(() => {
                    this.showPowerUpLife();

                    this.showEnemiesSteal();

                    this.spawnFireGround();
                }, SP_POWER_UP_LEVEL1);
                break;
            case 2:
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
                                            - (8 + Math.random() * 70);
                                               
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
                }, SP_ENEMY_SPAWN_INTERVAL_LEVEL2);

                this.showPowerUpLife();

                this.showEnemiesSteal();
                break;
            case 3:
                this.enemyInterval = setInterval(() => {

                    const speedEnemy =  -(3 + Math.random() * 2);
                    
                    const enemy = new Skeleton(this.ctx, speedEnemy, SP_ENEMIES_LEVEL3[0]);
                    enemy.groundTo(this.canvas.height - GROUND_Y);

                    this.enemies.push(enemy);
                }, SP_ENEMY_SPAWN_INTERVAL_LEVEL3);

                this.lifeInterval = setInterval(() => {
                    this.showPowersUpGun();

                    this.showPowerUpLife();

                    this.showEnemiesSteal();

                    this.spawnFireGround();
                }, SP_POWER_UP_LEVEL3);
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

        for (const power of this.powers) {
            if (this.indianaJones.collidesWith(power) && 
                !power.isUsed) {

                power.isUsed = true;

                if (power instanceof Lifeup) {
                    this.indianaJones.indiLife = Math.min(
                        100,
                        this.indianaJones.indiLife + (power.life || 0)
                    );
                } else if (power instanceof Gun) {
                    this.indianaJones.indiWeaponGun = true;
                    this.indianaJones.indiBullets = power.bullets;
                }
            }
        }

        for(const enemy of this.enemies) {
            if (this.indianaJones.collidesWith(enemy) && 
                !this.background.isFadeTransition && 
                !enemy.isUsed) {
                
                if (enemy instanceof fireGround) {
                    if (!this.indianaJones.slowed && enemy.shouldSlowPlayer) {
                        this.indianaJones.slowed = true;

                        this.indianaJones.speedMultiplier = 0.4;

                        setTimeout(() => {
                            this.indianaJones.speedMultiplier = 1;
                            this.indianaJones.slowed = false;
                        }, 1500);
                    }

                    this.floatingTexts.push(
                        new FloatingDamage(
                            this.ctx, 
                            "🔥", 
                            this.indianaJones.x, 
                            this.indianaJones.y, 
                            5)
                    );

                    continue;
                }

                if (enemy instanceof Monkey) this.indianaJones.indiWeaponGun = false;

                this.indianaJones.indiLife -= enemy.damage;

                if (this.indianaJones.indiLife < 0) this.indianaJones.indiLife = 0;

                enemy.isUsed = true;

                this.floatingTexts.push(new FloatingDamage(this.ctx, "-" + enemy.damage, 
                                        this.indianaJones.x, 
                                        this.indianaJones.y,
                                        enemy.damage));

                console.log('Health player: ', this.indianaJones.indiLife);
            }
        }
    }

    gameWin() {
        if (this.indianaJones.indiLife > 0 
            && this.background.currentLevel > BG_MAIN.length - 1) {
            console.log('YOUR WIN!!');

            this.enemies = [];
            this.powers = [];

            this.stop();

            this.uiPlayer.activateYouWin();
        }
    }

    gameOver() {
        if (this.indianaJones.indiLife <= 0) {
            if (this.indianaJones.indiGameOver) {
                console.log('GAME OVER!!');
                
                this.enemies = [];
                this.powers = [];

                this.stop();

                this.uiPlayer.activateGameOver();
            }
        }
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.enemies = this.enemies.filter(enemy => {
            return !enemy.isDead && 
            ((enemy.vx < 0 && enemy.x + enemy.w > 0) ||
            (enemy.vx > 0 && enemy.x < this.canvas.width) ||
            enemy.vx === 0);
        });

        this.floatingTexts = this.floatingTexts.filter(text => {
            text.update();
            return !text.isDead();
        });

        this.powers = this.powers.filter(power => {
            return !power.isUsed;
        });

        this.indianaJones.clear();
    }

    move() {
        this.enemies.forEach((enemy) => {
            enemy.move();
            if (enemy.update) enemy.update();
        });

        this.powers.forEach(power => power.update());
        
        this.indianaJones.move();

        this.checkLimit();
    }

    draw() {
        this.background.draw();
        
        if (!this.background.isFadeTransition) {   
            this.enemies.forEach((enemy) => enemy.draw());

            this.powers.forEach((power) => power.draw());
        }

        this.floatingTexts.forEach((text) => text.draw());
                
        this.indianaJones.draw();

        if (this.background.currentLevel >= 0) {

            this.uiPlayer.drawHUD(
                    this.background.currentLevel + 1, 
                    this.levelStartTime, 
                    this.indianaJones.indiLife);
        
            this.uiScore.draw(this.indianaJones.indiBullets, this.indianaJones.indiWeaponGun);
        }

        this.uiPlayer.drawGameOver();
        this.uiPlayer.drawYouWin();
    }
}