import { double, power } from './number';

describe('test number double function', () => {
  it('double of 2 should return 4', async () => {
    expect(double(2)).toEqual(4);
  });
});

describe('test number power function', () => {
  it('2 to the power 4 should return 16', async () => {
    expect(power(2, 4)).toEqual(16);
  });
});
