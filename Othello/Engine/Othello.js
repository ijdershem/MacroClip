import Piece from "./Piece.js";
import NullPiece from "./NullPiece.js";
import AI from "./AI.js";

export default class Othello{
    constructor(hasAI){
        this.gameState = {
            turn: 'white',
            board: [],
            winner: 'none',
            whitePieces: 2,
            blackPieces: 2
        }
        this.onmoveCallback=[];
        this.removeShowMovesCallback=[];
        this.showMovesCallback=[];
        this.onWinCallback=[];
        this.pieceCallbackArr=[];
        this.playersMoves=[];
        this.resetBoard();
        this.AI = hasAI?new AI(this):null;
    }

    toggleAI(){
        this.AI=this.AI==null?new AI(this):null;
        this.resetGame();
    }

    /**Main input for playing the game. Will process if the move is valid 
     * based on past input and values
     * 
     * @param {number} x 
     * @param {number} y 
     */
    processInput(x,y){
        [x,y]=[y,x];
        let validInput = false;
        for(let i=0; i<this.playerMoves.length; i++){
            let element=this.playerMoves[i];
            if(element.X == x && element.Y==y){
                validInput = true;
                break;
            }
        }
        
        if(validInput){            
            if(this.gameState.board[x][y].hasMoveRight())
                this.processPieceFlip(x,y,1,0);
            if(this.gameState.board[x][y].hasMoveLeft())
                this.processPieceFlip(x,y,-1,0);
            if(this.gameState.board[x][y].hasMoveUp())
                this.processPieceFlip(x,y,0,1);
            if(this.gameState.board[x][y].hasMoveDown())
                this.processPieceFlip(x,y,0,-1);
            if(this.gameState.board[x][y].hasMoveBottomRight())
                this.processPieceFlip(x,y,1,-1);
            if(this.gameState.board[x][y].hasMoveUpRight())
                this.processPieceFlip(x,y,1,1);
            if(this.gameState.board[x][y].hasMoveBottomLeft())
                this.processPieceFlip(x,y,-1,-1);
            if(this.gameState.board[x][y].hasMoveUpLeft())
                this.processPieceFlip(x,y,-1,1);
            
           
            this.gameState.board[x][y] = new Piece(this.gameState.turn,{X:x,Y:y},this);
            if(this.gameState.turn=='black')
                this.gameState.blackPieces++;
            else
                this.gameState.whitePieces++;
            
            this.endTurn();
        }
    }

    /**Goes through and flips the pieces in game from their current color to the opposite
     * 
     * @param {number} x 
     * @param {number} y 
     * @param {number} xDir 
     * @param {number} yDir 
     */
    processPieceFlip(x,y,xDir, yDir){
        x+=xDir; 
        y+=yDir;
        while((x>=0&&x<8)&&(y>=0&&y<8)){
            if(this.gameState.board[x][y] instanceof NullPiece || this.gameState.board[x][y].getColor()==this.gameState.turn)
                break;                
            
            this.gameState.board[x][y].flip();
            if(this.gameState.turn=='white'){
                this.gameState.whitePieces++;
                this.gameState.blackPieces--;
            }else{
                this.gameState.whitePieces--;
                this.gameState.blackPieces++;
            }
            x+=xDir; y+=yDir;
        }
    }

    /**
     * Processes at the end of each turn. Calls all callbacks
     * Finds and makes the move array for the next players turn
     * Game ends when two playerMove arrays have no moves
     */
    endTurn(){
        this.gameState.turn = this.gameState.turn=='white'?'black':'white';
        this.callBasicCallbacks(this.pieceCallbackArr);  
        this.callBasicCallbacks(this.onmoveCallback);  
        this.findPlayerMoves();
        
        //if(this.AI!=null)
        //    this.AI.makeMove(this.gameState);

        if(this.playerMoves.length==0){
            this.gameState.turn = this.gameState.turn=='white'?'black':'white';
            this.callBasicCallbacks(this.pieceCallbackArr);
            this.findPlayerMoves();

            if(this.playerMoves.length==0)
                this.onGameOver();
        //    else if(this.AI!=null)
        //        this.AI.makeMove(this.gameState);
            
        }
    }

    getAIMove(){
        this.AI.makeMove(this.gameState);
    }

    playerHasMoves(){
        return this.playerMoves!=0;
    }

    /**
     * tallies amount of pieces on each side and updates winner
     */
    onGameOver(){
        if(this.gameState.blackPieces==this.gameState.whitePieces)
            this.gameState.winner="draw";
        else if(this.gameState.blackPieces>this.gameState.whitePieces)
            this.gameState.winner="black";
        else
            this.gameState.winner="white";
        this.callBasicCallbacks(this.onWinCallback);            
    }
    
    getBoard(){
        return this.gameState.board;
    }

    setBoard(newBoard){
        this.gameState.board=newBoard;
    }

    /**
     * Sets the board back to a start state.
     */
    resetBoard(){
        let resetBoard = new Array();
        for(let x=0;x<8;x++) {
            let row = []
            for(let y=0;y<8;y++){
                if((y==3&&x==3)||(x==4&&y==4))
                    row.push(new Piece('white',{X:x,Y:y}, this));
                else if((y==3&&x==4)||(y==4&&x==3))
                    row.push(new Piece('black',{X:x,Y:y}, this));
                else
                    row.push(new NullPiece({X:x,Y:y}, this));
            }
            resetBoard.push(row)
        }    
        this.gameState.board = resetBoard;

        this.callBasicCallbacks(this.pieceCallbackArr)
        this.findPlayerMoves();
    }

    resetGame(){
        this.pieceCallbackArr=[];
        this.gameState = {
            turn: 'white',
            board: [],
            winner: 'none',
            whitePieces: 2,
            blackPieces: 2
        }
        this.resetBoard();
    }

    toString(){
        let result = [':) 0  1  2  3  4  5  6  7'];
        for(let i = 0; i<this.gameState.board.length;i++){
            let row = this.gameState.board[i];
            let rowResult = `${i} `;
            row.forEach(piece=>{
                rowResult = rowResult.concat(`[${piece.toString()}]`);
            });
            result.push(rowResult);
        }
        return result;
    }

    getPlayerMoves(){
        return this.playerMoves;
    }

    /**
     * Searches NullPieces for potential player moves
     */
    findPlayerMoves(){
        this.playerMoves = [];
        this.gameState.board.forEach(row=>{
            row.forEach(piece=>{
                if(piece instanceof NullPiece && piece.hasMove())
                    this.playerMoves.push(piece.getPos());
            })
        });
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

    callBasicCallbacks(arr){
        //console.log(this.gameState.turn);
        //let copy =  JSON.parse(JSON.stringify(this.gameState));

        arr.forEach(callback =>{
            callback(this.gameState);
        });
    }

    showMoves(callback){
        this.showMovesCallback.push(callback);
    }

    createShowedMovesAndCallback(){
        let moveVals = []
        this.playersMoves.forEach(move =>{
            moveVals.push({X:move.x,Y:move.y,type:'attack'});
        });
        
        this.showMovesCallback.forEach(callback =>{
            callback(this.gameState, moves);
        });
    }

}