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
        let index = this.id.toString();
        let i = index[0];
        let j = index[1];
        console.log(i+j);

        let tile = gs.board.get

        // switch(event):
        //     case:
        //         break;
        //     case:
        //         break;
        //     case:
        //         break;

    });

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            let id = "#"+i.toString()+j.toString();
            if (i != 7) {
                $(id).css("border-bottom", "solid");
            } 

            if (j != 7) {
                $(id).css("border-right", "solid");
            }
            $(id).css("border-color", "#474747");
            $(id).css("border-width", ".5vh");
        }
    }
});