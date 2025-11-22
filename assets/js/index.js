
const mainMenu = document.getElementById("mainMenu");
const instructions = document.getElementById("instructions");
const gameScreen = document.getElementById("gameScreen");

let game;

function showScreen(screen) {
    mainMenu.classList.remove("active");
    instructions.classList.remove("active");
    gameScreen.classList.remove("active");

    screen.classList.add("active");
}

document.addEventListener('DOMContentLoaded', () => {
    game = new Game('main-game');
});

function startGame() {
    if (game) {
        showScreen(gameScreen);
        game.start();
    }
}

function showInstrucions() {
    showScreen(instructions);
}

function showMenu() {
    showScreen(mainMenu);
}