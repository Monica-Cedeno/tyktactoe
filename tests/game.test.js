import {TykTacToe} from "../game";


it('creates grid', () => {
    expect(generateGrid()).toBe([['-','-','-'],['-','-','-'],['-','-','-']]);
});

// test('that grid is created', () => {
//     expect(1).toBe(1);
// });