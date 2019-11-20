
export default class AI{
    constructor(game){
        this.game = game;
        this.color = 'black';
    }

    makeMove(gameState){
        if(gameState.turn == this.color){
            let moves = this.game.getPlayerMoves();
            if(moves.length!=0){
                moves = this.checkForEdge(moves);
                moves = this.checkForCorner(moves);
                moves = this.checkForInnerSquare(moves);
                let random = Math.floor(Math.random()*moves.length);
                this.game.processInput(moves[random].Y, moves[random].X);
            }
        }
    }

    checkForInnerSquare(moveList){
        let reduced = moveList.filter(move=> (move.X <= 5 && move.X >= 2) && (move.Y >= 2 && move.Y<=5));
        return reduced.length==0?moveList:reduced;
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