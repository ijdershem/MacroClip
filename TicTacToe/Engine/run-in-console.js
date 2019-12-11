import keypress from 'keypress';
import TicTacToe from "./game";

keypress(process.stdin);


let game = new TicTacToe(true,'o');
console.log(game.toString());

game.onMove(gameState => {
    //console.log(`White: ${gameState.whitePieces}  Black: ${gameState.blackPieces}`);
    console.log(game.toString());
    setTimeout(function(){game.makeAIMove()},100);
    //setTimeout(function(){console.log(gameState.board)},1000);
    // console.log(game.gameState);
});

game.onOver(gameState => {
    console.log('You won with a gameState of...', gameState)
    console.log(game.getWinningPieces());
});

let runGameToWin=function(){
    game.processInput(0,0)
    game.processInput(1,0)
    game.processInput(0,1)
    game.processInput(2,0)
    game.processInput(0,2)

}
let runGameToPlayerUnableToMove=function(){
    game.processInput(0,0)
    game.processInput(0,1)
    game.processInput(1,0)
    game.processInput(2,0)
    game.processInput(2,1)
    game.processInput(2,0)
    game.processInput(1,1)
    game.processInput(2,2)
    game.processInput(1,2)
    game.processInput(0,2)
}
let twoWinningRows=function(){
    game.processInput(0,0)
    game.processInput(0,1)
    game.processInput(2,2)
    game.processInput(1,0)
    game.processInput(0,2)
    game.processInput(1,2)
    game.processInput(2,0)
    game.processInput(2,1)
    game.processInput(1,1)
}

let firstKey = null;

process.stdin.on('keypress', function (ch, key) {
   
    if(firstKey===null){
        switch(key.name){
            case 'q':
                console.log('1');
                firstKey=1;
                break;
            case 'w':
                console.log('2');
                firstKey=2;
                break;
            case 'e':
                console.log('3');
                firstKey=3;
                break;
            case 'r':
                console.log('4');
                firstKey=4;
                break;   
            case 't':
                console.log('5');
                firstKey=5;
                break; 
            case 'y':
                console.log('6');
                firstKey=6;
                break;   
            case 'u':
                console.log('7');
                firstKey=7;
                break;
            case 'i':
                console.log('8');
                firstKey=8;
                break;
            case 'o':
                console.log('9');
                firstKey=9;
                break;
            case 'p':
                console.log('0');
                firstKey=0;
                break;
            case 'a':
                runGameToWin();
                break;
            case 's':
                runGameToPlayerUnableToMove();
                break;
            case 'd':
                twoWinningRows();
                break;
            case 'n':
                console.log('n')
                game.resetGame();
                break;
            case 'm':
                console.log('m')
                game.switchAITurn();
                game.makeAIMove();
                break;

        }
    }else{
        switch(key.name){
            case 'q':
                console.log('1');
                game.processInput(firstKey, 1);
                break;
            case 'w':
                console.log('2');
                game.processInput(firstKey, 2);
                break;
            case 'e':
                console.log('3');
                game.processInput(firstKey, 3);
                break;
            case 'r':
                console.log('4');
                game.processInput(firstKey, 4);
                break;   
            case 't':
                console.log('5');
                game.processInput(firstKey, 5);
                break; 
            case 'y':
                console.log('6');
                game.processInput(firstKey, 6);
                break;   
            case 'u':
                console.log('7');
                game.processInput(firstKey, 7);
                break;
            case 'i':
                console.log('8');
                game.processInput(firstKey, 8);
                break;
            case 'o':
                console.log('9');
                game.processInput(firstKey, 9);
                break;
            case 'p':
                console.log('0');
                game.processInput(firstKey, 0);
                break;
        }
        firstKey = null;
    }


});

process.stdin.setRawMode(true);
process.stdin.resume();