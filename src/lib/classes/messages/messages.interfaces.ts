import { IEbot7ClientRequestPaging } from '../client';

export interface IEbot7Message {
  id: string;
  promptOptions: unknown;
  botId: string;
  convId: string;
  orgId: string;
  body: string;
  botStatus: string;
  source: unknown;
  isGreeting: true;
  seqInConv: 0;
  createdAt: string;
  updatedAt: string;
}

export interface IEbot7MessageFilter {
  isGreeting?: boolean;
  answerId?: string;
  seqInConv?: number;
  externalId?: string;
  botStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEbot7GetMessagesByBotIdOptions {
  botId: string;
  paging?: IEbot7ClientRequestPaging;
  filter?: IEbot7MessageFilter;
}

export interface IEbot7GetMessagesByBotIdAndMessageId {
  botId: string;
  messageId: string;
}

export interface IEbot7ListMessageByConversationOptions {
  botId: string;
  convId: string;
}

export interface IEbot7CreateMessageOptions
  extends IEbot7ListMessageByConversationOptions {
  body: string | unknown;
}

export interface IEbot7GetMessageOptions {
  botId: string;
  messageId: string;
}
export interface IEbot7GetMessageByConversationOptions
  extends IEbot7GetMessageOptions {
  convId: string;
}
