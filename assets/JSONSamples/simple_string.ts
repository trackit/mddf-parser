export default function generateSimpleStringJSON(charkey: string): object {
  return {
    sample: {
      item: { [charkey]: 'Sample Item' },
    },
  };
}
