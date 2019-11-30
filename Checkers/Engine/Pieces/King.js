import AbstractPiece from "./AbstractPiece.js"

export default class King extends AbstractPiece{
    constructor(position, color, game){
        super(position, color, game);
        this.game.addSelectAblePieceCallback((gameState)=>{
            if(gameState.turn==this.color)
            return this.createSelectablePiece()});
    }

    toString(){
        return this.color=='white'?"WK":"BK";
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
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y,1,-1));
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y,-1,-1));
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y,1,1));
            moves.push(this.moveSearch(this.game.getBoard(), this.position.X, this.position.Y,-1,1));
        moves.forEach(element=>{
            if(element!=undefined){
                moveFlag=true;
                this.moveList.push(element);
            }
        });
        return moveFlag;
    }
}