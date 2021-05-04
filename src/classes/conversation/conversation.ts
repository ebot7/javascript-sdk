import { Client } from '../client';

export interface IListConversationOptions {
  botId: string;
  createdAt?: string;
  updatedAt?: string;
  offset?: number;
  limit?: number;
}
export interface IGetConversationOptions {
  botId: string;
  convId: string;
}

export interface ICreateConversationOptions {
  botId: string;
  body: string | unknown;
}

export interface IUpdateConversationOptions extends ICreateConversationOptions {
  convId: string;
}

export type ConversationType = {
  id: string;
  body: string;
  disableAutopilot: true;
  embedOrigin: string;
  lastMessageAt: string;
  lastMessageBody: string;
  firstMessageByVisitorAt: string;
  isLastMessageByVisitor: boolean;
  convNumber: number;
  messageCount: number;
  agent: string;
  orgId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  externalData: Array<string>;
};

export class Conversation {
  constructor(private readonly client: Client) {}

  /**
   * Fetches list of conversations based on botId.
   *
   * @param {IListConversationOptions} options - Instance of IListConversationOptions
   * @returns {Promise<Array<ConversationType>>} List of conversation object type
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async list(
    options: IListConversationOptions
  ): Promise<Array<ConversationType>> {
    const url = `bots/${options.botId}/convs`;
    const result = await this.client.getInstance().get(url, {
      params: {
        createdAt: options?.createdAt,
        updatedAt: options?.updatedAt,
        offset: options?.offset,
        limit: options?.limit,
      },
    });

    return result.data.items;
  }

  /**
   *  Gets conversation object for supplied botId and convId
   *
   * @param {IGetConversationOptions} options - Instance of IGetConversationOptions
   * @returns {Promise<ConversationType>} Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async get(options: IGetConversationOptions): Promise<ConversationType> {
    const url = `bots/${options.botId}/convs/${options.convId}`;
    const result = await this.client.getInstance().get(url);

    return result.data.item;
  }

  /**
   * Creates a new conversation for bot with botId
   *
   * @param {ICreateConversationOptions} options - Instance of ICreateConversationOptions
   * @returns {Promise<ConversationType>} Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async create(options: ICreateConversationOptions): Promise<ConversationType> {
    const url = `bots/${options.botId}/convs`;
    const result = await this.client.getInstance().post(url, {
      body: options.body,
    });

    return result.data.item;
  }

  /**
   * Updates a conversation for convId and bot with botId
   *
   * @param {IUpdateConversationOptions} options - Instance of IUpdateConversationOptions
   * @returns {Promise<ConversationType>} Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async patch(options: IUpdateConversationOptions): Promise<ConversationType> {
    const url = `bots/${options.botId}/convs/${options.convId}`;
    const result = await this.client.getInstance().patch(url, {
      body: options.body,
    });

    return result.data.item;
  }
}
