export default function generateObjectElementMultiArrayRawJSON(charKey: string): Record<string, any> {
  return {
    sample: {
      items: {
        item: {
          inside: {
            name: { [charKey]: 'Sample Item 1' },
          },
        },
      },
    },
  };
}
