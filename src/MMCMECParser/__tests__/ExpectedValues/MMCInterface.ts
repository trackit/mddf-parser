import { MMCInterface } from '../../MMC/MMCInterface';

const expectedMMC: MMCInterface = {
  '_xmlns:manifest': 'http://www.movielabs.com/schema/manifest/v1.8/manifest',
  '_xmlns:md': 'http://www.movielabs.com/schema/md/v2.7/md',
  '_xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
  '_xsi:schemaLocation': 'http://www.movielabs.com/schema/manifest/v1.8/manifest manifest-v1.8.1.xsd',
  _ManifestID: 'SofaSpud.Example.preorder',
  Compatibility: {
    SpecVersion: {
      _tagText: '1.5',
    },
    Profile: {
      _tagText: 'MMC-1',
    },
  },
  Inventory: {
    Audio: [
      {
        Type: {
          _tagText: 'primary',
        },
        Language: {
          _tagText: 'en',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_feature_video_ENG.mpg',
          },
        },
        _AudioTrackID: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.audio.en',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Language: {
          _tagText: 'fr',
          _dubbed: 'true',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_feature_video_FR.mpg',
          },
        },
        _AudioTrackID: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.audio.fr',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Language: {
          _tagText: 'pt-BR',
          _dubbed: 'true',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_feature_video_PT-BR.mpg',
          },
        },
        _AudioTrackID: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.audio.pt-br',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Language: {
          _tagText: 'en',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_trailer_video_ENG.mpg',
          },
        },
        _AudioTrackID: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.audio.en',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Language: {
          _tagText: 'fr',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_trailer_video_FR.mpg',
          },
        },
        _AudioTrackID: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.audio.fr',
      },
    ],
    Video: [
      {
        Type: {
          _tagText: 'primary',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_feature_video_ENG.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.video',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_trailer_video_ENG.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.video.en',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_trailer_video_FR.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.video.fr',
      },
      {
        Type: {
          _tagText: 'other',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_video_dubcard_FR.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.video.dubcard.fr',
        CardsetList: {
          Cardset: {
            Type: {
              _tagText: 'DubbingCredit',
            },
            Language: {
              _tagText: 'fr',
            },
          },
        },
      },
      {
        Type: {
          _tagText: 'other',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_video_dubcard_BR-PT.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.video.dubcard.pt-br',
        CardsetList: {
          Cardset: {
            Type: {
              _tagText: 'DubbingCredit',
            },
            Language: {
              _tagText: 'pt-BR',
            },
          },
        },
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/us-antipiracy-preroll.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:org:iprcenter.gov:video1',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/Rating_MPAA_R.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:URI:http://www.movielabs.com/md/ratings/US/MPAA/2/R',
      },
      {
        Type: {
          _tagText: 'primary',
        },
        Picture: {},
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/Rating_CHVRS-14A.mpg',
          },
        },
        _VideoTrackID: 'md:vidtrackid:URI:http://www.movielabs.com/md/ratings/CA/CHVRS/1/14A',
      },
    ],
    Subtitle: [
      {
        Type: {
          _tagText: 'SDH',
        },
        Language: {
          _tagText: 'en',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_closed_caption_ENG.scc',
          },
        },
        _SubtitleTrackID: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.caption.en',
      },
      {
        Type: {
          _tagText: 'forced',
        },
        Language: {
          _tagText: 'en',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_closed_forced_ENG.scc',
          },
        },
        _SubtitleTrackID: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.forced.en',
      },
      {
        Type: {
          _tagText: 'normal',
        },
        Language: {
          _tagText: 'fr',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_closed_caption_FR.scc',
          },
        },
        _SubtitleTrackID: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.caption.fr',
      },
      {
        Type: {
          _tagText: 'forced',
        },
        Language: {
          _tagText: 'fr',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_closed_forced_FR.scc',
          },
        },
        _SubtitleTrackID: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.forced.fr',
      },
      {
        Type: {
          _tagText: 'normal',
        },
        Language: {
          _tagText: 'pt-BR',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_closed_caption_PT-BR.scc',
          },
        },
        _SubtitleTrackID: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.caption.pt-br',
      },
      {
        Type: {
          _tagText: 'forced',
        },
        Language: {
          _tagText: 'pt-BR',
          _dubbed: '',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_closed_forced_PT-BR.scc',
          },
        },
        _SubtitleTrackID: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.forced.pt-br',
      },
    ],
    Image: [
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'en',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_US.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.en',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'fr',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_FR.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.fr',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'pt-BR',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_PT-BR.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.pt-BR',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'ru',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_RU.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.ru',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'it',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_IT.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.it',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'de',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_DE.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.de',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'es',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_ES.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.es',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'es-419',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_MX.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.es-419',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'nl-nl',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_BLX.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.blx',
      },
      {
        Width: {
          _tagText: '1789',
        },
        Height: {
          _tagText: '2560',
        },
        Encoding: {
          _tagText: 'jpg',
        },
        Language: {
          _tagText: 'ko',
        },
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/CounselorThe_AD07-310C-C59D-6785-C63A-G_art_KR.jpg',
          },
        },
        _ImageID: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.ko',
      },
    ],
    Metadata: [
      {
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/ManifestCore_Example1_MEC_movie.xml',
          },
          _type: 'common',
        },
        _ContentID: 'md:cid:eidr-s:AD07-310C-C59D-6785-C63A-G',
      },
      {
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/ManifestCore_Example1_MEC_Trailer1.xml',
          },
          _type: 'common',
        },
        _ContentID: 'md:cid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1',
      },
      {
        ContainerReference: {
          ContainerLocation: {
            _tagText: './resources/ManifestCore_Example1_MEC_Trailer2.xml',
          },
          _type: 'common',
        },
        _ContentID: 'md:cid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2',
      },
    ],
  },
  Presentations: {
    Presentation: [
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.video',
              },
            },
          ],
          AudioTrackReference: [
            {
              AudioTrackID: {
                _tagText: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.audio.en',
              },
            },
            {
              AudioTrackID: {
                _tagText: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.audio.fr',
              },
            },
            {
              AudioTrackID: {
                _tagText: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.audio.pt-br',
              },
            },
          ],
          SubtitleTrackReference: [
            {
              SubtitleTrackID: {
                _tagText: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.caption.en',
              },
            },
            {
              SubtitleTrackID: {
                _tagText: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.forced.en',
              },
            },
            {
              SubtitleTrackID: {
                _tagText: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.caption.fr',
              },
            },
            {
              SubtitleTrackID: {
                _tagText: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.forced.fr',
              },
            },
            {
              SubtitleTrackID: {
                _tagText: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.caption.pt-br',
              },
            },
            {
              SubtitleTrackID: {
                _tagText: 'md:subtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.forced.pt-br',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.presentation',
      },
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.video.en',
              },
            },
          ],
          AudioTrackReference: [
            {
              AudioTrackID: {
                _tagText: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.audio.en',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.presentation',
      },
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.video.fr',
              },
            },
          ],
          AudioTrackReference: [
            {
              AudioTrackID: {
                _tagText: 'md:audtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.audio.fr',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.presentation',
      },
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.video.dubcard.fr',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:dubcard.fr.presentation',
      },
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.video.dubcard.pt-br',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:dubcard.pt-br.presentation',
      },
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:org:iprcenter.gov:video1',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:org:iprcenter.gov:video1',
      },
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:URI:http://www.movielabs.com/md/ratings/US/MPAA/2/R',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:URI:http://www.movielabs.com/md/ratings/US/MPAA/2/R',
      },
      {
        TrackMetadata: {
          TrackSelectionNumber: {
            _tagText: '0',
          },
          VideoTrackReference: [
            {
              VideoTrackID: {
                _tagText: 'md:vidtrackid:URI:http://www.movielabs.com/md/ratings/CA/CHVRS/1/14A',
              },
            },
          ],
        },
        _PresentationID: 'md:presentationid:URI:http://www.movielabs.com/md/ratings/CA/CHVRS/1/14A',
      },
    ],
  },
  PlayableSequences: {
    PlayableSequence: [
      {
        Clip: [
          {
            PresentationID: {
              _tagText: 'md:presentationid:org:iprcenter.gov:video1',
            },
            _sequence: '-2',
          },
          {
            PresentationID: {
              _tagText: 'md:presentationid:URI:http://www.movielabs.com/md/ratings/US/MPAA/2/R',
            },
            _sequence: '-1',
          },
          {
            PresentationID: {
              _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.presentation',
            },
            _sequence: '0',
          },
          {
            PresentationID: {
              _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:dubcard.fr.presentation',
            },
            _sequence: '1',
            _audioLanguage: 'fr',
          },
          {
            PresentationID: {
              _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:dubcard.pt-br.presentation',
            },
            _sequence: '1',
            _audioLanguage: 'pt-BR',
          },
        ],
        _PlayableSequenceID: 'md:playablesequenceid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.us',
      },
      {
        Clip: [
          {
            PresentationID: {
              _tagText: 'md:presentationid:URI:http://www.movielabs.com/md/ratings/CA/CHVRS/1/14A',
            },
            _sequence: '-1',
          },
          {
            PresentationID: {
              _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.presentation',
            },
            _sequence: '0',
          },
          {
            PresentationID: {
              _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:dubcard.fr.presentation',
            },
            _sequence: '1',
            _audioLanguage: 'fr',
          },
          {
            PresentationID: {
              _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:dubcard.pt-br.presentation',
            },
            _sequence: '1',
            _audioLanguage: 'pt-BR',
          },
        ],
        _PlayableSequenceID: 'md:playablesequenceid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.ca',
      },
    ],
  },
  PictureGroups: {
    PictureGroup: {
      Picture: [
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.en',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.en',
          },
          LanguageInImage: {
            _tagText: 'en',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.fr',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.fr',
          },
          LanguageInImage: {
            _tagText: 'fr',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.ru',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.ru',
          },
          LanguageInImage: {
            _tagText: 'ru',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.it',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.it',
          },
          LanguageInImage: {
            _tagText: 'it',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.es',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.es',
          },
          LanguageInImage: {
            _tagText: 'es',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.es-419',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.es-419',
          },
          LanguageInImage: {
            _tagText: 'es-419',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.ko',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.ko',
          },
          LanguageInImage: {
            _tagText: 'ko',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.de',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.de',
          },
          LanguageInImage: {
            _tagText: 'ko',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.pt-BR',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.pt-BR',
          },
          LanguageInImage: {
            _tagText: 'ko',
          },
        },
        {
          PictureID: {
            _tagText: 'md:pictureid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.blx',
          },
          ImageID: {
            _tagText: 'md:imageid:eidr-x:AD07-310C-C59D-6785-C63A-G:art.blx',
          },
          LanguageInImage: {
            _tagText: 'ko',
          },
        },
      ],
      _PictureGroupID: 'md:picturegroupid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature',
    },
  },
  Experiences: {
    Experience: [
      {
        _ExperienceID: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:experience.us',
        _version: '1.0',
        ExcludedRegion: {
          country: {
            _tagText: '\n                CA\n            ',
          },
        },
        ContentID: {
          _tagText: 'md:cid:eidr-s:AD07-310C-C59D-6785-C63A-G',
        },
        Audiovisual: {
          Type: {
            _tagText: 'Main',
          },
          SubType: {
            _tagText: 'Feature',
          },
          PlayableSequenceID: {
            _tagText: 'md:playablesequenceid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.us',
          },
          _ContentID: 'md:cid:eidr-s:AD07-310C-C59D-6785-C63A-G',
        },
        PictureGroupID: {
          _tagText: 'md:picturegroupid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature',
        },
        ExperienceChild: [
          {
            Relationship: {
              _tagText: 'ispromotionfor',
            },
            ExperienceID: {
              _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.experience',
            },
          },
          {
            Relationship: {
              _tagText: 'ispromotionfor',
            },
            ExperienceID: {
              _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.experience',
            },
          },
        ],
      },
      {
        _ExperienceID: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:experience.ca',
        _version: '1.0',
        ContentID: {
          _tagText: 'md:cid:eidr-s:AD07-310C-C59D-6785-C63A-G',
        },
        Audiovisual: {
          Type: {
            _tagText: 'Main',
          },
          SubType: {
            _tagText: 'Feature',
          },
          PlayableSequenceID: {
            _tagText: 'md:playablesequenceid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature.ca',
          },
          _ContentID: 'md:cid:eidr-s:AD07-310C-C59D-6785-C63A-G',
        },
        PictureGroupID: {
          _tagText: 'md:picturegroupid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature',
        },
        ExperienceChild: [
          {
            Relationship: {
              _tagText: 'ispromotionfor',
            },
            ExperienceID: {
              _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.experience',
            },
          },
          {
            Relationship: {
              _tagText: 'ispromotionfor',
            },
            ExperienceID: {
              _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.experience',
            },
          },
        ],
        Region: {
          country: {
            _tagText: '\n                CA\n            ',
          },
        },
      },
      {
        _ExperienceID: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:experience.preorder',
        _version: '1.0',
        ContentID: {
          _tagText: 'md:cid:eidr-s:AD07-310C-C59D-6785-C63A-G',
        },
        Audiovisual: {
          Type: {
            _tagText: 'Main',
          },
          SubType: {
            _tagText: 'Feature',
          },
          _ContentID: 'md:cid:eidr-s:AD07-310C-C59D-6785-C63A-G',
        },
        PictureGroupID: {
          _tagText: 'md:picturegroupid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature',
        },
        ExperienceChild: [
          {
            Relationship: {
              _tagText: 'ispromotionfor',
            },
            ExperienceID: {
              _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.experience',
            },
          },
          {
            Relationship: {
              _tagText: 'ispromotionfor',
            },
            ExperienceID: {
              _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.experience',
            },
          },
        ],
      },
      {
        _ExperienceID: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.experience',
        _version: '1.0',
        ContentID: {
          _tagText: 'md:cid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1',
        },
        Audiovisual: {
          Type: {
            _tagText: 'Promotion',
          },
          SubType: {
            _tagText: 'Default Trailer',
          },
          _ContentID: 'md:cid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1',
          PresentationID: {
            _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.1.presentation',
          },
        },
        PictureGroupID: {
          _tagText: 'md:picturegroupid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature',
        },
      },
      {
        _ExperienceID: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.experience',
        _version: '1.0',
        ContentID: {
          _tagText: 'md:cid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2',
        },
        Audiovisual: {
          Type: {
            _tagText: 'Promotion',
          },
          SubType: {
            _tagText: 'Trailer',
          },
          _ContentID: 'md:cid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2',
          PresentationID: {
            _tagText: 'md:presentationid:eidr-x:AD07-310C-C59D-6785-C63A-G:trailer.2.presentation',
          },
        },
        PictureGroupID: {
          _tagText: 'md:picturegroupid:eidr-x:AD07-310C-C59D-6785-C63A-G:feature',
        },
      },
    ],
  },
  ALIDExperienceMaps: {
    ALIDExperienceMap: {
      ALID: {
        _tagText: 'md:alid:eidr-s:AD07-310C-C59D-6785-C63A-G',
      },
      ExperienceID: [
        {
          _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:experience.us',
        },
        {
          _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:experience.ca',
        },
        {
          _tagText: 'md:experienceid:eidr-x:AD07-310C-C59D-6785-C63A-G:experience.preorder',
          _condition: 'Pre-order',
        },
      ],
    },
  },
};

export { expectedMMC };
