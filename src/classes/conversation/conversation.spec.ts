import { Client } from '../client';

import { Conversation } from './conversation';

const client = new Client();
const conversation = new Conversation(client);

describe('test Conversation client class', () => {
  describe('test Conversation instance created successfully', () => {
    it('should be an instance of a Conversation class', () => {
      expect(conversation instanceof Conversation).toBe(true);
    });
  });

  describe('test conversation list api method', () => {
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const created = new Date();
      const updated = new Date();
      updated.setDate(created.getDate() + 1);

      const botId = 'myTestBotId';

      const params = {
        createdAt: created.toISOString(),
        updatedAt: updated.toISOString(),
        offset: 0,
        limit: 10,
      };
      await conversation.list({ ...params, botId });
      expect(mock).toBeCalledWith(`/bots/${botId}/convs`, { params });
    });
  });

  describe('test conversation get api method', () => {
    const botId = 'myTestBotId';
    const convId = 'myTestCovId';
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const params = { botId, convId };
      await conversation.get(params);
      expect(mock).toBeCalledWith(`/bots/${botId}/convs/${convId}`);
    });
  });

  describe('test conversation create api method', () => {
    const botId = 'myTestBotId';
    const mock = jest.spyOn(client.getInstance(), 'post');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const payload = {
        needsInteraction: false,
        isArchived: false,
        isVisitorBanned: false,
      };
      const params = {
        botId,
        payload,
      };

      await conversation.create(params);
      expect(mock).toBeCalledWith(`/bots/${botId}/convs`, payload);
    });
  });

  describe('test conversation patch api method', () => {
    const botId = 'myTestBotId';
    const convId = 'myTestCovId';
    const mock = jest.spyOn(client.getInstance(), 'patch');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const payload = {
        needsInteraction: false,
        isArchived: false,
        isVisitorBanned: false,
      };
      const params = {
        botId,
        convId,
        payload,
      };

      await conversation.patch(params);
      expect(mock).toBeCalledWith(`/bots/${botId}/convs/${convId}`, payload);
    });
  });
});
