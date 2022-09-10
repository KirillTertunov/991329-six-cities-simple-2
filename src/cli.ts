#!/usr/bin/env node

import VersionComand from './cli-comand/version-comand.js';
import HelpComand from './cli-comand/help-command.js';
import ImportCommand from './cli-comand/import-command.js';
import CLIApplication from './app/cli-application.js';

const myManager = new CLIApplication();
myManager.registerCommands([new VersionComand, new HelpComand, new ImportCommand]);
myManager.processCommand(process.argv);
