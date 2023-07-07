export default function generateFirstElementsArrayRawJSON(charkey: string): Record<string, unknown>[] {
  return [
    { book: { [charkey]: 'The Lord of the Rings' } },
    { movie: { [charkey]: 'The Lord of the Rings' } },
    { game: { [charkey]: 'The Lord of the Rings' } },
  ];
}
