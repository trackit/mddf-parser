export type PathStep = {
  propertyName: string,
  arrayIndex?: number,
};

export type ObjectPath = PathStep[];
