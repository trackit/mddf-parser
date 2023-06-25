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
}
