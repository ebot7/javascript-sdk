import { Client } from '../client';

import { ExternalConversation } from './external-conversation';

const client = new Client();
const conversation = new ExternalConversation(client);

describe('test External Conversation client class', () => {
  describe('test External Conversation instance created successfully', () => {
    it('should be an instance of a External Conversation class', () => {
      expect(conversation instanceof ExternalConversation).toBe(true);
    });
  });

  describe('test external conversation get api method', () => {
    const botId = 'myTestBotId';
    const externalId = 'myTestExtCovId';
    const mock = jest.spyOn(client.getInstance(), 'get');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const params = { botId, externalId };
      await conversation.get(params);
      expect(mock).toBeCalledWith(`bots/${botId}/external-convs/${externalId}`);
    });
  });

  describe('test external conversation patch api method', () => {
    const botId = 'myTestBotId';
    const externalId = 'myTestExtCovId';
    const mock = jest.spyOn(client.getInstance(), 'patch');
    mock.mockReturnValueOnce(Promise.resolve({ data: {} }));

    it('should be called with correct path and parameters', async () => {
      const params = {
        body: 'some well formatted body json',
      };
      await conversation.patch({
        ...params,
        botId,
        externalId,
      });
      expect(mock).toBeCalledWith(
        `bots/${botId}/external-convs/${externalId}`,
        params
      );
    });
  });
});
