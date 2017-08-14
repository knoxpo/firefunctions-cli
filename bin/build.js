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

const build = (deployState = false ) => {
  let command;
  if (shouldUseYarn()) {
    command = 'yarn';
  } else {
    command = 'npm';
  }

  try {
    execSync('cp -r ./package.json ./functions/ && tsc && cd functions && ' + command, { stdio: 'ignore' });
    console.log(chalk.green('Build Successful!'));
    return true;
  } catch (e) {
    console.log(chalk.red('An unexpected error occurred'))
    return false;
  }
}

module.exports = build;