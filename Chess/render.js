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
    $('.tile').text("");
    $('.tile').click(function(event) {
        alert(this.id);
    });

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            if (i%2 != 0) {
                if (j%2 == 0) {
                    let id = "#"+i.toString()+j.toString();
                    $(id).css("background-color", "#3f310d");
                    $(id).css("color", "white");
                    $(id).css("opacity", ".8");
                }
            } else {
                if (j%2 != 0) {
                    let id = "#"+i.toString()+j.toString();
                    $(id).css("background-color", "#3f310d");
                    $(id).css("color", "white");
                    $(id).css("border-color", "black");
                    $(id).css("opacity", ".8");
                }
            }
        }
    }
});