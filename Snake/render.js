
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

    $board.append(table);
}

export const renderHeader = function() {
    const $head = $("#header");

    $head.append('<h1>Snake</h1>');
    $head.append('<p>Use the arrow keys to move the snake</p>');
    $head.append('<button id="movebut" type="button">Move</button>');
}

export const loadBoardIntoDOM = function() {
    const $root = $('#root');

    $root.append('<div id="header"></div>');
    $root.append('<div id="board"></div>');

    let bo = new Board(25,1,1);

    /*
    bo.onWin(gameState => {
        $root.append('<p>You Won!</p>');
    });

    bo.onLose(gameState => {
        $root.append('<p>You Lost!</p>');
    });
    */

    renderHeader();
    renderBoard(bo);

    let moveInt = setInterval(function() {
        bo.move();
        $("#board").html('');
        renderBoard(bo);
    },150);

    $root.on("click","#movebut",null,function() {
        clearInterval(moveInt);
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