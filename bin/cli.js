#!/usr/bin/env node

const program = require('commander')
const spawn = require('child_process').spawn;
const package = require('../package.json');
const chalk = require('chalk');
const yargs = require('yargs');
const fs = require('fs');

const build = require('./build');
const deploy = require('./deploy');
const create = require('./create');
const genTrigger = require('./gen-trigger');
const hlp = require('./helper');

IS_FIREFUNC_PROJECT = hlp.is_project;

program
  .version(package.version)
  .usage('<keywords>')
  .parse(process.argv);

yargs
  .command(['new', 'n'], 'create new FireFunctions project', (yargs) => {
    yargs.usage('Usage: $0 new [name]')
  }, (argv) => {
    spawn(create(argv._[1]), {
      shell: true,
      stdio: 'inherit'
    });
  })
  .command(['build', 'b'], 'build your FireFunctions project', (yargs) => {
    yargs
      .usage('Usage: $0 build')
      .option('env', {
        describe: 'build environment',
        default: 'dev',
        type: 'string',
        alias: 'e'
      })
  }, (argv) => {
    spawn(build(), {
      shell: true,
      stdio: 'inherit'
    });
  })
  .command(['deploy', 'd'], 'deploy your FireFunctions project to Firebase', (yargs) => {
    yargs.usage('Usage: $0 deploy')
  }, (argv) => {
    spawn(build(), {
      shell: true,
      stdio: 'inherit'
    });
    spawn(deploy(), {
      shell: true,
      stdio: 'inherit'
    });
  })
  .command(['generate', 'g'], 'generate new FireFunctions project files', (yargs) => {
    if (IS_FIREFUNC_PROJECT) {
      yargs
        .usage('Usage: $0 generate <command> [options]')
        .command(['trigger', 't'], 'add new triggers', (yargs) => {}, (argv) => {
          // console.log(argv);
          // console.log(chalk.blue.bold('Generate functionality coming soon!'));
          spawn(genTrigger(argv._[2]), {
            shell: true,
            stdio: 'inherit'
          });
        })
        .command(['angular', 'a'], 'add new Angular app', (yargs) => {}, (argv) => {})
        .command(['react', 'r'], 'add new React app', (yargs) => {}, (argv) => {})
        .command(['graphql', 'gpql'], 'add new GraphQL app', (yargs) => {}, (argv) => {})
    } else {
      console.log(chalk.red.bold('Invalid Command: This is not a FireFunctions project'));
    }
  }, (argv) => {
    if (argv[1] == null) {
      // console.log(chalk.yellow.bold('Generate functionality coming soon!'));
    }
  })
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .alias('h', 'help')
  .epilog('MIT Licence')
  .argv