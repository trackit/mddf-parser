import * as fs from 'fs/promises';
import { FileAdaptor } from './FileAdaptor';

export class LocalFileAdaptor implements FileAdaptor {
  async readFile(path: string): Promise<string> {
    const res = await fs.readFile(path, { encoding: 'utf-8' });
    return res;
  }

  async writeFile(path: string, content: string): Promise<void> {
    const res = await fs.writeFile(path, content, { encoding: 'utf-8' });
    return res;
  }
}
