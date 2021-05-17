import { Ebot7Client } from './client';

const MOCK_TOKEN =
  'xapp-607952a149247f795d7304f9-48863fb0b20dec2b9a8a585fc63a6b8017cbab48';
const TEST_BASE_URL = 'http://example.com';
//const BOT_ID = "603fbbac6a31143d3034f313";

const client = new Ebot7Client({
  bearerToken: MOCK_TOKEN || '',
  baseURL: TEST_BASE_URL,
});

describe('test Client class, methods and proper axios configuration', () => {
  it('should be an instance of a Client class', () => {
    expect(client).toBeInstanceOf(Ebot7Client);
  });
  it('should have a getInstance method that always returns an AxiosInstance object', () => {
    expect(client.axiosRef).toBeInstanceOf(Object);
  });
  it('should have an axios instance that returns correct header bearer authorization', () => {
    expect(client.axiosRef?.defaults?.headers?.['Authorization']).toEqual(
      `Bearer ${MOCK_TOKEN}`
    );
  });
});

describe('test bot list api method', () => {
  const mock = jest.spyOn(client.axiosRef, 'get');
  it('should be called with correct path', async () => {
    client.get(`v1/bots/`);
    expect(mock).toBeCalledWith(`v1/bots/`, {});
  });

  it('should be called with correct pagination', async () => {
    const paging = {
      offset: 0,
      limit: 10,
    };
    client.get(`v1/bots/`, { paging });

    const params = {
      'page[offset]': paging.offset.toString(),
      'page[limit]': paging.limit.toString(),
    };

    expect(mock).toBeCalledWith(`v1/bots/`, { params });
  });

  it('should be called with correct filters', async () => {
    const now = new Date();
    const then = new Date();
    const filter = {
      createdAt: now,
      updatedAt: then,
    };
    client.get(`v1/bots/`, { filter });

    const params = {
      'filter[createdAt]': filter.createdAt.toISOString(),
      'filter[updatedAt]': filter.updatedAt.toISOString(),
    };

    expect(mock).toBeCalledWith(`v1/bots/`, { params });
  });

  it('should be called with correct pagination and filters', async () => {
    const paging = {
      offset: 0,
      limit: 10,
    };
    const now = new Date();
    const then = new Date();
    const filter = {
      createdAt: now,
      updatedAt: then,
    };
    client.get(`v1/bots/`, { paging, filter });

    const filterParams = {
      'filter[createdAt]': filter.createdAt.toISOString(),
      'filter[updatedAt]': filter.updatedAt.toISOString(),
    };

    const pagingParams = {
      'page[offset]': paging.offset.toString(),
      'page[limit]': paging.limit.toString(),
    };

    const params = { ...pagingParams, ...filterParams };

    expect(mock).toBeCalledWith(`v1/bots/`, { params });
  });
});
