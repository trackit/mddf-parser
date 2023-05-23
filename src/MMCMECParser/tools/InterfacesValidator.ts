import { IValidator } from '../interfaces/IValidator';
import { LibraryExceptions } from '../exceptions/LibraryExceptions';

export class InterfacesValidator implements IValidator {
  public validate(data: unknown, keys: string[]): void {
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
}
