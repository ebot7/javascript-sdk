import {
  IEbot7GetExternalConversationOptions,
  IEbot7UpdateExternalConversationOptions,
} from '.';
import { Ebot7Client } from '../client';
import { IEbot7Conversation } from '../conversations';

export class Ebot7ExternalConversationClient {
  public static BASE_PATH = 'v1/bots';

  constructor(private readonly client: Ebot7Client) {}

  /**
   *  Gets an active conversation for bot with botId by its externalId
   *
   * @param  options
   * @returns Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async findOne(
    options: IEbot7GetExternalConversationOptions
  ): Promise<IEbot7Conversation> {
    const url = `${Ebot7ExternalConversationClient.BASE_PATH}/${options.botId}/external-convs/${options.externalId}`;
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
    options: IEbot7UpdateExternalConversationOptions
  ): Promise<IEbot7Conversation> {
    const url = `${Ebot7ExternalConversationClient.BASE_PATH}/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.patch(url, {
      data: options.data,
    });

    return result.data;
  }
}
