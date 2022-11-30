import {generateGrid} from "../game";
import {expect, it} from "@jest/globals";


it('creates grid', () => {
    expect(generateGrid()).toBe([['-','-','-'],['-','-','-'],['-','-','-']]);
});

// test('that grid is created', () => {
//     expect(1).toBe(1);
// });