import { Ebot7Client } from '../client';
import {
  IEbot7CreateMessageOptions,
  IEbot7GetMessageByConversationOptions,
  IEbot7GetMessagesByBotIdAndMessageId,
  IEbot7GetMessagesByBotIdOptions,
  IEbot7ListMessageByConversationOptions,
  IEbot7Message,
  IEbot7MessageInputFilter,
  IEbot7MessageListOutput,
  IEbot7MessageOutput,
} from './messages.interfaces';

export class Ebot7MessageClient {
  public static BASE_PATH = 'v1/bots';

  constructor(private readonly client: Ebot7Client) {}

  /**
   * Fetches list of messages based on botId.
   *
   * @param options IEbot7GetMessagesByBotIdOptions
   * @returns  List of message object type
   * @throws {Forbidden} HTTP Error (403) if botId is not correct
   */
  public async findMany(
    options: IEbot7GetMessagesByBotIdOptions
  ): Promise<IEbot7MessageListOutput> {
    const url = `${Ebot7MessageClient.BASE_PATH}/${options.botId}/messages`;
    const parsedFilter = this.parseFilter(options?.filter);

    const result = await this.client.get(url, {
      ...(options.paging && { paging: options.paging }),
      ...(parsedFilter && parsedFilter !== {} && { filter: parsedFilter }),
    });

    return result.data;
  }

  /**
   *  Gets message object for supplied botId and messageId
   *
   * @param options
   * @returns Single message object
   * @throws {Forbidden} HTTP Error (403) if botId and/or messageId are not correct
   */
  async findOne(
    options: IEbot7GetMessagesByBotIdAndMessageId
  ): Promise<IEbot7MessageOutput> {
    const url = `${Ebot7MessageClient.BASE_PATH}/${options.botId}/messages/${options.messageId}`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Fetches list of all messages for conversation with [convId]
   *
   * @param options - Instance of IListMessageByConversationOptions
   * @returns List of message object type for conversation with convId
   * @throws {Forbidden} HTTP Error (403) if botId and/or convId are not correct
   */
  async findManyByConversation(
    options: IEbot7ListMessageByConversationOptions
  ): Promise<IEbot7MessageListOutput> {
    const url = `${Ebot7MessageClient.BASE_PATH}/${options.botId}/convs/${options.convId}/messages`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Gets message object for conversation based on supplied botId, convId and messageId
   *
   * @param options - Instance of IGetMessageByConversationOptions
   * @returns Single message object type for conversation with convId
   * @throws {Forbidden} HTTP Error (403) if botId and/or convId and/or messageId are not correct
   */
  async findOneByConversation(
    options: IEbot7GetMessageByConversationOptions
  ): Promise<IEbot7MessageOutput> {
    const url = `${Ebot7MessageClient.BASE_PATH}/${options.botId}/convs/${options.convId}/messages/${options.messageId}`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Create a new message for a conversation against bot [botId] and conversation [convId].
   *
   * @param {ICreateMessageOptions} options - Instance of ICreateMessageOptions
   * @returns {Promise<MessageType>} Single message object type for conversation with convId
   * @throws {Forbidden} HTTP Error (403) if botId and/or convId are not correct
   */
  async create(
    options: IEbot7CreateMessageOptions
  ): Promise<IEbot7MessageOutput> {
    const url = `${Ebot7MessageClient.BASE_PATH}/${options.botId}/convs/${options.convId}/messages`;
    const result = await this.client.post(url, {
      data: options.payload,
    });

    return result.data;
  }

  protected parseFilter(
    filter: IEbot7MessageInputFilter | undefined
  ): Record<string, string | number | Date | boolean> | undefined {
    return filter
      ? Reflect.ownKeys(filter).reduce((acc, key) => {
          const filterKey = `filter[${String(key)}]`;
          const filterValue = filter[key as keyof IEbot7MessageInputFilter];
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
