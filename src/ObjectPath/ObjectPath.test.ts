import ObjectPathUtils from './ObjectPath';

describe('ObjectPathUtils', () => {
  describe('fromObject', () => {
    it('should map non-array entries to property names and array entries to objects with property name and array index', () => {
      const input = {
        property1: 'value1',
        property2: ['value2.1', 'value2.2', 'value2.3'],
        property3: 123,
        property4: [true, false],
      };

      const result = ObjectPathUtils.fromObject(input);

      expect(result).toEqual([
        { propertyName: 'property1' },
        { propertyName: 'property2', arrayIndex: 0 },
        { propertyName: 'property2', arrayIndex: 1 },
        { propertyName: 'property2', arrayIndex: 2 },
        { propertyName: 'property3' },
        { propertyName: 'property4', arrayIndex: 0 },
        { propertyName: 'property4', arrayIndex: 1 },
      ]);
    });
  });
});
