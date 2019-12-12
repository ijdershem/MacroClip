import King from "./Pieces/King.js"
import Pawn from "./Pieces/Pawn.js"
import CheckersAI from "./CheckersAI.js";

export default class Checkers{
    constructor(hasAI){
        //general setup 
        this.gameState = {
            turn: 'black',
            board: [],
            winner: 'none',
            whitePieces: 12,
            blackPieces: 12
        }
        this.onmoveCallback=[];
        this.removeShowMovesCallback=[];
        this.showMovesCallback=[];
        this.onWinCallback=[];
        this.pieceCallbackArr=[];
        this.playersMoves=[];
        this.AI=hasAI?new CheckersAI(this):null;
        //game specific setup
        this.selectAblePieceCallbackArr=[];
        this.selectedPiece=undefined;
        this.selectAblePiece = [];
        this.additionalAttacks = false;

        this.resetBoard();
    }

    toggleAI(){
        this.AI=this.AI==null?new CheckersAI(this):null;
        this.resetGame();
    }

    makeAIMove(){
        if(this.AI==null)
            return;
        this.AI.makeMove();
    }

    resetGame(){
        this.gameState = {
            turn: 'black',
            board: [],
            winner: 'none',
            whitePieces: 12,
            blackPieces: 12
        }
        this.pieceCallbackArr=[];
        this.selectAblePieceCallbackArr=[];
        this.selectedPiece=undefined;
        this.selectAblePiece = [];
        this.additionalAttacks = false;
        this.resetBoard();
    }

    processInput(x,y){
        if(this.selectedPiece==undefined){
            if(this.isSelectable(x,y)){
                this.selectedPiece=this.gameState.board[y][x];
                this.updateMoveListAndDisplay();
            }
        }else{
            let num = this.isMove(x,y);
            if(num>=0){
                let move = this.playersMoves[num];
                this.processMove(move);
            }
            if(!this.additionalAttacks&&this.isSelectable(x,y)){
                this.selectedPiece=this.gameState.board[y][x];
                this.updateMoveListAndDisplay();
            }   
        }
    }

    /**
     * Helper Functions
     */
    processMove(moveData){
        if(moveData.type=='attack'){
            this.takePiece(moveData);
            this.selectedPiece.resetEndOfTurn();
            if(this.selectedPiece.hasAttack()){
                this.additionalAttacks=true;
                this.runCallbackArr(this.onmoveCallback);
                this.updateMoveListAndDisplay();
                return;
            }
        }else
            this.changePositions(moveData);
        if(this.gameState.board[moveData.moveY][moveData.moveX] instanceof Pawn&&(this.gameState.turn=='black'&&moveData.moveY==0)||(this.gameState.turn=='white'&&moveData.moveY==7))
            this.gameState.board[moveData.moveY][moveData.moveX]=new King({X:moveData.moveX,Y:moveData.moveY},this.gameState.turn,this);
        this.endTurn();
    }

    isMove(x,y){
        for(let i=0;i<this.playersMoves.length;i++)
            if(x==this.playersMoves[i].moveX&&y==this.playersMoves[i].moveY)
                return i;
        return -1
    }

    isSelectable(x,y){
        for(let i=0;i<this.selectAblePiece.length;i++)
            if(x==this.selectAblePiece[i].X&&y==this.selectAblePiece[i].Y)
                return true;       
        return false
    }

    takePiece(moveData){
        this.gameState.board[(moveData.posY+moveData.moveY)/2][(moveData.posX+moveData.moveX)/2].kill()
        this.gameState.board[(moveData.posY+moveData.moveY)/2][(moveData.posX+moveData.moveX)/2]=null;
        if(this.gameState.turn=='white')
            this.gameState.blackPieces--;
        else
            this.gameState.whitePieces--;
        this.changePositions(moveData);
    }

    changePositions(moveData){
       this.gameState.board[moveData.moveY][moveData.moveX]=this.gameState.board[moveData.posY][moveData.posX];
       this.gameState.board[moveData.posY][moveData.posX]=null;
       this.selectedPiece.setPosition({X:moveData.moveX,Y:moveData.moveY});
    }

    updateMoveListAndDisplay(){
        this.runCallbackArr(this.removeShowMovesCallback);
        this.playersMoves=this.selectedPiece.getMoveList();
        let arr = [{
            x:this.selectedPiece.getPosition().X,
            y:this.selectedPiece.getPosition().Y,
            type: 'selected'
        }]
        this.playersMoves.forEach(element=>{
            arr.push({
                x:element.moveX,
                y:element.moveY,
                type:element.type
            });
        });
        this.runShowMovesCallbacks(arr);
    }

    findSelectAblePieces(){
        this.selectAblePiece=[];
        this.runCallbackArr(this.selectAblePieceCallbackArr);
       
        let reduced = this.selectAblePiece.filter(function(element){
            return element.type=='attack';
        });
        if(reduced.length>0){
            this.selectAblePiece=reduced;
        }
        //console.log(this.selectAblePiece);
    }

    endTurn(){
        this.runCallbackArr(this.removeShowMovesCallback);
        this.runCallbackArr(this.onmoveCallback);
        this.runCallbackArr(this.pieceCallbackArr);
        this.additionalAttacks=false;
        this.gameState.turn = this.gameState.turn=='white'?'black':'white';
        this.findSelectAblePieces();
        this.selectedPiece=undefined;
        this.playersMoves=[];
        if(this.selectAblePiece.length==0){
            this.gameState.winner=this.gameState.turn=='white'?'black':'white';
            this.runCallbackArr(this.onWinCallback);
        }
        //this.makeAIMove();
    }

    resetBoard(){
        this.gameState.board=[];
        for(let y=0; y<8; y++){
            let row = new Array(8);
            for(let x=0;x<8;x++){
                if(y<=2)
                    row[x]=((y+x)%2==1?new Pawn({X:x,Y:y},'white',this):null);
                else if(y>=5)
                    row[x]=((y+x)%2==1?new Pawn({X:x,Y:y},'black',this):null);
                else
                    row[x]=(null);
            }
            this.gameState.board.push(row);
        }
        this.findSelectAblePieces();
    }

    /**
     * getters and callbacks
     */

    getPlayerMoves(){
        return this.playersMoves;
    }

    getSelectablePieces(){
        return this.selectAblePiece;
    }

    getGameState(){
        return this.gameState;
    }

    getBoard(){
        return this.gameState.board;
    }

    setBoard(newBoard){
        this.gameState.board=newBoard;
    }

    addSelectAblePiece(pieceInfo){
        this.selectAblePiece.push(pieceInfo);
    }

    addSelectAblePieceCallback(callback){
        this.selectAblePieceCallbackArr.push(callback);
    }

    toString(){
        let result = [':)  0    1    2    3    4    5    6    7'];
        for(let i = 0; i<this.gameState.board.length;i++){
            let row = this.gameState.board[i];
            let rowResult = `${i} `;
            row.forEach(piece=>{
                if(piece==null)
                    rowResult = rowResult.concat('[   ]')
                else
                    rowResult = rowResult.concat(`[${piece.toString()}]`);
            });
            result.push(rowResult);
        }
        return result;
    }

    /**
    *   Callback options with associated call process functions 
    *   Same for all game Implementations
    */

    onWin(callback){
        this.onWinCallback.push(callback);
    }

    pieceCallback(callback){
        this.pieceCallbackArr.push(callback);
    }

    onMove(callback){
        this.onmoveCallback.push(callback);
    }

    removeShowMoves(callback){
        this.removeShowMovesCallback.push(callback);
    }

    runCallbackArr(arr){
        arr.forEach(callback =>{
            callback(this.gameState);
        });
    }

    runShowMovesCallbacks(arr){
        this.showMovesCallback.forEach(callback =>{
            callback(arr);
        });
    }

    showMoves(callback){
        this.showMovesCallback.push(callback);
    }

}