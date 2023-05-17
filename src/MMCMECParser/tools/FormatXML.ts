import { IFormatXML } from '../interfaces/IFormatXML';

/* eslint-disable no-param-reassign */
export class FormatXML implements IFormatXML {
  private keysToAddPrefix1: string[];

  private keysToTransform: string[];

  private removedKeys: string[];

  private prefix1: string;

  private prefix2: string;

  constructor(prefix1: string, prefix2: string, keysToAddPrefix1: string[]) {
    this.keysToAddPrefix1 = keysToAddPrefix1;
    this.keysToTransform = [];
    this.removedKeys = [];
    this.prefix1 = prefix1;
    this.prefix2 = prefix2;
  }

  public formatTags(xml: string): string {
    return xml.replaceAll(`<${this.prefix1}:`, '<')
      .replaceAll(`/${this.prefix1}:`, '/')
      .replaceAll(`<${this.prefix2}:`, '<')
      .replaceAll(`/${this.prefix2}:`, '/')
      .replaceAll('$t', '_tagText');
  }

  public transformTextNodes(obj: any) {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'object') {
        if (Object.prototype.hasOwnProperty.call(obj[key], '_tagText') && Object.keys(obj[key]).length === 1) {
          obj[key] = obj[key]._tagText;
          this.keysToTransform.push(key);
        } else {
          this.transformTextNodes(obj[key]);
        }
      }
    });
  }

  public transformSpecificKeys(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    Object.entries(obj).forEach(([key, value]) => {
      if (this.keysToTransform.includes(key) && typeof value === 'string') {
        obj[key] = { $t: value };
      } else if (typeof value === 'object') {
        this.transformSpecificKeys(value);
      }
    });
    return obj;
  }

  public removePrefixesAndCollectKeys(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    Object.keys(obj).forEach((key) => {
      const value = obj[key];
      const prefix = key.substring(0, key.indexOf(':') + 1);

      if (prefix === 'xmlns:' || prefix === 'xsi:') {
        return obj;
      }

      const newKey = key.replace(prefix, '');

      if (prefix !== '' && !this.removedKeys.includes(newKey)) {
        this.removedKeys.push(newKey);
      }

      obj[newKey] = this.removePrefixesAndCollectKeys(value);
      if (newKey !== key) {
        delete obj[key];
      }
      return obj;
    });
    return obj;
  }

  public addPrefixes(json: any): any {
    if (typeof json !== 'object' || json === null) {
      return json;
    }

    Object.keys(json).forEach((key) => {
      if (this.removedKeys.includes(key)) {
        const prefix = this.keysToAddPrefix1.includes(key) ? `${this.prefix1}:` : `${this.prefix2}:`;
        const newKey = prefix + key;
        json[newKey] = this.addPrefixes(json[key]);
        if (newKey !== key) {
          delete json[key];
        }
      } else {
        json[key] = this.addPrefixes(json[key]);
      }
    });

    return json;
  }
}
