import AI from "./MancalaAI.js"

export default class Mancala{
    constructor(hasAI){
        this.gameState={
            board:[],
            P0Mancala:0,
            P1Mancala:0,
            winner:'none',
            turn:'P1'
        }
        this.AI=hasAI?new AI(this):null;
        this.onMoveArr=[];
        this.onWinArr=[];
        this.generateStartingBoard();
    }

    toggleAI(){
        this.AI=this.AI==null?new AI(this):null;
        this.resetGame();
    }

    makeAIMove(){
        if(this.AI!=null){
            this.AI.makeMove();
        }
    }

    resetGame(){
        this.gameState={
            board:[],
            P0Mancala:0,
            P1Mancala:0,
            winner:'none',
            turn:'p1'
        }
        this.generateStartingBoard();
    }

    getGameState(){
        return this.gameState;
    }

    generateStartingBoard(){
        this.gameState.board.push([]);
        this.gameState.board.push([]);
        for(let i=0;i<6;i++){
            this.gameState.board[0].push(4);
            this.gameState.board[1].push(4);
        }
    }

    processInput(pocket){
        if(pocket>5||pocket<0||this.gameState.winner!='none'){
            return;
        }
        let turn = this.gameState.turn=='P0'?0:1;
        let value = this.gameState.board[turn][pocket];

        if(value==0)return;
        this.gameState.board[turn][pocket]=0;
        if(!this.processTurn(value,pocket,turn)){
            this.gameState.turn=this.gameState.turn=='P0'?'P1':'P0'
        }
        this.callBasicCallbacks(this.onMoveArr);
        this.checkForEndGame(this.gameState.turn=='P0'?0:1);
        //setTimeout(()=>{this.makeAIMove()},100);
    }

    checkForEndGame(turn){
        let countTop=0;
        let countBottom=0;
        for(let i = 0; i<6; i++){
           countTop+=this.gameState.board[0][i];
           countBottom+=this.gameState.board[1][i];
            if(countTop!=0&&countBottom!=0)
                return;
        }
        this.gameState.P0Mancala+=countTop;
        this.gameState.P1Mancala+=countBottom;

        this.gameState.winner=this.gameState.P0Mancala==this.gameState.P1Mancala?'tie':
                                this.gameState.P0Mancala>this.gameState.P1Mancala?'P0':'P1';

        this.callBasicCallbacks(this.onWinArr);
    }

    processTurn(value,index,side){
        let dir = side==0?-1:1;
        index+=dir;
        while(index<=5&&index>=0&&value>0){
            
            this.gameState.board[side][index]++;
            value--;
            index+=dir;
        }
        
        if((index>5||index<0)&&value>0){
            value--;
            
            if(this.gameState.turn=='P1')
                if(side==0)
                    value++
                else
                    this.gameState.P1Mancala++;
            else
                if(side==1)
                    value++
                else
                    this.gameState.P0Mancala++;

            if(value==0){ 
                return true;
            } else
                return this.processTurn(value,index,side==0?1:0);
        }else{ //if(index<=6&&index>=0&&value==0){
            let playerSide = this.gameState.turn=='P0'?0:1;
            if(side==playerSide&&this.gameState.board[side][index-dir]==1&&this.gameState.board[side==1?0:1][index-dir]!=0){
                if(this.gameState.turn=='P1'){
                    this.gameState.P1Mancala+=this.gameState.board[0][index-dir];
                    this.gameState.P1Mancala+=this.gameState.board[1][index-dir];
                }else{
                    this.gameState.P0Mancala+=this.gameState.board[0][index-dir];
                    this.gameState.P0Mancala+=this.gameState.board[1][index-dir];
                }
                this.gameState.board[0][index-dir]=0;
                this.gameState.board[1][index-dir]=0;
            }
            return false;
        }
    }

    toString(){
        let str = ` P0 [0][1][2][3][4][5] P1 \n|  |`;
        for(let i=0;i<3;i++){
            for(let j=0;j<6;j++){
                if(i==0){
                    str=str.concat(`[${this.gameState.board[0][j]}]`)
                }else if(i==1){
                    str=str.concat(`[-]`);
                }else{
                    str=str.concat(`[${this.gameState.board[1][j]}]`)
                }
            }
            if(i==0)
                str=str.concat(`|  |\n|${this.gameState.P0Mancala}${this.gameState.P0Mancala<10?' ':''}|`)
            else if(i==1)
                str=str.concat(`|${this.gameState.P1Mancala}${this.gameState.P1Mancala<10?' ':''}|\n|  |`)
            else
                str=str.concat(`|  |`)
        }
        return str;
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