import King from "./Pieces/King.js"
import Pawn from "./Pieces/Pawn.js"

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
        this.resetBoard();

        //game specific setup
        this.selectAblePieceCallbackArr =[];
        this.selectedPiece=undefined;
        this.selectAblePiece = [];
    }

    processInput(x,y){
        if(this.selectedPiece==undefined){
            this.selectedPiece = this.selectAblePiece.filter(function(element){
                element.X==x&&element.Y==y
            });
            if(this.selectedPiece!=undefined){
                this.updateMoveListAndDisplay();
            }
        }else if(this.playersMoves.length!=0){
            let testMove = this.playersMoves.filter(function(element){
                element.X==x&&element.Y==y;
            });
            if(testMove!=undefined){
                this.processMove(testMove[0]);
            }else{
                testMove = this.selectAblePiece.filter(function(element){
                    element.X==x&&element.Y==y;
                });
                if(testMove!=undefined){
                    this.selectedPiece=testMove;
                    this.updateMoveListAndDisplay();
                }
            }    
        }
    }

    processMove(moveData){
        if(moveData.type=='attack'){


        }else{

        }
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
            element.type='attack';
        });
        if(reduced>0){
            this.selectAblePiece=reduced;
        }
    }

    endTurn(){

        this.gameState.turn = this.gameState.turn=='white'?'black':'white';
        this.findSelectAblePieces();
    }

    resetBoard(){
        this.gameState.board=[];
        for(let y=0; y<8; y++)
            for(let x=0;x<8;x++){
                if(y<=2)
                    this.gameState.board.push(x%2==1?new Pawn({X:x,Y:y},'white',this):null);
                else if(y>=5)
                    this.gameState.board.push(x%2==1?new Pawn({X:x,Y:y},'black',this):null);
                else
                    this.gameState.board.push(null);
            }
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