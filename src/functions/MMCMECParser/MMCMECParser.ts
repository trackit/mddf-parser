import { MMCChecker, MECChecker } from "./MMCMECChecker/MMCMMEChecker";
import { loadMECDataFromXml } from "./MECXMLParser";
import { MECInterface } from './MECInterface';

export interface IXMLFileAdaptor {
    readFile(path: string): Promise<string>
    writeFile(path: string, content: string): Promise<void>
}

export default class MMCMECParser {
    private readonly fileAdaptor: IXMLFileAdaptor;
    private mmcFile: string;
    private mecFile: string;
    private mecData: MECInterface;

    public constructor({fileAdaptor}: {fileAdaptor: IXMLFileAdaptor}) {
        this.fileAdaptor = fileAdaptor;
        this.mmcFile = '';
        this.mecFile = '';
        this.mecData = {} as MECInterface;
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

    public async parseMEC(path: string): Promise<unknown> {
        try {
            this.mecFile = await this.fileAdaptor.readFile(path);
        } catch (err) {
          throw err
        }

        if (!MECChecker(this.mecFile)) {
            throw new Error('MEC file is not valid');
        }

        try {
            this.mecData = await loadMECDataFromXml(this.mecFile);
        } catch (err) {
            throw err
        }
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
