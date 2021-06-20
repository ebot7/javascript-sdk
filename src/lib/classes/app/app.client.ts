import {
  IEbot7InstallApplicationInstanceOptions,
  IEbot7InstallApplicationInstanceOutput,
} from '.';
import { Ebot7Client } from '../client';

export class Ebot7AppClient {
  constructor(private readonly client: Ebot7Client) {}

  /**
   * Installs a new application instance and returns the application instance and instance key.
   *
   * @param  options
   * @returns {Promise<IEbot7InstallApplicationInstanceOutput>} An object that contains the application instance and application instance key
   * @throws  {Not Found | Unauthorized | Forbidden | Request Timeout | Internal Server Error | EAI_AGAIN} HTTP Error
   */
  public async install(
    options: IEbot7InstallApplicationInstanceOptions
  ): Promise<IEbot7InstallApplicationInstanceOutput> {
    const url = 'application/install';
    const result = await this.client.post(url, options, {
      headers: {
        'x-Delegated-Authorization': `Bearer ${options.delegatedAuthToken}`
      }
    });
    return result.data;
  }
}
