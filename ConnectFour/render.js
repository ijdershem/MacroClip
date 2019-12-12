import ConnectFour from "./Engine/ConnectFour.js";
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
        }
    }

    game = new ConnectFour(false);
    gs = game.gameState;
    tiles = gs.board;

    $('.tile').click(function() {
        let id = this.id;
        let i = parseInt(id[0]);
        let j = parseInt(id[1]);

        if (!gameStarted) {
            gameStarted = true;
            $('#AI').css('pointer-events','none');
        }

        game.processInput(j);
        console.log(game.toString());

        refreshBoard();

        if (gameStarted) {
            if (AI) {
                $('.tile').css('pointer-events','none');
                
                setTimeout(function() {
                    $('.tile').css('pointer-events','auto');
                    game.makeAIMove();
                    refreshBoard();
                }, 1000);
            }
        }
    });

    $('#AI').click(function() {
        if (AI) {
            AI = false;
            $('#AI').css('color', '#a7a041');
        } else {
            AI = true;
            $('#AI').css('color', 'rgb(79, 192, 94)');
        }

        game.toggleAI();
    });

    $('button').click(function() {
        $('.tile').css('pointer-events', 'auto');
        $('#AI').css('pointer-events', 'auto');
        gameStarted = false;
        $("h4.won").replaceWith("<h4 class='description'>Yellow's turn!<h4>");
        game.resetGame();
        gs = game.gameState;
        tiles = gs.board;
        refreshBoard();
    })

    game.onWin(function() {
        gameStarted = false;
        if (gs.winner == 'black') {
            $("h4.description").replaceWith("<h4 class='won'>Yellow wins! Play again?<h4>");
            database.updateUserBalance(47-gs.redTiles+gs.blackTiles);
        } else {
            $("h4.description").replaceWith("<h4 class='won'>Red wins! Play again?<h4>");
            database.updateUserBalance(10);
        }
        $('.tile').css('pointer-events', 'none');
        setTimeout(function () {
            let winningPieces = game.getWinningPieces();
            for (let i=0; i<4; i++) {
                let element = winningPieces[i];
                let by = 5-element.Y;
                let pid = 'p'+by.toString()+element.X.toString();
                let pdiv = document.getElementById(pid);
                console.log(pid);
                pdiv.setAttribute('class','piece winningPiece');
            }
        }, 900)
    });

    refreshBoard();
});

function refreshBoard() {
    gs = game.gameState;
    tiles = gs.board;

    for (let i=0; i<tiles.length; i++) {
        for (let j=0; j<tiles.length; j++) {
            let bi = 5-i
            let did = "#"+bi.toString()+j.toString();
            let pid = "p"+bi.toString()+j.toString();
            $(did).empty();

            if(tiles[j][i] != null) {
                if(tiles[j][i].toString() == "red") {
                    $(did).append('<div id="'+pid+'" class="piece white"></div>');
                } else if(tiles[j][i].toString() == "black") {
                    $(did).append('<div id="'+pid+'" class="piece black"></div>');
                } else {
                    console.log('adding empty piece');
                    $(did).append('<div id="'+pid+'" class="piece empty"></div>');
                }
            } else {
                console.log('adding empty piece');
                $(did).append('<div id="'+pid+'" class="piece empty"></div>');
            }
            
            // $('#'+pid.toString()).css('height','80%');
            // $('#'+pid.toString()).css('width','80%');
        }
    }

    // $('.piece').css('width', '80%');
    // $('.piece').css('height', '80%');

    if (gs.turn == "red") {
        $("h4.description").replaceWith("<h4 class='description'>Red's turn!<h4>");
    } else {
        $("h4.description").replaceWith("<h4 class='description'>Yellow's turn!<h4>");
    }
}