import Ajv, { JSONSchemaType } from 'ajv';
import { IValidator } from '../interfaces/IValidator';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';

export class InterfacesValidator implements IValidator {
  public validateMainKeys(data: unknown, keys: string[]): void {
    if (typeof data !== 'object' || data === null) {
      throw new LibraryExceptions('Data is not an object.');
    }

    const dataRecord = data as Record<string, unknown>;

    function collectKeys(record: Record<string, unknown>): Set<string> {
      const keySet = new Set<string>();

      Object.keys(record).forEach((key) => {
        keySet.add(key);

        if (Array.isArray(record[key])) {
          (record[key] as Record<string, unknown>[]).forEach((item) => {
            if (typeof item === 'object' && item !== null) {
              const itemKeySet = collectKeys(item);
              itemKeySet.forEach((itemKey) => keySet.add(itemKey));
            }
          });
        } else if (typeof record[key] === 'object' && record[key] !== null) {
          const nestedKeySet = collectKeys(record[key] as Record<string, unknown>);
          nestedKeySet.forEach((nestedKey) => keySet.add(nestedKey));
        }
      });

      return keySet;
    }

    const actualKeysSet = collectKeys(dataRecord);
    keys.forEach((key) => {
      if (!actualKeysSet.has(key)) {
        throw new LibraryExceptions(`The property "${key}" is missing.`);
      }
    });
  }

  // NOTE: This method is not currently used in the project, need to fix array issue first in parser.
  public validateObjectFromSchema(data: unknown, schema: unknown): void {
    if (typeof data !== 'object' || data === null) {
      throw new LibraryExceptions('Data is not an object.');
    }

    const ajv = new Ajv({
      strict: false,
      allowUnionTypes: true,
    });
    const validate = ajv.compile(schema as JSONSchemaType<7>);

    if (!validate(data)) {
      throw new LibraryExceptions(JSON.stringify(validate.errors));
    }
  }
}
