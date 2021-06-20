import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  IEbot7ClientConfig,
  IEbot7ClientRequestConfig,
  IEbot7ClientRequestFilter,
  IEbot7ClientRequestPaging,
} from './client.interfaces';

export class Ebot7Client {
  public static DEFAULT_CONFIG: Partial<IEbot7ClientConfig> = {
    baseURL: `https://api.e-bot7.de/`,
  };

  private static API_VERSION = 'v1';

  private axios: AxiosInstance;

  protected config: AxiosRequestConfig;

  /**
   * Axios configuration including the bearToken.
   * @param {string} bearerToken which can be an application or an application instance access token.
   */
  constructor({ bearerToken, ...config }: IEbot7ClientConfig) {
    this.config = {
      ...Ebot7Client.DEFAULT_CONFIG,
      ...config,
    };

    if (this.config.baseURL?.endsWith('/')) {
      this.config.baseURL += `${Ebot7Client.API_VERSION}/`;
    } else {
      this.config.baseURL += `/${Ebot7Client.API_VERSION}/`;
    }

    this.axios = Axios.create({
      ...this.config,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(this.config?.headers || {}),
      },
      baseURL: `${this.config.baseURL}`,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: IEbot7ClientRequestConfig
  ): Promise<R> {
    return this.axios.get(url, this.mapToAxiosConfig(config));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public post<T = any, R = AxiosResponse<T>>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    config?: IEbot7ClientRequestConfig
  ): Promise<R> {
    return this.axios.post(url, data, this.mapToAxiosConfig(config));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public patch<T = any, R = AxiosResponse<T>>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    config?: IEbot7ClientRequestConfig
  ): Promise<R> {
    return this.axios.patch(url, data, this.mapToAxiosConfig(config));
  }

  public get axiosRef(): AxiosInstance {
    return this.axios;
  }

  protected mapToAxiosConfig({
    filter,
    paging,
    ...config
  }: IEbot7ClientRequestConfig = {}): AxiosRequestConfig | undefined {
    const parsedFilter = this.parseFilter(filter);
    const parsedPaging = this.parsePaging(paging);
    let params = config.params;

    if (parsedFilter) {
      params = {
        ...(params || {}),
        ...parsedFilter,
      };
    }

    if (parsedPaging) {
      params = {
        ...(params || {}),
        ...parsedPaging,
      };
    }

    return {
      ...config,
      params,
    };
  }

  protected parseFilter(
    filter: IEbot7ClientRequestFilter | undefined
  ): Record<string, string | number | Date | boolean> | undefined {
    return filter
      ? Reflect.ownKeys(filter).reduce((acc, key) => {
          const filterKey = `filter[${String(key)}]`;
          const filterValue = filter[String(key)];
          if (typeof filterValue === 'string') {
            acc[filterKey] = filterValue;
          } else if (typeof filterValue === 'number') {
            acc[filterKey] = filterValue;
          } else if (typeof filterValue === 'boolean') {
            acc[filterKey] = filterValue;
          } else if (filterValue instanceof Date) {
            acc[filterKey] = filterValue.toISOString();
          }

          return acc;
        }, {} as Record<string, string | number | Date | boolean>)
      : undefined;
  }

  protected parsePaging(paging: IEbot7ClientRequestPaging | undefined) {
    let parsedPaging: Record<string, string> | undefined = undefined;

    if (paging?.limit !== undefined) {
      parsedPaging = parsedPaging || {};
      parsedPaging[`page[limit]`] = String(paging.limit);
    }

    if (paging?.offset !== undefined) {
      parsedPaging = parsedPaging || {};
      parsedPaging[`page[offset]`] = String(paging.offset);
    }

    return parsedPaging;
  }
}
