#!/usr/bin/env node

const program = require('commander')
const spawn = require('child_process').spawn;
const package = require('../package.json');
const chalk = require('chalk');

const build = require('./build');
const deploy = require('./deploy');
const create = require('./create');
const yargsCli = require('yargs');

program
  .version(package.version)
  .usage('<keywords>')
  .parse(process.argv);

yargsCli
  .command('new', 'create new FireFunctions project', (yargs) => {
    yargs.usage('Usage: $0 new [name]')
  }, (argv) => {
    spawn(create(argv._[0]), {
      shell: true,
      stdio: 'inherit'
    });
  })
  .command('build', 'build your FireFunctions project', (yargs) => {
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
  .command('deploy', 'deploy your FireFunctions project to Firebase', (yargs) => {
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
  .command(['g', 'generate'], 'generate new FireFunctions project files', (yargs) => {
    yargs
    .usage('Usage: $0 generate')
    .option('tigger', {
      describe: 'add new triggers',
      type: 'string',
      alias: 't'
    })
    .option('angular', {
      describe: 'add new Angular app',
      type: 'string',
      alias: 'a'
    })
    .option('react', {
      describe: 'add new React app',
      type: 'string',
      alias: 'r'
    })
    .option('graphql', {
      describe: 'add new GraphQL app',
      type: 'string',
      alias: 'gpql'
    })
  }, (argv) => {
    console.log(chalk.yellow.bold('Generate functionality coming soon!'));
  })
  .usage('Usage: $0 <command> [options]')
  .help('h')
  .alias('h', 'help')
  .epilog('MIT Licence')
  .argv