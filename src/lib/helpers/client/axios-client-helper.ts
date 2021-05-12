import { AxiosError } from 'axios';

export function expectPublicApi(request: Promise<any>) {
  const toThrowStatusCode = async (statusCode: number) => {
    try {
      await request;

      throw new Error(
        `Axios Request is expected to throw an error code "${statusCode}"`,
      );
    } catch (error) {
      expect(typeof error).toBe('object');
      expect(error).toHaveProperty('isAxiosError');
      expect(error.response.status).toBe(statusCode);
    }
  };

  const toHaveEntityDetailStructure = async () => {
    const response = await request;
    const result = response.data;

    expect(result).toHaveProperty('item');
  };

  const toHaveEntityListStructure = async () => {
    try {
      const response = await request;
      const result = response.data;

      expect(result).toHaveProperty('items');
      expect(result).toHaveProperty('filter');
      expect(result).toHaveProperty('paging');
      expect(result.paging).toHaveProperty('total');
      expect(result.paging).toHaveProperty('offset');
      expect(result.paging).toHaveProperty('limit');
    } catch (err: AxiosError | any) {
      if (err.isAxiosError) {
        console.error(err.response.data);
      } else {
        console.error(err);
      }
      throw err;
    }
  };

  const toHavePagingState = async (
    expected: { total?: number; offset?: number; limit?: number } = {},
  ) => {
    const response = await request;
    const result = response.data;

    if (expected.total) {
      expect(result.paging.total).toBe(expected.total);
    }
    if (expected.offset) {
      expect(result.paging.offset).toBe(expected.offset);
    }
    if (expected.limit) {
      expect(result.paging.limit).toBe(expected.limit);
    }
  };

  const toHaveEntityListLength = async (length: number) => {
    const response = await request;
    const result = response.data;

    expect(result.items).toHaveLength(length);
  };

  const toRespondConversationEntity = async (
    expected: Record<string, any> = {},
  ) => {
    const response = await request;
    const result = response.data;

    expect(result).not.toBeFalsy();
    expect(result).toHaveProperty('item');
    expect(result.item).toHaveProperty('body');
    expect(result.item).toHaveProperty('disableAutopilot');
    expect(result.item).toHaveProperty('embedOrigin');
    expect(result.item).toHaveProperty('lastMessageAt');
    expect(result.item).toHaveProperty('firstMessageByVisitorAt');
    expect(result.item).toHaveProperty('convNumber');
    expect(result.item).toHaveProperty('messageCount');
    expect(result.item).toHaveProperty('orgId');
    expect(result.item).toHaveProperty('userId');
    expect(result.item).toHaveProperty('createdAt');
    expect(result.item).toHaveProperty('updatedAt');

    if (expected.body) {
      expect(result.item.body).toBe(expected.body);
    }
    if (expected.disableAutopilot) {
      expect(result.item.disableAutopilot).toBe(expected.disableAutopilot);
    }
    if (expected.embedOrigin) {
      expect(result.item.embedOrigin).toBe(expected.embedOrigin);
    }
    if (expected.lastMessageAt) {
      expect(result.item.lastMessageAt).toBe(expected.lastMessageAt);
    }
    if (expected.firstMessageByVisitorAt) {
      expect(result.item.firstMessageByVisitorAt).toBe(
        expected.firstMessageByVisitorAt,
      );
    }
    if (expected.convNumber) {
      expect(result.item.convNumber).toBe(expected.convNumber);
    }
    if (expected.messageCount) {
      expect(result.item.messageCount).toBe(expected.messageCount);
    }
    if (expected.orgId) {
      expect(result.item.orgId).toBe(expected.orgId);
    }
    if (expected.userId) {
      expect(result.item.userId).toBe(expected.userId);
    }
  };

  return {
    toThrowStatusCode,
    toHaveEntityDetailStructure,
    toHaveEntityListStructure,
    toHavePagingState,
    toHaveEntityListLength,
    toRespondConversationEntity,
  };
}
