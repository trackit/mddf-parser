export interface IParser<T> {
  parse(path: string): Promise<T>
  export(path: string, data: T): Promise<void>
}
