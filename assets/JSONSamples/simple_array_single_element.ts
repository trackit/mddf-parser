export default function generateSingleElementArrayJSON(charKey: string): object {
  return {
    sample: {
      items: [{
        item: { [charKey]: 'Sample Item 1' },
      }],
    },
  };
}
