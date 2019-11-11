
export default class AI{
    constructor(game){
        this.game = game;
        this.color = 'black';
    }

    makeMove(gameState){
        if(gameState.turn == this.color){
            let moves = this.game.getPlayerMoves();
            let random = Math.floor(Math.random()*moves.length);
            this.game.processInput(moves[random].Y, moves[random].X);
        }
    }

}