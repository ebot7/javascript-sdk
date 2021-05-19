import { Errors, GET, Path } from 'typescript-rest';
import { Consumes, Produces, Response, Tags } from 'typescript-rest-swagger';
import { Ebot7Client, IEbot7ClientRequestPaging } from '../client';
import {
  IEbot7BotListOutput,
  IEbot7BotOutput,
  IEbot7GetBotOptions,
} from './bots.interfaces';

@Consumes('application/json')
@Produces('application/json')
@Tags('bot', 'bots', 'ebot7', 'sdk')
export class Ebot7BotClient {
  constructor(private readonly client: Ebot7Client) {}

  /**
   * Fetches list of botIds.
   *
   * @param {IEbot7ClientRequestPaging} paging
   * @returns {Promise<IEbot7BotListOutput>} List of bot Ids
   * @throws {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/')
  @Response<IEbot7BotListOutput>(
    200,
    'A json object containing property items which is a list of bot Ids.'
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
    paging: IEbot7ClientRequestPaging = {}
  ): Promise<IEbot7BotListOutput> {
    const url = 'bots';
    const result = await this.client.get(url, { paging });

    return result.data;
  }

  /**
   * Gets bot object for supplied botId
   *
   * @param {IEbot7GetBotOptions} options - Instance of IGetBotOptions
   * @returns {Promise<IEbot7BotOutput>} Single bot object output
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */

  @GET
  @Path('bots/:botId')
  @Response<IEbot7BotOutput>(
    200,
    'A json object containing property item which is a bot object.'
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
  async findOne(options: IEbot7GetBotOptions): Promise<IEbot7BotOutput> {
    const url = `bots/${options.botId}`;
    const result = await this.client.get(url);

    return result.data;
  }
}
