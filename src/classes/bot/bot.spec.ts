import { Client } from '../client';

import { Bot } from './bot';

const client = new Client();
const bot = new Bot(client);

describe('test Bot client class', () => {
  describe('test Bot instance created successfully', () => {
    it('should be an instance of a Bot class', () => {
      expect(bot instanceof Bot).toBe(true);
    });
  });

  describe('test bot list api method', () => {
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: [] }));

    it('should be called with correct path and parameters', async () => {
      const params = { offset: 0, limit: 10 };
      await bot.list(params);
      expect(mock).toBeCalledWith('v1/bots/', { params });
    });
  });

  describe('test bot get api method', () => {
    const botId = 'myTestBotId';
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const params = { botId };
      await bot.get(params);
      expect(mock).toBeCalledWith(`v1/bots/${botId}`);
    });
  });
});
