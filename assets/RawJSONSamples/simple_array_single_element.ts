export default function generateSingleElementArrayRawJSON(charKey: string): object {
  return {
    sample: {
      items: {
        item: { [charKey]: 'Sample Item 1' },
      },
    },
  };
}
