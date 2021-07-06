import {
  IEbot7GetExternalConversationOptions,
  IUpdateExternalConversationOptions,
} from '.';
import { Ebot7Client } from '../client';
import {
  IEbot7ConversationOutput,
  IEbot7CreateConversationOptions,
} from '../conversations';

export class Ebot7ExternalConversationClient {
  constructor(private readonly client: Ebot7Client) {}

  /**
   *  Gets an external conversation for bot with botId by its externalId
   *
   * @param  options
   * @returns Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async findOne(
    options: IEbot7GetExternalConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.get(url);
    // Return first item in list of return conversations. 
    // Adapt output to expected return type.
    return {item: result.data?.items?.[0]};
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
    const url = `bots/${options.botId}/external-convs`;
    const result = await this.client.post(url, options.payload);

    return result.data;
  }

  /**
   * Updates an existing conversation by its botId and externalId
   *
   * @param options
   * @returns  Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async patch(
    options: IUpdateExternalConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.patch(url, options.payload);

    return result.data;
  }
}
