export default function generateOptionalAttributeJSON(): object {
  return {
    sample: {
      item: [
        { name: 'Sample Item 1', description: 'This is a sample item' },
        { name: 'Sample Item 2' },
      ],
    },
  };
}
