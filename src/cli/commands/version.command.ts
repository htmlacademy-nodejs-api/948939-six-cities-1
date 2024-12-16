import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { Command } from './command.interface.js';
import chalk from 'chalk';
import { injectable } from 'inversify';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

const FILE_PATH = 'package.json';

@injectable()
export class VersionCommand implements Command {

  private readVersion(): string {
    const jsonContent = readFileSync(resolve(FILE_PATH), 'utf-8');
    const importedContent: unknown = JSON.parse(jsonContent);

    if (! isPackageJSONConfig(importedContent)) {
      throw new Error('Failed to parse json content.');
    }

    return importedContent.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(chalk.blue(version));
    } catch (error: unknown) {
      console.error(chalk.red(`Failed to read version from ${FILE_PATH}`));

      if (error instanceof Error) {
        console.error(chalk.red(error.message));
      }
    }
  }
}
