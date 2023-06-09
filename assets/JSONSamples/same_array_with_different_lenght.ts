export default function generateDifferentArrayLengthJSON(charKey: string): object {
  return {
    books: {
      book: [
        {
          title: { [charKey]: 'Title 1' },
          reviews: {
            review: { [charKey]: 'Review for Title 1' },
          },
        },
        {
          title: { [charKey]: 'Title 2' },
          reviews: {
            review: [
              { [charKey]: 'First review for Title 2' },
              { [charKey]: 'Second review for Title 2' },
            ],
          },
        },
      ],
    },
  };
}
