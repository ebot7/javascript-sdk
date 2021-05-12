import { Ebot7Client } from '../client';
import { Ebot7MessageClient } from './messages.client';

const MOCK_BEARER_TOKEN = 'Meaningless string';
const MOCK_BOT_ID = 'Meaningless_id';

describe('Ebot7MessageClient', () => {
  let client: Ebot7Client;
  let messageClient: Ebot7MessageClient;

  beforeEach(() => {
    client = new Ebot7Client({
      bearerToken: MOCK_BEARER_TOKEN,
    });
    messageClient = new Ebot7MessageClient(client);
  });

  it('should be an instance of a Message client', () => {
    expect(messageClient).toBeInstanceOf(Ebot7MessageClient);
  });

  describe('findMany()', () => {
    it('should send a request to "v1/bots/:botId/messages', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findMany({ botId: MOCK_BOT_ID });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(`v1/bots/${MOCK_BOT_ID}/messages`);
    });

    it('should send paging with "limit"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findMany({
        botId: MOCK_BOT_ID,
        paging: { limit: 1 },
      });
      const calledParams = mockGet.mock.calls[0][1];

      expect(calledParams).toEqual({
        paging: {
          limit: 1,
        },
      });
    });

    it('should send paging with "offset"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findMany({
        botId: MOCK_BOT_ID,
        paging: { offset: 1 },
      });
      const calledParams = mockGet.mock.calls[0][1];

      expect(calledParams).toEqual({
        paging: {
          offset: 1,
        },
      });
    });

    it('should send filter with "isGreeting"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findMany({
        botId: MOCK_BOT_ID,
        filter: { isGreeting: true },
      });

      const calledParams = mockGet.mock.calls[0][1];

      expect(calledParams).toEqual({
        filter: {
          'filter[isGreeting]': true,
        },
      });
    });

    it('should send filter with value "undefined"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findMany({
        botId: MOCK_BOT_ID,
        filter: { isGreeting: undefined },
      });

      const calledParams = mockGet.mock.calls[0][1];

      expect(calledParams).toEqual({
        filter: {},
      });
    });
  });

  describe('findOne()', () => {
    it('should send a request to "v1/bots/:botId/messages/:messageId"', async () => {
      const mockGet = jest.fn();
      const mockBotId = 'meaningless_value';
      const mockMessageId = 'meaningless_message_value';

      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findOne({
        botId: mockBotId,
        messageId: mockMessageId,
      });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(`v1/bots/${mockBotId}/messages/${mockMessageId}`);
    });
  });

  describe('findManyByConversation()', () => {
    const mockConvId = 'meaningless_conv_value';

    it('should send a request to "v1/bots/:botId/convs/:convId/messages', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findManyByConversation({
        botId: MOCK_BOT_ID,
        convId: mockConvId,
      });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(
        `v1/bots/${MOCK_BOT_ID}/convs/${mockConvId}/messages`
      );
    });
  });

  describe('findOneByConversation()', () => {
    it('should send a request to "v1/bots/:botId/convs/:convId/messages/:messageId"', async () => {
      const mockGet = jest.fn();
      const mockBotId = 'meaningless_value';
      const mockMessageId = 'meaningless_message_value';
      const mockConvId = 'meaningless_conv_value';

      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await messageClient.findOneByConversation({
        botId: mockBotId,
        convId: mockConvId,
        messageId: mockMessageId,
      });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(
        `v1/bots/${mockBotId}/convs/${mockConvId}/messages/${mockMessageId}`
      );
    });
  });

  describe('createMessage()', () => {
    it('should send a request to "v1/bots/:botId/convs/:convId/messages"', async () => {
      const mockPatch = jest.fn();
      const mockBotId = 'meaningless_value';
      const mockConvId = 'meaningless_conv_value';

      mockPatch.mockResolvedValue({ items: [] });
      client.patch = mockPatch;
      await messageClient.create({
        botId: mockBotId,
        convId: mockConvId,
        body: '',
      });
      const calledUrl = mockPatch.mock.calls[0][0];

      expect(calledUrl).toBe(
        `v1/bots/${mockBotId}/convs/${mockConvId}/messages`
      );
    });
  });
});
