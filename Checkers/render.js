import Checkers from "./Engine/Checkers.js";

let game = new Checkers(false);
let gs = game.gameState;
let tiles = game.getBoard();
let selectedPiece;

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

    game.showMoves(function(moves) {moves.forEach(element => {
        if (element.type == "move") {
            let did = "#"+element.y.toString()+element.x.toString();
            $(did).append('<div class = "piece phantom-move"></div>');
        } else if (element.type == "attack") {
            let did = "#"+element.y.toString()+element.x.toString();
            $(did).append('<div class = "piece phantom-attack"></div>');
        }
    })});

    game.removeShowMoves(function(moves) {
        for (let i=0; i<8; i++) {
            for (let j=0; j<8; j++) {
                if (tiles[i][j] == null) {
                    let did = "#"+i.toString()+j.toString();
                    $(did).empty();
                }
            }
        }
    });

    game.onWin(function() {
        gs = game.gameState;
        let winner = gs.winner;
        console.log(winner);
        if (winner == 'white') {
            $('h4.description').replaceWith('<h4 class="won">Red wins! Play again?</h4>');
        } else {
            $('h4.description').replaceWith('<h4 class="won">Black wins! Play again?</h4>');
        }
    });

    $('button').click(function() {
        game.resetBoard();
        gs = game.gameState;
        tiles = game.getBoard();
        refreshBoard();
    });

    refreshBoard();
});

$('.tile').click(function(event) {
    let gs = game.gameState;
    let index = this.id.toString();
    tiles = game.getBoard();
    let i = parseInt(index[0]);
    let j = parseInt(index[1]);
    let pid = "p"+i.toString()+j.toString();
    let pieceDiv;

    // Check to see if a piece has already been selected, to see if this click is move click or a select click
    if (selectedPiece != null) {

        // did we click the already selected piece?
        if (j != parseInt(selectedPiece.position.X) || i != parseInt(selectedPiece.position.Y)) {
            console.log('didnt click the same piece');
            if(tiles[i][j] != null) {
                console.log('we did click a piece though')
                if (game.isSelectable(j, i)) {
                    let spid = "p"+selectedPiece.position.Y.toString()+selectedPiece.position.X.toString();
                    pieceDiv = document.getElementById(spid);
                    if (selectedPiece.getColor() == 'white') {
                        pieceDiv.setAttribute('class','piece red');
                    } else {
                        pieceDiv.setAttribute('class','piece black');
                    }

                    selectedPiece = tiles[i][j];
                    pieceDiv = document.getElementById(pid);
                    pieceDiv.setAttribute('class', 'piece selected');


                } else {
                    let spid = "p"+selectedPiece.position.Y.toString()+selectedPiece.position.X.toString();
                    pieceDiv = document.getElementById(spid);
                    if (selectedPiece.getColor() == 'white') {
                        pieceDiv.setAttribute('class','piece red');
                    } else {
                        pieceDiv.setAttribute('class','piece black');
                    }
                    selectedPiece = null;
                }
                game.processInput(j, i);
            } else {
                if (game.isMove(j, i) > -1) {
                    game.processInput(j, i);
                    refreshBoard();
                    selectedPiece = null;
                } else {
                    console.log('made it 2');
                    let spid = "p"+selectedPiece.position.Y.toString()+selectedPiece.position.X.toString();
                    pieceDiv = document.getElementById(spid);
                    if (selectedPiece.getColor() == 'white') {
                        pieceDiv.setAttribute('class','piece red');
                    } else {
                        pieceDiv.setAttribute('class','piece black');
                    }
                    
                    game.processInput(j, i);
                    selectedPiece = null;
                }
            }
        }

    } else {
        console.log('selecting piece');
        if (tiles[i][j] != null && game.isSelectable(j, i)) {
            selectedPiece = tiles[i][j];
            pieceDiv = document.getElementById(pid);
            pieceDiv.setAttribute('class', 'piece selected');

            game.processInput(j, i);
        } else {
            game.processInput(j, i);
        }
    }
});

function refreshBoard() {
    tiles = game.getBoard();
    gs = game.gameState;
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
        $("h4.description").replaceWith("<h4 class='description'>Red's turn!<h4>");
        $('h4.won').replaceWith("<h4 class='description'>Red's turn!<h4>");
    } else {
        $("h4.description").replaceWith("<h4 class='description'>Black's turn!<h4>");
        $('h4.won').replaceWith("<h4 class='description'>Black's turn!<h4>");
    }

    $("#score").replaceWith('<h2 id="score">R: '+gs.whitePieces+' | B: '+gs.blackPieces+'</h3>');

    // for (let i=0; i<game.selectAblePiece.length;i++) {
    //     let pid = '#p'+game.selectAblePiece[i].Y+game.selectAblePiece[i].X;
    //     $(pid).css('background-color','yellow');
    //     $(pid).css('box-shadow', '0 .5vh #b09f1c');
    // }
}