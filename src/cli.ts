#!/usr/bin/env node

import VersionComand from './cli-comand/version-comand.js';
import HelpComand from './cli-comand/help-command.js';
import ImportCommand from './cli-comand/import-command.js';
import CLIApplication from './app/cli-application.js';
import GenerateCommand from './cli-comand/generate-command.js';

const myManager = new CLIApplication();
myManager.registerCommands([new VersionComand, new HelpComand, new ImportCommand, new GenerateCommand]);
myManager.processCommand(process.argv);
