import {
  IEbot7ConversationFilterOptions,
  IEbot7ConversationListOutput,
  IEbot7ConversationOutput,
  IEbot7CreateConversationOptions,
  IEbot7GetConversationOptions,
  IEbot7ListConversationOptions,
  IEbot7UpdateConversationOptions,
} from '.';
import { Ebot7Client } from '../client';

export class Ebot7ConversationClient {
  public static BASE_PATH = 'v1/bots';

  constructor(private readonly client: Ebot7Client) {}

  /**
   * Fetches list of conversations based on botId.
   *
   * @param  options
   * @returns List of conversation object type
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  public async findMany(
    options: IEbot7ListConversationOptions
  ): Promise<IEbot7ConversationListOutput> {
    const url = `${Ebot7ConversationClient.BASE_PATH}/${options.botId}/convs`;

    const result = await this.client.get(url, {
      paging: options.paging,
      filter: this.parseFilter(options?.filter),
    });

    return result.data;
  }

  /**
   *  Gets conversation object for supplied botId and convId
   *
   * @param options - Instance of IGetConversationOptions
   * @returns Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  public async findOne(
    options: IEbot7GetConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `${Ebot7ConversationClient.BASE_PATH}/${options.botId}/convs/${options.convId}`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Creates a new conversation for bot with botId
   *
   * @param  options - Instance of ICreateConversationOptions
   * @returns Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  public async create(
    options: IEbot7CreateConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `${Ebot7ConversationClient.BASE_PATH}/${options.botId}/convs`;
    const result = await this.client.post(url, options.payload);

    return result.data;
  }

  /**
   * Updates a conversation for convId and bot with botId
   *
   * @param options - Instance of IUpdateConversationOptions
   * @returns Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  public async patch(
    options: IEbot7UpdateConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `${Ebot7ConversationClient.BASE_PATH}/${options.botId}/convs/${options.convId}`;
    const result = await this.client.patch(url, options.payload);

    return result.data;
  }

  protected parseFilter(
    filter: IEbot7ConversationFilterOptions | undefined
  ): Record<string, string | number | Date | boolean> | undefined {
    return filter
      ? Reflect.ownKeys(filter).reduce((acc, key) => {
          const filterKey = `filter[${String(key)}]`;
          const filterValue =
            filter[key as keyof IEbot7ConversationFilterOptions];
          if (typeof filterValue === 'string') {
            acc[filterKey] = filterValue;
          } else if (typeof filterValue === 'number') {
            acc[filterKey] = filterValue;
          } else if (typeof filterValue === 'boolean') {
            acc[filterKey] = filterValue;
          } else if (filterValue instanceof Date) {
            acc[filterKey] = filterValue.toISOString();
          }

          return acc;
        }, {} as Record<string, string | number | Date | boolean>)
      : undefined;
  }
}
