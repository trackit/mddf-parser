import { toJson, toXml } from 'xml2json';
import { MECChecker } from './MECChecker';
import { MECInterface } from './MECInterface';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';
import { IXMLFileAdaptor } from '../interfaces/IXMLFileAdaptor';
import { IParser } from '../interfaces/IParser';
import { FormatXML } from '../tools/FormatXML';
import { isValidMECInterface } from './MECInterfaceValidator';

export class MECParser implements IParser<MECInterface> {
  private readonly fileAdaptor: IXMLFileAdaptor;

  private readonly formatXML: FormatXML;

  private mecFile: string;

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

  public async export(path: string, data: MECInterface): Promise<void> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }

    if (!isValidMECInterface(this.mecData)) {
      throw new LibraryExceptions('Invalid MEC data');
    }

    this.mecData = this.formatXML.transformSpecificKeys(this.mecData);
    this.mecData = this.formatXML.addPrefixes(this.mecData);
    const xml = toXml(JSON.stringify(data).replaceAll('_tagText', '$t'));
    await this.fileAdaptor.writeFile(path, xml);
  }
}
