import { greet } from './hello';

describe('test hello greeting', () => {
  it('should return Hello! ebot7 JS SDK', async () => {
    expect(greet('ebot7 JS SDK', 'en')).toEqual('Hello! ebot7 JS SDK');
  });
  it('should return Hola! ebot7 JS SDKK', async () => {
    expect(greet('ebot7 JS SDK', 'es')).toEqual('Hola! ebot7 JS SDK');
  });
});
