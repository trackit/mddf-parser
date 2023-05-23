import { MMCInterface } from './MMCInterface';

export function isValidMMCInterface(mmc: MMCInterface): boolean {
  // if (!mmc['_xmlns:manifest'] || !mmc['_xmlns:md'] || !mmc['_xmlns:xsi'] || !mmc['_xsi:schemaLocation'] || !mmc.MediaManifest?.ManifestID) {
  //   return false;
  // }

  if (!mmc.MediaManifest?.Compatibility || !mmc.MediaManifest?.Compatibility.SpecVersion || !mmc.MediaManifest?.Compatibility.SpecVersion
    || !mmc.MediaManifest?.Compatibility.Profile || !mmc.MediaManifest?.Compatibility.Profile) {
      console.log('1');
    return false;
  }

  if (!mmc.MediaManifest?.Inventory || !mmc.MediaManifest?.Inventory.Metadata || mmc.MediaManifest?.Inventory.Metadata.length === 0) {
    console.log('2');
    return false;
  }

  let isValid = true;

  mmc.MediaManifest?.Inventory.Metadata.forEach((metadata) => {
    if (!metadata.ContainerReference || !metadata.ContainerReference[0].ContainerLocation
        || !metadata.ContainerReference[0].ContainerLocation || !metadata.ContainerReference[0].type || !metadata.ContentID) {
          console.log('3');
      isValid = false;
    }
  });

  if (!isValid) {
    console.log('4');
    return false;
  }

  if (!mmc.MediaManifest?.Presentations || !mmc.MediaManifest?.Presentations.Presentation
    || mmc.MediaManifest?.Presentations.Presentation.length === 0) {
      console.log('5');
    return false;
  }

  mmc.MediaManifest?.Presentations.Presentation.forEach((presentation) => {
    if (!presentation.TrackMetadata || !presentation.TrackMetadata[0].TrackSelectionNumber
        || !presentation.TrackMetadata[0].TrackSelectionNumber || !presentation.PresentationID) {
          console.log('6');
      isValid = false;
    }
  });

  if (!isValid) {
    console.log('7');
    return false;
  }

  if (!mmc.MediaManifest?.PictureGroups || !mmc.MediaManifest?.PictureGroups.PictureGroup) {
    console.log('8');
    return false;
  }

  if (!mmc.MediaManifest?.Experiences || !mmc.MediaManifest?.Experiences.Experience || mmc.MediaManifest?.Experiences.Experience.length === 0) {
    console.log('9');
    return false;
  }

  mmc.MediaManifest?.Experiences.Experience.forEach((experience) => {
    if (!experience.ContentID || !experience.ContentID || !experience.Audiovisual
        || !experience.Audiovisual.Type || !experience.Audiovisual.Type || !experience.Audiovisual.SubType
        || !experience.Audiovisual.SubType || !experience.Audiovisual.ContentID || !experience.ExperienceID || !experience.version) {
          console.log('10');
      isValid = false;
    }
  });

  if (!isValid) {
    console.log('11');
    return false;
  }

  if (!mmc.MediaManifest?.ALIDExperienceMaps || !mmc.MediaManifest?.ALIDExperienceMaps.ALIDExperienceMap) {
    console.log('12');
    return false;
  }

  return true;
}
