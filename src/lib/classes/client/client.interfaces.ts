import { AxiosRequestConfig } from 'axios';

export interface IEbot7ClientConfig extends AxiosRequestConfig {
  readonly bearerToken: string;
  readonly baseURL?: string;
}

export type IEbot7ClientRequestFilter = Record<
  string,
  string | number | boolean | Date
>;

export interface IEbot7ClientRequestPaging {
  /**
   * The offset
   * @IsInt
   */
  offset?: number;
  /**
   * The limit
   * @IsInt
   */
  limit?: number;
}
export interface IEbot7ClientRequestConfig extends AxiosRequestConfig {
  filter?: IEbot7ClientRequestFilter;
  paging?: IEbot7ClientRequestPaging;
}
