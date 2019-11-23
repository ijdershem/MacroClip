
class AbstractPiece{

    constructor(position, color, game){
        this.position=position;
        this.color=color;
        this.game=game;
        this.moveList=[];
       this.game.pieceCallback(this.resetEndOfTurn());
    }

    resetEndOfTurn(){
        this.moveList=[];
    }

    moveSearch(board, x, y, xDir, yDir){
        x+=xDir;
        y+=yDir;
        if(!(x>=0&&x<8&&y>=0&&y<8)){
            return undefined;
        }
        if(board[x][y]==null){
            return {
                moveX: x,
                moveY: y,
                type: 'move',
                posX: this.position.X,
                posY: this.position.Y
            }
        }else if(board[x][y].getColor()==this.color){
            return undefined;
        }else if((x+xDir>=0&&x+xDir<8&&y+yDir>=0&&y+yDir<8)&&board[x+xDir][y+yDir]==null){
            return{
                moveX: x+xDir,
                moveY: y+yDir,
                type: 'attack',
                posX: this.position.X,
                posY: this.position.Y
            }
        }
        return undefined;
    }

    hasAttack(){
        if(!this.hasMove()){
            return false;
        }
        this.moveList.forEach(element=>{
            if(element.type='attack'){
                return true;
            }
        });
        return false;
    }

    getMoveList(){
        let list = this.moveList.filter(element=>{
            element.type=='attack'
        })
        return list.length==0?this.moveList:list;
    }

    setPosition(pos){
        this.position=pos;
    }

    getPosition(){
        return this.position;
    }

    getColor(){
        return this.color;
    }
}