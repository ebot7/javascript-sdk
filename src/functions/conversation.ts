import { Client } from '../client';

export interface ICreateConversationOptions {
  client: Client;
  botId: string;
}

export async function createConversation(options: ICreateConversationOptions) {
  const url = `v1/bots/${options.botId}/convs/`;
  const result = await options.client.getInstance().post(url, {});

  return result.data.item;
}
