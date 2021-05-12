export interface IEbot7BotList {
  items: string[];
}

export interface IEbot7BotListPaging {
  offset?: number;
  limit?: number;
}

export interface IEbot7Bot {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
}

export interface IEbot7GetBotOptions {
  botId: string;
}
