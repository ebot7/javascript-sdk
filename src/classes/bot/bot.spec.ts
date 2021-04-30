import { Client } from './client';
import config from './config.json';

// Default parameters to be assigned if present in config.json
const client = new Client();

describe('test Client class, methods and proper axios configuration', () => {
  it('should be an instance of a Client class', () => {
    expect(client instanceof Client).toBe(true);
  });
  it('should have a getInstance method that always returns an AxiosInstance object', () => {
    expect(client.getInstance() instanceof Object).toBe(true);
  });
  it('should have an axios instance that returns correct baseURL', () => {
    expect(client.getInstance().defaults.baseURL).toBe(config?.baseURL);
  });
  it('should have an axios instance that returns correct header bearer authorization', () => {
    expect(client.getInstance()?.defaults?.headers?.['Authorization']).toBe(
      `Bearer ${config?.bearerToken}`
    );
  });
});
