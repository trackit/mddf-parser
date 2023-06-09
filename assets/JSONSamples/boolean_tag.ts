export default function generateBooleanTagJSON(charKey: string): object {
  return {
    sample: {
      item: [
        { boolean: { [charKey]: true }, [charKey]: 'Sample Item 1' },
        { boolean: { [charKey]: false }, [charKey]: 'Sample Item 2' },
      ],
    },
  };
}
