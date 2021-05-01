import config from '../../config/config.json';
import { expectHttpErrorText } from '../../helpers';
import { Client } from '../client';

import { Bot } from './bot';

const bot = new Bot(new Client());

describe('test Bot instance created successfully', () => {
  it('should be an instance of a Bot class', () => {
    expect(bot instanceof Bot).toBe(true);
  });
});

describe('test bot list api works correctly', () => {
  it('should return an empty or non empty list of bot IDs or an http error', async () => {
    try {
      const items = await bot.list();
      expect(Array.isArray(items)).toEqual(true); // Items should be an array of ids
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test bot get api works correctly', () => {
  it('should return a bot object or http error', async () => {
    try {
      const items = await bot.list();
      const botId = items?.pop() || config?.botId;
      if (botId) {
        const botObject = await bot.get({ botId: botId });
        expect(botObject).toHaveProperty('id', botId);
      }
    } catch (error) {
      // Case when an error occurred
      // use error.response.status or error.response.statusText
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});
