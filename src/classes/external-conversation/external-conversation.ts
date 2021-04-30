import { Client } from '../client';

import { ConversationType } from './conversation';

export interface IGetExternalConversationOptions {
  botId: string;
  externalId: string; //The unique ID of the conversation in the external platform
}

export interface IUpdateExternalConversationOptions
  extends IGetExternalConversationOptions {
  body: string | unknown;
}

export class ExternalConversation {
  private constructor(private readonly client: Client) {}

  /**
   *  Gets an active conversation for bot with botId by its externalId
   *
   * @param {IGetExternalConversationOptions} options - Instance of IGetExternalConversationOptions
   * @returns {Promise<ConversationType>} Single conversation object
   * @throws {Forbidden} HTTP Error (403) if botId and/or externalId are not correct
   */
  async get(
    options: IGetExternalConversationOptions
  ): Promise<ConversationType> {
    const url = `/v1/bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.getInstance().get(url);

    return result.data.item;
  }

  /**
   * Updates an existing conversation by its botId and externalId
   *
   * @param {IUpdateExternalConversationOptions} options - Instance of IUpdateExternalConversationOptions
   * @returns {Promise<ConversationType>} Single conversation object
   * @throws {Forbidden} HTTP Error (403) if botId and/or externalId are not correct
   */
  async update(
    options: IUpdateExternalConversationOptions
  ): Promise<ConversationType> {
    const url = `/v1/bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.getInstance().post(url, {
      body: options.body,
    });

    return result.data.item;
  }
}
