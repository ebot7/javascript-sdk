import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IClientConfig extends AxiosRequestConfig {
  readonly bearerToken: string;
  readonly baseURL?: string;
}

export type IClientRequestFilter = Record<
  string,
  string | number | boolean | Date
>;

export interface IClientRequestPaging {
  offset?: number;
  limit?: number;
}
export interface IClientRequestConfig extends AxiosRequestConfig {
  filter?: IClientRequestFilter;
  paging?: IClientRequestPaging;
}

export class Client {
  public static DEFAULT_CONFIG: Partial<IClientConfig> = {
    baseURL: `https://public-api.e-bot7.de/`,
  };

  private axios: AxiosInstance;

  protected config: IClientConfig;

  constructor(config: IClientConfig) {
    this.config = {
      ...Client.DEFAULT_CONFIG,
      ...config,
    };

    this.axios = Axios.create({
      ...this.config,
      headers: {
        Authorization: `Bearer ${this.config?.bearerToken}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...(this.config?.headers || {}),
      },
      baseURL: `${this.config.baseURL}`,
    });
  }

  public get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: IClientRequestConfig
  ): Promise<R> {
    return this.axios.get(url, this.mapToAxiosConfig(config));
  }

  public post<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: IClientRequestConfig
  ): Promise<R> {
    return this.axios.post(url, this.mapToAxiosConfig(config));
  }

  public patch<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: IClientRequestConfig
  ): Promise<R> {
    return this.axios.patch(url, this.mapToAxiosConfig(config));
  }

  public get axiosRef(): AxiosInstance {
    return this.axios;
  }

  protected mapToAxiosConfig({
    filter,
    paging,
    ...config
  }: IClientRequestConfig = {}): AxiosRequestConfig | undefined {
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
    filter: IClientRequestFilter | undefined
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

  protected parsePaging(paging: IClientRequestPaging | undefined) {
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
