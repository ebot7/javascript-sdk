import { IEbot7ClientRequestPaging } from '../client';
import { IEbot7PagingOutput } from '../common';

export interface IEbot7ConversationListOutput {
  items: IEbot7Conversation[];
  paging: IEbot7PagingOutput;
  filter: IEbot7ConversationFilterOptions;
}

export interface IEbot7Conversation {
  id: string;
  body: string;
  disableAutopilot: boolean;
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
  externalData: IEbot7ConversationExternalData[];
}

export interface IEbot7ConversationOutput {
  item: IEbot7Conversation[];
}

export interface IEbot7ConversationExternalData {
  id: string;
  name: string;
  meta?: Record<string, string>;
}

export interface IEbot7ConversationListFilterOutput {
  botId: string;
  isArchived?: boolean;
  lastMessageAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IEbot7ConversationPayload {
  needsInteraction?: boolean;
  isArchived?: boolean;
  isVisitorBanned?: boolean;
  genesysInteractionUUID?: string;
  integrations?: IEbot7ConversationExternalData[];
}

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
  payload: IEbot7ConversationPayload;
}

export interface IEbot7UpdateConversationOptions
  extends IEbot7CreateConversationOptions {
  convId: string;
}
