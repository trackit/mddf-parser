export default function generateOptionalAttributeJSON(charKey: string): object {
  return {
      sample: {
          item: [
              { name: "Sample Item 1", description: "This is a sample item", [charKey]: "Sample Item 1" },
              { name: "Sample Item 2", [charKey]: "Sample Item 2" }
          ]
      }
  };
}