// ---------------------------------------- //
//   Utils needed to deal with XSD files    //
// ---------------------------------------- //

import { parseString,  } from 'xml2js';
import { readFileSync, readFile } from 'fs';
import { json2xml } from 'xml-js';

import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';

export class XsdUtils {

  public runJsonToXmlTest(testXsd: Record<string, unknown>, testObject: JSON): void {
    const fileReader = new LocalFileAdaptor();

    const json = JSON.stringify(testObject);
    const xml = json2xml(json, { compact: true, spaces: 4 });

    fileReader.writeFile('assets/JsonToXml/XmlResult.xml', xml);
  }
  
  // Function that returns the namespace of the first <element> with right elementName encountered; 
  public searchElementNamespaceInXsd(elementName: string, xsd: Record<string, unknown>, nodeName: string): string {
    var temp: string = "";
    if (nodeName.includes("element") && this.isElementTheWantedOne(xsd as Record<string, unknown>, elementName)) {
      return this.parseNamespace(nodeName);
    }
    else {
      for (var field in xsd) {
        if (this.isObject(xsd[field])) {
          temp = this.searchElementNamespaceInXsd(elementName, xsd[field] as Record<string, unknown>, field);
          if (temp != "") {
            return temp;
          }
        }
      }
      return temp;
    }
  }

  // public searchPreciseElementNameSpaceInXsd(elementName: string, xsd: Record<string, unknown>, path: Array<string>): string {
  //   var currentObj: Record<string, unknown> = xsd;
  //   for (var field in path) {
  //     if (field) {

  //     }
  //   }
  //   return "";
  // }

  private isObject(obj: unknown): obj is object {
    return typeof obj == "object";
  }

  private isElementTheWantedOne(field: Record<string, unknown>, elementName: string): boolean {
    for (var subField in field) {      
      if (subField == "name" && field[subField] == elementName) {
        return true;
      }
    }
    return false;
  }

  // private isElementInTheObject(elementName: string, object: Record<string, unknown>): boolean {
  //   for (var field in object) {
  //     if (field.includes("element") && this.isElementTheWantedOne(object as Record<string, unknown>, elementName)) {
  //       return true;
  //     }
  //     else if (this.isObject(object[field])) {
  //       this.isElementInTheObject(elementName, object[field] as Record<string, unknown>);
  //     }
  //   }
  // }

  private parseNamespace(element: string) {
    var splittedString: Array<string> = element.split(':');
    var namespace: string = splittedString[0];

    return namespace;
  }

}
