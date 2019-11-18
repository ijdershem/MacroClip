/*
import Tile from "./tile";

export default class Snake {
    constructor(x,y) {
        // First tile of the snake's body
        this.head = [x,y];
        // Snake's body; array of arrays of coordinates
        this.body = [this.head];
        // Direction that the snake is to move; changed by user
        this.dir = '';
        // Array of coordinates that snake body is removed from each move
        this.rem = [];
        // Array of coordinates that snake body is added to each move
        this.add = [];
    }

    addDir(arr) {
        if (this.dir = 'up') {
            var add = [0.1];
        } else if (this.dir = 'down') {
            var add = [0,-1];
        } else if (this.dir = 'right') {
            var add = [-1,0];
        } else {
            var add = [1,0];
        }

        arr[0] += add[0];
        arr[1] += add[1];

        return arr;
    }

    // Increase length from 1 to 5 when first food is eaten
    firstFood() {
        if (this.dir = 'up') {
            var add = [0.1];
        } else if (this.dir = 'down') {
            var add = [0,-1];
        } else if (this.dir = 'right') {
            var add = [-1,0];
        } else {
            var add = [1,0];
        }

        for(var i=1;i<5;i++) {
            var newBod = getHead();
            newBod[0] += add[0] * i;
            newBod[1] += add[1] * i;
            this.body.push(newBod);
        }
    }

    // Change the direction
    setDir(d) {
        this.dir = d;
    }

    // Move function called every so often, moves tail in front of head
    move() {
        this.rem = [];
        this.add = [];

        var tail = this.body.pop();
        this.rem.push(tail);
        var newH = addDir(getHead());
        this.body.unshift(newH);
        this.add.push(newH);
    }

    // Get body of the snake
    getBody() {
        return this.body;
    }

    getHead() {
        return [this.head[0],this.head[1]];
    }

}

*/