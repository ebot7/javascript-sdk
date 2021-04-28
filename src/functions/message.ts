import { Client } from '../client';

export interface ICreateMessageOptions {
  client: Client;
  body: string;
  conversationId: string;
  source: string;
  botId: string;
}

export async function createMessage(options: ICreateMessageOptions) {
  const url = `v1/bots/${options.botId}/convs/${options.conversationId}/messages`;
  const result = await options.client.getInstance().post(url, {
    body: options.body,
    source: options.source,
  });

  return result.data.item;
}
