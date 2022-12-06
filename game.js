export class TykTacToe {
    topLeft = [-1, -1];
    top = [-1, 0];
    topRight = [-1, 1];
    right = [0, 1];
    botRight = [1, 1];
    bot = [1, 0];
    botLeft = [1, -1];
    left = [0, -1];
    directions = [this.topLeft, this.top, this.topRight, this.right];
    straights = new Map([
        [this.topLeft, this.botRight],
        [this.top, this.bot],
        [this.topRight, this.botLeft],
        [this.right, this.left]
    ]);
    lastPlacement;

    constructor(rows, columns, grid) {
        this.rows = rows;
        this.columns = columns;
        if (grid) {
            this.grid = grid;
        } else {
            this.grid = this.generateGrid();
        }
    }

    generateGrid() {
        const grid = [];
        // for (iterator; end condition; what happens after each loop)
        for (let i = 0; i < this.rows; i++) {
            grid.push([]);
            for (let j = 0; j < this.columns; j++) {
                grid[i].push('-');
            }
        }
        return grid;
    }

    isNullOrUndefined(query) {
        return query === null || query === undefined;
    }

    areCoordinatesValid(coordinates) { // coordinates = null
        if (this.isNullOrUndefined(coordinates) || coordinates.length !== 2) {
            return false;
        }
        return true;
    }

    placeToken(coordinates, token) { // grid = 3x3 arr; coordinates [1,1]
        if (!this.areCoordinatesValid(coordinates) || !this.areCoordinatesInBounds(coordinates)) {
            return;
        }
        // coordinates is an array of 2 elements
        // we need to validate that in a new test
        //if coordinate is already a token then reject
        if (this.grid[coordinates[0]][coordinates[1]] !== '-') { // "is not a valid place to put a token"
            return;
        }
        // indices of arrays return a copy of the value
        this.grid[coordinates[0]][coordinates[1]] = token;
        // what is lastPlacement? return [1,1]

        this.lastPlacement = coordinates;
        // [coordinates[0], coordinates[1]]
    }

    areCoordinatesInBounds(coordinates) {
        if (coordinates[0] >= 0 && coordinates[0] < this.rows
            && coordinates[1] >= 0 && coordinates[1] < this.columns) {
            return true;
        }
        return false;
    }

    getLastPlacement() {
        return this.lastPlacement;
    }

    getGrid() {
        return this.grid;
    }

    addCoordinates(first, second) {
        const newY = first[0] + second[0];
        const newX = first[1] + second[1];
        return [newY, newX];
    }

    validateWinner() {
        const oldY = this.lastPlacement[0];
        const oldX = this.lastPlacement[1]
        const token = this.grid[oldY][oldX];
        for (let i = 0; i < this.directions.length; i++) {
            const direction = this.directions[i];
            // check the first direction (topLeft, top, topRight, right)
            // by adding the last token placed + the direction
            const checkTile = this.addCoordinates([oldY, oldX], direction);
            // check that direction is in bounds
            if (!this.areCoordinatesInBounds(checkTile)) {
                const newDirection = this.straights.get(direction);
                const oppositeTile = this.addCoordinates(newDirection, [oldY, oldX]);
                if (this.areCoordinatesInBounds(oppositeTile) && this.grid[oppositeTile[0]][oppositeTile[1]] !== token) {
                    continue;
                }
                const nextTile = this.addCoordinates(oppositeTile, newDirection);
                if (this.areCoordinatesInBounds(nextTile) && this.grid[nextTile[0]][nextTile[1]] === token) {
                    return true;
                }
                continue; // if it's not in bounds move on to the next direction
            }
            // check that that tile is ALSO the token
            if (this.grid[checkTile[0]][checkTile[1]] !== token) {
                continue; // if not, move on to the next direction
            }
            // so now we are in bounds and the direction we looked at was ALSO the token
            // so now we want to look in the OPPOSITE direction.
            // we do this using the map where the key returns a value that is the opp. direction
            const newDirection = this.straights.get(direction);
            const oppositeTile = this.addCoordinates(newDirection, [oldY, oldX]);
            if (this.areCoordinatesInBounds(oppositeTile)) {
                if (this.grid[oppositeTile[0]][oppositeTile[1]] === token) {
                    return true;
                }
            } else {
                const lastTile = this.addCoordinates(checkTile, direction);
                if (this.grid[lastTile[0]][lastTile[1]] === token) {
                    return true;
                }
            }
        }
        return false;
    }


}