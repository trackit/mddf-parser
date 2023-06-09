export default function generateElementsArrayWithDifferentTagsJSON(charKey: string): object {
  return {
    sample: {
      items: [
        {
          item: { [charKey]: 'Sample Item 1' },
          description: { [charKey]: 'Description for Item 1' },
          price: { [charKey]: '15.99' },
        },
        {
          item: { [charKey]: 'Sample Item 2' },
          description: { [charKey]: 'Description for Item 2' },
          price: { [charKey]: '20.99' },
        },
      ],
    },
  };
}
