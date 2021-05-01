import config from '../../config/config.json';
import { expectHttpErrorText } from '../../helpers';
import { Bot } from '../bot';
import { Client } from '../client';

import { Conversation } from './conversation';

const client = new Client();
const bot = new Bot(client);
const conversation = new Conversation(client);

describe('test conversation instance created successfully', () => {
  it('should be an instance of a Conversation class', () => {
    expect(conversation instanceof Conversation).toBe(true);
  });
});

describe('test conversation list api works correctly', () => {
  it('should return an empty or non empty list of conversation objects or an http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const convItems = await conversation.list({ botId: botId });
      expect(Array.isArray(convItems)).toEqual(true);
      const convObject = convItems?.pop();
      if (convObject) {
        expect(convObject).toHaveProperty('id');
        expect(convObject).toHaveProperty('orgId');
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test conversation create api works correctly', () => {
  it('should return a new conversation object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const convObject = await conversation.create({
        botId: botId,
        body: JSON.stringify({
          needsInteraction: true,
          isArchived: true,
          isVisitorBanned: true,
          genesysInteractionUUID: '',
          integrations: [],
        }),
      });

      if (convObject) {
        expect(convObject).toHaveProperty('id');
        expect(convObject).toHaveProperty('orgId');
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test conversation get api works correctly', () => {
  it('should return a conversation object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const convItems = await conversation.list({ botId: botId });
      const convId = convItems?.pop()?.id || config?.convId;
      if (convId) {
        const convObject = await conversation.get({
          botId: botId,
          convId: convId,
        });
        expect(convObject).toHaveProperty('id', convId);
        expect(convObject).toHaveProperty('orgId');
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test conversation patch api works correctly', () => {
  it('should return a patched conversation object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const convItems = await conversation.list({ botId: botId });
      const convObject =
        convItems?.pop() ||
        (await conversation.get({
          botId: botId,
          convId: config?.convId,
        }));

      if (convObject) {
        const updatedConvObject = await conversation.patch({
          botId: botId,
          convId: convObject.id,
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
