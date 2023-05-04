import { MMCInterface } from './MMCInterface';

export function isValidMMCInterface(mmc: MMCInterface): boolean {
  if (!mmc['_xmlns:manifest'] || !mmc['_xmlns:md'] || !mmc['_xmlns:xsi'] || !mmc['_xsi:schemaLocation'] || !mmc._ManifestID) {
    return false;
  }

  if (!mmc.Compatibility || !mmc.Compatibility.SpecVersion || !mmc.Compatibility.SpecVersion._tagText
    || !mmc.Compatibility.Profile || !mmc.Compatibility.Profile._tagText) {
    return false;
  }

  if (!mmc.Inventory || !mmc.Inventory.Metadata || mmc.Inventory.Metadata.length === 0) {
    return false;
  }

  let isValid = true;

  mmc.Inventory.Metadata.forEach((metadata) => {
    if (!metadata.ContainerReference || !metadata.ContainerReference.ContainerLocation
        || !metadata.ContainerReference.ContainerLocation._tagText || !metadata.ContainerReference._type || !metadata._ContentID) {
      isValid = false;
    }
  });

  if (!isValid) {
    return false;
  }

  if (!mmc.Presentations || !mmc.Presentations.Presentation || mmc.Presentations.Presentation.length === 0) {
    return false;
  }

  mmc.Presentations.Presentation.forEach((presentation) => {
    if (!presentation.TrackMetadata || !presentation.TrackMetadata.TrackSelectionNumber
        || !presentation.TrackMetadata.TrackSelectionNumber._tagText || !presentation._PresentationID) {
      isValid = false;
    }
  });

  if (!isValid) {
    return false;
  }

  if (!mmc.PictureGroups || !mmc.PictureGroups.PictureGroup) {
    return false;
  }

  if (!mmc.Experiences || !mmc.Experiences.Experience || mmc.Experiences.Experience.length === 0) {
    return false;
  }

  mmc.Experiences.Experience.forEach((experience) => {
    if (!experience.ContentID || !experience.ContentID._tagText || !experience.Audiovisual
        || !experience.Audiovisual.Type || !experience.Audiovisual.Type._tagText || !experience.Audiovisual.SubType
        || !experience.Audiovisual.SubType._tagText || !experience.Audiovisual._ContentID || !experience._ExperienceID || !experience._version) {
      isValid = false;
    }
  });

  if (!isValid) {
    return false;
  }

  if (!mmc.ALIDExperienceMaps || !mmc.ALIDExperienceMaps.ALIDExperienceMap) {
    return false;
  }

  return true;
}
