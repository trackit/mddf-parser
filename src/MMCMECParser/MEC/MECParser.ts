import { toJson, toXml } from 'xml2json';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as pd from 'pretty-data';
import { MECChecker } from './MECChecker';
import { MECInterface } from './MECInterface';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';
import { IXMLFileAdaptor } from '../interfaces/IXMLFileAdaptor';
import { IParser } from '../interfaces/IParser';
import { FormatXML } from '../tools/FormatXML';
import { InterfacesValidator } from '../tools/InterfacesValidator';

export class MECParser implements IParser<MECInterface> {
  private readonly fileAdaptor: IXMLFileAdaptor;

  private readonly formatXML: FormatXML;

  public mecFile: string;

  private mecData: MECInterface;

  private arrayKeys: Array<string> = ['Description', 'ArtReference', 'DisplayIndicators', 'Genre', 'Keyword',
    'Region', 'ExcludedRegion', 'TargetAudience', 'PeopleLocal', 'TitleAlternate', 'Who', 'When',
    'What', 'Identification', 'Terms', 'Job', 'Identifier', 'Gender', 'ImageReference', 'Biography',
    'JobDisplay', 'BillingBlockOrder', 'Character', 'CharacterInfo', 'region', 'CharacterID',
    'GroupingEntity', 'CharacterDescription', 'Title', 'DisplayName', 'AltGroupIdentifier', 'SortName',
    'System', 'ValidatorParameter', 'DigitalAsset', 'CompanyDisplayCredit', 'LocalizedInfo',
    'ReleaseHistory', 'WorkTypeDetail', 'AltIdentifier', 'People', 'CountryOfOrigin',
    'PrimarySpokenLanguage', 'OriginalLanguage', 'VersionLanguage', 'AssociatedOrg', 'ContentRelatedTo',
    'AncillaryDescription', 'Parent', 'DistrTerritory', 'ReleaseOrg', 'AlternateName', 'Rating', 'Reason',
    'LinkToLogo', 'EditClass', 'Work', 'Period', 'Place', 'Event', 'SubType', 'ContentID', 'OtherIdentifier',
    'Coordinate', 'AdditionalTerms', 'AlternateNumber', 'Compliance', 'AssetIntent', 'TrackIdentifier', 'CodecType',
    'Watermark', 'StandardDetail', 'ErrorDescription', 'AudioOrVideoOrTimedText', 'ObjectInError', 'AssetReference',
    'Any', 'CaptureMethod', 'Language', 'SubtitleLanguage', 'CardsetList', 'ColorTransformMetadata', 'ContentMax',
    'FrameAverageMax', 'Type', 'Cardset', 'ContainsAnnotation', 'WritingFeatures', 'Purpose', 'EnvironmentAttribute',
    'BaseTrackIdentifier', 'AlternateEmail', 'Address', 'Phone', 'DisplayString', 'CoreMetadata'];

  private requiredFields: Array<string> = ['xmlns:md', 'xmlns:xsi', 'xmlns:mdmec', 'xsi:schemaLocation', 'Basic', 'ContentID',
    'CoreMetadata', 'LocalizedInfo'];

  public constructor({ fileAdaptor }: { fileAdaptor: IXMLFileAdaptor }) {
    this.fileAdaptor = fileAdaptor;
    this.formatXML = new FormatXML('mdmec', 'md', ['Basic', 'DigitalAsset', 'Source', 'CoreMetadata', 'CoreMetadataList',
      'LocalizedInfoDelivery', 'LocalizedInfoDeliveryList']);
    this.mecFile = '';
    this.mecData = {} as MECInterface;
  }

  public async parse(path: string): Promise<MECInterface> {
    this.mecFile = await this.fileAdaptor.readFile(path);

    if (!MECChecker(this.mecFile)) {
      throw new LibraryExceptions('MEC file is not valid');
    }

    const options: Object = {
      object: false,
      reversible: true,
      coerce: false,
      sanitize: true,
      trim: true,
      arrayNotation: this.arrayKeys,
      alternateTextNode: '_tagText',
    };

    const tmp = JSON.parse(toJson(this.formatXML.formatTags(this.mecFile), options));
    this.formatXML.transformTextNodes(tmp);
    this.formatXML.removePrefixesAndCollectKeys(JSON.parse(toJson(this.mecFile)));
    this.mecData = tmp;

    return this.mecData;
  }

  public convert(data: MECInterface): Promise<string> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }

    const validator = new InterfacesValidator();
    try {
      validator.validate(data, this.requiredFields);
    } catch (error) {
      throw new LibraryExceptions(error as string);
    }

    let formatedData = this.formatXML.transformSpecificKeys(data) as MECInterface;
    formatedData = this.formatXML.addPrefixes(formatedData) as MECInterface;
    const xml = this.formatXML.removeAttributePrefixes(toXml(JSON.stringify(formatedData).replaceAll('_tagText', '$t')));
    const prettyXml = pd.pd.xml(xml);
    return Promise.resolve(prettyXml);
  }

  public async export(path: string, data: MECInterface): Promise<void> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }

    const validator = new InterfacesValidator();
    try {
      validator.validate(data, this.requiredFields);
    } catch (error) {
      throw new LibraryExceptions(error as string);
    }

    let formatedData = this.formatXML.transformSpecificKeys(data) as MECInterface;
    formatedData = this.formatXML.addPrefixes(formatedData) as MECInterface;
    const xml = this.formatXML.removeAttributePrefixes(toXml(JSON.stringify(formatedData).replaceAll('_tagText', '$t')));
    const prettyXml = pd.pd.xml(xml);
    await this.fileAdaptor.writeFile(path, prettyXml);
    return Promise.resolve();
  }
}
