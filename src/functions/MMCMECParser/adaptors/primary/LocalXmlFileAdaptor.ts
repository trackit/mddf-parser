import * as fs from 'fs';
import { IXMLFileAdaptor } from '../../../../shared/interfaces/IXMLFileAdaptor';

export class LocalXMLFileAdaptor implements IXMLFileAdaptor {
    readFile(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, content) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(content.toString());
                }
            });
        });
    }

    writeFile(path: string, content: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, content, (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
          });
    }
}