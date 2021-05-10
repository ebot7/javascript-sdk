import { Client } from '../client';

import { Message } from './message';
import { MessageSource } from './message.interface';

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
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const created = new Date();
      const updated = new Date();
      updated.setDate(created.getDate() + 1);

      const botId = 'myTestBotId';
      const externalId = 'myTestExtCovId';

      const params = {
        isGreeting: true,
        answerId: 'answer-id',
        seqInConv: 1,
        externalId: externalId,
        botStatus: 'published',
        createdAt: created.toISOString(),
        updatedAt: updated.toISOString(),
        offset: 0,
        limit: 10,
      };

      await message.list({ ...params, botId });
      expect(mock).toBeCalledWith(`/bots/${botId}/messages/`, {
        params: {
          'filter[isGreeting]': params?.isGreeting,
          'filter[answerId]': params?.answerId,
          'filter[seqInConv]': params?.seqInConv,
          'filter[externalId]': params?.externalId,
          'filter[botStatus]': params?.botStatus,
          'filter[createdAt]': params?.createdAt,
          'filter[updatedAt]': params?.updatedAt,
          'page[offset]': params?.offset,
          'page[limit]': params?.limit,
        },
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
      expect(mock).toBeCalledWith(`/bots/${botId}/messages/${messageId}`);
    });
  });

  describe('test message listByConversation api method', () => {
    const botId = 'myTestBotId';
    const convId = 'myTestConvId';
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const created = new Date();
      const updated = new Date();
      updated.setDate(created.getDate() + 1);
      const externalId = 'myTestExtCovId';

      const params = {
        isGreeting: true,
        answerId: 'answer-id',
        seqInConv: 1,
        externalId: externalId,
        botStatus: 'published',
        createdAt: created.toISOString(),
        updatedAt: updated.toISOString(),
        offset: 0,
        limit: 10,
      };

      await message.listByConversation({ ...params, botId, convId });
      expect(mock).toBeCalledWith(`/bots/${botId}/convs/${convId}/messages`, {
        params: {
          'filter[isGreeting]': params?.isGreeting,
          'filter[answerId]': params?.answerId,
          'filter[seqInConv]': params?.seqInConv,
          'filter[externalId]': params?.externalId,
          'filter[botStatus]': params?.botStatus,
          'filter[createdAt]': params?.createdAt,
          'filter[updatedAt]': params?.updatedAt,
          'page[offset]': params?.offset,
          'page[limit]': params?.limit,
        },
      });
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
        `/bots/${botId}/convs/${convId}/messages/${messageId}`
      );
    });
  });

  describe('test message create api method', () => {
    const botId = 'myTestBotId';
    const convId = 'myTestCovId';
    const mock = jest.spyOn(client.getInstance(), 'post');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const payload = {
        body: 'Test message',
        source: MessageSource.VISITOR,
        promptOptions: {
          body: 'Option A',
          href: 'http://example.com',
          isFile: false,
        },
      };
      const params = {
        botId,
        convId,
        payload,
      };
      await message.create(params);
      expect(mock).toBeCalledWith(
        `/bots/${botId}/convs/${convId}/messages/`,
        payload
      );
    });
  });
});
