export type PathStep = {
  propertyName: string,
  arrayIndex?: number,
};

export type ObjectPath = PathStep[];

export default class ObjectPathUtils {
  public static toStringArray(path: ObjectPath): string[] {
    return path.map((step: PathStep) => step.propertyName);
  }

  public static fromStringArray(path: string[]): ObjectPath {
    return path.map((propertyName: string) => ({ propertyName }));
  }

  public static pathStepsFromObjectProperties(obj: Record<string, unknown>): PathStep[] {
    return Object.entries(obj).reduce((acc: PathStep[], [propertyName, value]) => {
      if (Array.isArray(value)) {
        const arraySteps: PathStep[] = value.map((_, arrayIndex) => ({ propertyName, arrayIndex }));
        return [...acc, ...arraySteps];
      }

      return [...acc, { propertyName }];
    }, []);
  }

  public static concatPath(path: ObjectPath, step: PathStep): ObjectPath {
    return [...path, step];
  }

  public static concatPaths(path: ObjectPath, steps: PathStep[]): ObjectPath[] {
    return steps.map((step: PathStep) => ObjectPathUtils.concatPath(path, step));
  }
}
