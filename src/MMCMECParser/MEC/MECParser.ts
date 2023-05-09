import { MECChecker } from './MECChecker';
import { loadMECDataFromXml } from './MECXMLParser';
import { MECInterface } from './MECInterface';
import { createMECtoXML } from './MECtoXML';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';
import { isValidMECInterface } from './MECInterfaceValidator';
import { IXMLFileAdaptor } from '../interfaces/IXMLFileAdaptor';
import { IParser } from '../interfaces/IParser';

export class MECParser implements IParser<MECInterface> {
  private readonly fileAdaptor: IXMLFileAdaptor;

  private mecFile: string;

  private mecData: MECInterface;

  public constructor({ fileAdaptor }: { fileAdaptor: IXMLFileAdaptor }) {
    this.fileAdaptor = fileAdaptor;
    this.mecFile = '';
    this.mecData = {} as MECInterface;
  }

  public async parse(path: string): Promise<MECInterface> {
    this.mecFile = await this.fileAdaptor.readFile(path);

    if (!MECChecker(this.mecFile)) {
      throw new LibraryExceptions('MMC file is not valid');
    }

    this.mecData = await loadMECDataFromXml(this.mecFile);
    return this.mecData;
  }

  public async export(path: string, data: MECInterface): Promise<void> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }
    const mmc = data as MECInterface;
    if (!isValidMECInterface(mmc)) {
      throw new LibraryExceptions('Invalid MMC data');
    }
    const xml = createMECtoXML(mmc);
    await this.fileAdaptor.writeFile(path, xml);
  }
}
