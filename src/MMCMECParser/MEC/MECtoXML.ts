import { DOMImplementation, XMLSerializer } from 'xmldom';
import { MECInterface } from './MECInterface';

export function createMECtoXML(mecData: MECInterface): string {
  const implementation = new DOMImplementation();
  const xmlDoc = implementation.createDocument('', 'mdmec:CoreMetadata', null);
  const rootElement = xmlDoc.documentElement;

  rootElement.setAttribute('xmlns:md', mecData['xmlns:md']);
  rootElement.setAttribute('xmlns:xsi', mecData['xmlns:xsi']);
  rootElement.setAttribute('xmlns:mdmec', mecData['xmlns:mdmec']);
  rootElement.setAttribute('xsi:schemaLocation', mecData['xsi:schemaLocation']);

  const basicElement = xmlDoc.createElement('mdmec:Basic');
  basicElement.setAttribute('ContentID', mecData.Basic.ContentID);

  mecData.Basic.LocalizedInfo.forEach((localizedInfo) => {
    const localizedInfoElement = xmlDoc.createElement('md:LocalizedInfo');
    localizedInfoElement.setAttribute('language', localizedInfo.language);

    if (localizedInfo.default) {
      localizedInfoElement.setAttribute('default', localizedInfo.default);
    }

    if (localizedInfo.TitleDisplay60) {
      const titleDisplay60Element = xmlDoc.createElement('md:TitleDisplay60');
      titleDisplay60Element.textContent = localizedInfo.TitleDisplay60._tagText;
      localizedInfoElement.appendChild(titleDisplay60Element);
    }

    if (localizedInfo.TitleDisplayUnlimited) {
      const titleDisplayUnlimitedElement = xmlDoc.createElement('md:TitleDisplayUnlimited');
      titleDisplayUnlimitedElement.textContent = localizedInfo.TitleDisplayUnlimited._tagText;
      localizedInfoElement.appendChild(titleDisplayUnlimitedElement);
    }

    if (localizedInfo.TitleSort) {
      const titleSortElement = xmlDoc.createElement('md:TitleSort');
      titleSortElement.textContent = localizedInfo.TitleSort._tagText;
      localizedInfoElement.appendChild(titleSortElement);
    }

    if (localizedInfo.ArtReference) {
      localizedInfo.ArtReference.forEach((artReference) => {
        const artReferenceElement = xmlDoc.createElement('md:ArtReference');
        artReferenceElement.setAttribute('resolution', artReference.resolution);
        artReferenceElement.setAttribute('purpose', artReference.purpose);
        artReferenceElement.textContent = artReference._tagText;
        localizedInfoElement.appendChild(artReferenceElement);
      });
    }

    if (localizedInfo.Summary190) {
      const summary190Element = xmlDoc.createElement('md:Summary190');
      summary190Element.textContent = localizedInfo.Summary190._tagText;
      localizedInfoElement.appendChild(summary190Element);
    }

    if (localizedInfo.Summary400) {
      const summary400Element = xmlDoc.createElement('md:Summary400');
      summary400Element.textContent = localizedInfo.Summary400._tagText;
      localizedInfoElement.appendChild(summary400Element);
    }

    if (localizedInfo.Summary4000) {
      const summary4000Element = xmlDoc.createElement('md:Summary4000');
      summary4000Element.textContent = localizedInfo.Summary4000._tagText;
      localizedInfoElement.appendChild(summary4000Element);
    }

    if (localizedInfo.Genre) {
      localizedInfo.Genre.forEach((genre) => {
        const genreElement = xmlDoc.createElement('md:Genre');
        genreElement.setAttribute('id', genre.id);
        genreElement.setAttribute('level', genre.level);
        genreElement.setAttribute('source', genre.source);
        genreElement.textContent = genre._tagText;
        localizedInfoElement.appendChild(genreElement);
      });
    }

    if (localizedInfo.OriginalTitle) {
      const originalTitleElement = xmlDoc.createElement('md:OriginalTitle');
      originalTitleElement.textContent = localizedInfo.OriginalTitle._tagText;
      localizedInfoElement.appendChild(originalTitleElement);
    }

    if (localizedInfo.CopyrightLine) {
      const copyrightLineElement = xmlDoc.createElement('md:CopyrightLine');
      copyrightLineElement.textContent = localizedInfo.CopyrightLine._tagText;
      localizedInfoElement.appendChild(copyrightLineElement);
    }

    basicElement.appendChild(localizedInfoElement);
  });

  if (mecData.Basic.RunLength) {
    const runLengthElement = xmlDoc.createElement('md:RunLength');
    runLengthElement.textContent = mecData.Basic.RunLength._tagText;
    basicElement.appendChild(runLengthElement);
  }

  const releaseYearElement = xmlDoc.createElement('md:ReleaseYear');
  releaseYearElement.textContent = mecData.Basic.ReleaseYear._tagText;
  basicElement.appendChild(releaseYearElement);

  if (mecData.Basic.ReleaseDate) {
    const releaseDateElement = xmlDoc.createElement('md:ReleaseDate');
    releaseDateElement.textContent = mecData.Basic.ReleaseDate._tagText;
    basicElement.appendChild(releaseDateElement);
  }

  if (mecData.Basic.ReleaseHistory) {
    mecData.Basic.ReleaseHistory.forEach((releaseHistory) => {
      const releaseHistoryElement = xmlDoc.createElement('md:ReleaseHistory');

      const releaseTypeElement = xmlDoc.createElement('md:ReleaseType');
      releaseTypeElement.setAttribute('wide', releaseHistory.ReleaseType.wide);
      releaseTypeElement.textContent = releaseHistory.ReleaseType._tagText;
      releaseHistoryElement.appendChild(releaseTypeElement);

      if (releaseHistory.DistrTerritory) {
        const distrTerritoryElement = xmlDoc.createElement('md:DistrTerritory');

        const countryElement = xmlDoc.createElement('md:country');
        countryElement.textContent = releaseHistory.DistrTerritory.country._tagText;
        distrTerritoryElement.appendChild(countryElement);

        releaseHistoryElement.appendChild(distrTerritoryElement);
      }

      if (releaseHistory.Date) {
        const dateElement = xmlDoc.createElement('md:Date');
        dateElement.setAttribute('scheduled', releaseHistory.Date.scheduled);
        dateElement.textContent = releaseHistory.Date._tagText;
        releaseHistoryElement.appendChild(dateElement);
      }

      if (releaseHistory.Description) {
        const descriptionElement = xmlDoc.createElement('md:Description');
        descriptionElement.textContent = releaseHistory.Description._tagText;
        releaseHistoryElement.appendChild(descriptionElement);
      }

      if (releaseHistory.ReleaseOrg) {
        const releaseOrgElement = xmlDoc.createElement('md:ReleaseOrg');
        releaseOrgElement.setAttribute('organizationID', releaseHistory.ReleaseOrg.organizationID);
        releaseOrgElement.setAttribute('idType', releaseHistory.ReleaseOrg.idType);
        const displayNameElement = xmlDoc.createElement('md:DisplayName');
        displayNameElement.textContent = releaseHistory.ReleaseOrg.DisplayName._tagText;
        releaseOrgElement.appendChild(displayNameElement);

        if (releaseHistory.ReleaseOrg.SortName) {
          const sortNameElement = xmlDoc.createElement('md:SortName');
          sortNameElement.textContent = releaseHistory.ReleaseOrg.SortName._tagText;
          releaseOrgElement.appendChild(sortNameElement);
        }

        if (releaseHistory.ReleaseOrg.AlternateName) {
          const alternateNameElement = xmlDoc.createElement('md:AlternateName');
          alternateNameElement.textContent = releaseHistory.ReleaseOrg.AlternateName._tagText;
          releaseOrgElement.appendChild(alternateNameElement);
        }

        releaseHistoryElement.appendChild(releaseOrgElement);
      }

      basicElement.appendChild(releaseHistoryElement);
    });
  }

  const workTypeElement = xmlDoc.createElement('md:WorkType');
  workTypeElement.textContent = mecData.Basic.WorkType._tagText;
  basicElement.appendChild(workTypeElement);

  if (mecData.Basic.PictureColorType) {
    const pictureColorTypeElement = xmlDoc.createElement('md:PictureColorType');
    pictureColorTypeElement.textContent = mecData.Basic.PictureColorType._tagText;
    basicElement.appendChild(pictureColorTypeElement);
  }

  const ratingSetElement = xmlDoc.createElement('md:RatingSet');

  mecData.Basic.RatingSet.Rating.forEach((rating) => {
    const ratingElement = xmlDoc.createElement('md:Rating');

    const regionElement = xmlDoc.createElement('md:Region');
    const countryElement = xmlDoc.createElement('md:country');
    countryElement.textContent = rating.Region.country._tagText;
    regionElement.appendChild(countryElement);
    ratingElement.appendChild(regionElement);

    const systemElement = xmlDoc.createElement('md:System');
    systemElement.textContent = rating.System._tagText;
    ratingElement.appendChild(systemElement);

    const valueElement = xmlDoc.createElement('md:Value');
    valueElement.textContent = rating.Value._tagText;
    ratingElement.appendChild(valueElement);

    ratingSetElement.appendChild(ratingElement);
  });

  basicElement.appendChild(ratingSetElement);

  if (mecData.Basic.People) {
    mecData.Basic.People.forEach((person) => {
      const personElement = xmlDoc.createElement('md:People');

      const jobElement = xmlDoc.createElement('md:Job');
      const jobFunctionElement = xmlDoc.createElement('md:JobFunction');
      jobFunctionElement.textContent = person.Job.JobFunction._tagText;
      jobElement.appendChild(jobFunctionElement);

      const jobDisplayElement = xmlDoc.createElement('md:JobDisplay');
      jobDisplayElement.textContent = person.Job.JobDisplay._tagText;
      jobElement.appendChild(jobDisplayElement);

      if (person.Job.BillingBlockOrder) {
        const billingBlockOrderElement = xmlDoc.createElement('md:BillingBlockOrder');
        billingBlockOrderElement.textContent = person.Job.BillingBlockOrder._tagText;
        jobElement.appendChild(billingBlockOrderElement);
      }

      personElement.appendChild(jobElement);

      const nameElement = xmlDoc.createElement('md:Name');
      const displayNameElement = xmlDoc.createElement('md:DisplayName');
      displayNameElement.textContent = person.Name.DisplayName._tagText;
      nameElement.appendChild(displayNameElement);

      personElement.appendChild(nameElement);

      basicElement.appendChild(personElement);
    });
  }

  rootElement.appendChild(basicElement);

  if (mecData.CompanyDisplayCredit) {
    const companyDisplayCreditElement = xmlDoc.createElement('mdmec:CompanyDisplayCredit');
    const displayStringElement = xmlDoc.createElement('md:DisplayString');
    displayStringElement.setAttribute('language', mecData.CompanyDisplayCredit.DisplayString.language);
    displayStringElement.textContent = mecData.CompanyDisplayCredit.DisplayString._tagText;
    companyDisplayCreditElement.appendChild(displayStringElement);
    basicElement.appendChild(companyDisplayCreditElement);
  }

  const serializer = new XMLSerializer();
  return serializer.serializeToString(xmlDoc);
}
