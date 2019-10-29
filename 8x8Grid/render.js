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
    $('.tile').val("0");
    $('.tile').append("<p>Here's a tile</p>");
    $('.tile').click(function(event) {
        alert(this.id);
    });
});