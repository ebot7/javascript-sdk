interface IntegrationNodeExecutionResultError {
  status: string;
  message: string;
}

interface IntegrationNodeExecutionResultResult {
  resultType: string;
  data: { [parameterId: string]: unknown };
}

export interface IntegrationNodeExecutionResult {
  isSuccess: boolean;
  result?: IntegrationNodeExecutionResultResult;
  error?: IntegrationNodeExecutionResultError;
}
