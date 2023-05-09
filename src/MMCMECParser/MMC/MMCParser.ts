import { MMCChecker } from './MMCChecker';
import { loadMMCDataFromXml } from './MMCXMLParser';
import { MMCInterface } from './MMCInterface';
import { createMMCtoXML } from './MMCtoXML';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';
import { isValidMMCInterface } from './MMCInterfaceValidator';
import { IXMLFileAdaptor } from '../interfaces/IXMLFileAdaptor';
import { IParser } from '../interfaces/IParser';

export class MMCParser implements IParser<MMCInterface> {
  private readonly fileAdaptor: IXMLFileAdaptor;

  private mmcFile: string;

  private mmcData: MMCInterface;

  public constructor({ fileAdaptor }: { fileAdaptor: IXMLFileAdaptor }) {
    this.fileAdaptor = fileAdaptor;
    this.mmcFile = '';
    this.mmcData = {} as MMCInterface;
  }

  public async parse(path: string): Promise<MMCInterface> {
    this.mmcFile = await this.fileAdaptor.readFile(path);

    if (!MMCChecker(this.mmcFile)) {
      throw new LibraryExceptions('MMC file is not valid');
    }

    this.mmcData = await loadMMCDataFromXml(this.mmcFile);
    return this.mmcData;
  }

  public async export(path: string, data: MMCInterface): Promise<void> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }
    const mmc = data as MMCInterface;
    if (!isValidMMCInterface(mmc)) {
      throw new LibraryExceptions('Invalid MMC data');
    }
    const xml = createMMCtoXML(mmc);
    await this.fileAdaptor.writeFile(path, xml);
  }
}
