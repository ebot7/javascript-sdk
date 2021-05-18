interface IntegrationNodeMeta {
  label: string;
  application?: string;
  description: string;
  icon?: string;
}

interface IntegrationNodeParameter {
  title: string;
  description: string;
  // Parameter types are limited to the basic JSON Schema types:
  // String, Number and Boolean
  type: 'string' | 'number' | 'boolean';
  required: boolean;
}

interface IntegrationNodeResult {
  title: string;
  description: string;
  type: 'object';
  properties: {
    [propertyId: string]: {
      type: 'string' | 'number' | 'boolean';
    };
  };
}

export interface IntegrationNodeDefinition {
  id: string;
  meta: IntegrationNodeMeta;
  version: string;
  parameters: { [parameterId: string]: IntegrationNodeParameter };
  results: { [resultId: string]: IntegrationNodeResult };
}
