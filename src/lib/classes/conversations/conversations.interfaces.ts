import { IEbot7ClientRequestPaging } from '../client';

export interface IEbot7ListConversationOptions {
  botId: string;
  paging?: IEbot7ClientRequestPaging;
  filter?: IEbot7ConversationFilterOptions;
}

export interface IEbot7ConversationFilterOptions {
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IEbot7GetConversationOptions {
  botId: string;
  convId: string;
}

export interface IEbot7CreateConversationOptions {
  botId: string;
  data: string | unknown;
}

export interface IEbot7UpdateConversationOptions
  extends IEbot7CreateConversationOptions {
  convId: string;
}

export interface IEbot7Conversation {
  id: string;
  body: string;
  disableAutopilot: true;
  embedOrigin: string;
  lastMessageAt: string;
  lastMessageBody: string;
  firstMessageByVisitorAt: string;
  isLastMessageByVisitor: boolean;
  convNumber: number;
  messageCount: number;
  agent: string;
  orgId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  externalData: Array<string>;
}
