import AI from "./TicTacToeAI.js"

export default class TicTacToe{
    constructor(hasAI, AITurn){
        this.gameState={
            board:[[null,null,null],[null,null,null],[null,null,null]],
            xPieces: 0,
            oPieces: 0,
            turn:'x',
            winner:'none'
        }
        this.AI = hasAI?new AI(this,AITurn):null;
        this.onOverArr=[];
        this.onMoveArr=[];
        this.winningPieces=[];
        //this.resetGame();
    }

    toggleAI(AITurn){
        this.AI = this.AI==null?new AI(this,AITurn):null;
        this.resetGame();
    }

    resetGame(){
        this.gameState={
            board:[[null,null,null],[null,null,null],[null,null,null]],
            xPieces: 0,
            oPieces: 0,
            turn:'x',
            winner:'none'
        }
        this.winningPieces=[];
    }

    getGameState(){
        return this.gameState
    }

    switchAITurn(){
        if(this.AI==null)
            return;
        this.AI.switchTurn()
        this.resetGame();
    }

    makeAIMove(){
        if(this.AI==null){
            return;
        }
        this.AI.makeMove();
    }

    getWinningPieces(){
        return this.winningPieces.length>0?this.winningPieces:[];
    }

    processInput(y,x){
        if(this.gameState.winner!='none'||x<0||x>2||y<0||y>2)
            return

        if(this.gameState.board[x][y]==null){

            this.gameState.board[x][y]=this.gameState.turn;

            if(this.gameState.turn=='o')
                this.gameState.oPieces++;
            else
                this.gameState.xPieces++;
        
            this.gameState.turn=this.gameState.turn=='x'?'o':'x';
            this.callBasicCallbacks(this.onMoveArr);

            if(this.gameState.xPieces+this.gameState.oPieces>=5&&this.checkForEnd(x,y)){
                this.callBasicCallbacks(this.onOverArr);
            }

            if(this.gameState.winner=='none'&&this.gameState.xPieces+this.gameState.oPieces==9){
                this.gameState.winner='tie';
                this.callBasicCallbacks(this.onOverArr);
            }
            //this.makeAIMove();
        }
    }

    checkForEnd(x,y){
        this.searchDir(1,0,x,y)
        this.searchDir(1,1,x,y)
        this.searchDir(0,1,x,y)
        this.searchDir(1,-1,x,y)
        if(this.winningPieces.length!=0){
            this.gameState.winner=this.gameState.turn=='x'?'o':'x'
            this.winningPieces.push({X:x,Y:y})
            return true;
        }
        return false;
    }

    searchDir(xdir,ydir,x,y){
        let playerVal = this.gameState.board[x][y];
        let pieces=[]
        
        let fx=x+xdir;
        let fy=y+ydir;
        
        while(fx>=0&&fx<=2&&fy<=2&&fy>=0){
            if(this.gameState.board[fx][fy]==playerVal){
                pieces.push({X:fx,Y:fy});
            }
            fx=fx+xdir;
            fy=fy+ydir;
        }
        
        fx=x-xdir
        fy=y-ydir
        while(fx>=0&&fx<=2&&fy<=2&&fy>=0){
            if(this.gameState.board[fx][fy]==playerVal){
                pieces.push({X:fx,Y:fy});
            }
            fx=fx-xdir
            fy=fy-ydir
        }

        if(pieces.length==2){
            pieces.forEach(element=>{
                this.winningPieces.push(element);
            })
        }

    }

    toString(){
        let str = '';
        for(let i = 0;i<this.gameState.board.length;i++){
            for(let j =0;j<this.gameState.board[0].length;j++){
                str=str.concat(`[${this.gameState.board[i][j]==null?' ':this.gameState.board[i][j]}]`);
            }
            str=str.concat("\n");
        }
        return str;
    }

    /**
     * All callback methods 
     * */ 
    onOver(callback){
        this.onOverArr.push(callback);
    }
    onMove(callback){
        this.onMoveArr.push(callback);
    }

    callBasicCallbacks(arr){
        arr.forEach(callback =>{
            callback(this.gameState);
        });
    }
}