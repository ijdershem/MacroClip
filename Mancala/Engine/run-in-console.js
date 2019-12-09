import Mancala from "./Mancala.js"
import keypress from 'keypress';

let game = new Mancala(true);
keypress(process.stdin);
console.log(game.toString());

game.onMove(gameState => {
    //console.log(`White: ${gameState.whitePieces}  Black: ${gameState.blackPieces}`);
    console.log("Turn "+gameState.turn)
    console.log(game.toString());
    // console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

process.stdin.on('keypress', function (ch, key) {
    switch(key.name){
        case 'q':
            console.log('1');
            game.processInput(1);
            break;
        case 'w':
            console.log('2');
            game.processInput(2);
            break;
        case 'e':
            console.log('3');
            game.processInput(3);
            break;
        case 'r':
            console.log('4');
            game.processInput(4);
            break;   
        case 't':
            console.log('5');
            game.processInput(5);
            break; 
        case 'y':
            console.log('6');
            game.processInput(6);
            break;   
        case 'u':
            console.log('7');
            game.processInput(7);
            break;
        case 'i':
            console.log('8');
            game.processInput(8);
            break;
        case 'o':
            console.log('9');
            game.processInput(9);
            break;
        case 'p':
            console.log('0');
            game.processInput(0);
            break;
        case 'a':
            runGameToAllOneColor();
            break;
        case 's':
            runGameToPlayerUnableToMove();
            break;
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();