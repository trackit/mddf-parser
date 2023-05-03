import { DOMImplementation, XMLSerializer } from 'xmldom';
import { MMCInterface } from './MMCInterface';

export function createMMCtoXML(data: MMCInterface): string {
  const domImplementation = new DOMImplementation();
  const document = domImplementation.createDocument('', '', null);

  const rootElement = document.createElement('manifest:MediaManifest');
  document.appendChild(rootElement);

  rootElement.setAttribute('xmlns:manifest', data['_xmlns:manifest']);
  rootElement.setAttribute('xmlns:md', data['_xmlns:md']);
  rootElement.setAttribute('xmlns:xsi', data['_xmlns:xsi']);
  rootElement.setAttribute('xsi:schemaLocation', data['_xsi:schemaLocation']);
  rootElement.setAttribute('ManifestID', data._ManifestID);

  const compatibilityElement = document.createElement('manifest:Compatibility');
  const specVersionElement = document.createElement('manifest:SpecVersion');
  specVersionElement.textContent = data.Compatibility.SpecVersion._tagText;
  compatibilityElement.appendChild(specVersionElement);

  const profileElement = document.createElement('manifest:Profile');
  profileElement.textContent = data.Compatibility.Profile._tagText;
  compatibilityElement.appendChild(profileElement);

  rootElement.appendChild(compatibilityElement);

  const inventoryElement = document.createElement('manifest:Inventory');

  data.Inventory.Audio.forEach((audio) => {
    const audioElement = document.createElement('manifest:Audio');

    const typeElement = document.createElement('md:Type');
    typeElement.textContent = audio.Type._tagText;
    audioElement.appendChild(typeElement);

    const languageElement = document.createElement('md:Language');
    languageElement.textContent = audio.Language._tagText;
    if (audio.Language._dubbed) {
      languageElement.setAttribute('dubbed', audio.Language._dubbed);
    }
    audioElement.appendChild(languageElement);

    const containerReferenceElement = document.createElement('manifest:ContainerReference');
    const containerLocationElement = document.createElement('manifest:ContainerLocation');
    containerLocationElement.textContent = audio.ContainerReference.ContainerLocation._tagText;
    containerReferenceElement.appendChild(containerLocationElement);
    audioElement.appendChild(containerReferenceElement);

    audioElement.setAttribute('AudioTrackID', audio._AudioTrackID);
    inventoryElement.appendChild(audioElement);
  });

  data.Inventory.Video.forEach((video) => {
    const videoElement = document.createElement('manifest:Video');

    const typeElement = document.createElement('md:Type');
    typeElement.textContent = video.Type._tagText;
    videoElement.appendChild(typeElement);

    const pictureElement = document.createElement('md:Picture');
    videoElement.appendChild(pictureElement);

    videoElement.setAttribute('VideoTrackID', video._VideoTrackID);

    if (video.CardsetList) {
      const cardsetListElement = document.createElement('md:CardsetList');

      const cardsetElement = document.createElement('md:Cardset');

      const typeCardElement = document.createElement('md:Type');
      typeCardElement.textContent = video.CardsetList.Cardset.Type._tagText;
      cardsetElement.appendChild(typeCardElement);

      const languageElement = document.createElement('md:Language');
      languageElement.textContent = video.CardsetList.Cardset.Language._tagText;
      cardsetElement.appendChild(languageElement);

      cardsetListElement.appendChild(cardsetElement);

      videoElement.appendChild(cardsetListElement);
    }

    const containerReferenceElement = document.createElement('manifest:ContainerReference');
    const containerLocationElement = document.createElement('manifest:ContainerLocation');
    containerLocationElement.textContent = video.ContainerReference.ContainerLocation._tagText;
    containerReferenceElement.appendChild(containerLocationElement);
    videoElement.appendChild(containerReferenceElement);

    inventoryElement.appendChild(videoElement);
  });

  data.Inventory.Subtitle.forEach((subtitle) => {
    const subtitleElement = document.createElement('manifest:Subtitle');

    const typeElement = document.createElement('md:Type');
    typeElement.textContent = subtitle.Type._tagText;
    subtitleElement.appendChild(typeElement);

    const languageElement = document.createElement('md:Language');
    languageElement.textContent = subtitle.Language._tagText;
    if (subtitle.Language._dubbed) {
      languageElement.setAttribute('dubbed', subtitle.Language._dubbed);
    }
    subtitleElement.appendChild(languageElement);

    const containerReferenceElement = document.createElement('manifest:ContainerReference');
    const containerLocationElement = document.createElement('manifest:ContainerLocation');
    containerLocationElement.textContent = subtitle.ContainerReference.ContainerLocation._tagText;
    containerReferenceElement.appendChild(containerLocationElement);
    subtitleElement.appendChild(containerReferenceElement);

    subtitleElement.setAttribute('SubtitleTrackID', subtitle._SubtitleTrackID);
    inventoryElement.appendChild(subtitleElement);
  });

  data.Inventory.Image.forEach((image) => {
    const imageElement = document.createElement('manifest:Image');

    const widthElement = document.createElement('md:Width');
    widthElement.textContent = image.Width._tagText;
    imageElement.appendChild(widthElement);

    const heightElement = document.createElement('md:Height');
    heightElement.textContent = image.Height._tagText;
    imageElement.appendChild(heightElement);
    const encodingElement = document.createElement('md:Encoding');
    encodingElement.textContent = image.Encoding._tagText;
    imageElement.appendChild(encodingElement);

    const languageElement = document.createElement('md:Language');
    languageElement.textContent = image.Language._tagText;
    imageElement.appendChild(languageElement);

    const containerReferenceElement = document.createElement('manifest:ContainerReference');
    const containerLocationElement = document.createElement('manifest:ContainerLocation');
    containerLocationElement.textContent = image.ContainerReference.ContainerLocation._tagText;
    containerReferenceElement.appendChild(containerLocationElement);
    imageElement.appendChild(containerReferenceElement);

    imageElement.setAttribute('ImageID', image._ImageID);
    inventoryElement.appendChild(imageElement);
  });

  data.Inventory.Metadata.forEach((metadata) => {
    const metadataElement = document.createElement('manifest:Metadata');

    const containerReferenceElement = document.createElement('manifest:ContainerReference');
    containerReferenceElement.setAttribute('type', metadata.ContainerReference._type);

    const containerLocationElement = document.createElement('manifest:ContainerLocation');
    containerLocationElement.textContent = metadata.ContainerReference.ContainerLocation._tagText;
    containerReferenceElement.appendChild(containerLocationElement);
    metadataElement.appendChild(containerReferenceElement);

    metadataElement.setAttribute('ContentID', metadata._ContentID);
    inventoryElement.appendChild(metadataElement);
  });

  rootElement.appendChild(inventoryElement);

  const presentationsElement = document.createElement('manifest:Presentations');
  data.Presentations.Presentation.forEach((presentation) => {
    const presentationElement = document.createElement('manifest:Presentation');

    const trackMetadataElement = document.createElement('manifest:TrackMetadata');
    const trackSelectionNumberElement = document.createElement('manifest:TrackSelectionNumber');
    trackSelectionNumberElement.textContent = presentation.TrackMetadata.TrackSelectionNumber._tagText;
    trackMetadataElement.appendChild(trackSelectionNumberElement);

    if (presentation.TrackMetadata.VideoTrackReference) {
      presentation.TrackMetadata.VideoTrackReference.forEach((videoTrackRef) => {
        const videoTrackReferenceElement = document.createElement('manifest:VideoTrackReference');
        const videoTrackIDElement = document.createElement('manifest:VideoTrackID');
        videoTrackIDElement.textContent = videoTrackRef.VideoTrackID._tagText;
        videoTrackReferenceElement.appendChild(videoTrackIDElement);
        trackMetadataElement.appendChild(videoTrackReferenceElement);
      });
    }

    if (presentation.TrackMetadata.AudioTrackReference) {
      if (Array.isArray(presentation.TrackMetadata.AudioTrackReference)) {
        presentation.TrackMetadata.AudioTrackReference.forEach((audioTrackRef) => {
          const audioTrackReferenceElement = document.createElement('manifest:AudioTrackReference');
          const audioTrackIDElement = document.createElement('manifest:AudioTrackID');
          audioTrackIDElement.textContent = audioTrackRef.AudioTrackID._tagText;
          audioTrackReferenceElement.appendChild(audioTrackIDElement);
          trackMetadataElement.appendChild(audioTrackReferenceElement);
        });
      } else {
        const audioTrackReferenceElement = document.createElement('manifest:AudioTrackReference');
        const audioTrackIDElement = document.createElement('manifest:AudioTrackID');
        audioTrackIDElement.textContent = presentation.TrackMetadata.AudioTrackReference.AudioTrackID._tagText;
        audioTrackReferenceElement.appendChild(audioTrackIDElement);
        trackMetadataElement.appendChild(audioTrackReferenceElement);
      }
    }

    if (presentation.TrackMetadata.SubtitleTrackReference) {
      presentation.TrackMetadata.SubtitleTrackReference.forEach((subtitleTrackRef) => {
        const subtitleTrackReferenceElement = document.createElement('manifest:SubtitleTrackReference');
        const subtitleTrackIDElement = document.createElement('manifest:SubtitleTrackID');
        subtitleTrackIDElement.textContent = subtitleTrackRef.SubtitleTrackID._tagText;
        subtitleTrackReferenceElement.appendChild(subtitleTrackIDElement);
        trackMetadataElement.appendChild(subtitleTrackReferenceElement);
      });
    }

    presentationElement.appendChild(trackMetadataElement);
    presentationElement.setAttribute('PresentationID', presentation._PresentationID);
    presentationsElement.appendChild(presentationElement);
  });

  rootElement.appendChild(presentationsElement);

  const playableSequencesElement = document.createElement('manifest:PlayableSequences');
  if (data.PlayableSequences) {
    data.PlayableSequences.PlayableSequence.forEach((playableSequence) => {
      const playableSequenceElement = document.createElement('manifest:PlayableSequence');

      playableSequence.Clip.forEach((clip) => {
        const clipElement = document.createElement('manifest:Clip');
        const presentationIDElement = document.createElement('manifest:PresentationID');
        presentationIDElement.textContent = clip.PresentationID._tagText;
        clipElement.appendChild(presentationIDElement);

        clipElement.setAttribute('sequence', clip._sequence);
        if (clip._audioLanguage) {
          clipElement.setAttribute('audioLanguage', clip._audioLanguage);
        }
        playableSequenceElement.appendChild(clipElement);
      });

      playableSequenceElement.setAttribute('PlayableSequenceID', playableSequence._PlayableSequenceID);
      playableSequencesElement.appendChild(playableSequenceElement);
    });

    rootElement.appendChild(playableSequencesElement);
  }

  const pictureGroupsElement = document.createElement('manifest:PictureGroups');
  const pictureGroupElement = document.createElement('manifest:PictureGroup');
  data.PictureGroups.PictureGroup.Picture.forEach((picture) => {
    const pictureElement = document.createElement('manifest:Picture');
    const pictureIDElement = document.createElement('manifest:PictureID');
    pictureIDElement.textContent = picture.PictureID._tagText;
    pictureElement.appendChild(pictureIDElement);

    const imageIDElement = document.createElement('manifest:ImageID');
    imageIDElement.textContent = picture.ImageID._tagText;
    pictureElement.appendChild(imageIDElement);

    const languageInImageElement = document.createElement('manifest:LanguageInImage');
    languageInImageElement.textContent = picture.LanguageInImage._tagText;
    pictureElement.appendChild(languageInImageElement);

    pictureGroupElement.appendChild(pictureElement);
  });
  pictureGroupElement.setAttribute('PictureGroupID', data.PictureGroups.PictureGroup._PictureGroupID);
  pictureGroupsElement.appendChild(pictureGroupElement);
  rootElement.appendChild(pictureGroupsElement);

  const experiencesElement = document.createElement('manifest:Experiences');

  data.Experiences.Experience.forEach((experience) => {
    const experienceElement = document.createElement('manifest:Experience');

    if (experience.ExcludedRegion) {
      const excludedRegionElement = document.createElement('manifest:ExcludedRegion');
      const countryElement = document.createElement('md:country');
      countryElement.textContent = experience.ExcludedRegion.country._tagText;
      excludedRegionElement.appendChild(countryElement);
      experienceElement.appendChild(excludedRegionElement);
    }

    if (experience.Region) {
      const regionElement = document.createElement('manifest:Region');
      const countryElement = document.createElement('md:country');
      countryElement.textContent = experience.Region.country._tagText;
      regionElement.appendChild(countryElement);
      experienceElement.appendChild(regionElement);
    }

    const contentIDElement = document.createElement('manifest:ContentID');
    contentIDElement.textContent = experience.ContentID._tagText;
    experienceElement.appendChild(contentIDElement);

    const audioVisualElement = document.createElement('manifest:Audiovisual');
    const avTypeElement = document.createElement('manifest:Type');
    avTypeElement.textContent = experience.Audiovisual.Type._tagText;
    audioVisualElement.appendChild(avTypeElement);

    const avSubTypeElement = document.createElement('manifest:SubType');
    avSubTypeElement.textContent = experience.Audiovisual.SubType._tagText;
    audioVisualElement.appendChild(avSubTypeElement);

    if (experience.Audiovisual.PlayableSequenceID) {
      const playableSequenceIDElement = document.createElement('manifest:PlayableSequenceID');
      playableSequenceIDElement.textContent = experience.Audiovisual.PlayableSequenceID._tagText;
      audioVisualElement.appendChild(playableSequenceIDElement);
    }

    audioVisualElement.setAttribute('ContentID', experience.Audiovisual._ContentID);

    if (experience.Audiovisual.PresentationID) {
      const presentationIDElement = document.createElement('manifest:PresentationID');
      presentationIDElement.textContent = experience.Audiovisual.PresentationID._tagText;
      audioVisualElement.appendChild(presentationIDElement);
    }

    experienceElement.appendChild(audioVisualElement);

    if (experience.PictureGroupID) {
      const pictureGroupIDElement = document.createElement('manifest:PictureGroupID');
      pictureGroupIDElement.textContent = experience.PictureGroupID._tagText;
      experienceElement.appendChild(pictureGroupIDElement);
    }

    if (experience.ExperienceChild) {
      experience.ExperienceChild.forEach((experienceChild) => {
        const experienceChildElement = document.createElement('manifest:ExperienceChild');
        const relationshipElement = document.createElement('manifest:Relationship');
        relationshipElement.textContent = experienceChild.Relationship._tagText;
        experienceChildElement.appendChild(relationshipElement);

        const experienceIDElement = document.createElement('manifest:ExperienceID');
        experienceIDElement.textContent = experienceChild.ExperienceID._tagText;
        experienceChildElement.appendChild(experienceIDElement);

        experienceElement.appendChild(experienceChildElement);
      });
    }

    experienceElement.setAttribute('ExperienceID', experience._ExperienceID);
    experienceElement.setAttribute('version', experience._version);
    experiencesElement.appendChild(experienceElement);
  });

  rootElement.appendChild(experiencesElement);

  const alidExperienceMapsElement = document.createElement('manifest:ALIDExperienceMaps');

  const alidExperienceMapElement = document.createElement('manifest:ALIDExperienceMap');
  const alidElement = document.createElement('manifest:ALID');
  alidElement.textContent = data.ALIDExperienceMaps.ALIDExperienceMap.ALID._tagText;
  alidExperienceMapElement.appendChild(alidElement);

  data.ALIDExperienceMaps.ALIDExperienceMap.ExperienceID.forEach((experienceID) => {
    const experienceIDElement = document.createElement('manifest:ExperienceID');
    experienceIDElement.textContent = experienceID._tagText;
    if (experienceID._condition) {
      experienceIDElement.setAttribute('condition', experienceID._condition);
    }
    alidExperienceMapElement.appendChild(experienceIDElement);
  });

  alidExperienceMapsElement.appendChild(alidExperienceMapElement);

  rootElement.appendChild(alidExperienceMapsElement);

  const serializer = new XMLSerializer();
  const xmlString = serializer.serializeToString(document);

  return xmlString;
}
