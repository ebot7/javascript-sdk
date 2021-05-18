interface IntegrationNodeExecutionContext {
  botId: string;
  organizationId: string;
  conversationId: string;
}

export interface IntegrationNodeExecutionInput {
  context: IntegrationNodeExecutionContext;
  version: string;
  parameters: { [parameterId: string]: unknown };
}
