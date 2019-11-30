import AbstractPiece from "./AbstractPiece.js"

export default class Pawn extends AbstractPiece{
    constructor(position, color, game){
        super(position, color, game);
        this.game.addSelectAblePieceCallback((gameState)=>{
            if(gameState.turn==this.color)
            return this.createSelectablePiece();});
    }

    toString(){
        return this.color=='white'?`W${this.position.X}${this.position.Y}`:`B${this.position.X}${this.position.Y}`;
    }

    hasMove(){
        if(this.killed){
            return false;
        }
        if(this.moveList.length > 0){
            return true;
        }
        let moveFlag=false;
        let moves = [];
        let board = this.game.getBoard();
        if(this.color=='white'){
            moves.push(this.moveSearch(board, this.position.X, this.position.Y, 1, 1))
            moves.push(this.moveSearch(board, this.position.X, this.position.Y, -1, 1))
        }else{
            moves.push(this.moveSearch(board, this.position.X, this.position.Y, 1, -1))
            moves.push(this.moveSearch(board, this.position.X, this.position.Y, -1, -1))
        }
        moves.forEach(element=>{
            if(element!=undefined){
                moveFlag=true;
                this.moveList.push(element);
            }
        });
        return moveFlag;
    }

}