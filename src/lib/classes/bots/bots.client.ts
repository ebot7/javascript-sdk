import { Ebot7Client, IClientRequestPaging } from '../client';
import {
  IEbot7Bot,
  IEbot7BotList,
  IEbot7GetBotOptions,
} from './bots.interface';

export class Ebot7BotClient {
  public static BASE_PATH = 'v1/bots';

  constructor(private readonly client: Ebot7Client) {}

  /**
   * Fetches list of botIds.
   *
   * @param paging
   * @returns List of bot Ids
   * @throws {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  public async findMany(
    paging: IClientRequestPaging = {}
  ): Promise<IEbot7BotList> {
    const url = Ebot7BotClient.BASE_PATH;
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
  async findOne(options: IEbot7GetBotOptions): Promise<IEbot7Bot> {
    const url = `${Ebot7BotClient.BASE_PATH}/${options.botId}`;
    const result = await this.client.get(url);

    return result.data;
  }
}
