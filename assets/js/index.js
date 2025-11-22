
let game;

document.addEventListener('DOMContentLoaded', () => {

    const mainMenu = document.getElementById("mainMenu");
    const instructions = document.getElementById("instructions");
    const gameScreen = document.getElementById("gameScreen");

    function showScreen(screen) {
        mainMenu.classList.remove("active");
        instructions.classList.remove("active");
        gameScreen.classList.remove("active");

        screen.classList.add("active");
    }

    window.startGame = () => {
        showScreen(gameScreen);
        game = new Game('main-game');
        game.start();
    }

    window.showInstrucions = () => {
        showScreen(instructions);
    }

    window.showMenu = () => {
        showScreen(mainMenu);
    }
});