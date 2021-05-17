export interface IEbot7Bot {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  orgId: string;
}

export interface IEbot7BotListOutput {
  items: string[];
}

export interface IEbot7BotOutput {
  item: IEbot7Bot;
}

export interface IEbot7GetBotOptions {
  botId: string;
}
