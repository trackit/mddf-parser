export default function generateObjectElementArrayRawJSON(charKey: string): Record<string, any> {
  return {
    sample: {
      items: {
        item: {
          inside : {
            [charKey]: 'Sample Item 1'
          },
        },
      },
    },
  };
}
