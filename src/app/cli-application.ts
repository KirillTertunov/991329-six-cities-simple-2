import { CliCommandInterface } from '../cli-comand/cli-comand.interface';

type ParsedCommand = {
  [key: string]: string[]
}

export default class CLIApplication {
  private commands: { [propertyName: string]: CliCommandInterface } = {};
  private defaultCommand = '--help';

  private parseComand(cliArguments: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {};

    cliArguments.forEach((argument) => {
      if (!argument) {
        return;
      }

      const keys = Object.keys(parsedCommand);

      if (/^--/.test(argument)) {
        parsedCommand[argument] = [];
      } else if (keys.length){
        parsedCommand[keys[0]].push(argument);
      }
    });


    return parsedCommand;
  }

  public getCommand(commandName: string) : CliCommandInterface {
    return this.commands[commandName] ?? this.commands[this.defaultCommand];
  }

  public processCommand (argv: string[]): void {
    const parsedCommand = this.parseComand(argv);
    const [commandName] = Object.keys(parsedCommand);
    const command = this.getCommand(commandName);
    const commandArguments = parsedCommand[commandName] ?? [];
    command.execute(...commandArguments);
  }

  public registerCommands(commandList: CliCommandInterface[]): void {
    commandList.forEach((cliCommand) => {
      this.commands[cliCommand.name] = cliCommand;
    });
  }
}
