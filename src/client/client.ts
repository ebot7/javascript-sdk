import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
export interface IClientOptions extends AxiosRequestConfig {
  readonly bearerToken: string;
}

export class Client {
  private axios: AxiosInstance;

  private constructor(private readonly options: IClientOptions) {
    this.axios = this.create(this.options);
  }

  public getInstance(): AxiosInstance {
    if (this.axios) {
      return this.axios;
    } else {
      return (this.axios = this.create(this.options));
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
    });
  }
}
