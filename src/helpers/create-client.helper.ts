import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IClientOptions extends AxiosRequestConfig {
  readonly bearerToken: string;
}

export function createClient(options: IClientOptions): AxiosInstance {
  const axios = Axios.create({
    ...options,
    headers: {
      Authorization: `Bearer ${options?.bearerToken}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(options?.headers || {}),
    },
  });

  return axios;
}
