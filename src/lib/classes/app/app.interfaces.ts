export enum IEbot7EApplicationPermission {
  BOTS_READ = 'bots:Read',

  CONVS_READ = 'convs:Read',
  CONVS_CREATE = 'convs:Create',
  CONVS_UPDATE = 'convs:Update',

  MESSAGES_CREATE_AS_VISITOR = 'messages:CreateAs:Visitor',
  MESSAGES_CREATE_AS_AGENT = 'messages:CreateAs:Agent',
  MESSAGES_CREATE_AS_BOT = 'messages:CreateAs:Bot',
  MESSAGES_READ = 'messages:Read',
}

export enum IEbot7EApplicationEvents {
  MESSAGES_CREATED = 'message:created',
  CONVERSATION_CREATED = 'conversation:created',
  CONVERSATION_ASSIGNED = 'conversation:assigned',
  CONVERSATION_ARCHIVED = 'conversation:archived',
}

interface IEbot7ApplicationVersionObject {
  id: string;
  applicationId: string;
  permissions: IEbot7EApplicationPermission[];
  events: IEbot7EApplicationEvents[];
  createdAt: string;
}

interface IEbot7ApplicationObject {
  id: string;
  organisationId: string;
  latestVersion: IEbot7ApplicationVersionObject;
  createdAt: string;
  updatedAt: string;
}

interface IEbot7ApplicationInstanceObject {
  id: string;
  botId: string;
  installedAt: string;
  application: IEbot7ApplicationObject;
  applicationVersion: IEbot7ApplicationVersionObject;
}

export interface IEbot7InstallApplicationInstanceOptions {
  applicationId: string;
  botId?: string;
}

export interface IEbot7InstallApplicationInstanceOutput {
  applicationInstanceKey: string;
  applicationInstance: IEbot7ApplicationInstanceObject;
}
