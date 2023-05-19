export type PresentationtypeTrackMetadata = TrackMetadatatype & {};
export type MarkerListtypeMarker = Markertype & {};
export type AssociatedOrgtype = OrgNametype & {
  role?: string;
  roleCategory?: string;
};
export type PresentationTimelinetypeAudioTrackStart = Timecodetype & {
  audioTrackID?: string;
};
export type PresentationTimelinetypeVideoTrackStart = Timecodetype & {
  videoTrackID?: string;
};
export type PresentationTimelinetypeSubtitleTrackStart = Timecodetype & {
  subtitleTrackID?: string;
};
export type FileManifesttype = FileManifestInfotype & {};
export type QCCategoryErrortypeAudio = QCErrorAudiotype & {};
export type QCCategoryErrortypeVideo = QCErrorVideotype & {};
export type QCCategoryErrortypeTimedText = QCErrorTimedTexttype & {};
export type QCCategoryErrortypeArtwork = QCErrorArtworktype & {};
export type QCCategoryErrortypeMetadata = QCErrorMetadatatype & {};
export type StringVideoPicPixelAspect = 'NTSC' | 'PAL' | 'square' | 'other';
export type StringVideoPicProgressivescanOrder = 'BFF' | 'TFF' | 'PPF';
export type ColorTypetype = 'color' | 'bandw' | 'colorized' | 'composite' | 'unknown';
export type ManifestSourceLicensortype = OrgNametype & {
  ALID?: (
    | string
    | number
    | number
    | boolean
    | null
    | {
      [k: string]: unknown;
    }
    | unknown[]
  )[];
};
export type InventoryAudiotype = DigitalAssetAudioDatatype & {
  ContainerReference?: ContainerReferencetype[];
  AudioTrackID?: string;
};
export type InventoryVideotype = DigitalAssetVideoDatatype & {
  ContainerReference?: ContainerReferencetype[];
  VideoTrackID?: string;
};
export type InventorySubtitletype = DigitalAssetSubtitleDatatype & {
  ContainerReference?: ContainerReferencetype[];
  SubtitleTrackID?: string;
};
export type InventoryImagetype = DigitalAssetImageDatatype & {
  ContainerReference?: ContainerReferencetype[];
  VideoFrameTimecode?: InventoryImagetypeVideoFrameTimecode;
  InitialView?: DigitalAssetVideoPicture360Initialtype;
  ImageID?: string;
};
export type InventoryImagetypeVideoFrameTimecode = Timecodetype & {
  VideoTrackID?: string;
};
export type InventoryInteractivetype = DigitalAssetInteractiveDatatype & {
  ContainerReference?: ContainerReferencetype[];
  ManifestApp?: InventoryMediaManifesttype[];
  PictureID?: string;
  InteractiveTrackID?: string;
};
export type PlayableSequenceListtypePlayableSequence = PlayableSequencetype & {
  PlayableSequenceID?: string;
};
export type OtherIDtype = ContentIdentifiertype & {};
export type EventLocationtypeEarthCoordinate = EventLocationEarthCoordinatetype & {};
export type EventLocationtypeOtherCoordinates = EventLocationOtherCoordinatetype & {};
export type InventoryAncillarytype = DigitalAssetAncillaryDatatype & {
  ContainerReference?: ContainerReferencetype[];
  AncillaryTrackID?: string;
};
export type InventoryMetadatatypeContainerReference = ContainerReferencetype & {
  type?: string;
};
export type BasicMetadatatypeCountryOfOrigin = Regiontype & {
  intepretation?: string;
};
export type ContentRelatedToCharactertype = BasicMetadataCharactertype & {
  Description?: ContentRelatedToCharactertype1[];
  primary?: boolean;
  fictional?: boolean;
};
export type InventoryTextObjecttypeContainerReference = ContainerReferencetype & {
  type?: string;
};
export type InventoryManifesttypeContainerReference = ContainerReferencetype & {
  type?: string;
};
export type MediaInventorytype = Inventorytype & {
  Compatibility?: Compatibilitytype;
  Source?: ManifestSourcetype;
  type?: string;
  reference?: string;
  ManifestID?: string;
  updateNum?: number;
  workflow?: string;
  updateDeliveryType?: string;
  versionDescription?: string;
  timestamp?: string;
};
export type FileDeleteManifesttype = FileManifesttype & {
  Description?: string;
  Instructions?: string;
  type?: string;
  reference?: string;
};

// export interface MdV211Xsd {
//   MediaPresentation?: Presentationtype;
//   FileManifest?: FileManifesttype;
//   MediaManifest?: MediaManifesttype;
//   MediaPresentationManifest?: PresentationManifesttype;
//   MediaManifestEdit?: MediaManifestEdittype;
//   MediaInventory?: MediaInventorytype;
//   FileDeleteManifest?: FileDeleteManifesttype;
// }

export interface Presentationtype {
  TrackMetadata: [PresentationtypeTrackMetadata, ...PresentationtypeTrackMetadata[]];
  LanguagePair?: PresentationLanguagePairtype[];
  Chapters?: ChapterListtype;
  Markers?: MarkerListtype;
  IMFRef?: PresentationIMFReftype;
  PresentationTimeline?: PresentationTimelinetype;
  PresentationID: string;
}
export interface TrackMetadatatype {
  TrackSelectionNumber: number;
  VideoTrackReference?: VideoTrackReferencetype[];
  AudioTrackReference?: AudioTrackReferencetype[];
  SubtitleTrackReference?: SubtitleTrackReferencetype[];
  AncillaryTrackReference?: AncillaryTrackReferencetype[];
  Purpose?: TrackMetadataPurposetype[];
}
export interface VideoTrackReferencetype {
  VideoTrackID: [string, ...string[]];
  AdaptationSetID?: VideoTrackReferencetype1;
  TrackProfile?: MediaProfiletype[];
  priority?: number;
}
export interface VideoTrackReferencetype1 {
  _tagText?: string;
}
export interface MediaProfiletype {
  Namespace: string;
  Profile: [MediaProfiletype1, ...MediaProfiletype1[]];
}
export interface MediaProfiletype1 {
  _tagText?: string;
}
export interface AudioTrackReferencetype {
  AudioTrackID: [string, ...string[]];
  AdaptationSetID?: AudioTrackReferencetype1;
  TrackProfile?: MediaProfiletype[];
  priority?: number;
}
export interface AudioTrackReferencetype1 {
  _tagText?: string;
}
export interface SubtitleTrackReferencetype {
  SubtitleTrackID: [string, ...string[]];
  AdaptationSetID?: SubtitleTrackReferencetype1;
  TrackProfile?: MediaProfiletype[];
  priority?: number;
}
export interface SubtitleTrackReferencetype1 {
  _tagText?: string;
}
export interface AncillaryTrackReferencetype {
  AncillaryTrackID: [string, ...string[]];
  AdaptationSetID?: AncillaryTrackReferencetype1;
  TrackProfile?: MediaProfiletype[];
  priority?: number;
}
export interface AncillaryTrackReferencetype1 {
  _tagText?: string;
}
export interface TrackMetadataPurposetype {
  EncodingIntent?: string;
  WorkType?: string;
  WorkTypeDetail?: string[];
  Description?: string;
}
export interface PresentationLanguagePairtype {
  SystemLanguage: string;
  AudioLanguage: string;
  SubtitleLanguage: string;
}
export interface ChapterListtype {
  Chapter: [Chaptertype, ...Chaptertype[]];
}
export interface Chaptertype {
  EntryTimecode: Timecodetype;
  DisplayLabel?: Chaptertype1[];
  ImageID?: Chaptertype2[];
  index: string | number | number | boolean | null;
}
export interface Timecodetype {
  _tagText?: string;
  dropframe?: boolean;
  format?: string;
}
export interface Chaptertype1 {
  _tagText?: string;
  language?: string;
}
export interface Chaptertype2 {
  _tagText?: string;
  language?: string;
}
export interface MarkerListtype {
  Marker: [MarkerListtypeMarker, ...MarkerListtypeMarker[]];
}
export interface Markertype {
  Timecode: Timecodetype;
  DisplayLabel?: Markertype1[];
  Label: Markertype2;
  ImageID?: Markertype3[];
}
export interface Markertype1 {
  _tagText?: string;
  language?: string;
}
export interface Markertype2 {
  _tagText?: string;
  namespace?: string;
}
export interface Markertype3 {
  _tagText?: string;
  language?: string;
}
export interface PresentationIMFReftype {
  CPLID: string;
  OPLID?: string[];
  ContainerReference?: ContainerReferencetype;
}
export interface ContainerReferencetype {
  Type?: string;
  SubType?: string[];
  ContainerLocation?: Locationtype[];
  ParentContainer?: ContainerReferencetype;
  ContainerIdentifier?: ContentIdentifiertype[];
  ContainerIntent?: AssetIntenttype[];
  SequenceParsing?: SequenceParsingtype;
  Length?: number;
  Hash?: Hashtype[];
}
export interface Locationtype {
  _tagText?: string;
  priority?: number;
}
export interface ContentIdentifiertype {
  Namespace: string;
  Identifier: string;
  Location?: string;
  Scope?: ContentIdentifiertype1;
}
export interface ContentIdentifiertype1 {
  _tagText?: string;
  subscope?: string;
}
export interface AssetIntenttype {
  Type: string;
  SubType?: AssetIntenttype1[];
  Description?: AssetIntenttype2;
  AssetReference?: AssetIntentReferencetype[];
  AssociatedOrg?: AssociatedOrgtype[];
  WIP?: boolean;
}
export interface AssetIntenttype1 {
  _tagText?: string;
  ordinal?: number;
}
export interface AssetIntenttype2 {
  _tagText?: string;
}
export interface AssetIntentReferencetype {
  ContentID?: string[];
  OtherIdentifier?: ContentIdentifiertype[];
  Description?: AssetIntentReferencetype1[];
}
export interface AssetIntentReferencetype1 {
  _tagText?: string;
  language?: string;
}
export interface OrgNametype {
  DisplayName: string;
  SortName?: string;
  AlternateName?: string[];
  organizationID?: string;
  departmentID?: string;
  idType?: string;
}
export interface SequenceParsingtype {
  PatternSpec?: string;
  StartsWith?: number;
  EndsWith?: number;
  FilenameEmbedding?: SequenceParsingtype1;
}
export interface SequenceParsingtype1 {
  _tagText?: boolean;
  location?: string;
  preceededBy?: string;
  terminatedBy?: string;
  fixedDigits?: number;
  sequential?: boolean;
}
export interface Hashtype {
  _tagText?: string;
  method?: string;
}
export interface PresentationTimelinetype {
  PresentationStart?: Timecodetype;
  AudioTrackStart?: PresentationTimelinetypeAudioTrackStart[];
  VideoTrackStart?: PresentationTimelinetypeVideoTrackStart[];
  SubtitleTrackStart?: PresentationTimelinetypeSubtitleTrackStart[];
  framerate?: number;
  multiplier?: string;
  dropframe?: boolean;
  format?: string;
}
export interface FileManifestInfotype {
  PackageID: string;
  PackageDateTime: string;
  Publisher: OrgNametype;
  AvailsEntryID?: string[];
  TotalFilesInPackage: number;
  FileInfo: [FileInfotype, ...FileInfotype[]];
  ExceptionFlag?: boolean;
  Comments?: string;
}
export interface FileInfotype {
  Location: [Locationtype, ...Locationtype[]];
  Identifier?: ContentIdentifiertype[];
  FileVersion?: number;
  FiileDate?: string;
  Type: 'manifest' | 'metadata' | 'media' | 'transaction' | 'ancillary';
  Length?: number;
  Hash?: Hashtype;
  MIMEType?: string;
  WrapperFormat?: string;
  ContainerMetadata?: ContainerMetadatatype;
  Delivery?: FileDeliverytype;
}
export interface ContainerMetadatatype {
  Type?: string;
  Track: [ContainerTrackMetadatatype, ...ContainerTrackMetadatatype[]];
  Hash?: Hashtype[];
  Size?: number;
  ContainerReference?: string;
  ContainerIdentifier?: ContentIdentifiertype[];
  ContainerIntent?: AssetIntenttype[];
  ContainerSpecificMetadata?: ContainerSpecifictype;
  Any?: {
    [k: string]: unknown;
  }[];
}
export interface ContainerTrackMetadatatype {
  Audio: DigitalAssetAudioDatatype;
  Video: DigitalAssetVideoDatatype;
  Subtitle: DigitalAssetSubtitleDatatype;
  Image: DigitalAssetImageDatatype;
  Interactive: DigitalAssetInteractiveDatatype;
  Container: ContainerMetadatatype;
  ExternalTrackReference: DigitalAssetExternalTrackReferencetype;
  InternalTrackReference: string;
}
export interface DigitalAssetAudioDatatype {
  Description?: DigitalAssetAudioDatatype1[];
  Type?: string;
  SubType?: string[];
  Encoding?: DigitalAssetAudioEncodingtype;
  Language: [DigitalAssetAudioLanguagetype, ...DigitalAssetAudioLanguagetype[]];
  People?: BasicMetadataPeopletype[];
  Channels?: string;
  MCALabelSubdescriptor?: DigitalAssetAudioMCALabeltype;
  Compliance?: Compliancetype[];
  AssetIntent?: AssetIntenttype[];
  TrackReference?: string;
  TrackIdentifier?: ContentIdentifiertype[];
  Private?: PrivateDatatype;
}
export interface DigitalAssetAudioDatatype1 {
  _tagText?: string;
  language?: string;
}
export interface DigitalAssetAudioEncodingtype {
  Codec: string;
  CodecType?: string[];
  BitrateMax?: number;
  BitrateAverage?: number;
  VBR?: string;
  SampleRate?: number;
  SampleBitDepth?: number;
  ChannelMapping?: DigitalAssetAudioEncodingtype1;
  Watermark?: DigitalAssetWatermarktype[];
  ActualLength?: string;
  Ambisonics?: DigitalAssetAudioAmbisonicstype;
  Loudness?: DigitalAssetAudioLoudnesstype;
}
export interface DigitalAssetAudioEncodingtype1 {
  _tagText?: string;
  isSingleTrack?: boolean;
}
export interface DigitalAssetWatermarktype {
  Vendor: string;
  ProductAndVersionID: string;
  Data?: string;
  guaranteedAbsent?: boolean;
}
export interface DigitalAssetAudioAmbisonicstype {
  Type?: string;
  Order: number;
  VeriticalOrder?: number;
  Normalization: string;
}
export interface DigitalAssetAudioLoudnesstype {
  Level?: number;
  Deviation?: number;
  LeqM?: number;
  Compliance?: string[];
}
export interface DigitalAssetAudioLanguagetype {
  _tagText?: string;
  dubbed?: boolean;
  forced?: boolean;
  disposition?: string;
}
export interface BasicMetadataPeopletype {
  Job: [BasicMetadataJobtype, ...BasicMetadataJobtype[]];
  Name: PersonNametype;
  Identifier?: PersonIdentifiertype[];
  Gender?: Gendertype;
  Pronouns?: Pronounstype;
  Salutations?: Salutationstype;
  ImageReference?: BasicMetadataPeopletype1[];
  Biography?: BasicMetadataPeopletype2[];
}
export interface BasicMetadataJobtype {
  JobFunction: BasicMetadataJobtype1;
  JobDisplay?: BasicMetadataJobtype2[];
  BillingBlockOrder?: BasicMetadataJobtype3[];
  Character?: string[];
  CharacterInfo?: BasicMetadataCharactertype[];
  Guest?: boolean;
}
export interface BasicMetadataJobtype1 {
  _tagText?: string;
  scheme?: string;
}
export interface BasicMetadataJobtype2 {
  _tagText?: string;
  language?: string;
}
export interface BasicMetadataJobtype3 {
  _tagText?: number;
  topBilled?: boolean;
  region?: string[];
}
export interface BasicMetadataCharactertype {
  CharacterName: [BasicMetadataCharactertype1, ...BasicMetadataCharactertype1[]];
  CharacterID?: PersonIdentifiertype[];
  Nonfictional?: BasicMetadataCharactertype2;
  Gender?: Gendertype[];
  Pronouns?: Pronounstype;
  Salutations?: Salutationstype;
  GroupingEntity?: GroupingEntitytype[];
  ImageReference?: BasicMetadataCharactertype3[];
  CharacterDescription?: BasicMetadataCharactertype4[];
  sequence?: number;
}
export interface BasicMetadataCharactertype1 {
  _tagText?: string;
  language?: string;
}
export interface PersonIdentifiertype {
  Identifier: string;
  Namespace: string;
  ReferenceLocation?: string;
  Scope?: PersonIdentifiertype1;
}
export interface PersonIdentifiertype1 {
  _tagText?: string;
  subscope?: string;
}
export interface BasicMetadataCharactertype2 {
  _tagText?: boolean;
  appearance?: string;
}
export interface Gendertype {
  _tagText?: string;
  transgender?: boolean;
  specificGender?: string;
}
export interface Pronounstype {
  Subjective?: string;
  Objective?: string;
  Adjective?: string;
  Possessive?: string;
  Reflexive?: string;
  noProunouns?: boolean;
}
export interface Salutationstype {
  Title?: Salutationstype1[];
  noTitle?: boolean;
}
export interface Salutationstype1 {
  _tagText?: string;
  _default?: boolean;
}
export interface GroupingEntitytype {
  Type: string;
  GroupIdentity: string;
  DisplayName: [GroupingEntitytype1, ...GroupingEntitytype1[]];
  Region?: Regiontype;
  AltGroupIdentifier?: ContentIdentifiertype[];
}
export interface GroupingEntitytype1 {
  _tagText?: string;
  language?: string;
}
export interface Regiontype {
  country: string;
  countryRegion: string;
}
export interface BasicMetadataCharactertype3 {
  _tagText?: string;
  resolution?: string;
  purpose?: string;
}
export interface BasicMetadataCharactertype4 {
  _tagText?: string;
  language?: string;
}
export interface PersonNametype {
  DisplayName: [StringAndLanguagetype, ...StringAndLanguagetype[]];
  SortName?: StringAndLanguagetype[];
  FirstGivenName?: string;
  SecondGivenName?: string;
  FamilyName?: string;
  Suffix?: string;
  Moniker?: string;
}
export interface StringAndLanguagetype {
  _tagText?: string;
  language?: string;
}
export interface BasicMetadataPeopletype1 {
  _tagText?: string;
  resolution?: string;
  purpose?: string;
}
export interface BasicMetadataPeopletype2 {
  _tagText?: string;
  language?: string;
}
export interface DigitalAssetAudioMCALabeltype {
  ContentKind?: string;
  ElementKind?: string;
  Content?: string;
  UseClass?: string;
  ContentSubtype?: string;
  ContentDifferentiator?: string;
}
export interface Compliancetype {
  Category?: string;
  Standard?: string;
  StandardDetail?: string[];
  Disposition: string;
  CompetentAuthority?: AssociatedOrgtype;
  Certificate?: Compliancetype1;
  TestingOrganization?: AssociatedOrgtype;
  TestingMethod?: string;
  TestingDate?: string;
  ErrorDescription?: QCErrorDescriptiontype[];
  Comments?: string;
}
export interface Compliancetype1 {
  _tagText?: number[];
  MIME?: string;
}
export interface QCErrorDescriptiontype {
  ErrorReference?: string;
  ErrorCategory: string;
  ErrorTerm: string;
  CategorySpecificInfo?: QCCategoryErrortype;
  Comments?: string;
  FullOrPartialQC?: string;
  QCReportLocation?: string;
  Severity?: QCErrorDescriptiontype1;
}
export interface QCCategoryErrortype {
  AudioOrVideoOrTimedText: [
    (
      | QCCategoryErrortypeAudio
      | QCCategoryErrortypeVideo
      | QCCategoryErrortypeTimedText
      | QCCategoryErrortypeArtwork
      | QCErrorPackagetype
      | QCCategoryErrortypeMetadata
      | QCXMLErrortype
      | QCErrorExceltype
    ),
    ...(
      | QCCategoryErrortypeAudio
      | QCCategoryErrortypeVideo
      | QCCategoryErrortypeTimedText
      | QCCategoryErrortypeArtwork
      | QCErrorPackagetype
      | QCCategoryErrortypeMetadata
      | QCXMLErrortype
      | QCErrorExceltype
    )[],
  ];
}
export interface QCErrorAudiotype {
  TimeRange?: QCTimeRangetype;
  TimeOffset?: string;
}
export interface QCTimeRangetype {
  StartTimecode: Timecodetype2;
  EndTimecode?: Timecodetype2;
}
export interface Timecodetype2 {
  _tagText?: string;
  dropframe?: boolean;
  format?: string;
}
export interface QCErrorVideotype {
  TimeRange?: QCTimeRangetype;
  Area?: QCAreatype;
}
export interface QCAreatype {
  XOffset: number;
  YOffset: number;
  Width: number;
  Height: number;
}
export interface QCErrorTimedTexttype {
  TimeRange?: QCTimeRangetype;
  TimeOffset?: string;
  Text?: string;
}
export interface QCErrorArtworktype {
  Area?: QCAreatype;
  Text?: string;
}
export interface QCErrorPackagetype {
  ObjectInError: [QCErrorPackagetype1, ...QCErrorPackagetype1[]];
}
export interface QCErrorPackagetype1 {
  _tagText?: string;
  disposition?: string;
}
export interface QCErrorMetadatatype {
  XMLError: QCXMLErrortype;
}
export interface QCXMLErrortype {
  XPath?: string;
  LineNumber?: number;
  ValidatorLevel?: string;
  ValidatorTag?: string;
  ValidatorSummary?: string;
  ValidatorFile?: string;
}
export interface QCErrorExceltype {
  Row: number;
  Column: string;
  Cell: QCErrorExceltype1;
  ValidatorLevel?: string;
  ValidatorTag?: string;
  ValidatorSummary?: string;
}
export interface QCErrorExceltype1 {
  _tagText?: string;
  endCell?: string;
}
export interface QCErrorDescriptiontype1 {
  _tagText?: string;
  resolution?: string;
  originalSeverity?: string;
}
export interface PrivateDatatype {
  Any: [
    {
      [k: string]: unknown;
    },
    ...{
      [k: string]: unknown;
    }[],
  ];
}
export interface DigitalAssetVideoDatatype {
  Description?: DigitalAssetVideoDatatype1[];
  Type?: string;
  SubType?: string[];
  Encoding?: DigitalAssetVideoEncodingtype;
  Picture?: DigitalAssetVideoPicturetype;
  ColorType?: ColorTypetype;
  PictureFormat?: string;
  CaptureMethod?: string[];
  Language?: DigitalAssetVideoDatatype2[];
  SubtitleLanguage?: DigitalAssetVideoSubtitleLanguagetype[];
  SignedLanguage?: DigitalAssetVideoDatatype3;
  CardsetList?: DigitalAssetCardsetListtype[];
  Compliance?: Compliancetype[];
  AssetIntent?: AssetIntenttype[];
  TrackReference?: string;
  TrackIdentifier?: ContentIdentifiertype[];
  Private?: PrivateDatatype;
}
export interface DigitalAssetVideoDatatype1 {
  _tagText?: string;
  language?: string;
}
export interface DigitalAssetVideoEncodingtype {
  Codec: string;
  CodecType?: string[];
  MPEGProfile?: string;
  MPEGLevel?: string;
  CodecProfile?: string;
  BitrateMax?: number;
  BitRateAverage?: number;
  VBR?: string;
  Watermark?: DigitalAssetWatermarktype[];
  ActualLength?: string;
}
export interface DigitalAssetVideoPicturetype {
  AspectRatio?: DigitalAssetVideoPicturetype1;
  PixelAspect?: StringVideoPicPixelAspect;
  WidthPixels?: number;
  HeightPixels?: number;
  ActiveWidthPixels?: DigitalAssetVideoPicturetype2;
  ActiveHeightPixels?: DigitalAssetVideoPicturetype3;
  FrameRate?: DigitalAssetVideoPictureFrameRatetype;
  Progressive?: DigitalAssetVideoPictureProgressivetype;
  ColorSubsampling?: string;
  BitDepth?: DigitalAssetVideoPicturetype4;
  Colorimetry?: string;
  Type3D?: string;
  MasteredColorVolume?: DigitalAssetColorVolumetype;
  ColorEncoding?: DigitalAssetColorEncodingtype;
  ColorTransformMetadata?: DigitalAssetColorTransformMetadatatype[];
  LightLevel?: DigitalAssetVideoPictureLightLeveltype;
  HDRPlaybackInfo?: DigitalAssetVideoPictureHDRPlaybackInfotype;
  ThreeSixty?: DigitalAssetVideoPicture360Type;
  OriginalPicture?: DigitalAssetVideoPictureOriginaltype;
  Any?: {
    [k: string]: unknown;
  }[];
}
export interface DigitalAssetVideoPicturetype1 {
  _tagText?: string;
  original?: boolean;
}
export interface DigitalAssetVideoPicturetype2 {
  _tagText?: number;
  xOffset?: number;
}
export interface DigitalAssetVideoPicturetype3 {
  _tagText?: number;
  yOffset?: number;
}
export interface DigitalAssetVideoPictureFrameRatetype {
  _tagText?: number;
  multiplier?: '1000/1001';
  timecode?: string;
}
export interface DigitalAssetVideoPictureProgressivetype {
  _tagText?: boolean;
  scanOrder?: StringVideoPicProgressivescanOrder;
}
export interface DigitalAssetVideoPicturetype4 {
  _tagText?: number;
  alphaDepth?: number;
}
export interface DigitalAssetColorVolumetype {
  PrimaryRChromaticity: DigitalAssetChromaticitytype;
  PrimaryGChromaticity: DigitalAssetChromaticitytype;
  PrimaryBChromaticity: DigitalAssetChromaticitytype;
  WhitePointChromaticity: DigitalAssetChromaticitytype;
  LuminanceMin: number;
  LuminanceMax: number;
}
export interface DigitalAssetChromaticitytype {
  ChromaticityCIEx: number;
  ChromaticityCIEy: number;
}
export interface DigitalAssetColorEncodingtype {
  Primaries: string;
  TransferFunction: string;
  ColorDifferencing: string;
}
export interface DigitalAssetColorTransformMetadatatype {
  ColorVolumeTransform: string;
  ApplicationIdentifier?: DigitalAssetColorTransformMetadatatype1;
  TargetSystemDisplay?: DigitalAssetColorVolumetype;
  DoNotTranscodeBase?: boolean;
}
export interface DigitalAssetColorTransformMetadatatype1 {
  _tagText?: number;
  applicationVersion?: number;
}
export interface DigitalAssetVideoPictureLightLeveltype {
  ContentMax?: DigitalAssetVideoPictureLightLeveltype1[];
  FrameAverageMax?: DigitalAssetVideoPictureLightLeveltype2[];
}
export interface DigitalAssetVideoPictureLightLeveltype1 {
  _tagText?: number;
  interpretation?: string;
}
export interface DigitalAssetVideoPictureLightLeveltype2 {
  _tagText?: number;
  interpretation?: string;
}
export interface DigitalAssetVideoPictureHDRPlaybackInfotype {
  SDRDownconversion?: string;
  Any?: {
    [k: string]: unknown;
  }[];
}
export interface DigitalAssetVideoPicture360Type {
  Projection: string;
  Rendering?: string;
  InitialView?: DigitalAssetVideoPicture360Initialtype;
}
export interface DigitalAssetVideoPicture360Initialtype {
  HeadingDegrees: number;
  PitchDegrees: number;
  RollDegress: number;
}
export interface DigitalAssetVideoPictureOriginaltype {
  FrameRate?: DigitalAssetVideoPictureFrameRatetype;
  Progressive?: DigitalAssetVideoPictureProgressivetype;
}
export interface DigitalAssetVideoDatatype2 {
  _tagText?: string;
  disposition?: string;
}
export interface DigitalAssetVideoSubtitleLanguagetype {
  _tagText?: string;
  closed?: boolean;
  type?: string;
  disposition?: string;
}
export interface DigitalAssetVideoDatatype3 {
  _tagText?: string;
  disposition?: string;
}
export interface DigitalAssetCardsetListtype {
  Type?: string[];
  Region?: string[];
  Cardset: [DigitalAssetCardsettype, ...DigitalAssetCardsettype[]];
}
export interface DigitalAssetCardsettype {
  Type: [string, ...string[]];
  Description?: string;
  Sequence?: number;
  Language?: string[];
}
export interface DigitalAssetSubtitleDatatype {
  Format?: DigitalAssetSubtitleFormattype;
  Description?: DigitalAssetSubtitleDatatype1[];
  Type: [string, ...string[]];
  SubType?: string[];
  FormatType?: string;
  Language: [DigitalAssetSubtitleDatatype2, ...DigitalAssetSubtitleDatatype2[]];
  Encoding?: string | number | number | boolean | null | {} | unknown[];
  Properties?: DigitalAssetSubtitlePropertiestype;
  PictureDetails?: DigitalAssetVideoPicturetype;
  DynamicRangeProfile?: DigitalAssetSubtitleDatatype3;
  ColorGamutProfile?: string;
  Creation?: DigitalAssetSubtitleCreationtype;
  AdditionalOffset?: Timecodetype2;
  DropFrame?: boolean;
  CardsetList?: DigitalAssetCardsetListtype[];
  Compliance?: Compliancetype[];
  AssetIntent?: AssetIntenttype[];
  TrackReference?: string;
  TrackIdentifier?: ContentIdentifiertype[];
  Private?: PrivateDatatype;
}
export interface DigitalAssetSubtitleFormattype {
  _tagText?: string;
  SDImage?: boolean;
  HDImage?: boolean;
  UHDImage?: boolean;
}
export interface DigitalAssetSubtitleDatatype1 {
  _tagText?: string;
  language?: string;
}
export interface DigitalAssetSubtitleDatatype2 {
  _tagText?: string;
  disposition?: string;
}
export interface DigitalAssetSubtitlePropertiestype {
  MaxCPS?: DigitalAssetSubtitlePropertiestype1;
  MaxLinesPerEvent?: DigitalAssetSubtitlePropertiestype2;
  FormattingStripped?: boolean;
  ContainsAnnotation?: DigitalAssetSubtitlePropertiestype3[];
  WritingFeatures?: Termstype[];
}
export interface DigitalAssetSubtitlePropertiestype1 {
  _tagText?: number;
  strict?: boolean;
  algorithm?: string;
  spacesCounted?: boolean;
  punctuationCounted?: boolean;
}
export interface DigitalAssetSubtitlePropertiestype2 {
  _tagText?: number;
  strict?: boolean;
}
export interface DigitalAssetSubtitlePropertiestype3 {
  _tagText?: boolean;
  type?: string;
}
export interface Termstype {
  Money: Moneytype;
  Event: string;
  Text: string;
  Boolean: boolean;
  Duration: string;
  URI: string;
  Language: string;
  ID: string;
  AltIdentifier: ContentIdentifiertype;
  YearDateTime: string;
  Time: string;
  Region: Regiontype;
  Timecode: Timecodetype2;
  Any: {};
  termName: string;
}
export interface Moneytype {
  _tagText?: number;
  currency?: string;
}
export interface DigitalAssetSubtitleDatatype3 {
  _tagText?: string;
  LuminanceMin?: number;
  LuminanceMax?: number;
}
export interface DigitalAssetSubtitleCreationtype {
  AutoTTS?: DigitalAssetSubtitleCreationtype1;
  AutoSegmentation?: DigitalAssetSubtitleCreationtype2;
  AutoTranslation?: DigitalAssetSubtitleCreationtype3;
  OCR?: DigitalAssetSubtitleCreationtype4;
}
export interface DigitalAssetSubtitleCreationtype1 {
  _tagText?: boolean;
  full?: boolean;
}
export interface DigitalAssetSubtitleCreationtype2 {
  _tagText?: boolean;
  full?: boolean;
}
export interface DigitalAssetSubtitleCreationtype3 {
  _tagText?: boolean;
  full?: boolean;
}
export interface DigitalAssetSubtitleCreationtype4 {
  _tagText?: boolean;
  full?: boolean;
}
export interface DigitalAssetImageDatatype {
  Description?: DigitalAssetImageDatatype1[];
  Type?: string[];
  SubType?: string[];
  Purpose?: string[];
  Width: number;
  Height: number;
  Encoding: string;
  PictureDetails?: DigitalAssetVideoPicturetype;
  DynamicRangeProfile?: DigitalAssetImageDatatype2;
  ColorGamutProfile?: string;
  Language?: DigitalAssetImageDatatype3[];
  CardsetList?: DigitalAssetCardsetListtype[];
  Compliance?: Compliancetype[];
  AssetIntent?: AssetIntenttype[];
  TrackReference?: string;
  TrackIdentifier?: ContentIdentifiertype[];
  Private?: PrivateDatatype;
}
export interface DigitalAssetImageDatatype1 {
  _tagText?: string;
  language?: string;
}
export interface DigitalAssetImageDatatype2 {
  _tagText?: string;
  LuminanceMin?: number;
  LuminanceMax?: number;
}
export interface DigitalAssetImageDatatype3 {
  _tagText?: string;
  disposition?: string;
}
export interface DigitalAssetInteractiveDatatype {
  Type: string;
  SubType?: string[];
  FormatType?: string;
  Language?: string;
  Encoding: [DigitalAssetInteractiveEncodingtype, ...DigitalAssetInteractiveEncodingtype[]];
  Compliance?: Compliancetype[];
  AssetIntent?: AssetIntenttype[];
  TrackReference?: string;
  TrackIdentifier?: ContentIdentifiertype[];
  Private?: PrivateDatatype;
}
export interface DigitalAssetInteractiveEncodingtype {
  RuntimeEnvironment: string;
  EnvironmentAttribute?: DigitalAssetInteractiveEncodingtype1[];
  FirstVersion?: string;
  LastVersion?: string;
  Any?: {
    [k: string]: unknown;
  }[];
}
export interface DigitalAssetInteractiveEncodingtype1 {
  _tagText?: string;
  recommended?: boolean;
}
export interface DigitalAssetExternalTrackReferencetype {
  _tagText?: string;
  namespace?: string;
  location?: string;
  trackReference?: string;
}
export interface ContainerSpecifictype {
  Any?: {
    [k: string]: unknown;
  }[];
}
export interface FileDeliverytype {
  UpdateNum?: string | number | number | boolean | null | {} | unknown[];
  DeliveryMethod: string;
  TransferLocation?: string;
  Organization?: OrgNametype;
  Contact?: ContactInfotype;
  EstDeliveryDate?: string;
  OtherInstructions?: string;
}
export interface ContactInfotype {
  Name: string;
  PrimaryEmail: string;
  AlternateEmail?: string[];
  Address?: string[];
  Phone?: ContactInfotype1[];
}
export interface ContactInfotype1 {
  _tagText?: string;
  type?: string;
}
export interface MMCInterface {
  Compatibility: Compatibilitytype;
  Source?: ManifestSourcetype;
  Inventory: Inventorytype;
  Presentations?: PresentationListtype;
  PlayableSequences?: PlayableSequenceListtype;
  PictureGroups?: PictureGroupListtype;
  AppGroups?: AppGroupListtype;
  TextGroups?: TextGroupListtype;
  Experiences: ExperienceListtype;
  TimedEventSequences?: TimedEventSequenceListtype;
  ALIDExperienceMaps?: ALIDExperienceMapListtype;
  ManifestID?: string;
  ExtraVersionReference?: string;
  updateNum?: number;
  workflow?: string;
  updateDeliveryType?: string;
  versionDescription?: string;
  timestamp?: string;
}
export interface Compatibilitytype {
  SpecVersion: string;
  System?: string[];
  Profile: Compatibilitytype1;
  ValidatorParameter?: Termstype[];
}
export interface Compatibilitytype1 {
  _tagText?: string;
  subProfile?: string;
}
export interface ManifestSourcetype {
  ServiceProvider?: OrgNametype;
  Licensor?: ManifestSourceLicensortype[];
  DeliveryContact?: ContactInfotype;
}
export interface Inventorytype {
  Audio?: InventoryAudiotype[];
  Video?: InventoryVideotype[];
  Subtitle?: InventorySubtitletype[];
  Image?: InventoryImagetype[];
  Interactive?: InventoryInteractivetype[];
  Ancillary?: InventoryAncillarytype[];
  Metadata?: InventoryMetadatatype[];
  TextObject?: InventoryTextObjecttype[];
  ExternalManifest?: InventoryManifesttype[];
}
export interface InventoryMediaManifesttype {
  Compatibility?: Compatibilitytype;
  Inventory?: Inventorytype;
  Presentations?: PresentationListtype;
  PlayableSequences?: PlayableSequenceListtype;
  PictureGroups?: PictureGroupListtype;
  AppGroups?: AppGroupListtype;
  TextGroups?: TextGroupListtype;
  Experiences: ExperienceListtype;
  TimedEventSequences?: TimedEventSequenceListtype;
  ALIDExperienceMaps?: ALIDExperienceMapListtype;
  ManifestID?: string;
  updateNum?: number;
  ExtraVersionReference?: string;
  updateDeliveryType?: string;
  profile?: string;
}
export interface PresentationListtype {
  Presentation: [Presentationtype, ...Presentationtype[]];
}
export interface PlayableSequenceListtype {
  PlayableSequence: [PlayableSequenceListtypePlayableSequence, ...PlayableSequenceListtypePlayableSequence[]];
}
export interface PlayableSequencetype {
  Clip: [AudiovisualClipReftype, ...AudiovisualClipReftype[]];
  ImageClip?: ImageClipReftype[];
  ReferenceID?: ContentIdentifiertype[];
  SequenceTimeline?: PresentationTimelinetype;
}
export interface AudiovisualClipReftype {
  PresentationID: string;
  EntryPointTimecode?: Timecodetype;
  ExitPointTimecode?: Timecodetype;
  Region?: Regiontype[];
  Purpose?: TrackMetadataPurposetype[];
  CardsetSeq?: number;
  Branching?: PlayableBranchtype;
  sequence?: number;
  seamless?: boolean;
  audioLanguage?: string;
}
export interface PlayableBranchtype {
  BranchChoice: [PlayableBranchChoicetype, ...PlayableBranchChoicetype[]];
  branchStateID?: string;
}
export interface PlayableBranchChoicetype {
  Applicability?: string[];
  Label: [PlayableBranchChoicetype1, ...PlayableBranchChoicetype1[]];
  DescriptionID?: string[];
  NextSequenceID: PlayableBranchChoicetype2;
  branchChoiceID?: string;
}
export interface PlayableBranchChoicetype1 {
  _tagText?: string;
  language?: string;
}
export interface PlayableBranchChoicetype2 {
  _tagText?: string;
  sequence?: number;
}
export interface ImageClipReftype {
  ImageID: string;
  Duration: string;
  Region?: Regiontype[];
  Purpose?: TrackMetadataPurposetype[];
  CardsetSeq?: number;
  Branching?: PlayableBranchtype;
  sequence?: number;
  seamless?: boolean;
  audioLanguage?: string;
}
export interface PictureGroupListtype {
  PictureGroup: [PictureGrouptype, ...PictureGrouptype[]];
}
export interface PictureGrouptype {
  Picture: [Picturetype, ...Picturetype[]];
  Type?: string;
  SubType?: string[];
  StyleRef?: string[];
  PictureGroupID?: string;
}
export interface Picturetype {
  PictureID: string;
  ImageID: [Picturetype1, ...Picturetype1[]];
  ThumbnailImageID?: Picturetype2[];
  LanguageInImage?: string[];
  AlternateText?: Picturetype3[];
  Caption?: Picturetype4[];
  Sequence?: number;
  Purpose?: string[];
}
export interface Picturetype1 {
  _tagText?: string;
  resolution?: string;
}
export interface Picturetype2 {
  _tagText?: string;
  resolution?: string;
}
export interface Picturetype3 {
  _tagText?: string;
  language?: string | number | number | boolean | null;
}
export interface Picturetype4 {
  _tagText?: string;
  language?: string;
}
export interface AppGroupListtype {
  AppGroup: [AppGrouptype, ...AppGrouptype[]];
}
export interface AppGrouptype {
  InteractiveTrackReference: [InteractiveTrackReferencetype, ...InteractiveTrackReferencetype[]];
  AppGroupID: string;
}
export interface InteractiveTrackReferencetype {
  InteractiveTrackID: string;
  Compatibility: [DigitalAssetInteractiveEncodingtype, ...DigitalAssetInteractiveEncodingtype[]];
  priority?: number;
}
export interface TextGroupListtype {
  TextGroup: [TextGrouptype, ...TextGrouptype[]];
}
export interface TextGrouptype {
  TextObjectID: [string, ...string[]];
  TextGroupID: string;
  language?: string;
}
export interface ExperienceListtype {
  Experience: [Experiencetype, ...Experiencetype[]];
}
export interface Experiencetype {
  Type?: string;
  SubType?: string[];
  Language: [string, ...string[]];
  ExcludedLanguage: [string, ...string[]];
  Region: [Regiontype, ...Regiontype[]];
  ExcludedRegion: [Regiontype, ...Regiontype[]];
  ContentID?: string;
  Audiovisual?: Audiovisualtype;
  App?: ExperienceApptype;
  Gallery?: Gallerytype;
  PictureGroupID?: string[];
  TextGroupID?: string[];
  TimedSequenceID?: string[];
  ExperienceChild?: ExperienceChildtype[];
  updateNum?: number;
  ExperienceID?: string;
  version: string;
}
export interface Audiovisualtype {
  Type: string;
  SubType?: string[];
  PresentationID: string;
  PlayableSequenceID: string;
  PlayableSequence: PlayableSequencetype;
  ContentID: string;
}
export interface ExperienceApptype {
  Type: string;
  SubType?: string[];
  AppGroupID?: string;
  AppName?: ExperienceApptype1[];
  Rating?: ContentRatingtype[];
  ContentID?: string;
  AppID?: string;
}
export interface ExperienceApptype1 {
  _tagText?: string;
  language?: boolean;
}
export interface ContentRatingtype {
  NotRated: ContentRatingtype1;
  Rating: [ContentRatingDetailtype, ...ContentRatingDetailtype[]];
  AdultContent?: boolean;
}
export interface ContentRatingtype1 {
  _tagText?: boolean;
  condition?: string;
}
export interface ContentRatingDetailtype {
  Region: Regiontype;
  System: string;
  Value: string;
  Reason?: ContentRatingDetailtype1[];
  LinkToLogo?: ContentRatingDetailtype2[];
  Description?: ContentRatingDetailtype3[];
}
export interface ContentRatingDetailtype1 {
  value?: string;
}
export interface ContentRatingDetailtype2 {
  _tagText?: string;
  language?: string;
}
export interface ContentRatingDetailtype3 {
  _tagText?: string;
  language?: string;
  authoritative?: boolean;
  origin?: string;
}
export interface Gallerytype {
  Type: string | number | number | boolean | null | {} | unknown[];
  SubType?: string[];
  PictureGroupID?: string;
  GalleryName?: Gallerytype1[];
  ContentID?: string;
  GalleryID?: string;
}
export interface Gallerytype1 {
  _tagText?: string;
  language?: boolean;
}
export interface ExperienceChildtype {
  Relationship: string;
  SequenceInfo?: ContentSequenceInfotype;
  ExperienceID: string;
  ALID: string;
  ExternalManifestID?: ExperienceChildtype1;
}
export interface ContentSequenceInfotype {
  Number?: number;
  DistributionNumber?: ComplexSequenceInfoDistributionNumber;
  HouseSequence?: ComplexSequenceInfoHouseSequence;
  AlternateNumber?: ComplexSequenceInfoAlternateNumber[];
}
export interface ComplexSequenceInfoDistributionNumber {
  _tagText?: string;
  domain?: string;
}
export interface ComplexSequenceInfoHouseSequence {
  _tagText?: string;
  domain?: string;
}
export interface ComplexSequenceInfoAlternateNumber {
  _tagText?: string;
  domain?: string;
}
export interface ExperienceChildtype1 {
  _tagText?: string;
}
export interface TimedEventSequenceListtype {
  TimedEventSequence: [TimedEventSequencetype, ...TimedEventSequencetype[]];
}
export interface TimedEventSequencetype {
  PresentationID: string;
  PlayableSequenceID: string;
  TimedEvent: [TimedEventtype, ...TimedEventtype[]];
  TimedSequenceID: string;
}
export interface TimedEventtype {
  StartTimecode: Timecodetype;
  EndTimecode: Timecodetype;
  Type: string;
  SubType?: string[];
  PresentationID: string;
  PlayableSequenceID: string;
  ExperienceID: string;
  PictureID: string;
  GalleryID: string;
  AppGroupID: string;
  AppID: string;
  TextGroupID: [TimedEventtype1, ...TimedEventtype1[]];
  URL: string;
  AdID: string;
  ISRC: string;
  ProductID: OtherIDtype;
  OtherID: OtherIDtype;
  TimePeriod: EventPeriodtype;
  Location: EventLocationtype;
  People: BasicMetadataPeopletype;
  UPC: string;
  Offset: number;
  TimecodeOffset: Timecodetype;
  Initialization: string;
}
export interface TimedEventtype1 {
  _tagText?: string;
  index?: number;
}
export interface EventPeriodtype {
  Type?: EventPeriodtype1;
  Name?: string;
  Start: string;
  End?: string;
  FictionalStart: EventPeriodtype2;
  FictionalEnd?: EventPeriodtype3;
  absolute?: boolean;
}
export interface EventPeriodtype1 {
  _tagText?: string;
  fictional?: boolean;
}
export interface EventPeriodtype2 {
  _tagText?: string;
  units?: string;
}
export interface EventPeriodtype3 {
  _tagText?: string;
}
export interface EventLocationtype {
  Type: EventLocationtype1;
  Name?: string;
  Address?: string | number | number | boolean | null | {} | unknown[];
  EarthCoordinate?: EventLocationtypeEarthCoordinate;
  OtherCoordinates?: EventLocationtypeOtherCoordinates;
}
export interface EventLocationtype1 {
  fictional?: boolean;
}
export interface EventLocationEarthCoordinatetype {
  Latitude: number;
  Longitude: number;
  ElevationMeters?: number;
}
export interface EventLocationOtherCoordinatetype {
  Coordinate: [EventLocationOtherCoordinatetype1, ...EventLocationOtherCoordinatetype1[]];
  system: string;
}
export interface EventLocationOtherCoordinatetype1 {
  _tagText?: string;
  label: string;
}
export interface ALIDExperienceMapListtype {
  ALIDExperienceMap: [ALIDExperienceMaptype, ...ALIDExperienceMaptype[]];
}
export interface ALIDExperienceMaptype {
  ALID: [ALIDExperienceMaptype1, ...ALIDExperienceMaptype1[]];
  ExperienceID: [ALIDExperienceMaptype2, ...ALIDExperienceMaptype2[]];
  RelatedExperienceID?: ExperienceChildtype[];
}
export interface ALIDExperienceMaptype1 {
  _tagText?: string;
  deprecated?: boolean;
}
export interface ALIDExperienceMaptype2 {
  _tagText?: string;
  condition?: string;
  licenseType?: string;
  deprecated?: boolean;
  bonus?: boolean;
}
export interface DigitalAssetAncillaryDatatype {
  Type: string;
  SubType?: string[];
  BaseTrackID?: string;
  BaseTrackReference?: string;
  BaseTrackIdentifier?: ContentIdentifiertype[];
  TrackMetadata?: DigitalAssetMetadatatype;
  CombinedMetadata?: DigitalAssetMetadatatype;
  Compliance?: Compliancetype[];
  AssetIntent?: AssetIntenttype[];
  Private?: PrivateDatatype;
}
export interface DigitalAssetMetadatatype {
  Audio: DigitalAssetAudioDatatype;
  Video: DigitalAssetVideoDatatype;
  Subtitle: DigitalAssetSubtitleDatatype;
  Image: DigitalAssetImageDatatype;
  Interactive: DigitalAssetInteractiveDatatype;
  Ancillary: DigitalAssetAncillaryDatatype;
}
export interface InventoryMetadatatype {
  ContainerReference?: InventoryMetadatatypeContainerReference[];
  BasicMetadata?: BasicMetadatatype;
  Alias?: InventoryMetadataAliastype[];
  ContentID: string;
}
export interface BasicMetadatatype {
  UpdateNum?: number;
  LocalizedInfo: [BasicMetadataInfotype, ...BasicMetadataInfotype[]];
  RunLength?: string;
  ReleaseYear: unknown;
  ReleaseDate?: string;
  ReleaseHistory?: ReleaseHistorytype[];
  WorkType: string;
  WorkTypeDetail?: string[];
  PictureColorType?: ColorTypetype;
  PictureFormat?: string;
  ThreeD?: BasicMetadatatype1;
  AspectRatio?: BasicMetadatatype2;
  AltIdentifier?: ContentIdentifiertype[];
  RatingSet?: ContentRatingtype;
  People?: BasicMetadataPeopletype[];
  CountryOfOrigin?: BasicMetadatatypeCountryOfOrigin[];
  PrimarySpokenLanguage?: string[];
  OriginalLanguage?: string[];
  VersionLanguage?: string[];
  VersionIntent?: VersionIntenttype;
  AssociatedOrg?: AssociatedOrgtype[];
  ContentRelatedTo?: ContentRelatedTotype[];
  AncillaryDescription?: AncillaryDescriptiontype[];
  SequenceInfo?: ContentSequenceInfotype;
  Parent?: BasicMetadataParenttype[];
  ContentID: string;
}
export interface BasicMetadataInfotype {
  TitleDisplay19?: string;
  TitleDisplay60?: string;
  TitleDisplayUnlimited?: string;
  TitleSort?: string;
  ArtReference?: BasicMetadataInfotype1[];
  Summary190?: BasicMetadataInfotype2;
  Summary400?: BasicMetadataInfotype3;
  Summary4000?: BasicMetadataInfotype4;
  DisplayIndicators?: string[];
  Genre?: BasicMetadataInfotype5[];
  Keyword?: string[];
  VersionNotes?: string;
  Region: [Regiontype, ...Regiontype[]];
  ExcludedRegion: [Regiontype, ...Regiontype[]];
  TargetAudience?: Audiencetype[];
  OriginalTitle?: string;
  CopyrightLine?: string;
  PeopleLocal?: BasicMetadataPeopletype[];
  TitleAlternate?: BasicMetadataInfotype6[];
  language: string;
  _default?: boolean;
  condition?: string;
}
export interface BasicMetadataInfotype1 {
  _tagText?: string;
  resolution?: string;
  purpose?: string;
}
export interface BasicMetadataInfotype2 {
  _tagText?: string;
  cast?: boolean;
}
export interface BasicMetadataInfotype3 {
  _tagText?: string;
  cast?: boolean;
}
export interface BasicMetadataInfotype4 {
  _tagText?: string;
  cast?: boolean;
}
export interface BasicMetadataInfotype5 {
  _tagText?: string;
  source?: string;
  id?: string;
  level?: number;
}
export interface Audiencetype {
  Description?: string;
  Who?: string[];
  When?: Audiencetype1[];
  What?: Audiencetype2[];
  Identification?: ContentIdentifiertype[];
  Terms?: Termstype[];
}
export interface Audiencetype1 {
  _tagText?: string;
  startDate?: string;
  endDate?: string;
}
export interface Audiencetype2 {
  _tagText?: string;
  bonus?: boolean;
  condition?: string;
}
export interface BasicMetadataInfotype6 {
  _tagText?: string;
  type?: string;
  language?: string;
}
export interface ReleaseHistorytype {
  ReleaseType: ReleaseHistorytype1;
  DistrTerritory?: Regiontype[];
  Date: ReleaseHistorytype2;
  Description?: string;
  ReleaseOrg?: AssociatedOrgtype[];
}
export interface ReleaseHistorytype1 {
  _tagText?: string;
  wide?: boolean;
}
export interface ReleaseHistorytype2 {
  _tagText?: string;
  scheduled?: boolean;
}
export interface BasicMetadatatype1 {
  _tagText?: boolean;
  three60?: boolean;
  multiview?: boolean;
}
export interface BasicMetadatatype2 {
  _tagText?: string;
  original?: boolean;
}
export interface VersionIntenttype {
  Audience?: Audiencetype;
  Description?: VersionIntenttype1[];
  EditUse?: string;
  EditClass?: string[];
  MadeForRegion?: Regiontype;
  Terms?: Termstype[];
}
export interface VersionIntenttype1 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedTotype {
  Relationship: ContentRelatedToRelationshiptype;
  Description?: ContentRelatedTotype1[];
  Work: [ContentRelatedToWorktype, ...ContentRelatedToWorktype[]];
  Character: [ContentRelatedToCharactertype, ...ContentRelatedToCharactertype[]];
  PersonOrGroup: [ContentRelatedToPersontype, ...ContentRelatedToPersontype[]];
  Period: [ContentRelatedToPeriodtype, ...ContentRelatedToPeriodtype[]];
  Place: [ContentRelatedToPlacetype, ...ContentRelatedToPlacetype[]];
  Event: [ContentRelatedToEventtype, ...ContentRelatedToEventtype[]];
  GroupingEntity?: GroupingEntitytype[];
  Terms?: Termstype[];
}
export interface ContentRelatedToRelationshiptype {
  Type: string;
  SubType?: string[];
  Description?: ContentRelatedToRelationshiptype1[];
  primary?: boolean;
}
export interface ContentRelatedToRelationshiptype1 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedTotype1 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedToWorktype {
  WorkType?: string;
  ContentID?: string[];
  OtherIdentifier?: ContentIdentifiertype[];
  Description?: ContentRelatedToWorktype1[];
  primary?: boolean;
  fictional?: boolean;
}
export interface ContentRelatedToWorktype1 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedToCharactertype1 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedToPersontype {
  Identifier?: PersonIdentifiertype[];
  Name: PersonNametype;
  Description?: ContentRelatedToPersontype1[];
  primary?: boolean;
  fictional?: boolean;
}
export interface ContentRelatedToPersontype1 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedToPeriodtype {
  Date: ContentRelatedToPeriodtype1;
  Duration?: ContentRelatedToPeriodtype2;
  Description?: ContentRelatedToPeriodtype3[];
  primary?: boolean;
  fictional?: boolean;
}
export interface ContentRelatedToPeriodtype1 {
  _tagText?: string;
  approximate?: boolean;
}
export interface ContentRelatedToPeriodtype2 {
  _tagText?: string;
  approximate?: boolean;
}
export interface ContentRelatedToPeriodtype3 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedToPlacetype {
  Region?: Regiontype;
  Address?: string;
  EarthCoordinate?: CoordinateEarthtype;
  OtherCoordinate?: CoordinateOthertype;
  Description?: ContentRelatedToPlacetype1[];
  primary?: boolean;
  fictional?: boolean;
}
export interface CoordinateEarthtype {
  Latitude: number;
  Longitude: number;
  ElevationMeters?: number;
}
export interface CoordinateOthertype {
  Coordinate: [CoordinateOthertype1, ...CoordinateOthertype1[]];
  system: string;
}
export interface CoordinateOthertype1 {
  _tagText?: string;
  label: string;
}
export interface ContentRelatedToPlacetype1 {
  _tagText?: string;
  language?: string;
}
export interface ContentRelatedToEventtype {
  Type?: string;
  SubType?: string[];
  Date?: ContentRelatedToEventtype1;
  Duration?: ContentRelatedToEventtype2;
  Description?: ContentRelatedToEventtype3[];
  primary?: boolean;
  fictional?: boolean;
}
export interface ContentRelatedToEventtype1 {
  _tagText?: string;
  approximate?: boolean;
}
export interface ContentRelatedToEventtype2 {
  _tagText?: string;
  approximate?: boolean;
}
export interface ContentRelatedToEventtype3 {
  _tagText?: string;
  language?: string;
}
export interface AncillaryDescriptiontype {
  Type: string;
  SubType?: string[];
  Description: [AncillaryDescriptiontype1, ...AncillaryDescriptiontype1[]];
  AdditionalTerms?: Termstype[];
  ancillaryDescriptionID?: string;
}
export interface AncillaryDescriptiontype1 {
  _tagText?: string;
  language?: string;
}
export interface BasicMetadataParenttype {
  ParentContentID: string;
  Parent: BasicMetadatatype;
  SequenceInfo?: ContentSequenceInfotype;
  Region: [Regiontype, ...Regiontype[]];
  ExcludedRegion: [Regiontype, ...Regiontype[]];
  relationshipType?:
  | 'isclipof'
  | 'isepisodeof'
  | 'isseasonof'
  | 'ispieceof'
  | 'ispartof'
  | 'isderivedfrom'
  | 'iscompositeof'
  | 'issupplementto'
  | 'ispromotionfor'
  | 'isabsedon'
  | 'isdescendentof';
}
export interface InventoryMetadataAliastype {
  LocalizedPair?: InventoryMetadataLocalizedPairtype[];
  ContentID: string;
}
export interface InventoryMetadataLocalizedPairtype {
  LanguageIncluded: string;
  RegionIncluded?: Regiontype;
}
export interface InventoryTextObjecttype {
  ContainerReference: [InventoryTextObjecttypeContainerReference, ...InventoryTextObjecttypeContainerReference[]];
  SubtitleID: InventoryTextObjecttype1;
  TextString: [InventoryTextObjecttype2, ...InventoryTextObjecttype2[]];
  TextObjectID: string;
  language?: string;
}
export interface InventoryTextObjecttype1 {
  _tagText?: string;
  time?: string;
}
export interface InventoryTextObjecttype2 {
  _tagText?: string;
  index?: number;
}
export interface InventoryManifesttype {
  ContainerReference: InventoryManifesttypeContainerReference;
  ManifestID: string;
}
export interface PresentationManifesttype {
  Inventory: Inventorytype;
  Presentation: Presentationtype;
  PictureGroups?: PictureGroupListtype;
  TextGroups?: TextGroupListtype;
  TimedEventSequences?: TimedEventSequenceListtype;
  updateNum?: number;
  workflow?: string;
  updateDeliveryType?: string;
  versionDescription?: string;
  timestamp?: string;
}
export interface MediaManifestEdittype {
  Source?: ManifestSourcetype;
  DeleteObjects?: MediaManifestEditDeletetype;
  AddObjects?: MediaManifestEditAddtype;
  Description?: string;
  Instructions?: string;
  type?: string;
  reference?: string;
  ManifestID?: string;
  ExtraVersionReference?: string;
  updateNum?: number;
  workflow?: string;
  updateDeliveryType?: string;
  versionDescription?: string;
  timestamp?: string;
}
export interface MediaManifestEditDeletetype {
  AudioTrackID?: string[];
  VideoTrackID?: string[];
  SubtitleTrackID?: string[];
  ImageID?: string[];
  InteractiveTrackID?: string[];
  TextObjectID?: string[];
  PlayableSequenceID?: string[];
  PresentationID?: string[];
  PictureID?: string[];
  GalleryID?: string[];
  AppGroupID?: string[];
  TextGroupID?: string[];
  TimedSequenceID?: string[];
  ExperienceID?: string[];
  ALIDExperienceMap?: ALIDExperienceMaptype[];
  ContentID?: string[];
  LocalizedInfoRef?: MediaManifestEditLocReftype[];
}
export interface MediaManifestEditLocReftype {
  ContentID: string;
  Language: string;
  Region?: Regiontype;
}
export interface MediaManifestEditAddtype {
  Compatibility?: Compatibilitytype;
  Inventory?: Inventorytype;
  Presentations?: PresentationListtype;
  PlayableSequences?: PlayableSequenceListtype;
  PictureGroups?: PictureGroupListtype;
  AppGroups?: AppGroupListtype;
  Metadata?: InventoryMetadatatype[];
  TextObject?: string[];
  TextGroup?: TextGrouptype[];
  TextGroups?: TextGroupListtype[];
  TimedEventSequence?: TimedEventSequencetype[];
  Experiences?: ExperienceListtype;
  ALIDExperienceMaps?: ALIDExperienceMapListtype;
}
