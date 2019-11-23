import AbstractPiece from "./AbstractPiece.js"

class Pawn extends AbstractPiece{
    constructor(position, color, game){
        super(position, color, game);
        this.game.addSelectAblePieceCallback(function(gameState){return createSelectablePiece(gameState)});
    }

    toString(){
        return this.color=='white'?"WP":"BP";
    }

    hasMove(){
        if(this.moveList.length > 0){
            return true;
        }
        let moveFlag=false;
        let moves = [];
        if(this.color=='white'){
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y, 1, -1))
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y, -1, -1))
        }else{
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y, 1, 1))
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y, -1, 1))
        }
        moves.forEach(element=>{
            if(element!=undefined){
                moveFlag=true;
                this.moveList.push(element);
                this.game.addSelectAblePiece(element);
            }
        });
        return moveFlag;
    }

}