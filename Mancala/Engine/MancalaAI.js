export default class AI{

    constructor(game){
        this.turn='P0'
        this.game=game;
        this.move=-1;
    }

    makeMove(){
        let gs = this.game.getGameState();
        if(gs.turn!=this.turn){
            return;
        }
        this.testForMancala(gs)
        this.testForPickPocket(gs)
        this.randomMove(gs)
        this.game.processInput(this.move);
        this.move=-1;
    }

    testForMancala(gs){
        for(let i = 0; i<6;i++){
            if(gs.board[0][i]==i+1){
                this.move=i;
                this.mancala=true;
                return;
            }
        }
        for(let i = 0; i<6;i++){
            if(gs.board[0][i]%7==i+1){
                this.move=i;
                this.mancala=true;
                return;
            }
        }
    }

    testForPickPocket(gs){
        if(this.move!=-1)
            return;
        for(let i = 0;i<6;i++){
            if(gs.board[0][i]==0){
                continue;
            }
            for(let j=i-1;j>=0;j--){
                if(gs.board[1][j]!=0&&gs.board[0][j]==0&&gs.board[0][i]==i-j){
                    this.move=i;
                    return;
                }
            }
        }

    }

    randomMove(gs){
        if(this.move!=-1)
            return;
        let moves =[];
        for(let i = 0; i < 6; i++){
            if(gs.board[0][i]!=0){
                moves.push(i);
            }
        }
        this.move=moves[Math.floor(Math.random()*moves.length)];
    }
}