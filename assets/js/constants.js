
const CANVAS_W = 800;
const CANVAS_H = 600;

const GROUND_Y = 150;

const FPS = 1000 / 60;

const LEVEL_DURATION = 10000 * 6;
const TRANSITION_FADE_DURATION = 3000;
const TRANSITION_PAUSE_DURATION = 3000;

const UI_COLOR_TEXT = "#f0a100";
const UI_TYPE_TEXT = " Public Pixel";

const UI_COLOR_TEXT_LOW = "#f0a100";
const UI_COLOR_TEXT_MEDIUM = "#f04c00ff"
const UI_COLOR_TEXT_CRITICAL = "#f00000ff";
const UI_GAME_OVER = '/assets/images/utils/game-over.png';
const UI_YOU_WIN   = '/assets/images/utils/game-you-win.png';

const UTILS_TOOLS = ['/assets/images/utils/game-number.png',
                    '/assets/images/utils/game-score-bullets.png'];

const BG_MAIN = ['/assets/images/bgs/backg1.png',
                '/assets/images/bgs/backg2.png',
                '/assets/images/bgs/backg4.png'];

const SP_ENEMY_SPAWN_INTERVAL_LEVEL1 = 1500;
const SP_ENEMY_SPAWN_INTERVAL_LEVEL2 = 700;
const SP_ENEMY_SPAWN_INTERVAL_LEVEL3 = 700;

const SP_ENEMY_NINJA_RIGTH  = '/assets/images/sprites/enemies/enemy-ninja-right.png';
const SP_ENEMY_NINJA_LEFT   = '/assets/images/sprites/enemies/enemy-ninja-left.png';
const SP_ENEMY_BAT          = '/assets/images/sprites/enemies/enemy-bat.png';
const SP_ENEMY_RAT          = '/assets/images/sprites/enemies/enemy-rat.png';
const SP_ENEMY_SQUELETON    = '/assets/images/sprites/enemies/enemy-squeleton.png';
const SP_ENEMY_MONKEY       = '/assets/images/sprites/enemies/enemy-monkey.png';

const SP_ENEMIES_RANDOM = [
                {src: SP_ENEMY_MONKEY, w: 40, h: 40, framesV: 4, framesH: 1, direction: CANVAS_W + 5}];

const SP_ENEMIES_LEVEL1 = [
                { src: SP_ENEMY_NINJA_RIGTH, w: 70, h: 80, framesV: 4, framesH: 1, direction: CANVAS_W + 5 },
                { src: SP_ENEMY_NINJA_LEFT, w: 80, h: 80, framesV: 8, framesH: 1, direction: -5 }];

const SP_ENEMIES_LEVEL2 = [
                { src: SP_ENEMY_BAT, w: 30, h: 30, framesV: 3, framesH: 1, direction: CANVAS_W + 5 },
                { src: SP_ENEMY_RAT, w: 30, h: 25, framesV: 4, framesH: 1, direction: CANVAS_W + 5 }];

const SP_ENEMIES_LEVEL3 = [
                {src: SP_ENEMY_SQUELETON, w: 85, h: 110, framesV: 3, framesH: 1, direction: CANVAS_W + 5}];

// Tiempo que se muestra en pantalla                
const POWERUP_DURATION = 5000;
const POWERUP_DURATION_LIFE = 3500;
const POWERUP_DURATION_GUN  = 5000;
const POWERUP_BULLETS = 5;
const POWERUP_NEW_LIFE_PLAYER = 10;

const SP_POWERUP_GUN        = '/assets/images/sprites/powerups/power-gun.png';
const SP_POWERUP_LIFE       = '/assets/images/sprites/powerups/power-life.png';

const SP_POWERS_RANDOM = [
                {src: SP_POWERUP_GUN, w: 24, h: 24, framesV: 3, framesH: 1, direction: 0},
                {src: SP_POWERUP_LIFE, w: 20, h: 20, framesV: 7, framesH: 1, direction: 0}];

// Intervalo para nº veces que se muestra
const SP_POWER_UP_LEVEL1 = 20000;
const SP_POWER_UP_LEVEL3 = 10000;

const SP_INDI = '/assets/images/sprites/sp-indiana.png';

const INDI_LIFE = 100;

const INDI_HEIGHT = 90;
const INDI_WIDTH = 80;
const INDI_VX = 4;
const INDI_VY = 12;
const INDI_AY = 0.5;

const KEY_RIGTH = 39; 
const KEY_LEFT = 37;
const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_SHOOT = 32;