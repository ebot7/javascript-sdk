import { Ebot7Client } from '../client';
import { Ebot7BotClient } from './bots.client';

const MOCK_BEARER_TOKEN = 'Meaningless string';

describe('Ebot7BotClient', () => {
  let client: Ebot7Client;
  let botClient: Ebot7BotClient;

  beforeEach(() => {
    client = new Ebot7Client({
      bearerToken: MOCK_BEARER_TOKEN,
    });
    botClient = new Ebot7BotClient(client);
  });

  it('should be an instance of a Bot class', () => {
    expect(botClient).toBeInstanceOf(Ebot7BotClient);
  });

  describe('findMany()', () => {
    it('should send a request to "v1/bots"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await botClient.findMany();
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe('v1/bots');
    });

    it('should send paging with "limit"', async () => {
      const mockGet = jest.fn();
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await botClient.findMany({ limit: 1 });
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
      await botClient.findMany({ offset: 1 });
      const calledParams = mockGet.mock.calls[0][1];

      expect(calledParams).toEqual({
        paging: {
          offset: 1,
        },
      });
    });
  });

  describe('findOne()', () => {
    it('should send a request to "v1/bots/:botId"', async () => {
      const mockGet = jest.fn();
      const mockBotId = 'meaningless value';
      mockGet.mockResolvedValue({ items: [] });
      client.get = mockGet;
      await botClient.findOne({ botId: mockBotId });
      const calledUrl = mockGet.mock.calls[0][0];

      expect(calledUrl).toBe(`v1/bots/${mockBotId}`);
    });
  });
});
