# Home Library Service

## Prerequisites

- Git (latest or close to latest version) - [Download & Install Git](https://git-scm.com/downloads).
- Node.js (LTS version: v18.16.x - v18.17.x) - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/RamanHupalenka/nodejs2023Q2-service.git
```

## Installing NPM modules

```
npm install
```

## Setup environment

Clone `.env.example` file and rename to `.env` or rename `.env.example` file to `.env`.

## Running application

```
npm start 
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/api/.

For more information about OpenAPI/Swagger please visit https://swagger.io/.

You can change default port via .env file and `PORT=<number>` line. Swagger requests server will be changed accordingly with port change.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
