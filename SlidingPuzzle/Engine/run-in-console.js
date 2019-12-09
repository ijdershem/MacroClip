import keypress from 'keypress';
import SliderGame from "./SliderPuzzle";

keypress(process.stdin);

let game = new SliderGame(5)

    console.log(game.toString());

game.onMove(gameState => {
    console.log(game.toString());
    //console.log(gameState.numMoves)
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

process.stdin.on('keypress', function (ch, key) {
    console.log(key.name)
    switch (key.name) {
        case 'right':
            game.processInput('right');
            break;
        case 'left':
            game.processInput('left');
            break;
        case 'down':
            game.processInput('down');
            break;
        case 'up':
            game.processInput('up');
            break;
        case 'i':
            game.InverseControl();
            break;
        case 'w':
            console.log(game.getGameState().win)
    }

    if (key && key.ctrl && key.name == 'c') {
        process.stdin.pause();
    }
});
process.stdin.setRawMode(true);
process.stdin.resume();