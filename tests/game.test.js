import {TykTacToe} from "../game";

describe('game.js tests', () => {
    it('creates grid', () => {
        const t = new TykTacToe(3, 3, null);
        expect(t.generateGrid()).toEqual([['-','-','-'],['-','-','-'],['-','-','-']]);
    });

    it('changes the middle tile of the grid to a token', () => {
        const t = new TykTacToe(3, 3, null);
        t.placeToken([1,1], 'x');
        expect(t.getGrid()[1][1]).toEqual('x');
    });

    it('changes the top right tile of the grid to a token', () => {
        const t = new TykTacToe(3, 3, null);
        t.placeToken([0,2],'x');
        expect(t.getGrid()).toEqual([['-','-','x'],['-','-','-'],['-','-','-']]);
    });

    it('changes the bottom left tile of the grid to a O', () => {
        const t = new TykTacToe(3, 3, null);
        t.placeToken([2,0], 'o');
        expect(t.getGrid()).toEqual([['-','-','-'],['-','-','-'],['o','-','-']]);
    });

    it('handles out of range coordinates gracefully', () => {
        const t = new TykTacToe(3, 3, null);
        let isNotInBounds = t.areCoordinatesInBounds([3,0]);
        expect(isNotInBounds).toBe(false);
        isNotInBounds = t.areCoordinatesInBounds([0, -1]);
        expect(isNotInBounds).toBe(false);
    });

    it('rejects overwriting x token', () => {
        const grid = [['-','-','-'],['-','x','-'],['-','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([1,1], 'o');
        expect(t.getGrid()).toEqual([['-','-','-'],['-','x','-'],['-','-','-']]);
    });

    it('rejects overwriting o token', () => {
        const grid = [['-','-','-'],['-','o','-'],['-','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([1,1], 'x');
        expect(t.getGrid()).toEqual([['-','-','-'],['-','o','-'],['-','-','-']]);
    });

    it('rejects coordinates that are not length 2', () => {
        const t = new TykTacToe(3, 3, null);
        expect(t.areCoordinatesValid([1])).toEqual(false);
    });

    it('rejects coordinates that are null', () => {
        const t = new TykTacToe(3, 3, null);
        expect(t.areCoordinatesValid(null)).toEqual(false);
    });

    it('rejects coordinates that are undefined', () => {
        const t = new TykTacToe(3, 3, null);
        expect(t.areCoordinatesValid(undefined)).toEqual(false);
    });

    it('sets the last move on the class', () => {
        const t = new TykTacToe(3, 3, null);
        t.placeToken([2, 1], 'x')
        expect(t.getLastPlacement()).toEqual([2, 1]);
    });

    it('sets a different last move on the class', () => {
        const t = new TykTacToe(3, 3, null);
        t.placeToken([1, 2], 'x')
        expect(t.getLastPlacement()).toEqual([1, 2]);
    });

    it('adds two coordinates successfully', () => {
        const t = new TykTacToe(3, 3, null);
        expect(t.addCoordinates([1, 1], [0, 1])).toEqual([1, 2]);
    });

    it('adds two different coordinates successfully', () => {
        const t = new TykTacToe(3, 3, null);
        expect(t.addCoordinates([0, 2], [2, -1])).toEqual([2, 1]);
    });

    it('recognises someone has won middle horizontally', () => {
        const grid = [['-','-','-'],['x','-','x'],['-','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([1, 1], 'x');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises someone has won top horizontally', () => {
        const grid = [['x','x','-'],['-','-','-'],['-','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([0,2], 'x');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises someone has won bottom horizontally', () => {
        const grid = [['-','-','-'],['-','-','-'],['-','o','o']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([2,0], 'o');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises someone has won vertically top right', () => {
        const grid = [['-','-','x'],['-','-','x'],['-','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([2, 2], 'x');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises someone has won vertically top', () => {
        const grid = [['-','-',''],['-','o','-'],['-','o','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([0,1], 'o');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises someone has won vertically top left', () => {
        const grid = [['-','-',''],['o','-','-'],['o','','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([0,0], 'o');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises someone has won diagonally top right', () => {
        const grid = [['x','-','-'],['-','x','-'],['-','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([2, 2], 'x');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises someone has won diagonally top left', () => {
        const grid = [['-','-','x'],['-','-','-'],['x','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([1, 1], 'x');
        expect(t.validateWinner()).toEqual(true);
    });

    it('recognises no one has won yet', () => {
        const grid = [['','-','-'],['x','x','-'],['-','-','-']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([2, 0], 'x');
        expect(t.validateWinner()).toEqual(false);
    });

    it('recognises no one has won again yet', () => {
        const grid = [['x','x','o'],['o','-','x'],['-','-','o']];
        const t = new TykTacToe(3, 3, grid);
        t.placeToken([1, 1], 'x');
        expect(t.validateWinner()).toEqual(false);
    });
});