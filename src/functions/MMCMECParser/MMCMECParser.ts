import { MMCChecker, MECChecker } from "./MMCMECChecker.ts/MMCMMEChecker";
import { DOMParser } from 'xmldom';
// import xml2js from 'xml2js';
// import { Bag } from 'typescript-collections';
// import * as xpath from 'xpath';

export interface IXMLFileAdaptor {
    readFile(path: string): Promise<string>
    writeFile(path: string, content: string): Promise<void>
}

export interface MECInterface {
  "xmlns:md": string;
  "xmlns:xsi": string;
  "xmlns:mdmec": string;
  "xsi:schemaLocation": string;

  Basic: {
    ContentID: string;
    _prefix: "mdmec";
    LocalizedInfo: {
      language: string;
      default?: string;
      _prefix: string;
      TitleDisplay60?: {
        _tagText: string;
      };
      TitleDisplayUnlimited?: {
        _tagText: string;
      };
      TitleSort?: {
        _tagText: string;
      };
      ArtReference: {
        resolution: string;
        _prefix: string;
        _tagText: string;
      };
      Summary190?: {
        _tagText: string;
      };
      Summary4000: {
        _tagText: string;
      };
      Genre: {
        level: string;
        source: string;
        _prefix: string;
        _tagText: string;
      }[];
      OriginalTitle: {
        _tagText: string;
      };
      CopyrightLine?: {
        _tagText: string;
      };
    }[];
    RunLength?: {
      _tagText: string;
    };
    ReleaseYear: {
      _tagText: string;
    };
    ReleaseDate?: {
      _tagText: string;
    };
    ReleaseHistory?: {
      ReleaseType: {
        wide: string;
        _prefix: string;
        _tagText: string;
      };
      DistrTerritory?: {
        country: {
          _tagText: string;
        };
      };
      Date?: {
        scheduled: string;
        _prefix: string;
        _tagText: string;
      };
      Description?: {
        _tagText: string;
      };
      ReleaseOrg?: {
        organizationID: string;
        idType: string;
        _prefix: string;
        DisplayName?: {
          _tagText: string;
        };
        SortName?: {
          _tagText: string;
        };
        AlternateName?: {
          _tagText: string;
        };
      };
    }[];
    WorkType: {
      _tagText: string;
    };
    PictureColorType?: {
      _tagText: string;
    };
    RatingSet: {
      Rating: {
        Region: {
          country: {
            _tagText: string;
          };
        };
        System: {
          _tagText: string;
        };
        Value: {
          _tagText: string;
        };
      }[];
    };
    People?: {
      Job: {
        JobFunction: {
          _tagText: string;
        };
        JobDisplay: {
          _tagText: string;
        };
        BillingBlockOrder?: {
          _tagText: string;
        };
      };
      Name: {
        DisplayName: {
          _tagText: string;
        };
      };
    }[];
  };
  CompanyDisplayCredit?: {
    DisplayString: {
      language: string;
      _prefix?: "md";
      _tagText: string;
    };
  };
}

export default class MMCMECParser {
    private readonly fileAdaptor: IXMLFileAdaptor;
    private mmcFile: string;
    private mecFile: string;

    public constructor({fileAdaptor}: {fileAdaptor: IXMLFileAdaptor}) {
        this.fileAdaptor = fileAdaptor;
        this.mmcFile = '';
        this.mecFile = '';
    }

    public async parseMMC(path: string): Promise<unknown> {
        try {
            this.mmcFile = await this.fileAdaptor.readFile(path);
          } catch (err) {
            throw err
          }

        if (!MMCChecker(this.mmcFile)) {
            throw new Error('MMC file is not valid');
        }

        // parser
        return {}
    }

    public loadMECDataFromXml(xmlString: string): Promise<MECInterface> {
      let mecData: MECInterface = {
        "xmlns:md": "",
        "xmlns:xsi": "",
        "xmlns:mdmec": "",
        "xsi:schemaLocation": "",
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
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      
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
          const artReferenceNode = localizedInfoNode.getElementsByTagName("md:ArtReference")[0];
          const summary190Node = localizedInfoNode.getElementsByTagName("md:Summary190")[0];
          const summary4000Node = localizedInfoNode.getElementsByTagName("md:Summary4000")[0];
          const genreNodes = localizedInfoNode.getElementsByTagName("md:Genre");
          const originalTitleNode = localizedInfoNode.getElementsByTagName("md:OriginalTitle")[0];
          const copyrightLineNode = localizedInfoNode.getElementsByTagName("md:CopyrightLine")[0];
      
          const genreArray = Array.from(genreNodes).map((genreNode) => {
            const level = genreNode.getAttribute("level") ?? "";
            const source = genreNode.getAttribute("source") ?? "";
            const genreText = genreNode.textContent ?? "";
            return { level, source, _prefix: "md", _tagText: genreText };
          });
      
          return {
            language,
            default: defaultLang ? defaultLang : undefined,
            _prefix: "md",
            TitleDisplay60: titleDisplay60Node ? { _tagText: titleDisplay60Node.textContent ?? "" } : undefined,
            TitleDisplayUnlimited: titleDisplayUnlimitedNode ? { _tagText: titleDisplayUnlimitedNode.textContent ?? "" } : undefined,
            TitleSort: titleSortNode ? { _tagText: titleSortNode.textContent ?? "" } : undefined,
            ArtReference: {
              resolution: artReferenceNode?.getAttribute("resolution") ?? "",
              _prefix: "md",
              _tagText: artReferenceNode?.textContent ?? "",
            },
            Summary190: summary190Node ? { _tagText: summary190Node.textContent ?? "" } : undefined,
            Summary4000: { _tagText: summary4000Node.textContent ?? "" },
            Genre: genreArray,
            OriginalTitle: { _tagText: originalTitleNode.textContent ?? "" },
            CopyrightLine: { _tagText: copyrightLineNode.textContent ?? "" },
          };
        });
      }
      
      console.log(mecData.Basic.LocalizedInfo);
      return Promise.resolve(mecData);
    }
            

    public async parseMEC(path: string): Promise<unknown> {
        try {
            this.mecFile = await this.fileAdaptor.readFile(path);
          } catch (err) {
            throw err
          }

        if (!MECChecker(this.mecFile)) {
            throw new Error('MEC file is not valid');
        }

        // parser
        console.log(this.loadMECDataFromXml(this.mecFile));
        return {}
    }

    public async exportMEC(path: string, data: unknown): Promise<void> {
        // valider

        // export en XML

        // write vers le file adapator
    }

    public async exportMMC(path: string, data: unknown): Promise<void> {
        // valider

        // export en XML

        // write vers le file adapator
    }
}
