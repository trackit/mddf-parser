export default function generateFirstElementsArrayWithArraysRawJSON(charkey: string): Record<string, unknown>[][] {
  return [
    [{ book: { [charkey]: 'The Lord of the Rings' } }],
    [{ book: { [charkey]: 'Harry Potter' } }],
    [{ book: { [charkey]: 'The Hobbit' } }],
  ];
}
