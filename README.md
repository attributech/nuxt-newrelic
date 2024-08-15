# Nuxt New Relic

This Nuxt module provides a better integration with New Relic.

## Features
- Naming transactions based on the path of the request
- Providing newrelic agent with error objects

## Setup
### Installation
1. `npx nuxi module add nuxt-newrelic`
2. `npm run build`
3. Create and copy a New Relic licence key [here](https://one.newrelic.com/launcher/api-keys-ui.api-keys-launcher) and decide on a [app name](https://docs.newrelic.com/docs/apm/agents/manage-apm-agents/app-naming/name-your-application/).

### Configure newrelic agent

There are [two ways to configure](https://docs.newrelic.com/docs/apm/agents/nodejs-agent/installation-configuration/nodejs-agent-configuration/) the newrelic agent:

#### ENV variables (recommended)
Set the `NEW_RELIC_APP_NAME` and `NEW_RELIC_LICENSE_KEY` ENV variables so that node has access to them.

#### newrelic.cjs in root 
- `cp node_modules/newrelic/newrelic.js ./newrelic.cjs`
- In the new file `newrelic.cjs` set `app_name` and  `license_key` accordingly.

You can also mix the two approaches. You could configure the agent in `newrelic.cjs` and just set the licence key using a ENV variable.

### Running Nuxt with the newrelic agent

Run our application using one of the following options:

#### Testing

Test your setup by providing the ENV variables direclty when runing node:

```bash
NEW_RELIC_LICENSE_KEY=XXXXXX NEW_RELIC_APP_NAME=APPNAME node --experimental-loader newrelic/esm-loader.mjs -r newrelic .output/server/index.mjs
```
You can use this to test your setup locally.

#### Prodction
Set the env variables so that they are available to node and run.
```bash
node --experimental-loader newrelic/esm-loader.mjs -r newrelic .output/server/index.mjs
```
This is recommended to use in production.

## Limitations
- Currently only works when using newrelic like recommended way of installing the newrelic agent by running nuxt using something like  `node -r newrelic ./.output/server/index.mjs`
- The `--experimental-loader newrelic/esm-loader.mjs` flag is required, since we need to `import` the newrelic agent. That is needed according to the [docs](https://github.com/newrelic/node-newrelic?tab=readme-ov-file#ecmascript-modules).

## Roadmap
- Instrument Nuxt
- Source maps
- Exclude expected errors (4xx)
- Disable default error tracking since there is basically no information available 

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>
