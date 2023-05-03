import { MMCChecker, MECChecker } from './MMCMECChecker/MMCMMEChecker';
import { loadMECDataFromXml } from './MEC/MECXMLParser';
import { loadMMCDataFromXml } from './MMC/MMCXMLParser';
import { MECInterface } from './MEC/MECInterface';
import { MMCInterface } from './MMC/MMCInterface';
import { createMMCtoXML } from './MMC/MMCtoXML';
import { createMECtoXML } from './MEC/MECtoXML';
import { LibraryExceptions } from './exceptions/LibraryExceptions';

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

  public constructor({ fileAdaptor }: { fileAdaptor: IXMLFileAdaptor }) {
    this.fileAdaptor = fileAdaptor;
    this.mmcFile = '';
    this.mecFile = '';
    this.mecData = {} as MECInterface;
    this.mmcData = {} as MMCInterface;
  }

  public async parseMMC(path: string): Promise<MMCInterface> {
    this.mmcFile = await this.fileAdaptor.readFile(path);

    if (!MMCChecker(this.mmcFile)) {
      throw new LibraryExceptions('MMC file is not valid');
    }

    this.mmcData = await loadMMCDataFromXml(this.mmcFile);
    return this.mmcData;
  }

  public async parseMEC(path: string): Promise<MECInterface> {
    this.mecFile = await this.fileAdaptor.readFile(path);

    if (!MECChecker(this.mecFile)) {
      throw new LibraryExceptions('MEC file is not valid');
    }

    this.mecData = await loadMECDataFromXml(this.mecFile);
    return this.mecData;
  }

  public async exportMEC(path: string, data: MECInterface): Promise<void> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }
    const mec = data as MECInterface;
    if (mec.Basic === undefined || mec['xmlns:mdmec'] === undefined) {
      throw new LibraryExceptions('Invalid MEC data');
    }
    const xml = createMECtoXML(mec);
    await this.fileAdaptor.writeFile(path, xml);
  }

  public async exportMMC(path: string, data: MMCInterface): Promise<void> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }
    const mmc = data as MMCInterface;
    if (mmc.Inventory === undefined || mmc.Presentations === undefined) {
      throw new LibraryExceptions('Invalid MMC data');
    }
    const xml = createMMCtoXML(mmc);
    await this.fileAdaptor.writeFile(path, xml);
  }
}
