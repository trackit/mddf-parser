import { toJson, toXml } from 'xml2json';
// import { XMLParser, XMLBuilder } from 'fast-xml-parser';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as pd from 'pretty-data';
import { MECChecker } from './MECChecker';
import { MECInterface } from './MECInterface';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';
import { IXMLFileAdaptor } from '../interfaces/IXMLFileAdaptor';
import { IParser } from '../interfaces/IParser';
import { FormatXML } from '../tools/FormatXML';
import { InterfacesValidator } from '../tools/InterfacesValidator';
// import * as mecSchema from '../../../assets/schema/MECSchema.json';

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

    // const alwaysArray = ['CoreMetadata','CoreMetadata.Compatibility.System','CoreMetadata.Compatibility.ValidatorParameter','CoreMetadata.Basic.LocalizedInfo','CoreMetadata.Basic.LocalizedInfo.ArtReference','CoreMetadata.Basic.LocalizedInfo.DisplayIndicators','CoreMetadata.Basic.LocalizedInfo.Genre','CoreMetadata.Basic.LocalizedInfo.Keyword','CoreMetadata.Basic.LocalizedInfo.Region','CoreMetadata.Basic.LocalizedInfo.ExcludedRegion','CoreMetadata.Basic.LocalizedInfo.TargetAudience','CoreMetadata.Basic.LocalizedInfo.TargetAudience.Who','CoreMetadata.Basic.LocalizedInfo.TargetAudience.When','CoreMetadata.Basic.LocalizedInfo.TargetAudience.What','CoreMetadata.Basic.LocalizedInfo.TargetAudience.Identification','CoreMetadata.Basic.LocalizedInfo.TargetAudience.Terms','CoreMetadata.Basic.LocalizedInfo.PeopleLocal','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.JobDisplay','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.BillingBlockOrder','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.BillingBlockOrder.region','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.Character','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.CharacterName','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.CharacterID','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.Gender','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.Salutations.Title','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.GroupingEntity','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.GroupingEntity.DisplayName','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.GroupingEntity.AltGroupIdentifier','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.ImageReference','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Job.CharacterInfo.CharacterDescription','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Name.DisplayName','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Name.SortName','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Identifier','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.ImageReference','CoreMetadata.Basic.LocalizedInfo.PeopleLocal.Biography','CoreMetadata.Basic.LocalizedInfo.TitleAlternate','CoreMetadata.Basic.ReleaseHistory','CoreMetadata.Basic.ReleaseHistory.DistrTerritory','CoreMetadata.Basic.ReleaseHistory.ReleaseOrg','CoreMetadata.Basic.ReleaseHistory.ReleaseOrg.AlternateName','CoreMetadata.Basic.WorkTypeDetail','CoreMetadata.Basic.AltIdentifier','CoreMetadata.Basic.RatingSet.Rating','CoreMetadata.Basic.RatingSet.Rating.Reason','CoreMetadata.Basic.RatingSet.Rating.LinkToLogo','CoreMetadata.Basic.RatingSet.Rating.Description','CoreMetadata.Basic.People','CoreMetadata.Basic.People.Job','CoreMetadata.Basic.People.Job.JobDisplay','CoreMetadata.Basic.People.Job.BillingBlockOrder','CoreMetadata.Basic.People.Job.BillingBlockOrder.region','CoreMetadata.Basic.People.Job.Character','CoreMetadata.Basic.People.Job.CharacterInfo','CoreMetadata.Basic.People.Job.CharacterInfo.CharacterName','CoreMetadata.Basic.People.Job.CharacterInfo.CharacterID','CoreMetadata.Basic.People.Job.CharacterInfo.Gender','CoreMetadata.Basic.People.Job.CharacterInfo.Salutations.Title','CoreMetadata.Basic.People.Job.CharacterInfo.GroupingEntity','CoreMetadata.Basic.People.Job.CharacterInfo.GroupingEntity.DisplayName','CoreMetadata.Basic.People.Job.CharacterInfo.GroupingEntity.AltGroupIdentifier','CoreMetadata.Basic.People.Job.CharacterInfo.ImageReference','CoreMetadata.Basic.People.Job.CharacterInfo.CharacterDescription','CoreMetadata.Basic.People.Name.DisplayName','CoreMetadata.Basic.People.Name.SortName','CoreMetadata.Basic.People.Identifier','CoreMetadata.Basic.People.ImageReference','CoreMetadata.Basic.People.Biography','CoreMetadata.Basic.CountryOfOrigin','CoreMetadata.Basic.PrimarySpokenLanguage','CoreMetadata.Basic.OriginalLanguage','CoreMetadata.Basic.VersionLanguage','CoreMetadata.Basic.VersionIntent.Description','CoreMetadata.Basic.VersionIntent.EditClass','CoreMetadata.Basic.VersionIntent.Terms','CoreMetadata.Basic.AssociatedOrg','CoreMetadata.Basic.ContentRelatedTo','CoreMetadata.Basic.ContentRelatedTo.Relationship.SubType','CoreMetadata.Basic.ContentRelatedTo.Relationship.Description','CoreMetadata.Basic.ContentRelatedTo.Description','CoreMetadata.Basic.ContentRelatedTo.Work','CoreMetadata.Basic.ContentRelatedTo.Work.ContentID','CoreMetadata.Basic.ContentRelatedTo.Work.OtherIdentifier','CoreMetadata.Basic.ContentRelatedTo.Work.Description','CoreMetadata.Basic.ContentRelatedTo.Character','CoreMetadata.Basic.ContentRelatedTo.Character.Description','CoreMetadata.Basic.ContentRelatedTo.Character.CharacterName','CoreMetadata.Basic.ContentRelatedTo.Character.CharacterID','CoreMetadata.Basic.ContentRelatedTo.Character.Gender','CoreMetadata.Basic.ContentRelatedTo.Character.GroupingEntity','CoreMetadata.Basic.ContentRelatedTo.Character.ImageReference','CoreMetadata.Basic.ContentRelatedTo.Character.CharacterDescription','CoreMetadata.Basic.ContentRelatedTo.PersonOrGroup','CoreMetadata.Basic.ContentRelatedTo.PersonOrGroup.Identifier','CoreMetadata.Basic.ContentRelatedTo.PersonOrGroup.Description','CoreMetadata.Basic.ContentRelatedTo.Period','CoreMetadata.Basic.ContentRelatedTo.Period.Description','CoreMetadata.Basic.ContentRelatedTo.Place','CoreMetadata.Basic.ContentRelatedTo.Place.OtherCoordinate.Coordinate','CoreMetadata.Basic.ContentRelatedTo.Place.Description','CoreMetadata.Basic.ContentRelatedTo.Event','CoreMetadata.Basic.ContentRelatedTo.Event.SubType','CoreMetadata.Basic.ContentRelatedTo.Event.Description','CoreMetadata.Basic.ContentRelatedTo.GroupingEntity','CoreMetadata.Basic.ContentRelatedTo.Terms','CoreMetadata.Basic.AncillaryDescription','CoreMetadata.Basic.AncillaryDescription.SubType','CoreMetadata.Basic.AncillaryDescription.Description','CoreMetadata.Basic.AncillaryDescription.AdditionalTerms','CoreMetadata.Basic.SequenceInfo.AlternateNumber','CoreMetadata.Basic.Parent','CoreMetadata.Basic.Parent.Parent.LocalizedInfo','CoreMetadata.Basic.Parent.Parent.ReleaseHistory','CoreMetadata.Basic.Parent.Parent.WorkTypeDetail','CoreMetadata.Basic.Parent.Parent.AltIdentifier','CoreMetadata.Basic.Parent.Parent.People','CoreMetadata.Basic.Parent.Parent.CountryOfOrigin','CoreMetadata.Basic.Parent.Parent.PrimarySpokenLanguage','CoreMetadata.Basic.Parent.Parent.OriginalLanguage','CoreMetadata.Basic.Parent.Parent.VersionLanguage','CoreMetadata.Basic.Parent.Parent.AssociatedOrg','CoreMetadata.Basic.Parent.Parent.ContentRelatedTo','CoreMetadata.Basic.Parent.Parent.AncillaryDescription','CoreMetadata.Basic.Parent.Parent.Parent','CoreMetadata.Basic.Parent.Region','CoreMetadata.Basic.Parent.ExcludedRegion','CoreMetadata.DigitalAsset','CoreMetadata.DigitalAsset.Audio.Description','CoreMetadata.DigitalAsset.Audio.SubType','CoreMetadata.DigitalAsset.Audio.Encoding.CodecType','CoreMetadata.DigitalAsset.Audio.Encoding.Watermark','CoreMetadata.DigitalAsset.Audio.Encoding.Loudness.Compliance','CoreMetadata.DigitalAsset.Audio.Language','CoreMetadata.DigitalAsset.Audio.People','CoreMetadata.DigitalAsset.Audio.Compliance','CoreMetadata.DigitalAsset.Audio.Compliance.StandardDetail','CoreMetadata.DigitalAsset.Audio.Compliance.Certificate._tagText','CoreMetadata.DigitalAsset.Audio.Compliance.ErrorDescription','CoreMetadata.DigitalAsset.Audio.Compliance.ErrorDescription.CategorySpecificInfo.AudioOrVideoOrTimedText','CoreMetadata.DigitalAsset.Audio.AssetIntent','CoreMetadata.DigitalAsset.Audio.AssetIntent.SubType','CoreMetadata.DigitalAsset.Audio.AssetIntent.AssetReference','CoreMetadata.DigitalAsset.Audio.AssetIntent.AssetReference.ContentID','CoreMetadata.DigitalAsset.Audio.AssetIntent.AssetReference.OtherIdentifier','CoreMetadata.DigitalAsset.Audio.AssetIntent.AssetReference.Description','CoreMetadata.DigitalAsset.Audio.AssetIntent.AssociatedOrg','CoreMetadata.DigitalAsset.Audio.TrackIdentifier','CoreMetadata.DigitalAsset.Audio.Private.Any','CoreMetadata.DigitalAsset.Video.Description','CoreMetadata.DigitalAsset.Video.SubType','CoreMetadata.DigitalAsset.Video.Encoding.CodecType','CoreMetadata.DigitalAsset.Video.Encoding.Watermark','CoreMetadata.DigitalAsset.Video.Picture.ColorTransformMetadata','CoreMetadata.DigitalAsset.Video.Picture.LightLevel.ContentMax','CoreMetadata.DigitalAsset.Video.Picture.LightLevel.FrameAverageMax','CoreMetadata.DigitalAsset.Video.Picture.HDRPlaybackInfo.Any','CoreMetadata.DigitalAsset.Video.Picture.Any','CoreMetadata.DigitalAsset.Video.CaptureMethod','CoreMetadata.DigitalAsset.Video.Language','CoreMetadata.DigitalAsset.Video.SubtitleLanguage','CoreMetadata.DigitalAsset.Video.CardsetList','CoreMetadata.DigitalAsset.Video.CardsetList.Type','CoreMetadata.DigitalAsset.Video.CardsetList.Region','CoreMetadata.DigitalAsset.Video.CardsetList.Cardset','CoreMetadata.DigitalAsset.Video.CardsetList.Cardset.Type','CoreMetadata.DigitalAsset.Video.CardsetList.Cardset.Language','CoreMetadata.DigitalAsset.Video.Compliance','CoreMetadata.DigitalAsset.Video.AssetIntent','CoreMetadata.DigitalAsset.Video.TrackIdentifier','CoreMetadata.DigitalAsset.Subtitle.Description','CoreMetadata.DigitalAsset.Subtitle.Type','CoreMetadata.DigitalAsset.Subtitle.SubType','CoreMetadata.DigitalAsset.Subtitle.Language','CoreMetadata.DigitalAsset.Subtitle.Properties.ContainsAnnotation','CoreMetadata.DigitalAsset.Subtitle.Properties.WritingFeatures','CoreMetadata.DigitalAsset.Subtitle.CardsetList','CoreMetadata.DigitalAsset.Subtitle.Compliance','CoreMetadata.DigitalAsset.Subtitle.AssetIntent','CoreMetadata.DigitalAsset.Subtitle.TrackIdentifier','CoreMetadata.DigitalAsset.Image.Description','CoreMetadata.DigitalAsset.Image.Type','CoreMetadata.DigitalAsset.Image.SubType','CoreMetadata.DigitalAsset.Image.Purpose','CoreMetadata.DigitalAsset.Image.Language','CoreMetadata.DigitalAsset.Image.CardsetList','CoreMetadata.DigitalAsset.Image.Compliance','CoreMetadata.DigitalAsset.Image.AssetIntent','CoreMetadata.DigitalAsset.Image.TrackIdentifier','CoreMetadata.DigitalAsset.Interactive.SubType','CoreMetadata.DigitalAsset.Interactive.Encoding','CoreMetadata.DigitalAsset.Interactive.Encoding.EnvironmentAttribute','CoreMetadata.DigitalAsset.Interactive.Encoding.Any','CoreMetadata.DigitalAsset.Interactive.Compliance','CoreMetadata.DigitalAsset.Interactive.AssetIntent','CoreMetadata.DigitalAsset.Interactive.TrackIdentifier','CoreMetadata.DigitalAsset.Ancillary.SubType','CoreMetadata.DigitalAsset.Ancillary.BaseTrackIdentifier','CoreMetadata.DigitalAsset.Ancillary.Compliance','CoreMetadata.DigitalAsset.Ancillary.AssetIntent','CoreMetadata.Source.ContactInfo.AlternateEmail','CoreMetadata.Source.ContactInfo.Address','CoreMetadata.Source.ContactInfo.Phone','CoreMetadata.Source.AlternateName','CoreMetadata.CompanyDisplayCredit','CoreMetadata.CompanyDisplayCredit.DisplayString','CoreMetadata.CompanyDisplayCredit.Region','CoreMetadata.GroupingEntity'];

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
      validator.validateMainKeys(data, this.requiredFields);
      // validator.validateObjectFromSchema(data, mecSchema);
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
      validator.validateMainKeys(data, this.requiredFields);
      // validator.validateObjectFromSchema(data, mecSchema);
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
