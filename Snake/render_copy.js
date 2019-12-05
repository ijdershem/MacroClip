
import Board from "./board.js";
// import Tile from "./tile.js";


export const renderBoard = function(bo) {
    let $board = $("#board");

    let table = '<table id="boTab">';

    for(let i=0;i<bo.getSize();i++) {
        table += '<tr>';
        for(let j=0;j<bo.getSize();j++) {
            table += '<td class="' + bo.getTileId(i,j) + '"></td>';
        }
        table += '</tr>';
    }

    table += '</table>';

    // table += renderLoseModal();

    $board.append(table);
}

export const renderHeader = function() {
    const $head = $("#header");

    $head.append('<div class="back"><a class="back" href="/index.html"><i class="fa fa-arrow-left"></i></a></div>');
    $head.append('<div class="headerFill"></div>');
    $head.append('<div class="title"><h2 class="title">Snake</h2></div>');
    $head.append('<div id="scoreDiv" class="score"></div>');
}

export const renderDesc = function() {
    const $desc = $('#desc');

    $desc.append('<p>Use the arrow keys to move the snake</p>');

}

export const renderScore = function(s) {
    $("#scoreDiv").html('<h2 id="score">Score: ' + s + '</h2>');
}

export const renderLength = function(l) {
    $("#lenDiv").html('<h3 id="score">Length: ' + l + '</h3>');
}

export const renderLoseModal = function() {
    let modal = '<div id="loseMod" class="modal">';
    modal += '<div class="modal-content">';
    modal += '<p>You Lost!</p>';
    modal += '<button type="button" id="newGMod">New Game</button>';
    modal += '</div></div>';

    $("#loseMod").append(modal);
    // return modal;
}

export const loadBoardIntoDOM = function() {
    const $root = $('#root');

    $root.append('<div id="header" class="header"></div>');
    $root.append('<div id="desc" class="description"></div>');
    $root.append('<div id="board" class="board"></div>');
    $root.append('<div id="loseMod" class="modal"></div>');
    // $root.append('<img src="SnakeJPGs/Head.jpg" alt="Snake">');

    let bo = new Board(25,1,1);

    bo.onMove(gameState => {
        renderScore(bo.getScore());
        renderLength(bo.getLength());
    })
    

    renderHeader();
    renderDesc();
    renderBoard(bo);
    renderLoseModal();

    renderScore(bo.getScore());
    renderLength(bo.getLength());

    var moveInt;

    function startMove() {
        moveInt = setInterval(function() {
            bo.move();
            $("#board").html('');
            renderBoard(bo);
        },150);
    }

    startMove();

    bo.onLose(gameState => {
        // $root.append('<p>You Lost!</p>');
        console.log('clear interval');
        clearInterval(moveInt);
        console.log('calling onlose');
        $(".modal").css("display","block");
    });

    $root.on("click", "#newGMod",null,function() {
        $(".modal").css("display","none");
        bo.reset();
        $("#board").html('');
        renderBoard(bo);
        renderScore(bo.getScore());
        renderLength(bo.getLength());
        startMove();
    });

    $(document).on("keydown",function(e){
        if (e.which == 37 || 
            e.which == 38 || 
            e.which == 39 ||
            e.which == 40) {
            let dir = '';
            if (e.which == 37) {
                dir = 'left';
            } else if (e.which == 38) {
                dir = 'up';
            } else if (e.which == 39) {
                dir = 'right';
            } else {
                dir = 'down';
            }
            bo.setDir(dir);
        }
    });

}

$(function() {
    loadBoardIntoDOM();
});