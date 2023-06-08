export default function generateSingleElementArrayJSON(charKey: string): object {
  return {
      sample: {
          items: [
            { item: "Sample Item 1" },
          ]
      }
  };
}