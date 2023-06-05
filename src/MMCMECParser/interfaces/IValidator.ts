export interface IValidator {
  validateMainKeys(data: unknown, keys: string[]): void;
  validateObjectFromSchema(data: unknown, schema: unknown): void;
}
