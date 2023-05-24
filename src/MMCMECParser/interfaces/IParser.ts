export interface IParser<T> {
  parse(path: string): Promise<T>
  convert(data: T): Promise<string>
  export(path: string, data: T): Promise<void>
}
