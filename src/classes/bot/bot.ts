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
   */
  async list(options: IListBotOptions = {}): Promise<Array<string>> {
    const url = 'v1/bots/';
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
   * @throws {Forbidden} HTTP Error (403) if botId is not correct
   */
  async get(options: IGetBotOptions): Promise<BotType> {
    const url = `v1/bots/${options.botId}`;
    const result = await this.client.getInstance().get(url);

    return result.data.item;
  }
}
