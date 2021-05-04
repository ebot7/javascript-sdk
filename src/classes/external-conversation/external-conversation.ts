import { Client } from '../client';
import { ConversationType } from '../conversation/conversation';

export interface IGetExternalConversationOptions {
  botId: string;
  externalId: string; //The unique ID of the conversation in the external platform
}

export interface IUpdateExternalConversationOptions
  extends IGetExternalConversationOptions {
  body: string | unknown;
}

export class ExternalConversation {
  constructor(private readonly client: Client) {}

  /**
   *  Gets an active conversation for bot with botId by its externalId
   *
   * @param {IGetExternalConversationOptions} options - Instance of IGetExternalConversationOptions
   * @returns {Promise<ConversationType>} Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async get(
    options: IGetExternalConversationOptions
  ): Promise<ConversationType> {
    const url = `bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.getInstance().get(url);

    return result.data.item;
  }

  /**
   * Updates an existing conversation by its botId and externalId
   *
   * @param {IUpdateExternalConversationOptions} options - Instance of IUpdateExternalConversationOptions
   * @returns {Promise<ConversationType>} Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  async patch(
    options: IUpdateExternalConversationOptions
  ): Promise<ConversationType> {
    const url = `bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.getInstance().patch(url, {
      body: options.body,
    });

    return result.data.item;
  }
}
