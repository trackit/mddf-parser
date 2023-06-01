export interface IValidator {
  validate(data: unknown, keys: string[]): void;
}
