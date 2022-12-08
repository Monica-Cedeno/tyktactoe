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
    oppositeDirections = new Map([
        [this.topLeft, this.botRight],
        [this.top, this.bot],
        [this.topRight, this.botLeft],
        [this.right, this.left]
    ]);
    lastPlacement;

    constructor(length, grid) {
        // the grid is always square
        this.gridLength = length;
        if (Array.isArray(grid) && grid.length > 0 && grid.length === grid[0].length) {
            this.grid = grid;
        } else {
            this.grid = this.generateGrid();
        }
    }

    generateGrid() {
        const grid = [];
        for (let i = 0; i < this.gridLength; i++) {
            grid.push([]);
            for (let j = 0; j < this.gridLength; j++) {
                grid[i].push('-');
            }
        }
        return grid;
    }

    isNullOrUndefined(query) {
        return query === null || query === undefined;
    }

    areCoordinatesValid(coordinates) {
        return !(this.isNullOrUndefined(coordinates) || coordinates.length !== 2);
    }

    placeToken(coordinates, token) {
        if (!this.areCoordinatesValid(coordinates) || !this.areCoordinatesInBounds(coordinates)) {
            return;
        }
        // coordinates is an array of 2 elements
        // if coordinate is already a token then reject
        if (!this.doesTileContainToken(coordinates, '-')) { // only '-' is a valid tile to place a token
            return;
        }

        this.grid[coordinates[0]][coordinates[1]] = token;

        this.lastPlacement = coordinates;
    }

    areCoordinatesInBounds(coordinates) {
        return coordinates[0] >= 0 && coordinates[0] < this.gridLength
            && coordinates[1] >= 0 && coordinates[1] < this.gridLength;
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

    doesTileContainToken(tileToCheck, token) {
        return this.grid[tileToCheck[0]][tileToCheck[1]] === token;
    }

    doesDirectionHaveWinner(direction, token) {
        // we test the direction or the opposite of that direction in sequence
        const possibleDirections = [direction, this.oppositeDirections.get(direction)];
        const requiredTokens = this.gridLength - 1; // a square grid; minus one because we already have the original token
        let successiveTokens = 0; // if this matches the requiredTokens, the last player made a winning move
        let currentTile;
        for (const possibleDirection of possibleDirections) {
            currentTile = this.lastPlacement;
            while (successiveTokens < requiredTokens) {
                const nextTile = this.addCoordinates(possibleDirection, currentTile);
                if (!this.areCoordinatesInBounds(nextTile)) {
                    break;
                }
                if (!this.doesTileContainToken(nextTile, token)) {
                    return false;
                }
                successiveTokens += 1;
                currentTile = nextTile;
            }
        }
        return successiveTokens === requiredTokens;
    }

    hasLastPlayerWon() {
        const oldY = this.lastPlacement[0];
        const oldX = this.lastPlacement[1];
        const token = this.grid[oldY][oldX];
        for (const direction of this.directions) {
            if (this.doesDirectionHaveWinner(direction, token)) {
                return true;
            }
        }
        return false;
    }
}