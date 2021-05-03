import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import config from '../../config/config.json';

export interface IClientOptions extends AxiosRequestConfig {
  readonly bearerToken: string;
  readonly baseURL: string;
}

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

  public getInstance(): AxiosInstance {
    if (this.axios) {
      return this.axios;
    } else {
      this.axios = this.create(this.options);
      return this.axios;
    }
  }

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
