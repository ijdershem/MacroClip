import TicTacToe from "./Engine/game.js";
import BackEnd from '../backend.js';

let game;
let gs;
let tiles;
let AI = false;
let gameStarted = false;
let database = new BackEnd();

$(document).ready( function () {

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            let id = "#"+i.toString()+j.toString();
            if (i != 2) {
                $(id).css("border-bottom", "solid");
            } 

            if (j != 2) {
                $(id).css("border-right", "solid");
            }

            $(id).css("border-color", "#adadad");
            $(id).css("border-width", "1vh");
        }
    }

    game = new TicTacToe();
    gs = game.gameState;
    tiles = gs.board;

    $('.tile').click(function() {
        if (!gameStarted) {
            console.log('new game');
            if (AI) {
                game.toggleAI('o');
            }
            gs = game.gameState;
            tiles = gs.board;
            gameStarted = true;
            $('#AI').css('pointer-events', 'none');
        }

        let id = this.id;
        let i = parseInt(id[0]);
        let j = parseInt(id[1]);

        game.processInput(j, i);
        console.log(game.toString());

        refreshBoard();

        if (gameStarted) {
            if(AI) {
                $('tile').css('pointer-events', 'none');
                setTimeout(function () {
                    console.log('made it');
                    $('.tile').css('pointer-events', 'auto');
                    game.makeAIMove();
                    refreshBoard();
                }, 1000);
            }
        }
        
    });

    $('button').click(function() {
        $('.tile').css('pointer-events','auto');
        gameStarted = false;
        $('#AI').css('pointer-events', 'auto');
        game.resetGame();
        $("h4.won").replaceWith("<h4 class='description'>X's turn!<h4>");
        refreshBoard();
    })

    $('#AI').click(function() {
        if (AI) {
            AI = false;
            $('#AI').css('color', 'grey');
        } else {
            AI = true;
            $('#AI').css('color', 'rgb(79, 192, 94)');
        }
    });

    game.onMove(function() {   
        console.log(game);
    });

    game.onOver(function() {
        console.log('game over');
        gameStarted = false;
        $('.tile').css('pointer-events','none');
        setTimeout(function () {
            if (gs.winner != 'tie') {
                $("h4.description").replaceWith("<h4 class='won'>"+gs.winner.toString()+" wins! Play again?<h4>");
                if (gs.winner == 'x') {
                    database.updateUserBalance(10);
                }

                let winningPieces = game.getWinningPieces();
                winningPieces.sort();
                for (let i=0; i<3; i++) {
                    let element = winningPieces[i];
                    let pid = 'p'+element.X.toString()+element.Y.toString();
                    let pdiv = document.getElementById(pid);
                    console.log(pid);
                    pdiv.setAttribute('class','piece winningPiece');
                }
            } else {
                $("h4.description").replaceWith("<h4 class='won'>It's a tie! Play again?<h4>");
                database.updateUserBalance(5);
            }

            if (AI) {
                game.toggleAI();
            }
            
        }, 250);
    });

    // refreshBoard();
});

function refreshBoard() {
    gs = game.gameState;
    tiles = gs.board;

    for (let i=0; i<tiles.length; i++) {
        for (let j=0; j<tiles.length; j++) {
            let did = "#"+i.toString()+j.toString();
            let pid = "p"+i.toString()+j.toString();
            $(did).empty();

            if(tiles[i][j] != null) {
                if(tiles[i][j].toString() == "x") {
                    $(did).append('<div id="'+pid+'" class="piece white"><h1>X</h1></div>');
                } else if(tiles[i][j].toString() == "o") {
                    $(did).append('<div id="'+pid+'" class="piece black"><h1>O</h1></div>');
                } else {
                    $(did).empty();
                }
            }
            
            // $('#'+pid.toString()).css('height','80%');
            // $('#'+pid.toString()).css('width','80%');
        }
    }

    // $('.piece').css('width', '80%');
    // $('.piece').css('height', '80%');

    if (gs.turn == "x") {
        $("h4.description").replaceWith("<h4 class='description'>X's turn!<h4>");
    } else {
        $("h4.description").replaceWith("<h4 class='description'>O's turn!<h4>");
    }
}