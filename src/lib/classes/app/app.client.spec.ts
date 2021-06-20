import { Ebot7AppClient, IEbot7InstallApplicationInstanceOptions } from '.';
import { Ebot7Client } from '../client';

const MOCK_BEARER_TOKEN = 'Meaningless string';

describe('Ebot7BotClient', () => {
  let client: Ebot7Client;
  let appClient: Ebot7AppClient;

  beforeEach(() => {
    client = new Ebot7Client({
      bearerToken: MOCK_BEARER_TOKEN,
    });
    appClient = new Ebot7AppClient(client);
  });

  it('should be an instance of a App Client class', () => {
    expect(appClient).toBeInstanceOf(Ebot7AppClient);
  });

  describe('Test install method', () => {
    it('should send a request to "application/install"', async () => {
      const mockPost = jest.fn();
      client.post = mockPost;

      mockPost.mockResolvedValue({});

      const opts: IEbot7InstallApplicationInstanceOptions = {
        delegatedAuthToken: 'x-delegated-authorization-token',
        applicationId: 'meaningless-application-id',
        botId: 'meaningless-bot-id',
      };

      const headerConfig = {
        headers: {
        'x-Delegated-Authorization': `Bearer ${opts.delegatedAuthToken}`
      }
    };

      await appClient.install(opts);

      const calledUrl = mockPost.mock.calls[0][0];
      const calledParams = mockPost.mock.calls[0][1];
      const calledHeaders = mockPost.mock.calls[0][2];

      expect(calledUrl).toBe(`application/install`);
      expect(calledParams).toEqual(opts);
      expect(calledHeaders).toEqual(headerConfig);
    });
  });
});
