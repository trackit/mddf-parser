import { json2xml } from 'xml-js';
import { LocalFileAdaptor } from '../FileAdaptor/LocalFileAdaptor';

export class XsdUtils {

  // Public functions

  public addNamespaceToElementInObject(currentObject: Record<string, unknown>, path: Array<string>, xsd: Record<string, unknown>): Record<string, unknown> {
    var tempObject: Record<string, unknown>;
    var tempValue;
    var namespace: string = '';

    for (var field in currentObject) {
      if (this.isObject(currentObject[field])) {
        path.push(field)
        namespace = this.searchPreciseElementObjectNamespaceInXsd(xsd, path) + ':' + field;
        tempObject = currentObject[field] as Record<string, unknown>;
        delete currentObject[field];
        currentObject[namespace] = tempObject;
        this.addNamespaceToElementInObject(currentObject[namespace] as Record<string, unknown>, path, xsd);
        path.pop();
      }
      else {
        path.push(field);
        namespace = this.searchPreciseElementObjectNamespaceInXsd(xsd, path) + ':' + field;
        tempValue = currentObject[field];
        delete currentObject[field];
        currentObject[namespace] = tempValue;
        path.pop();
      }
    }
    return currentObject;
  }

  // Private functions

  private searchPreciseElementObjectNamespaceInXsd(xsd: Record<string, unknown>, path: Array<string>): string {
    var currentObj: Record<string, unknown> = xsd;    
    var nodeName = '';
    for (var element in path) {
      nodeName = this.searchFirstElementNamespaceInXsd(path[element], currentObj, nodeName);
      currentObj = this.goToFirstElementInXsd(path[element], currentObj, nodeName);
    }
    return this.parseNamespace(nodeName);
  }

  // private searchPreciseElementNamespaceInXsd(xsd: Record<string, unknown>, path: Array<string>): string {
  //   var lastElement: string = path.pop() as string;
    
  //   var currentObj: Record<string, unknown> = xsd;
  //   var nodeName = '';
  //   for (var element in path) {
  //     nodeName = this.searchFirstElementNamespaceInXsd(path[element], currentObj, nodeName);
  //     currentObj = this.goToFirstElementInXsd(path[element], currentObj, nodeName);
  //   }

  //   return this.parseNamespace(currentObj[lastElement]);
  // }

  private searchFirstElementNamespaceInXsd(elementName: string, xsd: Record<string, unknown>, nodeName: string): string {
    var temp: string = '';
    if (nodeName.includes('element') && this.isElementTheWantedOne(xsd as Record<string, unknown>, elementName)) {
      return nodeName;
    }
    else {
      for (var field in xsd) {
        if (this.isObject(xsd[field])) {
          temp = this.searchFirstElementNamespaceInXsd(elementName, xsd[field] as Record<string, unknown>, field);
          if (temp != '') {
            return temp;
          }
        }
      }
      return temp;
    }
  }

  private goToFirstElementInXsd(elementName: string, xsd: Record<string, unknown>, nodeName: string): Record<string, unknown> {
    var temp: Record<string, unknown> = {};
    if (nodeName.includes('element') && this.isElementTheWantedOne(xsd as Record<string, unknown>, elementName)) {
      return xsd;
    }
    else {
      for (var field in xsd) {
        if (this.isObject(xsd[field])) {
          temp = this.goToFirstElementInXsd(elementName, xsd[field] as Record<string, unknown>, field);
          for (var value in temp) {
            return temp;
          }
        }
      }
      return temp;
    }
  }

  private isObject(obj: unknown): obj is object {
    return typeof obj == 'object';
  }

  private isElementTheWantedOne(field: Record<string, unknown>, elementName: string): boolean {
    for (var subField in field) {      
      if (subField == 'name' && field[subField] == elementName) {
        return true;
      }
      else if (this.isObject(field[subField])) {
        var temp : Record<string, unknown> = field[subField] as Record<string, unknown>;
        if (temp['name'] == elementName) {
          return true
        } 
      }
      else {
        return false;
      }
    }
    return false;
  }

  private parseNamespace(element: string) {
    var splittedString: Array<string> = element.split(':');
    var namespace: string = splittedString[0];

    return namespace;
  }

}
