import { MMCChecker, MECChecker } from "./MMCMECChecker/MMCMMEChecker";
import { loadMECDataFromXml } from "./MECXMLParser";
import { loadMMCDataFromXml } from "./MMCXMLParser";
import { MECInterface } from './MECInterface';
import { MMCInterface } from "./MMCInterface";
import { DOMImplementation, XMLSerializer } from "xmldom";

export interface IXMLFileAdaptor {
    readFile(path: string): Promise<string>
    writeFile(path: string, content: string): Promise<void>
}

export default class MMCMECParser {
    private readonly fileAdaptor: IXMLFileAdaptor;
    private mmcFile: string;
    private mecFile: string;
    private mecData: MECInterface;
    private mmcData: MMCInterface;

    public constructor({fileAdaptor}: {fileAdaptor: IXMLFileAdaptor}) {
        this.fileAdaptor = fileAdaptor;
        this.mmcFile = '';
        this.mecFile = '';
        this.mecData = {} as MECInterface;
        this.mmcData = {} as MMCInterface;
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

        try {
            this.mmcData = await loadMMCDataFromXml(this.mmcFile);
        } catch (err) {
            throw err
        }
        return this.mmcData;
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

        try {
            this.mecData = await loadMECDataFromXml(this.mecFile);
        } catch (err) {
            throw err
        }
        return this.mecData;
    }

    public createMMCtoXML(data: MMCInterface): string {
        const domImplementation = new DOMImplementation();
        const document = domImplementation.createDocument("", "", null);
      
        const rootElement = document.createElement("RootElement");
        document.appendChild(rootElement);
      
        rootElement.setAttribute("xmlns:manifest", data["_xmlns:manifest"]);
        rootElement.setAttribute("xmlns:md", data["_xmlns:md"]);
        rootElement.setAttribute("xmlns:xsi", data["_xmlns:xsi"]);
        rootElement.setAttribute("xsi:schemaLocation", data["_xsi:schemaLocation"]);
        rootElement.setAttribute("ManifestID", data["_ManifestID"]);
      
        const compatibilityElement = document.createElement("Compatibility");
        const specVersionElement = document.createElement("SpecVersion");
        specVersionElement.textContent = data.Compatibility.SpecVersion._tagText;
        compatibilityElement.appendChild(specVersionElement);
      
        const profileElement = document.createElement("Profile");
        profileElement.textContent = data.Compatibility.Profile._tagText;
        compatibilityElement.appendChild(profileElement);
      
        rootElement.appendChild(compatibilityElement);
      
        const inventoryElement = document.createElement("Inventory");

        // Audio
        for (const audio of this.mmcData.Inventory.Audio) {
            const audioElement = document.createElement("Audio");

            const typeElement = document.createElement("Type");
            typeElement.textContent = audio.Type._tagText;
            audioElement.appendChild(typeElement);

            const languageElement = document.createElement("Language");
            languageElement.textContent = audio.Language._tagText;
            if (audio.Language._dubbed) {
                languageElement.setAttribute("dubbed", audio.Language._dubbed);
            }
            audioElement.appendChild(languageElement);

            const containerReferenceElement = document.createElement("ContainerReference");
            const containerLocationElement = document.createElement("ContainerLocation");
            containerLocationElement.textContent = audio.ContainerReference.ContainerLocation._tagText;
            containerReferenceElement.appendChild(containerLocationElement);
            audioElement.appendChild(containerReferenceElement);

            audioElement.setAttribute("AudioTrackID", audio._AudioTrackID);
            inventoryElement.appendChild(audioElement);
        }

        // Video
        for (const video of this.mmcData.Inventory.Video) {
            const videoElement = document.createElement("Video");

            const typeElement = document.createElement("Type");
            typeElement.textContent = video.Type._tagText;
            videoElement.appendChild(typeElement);

            const pictureElement = document.createElement("Picture");
            videoElement.appendChild(pictureElement);

            const containerReferenceElement = document.createElement("ContainerReference");
            const containerLocationElement = document.createElement("ContainerLocation");
            containerLocationElement.textContent = video.ContainerReference.ContainerLocation._tagText;
            containerReferenceElement.appendChild(containerLocationElement);
            videoElement.appendChild(containerReferenceElement);

            videoElement.setAttribute("VideoTrackID", video._VideoTrackID);

            if (video.CardsetList) {
                const cardsetListElement = document.createElement("CardsetList");
            
                const cardsetElement = document.createElement("Cardset");
            
                const typeElement = document.createElement("Type");
                typeElement.textContent = video.CardsetList.Cardset.Type._tagText;
                cardsetElement.appendChild(typeElement);
            
                const languageElement = document.createElement("Language");
                languageElement.textContent = video.CardsetList.Cardset.Language._tagText;
                cardsetElement.appendChild(languageElement);
            
                cardsetListElement.appendChild(cardsetElement);
            
                videoElement.appendChild(cardsetListElement);
            }

            inventoryElement.appendChild(videoElement);
        }

        // Subtitle
        for (const subtitle of this.mmcData.Inventory.Subtitle) {
            const subtitleElement = document.createElement("Subtitle");

            const typeElement = document.createElement("Type");
            typeElement.textContent = subtitle.Type._tagText;
            subtitleElement.appendChild(typeElement);

            const languageElement = document.createElement("Language");
            languageElement.textContent = subtitle.Language._tagText;
            if (subtitle.Language._dubbed) {
                languageElement.setAttribute("dubbed", subtitle.Language._dubbed);
            }
            subtitleElement.appendChild(languageElement);

            const containerReferenceElement = document.createElement("ContainerReference");
            const containerLocationElement = document.createElement("ContainerLocation");
            containerLocationElement.textContent = subtitle.ContainerReference.ContainerLocation._tagText;
            containerReferenceElement.appendChild(containerLocationElement);
            subtitleElement.appendChild(containerReferenceElement);

            subtitleElement.setAttribute("SubtitleTrackID", subtitle._SubtitleTrackID);
            inventoryElement.appendChild(subtitleElement);
        }

        // Image
        for (const image of this.mmcData.Inventory.Image) {
            const imageElement = document.createElement("Image");

            const widthElement = document.createElement("Width");
            widthElement.textContent = image.Width._tagText;
            imageElement.appendChild(widthElement);

            const heightElement = document.createElement("Height");
            heightElement.textContent = image.Height._tagText;
            imageElement.appendChild(heightElement);
            const encodingElement = document.createElement("Encoding");
            encodingElement.textContent = image.Encoding._tagText;
            imageElement.appendChild(encodingElement);

            const languageElement = document.createElement("Language");
            languageElement.textContent = image.Language._tagText;
            imageElement.appendChild(languageElement);

            const containerReferenceElement = document.createElement("ContainerReference");
            const containerLocationElement = document.createElement("ContainerLocation");
            containerLocationElement.textContent = image.ContainerReference.ContainerLocation._tagText;
            containerReferenceElement.appendChild(containerLocationElement);
            imageElement.appendChild(containerReferenceElement);

            imageElement.setAttribute("ImageID", image._ImageID);
            inventoryElement.appendChild(imageElement);
        }

        // Metadata
        for (const metadata of this.mmcData.Inventory.Metadata) {
            const metadataElement = document.createElement("Metadata");

            const containerReferenceElement = document.createElement("ContainerReference");
            containerReferenceElement.setAttribute("type", metadata.ContainerReference._type);

            const containerLocationElement = document.createElement("ContainerLocation");
            containerLocationElement.textContent = metadata.ContainerReference.ContainerLocation._tagText;
            containerReferenceElement.appendChild(containerLocationElement);
            metadataElement.appendChild(containerReferenceElement);

            metadataElement.setAttribute("ContentID", metadata._ContentID);
            inventoryElement.appendChild(metadataElement);
        }

        rootElement.appendChild(inventoryElement);
      

        const presentationsElement = document.createElement("Presentations");
        for (const presentation of this.mmcData.Presentations.Presentation) {
        const presentationElement = document.createElement("Presentation");

        const trackMetadataElement = document.createElement("TrackMetadata");
        const trackSelectionNumberElement = document.createElement("TrackSelectionNumber");
        trackSelectionNumberElement.textContent = presentation.TrackMetadata.TrackSelectionNumber._tagText;
        trackMetadataElement.appendChild(trackSelectionNumberElement);

        if (presentation.TrackMetadata.VideoTrackReference) {
            const videoTrackReferenceElement = document.createElement("VideoTrackReference");
            for (const videoTrackRef of presentation.TrackMetadata.VideoTrackReference) {
                const videoTrackIDElement = document.createElement("VideoTrackID");
                videoTrackIDElement.textContent = videoTrackRef.VideoTrackID._tagText;
                videoTrackReferenceElement.appendChild(videoTrackIDElement);
            }
            trackMetadataElement.appendChild(videoTrackReferenceElement);
        }

        if (presentation.TrackMetadata.AudioTrackReference) {
            const audioTrackReferenceElement = document.createElement("AudioTrackReference");
            if (Array.isArray(presentation.TrackMetadata.AudioTrackReference)) {
            for (const audioTrackRef of presentation.TrackMetadata.AudioTrackReference) {
                const audioTrackIDElement = document.createElement("AudioTrackID");
                audioTrackIDElement.textContent = audioTrackRef.AudioTrackID._tagText;
                audioTrackReferenceElement.appendChild(audioTrackIDElement);
            }
            } else {
            const audioTrackIDElement = document.createElement("AudioTrackID");
            audioTrackIDElement.textContent = presentation.TrackMetadata.AudioTrackReference.AudioTrackID._tagText;
            audioTrackReferenceElement.appendChild(audioTrackIDElement);
            }
            trackMetadataElement.appendChild(audioTrackReferenceElement);
        }

        if (presentation.TrackMetadata.SubtitleTrackReference) {
            const subtitleTrackReferenceElement = document.createElement("SubtitleTrackReference");
            for (const subtitleTrackRef of presentation.TrackMetadata.SubtitleTrackReference) {
                const subtitleTrackIDElement = document.createElement("SubtitleTrackID");
                subtitleTrackIDElement.textContent = subtitleTrackRef.SubtitleTrackID._tagText;
                subtitleTrackReferenceElement.appendChild(subtitleTrackIDElement);
            }
            trackMetadataElement.appendChild(subtitleTrackReferenceElement);
        }

        presentationElement.appendChild(trackMetadataElement);
        presentationElement.setAttribute("PresentationID", presentation._PresentationID);
        presentationsElement.appendChild(presentationElement);
        }
        
        rootElement.appendChild(presentationsElement);

        const playableSequencesElement = document.createElement("PlayableSequences");
        if (data.PlayableSequences) {
            data.PlayableSequences.PlayableSequence.forEach(playableSequence => {
                const playableSequenceElement = document.createElement("PlayableSequence");
                
                playableSequence.Clip.forEach(clip => {
                    const clipElement = document.createElement("Clip");
                    const presentationIDElement = document.createElement("PresentationID");
                    presentationIDElement.textContent = clip.PresentationID._tagText;
                    clipElement.appendChild(presentationIDElement);
                    
                    clipElement.setAttribute("sequence", clip._sequence);
                    if (clip._audioLanguage) {
                        clipElement.setAttribute("audioLanguage", clip._audioLanguage);
                    }
                    playableSequenceElement.appendChild(clipElement);
                });
            
                playableSequenceElement.setAttribute("PlayableSequenceID", playableSequence._PlayableSequenceID);
                playableSequencesElement.appendChild(playableSequenceElement);
            });

            rootElement.appendChild(playableSequencesElement);
        }

        const pictureGroupsElement = document.createElement("PictureGroups");
        const pictureGroupElement = document.createElement("PictureGroup");
        data.PictureGroups.PictureGroup.Picture.forEach(picture => {
            const pictureElement = document.createElement("Picture");
            const pictureIDElement = document.createElement("PictureID");
            pictureIDElement.textContent = picture.PictureID._tagText;
            pictureElement.appendChild(pictureIDElement);
        
            const imageIDElement = document.createElement("ImageID");
            imageIDElement.textContent = picture.ImageID._tagText;
            pictureElement.appendChild(imageIDElement);
        
            const languageInImageElement = document.createElement("LanguageInImage");
            languageInImageElement.textContent = picture.LanguageInImage._tagText;
            pictureElement.appendChild(languageInImageElement);
        
            pictureGroupElement.appendChild(pictureElement);
        });
        pictureGroupElement.setAttribute("PictureGroupID", data.PictureGroups.PictureGroup._PictureGroupID);
        pictureGroupsElement.appendChild(pictureGroupElement);
        rootElement.appendChild(pictureGroupsElement);

        const experiencesElement = document.createElement("Experiences");

        data.Experiences.Experience.forEach(experience => {
            const experienceElement = document.createElement("Experience");

            if (experience.ExcludedRegion) {
                const excludedRegionElement = document.createElement("ExcludedRegion");
                const countryElement = document.createElement("country");
                countryElement.textContent = experience.ExcludedRegion.country._tagText;
                excludedRegionElement.appendChild(countryElement);
                experienceElement.appendChild(excludedRegionElement);
            }

            const contentIDElement = document.createElement("ContentID");
            contentIDElement.textContent = experience.ContentID._tagText;
            experienceElement.appendChild(contentIDElement);

            const audioVisualElement = document.createElement("Audiovisual");
            const avTypeElement = document.createElement("Type");
            avTypeElement.textContent = experience.Audiovisual.Type._tagText;
            audioVisualElement.appendChild(avTypeElement);

            const avSubTypeElement = document.createElement("SubType");
            avSubTypeElement.textContent = experience.Audiovisual.SubType._tagText;
            audioVisualElement.appendChild(avSubTypeElement);

            if (experience.Audiovisual.PlayableSequenceID) {
            const playableSequenceIDElement = document.createElement("PlayableSequenceID");
            playableSequenceIDElement.textContent = experience.Audiovisual.PlayableSequenceID._tagText;
            audioVisualElement.appendChild(playableSequenceIDElement);
            }

            audioVisualElement.setAttribute("ContentID", experience.Audiovisual._ContentID);

            if (experience.Audiovisual.PresentationID) {
            const presentationIDElement = document.createElement("PresentationID");
            presentationIDElement.textContent = experience.Audiovisual.PresentationID._tagText;
            audioVisualElement.appendChild(presentationIDElement);
            }

            experienceElement.appendChild(audioVisualElement);

            if (experience.PictureGroupID) {
                const pictureGroupIDElement = document.createElement("PictureGroupID");
                pictureGroupIDElement.textContent = experience.PictureGroupID._tagText;
                experienceElement.appendChild(pictureGroupIDElement);
            }

            if (experience.ExperienceChild) {
                experience.ExperienceChild.forEach(experienceChild => {
                    const experienceChildElement = document.createElement("ExperienceChild");
                    const relationshipElement = document.createElement("Relationship");
                    relationshipElement.textContent = experienceChild.Relationship._tagText;
                    experienceChildElement.appendChild(relationshipElement);

                    const experienceIDElement = document.createElement("ExperienceID");
                    experienceIDElement.textContent = experienceChild.ExperienceID._tagText;
                    experienceChildElement.appendChild(experienceIDElement);

                    experienceElement.appendChild(experienceChildElement);
                });
            }

            experienceElement.setAttribute("ExperienceID", experience._ExperienceID);
            experienceElement.setAttribute("version", experience._version);
            experiencesElement.appendChild(experienceElement);
        });

        rootElement.appendChild(experiencesElement);


        const alidExperienceMapsElement = document.createElement("ALIDExperienceMaps");

        const alidExperienceMapElement = document.createElement("ALIDExperienceMap");
        const alidElement = document.createElement("ALID");
        alidElement.textContent = data.ALIDExperienceMaps.ALIDExperienceMap.ALID._tagText;
        alidExperienceMapElement.appendChild(alidElement);
        
        data.ALIDExperienceMaps.ALIDExperienceMap.ExperienceID.forEach(experienceID => {
          const experienceIDElement = document.createElement("ExperienceID");
          experienceIDElement.textContent = experienceID._tagText;
          if (experienceID._condition) {
            experienceIDElement.setAttribute("condition", experienceID._condition);
          }
          alidExperienceMapElement.appendChild(experienceIDElement);
        });
        
        alidExperienceMapsElement.appendChild(alidExperienceMapElement);

        rootElement.appendChild(alidExperienceMapsElement);

        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(document);
      
        return xmlString;
    }

    public async exportMEC(path: string, data: unknown): Promise<void> {
        // export in XML

        // write to the file adapator
    }

    public async exportMMC(path: string, data: unknown): Promise<void> {
        if (data === undefined) {
            throw new Error("No data to export");
        }
        const mmc = data as MMCInterface;
        if (mmc.Inventory === undefined || mmc.Presentations === undefined) {
            throw new Error("Invalid MMC data");
        }

        // export in XML
        console.log(this.createMMCtoXML(mmc))

        // write to the file adapator
    }
}
