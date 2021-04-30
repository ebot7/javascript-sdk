import { Client } from '../client';

import { Bot } from './bot';

const config = require('../../config/config.json');

describe('test Bot class instance created successfully', () => {
  const bot = new Bot(new Client());
  it('should be an instance of a Client class', () => {
    expect(bot instanceof Bot).toBe(true);
  });
});

describe('test Bot class list api function works correctly', () => {
  it('should return an empty or non empty list of bot IDs with correct client configurations', async () => {
    const bot = new Bot(new Client());
    const botList = await bot.list();
    expect(botList?.length).toBeTruthy();
  });
  it('should return forbidden error with incorrect client configurations', async () => {
    const bot = new Bot(
      new Client({ bearerToken: 'some-fake-bearer', baseURL: config?.baseURL })
    );
    expect(await bot.list()).toThrow();
  });
});

describe('test Bot class get api function works correctly', () => {
  it('should return non empty bot object with correct client configurations and botId', async () => {
    const bot = new Bot(new Client());
    const botId = (await bot.list()).pop() as string;
    expect(await bot.get({ botId: botId })).toBeTruthy();
  });
  it('should return forbidden error with incorrect client configurations or botId', async () => {
    const bot = new Bot(new Client());
    expect(await bot.get({ botId: 'some-fake-botId' })).toThrow();
  });
});
