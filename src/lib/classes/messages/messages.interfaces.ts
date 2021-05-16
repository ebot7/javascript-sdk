import { IEbot7ClientRequestPaging } from '../client';
import { IEbot7PagingOutput } from '../common';

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

export interface IEbot7MessageListFilterOutput {
  botId?: string;
  convId?: string;
  isGreeting?: boolean;
  answerId?: string;
  seqInConv?: number;
  botStatus?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEbot7MessageOutput {
  item: IEbot7Message;
}
export interface IEbot7MessageListOutput {
  items: IEbot7Message[];
  paging: IEbot7PagingOutput;
  filter: IEbot7MessageListFilterOutput;
}
export interface IEbot7MessageInputFilter {
  isGreeting?: boolean;
  answerId?: string;
  seqInConv?: number;
  externalId?: string;
  botStatus?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEbot7GetMessagesOptions {
  botId: string;
  paging?: IEbot7ClientRequestPaging;
  filter?: IEbot7MessageInputFilter;
}

export interface IEbot7GetMessagesByBotIdAndMessageId {
  botId: string;
  messageId: string;
}

export interface IEbot7ListMessageByConversationOptions
  extends IEbot7GetMessagesOptions {
  convId: string;
}

export interface IEbot7CreateMessageOptions {
  botId: string;
  convId: string;
  applicationId: string;
  payload: IEbot7CreateMessageInputPayload;
}

export interface IEbot7CreateMessageInputPayload {
  body: string;
  source: EEbot7MessageSource;
  promptOptions?: IEbot7MessagePromptOption;
}

export enum EEbot7MessageSource {
  VISITOR = 'visitor',
  BOT = 'bot',
  AGENT = 'agent',
}
export interface IEbot7GetMessageOptions {
  botId: string;
  messageId: string;
}
export interface IEbot7GetMessageByConversationOptions
  extends IEbot7GetMessageOptions {
  convId: string;
}

export interface IEbot7MessagePromptOption {
  body: string;
  href: string;
  isFile: boolean;
}
