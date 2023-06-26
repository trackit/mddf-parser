import { ObjectPath, PathStep } from '../ObjectPath/ObjectPath';

export default class ObjectUtils {
  public getDeepProperty(obj: Record<string, unknown>, path: ObjectPath): unknown {
    return path.reduce((current, step: PathStep) => {
      if (step.arrayIndex !== undefined && Array.isArray(current[step.propertyName])) {
        return ((current[step.propertyName] as unknown[])[step.arrayIndex]) as Record<string, unknown>;
      }
      return current[step.propertyName] as Record<string, unknown>;
    }, obj);
  }

  public setDeepProperty(obj: Record<string, unknown>, path: ObjectPath, value: unknown): void {
    // @ts-ignore
    // eslint-disable-next-line array-callback-return,consistent-return
    path.reduce((current: Record<string, unknown>, step: PathStep, index: number) => {
      if (index === path.length - 1) {
        // Last step, so set the property value
        if (step.arrayIndex !== undefined && Array.isArray(current[step.propertyName])) {
          // eslint-disable-next-line no-param-reassign
          (current[step.propertyName] as unknown[])[step.arrayIndex] = value;
        } else {
          // eslint-disable-next-line no-param-reassign
          current[step.propertyName] = value;
        }
      } else {
        // Not the last step, so make sure to go deeper
        if (step.arrayIndex !== undefined && Array.isArray(current[step.propertyName])) {
          // Path includes array index, go deeper in array
          return (current[step.propertyName] as unknown[])[step.arrayIndex] as Record<string, unknown>;
        }
        // Path includes object property, go deeper in object
        if (!(step.propertyName in current)) {
          // Create a new object if it doesn't exist
          // eslint-disable-next-line no-param-reassign
          current[step.propertyName] = {};
        }
        return current[step.propertyName] as Record<string, unknown>;
      }
    }, obj);
  }
}
