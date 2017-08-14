![Alt text](https://firebasestorage.googleapis.com/v0/b/firefunctions-7a16e.appspot.com/o/firefunctions_cover5.png?alt=media&token=121a3cda-74cf-4b0c-a23d-b20c9009c435 "FireFunctions CLI")

# FireFunctions-CLI [![Build Status](https://travis-ci.org/knoxpo/firefunctions-cli.svg?branch=master)](https://travis-ci.org/knoxpo/firefunctions-cli)
Starter kit for Firebase Functions

- [Live Demo](https://us-central1-firefunctions-7a16e.cloudfunctions.net/api/)
- [Tutorials and Screencasts](https://medium.com/knoxpo)

## Features

- Firebase Authentication Token Validator
- Realtime Database CRUD
- Connect to other Google Cloud Services
- Base on Express.js
- Typing `TypeScript`!! 

## Usage

Create an account at https://firebase.google.com/

#### Pre-Setup FireFunctions
- Install Yarn if you don't have Yarn installed `brew install yarn`
- Install Firebase Tools if you don't already have it installed 
  `npm install -g firebase-tools` or `sudo npm install -g firebase-tools`

#### Setup FireFunctions
- `npm i -g fire-functions-cli`
- Run `firefunc new <projectName>` (`CamelCase` or `kebab-case`)
- Now, initialize Firebase Functions
- And final step: Deploy `firefunc deploy`

Now, you are all set!

#### Getting Started With FireFunctions
Working with FireFunctions makes Firebase Functions delpoy very easy. All your code goes in `./src` folder. Where all your express API code will go under `./src/api`, model creation will go under `./src/model`, trigger creation will go under `./src/triggers` and all other library initializtion will go under `./src/lib`.   

Full documentation will be updated soon.

Create the environment files below in `./src/environments`

#### environment.ts
```javascript
exports.environment = {
  -- ALL YOUR GLOBLE VALUES --
};
```

