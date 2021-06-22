import { Ebot7ExternalConversationClient } from '.';
import { Ebot7Client } from '../client';

const MOCK_BEARER_TOKEN = 'Meaningless string';

describe('Ebot7ExternalConversationClient', () => {
  let client: Ebot7Client;
  let externalConversationClient: Ebot7ExternalConversationClient;

  beforeEach(() => {
    client = new Ebot7Client({
      bearerToken: MOCK_BEARER_TOKEN,
    });
    externalConversationClient = new Ebot7ExternalConversationClient(client);
  });

  it('should be an instance of a Conversation client', () => {
    expect(externalConversationClient).toBeInstanceOf(
      Ebot7ExternalConversationClient
    );
  });

  describe('findOne()', () => {
    it('should send a request to "bots/:botId/external-convs/:convId"', async () => {
      const mockGet = jest.fn();
      const mockBotId = 'meaningless_value';
      const mockConvId = 'meaningless_ext_conv_value';

      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await externalConversationClient.findOne({
        botId: mockBotId,
        externalId: mockConvId,
      });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(`bots/${mockBotId}/external-convs/${mockConvId}`);
    });
  });

  describe('createConversation()', () => {
    it('should send a request to "bots/:botId/external-convs"', async () => {
      const mockPost = jest.fn();
      const mockBotId = 'meaningless_value';

      mockPost.mockResolvedValue({ items: [] });
      client.post = mockPost;
      await externalConversationClient.create({
        botId: mockBotId,
        payload: {},
      });
      const calledUrl = mockPost.mock.calls[0][0];

      expect(calledUrl).toBe(`bots/${mockBotId}/exernal-convs`);
    });
  });

  describe('patchConversation()', () => {
    it('should send a request to "bots/:botId/convs/:convId"', async () => {
      const mockPatch = jest.fn();
      const mockBotId = 'meaningless_value';
      const mockConvId = 'meaningless_conv_value';

      mockPatch.mockResolvedValue({ items: [] });
      client.patch = mockPatch;
      await externalConversationClient.patch({
        botId: mockBotId,
        externalId: mockConvId,
        payload: {},
      });
      const calledUrl = mockPatch.mock.calls[0][0];

      expect(calledUrl).toBe(`bots/${mockBotId}/external-convs/${mockConvId}`);
    });
  });
});
