import { Parser } from 'xml2js';

export class XMLRawParser {
  private parser: Parser;

  constructor() {
    this.parser = new Parser({
      mergeAttrs: true,
      explicitArray: false,
      charkey: 'Value',
    });
  }

  async parseString(xmlData: string) {
    return this.parser.parseStringPromise(xmlData);
  }
}
