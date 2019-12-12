
import Board from "./board.js";
// import Snake from "./snake.js";
import BackEnd from '../backend.js';
const database = new BackEnd();


// export const renderHeader = function() {
//     const $head = $("#header");

//     $head.append('<div class="back"><a class="back" href="/index.html"><i class="fa fa-arrow-left"></i></a></div>');
//     $head.append('<div class="headerFill"></div>');
//     $head.append('<div class="title"><h2 class="title">Snake</h2></div>');
//     $head.append('<div id="scoreDiv" class="score"></div>');
// }

export const renderDesc = function() {
    const $desc = $('#desc');

    $desc.append('<h4>Use the arrow keys to move the snake</h4>');

}

export const renderScore = function(s) {
    $("#score").html('<h2 id="score">Score: ' + s + '</h2>');
}

export const renderLength = function(l) {
    $("#lenDiv").html('<h3 id="score">Length: ' + l + '</h3>');
}

export const renderLoseModal = function() {
    let modal = '<div id="modCont" class="modal-content">';
    modal += '<p class="loseP">You Lost!</p>';
    modal += '<p id="loseScore" class="loseP">Your score is: 0</p>';
    modal += '<p id="loseLength" class="loseP">Your snake has a length of 1</p>';
    modal += '<button type="button" id="newGMod">New Game</button>';
    modal += '</div>';

    $("#loseMod").append(modal);
    // return modal;
}

export const renderLoseStats = function(bo) {
    let modal = '<p class="loseP">You Lost!</p>';
    modal += '<p id="loseScore" class="loseP">Your score is: ' + bo.getScore() + '</p>';
    modal += '<p id="loseLength" class="loseP">Your snake has a length of ' + bo.getSnake().length + '</p>';
    modal += '<button type="button" id="newGMod">New Game</button>';

    $("#modCont").html('');
    $("#modCont").html(modal);
}

export const renderCanvas = function() {
    let canvas = '<div id="canvasDiv" width="100%">';
    // canvas += '<canvas id="myCanvas" width="1600" height="800">';
    canvas += '<canvas id="myCanvas">';

    canvas += '</canvas>';
    canvas += '</div>';

    $('#board').append(canvas);
}

export const drawCanvas = function(bo) {
    let s = bo.getSize();
    let sn = bo.getSnake();
    let f = bo.getFood();
    let canvas = document.getElementById("myCanvas");
    let w = canvas.width;
    let h = canvas.height;
    let bW = w/s;
    let bH = h/s;

    let ctx = canvas.getContext("2d");

    ctx.clearRect(0,0,w,h);

    ctx.fillStyle = "green";
    ctx.strokeStyle = "darkgreen";
    ctx.lineWidth = "3";
    for(let i=0;i<sn.length;i++) {
        let sx = sn[i].x;
        let sy = sn[i].y;

        ctx.fillRect(bW * sx,bH * sy,bW,bH);
        ctx.strokeRect(bW * sx,bH * sy,bW,bH);
    }

    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.lineWidth = "3";
    ctx.fillRect(bW*f.x,bH*f.y,bW,bH);
    ctx.strokeRect(bW*f.x,bH*f.y,bW,bH);
}

export const loadBoardIntoDOM = function() {
    const $root = $('#root');

    $root.append('<div id="board" class="board"></div>');
    $root.append('<div id="loseMod" class="modal"></div>');
    // $root.append('<img src="SnakeJPGs/Head.jpg" alt="Snake">');

    let bo = new Board();

    renderCanvas();
    let canv = document.getElementById('myCanvas');
    canv.width = document.getElementById('canvasDiv').clientWidth;
    canv.height = document.getElementById('canvasDiv').clientHeight;

    drawCanvas(bo);

    bo.onMove(gameState => {
        renderScore(bo.getScore());
        renderLength(bo.getLength());
        drawCanvas(bo);
    });

    renderLoseModal();

    renderScore(bo.getScore());
    renderLength(bo.getLength());

    let moveInt;

    function startMove() {
        moveInt = setInterval(function() {
            bo.move();
        },150);
    }

    startMove();

    bo.onLose(gameState => {
        clearInterval(moveInt);
        renderLoseStats(bo);
        $(".modal").css("display","flex");
        database.updateScore(bo.getScore(),'snake');
        database.updateUserBalance(Math.ceil(bo.getScore()/100));
    });

    $root.on("click", "#newGMod",null,function() {
        $(".modal").css("display","none");
        bo.reset();
        renderScore(bo.getScore());
        renderLength(bo.getLength());
        drawCanvas(bo);
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