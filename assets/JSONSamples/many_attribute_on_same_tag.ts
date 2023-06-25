export default function generateManyAttributeOnSameTagJSON(): object {
  return {
    sample: {
      item: [
        {
          name: 'Sample Item 1',
          description: 'This is a sample item',
          price: 15.99,
        },
        {
          name: 'Sample Item 2',
          description: 'This is another sample item',
          price: 20.99,
        },
      ],
    },
  };
}
