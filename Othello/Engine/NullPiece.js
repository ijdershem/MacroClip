
export default class NullPiece{
    constructor(pos, game){
        this.pos = pos;
        this.turn = 'white';
        this.board = game.getBoard();
        game.pieceCallback((gameState)=>{
            this.board = gameState.board;
            this.turn = gameState.turn;
        });
    }

    toString(){
        return " ";
    }

    getPos(){
        return this.pos;
    }

    hasMoveRight(){
        return this.processHasMoves(1,0);
    }

    hasMoveLeft(){
        return this.processHasMoves(-1,0);
    }

    hasMoveUp(){
        return this.processHasMoves(0,1);
    }

    hasMoveDown(){
        return this.processHasMoves(0,-1);
    }

    hasMoveUpRight(){
        return this.processHasMoves(1,1);
    }

    hasMoveUpLeft(){
        return this.processHasMoves(-1,1);
    }

    hasMoveBottomLeft(){
        return this.processHasMoves(-1,-1);
    }

    hasMoveBottomRight(){
        return this.processHasMoves(1,-1);
    }

    processHasMoves(xDir, yDir){
        let x = this.pos.X+xDir;
        let y = this.pos.Y+yDir;
       
      //  if(this.pos.X==4&&this.pos.Y==2)
       //     console.log((x<0||x>=8||y<0||y>=8) || this.board[x][y] instanceof NullPiece);

        if((x<0||x>=8||y<0||y>=8) || this.board[x][y] instanceof NullPiece)
            return false;

        if(this.board[x][y].getColor()==this.turn)
            return false;
        
        while((x>=0&&x<8)&&(y>=0&&y<8)){
            if(this.board[x][y] instanceof NullPiece){
                return false;
            }
            if(this.board[x][y].getColor()==this.turn){
                return true;
            }
            x+=xDir; y+=yDir;
        }
        return false;
    }

    hasMove(){
        return (this.hasMoveDown()||this.hasMoveLeft()||this.hasMoveRight()||this.hasMoveUp()||
                this.hasMoveBottomLeft()||this.hasMoveBottomRight()||this.hasMoveUpLeft()||this.hasMoveUpRight());
    }
}