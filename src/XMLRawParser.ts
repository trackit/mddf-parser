/* eslint-disable no-param-reassign */
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

  private isParsableBoolean(value: unknown): value is string {
    return value === 'true' || value === 'false';
  }

  private parseBoolean(value: string): boolean {
    return value === 'true';
  }

  private parseBooleanStringsToBooleanRecursive(obj: Record<string, unknown>): void {
    if (!obj) return;
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        this.parseBooleanStringsToBooleanRecursive(value as Record<string, unknown>);
      } else if (this.isParsableBoolean(value)) {
        obj[key] = this.parseBoolean(value);
      }
    });
  }

  async parseString(xmlData: string): Promise<Record<string, unknown>> {
    const parsedData = await this.parser.parseStringPromise(xmlData);
    if (parsedData) {
      this.parseBooleanStringsToBooleanRecursive(parsedData);
    }
    return parsedData;
  }
}
