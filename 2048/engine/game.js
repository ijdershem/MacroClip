// import { isNullOrUndefined } from "util";

/*
Add your code for Game here
 */
export default class Game {

    constructor(dimensions) {

        this.gameState = {
            board: [],
            score: 0,
            won: false,
            over: false,
        };

        this.moveFuncs = [];
        this.loseFuncs = [];
        this.winFuncs = [];

        this.size = dimensions;
        this.gb = [];
    
        this.setupNewGame()
    }

    // Resets the game
    setupNewGame() {
        let starter1 = Math.floor(Math.random()*(this.size*this.size));
        let starter2 = Math.floor(Math.random()*(this.size*this.size));
        while (starter2 === starter1) {
            starter2 = Math.floor(Math.random()*(this.size*this.size));
        }

        this.gameState.board = [];
    
        for (let i=0;i<(this.size*this.size);i++) {
            if (i === starter1 || i === starter2) {
                if (Math.random() > .1) {
                    this.gameState.board.push(2);
                } else {
                    this.gameState.board.push(4);
                }
            } else {
                this.gameState.board.push(0);
            }   
        }
    
        this.gameState.score = 0;
        this.gameState.won = false;
        this.gameState.over = false;

        // creating 2d array of gameboard
        this.gb = [];
        let row = [];
        for (let i=0;i<this.size; i++) {
            for (let j=0;j<this.size; j++) {
                row[j] = this.gameState.board[(i*this.size)+j];
            }
            this.gb[i] = row;
            row = [];
        }
    };
    
    
    // given a gamestate it loads a board in the state of the game state
    loadGame(gs) {
        this.gameState = gs;

        // resetting 2D array
        this.gb = [];
        let row = [];
        for (let i=0;i<this.size; i++) {
            for (let j=0;j<this.size; j++) {
                row[j] = this.gameState.board[(i*this.size)+j];
            }
            this.gb[i] = row;
            row = [];
        }
    };
    
    // give left, right, up, or down it moves the pieces in the corresponding direction
    move(direction) {
        let validMove = false;
        let size = this.size;
        let win = false;
        let comboVal = 0;

        if (direction === "up") {
            // go through each row
            loop1:
            for (let i=0; i<size; i++) {
                let limit = 0;

                // go through each index of that row starting from the right
                loop2:
                for (let j=0; j<size; j++) {
                    // if a non-zero elt is found:
                    if (this.gb[j][i] !== 0) {
                        // go back to the right from that element
                        loop3:
                        for (let k=j-1; k>=limit; k--) {
                            // if a preceding non-zero elt is found:
                            if (this.gb[k][i] != 0) {
                                // see if they are equal:
                                if (this.gb[j][i] == this.gb[k][i]) {
                                    // if they are then combine

                                    // console.log(
                                    //         "combined elements "+this.gb[k][i].toString()+
                                    //         " at ("+k.toString()+", "+i.toString()+
                                    //         ") and "+this.gb[j][i].toString()+" at ("+
                                    //         j.toString()+", "+i.toString()+")"
                                    //     )

                                    this.gb[k][i] = this.gb[k][i]*2;
                                    this.gb[j][i] = 0;
                                
                                    limit = k+1;
                                    validMove = true;
                                    if (this.gb[k][i] == 2048) {
                                        win = true;
                                    }
                                    comboVal += this.gb[k][i];
                                    continue loop2;

                                // if they aren't equal:
                                } else {
                                    // put the left most next to the right most

                                    if ((k+1) != j) {
                                        // console.log(
                                        //     "moving "+this.gb[j][i].toString()+
                                        //     " at ("+j.toString()+", "+i.toString()+
                                        //     ") to "+this.gb[k+1][i].toString()+" at ("+
                                        //     (k+1).toString()+", "+i.toString()+")"
                                        // )
                                    
                                        this.gb[k+1][i] = this.gb[j][i];
                                        this.gb[j][i] = 0;

                                        limit = k;
                                        validMove = true;
                                    }
                                
                                    continue loop2;
                                }
                            }

                            // if no preceding elt is found:
                            if (k-1 < limit && this.gb[k][i] == 0) {
                                // put elt at end of row
                                this.gb[k][i] =  this.gb[j][i];
                                this.gb[j][i] = 0;
                                validMove = true;
                            }
                        }
                    }
                }
            }
        }
    
        if (direction === "down") {
            // go through each column
            loop1:
            for (let i=0; i<size; i++) {
                // go through each index of that row starting from the right
                let limit = size;
            loop2:
                for (let j=size-1; j>=0; j--) {
                    // if a non-zero elt is found:
                    if (this.gb[j][i] !== 0) {
                        // go back to the right from that element
                    loop3:
                        for (let k=j+1; k<limit; k++) {
                            // if a preceding non-zero elt is found:
                            if (this.gb[k][i] != 0) {
                                // see if they are equal:
                                if (this.gb[j][i] == this.gb[k][i]) {
                                    // if they are then combine

                                    // console.log(
                                    //         "combined elements "+this.gb[k][i].toString()+
                                    //         " at ("+k.toString()+", "+i.toString()+
                                    //         ") and "+this.gb[j][i].toString()+" at ("+
                                    //         j.toString()+", "+i.toString()+")"
                                    //     )

                                    this.gb[k][i] = this.gb[k][i]*2;
                                    this.gb[j][i] = 0;
                                    
                                    limit = k;
                                    comboVal += this.gb[k][i];
                                    if (this.gb[k][i] == 2048) {
                                        win = true;
                                    }
                                    validMove = true;
                                    
                                    continue loop2;

                                // if they aren't equal:
                                } else {
                                    // put the left most next to the right most

                                    if ((k-1) != j) {
                                        // console.log(
                                        //     "moving "+this.gb[j][i].toString()+
                                        //     " at ("+j.toString()+", "+i.toString()+
                                        //     ") to "+this.gb[k-1][i].toString()+" at ("+
                                        //     (k-1).toString()+", "+i.toString()+")"
                                        // )
                                        
                                        this.gb[k-1][i] = this.gb[j][i];
                                        this.gb[j][i] = 0;
                                        limit = k;
                                        validMove = true;
                                    }
                                    
                                    continue loop2;
                                }
                            }

                            // if no preceding elt is found:
                            if (k+1 == limit && this.gb[k][i] == 0) {
                                // put elt at end of row
                                this.gb[k][i] =  this.gb[j][i];
                                this.gb[j][i] = 0;
                                validMove = true;
                            }
                        }
                    }
                }
            }
        }
    
        if (direction === "left") {
            // go through each row
            loop1:
            for (let i=0; i<size; i++) {
                let limit = 0;

                // go through each index of that row starting from the right
                loop2:
                for (let j=0; j<size; j++) {
                    // if a non-zero elt is found:
                    if (this.gb[i][j] !== 0) {
                        // go back to the right from that element
                        loop3:
                        for (let k=j-1; k>=limit; k--) {
                            // if a preceding non-zero elt is found:
                            if (this.gb[i][k] != 0) {
                                // see if they are equal:
                                if (this.gb[i][j] == this.gb[i][k]) {
                                    // if they are then combine

                                    // console.log(
                                    //         "combined elements "+this.gb[i][k].toString()+
                                    //         " at ("+i.toString()+", "+k.toString()+
                                    //         ") and "+this.gb[i][j].toString()+" at ("+
                                    //         i.toString()+", "+j.toString()+")"
                                    //     )

                                    this.gb[i][k] = this.gb[i][k]*2;
                                    this.gb[i][j] = 0;
                                
                                    limit = k+1;
                                    validMove = true;
                                    comboVal += this.gb[i][k];
                                    if (this.gb[i][k] == 2048) {
                                        win = true;
                                    }
                                    continue loop2;

                                // if they aren't equal:
                                } else {
                                    // put the left most next to the right most

                                    if ((k+1) != j) {
                                        // console.log(
                                        //     "moving "+this.gb[i][j].toString()+
                                        //     " at ("+i.toString()+", "+j.toString()+
                                        //     ") to "+this.gb[i][k+1].toString()+" at ("+
                                        //     i.toString()+", "+(k+1).toString()+")"
                                        // )
                                    
                                        this.gb[i][k+1] = this.gb[i][j];
                                        this.gb[i][j] = 0;

                                        limit = k;
                                        validMove = true;
                                    }
                                
                                    continue loop2;
                                }
                            }

                            // if no preceding elt is found:
                            if (k-1 < limit && this.gb[i][k] == 0) {
                                // put elt at end of row
                                this.gb[i][k] =  this.gb[i][j];
                                this.gb[i][j] = 0;
                                validMove = true;
                            }
                        }
                    }
                }
            }
        }
    
        if (direction === "right") {
            // go through each row
        loop1:
            for (let i=0; i<size; i++) {
                // go through each index of that row starting from the right
                let limit = size;
            loop2:
                for (let j=size-1; j>=0; j--) {
                    // if a non-zero elt is found:
                    if (this.gb[i][j] !== 0) {
                        // go back to the right from that element
                    loop3:
                        for (let k=j+1; k<limit; k++) {
                            // if a preceding non-zero elt is found:
                            if (this.gb[i][k] != 0) {
                                // see if they are equal:
                                if (this.gb[i][j] == this.gb[i][k]) {
                                    // if they are then combine

                                    // console.log(
                                    //         "combined elements "+this.gb[i][k].toString()+
                                    //         " at ("+i.toString()+", "+k.toString()+
                                    //         ") and "+this.gb[i][j].toString()+" at ("+
                                    //         i.toString()+", "+j.toString()+")"
                                    //     )

                                    this.gb[i][k] = this.gb[i][k]*2;
                                    this.gb[i][j] = 0;
                                    
                                    limit = k;
                                    validMove = true;
                                    comboVal += this.gb[i][k];
                                    if (this.gb[i][k] == 2048) {
                                        win = true;
                                    }
                                    continue loop2;

                                // if they aren't equal:
                                } else {
                                    // put the left most next to the right most

                                    if ((k-1) != j) {
                                        // console.log(  console.log(
                                        //     "moving "+this.gb[i][j].toString()+
                                        //     " at ("+i.toString()+", "+j.toString()+
                                        //     ") to "+this.gb[i][k-1].toString()+" at ("+
                                        //     i.toString()+", "+(k-1).toString()+")"
                                        // )
                                        
                                        this.gb[i][k-1] = this.gb[i][j];
                                        this.gb[i][j] = 0;

                                        limit = k;
                                        validMove = true;
                                    }
                                    
                                    continue loop2;
                                }
                            }

                            // if no preceding elt is found:
                            if (k+1 == limit && this.gb[i][k] == 0) {
                                // put elt at end of row
                                this.gb[i][k] =  this.gb[i][j];
                                this.gb[i][j] = 0;
                                validMove = true;
                            }
                        }
                    }
                }
            }
        }
        
        // update game score
        this.gameState.score += comboVal;
        comboVal = 0;

        if (validMove) {

            // checking if the move resulted in a win
            if (win) {
                this.gameState.won = true;
                for (let i=0;i<this.winFuncs.length; i++) {
                    this.winFuncs[i](this.gameState);
                }
            }
            // finding candidates for new tiles
            let emptySpaces = [];
            for (let i=0; i<this.size; i++) {
                for (let j=0; j<this.size; j++) {
                    if (this.gb[i][j] === 0) {
                        emptySpaces.push([i,j]);
                    }
                }
            }
            
            let newTile1 = Math.floor(Math.random()*emptySpaces.length);

            if (Math.random() > .1) {
                this.gb[emptySpaces[newTile1][0]][emptySpaces[newTile1][1]] = 2;
            } else {
                this.gb[emptySpaces[newTile1][0]][emptySpaces[newTile1][1]] = 4;
            }
            
            
            // Check if the game is over
            if (!this.isMoveAvailable()) {
                this.gameState.over = true;
                for (let i=0; i<this.loseFuncs.length; i++) {
                    this.loseFuncs[i](this.gameState);
                }
            }

            // print the board and the score
            this.print2DBoard();
            // console.log(this.gameState.score);

        // if the user tries to move an in invalid direction
        } else {
            // console.log("Invalid Move, try one of the other three.");
        }
        
        // update gameState
        this.TwoDeeToOneDee();
        for (let i=0; i<this.moveFuncs.length; i++) {
            this.moveFuncs[i](this.gameState);
        }
    };
    
    // prints an ascii version of the game to the console
    toString() {
        let row = [];
        for (let i=0; i<this.size; i++) {
            for (let n=0; n<this.size; n++) {
                row.push(this.gameState.board[(i*this.size)+n]);
            }
            // console.log(row.toString());
            row = [];
        }
    };
    
    // registers a callback function as a listener to the 'move' event, passing in the game's current
    // game state as an argument to the given callback funciton
    onMove(callback) {
        this.moveFuncs.push(callback);
    };
    
    // registers the given callback funciton as a listener to the 'win' event, passing in the game's current
    // game state as argument to the given callback funciton
    onWin(callback) {
        this.winFuncs.push(callback);
    };
    
    
    // same as above except only registers on loss and listens to the 'move' event
    onLose(callback) {
        this.loseFuncs.push(callback);
    };
    
    // Returns game state
    getGameState() {
        return this.gameState;
    };
    
    // helper functions

    // print out the 2D array version of the board
    print2DBoard() {
        let row = [];
        for (let i=0;i<this.size;i++) {
            for (let j=0;j<this.size;j++) {
                row.push(this.gb[i][j]);
            }
            // console.log(row);
            row = [];
        }

        // leave an empty space to separate prints
        // console.log("");
    }

    // convert 2D array to 1D and update gameState
    TwoDeeToOneDee()  {
        let OneDeeIdx = 0;
        for (let i=0; i<this.size;i++) {
            for (let j=0; j<this.size;j++) {
                this.gameState.board[OneDeeIdx] = this.gb[i][j];
                OneDeeIdx++;
            }
        }
    }

    // checking if any possible moves are left
    isMoveAvailable() {
        // loop through whole board
        for (let i=0;i<this.size;i++) {
            for (let j=0;j<this.size;j++) {

                // if any spot on board is a 0 then return true
                if (this.gb[i][j] == 0) {
                    return true;

                // if two equal tiles are next to each other horizontally, return true
                }
                
                if (j+1<this.size) {
                    if (this.gb[i][j+1] == this.gb[i][j]) {
                        return true;
                    }

                // if two equal tiles are next to each other vertically, return true
                }
                
                if (i+1<this.size) {
                    if (this.gb[i+1][j] == this.gb[i][j]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
