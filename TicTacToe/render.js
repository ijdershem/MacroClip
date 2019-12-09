$(document).ready( function () {

    for (let i=0; i<8; i++) {
        for (let j=0; j<8; j++) {
            let id = "#"+i.toString()+j.toString();
            if (i != 2) {
                $(id).css("border-bottom", "solid");
            } 

            if (j != 2) {
                $(id).css("border-right", "solid");
            }

            $(id).css("border-color", "#adadad");
            $(id).css("border-width", "1vh");
        }
    }

});