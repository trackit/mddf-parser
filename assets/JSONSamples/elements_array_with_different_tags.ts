export default function generateElementsArrayWithDifferentTagsJSON(charKey: string): object {
  return {
      sample: {
          items: [
              { item: "Sample Item 1", description: "Description for Item 1", price: "15.99", [charKey]: "Sample Item 1" },
              { item: "Sample Item 2", description: "Description for Item 2", price: "20.99", [charKey]: "Sample Item 2" }
          ]
      }
  };
}