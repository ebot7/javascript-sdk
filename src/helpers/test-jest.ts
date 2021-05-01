export function expectHttpErrorNo(errorNo: number, error?: unknown) {
  expect([
    404, // [Not Found] as in when bad path to server is used
    401, // [Unauthorized] as in when wrong bearer token is used
    403, // [Forbidden] as in when wrong parameter like invalid botId was used
    408, // [Request Timeout] as in when the server took long to respond
    500, // [Internal Server Error] as in when there is an internal server error
    0, // [undefined] as in when server or url is not accessible
  ]).toContain(errorNo || 0);
  // Log any error
  if (error) {
    console.log(error);
  }
}

export function expectHttpErrorText(errorText?: string, error?: unknown) {
  expect([
    'Not Found', // [404] as in when bad path to server is used
    'Unauthorized', // [401] as in when wrong bearer token is used
    'Forbidden', // [403] as in when wrong parameter like invalid botId was used
    'Request Timeout', // [408] as in when the server took long to respond
    'Internal Server Error', // [500] as in when there is an internal server error
    'EAI_AGAIN', // [undefined] as in when server or url is not accessible
  ]).toContain(errorText || 'EAI_AGAIN');
  // Log any error
  if (error) {
    console.log(error);
  }
}
