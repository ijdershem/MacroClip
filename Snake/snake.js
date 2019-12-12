
export default class Snake {
    constructor(c) {
        this.snake = [c];
    }

    // Adds a new head to the snake at index 0 and returns it
    addHead(c) {
        return this.snake.unshift(c);
    }

    // Pops last item in snake array (the tail) and returns it
    popTail() {
        return this.snake.pop();
    }

    checkColl(c) {
        let cx = c.x;
        let cy = c.y;

        for(let i=0;i<this.snake.length;i++) {
            if ((cx == this.snake[i].x) && (cy == this.snake[i].y)) {
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