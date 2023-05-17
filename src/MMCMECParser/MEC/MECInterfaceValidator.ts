import { MECInterface } from './MECInterface';

export function isValidMECInterface(mec: MECInterface): boolean {
  if (!mec.CoreMetadata[0]['xmlns:md'] || !mec.CoreMetadata[0]['xmlns:xsi']
  || !mec.CoreMetadata[0]['xmlns:mdmec'] || !mec.CoreMetadata[0]['xsi:schemaLocation']) {
    return false;
  }

  if (!mec.CoreMetadata[0].Basic || !mec.CoreMetadata[0].Basic.ContentID) {
    return false;
  }

  if (!mec.CoreMetadata[0].Basic.LocalizedInfo || mec.CoreMetadata[0].Basic.LocalizedInfo.length === 0) {
    return false;
  }

  let isValid = true;

  mec.CoreMetadata[0].Basic.LocalizedInfo.forEach((localizedInfo) => {
    if (!localizedInfo.language) {
      isValid = false;
      return;
    }

    if (!localizedInfo.ArtReference || localizedInfo.ArtReference.length === 0) {
      isValid = false;
      return;
    }

    if (!localizedInfo.Genre || localizedInfo.Genre.length === 0) {
      isValid = false;
      return;
    }

    if (!localizedInfo.OriginalTitle || !localizedInfo.OriginalTitle) {
      isValid = false;
    }
  });

  if (!isValid) {
    return false;
  }

  if (!mec.CoreMetadata[0].Basic.ReleaseYear || !mec.CoreMetadata[0].Basic.ReleaseYear) {
    return false;
  }

  if (!mec.CoreMetadata[0].Basic.WorkType || !mec.CoreMetadata[0].Basic.WorkType) {
    return false;
  }

  if (!mec.CoreMetadata[0].Basic.RatingSet || !mec.CoreMetadata[0].Basic.RatingSet.Rating
    || mec.CoreMetadata[0].Basic.RatingSet.Rating.length === 0) {
    return false;
  }

  mec.CoreMetadata[0].Basic.RatingSet.Rating.forEach((rating) => {
    if (!rating.Region) {
      isValid = false;
      return;
    }

    if (!rating.System || !rating.System) {
      isValid = false;
      return;
    }

    if (!rating.Value || !rating.Value) {
      isValid = false;
    }
  });

  return isValid;
}
