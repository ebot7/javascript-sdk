import { Client, config } from './client';

// Default parameters to be assigned if present in config.json
const client = new Client();

describe('test Client class, methods and proper axios configuration', () => {
  it('should be an instance of a Client class', () => {
    expect(client).toBeInstanceOf(Client);
  });
  it('should have a getInstance method that always returns an AxiosInstance object', () => {
    expect(client.getInstance()).toBeInstanceOf(Object);
  });
  it('should have an axios instance that returns correct baseURL', () => {
    expect(client.getInstance()?.defaults?.baseURL).toEqual(config?.baseURL);
  });
  it('should have an axios instance that returns correct header bearer authorization', () => {
    expect(client.getInstance()?.defaults?.headers?.['Authorization']).toEqual(
      `Bearer ${config?.bearerToken}`
    );
  });
});
