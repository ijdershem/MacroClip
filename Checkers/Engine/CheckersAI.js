import Pawn from "./Pieces/Pawn.js";

export default class CheckersAI{

    constructor(game){
        this.game=game;
        this.turn='white'

    }

    makeMove(){
        let gs = this.game.getGameState();
        if(gs.turn!=this.turn)
            return
        let moves = this.game.getSelectablePieces();
        if(moves.length!=0){
            moves = this.notBackPieces(moves);
            moves = this.lookforKing(moves);
            moves = Math.random()>0.5?this.centerPieces(moves):moves;
            let random = Math.floor(Math.random()*moves.length);
            this.game.processInput(moves[random].X, moves[random].Y);
            
            moves = this.game.getPlayerMoves();
            console.log(moves);
            random = Math.floor(Math.random()*moves.length);
            this.game.processInput(moves[random].moveX, moves[random].moveY);
        }
    }

    notBackPieces(moves){
        let reduced = moves.filter(move=>{return move.Y!=0})
        return reduced.length==0?moves:reduced;
    }

    lookforKing(moves){
        let reduced = moves.filter(move=>{return move.Y!=7&&this.game.getGameState().board[move.X][move.Y]instanceof Pawn})
        return reduced.length==0?moves:reduced;
    }

    centerPieces(moves){
        let reduced = moves.filter(move=>{return move.X>0&&move.X<7})
        return reduced.length==0?moves:reduced;
    }
}