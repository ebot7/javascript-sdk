import { Client } from '../client';

import { Message } from './message';

const client = new Client();
const message = new Message(client);

describe('test Message client class', () => {
  describe('test Message instance created successfully', () => {
    it('should be an instance of a Message class', () => {
      expect(message instanceof Message).toBe(true);
    });
  });

  describe('test message list api method', () => {
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: [] }));

    it('should be called with correct path and parameters', async () => {
      const created = new Date();
      const updated = new Date();
      updated.setDate(created.getDate() + 1);

      const botId = 'myTestBotId';
      const externalId = 'myTestExtCovId';

      const params = {
        isGreeting: true,
        answerId: 'answer-id',
        seqInConv: 'seqInConv',
        externalId: externalId,
        botStatus: 'published',
        createdAt: created.toISOString(),
        updatedAt: updated.toISOString(),
        offset: 0,
        limit: 10,
      };

      await message.list({ ...params, botId });
      expect(mock).toBeCalledWith(`bots/${botId}/messages/`, {
        params: params,
      });
    });
  });

  describe('test message get api method', () => {
    const botId = 'myTestBotId';
    const messageId = 'myTestMsgId';
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const params = { botId, messageId };
      await message.get(params);
      expect(mock).toBeCalledWith(`bots/${botId}/messages/${messageId}`);
    });
  });

  describe('test message listByConversation api method', () => {
    const botId = 'myTestBotId';
    const convId = 'myTestConvId';
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: [] }));

    it('should be called with correct path and parameters', async () => {
      const params = { botId, convId };
      await message.listByConversation(params);
      expect(mock).toBeCalledWith(`bots/${botId}/convs/${convId}/messages`);
    });
  });

  describe('test message getByConversation api method', () => {
    const botId = 'myTestBotId';
    const convId = 'myTestCovId';
    const messageId = 'myTestMsgId';
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const params = { botId, messageId, convId };
      await message.getByConversation(params);
      expect(mock).toBeCalledWith(
        `bots/${botId}/convs/${convId}/messages/${messageId}`
      );
    });
  });

  describe('test conversation create api method', () => {
    const botId = 'myTestBotId';
    const convId = 'myTestCovId';
    const mock = jest.spyOn(client.getInstance(), 'post');
    mock.mockReturnValueOnce(Promise.resolve({ data: [] }));

    it('should be called with correct path and parameters', async () => {
      const params = {
        body: 'some well formatted body json',
      };
      await message.create({ ...params, botId, convId });
      expect(mock).toBeCalledWith(
        `bots/${botId}/convs/${convId}/messages/`,
        params
      );
    });
  });
});
