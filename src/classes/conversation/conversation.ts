import { Client } from '../client';

export interface IListConversationOptions {
  botId: string;
  createdAt?: string;
  updatedAt?: string;
  filter?: string;
  offset?: number;
  limit?: number;
}
export interface IGetConversationOptions {
  botId: string;
  convId: string;
}

export interface ICreateConversationOptions {
  botId: string;
  payload: unknown;
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
   * Gets an object having a property [items] which is a list of conversations.
   *
   * @param {IListConversationOptions} options - Instance of IListConversationOptions
   * @returns {Promise<unknown>} An object having a property [items] which is a list of conversations.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/convs
   *   get:
   *     operationId: findManyConversations
   *     summary: List conversations
   *     description: Gets an object having a property [item] which is a list of conversations.
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
   *       - description: The creation date of the conversation.
   *         required: false
   *         name: createdAt
   *         in: query
   *         schema:
   *           format: date-time
   *           type: string
   *       - description: The date of the last update of this conversation.
   *         required: false
   *         name: updatedAt
   *         in: query
   *         schema:
   *           format: date-time
   *           type: string
   *       - description: The maximum number of records to return.
   *         required: false
   *         name: limit
   *         in: query
   *         schema:
   *           type: number
   *           format: int32
   *       - description: The offset of the first record to return.
   *         required: false
   *         name: offset
   *         in: query
   *         schema:
   *           type: number
   *           format: int32
   *     responses:
   *       '200':
   *         description: A list of available conversations for the given bot
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineConversationListApiOutput'
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
   *       - Conversations
   */
  async list(options: IListConversationOptions): Promise<unknown> {
    const url = `/bots/${options.botId}/convs`;
    const result = await this.client.getInstance().get(url, {
      params: {
        'filter[createdAt]': options?.createdAt,
        'filter[updatedAt]': options?.updatedAt,
        'page[offset]': options?.offset,
        'page[limit]': options?.limit,
      },
    });

    return result.data;
  }

  /**
   * Gets an object having a property [item] which is a single conversation object for supplied botId and convId
   *
   * @param {IGetConversationOptions} options - Instance of IGetConversationOptions
   * @returns {Promise<unknown} An object having a property [item] which is a single conversation object for supplied botId and convId
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/convs/{convId}
   *   get:
   *     operationId: findSingleConversation
   *     summary: Get conversation
   *     description: Gets an object having a property [item] which is a single conversation object for supplied botId and convId
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
   *     responses:
   *       '200':
   *         description: Conversation details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineConversationDetailApiOutput'
   *       '401':
   *         description: Unauthorized.
   *       '403':
   *        description: Forbidden.
   *       '404':
   *         description: Not Found.
   *       '405':
   *         description: Invalid Input.
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - Conversations
   */
  async get(options: IGetConversationOptions): Promise<unknown> {
    const url = `/bots/${options.botId}/convs/${options.convId}`;
    const result = await this.client.getInstance().get(url);

    return result.data;
  }

  /**
   * Creates a new conversation for bot with botId
   *
   * @param {ICreateConversationOptions} options - Instance of ICreateConversationOptions
   * @returns {Promise<unknown>} An object having a property [item] which is a single conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/convs
   *   post:
   *     operationId: createConversation
   *     summary: Create conversation
   *     description: Creates a new conversation for bot with botId.
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
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateBotEngineConversationPayloadInput'
   *     responses:
   *       '201':
   *         description: Conversation has been successfully created.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineConversationDetailApiOutput'
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
   *       - Conversations
   */
  async create(options: ICreateConversationOptions): Promise<unknown> {
    const url = `/bots/${options.botId}/convs`;
    const result = await this.client.getInstance().post(url, options.payload);

    return result.data;
  }

  /**
   * Updates an existing conversation for supplied botId and convId.
   *
   * @param {IUpdateConversationOptions} options - Instance of IUpdateConversationOptions
   * @returns {Promise<unknown>} An object having a property [item] which is a single conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/convs/{convId}
   *   patch:
   *     operationId: updateConversation
   *     summary: Update conversation
   *     description: Updates an existing conversation for supplied botId and convId.
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
   *             $ref: '#/components/schemas/PatchBotEngineConversationPayloadInput'
   *     responses:
   *       '201':
   *         description: Conversation has been successfully updated.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineConversationDetailApiOutput'
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
   *       - Conversations
   */
  async patch(options: IUpdateConversationOptions): Promise<unknown> {
    const url = `/bots/${options.botId}/convs/${options.convId}`;
    const result = await this.client.getInstance().patch(url, options.payload);

    return result.data;
  }
}
