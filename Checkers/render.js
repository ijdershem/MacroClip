import Checkers from "./Engine/Checkers.js";

let game = new Checkers(true);
let gs = game.gameState;
let tiles = game.getBoard();

$(document).ready( function () {

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            if (i%2 != 0) {
                if (j%2 == 0) {
                    let id = "#"+i.toString()+j.toString();
                    $(id).css("background-color", "#171717");
                    $(id).css("color", "white");
                }
            } else {
                if (j%2 != 0) {
                    let id = "#"+i.toString()+j.toString();
                    $(id).css("background-color", "#171717");
                    $(id).css("color", "white");
                }
            }
        }
    }

    refreshBoard();
});

$('.tile').click(function(event) {
    let gs = game.gameState;
    let index = this.id.toString();
    let i = index[0];
    let j = index[1];

    if (game.isSelectable(i,j)) {
        
    }
    tiles = game.getBoard();
    refreshBoard();
});

function refreshBoard() {
    tiles = game.getBoard();
    gs = game.gameState;
    console.log(tiles);
    for (let i=0; i<tiles.length; i++) {
        for (let j=0; j<tiles.length; j++) {
            let did = "#"+i.toString()+j.toString();
            let pid = "p"+i.toString()+j.toString();
            $(did).empty();

            if (tiles[i][j] != null) {
                if(tiles[i][j].toString().includes("W")) {
                    $(did).append('<div id="'+pid+'" class="piece red"></div>');
                } else if(tiles[i][j].toString().includes("B")) {
                    $(did).append('<div id="'+pid+'" class="piece black"></div>');
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

    if (gs.turn == "white") {
        $("h4.description").replaceWith("<h4 class='description'>White's turn!<h4>");
    } else {
        $("h4.description").replaceWith("<h4 class='description'>Black's turn!<h4>");
    }

    $("#score").replaceWith('<h2 id="score">W: '+gs.whitePieces+' | B: '+gs.blackPieces+'</h3>');
}