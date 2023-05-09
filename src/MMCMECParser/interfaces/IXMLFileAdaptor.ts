export interface IXMLFileAdaptor {
  readFile(path: string): Promise<string>
  writeFile(path: string, content: string): Promise<void>
}
