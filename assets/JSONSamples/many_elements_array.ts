export default function generateManyElementsArrayJSON(charKey: string): object {
  return {
    sample: {
      item: [
        { [charKey]: 'Sample Item 1' },
        { [charKey]: 'Sample Item 2' },
        { [charKey]: 'Sample Item 3' },
        { [charKey]: 'Sample Item 4' },
        { [charKey]: 'Sample Item 5' },
      ],
    },
  };
}
