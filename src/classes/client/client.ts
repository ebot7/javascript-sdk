import Axios, { AxiosInstance } from 'axios';

import { IClientOptions } from './client.interface';
import config from './config.json';

export class Client {
  private axios: AxiosInstance;

  constructor(
    private readonly options: IClientOptions = {
      baseURL: config?.baseURL,
      bearerToken: config?.bearerToken,
      timeout: config?.timeout,
    }
  ) {
    this.axios = this.create(this.options);
  }

  /**
   * Gets the underlying instantiated AxiosInstance
   * @returns {AxiosInstance} Instantiated AxiosInstance
   */
  public getInstance(): AxiosInstance {
    if (this.axios) {
      return this.axios;
    } else {
      this.axios = this.create(this.options);
      return this.axios;
    }
  }

  /**
   * Creates and returns an AxiosInstance
   * @param {IClientOptions} options - Instance of ClientOptions}
   * @returns {AxiosInstance} Instance of AxiosInstance
   */
  private create(options: IClientOptions): AxiosInstance {
    return Axios.create({
      ...options,
      headers: {
        Authorization: `Bearer ${options?.bearerToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(options?.headers || {}),
      },
      baseURL: `${options.baseURL}`,
    });
  }
}

export { config };
