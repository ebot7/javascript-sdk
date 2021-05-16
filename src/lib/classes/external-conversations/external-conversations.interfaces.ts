import { IEbot7ConversationPayload } from '../conversations';
export interface IEbot7GetExternalConversationOptions {
  botId: string;
  externalId: string; //The unique ID of the conversation in the external platform
}

export interface IUpdateExternalConversationOptions
  extends IEbot7GetExternalConversationOptions {
  payload: IEbot7ConversationPayload;
}
