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
        data.Inventory.Audio.forEach(audio => {
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
        });

        // Répétez le processus similaire pour Video, Subtitle, Image et Metadata.
        // ...

        rootElement.appendChild(inventoryElement);
      

        const presentationsElement = document.createElement("Presentations");
        data.Presentations.Presentation.forEach(presentation => {
            const presentationElement = document.createElement("Presentation");

            const trackMetadataElement = document.createElement("TrackMetadata");
            const trackSelectionNumberElement = document.createElement("TrackSelectionNumber");
            trackSelectionNumberElement.textContent = presentation.TrackMetadata.TrackSelectionNumber._tagText;
            trackMetadataElement.appendChild(trackSelectionNumberElement);

            const videoTrackReferenceElement = document.createElement("VideoTrackReference");
            const videoTrackIDElement = document.createElement("VideoTrackID");
            videoTrackIDElement.textContent = presentation.TrackMetadata.VideoTrackReference.VideoTrackID._tagText;
            videoTrackReferenceElement.appendChild(videoTrackIDElement);
            trackMetadataElement.appendChild(videoTrackReferenceElement);

            // Répétez le processus similaire pour AudioTrackReference et SubtitleTrackReference.
            // ...

            presentationElement.appendChild(trackMetadataElement);
            presentationElement.setAttribute("PresentationID", presentation._PresentationID);
            presentationsElement.appendChild(presentationElement);
        });

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
            const audiovisualElement = document.createElement("Audiovisual");
            // Ajouter les autres éléments selon l'interface, comme Type, SubType, PlayableSequenceID, etc.
            // ...
            experienceElement.appendChild(audiovisualElement);
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
