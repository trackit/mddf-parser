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

  async parseString(xmlData: string): Promise<Record<string, unknown>> {
    const parsedData = await this.parser.parseStringPromise(xmlData);
    if (parsedData) {
      this.parsePrimitiveRecursive(parsedData);
    }
    return parsedData;
  }

  private parsePrimitiveRecursive(obj: Record<string, unknown>): void {
    if (!obj) return;
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object' && value !== null) {
        this.parsePrimitiveRecursive(value as Record<string, unknown>);
      } else if (this.isParsableBoolean(value)) {
        obj[key] = this.parseBoolean(value);
      } else if (this.isParsableNumber(value)) {
        obj[key] = Number(value);
      }
    });
  }

  private isParsableBoolean(value: unknown): value is string {
    return value === 'true' || value === 'false';
  }

  private isParsableNumber(value: unknown): value is string {
    return !Number.isNaN(Number(value));
  }

  private parseBoolean(value: string): boolean {
    return value === 'true';
  }
}
