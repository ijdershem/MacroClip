import TicTacToe from "./Engine/game.js";

let game;
let gs;
let tiles;

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

    game = new TicTacToe(false);
    gs = game.gameState;
    tiles = gs.board;

    $('.tile').click(function() {
        let id = this.id;
        let i = parseInt(id[0]);
        let j = parseInt(id[1]);

        game.processInput(j, i);
        console.log(game.toString());

        refreshBoard();
    });

    $('button').click(function() {
        game.resetGame();
    })

    game.onOver(function() {
        setTimeout(function () {
            $("h4.description").replaceWith("<h4 class='won'>"+gs.winner.toString()+" wins! Play again?<h4>");
            let winningPieces = game.getWinningPieces();
            winningPieces.sort();
            for (let i=0; i<3; i++) {
                let element = winningPieces[i];
                let pid = 'p'+element.X.toString()+element.Y.toString();
                let pdiv = document.getElementById(pid);
                console.log(pid);
                pdiv.setAttribute('class','piece winningPiece');
            }
        }, 250)
    });

    refreshBoard();
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