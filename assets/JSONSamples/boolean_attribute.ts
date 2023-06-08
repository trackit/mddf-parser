export default function generateBooleanAttributeJSON(charKey: string): object {
  return {
      sample: {
          item: [
              { boolean_attribute: true, [charKey]:  "Sample Item 1" },
              { boolean_attribute: false, [charKey]: "Sample Item 2" },
          ]
      }
  };
}