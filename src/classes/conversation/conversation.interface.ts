import { PagingEntityApiOutput } from '../common';

export interface IListConversationOptions {
  botId: string;
  createdAt?: string;
  updatedAt?: string;
  offset?: number;
  limit?: number;
}
export interface IGetConversationOptions {
  botId: string;
  convId: string;
}

export interface ICreateConversationOptions {
  botId: string;
  payload: ConversationInputPayload;
}

export interface IUpdateConversationOptions extends ICreateConversationOptions {
  convId: string;
}

export type ConversationListApiOutput = {
  items: Array<ConversationType>;
  paging: PagingEntityApiOutput;
  filter: ConversationListFilterApiOutput;
};

export type ConversationType = {
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
  externalData: Array<ConversationExternalDataType>;
};

export type ConversationApiOutput = {
  item: Array<ConversationType>;
};

export type ConversationExternalDataType = {
  id: string;
  name: string;
  meta?: Record<string, string>;
};

export type ConversationListFilterApiOutput = {
  botId: string;
  isArchived?: boolean;
  lastMessageAt?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ConversationInputPayload = {
  needsInteraction?: boolean;
  isArchived?: boolean;
  isVisitorBanned?: boolean;
  genesysInteractionUUID?: string;
  integrations?: Array<ConversationExternalDataType>;
};

export interface IGetExternalConversationOptions {
  botId: string;
  externalId: string; //The unique ID of the conversation in the external platform
}

export interface IUpdateExternalConversationOptions
  extends IGetExternalConversationOptions {
  payload: ConversationInputPayload;
}
