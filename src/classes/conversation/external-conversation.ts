import { Client } from '../client';

import {
  ConversationApiOutput,
  IGetExternalConversationOptions,
  IUpdateExternalConversationOptions,
} from './conversation.interface';

export class ExternalConversation {
  constructor(private readonly client: Client) {}

  /**
   *  Gets an active external conversation for bot with botId by its externalId
   *
   * @param {IGetExternalConversationOptions} options - Instance of IGetExternalConversationOptions
   * @returns {Promise<ConversationApiOutput>} An object having a property [item] which is a single external conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/external-convs/{externalId}
   *   get:
   *     operationId: findSingleExternalConversation
   *     summary: Get conversation by external ID
   *     description: Gets an active external conversation for a given bot by its external ID.
   *     produces:
   *     - "application/json"
   *     consumes:
   *     - "application/json"
   *     parameters:
   *       - name: externalId
   *         required: true
   *         in: path
   *         description: The unique ID of the conversation in the external platform.
   *         schema:
   *           type: string
   *       - name: botId
   *         required: true
   *         in: path
   *         description: The unique ID of the bot.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Conversation details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/BotEngineConversationDetailApiOutput'
   *       '401':
   *         description: Unauthorized.
   *       '403':
   *         description: Forbidden.
   *       '404':
   *         description: Not Found.
   *       '405':
   *         description: Invalid Input.
   *       '408':
   *         description: Request Timeout.
   *       '500':
   *         description: Internal Server Error.
   *     tags:
   *       - External Conversations
   */
  async get(
    options: IGetExternalConversationOptions
  ): Promise<ConversationApiOutput> {
    const url = `/bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.getInstance().get(url);

    return result.data;
  }

  /**
   * Updates an existing external conversation of a bot for supplied botId and externalId.
   *
   * @param {IUpdateExternalConversationOptions} options - Instance of IUpdateExternalConversationOptions
   * @returns {Promise<ConversationApiOutput>} An object having a property [item] which is a single external conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   *
   * @openapi
   * /bots/{botId}/external-convs/{externalId}
   *   patch:
   *    operationId: updateExternalConversation
   *    summary: Update conversation by external ID
   *    description: Updates an existing external conversation of a bot for supplied botId and externalId.
   *    produces:
   *    - "application/json"
   *    consumes:
   *    - "application/json"
   *    parameters:
   *      - name: externalId
   *        required: true
   *        in: path
   *        description: The unique ID of the conversation in the external platform.
   *        schema:
   *          type: string
   *      - name: botId
   *        required: true
   *        in: path
   *        description: The unique ID of the bot.
   *        schema:
   *          type: string
   *    requestBody:
   *      required: true
   *      content:
   *        application/json:
   *          schema:
   *            $ref: '#/components/schemas/PatchBotEngineConversationPayloadInput'
   *    responses:
   *      '201':
   *        description: Conversation has been successfully updated.
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/BotEngineConversationDetailApiOutput'
   *      '401':
   *        description: Unauthorized.
   *      '403':
   *        description: Forbidden.
   *      '404':
   *        description: Not Found.
   *      '405':
   *        description: Invalid Input.
   *      '408':
   *        description: Request Timeout.
   *      '500':
   *        description: Internal Server Error.
   *    tags:
   *      - External Conversations
   */
  async patch(
    options: IUpdateExternalConversationOptions
  ): Promise<ConversationApiOutput> {
    const url = `/bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.getInstance().patch(url, options.payload);

    return result.data;
  }
}