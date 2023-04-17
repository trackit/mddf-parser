import { MECInterface } from "./MECInterface";
import { DOMParser } from 'xmldom';

export function loadMECDataFromXml(xmlString: string): Promise<MECInterface> {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
    let mecData: MECInterface = {
      "xmlns:md": xmlDoc.documentElement.getAttribute("xmlns:md") ?? "",
      "xmlns:xsi": xmlDoc.documentElement.getAttribute("xmlns:xsi") ?? "",
      "xmlns:mdmec": xmlDoc.documentElement.getAttribute("xmlns:mdmec") ?? "",
      "xsi:schemaLocation": xmlDoc.documentElement.getAttribute("xsi:schemaLocation") ?? "",
      Basic: {
        ContentID: "",
        _prefix: "mdmec",
        LocalizedInfo: [],
        RunLength: undefined,
        ReleaseYear: {
          _tagText: "",
        },
        ReleaseDate: undefined,
        ReleaseHistory: [],
        WorkType: {
          _tagText: "",
        },
        RatingSet: {
          Rating: [],
        },
        People: [],
      },
      CompanyDisplayCredit: undefined,
    };
    
    const basicNode = xmlDoc.getElementsByTagName("mdmec:Basic")[0];

    if (basicNode) {
      const contentIDNode = basicNode.getElementsByTagName("md:ContentID")[0];
      if (contentIDNode) {
        mecData.Basic.ContentID = contentIDNode.textContent ?? "";
      }
    
      const localizedInfoNodes = basicNode.getElementsByTagName("md:LocalizedInfo");
      mecData.Basic.LocalizedInfo = Array.from(localizedInfoNodes).map((localizedInfoNode) => {
        const language = localizedInfoNode.getAttribute("language") ?? "";
        const defaultLang = localizedInfoNode.getAttribute("default");
        const titleDisplay60Node = localizedInfoNode.getElementsByTagName("md:TitleDisplay60")[0];
        const titleDisplayUnlimitedNode = localizedInfoNode.getElementsByTagName("md:TitleDisplayUnlimited")[0];
        const titleSortNode = localizedInfoNode.getElementsByTagName("md:TitleSort")[0];
        const artReferenceNodes = localizedInfoNode.getElementsByTagName("md:ArtReference");
        const summary190Node = localizedInfoNode.getElementsByTagName("md:Summary190")[0];
        const summary400Node = localizedInfoNode.getElementsByTagName("md:Summary400")[0];
        const summary4000Node = localizedInfoNode.getElementsByTagName("md:Summary4000")[0];
        const genreNodes = localizedInfoNode.getElementsByTagName("md:Genre");
        const originalTitleNode = localizedInfoNode.getElementsByTagName("md:OriginalTitle")[0];
        const copyrightLineNode = localizedInfoNode.getElementsByTagName("md:CopyrightLine")[0];
    
        const genreArray = Array.from(genreNodes).map((genreNode) => {
          const id = genreNode.getAttribute("id") ?? "";
          const level = genreNode.getAttribute("level") ?? "";
          const source = genreNode.getAttribute("source") ?? "";
          const genreText = genreNode.textContent ?? "";
          return { id, level, source, _tagText: genreText };
        });

        const artReferenceArray = Array.from(artReferenceNodes).map((artReferenceNode) => {
          const resolution = artReferenceNode.getAttribute("resolution") ?? "";
          const purpose = artReferenceNode.getAttribute("purpose") ?? "";
          const artReferenceText = artReferenceNode.textContent ?? "";
          return { resolution, purpose, _tagText: artReferenceText };
        });
    
        return {
          language,
          default: defaultLang ? defaultLang : undefined,
          TitleDisplay60: titleDisplay60Node ? { _tagText: titleDisplay60Node.textContent ?? "" } : undefined,
          TitleDisplayUnlimited: titleDisplayUnlimitedNode ? { _tagText: titleDisplayUnlimitedNode.textContent ?? "" } : undefined,
          TitleSort: titleSortNode ? { _tagText: titleSortNode.textContent ?? "" } : undefined,
          ArtReference: artReferenceArray,
          Summary190: summary190Node ? { _tagText: summary190Node.textContent ?? "" } : undefined,
          Summary400: summary400Node ? { _tagText: summary400Node.textContent ?? "" } : undefined,
          Summary4000: summary4000Node ? { _tagText: summary4000Node.textContent ?? "" } : undefined,
          Genre: genreArray,
          OriginalTitle: { _tagText: originalTitleNode.textContent ?? "" },
          CopyrightLine: { _tagText: copyrightLineNode.textContent ?? "" },
        };
      });

      const runLengthNode = basicNode.getElementsByTagName("md:RunLength")[0];
      if (runLengthNode) {
        mecData.Basic.RunLength = { _tagText: runLengthNode.textContent ?? "" };
      }

      const releaseYearNode = basicNode.getElementsByTagName("md:ReleaseYear")[0];
      if (releaseYearNode) {
        mecData.Basic.ReleaseYear = { _tagText: releaseYearNode.textContent ?? "" };
      }
      
      const releaseDateNode = basicNode.getElementsByTagName("md:ReleaseDate")[0];
      if (releaseDateNode) {
        mecData.Basic.ReleaseDate = { _tagText: releaseDateNode.textContent ?? "" };
      }
      
      const releaseHistoryNodes = basicNode.getElementsByTagName("md:ReleaseHistory");
      mecData.Basic.ReleaseHistory = Array.from(releaseHistoryNodes).map((releaseHistoryNode) => {
        const ReleaseType = {
          wide: releaseHistoryNode.getElementsByTagName("md:ReleaseType")[0]?.getAttribute("wide") ?? "",
          _tagText: releaseHistoryNode.getElementsByTagName("md:ReleaseType")[0]?.textContent ?? ""
        };
        const DistrTerritory = { country: { _tagText: releaseHistoryNode.getElementsByTagName("md:DistrTerritory")[0]?.getElementsByTagName("md:country")[0]?.textContent ?? "" }};
        const Date = {
          _tagText: releaseHistoryNode.getElementsByTagName("md:Date")[0]?.textContent ?? "",
          scheduled: releaseHistoryNode.getElementsByTagName("md:Date")[0]?.getAttribute("scheduled") ?? ""
        };
        const Description = { _tagText: releaseHistoryNode.getElementsByTagName("md:Description")[0]?.textContent ?? "" };
        const ReleaseOrg = {
          organizationID: releaseHistoryNode.getElementsByTagName("md:ReleaseOrg")[0]?.getAttribute("organizationID") ?? "",
          idType: releaseHistoryNode.getElementsByTagName("md:ReleaseOrg")[0]?.getAttribute("idType") ?? "",
          DisplayName: { _tagText: releaseHistoryNode.getElementsByTagName("md:ReleaseOrg")[0]?.getElementsByTagName("md:DisplayName")[0]?.textContent ?? "" },
          SortName: { _tagText: releaseHistoryNode.getElementsByTagName("md:ReleaseOrg")[0]?.getElementsByTagName("md:SortName")[0]?.textContent ?? "" },
          AlternateName: { _tagText: releaseHistoryNode.getElementsByTagName("md:ReleaseOrg")[0]?.getElementsByTagName("md:AlternateName")[0]?.textContent ?? "" }
        };
        
        return { ReleaseType, DistrTerritory, Date, Description, ReleaseOrg };
      });
      
      const WorkTypeNode = basicNode.getElementsByTagName("md:WorkType")[0];
      if (WorkTypeNode) {
        mecData.Basic.WorkType = { _tagText: WorkTypeNode.textContent ?? "" };
      }
      
      const PictureColorTypeNode = basicNode.getElementsByTagName("md:PictureColorType")[0];
      if (PictureColorTypeNode) {
        mecData.Basic.PictureColorType = { _tagText: PictureColorTypeNode.textContent ?? "" };
      }
      
      const RatingSetNode = basicNode.getElementsByTagName("md:RatingSet")[0];
      if (RatingSetNode) {
        const RatingNodes = RatingSetNode.getElementsByTagName("md:Rating");
        mecData.Basic.RatingSet.Rating = Array.from(RatingNodes).map((RatingNode) => {
          const Region = { country: { _tagText: RatingNode.getElementsByTagName("md:Region")[0]?.getElementsByTagName("md:country")[0]?.textContent ?? "" }};
          const System = { _tagText: RatingNode.getElementsByTagName("md:System")[0]?.textContent ?? "" };
          const Value = { _tagText: RatingNode.getElementsByTagName("md:Value")[0]?.textContent ?? "" };
      
          return { Region, System, Value };
        });
      }
      
      const PeopleNodes = basicNode.getElementsByTagName("md:People");
      mecData.Basic.People = Array.from(PeopleNodes).map((PeopleNode) => {
        const JobNode = {
          JobFunction: { _tagText: PeopleNode.getElementsByTagName("md:Job")[0]?.getElementsByTagName("md:JobFunction")[0]?.textContent ?? "" },
          JobDisplay: { _tagText: PeopleNode.getElementsByTagName("md:Job")[0]?.getElementsByTagName("md:JobDisplay")[0]?.textContent ?? "" },
          BillingBlockOrder: { _tagText: PeopleNode.getElementsByTagName("md:Job")[0]?.getElementsByTagName("md:BillingBlockOrder")[0]?.textContent ?? "" }
        };
        const NameNode = { DisplayName: { _tagText: PeopleNode.getElementsByTagName("md:Name")[0]?.getElementsByTagName("md:DisplayName")[0]?.textContent ?? "" }};
      
        return { Job: JobNode, Name: NameNode };
      });
    }
    
    const CompanyDisplayCreditNode = xmlDoc.getElementsByTagName("mdmec:CompanyDisplayCredit")[0];
    if (CompanyDisplayCreditNode) {
      mecData.CompanyDisplayCredit = { DisplayString: { language: CompanyDisplayCreditNode.getElementsByTagName("md:DisplayString")[0]?.getAttribute("language") ?? "", _tagText: CompanyDisplayCreditNode.getElementsByTagName("md:DisplayString")[0]?.textContent ?? "" }};
    }

    return Promise.resolve(mecData);
  }