import { Client } from '../client';

export interface IListMessageOptions {
  botId: string;
  isGreeting?: boolean;
  answerId?: string;
  seqInConv?: string;
  externalId?: string;
  botStatus?: string;
  createdAt?: string;
  updatedAt?: string;
  offset?: number;
  limit?: number;
}
export interface IListMessageByConversationOptions {
  botId: string;
  convId: string;
}
export interface IGetMessageOptions {
  botId: string;
  messageId: string;
}
export interface IGetMessageByConversationOptions extends IGetMessageOptions {
  convId: string;
}

export interface ICreateMessageOptions
  extends IListMessageByConversationOptions {
  body: string | unknown;
}

export type MessageType = {
  id: string;
  promptOptions: unknown;
  botId: string;
  convId: string;
  orgId: string;
  body: string;
  botStatus: string;
  source: unknown;
  isGreeting: true;
  seqInConv: 0;
  createdAt: string;
  updatedAt: string;
};

export class Message {
  constructor(private readonly client: Client) {}

  /**
   * Fetches list of messages based on botId.
   *
   * @param {IListMessageOptions} options - Instance of IListConversationOptions
   * @returns {Promise<Array<MessageType>>} List of message object type
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async list(options: IListMessageOptions): Promise<Array<MessageType>> {
    const url = `bots/${options.botId}/messages/`;
    const result = await this.client.getInstance().get(url, {
      params: {
        isGreeting: options?.isGreeting,
        answerId: options?.answerId,
        seqInConv: options?.seqInConv,
        externalId: options?.externalId,
        botStatus: options?.botStatus,
        createdAt: options?.createdAt,
        updatedAt: options?.updatedAt,
        offset: options?.offset,
        limit: options?.limit,
      },
    });

    return result.data.items;
  }

  /**
   *  Gets message object for supplied botId and messageId
   *
   * @param {IGetMessageOptions} options - Instance of IGetMessageOptions
   * @returns {Promise<MessageType>} Single message object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async get(options: IGetMessageOptions): Promise<MessageType> {
    const url = `bots/${options.botId}/messages/${options.messageId}`;
    const result = await this.client.getInstance().get(url);

    return result.data.item;
  }

  /**
   * Fetches list of all messages for conversation with [convId]
   *
   * @param {IListMessageByConversationOptions} options - Instance of IListMessageByConversationOptions
   * @returns {Promise<Array<MessageType>>} List of message object type for conversation with convId
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async listByConversation(
    options: IListMessageByConversationOptions
  ): Promise<Array<MessageType>> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages`;
    const result = await this.client.getInstance().get(url);

    return result.data.items;
  }

  /**
   * Gets message object for conversation based on supplied botId, convId and messageId
   *
   * @param {IGetMessageByConversationOptions} options - Instance of IGetMessageByConversationOptions
   * @returns {Promise<MessageType>} Single message object type for conversation with convId
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async getByConversation(
    options: IGetMessageByConversationOptions
  ): Promise<Array<MessageType>> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages/${options.messageId}`;
    const result = await this.client.getInstance().get(url);

    return result.data.item;
  }

  /**
   * Create a new message for a conversation against bot [botId] and conversation [convId].
   *
   * @param {ICreateMessageOptions} options - Instance of ICreateMessageOptions
   * @returns {Promise<MessageType>} Single message object type for conversation with convId
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async create(options: ICreateMessageOptions): Promise<MessageType> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages/`;
    const result = await this.client.getInstance().post(url, {
      body: options.body,
    });

    return result.data.item;
  }
}
