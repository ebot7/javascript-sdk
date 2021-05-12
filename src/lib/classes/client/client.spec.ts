import { expectPublicApi } from '../../helpers/client/axios-client-helper';

import { Client } from './client';
import 'dotenv/config';

const BOT_ID = process.env.SDK_TEST_BOT_ID;
const MOCK_TOKEN = process.env.SDK_MOCK_BEARER_TOKEN;
const TEST_BASE_URL = process.env.SDK_TEST_BASE_URL;

const client = new Client({
  bearerToken: MOCK_TOKEN || '',
  baseURL: TEST_BASE_URL,
});

describe('test Client class, methods and proper axios configuration', () => {
  it('should be an instance of a Client class', () => {
    expect(client).toBeInstanceOf(Client);
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
    const request = client.axiosRef.get(
      `v1/bots/${BOT_ID}/convs?page[offset]=1&page[limit]=1`
    );

    await expectPublicApi(request).toHavePagingState({
      limit: 1,
      offset: 1,
    });
  });

  it('should throw a 400 if malformed filter query param is provided', async () => {
    const request = client.axiosRef.get(
      `v1/bots/${BOT_ID}/convs?page[offset]=1&filter=NULL`
    );
    await expectPublicApi(request).toThrowStatusCode(400);
  });
});
