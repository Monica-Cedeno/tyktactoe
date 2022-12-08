import {TykTacToe} from "../game";

describe('game tests', () => {
    it('creates a square grid', () => {
        const t = new TykTacToe(3, null);
        expect(t.generateGrid()).toEqual([['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']]);
        expect(t.getGrid().length === t.getGrid()[0].length);
    });

    it('rejects a non-square grid', () => {
        const grid = [['-', '-', '-']];
        const t = new TykTacToe(4, grid);
        expect(t.getGrid()).toEqual([['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-']]);
    });

    it('rejects a grid with no columns', () => {
        const t = new TykTacToe(4, [[]]);
        expect(t.getGrid()).toEqual([['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-']]);
    });

    it('rejects a grid with no rows', () => {
        const t = new TykTacToe(4, []);
        expect(t.getGrid()).toEqual([['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-']]);
    });

    it('rejects a grid with a non-array rows', () => {
        const t = new TykTacToe(4, [35]);
        expect(t.getGrid()).toEqual([['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-'], ['-', '-', '-', '-']]);
    });

    it('changes the middle tile of the grid to a token', () => {
        const t = new TykTacToe(3, null);
        t.placeToken([1, 1], 'x');
        expect(t.getGrid()[1][1]).toEqual('x');
    });

    it('changes the top right tile of the grid to a token', () => {
        const t = new TykTacToe(3, null);
        t.placeToken([0, 2], 'x');
        expect(t.getGrid()).toEqual([['-', '-', 'x'], ['-', '-', '-'], ['-', '-', '-']]);
    });

    it('changes the bottom left tile of the grid to a O', () => {
        const t = new TykTacToe(3, null);
        t.placeToken([2, 0], 'o');
        expect(t.getGrid()).toEqual([['-', '-', '-'], ['-', '-', '-'], ['o', '-', '-']]);
    });

    it('handles out of range coordinates gracefully', () => {
        const t = new TykTacToe(3, null);
        let isNotInBounds = t.areCoordinatesInBounds([3, 0]);
        expect(isNotInBounds).toBe(false);
        isNotInBounds = t.areCoordinatesInBounds([0, -1]);
        expect(isNotInBounds).toBe(false);
    });

    it('rejects overwriting x token', () => {
        const grid = [['-', '-', '-'], ['-', 'x', '-'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([1, 1], 'o');
        expect(t.getGrid()).toEqual([['-', '-', '-'], ['-', 'x', '-'], ['-', '-', '-']]);
    });

    it('rejects overwriting o token', () => {
        const grid = [['-', '-', '-'], ['-', 'o', '-'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([1, 1], 'x');
        expect(t.getGrid()).toEqual([['-', '-', '-'], ['-', 'o', '-'], ['-', '-', '-']]);
    });

    it('rejects coordinates that are not length 2', () => {
        const t = new TykTacToe(3, null);
        expect(t.areCoordinatesValid([1])).toEqual(false);
    });

    it('rejects coordinates that are null', () => {
        const t = new TykTacToe(3, null);
        expect(t.areCoordinatesValid(null)).toEqual(false);
    });

    it('rejects coordinates that are undefined', () => {
        const t = new TykTacToe(3, null);
        expect(t.areCoordinatesValid(undefined)).toEqual(false);
    });

    it('sets the last move on the class #1', () => {
        const t = new TykTacToe(3, null);
        t.placeToken([2, 1], 'x')
        expect(t.getLastPlacement()).toEqual([2, 1]);
    });

    it('sets the last move on the class #2', () => {
        const t = new TykTacToe(3, null);
        t.placeToken([1, 2], 'x')
        expect(t.getLastPlacement()).toEqual([1, 2]);
    });

    it('recognises a tile contains a token #1', () => {
        const grid = [['-', '-', '-'], ['-', '-', 'x'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        expect(t.doesTileContainToken([1, 2], 'x')).toBe(true);
    });

    it('recognises a tile contains a token #2', () => {
        const grid = [['-', '-', '-'], ['-', '-', '-'], ['-', 'o', '-']];
        const t = new TykTacToe(3, grid);
        expect(t.doesTileContainToken([2, 1], 'o')).toBe(true);
    });

    it('recognises a tile contains does not contain a token', () => {
        const t = new TykTacToe(3, null);
        expect(t.doesTileContainToken([0, 0], 'x')).toBe(false);
    });

    it('adds two coordinates successfully #1', () => {
        const t = new TykTacToe(3, null);
        expect(t.addCoordinates([1, 1], [0, 1])).toEqual([1, 2]);
    });

    it('adds two coordinates successfully #2', () => {
        const t = new TykTacToe(3, null);
        expect(t.addCoordinates([0, 2], [2, -1])).toEqual([2, 1]);
    });

    it('recognises a token has won #1', () => {
        const grid = [['x', '-', 'x'], ['-', '-', '-'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([0, 1], 'x');
        expect(t.doesDirectionHaveWinner(t.right, 'x')).toBe(true);
    });

    it('recognises a token has won #2', () => {
        const grid = [['-', '-', 'o'], ['-', '-', '-'], ['o', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([1, 1], 'o');
        expect(t.doesDirectionHaveWinner(t.topRight, 'o')).toBe(true);
    });

    it('recognises a token has won #3', () => {
        const grid = [['-', '-', '-'], ['-', '-', '-'], ['o', 'o', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken( [2, 2], 'o');
        expect(t.doesDirectionHaveWinner(t.right, 'o')).toBe(true);
    });

    it('recognises someone has won top horizontally', () => {
        const grid = [['x', 'x', '-'], ['-', '-', '-'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([0, 2], 'x');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises someone has won middle horizontally', () => {
        const grid = [['-', '-', '-'], ['x', '-', 'x'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([1, 1], 'x');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises someone has won bottom horizontally', () => {
        const grid = [['-', '-', '-'], ['-', '-', '-'], ['-', 'o', 'o']];
        const t = new TykTacToe(3, grid);
        t.placeToken([2, 0], 'o');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises someone has won vertically top left', () => {
        const grid = [['-', '-', ''], ['o', '-', '-'], ['o', '', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([0, 0], 'o');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises someone has won vertically top', () => {
        const grid = [['-', '-', ''], ['-', 'o', '-'], ['-', 'o', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([0, 1], 'o');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises someone has won vertically top right', () => {
        const grid = [['-', '-', 'x'], ['-', '-', 'x'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([2, 2], 'x');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises someone has won diagonally top left', () => {
        const grid = [['-', '-', 'x'], ['-', '-', '-'], ['x', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([1, 1], 'x');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises someone has won diagonally top right', () => {
        const grid = [['x', '-', '-'], ['-', 'x', '-'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([2, 2], 'x');
        expect(t.hasLastPlayerWon()).toEqual(true);
    });

    it('recognises no one has won yet #1', () => {
        const grid = [['', '-', '-'], ['x', 'x', '-'], ['-', '-', '-']];
        const t = new TykTacToe(3, grid);
        t.placeToken([2, 0], 'x');
        expect(t.hasLastPlayerWon()).toEqual(false);
    });

    it('recognises no one has won yet #2', () => {
        const grid = [['x', 'x', 'o'], ['o', '-', 'x'], ['-', '-', 'o']];
        const t = new TykTacToe(3, grid);
        t.placeToken([1, 1], 'x');
        expect(t.hasLastPlayerWon()).toEqual(false);
    });
});