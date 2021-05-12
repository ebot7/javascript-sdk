export interface IEbot7GetExternalConversationOptions {
  botId: string;
  externalId: string; //The unique ID of the conversation in the external platform
}

export interface IEbot7UpdateExternalConversationOptions
  extends IEbot7GetExternalConversationOptions {
  data: string | unknown;
}
