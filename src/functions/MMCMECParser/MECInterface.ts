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
        purpose: string;
        _tagText: string;
      }[];
      Summary190?: {
        _tagText: string;
      };
      Summary4000: {
        _tagText: string;
      };
      Genre: {
        id: string;
        level: string;
        source: string;
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
        _tagText: string;
      };
      DistrTerritory?: {
        country: {
          _tagText: string;
        };
      };
      Date?: {
        scheduled: string;
        _tagText: string;
      };
      Description?: {
        _tagText: string;
      };
      ReleaseOrg?: {
        organizationID: string;
        idType: string;
        DisplayName: {
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
      _tagText: string;
    };
  };
}