
import Piece from "./pieces";
import nullPiece from "./pieces";

export default class Othello{
    constructor(){
        this.gameState = {
            turn: 'white',
            board: [],
            winner: 'none',
        }
        resetBoard();
        this.onmoveCallback=[];
        this.removeShowMovesCallback=[];
        this.showMovesCallback=[];
        this.onWinCallback=[];
        this.pieceCallbackArr=[];
        this.playersMoves=[];
    }

    /**Main input for playing the game. Will process if the move is valid 
     * based on past input and values
     * 
     * @param {number} x 
     * @param {number} y 
     */
    processInput(x,y){
        let validInput = false;
        for(element in playerMoves)
            if(element.X == x && element.Y==y){
                validInput = true;
                break;
            }

        if(validInput){
            this.gameState.board[x][y] = new Piece(this.gameState.turn,{X:x,Y:y},this);

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
        x+=xDir; y+=yDir;
        while((x>=0&&x<8)&&(y>=0&&y<8)){
            if(this.board[x][y] instanceof nullPiece || this.board[x][y].getColor()==this.gameState.turn)
                break;                
            
            this.board[x][y].flip();
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
        this.playerMoves = [];
        this.gameState.board.forEach(row=>{
            row.forEach(piece=>{
                if(piece instanceof nullPiece && piece.hasMove())
                    this.playersMoves.append(piece.getMove());
            })
        });

        if(this.playerMoves.length==0){
            this.gameState.turn = this.gameState.turn=='white'?'black':'white';
            this.callBasicCallbacks(this.pieceCallbackArr);
            this.playerMoves = [];
            this.gameState.board.forEach(row=>{
                row.forEach(piece=>{
                    if(piece instanceof nullPiece && piece.hasMove())
                        this.playersMoves.append(piece.getMove());
                })
            });
            if(this.playerMoves.length==0){
                this.onGameOver();
            }
        }
    }

    /**
     * tallies amount of pieces on each side and updates winner
     */
    onGameOver(){
        let blackPieces=0;
        let whitePieces=0;
        for(let y=0;y<8;y++)
            for(let x=0;x<8;x++)
                if(this.gameState.board[x][y].getColor()=='white')
                    whitePieces++;
                else
                    blackPieces++;

        this.gameState.winner = blackPieces==whitePieces?'draw':blackPieces>whitePieces?'black':'white';
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
        for(let y=0;y<8;y++) 
            for(let x=0;x<8;x++){
                if((x==3&&y==3)||(x==4&&y==4))
                    resetBoard.append(new Piece('white',{X:x,Y:y}, this));
                else if((x==3&&y==4)||(x==4&&y==3))
                    resetBoard.append(new Piece('black',{X:x,Y:y}, this));
                else
                    resetBoard.append(new nullPiece({X:x,Y:y}, this));
            }
        gameState.board = resetBoard;
    }

    resetGame(){
        this.pieceCallbackArr=[];
        this.gameState = {
            turn: 'white',
            board: [],
            winner: 'none',
        }
        resetBoard();
    }

    toString(){
        let result = "";
        gameState.board.forEach(row => {
            row.forEach(piece=>{
                result = result.append(`[${piece.toString}]`);
            });
        });
        return result;
    }

    /**
    *   Callback options with associated call process functions 
    *   Same for all game Implementations
    */
    onWin(callback){
        this.onWinCallback.append(callback);
    }

    pieceCallback(callback){
        this.pieceCallbackArr.append(callback);
    }

    onMove(callback){
        this.onmoveCallback.append(callback);
    }

    removeShowMoves(callback){
        this.removeShowMovesCallback.append(callback);
    }

    callBasicCallbacks(arr){
        arr.forEach(callback =>{
            callback(this.gameState);
        });
    }

    showMoves(callback){
        this.showMovesCallback.append(callback);
    }

    createShowedMovesAndCallback(){
        let moveVals = []
        this.playersMoves.forEach(move =>{
            moveVals.append({X:move.x,Y:move.y,type:'attack'});
        });
        
        this.showMovesCallback.forEach(callback =>{
            callback(this.gameState, moves);
        });
    }

}