import { AxiosInstance } from 'axios';

import { createClient, IClientOptions } from '../helpers';

export class Client {
  private axios: AxiosInstance;

  private constructor(private readonly options: IClientOptions) {
    this.axios = createClient(this.options);
  }

  public getInstance(): AxiosInstance {
    if (this.axios) {
      return this.axios;
    } else {
      return (this.axios = createClient(this.options));
    }
  }
}
