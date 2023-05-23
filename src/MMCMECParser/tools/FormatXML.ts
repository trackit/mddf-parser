import { DOMParser, XMLSerializer } from 'xmldom';
import { IFormatXML } from '../interfaces/IFormatXML';

/* eslint-disable no-param-reassign */
export class FormatXML implements IFormatXML {
  private keysToAddPrefix1: string[];

  private keysToTransform: string[];

  private removedKeys: string[];

  private prefix1: string;

  private prefix2: string;

  private xmlString: string;

  private parentMap: Map<string, string[]>;

  constructor(prefix1: string, prefix2: string, keysToAddPrefix1: string[]) {
    this.keysToAddPrefix1 = keysToAddPrefix1;
    this.keysToTransform = [];
    this.removedKeys = [];
    this.prefix1 = prefix1;
    this.prefix2 = prefix2;
    this.xmlString = '';
    this.parentMap = new Map();
  }

  public formatTags(xml: string): string {
    this.xmlString = xml.replaceAll(`<${this.prefix1}:`, '<')
      .replaceAll(`/${this.prefix1}:`, '/')
      .replaceAll(`<${this.prefix2}:`, '<')
      .replaceAll(`/${this.prefix2}:`, '/')
      .replaceAll('$t', '_tagText');

    this.parentMap = this.extractParentElements(xml, this.keysToAddPrefix1);
    return this.xmlString;
  }

  public transformTextNodes(obj: unknown) {
    if (typeof obj === 'object' && obj !== null) {
      const recordObj = obj as Record<string, unknown>;
      Object.keys(recordObj).forEach((key) => {
        const value = recordObj[key];
        if (typeof value === 'object' && value !== null) {
          const recordValue = value as Record<string, unknown>;
          if (Object.prototype.hasOwnProperty.call(recordValue, '_tagText') && Object.keys(recordValue).length === 1) {
            recordObj[key] = recordValue._tagText;
            this.keysToTransform.push(key);
          } else {
            this.transformTextNodes(value);
          }
        }
      });
    }
  }

  public transformSpecificKeys(obj: unknown): unknown {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }
    const recordObj = obj as Record<string, unknown>;
    Object.entries(recordObj).forEach(([key, value]) => {
      if (this.keysToTransform.includes(key) && typeof value === 'string') {
        recordObj[key] = { $t: value };
      } else if (typeof value === 'object' && value !== null) {
        this.transformSpecificKeys(value);
      }
    });
    return obj;
  }

  public removePrefixesAndCollectKeys(obj: unknown): unknown {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    const recordObj = obj as Record<string, unknown>;

    Object.keys(recordObj).forEach((key) => {
      const value = recordObj[key];
      const prefix = key.substring(0, key.indexOf(':') + 1);

      if (prefix === 'xmlns:' || prefix === 'xsi:') {
        return obj;
      }

      const newKey = key.replace(prefix, '');

      if (prefix !== '' && !this.removedKeys.includes(newKey)) {
        this.removedKeys.push(newKey);
      }

      recordObj[newKey] = this.removePrefixesAndCollectKeys(value);
      if (newKey !== key) {
        delete recordObj[key];
      }
      return obj;
    });
    return obj;
  }

  public addPrefixes(json: unknown, parentKey?: string): unknown {
    if (typeof json !== 'object' || json === null) {
      return json;
    }

    const jsonObj = json as Record<string, unknown>;

    if (Array.isArray(jsonObj)) {
      jsonObj.forEach((item, index) => {
        jsonObj[index] = this.addPrefixes(item, parentKey);
      });
    } else {
      Object.keys(jsonObj).forEach((key) => {
        if (this.removedKeys.includes(key)) {
          let prefix = `${this.prefix2}:`;
          if ((parentKey && this.checkKeyAndParent(key, parentKey, this.parentMap)) || parentKey === undefined) {
            prefix = `${this.prefix1}:`;
          }
          const newKey = prefix + key;
          jsonObj[newKey] = this.addPrefixes(jsonObj[key], key);
          if (newKey !== key) {
            delete jsonObj[key];
          }
        } else {
          jsonObj[key] = this.addPrefixes(jsonObj[key], key);
        }
      });
    }

    return json;
  }

  public extractParentElements(xmlString: string, elementNames: string[]): Map<string, string[]> {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    const parentMap: Map<string, string[]> = new Map();

    elementNames.forEach((elementName) => {
      const elements = xmlDoc.getElementsByTagName(`${this.prefix1}:${elementName}`);
      for (let i = 0; i < elements.length; i += 1) {
        const parent = elements[i].parentNode;
        if (parent) {
          const parentName = parent.nodeName.replace(`${this.prefix1}:`, '');
          if (parentMap.has(elementName)) {
            const parents = parentMap.get(elementName);
            if (parents && !parents.includes(parentName)) {
              parents.push(parentName);
            }
          } else {
            parentMap.set(elementName, [parentName]);
          }
        }
      }
    });

    return parentMap;
  }

  public checkKeyAndParent(jsonKey: string, parentName: string, parentMap: Map<string, string[]>): boolean {
    if (parentMap.has(jsonKey)) {
      const parents = parentMap.get(jsonKey);
      if (parents && parents.includes(parentName)) {
        return true;
      }
    }
    return false;
  }

  public removeAttributePrefixes(xmlString: string): string {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

    const allElements = xmlDoc.getElementsByTagName('*');

    for (let i = 0; i < allElements.length; i += 1) {
      const element = allElements[i];
      for (let j = 0; j < element.attributes.length; j += 1) {
        const attr = element.attributes[j];

        const splitAttr = attr.name.split(':');

        if (splitAttr.length > 1 && (splitAttr[0] === this.prefix1 || splitAttr[0] === this.prefix2)) {
          element.setAttribute(splitAttr[1], attr.value);
          element.removeAttribute(attr.name);
        }
      }
    }

    const serializer = new XMLSerializer();
    const updatedXmlString = serializer.serializeToString(xmlDoc);

    return updatedXmlString;
  }
}
