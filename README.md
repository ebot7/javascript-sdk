# Ebot7 SDK

This is the ebot7 Software Development Kit (JS SDK) Package.

The JS SDK is a thin client for developing and testing aspects of the ebot7 Application.

It has been set up with automated unit tests and package publishing workflow using GitHub Actions CI/CD.

It uses npm, TypeScript Compiler, Jest, ESLint, Prettier and cspell. The production files include CommonJS, ES Modules, UMD version and TypeScript declaration files.

## Development

### Environment

You need to have [Node.js](https://nodejs.org/en/download/) installed. Node includes npm as its default package manager.

### Installation

Install dependencies with yarn:

```bash
yarn install
```

### Write your code

Make necessary changes in **package.json** (name, version, description, keywords, author, homepage and other URLs).

Write your code in **src** folder, and unit test in **test** folder, replacing the original files there.


### Test

Test all aspects of the code (Prettier, ESLint, and Jest) with:

```bash
yarn test
```

Optionally run individual tests using any or the below:


```bash
Prettier:   yarn test:prettier
Spelling:   yarn test:spelling
ESLint:     yarn test:eslint
Unit Test:  yarn test:unit
```

### Build

Build production (distribution) files in your **build** folder:

```bash
yarn build
```

It generates CommonJS (in **build/main** folder), ES Modules (in **build/module** folder).

### Try it before publishing

Run:

```bash
npm link
```

[npm link](https://docs.npmjs.com/cli/v6/commands/npm-link) will create a symlink in the global folder, which may be **{prefix}/lib/node_modules/@bot7/javascript-sdk** or **C:\Users\<username>\AppData\Roaming\npm\node_modules\@ebot7\javascript-sdk**.

Create an empty folder elsewhere, you don't even need to `npm init` (to generate **package.json**). Open the folder with VS Code, open a terminal and just run:

```bash
npm link @ebot7/javascript-sdk
```

This will create a symbolic link from globally-installed example-typescript-package to **node_modules/** of the current folder.

You can then create a, for example, **test-client.ts** file with the content:

```ts
import { Client } from '@ebot7/javascript-sdk';
```

If you don't see any linting errors in VS Code, if you put your mouse cursor over `Client` and see its type, then it's all good.

Whenever you want to uninstall the globally-installed package and remove the symlink in the global folder, run:

```bash
npm uninstall @ebot7/javascript-sdk -g
```

### Prepare to publish

Create an [npm](https://www.npmjs.com/) account.

<details><summary><strong>Click to read this section if you do manual publishing</strong></summary>

#### Manual publishing to npm

Log in:

```bash
npm adduser
```

And publish:

```bash
npm publish
```

</details>

This package is configured to use GitHub Actions CI/CD to automate both the **npm** and **GitHub Packages** publishing process. The following are what you have to do.

#### CI publishing to npm

Follow [npm's official instruction](https://docs.npmjs.com/creating-and-viewing-access-tokens) to create an npm token. Choose "Publish" from the website, or use `npm token create` without argument with the CLI.

If you use 2FA, then make sure it's enabled for **authorization** only instead of **authorization and publishing** (**Edit Profile** -> **Modify 2FA**).

On the page of your newly created or existing GitHub repo, click **Settings** -> **Secrets** -> **New repository secret**, the **Name** should be `NPM_TOKEN` and the **Value** should be your npm token.

#### CI publishing to GitHub Packages

The default configuration of this example package **assumes you publish package with an scoped name to npm**. 


(You might have noticed `secret.GITHUB_TOKEN` in **.github/workflows/test.yml**. You don't need to set up a secret named `GITHUB_TOKEN` actually, it is [automatically created](https://docs.github.com/en/free-pro-team@latest/actions/reference/authentication-in-a-workflow#about-the-github_token-secret))

### Publish

Now everything is set. The example package has automated tests and upload (publishing) already set up with GitHub Actions:

- Every time you `git push` or a pull request is submitted on your `master` or `main` branch, the package is automatically tested against the desired OS and Node.js versions with GitHub Actions.
- Every time an [**annotated**](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_annotated_tags) (not [lightweight](https://git-scm.com/book/en/v2/Git-Basics-Tagging#_lightweight_tags)) "v\*" tag is pushed onto GitHub, a GitHub release is automatically generated from this version, it also automatically publishes to the npm registry and/or GitHub Packages registry to update the package there.
  - [`npm version`](https://docs.npmjs.com/cli/v6/commands/npm-version) / [`yarn version`](https://yarnpkg.com/cli/version) is useful to create tags.
  - You could also add `"postversion": "git push --follow-tags"` to **package.json** file to push it automatically after `npm` or `yarn` `version`. (for `yarn version` only: because `yarn version` doesn't check whether there are uncommitted changes, you can add `"preversion": "git diff-index --quiet HEAD --"` to **package.json**)

For npm registry: you can unpublish a version or the whole package but can never re-publish the same version under the same name.

If you want to modify the description / README on the npm package page, you have to publish a new version. You can modify the description on GitHub Packages without publishing.

## Notes

- It uses npm but you can easily switch to yarn, of course (remember to change all "npm" in `scripts` in the file **package.json**)
  - Whether you use npm as your package manager ≠ Whether you can publish to the npm registry
- Works fine in VS Code. In my configuration **.eslintrc** and **.prettierrc** cooperate perfectly
- See `scripts` in **package.json** for other predefined script commands

## References

- [Creating and publishing unscoped public packages - npm docs](https://docs.npmjs.com/creating-and-publishing-unscoped-public-packages)
- [npm-publish - npm docs](https://docs.npmjs.com/cli/v6/commands/npm-publish)
- [Publishing - TypeScript docs](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [Publishing Node.js packages - GitHub Docs](https://docs.github.com/en/free-pro-team@latest/actions/guides/publishing-nodejs-packages)

Btw, if you want to publish Python package, go to [Example PyPI (Python Package Index) Package & Tutorial / Instruction / Workflow for 2021](https://github.com/tomchen/example_pypi_package).

