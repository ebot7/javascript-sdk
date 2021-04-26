import test from 'ava';

import { greet } from './hello';

test('greet', (t) => {
  t.is(greet('ebot7 JS SDK', 'en'), 'Hello! ebot7 JS SDK');
  t.is(greet('ebot7 JS SDK', 'es'), 'Hola! ebot7 JS SDK');
});