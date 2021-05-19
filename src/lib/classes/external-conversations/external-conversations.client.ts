import { Errors, GET, PATCH, Path } from 'typescript-rest';
import { Consumes, Produces, Response, Tags } from 'typescript-rest-swagger';
import {
  IEbot7GetExternalConversationOptions,
  IUpdateExternalConversationOptions,
} from '.';
import { Ebot7Client } from '../client';
import { IEbot7ConversationOutput } from '../conversations';

@Consumes('application/json')
@Produces('application/json')
@Tags(
  'bot',
  'bots',
  'ebot7',
  'sdk',
  'conv',
  'conversations',
  'external',
  'external-conversation'
)
export class Ebot7ExternalConversationClient {
  constructor(private readonly client: Ebot7Client) {}

  /**
   *  Gets an external conversation for bot with botId by its externalId
   *
   * @param  {IEbot7GetExternalConversationOptions} options - Instance of IEbot7GetExternalConversationOptions
   * @returns {Promise<IEbot7ConversationOutput>} A json object containing property item which is an external conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId/external-convs/:externalId')
  @Response<IEbot7ConversationOutput>(
    200,
    'A json object containing property item which is an external conversation object.'
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
    options: IEbot7GetExternalConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.get(url);

    return result.data;
  }

  /**
   * Updates an existing conversation by its botId and externalId
   *
   * @param {IUpdateExternalConversationOptions} options - Instance of IUpdateExternalConversationOptions
   * @returns  {Promise<IEbot7ConversationOutput>} A json object containing property item which is a conversation object.
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @PATCH
  @Path('bots/:botId/external-convs/:externalId')
  @Response<IEbot7ConversationOutput>(
    200,
    'A json object containing property item which is an external conversation object.'
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
  async patch(
    options: IUpdateExternalConversationOptions
  ): Promise<IEbot7ConversationOutput> {
    const url = `bots/${options.botId}/external-convs/${options.externalId}`;
    const result = await this.client.patch(url, options.payload);

    return result.data;
  }
}
