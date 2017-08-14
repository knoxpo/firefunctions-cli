#!/usr/bin/env node

const program = require('commander')
const spawn = require('child_process').spawn;
const package = require('../package.json');
const chalk = require('chalk');

const build = require('./build');
const deploy = require('./deploy');
const create = require('./create');

program
  .version(package.version)
  .usage('<keywords>')
  .parse(process.argv);

if (program.args.length > 0) {
  switch (program.args[0]) {
    case "init":
      spawn(initCreate(program.args[1]), {
        shell: true,
        stdio: 'inherit'
      });
      break;
    case "new":
      if (program.args.length == 2) {
        spawn(create(program.args[1]), {
          shell: true,
          stdio: 'inherit'
        });
      } else {
        console.log(chalk.red('Please supply a name for your new FireFunctions project (kebab-case or CamelCase)'));
      }
      break;
    case "generate":
      if (program.args.length == 2) {
        spawn(create(program.args[1]), {
          shell: true,
          stdio: 'inherit'
        });
      } else {
        console.log(chalk.red('Please supply a name for your new FireFunctions project (kebab-case or CamelCase)'));
      }
      break;
    case "build":
      spawn(build(), {
        shell: true,
        stdio: 'inherit'
      });
      break;
    case "deploy":
      spawn(build(), {
        shell: true,
        stdio: 'inherit'
      });
      spawn(deploy(), {
        shell: true,
        stdio: 'inherit'
      });
      break;
    case "v":
      console.log(chalk.green(package.version));
      break;
    default:
      console.log(chalk.red('Incorrect use of fireup command. Run \'fireup help\' to learn more about fireup commands.'));
      break;
  }
} else if (program.args.length < 1) {
  console.log(chalk.red('Incorrect use of fireup command. Run \'fireup help\' to learn more about fireup commands.'));
}