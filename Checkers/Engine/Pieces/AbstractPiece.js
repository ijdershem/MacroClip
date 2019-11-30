
export default class AbstractPiece{

    constructor(position, color, game){
        this.position=position;
        this.color=color;
        this.game=game;
        this.moveList=[];
        this.game.pieceCallback(()=>{this.resetEndOfTurn()});
        this.killed=false;
    }

    createSelectablePiece(){
        if(this.hasMove())
        this.game.addSelectAblePiece({
            X: this.position.X,
            Y: this.position.Y,
            type: this.hasAttack()?'attack':'move'
        });
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
        
        if(board[y][x]==null){ 
            return {
                moveX: x,
                moveY: y,
                type: 'move',
                posX: this.position.X,
                posY: this.position.Y
            }
        }
        if(board[y][x].getColor()==this.color){
            return undefined;
        }
        if((x+xDir>=0&&x+xDir<8&&y+yDir>=0&&y+yDir<8)&&board[y+yDir][x+xDir]==null){
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
        if(!this.hasMove())
            return false;
        for(let i=0;i<this.moveList.length;i++)
            if(this.moveList[i].type=='attack')
                return true;
        return false;
    }

    getMoveList(){
        let list = this.moveList.filter(element=>{
            return element.type=='attack'
        })
        return list.length==0?this.moveList:list;
    }

    kill(){
        this.killed=true;
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