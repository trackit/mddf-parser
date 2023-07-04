export default function generateSingleElementArrayRawJSON(charKey: string): Record<string, any> {
  return {
    sample: {
      items: {
        item: { [charKey]: 'Sample Item 1' },
      },
    },
  };
}
