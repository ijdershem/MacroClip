import ConnectFour from "./Engine/ConnectFour.js";

let game;
let gs;
let tiles;

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

        game.processInput(j);
        console.log(game.toString());

        refreshBoard();
    });

    $('button').click(function() {
        game.resetGame();
        refreshBoard();
    })

    game.onWin(function() {
        setTimeout(function () {
            if (gs.winner == 'black') {
                $("h4.description").replaceWith("<h4 class='won'>Yellow wins! Play again?<h4>");
            } else {
                $("h4.description").replaceWith("<h4 class='won'>Red wins! Play again?<h4>");
            }
            
            let winningPieces = game.getWinningPieces();
            for (let i=0; i<4; i++) {
                let element = winningPieces[i];
                let by = 6-element.Y;
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
            let bi = 6-i
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