
export default class C4AI{

    constructor(game){
        this.game=game;
        this.turn = 'red';
        this.moveFound=false;
        this.move=-1;
    }

    makeMove(){
        let gs = this.game.getGameState();
        if(gs.turn!=this.turn){
            return;
        }

        if(gs.redTiles+gs.blackTiles>=5){
            this.findWin(gs);
            this.blockEnemyWin(gs);
        }
        if(Math.random()<0.7){
            this.moveAdjacent(gs);
        }
        this.randomMove(gs);

        this.moveFound=false;
        this.game.processInput(this.move);
    }

    findWin(gs){
        for(let col=0;col<7;col++){
            let row=0;
            while(gs.board[col][row]!==null)
                row++;
            if(gs.board[col][row]==null&&this.searchNull(col,row,this.turn,gs)){
                this.move=col;
                this.moveFound=true;
                return;
            }
        }
        
    }

    blockEnemyWin(gs){
        if(this.moveFound)
            return
       
        for(let col=0;col<7;col++){
            let row=0;
            while(gs.board[col][row]!==null)
                row++;
            if(gs.board[col][row]==null&&this.searchNull(col,row,'black',gs)){
                this.move=col;
                this.moveFound=true;
                return;
            }
        }
    }

    moveAdjacent(gs){
        if(this.moveFound)
            return
        
        let moves = [];
       
        for(let col=0;col<7;col++){
            if(gs.board[col][5]!==null)
                continue;
            let row=0;
            while(gs.board[col][row]!==null)
                row++;
            if(this.checkAdjacent(row,col,gs)){
                moves.push(col);
            }
        }
        if(moves.length!=0){
            this.moveFound=true;
            this.move=moves[Math.floor(Math.random()*moves.length)];
        }
    }

    checkAdjacent(row,col,gs){
        if(row-1>=0&&gs.board[col][row-1]==this.turn)
            return true;
        if(col-1>=0&&gs.board[col-1][row]==this.turn)
            return true;
        if(row+1<6&&gs.board[col][row+1]==this.turn)
            return true;
        if(col+1<7&&gs.board[col+1][row]==this.turn)
            return true;
        if(col-1>=0&&row-1>=0&&gs.board[col-1][row-1]==this.turn)
            return true;
        if(col+1<7&&row+1<6&&gs.board[col+1][row+1]==this.turn)
            return true;
        if(col-1>=0&&row+1<60&&gs.board[col-1][row+1]==this.turn)
            return true;
        if(col+1<7&&row-1>=0&&gs.board[col+1][row-1]==this.turn)
            return true;
        return false;
    }


    randomMove(gs){
        if(this.moveFound)
            return
        let rng = [];
        for(let i=0;i<6;i++){
            if(gs.board[i][5]===null){
                rng.push(i);
            }
        }
        this.move=rng[Math.floor(Math.random()*rng.length)];
    }

    searchNull(x,y,lf,gs){
        return this.searchDir(1,0,x,y,lf,gs)||
        this.searchDir(1,1,x,y,lf,gs)||
        this.searchDir(0,1,x,y,lf,gs)||
        this.searchDir(1,-1,x,y,lf,gs);
    }

    searchDir(xdir,ydir,x,y,lf,gs){
        let found=0;
        let fx = x+xdir;
        let fy = y+ydir;
        while(fx>=0&&fx<7&&fy<6&&fy>=0){
            if(gs.board[fx][fy]==lf){
                found++;
            }else{
                break;
            }
            fx=fx+xdir;
            fy=fy+ydir;
        }
        fx=x-xdir
        fy=y-ydir
        while(fx>=0&&fx<7&&fy<6&&fy>=0){
            if(gs.board[fx][fy]==lf){
               found++;
            }else{
                break;
            }
            fx=fx-xdir
            fy=fy-ydir
        }
        return found>=3;
    }
}