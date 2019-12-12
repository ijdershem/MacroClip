import Game from "./engine/game.js";
import BackEnd from '../backend.js';
const database = new BackEnd();

let game;
let size = 0;
let gs;
let winningGame = {
    board: [1024,1024,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    score: 4506,
    won: false,
    over: false,
};

$(document).ready( function () {
    // Create a basic maze
    size = 4;
    game = new Game(size);
    game.setupNewGame();
    gs = game.getGameState();
    game.onMove(function() {});
    game.onLose(function() {
      $(".overlay").css("display", "flex");
      $(".winScreen").css("display", "none");
      $("form").append
      database.updateScore(gs.score,'2048');
      database.updateUserBalance(Math.ceil(gs.score/10));
    });
    game.onWin(function() {
      $(".winScreen").css("display", "flex");
      database.updateUserBalance(Math.ceil(gs.score/10));
    });

    let root = $("#root");

    for (let i=0; i<size; i++) {
        let row = [];
        for (let j=0; j<size; j++) {
            let tile = "<div class='"+i.toString()+j.toString()+"' id='tile'><h1 class='tile' id='"+i.toString()+j.toString()+"'>"+gs.board[(i*size)+j].toString()+"</h1></div>";
            row.push(tile);
        }

        let assembledRow = row.join("");
        $(root).append("<div class='row' id='"+i.toString()+"'>"+assembledRow+"</div>");
    }

    for (let i=0; i<size; i++) {
      for (let j=0; j<size; j++) {
        let tile = "#"+i.toString()+j.toString();
        let tileBG = "."+i.toString()+j.toString();
        $(tile).text(gs.board[(i*size)+j].toString());
        if (gs.board[(i*size)+j] == 2) {
          $(tileBG).css("background-color","rgb(190, 224, 224)");
          $(tileBG).css("border-color","rgb(190, 224, 224)");
        } else if (gs.board[(i*size)+j] == 4) {
          $(tileBG).css("background-color","rgb(190, 224, 224)");
          $(tileBG).css("border-color","rgb(190, 224, 224)");
        } 
      }
    }

    $("button").click( function() {
      game.setupNewGame();
      for (let i=0; i<size; i++) {
        for (let j=0; j<size; j++) {
          let tile = "#"+i.toString()+j.toString();
          let tileBG = "."+i.toString()+j.toString();
          $(tile).text(gs.board[(i*size)+j].toString());
          if (gs.board[(i*size)+j] == 2) {
            $(tileBG).css("background-color","rgb(190, 224, 224)");
            $(tileBG).css("border-color","rgb(190, 224, 224)");
          } else if (gs.board[(i*size)+j] == 4) {
            $(tileBG).css("background-color","rgb(143, 219, 219)");
            $(tileBG).css("border-color","rgb(143, 219, 219)");
          } else {
            $(tileBG).css("background-color","rgb(102, 102, 102)");
            $(tileBG).css("border-color","rgb(102, 102, 102)");
          }
        }
      }
      $(".winScreen").css("display", "none");
      $(".overlay").css("display", "none");
      $("#score").text("Score: "+game.getGameState().score.toString());
    });
  
    // TODO: Write code to solve the maze here
    //  \/ \/ \/ \/ \/
    // const doMoves = async function() {
    //   await token.moveAsync('north');
    //   await token.moveAsync('east');
    //   await token.moveAsync('east');
    //   await token.moveAsync('north');
    // };
    // doMoves();
  
  
    //  /\ /\ /\ /\ /\
});

$(document).keydown( function(event) {
  let key = (event.keyCode ? event.keyCode : event.which);

  if (key == 38 || key == 87) {
      game.move("up");
  } else if (key == 40 || key == 83) {
      game.move("down");
  } else if (key == 37 || key == 65) {
      game.move("left");
  } else if (key == 39 || key == 68) {
    game.move("right");
    // 65left 87up 68right 63down
  } 

  for (let i=0; i<size; i++) {
    for (let j=0; j<size; j++) {
      let tile = "#"+i.toString()+j.toString();
          let tileBG = "."+i.toString()+j.toString();
          $(tile).text(gs.board[(i*size)+j].toString());
          if (gs.board[(i*size)+j] == 0) {
            $(tileBG).css("background-color","rgb(102, 102, 102)");
            $(tileBG).css("border-color","rgb(102, 102, 102)");
          } else if (gs.board[(i*size)+j] == 2) {
            $(tileBG).css("background-color","rgb(190, 224, 224)");
            $(tileBG).css("border-color","rgb(190, 224, 224)");
          } else if (gs.board[(i*size)+j] == 4) {
            $(tileBG).css("background-color","rgb(143, 219, 219)");
            $(tileBG).css("border-color","rgb(143, 219, 219)");
          } else if (gs.board[(i*size)+j] == 8) {
            $(tileBG).css("background-color","rgb(53, 201, 201)");
            $(tileBG).css("border-color","rgb(53, 201, 201)");
          } else if (gs.board[(i*size)+j] == 16) {
            $(tileBG).css("background-color","rgb(93, 122, 202)");
            $(tileBG).css("border-color","rgb(93, 122, 202)");
          } else if (gs.board[(i*size)+j] == 32) {
            $(tileBG).css("background-color","rgb(197, 153, 223)");
            $(tileBG).css("border-color","rgb(197, 153, 223)");
          } else if (gs.board[(i*size)+j] == 64) {
            $(tileBG).css("background-color","rgb(183, 53, 243)");
            $(tileBG).css("border-color","rgb(183, 53, 243)");
          } else if (gs.board[(i*size)+j] == 128) {
            $(tileBG).css("background-color","rgb(212, 133, 214)");
            $(tileBG).css("border-color","rgb(212, 133, 214)");
          } else if (gs.board[(i*size)+j] == 256) {
            $(tileBG).css("background-color","rgb(202, 88, 204)");
            $(tileBG).css("border-color","rgb(202, 88, 204)");
          } else if (gs.board[(i*size)+j] == 512) {
            $(tileBG).css("background-color","rgb(182, 56, 165)");
            $(tileBG).css("border-color","rgb(182, 56, 165)");
          } else if (gs.board[(i*size)+j] == 1024) {
            $(tileBG).css("background-color","rgb(216, 66, 196)");
            $(tileBG).css("border-color","rgb(216, 66, 196)");
          } else if (gs.board[(i*size)+j] == 2048) {
            $(tileBG).css("background-color","rgb(252, 40, 156)");
            $(tileBG).css("border-color","rgb(252, 40, 156)");
          } 
          
    }
  }

  $("#score").text("Score: "+game.getGameState().score.toString());
});