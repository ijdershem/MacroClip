
import Snake from "./snake.js";
// import Tile from "./tile.js";
// import GameState from "./gameState.js";

export default class Board {
    constructor() {
        // Vars setting up board
        this.size = 25;
        this.startx = 1;
        this.starty = 1;
        
        // Snake array
        this.snake = new Snake({x:1,y:1});

        // Vars for moving
        this.dir = '';

        // Vars for eating first food
        // True if player has eaten any food this game
        this.eaten = false;
        // Counter to increase snake from 1 to 5 when first food is eaten
        this.fFood = 0;
        
        // Score vars
        this.score = 0;
        this.foodScore = 300;
        this.moveScore = 5;

        // Callback arrays for move and lose events
        this.moveArr = [];
        this.loseArr = [];

        // Add food at a random place
        this.food = {x:0,y:0};
        this.addFood();
    }

    // GETTERS

    getSize() {
        return this.size;
    }

    getScore() {
        return this.score;
    }

    getHead() {
        return this.snake.getHead();
    }

    getLength() {
        return this.snake.length;
    }

    getSnake() {
        return this.snake.getSnake();
    }

    getFood() {
        return this.food;
    }

    reset() {
        this.snake = new Snake({x:this.startx,y:this.starty});
        this.food = null;
        this.addFood();
        this.score = 0;
        this.eaten = false;
        this.fFood = 0;
        this.dir = '';
    }

    // METHODS RELATED TO MOVE

    // Makes a move each time it is time to
    move() {
        // Check if the player has made the first move
        if (this.dir == '') {
            return;
        
        // Check if a move can be made and initiate move or lose
        } else {
            // Check if the move results in a loss
            if (this.checkLose()) {
                // Call lose callbacks
                for(let i=0;i<this.loseArr.length;i++) {
                    this.loseArr[i]();
                }

            // Move is legal; make it
            } else {
                this.snake.addHead(this.addDir());

                // Check if the new head is on food
                if (this.snake.checkColl(this.food)) {

                    // Add a new food and add food points to the score
                    this.addFood();
                    this.score += this.foodScore;

                    // Check if this is the first food that has been eaten
                    if (!this.eaten) {
                        this.fFood = 3;
                        this.eaten = true;
                    }

                // Pop tail off if there is no food, unless the first food counter is > 0
                } else {
                    if (this.fFood == 0) {
                        this.snake.popTail();
                    } else {
                        this.fFood--;
                    }
                }

                // Add move score 
                this.score += this.moveScore;

            }

        }
        
        // Call move callbacks
        for(let i=0;i<this.moveArr.length;i++) {
            this.moveArr[i]();
        }

    }

    // Checks if a move results in a loss
    checkLose() {
        // Find where new head would be
        let h = this.addDir();
        // Check if new head is off the board or collides with itself
        if (Math.max(h.x,h.y) >= this.size) {
            return true;
        } else if (Math.min(h.x,h.y) < 0) {
            return true;
        } else if (this.snake.checkColl(h)) {
            return true;
        }

        return false;
    }

    // Adds the direction to coordinates to find where the new coordinate is
    addDir() {
        let cor = {x:this.getHead().x,y:this.getHead().y};
        if (this.dir == 'up') {
            cor.y--;
        } else if (this.dir == 'down') {
            cor.y++;
        } else if (this.dir == 'right') {
            cor.x++;
        } else if (this.dir == 'left') {
            cor.x--;
        } else {
            return;
        }

        return cor;
    }

    // METHODS FOR CALLBACK WHEN GAME EVENTS HAPPEN

    onLose(callback) {
        this.loseArr.push(callback);
    }

    onMove(callback) {
        this.moveArr.push(callback);
    }

    // METHODS RELATED TO THE FOOD

    addFood() {
        let xCo = Math.floor(Math.random() * this.size);
        let yCo = Math.floor(Math.random() * this.size);
        let cor = {x:xCo,y:yCo};

        if ((this.food == cor) || (this.snake.checkColl({x:xCo,y:yCo}))) {
            if (this.addFood()) {
                return true;
            }
        } else {
            this.food = cor;
            return true;
        }

        return false;
    }

    // METHODS USED TO CHANGE DIRECTIONS

    // Changes this.dir
    setDir(d) {
        if ((this.dir == 'down' || this.dir == 'up') && (d == 'down' || d == 'up')) {
            return;
        } else if ((this.dir == 'left' || this.dir == 'right') && (d == 'left' || d == 'right')) {
            return;
        }
        this.dir = d;
    }

    // METHODS USED TO TEST BOARD

    // Print the board and its properties
    toString() {
        let str = '';
        for(let i=0;i<this.size;i++) {
            for(let j=0;j<this.size;j++) {
                if (this.snake.checkColl({x:j,y:i})) {
                    str += ' s ';
                } else if ((this.food.x == j) && (this.food.y == i)) {
                    str += ' f ';
                } else {
                    str += '   ';
                }
            }
            str += '\n';
        }

        return str;
    }
}