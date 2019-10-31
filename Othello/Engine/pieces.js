

class Piece{
    constructor(color, pos, game){
        this.color = color;
        this.pos = pos;
        this.board = game.getBoard();
        game.onMove((gameState)=>{
            this.board = getState.board;
        });
    }

    toString(){
        if(this.color='white')
            return "W";
        else   
            return "B";
    }

    flip(){
        this.color = this.color=='white'?'black':'white';
    }
}

class nullPiece{
    constructor(pos, game){
        this.pos = pos;
        this.turn = 'white';
        this.board = game.getBoard();
        game.onMove((gameState)=>{
            this.board = getState.board;
            this.turn = gameState.turn;
        });
    }

    toString(){
        return " ";
    }

    getMove(){
        return this.hasMove()?this.pos:null;
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
        let y = this.post.Y+yDir;
        if(this.board[x][y].getColor()==this.turn)
            return false;
        
        while((x>=0&&x<8)&&(y>=0&&y<8)){
            if(this.board[x][y] instanceof nullPiece){
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
                this.hasMoveBottomLeft()||this.hasMoveBottomRight()||this,this.hasMoveUpLeft()||this.hasMoveUpRight());
    }
}