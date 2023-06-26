export default function generateRawSimpleStringJSON(charkey: string): Record<string, any> {
  return {
    sample: {
      item: { [charkey]: 'Sample Item' },
    },
  };
}
