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

const deploy = () => {
  try {
    execSync('firebase deploy --only functions', { stdio: 'inherit' });
    return true;
  } catch (e) {
    console.log(chalk.red('An unexpected error occurred'))
    return false;
  }
}

module.exports = deploy;