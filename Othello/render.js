import Othello from "./Engine/Othello.js";

let game = new Othello(true);
let gs = game.gameState;
let tiles = gs.board;

$(document).ready( function () {

    game.onWin(function() {
        gs.winner == 'white'?
            $("h4.description").replaceWith("<h4 class='won'>White wins! Play again?<h4>") : 
            $("h4.description").replaceWith("<h4 class='won'>Black wins! Play again?<h4>");
    });

    $('.tile').click(function(event) {
        let gs = game.gameState;
        let index = this.id.toString();
        let i = index[0];
        let j = index[1];

        game.processInput(parseInt(j), parseInt(i));
        tiles = game.getBoard();
        refreshBoard();
        //console.log(game.toString());
        if (gs.turn == "white") {
            $("h4.description").replaceWith("<h4 class='description'>White's turn!<h4>");
        } else {
            $("h4.description").replaceWith("<h4 class='description'>Black's turn!<h4>");
        }
    });

    $('button').click(function() {
        game.resetGame();
        tiles = game.getBoard();
        refreshBoard();
        $(".winScreen p").remove();
        $("h4.description").replaceWith("<h4 class='description'>White's turn!<h4>");
        $(".won").remove();
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
    for (let i=0; i<tiles.length; i++) {
        for (let j=0; j<tiles.length; j++) {
            let did = "#"+i.toString()+j.toString();
            let pid = "#p"+i.toString()+j.toString();
            $(did).empty();

            if(tiles[i][j].toString() == "W") {
                $(did).append('<div id="'+pid+'" class="piece white"></div>');
            } else if(tiles[i][j].toString() == "B") {
                $(did).append('<div id="'+pid+'" class="piece black"></div>');
            } else {
                $(did).empty();
            }
        }
    }

    $("#score").replaceWith('<h2 id="score">W: '+gs.whitePieces+' | B: '+gs.blackPieces+'</h3>');
}