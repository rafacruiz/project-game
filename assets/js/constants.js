
const CANVAS_W = 800;
const CANVAS_H = 600;

const FPS = 1000 / 60;

const LEVEL_DURATION = 10000;
const TRANSITION_FADE_DURATION = 3000;
const TRANSITION_PAUSE_DURATION = 3000;

const GROUND_Y = 150;

const BG_MAIN = ['/assets/images/bgs/backg1.png',
                '/assets/images/bgs/backg3.png',
                '/assets/images/bgs/backg2.png',
                '/assets/images/bgs/backg4.png',];

const BG_VX = 5;

const SP_ENEMY_SPAWN_INTERVAL = 1500;
const SP_ENEMY_NINJA_RIGTH  = '/assets/images/sprites/enemies/enemy-ninja-right.png';
const SP_ENEMY_NINJA_LEFT   = '/assets/images/sprites/enemies/enemy-ninja-left.png';
const SP_ENEMY_BAT          = '/assets/images/sprites/enemies/enemy-bat.png';
const SP_ENEMY_RAT          = '/assets/images/sprites/enemies/enemy-rat.png';

const SP_ENEMIES_LEVEL1 = [
                { src: SP_ENEMY_NINJA_RIGTH, w: 70, h: 80, framesV: 4, framesH: 1, direction: CANVAS_W + 5 },
                { src: SP_ENEMY_NINJA_LEFT, w: 70, h: 80, framesV: 9, framesH: 1, direction: -5 }];

const SP_ENEMIES_LEVEL2 = [
                { src: SP_ENEMY_BAT, w: 30, h: 30, framesV: 3, framesH: 1, direction: CANVAS_W + 5 },
                { src: SP_ENEMY_RAT, w: 30, h: 25, framesV: 4, framesH: 1, direction: CANVAS_W + 5 }];

const SP_INDI = '/assets/images/sprites/indi_FIN.png';

const INDI_VX = 4;
const INDI_VY = 10;
const INDI_AY = 0.5;

const KEY_RIGTH = 39; 
const KEY_LEFT = 37;
const KEY_UP = 38;