# Cascade New Table 📜

<img width="501" alt="Screen Shot 2021-06-23 at 9 19 33 AM" src="https://user-images.githubusercontent.com/22084484/123103601-2cb5c600-d404-11eb-8e2f-37c3cfcc977a.png">

## What is Cascade?
The Cascade product allows users to easily ingest their own data, regardless of its source - flat files, db connections, SaaS platforms. After data is ingested, the analyst then has the ability to clean, wrangle, and build models on the data using a toolkit-oriented user experience. The tools range from more simplistic tools like pivot, join, transform, and transpose to tools that start to flirt towards data science - regression modeling, predictive analytics, etc.

## Why this project needed?
As part of Cascade toolkit, the user is allowed to create and author a new table directly in a Cascade workflow. This is very similar to a spreadsheet in Excel. You will find this necessary if you’re doing data cleansing and want to map a set of records to a new field (e.g. mapping all retailers to a retail channel). A workaround is to author a new table in Excel, export, and import back into Cascade. However, this is cumbersome and Cascade tries to simplify things as much as possible.

## About project
This is the new table funcionality for Cascade. Its a React application created by [`create-react-app`](https://create-react-app.dev/) with typescript which includes everything needed. The application is using funcions and hooks for components. The frontend is styled using [`styled-components`](https://styled-components.com/) as our base for css. For state management the project is using React's [`useReducer`](https://reactjs.org/docs/hooks-reference.html#usereducer) and [`useContext`](https://reactjs.org/docs/hooks-reference.html#usecontext) and for immutability in the reducer is using [`immer`](https://immerjs.github.io/immer/)

## Setup

We are using `npm` for package management, so make sure you have node installed.

To run the frontend to use the backend in local development use the following commands:

```bash
$> cd path/to/new-table
$> npm install
$> npm start
```

## Tests

The following command runs all unit tests for the project

```bash
$> cd path/to/new-table
$> npm test
```

The following command runs all e2e integration tests for the project

```bash
$> cd path/to/new-table
$> npm run cypres:run
```

The following command runs cypress util to run e2e integration tests for the project

```bash
$> cd path/to/new-table
$> npm run cypres:open
```

If you are debugging test you can use:

```bash
$> cd path/to/new-table
$> npm run test:debug
```

You can find more information at: https://create-react-app.dev/docs/debugging-tests/

If you want to see code coverage you can use:

```bash
$> cd path/to/new-table
$> npm run test:coverage
```

The test for components use mirage to simulate real time data and for the reducers we create fixtures.

## Project Structure

**Top-level directory layout**

    - .husky                  # Husky is used for linting and formation in the commit phase
    - public                  # Public files such as index.html, manifest.json, etc
    - src                     # Source files
    - .eslintrc.js            # Eslint config file
    - .prettierrc             # Prettier config file
    - package.json            # List of dependencies
    - tsconfig.json           # Typescript configuration
    - README.md

**Source-level directory layout**

    - App.tsx                 # Main app components
    - components              # Every feature/page container will be divided by folder
    - constants.ts            # Constants used throughout the app
    - types.ts                # Types used throughout the app
    - data.ts                 # Default data used for table
    - reducer.ts              # Business logic for app
    - index.tsx               # Main react file
    - index.css               # Main css file
    - setupTest.ts            # Setup jest test
    - hooks.ts                # Hooks for feature

## Useful scripts

Its recommended to use prettier and eslint plugin in your text editor/IDE, so it can auto fix code. See the recommended VS Code extensions below. If you don't want to you can always use the following commands that will do the same:

```bash
   $> npm run format
   $> npm run format:check
   $> npm run lint
   $> npm run lint:check
```

`format = Will format the code with prettier.`

`format:check = Will check the code with prettier.`

`lint = Will eslint the code for you.`

`lint:check = Will check the code with eslint.`

We are using [husky](https://github.com/typicode/husky#readme) to check if the code passes lint and prettier standards.

### Recommended Visual Studio Code extensions:

If you use Visual Studio Code as your text editor/IDE, you will find the following extensions useful for working on this project:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Integrates ESLint for automatic code fixing.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) - Opinionated code formatter.

## Learn new stuff
- React Redux and hooks helpful tutorials:
  https://reactjs.org/docs/hooks-intro.html
  
  https://reactjs.org/docs/hooks-custom.html
  
- React table
  https://react-table.tanstack.com/docs/
