#!/usr/bin/env node

require('shelljs/global');
const path = require('path');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

const installPackages = () => {
  console.log(chalk.white.bold('Installing Packages'));
  return new Promise((resolve, reject) => {
    let command;
    let args = ['install'];

    if (shouldUseYarn()) {
      command = 'yarn';
    } else {
      command = 'npm';
    }

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', code => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`
        });
        return;
      }
      resolve();
    })
  })
}

const initCreate = () => {
  cp('-r', __dirname + '/../src/.', './');
  console.log('----------------------------------------------------------');
  figlet('FireFunctionsCli', function(err, data) {
    if (err) {
      return;
    }
    console.log(data);
    console.log('----------------------------------------------------------');
    console.log(chalk.white.bold('Welcome to FireFunctionsCli'));
    console.log('----------------------------------------------------------');
    installPackages().then(() => {
      console.log(chalk.white.bold('Let\'s get started'));
      console.log(chalk.green('Step 1: cd into the newly created '), chalk.green.bold(appName), chalk.green(' directory'));
      console.log('----------------------------------------------------------');
      console.log(chalk.green('Step 2: run '), chalk.green.bold('yarn run deploy'));
      console.log('----------------------------------------------------------');
      // add your own custom messages here.
      console.log('----------------------------------------------------------');
    })
    .catch(error => {
      console.log(chalk.red('An unexpected error occurred'))
      console.log(chalk.red(error));
    });
  });
}

const create = (appName) => {
  cp('-r', __dirname + '/../src/.', appName);
  figlet('FireFunctionsCLI', function(err, data) {
    if (err) {
      return;
    }
    console.log(chalk.yellow.bold(data));
    console.log(chalk.grey('------------------------------------------------------------------------------------'));
    console.log(chalk.white.bold('Welcome to FireFunctionsCLI'));
    console.log(chalk.grey('------------------------------------------------------------------------------------'));
    cd(appName);
    installPackages().then(() => {
      console.log('');
      console.log(chalk.grey('------------------------------------------------------------------------------------'));
      console.log(chalk.white.bold('Let\'s get started'));

      console.log(chalk.grey('------------------------------------------------------------------------------------'));
      console.log('');
      console.log(chalk.green.bold('  Step 1: '), chalk.green('cd into the newly created'), chalk.blue.bold(` " ${appName} " `), chalk.green('directory'));
      console.log('');

      console.log(chalk.grey('------------------------------------------------------------------------------------'));
      console.log('');
      console.log(chalk.green.bold('  Step 2: '), chalk.green('Init Firebase functions'), chalk.blue.bold('" firebase init funtions "'));
      console.log(chalk.yellow('  If you haven\'t installed firebase-tools '), chalk.yellow.bold('" npm i -g firebase-tools "'));
      console.log('');

      console.log(chalk.grey('------------------------------------------------------------------------------------'));
      console.log('');
      console.log(chalk.green.bold('  Step 3: '), chalk.green('run '), chalk.blue.bold('yarn run deploy'));
      console.log('');

      console.log(chalk.grey('------------------------------------------------------------------------------------'));
      console.log(chalk.grey('------------------------------------------------------------------------------------'));
      console.log('');
      console.log(chalk.green.bold('  You are now ready deployed your first Firebase function'));
      console.log('');
      console.log(chalk.grey('------------------------------------------------------------------------------------'));
      console.log(chalk.grey('------------------------------------------------------------------------------------'));
    })
    .catch(error => {
      console.log(chalk.red('An unexpected error occurred'))
      console.log(chalk.red(error));
    });
  });
}


// module.exports = initCreate;
module.exports = create;