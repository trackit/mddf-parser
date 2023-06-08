export default function generateBooleanTagJSON(charKey: string): object {
  return {
      sample: {
          item: [
              { boolean: true, [charKey]: "Sample Item 1" },
              { boolean: false, [charKey]: "Sample Item 2" },
          ]
      }
  };
}