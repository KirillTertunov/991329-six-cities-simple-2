import chalk from 'chalk';
import { CliCommandInterface } from './cli-comand.interface';

export default class HelpComand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void>  {
    console.log(`
        ${chalk.blueBright('Программа для подготовки данных для REST API сервера.')}
        ${chalk.yellowBright('Пример:')}
            ${chalk.yellowBright('main.js --<command> [--arguments]')}
        ${chalk.blueBright('Команды:')}
            ${chalk.cyan('--version:')}                   # return version number
            ${chalk.cyan('--help:')}                      # print this text
            ${chalk.cyan('--import ')} ${chalk.green('<path>:')}             # import data from file .tsv
            ${chalk.cyan('--generator')} ${chalk.green('<n> <path> <url>')} # generate random number of mocks
    `);
  }
}
