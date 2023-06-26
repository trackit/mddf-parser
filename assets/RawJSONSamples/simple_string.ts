export default function generateRawSimpleStringJSON(charkey: string): object {
  return {
    sample: {
      item: { [charkey]: 'Sample Item' },
    },
  };
}
