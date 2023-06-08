export default function generateStringWithErrorJSON(charKey: string): object {
  return {
      sample: {
          item: { [charKey]: "Sample Item with error" }
      }
  };
}