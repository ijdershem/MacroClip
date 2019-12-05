
export default class GameState {
    constructor(x,y) {
        this.eaten = false;
        this.score = 0;
        this.firstFoodCount = 0;
    }

    // EATEN

    setEatenTrue() {
        this.eaten = true;
    }

    // SCORE

    incScore(pts) {
        this.score += pts;
        return this.score;
    }

    // FIRST FOOD COUNT

    eatFirstFood() {
        this.eaten = true;
        return this.firstFoodCount = 3;
    }

    decFirstFood() {
        return this.firstFoodCount--;
    }

    // GETTERS

    getScore() {
        return this.score;
    }

    getEaten() {
        return this.eaten;
    }

    getFirstFoodCount() {
        return this.firstFoodCount;
    }
}