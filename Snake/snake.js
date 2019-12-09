
export default class Snake {
    constructor(c) {
        this.snake = [c];
        console.log('head in snake: ');
        console.log(this.snake[0]);
    }

    // Adds a new head to the snake at index 0 and returns it
    addHead(c) {
        return this.snake.unshift(c);
    }

    // Pops last item in snake array (the tail) and returns it
    popTail() {
        return this.snake.pop();
    }

    // checkColl(c) {
    //     let b = this.snake.includes(c);
    //     console.log('checkColl, result: ' + b);
    //     console.log('c is ' + c.x + ', ' + c.y);
    //     console.log('head is ' + this.snake[0].x + ', ' + this.snake[0].y);

    //     return b;
    //     // return this.snake.includes(c);
    // }

    checkColl(c) {
        let cx = c.x;
        let cy = c.y;

        console.log('check coll, snake is at ' + cx + ', ' + cy);

        for(let i=0;i<this.snake.length;i++) {
            if ((cx == this.snake[i].x) && (cy == this.snake[i].y)) {
                console.log('collision at ' + this.snake[i].x + ', ' + this.snake[i].y);
                return true;
            }
        }

        return false;
    }

    // GETTERS

    getSnake() {
        return this.snake;
    }

    getLength() {
        return this.snake.length;
    }

    getHead() {
        return this.snake[0];
    }
}