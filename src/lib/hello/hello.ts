/**
 * Returns a greeting in either English(Default) or Spanish
 *
 * ### Example (es module)
 * ```js
 * import { greet } from 'hello'
 * console.log(greet('Ebot7', 'es'))
 * // => Hola! ebot7.
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var power = require('hello').greet;
 * console.log(greet('ebot7', 'es'))
 * // => Hola! ebot7.
 * ```
 * @param name - the name(default=Ebot) to use for the greeting
 * @param lang - the language to use in greeting - en(default) or es
 * @returns The greeting text based on language and name passed.
 */
export const greet = (name: string, lang: string): string => {
  return lang?.toLowerCase() == 'es' ? `Hola! ${name}` : `Hello! ${name}`;
};
