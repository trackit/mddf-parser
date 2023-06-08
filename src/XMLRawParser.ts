import { Parser } from 'xml2js';

export class XMLRawParser {
  private parser: Parser;

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

  async parseString(xmlData: string): Promise<string> {
    return this.parser.parseStringPromise(xmlData);
  }
}
