export default function generateManyAttributeOnSameTagJSON(charKey: string): object {
  return {
      sample: {
          item: [
              { name: "Sample Item 1", description: "This is a sample item", price: "15.99", [charKey]: "Sample Item 1" },
              { name: "Sample Item 2", description: "This is another sample item", price: "20.99", [charKey]: "Sample Item 2" }
          ]
      }
  };
}