import { Errors, GET, Path } from 'typescript-rest';
import { Consumes, Produces, Response, Tags } from 'typescript-rest-swagger';
import { Ebot7Client } from '../client';
import {
  IEbot7CreateMessageOptions,
  IEbot7GetMessageByConversationOptions,
  IEbot7GetMessagesByBotIdAndMessageId,
  IEbot7GetMessagesOptions,
  IEbot7ListMessageByConversationOptions,
  IEbot7MessageInputFilter,
  IEbot7MessageListOutput,
  IEbot7MessageOutput,
} from './messages.interfaces';

@Consumes('application/json')
@Produces('application/json')
@Tags('bot', 'bots', 'ebot7', 'sdk', 'message', 'messages')
export class Ebot7MessageClient {
  constructor(private readonly client: Ebot7Client) {}

  /**
   * Fetches list of messages based on botId.
   *
   * @param {IEbot7GetMessagesOptions} options - Instance of IEbot7GetMessagesOptions
   * @returns  {Promise<IEbot7MessageListOutput>} A json object containing property items which is a list of message objects.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/messages')
  @Response<IEbot7MessageListOutput>(
    200,
    'A json object containing property items which is a list of message objects.'
  )
  @Response<Errors.BadRequestError>(
    400,
    'The request could not be understood by the server due to malformed syntax'
  )
  @Response<Errors.UnauthorizedError>(
    401,
    'The request requires user authentication.'
  )
  @Response<Errors.ForbiddenError>(
    403,
    'The server understood the request, but is refusing to fullfil it.'
  )
  @Response<Errors.NotFoundError>(
    404,
    'The server has not found anything matching the Request-URI.'
  )
  @Response<Errors.InternalServerError>(
    500,
    'The server encountered an unexpected condition or error.'
  )
  public async findMany(
    options: IEbot7GetMessagesOptions
  ): Promise<IEbot7MessageListOutput> {
    const url = `bots/${options.botId}/messages`;

    const result = await this.client.get(url, {
      paging: options.paging,
      filter: this.parseFilter(options?.filter),
    });

    return result.data;
  }

  /**
   *  Gets message object for supplied botId and messageId
   *
   * @param {IEbot7GetMessagesByBotIdAndMessageId} options - Instance of IEbot7GetMessagesByBotIdAndMessageId
   * @returns {Promise<IEbot7MessageOutput>} A json object containing property item which is a message object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/messages/:messageId')
  @Response<IEbot7MessageOutput>(
    200,
    'A json object containing property item which is a message object.'
  )
  @Response<Errors.BadRequestError>(
    400,
    'The request could not be understood by the server due to malformed syntax'
  )
  @Response<Errors.UnauthorizedError>(
    401,
    'The request requires user authentication.'
  )
  @Response<Errors.ForbiddenError>(
    403,
    'The server understood the request, but is refusing to fullfil it.'
  )
  @Response<Errors.NotFoundError>(
    404,
    'The server has not found anything matching the Request-URI.'
  )
  @Response<Errors.InternalServerError>(
    500,
    'The server encountered an unexpected condition or error.'
  )
  async findOne(
    options: IEbot7GetMessagesByBotIdAndMessageId
  ): Promise<IEbot7MessageOutput> {
    const url = `bots/${options.botId}/messages/${options.messageId}`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Fetches list of all messages for conversation with [convId]
   *
   * @param {IEbot7ListMessageByConversationOptions} options - Instance of IEbot7ListMessageByConversationOptions
   * @returns {Promise<IEbot7MessageListOutput>} A json object containing property items which is a list of message objects.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/convs/:convId/messages')
  @Response<IEbot7MessageListOutput>(
    200,
    'A json object containing property items which is a list of message objects.'
  )
  @Response<Errors.BadRequestError>(
    400,
    'The request could not be understood by the server due to malformed syntax'
  )
  @Response<Errors.UnauthorizedError>(
    401,
    'The request requires user authentication.'
  )
  @Response<Errors.ForbiddenError>(
    403,
    'The server understood the request, but is refusing to fullfil it.'
  )
  @Response<Errors.NotFoundError>(
    404,
    'The server has not found anything matching the Request-URI.'
  )
  @Response<Errors.InternalServerError>(
    500,
    'The server encountered an unexpected condition or error.'
  )
  async findManyByConversation(
    options: IEbot7ListMessageByConversationOptions
  ): Promise<IEbot7MessageListOutput> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages`;
    const result = await this.client.get(url, {
      paging: options.paging,
      filter: this.parseFilter(options?.filter),
    });

    return result.data;
  }

  /**
   * Gets message object for conversation based on supplied botId, convId and messageId
   *
   * @param {IEbot7GetMessageByConversationOptions} options - Instance of IEbot7GetMessageByConversationOptions
   * @returns {Promise<IEbot7MessageOutput>} A json object containing property item which is a message object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/convs/:convId/messages/:messageId')
  @Response<IEbot7MessageOutput>(
    200,
    'A json object containing property item which is a message object.'
  )
  @Response<Errors.BadRequestError>(
    400,
    'The request could not be understood by the server due to malformed syntax'
  )
  @Response<Errors.UnauthorizedError>(
    401,
    'The request requires user authentication.'
  )
  @Response<Errors.ForbiddenError>(
    403,
    'The server understood the request, but is refusing to fullfil it.'
  )
  @Response<Errors.NotFoundError>(
    404,
    'The server has not found anything matching the Request-URI.'
  )
  @Response<Errors.InternalServerError>(
    500,
    'The server encountered an unexpected condition or error.'
  )
  async findOneByConversation(
    options: IEbot7GetMessageByConversationOptions
  ): Promise<IEbot7MessageOutput> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages/${options.messageId}`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Create a new message for a conversation against bot [botId] and conversation [convId].
   *
   * @param {IEbot7CreateMessageOptions} options - Instance of IEbot7CreateMessageOptions
   * @returns {Promise<IEbot7MessageOutput>} A json object containing property item which is a message object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/convs/:convId/messages')
  @Response<IEbot7MessageOutput>(
    200,
    'A json object containing property item which is a message object.'
  )
  @Response<Errors.BadRequestError>(
    400,
    'The request could not be understood by the server due to malformed syntax'
  )
  @Response<Errors.UnauthorizedError>(
    401,
    'The request requires user authentication.'
  )
  @Response<Errors.ForbiddenError>(
    403,
    'The server understood the request, but is refusing to fullfil it.'
  )
  @Response<Errors.NotFoundError>(
    404,
    'The server has not found anything matching the Request-URI.'
  )
  @Response<Errors.InternalServerError>(
    500,
    'The server encountered an unexpected condition or error.'
  )
  async create(
    options: IEbot7CreateMessageOptions
  ): Promise<IEbot7MessageOutput> {
    const url = `bots/${options.botId}/convs/${options.convId}/messages`;
    const result = await this.client.post(url, options.payload);

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
