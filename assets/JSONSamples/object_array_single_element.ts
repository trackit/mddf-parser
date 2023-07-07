export default function generateObjectElementArrayJSON(): object {
  return {
    sample: {
      items: {
        item: [
          {
            inside: 'Sample Item 1',
          },
        ],
      },
    },
  };
}
