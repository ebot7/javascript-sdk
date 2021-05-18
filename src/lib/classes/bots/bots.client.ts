import { Ebot7Client, IEbot7ClientRequestPaging } from '../client';
import {
  IEbot7BotListOutput,
  IEbot7BotOutput,
  IEbot7GetBotOptions,
} from './bots.interfaces';

export class Ebot7BotClient {
  constructor(private readonly client: Ebot7Client) {}

  /**
   * Fetches list of botIds.
   *
   * @param paging
   * @returns List of bot Ids
   * @throws {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  public async findMany(
    paging: IEbot7ClientRequestPaging = {}
  ): Promise<IEbot7BotListOutput> {
    const url = 'bots';
    const result = await this.client.get(url, { paging });

    return result.data;
  }

  /**
   * Gets bot object for supplied botId
   *
   * @param options - Instance of IGetBotOptions
   * @returns Single bot object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async findOne(options: IEbot7GetBotOptions): Promise<IEbot7BotOutput> {
    const url = `bots/${options.botId}`;
    const result = await this.client.get(url);

    return result.data;
  }
}
