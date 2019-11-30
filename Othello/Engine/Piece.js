
export default class Piece{
    constructor(color, pos, game){
        this.color = color;
        this.pos = pos;
        this.board = game.getBoard();
        game.pieceCallback((gameState)=>{
            this.board = gameState.board;
        });
    }

    getColor(){
        return this.color;
    }

    toString(){
        return this.color == 'white' ? 'W':'B';
    }

    flip(){
        this.color = this.color=='white'?'black':'white';
    }
}