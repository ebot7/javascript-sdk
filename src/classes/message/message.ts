import { Client } from '../client';

export interface IListMessageOptions {
  botId: string;
  isGreeting?: boolean;
  answerId?: string;
  seqInConv?: string;
  externalId?: string;
  botStatus?: string;
  filter?: string;
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
   * Gets an object having a property [items] which is a list of messages based on botId.
   *
   * @param {IListMessageOptions} options - Instance of IListConversationOptions
   * @returns {Promise<unknown>} An object having a property [items] which is a list of message object type
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/messages
   *   get:
   *     operationId: findManyMessages
   *     summary: List messages
   *     description: Gets an object having a property [items] which is a list of messages based on botId.
   *     produces:
   *     - "application/json"
   *     consumes:
   *     - "application/json"
   *     parameters:
   *       - name: botId
   *         required: true
   *         in: path
   *         description: The unique ID of the bot.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: A list of available messages filtered by given bot ID
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineMessageListApiOutput'
   *       '401':
   *         description: Unauthorized.
   *       '403':
   *         description: Forbidden.
   *       '404':
   *         description: Not Found.
   *       '405':
   *         description: Invalid Input.
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - Messages
   */
  async list(options: IListMessageOptions): Promise<unknown> {
    const url = `bots/${options.botId}/messages/`;
    const result = await this.client.getInstance().get(url, {
      params: {
        isGreeting: options?.isGreeting,
        answerId: options?.answerId,
        seqInConv: options?.seqInConv,
        externalId: options?.externalId,
        botStatus: options?.botStatus,
        filter: options?.filter,
        createdAt: options?.createdAt,
        updatedAt: options?.updatedAt,
        offset: options?.offset,
        limit: options?.limit,
      },
    });

    return result.data;
  }

  /**
   *  Gets an object having a property [item] which is a single message object for supplied botId and messageId
   *
   * @param {IGetMessageOptions} options - Instance of IGetMessageOptions
   * @returns {Promise<unknown>} An object having a property [item] which is a single message object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/messages/{messageId}
   *   get:
   *     operationId: findSingleMessage
   *     summary: Get message
   *     description: Gets an object having a property [item] which is a single message object for supplied botId and messageId.
   *     produces:
   *     - "application/json"
   *     consumes:
   *     - "application/json"
   *     parameters:
   *       - name: messageId
   *         required: true
   *         in: path
   *         description: The unique ID of a message.
   *         schema:
   *           type: string
   *       - name: botId
   *         required: true
   *         in: path
   *         description: The unique ID of the bot.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Find message details by given bot and message IDs
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineMessageDetailApiOutput'
   *       '401':
   *         description: Unauthorized.
   *       '403':
   *         description: Forbidden.
   *       '404':
   *         description: Not Found.
   *       '405':
   *         description: Invalid Input.
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - Messages
   */
  async get(options: IGetMessageOptions): Promise<unknown> {
    const url = `bots/${options.botId}/messages/${options.messageId}`;
    const result = await this.client.getInstance().get(url);

    return result.data;
  }

  /**
   * Gets an object having a property [items] which is list of all messages for conversation with [convId]
   *
   * @param {IListMessageByConversationOptions} options - Instance of IListMessageByConversationOptions
   * @returns {Promise<unknown>} An object having a property [items] which is list of all messages for conversation with [convId]
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/convs/{convId}/messages'
   *   get:
   *     operationId: findMessagesByConversation
   *     summary: List messages by conversation
   *     description: Gets an object having a property [items] which is list of all messages for conversation with [convId]
   *     produces:
   *     - "application/json"
   *     consumes:
   *     - "application/json"
   *     parameters:
   *       - name: botId
   *         required: true
   *         in: path
   *         description: The unique ID of the bot.
   *         schema:
   *           type: string
   *       - name: convId
   *         required: true
   *         in: path
   *         description: The unique ID of the conversation.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: A list of available messages filtered by given bot and conversation IDs
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineMessageListApiOutput'
   *               $ref: '#/components/schemas/BotEngineBotDetailApiOutput'
   *       '401':
   *         description: Unauthorized.
   *       '403':
   *         description: Forbidden.
   *       '404':
   *         description: Not Found.
   *       '405':
   *         description: Invalid Input.
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - Messages
   */
  async listByConversation(
    options: IListMessageByConversationOptions
  ): Promise<unknown> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages`;
    const result = await this.client.getInstance().get(url);

    return result.data;
  }

  /**
   *Gets an object having a property [item] which is a message object for conversation based on supplied botId, convId and messageId
   *
   * @param {IGetMessageByConversationOptions} options - Instance of IGetMessageByConversationOptions
   * @returns {Promise<unknown>} An object having a property [item] which is a message object for conversation based on supplied botId, convId and messageId.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/convs/{convId}/messages/{messageId}
   *   get:
   *     operationId: findSingleMessageInConversation
   *     summary: Get message by conversation
   *     description: Gets an object having a property [item] which is a message object for conversation based on supplied botId, convId and messageId.
   *     produces:
   *     - "application/json"
   *     consumes:
   *     - "application/json"
   *     parameters:
   *       - name: messageId
   *         required: true
   *         in: path
   *         description: The unique ID of a message.
   *         schema:
   *           type: string
   *       - name: botId
   *         required: true
   *         in: path
   *         description: The unique ID of the bot.
   *         schema:
   *           type: string
   *       - name: convId
   *         required: true
   *         in: path
   *         description: The unique ID of the conversation.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: 'Find message details by given bot, conversation and message IDs'
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineMessageDetailApiOutput'
   *               $ref: '#/components/schemas/BotEngineBotDetailApiOutput'
   *       '401':
   *         description: Unauthorized.
   *       '403':
   *         description: Forbidden.
   *       '404':
   *         description: Not Found.
   *       '405':
   *         description: Invalid Input.
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - Messages
   */
  async getByConversation(
    options: IGetMessageByConversationOptions
  ): Promise<unknown> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages/${options.messageId}`;
    const result = await this.client.getInstance().get(url);

    return result.data;
  }

  /**
   * Create a new message for a conversation against bot [botId] and conversation [convId].
   *
   * @param {ICreateMessageOptions} options - Instance of ICreateMessageOptions
   * @returns {Promise<unknown>} An object having a property [item] which is a message object type for conversation with convId and botId
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/convs/{convId}/messages
   *   post:
   *     operationId: CreateMessage
   *     summary: Create message
   *     description: Create a new message for a conversation against bot [botId] and conversation [convId].
   *     produces:
   *     - "application/json"
   *     consumes:
   *     - "application/json"
   *     parameters:
   *       - name: convId
   *         required: true
   *         in: path
   *         description: The unique ID of the conversation.
   *         schema:
   *           type: string
   *       - name: botId
   *         required: true
   *         in: path
   *         description: The unique ID of the bot.
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBotEngineMessageDto'
   *     responses:
   *       '201':
   *         description: Message has been successfully created.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineMessageDetailApiOutput'
   *       '401':
   *         description: Unauthorized.
   *       '403':
   *         description: Forbidden.
   *       '404':
   *         description: Not Found.
   *       '405':
   *         description: Invalid Input.
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - Messages
   */
  async create(options: ICreateMessageOptions): Promise<unknown> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages/`;
    const result = await this.client.getInstance().post(url, {
      body: options.body,
    });

    return result.data;
  }
}
