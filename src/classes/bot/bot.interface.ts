export interface IListBotOptions {
  offset?: number;
  limit?: number;
}

export interface IGetBotOptions {
  botId: string;
}

export type BotListApiOutput = {
  items: Array<string>;
};

export type BotType = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
};

export type BotApiOutput = {
  item: BotType;
};
