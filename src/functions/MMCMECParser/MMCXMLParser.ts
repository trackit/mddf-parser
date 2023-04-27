import { MMCInterface } from './MMCInterface';
import { DOMParser } from 'xmldom';

function getTextContent(element: Element, tagName: string): string {
    return element.getElementsByTagName(tagName)[0].textContent || '';
}

function getAttribute(element: Element, attributeName: string): string {
    return element.getAttribute(attributeName) || '';
}

function parseCompatibility(xmlDoc: Document): MMCInterface['Compatibility'] {
    const compatibilityElement = xmlDoc.getElementsByTagName('manifest:Compatibility')[0];
  
    return {
      SpecVersion: {
        _tagText: getTextContent(compatibilityElement, 'manifest:SpecVersion'),
      },
      Profile: {
        _tagText: getTextContent(compatibilityElement, 'manifest:Profile'),
      },
    };
}

function parseInventory(xmlDoc: Document): MMCInterface['Inventory'] {
    const inventoryElement = xmlDoc.getElementsByTagName('manifest:Inventory')[0];
  
    const audioElements = Array.from(inventoryElement.getElementsByTagName('manifest:Audio'));
    const videoElements = Array.from(inventoryElement.getElementsByTagName('manifest:Video'));
    const subtitleElements = Array.from(inventoryElement.getElementsByTagName('manifest:Subtitle'));
    const imageElements = Array.from(inventoryElement.getElementsByTagName('manifest:Image'));
    const metadataElements = Array.from(inventoryElement.getElementsByTagName('manifest:Metadata'));
  
    const audioList: MMCInterface['Inventory']['Audio'] = audioElements.map(audioElement => {
      return {
        Type: {
          _tagText: getTextContent(audioElement, 'md:Type'),
        },
        Language: {
          _tagText: getTextContent(audioElement, 'md:Language'),
          _dubbed: getAttribute(audioElement.getElementsByTagName('md:Language')[0], 'dubbed'),
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: getTextContent(audioElement, 'manifest:ContainerLocation'),
          },
        },
        _AudioTrackID: getAttribute(audioElement, 'AudioTrackID'),
      };
    });

    const videoList: MMCInterface['Inventory']['Video'] = videoElements.map(videoElement => {

      const cardsetListElement = videoElement.getElementsByTagName('md:CardsetList')[0];
      const cardsetList = cardsetListElement
        ? {
            Cardset: {
              Type: {
                _tagText: getTextContent(cardsetListElement, 'md:Type'),
              },
              Language: {
                _tagText: getTextContent(cardsetListElement, 'md:Language'),
              },
            },
          }
        : undefined;

        return {
          Type: {
            _tagText: getTextContent(videoElement, 'md:Type'),
          },
          Picture: {},
          ContainerReference: {
            ContainerLocation: {
              _tagText: getTextContent(videoElement, 'manifest:ContainerLocation'),
            },
          },
          _VideoTrackID: getAttribute(videoElement, 'VideoTrackID'),
            CardsetList: cardsetList,
        };
      });
    
      const subtitleList: MMCInterface['Inventory']['Subtitle'] = subtitleElements.map(subtitleElement => {
        return {
          Type: {
            _tagText: getTextContent(subtitleElement, 'md:Type'),
          },
          Language: {
            _tagText: getTextContent(subtitleElement, 'md:Language'),
            _dubbed: getAttribute(subtitleElement.getElementsByTagName('md:Language')[0], 'dubbed'),
          },
          ContainerReference: {
            ContainerLocation: {
              _tagText: getTextContent(subtitleElement, 'manifest:ContainerLocation'),
            },
          },
          _SubtitleTrackID: getAttribute(subtitleElement, 'SubtitleTrackID'),
        };
      });
    
      const imageList: MMCInterface['Inventory']['Image'] = imageElements.map(imageElement => {
        return {
          Width: {
            _tagText: getTextContent(imageElement, 'md:Width'),
          },
          Height: {
            _tagText: getTextContent(imageElement, 'md:Height'),
          },
          Encoding: {
            _tagText: getTextContent(imageElement, 'md:Encoding'),
          },
          Language: {
            _tagText: getTextContent(imageElement, 'md:Language'),
          },
          ContainerReference: {
            ContainerLocation: {
              _tagText: getTextContent(imageElement, 'manifest:ContainerLocation'),
            },
          },
          _ImageID: getAttribute(imageElement, 'ImageID'),
        };
      });
    
      const metadataList: MMCInterface['Inventory']['Metadata'] = metadataElements.map(metadataElement => {
        return {
          ContainerReference: {
            ContainerLocation: {
              _tagText: getTextContent(metadataElement, 'manifest:ContainerLocation'),
            },
            _type: getAttribute(metadataElement.getElementsByTagName('manifest:ContainerReference')[0], 'type'),
          },
          _ContentID: getAttribute(metadataElement, 'ContentID'),
        };
      });
  
    return {
      Audio: audioList,
      Video: videoList,
      Subtitle: subtitleList,
      Image: imageList,
      Metadata: metadataList,
    };
  }

  function parsePresentations(doc: Document): MMCInterface['Presentations'] {
    const presentationsElement = doc.getElementsByTagName('manifest:Presentations')[0];
    const presentationElements = presentationsElement.getElementsByTagName('manifest:Presentation');
  
    const presentationList: MMCInterface['Presentations']['Presentation'] = Array.from(presentationElements).map(presentationElement => {
      const trackMetadataElement = presentationElement.getElementsByTagName('manifest:TrackMetadata')[0];
  
      const videoTrackReferenceElements = Array.from(trackMetadataElement.getElementsByTagName('manifest:VideoTrackReference'));
      const videoTrackReferences: any[] = [];
      
      for (const videoTrackReferenceElement of videoTrackReferenceElements) {
        const videoTrackIdElements = Array.from(videoTrackReferenceElement.getElementsByTagName('manifest:VideoTrackID'));
      
        const videoTrackIds = videoTrackIdElements.map(videoTrackIdElement => {
          return {
            VideoTrackID: {
              _tagText: videoTrackIdElement.textContent || '',
            },
          };
        });
      
        videoTrackReferences.push(...videoTrackIds);
      }

      const audioTrackReferenceElements = Array.from(trackMetadataElement.getElementsByTagName('manifest:AudioTrackReference'));
      const audioTrackReferences: any[] = [];

      for (const audioTrackReferenceElement of audioTrackReferenceElements) {
        const audioTrackIdElements = Array.from(audioTrackReferenceElement.getElementsByTagName('manifest:AudioTrackID'));

        const audioTrackIds = audioTrackIdElements.map(audioTrackIdElement => {
          return {
            AudioTrackID: {
              _tagText: audioTrackIdElement.textContent || '',
            },
          };
        });

        audioTrackReferences.push(...audioTrackIds);
      }

      const subtitleTrackReferenceElements = Array.from(trackMetadataElement.getElementsByTagName('manifest:SubtitleTrackReference'));
      const subtitleTrackReferences: any[] = [];
      
      for (const subtitleTrackReferenceElement of subtitleTrackReferenceElements) {
        const subtitleTrackIdElements = Array.from(subtitleTrackReferenceElement.getElementsByTagName('manifest:SubtitleTrackID'));
      
        const subtitleTrackIds = subtitleTrackIdElements.map(subtitleTrackIdElement => {
          return {
            SubtitleTrackID: {
              _tagText: subtitleTrackIdElement.textContent || '',
            },
          };
        });
      
        subtitleTrackReferences.push(...subtitleTrackIds);
      }
        
  
      return {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: getTextContent(trackMetadataElement, 'manifest:TrackSelectionNumber'),
          },
          VideoTrackReference: videoTrackReferences,
          AudioTrackReference: audioTrackReferences.length > 0 ? audioTrackReferences : undefined,
          SubtitleTrackReference: subtitleTrackReferences.length > 0 ? subtitleTrackReferences : undefined,
        },
        _PresentationID: getAttribute(presentationElement, 'PresentationID'),
      };
    });
  
    return {
      Presentation: presentationList,
    };
  }

  function parsePlayableSequences(playableSequencesElement: Document): MMCInterface["PlayableSequences"] {
    const playableSequenceElements = Array.from(playableSequencesElement.getElementsByTagName("manifest:PlayableSequence"));
  
    const playableSequences: MMCInterface["PlayableSequences"] = {
      PlayableSequence: playableSequenceElements.map((playableSequenceElement) => {
        const sequenceId = playableSequenceElement.getAttribute("PlayableSequenceID") || "";
  
        const clipElements = Array.from(playableSequenceElement.getElementsByTagName("manifest:Clip"));
        const clips = clipElements.map((clipElement) => {
          const presentationIdElement = clipElement.getElementsByTagName("manifest:PresentationID")[0];
          const sequenceAttribute = clipElement.getAttribute("sequence") || "";
          const audioLanguageAttribute = clipElement.getAttribute("audioLanguage") || undefined;
  
          return {
            PresentationID: {
              _tagText: presentationIdElement.textContent || "",
            },
            _sequence: sequenceAttribute,
            _audioLanguage: audioLanguageAttribute,
          };
        });
  
        return {
          Clip: clips,
          _PlayableSequenceID: sequenceId,
        };
      }),
    };
  
    return playableSequences;
  }
  
  function parsePictureGroups(pictureGroupsElement: Document): MMCInterface["PictureGroups"] {
    const pictureGroupElements = Array.from(pictureGroupsElement.getElementsByTagName("manifest:PictureGroup"));
  
    const pictureGroup: MMCInterface["PictureGroups"]["PictureGroup"] = {
      Picture: [],
      _PictureGroupID: "",
    };
  
    pictureGroupElements.forEach((pictureGroupElement) => {
      const pictureGroupID = pictureGroupElement.getAttribute("PictureGroupID") || "";
      pictureGroup._PictureGroupID = pictureGroupID;
  
      const pictureElements = Array.from(pictureGroupElement.getElementsByTagName("manifest:Picture"));
      const pictures = pictureElements.map((pictureElement) => {
        const pictureIDElement = pictureElement.getElementsByTagName("manifest:PictureID")[0];
        const imageIDElement = pictureElement.getElementsByTagName("manifest:ImageID")[0];
        const languageInImageElement = pictureElement.getElementsByTagName("manifest:LanguageInImage")[0];
  
        return {
          PictureID: {
            _tagText: pictureIDElement.textContent || "",
          },
          ImageID: {
            _tagText: imageIDElement.textContent || "",
          },
          LanguageInImage: {
            _tagText: languageInImageElement.textContent || "",
          },
        };
      });
  
      pictureGroup.Picture.push(...pictures);
    });
  
    return { PictureGroup: pictureGroup };
  }  
  
  function parseExperiences(experiencesElement: Document): MMCInterface["Experiences"] {
    const experienceElements = Array.from(experiencesElement.getElementsByTagName("manifest:Experience"));
  
    let i = 0;
    const experiences: MMCInterface["Experiences"]["Experience"] = experienceElements.map((experienceElement) => {
      i += 1;
      const experienceID = experienceElement.getAttribute("ExperienceID") || "";
      const version = experienceElement.getAttribute("version") || "";
  
      const excludedRegionElement = experienceElement.getElementsByTagName("manifest:ExcludedRegion")[0];
      const excludedRegion = excludedRegionElement
        ? { country: { _tagText: excludedRegionElement.textContent || "" } }
        : undefined;
  
      const contentIDElement = experienceElement.getElementsByTagName("manifest:ContentID")[0];
      const contentID = { _tagText: contentIDElement.textContent || "" };
  
      const audiovisualElement = experienceElement.getElementsByTagName("manifest:Audiovisual")[0];
      const typeElement = audiovisualElement.getElementsByTagName("manifest:Type")[0];
      const subTypeElement = audiovisualElement.getElementsByTagName("manifest:SubType")[0];
      const playableSequenceIDElement = audiovisualElement.getElementsByTagName("manifest:PlayableSequenceID")[0];
      const presentationIDElement = audiovisualElement.getElementsByTagName("manifest:PresentationID")[0];
  
      const audiovisual = {
        Type: { _tagText: typeElement.textContent || "" },
        SubType: { _tagText: subTypeElement.textContent || "" },
        PlayableSequenceID: playableSequenceIDElement
          ? { _tagText: playableSequenceIDElement.textContent || "" }
          : undefined,
        _ContentID: audiovisualElement.getAttribute("ContentID") || "",
        PresentationID: presentationIDElement ? { _tagText: presentationIDElement.textContent || "" } : undefined,
      };
  
      const pictureGroupIDElement = experienceElement.getElementsByTagName("manifest:PictureGroupID")[0];
      let pictureGroupID = undefined;
      if (pictureGroupIDElement) {
        pictureGroupID = { _tagText: pictureGroupIDElement.textContent || "" };
      }
  
      const experienceChildElements = Array.from(experienceElement.getElementsByTagName("manifest:ExperienceChild"));
      const experienceChildren = experienceChildElements.map((experienceChildElement) => {
        const relationshipElement = experienceChildElement.getElementsByTagName("manifest:Relationship")[0];
        const experienceIDElement = experienceChildElement.getElementsByTagName("manifest:ExperienceID")[0];
  
        return {
          Relationship: { _tagText: relationshipElement.textContent || "" },
          ExperienceID: { _tagText: experienceIDElement.textContent || "" },
        };
      });
  
      const regionElement = experienceElement.getElementsByTagName("manifest:Region")[0];
      const region = regionElement ? { country: { _tagText: regionElement.textContent || "" } } : undefined;
  
      return {
        _ExperienceID: experienceID,
        _version: version,
        ExcludedRegion: excludedRegion,
        ContentID: contentID,
        Audiovisual: audiovisual,
        PictureGroupID: pictureGroupIDElement ? pictureGroupID : undefined,
        ExperienceChild: experienceChildren.length > 0 ? experienceChildren : undefined,
        Region: region,
      };
    });
  
    return { Experience: experiences };
  }

  function parseALIDExperienceMaps(alidExperienceMapsElement: Document): MMCInterface["ALIDExperienceMaps"] {
    const alidExperienceMapElement = alidExperienceMapsElement.getElementsByTagName("manifest:ALIDExperienceMap")[0];
  
    const alidElement = alidExperienceMapElement.getElementsByTagName("manifest:ALID")[0];
    const experienceIDElements = Array.from(alidExperienceMapElement.getElementsByTagName("manifest:ExperienceID"));
  
    const experienceIDs: MMCInterface["ALIDExperienceMaps"]["ALIDExperienceMap"]["ExperienceID"] = experienceIDElements.map(
      (experienceIDElement) => {
        return {
          _tagText: experienceIDElement.textContent || "",
          _condition: experienceIDElement.getAttribute("condition") || undefined,
        };
      }
    );
  
    const alidExperienceMap: MMCInterface["ALIDExperienceMaps"]["ALIDExperienceMap"] = {
      ALID: { _tagText: alidElement.textContent || "" },
      ExperienceID: experienceIDs,
    };
  
    return {
      ALIDExperienceMap: alidExperienceMap,
    };
  }

export function loadMMCDataFromXml(xmlString: string): MMCInterface {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'application/xml');

  const mmcInterface: MMCInterface = {
    "_xmlns:manifest": getAttribute(xmlDoc.documentElement, 'xmlns:manifest'),
    "_xmlns:md": getAttribute(xmlDoc.documentElement, 'xmlns:md'),
    "_xmlns:xsi": getAttribute(xmlDoc.documentElement, 'xmlns:xsi'),
    "_xsi:schemaLocation": getAttribute(xmlDoc.documentElement, 'xsi:schemaLocation'),
    _ManifestID: getAttribute(xmlDoc.documentElement, 'ManifestID'),

    Compatibility: parseCompatibility(xmlDoc),
    Inventory: parseInventory(xmlDoc),
    Presentations: parsePresentations(xmlDoc),
    PlayableSequences: parsePlayableSequences(xmlDoc),
    PictureGroups: parsePictureGroups(xmlDoc),
    Experiences: parseExperiences(xmlDoc),
    ALIDExperienceMaps: parseALIDExperienceMaps(xmlDoc),
  };

  return mmcInterface;
}
