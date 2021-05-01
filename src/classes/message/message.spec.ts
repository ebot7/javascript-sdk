import config from '../../config/config.json';
import { expectHttpErrorText } from '../../helpers';
import { Bot } from '../bot';
import { Client } from '../client';
import { Message } from '../message';

const client = new Client();
const bot = new Bot(client);
const message = new Message(client);

describe('test message instance created successfully', () => {
  it('should be an instance of a Message class', () => {
    expect(message instanceof Message).toBe(true);
  });
});

describe('test message list api works correctly', () => {
  it('should return an empty or non empty list of message objects or an http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const msgItems = await message.list({ botId: botId });
      expect(Array.isArray(msgItems)).toEqual(true);
      const msgObject = msgItems?.pop();
      if (msgObject) {
        expect(msgObject).toHaveProperty('id');
        expect(msgObject).toHaveProperty('botId', botId);
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test message get api works correctly', () => {
  it('should return a message object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const msgItems = await message.list({ botId: botId });
      const msgId = msgItems?.pop()?.id || config?.msgId;
      if (msgId) {
        const convObject = await message.get({
          botId: botId,
          messageId: msgId,
        });
        expect(convObject).toHaveProperty('id', msgId);
        expect(convObject).toHaveProperty('botId', botId);
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test message list by conversation api works correctly', () => {
  it('should return an empty or non-empty list of message objects or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const msgItems = await message.list({ botId: botId });

      const convId = msgItems?.pop()?.convId || config?.convId;

      const msgByConvItems = await message.listByConversation({
        botId: botId,
        convId: convId,
      });
      expect(Array.isArray(msgByConvItems)).toEqual(true);

      const msgByConvObject = msgByConvItems?.pop();
      if (msgByConvObject) {
        expect(msgByConvObject).toHaveProperty('id');
        expect(msgByConvObject).toHaveProperty('botId');
        expect(msgByConvObject).toHaveProperty('convId');
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test message get message by conversation api works correctly', () => {
  it('should return a message object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const msgItems = await message.list({ botId: botId });
      const mesgObject = msgItems?.pop();

      const msgId = mesgObject?.id || config?.msgId;
      const convId = mesgObject?.convId || config?.convId;

      const msgByConvObject = await message.getByConversation({
        botId: botId,
        convId: convId,
        messageId: msgId,
      });

      expect(msgByConvObject).toHaveProperty('id', msgId);
      expect(msgByConvObject).toHaveProperty('botId', botId);
      expect(msgByConvObject).toHaveProperty('covId', convId);
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});

describe('test message create api works correctly', () => {
  it('should return a new message object or http error', async () => {
    try {
      const botItems = await bot.list();
      const botId = botItems?.pop() || config?.botId;

      const msgItems = await message.list({ botId: botId });
      const mesgObject = msgItems?.pop();

      const convId = mesgObject?.convId || config?.convId;

      const msgObject = await message.create({
        botId: botId,
        convId: convId,
        body: JSON.stringify({
          body: 'Choose an option below',
          source: 'bot',
          promptOptions: {
            body: 'Option A',
            href: 'http://example.com',
            isFile: false,
          },
        }),
      });

      if (msgObject) {
        expect(msgObject).toHaveProperty('id');
        expect(msgObject).toHaveProperty('orgId');
        expect(msgObject).toHaveProperty('convId');
      }
    } catch (error) {
      expectHttpErrorText(error?.response?.statusText, error);
    }
  });
});
