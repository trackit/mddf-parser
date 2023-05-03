export interface MMCInterface {
  '_xmlns:manifest': string;
  '_xmlns:md': string;
  '_xmlns:xsi': string;
  '_xsi:schemaLocation': string;
  _ManifestID: string;

  Compatibility: {
    SpecVersion: {
      _tagText: string
    };
    Profile: {
      _tagText: string
    };
  };
  Inventory: {
    Audio: {
      Type: {
        _tagText: string
      };
      Language: {
        _tagText: string; _dubbed?: string
      };
      ContainerReference: {
        ContainerLocation: {
          _tagText: string
        }
      };
      _AudioTrackID: string;
    }[];
    Video: {
      Type: {
        _tagText: string
      };
      Picture: {};
      ContainerReference: {
        ContainerLocation: {
          _tagText: string }
      };
      _VideoTrackID: string;
      CardsetList?: {
        Cardset: {
          Type: {
            _tagText: string
          };
          Language: {
            _tagText: string
          };
        };
      };
    }[];
    Subtitle: {
      Type: {
        _tagText: string
      };
      Language: {
        _tagText: string; _dubbed?: string
      };
      ContainerReference: {
        ContainerLocation: {
          _tagText: string }
      };
      _SubtitleTrackID: string;
    }[];
    Image: {
      Width: {
        _tagText: string
      };
      Height: {
        _tagText: string
      };
      Encoding: {
        _tagText: string
      };
      Language: {
        _tagText: string
      };
      ContainerReference: {
        ContainerLocation: {
          _tagText: string }
      };
      _ImageID: string;
    }[];
    Metadata: {
      ContainerReference: {
        ContainerLocation: {
          _tagText: string
        };
        _type: string;

      };
      _ContentID: string;
    }[];
  };
  Presentations: {
    Presentation: {
      TrackMetadata: {
        TrackSelectionNumber: {
          _tagText: string
        };
        VideoTrackReference: {
          VideoTrackID: {
            _tagText: string }
        }[];
        AudioTrackReference?: {
          AudioTrackID: {
            _tagText: string
          };
        }[] | { AudioTrackID: {
          _tagText: string }
        };
        SubtitleTrackReference?: {
          SubtitleTrackID: {
            _tagText: string
          };
        }[];
      };
      _PresentationID: string;
    }[];
  };
  PlayableSequences?: {
    PlayableSequence: {
      Clip: {
        PresentationID: {
          _tagText: string
        };
        _sequence: string;
        _audioLanguage?: string;
      }[];
      _PlayableSequenceID: string;
    }[];
  };
  PictureGroups: {
    PictureGroup: {
      Picture: {
        PictureID: {
          _tagText: string
        };
        ImageID: {
          _tagText: string
        };
        LanguageInImage: {
          _tagText: string
        };
      }[];
      _PictureGroupID: string;

    };
  };
  Experiences: {
    Experience: {
      ExcludedRegion?: {
        country: {
          _tagText: string
        };
      };
      ContentID: {
        _tagText: string
      };
      Audiovisual: {
        Type: {
          _tagText: string
        };
        SubType: {
          _tagText: string
        };
        PlayableSequenceID?: {
          _tagText: string
        };
        _ContentID: string;
        PresentationID?: {
          _tagText: string
        };
      };
      PictureGroupID?: {
        _tagText: string
      };
      ExperienceChild?: {
        Relationship: {
          _tagText: string
        };
        ExperienceID: {
          _tagText: string
        };
      }[];
      _ExperienceID: string;
      _version: string;
      Region?: {
        country: {
          _tagText: string
        };
      };
    }[];
  };
  ALIDExperienceMaps: {
    ALIDExperienceMap: {
      ALID: {
        _tagText: string
      };
      ExperienceID: {
        _tagText: string;
        _condition?: string;
      }[];
    };
  };
}
