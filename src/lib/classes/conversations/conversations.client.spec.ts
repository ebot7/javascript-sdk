import { Ebot7ConversationClient } from '.';
import { Ebot7Client } from '../client';

const MOCK_BEARER_TOKEN = 'Meaningless string';
const MOCK_BOT_ID = 'Meaningless_id';

describe('Ebot7ConversationClient', () => {
  let client: Ebot7Client;
  let conversationClient: Ebot7ConversationClient;

  beforeEach(() => {
    client = new Ebot7Client({
      bearerToken: MOCK_BEARER_TOKEN,
    });
    conversationClient = new Ebot7ConversationClient(client);
  });

  it('should be an instance of a Conversation client', () => {
    expect(conversationClient).toBeInstanceOf(Ebot7ConversationClient);
  });

  describe('findMany()', () => {
    it('should send a request to "bots/:botId/convs', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await conversationClient.findMany({ botId: MOCK_BOT_ID });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(`bots/${MOCK_BOT_ID}/convs`);
    });

    it('should send paging with "limit"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await conversationClient.findMany({
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
      await conversationClient.findMany({
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

    it('should send filter with "updatedAt"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      const updatedAt = new Date();
      await conversationClient.findMany({
        botId: MOCK_BOT_ID,
        filter: { updatedAt: updatedAt },
      });

      const calledParams = mockGet.mock.calls[0][1];

      expect(calledParams).toEqual({
        filter: {
          'filter[updatedAt]': updatedAt.toISOString(),
        },
      });
    });

    it('should send filter with value "undefined"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await conversationClient.findMany({
        botId: MOCK_BOT_ID,
        filter: { updatedAt: undefined },
      });

      const calledParams = mockGet.mock.calls[0][1];

      expect(calledParams).toEqual({
        filter: {},
      });
    });
  });

  describe('findOne()', () => {
    it('should send a request to "bots/:botId/convs/:convId"', async () => {
      const mockGet = jest.fn();
      const mockBotId = 'meaningless_value';
      const mockConvId = 'meaningless_conv_value';

      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await conversationClient.findOne({
        botId: mockBotId,
        convId: mockConvId,
      });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(`bots/${mockBotId}/convs/${mockConvId}`);
    });
  });

  describe('createConversation()', () => {
    it('should send a request to "bots/:botId/convs"', async () => {
      const mockPost = jest.fn();
      const mockBotId = 'meaningless_value';

      mockPost.mockResolvedValue({ items: [] });
      client.post = mockPost;
      await conversationClient.create({
        botId: mockBotId,
        payload: {},
      });
      const calledUrl = mockPost.mock.calls[0][0];

      expect(calledUrl).toBe(`bots/${mockBotId}/convs`);
    });
  });

  describe('patchConversation()', () => {
    it('should send a request to "bots/:botId/convs/:convId"', async () => {
      const mockPatch = jest.fn();
      const mockBotId = 'meaningless_value';
      const mockConvId = 'meaningless_conv_value';

      mockPatch.mockResolvedValue({ items: [] });
      client.patch = mockPatch;
      await conversationClient.patch({
        botId: mockBotId,
        convId: mockConvId,
        payload: {},
      });
      const calledUrl = mockPatch.mock.calls[0][0];

      expect(calledUrl).toBe(`bots/${mockBotId}/convs/${mockConvId}`);
    });
  });
});
