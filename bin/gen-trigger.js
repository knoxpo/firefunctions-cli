#!/usr/bin/env node

require('shelljs/global');
const path = require('path');
const fs = require('fs');
const figlet = require('figlet');
const chalk = require('chalk');
const execSync = require('child_process').execSync;
const spawn = require('cross-spawn');
const jsonQuery = require('json-query');
const hlp = require('./helper');

const triggerBasePath = hlp.getFromCliConfig('workspace.triggerSource') + '/';

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', {
      stdio: 'ignore'
    });
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

    const child = spawn(command, args, {
      stdio: 'inherit'
    });
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

const getTodayDate = () => {
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth()+1; //January is 0!
  var yyyy = date.getFullYear();
  if(dd<10) {
      dd = '0'+dd
  } 
  if(mm<10) {
      mm = '0'+mm
  }
  today = dd + '/' + mm + '/' + yyyy;
  return today;
}

const readCliConfig = (query) => {
  var jsonData = JSON.parse(fs.readFileSync('./.firefunctions-cli.json', 'utf8'));
  return jsonQuery(query, { data: jsonData }).value;
}

const replaceInFile = (file, triggerName) => {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/<<filename>>/g, triggerName);
    result = result.replace(/<<author>>/g, hlp.getFromCliConfig('project.author'));
    result = result.replace(/<<date>>/g, getTodayDate());

    fs.writeFile(file, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

const genTrigger = (triggerName) => {
  const newTriggerName = triggerName + '.ts';
  const newTriggerPath = triggerBasePath + newTriggerName;
  if(!fs.existsSync(newTriggerPath)) {
    console.log(chalk.grey(`Generating ${triggerName} trigger...`))
    cp('-r', __dirname + '/../blueprints/trigger.ts', newTriggerPath);
    replaceInFile(newTriggerPath, triggerName);
    console.log(chalk.green(`Generated new trigger: ${newTriggerPath}`)); 
    console.log(chalk.white.bold('Let\'s Setup'));
    console.log(chalk.grey('------------------------------------------------------------------------------------'));
    console.log('');
    console.log(chalk.green.bold('  Step 1: '), chalk.green('Add '), chalk.blue.bold(` " import { ${triggerName} } from './triggers/${triggerName}' " `), chalk.green('to your project\'s main index.ts'));
    console.log('');
    console.log(chalk.grey('------------------------------------------------------------------------------------'));
    console.log('');
    console.log(chalk.green.bold('  Step 2: '), chalk.green(`Now, Add "${triggerName}" to export in main index.ts with your other exports `), chalk.blue.bold(` " export { ${triggerName} } " `));
    console.log('');
    console.log(chalk.grey('------------------------------------------------------------------------------------'));
  } else {
    console.log(chalk.red(`Trigger with same exist: ${newTriggerPath}`)); 
  }
}


module.exports = genTrigger;