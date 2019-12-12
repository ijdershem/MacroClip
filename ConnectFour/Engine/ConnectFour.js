import C4AI from "./ConnectFourAI.js"

export default class ConnectFour{

    constructor(hasAI){
        this.gameState={
            board:[],
            blackTiles:0,
            redTiles:0,
            turn:'black',
            winner:'none'
        }
        this.onMoveArr=[];
        this.onWinArr=[];
        this.AI=hasAI?new C4AI(this):null;
        this.winningPieces=[];
        this.generateStartingBoard();
    }

    toggleAI(){
        this.AI=this.AI==null?new C4AI(this):null;
        this.resetGame();
    }

    generateStartingBoard(){
        this.gameState.board=[];
        for(let i=0;i<7;i++){
            let column=[];
            for(let j=0;j<6;j++){
                column.push(null);
            }
            this.gameState.board.push(column);
        }
    }

    processInput(col){
        if(col<0||col>6||this.gameState.winner!='none'||this.gameState.board[col][5]!==null){
            return;
        }
        let row=0;
        while(this.gameState.board[col][row]!==null)
            row++;
        this.gameState.board[col][row]=this.gameState.turn;
        if(this.gameState.turn=='red')
            this.gameState.redTiles++;
        else
            this.gameState.blackTiles++;

        this.gameState.turn=this.gameState.turn=='red'?'black':'red';

        this.callBasicCallbacks(this.onMoveArr);

        if(this.gameState.blackTiles+this.gameState.redTiles>=7&&this.checkForWin(row,col)){
            this.callBasicCallbacks(this.onWinArr);
        }

        if(this.gameState.redTiles+this.gameState.blackTiles==42&&this.gameState.winner=='none'){
            this.gameState.winner=='tie';
            this.callBasicCallbacks(this.onWinArr);
        }
        //this.makeAIMove();
    }

    checkForWin(row,col){
        let x=col; let y=row;
        this.searchDir(1,0,x,y)
        this.searchDir(1,1,x,y)
        this.searchDir(0,1,x,y)
        this.searchDir(1,-1,x,y)
        if(this.winningPieces.length!=0){
            this.gameState.winner=this.gameState.turn=='red'?'black':'red'
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
        
        while(fx>=0&&fx<7&&fy<6&&fy>=0){
            if(this.gameState.board[fx][fy]==playerVal){
                pieces.push({X:fx,Y:fy});
            }else{
                break;
            }
            fx=fx+xdir;
            fy=fy+ydir;
        }
        
        fx=x-xdir
        fy=y-ydir
        while(fx>=0&&fx<7&&fy<6&&fy>=0){
            if(this.gameState.board[fx][fy]==playerVal){
                pieces.push({X:fx,Y:fy});
            }else{
                break;
            }
            fx=fx-xdir
            fy=fy-ydir
        }
        
        if(pieces.length>=3){
            pieces.forEach(element=>{
                this.winningPieces.push(element);
            })
        }
    }

    toString(){
        let str = '[0][1][2][3][4][5][6]\n';
        for(let row = 5; row>=0; row--){
            for(let col=0;col<7;col++){
                str=str.concat(`[${this.gameState.board[col][row]==null?' ':this.gameState.board[col][row]=='red'?'r':'b'}]`)
            }
            str=str.concat('\n');
        }
        return str;
    }

    getGameState(){
        return this.gameState;
    }

    /**
     * Front End Functions
     */

    makeAIMove(){
        if(this.AI==null)
            return;
        
        this.AI.makeMove();
    }

    getWinningPieces(){
        return this.winningPieces;
    }

    resetGame(){
        this.gameState={
            board:[],
            blackTiles:0,
            redTiles:0,
            turn:'black',
            winner:'none'
        } 
        this.winningPieces=[];
        this.generateStartingBoard();
    }

    /**
     * All Callbacks 
     */
    onWin(callback){
        this.onWinArr.push(callback);
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