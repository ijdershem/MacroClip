
export default class Tile {
    constructor() {
        this.snake = false;
        this.food = false;
    }

    // Return an id
    getId() {
        if (this.snake) {
            var id = 's';
        } else if (this.food) {
            var id = 'f';
        } else {
            var id = 'n';
        }

        return id;
    }

    // Return true if the tile has food
    hasFood() {
        return this.food;
    }

    // Return true if the tile has a snake
    hasSnake() {
        return this.snake;
    }

    // Change hasSnake to true
    addSnake() {
        this.snake = true;
    }

    // Change hasSnake to false
    remSnake() {
        this.snake = false;
    }

    // Change hasFood to true
    addFood() {
        this.food = true;
    }

    // Change hasFood to false
    remFood() {
        this.food = false;
    }

    // String for testing
    toString() {
        return ' ' + this.getId() + ' ';
    }
}