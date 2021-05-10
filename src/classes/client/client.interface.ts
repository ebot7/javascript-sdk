import { AxiosRequestConfig } from 'axios';

export interface IClientOptions extends AxiosRequestConfig {
  readonly bearerToken: string;
  readonly baseURL: string;
}
