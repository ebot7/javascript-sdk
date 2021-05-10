import { PagingEntityApiOutput } from '../common';

export interface IListMessageOptions extends MessageListFilterApiOutput {
  botId: string;
  externalId?: string;
  offset?: number;
  limit?: number;
}

export interface IListMessageByConversationOptions extends IListMessageOptions {
  convId: string;
}
export interface IGetMessageOptions {
  botId: string;
  messageId: string;
}
export interface IGetMessageByConversationOptions extends IGetMessageOptions {
  convId: string;
}

export interface ICreateMessageOptions {
  botId: string;
  convId: string;
  payload: MessageInputPayload;
}

export type MessageListApiOutput = {
  items: Array<MessageApiOutput>;
  paging: PagingEntityApiOutput;
  filter: MessageListFilterApiOutput;
};

export type MessageType = {
  id: string;
  promptOptions: MessagePromptOption[];
  botId: string;
  convId: string;
  orgId: string;
  userId: string;
  body: string;
  botStatus: string;
  source: MessageSource;
  isGreeting: boolean;
  seqInConv: number;
  createdAt: string;
  updatedAt: string;
};

export type MessageApiOutput = {
  item: Array<MessageType>;
};

export type MessageListFilterApiOutput = {
  botId?: string;
  convId?: string;
  isGreeting?: boolean;
  answerId?: string;
  seqInConv?: number;
  botStatus?: string;
  createdAt?: string;
  updatedAt?: string;
};

export enum MessageSource {
  VISITOR = 'visitor',
  BOT = 'bot',
  AGENT = 'agent',
}

export type MessageInputPayload = {
  body: string;
  source: MessageSource;
  promptOptions?: MessagePromptOption;
};

export type MessagePromptOption = {
  body: string;
  href: string;
  isFile: boolean;
};
