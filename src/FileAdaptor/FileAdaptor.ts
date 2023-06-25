export interface FileAdaptor {
  readFile(path: string): Promise<string>
  writeFile(path: string, content: string): Promise<void>
}
