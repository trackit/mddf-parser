import { toJson, toXml } from 'xml2json';
import { MMCChecker } from './MMCChecker';
import { MMCInterface } from './MMCInterface';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';
import { IXMLFileAdaptor } from '../interfaces/IXMLFileAdaptor';
import { IParser } from '../interfaces/IParser';
import { FormatXML } from '../tools/FormatXML';
import { InterfacesValidator } from '../tools/InterfacesValidator';

export class MMCParser implements IParser<MMCInterface> {
  private readonly fileAdaptor: IXMLFileAdaptor;

  private readonly formatXML: FormatXML;

  private mmcFile: string;

  private mmcData: MMCInterface;

  private arrayKeys: Array<string> = ['ContainerReference', 'ManifestApp', 'Description', 'TrackMetadata', 'LanguagePair', 'VideoTrackReference',
    'AudioTrackReference', 'SubtitleTrackReference', 'AncillaryTrackReference', 'Purpose', 'VideoTrackID', 'TrackProfile', 'Profile', 'AudioTrackID',
    'SubtitleTrackID', 'AncillaryTrackID', 'WorkTypeDetail', 'Chapter', 'DisplayLabel', 'ImageID', 'Marker', 'OPLID', 'SubType', 'ContainerLocation',
    'ContainerIdentifier', 'ContainerIntent', 'Hash', 'AssetReference', 'AssociatedOrg', 'ContentID', 'OtherIdentifier', 'AlternateName',
    'AudioTrackStart', 'VideoTrackStart', 'SubtitleTrackStart', 'AvailsEntryID', 'FileInfo', 'Location', 'Identifier', 'Track', 'Language',
    'People', 'Compliance', 'AssetIntent', 'TrackIdentifier', 'CodecType', 'Watermark', 'Job', 'ImageReference', 'Biography', 'JobDisplay',
    'BillingBlockOrder', 'Character', 'CharacterInfo', 'region', 'CharacterName', 'CharacterID', 'Gender', 'GroupingEntity', 'CharacterDescription',
    'Title', 'DisplayName', 'AltGroupIdentifier', 'SortName', 'StandardDetail', 'ErrorDescription', '_tagText', 'ObjectInError', 'CaptureMethod',
    'Language', 'SubtitleLanguage', 'CardsetList', 'ColorTransformMetadata', 'ContentMax', 'FrameAverageMax', 'Type', 'Region', 'Cardset', 'Type',
    'Encoding', 'ContainsAnnotation', 'WritingFeatures', 'Encoding', 'EnvironmentAttribute', 'UpdateNum', 'AlternateEmail', 'Address', 'Phone',
    'System', 'ValidatorParameter', 'Licensor', 'Audio', 'Video', 'Subtitle', 'Image', 'Interactive', 'Ancillary', 'Metadata', 'TextObject',
    'ExternalManifest', 'Presentation', 'PlayableSequence', 'Clip', 'ImageClip', 'ReferenceID', 'BranchChoice', 'Applicability', 'Label',
    'DescriptionID', 'PictureGroup', 'Picture', 'StyleRef', 'ImageID', 'ThumbnailImageID', 'LanguageInImage', 'AlternateText', 'Caption', 'AppGroup',
    'InteractiveTrackReference', 'TextGroup', 'TextObjectID', 'Experience', 'ExcludedLanguage', 'Region', 'ExcludedRegion',
    'PictureGroupID', 'TextGroupID', 'TimedSequenceID', 'ExperienceChild', 'AppName', 'Rating', 'Rating', 'Reason', 'LinkToLogo', 'GalleryName',
    'AlternateNumber', 'TimedEventSequence', 'TimedEvent', 'TextGroupID', 'Coordinate', 'ALIDExperienceMap', 'ALID', 'ExperienceID',
    'RelatedExperienceID', 'BaseTrackIdentifier', 'Alias', 'LocalizedInfo', 'ReleaseHistory', 'AltIdentifier', 'CountryOfOrigin',
    'PrimarySpokenLanguage', 'OriginalLanguage', 'VersionLanguage', 'ContentRelatedTo', 'AncillaryDescription', 'Parent', 'ArtReference',
    'DisplayIndicators', 'Genre', 'Keyword', 'TargetAudience', 'PeopleLocal', 'TitleAlternate', 'Who', 'When', 'What', 'Identification',
    'Terms', 'DistrTerritory', 'ReleaseOrg', 'EditClass', 'Work', 'Character', 'PersonOrGroup', 'Period', 'Place', 'Event', 'Description',
    'AdditionalTerms', 'LocalizedPair', 'ContainerReference', 'TextString', 'AudioTrackID', 'VideoTrackID', 'SubtitleTrackID', 'InteractiveTrackID',
    'TextObjectID', 'PlayableSequenceID', 'PresentationID', 'PictureID', 'GalleryID', 'AppGroupID', 'ExperienceID', 'ALIDExperienceMap',
    'LocalizedInfoRef', 'TextGroup', 'TextGroups', 'TimedEventSequence'];

  private specificPrefixes: Array<string> = ['TimecodePattern', 'ContainerLocation', 'ParentContainer', 'PresentationID',
    'EntryPointTimecode', 'ExitPointTimecode', 'Purpose', 'Branching', 'AudioTrackID', 'ImageID', 'ContainerReference', 'Timecode',
    'Compatibility', 'Inventory', 'Presentations', 'PlayableSequences', 'PictureGroups', 'AppGroups', 'TextGroups', 'Experiences',
    'TimedEventSequences', 'ALIDExperienceMaps', 'ManifestApp', 'PictureID', 'LocalizedPair', 'Alias', 'SubtitleTrackID', 'Audio',
    'Video', 'Subtitle', 'Image', 'Interactive', 'Ancillary', 'Metadata', 'TextObject', 'ExternalManifest', 'Source', 'MediaInventory',
    'VideoTrackID', 'TrackProfile', 'AncillaryTrackID', 'VideoTrackReference', 'AudioTrackReference', 'SubtitleTrackReference',
    'AncillaryTrackReference', 'PresentationStart', 'TrackMetadata', 'LanguagePair', 'Chapters', 'Markers', 'IMFRef',
    'PresentationTimeline', 'Presentation', 'MediaPresentation', 'MediaPresentationManifest', 'EntryTimecode', 'Chapter',
    'Marker', 'InteractiveTrackID', 'InteractiveTrackReference', 'AppGroup', 'Picture', 'PictureGroup', 'TextObjectID', 'TextGroup',
    'PlayableSequenceID', 'BranchChoice', 'Clip', 'ImageClip', 'SequenceTimeline', 'PlayableSequence', 'Type', 'AppGroupID', 'PictureGroupID',
    'ExperienceID', 'Audiovisual', 'App', 'Gallery', 'TextGroupID', 'TimedSequenceID', 'ExperienceChild', 'ExperienceAttributes', 'Experience',
    'RelatedExperienceID', 'ALIDExperienceMap', 'StartTimecode', 'EndTimecode', 'GalleryID', 'ProductID', 'OtherID', 'TimePeriod', 'Location',
    'TimecodeOffset', 'TimedEvent', 'TimedEventSequence', 'EventLocationEarthCoordinate', 'EventLocationOtherCoordinate', 'Licensor',
    'MediaManifest', 'LocalizedInfoRef', 'DeleteObjects', 'AddObjects', 'MediaManifestEdit', 'Delivery', 'FileInfo', 'FileManifestInfo',
    'FileManifest', 'FileDeleteManifest', 'ContentID', 'SpecVersion', 'Profile', 'TrackSelectionNumber', 'SubType', 'LanguageInImage',
    'ExcludedRegion', 'Relationship', 'Region', 'ALID'];

  private requiredFields: Array<string> = ['xmlns:manifest', 'xmlns:md', 'xmlns:xsi', 'xsi:schemaLocation', 'Compatibility',
    'Inventory', 'Experiences', 'SpecVersion', 'Profile'];

  public constructor({ fileAdaptor }: { fileAdaptor: IXMLFileAdaptor }) {
    this.fileAdaptor = fileAdaptor;
    this.formatXML = new FormatXML('manifest', 'md', this.specificPrefixes);
    this.mmcFile = '';
    this.mmcData = {} as MMCInterface;
  }

  public async parse(path: string): Promise<MMCInterface> {
    this.mmcFile = await this.fileAdaptor.readFile(path);

    if (!MMCChecker(this.mmcFile)) {
      throw new LibraryExceptions('MMC file is not valid');
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

    const tmp = JSON.parse(toJson(this.formatXML.formatTags(this.mmcFile), options));
    this.formatXML.transformTextNodes(tmp);
    this.formatXML.removePrefixesAndCollectKeys(JSON.parse(toJson(this.mmcFile)));
    this.mmcData = tmp;

    return this.mmcData;
  }

  public async export(path: string, data: MMCInterface): Promise<void> {
    if (data === undefined) {
      throw new LibraryExceptions('No data to export');
    }

    const validator = new InterfacesValidator();
    try {
      validator.validate(data, this.requiredFields);
    } catch (error) {
      throw new LibraryExceptions(error as string);
    }

    this.mmcData = this.formatXML.transformSpecificKeys(this.mmcData) as MMCInterface;
    this.mmcData = this.formatXML.addPrefixes(this.mmcData) as MMCInterface;
    const xml = this.formatXML.removeAttributePrefixes(toXml(JSON.stringify(this.mmcData).replaceAll('_tagText', '$t')));
    await this.fileAdaptor.writeFile(path, xml);
  }
}
