import { IXMLFileAdaptor } from "../../shared/interfaces/IXMLFileAdaptor";
import { MMCChecker, MECChecker } from "./MMCMECChecker.ts/MMCMMEChecker";

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
        await this.fileAdaptor.readFile(path).then((data) => {
            this.mmcFile = data;
        }).catch((err) => {
            throw err;
        })

        if (!MMCChecker(this.mmcFile)) {
            throw new Error('MMC file is not valid');
        }

        // parser
        return {}
    }

    public async parseMEC(path: string): Promise<unknown> {
        await this.fileAdaptor.readFile(path).then((data) => {
            this.mecFile = data;
        }).catch((err) => {
            throw err;
        })

        if (!MECChecker(this.mecFile)) {
            throw new Error('MEC file is not valid');
        }

        // parser
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
