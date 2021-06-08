# e-bot7 SDK

The e-bot7 Software Development Kit (SDK) is a typescript/nodejs thin client for the e-bot7 application platform public endpoints.

The SDK provides clients for consuming endpoints for the following:

- Bots
- Messages
- Conversations
- External conversations

These endpoints are exposed by the application platform interfaces.

## Installation

Add this package to your project by running command:

`npm install @ebot7/sdk --save`

or

`yarn add @ebot7/sdk`

## Usage Examples

Using this package involves two steps:

First, instantiate a `Client` class and then
instantiate a corresponding `Api Client`.

The following example illustrates how to get the list of bots from the application platform using the `@ebot7/sdk`

Initialize an e-bot7 client:

```
const MOCK_TOKEN = 'xapp-607952a149247f795d7304f9-48863fb0b20dec2b9a8a585fc63a6b8017cbab48';
const TEST_BASE_URL = 'http://example-application-platform-url.com';

const client = new Ebot7Client({
  bearerToken: MOCK_TOKEN || '',
  baseURL: TEST_BASE_URL,
});

```

Initialize an e-bot7 Bot client:

```
const botClient = new Ebot7BotClient(client);

```

Use the Bot client to get the list of bots:

```
const data = await botClient.findMany();

```

For more examples see the unit test files or consult the swagger documentation which is accessible by issuing command:

```
npm run swaggerGen -c ./swaggerConfig.json
```

or

```
yarn swaggerGen -c ./swaggerConfig.json
```

Then navigate to ` http://localhost:4222`
