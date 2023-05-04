import { MECInterface } from './MECInterface';

export function isValidMECInterface(mec: MECInterface): boolean {
  if (!mec['xmlns:md'] || !mec['xmlns:xsi'] || !mec['xmlns:mdmec'] || !mec['xsi:schemaLocation']) {
    return false;
  }

  if (!mec.Basic || !mec.Basic.ContentID) {
    return false;
  }

  if (!mec.Basic.LocalizedInfo || mec.Basic.LocalizedInfo.length === 0) {
    return false;
  }

  let isValid = true;

  mec.Basic.LocalizedInfo.forEach((localizedInfo) => {
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

    if (!localizedInfo.OriginalTitle || !localizedInfo.OriginalTitle._tagText) {
      isValid = false;
    }
  });

  if (!isValid) {
    return false;
  }

  if (!mec.Basic.ReleaseYear || !mec.Basic.ReleaseYear._tagText) {
    return false;
  }

  if (!mec.Basic.WorkType || !mec.Basic.WorkType._tagText) {
    return false;
  }

  if (!mec.Basic.RatingSet || !mec.Basic.RatingSet.Rating || mec.Basic.RatingSet.Rating.length === 0) {
    return false;
  }

  mec.Basic.RatingSet.Rating.forEach((rating) => {
    if (!rating.Region || !rating.Region.country || !rating.Region.country._tagText) {
      isValid = false;
      return;
    }

    if (!rating.System || !rating.System._tagText) {
      isValid = false;
      return;
    }

    if (!rating.Value || !rating.Value._tagText) {
      isValid = false;
    }
  });

  return isValid;
}
