import { asyncABC } from './async';

describe('test asyncABC', () => {
  it('getABC', async () => {
    expect(await asyncABC()).toEqual(['a', 'b', 'c']);
  });
});
