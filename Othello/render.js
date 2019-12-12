import Othello from "./Engine/Othello.js";
import BackEnd from '../backend.js';

let database = new BackEnd();
let game = new Othello(false);
let gs = game.gameState;
let gameStarted = false;
let AI = false;
let tiles = gs.board;

$(document).ready( function () {

    game.onWin(function() {
        refreshBoard();
        if (gs.winner == 'white') {
            $("h4.description").replaceWith("<h4 class='won'>White wins! Play again?<h4>");
        } else {
            $("h4.description").replaceWith("<h4 class='won'>Black wins! Play again?<h4>");
        }  

        database.updateUserBalance(Math.ceil(gs.whitePieces));
    });

    game.onMove(function() {
        console.log(gs.turn);
        if (AI) {
            if (gs.turn == 'black') {
                console.log('made it');
                $('.tile').css("pointer-events","none");
                refreshBoard();
                setTimeout(function() {
                    game.getAIMove();
                    refreshBoard();
                    $('.tile').css('pointer-events','auto');
                }, 1000);
            }  
        } 
    });

    $('.tile').click(function(event) {
        let gs = game.gameState;
        let index = this.id.toString();
        let i = index[0];
        let j = index[1];

        if (!gameStarted) {
            gameStarted = false;
            $('#AI').css('pointer-events','none');
        }

        game.processInput(parseInt(j), parseInt(i));
        tiles = game.getBoard();
        refreshBoard();
        //console.log(game.toString());

        if (AI) {
            console.log('made it');
            $('.tile').css("pointer-events","none");
            refreshBoard();
            setTimeout(function() {
                game.getAIMove();
                refreshBoard();
                $('.tile').css('pointer-events','auto');
            }, 1000);
             
        } 
    });

    $('#AI').click(function() {
        if (AI) {
            AI = false;
            $('#AI').css('color', '#9c9c9c');
        } else {
            AI = true;
            $('#AI').css('color', 'rgb(79, 192, 94)');
        }

        game.toggleAI();
    });

    $('button').click(function() {
        $('#AI').css('pointer-events','auto');
        gameStarted = false;
        game.resetGame();
        tiles = game.getBoard();
        refreshBoard();
        $(".winScreen p").remove();
        $("h4.description").replaceWith("<h4 class='description'>White's turn!<h4>");
        $("h4.won").replaceWith("<h4 class='description'>White's turn!<h4>");
    });

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            let id = "#"+i.toString()+j.toString();
            if (i != 7) {
                $(id).css("border-bottom", "solid");
            } 

            if (j != 7) {
                $(id).css("border-right", "solid");
            }

            $(id).css("border-color", "#474747");
            $(id).css("border-width", ".5vh");
        }
    }

    refreshBoard();
    $("h4.description").replaceWith("<h4 class='description'>White's turn!<h4>");

});

function refreshBoard() {
    tiles = game.getBoard();
    gs = game.gameState;
    for (let i=0; i<tiles.length; i++) {
        for (let j=0; j<tiles.length; j++) {
            let did = "#"+i.toString()+j.toString();
            let pid = "p"+i.toString()+j.toString();
            $(did).empty();

            if(tiles[i][j].toString() == "W") {
                $(did).append('<div id="'+pid+'" class="piece white"></div>');
            } else if(tiles[i][j].toString() == "B") {
                $(did).append('<div id="'+pid+'" class="piece black"></div>');
            } else {
                $(did).empty();
            }
            // $('#'+pid.toString()).css('height','80%');
            // $('#'+pid.toString()).css('width','80%');
        }
    }

    // $('.piece').css('width', '80%');
    // $('.piece').css('height', '80%');

    if (gs.turn == "white") {
        $("h4.description").replaceWith("<h4 class='description'>White's turn!<h4>");
    } else {
        $("h4.description").replaceWith("<h4 class='description'>Black's turn!<h4>");
    }

    $("#score").replaceWith('<h2 id="score">W: '+gs.whitePieces+' | B: '+gs.blackPieces+'</h3>');
}