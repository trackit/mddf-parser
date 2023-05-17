export interface IFormatXML {
  formatTags(xml: string): string;
  transformTextNodes(obj: any): void;
  transformSpecificKeys(obj: any): any;
  removePrefixesAndCollectKeys(obj: any): any;
  addPrefixes(json: any): any;
}
