import { Errors, GET, PATCH, Path, POST } from 'typescript-rest';
import { Consumes, Produces, Response, Tags } from 'typescript-rest-swagger';
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

@Consumes('application/json')
@Produces('application/json')
@Tags('bot', 'bots', 'ebot7', 'sdk', 'conv', 'conversations')
export class Ebot7ConversationClient {
  constructor(private readonly client: Ebot7Client) {}

  /**
   * Fetches list of conversations based on botId.
   *
   * @param  {IEbot7ListConversationOptions} options - Instance of IEbot7ListConversationOptions
   * @returns {Promise<IEbot7ConversationListOutput>} A json object containing property items which is a list of conversation objects.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/convs')
  @Response<IEbot7ConversationListOutput>(
    200,
    'A json object containing property items which is a list of conversation objects.'
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
    options: IEbot7ListConversationOptions
  ): Promise<IEbot7ConversationListOutput> {
    const url = `bots/${options.botId}/convs`;

    const result = await this.client.get(url, {
      paging: options.paging,
      filter: this.parseFilter(options?.filter),
    });

    return result.data;
  }

  /**
   *  Gets conversation object for supplied botId and convId
   *
   * @param {IEbot7GetConversationOptions} options - Instance of IEbot7GetConversationOptions
   * @returns {Promise<IEbot7ConversationOutput>} A json object containing property item which is a conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/convs/:convId')
  @Response<IEbot7ConversationOutput>(
    200,
    'A json object containing property item which is a conversation object.'
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
  public async findOne(
    options: IEbot7GetConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `bots/${options.botId}/convs/${options.convId}`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Creates a new conversation for bot with botId
   *
   * @param {IEbot7CreateConversationOptions} options - Instance of IEbot7CreateConversationOptions
   * @returns {Promise<IEbot7ConversationOutput>} A json object containing property item which is a conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @POST
  @Path('bots/:botId/convs/')
  @Response<IEbot7ConversationOutput>(
    200,
    'A json object containing property item which is a conversation object.'
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
  public async create(
    options: IEbot7CreateConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `bots/${options.botId}/convs`;
    const result = await this.client.post(url, options.payload);

    return result.data;
  }

  /**
   * Updates a conversation for convId and bot with botId
   *
   * @param {IEbot7UpdateConversationOptions} options - Instance of IEbot7UpdateConversationOptions
   * @returns {Promise<IEbot7ConversationOutput>} Single conversation object
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @PATCH
  @Path('bots/:botId/convs/:convId')
  @Response<IEbot7ConversationOutput>(
    200,
    'A json object containing property item which is a conversation object.'
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
  public async patch(
    options: IEbot7UpdateConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `bots/${options.botId}/convs/${options.convId}`;
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
