import { Client } from '../client';

import {
  BotListApiOutput,
  BotApiOutput,
  IGetBotOptions,
  IListBotOptions,
} from './bot.interface';
export class Bot {
  constructor(private readonly client: Client) {}

  /**
   * Gets an object having a property [items] which is a list of bot Ids.
   *
   * @param {IListBotOptions} options - Instance of IListBotOptions
   * @returns {Promise<BotListApiOutput>} An object having a property [items] which is a list of bot Ids
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots:
   *   get:
   *     operationId: findManyBots
   *     summary: List bots
   *     description: Gets an object having a property [items] which is a list of bot Ids.
   *     produces:
   *     - "application/json"
   *     consumes:
   *     - "application/json"
   *     parameters:
   *       - description: The maximum number of records to return.
   *         required: false
   *         name: limit
   *         in: query
   *         schema:
   *           type: integer
   *           format: int32
   *       - description: The offset of the first records to return.
   *         required: false
   *         name: offset
   *         in: query
   *         schema:
   *           type: integer
   *           format: int32
   *     responses:
   *       '200':
   *         description: A list of available bots
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineBotListApiOutput'
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
   *       - Bots
   */
  async list(options: IListBotOptions = {}): Promise<BotListApiOutput> {
    const url = '/bots/';
    const result = await this.client.getInstance().get(url, {
      params: {
        offset: options?.offset,
        limit: options?.limit,
      },
    });

    return result.data;
  }

  /**
   * Gets an object having a property [item] which is a single bot details.
   *
   * @param {IGetBotOptions} options - Instance of IGetBotOptions
   * @returns {Promise<BotApiOutput>} An object having a property [item] which is a single bot details
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}:
   *   get:
   *     operationId: findSingleBot
   *     summary: Get bot
   *     description: Gets an object having a property [item] which is a single bot details.
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
   *         description: A bot details object
   *         content:
   *           application/json:
   *             schema:
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
   *       - Bots
   *
   */
  async get(options: IGetBotOptions): Promise<BotApiOutput> {
    const url = `/bots/${options.botId}`;
    const result = await this.client.getInstance().get(url);

    return result.data;
  }
}
