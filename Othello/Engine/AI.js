
export default class AI{
    constructor(game){
        this.game = game;
        this.color = 'black';
    }

    makeMove(gameState){
        if(gameState.turn == this.color){
            let moves = this.game.getPlayerMoves();
            moves = this.checkForEdge(moves);
            moves = this.checkForCorner(moves);
            let random = Math.floor(Math.random()*moves.length);
            this.game.processInput(moves[random].Y, moves[random].X);
        }
    }

    checkForEdge(moveList){
        let reduced = moveList.filter(move=> move.X == 0 || move.X==7 || move.Y == 0 || move.Y==7);
        return reduced.length==0?moveList:reduced;
    }

    checkForCorner(moveList){
        let reduced = moveList.filter(move=>(move.X==0&&move.Y==0)||(move.X==0&&move.Y==7)||(move.X==7&&move.Y==0)||(move.X==7&&move.Y==7));
        return reduced.length==0?moveList:reduced;
    }

}