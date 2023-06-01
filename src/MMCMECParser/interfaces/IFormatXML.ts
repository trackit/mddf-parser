export interface IFormatXML {
  formatTags(xml: string): string;
  transformTextNodes(obj: unknown): void;
  transformSpecificKeys(obj: unknown): unknown;
  removePrefixesAndCollectKeys(obj: unknown): unknown;
  addPrefixes(json: unknown, parentKey?: string): unknown;
  checkKeyAndParent(jsonKey: string, parentName: string, parentMap: Map<string, string[]>): boolean;
  extractParentElements(xmlString: string, elementNames: string[]): Map<string, string[]>
  removeAttributePrefixes(xmlString: string): string;
}
