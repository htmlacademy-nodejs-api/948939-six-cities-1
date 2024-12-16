import { Command } from './command.interface.js';
import chalk from 'chalk';
import { injectable } from 'inversify';

const logText = (text: string) => chalk.green(text);
const logCommand = (text: string) => chalk.yellow(text);
const logCommandDescription = (text: string) => chalk.blue(text);

@injectable()
export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
    ${logText('Программа для подготовки данных для REST API сервера.')}
    ${logText('Пример:')}
    \t${logCommand('cli.js --<command> [--arguments]')}
    ${logText('Команды:')}
    \t${logCommand('--version')}:\t\t\t\t${logCommandDescription('# выводит номер версии')}
    \t${logCommand('--help')}:\t\t\t\t\t${logCommandDescription('# печатает этот текст')}
    \t${logCommand('--import <path>')}:\t\t\t${logCommandDescription('# импортирует данные из TSV')}
    \t${logCommand('--generate <count> <path> <url>')}:\t${logCommandDescription('# получает данные из <url>, генерирует <count> предложений и сохраняет в файл <path>')}
    `);
  }
}
