import TSVFileReader from '../common/file-reader/tcv-file-reader.js';
import { CliCommandInterface } from './cli-comand.interface';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Failed to convert file cause of: «${err.message}»`);
    }
  }
}
