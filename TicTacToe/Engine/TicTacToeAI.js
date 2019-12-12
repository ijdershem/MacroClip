
export default class AI{
    constructor(game,turn){
        this.game=game;
        this.turn=turn==undefined?'o':turn;
        this.moveFound=false;
        this.move={X:-1,Y:-1};
    }

    switchTurn(){
        this.turn=this.turn=='x'?'o':'x';
    }

    makeMove(){
        let gs = this.game.getGameState();
        if(gs.turn!=this.turn){
            return;
        }
        if(this.turn=='x'&&gs.xPieces==0){
            this.moveFound=true;
            this.move={X:Math.random()>0.5?0:2,Y:Math.random()>0.5?0:2}
        }
        if(this.turn=='o'&&gs.xPieces==1&&gs.board[1][1]==null){
            this.moveFound=true;
            this.move={X:1,Y:1};
        }

        if(gs.xPieces+gs.oPieces>=3){
            this.findWin(gs);
            this.findEnemyNearVictory(gs);
        }
        this.randomMove(gs);
        this.moveFound=false;
        this.game.processInput(this.move.X,this.move.Y);
    }

    findEnemyNearVictory(gs){
        if(this.moveFound)
            return  
        for(let i =0;i<3;i++)
            for(let j=0;j<3;j++){
                if(gs.board[i][j]==null&&this.searchNull(i,j,this.turn=='x'?'o':'x',gs)){
                    this.move.X=j;
                    this.move.Y=i;
                    this.moveFound=true;
                    return;
                }
            }
    }

    findWin(gs){
        for(let i =0;i<3;i++)
            for(let j=0;j<3;j++){
                if(gs.board[i][j]==null&&this.searchNull(i,j,this.turn,gs)){
                    this.move.X=j;
                    this.move.Y=i;
                    this.moveFound=true;
                    return;
                }
            }    
        
    }

    randomMove(gs){
        if(this.moveFound)
            return 
        let possibleMoves=[];
        for(let i =0;i<3;i++)
        for(let j=0;j<3;j++){
            if(gs.board[i][j]==null){
                possibleMoves.push({X:j,Y:i})
            }
        }
        this.move=possibleMoves[Math.floor(Math.random()*possibleMoves.length)]
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
        while(fx>=0&&fx<=2&&fy<=2&&fy>=0){
            if(gs.board[fx][fy]==lf){
                found++;
            }
            fx=fx+xdir;
            fy=fy+ydir;
        }
        fx=x-xdir
        fy=y-ydir
        while(fx>=0&&fx<=2&&fy<=2&&fy>=0){
            if(gs.board[fx][fy]==lf){
               found++;
            }
            fx=fx-xdir
            fy=fy-ydir
        }
        return found==2;
    }
}