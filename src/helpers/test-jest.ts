export function expectHttpErrorNo(errorNo: number) {
  expect([
    404, // [Not Found] as in when bad path to server is used
    401, // [Unauthorized] as in when wrong bearer token is used
    403, // [Forbidden] as in when wrong parameter like invalid botId was used
    0, // [undefined] as in when server or url is not accessible
  ]).toContain(errorNo || 0);
}

export function expectHttpErrorText(errorText?: string) {
  expect([
    'Not Found', // [404] as in when bad path to server is used
    'Unauthorized', // [401] as in when wrong bearer token is used
    'Forbidden', // [403] as in when wrong parameter like invalid botId was used
    'EAI_AGAIN', // [undefined] as in when server or url is not accessible
  ]).toContain(errorText || 'EAI_AGAIN');
}
