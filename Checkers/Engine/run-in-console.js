import Checkers from "./Checkers.js"
import keypress from 'keypress';

let game = new Checkers(false);
keypress(process.stdin);
console.log(game.toString());

let display = function(x,y,z){
    console.log(x+" "+y+" "+z);
}

game.showMoves(moves =>{
    moves.forEach(element => {
        display(element.x,element.y,element.type);
    });
    //console.log(moves);
})

game.onMove(gameState => {
    console.log(`White: ${gameState.whitePieces}  Black: ${gameState.blackPieces}`);
    
    console.log(game.toString());
    setTimeout(function(){game.makeAIMove();},100);
    // console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});

let  runGameToAllOneColor = function(){
    game.processInput(0,5)
    game.processInput(1,4)
    game.processInput(1,2)
    game.processInput(0,3)
    game.processInput(1,4)
    game.processInput(2,3)
    game.processInput(3,2)
    game.processInput(1,4)
    game.processInput(4,5)
    game.processInput(5,4)
    game.processInput(1,4)
    game.processInput(0,5)
    game.processInput(3,6)
    game.processInput(4,5)
    game.processInput(5,2)
    game.processInput(4,1)
    game.processInput(3,2)
    game.processInput(4,7)
    game.processInput(3,6)
    game.processInput(5,2)
    game.processInput(4,3)
    game.processInput(5,2)
    game.processInput(4,1)
    game.processInput(2,5)
    game.processInput(1,4)
    game.processInput(0,3)
    game.processInput(2,5)
    game.processInput(4,7)
    game.processInput(1,6)
    game.processInput(2,5)
    game.processInput(4,3)
    game.processInput(3,4)
    game.processInput(4,5)
    game.processInput(2,3)
    game.processInput(4,1)
    game.processInput(5,0)
    game.processInput(3,2)
    game.processInput(2,5)
    game.processInput(3,4)
    game.processInput(0,1)
    game.processInput(1,2)
    game.processInput(6,5)
    game.processInput(7,4)
    game.processInput(4,7)
    game.processInput(6,5)
    game.processInput(4,3)
    game.processInput(2,5)
    game.processInput(7,6)
    game.processInput(6,5)
    game.processInput(6,1)
    game.processInput(5,2)
    game.processInput(7,4)
    game.processInput(6,3)
    game.processInput(5,2)
    game.processInput(7,2)
    game.processInput(5,4)
    game.processInput(7,6)
    game.processInput(6,7)
    game.processInput(5,6)
    game.processInput(1,2)
    game.processInput(2,3)
    game.processInput(5,6)
    game.processInput(6,5)
    game.processInput(2,3)
    game.processInput(3,4)
    game.processInput(6,5)
    game.processInput(7,4)
    game.processInput(7,4)
    game.processInput(6,3)
    game.processInput(7,6)
    game.processInput(6,7)
    game.processInput(2,7)
    game.processInput(1,6)
    game.processInput(0,5)
    game.processInput(2,7)
    game.processInput(0,7)
    game.processInput(1,6)
    game.processInput(2,5)
    game.processInput(0,7)
    game.processInput(7,4)
    game.processInput(6,3)
    game.processInput(5,2)
    game.processInput(7,4)
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
                runGameToAllOneColor();
                break;
            case 's':
                runGameToPlayerUnableToMove();
                break;
            case 'n':
                console.log('reset')
                game.resetGame()
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


