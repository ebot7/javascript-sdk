import config from '../../config/config.json';
import { expectHttpErrorText } from '../../helpers';
import { Bot } from '../bot';
import { Client } from '../client';

import { ExternalConversation } from './external-conversation';

const client = new Client();
const bot = new Bot(client);
const conversation = new ExternalConversation(client);

describe('test external conversation instance created successfully', () => {
  it('should be an instance of a ExternalConversation class', () => {
    expect(conversation instanceof ExternalConversation).toBe(true);
  });
});

describe('test external conversation get api works correctly', () => {
  it('should return an external conversation object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const externalId = config?.externalId;

      const convObject = await conversation.get({
        botId: botId,
        externalId: externalId,
      });
      expect(convObject).toHaveProperty('id', externalId);
      expect(convObject).toHaveProperty('orgId');
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test conversation patch api works correctly', () => {
  it('should return a patched external conversation object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const externalId = config?.externalId;
      const convObject = await conversation.get({
        botId: botId,
        externalId: externalId,
      });

      if (convObject) {
        const updatedConvObject = await conversation.patch({
          botId: botId,
          externalId: externalId,
          body: JSON.stringify({
            needsInteraction: true,
            isArchived: true,
            isVisitorBanned: true,
            genesysInteractionUUID: 'uuid',
            integrations: [],
          }),
        });

        expect(convObject.id).toEqual(updatedConvObject.id);
        expect(convObject.updatedAt).not.toEqual(updatedConvObject.updatedAt);
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});
