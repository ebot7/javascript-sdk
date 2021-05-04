import { Client } from '../client';

export interface IListBotOptions {
  offset?: number;
  limit?: number;
}

export interface IGetBotOptions {
  botId: string;
}

export type BotType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
};

export class Bot {
  constructor(private readonly client: Client) {}

  /**
   * Fetches list of botIds.
   *
   * @param {IListBotOptions} options - Instance of IListBotOptions
   * @returns {Promise<Array<string>>} List of bot Ids
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots:
   *   get:
   *     operationId: findManyBots
   *     summary: List bots
   *     description: Get a list of bot ids for which the current application which is enabled.
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
   *           type: number
   *       - description: The offset of the first records to return.
   *         required: false
   *         name: offset
   *         in: query
   *         schema:
   *           type: number
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
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - Bots
   */
  async list(options: IListBotOptions = {}): Promise<Array<string>> {
    const url = '/bots/';
    const result = await this.client.getInstance().get(url, {
      params: {
        offset: options?.offset,
        limit: options?.limit,
      },
    });

    return result.data.items;
  }

  /**
   * Gets bot object for supplied botId
   *
   * @param {IGetBotOptions} options - Instance of IGetBotOptions
   * @returns {Promise<Bot>} Single bot object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   *
   *
   */
  async get(options: IGetBotOptions): Promise<BotType> {
    const url = `/bots/${options.botId}`;
    const result = await this.client.getInstance().get(url);

    return result.data.item;
  }
}
