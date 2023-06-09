/* eslint-disable no-param-reassign */
import { Parser } from 'xml2js';

type Data = Record<string, unknown>;

export class XMLRawParser {
  private parser: Parser;

  private data: Data | undefined;

  constructor() {
    this.parser = new Parser({
      mergeAttrs: true,
      explicitArray: false,
      charkey: 'Value',
      trim: true,
      explicitChildren: true,
      explicitCharkey: true,
    });
  }

  private convertBooleans(obj: Data = this.data as Data): void {
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        this.convertBooleans(value as Data);
      } else if (value === 'true') {
        obj[key] = true;
      } else if (value === 'false') {
        obj[key] = false;
      }
    });
  }

  async parseString(xmlData: string): Promise<Data> {
    const parsedData = await this.parser.parseStringPromise(xmlData);
    this.data = parsedData as Data;
    if (this.data) {
      this.convertBooleans();
    }
    return this.data as Data;
  }
}
