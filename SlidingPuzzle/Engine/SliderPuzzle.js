
export default class SliderGame{
    constructor(size){
        this.gameState={
            board:[],
            numMoves:0,
            win:false
        }
        this.onMoveArr=[];
        this.onWinArr=[];
        this.size=size;
        this.inverseControl=false;
        this.emptySpot = this.size*this.size-1;
        this.initialRandomization=true;
        this.constructBoard(size);
    }

    getIndexValue(row,col){
        if(row>=this.size||col>=this.size||row<0||col<0)
            return null;
        return this.gameState.board[row+col*this.size];
    }

    getGameState(){
        return this.gameState;
    }

    constructBoard(size){
        this.initialRandomization=true;
        this.gameState.board = Array.from({length:size*size},(_, x)=>x+1);
        this.gameState.board[this.gameState.board.length-1]=' ';
        
        for(let i=0;i<this.size/2;i++){
            this.processInput(0)
            this.processInput(2)
        }
        
        for(let i = 0; i<65536;i++){
             this.processInput(Math.floor(Math.random()*4));
        }
        
        this.initialRandomization=false;
    }

    InverseControl(){
        this.inverseControl=!this.inverseControl;
    }

    processInput(direction){
        let successfullMove=false;
        if(this.gameState.win)
            return;
        switch(direction){
            case 'left':
            case 1:
                successfullMove=this.inverseControl?(this.move(-1,0)):(this.move(1,0));
                break;
            case 'right':
            case 2:
                successfullMove=this.inverseControl?(this.move(1,0)):(this.move(-1,0));;
                break;
            case 'up':
            case 3:
                successfullMove=this.inverseControl?(this.move(0,-1)):(this.move(0,1));;
                break;
            case 'down':
            case 0:
                successfullMove=this.inverseControl?(this.move(0,1)):(this.move(0,-1));;
                break;
        }
        if((!this.initialRandomization)&&successfullMove){
            this.gameState.numMoves++;
            this.callBasicCallbacks(this.onMoveArr);
            if(this.checkWin()){
                this.callBasicCallbacks(this.onWinArr);
            }
        }
    }

    checkWin(){
        if(this.gameState.board[this.gameState.board.length-1]==' '){
            for(let i = 1; i<this.gameState.board.length-1;i++){
                if(this.gameState.board[i-1]>this.gameState.board[i])
                    return false;
            }
            this.gameState.win=true; 
            return true; 
        }
        return false;
    }

    move(rowdir,coldir){
        let col = Math.floor(this.emptySpot/this.size);
        let row = this.emptySpot%this.size;
        coldir+=col;
        rowdir+=row;
        let value = this.getIndexValue(rowdir,coldir);
        if(value==null)
            return false;
        this.emptySpot=coldir*this.size+rowdir;
        this.gameState.board[rowdir+coldir*this.size]=this.gameState.board[row+col*this.size];
        this.gameState.board[row+col*this.size]=value;
        return true;
    }

    toString(){
        let string = '';
        for(let col=0;col<this.size;col++){
            for(let row=0;row<this.size;row++){
                string=string.concat(`[${this.getIndexValue(row,col)}]`);
            }
            string=string.concat('\n');
        }
        return string;
    }

    /**
     * All callback methods 
     * */ 
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