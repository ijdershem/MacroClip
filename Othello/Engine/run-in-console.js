import keypress from 'keypress';
import Othello from "./Othello";

keypress(process.stdin);


let game = new Othello(false);
console.log(game.toString());

game.onMove(gameState => {
    console.log(`White: ${gameState.whitePieces}  Black: ${gameState.blackPieces}`);
    console.log(game.toString());
    //setTimeout(function(){console.log(gameState.board)},1000);
    // console.log(game.gameState);
});

game.onWin(gameState => {
    console.log('You won with a gameState of...', gameState)
});


let runGameToPlayerUnableToMove = () =>{
    game.processInput(4,2);//w
    game.processInput(3,2);//b
    game.processInput(2,4);//w
    game.processInput(5,2);//b
    game.processInput(5,1);//w
    game.processInput(5,0);//b
    game.processInput(6,1);//w
    game.processInput(7,1);//b
    game.processInput(0,2);//w
    game.processInput(5,3);//b
    game.processInput(6,0);//w
    game.processInput(7,0);//b
    game.processInput(2,2);//w
    game.processInput(4,1);//b
    game.processInput(4,0);//w
    game.processInput(3,0);//b
    game.processInput(3,1);//b
    game.processInput(2,0);//w
    game.processInput(1,0);//b
    game.processInput(2,1);//b
}

let runGameToAllOneColor =()=>{
    game.processInput(4,2);
    game.processInput(3,2);
    game.processInput(2,4);
    game.processInput(3,5);
    game.processInput(2,2);
    game.processInput(1,4);
    game.processInput(0,4);
    game.processInput(1,3);
    game.processInput(3,6);
    game.processInput(5,4);
    game.processInput(6,4);
    game.processInput(3,1);
    game.processInput(4,0);
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