import { MMCChecker, MECChecker } from "./MMCMECChecker.ts/MMCMMEChecker";
// import xml2js from 'xml2js';
import { DOMParser } from 'xmldom';
import { Bag } from 'typescript-collections';
import * as xpath from 'xpath';

export interface IXMLFileAdaptor {
    readFile(path: string): Promise<string>
    writeFile(path: string, content: string): Promise<void>
}

export interface test {
    test: {
        name: string,
        age: number
        job: {
            name: string,
            salary: number
        }[]
    }
}

export default class MMCMECParser {
    private readonly fileAdaptor: IXMLFileAdaptor;
    private mmcFile: string;
    private mecFile: string;

    public constructor({fileAdaptor}: {fileAdaptor: IXMLFileAdaptor}) {
        this.fileAdaptor = fileAdaptor;
        this.mmcFile = '';
        this.mecFile = '';
    }

    public async parseMMC(path: string): Promise<unknown> {
        try {
            this.mmcFile = await this.fileAdaptor.readFile(path);
          } catch (err) {
            throw err
          }

        if (!MMCChecker(this.mmcFile)) {
            throw new Error('MMC file is not valid');
        }

        // parser
        return {}
    } 


    // Things to do:
    // Put main tag attributes in string with prefix
    // Fix duplicates tags, and put them in array
    // Find solution for main tag prefix
    // Indent correctly interface
    public generateInterface(xmlDoc: Document, nodeName: string, processedNodes: Bag<Node> = new Bag(), prefix?: string): string {
        let interfaceBody = '';
        let node = xmlDoc.getElementsByTagName(nodeName)[0];
        if (processedNodes.contains(node)) {
            node = xmlDoc.getElementsByTagName(nodeName)[processedNodes.count(node)];
        }
        processedNodes.add(node);
        if (node) {
          const attributes = node.attributes;
          if (attributes && attributes.length > 0) {
            for (let i = 0; i < attributes.length; i++) {
              const attribute = attributes[i];
              interfaceBody += `\n${attribute.nodeName}: ${typeof(attribute.nodeValue)};`;
            }
            interfaceBody += `\n${prefix ? '_prefix: "' + prefix + '";' : ''}`
          }
          const children = node.childNodes;
          if (children && children.length > 0) {
            for (let i = 0; i < children.length; i++) {
              const childNode = children[i];
              if (childNode.nodeType === node.ELEMENT_NODE) {
                const childName = childNode.nodeName;
                const childInterface = this.generateInterface(xmlDoc, childName, processedNodes, childName.includes(':')?childName.split(':')[0]:'');
                interfaceBody += `\n${childName.includes(':')?childName.split(':')[1]:childName}: ${childInterface}`;
              }
            }
          }
            if (children && children.length <= 1) {
                interfaceBody += `\n_tagText: string;`;
            }
        }
        return `{${interfaceBody}\n}`;
      }

    public generateInterfaceFromXML(xmlString: string): string {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        const root = xmlDoc.documentElement;
        const interfaceName = root.nodeName;
        const interfaceBody = this.generateInterface(xmlDoc, interfaceName);
        return `interface ${interfaceName} ${interfaceBody}`;
    }

    public async parseMEC(path: string): Promise<unknown> {
        try {
            this.mecFile = await this.fileAdaptor.readFile(path);
          } catch (err) {
            throw err
          }

        if (!MECChecker(this.mecFile)) {
            throw new Error('MEC file is not valid');
        }

        // parser
        console.log(this.generateInterfaceFromXML(this.mecFile));
        return {}
    }

    public async exportMEC(path: string, data: unknown): Promise<void> {
        // valider

        // export en XML

        // write vers le file adapator
    }

    public async exportMMC(path: string, data: unknown): Promise<void> {
        // valider

        // export en XML

        // write vers le file adapator
    }
}
