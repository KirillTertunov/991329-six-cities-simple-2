import { readFileSync } from 'fs';
import { CliCommandInterface } from './cli-comand.interface';

export default class VersionComand implements CliCommandInterface {
  public readonly name = '--version';

  private readVersion(): string {
    const contentPackageJson = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPackageJson);

    return content.version;
  }

  public async execute(): Promise<void> {
    const version = this.readVersion();
    console.log(version);
  }
}
