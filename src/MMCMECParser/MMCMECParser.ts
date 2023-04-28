import { MMCChecker, MECChecker } from "./MMCMECChecker/MMCMMEChecker";
import { loadMECDataFromXml } from "./MEC/MECXMLParser";
import { loadMMCDataFromXml } from "./MMC/MMCXMLParser";
import { MECInterface } from './MEC/MECInterface';
import { MMCInterface } from './MMC/MMCInterface';
import { createMMCtoXML } from "./MMC/MMCtoXML";
import { createMECtoXML } from "./MEC/MECtoXML";

export interface IXMLFileAdaptor {
    readFile(path: string): Promise<string>
    writeFile(path: string, content: string): Promise<void>
}

export default class MMCMECParser {
    private readonly fileAdaptor: IXMLFileAdaptor;
    private mmcFile: string;
    private mecFile: string;
    private mecData: MECInterface;
    private mmcData: MMCInterface;

    public constructor({fileAdaptor}: {fileAdaptor: IXMLFileAdaptor}) {
        this.fileAdaptor = fileAdaptor;
        this.mmcFile = '';
        this.mecFile = '';
        this.mecData = {} as MECInterface;
        this.mmcData = {} as MMCInterface;
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

        try {
            this.mmcData = await loadMMCDataFromXml(this.mmcFile);
        } catch (err) {
            throw err
        }
        return this.mmcData;
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
        return this.mecData;
    }

    public async exportMEC(path: string, data: unknown): Promise<void> {
        if (data === undefined) {
            throw new Error("No data to export");
        }
        const mec = data as MECInterface;
        if (mec.Basic === undefined || mec["xmlns:mdmec"] === undefined) {
            throw new Error("Invalid MEC data");
        }
        const xml = createMECtoXML(mec)
        try {
            await this.fileAdaptor.writeFile(path, xml);
        } catch (err) {
            throw err
        }
    }

    public async exportMMC(path: string, data: unknown): Promise<void> {
        if (data === undefined) {
            throw new Error("No data to export");
        }
        const mmc = data as MMCInterface;
        if (mmc.Inventory === undefined || mmc.Presentations === undefined) {
            throw new Error("Invalid MMC data");
        }
        const xml = createMMCtoXML(mmc)
        try {
            await this.fileAdaptor.writeFile(path, xml);
        } catch (err) {
            throw err
        }
    }
}
