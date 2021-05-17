import {
  IEbot7GetExternalConversationOptions,
  IUpdateExternalConversationOptions,
} from '.';
import { Ebot7Client } from '../client';
import { IEbot7ConversationOutput } from '../conversations';

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
